import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Traffic from '../views/Traffic.vue'
import PopularRoutes from '../views/PopularRoutes.vue'
import BodaDirectory from '../views/BodaDirectory.vue'
import RoutePlanner from '../views/RoutePlanner.vue'
import Notifications from '../views/Notifications.vue'
import HelpSupport from '../views/HelpSupport.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // Protected route
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { 
      requiresAuth: false, 
      hideLayout: true,
      preventAuthedAccess: true // Prevent access if already logged in
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { 
      requiresAuth: false, 
      hideLayout: true,
      preventAuthedAccess: true // Prevent access if already logged in
    }
  },
  // All other routes that require authentication
  {
    path: '/traffic',
    name: 'Traffic',
    component: Traffic,
  
  },
  {
    path: '/popular-routes',
    name: 'PopularRoutes',
    component: PopularRoutes,
   
  },
  {
    path: '/boda',
    name: 'BodaDirectory',
    component: BodaDirectory,
    meta: { requiresAuth: true }
  },
  {
    path: '/planner',
    name: 'RoutePlanner',
    component: RoutePlanner,
    meta: { requiresAuth: true }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
    meta: { requiresAuth: true }
  },
  {
    path: '/support',
    name: 'HelpSupport',
    component: HelpSupport,
   
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Return saved position if exists, otherwise scroll to top
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken')
  
  // Redirect to login if route requires auth but user isn't authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } 
  // Redirect to home if user tries to access login/register while authenticated
  else if (to.meta.preventAuthedAccess && isAuthenticated) {
    next('/')
  } 
  // Otherwise proceed normally
  else {
    next()
  }
})

export default router