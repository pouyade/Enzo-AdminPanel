<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">System Logs</h1>
        <p class="mt-2 text-sm text-gray-700">Monitor and analyze system logs in real-time.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
        <button
          @click="toggleAutoRefresh"
          :class="[
            'inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium',
            autoRefresh
              ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100'
              : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
          ]"
        >
          <span v-if="autoRefresh" class="mr-2">●</span>
          {{ autoRefresh ? 'Stop Live Updates' : 'Start Live Updates' }}
        </button>
        <button
          @click="clearLogs"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Clear Logs
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
      <div>
        <label class="block text-sm font-medium text-gray-700">Installation</label>
        <select
          v-model="filter.installation"
          class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Installations</option>
          <option v-for="id in installations" :key="id" :value="id">{{ id }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Time Range</label>
        <select
          v-model="filter.timeRange"
          class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Device Model</label>
        <select
          v-model="filter.deviceModel"
          class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Devices</option>
          <option v-for="model in deviceModels" :key="model" :value="model">{{ model }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">App Version</label>
        <select
          v-model="filter.appVersion"
          class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Versions</option>
          <option v-for="version in appVersions" :key="version" :value="version">{{ version }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          v-model="filter.search"
          placeholder="Search logs..."
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
      </div>
    </div>

    <!-- Stats Section -->
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Logs</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.totalLogs }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Unique Installations</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.uniqueInstallations }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Unique Devices</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.uniqueDevices }}</dd>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Active App Versions</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.appVersions.length }}</dd>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="mt-4 rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading logs</h3>
          <div class="mt-2 text-sm text-red-700">
            {{ error }}
          </div>
          <div class="mt-4">
            <button
              @click="fetchData"
              class="inline-flex items-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium leading-4 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Log Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">UUID ID</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Device</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">OS</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Version</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Size</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Network</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-if="loading" class="animate-pulse">
                  <td colspan="7" class="text-center py-4">
                    <div class="flex justify-center">
                      <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="paginatedLogs.length === 0">
                  <td colspan="7" class="text-center py-4 text-gray-500">No logs found</td>
                </tr>
                <tr v-for="log in paginatedLogs" :key="log._id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <span class="font-medium text-gray-900">{{ formatDate(log.timestamp) }}</span>
                      <span :class="[
                        'ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                        {
                          'bg-blue-100 text-blue-800': getLogType(log.metadata?.logFileName).color === 'blue',
                          'bg-green-100 text-green-800': getLogType(log.metadata?.logFileName).color === 'green',
                          'bg-red-100 text-red-800': getLogType(log.metadata?.logFileName).color === 'red',
                          'bg-yellow-100 text-yellow-800': getLogType(log.metadata?.logFileName).color === 'yellow',
                          'bg-gray-100 text-gray-800': getLogType(log.metadata?.logFileName).color === 'gray'
                        }
                      ]">
                        {{ getLogType(log.metadata?.logFileName).type }}
                      </span>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span class="font-mono">{{ log.installationId }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ log.device.manufacturer }} {{ log.device.model }}
                    <span v-if="log.device.screenSize" class="text-xs text-gray-400 block">
                      {{ log.device.screenSize }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ log.device.os }} {{ log.device.osVersion }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ log.device.appVersion }}
                    <span class="text-xs text-gray-400">({{ log.device.appBuild }})</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatFileSize(log.metadata?.logFileSize) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="log.context?.action" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-blue-100 text-blue-800': log.context.action === 'scheduled_upload',
                        'bg-green-100 text-green-800': log.context.action === 'manual_upload',
                        'bg-yellow-100 text-yellow-800': log.context.action === 'auto_upload'
                      }">
                      {{ log.context.action }}
                    </span>
                    <span v-if="log.context?.networkType" class="text-xs text-gray-400 block">
                      {{ log.context.networkType }}
                    </span>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div class="flex justify-end space-x-2">
                      <button
                        @click="showLogDetails(log)"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        Details
                      </button>
                      <button
                        @click="deleteLog(log)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          Previous
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
            to
            <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
            of
            <span class="font-medium">{{ totalItems }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            <!-- Page numbers -->
            <template v-for="page in totalPages" :key="page">
              <!-- Show first page, current page ±2, and last page -->
              <template v-if="
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ">
                <button
                  @click="currentPage = page"
                  :class="[
                    page === currentPage
                      ? 'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20'
                      : 'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
                  ]"
                >
                  {{ page }}
                </button>
              </template>
              <!-- Show dots for gaps -->
              <span
                v-else-if="
                  page === currentPage - 3 ||
                  page === currentPage + 3
                "
                class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
              >
                ...
              </span>
            </template>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Log Details Modal -->
    <div v-if="selectedLog" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">Log Details</h2>
          <button @click="selectedLog = null" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Timestamp</h3>
              <p class="mt-1">{{ formatDate(selectedLog.timestamp) }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">Installation ID</h3>
              <p class="mt-1">{{ selectedLog.installationId }}</p>
            </div>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-500">Device Information</h3>
            <div class="mt-1 grid grid-cols-2 gap-2">
              <div>
                <span class="text-xs text-gray-500">Model:</span>
                <p>{{ selectedLog.device.manufacturer }} {{ selectedLog.device.model }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500">OS:</span>
                <p>{{ selectedLog.device.os }} {{ selectedLog.device.osVersion }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500">Screen:</span>
                <p>{{ selectedLog.device.screenSize || 'N/A' }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500">App Version:</span>
                <p>{{ selectedLog.device.appVersion }} ({{ selectedLog.device.appBuild }})</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-500">Context</h3>
            <div class="mt-1 grid grid-cols-2 gap-2">
              <div>
                <span class="text-xs text-gray-500">Action:</span>
                <p>{{ selectedLog.context?.action || 'N/A' }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500">Network Type:</span>
                <p>{{ selectedLog.context?.networkType || 'N/A' }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500">Battery Level:</span>
                <p>{{ selectedLog.context?.batteryLevel || 'N/A' }}%</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-500">Log Content</h3>
            <div v-if="loadingLogContent" class="mt-2 flex justify-center">
              <svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div v-else-if="!selectedLogContent" class="mt-2 text-sm text-gray-500 italic">
              No log content available
            </div>
            <pre v-else class="mt-2 p-4 bg-gray-50 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">{{ selectedLogContent }}</pre>
          </div>
          
          <div v-if="selectedLog.metadata">
            <h3 class="text-sm font-medium text-gray-500">Metadata</h3>
            <pre class="mt-1 p-4 bg-gray-50 rounded-md overflow-x-auto text-sm">{{ JSON.stringify(selectedLog.metadata, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {useApi} from '@/composables/useApi'
import { format } from 'date-fns'

interface Log {
  _id: string
  timestamp: number
  installationId: string
  logContent?: string
  device: {
    model?: string
    manufacturer?: string
    os: string
    osVersion: string
    screenSize?: string
    appVersion: string
    appBuild: string
  }
  metadata?: {
    logFileName?: string
    logFileSize?: string
    timestamp?: string
  }
  context?: {
    route?: string
    action?: string
    networkType?: string
    batteryLevel?: number
  }
}

interface Stats {
  totalLogs: number
  uniqueInstallations: number
  uniqueDevices: number
  osVersions: string[]
  appVersions: string[]
}





const logs = ref<Log[]>([])
const installations = ref<string[]>([])
const deviceModels = ref<string[]>([])
const appVersions = ref<string[]>([])
const stats = ref<Stats>({
  totalLogs: 0,
  uniqueInstallations: 0,
  uniqueDevices: 0,
  osVersions: [],
  appVersions: []
})
const loading = ref(false)
const error = ref('')
const autoRefresh = ref(false)
const selectedLog = ref<Log | null>(null)
const selectedLogContent = ref<string>('')
const loadingLogContent = ref(false)
const currentPage = ref(1)
const itemsPerPage = 50
const totalItems = ref(0)

const filter = ref({
  installation: '',
  timeRange: '24h',
  deviceModel: '',
  appVersion: '',
  search: ''
})

const paginatedLogs = computed(() => {
  let filtered = [...logs.value]

  if (filter.value.installation) {
    filtered = filtered.filter(log => log.installationId === filter.value.installation)
  }

  if (filter.value.deviceModel) {
    filtered = filtered.filter(log => 
      `${log.device.manufacturer} ${log.device.model}` === filter.value.deviceModel
    )
  }

  if (filter.value.appVersion) {
    filtered = filtered.filter(log => 
      `${log.device.appVersion} (${log.device.appBuild})` === filter.value.appVersion
    )
  }

  if (filter.value.search) {
    const searchTerm = filter.value.search.toLowerCase()
    filtered = filtered.filter(log => {
      const deviceInfo = `${log.device.manufacturer} ${log.device.model}`.toLowerCase()
      const contextInfo = log.context ? `${log.context.action} ${log.context.networkType}`.toLowerCase() : ''
      return (
        log.installationId.toLowerCase().includes(searchTerm) ||
        deviceInfo.includes(searchTerm) ||
        contextInfo.includes(searchTerm)
      )
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const fetchData = async () => {
  try {
    loading.value = true
    error.value = ''
    
    console.log('Fetching logs with params:', {
      page: currentPage.value,
      limit: itemsPerPage,
      ...filter.value
    })

    const response = await useApi().get('/admin/logs', {
      params: {
        page: currentPage.value,
        limit: itemsPerPage,
        installation: filter.value.installation || undefined,
        timeRange: filter.value.timeRange || undefined,
        deviceModel: filter.value.deviceModel || undefined,
        appVersion: filter.value.appVersion || undefined,
        search: filter.value.search || undefined
      }
    })

    console.log('API Response:', response.data)

    // Check if response.data exists and is an array (direct array response)
    if (Array.isArray(response.data)) {
      logs.value = response.data
      totalItems.value = response.data.length
    }
    // Check if response.data.logs exists (paginated response)
    else if (response.data?.logs && Array.isArray(response.data.logs)) {
      logs.value = response.data.logs
      totalItems.value = response.data.pagination?.total || response.data.logs.length
    }
    // If neither format matches, throw error
    else {
      throw new Error('Unexpected API response format')
    }

    // Extract unique values for filters
    installations.value = Array.from(new Set(
      logs.value
        .map(log => log.installationId)
        .filter(Boolean)
    )).sort()

    deviceModels.value = Array.from(new Set(
      logs.value
        .map(log => log.device && `${log.device.manufacturer} ${log.device.model}`)
        .filter(Boolean)
    )).sort()

    appVersions.value = Array.from(new Set(
      logs.value
        .map(log => log.device && `${log.device.appVersion} (${log.device.appBuild})`)
        .filter(Boolean)
    )).sort()

    // Update stats
    stats.value = {
      totalLogs: totalItems.value,
      uniqueInstallations: installations.value.length,
      uniqueDevices: deviceModels.value.length,
      osVersions: Array.from(new Set(logs.value
        .map(log => log.device?.osVersion)
        .filter(Boolean)
      )),
      appVersions: Array.from(new Set(logs.value
        .map(log => log.device?.appVersion)
        .filter(Boolean)
      ))
    }

  } catch (err: any) {
    console.error('API Error:', err)
    const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch logs'
    error.value = errorMessage
    logs.value = []
    totalItems.value = 0
    installations.value = []
    deviceModels.value = []
    appVersions.value = []
    stats.value = {
      totalLogs: 0,
      uniqueInstallations: 0,
      uniqueDevices: 0,
      osVersions: [],
      appVersions: []
    }
  } finally {
    loading.value = false
  }
}

const toggleAutoRefresh = () => {
  autoRefresh.value = !autoRefresh.value
  if (autoRefresh.value) {
    fetchData()
  }
}

const clearLogs = async () => {
  if (!confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
    return
  }
  
  try {
    loading.value = true
    error.value = ''
    
    await useApi().delete('/admin/logs')
    await fetchData()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to clear logs'
    console.error('Failed to clear logs:', err)
  } finally {
    loading.value = false
  }
}

const showLogDetails = async (log: Log) => {
  try {
    selectedLog.value = log
    selectedLogContent.value = ''
    loadingLogContent.value = true
    
    // Fetch the log content separately
    const response = await useApi().get(`/admin/logs/${log._id}/content`)
    
    if (response.data?.content) {
      selectedLogContent.value = response.data.content
    } else {
      selectedLogContent.value = 'No log content available'
    }
  } catch (err) {
    console.error('Failed to fetch log content:', err)
    selectedLogContent.value = 'Failed to load log content. Please try again.'
  } finally {
    loadingLogContent.value = false
  }
}

const deleteLog = async (log: Log) => {
  if (!confirm('Are you sure you want to delete this log?')) {
    return
  }

  try {
    loading.value = true
    await useApi().delete(`/admin/logs/${log._id}`)
    // Remove the log from the local array
    logs.value = logs.value.filter(l => l._id !== log._id)
    // Update stats
    stats.value.totalLogs--
  } catch (err: any) {
    console.error('Failed to delete log:', err)
    error.value = err.response?.data?.message || 'Failed to delete log'
  } finally {
    loading.value = false
  }
}

const formatDate = (timestamp: number) => {
  return format(timestamp, 'MMM d, yyyy HH:mm:ss')
}

const formatFileSize = (bytes: string | number | undefined): string => {
  if (!bytes) return 'N/A'
  
  const size = typeof bytes === 'string' ? parseInt(bytes) : bytes
  if (isNaN(size)) return 'N/A'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let unitIndex = 0
  let value = size

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex++
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

const getLogType = (fileName: string | undefined): { type: string; color: string } => {
  if (!fileName) return { type: 'Unknown', color: 'gray' }
  
  if (fileName.startsWith('log_')) {
    return { type: 'Log', color: 'blue' }
  } else if (fileName.startsWith('client_')) {
    return { type: 'Client', color: 'green' }
  } else if (fileName.startsWith('crash_')) {
    return { type: 'Crash', color: 'red' }
  } else if (fileName.startsWith('debug_')) {
    return { type: 'Debug', color: 'yellow' }
  } else {
    return { type: 'Other', color: 'gray' }
  }
}

// Watch currentPage changes to fetch new data
watch(currentPage, () => {
  fetchData()
})

// Watch filter changes to reset pagination and fetch new data
watch([filter], () => {
  currentPage.value = 1
  fetchData()
}, { deep: true })

onMounted(() => {
  fetchData()
})
</script>