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
    """

    return prompt