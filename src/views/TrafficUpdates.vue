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
            <a 
              v-for="item in navigationItems" 
              :key="item.name"
              href="#"
              @click="activeTab = item.key"
              :class="[
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                activeTab === item.key 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white'
              ]"
            >
              <i :class="item.icon" class="mr-3 w-5 h-5"></i>
              {{ item.name }}
            </a>
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
              <a 
                v-for="item in navigationItems" 
                :key="item.name"
                href="#"
                @click="activeTab = item.key; sidebarOpen = false"
                :class="[
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  activeTab === item.key 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                ]"
              >
                <i :class="item.icon" class="mr-3 w-5 h-5"></i>
                {{ item.name }}
              </a>
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
        <!-- Dashboard Content -->
        <div v-if="activeTab === 'dashboard'" class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="(stat, index) in stats" 
              :key="index"
              class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div class="flex items-center">
                <div :class="stat.iconBg" class="w-12 h-12 rounded-lg flex items-center justify-center">
                  <i :class="stat.icon" class="text-white text-lg"></i>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-400">{{ stat.label }}</p>
                  <p class="text-2xl font-semibold text-white">{{ stat.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Live Chat Feed -->
            <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
              <div class="px-6 py-4 border-b border-slate-700">
                <h2 class="text-lg font-semibold text-white flex items-center">
                  <i class="fas fa-comments mr-2 text-blue-400"></i>
                  Live Chat Feed
                </h2>
              </div>
              
              <div class="p-6 max-h-96 overflow-y-auto custom-scrollbar">
                <div 
                  v-for="(msg, index) in chatMessages" 
                  :key="index"
                  class="flex items-start space-x-3 mb-4"
                >
                  <div :class="getAvatarColor(msg.name)" class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-medium text-xs">{{ msg.avatar }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-2 mb-1">
                      <span class="font-medium text-white text-sm">{{ msg.name }}</span>
                      <span class="text-gray-400 text-xs">{{ msg.time }}</span>
                    </div>
                    <p class="text-gray-300 text-sm bg-slate-700 rounded-lg p-3">{{ msg.message }}</p>
                  </div>
                </div>
              </div>

              <div class="px-6 py-4 border-t border-slate-700">
                <div class="flex space-x-3">
                  <input 
                    v-model="newMessage"
                    @keyup.enter="sendMessage"
                    type="text" 
                    placeholder="Share traffic updates..."
                    class="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                  <button 
                    @click="sendMessage"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Recent Updates -->
            <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
              <div class="px-6 py-4 border-b border-slate-700">
                <h2 class="text-lg font-semibold text-white flex items-center">
                  <i class="fas fa-clock mr-2 text-green-400"></i>
                  Recent Updates
                </h2>
              </div>
              
              <div class="p-6">
                <div 
                  v-for="(update, index) in recentUpdates" 
                  :key="index"
                  class="flex items-start space-x-4 mb-4 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer"
                >
                  <div class="relative flex-shrink-0 mt-1">
                    <div :class="update.statusColor" class="w-3 h-3 rounded-full"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                      <h3 class="font-medium text-white">{{ update.road }}</h3>
                      <span class="text-gray-400 text-xs">{{ update.time }}</span>
                    </div>
                    <p class="text-gray-300 text-sm">{{ update.status }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center">
              <i class="fas fa-bolt mr-2 text-yellow-400"></i>
              Quick Actions
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                v-for="(action, index) in quickActions" 
                :key="index"
                class="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <i :class="action.icon" class="text-2xl mb-2" :style="{ color: action.color }"></i>
                <span class="text-sm text-white font-medium">{{ action.name }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Live Traffic Tab Content -->
        <div v-else-if="activeTab === 'traffic'" class="space-y-6">
          <!-- Traffic Header -->
          <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 class="text-2xl font-bold text-white">Live Traffic Status</h1>
                <p class="text-gray-400 mt-1">Last updated: {{ lastUpdated }}</p>
              </div>
              <div class="flex items-center space-x-3 mt-4 sm:mt-0">
                <button 
                  @click="refreshData"
                  :class="[
                    'px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center space-x-2',
                    isRefreshing ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  ]"
                  :disabled="isRefreshing"
                >
                  <i :class="['fas fa-sync-alt', isRefreshing ? 'animate-spin' : '']"></i>
                  <span class="text-white">{{ isRefreshing ? 'Refreshing...' : 'Refresh Data' }}</span>
                </button>
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors flex items-center space-x-2">
                  <i class="fas fa-map"></i>
                  <span>Show Map View</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Traffic Filter -->
          <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
            <div class="flex flex-wrap items-center gap-3">
              <span class="text-white font-medium">Filter by status:</span>
              <button 
                v-for="filter in trafficFilters" 
                :key="filter.key"
                @click="activeFilter = filter.key"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2',
                  activeFilter === filter.key 
                    ? `${filter.bgActive} ${filter.textActive} ring-2 ring-opacity-50 ${filter.ring}` 
                    : `${filter.bgInactive} ${filter.textInactive} hover:${filter.bgHover}`
                ]"
              >
                <div :class="filter.dotColor" class="w-2 h-2 rounded-full"></div>
                <span>{{ filter.label }}</span>
              </button>
            </div>
          </div>

          <!-- Traffic Routes -->
          <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
            <div class="px-6 py-4 border-b border-slate-700">
              <h2 class="text-lg font-semibold text-white">Current Traffic Conditions</h2>
            </div>
            
            <div class="divide-y divide-slate-700">
              <div 
                v-for="(route, index) in filteredTrafficRoutes" 
                :key="index"
                class="p-6 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                      <h3 class="text-lg font-medium text-white">{{ route.from }} → {{ route.to }}</h3>
                      <span 
                        :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getTrafficStatusStyle(route.status)
                        ]"
                      >
                        {{ route.status }}
                      </span>
                    </div>
                    <div class="flex items-center space-x-4 text-gray-400 text-sm">
                      <span class="flex items-center">
                        <i class="fas fa-route mr-1"></i>
                        {{ route.distance }}
                      </span>
                      <span class="flex items-center">
                        <i class="fas fa-clock mr-1"></i>
                        {{ route.duration }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div :class="getTrafficIconColor(route.status)" class="w-4 h-4 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Auto-refresh Notice -->
          <div class="bg-slate-700 border border-slate-600 rounded-xl p-4">
            <div class="flex items-center space-x-2 text-gray-300 text-sm">
              <i class="fas fa-info-circle text-blue-400"></i>
              <span>Auto-refresh every 5 minutes. Next update in {{ nextUpdateIn }} minutes.</span>
            </div>
          </div>
        </div>

        <!-- Other tab contents would go here -->
        <div v-else class="flex items-center justify-center h-96">
          <div class="text-center">
            <i class="fas fa-construction text-4xl text-gray-500 mb-4"></i>
            <h3 class="text-lg font-medium text-white mb-2">Coming Soon</h3>
            <p class="text-gray-400">{{ getTabName(activeTab) }} features are under development</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NairobiConnect',
  data() {
    return {
      sidebarOpen: false,
      activeTab: 'dashboard',
      searchQuery: '',
      newMessage: '',
      navigationItems: [
        { name: 'Dashboard', icon: 'fas fa-home', key: 'dashboard' },
        { name: 'Live Traffic', icon: 'fas fa-traffic-light', key: 'traffic' },
        { name: 'Matatu Routes', icon: 'fas fa-bus', key: 'routes' },
        { name: 'Boda Directory', icon: 'fas fa-motorcycle', key: 'boda' },
        { name: 'Route Planner', icon: 'fas fa-route', key: 'planner' },
        { name: 'Notifications', icon: 'fas fa-bell', key: 'notifications' },
        { name: 'Help & Support', icon: 'fas fa-life-ring', key: 'support' }
      ],
      stats: [
        { 
          label: 'Active Routes', 
          value: '24', 
          icon: 'fas fa-route', 
          iconBg: 'bg-blue-500' 
        },
        { 
          label: 'Traffic Reports', 
          value: '12', 
          icon: 'fas fa-exclamation-triangle', 
          iconBg: 'bg-red-500' 
        },
        { 
          label: 'Online Users', 
          value: '1.2k', 
          icon: 'fas fa-users', 
          iconBg: 'bg-green-500' 
        },
        { 
          label: 'Boda Available', 
          value: '89', 
          icon: 'fas fa-motorcycle', 
          iconBg: 'bg-purple-500' 
        }
      ],
      chatMessages: [
        {
          name: 'Wanjiru',
          message: 'Anyone knows if Thika Road is clear?',
          time: '10:30 AM',
          avatar: 'W'
        },
        {
          name: 'Kamau',
          message: "Heavy traffic near Garden City. Use alternative routes.",
          time: '10:32 AM',
          avatar: 'K'
        },
        {
          name: 'Akinyi',
          message: 'Mombasa Road also congested. Waiyaki Way is better.',
          time: '10:35 AM',
          avatar: 'A'
        },
        {
          name: 'Mutua',
          message: 'Thanks for the update! Taking Waiyaki Way now.',
          time: '10:40 AM',
          avatar: 'M'
        }
      ],
      recentUpdates: [
        {
          road: 'Thika Road',
          time: '15 mins ago',
          status: 'Heavy traffic near Garden City Mall',
          statusColor: 'bg-red-500'
        },
        {
          road: 'Mombasa Road',
          time: '25 mins ago',
          status: 'Accident cleared, traffic normalizing',
          statusColor: 'bg-yellow-500'
        },
        {
          road: 'Waiyaki Way',
          time: '40 mins ago',
          status: 'Clear traffic all through to Westlands',
          statusColor: 'bg-green-500'
        },
        {
          road: 'Ngong Road',
          time: '55 mins ago',
          status: 'Minor congestion at Prestige Plaza',
          statusColor: 'bg-yellow-500'
        }
      ],
      quickActions: [
        { name: 'Report Traffic', icon: 'fas fa-exclamation-circle', color: '#ef4444' },
        { name: 'Find Route', icon: 'fas fa-search-location', color: '#3b82f6' },
        { name: 'Book Boda', icon: 'fas fa-motorcycle', color: '#10b981' },
        { name: 'Emergency', icon: 'fas fa-phone', color: '#f59e0b' }
      ],
      // Live Traffic Data
      isRefreshing: false,
      lastUpdated: '2:51:05 PM',
      activeFilter: 'all',
      nextUpdateIn: 3,
      trafficFilters: [
        { 
          key: 'all', 
          label: 'All Routes', 
          dotColor: 'bg-gray-400', 
          bgActive: 'bg-blue-600', 
          textActive: 'text-white',
          bgInactive: 'bg-slate-700',
          textInactive: 'text-gray-300',
          bgHover: 'bg-slate-600',
          ring: 'ring-blue-300'
        },
        { 
          key: 'severe', 
          label: 'Severe', 
          dotColor: 'bg-red-600', 
          bgActive: 'bg-red-600', 
          textActive: 'text-white',
          bgInactive: 'bg-slate-700',
          textInactive: 'text-gray-300',
          bgHover: 'bg-slate-600',
          ring: 'ring-red-300'
        },
        { 
          key: 'heavy', 
          label: 'Heavy', 
          dotColor: 'bg-orange-500', 
          bgActive: 'bg-orange-500', 
          textActive: 'text-white',
          bgInactive: 'bg-slate-700',
          textInactive: 'text-gray-300',
          bgHover: 'bg-slate-600',
          ring: 'ring-orange-300'
        },
        { 
          key: 'moderate', 
          label: 'Moderate', 
          dotColor: 'bg-yellow-500', 
          bgActive: 'bg-yellow-500', 
          textActive: 'text-black',
          bgInactive: 'bg-slate-700',
          textInactive: 'text-gray-300',
          bgHover: 'bg-slate-600',
          ring: 'ring-yellow-300'
        },
        { 
          key: 'light', 
          label: 'Light', 
          dotColor: 'bg-green-500', 
          bgActive: 'bg-green-500', 
          textActive: 'text-white',
          bgInactive: 'bg-slate-700',
          textInactive: 'text-gray-300',
          bgHover: 'bg-slate-600',
          ring: 'ring-green-300'
        }
      ],
      trafficRoutes: [
        {
          from: 'CBD',
          to: 'Westlands',
          distance: '8.2 km',
          duration: '25 min',
          status: 'moderate'
        },
        {
          from: 'Kasarani',
          to: 'CBD',
          distance: '15.3 km',
          duration: '45 min',
          status: 'heavy'
        },
        {
          from: 'Karen',
          to: 'CBD',
          distance: '12.1 km',
          duration: '18 min',
          status: 'light'
        },
        {
          from: 'Kiambu Road',
          to: 'Thika Road',
          distance: '22.5 km',
          duration: '1hr 10min',
          status: 'severe'
        },
        {
          from: 'Juja',
          to: 'CBD',
          distance: '28.7 km',
          duration: '1hr 25min',
          status: 'heavy'
        },
        {
          from: 'Rongai',
          to: 'CBD',
          distance: '18.9 km',
          duration: '35 min',
          status: 'moderate'
        }
      ]
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.chatMessages.push({
          name: 'You',
          message: this.newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: 'Y'
        });
        this.newMessage = '';
      }
    },
    getAvatarColor(name) {
      const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
        'bg-red-500', 'bg-yellow-500', 'bg-indigo-500'
      ];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index];
    },
    getTabName(key) {
      const item = this.navigationItems.find(item => item.key === key);
      return item ? item.name : 'Unknown';
    },
    // Live Traffic Methods
    refreshData() {
      this.isRefreshing = true;
      // Simulate API call
      setTimeout(() => {
        this.isRefreshing = false;
        this.lastUpdated = new Date().toLocaleTimeString();
        this.nextUpdateIn = 5;
      }, 2000);
    },
    getTrafficStatusStyle(status) {
      const styles = {
        'severe': 'bg-red-100 text-red-800',
        'heavy': 'bg-orange-100 text-orange-800',
        'moderate': 'bg-yellow-100 text-yellow-800',
        'light': 'bg-green-100 text-green-800'
      };
      return styles[status] || 'bg-gray-100 text-gray-800';
    },
    getTrafficIconColor(status) {
      const colors = {
        'severe': 'bg-red-500',
        'heavy': 'bg-orange-500',
        'moderate': 'bg-yellow-500',
        'light': 'bg-green-500'
      };
      return colors[status] || 'bg-gray-500';
    }
  },
  computed: {
    filteredTrafficRoutes() {
      if (this.activeFilter === 'all') {
        return this.trafficRoutes;
      }
      return this.trafficRoutes.filter(route => route.status === this.activeFilter);
    }
  },
  mounted() {
    // Start countdown timer for next update
    setInterval(() => {
      if (this.nextUpdateIn > 0) {
        this.nextUpdateIn--;
      } else {
        this.nextUpdateIn = 5;
        // Auto-refresh could be implemented here
      }
    }, 60000); // Update every minute
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