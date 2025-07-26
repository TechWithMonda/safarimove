<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex-1 min-w-0">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 truncate">Traffic Dashboard</h1>
          <div class="flex items-center text-gray-400">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span class="truncate">Real-time monitoring system</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-3">
          <div class="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl px-4 py-2 whitespace-nowrap">
            <span class="text-sm text-gray-300">Last updated: 2 min ago</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="group relative overflow-hidden bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] hover:border-slate-600"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div :class="stat.iconBg" class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <i :class="stat.icon" class="text-white text-xl"></i>
              </div>
              <div v-if="stat.trend" class="text-right">
                <span 
                  class="text-xs font-medium px-2 py-1 rounded-full"
                  :class="stat.trend.includes('↑') ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'"
                >
                  <i :class="stat.trend.includes('↑') ? 'fas fa-arrow-up' : 'fas fa-arrow-down'" class="mr-1"></i>
                  {{ stat.trend }}
                </span>
              </div>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-400 mb-1">{{ stat.label }}</p>
              <p class="text-2xl md:text-3xl font-bold text-white">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
      <!-- Live Chat Feed -->
      <div class="xl:col-span-2">
        <div class="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden h-full">
          <div class="px-6 py-4 border-b border-slate-700/50 bg-slate-700/30">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-comments text-white text-sm"></i>
              </div>
              Live Traffic Feed
              <div class="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </h2>
          </div>
          <div class="p-6">
            <LiveChatFeed />
          </div>
        </div>
      </div>

      <!-- Recent Updates -->
      <div class="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-700/50 bg-slate-700/30">
          <h2 class="text-xl font-semibold text-white flex items-center">
            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-clock text-white text-sm"></i>
            </div>
            Recent Updates
          </h2>
        </div>
        
        <div class="p-4 max-h-96 overflow-y-auto custom-scrollbar">
          <div class="space-y-3">
            <div
              v-for="(update, index) in recentUpdates"
              :key="index"
              class="group flex items-start space-x-4 p-4 bg-slate-700/40 rounded-xl hover:bg-slate-700/60 transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-600/50"
            >
              <div class="relative flex-shrink-0 mt-1">
                <div :class="update.statusColor" class="w-3 h-3 rounded-full shadow-lg"></div>
                <div :class="update.statusColor" class="absolute inset-0 rounded-full animate-ping opacity-30"></div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-white group-hover:text-blue-300 transition-colors">{{ update.road }}</h3>
                  <span class="text-gray-400 text-xs bg-slate-600/50 px-2 py-1 rounded-full">{{ update.time }}</span>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed">{{ update.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden w-full">
      <div class="px-6 py-4 border-b border-slate-700/50 bg-slate-700/30">
        <h2 class="text-xl font-semibold text-white flex items-center">
          <div class="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-bolt text-white text-sm"></i>
          </div>
          Quick Actions
        </h2>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          <button
            v-for="(action, index) in quickActions"
            :key="index"
            @click="handleQuickAction(action)"
            class="group relative overflow-hidden flex flex-col items-center p-4 bg-slate-700/40 rounded-xl hover:bg-slate-700/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 hover:scale-[1.03]"
            :aria-label="action.name"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-slate-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200" :style="{ backgroundColor: action.color + '20' }">
                <i :class="action.icon" class="text-xl transition-transform duration-200 group-hover:scale-110" :style="{ color: action.color }"></i>
              </div>
              <span class="text-xs sm:text-sm text-white font-medium text-center leading-tight group-hover:text-blue-300 transition-colors px-1">{{ action.name }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LiveChatFeed from '../components/LiveChatFeed.vue';
import { useTrafficStore } from '@/stores/traffic';

const trafficStore = useTrafficStore();
const recentUpdates = trafficStore.recentUpdates;
const router = useRouter();

// Stats data
const stats = ref([
  { 
    label: "Active Routes", 
    value: "24", 
    icon: "fas fa-route", 
    iconBg: "bg-blue-500",
    trend: "↑ 5%"
  },
  { 
    label: "Traffic Reports", 
    value: "12", 
    icon: "fas fa-exclamation-triangle", 
    iconBg: "bg-red-500",
    trend: "↓ 2%"
  },
  { 
    label: "Online Users", 
    value: "1.2k", 
    icon: "fas fa-users", 
    iconBg: "bg-green-500",
    trend: "↑ 15%"
  },
  { 
    label: "Boda Available", 
    value: "89", 
    icon: "fas fa-motorcycle", 
    iconBg: "bg-purple-500"
  }
]);

// Quick Actions
const quickActions = ref([
  { 
    name: "Report Traffic", 
    icon: "fas fa-traffic-light", 
    color: "#3B82F6",
    route: "/report"
  },
  { 
    name: "Find Route", 
    icon: "fas fa-route", 
    color: "#10B981",
    route: "/popular-routes"
  },
  { 
    name: "Book Boda", 
    icon: "fas fa-motorcycle", 
    color: "#F59E0B",
    route: "/boda"
  },
  { 
    name: "Emergency", 
    icon: "fas fa-exclamation-triangle", 
    color: "#EF4444",
    handler: () => callEmergency()
  },
  { 
    name: "Traffic Cams", 
    icon: "fas fa-video", 
    color: "#8B5CF6",
    route: "/cameras"
  },
  { 
    name: "Alerts", 
    icon: "fas fa-bell", 
    color: "#EC4899",
    route: "/alerts"
  },
  { 
    name: "Road Works", 
    icon: "fas fa-road", 
    color: "#6366F1",
    route: "/road-works"
  },
  { 
    name: "Settings", 
    icon: "fas fa-cog", 
    color: "#64748B",
    route: "/settings"
  }
]);

// Methods
const handleQuickAction = (action) => {
  if (action.route) {
    router.push(action.route);
  } else if (action.handler) {
    action.handler();
  }
};

const callEmergency = () => {
  console.log('Calling emergency');
  // For actual phone call: window.location.href = 'tel:+254711123456';
};

// Lifecycle hooks
onMounted(() => {
  // Any initialization logic
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 3px;
}
</style>