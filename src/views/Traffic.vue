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

    <!-- Search Section -->
    <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-300 mb-1">Origin</label>
          <input
            v-model="origin"
            type="text"
            placeholder="Enter origin (e.g., Kisii)"
            class="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keyup.enter="fetchTrafficData"
          >
          <i class="fas fa-map-marker-alt absolute right-3 bottom-3 text-gray-400"></i>
        </div>
        <div class="relative">
          <label class="block text-sm font-medium text-gray-300 mb-1">Destination</label>
          <input
            v-model="destination"
            type="text"
            placeholder="Enter destination (e.g., CBD, Nairobi)"
            class="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keyup.enter="fetchTrafficData"
          >
          <i class="fas fa-map-marker-alt absolute right-3 bottom-3 text-gray-400"></i>
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <button 
          @click="fetchTrafficData"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2"
        >
          <i class="fas fa-search"></i>
          <span>Search Route</span>
        </button>
        <button 
          v-if="trafficData && !isFavorite"
          @click="addToFavorites"
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors flex items-center space-x-2"
        >
          <i class="fas fa-star"></i>
          <span>Save to Favorites</span>
        </button>
        <button 
          v-if="trafficData && isFavorite"
          @click="removeFromFavorites"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors flex items-center space-x-2"
        >
          <i class="fas fa-star"></i>
          <span>Saved</span>
        </button>
      </div>
    </div>

    <!-- Favorites Section -->
    <div v-if="favorites.length > 0" class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
      <div class="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-white">Favorite Routes</h2>
        <button 
          @click="showFavorites = !showFavorites"
          class="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
        >
          <span>{{ showFavorites ? 'Hide' : 'Show' }}</span>
          <i :class="['fas', showFavorites ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
      </div>
      <div v-if="showFavorites" class="divide-y divide-slate-700">
        <div 
          v-for="(fav, index) in favorites" 
          :key="'fav-'+index" 
          class="p-6 hover:bg-slate-700 transition-colors cursor-pointer group"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1" @click="loadFavorite(fav)">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-medium text-white">{{ fav.origin }} → {{ fav.destination }}</h3>
                <span 
                  v-if="fav.traffic_level"
                  :class="getTrafficStatusStyle(fav.traffic_level)" 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ fav.traffic_level }}
                </span>
              </div>
              <div v-if="fav.distance" class="flex items-center space-x-4 text-gray-400 text-sm">
                <span class="flex items-center">
                  <i class="fas fa-route mr-1"></i>
                  {{ fav.distance }}
                </span>
                <span v-if="fav.duration || fav.duration_in_traffic" class="flex items-center">
                  <i class="fas fa-clock mr-1"></i>
                  {{ fav.duration_in_traffic || fav.duration }}
                </span>
              </div>
              <div v-else class="text-gray-400 text-sm">
                Click to load traffic data
              </div>
            </div>
            <div class="ml-4 flex items-center space-x-2">
              <div 
                v-if="fav.traffic_level"
                :class="getTrafficIconColor(fav.traffic_level)" 
                class="w-4 h-4 rounded-full"
              ></div>
              <button 
                @click.stop="removeFromFavorites(fav)"
                class="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from favorites"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
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

    <!-- Traffic Routes Display -->
    <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
      <div class="px-6 py-4 border-b border-slate-700">
        <h2 class="text-lg font-semibold text-white">Current Traffic Conditions</h2>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="p-6 text-center">
        <i class="fas fa-circle-notch fa-spin fa-2x text-blue-400"></i>
        <p class="mt-2 text-gray-400">Loading traffic data...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!trafficData && !origin && !destination" class="p-6 text-center">
        <i class="fas fa-route fa-2x text-gray-500 mb-3"></i>
        <h3 class="text-lg font-medium text-gray-300 mb-1">
          No traffic data available
        </h3>
        <p class="text-gray-400 mb-4">
          Enter origin and destination to check traffic conditions
        </p>
      </div>
      
      <!-- Results -->
      <div v-else-if="trafficData" class="divide-y divide-slate-700">
        <div class="p-6 hover:bg-slate-700 transition-colors cursor-pointer">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-medium text-white">{{ trafficData.origin }} → {{ trafficData.destination }}</h3>
                <span :class="getTrafficStatusStyle(trafficData.traffic_level)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ trafficData.traffic_level }}
                </span>
              </div>
              <div class="flex items-center space-x-4 text-gray-400 text-sm">
                <span class="flex items-center">
                  <i class="fas fa-route mr-1"></i>
                  {{ trafficData.distance }}
                </span>
                <span class="flex items-center">
                  <i class="fas fa-clock mr-1"></i>
                  {{ trafficData.duration_in_traffic || trafficData.duration }}
                </span>
              </div>
            </div>
            <div class="ml-4">
              <div :class="getTrafficIconColor(trafficData.traffic_level)" class="w-4 h-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preloaded Routes Section -->
    <div v-if="trafficRoutes.length" class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
      <div class="px-6 py-4 border-b border-slate-700">
        <h2 class="text-lg font-semibold text-white">Live Traffic for Popular Routes</h2>
      </div>
      <div class="divide-y divide-slate-700">
        <div 
          v-for="(route, index) in trafficRoutes" 
          :key="index" 
          class="p-6 hover:bg-slate-700 transition-colors cursor-pointer group"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-medium text-white">{{ route.origin }} → {{ route.destination }}</h3>
                <span :class="getTrafficStatusStyle(route.traffic_level)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ route.traffic_level }}
                </span>
              </div>
              <div class="flex items-center space-x-4 text-gray-400 text-sm">
                <span class="flex items-center">
                  <i class="fas fa-route mr-1"></i>
                  {{ route.distance }}
                </span>
                <span class="flex items-center">
                  <i class="fas fa-clock mr-1"></i>
                  {{ route.duration_in_traffic || route.duration }}
                </span>
              </div>
            </div>
            <div class="ml-4 flex items-center space-x-2">
              <div :class="getTrafficIconColor(route.traffic_level)" class="w-4 h-4 rounded-full"></div>
              <button 
                @click.stop="addToFavorites(route)"
                class="text-gray-400 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Add to favorites"
                v-if="!isRouteFavorite(route)"
              >
                <i class="far fa-star"></i>
              </button>
              <button 
                @click.stop="removeFromFavorites(route)"
                class="text-yellow-400 opacity-100 group-hover:opacity-100 transition-opacity"
                title="Remove from favorites"
                v-else
              >
                <i class="fas fa-star"></i>
              </button>
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
  data() {
    return {
      isRefreshing: false,
      isLoading: false,
      lastUpdated: 'Never',
      activeFilter: 'all',
      nextUpdateIn: 5,
      origin: '',
      destination: '',
      trafficData: null,
      trafficRoutes: [],
      favorites: [],
      showFavorites: true,
      preloadedRoutes: [
        { origin: 'Kasarani, Nairobi', destination: 'CBD, Nairobi' },
        { origin: 'Pipeline, Nairobi', destination: 'CBD, Nairobi' },
        { origin: 'Kikuyu, Nairobi', destination: 'CBD, Nairobi' },
        { origin: 'Langata, Nairobi', destination: 'CBD, Nairobi' },
      ],
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
      ]
    }
  },
  computed: {
    filteredTrafficRoutes() {
      if (!this.trafficData) return [];
      return [this.trafficData].filter(route => 
        this.activeFilter === 'all' || route.traffic_level === this.activeFilter
      );
    },
    isFavorite() {
      if (!this.trafficData) return false;
      return this.favorites.some(fav => 
        fav.origin === this.trafficData.origin && 
        fav.destination === this.trafficData.destination
      );
    }
  },
  methods: {
    async fetchTrafficData() {
      if (!this.origin || !this.destination) return;
      
      this.isLoading = true;
      this.isRefreshing = true;
      
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/traffic/?origin=${encodeURIComponent(this.origin)}&destination=${encodeURIComponent(this.destination)}`
        );
        const data = await response.json();
        
        this.trafficData = {
          origin: data.origin,
          destination: data.destination,
          distance: data.distance,
          duration: data.duration,
          duration_in_traffic: data.duration_in_traffic,
          status: data.traffic_level,
          traffic_level: data.traffic_level
        };
        this.lastUpdated = new Date().toLocaleTimeString();
        this.nextUpdateIn = 5;
      } catch (error) {
        console.error('Error fetching traffic data:', error);
        this.trafficData = null;
      } finally {
        this.isLoading = false;
        this.isRefreshing = false;
      }
    },
    async fetchPreloadedRoutes() {
      this.isLoading = true;
      const requests = this.preloadedRoutes.map(async ({ origin, destination }) => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/traffic/?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
          );
          const data = await response.json();
          return {
            origin: data.origin,
            destination: data.destination,
            distance: data.distance,
            duration: data.duration,
            duration_in_traffic: data.duration_in_traffic,
            traffic_level: data.traffic_level
          };
        } catch (error) {
          console.error("Error fetching route:", origin, "→", destination, error);
          return null;
        }
      });

      const results = await Promise.all(requests);
      this.trafficRoutes = results.filter(route => route !== null);
      this.isLoading = false;
    },
    refreshData() {
      if (this.origin && this.destination) {
        this.fetchTrafficData();
      }
      this.fetchPreloadedRoutes();
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
    },
    addToFavorites(route = null) {
      const favoriteRoute = route || this.trafficData;
      if (!favoriteRoute) return;
      
      // Check if already in favorites
      if (this.favorites.some(fav => 
        fav.origin === favoriteRoute.origin && 
        fav.destination === favoriteRoute.destination
      )) {
        return;
      }
      
      this.favorites.push({
        origin: favoriteRoute.origin,
        destination: favoriteRoute.destination,
        distance: favoriteRoute.distance,
        duration: favoriteRoute.duration,
        duration_in_traffic: favoriteRoute.duration_in_traffic,
        traffic_level: favoriteRoute.traffic_level
      });
      
      this.saveFavorites();
    },
    removeFromFavorites(route = null) {
      const favoriteToRemove = route || this.trafficData;
      if (!favoriteToRemove) return;
      
      this.favorites = this.favorites.filter(fav => 
        !(fav.origin === favoriteToRemove.origin && 
          fav.destination === favoriteToRemove.destination)
      );
      
      this.saveFavorites();
    },
    loadFavorite(favorite) {
      this.origin = favorite.origin;
      this.destination = favorite.destination;
      this.fetchTrafficData();
    },
    isRouteFavorite(route) {
      return this.favorites.some(fav => 
        fav.origin === route.origin && 
        fav.destination === route.destination
      );
    },
    saveFavorites() {
      localStorage.setItem('trafficFavorites', JSON.stringify(this.favorites));
    },
    loadFavorites() {
      const savedFavorites = localStorage.getItem('trafficFavorites');
      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites);
      }
    }
  },
  mounted() {
    this.loadFavorites();
    this.fetchPreloadedRoutes();
    
    // Auto-refresh timer
    setInterval(() => {
      if (this.nextUpdateIn > 0) {
        this.nextUpdateIn--;
      } else {
        this.refreshData();
      }
    }, 60000);
  },
  watch: {
    activeFilter() {
      // Handle filter changes
    }
  }
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>