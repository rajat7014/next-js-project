import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';


const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
})
// Allow streaming responses up to 30 seconds
export const runtime = 'edge';

export async function POST(req: Request) {
  try {

    const { messages } = await req.json();
  
    const response = await openai.chat.completions.create({
      model: ('gpt-4-turbo-instruct'),
      max_tokens: 2000,
      stream: true,
      messages,
      
    });
  
    const stream = OpenAIStream(response)
  
    return new StreamingTextResponse(stream);
  } catch (error) {
    
    if (error instanceof OpenAI.APIError) {
      const {name,status,headers,message} = error
      return NextResponse.json({
        name,status,headers,message
      },{ status: 500})
        
    } else {
        console.error('An unexpected error occured',error)
        throw error
    }
  }
}