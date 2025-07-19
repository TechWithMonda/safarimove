<template>
  <div class="matatu-routes-view">
    <!-- Header Section -->
    <div class="routes-header">
      <h1><i class="fas fa-bus"></i> Popular Matatu Routes</h1>
      <div class="search-controls">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Search routes..." 
            v-model="searchQuery"
            @input="filterRoutes"
          >
          <i class="fas fa-search"></i>
        </div>
        <button class="refresh-btn" @click="refreshData">
          <i class="fas fa-sync-alt"></i> Refresh
        </button>
      </div>
    </div>

    <!-- Main Routes List -->
    <div class="routes-list">
      <div 
        class="route-card" 
        v-for="route in filteredRoutes" 
        :key="route.id"
        @click="showRouteDetails(route)"
      >
        <div class="route-header">
          <h3 class="route-number">Route {{ route.number }}</h3>
          <h2 class="route-name">{{ route.name }}</h2>
        </div>
        
        <div class="route-summary">
          <div class="route-direction">
            <i class="fas fa-arrow-right"></i>
            {{ route.from }} → {{ route.to }}
          </div>
          
          <div class="route-details">
            <div class="detail-item">
              <i class="fas fa-money-bill-wave"></i>
              <span>KSh {{ route.fareRange }}</span>
              <small>Fare range</small>
            </div>
            
            <div class="detail-item">
              <i class="fas fa-clock"></i>
              <span>{{ route.frequency }}</span>
              <small>Frequency</small>
            </div>
            
            <div class="detail-item">
              <i class="fas fa-users"></i>
              <span>{{ route.capacity }}</span>
              <small>Capacity</small>
            </div>
            
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ route.stagesCount }} stages</span>
              <small>Route length</small>
            </div>
          </div>
        </div>
        
        <div class="route-stages-preview">
          <div 
            v-for="(stage, index) in route.mainStages" 
            :key="index"
            class="stage-tag"
          >
            {{ stage }}
            <span class="stage-connector" v-if="index < route.mainStages.length - 1">
              <i class="fas fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Route Details Modal -->
    <div class="modal-overlay" v-if="selectedRoute" @click.self="selectedRoute = null">
      <div class="route-details-modal">
        <button class="close-modal" @click="selectedRoute = null">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <h2>Route {{ selectedRoute.number }}</h2>
          <h1>{{ selectedRoute.name }}</h1>
          <div class="route-direction">
            <i class="fas fa-arrow-right"></i>
            {{ selectedRoute.from }} → {{ selectedRoute.to }}
          </div>
        </div>
        
        <div class="modal-body">
          <div class="details-section">
            <h3><i class="fas fa-info-circle"></i> Route Details</h3>
            <div class="details-grid">
              <div class="detail-box">
                <i class="fas fa-money-bill-wave"></i>
                <div>
                  <h4>Fare Range</h4>
                  <p>KSh {{ selectedRoute.fareRange }}</p>
                </div>
              </div>
              
              <div class="detail-box">
                <i class="fas fa-clock"></i>
                <div>
                  <h4>Frequency</h4>
                  <p>{{ selectedRoute.frequency }}</p>
                </div>
              </div>
              
              <div class="detail-box">
                <i class="fas fa-users"></i>
                <div>
                  <h4>Capacity</h4>
                  <p>{{ selectedRoute.capacity }}</p>
                </div>
              </div>
              
              <div class="detail-box">
                <i class="fas fa-road"></i>
                <div>
                  <h4>Route Length</h4>
                  <p>{{ selectedRoute.stagesCount }} stages</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="stages-section">
            <h3><i class="fas fa-map-marked-alt"></i> Main Stages</h3>
            <div class="stages-timeline">
              <div 
                v-for="(stage, index) in selectedRoute.mainStages" 
                :key="index"
                class="timeline-item"
              >
                <div class="timeline-marker">
                  <div class="marker-dot"></div>
                  <div class="marker-line" v-if="index < selectedRoute.mainStages.length - 1"></div>
                </div>
                <div class="timeline-content">
                  <h4>{{ stage }}</h4>
                  <p v-if="selectedRoute.stageDetails && selectedRoute.stageDetails[index]">
                    {{ selectedRoute.stageDetails[index] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tips-section" v-if="selectedRoute.tips">
            <h3><i class="fas fa-lightbulb"></i> Travel Tips</h3>
            <ul>
              <li v-for="(tip, index) in selectedRoute.tips" :key="index">
                {{ tip }}
              </li>
            </ul>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="save-route" @click="saveRoute(selectedRoute)">
            <i class="fas fa-bookmark"></i> Save Route
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatatuRoutes',
  data() {
    return {
      searchQuery: '',
      selectedRoute: null,
      routes: [
        {
          id: 1,
          number: '46',
          name: 'Kikuyu Route',
          from: 'CBD',
          to: 'Kikuyu',
          fareRange: '50-80',
          frequency: '5-10 min',
          capacity: '14 seater',
          stagesCount: 5,
          mainStages: ['CBD', 'Westlands', 'Kangemi', 'Kinoo', 'Kikuyu'],
          stageDetails: [
            'Main pickup point near Hilton',
            'Stop near Sarit Centre',
            'Major stage near Kangemi market',
            'Stop near Kinoo stage',
            'Terminal at Kikuyu town'
          ],
          tips: [
            'Avoid rush hour (7-9am) for less crowded rides',
            'Last matatu leaves Kikuyu at 10:30pm',
            'Watch for conductors calling "Kinoo direct" for express trips'
          ]
        },
        {
          id: 2,
          number: '34',
          name: 'Rongai Route',
          from: 'CBD',
          to: 'Rongai',
          fareRange: '60-100',
          frequency: '10-15 min',
          capacity: '14 seater',
          stagesCount: 5,
          mainStages: ['CBD', 'South C', 'Galleria', 'Bomas', 'Rongai'],
          stageDetails: [
            'Starts near Ambassador hotel',
            'Pickup near South C petrol station',
            'Major stop at Galleria shopping mall',
            'Stop near Bomas of Kenya',
            'Terminal at Rongai stage'
          ],
          tips: [
            'Night fare surcharge after 8pm',
            'Express matatus skip South C',
            'Best route to Bomas events'
          ]
        },
        {
          id: 3,
          number: '11',
          name: 'Kawangware Route',
          from: 'CBD',
          to: 'Kawangware',
          fareRange: '30-50',
          frequency: '3-5 min',
          capacity: '14 seater',
          stagesCount: 4,
          mainStages: ['CBD', 'Ngara', 'Westlands', 'Kawangware'],
          stageDetails: [
            'Multiple pickup points along Moi Avenue',
            'Stop near Ngara market',
            'Major stage at Westlands roundabout',
            'Terminal at Kawangware 56'
          ],
          tips: [
            'Most frequent route in Nairobi',
            'Night service available until midnight',
            'Watch for "Westlands direct" options'
          ]
        },
        {
          id: 4,
          number: '24',
          name: 'Karen Route',
          from: 'CBD',
          to: 'Karen',
          fareRange: '80-120',
          frequency: '15-20 min',
          capacity: '25 seater',
          stagesCount: 4,
          mainStages: ['CBD', 'Adams Arcade', 'Hardy', 'Karen'],
          stageDetails: [
            'Starts near Kencom bus stop',
            'Major stop at Adams Arcade shopping center',
            'Pickup near Hardy police station',
            'Terminal at Karen shopping center'
          ],
          tips: [
            'Fewer matatus in the evening',
            'Premium fare for larger vehicles',
            'Best route for Karen shopping centers'
          ]
        },
        {
          id: 5,
          number: '23',
          name: 'Dandora Route',
          from: 'CBD',
          to: 'Dandora',
          fareRange: '40-70',
          frequency: '7-10 min',
          capacity: '14 seater',
          stagesCount: 6,
          mainStages: ['CBD', 'Pangani', 'Eastleigh', 'Utawala', 'Donholm', 'Dandora'],
          stageDetails: [
            'Pickup near Archives',
            'Major stage at Pangani',
            'Stop near Eastleigh mall',
            'Pickup at Utawala roundabout',
            'Stop near Donholm junction',
            'Terminal at Dandora stage'
          ],
          tips: [
            'Avoid evening rush hour (5-7pm)',
            'Watch for "Utawala direct" options',
            'Last matatu leaves CBD at 11pm'
          ]
        },
        {
          id: 6,
          number: '8',
          name: 'Buruburu Route',
          from: 'CBD',
          to: 'Buruburu',
          fareRange: '40-60',
          frequency: '5-8 min',
          capacity: '14 seater',
          stagesCount: 5,
          mainStages: ['CBD', 'Landhies Rd', 'Pumwani', 'Jogoo Rd', 'Buruburu'],
          stageDetails: [
            'Multiple pickup points along Tom Mboya St',
            'Stop near Landhies Rd market',
            'Pickup near Pumwani hospital',
            'Major stage along Jogoo Rd',
            'Terminal at Buruburu stage'
          ],
          tips: [
            'Most matatus operate until 10:30pm',
            'Express options available during rush hour',
            'Best route for Jogoo Rd connections'
          ]
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
      return (
        route.number.toLowerCase().includes(query) ||
        route.name.toLowerCase().includes(query) ||
        route.from.toLowerCase().includes(query) ||
        route.to.toLowerCase().includes(query) ||
        route.mainStages.some(stage => stage.toLowerCase().includes(query))
      );
    });
  }
},
    refreshData() {
      // In a real app, this would fetch fresh data from an API
      this.$toast.success('Matatu routes updated');
    },
    showRouteDetails(route) {
      this.selectedRoute = route;
    },
    saveRoute(route) {
      // In a real app, this would save to user's favorites
      this.$toast.success(`Route ${route.number} saved to your favorites`);
      this.selectedRoute = null;
    }
  }

</script>

<style scoped>
.matatu-routes-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.routes-header {
  margin-bottom: 30px;
}

.routes-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.search-controls {
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-box {
  position: relative;
  flex-grow: 1;
}

.search-box input {
  width: 100%;
  padding: 12px 15px 12px 45px;
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

.refresh-btn {
  padding: 12px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.refresh-btn:hover {
  background: #2980b9;
}

.routes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 20px;
}

.route-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.route-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.route-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.route-number {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.route-name {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0;
}

.route-summary {
  margin-bottom: 15px;
}

.route-direction {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 15px;
}

.route-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-item i {
  color: #3498db;
  width: 20px;
  text-align: center;
}

.detail-item span {
  font-weight: 500;
  color: #2c3e50;
}

.detail-item small {
  font-size: 0.8rem;
  color: #7f8c8d;
  display: block;
}

.route-stages-preview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.stage-tag {
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  color: #34495e;
  display: flex;
  align-items: center;
}

.stage-connector {
  margin-left: 5px;
  color: #bdc3c7;
  font-size: 0.7rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.route-details-modal {
  background: white;
  border-radius: 15px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 5px 25px rgba(0,0,0,0.2);
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #7f8c8d;
  cursor: pointer;
  padding: 5px;
}

.modal-header {
  padding: 30px 30px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.modal-header h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 15px;
}

.modal-header .route-direction {
  font-size: 1.2rem;
  margin: 0;
}

.modal-body {
  padding: 20px 30px;
}

.details-section {
  margin-bottom: 30px;
}

.details-section h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.detail-box {
  display: flex;
  gap: 15px;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.detail-box i {
  font-size: 1.5rem;
  color: #3498db;
}

.detail-box h4 {
  margin: 0 0 5px;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.detail-box p {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 500;
}

.stages-section {
  margin-bottom: 30px;
}

.stages-section h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stages-timeline {
  position: relative;
  padding-left: 30px;
}

.timeline-item {
  position: relative;
  padding-bottom: 20px;
}

.timeline-marker {
  position: absolute;
  left: -30px;
  top: 0;
}

.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3498db;
  border: 3px solid #ebf5fb;
}

.marker-line {
  position: absolute;
  left: 50%;
  top: 16px;
  bottom: 0;
  width: 2px;
  background: #bdc3c7;
  transform: translateX(-50%);
}

.timeline-content {
  padding-left: 15px;
}

.timeline-content h4 {
  margin: 0 0 5px;
  font-size: 1.1rem;
  color: #2c3e50;
}

.timeline-content p {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.tips-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.tips-section h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.tips-section ul {
  margin: 0;
  padding-left: 20px;
}

.tips-section li {
  margin-bottom: 8px;
  color: #34495e;
}

.modal-footer {
  padding: 20px 30px;
  border-top: 1px solid #f0f0f0;
  text-align: right;
}

.save-route {
  padding: 12px 25px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.save-route:hover {
  background: #27ae60;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .routes-list {
    grid-template-columns: 1fr;
  }
  
  .search-controls {
    flex-direction: column;
  }
  
  .search-box, .refresh-btn {
    width: 100%;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .route-details {
    grid-template-columns: 1fr;
  }
}
</style>