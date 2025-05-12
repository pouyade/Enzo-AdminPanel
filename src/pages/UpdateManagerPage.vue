<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Update Manager</h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage app update settings for different platforms
        </p>
      </div>

      <!-- Platform Selection -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Platform</h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>Select the platform to manage update settings for</p>
          </div>
          <div class="mt-5">
            <div class="flex space-x-4">
              <button
                v-for="platform in platforms"
                :key="platform.value"
                @click="selectedPlatform = platform.value"
                :class="[
                  selectedPlatform === platform.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50',
                  'px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                ]"
              >
                {{ platform.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Update Settings Form -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Update Settings</h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>Configure update settings for {{ getPlatformLabel(selectedPlatform) }}</p>
          </div>
          <form @submit.prevent="saveSettings" class="mt-5 space-y-6">
            <!-- Update Available -->
            <div>
              <label for="update_available" class="block text-sm font-medium text-gray-700">
                Update Available
              </label>
              <div class="mt-1">
                <select
                  id="update_available"
                  v-model="settings.update_available"
                  class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option :value="'true'">Yes</option>
                  <option :value="'false'">No</option>
                </select>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Whether an update is available for the app
              </p>
            </div>

            <!-- Force Update -->
            <div>
              <label for="update_force" class="block text-sm font-medium text-gray-700">
                Force Update
              </label>
              <div class="mt-1">
                <select
                  id="update_force"
                  v-model="settings.update_force"
                  class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option :value="'true'">Yes</option>
                  <option :value="'false'">No</option>
                </select>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Whether the update is mandatory
              </p>
            </div>

            <!-- Update URL -->
            <div>
              <label for="update_url" class="block text-sm font-medium text-gray-700">
                Update URL
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  id="update_url"
                  v-model="settings.update_url"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                URL where the update can be downloaded from
              </p>
            </div>

            <!-- Version Code -->
            <div>
              <label for="update_version_code" class="block text-sm font-medium text-gray-700">
                Version Code
              </label>
              <div class="mt-1">
                <input
                  type="number"
                  id="update_version_code"
                  v-model="settings.update_version_code"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Numeric version code of the update
              </p>
            </div>

            <!-- Version Name -->
            <div>
              <label for="update_version" class="block text-sm font-medium text-gray-700">
                Version Name
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  id="update_version"
                  v-model="settings.update_version"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Human-readable version name (e.g., 1.0.0)
              </p>
            </div>

            <!-- Update Logo -->
            <div>
              <label for="update_logo" class="block text-sm font-medium text-gray-700">
                Update Logo URL
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  id="update_logo"
                  v-model="settings.update_logo"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                URL for the update logo image
              </p>
            </div>

            <!-- Update Title -->
            <div>
              <label for="update_title" class="block text-sm font-medium text-gray-700">
                Update Title (English)
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  id="update_title"
                  v-model="settings.update_title"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Title shown in the update dialog (English)
              </p>
            </div>

            <!-- Update Title (Persian) -->
            <div>
              <label for="update_title_fa" class="block text-sm font-medium text-gray-700">
                Update Title (Persian)
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  id="update_title_fa"
                  v-model="settings.update_title_fa"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Title shown in the update dialog (Persian)
              </p>
            </div>

            <!-- Update Message -->
            <div>
              <label for="update_message" class="block text-sm font-medium text-gray-700">
                Update Message (English)
              </label>
              <div class="mt-1">
                <textarea
                  id="update_message"
                  v-model="settings.update_message"
                  rows="3"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Message shown in the update dialog (English)
              </p>
            </div>

            <!-- Update Message (Persian) -->
            <div>
              <label for="update_message_fa" class="block text-sm font-medium text-gray-700">
                Update Message (Persian)
              </label>
              <div class="mt-1">
                <textarea
                  id="update_message_fa"
                  v-model="settings.update_message_fa"
                  rows="3"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Message shown in the update dialog (Persian)
              </p>
            </div>

            <!-- Update Button Text -->
            <div>
              <label for="update_button_text" class="block text-sm font-medium text-gray-700">
                Update Button Text (English)
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  id="update_button_text"
                  v-model="settings.update_button_text"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Text shown on the update button (English)
              </p>
            </div>

            <!-- Update Button Text (Persian) -->
            <div>
              <label for="update_button_text_fa" class="block text-sm font-medium text-gray-700">
                Update Button Text (Persian)
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  id="update_button_text_fa"
                  v-model="settings.update_button_text_fa"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Text shown on the update button (Persian)
              </p>
            </div>

            <div class="pt-5">
              <div class="flex justify-end">
                <button
                  type="button"
                  @click="resetForm"
                  class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from 'vue';
import {useApi} from '@/composables/useApi';
import { useToast } from 'vue-toastification';

export default defineComponent({
  name: 'UpdateManager',
  setup() {
    const toast = useToast();
    const selectedPlatform = ref('android');
    const settings = reactive({
      update_available: 'false',
      update_force: 'false',
      update_url: '',
      update_version_code: '1',
      update_version: '1.0.0',
      update_logo: '',
      update_title: 'Update Available',
      update_title_fa: 'بروز رسانی موجود',
      update_message: 'A new version of the app is available. Please update to the latest version.',
      update_message_fa: 'یک آپدیت جدید برای برنامه موجود است. لطفاً به نسخه جدیدترین را بروز رسانی کنید.',
      update_button_text: 'Update',
      update_button_text_fa: 'بروز رسانی'
    });

    const platforms = [
      { label: 'Android', value: 'android' },
      { label: 'iOS', value: 'ios' },
      { label: 'Windows', value: 'windows' }
    ];

    const getPlatformLabel = (value: string) => {
      const platform = platforms.find(p => p.value === value);
      return platform ? platform.label : value;
    };

    const fetchSettings = async () => {
      try {
        const response = await useApi().get('/admin/settings/all', {
          params: {
            section: 'update',
            platform: selectedPlatform.value
          }
        });

        const updateSettings = response.data.settings.filter(
          (setting: any) => setting.key.startsWith('update_')
        );

        // Reset settings object with default values
        settings.update_available = 'false';
        settings.update_force = 'false';
        settings.update_url = '';
        settings.update_version_code = '1';
        settings.update_version = '1.0.0';
        settings.update_logo = '';
        settings.update_title = 'Update Available';
        settings.update_title_fa = 'بروز رسانی موجود';
        settings.update_message = 'A new version of the app is available. Please update to the latest version.';
        settings.update_message_fa = 'یک آپدیت جدید برای برنامه موجود است. لطفاً به نسخه جدیدترین را بروز رسانی کنید.';
        settings.update_button_text = 'Update';
        settings.update_button_text_fa = 'بروز رسانی';

        // Update settings with fetched values
        updateSettings.forEach((setting: any) => {
          const key = setting.key as keyof typeof settings;
          if (key in settings) {
            // Ensure boolean values are stored as strings
            if (key === 'update_available' || key === 'update_force') {
              settings[key] = String(setting.value).toLowerCase();
            } else {
              settings[key] = setting.value;
            }
          }
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to fetch update settings');
      }
    };

    const saveSettings = async () => {
      try {
        const promises = Object.entries(settings).map(([key, value]) => {
          returnuseApi().put(`/admin/settings/${key}`, {
            value,
            section: 'update',
            platform: selectedPlatform.value,
            isPublic: true
          });
        });

        await Promise.all(promises);
        toast.success('Update settings saved successfully');
      } catch (error) {
        console.error('Error saving settings:', error);
        toast.error('Failed to save update settings');
      }
    };

    const resetForm = () => {
      fetchSettings();
    };

    // Watch for platform changes
    watch(selectedPlatform, () => {
      fetchSettings();
    });

    onMounted(() => {
      fetchSettings();
    });

    return {
      selectedPlatform,
      settings,
      platforms,
      getPlatformLabel,
      saveSettings,
      resetForm
    };
  }
});
</script> 