<template>
  <div class="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
    <div class="text-center mb-6">
      <i class="fas fa-user-slash text-4xl text-red-500 mb-4"></i>
      <h2 class="text-2xl font-bold text-white">Account Deletion</h2>
      <p class="text-gray-300 mt-2">Request permanent removal of your account and associated data</p>
    </div>

    <div v-if="!submitted" class="space-y-6">
      <div class="bg-gray-700 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">What will be deleted:</h3>
        <ul class="list-disc pl-5 text-gray-300 space-y-1">
          <li>Your user profile information</li>
          <li>Saved preferences and settings</li>
          <li>Chat history (normally deleted after 24 hours)</li>
          <li>Location history (if any was stored)</li>
        </ul>
      </div>

      <div class="bg-gray-700 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">What we retain:</h3>
        <ul class="list-disc pl-5 text-gray-300 space-y-1">
          <li>Transaction records (for legal compliance)</li>
          <li>Aggregated analytics data (anonymous)</li>
          <li>Content you posted publicly (if applicable)</li>
        </ul>
      </div>

      <div>
        <label class="block text-white mb-2">Email associated with your account</label>
        <input 
          v-model="email" 
          type="email" 
          placeholder="your@email.com" 
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        >
      </div>

      <div>
        <label class="flex items-start">
          <input 
            v-model="confirmDelete" 
            type="checkbox" 
            class="mt-1 mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500 border-gray-600 bg-gray-700"
          >
          <span class="text-gray-300">
            I understand this action is <span class="font-semibold text-white">irreversible</span> and will permanently delete my account and associated data from Nairobi Connect.
          </span>
        </label>
      </div>

      <div class="pt-2">
        <button 
          @click="submitRequest" 
          :disabled="!canSubmit"
          :class="{'opacity-50 cursor-not-allowed': !canSubmit, 'hover:bg-red-700': canSubmit}"
          class="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium transition duration-150"
        >
          Request Account Deletion
        </button>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
      <h3 class="text-xl font-bold text-white mb-2">Request Received</h3>
      <p class="text-gray-300 mb-4">
        We've received your account deletion request. Our team will process it within 7 business days.
      </p>
      <p class="text-sm text-gray-400">
        A confirmation has been sent to <span class="font-medium text-white">{{ email }}</span>
      </p>
    </div>

    <div class="mt-6 pt-4 border-t border-gray-700">
      <h3 class="text-sm font-semibold text-gray-400 mb-2">ALTERNATIVE OPTIONS</h3>
      <button 
        @click="$emit('partial-deletion')"
        class="text-blue-400 hover:text-blue-300 text-sm font-medium"
      >
        Request partial data deletion instead
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountDeletion',
  data() {
    return {
      email: '',
      confirmDelete: false,
      submitted: false
    }
  },
  computed: {
    canSubmit() {
      return this.email && this.confirmDelete
    }
  },
  methods: {
    async submitRequest() {
      if (!this.canSubmit) return
      
      try {
        // Here you would typically make an API call to your backend
        // await this.$axios.post('/account/deletion', { email: this.email })
        
        // For demo purposes, we'll just show the success state
        this.submitted = true
        
        // Google Play requires logging deletion requests
        console.log(`Account deletion requested for: ${this.email}`)
      } catch (error) {
        console.error('Deletion request failed:', error)
        alert('Failed to submit request. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
input[type="email"]:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
}
</style>