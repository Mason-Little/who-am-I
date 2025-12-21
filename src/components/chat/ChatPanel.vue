<script setup lang="ts">
import { ref, nextTick } from 'vue'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

interface Message {
  id: number
  role: 'user' | 'ai'
  content: string
}

const messages = ref<Message[]>([
  {
    id: 1,
    role: 'ai',
    content:
      "Hi, I'm Antigravity (not really). using the new cursor feature you added. How can I help you regarding this repo?",
  },
])

const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleSend = (text: string) => {
  // Add user message
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: text,
  })
  scrollToBottom()

  // Mock AI response
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content:
        'I see you are talking about ' +
        (text.includes('@') ? 'a specific file.' : 'something.') +
        ' That is interesting! This is a mock response.',
    })
    scrollToBottom()
  }, 1000)
}
</script>

<template>
  <div class="h-full flex flex-col bg-bg-primary border-l border-border w-80 shrink-0">
    <!-- Header -->
    <div class="h-10 border-b border-border flex items-center px-4 justify-between select-none">
      <span class="text-xs font-bold text-text-primary uppercase tracking-wider">Chat</span>
      <div class="flex gap-2">
        <!-- Window Controls (fake) -->
        <div class="w-2 h-2 rounded-full bg-text-dim opacity-50"></div>
        <div class="w-2 h-2 rounded-full bg-text-dim opacity-50"></div>
      </div>
    </div>

    <!-- Messages Area -->
    <div ref="messagesContainer" class="flex-grow overflow-y-auto p-4 custom-scrollbar">
      <ChatMessage v-for="msg in messages" :key="msg.id" :role="msg.role" :content="msg.content" />
    </div>

    <!-- Input Area -->
    <div class="p-4 pt-2">
      <ChatInput @send="handleSend" />
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}
</style>
