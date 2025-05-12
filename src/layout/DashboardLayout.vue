<template>
  <div :class="['min-h-screen flex', isDark ? 'bg-gray-900' : 'bg-gray-50']">
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-4 left-4 z-20">
      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="isSidebarOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Sidebar backdrop -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-10 bg-gray-900/50 lg:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <div :class="[
      'w-64 shadow-xl flex flex-col transition-all duration-300 border-r fixed lg:static inset-y-0 z-20',
      isDark ? 'bg-gray-800/95 backdrop-blur-sm border-gray-700' : 'bg-white/95 backdrop-blur-sm border-gray-200',
      isSidebarOpen ? 'left-0' : '-left-64 lg:left-0'
    ]">
      <!-- Logo Section -->
      <div class="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div class="flex items-center space-x-3">
          <div class="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <span class="text-xl font-bold text-white">A</span>
          </div>
          <h1 class="text-white font-bold text-xl">Admin Panel</h1>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div v-for="(section, index) in menuSections" :key="index" class="mb-6">
          <h3 :class="['px-3 mb-2 text-xs font-semibold uppercase tracking-wider',
            isDark ? 'text-gray-400' : 'text-gray-500']">
            {{ section.name }}
          </h3>
          <div class="space-y-1">
            <router-link
              v-for="item in section.items"
              :key="item.path"
              :to="item.path"
              class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden"
              :class="[
                isCurrentRoute(item.path)
                  ? isDark 
                    ? 'text-indigo-400 bg-indigo-900/50'
                    : 'text-indigo-600 bg-indigo-50'
                  : isDark
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              ]"
            >
              <component
                :is="getIcon(item.name)"
                class="mr-3 h-5 w-5 transition-colors duration-200"
                :class="[
                  isCurrentRoute(item.path)
                    ? isDark ? 'text-indigo-400' : 'text-indigo-600'
                    : isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-500'
                ]"
              />
              <span class="truncate">{{ item.name }}</span>
              <span
                v-if="item.badge && item.badge > 0"
                class="ml-2 px-2 py-0.5 text-xs font-medium rounded-full"
                :class="[
                  isDark 
                    ? 'bg-red-900/50 text-red-300' 
                    : 'bg-red-100 text-red-600'
                ]"
              >
                {{ item.badge }}
              </span>
              <span
                v-if="isCurrentRoute(item.path)"
                :class="['absolute inset-y-0 left-0 w-1 rounded-r-full',
                  isDark ? 'bg-indigo-400' : 'bg-indigo-600']"
                aria-hidden="true"
              ></span>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- User Section -->
      <div :class="['p-4 border-t', 
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50']">
        <div class="flex items-center space-x-3 mb-3">
          <div v-if="currentUser?.avatar?.url" class="h-10 w-10 flex-shrink-0">
            <img :src="currentUser.avatar.url" class="h-10 w-10 rounded-full object-cover" :alt="`${currentUser.name}'s avatar`" @error="handleAvatarError" />
          </div>
          <div v-else class="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <span class="text-white font-semibold text-sm">{{ getUserInitials() }}</span>
          </div>
          <div class="flex-1">
            <p :class="['text-sm font-medium', isDark ? 'text-gray-100' : 'text-gray-900']">
              {{ currentUser?.name || 'Admin User' }}
            </p>
            <p :class="['text-xs', isDark ? 'text-gray-400' : 'text-gray-500']">
              {{ currentUser?.email || 'admin@example.com' }}
            </p>
          </div>
        </div>
        <button
          @click="logout"
          class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:shadow-lg group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 transform group-hover:-rotate-12 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Logout
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden lg:pl-0">
      <!-- Top Bar -->
      <div :class="[
        'h-16 flex items-center justify-between px-6 border-b fixed top-0 right-0 left-0 z-10 lg:left-64',
        isDark ? 'bg-gray-800/95 backdrop-blur-sm border-gray-700' : 'bg-white/95 backdrop-blur-sm border-gray-200'
      ]">
        <h2 :class="['text-xl font-semibold hidden sm:block', isDark ? 'text-gray-100' : 'text-gray-800']">
          {{ getCurrentPageTitle() }}
        </h2>
        <div class="flex items-center space-x-4 ml-auto">
          <!-- Theme Toggle Button -->
          <button 
            @click="toggleTheme"
            class="p-2 rounded-lg transition-colors duration-200"
            :class="isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-gray-800'"
          >
            <svg v-if="isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div :class="[
        'flex-1 overflow-auto p-6 custom-scrollbar mt-16',
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      ]">
        <div class="mx-auto">
          <router-view v-slot="{ Component }">
            <transition
              name="fade"
              mode="out-in"
              appear
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useApi} from '@/composables/useApi'
import { useTheme } from '@/composables/useTheme'

// Add debounce utility


const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(false)

// Use theme composable
const { isDark, toggleTheme } = useTheme()

// Provide theme state to child components
provide('isDark', isDark)

// Close sidebar when route changes on mobile
router.afterEach(() => {
  isSidebarOpen.value = false
})

// Types for menu items
interface MenuItem {
  name: string;
  path: string;
  badgeType?: keyof UnreadCounts;
}

interface MenuSection {
  name: string;
  items: MenuItem[];
}

// Static menu structure - moved outside of setup
const BASE_MENU_SECTIONS: MenuSection[] = [
  {
    name: 'Overview',
    items: [
      { name: 'Overview', path: '/' },
      { name: 'Analytics', path: '/analytics' },
    ]
  },
  {
    name: 'Clients',
    items: [
      { name: 'Users', path: '/users' },
      { name: 'Plans', path: '/plans' },
      { name: 'Support', path: '/support', badgeType: 'unreadSupport' },
    ]
  },
  {
    name: 'Payments',
    items: [
      { name: 'Payments', path: '/payments' },
      { name: 'Vouchers', path: '/vouchers' },
    ]
  },
  {
    name: 'Diagnostics',
    items: [
      { name: 'Logs', path: '/logs' },
      { name: 'Request Logs', path: '/request-logs' },
      { name: 'Crash Reports', path: '/crash-reports' },
      { name: 'Crash Bugs', path: '/crash-bugs', badgeType: 'unreadBugs' },
    ]
  },
  {
    name: 'Security',
    items: [
      { name: 'Block List', path: '/block-list' },
    ]
  },
  {
    name: 'System',
    items: [
      { name: 'App Updates', path: '/update-manager' },
      { name: 'File Manager', path: '/upload-manager' },
      { name: 'File Ledger', path: '/file-ledger' },
      { name: 'Maintenance', path: '/maintenance' },
      { name: 'Text Manager', path: '/texts' },
      { name: 'Settings', path: '/settings' },
    ]
  }
] as const;

// Types for badge counts
interface UnreadCounts {
  unreadBugs: number;
  unreadSupport: number;
}

// In setup function
const badges = ref<UnreadCounts>({
  unreadBugs: 0,
  unreadSupport: 0
});

// Computed property for menu items with badges
const menuSections = computed(() => {
  return BASE_MENU_SECTIONS.map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      badge: item.badgeType ? badges.value[item.badgeType as keyof UnreadCounts] : undefined
    }))
  }));
});

// Improved debounce utility


// Fetch unread counts with improved error handling
// const { debounced: debouncedFetch, cancel: cancelFetch } = createDebounced(async () => {
//   try {
//     const [crashResponse, supportResponse] = await Promise.all([
//      useApi().get('/admin/crash-bugs/unread-count'),
//      useApi().get('/admin/support/unread-count')
//     ]);

//     const newCounts = {
//       unreadBugs: crashResponse.data.count,
//       unreadSupport: supportResponse.data.count
//     };

//     // Only update if values have changed
//     if (newCounts.unreadBugs !== badges.value.unreadBugs || 
//         newCounts.unreadSupport !== badges.value.unreadSupport) {
//       badges.value = newCounts;
//     }
//   } catch (error) {
//     console.error('Failed to fetch unread counts:', error);
//   }
// }, 1000);


// const startPolling = () => {
//   stopPolling();
//   // debouncedFetch();
//   pollInterval = window.setInterval(debouncedFetch, 30000);
// };

// const stopPolling = () => {
//   if (pollInterval) {
//     clearInterval(pollInterval);
//     pollInterval = undefined;
//   }
//   cancelFetch();
// };

const isCurrentRoute = (path: string) => {
  return route.path === path
}

const getCurrentPageTitle = () => {
  const currentRoute = route.matched[route.matched.length - 1]
  return currentRoute?.name || 'Dashboard'
}

interface User {
  name: string;
  email: string;
  avatar?: {
    url: string;
    path: string;
    filename: string;
  };
}

const currentUser = ref<User | null>(null)

const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  const parent = img.parentElement;
  if (parent) {
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center';
    const span = document.createElement('span');
    span.className = 'text-white font-semibold text-sm';
    span.textContent = getUserInitials();
    fallbackDiv.appendChild(span);
    parent.replaceChild(fallbackDiv, img);
  }
}

const getUser = () => {
  const userStr = localStorage.getItem('admin_user')
  if (!userStr) return null;
  const user = JSON.parse(userStr);
  currentUser.value = user;
  return user;
}

const getUserInitials = () => {
  const user = getUser()
  if (!user?.name) return 'A'
  return user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Icon components
const getIcon = (name: string) => {
  return {
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        ${getIconPath(name)}
      </svg>
    `
  }
}

const getIconPath = (name: string) => {
  const icons: Record<string, string> = {
    'Overview': '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />',
    'Users': '<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />',
    'Analytics': '<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
    'Settings': '<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />',
    'Maintenance': '<path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />'
  }
  return icons[name] || '<path d="M4 6h16M4 10h16M4 14h16M4 18h16" />'
}

const logout = async () => {
  try {
    useApi().setAuthorization(null,null);
    await router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Add lifecycle hooks
onMounted(() => {
  // startPolling()
})

onBeforeUnmount(() => {
  // stopPolling()
})
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
  height: 100vh;
}

/* Add smooth transition for sidebar */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease-in-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 1024px) {
  .custom-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: v-bind('isDark ? "rgba(75, 85, 99, 0.5)" : "rgba(156, 163, 175, 0.5)"') transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: v-bind('isDark ? "rgba(75, 85, 99, 0.5)" : "rgba(156, 163, 175, 0.5)"');
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: v-bind('isDark ? "rgba(75, 85, 99, 0.7)" : "rgba(156, 163, 175, 0.7)"');
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 