import { ref, computed, onMounted, onUnmounted } from 'vue'

// --- Constants ---
const LAYOUT_CONFIG = {
  SIDEBAR: { MIN: 170, MAX: 500, INITIAL: 200 },
  TERMINAL: { MIN: 100, MAX: 600, INITIAL: 220, FOOTER_HEIGHT: 24 },
  CHAT: { MIN: 250, MAX: 600, INITIAL: 350 },
  MOBILE_BREAKPOINT: 768,
} as const

type ResizeTarget = 'sidebar' | 'terminal' | 'chat'

// --- Global State ---
// Kept global to maintain state across component re-mounts (singleton pattern)
const sidebarWidth = ref<number>(LAYOUT_CONFIG.SIDEBAR.INITIAL)
const terminalHeight = ref<number>(LAYOUT_CONFIG.TERMINAL.INITIAL)
const preferredChatWidth = ref<number>(LAYOUT_CONFIG.CHAT.INITIAL)

const isChatOpen = ref<boolean>(true)
const isChatFullScreen = ref<boolean>(false)
const isSidebarVisible = ref<boolean>(true)
const isMobile = ref<boolean>(false)
const isDragging = ref<boolean>(false)

// --- Logic Implementation ---

const updateMobileState = () => {
  if (typeof window === 'undefined') return

  const mobile = window.innerWidth < LAYOUT_CONFIG.MOBILE_BREAKPOINT
  if (mobile !== isMobile.value) {
    isMobile.value = mobile
    // Reset layout state when switching modes
    if (mobile) {
      isSidebarVisible.value = false
      isChatFullScreen.value = true
      isChatOpen.value = false
    } else {
      isSidebarVisible.value = true
      isChatFullScreen.value = false
    }
  }
}

export const useLayout = () => {
  // Ensure we track window resize for mobile responsiveness
  if (typeof window !== 'undefined') {
    // We can use the onMounted/onUnmounted hooks here because
    // useLayout is intended to be used within a component setup()
    onMounted(() => {
      updateMobileState()
      window.addEventListener('resize', updateMobileState)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateMobileState)
    })
  }

  // --- Resize Handlers ---

  const handleSidebarResize = (e: MouseEvent) => {
    const newWidth = Math.max(
      LAYOUT_CONFIG.SIDEBAR.MIN,
      Math.min(e.clientX, LAYOUT_CONFIG.SIDEBAR.MAX),
    )
    sidebarWidth.value = newWidth
  }

  const handleTerminalResize = (e: MouseEvent) => {
    const windowHeight = window.innerHeight
    const rawHeight = windowHeight - e.clientY - LAYOUT_CONFIG.TERMINAL.FOOTER_HEIGHT
    const newHeight = Math.max(
      LAYOUT_CONFIG.TERMINAL.MIN,
      Math.min(rawHeight, LAYOUT_CONFIG.TERMINAL.MAX),
    )
    terminalHeight.value = newHeight
  }

  const handleChatResize = (e: MouseEvent) => {
    const windowWidth = window.innerWidth
    const rawWidth = windowWidth - e.clientX

    // If dragging chat, exit fullscreen to allow resizing
    if (isChatFullScreen.value) isChatFullScreen.value = false

    // Ensure chat is open if we are resizing it
    if (!isChatOpen.value) isChatOpen.value = true

    const newWidth = Math.max(LAYOUT_CONFIG.CHAT.MIN, Math.min(rawWidth, LAYOUT_CONFIG.CHAT.MAX))
    preferredChatWidth.value = newWidth
  }

  const startResize = (target: ResizeTarget) => {
    if (isMobile.value) return

    isDragging.value = true
    document.body.style.userSelect = 'none'
    document.body.style.cursor = target === 'terminal' ? 'row-resize' : 'col-resize'

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      switch (target) {
        case 'sidebar':
          handleSidebarResize(e)
          break
        case 'terminal':
          handleTerminalResize(e)
          break
        case 'chat':
          handleChatResize(e)
          break
      }
    }

    const onMouseUp = () => {
      isDragging.value = false
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  // --- Toggles ---

  const toggleFullScreenChat = () => {
    isChatFullScreen.value = !isChatFullScreen.value
    if (isChatFullScreen.value) isChatOpen.value = true
  }

  const toggleMinimizeChat = () => {
    isChatOpen.value = !isChatOpen.value
    // When closing on desktop, also reset fullscreen
    if (!isChatOpen.value && !isMobile.value) {
      isChatFullScreen.value = false
    }
  }

  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value
  }

  // --- Computed ---

  const effectiveChatWidth = computed(() => {
    if (!isChatOpen.value) return 0
    if (isMobile.value) return window.innerWidth
    if (isChatFullScreen.value) return window.innerWidth - sidebarWidth.value
    return preferredChatWidth.value
  })

  return {
    // State
    sidebarWidth,
    terminalHeight,
    preferredChatWidth,
    effectiveChatWidth,
    isChatOpen,
    isChatFullScreen,
    isDragging,
    isMobile,
    isSidebarVisible,

    // Actions
    startResize,
    toggleFullScreenChat,
    toggleMinimizeChat,
    toggleSidebar,
  }
}
