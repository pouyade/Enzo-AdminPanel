<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Payments</h1>
        <p class="mt-2 text-sm text-gray-700">View payment history and revenue analytics.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <!-- Total Revenue -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">${{ totalRevenue.toFixed(2) }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Successful Transactions -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Successful Transactions</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ successfulTransactionsCount }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Failed Transactions -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Failed Transactions</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ failedTransactionsCount }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Average Order Value -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Average Order Value</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">${{ averageOrderValue.toFixed(2) }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Chart -->
    <div class="mt-8 bg-white p-6 shadow rounded-lg">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900">Revenue Overview</h2>
        <select
          v-model="chartPeriod"
          class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>
      <div class="h-72">
        <canvas ref="revenueChart"></canvas>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 class="text-lg font-medium text-gray-900">Recent Transactions</h2>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search transactions..."
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
          </div>
          <select
            v-model="statusFilter"
            class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="transaction in filteredTransactions" :key="transaction.id">
          <div class="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ transaction.status }}
                  </span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ transaction.user.email }}
                  </div>
                  <div class="text-sm text-gray-500">
                    Plan: {{ transaction.plan.name }}
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <div class="mr-6 text-right">
                  <div class="text-sm font-medium text-gray-900">
                    ${{ transaction.amount.toFixed(2) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ new Date(transaction.date).toLocaleDateString() }}
                  </div>
                </div>
                <button
                  @click="viewTransactionDetails(transaction)"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="transactions.length === 0" class="px-4 py-12 text-center">
        <p class="text-gray-500">No transactions found.</p>
      </div>
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="currentPage++"
            :disabled="!hasNextPage"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ ((currentPage - 1) * itemsPerPage) + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
              of
              <span class="font-medium">{{ totalItems }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  currentPage === page
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Details Modal -->
    <div v-if="selectedTransaction" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-medium">Transaction Details</h2>
          <button @click="selectedTransaction = null" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Transaction ID</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ selectedTransaction.id }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Status</dt>
            <dd class="mt-1">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  selectedTransaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                  selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                ]"
              >
                {{ selectedTransaction.status }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Amount</dt>
            <dd class="mt-1 text-sm text-gray-900">${{ selectedTransaction.amount.toFixed(2) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Date</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ new Date(selectedTransaction.date).toLocaleString() }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Customer Email</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ selectedTransaction.user.email }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Plan</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ selectedTransaction.plan.name }}</dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Payment Method</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <div class="flex items-center">
                <img
                  :src="getPaymentMethodIcon(selectedTransaction.paymentMethod)"
                  :alt="selectedTransaction.paymentMethod"
                  class="h-8 w-auto mr-2"
                >
                {{ selectedTransaction.paymentMethod }}
              </div>
            </dd>
          </div>
          <div v-if="selectedTransaction.status === 'failed'" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Error Message</dt>
            <dd class="mt-1 text-sm text-red-600">{{ selectedTransaction.errorMessage }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import {useApi} from '@/composables/useApi'
import Chart from 'chart.js/auto'

interface User {
  id: string
  email: string
}

interface Plan {
  id: string
  name: string
}

interface Transaction {
  id: string
  status: 'completed' | 'pending' | 'failed'
  amount: number
  date: string
  user: User
  plan: Plan
  paymentMethod: string
  errorMessage?: string
}

const transactions = ref<Transaction[]>([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const totalItems = ref(0)
const chartPeriod = ref('30')
const revenueChart = ref<Chart | null>(null)
const selectedTransaction = ref<Transaction | null>(null)
const chartLoading = ref(false)
const totalRevenue = ref(0)
const averageOrderValue = ref(0)

const filteredTransactions = computed(() => {
  return transactions.value
    .filter(t => {
      const matchesSearch = !searchQuery.value ||
        t.user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        t.plan.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesStatus = !statusFilter.value || t.status === statusFilter.value
      return matchesSearch && matchesStatus
    })
})

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))
const hasNextPage = computed(() => currentPage.value < totalPages.value)

const successfulTransactionsCount = computed(() => {
  return transactions.value.filter(t => t.status === 'completed').length;
});

const failedTransactionsCount = computed(() => {
  return transactions.value.filter(t => t.status === 'failed').length;
});

const fetchTransactions = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await useApi().get('/admin/transactions', {
      params: {
        page: currentPage.value,
        limit: itemsPerPage,
        status: statusFilter.value || undefined,
        search: searchQuery.value || undefined
      }
    })
    
    transactions.value = response.data.transactions
    totalItems.value = response.data.total

    // Calculate total revenue and average order value
    const completedTransactions = transactions.value.filter(t => t.status === 'completed');
    totalRevenue.value = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
    averageOrderValue.value = completedTransactions.length > 0 
      ? totalRevenue.value / completedTransactions.length 
      : 0;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch transactions'
    console.error('Failed to fetch transactions:', err)
  } finally {
    loading.value = false
  }
}

const fetchRevenueData = async () => {
  try {
    chartLoading.value = true
    
    const response = await useApi().get(`/admin/revenue?period=${chartPeriod.value}`)
    updateChart(response.data)
  } catch (err: any) {
    console.error('Failed to fetch revenue data:', err)
  } finally {
    chartLoading.value = false
  }
}

const updateChart = (data: { labels: string[], values: number[] }) => {
  if (revenueChart.value) {
    revenueChart.value.destroy()
  }

  const ctx = (document.querySelector('canvas') as HTMLCanvasElement).getContext('2d')
  if (!ctx) return

  revenueChart.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Revenue',
        data: data.values,
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `$${value}`
          }
        }
      }
    }
  })
}

const viewTransactionDetails = (transaction: Transaction) => {
  selectedTransaction.value = transaction
}

const getPaymentMethodIcon = (method: string) => {
  const icons: Record<string, string> = {
    'visa': '/icons/visa.svg',
    'mastercard': '/icons/mastercard.svg',
    'amex': '/icons/amex.svg',
    'paypal': '/icons/paypal.svg'
  }
  return icons[method.toLowerCase()] || '/icons/generic-card.svg'
}

watch([currentPage, statusFilter, searchQuery], () => {
  fetchTransactions()
})

watch(chartPeriod, () => {
  fetchRevenueData()
})

onMounted(() => {
  fetchTransactions()
  fetchRevenueData()
})
</script> 