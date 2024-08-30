import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req) {
  try {
    const { systemPrompt, messages } = await req.json();

    if (!systemPrompt) {
      return NextResponse.json({ message: "prompt is required." }, { status: 400 });
    }

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
