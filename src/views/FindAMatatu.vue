<template>
  <div class="route-selector">
    <!-- Header -->
    <div class="header">
      <h1><i class="fas fa-route"></i> Nairobi Matatu Routes</h1>
      <p>Select your start and end points</p>
    </div>

    <!-- Route Selector -->
    <div class="route-form">
      <div class="select-group">
        <label for="from"><i class="fas fa-map-marker-alt"></i> From:</label>
        <select id="from" v-model="selectedFrom">
          <option value="">Select starting point</option>
          <option v-for="location in locations" :value="location" :key="'from-'+location">
            {{ location }}
          </option>
        </select>
      </div>

      <div class="swap-btn" @click="swapLocations">
        <i class="fas fa-exchange-alt"></i>
      </div>

      <div class="select-group">
        <label for="to"><i class="fas fa-flag-checkered"></i> To:</label>
        <select id="to" v-model="selectedTo">
          <option value="">Select destination</option>
          <option v-for="location in locations" :value="location" :key="'to-'+location">
            {{ location }}
          </option>
        </select>
      </div>

      <button class="find-route-btn" @click="findRoute" :disabled="!canSearch">
        <i class="fas fa-search"></i> Find Route
      </button>
    </div>

    <!-- Results -->
    <div v-if="selectedRoute" class="route-results">
      <div class="route-card">
        <div class="route-header">
          <div class="route-number">{{ selectedRoute.number }}</div>
          <h2>{{ selectedRoute.name }}</h2>
          <div class="route-direction">
            <span>{{ selectedFrom }} <i class="fas fa-arrow-right"></i> {{ selectedTo }}</span>
          </div>
        </div>

        <div class="route-details">
          <div class="detail">
            <i class="fas fa-money-bill-wave"></i>
            <span>Fare: {{ selectedRoute.fare }}</span>
          </div>
          <div class="detail">
            <i class="fas fa-clock"></i>
            <span>Duration: {{ selectedRoute.duration }}</span>
          </div>
          <div class="detail">
            <i class="fas fa-bus"></i>
            <span>Vehicle: {{ selectedRoute.vehicle }}</span>
          </div>
        </div>

        <div class="stages">
          <h3>Main Stages:</h3>
          <div class="stage" v-for="(stage, index) in selectedRoute.stages" :key="index">
            <div class="stage-number">{{ index + 1 }}</div>
            <div class="stage-name">{{ stage }}</div>
          </div>
        </div>

        <button class="save-route-btn" @click="saveRoute">
          <i class="fas fa-bookmark"></i> Save This Route
        </button>
      </div>
    </div>

    <!-- Popular Routes -->
    <div class="popular-routes" v-if="!selectedRoute">
      <h2><i class="fas fa-fire"></i> Popular Routes</h2>
      <div class="route-grid">
        <div class="popular-route" v-for="route in popularRoutes" :key="route.id" @click="selectPopularRoute(route)">
          <div class="popular-route-number">{{ route.number }}</div>
          <div class="popular-route-name">{{ route.name }}</div>
          <div class="popular-route-direction">
            {{ route.from }} <i class="fas fa-arrow-right"></i> {{ route.to }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouteSelector',
  data() {
    return {
      selectedFrom: '',
      selectedTo: '',
      selectedRoute: null,
      locations: [
        'CBD', 'Westlands', 'Kikuyu', 'Thika', 'Rongai', 
        'Karen', 'Langata', 'Embakasi', 'Donholm', 'Kasarani'
      ],
      popularRoutes: [
        {
          id: 1,
          number: '46',
          name: 'Kikuyu Route',
          from: 'CBD',
          to: 'Kikuyu',
          fare: 'KSh 50-80',
          duration: '45 min',
          vehicle: '14-seater Matatu',
          stages: ['CBD', 'Westlands', 'Kangemi', 'Kinoo', 'Kikuyu']
        },
        {
          id: 2,
          number: '34',
          name: 'Rongai Route',
          from: 'CBD',
          to: 'Rongai',
          fare: 'KSh 60-100',
          duration: '1 hr',
          vehicle: '14-seater Matatu',
          stages: ['CBD', 'South C', 'Galleria', 'Bomas', 'Rongai']
        },
        {
          id: 3,
          number: '111',
          name: 'Kawangware Express',
          from: 'CBD',
          to: 'Kawangware',
          fare: 'KSh 40-60',
          duration: '30 min',
          vehicle: '25-seater Minibus',
          stages: ['CBD', 'Ngara', 'Westlands', 'Kawangware']
        },
        {
          id: 4,
          number: '24',
          name: 'Karen Luxury',
          from: 'CBD',
          to: 'Karen',
          fare: 'KSh 100-150',
          duration: '1 hr 15 min',
          vehicle: '33-seater Shuttle',
          stages: ['CBD', 'Adams Arcade', 'Hardy', 'Karen']
        }
      ]
    }
  },
  computed: {
    canSearch() {
      return this.selectedFrom && this.selectedTo && this.selectedFrom !== this.selectedTo
    }
  },
  methods: {
    findRoute() {
      // In a real app, this would query your route database
      // For demo, we'll just find the first popular route that matches
      const matchedRoute = this.popularRoutes.find(route => 
        (route.from === this.selectedFrom && route.to === this.selectedTo) ||
        (route.from === this.selectedTo && route.to === this.selectedFrom)
      )
      
      if (matchedRoute) {
        this.selectedRoute = matchedRoute
      } else {
        alert(`No direct route found from ${this.selectedFrom} to ${this.selectedTo}. Try changing your locations.`)
      }
    },
    swapLocations() {
      const temp = this.selectedFrom
      this.selectedFrom = this.selectedTo
      this.selectedTo = temp
      this.selectedRoute = null
    },
    selectPopularRoute(route) {
      this.selectedFrom = route.from
      this.selectedTo = route.to
      this.selectedRoute = route
    },
    saveRoute() {
      alert(`Route ${this.selectedRoute.number} saved to your favorites!`)
      // In a real app, this would save to user's account
    }
  }
}
</script>

<style scoped>
.route-selector {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #1a5276;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.route-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.select-group label {
  font-weight: 500;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;
}

select {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.swap-btn {
  align-self: center;
  background: #f8f9fa;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.swap-btn:hover {
  background: #e9ecef;
  transform: rotate(180deg);
}

.find-route-btn {
  padding: 12px;
  background: #1a5276;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s;
}

.find-route-btn:hover {
  background: #154360;
}

.find-route-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.route-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.route-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.route-number {
  background: #1a5276;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 auto 10px;
}

.route-header h2 {
  margin: 10px 0;
  color: #1a5276;
}

.route-direction {
  color: #666;
  font-size: 0.9rem;
}

.route-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.detail {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail i {
  color: #1a5276;
}

.stages {
  margin: 25px 0;
}

.stages h3 {
  margin-bottom: 15px;
  color: #1a5276;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}

.stage {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.stage-number {
  background: #1a5276;
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.save-route-btn {
  width: 100%;
  padding: 12px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s;
}

.save-route-btn:hover {
  background: #27ae60;
}

.popular-routes h2 {
  color: #1a5276;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.route-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.popular-route {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.popular-route:hover {
  transform: translateY(-3px);
}

.popular-route-number {
  background: #1a5276;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.popular-route-name {
  font-weight: 500;
  margin-bottom: 5px;
}

.popular-route-direction {
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
}

@media (max-width: 600px) {
  .route-form {
    padding: 15px;
  }
  
  .route-grid {
    grid-template-columns: 1fr;
  }
}
</style>