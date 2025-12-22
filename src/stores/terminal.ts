import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { processCommand, type TerminalLine } from '@/helpers/terminal'

export const useTerminalStore = defineStore('terminal', () => {
  const router = useRouter()

  const history = ref<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Mason OS v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands.' },
  ])

  const commandHistory = ref<string[]>([])
  const historyIndex = ref(-1)
  const currentInput = ref('')
  const hasAutoTyped = ref(false)

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return

    history.value.push({ type: 'command', content: cmd })
    commandHistory.value.push(cmd)
    historyIndex.value = -1

    const result = processCommand(cmd, router)

    if (result.action === 'clear') {
      history.value = []
    }

    if (result.lines.length > 0) {
      history.value.push(...result.lines)
    }

    currentInput.value = ''
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

  const setInput = (value: string) => {
    currentInput.value = value
  }

  const clearHistory = () => {
    history.value = []
  }

  return {
    history,
    commandHistory,
    historyIndex,
    currentInput,
    hasAutoTyped,
    executeCommand,
    navigateHistory,
    setInput,
    clearHistory,
  }
})
