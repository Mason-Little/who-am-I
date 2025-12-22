<script setup lang="ts">
const { title, subtitle } = defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-4xl font-bold text-text-primary tracking-tight"># {{ title }}</h1>
    <p
      v-if="subtitle"
      class="text-xl text-text-secondary leading-relaxed border-l-4 border-accent pl-4 italic"
    >
      &gt; {{ subtitle }}
    </p>
  </section>
</template>
