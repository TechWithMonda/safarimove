<template>
  <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg h-full flex flex-col">
    <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700">
      <h2 class="text-base sm:text-lg font-semibold text-white flex items-center">
        <i class="fas fa-comments mr-2 text-blue-400"></i>
        Live Chat Feed
      </h2>
    </div>
    
    <div class="p-4 sm:p-6 flex-1 overflow-y-auto custom-scrollbar">
      <div 
        v-for="(msg, index) in chatMessages" 
        :key="index"
        class="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4"
      >
        <div 
          :class="[
            getAvatarColor(msg.name),
            msg.isCurrentUser ? 'ring-2 ring-blue-400' : ''
          ]" 
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <span class="text-white font-medium text-xs">{{ msg.avatar }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-x-2 gap-y-0 mb-1">
            <span class="font-medium text-white text-sm">{{ msg.username }}</span>
            <span class="text-gray-400 text-xs">{{ msg.time }}</span>
            <span v-if="msg.is_disappearing" class="text-xs text-yellow-400">
              <i class="fas fa-hourglass-half"></i> 24h
            </span>
          </div>
          <p 
            class="text-gray-300 text-sm rounded-lg p-2 sm:p-3"
            :class="msg.isCurrentUser ? 'bg-blue-600/20' : 'bg-slate-700'"
          >
            {{ msg.message }}
          </p>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-700">
      <div class="flex items-center mb-2">
        <input 
          type="checkbox" 
          id="disappearing" 
          v-model="isDisappearing"
          class="mr-2 rounded text-blue-600 focus:ring-blue-500"
        >
        <label for="disappearing" class="text-xs sm:text-sm text-gray-300">
          Disappearing message (24h)
        </label>
      </div>
      <div class="flex space-x-2 sm:space-x-3">
        <input 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="Share traffic updates..."
          class="flex-1 px-3 py-1 sm:py-2 text-sm sm:text-base bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
        <button 
          @click="sendMessage"
          class="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <i class="fas fa-paper-plane text-sm sm:text-base"></i>
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
      apiBaseUrl: 'https://safarimovebackend-production.up.railway.app/api',
      reconnectDelay: 1000,
      isSocketConnected: false
    }
  },
  mounted() {
    this.loadCurrentUser();
    this.fetchMessages();
    this.connectWebSocket();
    this.setupMessageChecker();
  },
  beforeUnmount() {
    this.cleanupWebSocket();
    if (this.messageCheckInterval) {
      clearInterval(this.messageCheckInterval);
    }
  },
  methods: {
    cleanupWebSocket() {
      if (this.socket) {
        this.socket.onclose = null;
        this.socket.close();
        this.socket = null;
      }
      this.isSocketConnected = false;
    },

    setupMessageChecker() {
      this.messageCheckInterval = setInterval(() => {
        this.checkExpiredMessages();
      }, 60000);
    },
    
    checkExpiredMessages() {
      this.chatMessages = this.chatMessages.filter(msg => {
        if (msg.is_disappearing && msg.sent_at) {
          try {
            const sentAt = new Date(msg.sent_at);
            if (isNaN(sentAt.getTime())) return true; // Invalid date, keep message
            const expiryTime = new Date(sentAt.getTime() + 24 * 60 * 60 * 1000);
            return new Date() < expiryTime;
          } catch (e) {
            console.error('Error checking message expiry:', e);
            return true;
          }
        }
        return true;
      });
    },
    
    loadCurrentUser() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        this.currentUser = userData?.username || 'Anonymous';
      } catch (e) {
        console.error('Error loading user:', e);
        this.currentUser = 'Anonymous';
      }
    },
    
    async fetchMessages() {
      try {
        const response = await fetch(`${this.apiBaseUrl}/messages/`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
      let displayTime = 'Just now';
      
      try {
        if (msg.sent_at) {
          displayTime = new Date(msg.sent_at).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
        }
      } catch (e) {
        console.error('Error formatting message time:', e);
      }
      
      return {
        id: msg.id || Date.now(), // Fallback ID if not provided
        name: msg.sender,
        username: isCurrentUser ? 'You' : msg.sender,
        message: msg.content,
        time: displayTime,
        avatar: msg.sender?.charAt(0).toUpperCase() || '?',
        isCurrentUser,
        is_disappearing: msg.is_disappearing,
        sent_at: msg.sent_at
      };
    },
    
    connectWebSocket() {
      if (this.isSocketConnected) return;
      
      const wsScheme = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      const backendHost = 'safarimovebackend-production.up.railway.app';
      const roomName = 'lobby';
      const wsUrl = `${wsScheme}${backendHost}/ws/chat/${roomName}/`;

      try {
        this.socket = new WebSocket(wsUrl);
        this.isSocketConnected = true;
        
        this.socket.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
        };
        
        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.message) {
              const formattedMsg = this.formatMessage({
                id: data.id,
                sender: data.sender,
                content: data.message,
                sent_at: data.sent_at,
                is_disappearing: data.is_disappearing
              });
              
              if (!this.chatMessages.some(m => m.id === formattedMsg.id)) {
                this.chatMessages = [...this.chatMessages, formattedMsg];
              }
            }
          } catch (e) {
            console.error('Error processing WebSocket message:', e);
          }
        };
        
        this.socket.onclose = (event) => {
          this.isSocketConnected = false;
          console.log('WebSocket disconnected:', event.code, event.reason);
          
          if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
            const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), 30000);
            console.log(`Attempting to reconnect in ${delay}ms...`);
            
            setTimeout(() => {
              this.reconnectAttempts++;
              this.connectWebSocket();
            }, delay);
          }
        };
        
        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isSocketConnected = false;
        };
      } catch (error) {
        console.error('WebSocket initialization error:', error);
        this.isSocketConnected = false;
      }
    },
    
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const messageContent = this.newMessage;
      const isDisappearing = this.isDisappearing;
      const tempId = Date.now(); // Define tempId here so it's available in error handler

      // Optimistic UI update
      const optimisticMsg = {
        id: tempId,
        name: this.currentUser,
        username: 'You',
        message: messageContent,
        time: 'Just now',
        avatar: this.currentUser.charAt(0).toUpperCase(),
        isCurrentUser: true,
        is_disappearing: isDisappearing,
        sent_at: new Date().toISOString()
      };
      this.chatMessages = [...this.chatMessages, optimisticMsg];

      try {
        // Send to WebSocket if connected
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify({
            message: messageContent,
            sender: this.currentUser,
            is_disappearing: isDisappearing
          }));
        }

        // Save to database
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

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const persistedMessage = await response.json();

        // Replace temporary message with saved version
        this.chatMessages = this.chatMessages.map(msg =>
          msg.id === tempId ? this.formatMessage(persistedMessage) : msg
        );

        this.newMessage = ''; // Clear input only after successful send
      } catch (err) {
        console.error('Failed to send message:', err);
        // Remove optimistic message on error
        this.chatMessages = this.chatMessages.filter(m => m.id !== tempId);
        // Don't clear newMessage so user can try again
      }
    },
    
    getAvatarColor(name) {
      if (!name) return 'bg-gray-500';
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

/* Better mobile touch targets */
button, input[type="checkbox"] {
  touch-action: manipulation;
}
</style>