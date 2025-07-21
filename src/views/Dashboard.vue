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
      <LiveChatFeed />

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
          @click="handleQuickAction(action)"
          class="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          :aria-label="action.name"
        >
          <i :class="action.icon" class="text-2xl mb-2" :style="{ color: action.color }"></i>
          <span class="text-sm text-white font-medium">{{ action.name }}</span>
        </button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';
import LiveChatFeed from '../components/LiveChatFeed.vue';

const router = useRouter();

// Reactive data
const stats = ref([
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
]);

const chatMessages = ref([]);
const recentUpdates = ref([
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
]);

const quickActions = ref([
  { 
    name: 'Report Traffic', 
    icon: 'fas fa-exclamation-circle', 
    color: '#ef4444',
    route: '/report'
  },
  { 
    name: 'Find Route', 
    icon: 'fas fa-search-location', 
    color: '#3b82f6',
    route: '/popular-routes'
  },
  { 
    name: 'Book Boda', 
    icon: 'fas fa-motorcycle', 
    color: '#10b981',
    route: '/boda'
  },
  { 
    name: 'Emergency', 
    icon: 'fas fa-phone', 
    color: '#f59e0b',
    handler: () => callEmergency()
  }
]);

const newMessage = ref('');
const currentUser = ref(null);

// Methods
const handleQuickAction = (action) => {
  if (action.route) {
    router.push(action.route);
  } else if (action.handler) {
    action.handler();
  }
};

const openReportModal = () => {
  console.log('Opening report modal');
  // Implement your modal logic here
};

const callEmergency = () => {
  console.log('Calling emergency');
  // For actual phone call: window.location.href = 'tel:+254711123456';
};

const loadCurrentUser = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  currentUser.value = userData?.username || 'You';
};

const fetchMessages = async () => {
  try {
    const res = await api.get('/messages/');
    chatMessages.value = res.data.map(msg => {
      const isCurrentUser = msg.sender === currentUser.value;
      return {
        name: msg.sender,
        username: isCurrentUser ? 'You' : msg.sender,
        message: msg.content,
        time: new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: isCurrentUser 
          ? currentUser.value.charAt(0).toUpperCase() 
          : msg.sender.charAt(0).toUpperCase(),
        isCurrentUser
      };
    });
  } catch (err) {
    console.error('Failed to load messages:', err);
  }
};

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    try {
      await api.post('/messages/', {
        sender: currentUser.value,
        content: newMessage.value
      });
      newMessage.value = '';
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  }
};

const getAvatarColor = (name) => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
    'bg-red-500', 'bg-yellow-500', 'bg-indigo-500'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// Lifecycle hooks
onMounted(() => {
  loadCurrentUser();
  fetchMessages();
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