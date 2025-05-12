<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {useApi} from '@/composables/useApi'
import { useTheme } from '@/composables/useTheme'


const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// Use theme composable
const { isDark, toggleTheme } = useTheme()

// Google Sign In
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const googleLoading = ref(false)

// Helper function to get OS
const getOS = (): string => {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']

  if (macosPlatforms.indexOf(platform) !== -1) {
    return 'macOS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    return 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    return 'Windows'
  } else if (/Android/.test(userAgent)) {
    return 'Android'
  } else if (/Linux/.test(platform)) {
    return 'Linux'
  }

  return 'unknown'
}

// Helper function to get OS version
const getOSVersion = (): string => {
  const userAgent = window.navigator.userAgent
  const matches = userAgent.match(/(Windows NT|Mac OS X|Android|iOS) ([0-9._]+)/)
  return matches ? matches[2] : 'unknown'
}

const handleLogin = async () => {
  try {
     error.value = ''
    loading.value = true
    
    const loginData = {
      email: email.value,
      password: password.value,
      deviceName: 'Web Browser',
      userAgent: navigator.userAgent,
      deviceOs: getOS(),
      osVersion: getOSVersion(),
      deviceResolution: `${window.screen.width}x${window.screen.height}`,
      appVersionName: '1.0.0',
      appVersionCode: '1'
    }
    
    error.value = await useApi().login(loginData)
    loading.value = false
    

    // Redirect to admin dashboard
    await router.replace('/')
    
  } catch (err: any) {
    console.error('Login failed:', err)
    if (err.response?.status === 403) {
      error.value = 'Access denied. Admin privileges required.'
    } else {
      error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
    }
  } finally {
    loading.value = false
  }
}

// Google Sign In
const initializeGoogleSignIn = () => {
  // @ts-ignore - Google type definitions
  google.accounts.id.initialize({
    client_id: googleClientId,
    callback: handleGoogleSignIn,
  });

  // @ts-ignore - Google type definitions
  google.accounts.id.renderButton(
    document.getElementById("googleSignInButton"),
    { theme: isDark.value ? "filled_black" : "filled_blue", size: "large", width: '100%' }
  );
}

const handleGoogleSignIn = async (response: any) => {
  try {
    googleLoading.value = true
    error.value = ''

    const loginData = {
      token: response.credential,
      isAdminLogin: true,
      deviceName: 'Web Browser',
      userAgent: navigator.userAgent,
      deviceOs: getOS(),
      osVersion: getOSVersion(),
      deviceResolution: `${window.screen.width}x${window.screen.height}`,
      appVersionName: '1.0.0',
      appVersionCode: '1'
    }

    const apiResponse = await useApi().post<LoginResponse>('/auth/google', loginData)
    const { token, user } = apiResponse.data

    if (!user.isAdmin) {
      error.value = 'Access denied. Admin privileges required.'
      return
    }

    // Store token and user info
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_user', JSON.stringify(user))
    
    // Set up axios defaults for future requests
   useApi().defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    // Redirect to admin dashboard
    await router.replace('/')

  } catch (err: any) {
    console.error('Google login failed:', err)
    if (err.response?.status === 403) {
      error.value = 'Access denied. Admin privileges required.'
    } else {
      error.value = err.response?.data?.message || 'Google login failed. Please try again.'
    }
  } finally {
    googleLoading.value = false
  }
}

// Update onMounted to include theme check and Google Sign In initialization
onMounted(() => {
  const adminToken = localStorage.getItem('admin_token')
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}')
  const savedTheme = localStorage.getItem('theme')
  
  if (adminToken && adminUser.isAdmin) {
    router.replace('/')
  }
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  // Initialize Google Sign In
  initializeGoogleSignIn()
})
</script>

<template>
  <div :class="['min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8', 
       isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500']">
    <div :class="['max-w-md w-full space-y-8 rounded-2xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-[1.02]',
         isDark ? 'bg-gray-800/95' : 'bg-white/95']">
      <div>
        <!-- Theme toggle button -->
        <button 
          @click="toggleTheme"
          class="absolute top-4 right-4 p-2 rounded-lg transition-colors duration-200"
          :class="isDark ? 'text-yellow-500 hover:text-yellow-400' : 'text-gray-600 hover:text-gray-800'"
        >
          <svg v-if="isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Logo -->
        <div class="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transform rotate-45 hover:rotate-0 transition-transform duration-500">
          <span class="text-2xl font-bold text-white -rotate-45 hover:rotate-0 transition-transform duration-500">A</span>
        </div>
        <h2 :class="['mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent',
             isDark ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600']">
          Admin Portal
        </h2>
        <p :class="['mt-2 text-center text-sm', isDark ? 'text-gray-400' : 'text-gray-600']">
          Please sign in with your admin credentials
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div class="relative group">
            <label :class="['block text-sm font-medium mb-1', isDark ? 'text-gray-300' : 'text-gray-700']">
              Email address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg :class="['h-5 w-5 transition-colors duration-200', isDark ? 'text-gray-500' : 'text-gray-400']" 
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                required
                :class="['appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 sm:text-sm',
                 isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900']"
                placeholder="admin@example.com"
              />
            </div>
          </div>
          
          <div class="relative group">
            <label :class="['block text-sm font-medium mb-1', isDark ? 'text-gray-300' : 'text-gray-700']">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg :class="['h-5 w-5 transition-colors duration-200', isDark ? 'text-gray-500' : 'text-gray-400']" 
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                :class="['appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 sm:text-sm',
                 isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900']"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div :class="['w-full border-t', isDark ? 'border-gray-600' : 'border-gray-300']"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span :class="['px-2', isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500']">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          <!-- Google Sign In Button -->
          <div 
            id="googleSignInButton"
            class="w-full"
            :class="{ 'opacity-50 pointer-events-none': googleLoading }"
          ></div>
        </div>

        <div v-if="error" :class="['rounded-lg p-4 mb-4 animate-shake', isDark ? 'bg-red-900/50' : 'bg-red-50']">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg :class="['h-5 w-5', isDark ? 'text-red-400' : 'text-red-400']" 
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p :class="['text-sm font-medium', isDark ? 'text-red-400' : 'text-red-800']">{{ error }}</p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :class="['group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed',
             isDark ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500']"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center space-x-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Signing in...</span>
            </span>
            <span v-else class="flex items-center justify-center space-x-2">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clip-rule="evenodd" />
              </svg>
              <span>Sign in to Admin Panel</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
</style> 