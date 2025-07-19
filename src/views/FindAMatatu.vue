<template>
  <div class="transport-tracker">
    <!-- Loading overlay -->
    <div v-if="!googleMapsLoaded" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading map...</p>
    </div>

    <!-- Main content -->
    <div v-else>
      <!-- Header with Transport Type Selector -->
      <div class="tracker-header">
        <h1><i class="fas fa-bus"></i> Nairobi Transport Tracker</h1>
        <div class="transport-selector">
          <select v-model="selectedTransport" @change="updateMapMarkers">
            <option value="matatu">Matatus</option>
            <option value="bus">City Buses</option>
            <option value="train">Commuter Rail</option>
            <option value="all">All Transport</option>
          </select>
        </div>
      </div>

      <!-- Interactive Map Container -->
      <div class="map-container">
        <div id="google-map" ref="googleMap"></div>
        
        <!-- Map Controls Overlay -->
        <div class="map-controls">
          <button @click="centerToUserLocation">
            <i class="fas fa-location-arrow"></i>
          </button>
          <button @click="toggleTrafficLayer">
            <i class="fas fa-traffic-light"></i>
          </button>
        </div>
        
        <!-- Transport Info Sidebar -->
        <div class="transport-sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
          <button class="sidebar-toggle" @click="sidebarCollapsed = !sidebarCollapsed">
            <i :class="sidebarCollapsed ? 'fas fa-chevron-left' : 'fas fa-chevron-right'"></i>
          </button>
          
          <div class="sidebar-content">
            <h3>Nearby Transport</h3>
            <div class="transport-list">
              <div 
                v-for="vehicle in filteredVehicles" 
                :key="vehicle.id"
                class="transport-item"
                @click="focusOnVehicle(vehicle)"
                :class="{ 'selected': selectedVehicle?.id === vehicle.id }"
              >
                <div class="vehicle-icon" :style="{ color: getTransportColor(vehicle.type) }">
                  <i :class="getTransportIcon(vehicle.type)"></i>
                </div>
                <div class="vehicle-info">
                  <h4>{{ vehicle.route }}</h4>
                  <p>{{ vehicle.distance }} away • {{ vehicle.eta }}</p>
                </div>
                <button class="navigate-btn" @click.stop="startNavigation(vehicle)">
                  <i class="fas fa-directions"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Panel -->
      <div class="navigation-panel" v-if="navigationActive">
        <div class="navigation-header">
          <h3>Navigating to {{ navigationTarget?.route }}</h3>
          <button @click="cancelNavigation">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="navigation-steps">
          <div v-for="(step, index) in navigationSteps" :key="index" class="step">
            <i class="step-icon" :class="getStepIcon(step.maneuver)"></i>
            <div class="step-details">
              <p>{{ step.instruction }}</p>
              <span>{{ step.distance }} • {{ step.duration }}</span>
            </div>
          </div>
        </div>
        <div class="navigation-actions">
          <button @click="openInGoogleMaps">
            <i class="fab fa-google"></i> Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransportTracker',
  data() {
    return {
      selectedTransport: 'matatu',
      sidebarCollapsed: false,
      navigationActive: false,
      navigationTarget: null,
      navigationSteps: [],
      map: null,
      directionsService: null,
      directionsRenderer: null,
      trafficLayer: null,
      markers: [],
      googleMapsLoaded: false,
      selectedVehicle: null,
      loading: false,
      error: null,
      vehicles: [
        {
          id: 'm46',
          type: 'matatu',
          route: '46 - Kikuyu',
          position: { lat: -1.2641, lng: 36.8036 },
          distance: '350m',
          eta: '2 min',
          speed: '25 km/h',
          direction: 'CBD → Kikuyu'
        },
        {
          id: 'm34',
          type: 'matatu',
          route: '34 - Rongai',
          position: { lat: -1.2689, lng: 36.8072 },
          distance: '1.2km',
          eta: '5 min',
          speed: '18 km/h',
          direction: 'CBD → Rongai'
        },
        {
          id: 'b100',
          type: 'bus',
          route: 'City Hoppa',
          position: { lat: -1.2702, lng: 36.8011 },
          distance: '800m',
          eta: '4 min',
          speed: '20 km/h',
          direction: 'Westlands → CBD'
        },
        {
          id: 't12',
          type: 'train',
          route: 'Syokimau Train',
          position: { lat: -1.2598, lng: 36.8123 },
          distance: '2.5km',
          eta: '8 min',
          speed: '40 km/h',
          direction: 'Central → Syokimau'
        }
      ]
    }
  },
  computed: {
    filteredVehicles() {
      if (this.selectedTransport === 'all') return this.vehicles;
      return this.vehicles.filter(v => v.type === this.selectedTransport);
    }
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    async initializeMap() {
      this.loading = true;
      this.error = null;
      
      try {
        await this.$nextTick();
        
        if (!this.$refs.mapContainer) {
          throw new Error('Map container element not found');
        }

        if (!window.google || !window.google.maps) {
          await this.loadGoogleMaps();
        }

        this.initGoogleMap();
      } catch (err) {
        console.error('Map initialization error:', err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    loadGoogleMaps() {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDgbJ5ExBDeVQlEinUl8siP6shaFioq8_w&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          if (window.google && window.google.maps) {
            this.googleMapsLoaded = true;
            resolve();
          } else {
            reject(new Error('Google Maps API failed to load'));
          }
        };
        
        script.onerror = () => {
          reject(new Error('Failed to load Google Maps script'));
        };

        document.head.appendChild(script);
      });
    },

    initGoogleMap() {
      try {
        this.map = new google.maps.Map(this.$refs.mapContainer, {
          center: { lat: -1.2689, lng: 36.8072 },
          zoom: 14,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
          map: this.map,
          suppressMarkers: true
        });

        this.trafficLayer = new google.maps.TrafficLayer();
        this.updateMapMarkers();
      } catch (error) {
        console.error('Map initialization failed:', error);
        throw error;
      }
    },
    
    updateMapMarkers() {
      if (!this.map) return;

      this.clearMarkers();

      this.filteredVehicles.forEach(vehicle => {
        const marker = new google.maps.Marker({
          position: vehicle.position,
          map: this.map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: this.getTransportColor(vehicle.type),
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8
          },
          title: `${vehicle.route} (${vehicle.direction})`
        });

        const infoWindow = new google.maps.InfoWindow({
          content: this.getInfoWindowContent(vehicle)
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
          this.bindInfoWindowButton(vehicle);
        });

        this.markers.push(marker);
      });
    },

    getInfoWindowContent(vehicle) {
      return `
        <div class="map-info-window">
          <h4>${vehicle.route}</h4>
          <p>${vehicle.direction}</p>
          <p>Distance: ${vehicle.distance}</p>
          <p>ETA: ${vehicle.eta}</p>
          <button class="map-navigate-btn">Navigate</button>
        </div>
      `;
    },

    bindInfoWindowButton(vehicle) {
      setTimeout(() => {
        const btn = document.querySelector('.map-navigate-btn');
        if (btn) {
          btn.onclick = () => this.startNavigation(vehicle);
        }
      }, 100);
    },

    clearMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },
    
    getTransportIcon(type) {
      const icons = {
        matatu: 'fas fa-bus',
        bus: 'fas fa-bus-alt',
        train: 'fas fa-train'
      };
      return icons[type] || 'fas fa-bus';
    },
    
    getTransportColor(type) {
      const colors = {
        matatu: '#FF5722',
        bus: '#2196F3',
        train: '#4CAF50'
      };
      return colors[type] || '#9E9E9E';
    },
    
    centerToUserLocation() {
      if (!this.map) return;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.map.setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          error => {
            console.error("Geolocation error:", error);
          }
        );
      }
    },
    
    toggleTrafficLayer() {
      if (!this.trafficLayer) return;
      
      if (this.trafficLayer.getMap()) {
        this.trafficLayer.setMap(null);
      } else {
        this.trafficLayer.setMap(this.map);
      }
    },
    
    focusOnVehicle(vehicle) {
      if (!this.map) return;
      
      this.selectedVehicle = vehicle;
      this.map.setCenter(vehicle.position);
      this.map.setZoom(16);
    },
    
    startNavigation(vehicle) {
      if (!this.map || !this.directionsService) return;

      this.navigationActive = true;
      this.navigationTarget = vehicle;
      
      navigator.geolocation.getCurrentPosition(
        position => {
          this.calculateRoute(
            position.coords.latitude,
            position.coords.longitude,
            vehicle.position.lat,
            vehicle.position.lng
          );
        },
        error => {
          console.error("Navigation error:", error);
        }
      );
    },

    calculateRoute(startLat, startLng, endLat, endLng) {
      const origin = new google.maps.LatLng(startLat, startLng);
      const destination = new google.maps.LatLng(endLat, endLng);
      
      this.directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.WALKING
        },
        (response, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response);
            this.processSteps(response.routes[0].legs[0].steps);
          }
        }
      );
    },
    
    processSteps(steps) {
      this.navigationSteps = steps.map(step => ({
        instruction: step.instructions.replace(/<[^>]*>/g, ''),
        distance: step.distance.text,
        duration: step.duration.text,
        maneuver: step.maneuver || 'straight'
      }));
    },
    
    getStepIcon(maneuver) {
      const icons = {
        'turn-left': 'fas fa-arrow-turn-up-left',
        'turn-right': 'fas fa-arrow-turn-up-right',
        // ... other icons ...
      };
      return icons[maneuver] || 'fas fa-arrow-up';
    },
    
    cancelNavigation() {
      this.navigationActive = false;
      if (this.directionsRenderer) {
        this.directionsRenderer.setDirections({ routes: [] });
      }
    },
    
    openInGoogleMaps() {
      if (!this.navigationTarget) return;
      
      const url = `https://www.google.com/maps/dir/?api=1&destination=${
        this.navigationTarget.position.lat
      },${
        this.navigationTarget.position.lng
      }&travelmode=walking`;
      
      window.open(url, '_blank');
    }
  },
  beforeUnmount() {
    this.clearMarkers();
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
  }
}
</script>

<style scoped>
.transport-tracker {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1a5276;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.tracker-header {
  padding: 15px;
  background: #1a5276;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tracker-header h1 {
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.transport-selector select {
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  background: white;
}

.map-container {
  flex: 1;
  position: relative;
}

#google-map {
  height: 100%;
  width: 100%;
}

.map-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.map-controls button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a5276;
}

.transport-sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: white;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  z-index: 10;
}

.sidebar-collapsed {
  transform: translateX(270px);
}

.sidebar-toggle {
  position: absolute;
  left: -30px;
  top: 50%;
  width: 30px;
  height: 60px;
  background: white;
  border: none;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
}

.sidebar-content {
  padding: 15px;
  height: 100%;
  overflow-y: auto;
}

.sidebar-content h3 {
  margin-top: 0;
  color: #1a5276;
}

.transport-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transport-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

.transport-item:hover {
  background: #f5f5f5;
}

.transport-item.selected {
  background: #e3f2fd;
}

.vehicle-icon {
  font-size: 1.2rem;
  margin-right: 10px;
  width: 30px;
  text-align: center;
}

.vehicle-info {
  flex: 1;
}

.vehicle-info h4 {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.vehicle-info p {
  margin: 3px 0 0;
  font-size: 0.8rem;
  color: #666;
}

.navigate-btn {
  background: none;
  border: none;
  color: #1a5276;
  cursor: pointer;
  font-size: 1.1rem;
}

.navigation-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 15px;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
  z-index: 10;
  max-height: 50vh;
  overflow-y: auto;
}

.navigation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.navigation-header h3 {
  margin: 0;
  color: #1a5276;
}

.navigation-header button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.navigation-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.step:last-child {
  border-bottom: none;
}

.step-icon {
  font-size: 1rem;
  color: #1a5276;
  width: 20px;
  text-align: center;
  margin-top: 2px;
}

.step-details p {
  margin: 0;
  font-size: 0.9rem;
}

.step-details span {
  font-size: 0.8rem;
  color: #666;
}

.navigation-actions {
  margin-top: 15px;
  text-align: center;
}

.navigation-actions button {
  background: #1a5276;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.map-info-window {
  padding: 10px;
  font-family: Arial, sans-serif;
}

.map-info-window h4 {
  margin: 0 0 5px 0;
  color: #1a5276;
}

.map-info-window p {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
}

.map-navigate-btn {
  background: #1a5276;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 5px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .transport-sidebar {
    width: 250px;
  }
  
  .sidebar-collapsed {
    transform: translateX(220px);
  }
  
  .tracker-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>