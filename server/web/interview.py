from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from .prompt import generate_interview_prompt, generate_analysis_prompt
import os
from dotenv import load_dotenv
import google.generativeai as genai
from .model import Interview
from . import mongo
from bson.objectid import ObjectId
import re

load_dotenv()

interview = Blueprint('interview', __name__)
CORS(interview, resources={r"/*": {"origins": "*"}})

@interview.route('/initialize', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def initialize_conversation():
    data = request.json
    
    if not data or 'role' not in data or 'years_of_experience' not in data or 'user_id' not in data or 'credits' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    role = data['role']
    user_id = data['user_id']
    credits = data['credits']

    # Validate years of experience
    try:
        years_of_experience = int(data['years_of_experience'])
    except ValueError:
        return jsonify({'error': 'Years of experience must be an integer'}), 400

    # Check if credits is an integer and non-negative
    try:
        credits = int(credits)
        if credits < 25:
            return jsonify({'message': 'Insufficient credits!'})
    except ValueError:
        return jsonify({'message': 'Credits must be an integer'})

    # Generate interview prompt based on role and experience
    bot_prompt = generate_interview_prompt(role, years_of_experience)

    # Update credits in the users collection
    updated_user = mongo.db.users.find_one_and_update(
        {"_id": ObjectId(user_id)},
        {"$set": {"credits": credits}},
        return_document=True
    )
    
    if not updated_user:
        return jsonify({'message': 'Failed to update credits for the user'})

    # Create interview instance
    interview_instance = {
        'user_id': user_id,
        'prompt': bot_prompt,
        'result': '',
        'scores': '',
    }

    # Insert interview instance into the database
    inserted_id = mongo.db.interviews.insert_one(interview_instance).inserted_id
    interview_data = mongo.db.interviews.find_one({"_id": ObjectId(inserted_id)})
    interview = Interview(interview_data)

    return jsonify({
        "message": "Conversation initialized and credits updated",
        "interview_id": str(interview.get_interview_id()),
        "prompt": bot_prompt
    })


@interview.route('/results', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def results():
    data = request.json

    if not data or 'interview_id' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    interview_id = data['interview_id']
    interview_data = mongo.db.interviews.find_one({"_id": ObjectId(interview_id)})

    if not interview_data:
        return jsonify({"error": "Interview not found"}), 404

    return jsonify({
        "result": interview_data.get("result"),
        "scores": interview_data.get("scores")
    })

@interview.route('/scores', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def scores():
    data = request.json

    if not data or 'user_id' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    user_id = data['user_id']
    interviews = mongo.db.interviews.find({"user_id": user_id})
    results = []

    for interview in interviews:
        if 'scores' in interview:
            results.append({
                "id": str(interview['_id']),
                "scores": interview['scores']
            })
    return jsonify({"scores": results})

@interview.route('/analysis', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
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

    scores = {
        'communication_skills': 0,
        'problem_solving_ability': 0,
        'technical_knowledge': 0,
        'engagement_and_interaction': 0,
        'overall_evaluation': 0
    }
    
    date = re.findall('\d{2}', formatted_response)
    for i in range(0, len(date)):
        date[i] = int(date[i])
    
    keys = list(scores.keys())

    for i, key in enumerate(keys):
        if 2 * i < len(date): 
            scores[key] = date[2 * i]

    result = mongo.db.interviews.find_one_and_update(
        {"_id": ObjectId(interview_id)}, 
        {"$set": {"result": formatted_response, "scores": scores}}
    )

    if not result:
        return jsonify({"error": "Interview not found or update failed"}), 404
    return jsonify({"response": formatted_response})

def format_response_text(text):
    text = text.replace('\n', '<br>')
    text = text.replace('## ', '<h2>').replace('**Final Evaluation Score:**', '</h2><strong>Final Evaluation Score:</strong>')
    text = text.replace('**', '<strong>').replace('</h2><strong>Final Evaluation Score:</strong>', '<h2>Final Evaluation Score:</h2><strong>')
    text = text.replace('* ', '<li>').replace('<br><li>', '<br><ul><li>').replace('<br>**Score:', '</li></ul><br>**Score:')
    text = text.replace('<br>**Overall Evaluation:**', '</li></ul><br><strong>Overall Evaluation:</strong>')
    return text

promo_codes = [
    'ZKBB5WGNMZ', 'A0T57JLWZV', 'X5B0KKJ4KW', 'RG1VRZXGL4', 'PTO1YNON6L', 
    'XVVRM17OF7', 'R9PMYSVDGF', 'NQ7KABX61G', '10GGXWWQ2E', '10UW23W9HE', 
    'FYMM1BKHJD', 'G86M7LHAKS', 'IMV83XYI0X', 'N9QK2J99SC', '3GOZ8IS6UY'
]

@interview.route('/apply_promo', methods=['POST'])
def apply_promo():
    data = request.get_json()
    promo_code = data.get('promo_code')
    user_id = data.get('user_id')

    if promo_code in promo_codes:
        promo_codes.remove(promo_code)
        result = mongo.db.users.find_one_and_update(
            {"_id": ObjectId(user_id)},  
            {"$set": {"credits": "Unlimited"}}
        )
        if result:
            return jsonify({"message": "Promo applied successfully!"}), 200
        else:
            return jsonify({"message": "User not found or update failed"}), 404
    else:
        return jsonify({"message": "Promo code not valid"}), 400