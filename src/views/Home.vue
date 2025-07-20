<template>
  <div class="nairobi-navigator">
    <!-- Header Section -->

    <!-- Main Content -->
    <main class="app-main">
      <div class="container">
        <!-- Features Grid -->
        <div class="features-grid">
          <!-- Live Traffic Card -->
          <router-link to="/trafficupdates">
            <div class="feature-card traffic-card" @click="navigateTo('trafficupdates')">
              <div class="card-icon">
                <i class="fas fa-traffic-light"></i>
              </div>
              <h3>Live Traffic Updates</h3>
              <p>Check real-time traffic conditions and find the fastest routes across Nairobi</p>
              <div class="stats-badge">24/7 Updates</div>
            </div>
          </router-link>

          <!-- Matatu Routes Card -->
          <router-link to="/MatatuRoutes">
            <div class="feature-card matatu-card" @click="navigateTo('matatus')">
              <div class="card-icon">
                <i class="fas fa-bus"></i>
              </div>
              <h3>Matatu Routes</h3>
              <p>Find matatu routes, fares, and schedules for your journey</p>
              <div class="stats-badge">50+ Routes</div>
            </div>
          </router-link>

          <!-- Bodaboda Directory Card -->
          <router-link to="/BodaBodaRiders">
            <div class="feature-card bodaboda-card" @click="navigateTo('bodabodas')">
              <div class="card-icon">
                <i class="fas fa-motorcycle"></i>
              </div>
              <h3>Bodaboda Directory</h3>
              <p>Connect with nearby bodaboda drivers for quick rides</p>
              <div class="stats-badge">100+ Drivers</div>
            </div>
          </router-link>
        </div>

        <!-- Quick Search Section -->
        <div class="quick-search">
          <h2>Where are you going today?</h2>
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Enter destination or route..." 
              v-model="searchQuery"
              @keyup.enter="performSearch"
            >
       
              <button class="search-btn" @click="performSearch">
                     <router-link to="/FindAMatatu"><i class="fas fa-search"></i> Find Route</router-link>
              </button>
           
          </div>
        </div>

        <!-- Recent Updates Section -->
        <div class="updates-section">
          <h2>Recent Traffic Updates</h2>
          <div class="updates-list">
            <div class="update-item" v-for="update in recentUpdates" :key="update.id">
              <div class="update-severity" :class="update.severity"></div>
              <div class="update-content">
                <h4>{{ update.location }}</h4>
                <p>{{ update.message }}</p>
                <span class="update-time">{{ update.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
 
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
      recentUpdates: [
        {
          id: 1,
          location: 'Thika Road',
          message: 'Heavy traffic near Garden City Mall',
          severity: 'high',
          time: '15 mins ago'
        },
        {
          id: 2,
          location: 'Mombasa Road',
          message: 'Accident reported near Cabanas',
          severity: 'medium',
          time: '25 mins ago'
        },
        {
          id: 3,
          location: 'Waiyaki Way',
          message: 'Clear traffic all through to Westlands',
          severity: 'low',
          time: '40 mins ago'
        }
      ]
    }
  },
  methods: {
    navigateTo(destination) {
      // Navigation logic here
      console.log(`Navigating to ${destination}`);
      // this.$router.push(`/${destination}`);
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        console.log(`Searching for: ${this.searchQuery}`);
        // Implement search functionality
      }
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.nairobi-navigator {
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
.app-header {
  background-color: #1a5276;
  color: white;
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.app-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a5276;
}

.feature-card h3 {
  margin-bottom: 0.8rem;
  color: #1a5276;
}

.stats-badge {
  display: inline-block;
  background: #eaf2f8;
  color: #1a5276;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* Quick Search */
.quick-search {
  background: #eaf2f8;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 3rem;
  text-align: center;
}

.quick-search h2 {
  margin-bottom: 1.5rem;
  color: #1a5276;
}

.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  font-size: 1rem;
}

.search-btn {
  background: #1a5276;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #154360;
}

/* Updates Section */
.updates-section h2 {
  color: #1a5276;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eaf2f8;
}

.updates-list {
  display: grid;
  gap: 1rem;
}

.update-item {
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.update-severity {
  width: 8px;
  border-radius: 4px;
  margin-right: 1rem;
}

.update-severity.high {
  background: #e74c3c;
}
.update-severity.medium {
  background: #f39c12;
}
.update-severity.low {
  background: #2ecc71;
}

.update-content h4 {
  margin-bottom: 0.3rem;
  color: #1a5276;
}

.update-time {
  font-size: 0.8rem;
  color: #7f8c8d;
}

/* Footer */
.app-footer {
  background: #1a5276;
  color: white;
  padding: 2rem 0;
  margin-top: 3rem;
  text-align: center;
}

.footer-links {
  margin-top: 1rem;
}

.footer-links a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .search-box {
    flex-direction: column;
  }
  
  .search-box input {
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .search-btn {
    border-radius: 5px;
    padding: 0.8rem;
  }
}
</style>