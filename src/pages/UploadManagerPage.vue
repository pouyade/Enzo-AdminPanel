<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Upload Manager</h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage uploaded files and upload new files
        </p>
      </div>

      <!-- Storage Information -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Storage Information</h3>
          <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <!-- Disk Usage -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-500">Disk Usage</h4>
              <div class="mt-2">
                <div class="flex justify-between text-sm">
                  <span>{{ formatFileSize(diskInfo?.used || 0) }} used</span>
                  <span>{{ formatFileSize(diskInfo?.available || 0) }} available</span>
                </div>
                <div class="mt-2 relative pt-1">
                  <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      :style="{ width: (diskInfo?.usagePercentage || 0) + '%' }"
                      :class="[
                        'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300',
                        (diskInfo?.usagePercentage || 0) > 90 ? 'bg-red-500' :
                        (diskInfo?.usagePercentage || 0) > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      ]"
                    ></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ diskUsagePercentage }}% used of {{ formatFileSize(diskInfo?.total || 0) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Upload Storage -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-500">Upload Storage Distribution</h4>
              <div class="mt-2 space-y-2">
                <div v-for="(size, type) in uploadStorageByDirectory" :key="type" class="text-sm">
                  <div class="flex justify-between">
                    <span class="capitalize">{{ type }}</span>
                    <span>{{ formatFileSize(size) }}</span>
                  </div>
                  <div class="mt-1 relative pt-1">
                    <div class="overflow-hidden h-1 text-xs flex rounded bg-gray-200">
                      <div
                        :style="{ width: getStoragePercentage(size) + '%' }"
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="text-sm font-medium mt-2">
                  Total Upload Storage: {{ formatFileSize(totalUploadStorage) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upload Section -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Upload New File</h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>Select a file to upload</p>
          </div>
          <div class="mt-5">
            <div class="flex items-center space-x-4">
              <select
                v-model="selectedType"
                class="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="avatar">Avatar</option>
                <option value="icon">Icon</option>
                <option value="message">Message Photo</option>
                <option value="other">Other File</option>
              </select>
              <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                :accept="acceptedFileTypes"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <button
                @click="uploadFile"
                :disabled="!selectedFile"
                :class="[
                  !selectedFile ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700',
                  'px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                ]"
              >
                Upload
              </button>
            </div>
            <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-4">
              <div class="relative pt-1">
                <div class="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                  <div
                    :style="{ width: uploadProgress + '%' }"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-300"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ uploadProgress }}% uploaded</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Files List -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Uploaded Files</h3>
            <div class="flex items-center space-x-4">
              <select
                v-model="filterType"
                class="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">All Types</option>
                <option value="avatars">Avatar</option>
                <option value="icons">Icon</option>
                <option value="messages">Message Photo</option>
                <option value="others">Other File</option>
              </select>
              <div class="text-sm text-gray-500">
                Total Size: {{ formatFileSize(totalSize) }}
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Preview
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            File Name
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Size
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            MIME Type
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            URL
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="file in filteredFiles" :key="file.filename">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div v-if="isImageFile(file.filename)" class="h-10 w-10">
                              <img :src="file.url" alt="Preview" class="h-10 w-10 object-cover rounded-md" />
                            </div>
                            <div v-else class="h-10 w-10 flex items-center justify-center rounded-md" :class="getFileTypeColor(file.filename)">
                              <svg v-if="getFileIcon(file.filename) === 'document'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <svg v-else-if="getFileIcon(file.filename) === 'code'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                              <svg v-else-if="getFileIcon(file.filename) === 'archive'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                              </svg>
                              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span class="absolute bottom-0 right-0 text-xs font-medium text-white bg-black bg-opacity-50 px-1 rounded">
                                {{ file.filename.split('.').pop()?.toUpperCase() }}
                              </span>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ file.filename }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ file.type }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ formatFileSize(file.size) }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ file.mimeType || '-' }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a :href="file.url" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                              Link
                            </a>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              @click="deleteFile(file)"
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
        </div>
      </div>
    
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import {useApi} from '@/composables/useApi';
import { useToast } from 'vue-toastification';

interface StorageInfo {
  uploadStorage: {
    total: number;
    byDirectory: {
      avatars: number;
      icons: number;
      messages: number;
      others: number;
    };
  };
  diskInfo: {
    total: number;
    used: number;
    available: number;
    usagePercentage: number;
  } | null;
}

interface UploadedFile {
  filename: string;
  path: string;
  url: string;
  width?: number;
  height?: number;
  type: string;
  size: number;
  mimeType?: string;
  createdAt: Date;
}

export default defineComponent({
  name: 'UploadManager',
  setup() {
    const toast = useToast();
    const selectedType = ref('avatar');
    const selectedFile = ref<File | null>(null);
    const uploadProgress = ref(0);
    const files = ref<UploadedFile[]>([]);
    const fileInput = ref<HTMLInputElement | null>(null);
    const filterType = ref('all');
    const storageInfo = ref<StorageInfo | null>(null);

    // Pagination and filters
    const page = ref(1);
    const pageSize = ref(20);
    const totalItems = ref(0);
    const ledgerItems = ref([]);
    const filters = ref({
      type: '',
      active: '',
    });

    const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

    // Computed properties for safe access to storage info
    const uploadStorageByDirectory = computed(() => {
      return storageInfo.value?.uploadStorage.byDirectory || {
        avatars: 0,
        icons: 0,
        messages: 0,
        others: 0
      };
    });

    const totalUploadStorage = computed(() => {
      return storageInfo.value?.uploadStorage.total || 0;
    });

    const diskUsagePercentage = computed(() => {
      return Math.round(storageInfo.value?.diskInfo?.usagePercentage || 0);
    });

    const diskInfo = computed(() => ({
      used: storageInfo.value?.diskInfo?.used || 0,
      available: storageInfo.value?.diskInfo?.available || 0,
      total: storageInfo.value?.diskInfo?.total || 0,
      usagePercentage: diskUsagePercentage.value
    }));

    // Helper function to calculate storage percentage
    const getStoragePercentage = (size: number): number => {
      const total = totalUploadStorage.value;
      if (total === 0) return 0;
      return (size / total) * 100;
    };

    const acceptedFileTypes = computed(() => {
      switch (selectedType.value) {
        case 'avatar':
        case 'icon':
        case 'message':
          return 'image/*';
        case 'other':
          return '*/*';
        default:
          return 'image/*';
      }
    });

    const filteredFiles = computed(() => {
      if (filterType.value === 'all') return files.value;
      return files.value.filter(file => file.type === filterType.value);
    });

    const totalSize = computed(() => {
      return filteredFiles.value.reduce((acc, file) => acc + file.size, 0);
    });

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        selectedFile.value = input.files[0];
      }
    };

    const uploadFile = async () => {
      if (!selectedFile.value) return;

      const formData = new FormData();
      formData.append('file', selectedFile.value);

      try {
        const { data } = await useApi().post(`/admin/upload/${selectedType.value}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
          },
        });
        if(data){
            toast.success('File uploaded successfully');
            await Promise.all([fetchFiles(), fetchStorageInfo()]);
        }
        
        // Reset form
        selectedFile.value = null;
        uploadProgress.value = 0;
        if (fileInput.value) {
          fileInput.value.value = '';
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Failed to upload file');
      }
    };

    const fetchFiles = async () => {
      try {
        const response = await useApi().get('/admin/uploads');
        files.value = response.data.files;
      } catch (error) {
        console.error('Error fetching files:', error);
        toast.error('Failed to fetch files');
      }
    };

    const deleteFile = async (file: UploadedFile) => {
      try {
        await useApi().delete(`/admin/upload/${file.type}/${file.filename}`);
        toast.success('File deleted successfully');
        await Promise.all([fetchFiles(), fetchStorageInfo()]); // Refresh both files and storage info
      } catch (error: any) {
        console.error('Error deleting file:', error);
        toast.error(error.response?.data?.error || 'Failed to delete file');
      }
    };

    const fetchStorageInfo = async () => {
      try {
        const { data } = await useApi().get('/admin/uploads/storage');
        storageInfo.value = data;
      } catch (error) {
        console.error('Error fetching storage info:', error);
        toast.error('Failed to fetch storage information');
      }
    };

    const isImageFile = (filename: string): boolean => {
      const ext = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
    };

    const getFileIcon = (filename: string): string => {
      const ext = filename.split('.').pop()?.toLowerCase();
      const codeExts = ['js', 'ts', 'py', 'java', 'cpp', 'html', 'css', 'php', 'json', 'xml'];
      const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz'];
      
      if (codeExts.includes(ext || '')) return 'code';
      if (archiveExts.includes(ext || '')) return 'archive';
      return 'document';
    };

    const getFileTypeColor = (filename: string): string => {
      const ext = filename.split('.').pop()?.toLowerCase();
      const codeExts = ['js', 'ts', 'py', 'java', 'cpp', 'html', 'css', 'php', 'json', 'xml'];
      const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz'];
      const documentExts = ['pdf', 'doc', 'docx', 'txt', 'rtf'];

      if (codeExts.includes(ext || '')) return 'bg-blue-600';
      if (archiveExts.includes(ext || '')) return 'bg-yellow-600';
      if (documentExts.includes(ext || '')) return 'bg-red-600';
      return 'bg-gray-600';
    };

    const formatDate = (date: string) => {
      return new Date(date).toLocaleString();
    };

    const fetchLedger = async () => {
      try {
        const params = new URLSearchParams({
          page: page.value.toString(),
          pageSize: pageSize.value.toString(),
          ...(filters.value.type && { type: filters.value.type }),
          ...(filters.value.active && { active: filters.value.active }),
        });

        const response = await useApi().get(`/admin/uploads?${params}`);
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

    onMounted(() => {
      fetchFiles();
      fetchStorageInfo();
      fetchLedger();
    });

    return {
      selectedType,
      selectedFile,
      uploadProgress,
      files,
      fileInput,
      filterType,
      filteredFiles,
      totalSize,
      formatFileSize,
      acceptedFileTypes,
      handleFileSelect,
      uploadFile,
      deleteFile,
      storageInfo,
      isImageFile,
      getFileIcon,
      getFileTypeColor,
      uploadStorageByDirectory,
      totalUploadStorage,
      diskInfo,
      diskUsagePercentage,
      getStoragePercentage,
      page,
      pageSize,
      totalPages,
      ledgerItems,
      filters,
      formatDate,
      fetchLedger
    };
  }
});
</script> 