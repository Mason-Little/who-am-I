<script setup lang="ts">
const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'icon'
}>()

const emit = defineEmits(['click'])

const variantClasses = {
  primary: 'bg-accent text-bg-primary hover:bg-opacity-90',
  secondary: 'bg-bg-secondary text-text-primary hover:bg-opacity-80',
  ghost: 'bg-transparent text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
}

const sizeClasses = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  icon: 'p-2',
}
</script>

<template>
  <button
    class="rounded-md transition-colors duration-200 flex items-center justify-center font-medium focus:outline-none focus:ring-1 focus:ring-accent"
    :class="[variantClasses[props.variant || 'primary'], sizeClasses[props.size || 'md']]"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>
