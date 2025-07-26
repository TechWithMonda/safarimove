<template>
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
        <div 
          :class="[
            getAvatarColor(msg.name),
            msg.isCurrentUser ? 'ring-2 ring-blue-400' : ''
          ]" 
          class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <span class="text-white font-medium text-xs">{{ msg.avatar }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-1">
            <span class="font-medium text-white text-sm">{{ msg.username }}</span>
            <span class="text-gray-400 text-xs">{{ msg.time }}</span>
            <span v-if="msg.is_disappearing" class="text-xs text-yellow-400">
              <i class="fas fa-hourglass-half"></i> 24h
            </span>
          </div>
          <p 
            class="text-gray-300 text-sm rounded-lg p-3"
            :class="msg.isCurrentUser ? 'bg-blue-600/20' : 'bg-slate-700'"
          >
            {{ msg.message }}
          </p>
        </div>
      </div>
    </div>

    <div class="px-6 py-4 border-t border-slate-700">
      <div class="flex items-center mb-2">
        <input 
          type="checkbox" 
          id="disappearing" 
          v-model="isDisappearing"
          class="mr-2 rounded text-blue-600 focus:ring-blue-500"
        >
        <label for="disappearing" class="text-sm text-gray-300">
          Disappearing message (24h)
        </label>
      </div>
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
</template>

<script>
export default {
  name: 'ChatComponent',
  data() {
    return {
      chatMessages: [],
      newMessage: '',
      currentUser: null,
      socket: null,
      isDisappearing: false,
      messageCheckInterval: null,
      reconnectAttempts: 0,
      maxReconnectAttempts: 5,
      apiBaseUrl: 'https://safarimovebackend-production.up.railway.app/api'
    }
  },
  mounted() {
    this.loadCurrentUser();
    this.fetchMessages();
    this.connectWebSocket();
    this.setupMessageChecker();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.close();
    }
    if (this.messageCheckInterval) {
      clearInterval(this.messageCheckInterval);
    }
  },
  methods: {
    setupMessageChecker() {
      this.messageCheckInterval = setInterval(() => {
        this.checkExpiredMessages();
      }, 60000); // Check every minute
    },
    
    checkExpiredMessages() {
      this.chatMessages = this.chatMessages.filter(msg => {
        if (msg.is_disappearing) {
          const sentAt = new Date(msg.sent_at);
          const expiryTime = new Date(sentAt.getTime() + 24 * 60 * 60 * 1000);
          return new Date() < expiryTime;
        }
        return true;
      });
    },
    
    loadCurrentUser() {
      const userData = JSON.parse(localStorage.getItem('user'));
      this.currentUser = userData?.username || 'Anonymous';
    },
    
    async fetchMessages() {
      try {
        const response = await fetch(`${this.apiBaseUrl}/messages/`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        
        this.chatMessages = data
          .filter(msg => !msg.is_expired)
          .map(msg => this.formatMessage(msg));
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    },
    
    formatMessage(msg) {
      const isCurrentUser = msg.sender === this.currentUser;
      return {
        id: msg.id,
        name: msg.sender,
        username: isCurrentUser ? 'You' : msg.sender,
        message: msg.content,
        time: new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: msg.sender.charAt(0).toUpperCase(),
        isCurrentUser,
        is_disappearing: msg.is_disappearing,
        sent_at: msg.sent_at
      };
    },
    
    connectWebSocket() {
      const wsScheme = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      const backendHost = 'safarimovebackend-production.up.railway.app';
      const roomName = 'lobby';
      const wsUrl = `${wsScheme}${backendHost}/ws/chat/${roomName}/`;

      this.socket = new WebSocket(wsUrl);
      
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };
      
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.message) {
          const formattedMsg = this.formatMessage({
            id: data.id,
            sender: data.sender,
            content: data.message,
            sent_at: data.sent_at,
            is_disappearing: data.is_disappearing
          });
          
          // Check if message already exists
          if (!this.chatMessages.some(m => m.id === formattedMsg.id)) {
            this.chatMessages.push(formattedMsg);
          }
        }
      };
      
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
          setTimeout(() => {
            this.reconnectAttempts++;
            this.connectWebSocket();
          }, delay);
        }
      };
      
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    },
    
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const messageContent = this.newMessage;
      const isDisappearing = this.isDisappearing;
      this.newMessage = ''; // Clear input immediately

      try {
        // Optimistically add to UI
        const tempId = Date.now();
        this.chatMessages.push({
          id: tempId,
          name: this.currentUser,
          username: 'You',
          message: messageContent,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: this.currentUser.charAt(0).toUpperCase(),
          isCurrentUser: true,
          is_disappearing: isDisappearing,
          sent_at: new Date().toISOString()
        });

        // Save to database via fetch
        const response = await fetch(`${this.apiBaseUrl}/messages/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: this.currentUser,
            content: messageContent,
            is_disappearing: isDisappearing
          })
        });

        if (!response.ok) throw new Error('Failed to send message');
        
        const persistedMessage = await response.json();
        
        // Replace temporary message with persisted message
        const tempMsgIndex = this.chatMessages.findIndex(m => m.id === tempId);
        if (tempMsgIndex >= 0) {
          this.chatMessages.splice(tempMsgIndex, 1, this.formatMessage(persistedMessage));
        }

        // Also send via WebSocket if connected
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify({
            sender: this.currentUser,
            message: messageContent,
            id: persistedMessage.id,
            sent_at: persistedMessage.sent_at,
            is_disappearing: isDisappearing
          }));
        }

      } catch (err) {
        console.error('Failed to send message:', err);
        // Remove optimistic message if failed
        this.chatMessages = this.chatMessages.filter(m => 
          !(m.message === messageContent && m.name === this.currentUser && !m.id)
        );
        this.newMessage = messageContent; // Restore message if failed
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

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 3px;
}
</style>