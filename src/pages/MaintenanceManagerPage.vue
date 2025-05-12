<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Maintenance Manager</h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage server maintenance mode settings
        </p>
      </div>

      <!-- Maintenance Settings Form -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Maintenance Settings</h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>Configure maintenance mode settings for the server</p>
          </div>
          <form @submit.prevent="saveSettings" class="mt-5 space-y-6">
            <!-- Maintenance Mode Toggle -->
            <div>
              <label for="maintenance_mode" class="block text-sm font-medium text-gray-700">
                Maintenance Mode
              </label>
              <div class="mt-1">
                <select
                  id="maintenance_mode"
                  v-model="settings.maintenance_mode"
                  class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option :value="'true'">Enabled</option>
                  <option :value="'false'">Disabled</option>
                </select>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Enable or disable maintenance mode for the server
              </p>
            </div>

            <!-- Maintenance Message -->
            <div>
              <label for="maintenance_message" class="block text-sm font-medium text-gray-700">
                Maintenance Message (English)
              </label>
              <div class="mt-1">
                <textarea
                  id="maintenance_message"
                  v-model="settings.maintenance_message"
                  rows="3"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Message shown to users during maintenance (English)
              </p>
            </div>

            <!-- Maintenance Message (Persian) -->
            <div>
              <label for="maintenance_message_fa" class="block text-sm font-medium text-gray-700">
                Maintenance Message (Persian)
              </label>
              <div class="mt-1">
                <textarea
                  id="maintenance_message_fa"
                  v-model="settings.maintenance_message_fa"
                  rows="3"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Message shown to users during maintenance (Persian)
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
import { defineComponent, reactive, onMounted } from 'vue';
import {useApi} from '@/composables/useApi';
import { useToast } from 'vue-toastification';

export default defineComponent({
  name: 'MaintenanceManager',
  setup() {
    const toast = useToast();
    const settings = reactive({
      maintenance_mode: 'false',
      maintenance_message: 'The server is under maintenance. Please try again later.',
      maintenance_message_fa: 'سرور در حالت نگهداری است. لطفاً بعداً دوباره تلاش کنید.'
    });

    const fetchSettings = async () => {
      try {
        const response = await useApi().get('/admin/settings/all', {
          params: {
            section: 'maintenance'
          }
        });

        const maintenanceSettings = response.data.settings.filter(
          (setting: any) => setting.key.startsWith('maintenance_')
        );

        // Reset settings to default values
        settings.maintenance_mode = 'false';
        settings.maintenance_message = 'The server is under maintenance. Please try again later.';
        settings.maintenance_message_fa = 'سرور در حالت نگهداری است. لطفاً بعداً دوباره تلاش کنید.';

        // Update settings with fetched values
        maintenanceSettings.forEach((setting: any) => {
          const key = setting.key as keyof typeof settings;
          if (key in settings) {
            if (key === 'maintenance_mode') {
              settings[key] = String(setting.value).toLowerCase();
            } else {
              settings[key] = setting.value;
            }
          }
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to fetch maintenance settings');
      }
    };

    const saveSettings = async () => {
      try {
        const promises = Object.entries(settings).map(([key, value]) => {
          returnuseApi().put(`/admin/settings/${key}`, {
            value,
            section: 'maintenance',
            platform: 'all',
            isPublic: true
          });
        });

        await Promise.all(promises);
        toast.success('Maintenance settings saved successfully');
      } catch (error) {
        console.error('Error saving settings:', error);
        toast.error('Failed to save maintenance settings');
      }
    };

    const resetForm = () => {
      fetchSettings();
    };

    onMounted(() => {
      fetchSettings();
    });

    return {
      settings,
      saveSettings,
      resetForm
    };
  }
});
</script> 