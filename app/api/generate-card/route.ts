import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that generates shareable legal rights cards for CitizenShield. Create concise, accurate, and shareable content about legal rights during police interactions. Include relevant rights, dos and don\'ts, and make it social media friendly with appropriate hashtags.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || 'Failed to generate content';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error generating card:', error);
    return NextResponse.json(
      { error: 'Failed to generate card' },
      { status: 500 }
    );
  }
}
