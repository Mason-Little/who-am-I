<script setup lang="ts">
const {
  yesLabel = 'Yes',
  noLabel = 'No',
  question,
  yesResult,
  noResult,
} = defineProps<{
  question: string
  yesLabel?: string
  noLabel?: string
  yesResult: string
  noResult: string
}>()
</script>

<template>
  <div class="my-8 flex flex-col items-center">
    <!-- Decision diamond -->
    <div class="relative">
      <div
        class="h-28 w-28 rotate-45 rounded-xl border-2 border-warning bg-gradient-to-br from-warning/20 to-warning/5 shadow-lg shadow-warning/20"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="max-w-20 text-center text-xs font-medium text-warning">{{ question }}</span>
      </div>
    </div>

    <!-- Branches -->
    <div class="mt-4 flex w-full max-w-md justify-between gap-8">
      <!-- Yes branch -->
      <div class="flex flex-1 flex-col items-center">
        <div class="mb-2 text-xs font-bold uppercase text-success">{{ yesLabel }}</div>
        <div class="h-8 w-0.5 bg-success/50" />
        <div
          class="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-center text-sm text-success"
        >
          {{ yesResult }}
        </div>
      </div>

      <!-- No branch -->
      <div class="flex flex-1 flex-col items-center">
        <div class="mb-2 text-xs font-bold uppercase text-error">{{ noLabel }}</div>
        <div class="h-8 w-0.5 bg-error/50" />
        <div
          class="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-center text-sm text-error"
        >
          {{ noResult }}
        </div>
      </div>
    </div>
  </div>
</template>
