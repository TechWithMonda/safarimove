<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-900 px-4">
    <div class="w-full max-w-md relative z-10">
      <!-- Simplified Login Card -->
      <div class="bg-slate-800/90 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
        <!-- Header -->
        <div class="bg-slate-800 p-6 text-center border-b border-slate-700/50">
          <div class="w-20 h-20 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-sign-in-alt text-blue-400 text-3xl"></i>
          </div>
          <h2 class="text-3xl font-bold text-blue-400 mb-1">Welcome Back</h2>
          <p class="text-slate-300">Sign in to your account</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="p-6 space-y-5">
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
              placeholder="Enter your username"
            />
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="text-slate-200 text-sm font-medium flex items-center">
                <i class="fas fa-lock mr-2 text-indigo-400"></i>
                Password
              </label>
              <button 
                type="button" 
                @click="togglePasswordVisibility"
                class="text-sm text-blue-400 hover:text-blue-300 transition font-medium flex items-center"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="mr-1"></i>
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your password"
            />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" v-model="rememberMe" class="sr-only">
              <div class="relative w-5 h-5 bg-slate-700/50 border border-slate-500/50 rounded-md transition mr-3">
                <div v-if="rememberMe" class="absolute inset-0 bg-blue-500 rounded-md flex items-center justify-center">
                  <i class="fas fa-check text-white text-xs"></i>
                </div>
              </div>
              <span class="text-slate-300 text-sm">Remember me</span>
            </label>
            <a href="#" class="text-blue-400 hover:text-blue-300 transition text-sm">
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center justify-center mt-4 relative overflow-hidden"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting" class="flex items-center">
              <i class="fas fa-sign-in-alt mr-2"></i>
              Sign In
            </span>
            <span v-else class="flex items-center">
              <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Signing In...
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

          <!-- Social Login Section -->
          <div class="pt-4">
            <div class="relative flex items-center justify-center my-4">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-slate-600/50"></div>
              </div>
              <div class="relative bg-slate-800 px-4 py-1 rounded-full">
                <span class="text-slate-400 text-sm">Or continue with</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <button type="button" class="flex items-center justify-center py-2 px-3 bg-slate-700 hover:bg-slate-700/70 border border-slate-600/50 rounded-lg transition">
                <i class="fab fa-google text-blue-400 mr-2"></i>
                <span class="text-slate-300 text-sm">Google</span>
              </button>
              <button type="button" class="flex items-center justify-center py-2 px-3 bg-slate-700 hover:bg-slate-700/70 border border-slate-600/50 rounded-lg transition">
                <i class="fab fa-github text-blue-400 mr-2"></i>
                <span class="text-slate-300 text-sm">GitHub</span>
              </button>
            </div>
          </div>
        </form>

        <!-- Footer Links -->
        <div class="px-6 pb-6 text-center border-t border-slate-700/50 pt-4">
          <p class="text-slate-300 text-sm">Don't have an account?</p>
          <a 
            href="/register" 
            class="inline-flex items-center mt-2 text-blue-400 hover:text-blue-300 transition font-medium text-sm"
          >
            <i class="fas fa-user-plus mr-1"></i>
            Register now
          </a>
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
          'safarimovebackend-production.up.railway.app/api/login/', 
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

          // Store user data
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