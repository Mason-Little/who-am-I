<script setup lang="ts">
export interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  routePath?: string
}

const { title, description, tags, githubUrl, liveUrl, routePath } = defineProps<ProjectCardProps>()

import IconGitHub from '@/components/icons/IconGitHub.vue'
import IconExternalLink from '@/components/icons/IconExternalLink.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
</script>

<template>
  <article
    class="group relative isolate bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
  >
    <!-- Accent glow effect on hover -->
    <div
      class="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    ></div>

    <div class="space-y-4">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <h3
          class="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors"
        >
          <router-link
            v-if="routePath"
            :to="routePath"
            class="before:absolute before:inset-0 focus:outline-none"
          >
            {{ title }}
          </router-link>
          <span v-else>{{ title }}</span>
        </h3>

        <!-- Action Links -->
        <div class="relative z-10 flex items-center gap-2 shrink-0">
          <a
            v-if="githubUrl"
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-md bg-surface-primary border border-border hover:border-accent/50 hover:text-accent transition-colors"
            title="View on GitHub"
          >
            <IconGitHub class="w-4 h-4" />
          </a>
          <a
            v-if="liveUrl"
            :href="liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-md bg-surface-primary border border-border hover:border-accent/50 hover:text-accent transition-colors"
            title="View Live"
          >
            <IconExternalLink class="w-4 h-4" />
          </a>
          <router-link
            v-if="routePath"
            :to="routePath"
            class="p-2 rounded-md bg-surface-primary border border-border hover:border-accent/50 hover:text-accent transition-colors"
            title="View Details"
          >
            <IconChevronRight class="w-4 h-4" />
          </router-link>
        </div>
      </div>

      <!-- Description -->
      <p class="text-text-secondary leading-relaxed">
        {{ description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 pt-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="relative z-10 px-2.5 py-1 text-xs rounded bg-surface-primary text-text-dim border border-border group-hover:border-accent/30 transition-colors"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>
