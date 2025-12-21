<template>
  <div
    class="w-64 bg-bg-secondary h-full flex flex-col border-r border-border text-text-primary select-none"
  >
    <!-- Activity Bar Placeholder (Left Strip) -->
    <!-- Simplified: just the sidebar content -->

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
    <div v-show="isExpanded" class="flex-col font-mono text-[13px]">
      <!-- Home -->
      <router-link
        to="/"
        class="flex items-center px-4 py-1 cursor-pointer hover:bg-bg-tertiary border-l-2 border-transparent"
        active-class="bg-bg-tertiary border-accent text-text-primary"
      >
        <span class="mr-2 text-[#e37933]">TSX</span>
        home.tsx
      </router-link>

      <!-- About -->
      <router-link
        to="/about"
        class="flex items-center px-4 py-1 cursor-pointer hover:bg-bg-tertiary border-l-2 border-transparent"
        active-class="bg-bg-tertiary border-accent text-text-primary"
      >
        <span class="mr-2 text-[#3178c6]">TS</span>
        about.ts
      </router-link>

      <!-- Projects Folder -->
      <div>
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
            to="/projects/software"
            class="flex items-center pl-8 py-1 cursor-pointer hover:bg-bg-tertiary border-l-2 border-transparent"
            active-class="bg-bg-tertiary border-accent text-text-primary"
          >
            <span class="mr-2 text-[#e37933]">TSX</span>
            software.tsx
          </router-link>
          <router-link
            to="/projects/volvo-240"
            class="flex items-center pl-8 py-1 cursor-pointer hover:bg-bg-tertiary border-l-2 border-transparent"
            active-class="bg-bg-tertiary border-accent text-text-primary"
          >
            <span class="mr-2 text-[#dcdcaa]">LOG</span>
            volvo_240.log
          </router-link>
        </div>
      </div>

      <!-- Blog Folder -->
      <div>
        <div
          @click="toggleBlog"
          class="flex items-center px-4 py-1 cursor-pointer hover:bg-bg-tertiary text-text-primary"
        >
          <span
            class="mr-1 transform transition-transform text-xs"
            :class="{ 'rotate-90': isBlogExpanded }"
            >›</span
          >
          <span class="text-blue-400 mr-2">📂</span>
          blog
        </div>

        <div v-show="isBlogExpanded">
          <router-link
            to="/blog"
            class="flex items-center pl-8 py-1 cursor-pointer hover:bg-bg-tertiary border-l-2 border-transparent"
            active-class="bg-bg-tertiary border-accent text-text-primary"
          >
            <span class="mr-2 text-[#b072d1]">MD</span>
            README.md
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(true)
const isProjectsExpanded = ref(true)
const isBlogExpanded = ref(true)

const toggleExpanded = () => (isExpanded.value = !isExpanded.value)
const toggleProjects = () => (isProjectsExpanded.value = !isProjectsExpanded.value)
const toggleBlog = () => (isBlogExpanded.value = !isBlogExpanded.value)
</script>
