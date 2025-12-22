<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'
import { useTerminalStore } from '@/stores/terminal'
import { storeToRefs } from 'pinia'

const terminalStore = useTerminalStore()
const { history, currentInput, hasAutoTyped } = storeToRefs(terminalStore)

const inputRef = ref<HTMLInputElement | null>(null)
const terminalOutputRef = ref<HTMLElement | null>(null)

const handleCommand = async () => {
  terminalStore.executeCommand(currentInput.value)
  await scrollToBottom()
}

const handleKeyUp = () => terminalStore.navigateHistory(-1)
const handleKeyDown = () => terminalStore.navigateHistory(1)

const focusInput = () => {
  inputRef.value?.focus()
}

const scrollToBottom = async () => {
  await nextTick()
  if (terminalOutputRef.value) {
    terminalOutputRef.value.scrollTop = terminalOutputRef.value.scrollHeight
  }
}

const autoTypeCommand = async (cmd: string) => {
  terminalStore.setInput('')
  for (let i = 0; i < cmd.length; i++) {
    terminalStore.setInput(currentInput.value + cmd[i])
    await new Promise((r) => setTimeout(r, 100 + Math.random() * 50))
  }
  await new Promise((r) => setTimeout(r, 400))
  await handleCommand()
}

// Scroll to bottom when history changes
watch(history, scrollToBottom, { deep: true })

onMounted(() => {
  focusInput()
  if (!hasAutoTyped.value) {
    hasAutoTyped.value = true
    setTimeout(() => {
      autoTypeCommand('help')
    }, 1500)
  }
})
</script>

<template>
  <div class="flex-grow p-4 overflow-y-auto" ref="terminalOutputRef" @click="focusInput">
    <div v-for="(line, index) in history" :key="index" class="mb-1">
      <div v-if="line.type === 'command'" class="flex">
        <span class="text-green-500 mr-2">➜</span>
        <span class="text-blue-400 mr-2">~</span>
        <span class="text-text-primary">{{ line.content }}</span>
      </div>
      <div v-else class="text-text-primary whitespace-pre-wrap pl-6">{{ line.content }}</div>
    </div>

    <!-- Input Line -->
    <div class="flex items-center">
      <span class="text-green-500 mr-2">➜</span>
      <span class="text-blue-400 mr-2">~</span>
      <input
        ref="inputRef"
        v-model="currentInput"
        @keydown.enter="handleCommand"
        @keydown.up.prevent="handleKeyUp"
        @keydown.down.prevent="handleKeyDown"
        type="text"
        class="flex-grow bg-transparent border-none outline-none text-text-primary font-mono caret-accent"
        autofocus
      />
    </div>
  </div>
</template>
