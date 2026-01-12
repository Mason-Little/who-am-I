<script setup lang="ts">
const {
  value,
  label,
  color = 'accent',
} = defineProps<{
  value: string | number
  label: string
  color?: 'accent' | 'success' | 'warning' | 'error'
}>()

const colorClasses = {
  accent: 'from-accent/20 to-accent/5 border-accent/30 text-accent',
  success: 'from-success/20 to-success/5 border-success/30 text-success',
  warning: 'from-warning/20 to-warning/5 border-warning/30 text-warning',
  error: 'from-error/20 to-error/5 border-error/30 text-error',
}
</script>

<template>
  <div
    class="rounded-xl border bg-gradient-to-br p-4 text-center transition-transform hover:scale-105"
    :class="colorClasses[color]"
  >
    <div class="text-3xl font-bold">{{ value }}</div>
    <div class="mt-1 text-xs uppercase tracking-wide opacity-80">{{ label }}</div>
  </div>
</template>
