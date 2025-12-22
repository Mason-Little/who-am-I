<script setup lang="ts">
import { useRouter } from 'vue-router'
import { routeConfigs, type PageName } from '@/configs/view-route-config'

const { role, content, page } = defineProps<{
  role: 'user' | 'assistant'
  content: string
  page?: PageName
}>()

const router = useRouter()

// Get route info from centralized config
const getPageInfo = (name: PageName) => {
  const config = routeConfigs.find((r) => r.name === name)
  return {
    label: config?.title ?? name,
    route: config?.path ?? '/',
  }
}

const handleRedirect = () => {
  if (page) {
    router.push(getPageInfo(page).route)
  }
}
</script>

<template>
  <div
    class="flex flex-col gap-1 p-4 rounded-lg text-sm mb-2"
    :class="
      role === 'user'
        ? 'bg-bg-secondary self-end mr-2 ml-8'
        : 'bg-transparent self-start mr-8 ml-2 border border-border'
    "
  >
    <div class="font-bold text-xs uppercase text-text-dim mb-1">
      {{ role === 'user' ? 'You' : 'Antigravity' }}
    </div>
    <div class="whitespace-pre-wrap leading-relaxed">
      {{ content }}
    </div>
    <!-- Redirect Button -->
    <button
      v-if="page"
      @click="handleRedirect"
      class="mt-3 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-accent/10 text-accent border border-accent/30 rounded-md hover:bg-accent/20 transition-colors self-start"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      Check out {{ getPageInfo(page).label }}
    </button>
  </div>
</template>
