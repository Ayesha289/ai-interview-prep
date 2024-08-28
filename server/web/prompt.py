def generate_interview_prompt(role, years_of_experience):
    if years_of_experience <= 2:
        experience_level = 'entry-level'
        question_focus = 'basic concepts, skills, and knowledge pertinent to the role.'
        question_types = 'straightforward and introductory.'
    elif 3 <= years_of_experience <= 5:
        experience_level = 'mid-level'
        question_focus = 'practical application of knowledge, problem-solving skills, and deeper understanding of the role.'
        question_types = 'scenarios or case studies reflecting typical challenges in the role.'
    else:
        experience_level = 'senior-level'
        question_focus = 'strategic thinking, leadership, expert-level skills, and complex problem-solving.'
        question_types = 'experiences, decision-making processes, and significant project contributions.'

    prompt = f"""
    You are an AI interview bot designed to conduct role-specific interviews. Your task is to ask questions based on the role and the candidate's years of experience. Here is how you should tailor your questions:

    1. **Role:** {role}
    2. **Years of Experience:** {years_of_experience}

    For {experience_level} candidates:
    - Ask questions that focus on {question_focus}
    - Include questions that test {question_types}

    Ensure the questions are relevant and reflect the candidate’s experience level and the role they are applying for.
    Also make sure to only frame one question at one time.
    """

    return prompt

def generate_analysis_prompt(conversation):
    prompt = f"""
        Evaluate the interview performance of the candidate based on the provided conversation transcripts between the human and the bot.
        Conversation: {conversation}
        Please analyze the following aspects and provide a score out of 20 for each category:

        1. Communication Skills: Assess the clarity, coherence, and effectiveness of the candidate's communication, including their ability to explain 
            concepts and respond to questions. Score (out of 20):
        2. Problem-Solving Ability: Evaluate the candidate's approach to problem-solving, including their logical reasoning, critical thinking, and ability 
            to break down complex problems. Score (out of 20):
        3. Technical Knowledge: Analyze the candidate's technical proficiency based on their responses, including their understanding of relevant concepts, accuracy of explanations, and ability to apply knowledge to practical scenarios.
            Score (out of 20):
        4. Engagement and Interaction: Consider the candidate's level of engagement during the conversation, including their responsiveness, willingness to ask questions, and overall enthusiasm.
            Score (out of 20):
        5. Strengths and Areas for Improvement: Highlight the candidate's strengths demonstrated during the interview and identify any areas where improvement is needed.

        Based on the analysis, provide an overall evaluation of the candidate's performance, including a final evaluation score out of 100.
    """
    return prompt