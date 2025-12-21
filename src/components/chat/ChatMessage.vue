<script setup lang="ts">
defineProps<{
  role: 'user' | 'ai'
  content: string
}>()
</script>

<template>
  <div
    class="flex flex-col gap-1 p-4 rounded-lg text-sm mb-2"
    :class="
      role === 'user'
        ? 'bg-bg-secondary self-end mr-2 ml-8'
        : 'bg-transparent self-start mr-8 ml-2 border border-border'
    "
  >
    <div class="font-bold text-xs uppercase text-text-dim mb-1">
      {{ role === 'user' ? 'You' : 'Antigravity' }}
    </div>
    <div class="whitespace-pre-wrap leading-relaxed">
      {{ content }}
    </div>
  </div>
</template>
