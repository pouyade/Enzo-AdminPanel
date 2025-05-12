<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold dark:text-gray-100">File Upload Ledger</h2>
        <div class="flex space-x-4">
          <!-- Filters -->
          <select v-model="filters.type" class="form-select rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <option value="">All Types</option>
            <option value="avatars">Avatars</option>
            <option value="messages">Messages</option>
            <option value="others">Others</option>
            <option value="icons">Icons</option>
          </select>
          <select v-model="filters.active" class="form-select rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Deleted</option>
          </select>
        </div>
      </div>

      <!-- Ledger Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Uploaded By</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="file in ledgerItems" :key="file.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {{ file.originalFilename }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ file.fileType }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatFileSize(file.fileSize) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ file.user?.name || file.admin?.name || 'Unknown' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  file.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                ]">
                  {{ file.isActive ? 'Active' : 'Deleted' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(file.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center">
          <select v-model="pageSize" class="form-select rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <option :value="10">10 per page</option>
            <option :value="20">20 per page</option>
            <option :value="50">50 per page</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="page > 1 && (page--)"
            :disabled="page === 1"
            class="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span class="text-gray-600 dark:text-gray-400">Page {{ page }} of {{ totalPages }}</span>
          <button
            @click="page < totalPages && (page++)"
            :disabled="page === totalPages"
            class="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import {useApi} from '@/composables/useApi';
import { useToast } from 'vue-toastification';

interface User {
  name: string;
}

interface LedgerItem {
  id: string | number;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  user?: User;
  admin?: User;
  isActive: boolean;
  createdAt: string;
}

const toast = useToast();

// Pagination and filters
const page = ref(1);
const pageSize = ref(20);
const totalItems = ref(0);
const ledgerItems = ref<LedgerItem[]>([]);
const filters = ref({
  type: '',
  active: '',
});

const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

// Format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

// Fetch ledger data
const fetchLedger = async () => {
  try {
    const params = new URLSearchParams({
      page: page.value.toString(),
      pageSize: pageSize.value.toString(),
      ...(filters.value.type && { type: filters.value.type }),
      ...(filters.value.active && { active: filters.value.active }),
    });

    const response = await useApi().get<{ items: LedgerItem[]; total: number }>(`/admin/uploads?${params}`);
    ledgerItems.value = response.data.items;
    totalItems.value = response.data.total;
  } catch (error: any) {
    console.error('Error fetching ledger:', error);
    toast.error(error.response?.data?.error || 'Failed to fetch upload ledger');
  }
};

// Watch for changes in filters or pagination
watch([page, pageSize, filters], () => {
  fetchLedger();
});

// Initial fetch
onMounted(() => {
  fetchLedger();
});
</script> 