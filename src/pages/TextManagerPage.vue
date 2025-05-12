<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <!-- Stats Cards -->
    <div class="px-4 sm:px-6 lg:px-8 mb-8">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <!-- Total Texts Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <DocumentTextIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Texts</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ totalTexts }}</div>
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

        <!-- Active Texts Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Active Texts</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ activeTexts }}</div>
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
          <h1 class="text-xl font-semibold text-gray-900">Text Management</h1>
          <p class="mt-2 text-sm text-gray-700">
            Manage all program texts and messages in multiple languages.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            @click="openAddModal"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Text
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            v-model="filters.search"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search texts..."
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
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="filters.isActive"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
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
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">English Title</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Persian Title</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Section</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="text in filteredTexts" :key="text.key">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {{ text.key }}
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500">
                      <div class="max-w-xs truncate">{{ text.title }}</div>
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500">
                      <div class="max-w-xs truncate">{{ text.title_fa }}</div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ text.section }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        :class="[
                          text.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                        ]"
                      >
                        {{ text.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        @click="editText(text)"
                        class="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteText(text)"
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
                      {{ editMode ? 'Edit Text' : 'Add New Text' }}
                    </DialogTitle>
                    <div class="mt-2">
                      <form @submit.prevent="saveText" class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Key</label>
                          <input
                            type="text"
                            v-model="currentText.key"
                            :disabled="editMode"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">English Title</label>
                          <input
                            type="text"
                            v-model="currentText.title"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Persian Title</label>
                          <input
                            type="text"
                            v-model="currentText.title_fa"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <div class="flex justify-between items-center">
                            <label class="block text-sm font-medium text-gray-700">English Content</label>
                            <button 
                              type="button" 
                              @click="toggleEditor('en')"
                              class="text-xs text-indigo-600 hover:text-indigo-900"
                            >
                              {{ showHtmlEditor.en ? 'Show HTML' : 'Show Editor' }}
                            </button>
                          </div>
                          <QuillEditor
                            v-if="showHtmlEditor.en"
                            v-model:content="currentText.content"
                            :options="editorConfig"
                            contentType="html"
                            class="mt-1 h-[200px]"
                          />
                          <textarea
                            v-else
                            v-model="currentText.content"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                            rows="8"
                          ></textarea>
                        </div>
                        <div>
                          <div class="flex justify-between items-center">
                            <label class="block text-sm font-medium text-gray-700">Persian Content</label>
                            <button 
                              type="button" 
                              @click="toggleEditor('fa')"
                              class="text-xs text-indigo-600 hover:text-indigo-900"
                            >
                              {{ showHtmlEditor.fa ? 'Show HTML' : 'Show Editor' }}
                            </button>
                          </div>
                          <QuillEditor
                            v-if="showHtmlEditor.fa"
                            v-model:content="currentText.content_fa"
                            :options="editorConfigFa"
                            contentType="html"
                            class="mt-1 h-[200px]"
                          />
                          <textarea
                            v-else
                            v-model="currentText.content_fa"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                            rows="8"
                          ></textarea>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Section</label>
                          <input
                            type="text"
                            v-model="currentText.section"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            v-model="currentText.description"
                            rows="2"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          ></textarea>
                        </div>
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            v-model="currentText.isActive"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label class="ml-2 block text-sm text-gray-900">Active</label>
                        </div>
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            v-model="currentText.shouldAccept"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label class="ml-2 block text-sm text-gray-900">Requires Acceptance</label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    @click="saveText"
                  >
                    {{ editMode ? 'Save Changes' : 'Create Text' }}
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
                      Delete Text
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Are you sure you want to delete this text? This action cannot be undone.
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { DocumentTextIcon, FolderIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline/index.js'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {useApi} from '@/composables/useApi'
import { useToast } from 'vue-toastification'

interface IAppText {
  key: string
  title: string
  title_fa: string
  content: string
  content_fa: string
  section: string
  description?: string
  isActive: boolean
  shouldAccept: boolean
}

const texts = ref<IAppText[]>([])
const uniqueSections = ref<string[]>([])

const filters = ref({
  search: '',
  section: '',
  isActive: ''
})

const showModal = ref(false)
const showDeleteModal = ref(false)
const editMode = ref(false)
const currentText = ref<IAppText>({
  key: '',
  title: '',
  title_fa: '',
  content: '',
  content_fa: '',
  section: '',
  description: '',
  isActive: true,
  shouldAccept: false
})
const textToDelete = ref<IAppText | null>(null)

// Toggle between HTML editor and raw HTML view
const showHtmlEditor = ref({
  en: true,
  fa: true
})

const loading = ref(false)
const toast = useToast()

// Editor configuration
const editorConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  }
}

const editorConfigFa = {
  ...editorConfig,
  modules: {
    ...editorConfig.modules
  },
  direction: 'rtl'
}

// Computed properties
const filteredTexts = computed(() => {
  return texts.value.filter(text => {
    const matchesSearch = !filters.value.search ||
      text.key.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      text.content.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      text.content_fa.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      text.description?.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesSection = !filters.value.section || text.section === filters.value.section
    const matchesStatus = filters.value.isActive === '' || text.isActive === (filters.value.isActive === 'true')
    
    return matchesSearch && matchesSection && matchesStatus
  })
})

const totalTexts = computed(() => texts.value.length)
const activeTexts = computed(() => texts.value.filter(t => t.isActive).length)

// Methods
const fetchTexts = async () => {
  try {
    loading.value = true
    const response = await useApi().get('/admin/texts/all')
    texts.value = response.data.texts
    uniqueSections.value = response.data.sections
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to fetch texts')
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editMode.value = false
  currentText.value = {
    key: '',
    title: '',
    title_fa: '',
    content: '',
    content_fa: '',
    section: '',
    description: '',
    isActive: true,
    shouldAccept: false
  }
  // Reset editor view to default
  showHtmlEditor.value = {
    en: true,
    fa: true
  }
  showModal.value = true
}

const editText = (text: IAppText) => {
  editMode.value = true
  currentText.value = { ...text }
  // Reset editor view to default
  showHtmlEditor.value = {
    en: true,
    fa: true
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  currentText.value = {
    key: '',
    title: '',
    title_fa: '',
    content: '',
    content_fa: '',
    section: '',
    description: '',
    isActive: true,
    shouldAccept: false
  }
}

const toggleEditor = (lang: 'en' | 'fa') => {
  showHtmlEditor.value[lang] = !showHtmlEditor.value[lang]
}

const saveText = async () => {
  try {
    loading.value = true
    if (editMode.value) {
      await useApi().put(`/admin/texts/${currentText.value.key}`, currentText.value)
      toast.success('Text updated successfully')
    } else {
      await useApi().post('/admin/texts/create', currentText.value)
      toast.success('Text created successfully')
    }
    await fetchTexts()
    closeModal()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to save text')
  } finally {
    loading.value = false
  }
}

const deleteText = (text: IAppText) => {
  textToDelete.value = text
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  textToDelete.value = null
}

const confirmDelete = async () => {
  if (!textToDelete.value) return
  
  try {
    loading.value = true
    await useApi().delete(`/admin/texts/${textToDelete.value.key}`)
    toast.success('Text deleted successfully')
    await fetchTexts()
    closeDeleteModal()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete text')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTexts()
})
</script> 