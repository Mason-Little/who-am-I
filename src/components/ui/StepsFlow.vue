<script setup lang="ts">
interface Step {
  number: number
  title: string
  description: string
}

const { steps } = defineProps<{
  steps: Step[]
}>()
</script>

<template>
  <div class="relative my-8">
    <!-- Connection line -->
    <div
      class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-accent opacity-30"
    />

    <div class="space-y-6">
      <div
        v-for="step in steps"
        :key="step.number"
        class="group relative flex items-start gap-4 pl-0"
      >
        <!-- Step indicator -->
        <div
          class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/50 bg-bg-secondary text-accent font-bold shadow-lg shadow-accent/10 transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-bg-primary"
        >
          {{ step.number }}
        </div>

        <!-- Step content -->
        <div
          class="flex-1 rounded-xl border border-border bg-bg-secondary/50 p-4 transition-all group-hover:border-accent/30 group-hover:bg-bg-secondary"
        >
          <h4 class="font-semibold text-text-primary">{{ step.title }}</h4>
          <p class="mt-1 text-sm text-text-secondary">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
