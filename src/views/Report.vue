<template>
  <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6">
    <h2 class="text-lg font-semibold text-white mb-6 flex items-center">
      <i class="fas fa-exclamation-circle mr-2 text-red-400"></i>
      Traffic Report
    </h2>
    
    <form @submit.prevent="submitReport" class="space-y-5">
      <!-- Location Field -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <i class="fas fa-map-marker-alt mr-2 text-blue-400"></i>
          Location*
        </label>
        <div class="relative">
          <input 
            v-model="location" 
            type="text" 
            required
            placeholder="e.g. Thika Road Garden City"
            class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxlength="40"
          >
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i class="fas fa-location-dot text-slate-500"></i>
          </div>
        </div>
      </div>

      <!-- Message Field -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <i class="fas fa-comment-dots mr-2 text-blue-400"></i>
          Alert* (max 40 chars)
        </label>
        <div class="relative">
          <textarea 
            v-model="message" 
            rows="3"
            required
            placeholder="e.g. Heavy traffic due to accident"
            class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxlength="40"
            @input="updateMessage"
          ></textarea>
          <div class="absolute bottom-2 right-2 bg-slate-800 px-2 rounded">
            <span class="text-xs text-gray-400">{{ message.length }}/40</span>
          </div>
        </div>
      </div>

      <!-- Time Field -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <i class="fas fa-clock mr-2 text-blue-400"></i>
          When*
        </label>
        <div class="relative">
          <select 
            v-model="time" 
            required
            class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            <option v-for="option in timeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i class="fas fa-chevron-down text-slate-500"></i>
          </div>
        </div>
      </div>

      <!-- Severity -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <i class="fas fa-signal mr-2 text-blue-400"></i>
          Severity
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button 
            type="button"
            @click="severity = 'low'"
            class="py-2 px-3 rounded-lg border flex items-center justify-center transition-colors"
            :class="severity === 'low' ? 'border-green-500 bg-green-900/30' : 'border-slate-600 hover:bg-slate-700'"
          >
            <i class="fas fa-car mr-2" :class="severity === 'low' ? 'text-green-400' : 'text-gray-400'"></i>
            <span :class="severity === 'low' ? 'text-green-400' : 'text-gray-300'">Low</span>
          </button>
          <button 
            type="button"
            @click="severity = 'medium'"
            class="py-2 px-3 rounded-lg border flex items-center justify-center transition-colors"
            :class="severity === 'medium' ? 'border-yellow-500 bg-yellow-900/30' : 'border-slate-600 hover:bg-slate-700'"
          >
            <i class="fas fa-exclamation mr-2" :class="severity === 'medium' ? 'text-yellow-400' : 'text-gray-400'"></i>
            <span :class="severity === 'medium' ? 'text-yellow-400' : 'text-gray-300'">Medium</span>
          </button>
          <button 
            type="button"
            @click="severity = 'high'"
            class="py-2 px-3 rounded-lg border flex items-center justify-center transition-colors"
            :class="severity === 'high' ? 'border-red-500 bg-red-900/30' : 'border-slate-600 hover:bg-slate-700'"
          >
            <i class="fas fa-triangle-exclamation mr-2" :class="severity === 'high' ? 'text-red-400' : 'text-gray-400'"></i>
            <span :class="severity === 'high' ? 'text-red-400' : 'text-gray-300'">High</span>
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center mt-4"
        :disabled="isSubmitting"
      >
        <i v-if="!isSubmitting" class="fas fa-paper-plane mr-2"></i>
        <i v-else class="fas fa-circle-notch fa-spin mr-2"></i>
        {{ isSubmitting ? 'Submitting...' : 'Submit Report' }}
      </button>
    </form>

    <!-- Preview -->
    <div v-if="showPreview" class="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
      <h3 class="font-medium text-gray-300 flex items-center mb-2">
        <i class="fas fa-eye mr-2"></i>
        Preview
      </h3>
      <div class="bg-slate-800 p-3 rounded-md border border-slate-600">
        <div class="flex items-start space-x-3">
          <div :class="`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${getSeverityColor()}`"></div>
          <div>
            <div class="flex items-center justify-between mb-1">
              <h3 class="font-medium text-white">{{ location || 'Location' }}</h3>
              <span class="text-gray-400 text-xs">{{ getTimeLabel(time) || 'Just now' }}</span>
            </div>
            <p class="text-gray-300 text-sm">{{ message || 'Traffic status update' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTrafficStore } from '@/stores/traffic'
import { useRouter } from 'vue-router'

const router = useRouter()
const trafficStore = useTrafficStore()

// Get token from localStorage
const accessToken = ref(localStorage.getItem('accessToken') || '')
const isAuthenticated = ref(!!accessToken.value)

// Form data
const location = ref('')
const message = ref('')
const time = ref('now')
const severity = ref('medium')
const isSubmitting = ref(false)
const showPreview = ref(true)

// Time options
const timeOptions = ref([
  { value: 'now', label: 'Now' },
  { value: '5min', label: '5 min ago' },
  { value: '15min', label: '15 min ago' },
  { value: '30min', label: '30 min ago' },
  { value: '1hr', label: '1 hour ago' }
])

// Helper functions
const getTimeLabel = (value) => {
  const option = timeOptions.value.find(opt => opt.value === value)
  return option ? option.label : ''
}

const formatTime = (isoString) => {
  const now = new Date()
  const reportTime = new Date(isoString)
  const diffMinutes = Math.floor((now - reportTime) / (1000 * 60))
  
  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes} min ago`
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`
  return `${Math.floor(diffMinutes / 1440)} days ago`
}

const getSeverityColor = () => {
  return {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  }[severity.value]
}

const updateMessage = (event) => {
  const target = event.target
  if (target.value.length > 40) {
    message.value = target.value.slice(0, 40)
  }
}

const verifyToken = async () => {
  if (!accessToken.value) return false
  
  try {
    const response = await fetch('https://safarimovebackend-production.up.railway.app/api/verify/', {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error('Token verification failed')
    }
    
    return true
  } catch (error) {
    console.error('Token verification failed:', error)
    localStorage.removeItem('accessToken')
    accessToken.value = ''
    return false
  }
}

const submitReport = async () => {
  if (!(await verifyToken())) {
    alert('Session expired. Please login again.')
    router.push('/login')
    return
  }

  isSubmitting.value = true
  
  try {
    const report = {
      location: location.value,
      message: message.value,
      severity: severity.value
    }

    const response = await fetch('https://safarimovebackend-production.up.railway.app/api/report/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Submission failed')
    }

    const responseData = await response.json()

    trafficStore.addUpdate({
      road: report.location,
      status: report.message,
      time: 'Just now',
      statusColor: getSeverityColor()
    })

    resetForm()
    alert('Report submitted successfully!')
  } catch (error) {
    console.error('Error:', error.message)
    if (error.message.includes('401')) {
      alert('Session expired. Please login again.')
      router.push('/login')
    } else {
      alert(error.message || 'Submission failed')
    }
  } finally {
    isSubmitting.value = false
  }
}

const fetchRecentUpdates = async () => {
  try {
    const response = await fetch('https://safarimovebackend-production.up.railway.app/api/reports/recent/', {
      headers: { 
        'Authorization': `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch updates')
    }

    const data = await response.json()
    
    trafficStore.setUpdates(data.map(report => ({
      road: report.location,
      status: report.message,
      time: formatTime(report.created_at),
      statusColor: getSeverityColor()
    })))
  } catch (error) {
    console.error('Failed to fetch updates:', error)
    if (error.message.includes('401')) {
      alert('Session expired. Please login again.')
      router.push('/login')
    }
  }
}

const resetForm = () => {
  location.value = ''
  message.value = ''
  time.value = 'now'
  severity.value = 'medium'
}

onMounted(async () => {
  if (accessToken.value && await verifyToken()) {
    await fetchRecentUpdates()
  }
})
</script>

<style scoped>
/* Custom select styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234b5563' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Loading spinner */
.fa-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Smooth transitions */
input, textarea, select, button {
  transition: all 0.2s ease;
}
</style>