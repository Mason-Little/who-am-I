<script setup lang="ts">
const { url, name } = defineProps<{
  url: string
  name: string
}>()
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center gap-3 px-6 py-4 rounded-lg bg-surface-secondary/30 border border-border hover:border-accent/50 hover:text-accent transition-colors group"
  >
    <slot name="icon"></slot>
    <span class="font-medium text-text-primary group-hover:text-accent transition-colors">
      {{ name }}
    </span>
  </a>
</template>
