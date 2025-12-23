import { ref, computed } from 'vue'

const sidebarWidth = ref(200) // Initial width
const terminalHeight = ref(220) // Initial height
const preferredChatWidth = ref(350) // Initial width
const isChatOpen = ref(true)
const isChatFullScreen = ref(false)

// Min/Max constraints
const MIN_SIDEBAR_WIDTH = 170
const MAX_SIDEBAR_WIDTH = 500
const MIN_TERMINAL_HEIGHT = 100
const MAX_TERMINAL_HEIGHT = 600
const MIN_CHAT_WIDTH = 250
const MAX_CHAT_WIDTH = 600

const isDragging = ref(false)

export const useLayout = () => {
  const startResize = (type: 'sidebar' | 'terminal' | 'chat') => {
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
    // If closing, we also turn off full screen so next open is normal size?
    // Or keep it? "Maximize" usually implies a temporary state. Let's reset it on close.
    if (!isChatOpen.value) {
      isChatFullScreen.value = false
    }
  }

  // Alias for compatibility
  // const toggleMinimizeChat = toggleChatVisibility

  const effectiveChatWidth = computed(() => {
    if (!isChatOpen.value) return 0
    if (isChatFullScreen.value) return window.innerWidth - sidebarWidth.value
    return preferredChatWidth.value
  })

  return {
    sidebarWidth,
    terminalHeight,
    preferredChatWidth,
    effectiveChatWidth,
    isChatOpen,
    isChatFullScreen,
    isDragging,
    startResize,
    toggleFullScreenChat,
    toggleMinimizeChat
  }
}
