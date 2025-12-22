<script setup lang="ts">
import Sidebar from '@/components/layout/SideBar.vue'
import Terminal from '@/components/layout/TerminalFooter.vue'
import EditorTabs from '@/components/layout/EditorTabs.vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'
import { useRoute } from 'vue-router'
import { useLayout } from '@/composables/useLayout'

const route = useRoute()
const { sidebarWidth, terminalHeight, chatPanelWidth, startResize } = useLayout()

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
      <div class="hidden md:flex flex-col shrink-0" :style="{ width: sidebarWidth + 'px' }">
        <Sidebar class="w-full h-full" />
      </div>
      <!-- Resizer -->
      <div
        class="w-1 hover:bg-accent/50 cursor-col-resize shrink-0 z-50 transition-colors active:bg-accent"
        @mousedown="startResize('sidebar')"
      ></div>

      <!-- Editor Area -->
      <div class="flex-grow flex flex-col min-w-0 relative">
        <!-- Global Background Effects -->
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bg-secondary/20 via-transparent to-transparent opacity-50 pointer-events-none"
        ></div>
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        ></div>

        <!-- Editor Tabs -->
        <EditorTabs class="relative z-10 shrink-0" />

        <!-- Breadcrumbs (Optional line) -->
        <div
          class="h-6 bg-bg-primary flex items-center px-4 text-xs text-text-secondary select-none relative z-10 shrink-0"
        >
          src > views > {{ getFileName(route.path) }}
        </div>

        <!-- Content (Scrollable) -->
        <main class="flex-grow overflow-y-auto relative z-10">
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

        <!-- Resizer -->
        <div
          class="h-1 hover:bg-accent/50 cursor-row-resize shrink-0 z-50 transition-colors active:bg-accent"
          @mousedown="startResize('terminal')"
        ></div>
        <!-- Bottom Terminal Panel (Dynamic height) -->
        <div class="shrink-0 relative z-10" :style="{ height: terminalHeight + 'px' }">
          <Terminal />
        </div>
      </div>

      <!-- Resizer -->
      <div
        class="w-1 hover:bg-accent/50 cursor-col-resize shrink-0 z-50 transition-colors active:bg-accent"
        @mousedown="startResize('chat')"
      ></div>
      <!-- Right Chat Panel -->
      <div class="shrink-0 flex flex-col" :style="{ width: chatPanelWidth + 'px' }">
        <ChatPanel class="w-full h-full" />
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
