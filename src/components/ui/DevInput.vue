<script setup lang="ts">
defineProps<{
  modelValue: string
  as?: 'input' | 'textarea'
  placeholder?: string
  rows?: number | string
}>()

const emit = defineEmits(['update:modelValue', 'keydown', 'input'])

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', e)
}

const inputClasses =
  'w-full bg-bg-secondary border border-border rounded-lg p-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-text-dim'
</script>

<template>
  <textarea
    v-if="as === 'textarea'"
    :value="modelValue"
    :rows="rows || 3"
    :class="[inputClasses, 'resize-none']"
    :placeholder="placeholder"
    @input="handleInput"
    @keydown="$emit('keydown', $event)"
  ></textarea>
  <input
    v-else
    type="text"
    :value="modelValue"
    :class="inputClasses"
    :placeholder="placeholder"
    @input="handleInput"
    @keydown="$emit('keydown', $event)"
  />
</template>
