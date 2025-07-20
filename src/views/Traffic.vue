<template>
  <div class="space-y-6">
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
</template>

<script>
export default {
  name: 'Traffic',
  props: ['searchQuery'],
  data() {
    return {
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
  computed: {
    filteredTrafficRoutes() {
      if (this.activeFilter === 'all') {
        return this.trafficRoutes;
      }
      return this.trafficRoutes.filter(route => route.status === this.activeFilter);
    }
  },
  methods: {
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