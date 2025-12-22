<script setup lang="ts">
const problems = [
  { level: 'warning', message: 'PHONE_NUMBER_LEAKED', detail: '1-604-815-9764' },
  {
    level: 'warning',
    message: 'INBOX_ZERO_UNREACHABLE',
    detail: 'Unread emails exceed integer limit.',
  },
  {
    level: 'info',
    message: 'PROMPT_ENGINEERING',
    detail: 'Spent 2 hours on system prompt phrasing.',
  },
  { level: 'warning', message: 'CONTEXT_WINDOW_EXCEEDED', detail: 'Token count: yes.' },
  { level: 'error', message: 'WORK_LIFE_BALANCE', detail: 'Exception thrown at 2:47 AM.' },
]
</script>

<template>
  <div class="flex-grow p-4 overflow-y-auto">
    <div v-for="(problem, index) in problems" :key="index" class="mb-2 flex items-start">
      <span
        :class="[
          'mr-2 text-xs',
          problem.level === 'error'
            ? 'text-red-400'
            : problem.level === 'warning'
              ? 'text-yellow-400'
              : 'text-blue-400',
        ]"
      >
        {{ problem.level === 'error' ? '✖' : problem.level === 'warning' ? '⚠' : 'ℹ' }}
      </span>
      <div>
        <span class="text-text-primary font-semibold">{{ problem.message }}</span>
        <span class="text-text-secondary ml-2">{{ problem.detail }}</span>
      </div>
    </div>
  </div>
</template>
