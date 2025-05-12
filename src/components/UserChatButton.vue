<template>
  <button
    @click="handleClick"
    :class="[
      isDropdownItem 
        ? 'flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200' 
        : 'text-blue-600 hover:text-blue-900 mr-4'
    ]"
    title="Open chat with this user"
  >
    <template v-if="isDropdownItem">
      <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </template>
    Chat
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
  userId: string;
  isDropdownItem?: boolean;
}>();

const emit = defineEmits(['closeDropdown']);

const handleClick = () => {
  // Store the user ID in localStorage
  localStorage.setItem('selectedChatUserId', props.userId);
  
  // Emit close dropdown event if it's a dropdown item
  if (props.isDropdownItem) {
    emit('closeDropdown');
  }
  
  // Navigate to the support page
  router.push('/dashboard/support');
};
</script> 