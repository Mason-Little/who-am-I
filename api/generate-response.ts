import { createGroq } from '@ai-sdk/groq'
import { generateObject, type ModelMessage } from 'ai'
import { aboutMePrompt, responseSchema } from '../src/configs/about-me-prompt.js'

export const config = {
  runtime: 'edge',
}

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

const model = groq('openai/gpt-oss-120b')

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { messages, pageContent } = (await req.json()) as {
      messages: ModelMessage[]
      pageContent: string
    }

    const response = await generateObject({
      system: aboutMePrompt(pageContent),
      model,
      messages,
      schema: responseSchema,
    })

    return new Response(JSON.stringify(response.object), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in generate-response:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
