import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import { routeConfigs } from '@/configs/view-route-config'

// Import all view components
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import SoftwareProjectsView from '@/views/SoftwareProjectsView.vue'
import VolvoProjectView from '@/views/VolvoProjectView.vue'
import BlogView from '@/views/BlogView.vue'

// Map route names to components
const componentMap: Record<string, Component> = {
  Home: HomeView,
  About: AboutView,
  Contact: ContactView,
  SoftwareProjects: SoftwareProjectsView,
  VolvoProject: VolvoProjectView,
  Blog: BlogView,
}

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
