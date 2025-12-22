<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

const chatStore = useChatStore()
const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Watch for new messages to auto-scroll
watch(
  () => chatStore.messages.length,
  () => scrollToBottom(),
)

const handleSend = async (text: string) => {
  await chatStore.sendMessage(text)
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
      <ChatMessage
        v-for="msg in chatStore.messages"
        :key="msg.id"
        :role="msg.role === 'assistant' ? 'ai' : 'user'"
        :content="msg.content"
        :redirect="msg.redirect"
      />
      <!-- Loading indicator -->
      <div v-if="chatStore.isLoading" class="flex items-center gap-2 text-text-dim text-sm py-2">
        <div class="flex gap-1">
          <span
            class="w-2 h-2 bg-accent rounded-full animate-bounce"
            style="animation-delay: 0ms"
          ></span>
          <span
            class="w-2 h-2 bg-accent rounded-full animate-bounce"
            style="animation-delay: 150ms"
          ></span>
          <span
            class="w-2 h-2 bg-accent rounded-full animate-bounce"
            style="animation-delay: 300ms"
          ></span>
        </div>
        <span>Thinking...</span>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 pt-2">
      <ChatInput @send="handleSend" :disabled="chatStore.isLoading" />
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
