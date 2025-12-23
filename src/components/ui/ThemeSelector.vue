<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SwatchIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  ComputerDesktopIcon,
  BoltIcon,
  CloudIcon,
} from '@heroicons/vue/24/outline'
import { useTheme, type Theme } from '@/composables/useTheme'

const { theme, themes, setTheme } = useTheme()
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectTheme = (newTheme: Theme) => {
  setTheme(newTheme)
  isOpen.value = false
}

// Close dropdown when clicking outside
const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.theme-selector')) {
    isOpen.value = false
  }
}

// Global listener for click outside (could be optimized with a composable, but simple here)
if (typeof window !== 'undefined') {
  window.addEventListener('click', closeDropdown)
}

const currentThemeLabel = computed(() => {
  return themes.find((t) => t.value === theme.value)?.label || 'Theme'
})

const getThemeIcon = (themeValue: Theme) => {
  switch (themeValue) {
    case 'light':
      return SunIcon
    case 'forest':
      return SparklesIcon
    case 'cyberpunk':
      return BoltIcon
    case 'coffee':
      return ComputerDesktopIcon // Just a placeholder, maybe a better one exists but sticking to basics
    case 'winter':
      return CloudIcon
    case 'vscode':
    default:
      return MoonIcon
  }
}
</script>

<template>
  <div class="theme-selector relative" v-if="isOpen || true">
    <button
      @click.stop="toggleDropdown"
      class="flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors cursor-pointer w-full justify-between"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <div class="flex items-center gap-2">
        <SwatchIcon class="h-4 w-4 text-[var(--color-accent)]" />
        <span>{{ currentThemeLabel }}</span>
      </div>
      <ChevronDownIcon
        class="h-4 w-4 text-[var(--color-text-secondary)] transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute left-0 bottom-full mb-2 w-full origin-bottom rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-xl ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden"
      >
        <div class="py-1 max-h-60 overflow-y-auto">
          <button
            v-for="option in themes"
            :key="option.value"
            @click="selectTheme(option.value)"
            class="flex w-full items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors text-left"
            :class="{
              'bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] font-medium':
                theme === option.value,
            }"
          >
            <component :is="getThemeIcon(option.value)" class="h-4 w-4" />
            {{ option.label }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Scoped styles if needed, but using utilities mostly */
</style>
