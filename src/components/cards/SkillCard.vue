<script setup lang="ts">
const { category, skills } = defineProps<{
  category: string
  skills: string[]
}>()
</script>

<template>
  <div
    class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
  >
    <h3
      class="text-lg font-medium text-text-primary mb-4 capitalize group-hover:text-accent transition-colors"
    >
      {{ category }}
    </h3>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="skill in skills"
        :key="skill"
        class="px-3 py-1 text-sm rounded bg-surface-primary text-text-secondary border border-border group-hover:border-accent/30 transition-colors"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>
