<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <!-- Stats Cards -->
    <div class="px-4 sm:px-6 lg:px-8 mb-8">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <!-- Total Settings Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CogIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Settings</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ totalSettings }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <FolderIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Categories</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ uniqueSections.length }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Public Settings Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <GlobeAltIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Public Settings</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ publicSettings }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Settings Management</h1>
          <p class="mt-2 text-sm text-gray-700">
            Manage all system settings including general configuration, security, and email settings.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            @click="openAddModal"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Setting
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            v-model="filters.search"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search settings..."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <select
            v-model="filters.section"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            <option v-for="section in uniqueSections" :key="section" :value="section">
              {{ section }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Platform</label>
          <select
            v-model="filters.platform"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Platforms</option>
            <option v-for="platform in platforms" :key="platform" :value="platform">
              {{ platform }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Visibility</label>
          <select
            v-model="filters.isPublic"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Key</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Value</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Section</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Platform</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Visibility</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="setting in filteredSettings" :key="setting.key">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {{ setting.key }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ setting.value }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ setting.section }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ setting.platform }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        :class="[
                          setting.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                        ]"
                      >
                        {{ setting.isPublic ? 'Public' : 'Private' }}
                      </span>
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        @click="editSetting(setting)"
                        class="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteSetting(setting)"
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
    </div>

    <!-- Add/Edit Modal -->
    <TransitionRoot as="template" :show="showModal">
      <Dialog as="div" class="relative z-10" @close="closeModal">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                      {{ editMode ? 'Edit Setting' : 'Add New Setting' }}
                    </DialogTitle>
                    <div class="mt-2">
                      <form @submit.prevent="saveSetting" class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Key</label>
                          <input
                            type="text"
                            v-model="currentSetting.key"
                            :disabled="editMode"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Value</label>
                          <input
                            type="text"
                            v-model="currentSetting.value"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Section</label>
                          <input
                            type="text"
                            v-model="currentSetting.section"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Platform</label>
                          <select
                            v-model="currentSetting.platform"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          >
                            <option v-for="platform in platforms" :key="platform" :value="platform">
                              {{ platform }}
                            </option>
                          </select>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            v-model="currentSetting.description"
                            rows="3"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          ></textarea>
                        </div>
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            v-model="currentSetting.isPublic"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label class="ml-2 block text-sm text-gray-900">Public Setting</label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    @click="saveSetting"
                  >
                    {{ editMode ? 'Save Changes' : 'Create Setting' }}
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Confirmation Modal -->
    <TransitionRoot as="template" :show="showDeleteModal">
      <Dialog as="div" class="relative z-10" @close="closeDeleteModal">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                      Delete Setting
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Are you sure you want to delete this setting? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="confirmDelete"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    @click="closeDeleteModal"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      class="fixed bottom-4 right-4 px-4 py-2 rounded-md text-white"
      :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CogIcon, FolderIcon, GlobeAltIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import {useApi} from '@/composables/useApi'
import { Platform } from '@/enums/Platform'

interface Setting {
  key: string
  value: string
  section: string
  platform: Platform
  isPublic: boolean
  description?: string
  minAppVersion?: string
  maxAppVersion?: string
}

const settings = ref<Setting[]>([])
const uniqueSections = ref<string[]>([])
const platforms = Object.values(Platform)

const filters = ref({
  search: '',
  section: '',
  platform: '',
  isPublic: ''
})

const showModal = ref(false)
const showDeleteModal = ref(false)
const editMode = ref(false)
const currentSetting = ref<Setting>({
  key: '',
  value: '',
  section: '',
  platform: Platform.All,
  isPublic: true,
  description: ''
})
const settingToDelete = ref<Setting | null>(null)

const loading = ref(false)
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

// Computed properties
const filteredSettings = computed(() => {
  return settings.value.filter(setting => {
    const matchesSearch = !filters.value.search ||
      setting.key.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      setting.value.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      setting.description?.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesSection = !filters.value.section || setting.section === filters.value.section
    const matchesPlatform = !filters.value.platform || setting.platform === filters.value.platform
    const matchesVisibility = filters.value.isPublic === '' || setting.isPublic === (filters.value.isPublic === 'true')
    
    return matchesSearch && matchesSection && matchesPlatform && matchesVisibility
  })
})

const totalSettings = computed(() => settings.value.length)
const publicSettings = computed(() => settings.value.filter(s => s.isPublic).length)

// Methods
const showToast = (message: string, type: 'success' | 'error') => {
  toast.value = {
    show: true,
    message,
    type
  }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const fetchSettings = async () => {
  try {
    loading.value = true
    const response = await useApi().get('/admin/settings/all')
    settings.value = response.data.settings
    uniqueSections.value = response.data.sections
  } catch (err: any) {
    showToast(err.response?.data?.message || 'Failed to fetch settings', 'error')
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editMode.value = false
  currentSetting.value = {
    key: '',
    value: '',
    section: '',
    platform: Platform.All,
    isPublic: true,
    description: ''
  }
  showModal.value = true
}

const editSetting = (setting: Setting) => {
  editMode.value = true
  currentSetting.value = { ...setting }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  currentSetting.value = {
    key: '',
    value: '',
    section: '',
    platform: Platform.All,
    isPublic: true,
    description: ''
  }
}

const saveSetting = async () => {
  try {
    loading.value = true
    if (editMode.value) {
      await useApi().put(`/admin/settings/${currentSetting.value.key}`, currentSetting.value)
      showToast('Setting updated successfully', 'success')
    } else {
      await useApi().post('/admin/settings/create', currentSetting.value)
      showToast('Setting created successfully', 'success')
    }
    await fetchSettings()
    closeModal()
  } catch (err: any) {
    showToast(err.response?.data?.message || 'Failed to save setting', 'error')
  } finally {
    loading.value = false
  }
}

const deleteSetting = (setting: Setting) => {
  settingToDelete.value = setting
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  settingToDelete.value = null
}

const confirmDelete = async () => {
  if (!settingToDelete.value) return
  
  try {
    loading.value = true
    await useApi().delete(`/admin/settings/${settingToDelete.value.key}`)
    showToast('Setting deleted successfully', 'success')
    await fetchSettings()
    closeDeleteModal()
  } catch (err: any) {
    showToast(err.response?.data?.message || 'Failed to delete setting', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSettings()
})
</script> 