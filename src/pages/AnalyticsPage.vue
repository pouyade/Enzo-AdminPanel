<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 :class="['text-2xl font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">API Analytics</h1>
        <p :class="['mt-2 text-sm', isDark ? 'text-gray-400' : 'text-gray-700']">Monitor and analyze API endpoint performance and usage.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <div :class="['overflow-hidden shadow rounded-lg border transition-colors duration-200',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt :class="['text-sm font-medium truncate', isDark ? 'text-gray-400' : 'text-gray-500']">Total Requests</dt>
              <dd class="flex items-baseline">
                <div :class="['text-2xl font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">{{ totalRequests }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <div :class="['overflow-hidden shadow rounded-lg border transition-colors duration-200',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt :class="['text-sm font-medium truncate', isDark ? 'text-gray-400' : 'text-gray-500']">Success Rate</dt>
              <dd class="flex items-baseline">
                <div :class="['text-2xl font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">{{ successRate }}%</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <div :class="['overflow-hidden shadow rounded-lg border transition-colors duration-200',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt :class="['text-sm font-medium truncate', isDark ? 'text-gray-400' : 'text-gray-500']">Error Rate</dt>
              <dd class="flex items-baseline">
                <div :class="['text-2xl font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">{{ errorRate }}%</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <div :class="['overflow-hidden shadow rounded-lg border transition-colors duration-200',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt :class="['text-sm font-medium truncate', isDark ? 'text-gray-400' : 'text-gray-500']">Avg Response Time</dt>
              <dd class="flex items-baseline">
                <div :class="['text-2xl font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">{{ avgResponseTime }}ms</div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div :class="['mt-4 flex items-end space-x-4 p-4 rounded-lg shadow border transition-colors duration-200',
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
      <!-- Date Range -->
      <div class="w-48">
        <label :class="['block text-sm font-medium', isDark ? 'text-gray-200' : 'text-gray-700']">Start Date</label>
        <input
          type="date"
          v-model="dateRange.start"
          :class="['mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm transition-colors duration-200',
            isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 text-gray-900']"
        >
      </div>
      <div class="w-48">
        <label :class="['block text-sm font-medium', isDark ? 'text-gray-200' : 'text-gray-700']">End Date</label>
        <input
          type="date"
          v-model="dateRange.end"
          :class="['mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm transition-colors duration-200',
            isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 text-gray-900']"
        >
      </div>
      <!-- Show Errors Only Checkbox -->
      <div class="flex items-center pt-6">
        <input
          id="show-errors-only"
          type="checkbox"
          v-model="showErrorsOnly"
          :class="['h-4 w-4 rounded focus:ring-indigo-500 transition-colors duration-200',
            isDark ? 'bg-gray-700 border-gray-600 text-indigo-600' : 'border-gray-300 text-indigo-600']"
        >
        <label for="show-errors-only" :class="['ml-2 block text-sm', isDark ? 'text-gray-200' : 'text-gray-700']">
          Show Errors Only
        </label>
      </div>
      <!-- Apply Button -->
      <div>
        <button
          @click="fetchAnalytics"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply Filters
        </button>
      </div>
    </div>

    <!-- Endpoints Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div :class="['overflow-hidden shadow ring-1 ring-opacity-5 md:rounded-lg border transition-colors duration-200',
            isDark ? 'bg-gray-800 border-gray-700 ring-gray-700' : 'bg-white border-gray-200 ring-black']">
            <table :class="['min-w-full divide-y', isDark ? 'divide-gray-700' : 'divide-gray-300']">
              <thead :class="isDark ? 'bg-gray-800/50' : 'bg-gray-50'">
                <tr>
                  <!-- Add sortable class and click handler to headers -->
                  <th scope="col" :class="getHeaderClasses('method')" @click="sortByColumn('method')">Method</th>
                  <th scope="col" :class="getHeaderClasses('endpoint')" @click="sortByColumn('endpoint')">Endpoint</th>
                  <th scope="col" :class="getHeaderClasses('totalCount')" @click="sortByColumn('totalCount')">Total Requests</th>
                  <th scope="col" :class="getHeaderClasses('successCount')" @click="sortByColumn('successCount')">Success Count</th>
                  <th scope="col" :class="getHeaderClasses('errorCount')" @click="sortByColumn('errorCount')">Error Count</th>
                  <th scope="col" :class="getHeaderClasses('errorRate')" @click="sortByColumn('errorRate')">Error Rate</th>
                  <th scope="col" :class="getHeaderClasses('avgDuration')" @click="sortByColumn('avgDuration')">Avg Duration</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody :class="isDark ? 'divide-y divide-gray-700 bg-gray-800' : 'divide-y divide-gray-200 bg-white'">
                <tr v-if="loading" class="animate-pulse">
                  <td colspan="8" class="text-center py-4">
                    <div class="flex justify-center">
                      <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="analytics.length === 0">
                  <td colspan="8" :class="['text-center py-4', isDark ? 'text-gray-400' : 'text-gray-500']">No analytics data found</td>
                </tr>
                <tr v-for="item in analytics" :key="`${item.method}-${item.endpoint}`" :class="isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-green-900/50 text-green-300': isDark && item.method === 'GET',
                      'bg-blue-900/50 text-blue-300': isDark && item.method === 'POST',
                      'bg-yellow-900/50 text-yellow-300': isDark && item.method === 'PUT',
                      'bg-red-900/50 text-red-300': isDark && item.method === 'DELETE',
                      'bg-purple-900/50 text-purple-300': isDark && item.method === 'PATCH',
                      'bg-green-100 text-green-800': !isDark && item.method === 'GET',
                      'bg-blue-100 text-blue-800': !isDark && item.method === 'POST',
                      'bg-yellow-100 text-yellow-800': !isDark && item.method === 'PUT',
                      'bg-red-100 text-red-800': !isDark && item.method === 'DELETE',
                      'bg-purple-100 text-purple-800': !isDark && item.method === 'PATCH'
                    }">
                      {{ item.method }}
                    </span>
                  </td>
                  <td :class="['whitespace-nowrap px-3 py-4 text-sm', isDark ? 'text-gray-200' : 'text-gray-900']">{{ item.endpoint }}</td>
                  <td :class="['whitespace-nowrap px-3 py-4 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">{{ item.totalCount }}</td>
                  <td :class="['whitespace-nowrap px-3 py-4 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">{{ item.successCount }}</td>
                  <td :class="['whitespace-nowrap px-3 py-4 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">{{ item.errorCount }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-green-900/50 text-green-300': isDark && item.errorRate < 1,
                      'bg-yellow-900/50 text-yellow-300': isDark && item.errorRate >= 1 && item.errorRate < 5,
                      'bg-red-900/50 text-red-300': isDark && item.errorRate >= 5,
                      'bg-green-100 text-green-800': !isDark && item.errorRate < 1,
                      'bg-yellow-100 text-yellow-800': !isDark && item.errorRate >= 1 && item.errorRate < 5,
                      'bg-red-100 text-red-800': !isDark && item.errorRate >= 5
                    }">
                      {{ item.errorRate.toFixed(2) }}%
                    </span>
                  </td>
                  <td :class="['whitespace-nowrap px-3 py-4 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">{{ Math.round(item.avgDuration) }}ms</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      @click="showEndpointDetails(item)"
                      :class="['hover:text-indigo-500 transition-colors duration-200',
                        isDark ? 'text-indigo-400' : 'text-indigo-600']"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Endpoint Details Modal -->
    <div v-if="detailsDialog" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div :class="['rounded-lg p-8 max-w-4xl w-full border transition-colors duration-200',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
        <div class="flex justify-between items-center mb-4">
          <h2 :class="['text-lg font-medium', isDark ? 'text-gray-100' : 'text-gray-900']">
            {{ selectedEndpoint?.method }} {{ selectedEndpoint?.endpoint }}
          </h2>
          <button @click="detailsDialog = false" :class="['text-gray-400 hover:text-gray-500 transition-colors duration-200',
            isDark ? 'hover:text-gray-300' : 'hover:text-gray-600']">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Time Series Chart -->
        <div class="mb-6">
          <h3 :class="['text-lg font-medium mb-4', isDark ? 'text-gray-100' : 'text-gray-900']">Request Trends</h3>
          <div class="h-80">
            <canvas ref="chartRef"></canvas>
          </div>
        </div>

        <!-- Request Details Summary -->
        <div class="mb-6">
          <h3 :class="['text-lg font-medium mb-4', isDark ? 'text-gray-100' : 'text-gray-900']">Request Summary</h3>
          <div :class="['grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg border transition-colors duration-200',
            isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200']">
            <div>
              <p :class="['font-medium', isDark ? 'text-gray-300' : 'text-gray-700']">Request Body Types</p>
              <div :class="['mt-2', isDark ? 'text-gray-400' : 'text-gray-600']">
                {{ endpointDetails.requestInfo?.bodyTypes?.join(', ') || 'No data' }}
              </div>
            </div>
            <div>
              <p :class="['font-medium', isDark ? 'text-gray-300' : 'text-gray-700']">Common Parameters</p>
              <div :class="['mt-2', isDark ? 'text-gray-400' : 'text-gray-600']">
                {{ endpointDetails.requestInfo?.commonParams?.join(', ') || 'No data' }}
              </div>
            </div>
            <div>
              <p :class="['font-medium', isDark ? 'text-gray-300' : 'text-gray-700']">Common IPs</p>
              <div :class="['mt-2', isDark ? 'text-gray-400' : 'text-gray-600']">
                {{ endpointDetails.requestInfo?.commonIPs?.join(', ') || 'No data' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Error Details -->
        <div>
          <h3 :class="['text-lg font-medium mb-4', isDark ? 'text-gray-100' : 'text-gray-900']">Error Details</h3>
          <div :class="['overflow-hidden shadow ring-1 ring-opacity-5 rounded-lg border transition-colors duration-200',
            isDark ? 'bg-gray-800 border-gray-700 ring-gray-700' : 'bg-white border-gray-200 ring-black']">
            <table :class="['min-w-full divide-y', isDark ? 'divide-gray-700' : 'divide-gray-300']">
              <thead :class="isDark ? 'bg-gray-800/50' : 'bg-gray-50'">
                <tr>
                  <th scope="col" :class="['py-3.5 pl-4 pr-3 text-left text-sm font-semibold',
                    isDark ? 'text-gray-200' : 'text-gray-900']">Status Code</th>
                  <th scope="col" :class="['px-3 py-3.5 text-left text-sm font-semibold',
                    isDark ? 'text-gray-200' : 'text-gray-900']">Count</th>
                  <th scope="col" :class="['px-3 py-3.5 text-left text-sm font-semibold',
                    isDark ? 'text-gray-200' : 'text-gray-900']">Latest Error</th>
                  <th scope="col" :class="['px-3 py-3.5 text-left text-sm font-semibold',
                    isDark ? 'text-gray-200' : 'text-gray-900']">IP</th>
                  <th scope="col" :class="['px-3 py-3.5 text-left text-sm font-semibold',
                    isDark ? 'text-gray-200' : 'text-gray-900']">Timestamp</th>
                </tr>
              </thead>
              <tbody :class="isDark ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'">
                <tr v-for="error in endpointDetails.errorDetails" :key="error._id" :class="isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'">
                  <td :class="['whitespace-nowrap py-4 pl-4 pr-3 text-sm', isDark ? 'text-gray-200' : 'text-gray-900']">{{ error._id }}</td>
                  <td :class="['whitespace-nowrap px-3 py-4 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">{{ error.count }}</td>
                  <td :class="['px-3 py-4 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">{{ error.errors[0]?.error?.message }}</td>
                  <td :class="['whitespace-nowrap px-3 py-4 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">{{ error.errors[0]?.ip || 'Unknown' }}</td>
                  <td :class="['whitespace-nowrap px-3 py-4 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">
                    {{ new Date(error.errors[0]?.timestamp).toLocaleString() }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, inject } from 'vue';
import {useApi} from '@/composables/useApi';
import Chart from 'chart.js/auto';

interface AnalyticsItem {
  method: string;
  endpoint: string;
  totalCount: number;
  successCount: number;
  errorCount: number;
  errorRate: number;
  avgDuration: number;
}

interface ErrorDetail {
  _id: number;
  count: number;
  errors: Array<{
    timestamp: number;
    error: {
      name: string;
      message: string;
      stack?: string;
      code?: string;
    };
    duration: number;
    ip?: string;
  }>;
}

interface EndpointDetails {
  timeSeriesData: Array<{
    _id: { date: string };
    totalCount: number;
    successCount: number;
    errorCount: number;
    avgDuration: number;
  }>;
  errorDetails: ErrorDetail[];
  requestInfo?: {
    bodyTypes: string[];
    commonParams: string[];
    commonIPs: string[];
  };
}

const analytics = ref<AnalyticsItem[]>([]);
const loading = ref(false);
const detailsDialog = ref(false);
const selectedEndpoint = ref<AnalyticsItem | null>(null);
const endpointDetails = ref<EndpointDetails>({
  timeSeriesData: [],
  errorDetails: []
});
const chartRef = ref<HTMLCanvasElement | null>(null);
let timeSeriesChart: Chart | null = null;

const dateRange = ref({
  start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
  end: new Date().toISOString().substr(0, 10)
});

// --- New State for Filter and Sort ---
const showErrorsOnly = ref(false);
const sortBy = ref<keyof AnalyticsItem | null>('totalCount'); // Default sort
const sortOrder = ref<'asc' | 'desc'>('desc'); // Default order

// Inject theme state
const isDark = inject('isDark', ref(false))

// Computed properties for summary stats
const totalRequests = computed(() => {
  return analytics.value.reduce((sum, item) => sum + item.totalCount, 0);
});

const successRate = computed(() => {
  const total = totalRequests.value;
  if (!total) return '0.00'; // Return string for consistency
  const successes = analytics.value.reduce((sum, item) => sum + item.successCount, 0);
  return ((successes / total) * 100).toFixed(2);
});

const errorRate = computed(() => {
  const total = totalRequests.value;
  if (!total) return '0.00'; // Return string for consistency
  const errors = analytics.value.reduce((sum, item) => sum + item.errorCount, 0);
  return ((errors / total) * 100).toFixed(2);
});

const avgResponseTime = computed(() => {
  const total = totalRequests.value;
  if (!total) return 0;
  const totalDuration = analytics.value.reduce((sum, item) => sum + (item.avgDuration * item.totalCount), 0);
  // Ensure totalDuration is a number before dividing
  const numericTotalDuration = Number(totalDuration) || 0;
  return Math.round(numericTotalDuration / total);
});
// --- End Computed Stats ---

const fetchAnalytics = async () => {
  loading.value = true;
  try {
    const startTimestamp = new Date(dateRange.value.start).getTime();
    // Ensure end date includes the whole day
    const end = new Date(dateRange.value.end);
    end.setHours(23, 59, 59, 999);
    const endTimestamp = end.getTime();

    const params: Record<string, any> = {
      startDate: startTimestamp,
      endDate: endTimestamp,
    };

    // Add filter and sort parameters
    if (showErrorsOnly.value) {
      params.hasErrors = 'true';
    }
    if (sortBy.value) {
      params.sortBy = sortBy.value;
      params.sortOrder = sortOrder.value;
    }

    const response = await useApi().get('/admin/analytics/requests', { params });
    analytics.value = response.data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    // TODO: Show user-friendly error message
  } finally {
    loading.value = false;
  }
};

// --- Sorting Logic ---
const sortByColumn = (column: keyof AnalyticsItem) => {
  if (sortBy.value === column) {
    // Toggle order if same column is clicked again
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // Sort by new column, default to descending
    sortBy.value = column;
    sortOrder.value = 'desc';
  }
  // Fetch data with new sorting
  fetchAnalytics();
};

const getHeaderClasses = (column: keyof AnalyticsItem): string[] => {
  const baseClasses = ['py-3.5', 'text-left', 'text-sm', 'font-semibold', 'cursor-pointer', 'group'];
  const themeClasses = isDark.value ? 'text-gray-200 hover:text-white' : 'text-gray-900 hover:text-black';
  
  if (column === 'method' || column === 'endpoint') {
    baseClasses.push('pl-4', 'pr-3');
  } else {
    baseClasses.push('px-3');
  }
  
  return [...baseClasses, themeClasses];
};

// const getSortIcon = (column: keyof AnalyticsItem): string => {
//     if (sortBy.value !== column) return ''; // No icon if not sorted by this column
//     return sortOrder.value === 'asc' ? '▲' : '▼';
// };
// --- End Sorting Logic ---

const showEndpointDetails = async (endpoint: AnalyticsItem) => {
  selectedEndpoint.value = endpoint;
  detailsDialog.value = true;

  try {
    const startTimestamp = new Date(dateRange.value.start).getTime();
    const end = new Date(dateRange.value.end);
    end.setHours(23, 59, 59, 999);
    const endTimestamp = end.getTime();

    const response = await useApi().get(`/admin/analytics/requests/${encodeURIComponent(endpoint.endpoint)}`, {
      params: {
        startDate: startTimestamp,
        endDate: endTimestamp
      }
    });
    
    // Set default values if properties don't exist
    const responseData = {
      ...response.data,
      requestInfo: response.data.requestInfo || {
        bodyTypes: [],
        commonParams: [],
        commonIPs: []
      }
    };
    
    endpointDetails.value = responseData;
    
    // Update chart
    if (timeSeriesChart) {
      timeSeriesChart.destroy();
    }

    const ctx = chartRef.value?.getContext('2d');
    if (ctx) {
      const timeSeriesData = response.data.timeSeriesData;
      timeSeriesChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeSeriesData.map((d: any) => d._id.date),
          datasets: [
            {
              label: 'Total Requests',
              data: timeSeriesData.map((d: any) => d.totalCount),
              borderColor: 'rgb(79, 70, 229)',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              tension: 0.1,
              fill: true
            },
            {
              label: 'Errors',
              data: timeSeriesData.map((d: any) => d.errorCount),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: isDark.value ? '#D1D5DB' : '#111827'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                color: isDark.value ? '#D1D5DB' : '#111827'
              }
            },
            x: {
              grid: {
                color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                color: isDark.value ? '#D1D5DB' : '#111827'
              }
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Failed to fetch endpoint details:', error);
  }
};

// Watch for dialog close to cleanup chart
watch(detailsDialog, (newValue) => {
  if (!newValue && timeSeriesChart) {
    timeSeriesChart.destroy();
    timeSeriesChart = null;
  }
});

// Update chart options to support dark mode
watch([isDark], () => {
  if (timeSeriesChart) {
    timeSeriesChart.destroy();
    const ctx = chartRef.value?.getContext('2d');
    if (ctx && selectedEndpoint.value) {
      const timeSeriesData = endpointDetails.value.timeSeriesData;
      timeSeriesChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeSeriesData.map((d: any) => d._id.date),
          datasets: [
            {
              label: 'Total Requests',
              data: timeSeriesData.map((d: any) => d.totalCount),
              borderColor: 'rgb(79, 70, 229)',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              tension: 0.1,
              fill: true
            },
            {
              label: 'Errors',
              data: timeSeriesData.map((d: any) => d.errorCount),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.1,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: isDark.value ? '#D1D5DB' : '#111827'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                color: isDark.value ? '#D1D5DB' : '#111827'
              }
            },
            x: {
              grid: {
                color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                color: isDark.value ? '#D1D5DB' : '#111827'
              }
            }
          }
        }
      });
    }
  }
});

onMounted(() => {
  fetchAnalytics();
});
</script> 