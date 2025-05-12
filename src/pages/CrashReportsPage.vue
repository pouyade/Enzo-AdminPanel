<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Crash Reports</h1>
        <p class="mt-2 text-sm text-gray-700">Monitor and analyze app crash reports.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="clearAllReports"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
        >
          Clear All Reports
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <!-- Total Reports Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Total Reports</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ stats.totalReports }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Reports Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Last 24 Hours</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ stats.recentReports }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Platform Distribution Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Platforms</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ stats.platformStats?.length || 0 }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Version Distribution Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">App Versions</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ stats.versionStats?.length || 0 }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-4 flex flex-wrap gap-4">
      <div class="w-full sm:w-auto">
        <select
          v-model="filters.platform"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="fetchReports"
        >
          <option value="">All Platforms</option>
          <option v-for="platform in stats.platformStats" :key="platform._id" :value="platform._id">
            {{ platform._id }} ({{ platform.count }})
          </option>
        </select>
      </div>
      <div class="w-full sm:w-auto">
        <select
          v-model="filters.appVersion"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="fetchReports"
        >
          <option value="">All Versions</option>
          <option v-for="version in stats.versionStats" :key="version._id" :value="version._id">
            {{ version._id }} ({{ version.count }})
          </option>
        </select>
      </div>
      <div class="w-full sm:w-auto">
        <input
          type="date"
          v-model="filters.startDate"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="fetchReports"
        >
      </div>
      <div class="w-full sm:w-auto">
        <input
          type="date"
          v-model="filters.endDate"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="fetchReports"
        >
      </div>
      <div class="w-full sm:w-auto">
        <select
          v-model="filters.viewed"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="fetchReports"
        >
          <option value="">All Reports</option>
          <option value="unviewed">Unviewed Only</option>
          <option value="viewed">Viewed Only</option>
        </select>
      </div>
    </div>

    <!-- Reports Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-xl bg-white">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-50/50">
                  <th scope="col" class="py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">User</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Platform</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Version</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Device</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Time</th>
                  <th scope="col" class="relative py-4 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="loading" class="animate-pulse">
                  <td colspan="6" class="text-center py-4">
                    <div class="flex justify-center">
                      <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="reports.length === 0">
                  <td colspan="6" class="text-center py-4 text-gray-500">No crash reports found</td>
                </tr>
                <tr v-for="report in reports" :key="report.id" :class="['hover:bg-gray-50', !report.isViewed ? 'bg-blue-50' : '']">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ report.userId?.name || 'Unknown User' }}</div>
                        <div class="text-gray-500">{{ report.userId?.email || 'No email' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span class="px-2 py-1 rounded-full text-xs font-medium"
                          :class="report.platform === 'android' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                      {{ report.platform }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ report.appVersion }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ report.deviceModel }} ({{ report.osVersion }})
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span class="inline-flex items-center">
                      {{ formatDate(report.timestamp) }}
                      <span v-if="!report.isViewed" class="ml-2 h-2 w-2 rounded-full bg-blue-400"></span>
                    </span>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      @click="viewStackTrace(report)"
                      class="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      @click="deleteReport(report.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Stack Trace Modal -->
    <div v-if="selectedReport" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">Stack Trace</h2>
          <button @click="selectedReport = null" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <pre class="mt-4 bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">{{ selectedReport.stackTrace }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useApi} from '@/composables/useApi'

interface CrashReport {
  id: string
  timestamp: number
  appVersion: string
  stackTrace: string
  userId?: {
    _id: string
    name: string
    email: string
  }
  platform: string
  deviceModel: string
  osVersion: string
  synced: boolean
  syncedAt: string
  isViewed: boolean
}

interface Stats {
  totalReports: number
  platformStats: Array<{ _id: string; count: number }>
  versionStats: Array<{ _id: string; count: number }>
  recentReports: number
}

const reports = ref<CrashReport[]>([])
const stats = ref<Stats>({
  totalReports: 0,
  platformStats: [],
  versionStats: [],
  recentReports: 0
})
const loading = ref(false)
const selectedReport = ref<CrashReport | null>(null)

const filters = ref({
  platform: '',
  appVersion: '',
  startDate: '',
  endDate: '',
  viewed: ''
})

const fetchStats = async () => {
  try {
    const response = await useApi().get('/admin/crash-reports/stats')
    stats.value = response.data
  } catch (error) {
    console.error('Failed to fetch crash report stats:', error)
  }
}

const fetchReports = async () => {
  try {
    loading.value = true
    const params = new URLSearchParams()
    
    if (filters.value.platform) {
      params.append('platform', filters.value.platform)
    }
    if (filters.value.appVersion) {
      params.append('appVersion', filters.value.appVersion)
    }
    if (filters.value.startDate) {
      params.append('startDate', new Date(filters.value.startDate).getTime().toString())
    }
    if (filters.value.endDate) {
      params.append('endDate', new Date(filters.value.endDate).getTime().toString())
    }
    if (filters.value.viewed) {
      params.append('viewed', filters.value.viewed === 'viewed' ? 'true' : 'false')
    }

    const response = await useApi().get(`/admin/crash-reports?${params.toString()}`)
    reports.value = response.data
  } catch (error) {
    console.error('Failed to fetch crash reports:', error)
  } finally {
    loading.value = false
  }
}

const deleteReport = async (id: string) => {
  if (!confirm('Are you sure you want to delete this crash report?')) {
    return
  }

  try {
    await useApi().delete(`/admin/crash-reports/${id}`)
    await Promise.all([fetchReports(), fetchStats()])
  } catch (error) {
    console.error('Failed to delete crash report:', error)
  }
}

const clearAllReports = async () => {
  if (!confirm('Are you sure you want to delete all crash reports? This action cannot be undone.')) {
    return
  }

  try {
    await useApi().delete('/admin/crash-reports')
    await Promise.all([fetchReports(), fetchStats()])
  } catch (error) {
    console.error('Failed to clear crash reports:', error)
  }
}

const viewStackTrace = async (report: CrashReport) => {
  selectedReport.value = report
  if (!report.isViewed) {
    try {
      await useApi().patch(`/admin/crash-reports/${report.id}/mark-viewed`)
      // Update the report in the list
      const index = reports.value.findIndex(r => r.id === report.id)
      if (index !== -1) {
        reports.value[index].isViewed = true
      }
      // Update stats if needed
      await fetchStats()
    } catch (error) {
      console.error('Failed to mark report as viewed:', error)
    }
  }
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString()
}

onMounted(() => {
  Promise.all([fetchReports(), fetchStats()])
})
</script> 