<script setup lang="ts">
const { title, subtitle, icon } = defineProps<{
  title: string
  subtitle?: string
  icon?: string
}>()
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-bg-secondary to-bg-tertiary p-6 shadow-lg"
  >
    <!-- Glow effect -->
    <div class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

    <div class="relative flex items-start gap-4">
      <div
        v-if="icon"
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-2xl"
      >
        {{ icon }}
      </div>
      <div>
        <h4 class="text-lg font-semibold text-text-primary">{{ title }}</h4>
        <p v-if="subtitle" class="mt-1 text-sm text-text-secondary">{{ subtitle }}</p>
        <div class="mt-3 text-sm text-text-secondary">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
