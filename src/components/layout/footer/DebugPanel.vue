<script setup lang="ts">
const variables = [
  { var: 'status', value: "'seeking new challenges'", type: 'string' },
  { var: 'email_response_time', value: '< 24', type: 'hours' },
  { var: 'writes_documentation', value: 'true', type: 'boolean' },
  { var: 'enjoys_code_review', value: 'true', type: 'boolean' },
  { var: 'tabs_vs_spaces', value: "'spaces'", type: 'correct_answer' },
  { var: 'git_commit_messages', value: "'descriptive'", type: 'string' },
  { var: 'can_center_a_div', value: 'true', type: 'boolean' },
  { var: 'reads_the_docs_first', value: "'...usually'", type: 'string' },
]
</script>

<template>
  <div class="flex-grow p-4 overflow-y-auto">
    <div class="text-text-secondary mb-2 text-[10px] uppercase tracking-wide">
      Variables (Developer Mental State)
    </div>
    <div v-for="(item, index) in variables" :key="index" class="mb-1 flex">
      <span class="text-purple-400 mr-2">{{ item.var }}:</span>
      <span class="text-orange-400 mr-2">{{ item.value }}</span>
      <span class="text-text-dim text-[10px]">({{ item.type }})</span>
    </div>
  </div>
</template>
