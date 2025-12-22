<script setup lang="ts">
import type { OutlineSection } from './PageOutline.vue'
import PageOutline from './PageOutline.vue'

const { sections } = defineProps<{
  sections?: OutlineSection[]
}>()
</script>

<template>
  <div class="px-6 py-8 relative">
    <div class="max-w-7xl mx-auto flex gap-12 items-start">
      <!-- Main Content -->
      <div class="flex-1 min-w-0 space-y-15 animate-fade-in pb-20">
        <slot />
      </div>

      <!-- Optional Outline Sidebar -->
      <PageOutline v-if="sections?.length" :sections="sections" />
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
