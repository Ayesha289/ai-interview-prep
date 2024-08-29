import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb'; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

// MongoDB connection URI and client setup
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

const default_prompt = `
You are an interviewer conducting a job interview for a candidate. 
Proceed to ask a series of questions that assess the candidate's background, skills, experience, 
and cultural fit for the role. Be sure to ask follow-up questions to delve deeper into the 
candidate's responses. Conclude the interview by thanking the candidate for their time and 
informing them about the next steps in the hiring process. Keep the tone professional, friendly,
and open-ended to encourage detailed and thoughtful responses.

Example Interview Questions:

Tell me about yourself and your professional journey so far.
Can you discuss a challenging project you worked on? What was your role, and how did you handle the challenges?
How do you prioritize tasks when faced with multiple deadlines?
Describe a time when you had to work as part of a team. What role did you play, and what was the outcome?
What skills do you possess that make you a strong fit for this position?
How do you stay current with industry trends and advancements?
Can you give an example of a time when you had to adapt to a significant change at work? How did you handle it?
What are your long-term career goals, and how does this position align with them?
Do you have any questions for us about the role or the company?

Conclusion:

Thank you for sharing your experiences and insights with us today. We appreciate your 
time and look forward to reviewing your application. If you have any further questions or need additional information, please don’t 
hesitate to reach out. We will be in touch soon with the next steps.
`;

async function getSystemPrompt(id) {
  try {
    await client.connect();
    const database = client.db('interview-bot'); 
    const collection = database.collection('interviews'); 
    const options = {
        projection: { _id: id, prompt: 1 },
    };

    const document = await collection.findOne({}, options);
    const prompt = document.prompt;
    if(prompt)
      return prompt;
    else
      return default_prompt;
  } catch (error) {
    console.error('Error fetching system prompt:', error);
    return "Default system prompt due to error.";
  } finally {
    await client.close();
  }
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req) {
  try {
    const { interviewId, messages } = await req.json();  // Expect `interviewId` to be part of the request body
    
    if (!interviewId) {
      return NextResponse.json({ message: "Interview ID is required." }, { status: 400 });
    }

    const systemPrompt = await getSystemPrompt(interviewId);

    const generationConfig = {
      stopSequences: ["red"],
      maxOutputTokens: 500,
      temperature: 0.7,
      topP: 0.6,
      topK: 16,
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig,
      systemInstruction: systemPrompt,
    });

    const prompt = messages[messages.length - 1].content;

    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();  // Adjust this line based on actual API return structure

    return NextResponse.json({ message: generatedText }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
