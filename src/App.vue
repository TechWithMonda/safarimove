<template>
  <div class="flex h-screen bg-slate-900 text-gray-100 overflow-hidden">
    <!-- Sidebar -->
    <div class="sidebar-container">
      <!-- Desktop Sidebar -->
      <div class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-50">
        <div class="flex flex-col flex-grow pt-5 bg-slate-800 border-r border-slate-700 shadow-xl">
          <!-- Logo with animation -->
          <div class="flex items-center flex-shrink-0 px-6 mb-8">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg hover:rotate-[30deg] transition-transform duration-300">
              <i class="fas fa-route text-white"></i>
            </div>
            <h1 class="ml-3 text-xl font-semibold text-white animate-fade-in">Nairobi Connect</h1>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 px-4 space-y-2">
            <router-link 
              v-for="(item, index) in navigationItems" 
              :key="item.name"
              :to="item.path"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300"
              :class="[
                $route.path === item.path 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white',
                'animate-slide-in-left'
              ]"
              :style="`animation-delay: ${index * 0.1}s`"
            >
              <i :class="item.icon" class="mr-3 w-5 h-5 group-hover:scale-110 transition-transform"></i>
              {{ item.name }}
              <i class="fas fa-chevron-right ml-auto text-xs opacity-0 group-hover:opacity-100 transition-all duration-300"></i>
            </router-link>
          </nav>

          <!-- User Profile with animation -->
          <div class="flex-shrink-0 p-4 border-t border-slate-700 animate-fade-in-up">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <span class="text-sm font-medium text-white">U</span>
              </div>
              <div class="ml-3 flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">User Profile</p>
                <p class="text-xs text-gray-400 truncate">Online</p>
              </div>
              <button class="text-gray-400 hover:text-white hover:rotate-180 transition-all duration-500">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Sidebar Overlay -->
      <div v-if="sidebarOpen" class="lg:hidden fixed inset-0 z-50 flex">
        <div 
          class="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity duration-300"
          @click="sidebarOpen = false"
          :class="sidebarOpen ? 'animate-fade-in' : 'animate-fade-out'"
        ></div>
        <div 
          class="relative flex-1 flex flex-col max-w-xs w-full bg-slate-800"
          :class="sidebarOpen ? 'animate-slide-in-left' : 'animate-slide-out-left'"
        >
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button 
              @click="sidebarOpen = false"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white hover:bg-slate-700 transition-colors"
            >
              <i class="fas fa-times text-white hover:rotate-90 transition-transform duration-300"></i>
            </button>
          </div>
          
          <!-- Mobile Navigation Content -->
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
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300"
                :class="[
                  $route.path === item.path 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                ]"
              >
                <i :class="item.icon" class="mr-3 w-5 h-5 group-hover:scale-110 transition-transform"></i>
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
              class="lg:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 hover:scale-110 transition-transform"
            >
              <i class="fas fa-bars text-xl"></i>
            </button>

            <!-- Animated Search Bar -->
            <div class="flex-1 max-w-2xl mx-auto lg:mx-0 lg:ml-8">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-search text-gray-400 transition-colors duration-300" :class="{'text-blue-400': isSearchFocused}"></i>
                </div>
                <input 
                  v-model="searchQuery"
                  @focus="isSearchFocused = true"
                  @blur="isSearchFocused = false"
                  type="text" 
                  placeholder="Search routes, traffic updates, or locations..."
                  class="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-slate-500"
                >
                <div 
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer hover:text-blue-400 transition-colors"
                >
                  <i class="fas fa-times"></i>
                </div>
              </div>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center space-x-4">
              <button class="relative p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg hover:animate-pulse">
                <i class="fas fa-bell"></i>
                <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 animate-ping opacity-75"></span>
                <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <button class="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg hover:rotate-45 transition-transform duration-500">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

     <main class="flex-1 overflow-y-auto p-6">
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" :searchQuery="searchQuery" />
    </transition>
  </router-view>
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
      isSearchFocused: false,
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
/* Custom scrollbar */
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

/* Keyframe animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes slide-in-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes slide-out-left {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

@keyframes fade-in-up {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation classes */
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.animate-fade-out {
  animation: fade-out 0.3s ease-out forwards;
}

.animate-slide-in-left {
  animation: slide-in-left 0.3s ease-out forwards;
}

.animate-slide-out-left {
  animation: slide-out-left 0.3s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out forwards;
}

/* Hover animations */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
button:focus,
input:focus,
a:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
}
/* Focus styles */
.page-enter-active {
  transition: all 0.4s ease;
  background: linear-gradient(to right, transparent, rgba(30, 41, 59, 0.5), transparent);
}

.page-leave-active {
  transition: all 0.2s ease;
  background: linear-gradient(to left, transparent, rgba(30, 41, 59, 0.5), transparent);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
/* Pulse animation for notifications */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
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
  
  /* Mobile search bar animation */
  .search-bar-mobile {
    transition: all 0.3s ease;
  }
  
  .search-bar-mobile:focus-within {
    width: 100%;
  }
}
</style>