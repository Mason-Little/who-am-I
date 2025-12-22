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
</script>

<template>
  <article
    class="group relative bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
  >
    <!-- Accent glow effect on hover -->
    <div
      class="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    ></div>

    <div class="relative z-10 space-y-4">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <h3
          class="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors"
        >
          {{ title }}
        </h3>

        <!-- Action Links -->
        <div class="flex items-center gap-2 shrink-0">
          <a
            v-if="githubUrl"
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-md bg-surface-primary border border-border hover:border-accent/50 hover:text-accent transition-colors"
            title="View on GitHub"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
          </a>
          <a
            v-if="liveUrl"
            :href="liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-md bg-surface-primary border border-border hover:border-accent/50 hover:text-accent transition-colors"
            title="View Live"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <router-link
            v-if="routePath"
            :to="routePath"
            class="p-2 rounded-md bg-surface-primary border border-border hover:border-accent/50 hover:text-accent transition-colors"
            title="View Details"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
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
          class="px-2.5 py-1 text-xs rounded bg-surface-primary text-text-dim border border-border group-hover:border-accent/30 transition-colors"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>
