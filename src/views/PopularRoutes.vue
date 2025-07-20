<template>
  <div class="space-y-6">
    <!-- Routes Header -->
    <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">Popular Matatu Routes</h1>
          <p class="text-gray-400 mt-1">Search for your regular commute routes</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-search text-gray-400"></i>
            </div>
            <input 
              v-model="routeSearchQuery"
              type="text" 
              placeholder="Search routes..."
              class="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Refresh Button -->
    <div class="flex justify-end">
      <button 
        @click="refreshRoutes"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2"
      >
        <i class="fas fa-sync-alt"></i>
        <span>Refresh</span>
      </button>
    </div>

    <!-- Route Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="route in filteredPopularRoutes" 
        :key="route.id"
        class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
      >
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-xl font-bold text-white">Route {{ route.number }}</h2>
              <p class="text-gray-400">{{ route.name }}</p>
            </div>
            <span 
              v-if="route.popular"
              class="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded"
            >
              Popular
            </span>
          </div>
          
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-white">{{ route.from }} → {{ route.to }}</h3>
            
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p class="text-gray-400 text-sm">Fare range</p>
                <p class="text-white font-medium">{{ route.fare }}</p>
              </div>
              <div>
                <p class="text-gray-400 text-sm">Frequency</p>
                <p class="text-white font-medium">{{ route.frequency }}</p>
              </div>
              <div>
                <p class="text-gray-400 text-sm">Capacity</p>
                <p class="text-white font-medium">{{ route.capacity }}</p>
              </div>
              <div>
                <p class="text-gray-400 text-sm">Route length</p>
                <p class="text-white font-medium">{{ route.stages }} stages</p>
              </div>
            </div>
            
            <div class="mt-6">
              <h4 class="text-sm font-semibold text-gray-400 mb-2">Route stops:</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(stop, index) in route.stops" 
                  :key="index"
                  class="bg-slate-700 text-white px-3 py-1 rounded-full text-sm hover:bg-slate-600 transition-colors"
                >
                  {{ stop }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopularRoutes',
  props: ['searchQuery'],
  data() {
    return {
      routeSearchQuery: '',
      popularRoutes: [
        {
          id: 'route-46',
          number: '46',
          name: 'Kikuyu Route',
          from: 'CBD',
          to: 'Kikuyu',
          fare: 'KSh 50-80',
          frequency: '5-10 min',
          capacity: '14 seater',
          stages: '5',
          stops: ['CBD', 'Westlands', 'Kangemi', 'Kinoo', 'Kikuyu'],
          popular: true
        },
        {
          id: 'route-34',
          number: '34',
          name: 'Rongai Route',
          from: 'CBD',
          to: 'Rongai',
          fare: 'KSh 60-100',
          frequency: '10-15 min',
          capacity: '14 seater',
          stages: '5',
          stops: ['CBD', 'South C', 'Galleria', 'Bomas', 'Rongai'],
          popular: true
        },
        {
          id: 'route-11',
          number: '11',
          name: 'Kawangware Route',
          from: 'CBD',
          to: 'Kawangware',
          fare: 'KSh 30-50',
          frequency: '3-5 min',
          capacity: '14 seater',
          stages: '4',
          stops: ['CBD', 'Ngara', 'Westlands', 'Kawangware'],
          popular: false
        },
        {
          id: 'route-24',
          number: '24',
          name: 'Karen Route',
          from: 'CBD',
          to: 'Karen',
          fare: 'KSh 80-120',
          frequency: '15-20 min',
          capacity: '25 seater',
          stages: '4',
          stops: ['CBD', 'Adams Arcade', 'Hardy', 'Karen'],
          popular: false
        },
        {
          id: 'route-23',
          number: '23',
          name: 'Dandora Route',
          from: 'CBD',
          to: 'Dandora',
          fare: 'KSh 40-70',
          frequency: '7-10 min',
          capacity: '14 seater',
          stages: '6',
          stops: ['CBD', 'Landhies Rd', 'Pumwani', 'Jogoo Rd', 'Utawala', 'Dandora'],
          popular: false
        },
        {
          id: 'route-8',
          number: '8',
          name: 'Buruburu Route',
          from: 'CBD',
          to: 'Buruburu',
          fare: 'KSh 40-60',
          frequency: '5-8 min',
          capacity: '14 seater',
          stages: '5',
          stops: ['CBD', 'Landhies Rd', 'Pumwani', 'Jogoo Rd', 'Buruburu'],
          popular: false
        }
      ]
    }
  },
  computed: {
    filteredPopularRoutes() {
      if (!this.routeSearchQuery) {
        return this.popularRoutes;
      }
      const query = this.routeSearchQuery.toLowerCase();
      return this.popularRoutes.filter(route => 
        route.number.toLowerCase().includes(query) ||
        route.name.toLowerCase().includes(query) ||
        route.from.toLowerCase().includes(query) ||
        route.to.toLowerCase().includes(query) ||
        route.stops.some(stop => stop.toLowerCase().includes(query))
      );
    }
  },
  methods: {
    refreshRoutes() {
      // Simulate refreshing route data
      console.log("Refreshing route data...");
    }
  }
}
</script>