<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl animate-spin-slow"></div>
    </div>

    <!-- Floating Particles -->
    <div class="particles absolute inset-0 pointer-events-none">
      <div 
        v-for="n in 25" 
        :key="n"
        class="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (Math.random() * 3 + 4) + 's'
        }"
      ></div>
    </div>

    <div class="w-full max-w-lg animate-slide-up relative z-10">
      <!-- Registration Card with Modern Glass Effect -->
      <div class="backdrop-blur-2xl bg-slate-900/40 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden transition-all duration-500 hover:shadow-blue-500/20 hover:scale-[1.01] group">
        <!-- Gradient Border Effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-indigo-600/10 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative">
          <!-- Header with Modern 3D Effect -->
          <div class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 text-center relative overflow-hidden border-b border-slate-700/50">
            <!-- Animated Lines -->
            <div class="absolute top-0 left-0 w-full h-full">
              <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-shimmer"></div>
              <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-shimmer delay-1000"></div>
            </div>
            
            <div class="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-all duration-500 shadow-xl relative border border-blue-400/20">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-2xl"></div>
              <i class="fas fa-user-plus text-blue-400 text-4xl relative z-10"></i>
            </div>
            <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2 tracking-tight">Join Nairobi Connect</h2>
            <p class="text-slate-300 text-lg font-medium">Create your account today</p>
          </div>

          <!-- Form with Enhanced Modern Styling -->
          <form @submit.prevent="handleRegister" class="p-8 space-y-7 bg-gradient-to-b from-slate-900/50 to-slate-900/80 backdrop-blur-xl">
            <!-- Email Field -->
            <div class="space-y-3 group">
              <label class="text-slate-200 text-sm font-semibold tracking-wide flex items-center">
                <i class="fas fa-envelope mr-2 text-blue-400"></i>
                Email Address
              </label>
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-5 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:bg-slate-800/60 peer"
                  placeholder="Enter your email"
                  @input="validateEmail"
                />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 peer-focus:from-blue-600/5 peer-focus:via-transparent peer-focus:to-blue-600/5 pointer-events-none transition-all duration-500"></div>
              </div>
              <p v-if="errors.email" class="text-red-400 text-sm animate-shake flex items-center bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
                <i class="fas fa-exclamation-circle mr-2"></i> {{ errors.email }}
              </p>
            </div>

            <!-- Username Field -->
            <div class="space-y-3 group">
              <label class="text-slate-200 text-sm font-semibold tracking-wide flex items-center">
                <i class="fas fa-user mr-2 text-cyan-400"></i>
                Username
              </label>
              <div class="relative">
                <input
                  v-model="form.username"
                  type="text"
                  required
                  class="w-full px-5 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:bg-slate-800/60 peer"
                  placeholder="Choose a unique username"
                  @input="validateUsername"
                />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-600/0 via-cyan-600/0 to-cyan-600/0 peer-focus:from-cyan-600/5 peer-focus:via-transparent peer-focus:to-cyan-600/5 pointer-events-none transition-all duration-500"></div>
              </div>
              <p v-if="errors.username" class="text-red-400 text-sm animate-shake flex items-center bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
                <i class="fas fa-exclamation-circle mr-2"></i> {{ errors.username }}
              </p>
            </div>

            <!-- Password Field -->
            <div class="space-y-3 group">
              <label class="text-slate-200 text-sm font-semibold tracking-wide flex items-center">
                <i class="fas fa-lock mr-2 text-indigo-400"></i>
                Password
              </label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-5 py-4 pr-12 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:bg-slate-800/60 peer"
                  placeholder="Create a secure password"
                  @input="validatePassword"
                />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600/0 via-indigo-600/0 to-indigo-600/0 peer-focus:from-indigo-600/5 peer-focus:via-transparent peer-focus:to-indigo-600/5 pointer-events-none transition-all duration-500"></div>
                <button 
                  type="button" 
                  @click="togglePasswordVisibility"
                  class="absolute right-4 top-4 text-slate-400 hover:text-indigo-400 transition-colors duration-300 z-10 p-1"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              
              <!-- Enhanced Password Strength Indicator -->
              <div class="space-y-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
                <div class="flex justify-between items-center">
                  <span class="text-xs text-slate-400 font-medium">Password Strength</span>
                  <span class="text-xs font-semibold px-2 py-1 rounded-md" :class="{
                    'text-red-400 bg-red-500/10': passwordStrength < 1,
                    'text-amber-400 bg-amber-500/10': passwordStrength === 1,
                    'text-blue-400 bg-blue-500/10': passwordStrength === 2,
                    'text-emerald-400 bg-emerald-500/10': passwordStrength === 3
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
                      'bg-red-500 shadow-lg shadow-red-500/30': passwordStrength >= 0 && n === 1,
                      'bg-amber-500 shadow-lg shadow-amber-500/30': passwordStrength >= 1 && n <= 2,
                      'bg-blue-500 shadow-lg shadow-blue-500/30': passwordStrength >= 2 && n <= 3,
                      'bg-emerald-500 shadow-lg shadow-emerald-500/30': passwordStrength >= 3 && n <= 4,
                      'bg-slate-700/50': n > Math.max(passwordStrength, 0)
                    }"
                  >
                    <div v-if="n <= Math.max(passwordStrength, 0)" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div class="space-y-3 group">
              <label class="text-slate-200 text-sm font-semibold tracking-wide flex items-center">
                <i class="fas fa-shield-alt mr-2 text-violet-400"></i>
                Confirm Password
              </label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-5 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:bg-slate-800/60 peer"
                  placeholder="Confirm your password"
                  @input="validateConfirmPassword"
                />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/0 via-violet-600/0 to-violet-600/0 peer-focus:from-violet-600/5 peer-focus:via-transparent peer-focus:to-violet-600/5 pointer-events-none transition-all duration-500"></div>
              </div>
              <p v-if="errors.confirmPassword" class="text-red-400 text-sm animate-shake flex items-center bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
                <i class="fas fa-exclamation-circle mr-2"></i> {{ errors.confirmPassword }}
              </p>
            </div>

            <!-- Enhanced Submit Button -->
            <button
              type="submit"
              class="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-700 hover:via-cyan-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center mt-8 relative overflow-hidden group shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
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
              class="p-4 bg-red-500/10 backdrop-blur-sm text-red-300 rounded-2xl border border-red-500/30 animate-shake relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-red-500/5 animate-pulse"></div>
              <div class="relative z-10 flex items-center">
                <i class="fas fa-exclamation-triangle mr-3 text-lg"></i>
                {{ errorMessage }}
              </div>
            </div>
          </form>

          <!-- Enhanced Footer Links -->
          <div class="px-8 pb-8 text-center bg-gradient-to-b from-slate-900/80 to-slate-900/90 backdrop-blur-xl">
            <div class="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mb-6"></div>
            <p class="text-slate-300 text-base">Already have an account?</p>
            <a 
              href="/login" 
              class="inline-flex items-center mt-3 text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold text-lg group bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-xl border border-blue-500/20"
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
/* Enhanced Modern Animations */
.animate-slide-up {
  animation: slideUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.animate-shake {
  animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 30s linear infinite;
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(40px) scale(0.95); 
    filter: blur(10px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
    filter: blur(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  50% { transform: translateX(6px); }
  75% { transform: translateX(-6px); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.2;
  }
  50% { 
    transform: translateY(-30px) rotate(180deg); 
    opacity: 0.4;
  }
}

/* Enhanced Glassmorphism */
.backdrop-blur-2xl {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(51, 65, 85, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #06b6d4);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #0891b2);
}

/* Enhanced Focus States */
input:focus {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 25px rgba(59, 130, 246, 0.15),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}

/* Button Enhancements */
button:not(:disabled):hover {
  box-shadow: 
    0 20px 40px rgba(59, 130, 246, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .max-w-lg {
    max-width: calc(100% - 2rem);
    margin: 1rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .w-24.h-24 {
    width: 5rem;
    height: 5rem;
  }
  
  .text-4xl {
    font-size: 1.875rem;
  }
}

@media (max-width: 480px) {
  .rounded-3xl {
    border-radius: 1.5rem;
  }
  
  .rounded-2xl {
    border-radius: 1rem;
  }
  
  .space-y-7 > * + * {
    margin-top: 1.5rem;
  }
}
</style>