<script setup lang="ts">
interface Branch {
  title: string
  icon?: string
}

const { branches, centerTitle } = defineProps<{
  branches: Branch[]
  centerTitle?: string
}>()
</script>

<template>
  <div class="my-8 flex flex-col items-center py-8">
    <!-- Top branches spreading out -->
    <div class="flex w-full max-w-3xl justify-center gap-4">
      <div
        v-for="(branch, index) in branches"
        :key="index"
        class="group flex flex-1 flex-col items-center"
      >
        <div
          class="rounded-xl border border-border bg-gradient-to-br from-bg-secondary to-bg-tertiary p-4 text-center shadow-lg transition-all hover:border-accent/50 hover:shadow-accent/10"
        >
          <span v-if="branch.icon" class="mb-2 block text-2xl">{{ branch.icon }}</span>
          <span class="text-sm font-medium text-text-primary">{{ branch.title }}</span>
        </div>
        <!-- Connecting line down -->
        <div class="h-8 w-0.5 bg-gradient-to-b from-border to-accent/50" />
      </div>
    </div>

    <!-- Horizontal connector -->
    <div class="relative w-full max-w-3xl">
      <div class="h-0.5 w-full bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
      <!-- Downward arrow from center -->
      <div class="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
        <div class="h-8 w-0.5 bg-accent" />
        <svg
          class="h-6 w-6 -mt-1 text-accent animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>

    <!-- Center convergence point -->
    <div
      class="mt-8 rounded-2xl border-2 border-accent bg-gradient-to-br from-accent/20 to-accent/5 px-8 py-4 shadow-xl shadow-accent/20"
    >
      <span class="font-bold text-accent">{{ centerTitle }}</span>
    </div>
  </div>
</template>
