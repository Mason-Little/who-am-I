import { ref } from 'vue'
import { defineStore } from 'pinia'
import { chat } from '@/helpers/chat'
import type { PageName } from '@/configs/view-route-config'

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  page?: PageName
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        "Hey! I'm Mason's AI assistant. Ask me anything about his work, skills, or projects!",
    },
  ])

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const addUserMessage = (content: string) => {
    messages.value.push({
      id: Date.now(),
      role: 'user',
      content,
    })
  }

  const addAssistantMessage = (content: string, page?: PageName) => {
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content,
      page,
    })
  }

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return

    addUserMessage(userMessage)
    isLoading.value = true
    error.value = null

    try {
      const chatMessages = messages.value.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await chat(chatMessages)
      addAssistantMessage(response.text, response.page)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to get response'
      addAssistantMessage("Sorry, I couldn't process that request. Please try again.")
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = [
      {
        id: Date.now(),
        role: 'assistant',
        content:
          "Hey! I'm Mason's AI assistant. Ask me anything about his work, skills, or projects!",
      },
    ]
    error.value = null
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  }
})
