import { ref, computed } from 'vue'

const sidebarWidth = ref(200) // Initial width
const terminalHeight = ref(220) // Initial height
const preferredChatWidth = ref(350) // Initial width
const isChatOpen = ref(true)
const isChatFullScreen = ref(false)

// Min/Max constraints
const isMobile = ref(false)
const isSidebarVisible = ref(true) // Start visible for desktop, will adjust on mount

// Min/Max constraints
const MIN_SIDEBAR_WIDTH = 170
const MAX_SIDEBAR_WIDTH = 500
const MIN_TERMINAL_HEIGHT = 100
const MAX_TERMINAL_HEIGHT = 600
const MIN_CHAT_WIDTH = 250
const MAX_CHAT_WIDTH = 600

const isDragging = ref(false)

const updateMobileState = () => {
  const mobile = window.innerWidth < 768
  if (mobile !== isMobile.value) {
    isMobile.value = mobile
    // Reset states when switching modes
    if (mobile) {
      isSidebarVisible.value = false // Hidden by default on mobile
      isChatFullScreen.value = true // Chat is always full screen on mobile when open
      isChatOpen.value = false // Closed by default on mobile
    } else {
      isSidebarVisible.value = true
      isChatFullScreen.value = false
    }
  }
}

export const useLayout = () => {
  // Initialize mobile state
  // We can't do this immediately in SSR context but this is a client-side app
  if (typeof window !== 'undefined') {
    // Check initial
    updateMobileState() // Initial check might need to be in a mounted hook or similar if used globally,
                        // but since this is a global state defined outside the function,
                        // we need to be careful about when it runs.
                        // For simplicity, let's rely on the component using it to trigger a check or listeners.
  }

  // To ensure we track resize, we should probably set up the listener once.
  // Since this is a singleton-ish composable (state outside), we can set up listeners globally if we want,
  // or just rely on the App.vue to mount it.

  const startResize = (type: 'sidebar' | 'terminal' | 'chat') => {
    if (isMobile.value) return // Disable resizing on mobile

    isDragging.value = true

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      if (type === 'sidebar') {
        let newWidth = e.clientX
        if (newWidth < MIN_SIDEBAR_WIDTH) newWidth = MIN_SIDEBAR_WIDTH
        if (newWidth > MAX_SIDEBAR_WIDTH) newWidth = MAX_SIDEBAR_WIDTH
        sidebarWidth.value = newWidth
      } else if (type === 'terminal') {
        // Calculate height from bottom
        const windowHeight = window.innerHeight
        let newHeight = windowHeight - e.clientY
        // Adjust for footer if necessary (approx 24px)
        const footerHeight = 24
        newHeight = newHeight - footerHeight

        if (newHeight < MIN_TERMINAL_HEIGHT) newHeight = MIN_TERMINAL_HEIGHT
        if (newHeight > MAX_TERMINAL_HEIGHT) newHeight = MAX_TERMINAL_HEIGHT
        terminalHeight.value = newHeight
      } else if (type === 'chat') {
        // If resizing, we are defining the preferred width
        const windowWidth = window.innerWidth
        let newWidth = windowWidth - e.clientX

        // If dragging, we probably want to exit full screen to allow resizing
        if (isChatFullScreen.value) isChatFullScreen.value = false

        if (newWidth < MIN_CHAT_WIDTH) newWidth = MIN_CHAT_WIDTH
        if (newWidth > MAX_CHAT_WIDTH) newWidth = MAX_CHAT_WIDTH

        preferredChatWidth.value = newWidth

        // Ensure it's open if we are dragging it
        if (!isChatOpen.value) isChatOpen.value = true
      }
    }

    const onMouseUp = () => {
      isDragging.value = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    // Set appropriate cursor globally during drag
    document.body.style.userSelect = 'none'
    document.body.style.cursor = type === 'terminal' ? 'row-resize' : 'col-resize'
  }

  const toggleFullScreenChat = () => {
    isChatFullScreen.value = !isChatFullScreen.value
    // If we go full screen, we must ensure it is open
    if (isChatFullScreen.value) isChatOpen.value = true
  }

  const toggleMinimizeChat = () => {
    isChatOpen.value = !isChatOpen.value
    // On mobile, if we close chat, we just close it.
    // On desktop, we reset fullscreen.
    if (!isChatOpen.value && !isMobile.value) {
      isChatFullScreen.value = false
    }
  }

  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value
  }

  // Determine effective width based on responsive state
  const effectiveChatWidth = computed(() => {
    if (!isChatOpen.value) return 0
    // On mobile, chat takes full width if open
    if (isMobile.value) return window.innerWidth
    if (isChatFullScreen.value) return window.innerWidth - sidebarWidth.value
    return preferredChatWidth.value
  })

  // Listen for resize to update mobile state
  if (typeof window !== 'undefined') {
     window.addEventListener('resize', updateMobileState)
     // Initial check
     updateMobileState()
  }

  return {
    sidebarWidth,
    terminalHeight,
    preferredChatWidth,
    effectiveChatWidth,
    isChatOpen,
    isChatFullScreen,
    isDragging,
    isMobile,
    isSidebarVisible,
    startResize,
    toggleFullScreenChat,
    toggleMinimizeChat,
    toggleSidebar
  }
}
