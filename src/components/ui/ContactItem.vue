<script setup lang="ts">
const { href, label, value } = defineProps<{
  href?: string
  label: string
  value: string
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    class="flex items-center gap-4 p-4 rounded-lg bg-surface-primary border border-border transition-colors group"
    :class="href ? 'hover:border-accent/50 hover:text-accent' : ''"
  >
    <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
      <slot name="icon"></slot>
    </div>
    <div>
      <p class="text-xs text-text-dim uppercase tracking-wider mb-1">{{ label }}</p>
      <p class="text-text-primary group-hover:text-accent transition-colors">
        {{ value }}
      </p>
    </div>
  </component>
</template>
