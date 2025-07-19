<template>
  <div class="bodaboda-directory">
    <!-- Header Section -->
    <div class="directory-header">
      <h1><i class="fas fa-motorcycle"></i> Nearby Bodaboda Drivers</h1>
      <div class="header-controls">
        <div class="location-selector">
          <i class="fas fa-map-marker-alt"></i>
          <select v-model="selectedLocation" @change="filterDrivers">
            <option value="all">All Areas</option>
            <option v-for="location in locations" :value="location" :key="location">
              {{ location }}
            </option>
          </select>
        </div>
        <button class="bolt-integration-btn" @click="showBoltIntegration = true">
          <img src="../assets/bolt-logo.png" alt="Bolt" class="bolt-logo">
          Connect Bolt
        </button>
      </div>
    </div>

    <!-- Driver List -->
    <div class="drivers-list">
      <div 
        class="driver-card" 
        v-for="driver in filteredDrivers" 
        :key="driver.id"
        :class="{ 'busy-driver': driver.status === 'Busy' }"
      >
        <div class="driver-avatar">
          {{ driver.initials }}
        </div>
        <div class="driver-info">
          <h3>{{ driver.name }}</h3>
          <div class="driver-location">
            <i class="fas fa-map-marker-alt"></i> {{ driver.location }}
          </div>
          <div class="driver-status" :class="driver.status.toLowerCase()">
            {{ driver.status }}
          </div>
        </div>
        <div class="driver-rating">
          <i class="fas fa-star"></i> {{ driver.rating }}
          <div class="eta">{{ driver.eta }} away</div>
        </div>
        <div class="driver-specialty">
          <i class="fas fa-tag"></i> {{ driver.specialty }}
        </div>
        <div class="driver-actions">
          <button 
            class="call-btn" 
            :class="{ 'busy-btn': driver.status === 'Busy' }"
            @click="callDriver(driver)"
          >
            <i class="fas fa-phone"></i> 
            {{ driver.status === 'Busy' ? 'Call (Busy)' : 'Call Now' }}
          </button>
          <button 
            class="bolt-btn"
            @click="requestBoltRide(driver)"
          >
            <img src="../assets/bolt-logo.png" alt="Bolt" class="bolt-logo-small">
            Book via Bolt
          </button>
        </div>
      </div>
    </div>

    <!-- Bolt Integration Modal -->
    <div class="modal-overlay" v-if="showBoltIntegration" @click.self="showBoltIntegration = false">
      <div class="integration-modal">
        <button class="close-modal" @click="showBoltIntegration = false">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <img src="../assets/bolt-logo.png" alt="Bolt" class="modal-bolt-logo">
          <h2>Earn Commissions with Bolt</h2>
          <p>Connect your Bolt account to earn 10% commission on every referred ride</p>
        </div>
        
        <div class="modal-body">
          <div class="integration-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Sign up as a Bolt Partner</h3>
                <p>Register on Bolt's partner platform to get your referral code</p>
                <a href="https://www.bolt.eu/partners/" target="_blank" class="step-link">
                  Visit Bolt Partners <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Enter Your Referral Code</h3>
                <div class="referral-input">
                  <input 
                    type="text" 
                    placeholder="Bolt referral code" 
                    v-model="boltReferralCode"
                  >
                  <button 
                    class="verify-btn"
                    @click="verifyReferralCode"
                  >
                    Verify
                  </button>
                </div>
                <p v-if="referralVerified" class="success-message">
                  <i class="fas fa-check-circle"></i> Code verified! You're ready to earn commissions
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Start Earning</h3>
                <p>Every ride booked through your referral will earn you 10% commission</p>
                <div class="earnings-preview">
                  <div class="earning-card">
                    <div class="earning-amount">KSh 50-150</div>
                    <div class="earning-label">Per short trip</div>
                  </div>
                  <div class="earning-card">
                    <div class="earning-amount">KSh 200-500</div>
                    <div class="earning-label">Per long trip</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="terms-section">
            <input type="checkbox" id="accept-terms" v-model="termsAccepted">
            <label for="accept-terms">
              I agree to Bolt's terms and conditions and confirm I'm authorized to promote their services
            </label>
          </div>
        </div>
        
        <div class="modal-footer">
          <button 
            class="complete-btn"
            :disabled="!referralVerified || !termsAccepted"
            @click="completeIntegration"
          >
            Complete Integration
          </button>
        </div>
      </div>
    </div>

    <!-- Referral Banner -->
    <div class="referral-banner" v-if="isBoltIntegrated">
      <div class="banner-content">
        <div class="banner-text">
          <h3>Earn with Bolt Referrals!</h3>
          <p>Share your code and earn 10% commission on every ride</p>
        </div>
        <div class="referral-code-box">
          <div class="code-label">Your referral code:</div>
          <div class="code-value">{{ userReferralCode }}</div>
          <button class="copy-btn" @click="copyReferralCode">
            <i class="far fa-copy"></i> Copy
          </button>
          <button class="share-btn" @click="shareReferralCode">
            <i class="fas fa-share-alt"></i> Share
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BodabodaDirectory',
  data() {
    return {
      selectedLocation: 'all',
      showBoltIntegration: false,
      boltReferralCode: '',
      referralVerified: false,
      termsAccepted: false,
      isBoltIntegrated: false,
      userReferralCode: 'BODA2023XYZ',
      locations: ['Westlands', 'CBD', 'Karen', 'Kasarani', 'Thika', 'Rongai', 'Embakasi'],
      drivers: [
        {
          id: 1,
          initials: 'JK',
          name: 'John Kamau',
          location: 'Westlands',
          status: 'Available',
          rating: 4.8,
          eta: '5 min',
          specialty: 'Long distance',
          boltConnected: true
        },
        {
          id: 2,
          initials: 'MW',
          name: 'Mary Wanjiku',
          location: 'CBD',
          status: 'Available',
          rating: 4.9,
          eta: '3 min',
          specialty: 'City rides',
          boltConnected: true
        },
        {
          id: 3,
          initials: 'PO',
          name: 'Peter Ochieng',
          location: 'Karen',
          status: 'Busy',
          rating: 4.7,
          eta: '15 min',
          specialty: 'Suburban routes',
          boltConnected: false
        },
        {
          id: 4,
          initials: 'GN',
          name: 'Grace Njeri',
          location: 'Kasarani',
          status: 'Available',
          rating: 4.6,
          eta: '8 min',
          specialty: 'Airport runs',
          boltConnected: true
        },
        {
          id: 5,
          initials: 'DM',
          name: 'David Mwangi',
          location: 'Thika',
          status: 'Available',
          rating: 4.5,
          eta: '10 min',
          specialty: 'Heavy cargo',
          boltConnected: false
        },
        {
          id: 6,
          initials: 'SW',
          name: 'Susan Wambui',
          location: 'Rongai',
          status: 'Available',
          rating: 4.8,
          eta: '7 min',
          specialty: 'Night rides',
          boltConnected: true
        }
      ],
      filteredDrivers: []
    }
  },
  created() {
    this.filteredDrivers = [...this.drivers];
  },
  methods: {
    filterDrivers() {
      if (this.selectedLocation === 'all') {
        this.filteredDrivers = [...this.drivers];
      } else {
        this.filteredDrivers = this.drivers.filter(
          driver => driver.location === this.selectedLocation
        );
      }
    },
    callDriver(driver) {
      if (driver.status === 'Busy') {
        this.$toast.warning(`${driver.name} is currently busy. Try again later.`);
        return;
      }
      // In a real app, this would initiate a phone call
      this.$toast.success(`Calling ${driver.name}...`);
    },
    requestBoltRide(driver) {
      if (!driver.boltConnected) {
        this.$toast.info('This driver is not Bolt-connected. Please call directly.');
        return;
      }
      
      if (!this.isBoltIntegrated) {
        this.showBoltIntegration = true;
        this.$toast.info('Connect your Bolt account to book rides and earn commissions');
        return;
      }
      
      // In a real app, this would open Bolt with referral parameters
      this.$toast.success(`Opening Bolt with ${driver.name}... You'll earn commission on this ride!`);
    },
    verifyReferralCode() {
      // In a real app, this would validate with Bolt's API
      if (this.boltReferralCode.length > 5) {
        this.referralVerified = true;
        this.$toast.success('Referral code verified!');
      } else {
        this.$toast.error('Please enter a valid Bolt referral code');
      }
    },
    completeIntegration() {
      this.isBoltIntegrated = true;
      this.showBoltIntegration = false;
      this.$toast.success('Bolt integration complete! Start earning commissions');
    },
    copyReferralCode() {
      navigator.clipboard.writeText(this.userReferralCode);
      this.$toast.success('Referral code copied to clipboard!');
    },
    shareReferralCode() {
      // In a real app, this would use the Web Share API or social media links
      this.$toast.info('Share feature would open in a real app');
    }
  }
}
</script>

<style scoped>
.bodaboda-directory {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.directory-header {
  margin-bottom: 30px;
}

.directory-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.location-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.location-selector i {
  color: #e74c3c;
}

.location-selector select {
  border: none;
  background: none;
  font-size: 1rem;
  color: #34495e;
  cursor: pointer;
}

.bolt-integration-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: #12d176;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.bolt-integration-btn:hover {
  background: #0fb367;
}

.bolt-logo {
  height: 20px;
}

.drivers-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.driver-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto auto;
  gap: 15px;
  grid-template-areas: 
    "avatar info rating"
    "avatar info specialty"
    "actions actions actions";
}

.busy-driver {
  opacity: 0.8;
  background: #f9f9f9;
}

.driver-avatar {
  grid-area: avatar;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.driver-info {
  grid-area: info;
}

.driver-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.driver-location {
  font-size: 0.9rem;
  color: #7f8c8d;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
}

.driver-status {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.driver-status.available {
  background: #e8f8f5;
  color: #27ae60;
}

.driver-status.busy {
  background: #fdedec;
  color: #e74c3c;
}

.driver-rating {
  grid-area: rating;
  text-align: right;
  color: #f39c12;
  font-weight: bold;
}

.driver-rating i {
  margin-right: 3px;
}

.eta {
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: normal;
  margin-top: 3px;
}

.driver-specialty {
  grid-area: specialty;
  font-size: 0.9rem;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
}

.driver-actions {
  grid-area: actions;
  display: flex;
  gap: 10px;
}

.call-btn {
  flex: 1;
  padding: 10px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s;
}

.call-btn:hover {
  background: #27ae60;
}

.busy-btn {
  background: #bdc3c7;
  cursor: not-allowed;
}

.busy-btn:hover {
  background: #bdc3c7;
}

.bolt-btn {
  flex: 1;
  padding: 10px;
  background: #12d176;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s;
}

.bolt-btn:hover {
  background: #0fb367;
}

.bolt-logo-small {
  height: 16px;
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

.integration-modal {
  background: white;
  border-radius: 15px;
  max-width: 600px;
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
  text-align: center;
}

.modal-header h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 15px 0 10px;
}

.modal-header p {
  color: #7f8c8d;
  margin: 0;
}

.modal-bolt-logo {
  height: 40px;
}

.modal-body {
  padding: 20px 30px;
}

.integration-steps {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.step {
  display: flex;
  gap: 15px;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.step-content p {
  margin: 0 0 10px 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.step-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
}

.referral-input {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.referral-input input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.verify-btn {
  padding: 0 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.verify-btn:hover {
  background: #2980b9;
}

.success-message {
  color: #27ae60;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  margin: 5px 0 0;
}

.earnings-preview {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.earning-card {
  flex: 1;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.earning-amount {
  font-weight: bold;
  color: #2ecc71;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.earning-label {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.terms-section {
  display: flex;
  gap: 10px;
  margin-top: 30px;
  font-size: 0.8rem;
  color: #7f8c8d;
}

.terms-section input {
  margin-top: 3px;
}

.modal-footer {
  padding: 20px 30px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}

.complete-btn {
  padding: 12px 30px;
  background: #12d176;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.complete-btn:hover {
  background: #0fb367;
}

.complete-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

/* Referral Banner */
.referral-banner {
  background: linear-gradient(135deg, #12d176, #0fb367);
  color: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
}

.banner-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.banner-text h3 {
  margin: 0 0 5px 0;
  font-size: 1.3rem;
}

.banner-text p {
  margin: 0;
  opacity: 0.9;
}

.referral-code-box {
  background: rgba(255,255,255,0.2);
  border-radius: 8px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.code-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.code-value {
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.copy-btn, .share-btn {
  background: rgba(255,255,255,0.3);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s;
}

.copy-btn:hover, .share-btn:hover {
  background: rgba(255,255,255,0.4);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .drivers-list {
    grid-template-columns: 1fr;
  }
  
  .header-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .driver-card {
    grid-template-columns: auto 1fr;
    grid-template-areas: 
      "avatar info"
      "rating specialty"
      "actions actions";
  }
  
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
  
  .referral-code-box {
    justify-content: center;
  }
}
</style>