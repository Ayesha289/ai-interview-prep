from flask import Blueprint, request, jsonify
from .prompt import generate_interview_prompt, generate_analysis_prompt
import os
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain import LLMChain
from langchain_openai import ChatOpenAI 
from .model import Interview
from . import mongo
from bson.objectid import ObjectId

load_dotenv()

interview = Blueprint('interview', __name__)

@interview.route('/initialize', methods=['POST'])
def initialize_conversation():
    data = request.json
    
    # Validate input
    if not data or 'role' not in data or 'years_of_experience' not in data or 'user_id' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    role = data['role']
    user_id = data['user_id']
    try:
        years_of_experience = int(data['years_of_experience'])
    except ValueError:
        return jsonify({'error': 'Years of experience must be an integer'}), 400

    # Generate the prompt
    bot_prompt = generate_interview_prompt(role, years_of_experience)

    # Create an interview instance and save it to the database
    interview_instance = {
        'user_id': user_id,
        'prompt': bot_prompt,
        'result': ''
    }

    inserted_id = mongo.db.interviews.insert_one(interview_instance).inserted_id
    interview_data = mongo.db.interviews.find_one({"_id": ObjectId(inserted_id)})
    interview = Interview(interview_data)

    return jsonify({"message": "Conversation initialized", "interview_id": str(interview.get_interview_id())})

@interview.route('/conversation', methods=['POST'])
def conversation():
    data = request.json
    conversation_history = []

    if not data or 'message' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    user_input = data['message']
    interview_id = data['interview_id']

    query = {"_id": ObjectId(interview_id)}
    filter = {"prompt": 1}
    details = mongo.db.interviews.find_one(query, filter)
    bot_prompt = details['prompt']

    # Create a prompt template
    template = bot_prompt + """

    Previous conversation:
    {chat_history}

    New human question: {question}
    Response:"""

    prompt = PromptTemplate.from_template(template)
    memory = ConversationBufferMemory(memory_key="chat_history")

    llm = ChatOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        temperature=1, 
        model_name='meta-llama/llama-3.1-8b-instruct:free'
    )

    conversation_chain = LLMChain(
        llm=llm,
        prompt=prompt,
        verbose=True, 
        memory=memory
    )


    if user_input.lower() == "bye":
        bot_response = conversation_chain.run({"question": "Send a friendly goodbye note and give a nice short sweet compliment based on the conversation."})
        conversation_history.append({"user": "Goodbye", "bot": bot_response})
        return jsonify({"message": bot_response, "conversation_history": conversation_history})
    
    else:
        bot_response = conversation_chain.run({"question": user_input})
        conversation_history.append({"user": user_input, "bot": bot_response})
        return jsonify({"message": bot_response, "conversation_history": conversation_history})

@interview.route('/analysis', methods=['POST'])
def analysis():
    data = request.json

    if not data or 'conversation' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    conversation = data['conversation']
    prompt = generate_analysis_prompt(conversation)
    
    client = ChatOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        temperature=1, 
        model_name='meta-llama/llama-3.1-8b-instruct:free'
    )

    completion = client.chat.completions.create(
        model="meta-llama/llama-3.1-8b-instruct:free",
        messages=[
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )
    return jsonify({"response": (completion.choices[0].message.content)})
