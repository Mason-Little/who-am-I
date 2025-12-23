<script setup lang="ts">
import { ref } from 'vue'
import { fileTypeColors, getRootRoutes, getRoutesByParent } from '@/configs/view-route-config'
import ThemeSelector from '@/components/ui/ThemeSelector.vue'

const isExpanded = ref(true)
const isProjectsExpanded = ref(true)

const toggleExpanded = () => (isExpanded.value = !isExpanded.value)
const toggleProjects = () => (isProjectsExpanded.value = !isProjectsExpanded.value)

// Get routes for each section
const rootRoutes = getRootRoutes()
const projectRoutes = getRoutesByParent('projects')

const emit = defineEmits<{
  linkClick: []
}>()
</script>

<template>
  <div
    class="bg-bg-secondary h-full flex flex-col border-r border-border text-text-primary select-none"
  >
    <!-- Explorer Header -->
    <div
      class="px-4 py-2 text-xs font-bold tracking-wider uppercase text-text-secondary flex justify-between items-center group"
    >
      <span>Explorer</span>
      <span class="opacity-0 group-hover:opacity-100 cursor-pointer">...</span>
    </div>

    <!-- Project Name Section -->
    <div
      @click="toggleExpanded"
      class="px-2 py-1 cursor-pointer flex items-center hover:bg-bg-tertiary text-sm font-bold"
    >
      <span class="mr-1 transform transition-transform" :class="{ 'rotate-90': isExpanded }"
        >›</span
      >
      MASON-WEBSITE
    </div>

    <!-- File Tree -->
    <div v-show="isExpanded" class="flex-col font-mono text-[12px]">
      <!-- Root level files (Home, About, Contact) -->
      <router-link
        v-for="route in rootRoutes"
        :key="route.path"
        :to="route.path"
        class="flex items-center px-4 py-1 cursor-pointer hover:bg-bg-tertiary border-l-2 border-transparent"
        active-class="bg-bg-tertiary border-accent text-text-primary"
        @click="emit('linkClick')"
      >
        <span class="mr-2" :style="{ color: fileTypeColors[route.fileType] }">
          {{ route.fileType }}
        </span>
        {{ route.fileName }}
      </router-link>

      <!-- Projects Folder -->
      <div v-if="projectRoutes.length > 0">
        <div
          @click="toggleProjects"
          class="flex items-center px-4 py-1 cursor-pointer hover:bg-bg-tertiary text-text-primary"
        >
          <span
            class="mr-1 transform transition-transform text-xs"
            :class="{ 'rotate-90': isProjectsExpanded }"
            >›</span
          >
          <span class="text-yellow-400 mr-2">📂</span>
          projects
        </div>

        <div v-show="isProjectsExpanded">
          <router-link
            v-for="route in projectRoutes"
            :key="route.path"
            :to="route.path"
            class="flex items-center pl-8 py-1 cursor-pointer hover:bg-bg-tertiary border-l-2 border-transparent"
            active-class="bg-bg-tertiary border-accent text-text-primary"
            @click="emit('linkClick')"
          >
            <span class="mr-2" :style="{ color: fileTypeColors[route.fileType] }">
              {{ route.fileType }}
            </span>
            {{ route.fileName }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Theme Selector (Bottom) -->
    <div class="mt-auto p-4 border-t border-border">
      <ThemeSelector />
    </div>
  </div>
</template>
