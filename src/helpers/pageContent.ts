import { createApp, h, type Component } from 'vue'
import { routeConfigs, getViewComponent, type PageName } from '@/configs/view-route-config'

export async function getPageText(pageName: PageName): Promise<string> {
  const config = routeConfigs.find((r) => r.name === pageName)
  if (!config?.viewPath) return ''

  const loader = getViewComponent(config.viewPath)
  if (!loader) return ''

  try {
    const module = await loader()
    // Handle default export
    const component = (module as unknown as { default: Component }).default

    const container = document.createElement('div')
    const app = createApp({ render: () => h(component) })
    app.mount(container)
    const text = container.textContent || ''
    app.unmount()

    return text.replace(/\s+/g, ' ').trim()
  } catch (e) {
    console.error(`Failed to load component for page ${pageName}:`, e)
    return ''
  }
}

// Helper to get route config by name
export function getRouteByName(name: PageName) {
  return routeConfigs.find((r) => r.name === name)
}

// Export PageName for convenience
export type { PageName }
