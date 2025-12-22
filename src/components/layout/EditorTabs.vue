<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { useRoute, useRouter } from 'vue-router'
import { getFileName, getFileColor, getRouteByPath } from '@/configs/view-route-config'

const route = useRoute()
const router = useRouter()

interface Tab {
  path: string
  name: string
}

const openTabs = ref<Tab[]>([])

const isActive = (path: string) => route.path === path

const closeTab = (path: string) => {
  const index = openTabs.value.findIndex((t) => t.path === path)
  if (index === -1) return

  openTabs.value.splice(index, 1)

  // If we closed the active tab, navigate to another one
  if (isActive(path)) {
    if (openTabs.value.length > 0) {
      const nextTab = openTabs.value[index] || openTabs.value[index - 1]
      if (nextTab) router.push(nextTab.path)
    } else {
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
          <span class="mr-2" :style="{ color: getFileColor(tab.path) }">
            {{ getRouteByPath(tab.path)?.fileType ?? 'TSX' }}
          </span>
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
