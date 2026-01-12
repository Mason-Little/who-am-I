import type { ModelMessage } from 'ai'
import type { PageName } from '@/configs/route-data'
import { getPageText } from '@/helpers/pageContent'

export interface ChatResponse {
  text: string
  page: PageName
}

export const chat = async (messages: ModelMessage[]): Promise<ChatResponse> => {
  // Step 1: Route to find the right page via API
  const routeResponse = await fetch('/api/identify-route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  if (!routeResponse.ok) {
    throw new Error('Failed to identify route')
  }

  const { selectedPage } = (await routeResponse.json()) as { selectedPage: PageName }

  // Step 2: Get page content (still client-side)
  const pageContent = await getPageText(selectedPage)

  // Step 3: Generate response with page context via API
  const generateResponse = await fetch('/api/generate-response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, pageContent }),
  })

  if (!generateResponse.ok) {
    throw new Error('Failed to generate response')
  }

  const response = (await generateResponse.json()) as { response: string; notSure: boolean }

  if (response.notSure) {
    return { text: response.response, page: 'Contact' }
  }

  return { text: response.response, page: selectedPage }
}
