<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 px-4 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-2xl animate-spin-slow"></div>
    </div>

    <!-- Floating Particles -->
    <div class="particles absolute inset-0 pointer-events-none">
      <div 
        v-for="n in 20" 
        :key="n"
        class="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-float"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (Math.random() * 3 + 4) + 's'
        }"
      ></div>
    </div>

    <div class="w-full max-w-md animate-slide-up relative z-10">
      <!-- Registration Card with Glass Effect -->
      <div class="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:shadow-purple-500/20 hover:scale-[1.02] group">
        <!-- Gradient Border Effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative">
          <!-- Header with 3D Effect -->
          <div class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8 text-center relative overflow-hidden">
            <!-- Animated Lines -->
            <div class="absolute top-0 left-0 w-full h-full">
              <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
              <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer delay-1000"></div>
            </div>
            
            <div class="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300 shadow-lg relative">
              <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              <i class="fas fa-user-plus text-white text-3xl relative z-10"></i>
            </div>
            <h2 class="text-3xl font-bold text-white mb-1 tracking-tight">Join Nairobi Connect</h2>
            <p class="text-purple-100 text-lg font-medium">Create your premium account</p>
          </div>

          <!-- Form with Enhanced Styling -->
          <form @submit.prevent="handleRegister" class="p-8 space-y-6">
            <!-- Email Field -->
            <div class="space-y-3 group">
              <label class="text-gray-200 text-sm font-semibold uppercase tracking-wider">Email Address</label>
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 peer"
                  placeholder="your@email.com"
                  @input="validateEmail"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 peer-focus:from-purple-600/10 peer-focus:via-transparent peer-focus:to-purple-600/10 pointer-events-none transition-all duration-500"></div>
                <i class="fas fa-envelope absolute right-4 top-4 text-gray-400 peer-focus:text-purple-400 transition-colors duration-300"></i>
              </div>
              <p v-if="errors.email" class="text-red-400 text-sm animate-shake flex items-center">
                <i class="fas fa-exclamation-circle mr-2"></i> {{ errors.email }}
              </p>
            </div>

            <!-- Username Field -->
            <div class="space-y-3 group">
              <label class="text-gray-200 text-sm font-semibold uppercase tracking-wider">Username</label>
              <div class="relative">
                <input
                  v-model="form.username"
                  type="text"
                  required
                  class="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 peer"
                  placeholder="Choose a unique username"
                  @input="validateUsername"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 peer-focus:from-purple-600/10 peer-focus:via-transparent peer-focus:to-purple-600/10 pointer-events-none transition-all duration-500"></div>
                <i class="fas fa-user absolute right-4 top-4 text-gray-400 peer-focus:text-purple-400 transition-colors duration-300"></i>
              </div>
              <p v-if="errors.username" class="text-red-400 text-sm animate-shake flex items-center">
                <i class="fas fa-exclamation-circle mr-2"></i> {{ errors.username }}
              </p>
            </div>

            <!-- Password Field -->
            <div class="space-y-3 group">
              <label class="text-gray-200 text-sm font-semibold uppercase tracking-wider">Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 peer"
                  placeholder="Create a secure password"
                  @input="validatePassword"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 peer-focus:from-purple-600/10 peer-focus:via-transparent peer-focus:to-purple-600/10 pointer-events-none transition-all duration-500"></div>
                <button 
                  type="button" 
                  @click="togglePasswordVisibility"
                  class="absolute right-4 top-4 text-gray-400 hover:text-purple-400 transition-colors duration-300 z-10"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              
              <!-- Enhanced Password Strength Indicator -->
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-400">Password Strength</span>
                  <span class="text-xs font-medium" :class="{
                    'text-red-400': passwordStrength < 1,
                    'text-yellow-400': passwordStrength === 1,
                    'text-blue-400': passwordStrength === 2,
                    'text-green-400': passwordStrength === 3
                  }">
                    {{ getStrengthText() }}
                  </span>
                </div>
                <div class="grid grid-cols-4 gap-2">
                  <div 
                    v-for="n in 4" 
                    :key="n"
                    class="h-2 rounded-full transition-all duration-700 relative overflow-hidden"
                    :class="{
                      'bg-red-500 shadow-red-500/50': passwordStrength >= 0 && n === 1,
                      'bg-yellow-500 shadow-yellow-500/50': passwordStrength >= 1 && n <= 2,
                      'bg-blue-500 shadow-blue-500/50': passwordStrength >= 2 && n <= 3,
                      'bg-green-500 shadow-green-500/50': passwordStrength >= 3 && n <= 4,
                      'bg-white/10': n > Math.max(passwordStrength, 0)
                    }"
                  >
                    <div v-if="n <= Math.max(passwordStrength, 0)" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div class="space-y-3 group">
              <label class="text-gray-200 text-sm font-semibold uppercase tracking-wider">Confirm Password</label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 peer"
                  placeholder="Confirm your password"
                  @input="validateConfirmPassword"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 peer-focus:from-purple-600/10 peer-focus:via-transparent peer-focus:to-purple-600/10 pointer-events-none transition-all duration-500"></div>
                <i class="fas fa-lock absolute right-4 top-4 text-gray-400 peer-focus:text-purple-400 transition-colors duration-300"></i>
              </div>
              <p v-if="errors.confirmPassword" class="text-red-400 text-sm animate-shake flex items-center">
                <i class="fas fa-exclamation-circle mr-2"></i> {{ errors.confirmPassword }}
              </p>
            </div>

            <!-- Enhanced Submit Button -->
            <button
              type="submit"
              class="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center mt-8 relative overflow-hidden group shadow-xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              :disabled="isSubmitting || !isFormValid"
            >
              <!-- Button shine effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <span v-if="!isSubmitting" class="relative z-10 flex items-center">
                <i class="fas fa-rocket mr-3"></i>
                Create Account
              </span>
              <span v-else class="flex items-center relative z-10">
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                Creating Account...
              </span>
            </button>

            <!-- Enhanced Error Message -->
            <div 
              v-if="errorMessage"
              class="p-4 bg-red-500/10 backdrop-blur-sm text-red-300 rounded-xl border border-red-500/30 animate-shake relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-red-500/5 animate-pulse"></div>
              <div class="relative z-10 flex items-center">
                <i class="fas fa-exclamation-triangle mr-3 text-lg"></i>
                {{ errorMessage }}
              </div>
            </div>
          </form>

          <!-- Enhanced Footer Links -->
          <div class="px-8 pb-8 text-center">
            <div class="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
            <p class="text-gray-300 text-base">Already have an account?</p>
            <a 
              href="/login" 
              class="inline-flex items-center mt-2 text-purple-400 hover:text-purple-300 transition-all duration-300 font-semibold text-lg group"
            >
              <i class="fas fa-sign-in-alt mr-2 group-hover:transform group-hover:scale-110 transition-transform duration-300"></i>
              Sign in here
              <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      errors: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      showPassword: false,
      isSubmitting: false,
      errorMessage: '',
      passwordStrength: -1
    }
  },
  computed: {
    isFormValid() {
      return (
        this.form.email &&
        this.form.username &&
        this.form.password &&
        this.form.confirmPassword &&
        !this.errors.email &&
        !this.errors.username &&
        !this.errors.password &&
        !this.errors.confirmPassword
      )
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    getStrengthText() {
      const levels = ['Weak', 'Fair', 'Good', 'Strong']
      return this.passwordStrength >= 0 ? levels[this.passwordStrength] : 'Enter password'
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.form.email) {
        this.errors.email = 'Email is required'
      } else if (!emailRegex.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
      } else {
        this.errors.email = ''
      }
    },
    validateUsername() {
      if (!this.form.username) {
        this.errors.username = 'Username is required'
      } else if (this.form.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters'
      } else if (this.form.username.length > 20) {
        this.errors.username = 'Username must be less than 20 characters'
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.form.username)) {
        this.errors.username = 'Username can only contain letters, numbers, and underscores'
      } else {
        this.errors.username = ''
      }
    },
    validatePassword() {
      // Enhanced password strength calculation
      let strength = -1
      if (this.form.password.length > 0) strength = 0
      if (this.form.password.length >= 8) strength = 1
      if (/[A-Z]/.test(this.form.password) && /[a-z]/.test(this.form.password)) strength = 2
      if (/\d/.test(this.form.password) && /[!@#$%^&*(),.?":{}|<>]/.test(this.form.password) && this.form.password.length >= 10) strength = 3
      this.passwordStrength = strength

      if (!this.form.password) {
        this.errors.password = 'Password is required'
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters'
      } else {
        this.errors.password = ''
      }
      this.validateConfirmPassword()
    },
    validateConfirmPassword() {
      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password'
      } else if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match'
      } else {
        this.errors.confirmPassword = ''
      }
    },
    async handleRegister() {
      // Validate all fields
      this.validateEmail()
      this.validateUsername()
      this.validatePassword()
      this.validateConfirmPassword()

      if (!this.isFormValid) {
        this.errorMessage = 'Please fix the errors in the form'
        return
      }

      this.isSubmitting = true
      this.errorMessage = ''

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register/', {
          email: this.form.email,
          username: this.form.username,
          password: this.form.password,
          password2: this.form.confirmPassword  // Some APIs expect password2 for confirmation
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Handle successful registration
        if (response.data.success || response.status === 201) {
          // If your API returns user data or tokens
          if (response.data.user) {
            this.$store.commit('setUser', response.data.user);
          }
          if (response.data.token) {
            localStorage.setItem('accessToken', response.data.token);
          }
          
          // Redirect to appropriate page (verify email or dashboard)
         
          this.$router.push('/');
        } else {
          throw new Error('Registration failed');
        }
      } catch (error) {
        // Handle API validation errors
        if (error.response?.data) {
          const data = error.response.data;
          
          // Map backend errors to form fields
          if (data.email) this.errors.email = Array.isArray(data.email) ? data.email[0] : data.email;
          if (data.username) this.errors.username = Array.isArray(data.username) ? data.username[0] : data.username;
          if (data.password) this.errors.password = Array.isArray(data.password) ? data.password[0] : data.password;
          if (data.non_field_errors) this.errorMessage = Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors;
          
          if (!this.errorMessage) {
            this.errorMessage = 'Please correct the errors in the form';
          }
        } else {
          this.errorMessage = error.message || 'Registration failed. Please try again.';
        }
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>
<style scoped>
/* Enhanced Animations */
.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.animate-shake {
  animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.animate-shimmer {
  animation: shimmer 2s linear infinite;
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-8px); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.1;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
    opacity: 0.3;
  }
}

/* Glassmorphism enhancements */
.backdrop-blur-xl {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #8b5cf6, #6366f1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #7c3aed, #4f46e5);
}

/* Enhanced focus states */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.15);
}

/* Button enhancements */
button:not(:disabled):hover {
  box-shadow: 0 15px 35px rgba(139, 92, 246, 0.3);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .w-full.max-w-md {
    max-width: 100%;
    margin: 1rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .text-3xl {
    font-size: 1.75rem;
  }
}
</style>