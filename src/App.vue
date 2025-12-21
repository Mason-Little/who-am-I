<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue'
import Terminal from '@/components/TerminalFooter.vue'
import EditorTabs from '@/components/EditorTabs.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const getFileName = (path: string) => {
  if (path === '/') return 'home.tsx'
  if (path === '/about') return 'about.ts'
  if (path.includes('software')) return 'software.tsx'
  if (path.includes('volvo')) return 'volvo_240.log'
  if (path.includes('blog')) return 'README.md'
  return 'unknown'
}
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col bg-bg-primary text-text-primary font-sans overflow-hidden"
  >
    <!-- Top Status Bar (Optional, keeping it simple for now or adding later) -->

    <!-- Main Workspace -->
    <div class="flex-grow flex overflow-hidden">
      <!-- Sidebar (Activity Bar + Explorer) -->
      <Sidebar class="hidden md:flex shrink-0" />

      <!-- Editor Area -->
      <div class="flex-grow flex flex-col min-w-0">
        <!-- Editor Tabs -->
        <EditorTabs />

        <!-- Breadcrumbs (Optional line) -->
        <div
          class="h-6 bg-bg-primary flex items-center px-4 text-xs text-text-secondary select-none"
        >
          src > views > {{ getFileName(route.path) }}
        </div>

        <!-- Content (Scrollable) -->
        <main class="flex-grow overflow-y-auto bg-bg-primary relative">
          <!-- Line Numbers (Visual fake) -->
          <div
            class="absolute left-0 top-0 bottom-0 w-12 text-right pr-3 pt-4 text-text-dim font-mono text-sm leading-6 select-none border-r border-border"
          >
            <div v-for="n in 50" :key="n">{{ n }}</div>
          </div>

          <!-- Route Content -->
          <div class="pl-16 pr-8 pt-4 pb-12">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </div>
        </main>

        <!-- Bottom Terminal Panel (Fixed height) -->
        <div class="h-48 shrink-0">
          <Terminal />
        </div>
      </div>
    </div>

    <!-- Footer Status Bar -->
    <div
      class="h-6 bg-accent text-bg-primary flex items-center px-4 text-xs justify-between select-none shrink-0"
    >
      <div class="flex gap-4">
        <span class="flex items-center"><span class="mr-1">⑂</span> main*</span>
        <span class="flex items-center"><span class="mr-1">⊗</span> 0</span>
        <span class="flex items-center"><span class="mr-1">⚠</span> 0</span>
      </div>
      <div class="flex gap-4">
        <span>Ln 12, Col 44</span>
        <span>UTF-8</span>
        <span>TypeScript JSX</span>
        <span>Prettier</span>
      </div>
    </div>
  </div>
</template>

<style>
/* Reset some default browser styles to make it feel like an app */
body {
  margin: 0;
  overflow: hidden; /* App handles scroll */
}

/* Custom Scrollbar for Editor */
::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg-primary);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-dim);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
