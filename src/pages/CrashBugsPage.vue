<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Crash Bugs</h1>
        <p class="mt-2 text-sm text-gray-700">Monitor and analyze unique crash patterns.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <!-- Total Bugs Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Total Bugs</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ stats.totalBugs }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Unresolved Bugs Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Unresolved</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ stats.unresolvedBugs }}</div>
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

      <!-- Top Bug Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Most Frequent</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">
                  {{ stats.topBugs?.[0]?.occurrences || 0 }}
                </div>
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
          @change="fetchBugs"
        >
          <option value="">All Platforms</option>
          <option v-for="platform in stats.platformStats" :key="platform._id" :value="platform._id">
            {{ platform._id }} ({{ platform.count }})
          </option>
        </select>
      </div>
      <div class="w-full sm:w-auto">
        <select
          v-model="filters.isResolved"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="fetchBugs"
        >
          <option value="">All Status</option>
          <option value="false">Unresolved</option>
          <option value="true">Resolved</option>
        </select>
      </div>
      <div class="w-full sm:w-auto">
        <input
          type="number"
          v-model="filters.minOccurrences"
          placeholder="Min Occurrences"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="fetchBugs"
        >
      </div>
    </div>

    <!-- Add this after the filters div and before the bugs table -->
    <div class="mt-4 flex justify-end">
      <button
        @click="confirmDeleteAll"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete All
      </button>
    </div>

    <!-- Bugs Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-xl bg-white">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-50/50">
                  <th scope="col" class="py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">Error</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Location</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Platform</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Occurrences</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Last Seen</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th scope="col" class="relative py-4 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
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
                <tr v-else-if="bugs.length === 0">
                  <td colspan="7" class="text-center py-4 text-gray-500">No crash bugs found</td>
                </tr>
                <tr v-for="bug in bugs" :key="bug._id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="font-medium text-gray-900 flex items-center">
                      <span 
                        v-if="!bug.isViewed" 
                        class="w-2 h-2 rounded-full bg-blue-500 mr-2"
                        title="New bug"
                      ></span>
                      <span :title="bug.errorTitle">{{ shortenErrorTitle(bug.errorTitle) }}</span>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ bug.fileName }}:{{ bug.functionName }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span class="px-2 py-1 rounded-full text-xs font-medium"
                          :class="bug.platform === 'android' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                      {{ bug.platform }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ bug.occurrences }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatDate(bug.lastSeen) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span class="px-2 py-1 rounded-full text-xs font-medium"
                          :class="bug.isResolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ bug.isResolved ? 'Resolved' : 'Unresolved' }}
                    </span>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      @click="viewBugDetails(bug)"
                      class="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      @click="toggleResolved(bug)"
                      :class="bug.isResolved ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                    >
                      {{ bug.isResolved ? 'Unresolve' : 'Resolve' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Bug Details Modal -->
    <div v-if="selectedBug" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">Bug Details</h2>
          <button @click="selectedBug = null" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Bug Info -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-medium mb-2">Error Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Error Title</p>
                <p class="font-medium">{{ selectedBug.errorTitle }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Location</p>
                <p class="font-medium">{{ selectedBug.fileName }}:{{ selectedBug.functionName }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Platform</p>
                <p class="font-medium">{{ selectedBug.platform }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">App Version</p>
                <p class="font-medium">{{ selectedBug.appVersionCode }}</p>
              </div>
            </div>
          </div>

          <!-- Affected Devices -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-medium mb-2">Affected Devices</h3>
            <div class="grid grid-cols-3 gap-4">
              <div v-for="device in selectedBug.affectedDevices" :key="device.deviceModel + device.osVersion">
                <p class="text-sm font-medium">{{ device.deviceModel }}</p>
                <p class="text-xs text-gray-500">OS {{ device.osVersion }} ({{ device.count }} occurrences)</p>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-medium mb-2">Notes</h3>
            <textarea
              v-model="bugNotes"
              rows="3"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add notes about this bug..."
            ></textarea>
            <button
              @click="saveNotes"
              class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Notes
            </button>
          </div>

          <!-- Related Reports -->
          <div v-if="bugReports.length > 0">
            <h3 class="font-medium mb-2">Related Reports</h3>
            <div class="bg-gray-50 p-4 rounded-lg space-y-4">
              <div v-for="report in bugReports" :key="report.id" class="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-medium">{{ report.userId?.name || 'Unknown User' }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(report.timestamp) }}</p>
                  </div>
                  <button
                    @click="viewStackTrace(report)"
                    class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    View Stack Trace
                  </button>
                </div>
              </div>
            </div>
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

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Delete All Crash Bugs</h3>
        <p class="text-sm text-gray-500 mb-4">
          Are you sure you want to delete all crash bugs and their associated reports? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="showDeleteConfirmation = false"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            @click="deleteAll"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useApi} from '@/composables/useApi'

interface PlatformStat {
  _id: string;
  count: number;
}

interface Stats {
  totalBugs: number;
  unresolvedBugs: number;
  platformStats: PlatformStat[];
  topBugs: CrashBug[];
}

interface CrashBug {
  _id: string;
  platform: string;
  appVersionCode: number;
  fileName: string;
  functionName: string;
  errorTitle: string;
  firstSeen: string;
  lastSeen: string;
  occurrences: number;
  isResolved: boolean;
  resolvedAt?: string;
  isViewed: boolean;
  affectedDevices: {
    deviceModel: string;
    osVersion: string;
    count: number;
  }[];
  notes?: string;
}

interface CrashReport {
  id: string;
  timestamp: number;
  stackTrace: string;
  userId?: {
    _id: string;
    name: string;
    email: string;
  };
}

const bugs = ref<CrashBug[]>([])
const stats = ref<Stats>({
  totalBugs: 0,
  unresolvedBugs: 0,
  platformStats: [],
  topBugs: []
})
const loading = ref(false)
const selectedBug = ref<CrashBug | null>(null)
const selectedReport = ref<CrashReport | null>(null)
const bugReports = ref<CrashReport[]>([])
const bugNotes = ref('')
const showDeleteConfirmation = ref(false)

const filters = ref({
  platform: '',
  isResolved: '',
  minOccurrences: ''
})

const shortenErrorTitle = (title: string) => {
  // If the title contains a colon, take the first part and the first few words after
  const parts = title.split(': ');
  if (parts.length > 1) {
    const errorType = parts[0];
    const message = parts[1].split(' ').slice(0, 4).join(' ');
    return `${errorType}: ${message}...`;
  }
  // If no colon, just take the first few words
  return title.split(' ').slice(0, 6).join(' ') + '...';
}

const fetchStats = async () => {
  try {
    const response = await useApi().get('/admin/crash-bugs/stats')
    stats.value = response.data
  } catch (error) {
    console.error('Failed to fetch crash bug stats:', error)
  }
}

const fetchBugs = async () => {
  try {
    loading.value = true
    const params = new URLSearchParams()
    
    if (filters.value.platform) {
      params.append('platform', filters.value.platform)
    }
    if (filters.value.isResolved) {
      params.append('isResolved', filters.value.isResolved)
    }
    if (filters.value.minOccurrences) {
      params.append('minOccurrences', filters.value.minOccurrences)
    }

    const response = await useApi().get(`/admin/crash-bugs?${params.toString()}`)
    bugs.value = response.data
  } catch (error) {
    console.error('Failed to fetch crash bugs:', error)
  } finally {
    loading.value = false
  }
}

const viewBugDetails = async (bug: CrashBug) => {
  selectedBug.value = bug
  bugNotes.value = bug.notes || ''
  try {
    const response = await useApi().get(`/admin/crash-bugs/${bug._id}`)
    bugReports.value = response.data.reports
  } catch (error) {
    console.error('Failed to fetch bug details:', error)
    bugReports.value = []
  }
}

const toggleResolved = async (bug: CrashBug) => {
  try {
    await useApi().patch(`/admin/crash-bugs/${bug._id}`, {
      isResolved: !bug.isResolved
    })
    bug.isResolved = !bug.isResolved
    await fetchStats()
  } catch (error) {
    console.error('Failed to update bug status:', error)
  }
}

const saveNotes = async () => {
  if (!selectedBug.value) return

  try {
    const response = await useApi().patch(`/admin/crash-bugs/${selectedBug.value._id}`, {
      notes: bugNotes.value
    })
    selectedBug.value = response.data
  } catch (error) {
    console.error('Failed to save notes:', error)
  }
}

const viewStackTrace = (report: CrashReport) => {
  selectedReport.value = report
}

const formatDate = (date: string | number) => {
  return new Date(date).toLocaleString()
}

const confirmDeleteAll = () => {
  showDeleteConfirmation.value = true
}

const deleteAll = async () => {
  try {
    await useApi().delete('/admin/crash-bugs')
    showDeleteConfirmation.value = false
    bugs.value = []
    await Promise.all([fetchBugs(), fetchStats()])
  } catch (error) {
    console.error('Failed to delete all crash bugs:', error)
  }
}

onMounted(() => {
  Promise.all([fetchBugs(), fetchStats()])
})
</script> 