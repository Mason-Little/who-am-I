<script setup lang="ts">
const { title, id } = defineProps<{
  title: string
  id?: string
}>()
</script>

<template>
  <h2
    :id="id"
    class="text-2xl font-semibold text-text-primary flex items-center gap-2 scroll-mt-20"
  >
    <span class="text-accent">##</span> {{ title }}
  </h2>
</template>
