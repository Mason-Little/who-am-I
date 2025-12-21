<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { processCommand, type TerminalLine } from '@/helpers/terminal'

const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)
const terminalOutputRef = ref<HTMLElement | null>(null)
const currentInput = ref('')
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)

const history = reactive<TerminalLine[]>([
  { type: 'output', content: 'Welcome to Mason OS v1.0.0' },
  { type: 'output', content: 'Type "help" for available commands.' },
])

// Command Logic
const handleCommand = async () => {
  const cmd = currentInput.value.trim()
  if (!cmd) return

  // Add to display history
  history.push({ type: 'command', content: cmd })

  // Add to input history
  commandHistory.value.push(cmd)
  historyIndex.value = -1

  // Process command
  const result = processCommand(cmd, router)

  if (result.action === 'clear') {
    history.splice(0, history.length)
  }

  if (result.lines.length > 0) {
    history.push(...result.lines)
  }

  currentInput.value = ''

  // Scroll to bottom
  await nextTick()
  if (terminalOutputRef.value) {
    terminalOutputRef.value.scrollTop = terminalOutputRef.value.scrollHeight
  }
}

const navigateHistory = (direction: number) => {
  if (commandHistory.value.length === 0) return

  if (historyIndex.value === -1) {
    historyIndex.value = commandHistory.value.length
  }

  historyIndex.value += direction

  if (historyIndex.value >= commandHistory.value.length) {
    historyIndex.value = commandHistory.value.length
    currentInput.value = ''
    return
  }

  if (historyIndex.value < 0) historyIndex.value = 0

  const navCommand = commandHistory.value[historyIndex.value]
  if (navCommand !== undefined) {
    currentInput.value = navCommand
  }
}

const focusInput = () => {
  inputRef.value?.focus()
}

// Auto-type effect
const autoTypeCommand = async (cmd: string) => {
  // Simulate typing
  currentInput.value = ''
  for (let i = 0; i < cmd.length; i++) {
    currentInput.value += cmd[i]
    await new Promise((r) => setTimeout(r, 100 + Math.random() * 50)) // typing speed
  }
  await new Promise((r) => setTimeout(r, 400)) // delay before enter
  await handleCommand()
}

onMounted(() => {
  focusInput()
  setTimeout(() => {
    autoTypeCommand('help')
  }, 1500)
})
</script>

<template>
  <div
    class="flex flex-col h-full bg-bg-secondary border-t border-border font-mono text-xs overflow-hidden"
  >
    <!-- Terminal Header (Tabs) -->
    <div
      class="flex items-center text-text-secondary px-4 py-2 border-b border-border text-xs uppercase tracking-wider select-none"
    >
      <span
        class="mr-4 hover:text-text-primary cursor-pointer border-b border-transparent hover:border-text-primary transition-colors"
        >Problems</span
      >
      <span
        class="mr-4 hover:text-text-primary cursor-pointer border-b border-transparent hover:border-text-primary transition-colors"
        >Output</span
      >
      <span class="text-text-primary border-b border-text-primary cursor-pointer">Terminal</span>
      <span
        class="mr-4 hover:text-text-primary cursor-pointer border-b border-transparent hover:border-text-primary transition-colors ml-4"
        >Debug Console</span
      >
    </div>

    <!-- Terminal Content -->
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
          @keydown.up.prevent="navigateHistory(-1)"
          @keydown.down.prevent="navigateHistory(1)"
          type="text"
          class="flex-grow bg-transparent border-none outline-none text-text-primary font-mono caret-accent"
          autofocus
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Custom Scrollbar for Terminal */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg-secondary);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-dim);
}
</style>
