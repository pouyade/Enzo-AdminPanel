<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Voucher Management</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all vouchers in your system.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="openDialog()"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Create Voucher
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <!-- Total Vouchers Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Total Vouchers</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ vouchers.length }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Vouchers Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Active Vouchers</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ activeVouchers }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Uses Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Total Uses</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ totalUses }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Expired Vouchers Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Expired Vouchers</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ expiredVouchers }}</div>
              </dd>
            </div>
          </div>
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
          <p class="text-sm font-medium text-red-800">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Success Alert -->
    <div v-if="success" class="mt-4 rounded-md bg-green-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">{{ success }}</p>
        </div>
      </div>
    </div>

    <!-- Vouchers Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-xl bg-white">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-50/50">
                  <th scope="col" class="py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">Code</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Plan</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Duration</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Usage</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Expires</th>
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
                <tr v-else-if="vouchers.length === 0">
                  <td colspan="7" class="text-center py-4 text-gray-500">No vouchers found</td>
                </tr>
                <tr v-for="voucher in paginatedVouchers" :key="voucher._id" class="transition-colors duration-200 hover:bg-gray-50/50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="font-medium text-gray-900">{{ voucher.code }}</div>
                    <div class="text-gray-500">{{ voucher.description || 'No description' }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ voucher.planId.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ voucher.durationDays }} days</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <button 
                      @click="showUsageDetails(voucher)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      {{ voucher.usedCount }}/{{ voucher.maxUses }}
                    </button>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span :class="voucher.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'" 
                          class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ voucher.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ voucher.expiresAt ? new Date(voucher.expiresAt).toLocaleDateString() : 'Never' }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      @click="openDialog(voucher)"
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      @click="handleDelete(voucher._id)"
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

    <!-- Usage Details Modal -->
    <div v-if="showUsageModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-4xl w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">Usage Details for {{ selectedVoucher?.code }}</h2>
          <button @click="closeUsageModal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="loadingUsage" class="flex justify-center py-8">
          <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <div v-else-if="voucherUsage.length === 0" class="text-center py-8 text-gray-500">
          No usage records found for this voucher
        </div>

        <div v-else class="mt-4">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">User</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Used At</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Plan Activated</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="usage in voucherUsage" :key="usage.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{{ usage.user.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ usage.user.email }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ new Date(usage.usedAt).toLocaleString() }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ usage.plan.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Voucher Modal -->
    <div v-if="showDialog" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">{{ editingVoucher ? 'Edit Voucher' : 'Create Voucher' }}</h2>
          <button @click="closeDialog" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="formError" class="mb-4 rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ formError }}</p>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Code</label>
            <input
              v-model="formData.code"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              :disabled="!!editingVoucher"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Plan</label>
            <select
              v-model="formData.planId"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a plan</option>
              <option v-for="plan in plans" :key="plan._id" :value="plan._id">
                {{ plan.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Duration (Days)</label>
            <input
              v-model="formData.durationDays"
              type="number"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Max Uses</label>
            <input
              v-model="formData.maxUses"
              type="number"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Expires At</label>
            <input
              v-model="formData.expiresAt"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="formData.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="closeDialog"
              class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              :disabled="formLoading"
            >
              <span v-if="formLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>{{ editingVoucher ? 'Save Changes' : 'Create Voucher' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import {useApi} from '@/composables/useApi';

interface Voucher {
  _id: string;
  code: string;
  planId: {
    _id: string;
    name: string;
  };
  durationDays: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: number;
  createdAt: number;
  description?: string;
}

interface Plan {
  _id: string;
  name: string;
}

interface VoucherUsage {
  id: string;
  user: {
    name: string;
    email: string;
  };
  plan: {
    name: string;
  };
  usedAt: string;
}

const vouchers = ref<Voucher[]>([]);
const plans = ref<Plan[]>([]);
const page = ref(0);
const rowsPerPage = ref(10);
const showDialog = ref(false);
const editingVoucher = ref<Voucher | null>(null);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const loading = ref(false);
const formLoading = ref(false);
const formError = ref('');

// Add new refs for usage details modal
const showUsageModal = ref(false);
const selectedVoucher = ref<Voucher | null>(null);
const voucherUsage = ref<VoucherUsage[]>([]);
const loadingUsage = ref(false);

const formData = ref({
  code: '',
  planId: '',
  durationDays: '',
  maxUses: '',
  expiresAt: '',
  description: ''
});

const paginatedVouchers = computed(() => {
  const start = page.value * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return vouchers.value.slice(start, end);
});

// const totalPages = computed(() => {
//   return Math.ceil(vouchers.value.length / rowsPerPage.value);
// });

const activeVouchers = computed(() => {
  return vouchers.value.filter(v => v.isActive).length;
});

const expiredVouchers = computed(() => {
  return vouchers.value.filter(v => v.expiresAt && v.expiresAt < Date.now()).length;
});

const totalUses = computed(() => {
  return vouchers.value.reduce((sum, v) => sum + v.usedCount, 0);
});

const fetchVouchers = async () => {
  try {
    loading.value = true;
    const response = await useApi().get('/admin/vouchers');
    vouchers.value = response.data.vouchers;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch vouchers';
  } finally {
    loading.value = false;
  }
};

const fetchPlans = async () => {
  try {
    console.log('Fetching plans...');
    const response = await useApi().get('/admin/plans');
    console.log('Plans response:', response.data);
    
    const plansArray = Array.isArray(response.data) ? response.data : 
                     (response.data && Array.isArray(response.data.plans)) ? response.data.plans : [];
    
    if (plansArray.length > 0) {
      plans.value = plansArray;
      console.log('Loaded plans:', plans.value);
    } else {
      console.warn('No plans found in response');
      plans.value = [];
    }
  } catch (err: any) {
    console.error('Failed to fetch plans:', err);
    error.value = err.response?.data?.message || 'Failed to fetch plans';
    plans.value = [];
  }
};

const showUsageDetails = async (voucher: Voucher) => {
  selectedVoucher.value = voucher;
  showUsageModal.value = true;
  await fetchVoucherUsage(voucher._id);
};

const fetchVoucherUsage = async (voucherId: string) => {
  try {
    loadingUsage.value = true;
    console.log('Fetching usage for voucher:', voucherId);
    const response = await useApi().get(`/admin/vouchers/${voucherId}/usage`);
    console.log('Voucher usage response:', response.data);
    
    // Handle both array and {usage: array} formats
    const usageArray = Array.isArray(response.data) ? response.data : 
                      (response.data && Array.isArray(response.data.usage)) ? response.data.usage : [];
    
    if (usageArray.length > 0) {
      voucherUsage.value = usageArray;
      console.log('Loaded voucher usage:', voucherUsage.value);
    } else {
      console.warn('No usage records found for voucher:', voucherId);
      voucherUsage.value = [];
    }
  } catch (err: any) {
    console.error('Failed to fetch voucher usage:', err);
    error.value = err.response?.data?.message || 'Failed to fetch voucher usage';
    voucherUsage.value = [];
  } finally {
    loadingUsage.value = false;
  }
};

const closeUsageModal = () => {
  showUsageModal.value = false;
  selectedVoucher.value = null;
  voucherUsage.value = [];
};

const openDialog = (voucher?: Voucher) => {
  if (voucher) {
    editingVoucher.value = voucher;
    formData.value = {
      code: voucher.code,
      planId: voucher.planId._id,
      durationDays: voucher.durationDays.toString(),
      maxUses: voucher.maxUses.toString(),
      expiresAt: voucher.expiresAt ? new Date(voucher.expiresAt).toISOString().split('T')[0] : '',
      description: voucher.description || ''
    };
  } else {
    editingVoucher.value = null;
    formData.value = {
      code: '',
      planId: '',
      durationDays: '',
      maxUses: '',
      expiresAt: '',
      description: ''
    };
  }
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editingVoucher.value = null;
  formData.value = {
    code: '',
    planId: '',
    durationDays: '',
    maxUses: '',
    expiresAt: '',
    description: ''
  };
  formError.value = '';
};

const handleSubmit = async () => {
  formError.value = '';
  formLoading.value = true;

  try {
    const data = {
      ...formData.value,
      durationDays: parseInt(formData.value.durationDays),
      maxUses: parseInt(formData.value.maxUses),
      expiresAt: formData.value.expiresAt ? new Date(formData.value.expiresAt).getTime() : undefined
    };

    if (editingVoucher.value) {
      await useApi().put(`/admin/vouchers/${editingVoucher.value._id}`, data);
      success.value = 'Voucher updated successfully';
    } else {
      await useApi().post('/admin/vouchers', data);
      success.value = 'Voucher created successfully';
    }

    closeDialog();
    await fetchVouchers();
  } catch (err: any) {
    formError.value = err.response?.data?.message || 'Failed to save voucher';
  } finally {
    formLoading.value = false;
  }
};

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this voucher?')) return;

  try {
    await useApi().delete(`/admin/vouchers/${id}`);
    success.value = 'Voucher deleted successfully';
    await fetchVouchers();
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to delete voucher';
  }
};

onMounted(async () => {
  await Promise.all([fetchVouchers(), fetchPlans()]);
});

// Add a watcher for plans
watch(plans, (newPlans) => {
  console.log('Plans updated:', newPlans);
}, { immediate: true });
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 