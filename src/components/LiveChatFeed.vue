<template>
  <div class="live-chat-section">
    <h2>Live Traffic Chat</h2>
    <div class="chat-container">
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div class="message-header">
            <span class="username">{{ message.username }}</span>
            <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
          </div>
          <div class="message-content">{{ message.text }}</div>
          <div class="message-location" v-if="message.location">
            <i class="fas fa-map-marker-alt"></i> {{ message.location }}
          </div>
        </div>
      </div>
      <div class="message-input">
        <input 
          v-model="newMessage" 
          @keyup.enter="sendMessage" 
          placeholder="Share traffic update..."
        >
        <button @click="sendMessage">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, limitToLast } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkBXguVVnDXRq0Xibua9BkHjIo-up7Ieo",
  authDomain: "safarimove-548a9.firebaseapp.com",
  databaseURL: "https://safarimove-548a9-default-rtdb.firebaseio.com",
  projectId: "safarimove-548a9",
  storageBucket: "safarimove-548a9.appspot.com",
  messagingSenderId: "300234077804",
  appId: "1:300234077804:web:6baf0b1e80877a45084a49",
  measurementId: "G-331MP2HERF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default {
  name: 'LiveChatFeed',
  data() {
    return {
      messages: [],
      newMessage: '',
      username: 'Anonymous'
    }
  },
  mounted() {
    this.setupUsername();
    this.listenForMessages();
  },
  methods: {
    setupUsername() {
      const savedUsername = localStorage.getItem('chatUsername');
      if (savedUsername) {
        this.username = savedUsername;
      } else {
        this.username = `User${Math.floor(Math.random() * 10000)}`;
        localStorage.setItem('chatUsername', this.username);
      }
    },
    
    listenForMessages() {
      const messagesRef = ref(db, 'traffic_chat');
      const recentMessagesRef = limitToLast(messagesRef, 50);
      
      onValue(recentMessagesRef, (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
          messages.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        this.messages = messages;
        this.scrollToBottom();
      });
    },
    
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      
      // Get current location if available
      let location = '';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          location = `Near ${this.getNearestLandmark(pos.coords.latitude, pos.coords.longitude)}`;
          this.pushMessage(location);
        }, () => {
          this.pushMessage();
        });
      } else {
        this.pushMessage();
      }
    },
    
    pushMessage(location = '') {
      const message = {
        username: this.username,
        text: this.newMessage,
        timestamp: Date.now(),
        location: location
      };
      
      push(ref(db, 'traffic_chat'), message);
      this.newMessage = '';
    },
    
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    },
    
    getNearestLandmark(lat, lng) {
      // This would call a geocoding service to find nearest landmark
      // For now, just return coordinates
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTop = container.scrollHeight;
      });
    }
  }
}
</script>

<style scoped>
.live-chat-section {
  margin-top: 2rem;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.live-chat-section h2 {
  color: #1a5276;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eaf2f8;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.message {
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.username {
  font-weight: bold;
  color: #1a5276;
}

.timestamp {
  color: #7f8c8d;
}

.message-content {
  margin-bottom: 0.5rem;
}

.message-location {
  font-size: 0.8rem;
  color: #3498db;
}

.message-location i {
  margin-right: 0.3rem;
}

.message-input {
  display: flex;
}

.message-input input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  font-size: 1rem;
}

.message-input button {
  background: #1a5276;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background 0.3s;
}

.message-input button:hover {
  background: #154360;
}

@media (max-width: 768px) {
  .chat-container {
    height: 300px;
  }
}
</style>