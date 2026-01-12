import { createGroq } from '@ai-sdk/groq'
import { generateObject, type ModelMessage } from 'ai'
import { viewRouteAgentPrompt } from '../src/configs/view-route-prompt.js'
import { routeSchema } from '../src/configs/route-data.js'

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
    const { messages } = (await req.json()) as { messages: ModelMessage[] }

    const routeResponse = await generateObject({
      system: viewRouteAgentPrompt,
      model,
      messages,
      schema: routeSchema,
    })

    return new Response(JSON.stringify(routeResponse.object), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in identify-route:', error)
    return new Response(JSON.stringify({ error: 'Failed to identify route' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
