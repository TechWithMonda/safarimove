import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Traffic from '../views/Traffic.vue'
import PopularRoutes from '../views/PopularRoutes.vue'
import BodaDirectory from '../views/BodaDirectory.vue'
import RoutePlanner from '../views/RoutePlanner.vue'
import Notifications from '../views/Notifications.vue'
import HelpSupport from '../views/HelpSupport.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/traffic',
    name: 'Traffic',
    component: Traffic
  },
  {
    path: '/popular-routes',
    name: 'PopularRoutes',
    component: PopularRoutes
  },
  {
    path: '/boda',
    name: 'BodaDirectory',
    component: BodaDirectory
  },
  {
    path: '/planner',
    name: 'RoutePlanner',
    component: RoutePlanner
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  },
  {
    path: '/support',
    name: 'HelpSupport',
    component: HelpSupport
  }
]

// Create and export router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
