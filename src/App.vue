<script setup lang="ts">
import Sidebar from '@/components/layout/SideBar.vue'
import Terminal from '@/components/layout/TerminalFooter.vue'
import EditorTabs from '@/components/layout/EditorTabs.vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'
import IconChat from '@/components/icons/IconChat.vue'
import { useRoute } from 'vue-router'
import { useLayout } from '@/composables/useLayout'
import { reactive } from 'vue'

const route = useRoute()
const layout = reactive(useLayout())

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
    <!-- Top Mobile Status Bar (Visible only on mobile) -->
    <div
      v-if="layout.isMobile"
      class="h-10 bg-bg-secondary border-b border-border flex items-center justify-between px-4 shrink-0 z-50 sticky top-0"
    >
      <button
        @click="layout.toggleSidebar"
        class="p-1 -ml-2 text-text-secondary hover:text-text-primary"
      >
        <span class="text-xl">☰</span>
      </button>
      <span class="text-xs font-bold text-text-secondary uppercase tracking-wider"
        >Mason-Little</span
      >
      <button
        @click="layout.toggleMinimizeChat"
        class="p-1 -mr-2 text-text-secondary hover:text-text-primary"
      >
        <IconChat class="w-5 h-5" />
      </button>
    </div>

    <!-- Main Workspace -->
    <div class="flex-grow flex overflow-hidden relative">
      <!-- Sidebar (Activity Bar + Explorer) -->
      <!-- Desktop: Flex Item. Mobile: Absolute Overlay -->
      <div
        class="flex flex-col shrink-0 bg-bg-secondary h-full transition-transform duration-300 ease-in-out z-40"
        :class="{
          'hidden md:flex': !layout.isSidebarVisible && !layout.isMobile, // Desktop: hide if toggled off (functionality not fully there but good for future)
          'absolute inset-y-0 left-0 shadow-xl border-r border-border': layout.isMobile,
          'translate-x-0': layout.isSidebarVisible || !layout.isMobile,
          '-translate-x-full': layout.isMobile && !layout.isSidebarVisible,
          'md:translate-x-0': !layout.isMobile, // Reset transform on desktop
        }"
        :style="{ width: layout.isMobile ? '80%' : layout.sidebarWidth + 'px' }"
      >
        <Sidebar
          class="w-full h-full"
          @link-click="layout.isMobile ? layout.toggleSidebar() : null"
        />
      </div>

      <!-- Mobile Overlay Backdrop for Sidebar -->
      <div
        v-if="layout.isMobile && layout.isSidebarVisible"
        @click="layout.toggleSidebar"
        class="absolute inset-0 bg-black/50 z-30 backdrop-blur-sm"
      ></div>

      <!-- Resizer (Desktop Only) -->
      <div
        v-if="!layout.isMobile"
        class="w-1 hover:bg-accent/50 cursor-col-resize shrink-0 z-50 transition-colors active:bg-accent"
        @mousedown="layout.startResize('sidebar')"
      ></div>

      <!-- Editor Area -->
      <div class="flex-grow flex flex-col min-w-0 relative overflow-hidden">
        <!-- Global Background Effects -->
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bg-secondary/20 via-transparent to-transparent opacity-50 pointer-events-none"
        ></div>
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        ></div>

        <!-- Editor Tabs & Header Actions -->
        <div
          class="flex w-full bg-bg-secondary border-b border-bg-primary relative z-10 shrink-0 h-9"
          v-if="!layout.isMobile"
        >
          <div class="flex-grow min-w-0 overflow-hidden">
            <EditorTabs class="h-full border-b-0" />
          </div>
          <!-- Chat Toggle (Visible when chat is closed) -->
          <button
            v-if="!layout.isChatOpen"
            @click="layout.toggleMinimizeChat"
            class="px-3 hover:bg-bg-primary text-text-secondary hover:text-text-primary flex items-center justify-center border-l border-bg-primary transition-colors cursor-pointer"
            title="Open Chat"
          >
            <IconChat />
          </button>
        </div>

        <!-- Breadcrumbs (Desktop Only or simplified) -->
        <div
          v-if="!layout.isMobile"
          class="h-6 bg-bg-primary flex items-center px-4 text-xs text-text-secondary select-none relative z-10 shrink-0"
        >
          src > views > {{ getFileName(route.path) }}
        </div>

        <!-- Content (Scrollable) -->
        <main class="flex-grow overflow-y-auto relative z-10">
          <!-- Route Content -->
          <div :class="{ 'pl-16 pr-8 pt-4 pb-12': !layout.isMobile, 'p-4 pb-20': layout.isMobile }">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </div>
        </main>

        <!-- Resizer (Desktop Only) -->
        <div
          v-if="!layout.isMobile"
          class="h-1 hover:bg-accent/50 cursor-row-resize shrink-0 z-50 transition-colors active:bg-accent"
          @mousedown="layout.startResize('terminal')"
        ></div>
        <!-- Bottom Terminal Panel (Dynamic height) -->
        <div
          class="shrink-0 relative z-10"
          :class="{ hidden: layout.isMobile }"
          :style="{ height: layout.terminalHeight + 'px' }"
        >
          <Terminal />
        </div>
      </div>

      <!-- Resizer (Desktop Only) -->
      <div
        v-if="!layout.isMobile"
        class="w-1 hover:bg-accent/50 cursor-col-resize shrink-0 z-50 transition-colors active:bg-accent"
        @mousedown="layout.startResize('chat')"
      ></div>

      <!-- Right Chat Panel -->
      <!-- Desktop: Flex Item. Mobile: Absolute Overlay (Full Screen) -->
      <div
        class="shrink-0 flex flex-col will-change-[width] z-50 bg-bg-primary"
        :class="{
          'transition-[width] duration-300 ease-out': !layout.isDragging && !layout.isMobile,
          'transition-transform duration-300 ease-in-out': layout.isMobile,
          'absolute inset-0 w-full h-full': layout.isMobile,
          // Mobile: Toggle visibility via transform
          'translate-x-0': layout.isMobile && layout.isChatOpen,
          'translate-x-full': layout.isMobile && !layout.isChatOpen,
          // Desktop specific constraints are handled by style width
        }"
        :style="{ width: layout.isMobile ? '100%' : layout.effectiveChatWidth + 'px' }"
      >
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
      <div class="flex gap-4 hidden sm:flex">
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
