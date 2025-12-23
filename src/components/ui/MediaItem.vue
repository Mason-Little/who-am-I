<script setup lang="ts">
import { PhotoIcon, FilmIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  type?: 'image' | 'video'
  label?: string
  src?: string
}>()
</script>

<template>
  <div class="w-full rounded-lg overflow-hidden border border-border bg-surface-secondary/30">
    <!-- Media Content -->
    <template v-if="src">
      <img
        v-if="type === 'image'"
        :src="src"
        :alt="label || 'Project Image'"
        class="w-full h-auto object-cover"
        loading="lazy"
      />
      <video v-else controls class="w-full h-auto block" :aria-label="label || 'Project Video'">
        <source :src="src" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <!-- Caption if label is provided with content -->
      <div v-if="label" class="p-3 bg-surface-secondary/50 border-t border-border">
        <p class="text-sm text-text-secondary text-center">{{ label }}</p>
      </div>
    </template>

    <!-- Placeholder State (shown when no src provided) -->
    <div
      v-else
      class="w-full aspect-video flex flex-col items-center justify-center text-text-dim gap-2 border-2 border-dashed border-transparent hover:border-accent/50 hover:text-accent transition-colors cursor-pointer group"
    >
      <PhotoIcon
        v-if="type === 'image'"
        class="w-8 h-8 group-hover:scale-110 transition-transform"
      />
      <FilmIcon v-else class="w-8 h-8 group-hover:scale-110 transition-transform" />
      <span class="text-sm font-medium">{{
        label || (type === 'image' ? 'Image Placeholder' : 'Video Placeholder')
      }}</span>
      <span class="text-xs opacity-75">Add {{ type }} to public/ and update src</span>
    </div>
  </div>
</template>
