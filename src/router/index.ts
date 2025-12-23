import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { routeConfigs, getViewComponent } from '@/configs/view-route-config'

// Generate routes from centralized config
const routes: RouteRecordRaw[] = routeConfigs
  .filter((config) => config.viewPath) // Only create routes for configs with a viewPath
  .map((config) => {
    const componentLoader = getViewComponent(config.viewPath!)

    if (!componentLoader) {
      console.warn(`View component not found for route: ${config.name} (viewPath: ${config.viewPath})`)
      return {
        path: config.path,
        name: config.name,
        component: { template: '<div>View not found</div>' },
         meta: { title: config.title },
      }
    }

    return {
      path: config.path,
      name: config.name,
      component: componentLoader,
      meta: { title: config.title },
    }
  })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    // Catch-all
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
