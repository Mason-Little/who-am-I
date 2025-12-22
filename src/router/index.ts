import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { routeConfigs, componentMap } from '@/configs/view-route-config'

// Generate routes from centralized config
const routes: RouteRecordRaw[] = routeConfigs
  .filter((config) => config.name in componentMap)
  .map((config) => ({
    path: config.path,
    name: config.name,
    component: componentMap[config.name]!,
    meta: { title: config.title },
  }))

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
