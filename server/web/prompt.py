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
    Also make sure to only frame one question at one time. Then concmude the interview after 12 to 16 questions have been asked.
    """

    return prompt

def generate_analysis_prompt(conversation):
    prompt = f"""
        Conversation transcripts - {conversation}
        Based on the provided conversation transcripts between the candidate and 
        the bot, give strict personalized feedback directly to the candidate about their interview performance. 
        Use a conversational tone to make the feedback feel more engaging and constructive. 
        Focus on the following aspects and provide a score out of 100 for each category:

        Communication Skills: Strictly assess how clearly and effectively the candidate communicated 
        during the interview. Consider their ability to explain concepts, respond to questions, 
        and articulate their thoughts.
        Score (out of 100):
        Feedback: Offer specific observations on the candidate’s communication strengths and 
        areas where they could improve.

        Problem-Solving Ability: Strictly evaluate the candidate's approach to solving problems, including 
        their logical reasoning, critical thinking, and how well they broke down complex issues.
        Score (out of 100):
        Feedback: Provide feedback on the candidate’s problem-solving strategies, noting any 
        strong points and suggesting ways to enhance their approach.

        Technical Knowledge: Strictly analyze the candidate’s understanding of technical concepts and their 
        ability to apply knowledge to practical scenarios. Consider the accuracy and depth of their 
        explanations.
        Score (out of 100):
        Feedback: Comment on the candidate’s technical knowledge, highlighting areas where they 
        demonstrated proficiency and areas for improvement.

        Engagement and Interaction: Strictly consider the candidate’s engagement level during the interview, 
        including their responsiveness, enthusiasm, and willingness to ask relevant questions.
        Score (out of 100):
        
        Feedback: Discuss the candidate’s level of engagement and interaction, noting both 
        strengths and potential areas for increased involvement.
        Strengths and Areas for Improvement: Summarize the candidate’s overall strengths demonstrated 
        during the interview and identify specific areas where they can improve.

        Overall Evaluation: Provide a final evaluation score out of 100 based on the individual category scores.
        Conclude the feedback with an encouraging note, thanking the candidate for their effort and suggesting ways 
        they can continue to grow and improve based on the feedback provided.
    """
    return prompt