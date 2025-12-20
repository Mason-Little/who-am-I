import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SoftwareProjectsView from '@/views/SoftwareProjectsView.vue'
import VolvoProjectView from '@/views/VolvoProjectView.vue'
import BlogView from '@/views/BlogView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Home' }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: 'About' }
  },
  {
    path: '/projects/software',
    name: 'SoftwareProjects',
    component: SoftwareProjectsView,
    meta: { title: 'Software Projects' }
  },
  {
    path: '/projects/volvo-240',
    name: 'VolvoProject',
    component: VolvoProjectView,
    meta: { title: 'Volvo 240 LS Swap' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogView,
    meta: { title: 'Blog' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    // Catch-all
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
