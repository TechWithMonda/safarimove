// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

// Define routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    {
    path: '/trafficupdates',
    name: 'trafficupdates',
    component: () => import('../views/TrafficUpdates.vue')
  },
     {
    path: '/MatatuRoutes',
    name: 'MatatuRoutes',
    component: () => import('../views/MatatuRoutes.vue')
  },
       {
    path: '/BodaBodaRiders',
    name: 'BodaBodaRiders',
    component: () => import('../views/BodaBodaRiders.vue')
  },
        {
    path: '/FindAMatatu',
    name: 'FindAMatatu',
    component: () => import('../views/FindAMatatu.vue')
  },
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
