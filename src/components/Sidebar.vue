<template>
  <div class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <!-- Toggle Button -->
    <button class="toggle-btn" @click="toggleSidebar">
      <i :class="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
    </button>

    <!-- App Title -->
    <div class="app-title">
      <h1 v-if="!isCollapsed">Nairobi Connect</h1>
      <h1 v-else>NC</h1>
    </div>

    <!-- Navigation Menu -->
    <nav class="nav-menu">
      <router-link 
        to="/dashboard" 
        class="nav-item"
        :class="{ active: $route.path === '/dashboard' }"
      >
        <i class="fas fa-tachometer-alt"></i>
        <span v-if="!isCollapsed">Dashboard</span>
      </router-link>
      
      <!-- Other menu items with same pattern -->
      <router-link 
        to="/notifications" 
        class="nav-item"
        :class="{ active: $route.path === '/notifications' }"
      >
        <i class="fas fa-bell"></i>
        <span v-if="!isCollapsed">Notifications</span>
      </router-link>
      
      <router-link 
        to="/settings" 
        class="nav-item"
        :class="{ active: $route.path === '/settings' }"
      >
        <i class="fas fa-cog"></i>
        <span v-if="!isCollapsed">Settings</span>
      </router-link>
      
      <router-link 
        to="/help" 
        class="nav-item"
        :class="{ active: $route.path === '/help' }"
      >
        <i class="fas fa-question-circle"></i>
        <span v-if="!isCollapsed">Help & Support</span>
      </router-link>
    </nav>

    <!-- User Section -->
    <div class="user-section">
      <div class="user-profile">
        <div class="user-info" v-if="!isCollapsed">
          <div class="user-name">{{ user.name || 'User' }}</div>
          <div class="user-role">Profile</div>
        </div>
      </div>
      <button class="logout-btn" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
        <span v-if="!isCollapsed">Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      user: {
        name: '',
        avatar: ''
      },
      isCollapsed: false
    }
  },
  mounted() {
    this.loadUserData();
    // Load collapsed state from localStorage if you want persistence
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      this.isCollapsed = JSON.parse(savedState);
    }
  },
  methods: {
    loadUserData() {
      this.user = {
        name: localStorage.getItem('username') || 'User',
        avatar: localStorage.getItem('avatar') || ''
      };
    },
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      // Save state to localStorage if you want persistence
      localStorage.setItem('sidebarCollapsed', this.isCollapsed);
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #1a5276;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  z-index: 1000;
}

.sidebar-collapsed {
  width: 70px;
}

.toggle-btn {
  position: absolute;
  right: -15px;
  top: 20px;
  width: 30px;
  height: 30px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  z-index: 1001;
}

.toggle-btn i {
  color: #1a5276;
  font-size: 0.9rem;
}

.app-title {
  padding: 0 0.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
  overflow: hidden;
}

.app-title h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  transition: all 0.3s ease;
}

.nav-menu {
  flex: 1;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
}

.nav-item i {
  width: 24px;
  margin-right: 0.8rem;
  font-size: 1.1rem;
  text-align: center;
  flex-shrink: 0;
}

.nav-item span {
  transition: opacity 0.3s ease;
}

.sidebar-collapsed .nav-item span {
  opacity: 0;
  width: 0;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.user-section {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-profile:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-info {
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.3s ease;
}

.sidebar-collapsed .user-info {
  opacity: 0;
  width: 0;
}

.user-name {
  font-weight: 500;
  font-size: 0.95rem;
}

.user-role {
  font-size: 0.8rem;
  opacity: 0.8;
}

.logout-btn {
  width: 100%;
  padding: 0.7rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
}

.logout-btn span {
  transition: opacity 0.3s ease;
}

.sidebar-collapsed .logout-btn span {
  opacity: 0;
  width: 0;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-btn i {
  margin-right: 0.5rem;
  flex-shrink: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
    padding: 1rem 0.5rem;
  }
  
  .sidebar:not(.sidebar-collapsed) {
    width: 250px;
  }
  
  .toggle-btn {
    display: none;
  }
  
  .app-title h1,
  .nav-item span,
  .user-info,
  .logout-btn span {
    display: none;
  }
  
  .sidebar:not(.sidebar-collapsed) .app-title h1,
  .sidebar:not(.sidebar-collapsed) .nav-item span,
  .sidebar:not(.sidebar-collapsed) .user-info,
  .sidebar:not(.sidebar-collapsed) .logout-btn span {
    display: inline;
  }
  
  .nav-item {
    justify-content: center;
    padding: 0.8rem 0;
  }
  
  .sidebar:not(.sidebar-collapsed) .nav-item {
    justify-content: flex-start;
    padding: 0.8rem 1rem;
  }
  
  .nav-item i {
    margin-right: 0;
    font-size: 1.2rem;
  }
  
  .sidebar:not(.sidebar-collapsed) .nav-item i {
    margin-right: 0.8rem;
    font-size: 1.1rem;
  }
  
  .user-profile {
    justify-content: center;
    padding: 0.5rem 0;
  }
  
  .sidebar:not(.sidebar-collapsed) .user-profile {
    justify-content: flex-start;
    padding: 0.5rem;
  }
  
  .logout-btn {
    padding: 0.7rem 0;
  }
  
  .sidebar:not(.sidebar-collapsed) .logout-btn {
    padding: 0.7rem;
  }
  
  .logout-btn i {
    margin-right: 0;
  }
  
  .sidebar:not(.sidebar-collapsed) .logout-btn i {
    margin-right: 0.5rem;
  }
}
</style>