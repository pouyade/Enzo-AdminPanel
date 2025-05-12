<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Plans Management</h1>
        <p class="mt-2 text-sm text-gray-700">Manage subscription plans and pricing.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="showAddPlanModal = true"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Plan
        </button>
      </div>
    </div>

    <!-- Plans Grid -->
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="plan in plans" :key="plan._id" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ plan.name }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ plan.durationDays }} days</p>
            </div>
            <div class="text-2xl font-bold text-gray-900">{{ formatIRTPrice(plan.price) }}</div>
          </div>
          
          <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-900">Features:</h4>
            <ul class="mt-2 space-y-2">
              <li v-for="(feature, index) in plan.features" :key="index" class="flex items-start">
                <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <div class="ml-2">
                  <span class="text-sm text-gray-700">{{ feature.feature_key }}: {{ feature.feature_value }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-6 flex space-x-3">
            <button
              @click="editPlan(plan)"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            <button
              @click="deletePlan(plan._id)"
              class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Plan Modal -->
    <div v-if="showAddPlanModal || editingPlan" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">{{ editingPlan ? 'Edit Plan' : 'Add New Plan' }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                v-model="formData.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Duration (days)</label>
              <input
                type="number"
                v-model="formData.durationDays"
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Price (IRT)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  v-model="formData.price"
                  min="0"
                  step="1000"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                >
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-sm">{{ formatIRTPrice(formData.price) }}</span>
                </div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Features</label>
              <div class="mt-2 space-y-4">
                <div v-for="(feature, index) in formData.features" :key="index" class="flex items-center space-x-2">
                  <div class="flex-1 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      v-model="feature.feature_key"
                      placeholder="Feature Key"
                      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                    <input
                      type="text"
                      v-model="feature.feature_value"
                      placeholder="Feature Value"
                      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>
                  <button
                    type="button"
                    @click="removeFeature(index)"
                    class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="flex-1 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      v-model="newFeature.feature_key"
                      placeholder="New Feature Key"
                      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                    <input
                      type="text"
                      v-model="newFeature.feature_value"
                      placeholder="New Feature Value"
                      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>
                  <button
                    type="button"
                    @click="addFeature"
                    class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
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
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>{{ editingPlan ? 'Save Changes' : 'Add Plan' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useApi} from '@/composables/useApi'

interface PlanFeature {
  _id?: string;
  feature_key: string;
  feature_value: string;
}

interface Plan {
  _id: string;
  name: string;
  durationDays: number;
  price: number;
  features: PlanFeature[];
  isActive: boolean;
  createdAt: number;
}

// Form data interface
interface PlanFormData {
  name: string;
  durationDays: number;
  price: number;
  features: PlanFeature[];
}



const plans = ref<Plan[]>([])
const loading = ref(false)
const showAddPlanModal = ref(false)
const editingPlan = ref<Plan | null>(null)

// Format IRT price
const formatIRTPrice = (price: number): string => {
  return new Intl.NumberFormat('fa-IR', { 
    style: 'currency', 
    currency: 'IRR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(price);
};

// Initialize formData with empty features array
const formData = ref<PlanFormData>({
  name: '',
  durationDays: 30,
  price: 0,
  features: []
})

// Initialize newFeature with empty strings
const newFeature = ref<PlanFeature>({
  feature_key: '',
  feature_value: ''
})

const fetchPlans = async () => {
  try {
    loading.value = true
    const response = await useApi().get('/admin/plans')
    plans.value = response.data.map((plan: any) => ({
      _id: plan._id || plan.id,
      name: plan.name,
      durationDays: plan.durationDays,
      price: plan.price,
      features: plan.features || [],
      isActive: plan.isActive,
      createdAt: plan.createdAt
    }))
    console.log('Fetched plans:', plans.value)
  } catch (error: any) {
    console.error('Failed to fetch plans:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    
    if (editingPlan.value) {
      if (!editingPlan.value._id) {
        console.error('Plan ID is undefined:', editingPlan.value);
        alert('Error: Plan ID is undefined. Cannot update plan.');
        return;
      }
      
      console.log(`Updating plan ${editingPlan.value._id}:`, formData.value);
      await useApi().put(`/admin/plans/${editingPlan.value._id}`, {
        name: formData.value.name,
        durationDays: parseInt(formData.value.durationDays.toString()),
        price: parseFloat(formData.value.price.toString()),
        features: formData.value.features,
        isActive: editingPlan.value.isActive
      })
    } else {
      console.log('Creating new plan:', formData.value);
      await useApi().post('/admin/plans', {
        name: formData.value.name,
        durationDays: parseInt(formData.value.durationDays.toString()),
        price: parseFloat(formData.value.price.toString()),
        features: formData.value.features,
        isActive: true
      })
    }
    
    await fetchPlans()
    closeModal()
  } catch (error: any) {
    console.error('Failed to save plan:', error)
    alert(`Failed to save plan: ${error.response?.data?.message || error.message}`)
  } finally {
    loading.value = false
  }
}

const editPlan = (plan: Plan) => {
  if (!plan._id) {
    console.error('Plan ID is undefined:', plan);
    alert('Error: Plan ID is undefined. Cannot edit plan.');
    return;
  }
  
  console.log('Editing plan:', plan);
  
  editingPlan.value = {
    ...plan,
    _id: plan._id
  }
  
  formData.value = {
    name: plan.name,
    durationDays: plan.durationDays,
    price: plan.price,
    features: [...plan.features]
  }
  
  showAddPlanModal.value = true
}

const deletePlan = async (planId: string) => {
  // Check if plan ID is defined
  if (!planId) {
    console.error('Plan ID is undefined');
    alert('Error: Plan ID is undefined. Cannot delete plan.');
    return;
  }
  
  if (!confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
    return;
  }
  
  try {
    loading.value = true;
    console.log(`Deleting plan ${planId}`);
    await useApi().delete(`/admin/plans/${planId}`);
    await fetchPlans();
  } catch (error: any) {
    console.error('Failed to delete plan:', error);
    alert(`Failed to delete plan: ${error.response?.data?.message || error.message}`);
  } finally {
    loading.value = false;
  }
}

const addFeature = () => {
  if (newFeature.value.feature_key.trim() && newFeature.value.feature_value.trim()) {
    formData.value.features = [...formData.value.features, {
      feature_key: newFeature.value.feature_key.trim(),
      feature_value: newFeature.value.feature_value.trim()
    }]
    // Reset the newFeature input fields
    newFeature.value = {
      feature_key: '',
      feature_value: ''
    }
  }
}

const removeFeature = (index: number) => {
  formData.value.features = formData.value.features.filter((_, i) => i !== index)
}

const closeModal = () => {
  showAddPlanModal.value = false
  editingPlan.value = null
  formData.value = {
    name: '',
    durationDays: 30,
    price: 0,
    features: []
  }
  newFeature.value = {
    feature_key: '',
    feature_value: ''
  }
}

onMounted(() => {
  fetchPlans()
})
</script> 