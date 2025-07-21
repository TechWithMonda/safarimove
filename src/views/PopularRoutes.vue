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
              <div class="flex justify-between items-center mb-2">
                <h4 class="text-sm font-semibold text-gray-400">Route stops:</h4>
                <button 
                  @click="toggleShowAllStops(route.id)"
                  class="text-blue-400 hover:text-blue-300 text-xs focus:outline-none"
                >
                  {{ showAllStops[route.id] ? 'Show less' : 'Show all' }}
                </button>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <template v-for="(stop, index) in getVisibleStops(route)" :key="index">
                  <div class="relative group">
                    <a 
                      :href="typeof stop === 'object' ? stop.map : `https://www.google.com/maps/search/?api=1&query=${stop}+Nairobi`" 
                      target="_blank"
                      class="bg-slate-700 text-white px-3 py-1 rounded-full text-sm hover:bg-slate-600 transition-colors flex items-center"
                    >
                      <span>{{ typeof stop === 'object' ? stop.name : stop }}</span>
                      <i class="fas fa-external-link-alt ml-1 text-xs opacity-0 group-hover:opacity-70 transition-opacity"></i>
                    </a>
                    <span class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {{ index + 1 }}
                    </span>
                  </div>
                </template>
              </div>
              
              <!-- Route visualization -->
              <div class="mt-4 relative">
                <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                    :style="{ width: `${(getVisibleStops(route).length / route.stops.length) * 100}%` }"
                  ></div>
                </div>
                <div class="flex justify-between mt-1 text-xs text-gray-400">
                  <span>Start</span>
                  <span>{{ getVisibleStops(route).length }} of {{ route.stops.length }} stops</span>
                  <span>End</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'PopularRoutes',
  props: ['searchQuery'],
  setup() {
    const routeSearchQuery = ref('');
    const showAllStops = ref({}); // Using ref for reactivity
    
    const popularRoutes = ref([
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
        stops: [
          { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
          { name: 'Westlands', map: 'https://www.google.com/maps/search/?api=1&query=Westlands+Nairobi' },
          { name: 'Kangemi', map: 'https://www.google.com/maps/search/?api=1&query=Kangemi+Nairobi' },
          { name: 'Kinoo', map: 'https://www.google.com/maps/search/?api=1&query=Kinoo+Nairobi' },
          { name: 'Kikuyu', map: 'https://www.google.com/maps/search/?api=1&query=Kikuyu+Nairobi' }
        ],
        popular: true
      },
      
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
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Westlands', map: 'https://www.google.com/maps/search/?api=1&query=Westlands+Nairobi' },
            { name: 'Kangemi', map: 'https://www.google.com/maps/search/?api=1&query=Kangemi+Nairobi' },
            { name: 'Kinoo', map: 'https://www.google.com/maps/search/?api=1&query=Kinoo+Nairobi' },
            { name: 'Kikuyu', map: 'https://www.google.com/maps/search/?api=1&query=Kikuyu+Nairobi' }
          ],
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
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'South C', map: 'https://www.google.com/maps/search/?api=1&query=South+C+Nairobi' },
            { name: 'Galleria', map: 'https://www.google.com/maps/search/?api=1&query=Galleria+Mall+Nairobi' },
            { name: 'Bomas', map: 'https://www.google.com/maps/search/?api=1&query=Bomas+of+Kenya' },
            { name: 'Rongai', map: 'https://www.google.com/maps/search/?api=1&query=Rongai+Nairobi' }
          ],
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
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Ngara', map: 'https://www.google.com/maps/search/?api=1&query=Ngara+Nairobi' },
            { name: 'Westlands', map: 'https://www.google.com/maps/search/?api=1&query=Westlands+Nairobi' },
            { name: 'Kawangware', map: 'https://www.google.com/maps/search/?api=1&query=Kawangware+Nairobi' }
          ],
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
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Adams Arcade', map: 'https://www.google.com/maps/search/?api=1&query=Adams+Arcade+Nairobi' },
            { name: 'Hardy', map: 'https://www.google.com/maps/search/?api=1&query=Hardy+Nairobi' },
            { name: 'Karen', map: 'https://www.google.com/maps/search/?api=1&query=Karen+Nairobi' }
          ],
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
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Landhies Rd', map: 'https://www.google.com/maps/search/?api=1&query=Landhies+Road+Nairobi' },
            { name: 'Pumwani', map: 'https://www.google.com/maps/search/?api=1&query=Pumwani+Nairobi' },
            { name: 'Jogoo Rd', map: 'https://www.google.com/maps/search/?api=1&query=Jogoo+Road+Nairobi' },
            { name: 'Utawala', map: 'https://www.google.com/maps/search/?api=1&query=Utawala+Nairobi' },
            { name: 'Dandora', map: 'https://www.google.com/maps/search/?api=1&query=Dandora+Nairobi' }
          ],
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
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Landhies Rd', map: 'https://www.google.com/maps/search/?api=1&query=Landhies+Road+Nairobi' },
            { name: 'Pumwani', map: 'https://www.google.com/maps/search/?api=1&query=Pumwani+Nairobi' },
            { name: 'Jogoo Rd', map: 'https://www.google.com/maps/search/?api=1&query=Jogoo+Road+Nairobi' },
            { name: 'Buruburu', map: 'https://www.google.com/maps/search/?api=1&query=Buruburu+Nairobi' }
          ],
          popular: false
        },
        {
          id: 'route-44',
          number: '44',
          name: 'Kasarani Route',
          from: 'CBD',
          to: 'Kasarani',
          fare: 'KSh 30-50',
          frequency: '5-10 min',
          capacity: '14 seater',
          stages: '4',
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Ngara', map: 'https://www.google.com/maps/search/?api=1&query=Ngara+Nairobi' },
            { name: 'Muthaiga', map: 'https://www.google.com/maps/search/?api=1&query=Muthaiga+Nairobi' },
            { name: 'Kasarani', map: 'https://www.google.com/maps/search/?api=1&query=Kasarani+Nairobi' }
          ],
          popular: true
        },
        {
          id: 'route-17B',
          number: '17B',
          name: 'Komarock Route',
          from: 'CBD',
          to: 'Komarock',
          fare: 'KSh 40-70',
          frequency: '6-12 min',
          capacity: '14 seater',
          stages: '5',
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Landhies Rd', map: 'https://www.google.com/maps/search/?api=1&query=Landhies+Road+Nairobi' },
            { name: 'Mukuru', map: 'https://www.google.com/maps/search/?api=1&query=Mukuru+Nairobi' },
            { name: 'Kariobangi South', map: 'https://www.google.com/maps/search/?api=1&query=Kariobangi+South+Nairobi' },
            { name: 'Komarock', map: 'https://www.google.com/maps/search/?api=1&query=Komarock+Nairobi' }
          ],
          popular: true
        },
        {
          id: 'route-32B',
          number: '32B',
          name: 'Pipeline Route',
          from: 'CBD',
          to: 'Pipeline',
          fare: 'KSh 40-60',
          frequency: '5-8 min',
          capacity: '14 seater',
          stages: '4',
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Landhies Rd', map: 'https://www.google.com/maps/search/?api=1&query=Landhies+Road+Nairobi' },
            { name: 'Donholm', map: 'https://www.google.com/maps/search/?api=1&query=Donholm+Nairobi' },
            { name: 'Pipeline', map: 'https://www.google.com/maps/search/?api=1&query=Pipeline+Nairobi' }
          ],
          popular: true
        },
        {
          id: 'route-33C',
          number: '33C',
          name: 'Embakasi Route',
          from: 'CBD',
          to: 'Embakasi',
          fare: 'KSh 40-70',
          frequency: '5-10 min',
          capacity: '14 seater',
          stages: '4',
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Jogoo Rd', map: 'https://www.google.com/maps/search/?api=1&query=Jogoo+Road+Nairobi' },
            { name: 'Makadara', map: 'https://www.google.com/maps/search/?api=1&query=Makadara+Nairobi' },
            { name: 'Embakasi', map: 'https://www.google.com/maps/search/?api=1&query=Embakasi+Nairobi' }
          ],
          popular: false
        },
        {
          id: 'route-125',
          number: '125',
          name: 'Kitengela Route',
          from: 'CBD',
          to: 'Kitengela',
          fare: 'KSh 80-150',
          frequency: '20-30 min',
          capacity: '25 seater',
          stages: '6',
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Nyayo Stadium', map: 'https://www.google.com/maps/search/?api=1&query=Nyayo+Stadium+Nairobi' },
            { name: 'South B', map: 'https://www.google.com/maps/search/?api=1&query=South+B+Nairobi' },
            { name: 'Athi River', map: 'https://www.google.com/maps/search/?api=1&query=Athi+River' },
            { name: 'Mlolongo', map: 'https://www.google.com/maps/search/?api=1&query=Mlolongo' },
            { name: 'Kitengela', map: 'https://www.google.com/maps/search/?api=1&query=Kitengela' }
          ],
          popular: false
        },
        {
          id: 'route-12C',
          number: '12C',
          name: 'Kariobangi Route',
          from: 'CBD',
          to: 'Kariobangi',
          fare: 'KSh 30-50',
          frequency: '6-10 min',
          capacity: '14 seater',
          stages: '4',
          stops: [
            { name: 'CBD', map: 'https://www.google.com/maps/search/?api=1&query=CBD+Nairobi' },
            { name: 'Pumwani', map: 'https://www.google.com/maps/search/?api=1&query=Pumwani+Nairobi' },
            { name: 'Eastleigh', map: 'https://www.google.com/maps/search/?api=1&query=Eastleigh+Nairobi' },
            { name: 'Kariobangi', map: 'https://www.google.com/maps/search/?api=1&query=Kariobangi+Nairobi' }
          ],
          popular: false
        }
      ]
      // ... (rest of your route data remains the same)
    );

    const filteredPopularRoutes = computed(() => {
      if (!routeSearchQuery.value) {
        return popularRoutes.value;
      }
      const query = routeSearchQuery.value.toLowerCase();
      return popularRoutes.value.filter(route => 
        route.number.toLowerCase().includes(query) ||
        route.name.toLowerCase().includes(query) ||
        route.from.toLowerCase().includes(query) ||
        route.to.toLowerCase().includes(query) ||
        route.stops.some(stop => {
          const stopName = typeof stop === 'object' ? stop.name : stop;
          return stopName.toLowerCase().includes(query);
        })
      );
    });

    function refreshRoutes() {
      // Simulate refreshing route data
      console.log("Refreshing route data...");
    }

    function toggleShowAllStops(routeId) {
      showAllStops.value = {
        ...showAllStops.value,
        [routeId]: !showAllStops.value[routeId]
      };
    }

    function getVisibleStops(route) {
      // Show first 3 stops by default, or all if toggled
      return showAllStops.value[route.id] ? route.stops : route.stops.slice(0, 3);
    }

    return {
      routeSearchQuery,
      showAllStops,
      popularRoutes,
      filteredPopularRoutes,
      refreshRoutes,
      toggleShowAllStops,
      getVisibleStops
    };
  }
}
</script>

<style scoped>
/* Your styles remain the same */
</style>