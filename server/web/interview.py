from flask import Blueprint, request, jsonify
from .prompt import generate_interview_prompt
import speech_recognition as sr
import os
from dotenv import load_dotenv
import pyttsx3
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain import LLMChain
from langchain_openai import ChatOpenAI 

load_dotenv()

interview = Blueprint('interview', __name__)

@interview.route('/conversation', methods=['POST'])
def conversation():
    data = request.json
    conversation_history = []
    
    # Validate input
    if not data or 'role' not in data or 'years_of_experience' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    role = data['role']
    try:
        years_of_experience = int(data['years_of_experience'])
    except ValueError:
        return jsonify({'error': 'Years of experience must be an integer'}), 400

    # Generate the prompt
    bot_prompt = generate_interview_prompt(role, years_of_experience)

    llm = ChatOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        temperature=1, 
        model_name='meta-llama/llama-3.1-8b-instruct:free'
    )

    # Create a prompt template
    template = bot_prompt + """

    Previous conversation:
    {chat_history}

    New human question: {question}
    Response:"""

    prompt = PromptTemplate.from_template(template)
    memory = ConversationBufferMemory(memory_key="chat_history")

    conversation_chain = LLMChain(
        llm=llm,
        prompt=prompt,
        verbose=True, 
        memory=memory
    )

    engine = pyttsx3.init()

    # Configure voice (optional)
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[0].id)

    # Set properties (optional)
    engine.setProperty('rate', 180)
    engine.setProperty('volume', 0.9)

    recognizer = sr.Recognizer()

    def listen():
        with sr.Microphone() as source:
            print("Say something...")
            audio = recognizer.listen(source)

        try:
            text = recognizer.recognize_google(audio)   # speech to text
            return text
        except:
            print("Could not understand audio")

    def prompt_model(text):
        # Prompt the LLM chain
        response = conversation_chain.run({"question": text})
        return response

    def respond(model_response):
        # Run the speech synthesis
        engine.say(model_response)
        engine.runAndWait()

    def conversation():
        user_input = ""
        while True:
            user_input = listen()
            if user_input is None:
                user_input = listen()

            elif "bye" in user_input.lower():
                bot_response = conversation_chain.run({"question": "Send a friendly goodbye note and give a nice short sweet compliment based on the conversation."})
                respond(bot_response)
                conversation_history.append({"user": "Goodbye", "bot": bot_response})
                return
            
            else:
                bot_response = prompt_model(user_input)
                respond(bot_response)
                conversation_history.append({"user": user_input, "bot": bot_response})
    
    # Start the conversation
    respond(conversation_chain.run({"question": "Greet me in a friendly way"}))
    conversation()

    # Return the conversation history as JSON
    return jsonify({"conversation_history": conversation_history})
