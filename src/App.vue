<template>
  <div class="flex h-screen bg-slate-900 text-gray-100 overflow-hidden">
    <!-- Sidebar -->
    <div class="sidebar-container">
      <!-- Desktop Sidebar -->
      <div class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-50">
        <div class="flex flex-col flex-grow pt-5 bg-slate-800 border-r border-slate-700 shadow-xl">
          <!-- Logo -->
          <div class="flex items-center flex-shrink-0 px-6 mb-8">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <i class="fas fa-route text-white"></i>
            </div>
            <h1 class="ml-3 text-xl font-semibold text-white">Nairobi Connect</h1>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 px-4 space-y-2">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.name"
              :to="item.path"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              :class="[
                $route.path === item.path 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white'
              ]"
            >
              <i :class="item.icon" class="mr-3 w-5 h-5"></i>
              {{ item.name }}
            </router-link>
          </nav>

          <!-- User Profile -->
          <div class="flex-shrink-0 p-4 border-t border-slate-700">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-white">U</span>
              </div>
              <div class="ml-3 flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">User Profile</p>
                <p class="text-xs text-gray-400 truncate">Online</p>
              </div>
              <button class="text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Sidebar Overlay -->
      <div v-if="sidebarOpen" class="lg:hidden fixed inset-0 z-50 flex">
        <div class="fixed inset-0 bg-slate-900 bg-opacity-75" @click="sidebarOpen = false"></div>
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-slate-800">
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button 
              @click="sidebarOpen = false"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <i class="fas fa-times text-white"></i>
            </button>
          </div>
          
          <!-- Mobile Navigation Content (same as desktop) -->
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-6 mb-8">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-route text-white"></i>
              </div>
              <h1 class="ml-3 text-xl font-semibold text-white">Nairobi Connect</h1>
            </div>
            
            <nav class="px-4 space-y-2">
              <router-link 
                v-for="item in navigationItems" 
                :key="item.name"
                :to="item.path"
                @click="sidebarOpen = false"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                :class="[
                  $route.path === item.path 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                ]"
              >
                <i :class="item.icon" class="mr-3 w-5 h-5"></i>
                {{ item.name }}
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 lg:ml-64">
      <!-- Top Header -->
      <header class="bg-slate-800 border-b border-slate-700 shadow-sm">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <!-- Mobile menu button -->
            <button 
              @click="sidebarOpen = true"
              class="lg:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <i class="fas fa-bars text-xl"></i>
            </button>

            <!-- Search Bar -->
            <div class="flex-1 max-w-2xl mx-auto lg:mx-0 lg:ml-8">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-search text-gray-400"></i>
                </div>
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Search routes, traffic updates, or locations..."
                  class="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
              </div>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center space-x-4">
              <button class="relative p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                <i class="fas fa-bell"></i>
                <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <button class="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view :searchQuery="searchQuery"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      sidebarOpen: false,
      searchQuery: '',
      navigationItems: [
        { name: 'Dashboard', icon: 'fas fa-home', path: '/' },
        { name: 'Live Traffic', icon: 'fas fa-traffic-light', path: '/traffic' },
        { name: 'Popular Routes', icon: 'fas fa-bus', path: '/popular-routes' },
        { name: 'Boda Directory', icon: 'fas fa-motorcycle', path: '/boda' },
        { name: 'Route Planner', icon: 'fas fa-route', path: '/planner' },
        { name: 'Notifications', icon: 'fas fa-bell', path: '/notifications' },
        { name: 'Help & Support', icon: 'fas fa-life-ring', path: '/support' }
      ]
    }
  }
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #475569 #334155;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #334155;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Animations */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Focus styles */
button:focus,
input:focus,
a:focus {
  outline: none;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .sidebar-container .lg\:ml-64 {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .p-6 {
    padding: 1rem;
  }
}
</style>