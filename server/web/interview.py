from flask import Blueprint, request, jsonify
from .prompt import generate_interview_prompt, generate_analysis_prompt
import os
from dotenv import load_dotenv
import google.generativeai as genai
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

    bot_prompt = generate_interview_prompt(role, years_of_experience)

    interview_instance = {
        'user_id': user_id,
        'prompt': bot_prompt,
        'result': ''
    }

    inserted_id = mongo.db.interviews.insert_one(interview_instance).inserted_id
    interview_data = mongo.db.interviews.find_one({"_id": ObjectId(inserted_id)})
    interview = Interview(interview_data)

    return jsonify({"message": "Conversation initialized", "interview_id": str(interview.get_interview_id())})

@interview.route('/analysis', methods=['POST'])
def analysis():
    data = request.json

    if not data or 'conversation' not in data or 'interview_id' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    conversation = data['conversation']
    interview_id = data['interview_id']
    prompt = generate_analysis_prompt(conversation)

    genai.configure(api_key=os.environ["API_KEY"])
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)

    formatted_response = format_response_text(response.text)

    result = mongo.db.interviews.find_one_and_update(
        {"_id": ObjectId(interview_id)},  
        {"$set": {"result": formatted_response}}, 
        return_document=True
    )

    if not result:
        return jsonify({"error": "Interview not found or update failed"}), 404

    return jsonify({"response": formatted_response})

def format_response_text(text):
    # Replace newlines with <br> tags
    text = text.replace('\n', '<br>')
    
    # Convert Markdown headers to HTML headers
    text = text.replace('## ', '<h2>').replace('**Final Evaluation Score:**', '</h2><strong>Final Evaluation Score:</strong>')
    
    # Convert Markdown bold to HTML bold
    text = text.replace('**', '<strong>').replace('</h2><strong>Final Evaluation Score:</strong>', '<h2>Final Evaluation Score:</h2><strong>')
    
    # Convert markdown list items to HTML list items
    text = text.replace('* ', '<li>').replace('<br><li>', '<br><ul><li>').replace('<br>**Score:', '</li></ul><br>**Score:')
    
    # Make sure every <li> is closed properly
    text = text.replace('<br>**Overall Evaluation:**', '</li></ul><br><strong>Overall Evaluation:</strong>')
    
    return text

