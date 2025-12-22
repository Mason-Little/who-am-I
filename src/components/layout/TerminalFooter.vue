<script setup lang="ts">
import { ref } from 'vue'

import ProblemsPanel from './footer/ProblemsPanel.vue'
import OutputPanel from './footer/OutputPanel.vue'
import DebugPanel from './footer/DebugPanel.vue'
import TerminalPanel from './footer/TerminalPanel.vue'

type TabName = 'problems' | 'output' | 'terminal' | 'debug'
const activeTab = ref<TabName>('terminal')
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
        @click="activeTab = 'problems'"
        :class="[
          'mr-4 cursor-pointer border-b transition-colors',
          activeTab === 'problems'
            ? 'text-text-primary border-text-primary'
            : 'border-transparent hover:text-text-primary hover:border-text-primary',
        ]"
        >Problems
        <span class="text-red-400 text-[10px]">(5)</span>
      </span>
      <span
        @click="activeTab = 'output'"
        :class="[
          'mr-4 cursor-pointer border-b transition-colors',
          activeTab === 'output'
            ? 'text-text-primary border-text-primary'
            : 'border-transparent hover:text-text-primary hover:border-text-primary',
        ]"
        >Output</span
      >
      <span
        @click="activeTab = 'terminal'"
        :class="[
          'cursor-pointer border-b transition-colors',
          activeTab === 'terminal'
            ? 'text-text-primary border-text-primary'
            : 'border-transparent hover:text-text-primary hover:border-text-primary',
        ]"
        >Terminal</span
      >
      <span
        @click="activeTab = 'debug'"
        :class="[
          'ml-4 cursor-pointer border-b transition-colors',
          activeTab === 'debug'
            ? 'text-text-primary border-text-primary'
            : 'border-transparent hover:text-text-primary hover:border-text-primary',
        ]"
        >Debug Console</span
      >
    </div>

    <!-- Panel Content -->
    <ProblemsPanel v-if="activeTab === 'problems'" />
    <OutputPanel v-if="activeTab === 'output'" />
    <TerminalPanel v-if="activeTab === 'terminal'" />
    <DebugPanel v-if="activeTab === 'debug'" />
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
