<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-2xl animate-spin-slow"></div>
    </div>

    <!-- Floating Particles -->
    <div class="particles absolute inset-0 pointer-events-none">
      <div 
        v-for="n in 15" 
        :key="n"
        class="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (Math.random() * 3 + 4) + 's'
        }"
      ></div>
    </div>

    <div class="w-full max-w-md animate-slide-up relative z-10">
      <!-- Login Card with Glass Effect -->
      <div class="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:shadow-blue-500/20 hover:scale-[1.02] group">
        <!-- Gradient Border Effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative">
          <!-- Header with 3D Effect -->
          <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-8 text-center relative overflow-hidden">
            <!-- Animated Lines -->
            <div class="absolute top-0 left-0 w-full h-full">
              <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
              <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer delay-1000"></div>
            </div>
            
            <div class="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300 shadow-lg relative">
              <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              <i class="fas fa-shield-alt text-white text-3xl relative z-10"></i>
            </div>
            <h2 class="text-3xl font-bold text-white mb-1 tracking-tight">Nairobi Connect</h2>
            <p class="text-blue-100 text-lg font-medium">Welcome back</p>
          </div>

          <!-- Form with Enhanced Styling -->
          <form @submit.prevent="handleLogin" class="p-8 space-y-6">
            <!-- Username Field -->
            <div class="space-y-3 group">
              <label class="text-gray-200 text-sm font-semibold uppercase tracking-wider">Username</label>
              <div class="relative">
                <input
                  v-model="form.username"
                  type="text"
                  required
                  class="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 peer"
                  placeholder="Enter your username"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 peer-focus:from-blue-600/10 peer-focus:via-transparent peer-focus:to-blue-600/10 pointer-events-none transition-all duration-500"></div>
                <i class="fas fa-user absolute right-4 top-4 text-gray-400 peer-focus:text-blue-400 transition-colors duration-300"></i>
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-3 group">
              <div class="flex justify-between items-center">
                <label class="text-gray-200 text-sm font-semibold uppercase tracking-wider">Password</label>
                <button 
                  type="button" 
                  @click="togglePasswordVisibility"
                  class="text-sm text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium flex items-center group-hover:scale-105"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="mr-1"></i>
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 peer"
                  placeholder="Enter your password"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 peer-focus:from-blue-600/10 peer-focus:via-transparent peer-focus:to-blue-600/10 pointer-events-none transition-all duration-500"></div>
                <i class="fas fa-lock absolute right-4 top-4 text-gray-400 peer-focus:text-blue-400 transition-colors duration-300"></i>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center cursor-pointer group">
                <input type="checkbox" v-model="rememberMe" class="sr-only">
                <div class="relative">
                  <div class="w-5 h-5 bg-white/10 border border-white/20 rounded transition-all duration-300 group-hover:border-blue-400/50"></div>
                  <div v-if="rememberMe" class="absolute inset-0 flex items-center justify-center">
                    <i class="fas fa-check text-blue-400 text-xs"></i>
                  </div>
                </div>
                <span class="ml-3 text-gray-300 group-hover:text-white transition-colors duration-300">Remember me</span>
              </label>
              <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium">
                Forgot password?
              </a>
            </div>

            <!-- Enhanced Submit Button -->
            <button
              type="submit"
              class="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center mt-8 relative overflow-hidden group shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              :disabled="isSubmitting"
            >
              <!-- Button shine effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <span v-if="!isSubmitting" class="relative z-10 flex items-center">
                <i class="fas fa-sign-in-alt mr-3"></i>
                Sign In
              </span>
              <span v-else class="flex items-center relative z-10">
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                Signing In...
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

          <!-- Social Login Options -->
          <div class="px-8 pb-4">
            <div class="relative flex items-center justify-center mb-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-white/10"></div>
              </div>
              <div class="relative bg-slate-950/50 px-4">
                <span class="text-gray-400 text-sm">Or continue with</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button class="flex items-center justify-center py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group hover:scale-105">
                <i class="fab fa-google text-white text-xl group-hover:scale-110 transition-transform duration-300"></i>
              </button>
              <button class="flex items-center justify-center py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group hover:scale-105">
                <i class="fab fa-github text-white text-xl group-hover:scale-110 transition-transform duration-300"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Footer Links -->
      <div class="mt-8 text-center">
        <div class="inline-flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
          <p class="text-gray-300 text-base mr-2">Don't have an account?</p>
          <a 
            href="/register" 
            class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold group"
          >
            Create one
            <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
data() {
  return {
    form: {
      username: '',
      password: ''
    },
    showPassword: false,
    isSubmitting: false,
    errorMessage: '',
    rememberMe: false
  }
},
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
async handleLogin() {
  // Validate inputs
  if (!this.form.username || !this.form.password) {
    this.errorMessage = 'Please enter both username and password';
    return;
  }

  this.isSubmitting = true;
  this.errorMessage = '';

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/login/', 
      {
        username: this.form.username,
        password: this.form.password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          
        },
        withCredentials: true
      }
    );

    // Handle successful login
    if (response.data && (response.data.access || response.data.token)) {
      // Store tokens
      const token = response.data.access || response.data.token;
      localStorage.setItem('accessToken', token);
      
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }

      // Store COMPLETE user data
      const userData = {
        username: this.form.username,
        first_name: response.data.user?.first_name || this.form.username,
        email: response.data.user?.email || `${this.form.username}@example.com`
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Force reload of user data in main app
      window.dispatchEvent(new CustomEvent('user-login'));

      // Redirect to dashboard
      this.$router.push('/');
    } else {
      throw new Error('Authentication failed - no token received');
    }
  } catch (error) {
    console.error('Login error:', error.response || error);
    
    if (error.response) {
      this.errorMessage = error.response.data.detail || 
                         error.response.data.non_field_errors?.join(', ') || 
                         'Invalid credentials';
    } else {
      this.errorMessage = 'Network error. Please try again later.';
    }
    
    this.form.password = '';
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
  background: linear-gradient(to bottom, #3b82f6, #6366f1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #4f46e5);
}

/* Enhanced focus states */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
}

/* Button enhancements */
button:not(:disabled):hover {
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}

/* Custom checkbox styling */
input[type="checkbox"] + div {
  position: relative;
  overflow: hidden;
}

input[type="checkbox"]:checked + div {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border-color: #3b82f6;
}

input[type="checkbox"]:checked + div::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
  animation: checkboxShine 0.5s ease-out;
}

@keyframes checkboxShine {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
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
  
  .grid-cols-2 {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
}

/* Social button hover effects */
.group:hover .fab {
  color: #3b82f6;
}

/* Enhanced button press effect */
button:active {
  transform: scale(0.98);
}

/* Floating animation variations */
.particles .absolute:nth-child(odd) {
  animation-direction: reverse;
}

.particles .absolute:nth-child(3n) {
  background: rgba(6, 182, 212, 0.2);
}
</style>