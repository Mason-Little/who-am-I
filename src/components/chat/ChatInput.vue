<script setup lang="ts">
import { ref } from 'vue'
import DevButton from '@/components/ui/DevButton.vue'
import DevInput from '@/components/ui/DevInput.vue'

const emit = defineEmits(['send'])

const input = ref('')
const showTagMenu = ref(false)

// We need to capture the input event for the tag logic
const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  const val = target.value

  if (val.endsWith('@')) {
    showTagMenu.value = true
  } else if (val.endsWith(' ')) {
    showTagMenu.value = false
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    if (!input.value.trim()) return
    emit('send', input.value)
    input.value = ''
    showTagMenu.value = false
  }
}

const insertTag = (file: string) => {
  input.value += file + ' '
  showTagMenu.value = false
  // Focus handling might need improvement if we can't access ref directly easily,
  // but for now we skip ref focus on insert for simplicity or rely on user clicking.
}

const handleSend = (text: string) => {
  emit('send', text)
  input.value = ''
  showTagMenu.value = false
}

const mockFiles = ['App.vue', 'HomeView.vue', 'main.ts', 'AboutView.vue']
</script>

<template>
  <div class="relative w-full">
    <!-- Mock Tag Menu -->
    <div
      v-if="showTagMenu"
      class="absolute bottom-full left-0 mb-2 w-48 bg-bg-secondary border border-border rounded-md shadow-lg overflow-hidden z-10"
    >
      <div class="text-xs text-text-dim px-2 py-1 bg-bg-primary border-b border-border">
        Suggested files
      </div>
      <button
        v-for="file in mockFiles"
        :key="file"
        class="block w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-accent hover:text-bg-primary"
        @click="insertTag(file)"
      >
        {{ file }}
      </button>
    </div>

    <!-- Input Area -->
    <div class="flex flex-col gap-2">
      <DevInput
        v-model="input"
        as="textarea"
        rows="1"
        placeholder="Ask anything... (Type '@' to tag)"
        @input="handleInput"
        @keydown="handleKeyDown"
      />

      <div class="flex justify-between items-center px-1">
        <div class="text-[10px] text-text-dim">⏎ to send, ⇧ ⏎ for new line</div>
        <DevButton size="sm" variant="ghost" @click="handleSend(input)" :disabled="!input.trim()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </DevButton>
      </div>
    </div>
  </div>
</template>
