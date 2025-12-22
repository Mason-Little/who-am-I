<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface Tab {
  path: string
  name: string
}

const openTabs = ref<Tab[]>([])

const getFileName = (path: string) => {
  if (path === '/') return 'home.tsx'
  if (path === '/about') return 'about.ts'
  if (path.includes('software')) return 'software.tsx'
  if (path.includes('volvo')) return 'volvo_240.log'
  if (path.includes('blog')) return 'README.md'
  return 'unknown'
}

const isActive = (path: string) => route.path === path

const closeTab = (path: string) => {
  const index = openTabs.value.findIndex((t) => t.path === path)
  if (index === -1) return

  openTabs.value.splice(index, 1)

  // If we closed the active tab, navigate to another one
  if (isActive(path)) {
    if (openTabs.value.length > 0) {
      // Go to the last opened tab (or the one before the closed one)
      const nextTab = openTabs.value[index] || openTabs.value[index - 1]
      if (nextTab) router.push(nextTab.path)
    } else {
      // No tabs left? Maybe go home or stay on empty?
      // VS Code keeps empty. Let's just go home for now and ensure home is always reopen-able?
      // Actually, let's keep it simple: if empty, just stay on page but blank,
      // but for this site, let's redirect to home and re-add home tab if they close everything.
      router.push('/')
    }
  }
}

// Watch route to add tabs
watch(
  () => route.path,
  (newPath) => {
    const existingWithNewPath = openTabs.value.find((t) => t.path === newPath)
    if (!existingWithNewPath) {
      // Add new tab
      openTabs.value.push({
        path: newPath,
        name: getFileName(newPath),
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="h-9 bg-bg-secondary flex items-center border-b border-bg-primary overflow-x-auto no-scrollbar"
  >
    <draggable
      v-model="openTabs"
      item-key="path"
      direction="horizontal"
      class="flex h-full"
      ghost-class="opacity-50"
      drag-class="opacity-100"
    >
      <template #item="{ element: tab }">
        <div
          @click="router.push(tab.path)"
          class="px-3 h-full flex items-center text-sm cursor-pointer select-none min-w-fit border-r border-bg-primary"
          :class="
            isActive(tab.path)
              ? 'bg-bg-primary border-t-2 border-t-accent text-text-primary'
              : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary/80 border-t-2 border-t-transparent'
          "
        >
          <span class="mr-2 text-[#e37933]" v-if="tab.path === '/'">TSX</span>
          <span class="mr-2 text-[#3178c6]" v-else-if="tab.path.includes('about')">TS</span>
          <span class="mr-2 text-[#dcdcaa]" v-else-if="tab.path.includes('volvo')">LOG</span>
          <span class="mr-2 text-[#b072d1]" v-else-if="tab.path.includes('blog')">MD</span>
          <span class="mr-2 text-[#e37933]" v-else>TSX</span>
          {{ tab.name }}
          <span
            @click.stop="closeTab(tab.path)"
            class="ml-2 hover:bg-text-dim rounded-md p-0.5"
            :class="
              isActive(tab.path)
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            "
            >×</span
          >
        </div>
      </template>
    </draggable>
  </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
