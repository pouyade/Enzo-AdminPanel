<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div :class="['rounded-2xl p-6 shadow-sm border transition-colors duration-200',
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="space-y-1">
          <h1 :class="['text-2xl font-bold tracking-tight', isDark ? 'text-gray-100' : 'text-gray-900']">
            Dashboard Overview
          </h1>
          <p :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">
            A comprehensive view of your system's performance and activity.
          </p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            @click="toggleAutoRefresh"
            :class="[
              'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm',
              autoRefresh
                ? isDark ? 'bg-red-900/50 text-red-400 hover:bg-red-900/70 border-red-800' : 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200'
                : isDark ? 'bg-green-900/50 text-green-400 hover:bg-green-900/70 border-green-800' : 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
              'border'
            ]"
          >
            <span v-if="autoRefresh" class="mr-2 animate-pulse text-red-500">●</span>
            {{ autoRefresh ? 'Stop Live Updates' : 'Start Live Updates' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Users Card -->
      <div :class="['rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt :class="['text-sm font-medium truncate', isDark ? 'text-gray-400' : 'text-gray-500']">
                  Total Users
                </dt>
                <dd :class="['text-2xl font-bold tracking-tight', isDark ? 'text-gray-100' : 'text-gray-900']">
                  {{ stats.totalUsers }}
                </dd>
                <dd class="mt-1 flex items-baseline text-sm">
                  <span :class="stats.userTrend > 0 ? 'text-green-500' : 'text-red-500'" class="font-semibold">
                    {{ stats.userTrend > 0 ? '↑' : '↓' }} {{ Math.abs(stats.userTrend) }}%
                  </span>
                  <span :class="['ml-2', isDark ? 'text-gray-400' : 'text-gray-500']">vs last week</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Jobs Card -->
      <div :class="['rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-3 shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt :class="['text-sm font-medium truncate', isDark ? 'text-gray-400' : 'text-gray-500']">
                  Active Jobs
                </dt>
                <dd :class="['text-2xl font-bold tracking-tight', isDark ? 'text-gray-100' : 'text-gray-900']">
                  {{ stats.activeJobs }}
                </dd>
                <dd :class="['mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">
                  {{ stats.completedJobs }} completed today
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div :class="['px-6 py-3', isDark ? 'bg-gray-900/50' : 'bg-gray-50']">
          <div class="text-sm space-y-2">
            <div class="flex justify-between items-center">
              <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="font-medium">Success Rate</span>
              <span class="font-semibold text-green-500">{{ stats.jobSuccessRate }}%</span>
            </div>
            <div :class="['w-full rounded-full h-2 overflow-hidden', isDark ? 'bg-gray-700' : 'bg-gray-200']">
              <div 
                class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                :style="{ width: `${stats.jobSuccessRate}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Status Card -->
      <div :class="['rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt :class="['text-sm font-medium truncate', isDark ? 'text-gray-400' : 'text-gray-500']">
                  System Status
                </dt>
                <dd class="text-2xl font-bold tracking-tight" :class="{
                  'text-green-500': stats.systemStatus === 'Healthy',
                  'text-yellow-500': stats.systemStatus === 'Warning',
                  'text-red-500': stats.systemStatus === 'Critical'
                }">
                  {{ stats.systemStatus }}
                </dd>
                <dd :class="['mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">
                  {{ stats.uptime }} uptime
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div :class="['px-6 py-4', isDark ? 'bg-gray-900/50' : 'bg-gray-50']">
          <div class="text-sm space-y-4">
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="font-medium">CPU Usage</span>
                <span :class="[stats.cpuUsage > 80 ? 'text-red-500' : 'text-blue-500', 'font-semibold']">
                  {{ stats.cpuUsage }}%
                </span>
              </div>
              <div :class="['w-full rounded-full h-2 overflow-hidden', isDark ? 'bg-gray-700' : 'bg-gray-200']">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" 
                  :style="{ width: `${stats.cpuUsage}%` }"
                ></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="font-medium">Memory</span>
                <span :class="[stats.memoryUsage > 80 ? 'text-red-500' : 'text-blue-500', 'font-semibold']">
                  {{ stats.memoryUsage }}%
                </span>
              </div>
              <div :class="['w-full rounded-full h-2 overflow-hidden', isDark ? 'bg-gray-700' : 'bg-gray-200']">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" 
                  :style="{ width: `${stats.memoryUsage}%` }"
                ></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="font-medium">Disk</span>
                <span :class="[stats.diskUsage > 80 ? 'text-red-500' : 'text-blue-500', 'font-semibold']">
                  {{ stats.diskUsage }}%
                </span>
              </div>
              <div :class="['w-full rounded-full h-2 overflow-hidden', isDark ? 'bg-gray-700' : 'bg-gray-200']">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" 
                  :style="{ width: `${stats.diskUsage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Card -->
      <div :class="['rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-3 shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt :class="['text-sm font-medium truncate', isDark ? 'text-gray-400' : 'text-gray-500']">
                  Revenue (This Month)
                </dt>
                <dd :class="['text-2xl font-bold tracking-tight', isDark ? 'text-gray-100' : 'text-gray-900']">
                  ${{ stats.monthlyRevenue }}
                </dd>
                <dd class="mt-1 flex items-baseline text-sm">
                  <span :class="stats.revenueTrend > 0 ? 'text-green-500' : 'text-red-500'" class="font-semibold">
                    {{ stats.revenueTrend > 0 ? '↑' : '↓' }} {{ Math.abs(stats.revenueTrend) }}%
                  </span>
                  <span :class="['ml-2', isDark ? 'text-gray-400' : 'text-gray-500']">vs last month</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div :class="['px-6 py-3', isDark ? 'bg-gray-900/50' : 'bg-gray-50']">
          <div class="flex justify-between items-center text-sm">
            <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="font-medium">Active Subscriptions</span>
            <span class="font-semibold text-amber-500">{{ stats.activeSubscriptions }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Users Chart -->
    <div class="mt-6">
      <DailyUsersChart />
    </div>

    <!-- Recent Activity -->
    <div :class="['rounded-2xl shadow-sm overflow-hidden border',
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
      <div :class="['p-6 border-b', isDark ? 'border-gray-700' : 'border-gray-100']">
        <div class="sm:flex sm:items-center sm:justify-between">
          <h2 :class="['text-lg font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">Recent Activity</h2>
          <div class="mt-3 sm:mt-0 sm:ml-4">
            <select
              v-model="activityFilter"
              :class="['block w-full pl-3 pr-10 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200',
                isDark ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200 text-gray-700']"
            >
              <option value="all">All Activities</option>
              <option value="user">User Activities</option>
              <option value="system">System Activities</option>
              <option value="job">Job Activities</option>
            </select>
          </div>
        </div>
      </div>
      
      <div :class="['divide-y', isDark ? 'divide-gray-700' : 'divide-gray-100']">
        <div v-if="loading" class="p-6 animate-pulse space-y-6">
          <div v-for="i in 3" :key="i" class="flex items-center justify-between">
            <div class="space-y-2 flex-1">
              <div :class="['h-4 rounded w-1/4', isDark ? 'bg-gray-700' : 'bg-gray-200']"></div>
              <div :class="['h-4 rounded w-1/3', isDark ? 'bg-gray-700' : 'bg-gray-200']"></div>
            </div>
            <div :class="['h-4 rounded w-20', isDark ? 'bg-gray-700' : 'bg-gray-200']"></div>
          </div>
        </div>
        <div v-else-if="filteredActivity.length === 0" :class="['p-6 text-center', isDark ? 'text-gray-400' : 'text-gray-500']">
          No activities found
        </div>
        <div v-else>
          <div v-for="activity in filteredActivity" :key="activity.id" 
            :class="['p-6 transition-colors duration-200 flex items-start space-x-4',
              isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50']">
            <div :class="[getActivityIconClass(activity.type), 'rounded-xl p-2 shadow-sm flex-shrink-0']">
              <component :is="getActivityIcon(activity.type)" class="h-5 w-5"/>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-indigo-500 truncate">
                  {{ activity.action }}
                </p>
                <span class="px-2.5 py-0.5 text-xs font-medium rounded-full inline-flex items-center"
                  :class="activity.status === 'success' 
                    ? isDark ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800'
                    : isDark ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800'"
                >
                  {{ activity.status }}
                </span>
              </div>
              <div class="mt-1 flex items-center text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                <span class="truncate">{{ activity.user }}</span>
                <span :class="['mx-1.5 h-1 w-1 rounded-full', isDark ? 'bg-gray-600' : 'bg-gray-300']"></span>
                <span>{{ activity.details }}</span>
              </div>
              <time :datetime="activity.timestamp" :class="['mt-1 text-xs', isDark ? 'text-gray-500' : 'text-gray-400']">
                {{ formatDate(activity.timestamp) }}
              </time>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" :class="['border-t', isDark ? 'border-gray-700' : 'border-gray-100']">
        <div class="px-6 py-4 sm:px-6 flex items-center justify-between">
          <div class="hidden sm:block">
            <p :class="isDark ? 'text-gray-400' : 'text-gray-700'" class="text-sm">
              Showing
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
              of
              <span class="font-medium">{{ totalItems }}</span>
              results
            </p>
          </div>
          <div class="flex-1 flex justify-between sm:justify-end space-x-3">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              :class="[
                currentPage === 1 
                  ? isDark ? 'text-gray-500 bg-gray-800 cursor-not-allowed' : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : isDark 
                    ? 'text-gray-200 bg-gray-700 hover:bg-gray-600 border-gray-600' 
                    : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-200',
                'border'
              ]"
            >
              Previous
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              :class="[
                currentPage === totalPages
                  ? isDark ? 'text-gray-500 bg-gray-800 cursor-not-allowed' : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : isDark 
                    ? 'text-gray-200 bg-gray-700 hover:bg-gray-600 border-gray-600' 
                    : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-200',
                'border'
              ]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Chart -->
    <div :class="['rounded-2xl shadow-sm p-6 border',
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
      <QueryPerformanceChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import {useApi} from '@/composables/useApi'
import { format, parseISO } from 'date-fns'
import QueryPerformanceChart from '@/components/QueryPerformanceChart.vue'
import DailyUsersChart from '@/components/DailyUsersChart.vue'

interface Stats {
  totalUsers: number
  userTrend: number
  activeJobs: number
  completedJobs: number
  jobSuccessRate: number
  systemStatus: 'Healthy' | 'Warning' | 'Critical'
  uptime: string
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  monthlyRevenue: number
  revenueTrend: number
  activeSubscriptions: number
}

interface Activity {
  id: string
  type: 'user' | 'system' | 'job'
  action: string
  status: 'success' | 'error'
  user: string
  details: string
  timestamp: string
}

const stats = ref<Stats>({
  totalUsers: 0,
  userTrend: 0,
  activeJobs: 0,
  completedJobs: 0,
  jobSuccessRate: 0,
  systemStatus: 'Healthy',
  uptime: '',
  cpuUsage: 0,
  memoryUsage: 0,
  diskUsage: 0,
  monthlyRevenue: 0,
  revenueTrend: 0,
  activeSubscriptions: 0
})

const loading = ref(false)
const autoRefresh = ref(false)
let refreshInterval: number | null = null

const recentActivity = ref<Activity[]>([])
const activityFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const totalItems = ref(0)

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

// const displayedPages = computed(() => {
//   const pages = []
//   const maxPages = 5
//   let start = Math.max(1, currentPage.value - Math.floor(maxPages / 2))
//   let end = Math.min(totalPages.value, start + maxPages - 1)
  
//   if (end - start + 1 < maxPages) {
//     start = Math.max(1, end - maxPages + 1)
//   }
  
//   for (let i = start; i <= end; i++) {
//     pages.push(i)
//   }
  
//   return pages
// })

const filteredActivity = computed(() => {
  if (activityFilter.value === 'all') {
    return recentActivity.value
  }
  return recentActivity.value.filter(activity => activity.type === activityFilter.value)
})

const fetchDashboardData = async () => {
  try {
    loading.value = true
    const [statsResponse, activityResponse, healthResponse] = await Promise.all([
     useApi().get('/admin/stats'),
     useApi().get('/admin/activity', {
        params: {
          page: currentPage.value,
          limit: itemsPerPage,
          filter: activityFilter.value
        }
      }),
     useApi().get('/admin/health')
    ])

    // Update general stats
    stats.value = {
      ...statsResponse.data,
      // Override system metrics with real data from health endpoint
      systemStatus: healthResponse.data.systemStatus,
      uptime: healthResponse.data.uptime,
      cpuUsage: healthResponse.data.cpu.usage,
      memoryUsage: healthResponse.data.memory.usage,
      diskUsage: healthResponse.data.disk.usage
    }

    recentActivity.value = activityResponse.data.activities
    totalItems.value = activityResponse.data.total
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const toggleAutoRefresh = () => {
  autoRefresh.value = !autoRefresh.value
  if (autoRefresh.value) {
    refreshInterval = window.setInterval(fetchDashboardData, 5000)
  } else if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
}

const formatDate = (date: string) => {
  return format(parseISO(date), 'MMM d, yyyy HH:mm:ss')
}

const getActivityIconClass = (type: string) => {
  const baseClasses = isDark.value ? {
    user: 'bg-indigo-900/50 text-indigo-400',
    system: 'bg-blue-900/50 text-blue-400',
    job: 'bg-green-900/50 text-green-400',
    default: 'bg-gray-900/50 text-gray-400'
  } : {
    user: 'bg-indigo-100 text-indigo-600',
    system: 'bg-blue-100 text-blue-600',
    job: 'bg-green-100 text-green-600',
    default: 'bg-gray-100 text-gray-600'
  }

  return baseClasses[type as keyof typeof baseClasses] || baseClasses.default
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'user':
      return 'UserIcon'
    case 'system':
      return 'ServerIcon'
    case 'job':
      return 'BriefcaseIcon'
    default:
      return 'InformationCircleIcon'
  }
}

// Get theme state from parent
const isDark = inject('isDark', ref(false))

onMounted(() => {
  fetchDashboardData()
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style> 