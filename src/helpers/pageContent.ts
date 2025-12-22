import { createApp, h } from 'vue'
import { routeConfigs, componentMap, type PageName } from '@/configs/view-route-config'

export function getPageText(pageName: PageName): string {
  const component = componentMap[pageName]
  if (!component) return ''

  const container = document.createElement('div')
  const app = createApp({ render: () => h(component) })
  app.mount(container)
  const text = container.textContent || ''
  app.unmount()

  return text.replace(/\s+/g, ' ').trim()
}

// Helper to get route config by name
export function getRouteByName(name: PageName) {
  return routeConfigs.find((r) => r.name === name)
}

// Export PageName for convenience
export type { PageName }
