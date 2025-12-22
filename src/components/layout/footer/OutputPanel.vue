<script setup lang="ts">
const outputLines = [
  '[09:00:01] Starting workday...',
  '[09:00:02] Loading caffeine dependencies... done.',
  '[09:15:03] Stood up from desk. Legs confirmed functional.',
  '[11:30:04] Refactored function. It was already fine. Worth it.',
  '[14:00:05] Pushed to main. Immediately opened PR to fix typo.',
  '[16:45:06] Closed 47 browser tabs. Opened 48 new ones.',
  '[17:00:07] Build succeeded. Mass refreshing prod to be sure.',
  '[17:01:08] Still refreshing. You can never be too sure.',
]
</script>

<template>
  <div class="flex-grow p-4 overflow-y-auto">
    <div v-for="(line, index) in outputLines" :key="index" class="mb-1">
      <span class="text-text-dim">{{ line }}</span>
    </div>
  </div>
</template>
