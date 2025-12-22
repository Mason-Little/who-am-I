import { createApp, h, type Component } from 'vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import VolvoProjectView from '@/views/VolvoProjectView.vue'
import BlogView from '@/views/BlogView.vue'
import SoftwareProjectsView from '@/views/SoftwareProjectsView.vue'
import type { PageName } from '@/configs/view-route-config'

const views: Record<PageName, Component> = {
  home: HomeView,
  about: AboutView,
  volvo: VolvoProjectView,
  blog: BlogView,
  softwareProjects: SoftwareProjectsView,
}

export function getPageText(pageName: PageName): string {
  const component = views[pageName]
  if (!component) return ''

  const container = document.createElement('div')
  const app = createApp({ render: () => h(component) })
  app.mount(container)
  const text = container.textContent || ''
  app.unmount()

  return text.replace(/\s+/g, ' ').trim()
}
