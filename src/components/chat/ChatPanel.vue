<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'
import IconMaximize from '@/components/icons/IconMaximize.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import { useLayout } from '@/composables/useLayout'

const chatStore = useChatStore()
const messagesContainer = ref<HTMLElement | null>(null)
const { toggleFullScreenChat, toggleMinimizeChat, isMobile } = useLayout()

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
  <div class="h-full flex flex-col bg-bg-primary border-l border-border shrink-0">
    <!-- Header -->
    <div class="h-10 border-b border-border flex items-center px-4 justify-between select-none">
      <span class="text-xs font-bold text-text-primary uppercase tracking-wider">Chat</span>
      <div class="flex gap-5">
        <button
          v-if="!isMobile"
          @click="toggleFullScreenChat"
          class="hover:text-accent transition-colors"
        >
          <IconMaximize />
        </button>
        <button @click="toggleMinimizeChat" class="hover:text-accent transition-colors">
          <IconChevronRight class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Messages Area -->
    <div ref="messagesContainer" class="flex-grow overflow-y-auto p-4 custom-scrollbar">
      <ChatMessage
        v-for="msg in chatStore.messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :page="msg.page"
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
        <span>Looking through pages...</span>
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
