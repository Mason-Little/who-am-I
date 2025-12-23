import { ref, watch, onMounted } from 'vue'

export type Theme = 'vscode' | 'light' | 'forest' | 'cyberpunk' | 'coffee' | 'winter'

interface ThemeOption {
  value: Theme
  label: string
  icon?: string // Optional icon identifier if we want to add them later
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: 'vscode', label: 'VS Code' },
  { value: 'light', label: 'Light' },
  { value: 'forest', label: 'Forest' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'winter', label: 'Winter' },
]

const STORAGE_KEY = 'user-theme-preference'

// Global state
const currentTheme = ref<Theme>('vscode')

export function useTheme() {
  const applyTheme = (theme: Theme) => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Remove all existing theme classes
    THEME_OPTIONS.forEach(option => {
      root.classList.remove(`theme-${option.value}`)
    })

    // Add new theme class (except for default which uses root vars)
    if (theme !== 'vscode') {
      root.classList.add(`theme-${theme}`)
    }
  }

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }

  // Initialize
  onMounted(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme
    if (savedTheme && THEME_OPTIONS.some(t => t.value === savedTheme)) {
      currentTheme.value = savedTheme
    } else {
      // Default fallback
      currentTheme.value = 'vscode'
    }
  })

  // Watch for changes and apply
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })

  return {
    theme: currentTheme,
    themes: THEME_OPTIONS,
    setTheme
  }
}
