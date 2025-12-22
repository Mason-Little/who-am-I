import { ref } from 'vue'

const sidebarWidth = ref(200) // Initial width
const terminalHeight = ref(220) // Initial height
const chatPanelWidth = ref(350) // Initial width

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
        const windowWidth = window.innerWidth
        let newWidth = windowWidth - e.clientX
        if (newWidth < MIN_CHAT_WIDTH) newWidth = MIN_CHAT_WIDTH
        if (newWidth > MAX_CHAT_WIDTH) newWidth = MAX_CHAT_WIDTH
        chatPanelWidth.value = newWidth
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

  return {
    sidebarWidth,
    terminalHeight,
    chatPanelWidth,
    isDragging,
    startResize
  }
}
