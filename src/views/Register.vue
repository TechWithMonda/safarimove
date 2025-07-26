<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-900 px-4">
    <div class="w-full max-w-md">
      <!-- Simplified Card -->
      <div class="bg-slate-800/80 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
        <!-- Header -->
        <div class="bg-slate-800 p-6 text-center border-b border-slate-700/50">
          <div class="w-20 h-20 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-user-plus text-blue-400 text-3xl"></i>
          </div>
          <h2 class="text-3xl font-bold text-blue-400 mb-1">Join Nairobi Connect</h2>
          <p class="text-slate-300">Create your account today</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="p-6 space-y-5">
          <!-- Email Field -->
          <div class="space-y-2">
            <label class="text-slate-200 text-sm font-medium flex items-center">
              <i class="fas fa-envelope mr-2 text-blue-400"></i>
              Email Address
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your email"
              @input="validateEmail"
            />
            <p v-if="errors.email" class="text-red-400 text-xs flex items-center">
              <i class="fas fa-exclamation-circle mr-1"></i> {{ errors.email }}
            </p>
          </div>

          <!-- Username Field -->
          <div class="space-y-2">
            <label class="text-slate-200 text-sm font-medium flex items-center">
              <i class="fas fa-user mr-2 text-cyan-400"></i>
              Username
            </label>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
              placeholder="Choose a username"
              @input="validateUsername"
            />
            <p v-if="errors.username" class="text-red-400 text-xs flex items-center">
              <i class="fas fa-exclamation-circle mr-1"></i> {{ errors.username }}
            </p>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label class="text-slate-200 text-sm font-medium flex items-center">
              <i class="fas fa-lock mr-2 text-indigo-400"></i>
              Password
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-10 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Create a password"
                @input="validatePassword"
              />
              <button 
                type="button" 
                @click="togglePasswordVisibility"
                class="absolute right-3 top-3 text-slate-400 hover:text-indigo-400 transition p-1"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            
            <!-- Simplified Password Strength -->
            <div v-if="form.password" class="pt-1">
              <div class="flex justify-between text-xs text-slate-400">
                <span>Password Strength</span>
                <span :class="{
                  'text-red-400': passwordStrength < 1,
                  'text-amber-400': passwordStrength === 1,
                  'text-blue-400': passwordStrength === 2,
                  'text-emerald-400': passwordStrength === 3
                }">
                  {{ getStrengthText() }}
                </span>
              </div>
              <div class="grid grid-cols-4 gap-1 mt-1">
                <div 
                  v-for="n in 4" 
                  :key="n"
                  class="h-1 rounded-full"
                  :class="{
                    'bg-red-500': passwordStrength >= 0 && n === 1,
                    'bg-amber-500': passwordStrength >= 1 && n <= 2,
                    'bg-blue-500': passwordStrength >= 2 && n <= 3,
                    'bg-emerald-500': passwordStrength >= 3 && n <= 4,
                    'bg-slate-700': n > Math.max(passwordStrength, 0)
                  }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="space-y-2">
            <label class="text-slate-200 text-sm font-medium flex items-center">
              <i class="fas fa-shield-alt mr-2 text-violet-400"></i>
              Confirm Password
            </label>
            <input
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition"
              placeholder="Confirm your password"
              @input="validateConfirmPassword"
            />
            <p v-if="errors.confirmPassword" class="text-red-400 text-xs flex items-center">
              <i class="fas fa-exclamation-circle mr-1"></i> {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center justify-center mt-4 relative overflow-hidden"
            :disabled="isSubmitting || !isFormValid"
          >
            <span v-if="!isSubmitting" class="flex items-center">
              <i class="fas fa-rocket mr-2"></i>
              Create Account
            </span>
            <span v-else class="flex items-center">
              <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Creating Account...
            </span>
          </button>

          <!-- Error Message -->
          <div 
            v-if="errorMessage"
            class="p-3 bg-red-500/10 text-red-300 rounded-lg border border-red-500/20 flex items-center text-sm"
          >
            <i class="fas fa-exclamation-triangle mr-2"></i>
            {{ errorMessage }}
          </div>
        </form>

        <!-- Footer Links -->
        <div class="px-6 pb-6 text-center border-t border-slate-700/50 pt-5">
          <p class="text-slate-300 text-sm">Already have an account?</p>
          <a 
            href="/login" 
            class="inline-flex items-center mt-2 text-blue-400 hover:text-blue-300 transition font-medium text-sm"
          >
            <i class="fas fa-sign-in-alt mr-1"></i>
            Sign in here
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const passwordStrength = ref(-1)

const isFormValid = computed(() => {
  return (
    form.value.email &&
    form.value.username &&
    form.value.password &&
    form.value.confirmPassword &&
    !errors.value.email &&
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword
  )
})

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function getStrengthText() {
  const levels = ['Weak', 'Fair', 'Good', 'Strong']
  return passwordStrength.value >= 0 ? levels[passwordStrength.value] : ''
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = ''
  }
}

function validateUsername() {
  if (!form.value.username) {
    errors.value.username = 'Username is required'
  } else if (form.value.username.length < 3) {
    errors.value.username = 'Username must be at least 3 characters'
  } else if (form.value.username.length > 20) {
    errors.value.username = 'Username must be less than 20 characters'
  } else if (!/^[a-zA-Z0-9_]+$/.test(form.value.username)) {
    errors.value.username = 'Username can only contain letters, numbers, and underscores'
  } else {
    errors.value.username = ''
  }
}

function validatePassword() {
  let strength = -1
  if (form.value.password.length > 0) strength = 0
  if (form.value.password.length >= 8) strength = 1
  if (/[A-Z]/.test(form.value.password) && /[a-z]/.test(form.value.password)) strength = 2
  if (/\d/.test(form.value.password) && /[!@#$%^&*(),.?":{}|<>]/.test(form.value.password) && form.value.password.length >= 10) strength = 3
  passwordStrength.value = strength

  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  } else {
    errors.value.password = ''
  }
  validateConfirmPassword()
}

function validateConfirmPassword() {
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password'
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }
}

async function handleRegister() {
  validateEmail()
  validateUsername()
  validatePassword()
  validateConfirmPassword()

  if (!isFormValid.value) {
    errorMessage.value = 'Please fix the errors in the form'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('https://safarimovebackend-production.up.railway.app/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.value.email,
        username: form.value.username,
        password: form.value.password,
        password2: form.value.confirmPassword
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    if (data.success || response.status === 201) {
      // Store user data in localStorage only (no Vuex)
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      if (data.token) {
        localStorage.setItem('accessToken', data.token)
      }
      router.push('/login')
    } else {
      throw new Error('Registration failed')
    }
  } catch (error) {
    if (error.email) {
      errors.value.email = Array.isArray(error.email) ? error.email[0] : error.email
    }
    if (error.username) {
      errors.value.username = Array.isArray(error.username) ? error.username[0] : error.username
    }
    if (error.password) {
      errors.value.password = Array.isArray(error.password) ? error.password[0] : error.password
    }
    if (error.non_field_errors) {
      errorMessage.value = Array.isArray(error.non_field_errors) ? error.non_field_errors[0] : error.non_field_errors
    }
    
    if (!errorMessage.value) {
      errorMessage.value = error.message || 'Registration failed. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>


<style>
/* Minimal animations */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Smooth transitions */
.transition {
  transition: all 0.2s ease;
}

/* Focus states */
input:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>