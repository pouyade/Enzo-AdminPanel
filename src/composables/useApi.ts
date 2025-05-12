import { inject } from 'vue';
import ApiManager from '@/utils/ApiManager';

// Fallback instance for when the composable is used outside of component context
let fallbackApiManager: ApiManager | null = null;

/**
 * Set a fallback API manager instance that will be used when inject fails
 */
export function setFallbackApiManager(apiManager: ApiManager) {
  fallbackApiManager = apiManager;
}

/**
 * Composable to access the API manager
 * @returns The ApiManager instance
 */
export function useApi(): ApiManager {
  try {
    const apiManager = inject<ApiManager>('$apiManager');
    
    if (apiManager) {
      return apiManager;
    }
    
    if (fallbackApiManager) {
      return fallbackApiManager;
    }
    
    throw new Error('ApiManager not provided. Make sure EnzoAdmin is initialized correctly.');
  } catch (error) {
    if (fallbackApiManager) {
      return fallbackApiManager;
    }
    
    throw new Error('ApiManager not provided. Make sure EnzoAdmin is initialized correctly.');
  }
} 