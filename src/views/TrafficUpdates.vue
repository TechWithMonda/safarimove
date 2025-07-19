<template>
  <div class="traffic-status-view">
    <!-- Header Section -->
    <div class="traffic-header">
      <h1><i class="fas fa-traffic-light"></i> Live Traffic Status</h1>
      <div class="last-updated">Last updated: {{ lastUpdated }}</div>
    </div>

    <!-- Traffic Filter Controls -->
    <div class="traffic-controls">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Search routes..." 
          v-model="searchQuery"
          @input="filterRoutes"
        >
        <i class="fas fa-search"></i>
      </div>
      <div class="filter-buttons">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          :class="{ active: activeFilter === filter.value }"
          @click="setFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Main Traffic List -->
    <div class="traffic-list">
      <div 
        class="traffic-item" 
        v-for="route in filteredRoutes" 
        :key="route.id"
        :class="route.severity"
      >
        <div class="route-info">
          <h3>{{ route.from }} → {{ route.to }}</h3>
          <div class="route-meta">
            <span class="distance">{{ route.distance }}</span>
            <span class="duration">{{ route.duration }}</span>
          </div>
        </div>
        <div class="severity-indicator">
          <div class="severity-label">{{ route.severity }}</div>
          <div class="severity-bar" :style="{ width: route.severityPercentage + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Map View Toggle -->
    <div class="map-toggle">
      <button @click="toggleMapView">
        <i class="fas fa-map-marked-alt"></i>
        {{ showMap ? 'Hide' : 'Show' }} Map View
      </button>
    </div>

    <!-- Map View (conditional) -->
    <div class="traffic-map" v-if="showMap">
      <!-- Map integration would go here -->
      <div class="map-placeholder">
        <i class="fas fa-map"></i>
        <p>Interactive Traffic Map</p>
      </div>
    </div>

    <!-- Refresh Button -->
    <div class="refresh-controls">
      <button @click="refreshData">
        <i class="fas fa-sync-alt"></i> Refresh Data
      </button>
      <span class="auto-refresh">
        <input type="checkbox" id="auto-refresh" v-model="autoRefresh">
        <label for="auto-refresh">Auto-refresh every 5 minutes</label>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrafficStatus',
  data() {
    return {
      lastUpdated: new Date().toLocaleTimeString(),
      searchQuery: '',
      activeFilter: 'all',
      showMap: false,
      autoRefresh: false,
      filters: [
        { label: 'All Routes', value: 'all' },
        { label: 'Severe', value: 'severe' },
        { label: 'Heavy', value: 'heavy' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Light', value: 'light' }
      ],
      routes: [
        {
          id: 1,
          from: 'CBD',
          to: 'Westlands',
          distance: '8.2 km',
          duration: '25 min',
          severity: 'moderate',
          severityPercentage: 60
        },
        {
          id: 2,
          from: 'Kasarani',
          to: 'CBD',
          distance: '15.3 km',
          duration: '45 min',
          severity: 'heavy',
          severityPercentage: 80
        },
        {
          id: 3,
          from: 'Karen',
          to: 'CBD',
          distance: '12.1 km',
          duration: '18 min',
          severity: 'light',
          severityPercentage: 30
        },
        {
          id: 4,
          from: 'Kiambu Road',
          to: 'Thika Road',
          distance: '22.5 km',
          duration: '1hr 10min',
          severity: 'severe',
          severityPercentage: 90
        },
        {
          id: 5,
          from: 'Juja',
          to: 'CBD',
          distance: '28.7 km',
          duration: '1hr 25min',
          severity: 'heavy',
          severityPercentage: 75
        },
        {
          id: 6,
          from: 'Rongai',
          to: 'CBD',
          distance: '18.9 km',
          duration: '35 min',
          severity: 'moderate',
          severityPercentage: 55
        }
      ],
      filteredRoutes: []
    }
  },
  created() {
    this.filteredRoutes = [...this.routes];
  },
  methods: {
    filterRoutes() {
      const query = this.searchQuery.toLowerCase();
      this.filteredRoutes = this.routes.filter(route => {
        const matchesSearch = 
          route.from.toLowerCase().includes(query) || 
          route.to.toLowerCase().includes(query);
        const matchesFilter = 
          this.activeFilter === 'all' || 
          route.severity === this.activeFilter;
        return matchesSearch && matchesFilter;
      });
    },
    setFilter(filter) {
      this.activeFilter = filter;
      this.filterRoutes();
    },
    toggleMapView() {
      this.showMap = !this.showMap;
    },
    refreshData() {
      // In a real app, this would fetch new data from an API
      this.lastUpdated = new Date().toLocaleTimeString();
      // Simulate data refresh
      this.$toast.info('Traffic data refreshed');
    }
  },
  watch: {
    autoRefresh(newVal) {
      if (newVal) {
        this.refreshInterval = setInterval(() => {
          this.refreshData();
        }, 300000); // 5 minutes
      } else {
        clearInterval(this.refreshInterval);
      }
    }
  },
  beforeDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}
</script>

<style scoped>
.traffic-status-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.traffic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.traffic-header h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
}

.last-updated {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.traffic-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.search-box {
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.filter-buttons button {
  padding: 8px 15px;
  border: none;
  border-radius: 20px;
  background: #ecf0f1;
  color: #34495e;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
}

.filter-buttons button.active {
  background: #3498db;
  color: white;
}

.traffic-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.traffic-item {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  border-left: 5px solid;
}

.traffic-item.moderate {
  border-left-color: #f39c12;
}
.traffic-item.heavy {
  border-left-color: #e74c3c;
}
.traffic-item.light {
  border-left-color: #2ecc71;
}
.traffic-item.severe {
  border-left-color: #c0392b;
}

.route-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.route-meta {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.severity-indicator {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 100px;
}

.severity-label {
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: 5px;
}

.traffic-item.moderate .severity-label {
  color: #f39c12;
}
.traffic-item.heavy .severity-label {
  color: #e74c3c;
}
.traffic-item.light .severity-label {
  color: #2ecc71;
}
.traffic-item.severe .severity-label {
  color: #c0392b;
}

.severity-bar {
  height: 6px;
  border-radius: 3px;
  background: #ecf0f1;
  width: 100%;
}

.severity-bar::after {
  content: '';
  display: block;
  height: 100%;
  border-radius: 3px;
}

.traffic-item.moderate .severity-bar::after {
  background: #f39c12;
  width: 60%;
}
.traffic-item.heavy .severity-bar::after {
  background: #e74c3c;
  width: 80%;
}
.traffic-item.light .severity-bar::after {
  background: #2ecc71;
  width: 30%;
}
.traffic-item.severe .severity-bar::after {
  background: #c0392b;
  width: 90%;
}

.map-toggle {
  text-align: center;
  margin: 20px 0;
}

.map-toggle button {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.map-toggle button:hover {
  background: #2980b9;
}

.traffic-map {
  height: 300px;
  background: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #7f8c8d;
}

.map-placeholder i {
  font-size: 3rem;
  margin-bottom: 10px;
}

.refresh-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.refresh-controls button {
  padding: 10px 20px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.refresh-controls button:hover {
  background: #27ae60;
}

.auto-refresh {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #7f8c8d;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .traffic-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .traffic-item {
    flex-direction: column;
    gap: 15px;
  }
  
  .severity-indicator {
    align-items: flex-start;
  }
  
  .refresh-controls {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>