<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Block Management</h1>
        <p class="mt-2 text-sm text-gray-700">Manage blocked IPs, IP ranges, and email addresses.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="showAddBlockModal = true"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Block
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Total Blocks</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ blocks.length }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Active Blocks</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ activeBlocks }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">IP Range Blocks</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ ipRangeBlocks }}</div>
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

    <!-- Blocks Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Value</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reason</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Expires</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
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
                <tr v-else-if="blocks.length === 0">
                  <td colspan="6" class="text-center py-4 text-gray-500">No blocks found</td>
                </tr>
                <tr v-for="block in blocks" :key="block._id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span :class="{
                      'bg-red-100 text-red-800': block.type === 'ip',
                      'bg-orange-100 text-orange-800': block.type === 'ip_range',
                      'bg-blue-100 text-blue-800': block.type === 'email'
                    }" class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ block.type === 'ip_range' ? 'IP Range' : block.type.toUpperCase() }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ block.value }}</td>
                  <td class="px-3 py-4 text-sm text-gray-500">{{ block.reason || 'No reason provided' }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ block.expiresAt ? new Date(block.expiresAt).toLocaleDateString() : 'Never' }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span :class="block.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'" class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ block.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      @click="editBlock(block)"
                      class="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteBlock(block._id)"
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

    <!-- Add/Edit Block Modal -->
    <div v-if="showAddBlockModal || editingBlock" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">{{ editingBlock ? 'Edit Block' : 'Add New Block' }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <div v-if="formError" class="mb-4 rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ formError }}</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Type</label>
              <select
                v-model="formData.type"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="ip">IP Address</option>
                <option value="ip_range">IP Range</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Value</label>
              <input
                type="text"
                v-model="formData.value"
                :placeholder="getValuePlaceholder"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
              <p class="mt-1 text-sm text-gray-500">{{ getValueHelp }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Reason</label>
              <input
                type="text"
                v-model="formData.reason"
                placeholder="Why is this being blocked?"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Expiration Date (optional)</label>
              <input
                type="datetime-local"
                v-model="formData.expiresAt"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
              <p class="mt-1 text-sm text-gray-500">Leave empty for permanent block</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <div class="mt-2">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    v-model="formData.isActive"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  >
                  <label for="isActive" class="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
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
              <span v-else>{{ editingBlock ? 'Save Changes' : 'Add Block' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {useApi} from '@/composables/useApi'

interface Block {
  _id: string;
  type: 'ip' | 'ip_range' | 'email';
  value: string;
  reason: string;
  createdBy?: string;
  createdAt: number;
  expiresAt?: number;
  isActive: boolean;
}

const blocks = ref<Block[]>([])
const loading = ref(false)
const error = ref('')
const showAddBlockModal = ref(false)
const editingBlock = ref<Block | null>(null)
const formLoading = ref(false)
const formError = ref('')

const formData = ref({
  type: 'ip' as 'ip' | 'ip_range' | 'email',
  value: '',
  reason: '',
  expiresAt: '',
  isActive: true
})

const getValuePlaceholder = computed(() => {
  switch (formData.value.type) {
    case 'ip':
      return '192.168.1.1'
    case 'ip_range':
      return '192.168.1.0/24'
    case 'email':
      return 'example@domain.com'
    default:
      return ''
  }
})

const getValueHelp = computed(() => {
  switch (formData.value.type) {
    case 'ip':
      return 'Enter a single IP address'
    case 'ip_range':
      return 'Enter an IP range in CIDR notation (e.g., 192.168.1.0/24)'
    case 'email':
      return 'Enter an email address'
    default:
      return ''
  }
})

const activeBlocks = computed(() => {
  return blocks.value.filter(block => block.isActive).length
})

const ipRangeBlocks = computed(() => {
  return blocks.value.filter(block => block.type === 'ip_range').length
})

const fetchBlocks = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await useApi().get('/admin/blocks')
    blocks.value = response.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch blocks'
    console.error('Failed to fetch blocks:', err)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    formLoading.value = true
    formError.value = ''

    // Validate required fields
    if (!formData.value.reason.trim()) {
      formError.value = 'Reason is required'
      formLoading.value = false
      return
    }

    const payload = {
      ...formData.value,
      reason: formData.value.reason.trim(),
      expiresAt: formData.value.expiresAt ? new Date(formData.value.expiresAt).getTime() : undefined
    }
    
    if (!editingBlock.value) {
      await useApi().post('/admin/blocks', payload)
    } else {
      await useApi().put(`/admin/blocks/${editingBlock.value._id}`, payload)
    }
    
    await fetchBlocks()
    closeModal()
  } catch (err: any) {
    formError.value = err.response?.data?.message || 'Failed to save block'
    console.error('Failed to save block:', err)
  } finally {
    formLoading.value = false
  }
}

const editBlock = (block: Block) => {
  editingBlock.value = block
  formData.value = {
    type: block.type,
    value: block.value,
    reason: block.reason || '',
    expiresAt: block.expiresAt ? new Date(block.expiresAt).toISOString().slice(0, 16) : '',
    isActive: block.isActive
  }
  showAddBlockModal.value = true
}

const deleteBlock = async (blockId: string) => {
  if (!confirm('Are you sure you want to delete this block? This action cannot be undone.')) {
    return
  }
  
  try {
    loading.value = true
    error.value = ''
    
    await useApi().delete(`/admin/blocks/${blockId}`)
    await fetchBlocks()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to delete block'
    console.error('Failed to delete block:', err)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  showAddBlockModal.value = false
  editingBlock.value = null
  formData.value = {
    type: 'ip',
    value: '',
    reason: '',
    expiresAt: '',
    isActive: true
  }
  formError.value = ''
}

fetchBlocks()
</script> 