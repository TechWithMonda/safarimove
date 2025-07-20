<template>
  <div class="space-y-6">
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
</template>

<script>
export default {
  name: 'Dashboard',
  props: ['searchQuery'],
  data() {
    return {
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
      newMessage: ''
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
    }
  }
}
</script>