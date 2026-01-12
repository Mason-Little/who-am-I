<script setup lang="ts">
interface Box {
  id: string
  title: string
  subtitle?: string
  icon?: string
  items?: string[]
}

interface Connection {
  from: string
  to: string
  label?: string
}

const { boxes, layout = 'vertical' } = defineProps<{
  boxes: Box[]
  connections?: Connection[]
  layout?: 'vertical' | 'horizontal'
}>()
</script>

<template>
  <div class="my-8 overflow-x-auto">
    <div
      class="flex min-w-max gap-4 p-4"
      :class="
        layout === 'vertical' ? 'flex-col items-center' : 'flex-row items-start justify-center'
      "
    >
      <template v-for="(box, index) in boxes" :key="box.id">
        <!-- Box -->
        <div
          class="group relative w-full max-w-md rounded-2xl border border-border bg-gradient-to-br from-bg-secondary to-bg-tertiary p-5 shadow-xl transition-all duration-300 hover:border-accent/50 hover:shadow-accent/10"
        >
          <!-- Glow effect on hover -->
          <div
            class="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 transition-opacity group-hover:opacity-100"
          />

          <div class="relative">
            <!-- Header -->
            <div class="flex items-center gap-3">
              <span v-if="box.icon" class="text-2xl">{{ box.icon }}</span>
              <div>
                <h4 class="font-bold text-text-primary">{{ box.title }}</h4>
                <p v-if="box.subtitle" class="text-xs text-text-dim">{{ box.subtitle }}</p>
              </div>
            </div>

            <!-- Items -->
            <ul v-if="box.items?.length" class="mt-4 space-y-2">
              <li
                v-for="(item, i) in box.items"
                :key="i"
                class="flex items-center gap-2 text-sm text-text-secondary"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-accent" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Arrow connector -->
        <div
          v-if="index < boxes.length - 1"
          class="flex items-center justify-center text-accent"
          :class="layout === 'vertical' ? 'py-2' : 'px-2'"
        >
          <svg
            v-if="layout === 'vertical'"
            class="h-8 w-8 animate-pulse"
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
          <svg
            v-else
            class="h-8 w-8 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </template>
    </div>
  </div>
</template>
