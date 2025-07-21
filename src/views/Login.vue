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
      <!-- Login Card with Modern Glass Effect -->
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
              <i class="fas fa-sign-in-alt text-blue-400 text-4xl relative z-10"></i>
            </div>
            <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2 tracking-tight">Welcome Back</h2>
            <p class="text-slate-300 text-lg font-medium">Sign in to your account</p>
          </div>

          <!-- Form with Enhanced Modern Styling -->
          <form @submit.prevent="handleLogin" class="p-8 space-y-7 bg-gradient-to-b from-slate-900/50 to-slate-900/80 backdrop-blur-xl">
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
                  placeholder="Enter your username"
                />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-600/0 via-cyan-600/0 to-cyan-600/0 peer-focus:from-cyan-600/5 peer-focus:via-transparent peer-focus:to-cyan-600/5 pointer-events-none transition-all duration-500"></div>
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-3 group">
              <div class="flex justify-between items-center">
                <label class="text-slate-200 text-sm font-semibold tracking-wide flex items-center">
                  <i class="fas fa-lock mr-2 text-indigo-400"></i>
                  Password
                </label>
                <button 
                  type="button" 
                  @click="togglePasswordVisibility"
                  class="text-sm text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold flex items-center"
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
                  class="w-full px-5 py-4 pr-12 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:bg-slate-800/60 peer"
                  placeholder="Enter your password"
                />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600/0 via-indigo-600/0 to-indigo-600/0 peer-focus:from-indigo-600/5 peer-focus:via-transparent peer-focus:to-indigo-600/5 pointer-events-none transition-all duration-500"></div>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="rememberMe" class="sr-only">
                <div class="relative w-5 h-5 bg-slate-700/50 border border-slate-500/50 rounded-md transition-all duration-300 mr-3">
                  <div v-if="rememberMe" class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                    <i class="fas fa-check text-white text-xs"></i>
                  </div>
                </div>
                <span class="text-slate-300 text-sm">Remember me</span>
              </label>
              <a href="#" class="text-blue-400 hover:text-blue-300 transition-all duration-300 text-sm font-medium">
                Forgot password?
              </a>
            </div>

            <!-- Enhanced Submit Button -->
            <button
              type="submit"
              class="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-700 hover:via-cyan-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center mt-8 relative overflow-hidden group shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
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
              class="p-4 bg-red-500/10 backdrop-blur-sm text-red-300 rounded-2xl border border-red-500/30 animate-shake relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-red-500/5 animate-pulse"></div>
              <div class="relative z-10 flex items-center">
                <i class="fas fa-exclamation-triangle mr-2 text-lg"></i>
                {{ errorMessage }}
              </div>
            </div>

            <!-- Social Login Section -->
            <div class="pt-6">
              <div class="relative flex items-center justify-center mb-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-slate-600/50"></div>
                </div>
                <div class="relative bg-slate-900/80 px-4 py-1 rounded-full">
                  <span class="text-slate-400 text-sm">Or continue with</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <button type="button" class="flex items-center justify-center py-3 px-4 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-600/50 hover:border-slate-500/70 rounded-xl transition-all duration-300">
                  <i class="fab fa-google text-blue-400 mr-2"></i>
                  <span class="text-slate-300 text-sm">Google</span>
                </button>
                <button type="button" class="flex items-center justify-center py-3 px-4 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-600/50 hover:border-slate-500/70 rounded-xl transition-all duration-300">
                  <i class="fab fa-github text-blue-400 mr-2"></i>
                  <span class="text-slate-300 text-sm">GitHub</span>
                </button>
              </div>
            </div>
          </form>

          <!-- Enhanced Footer Links -->
          <div class="px-8 pb-8 text-center bg-gradient-to-b from-slate-900/80 to-slate-900/90 backdrop-blur-xl">
            <div class="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mb-6"></div>
            <p class="text-slate-300 text-base">Don't have an account?</p>
            <a 
              href="/register" 
              class="inline-flex items-center mt-3 text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold text-lg group bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-xl border border-blue-500/20"
            >
              <i class="fas fa-user-plus mr-2 group-hover:transform group-hover:scale-110 transition-transform duration-300"></i>
              Register now
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
  name: 'LoginForm',
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
/* Keep all the same animations and styles from your register form */
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
</style>