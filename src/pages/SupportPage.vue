<template>
  <div class="p-6 h-full bg-gray-50 dark:bg-gray-900">
    <!-- Stats Cards -->
    <div class="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Conversations -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Total Conversations</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">{{ conversations.length }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Unread Messages -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Unread Messages</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">{{ totalUnread }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Messages -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Total Messages</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">{{ totalMessages }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Users -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Active Users</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">{{ activeUsers }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex h-full bg-white dark:bg-gray-800 rounded-lg shadow">
      <!-- Conversation List -->
      <div class="w-1/3 border-r border-gray-200 dark:border-gray-700 h-full overflow-hidden flex flex-col">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Support Messages</h2>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ totalUnread }} unread messages
          </div>
        </div>
        <div class="overflow-y-auto flex-1">
          <div 
            v-for="conv in conversations" 
            :key="conv.userId"
            @click="selectConversation(conv)"
            class="p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            :class="{ 'bg-blue-50 dark:bg-blue-900/20': selectedUserId === conv.userId }"
          >
            <div class="flex justify-between items-start">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">{{ conv.userName || conv.userEmail }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {{ formatLastMessage(conv.lastMessage) }}
                </div>
              </div>
              <div v-if="conv.unreadCount > 0" class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {{ conv.unreadCount }}
              </div>
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500 mt-2">
              {{ formatTime(conv.lastMessage.timestamp) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="flex-1 h-full flex flex-col" v-if="selectedUserId">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ selectedConversation?.userName || selectedConversation?.userEmail }}</h3>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ selectedConversation?.totalMessages }} messages</div>
          </div>
          <div>
            <button 
              @click="confirmDeleteAllMessages" 
              class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded border border-red-300 dark:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm flex items-center"
              title="Delete all messages with this user"
            >
              <i class="fas fa-trash-alt mr-1"></i> Delete All Messages
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800" ref="messagesContainer">
          <div v-for="message in messages" :key="message._id" class="mb-4">
            <div 
              :class="[
                'max-w-[70%] rounded-lg p-3',
                message.isFromAdmin ? 
                  'bg-blue-500 text-white ml-auto' : 
                  'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              ]"
            >
              <!-- Text message -->
              <div v-if="message.content">{{ message.content }}</div>
              
              <!-- Photo message -->
              <div v-if="message.photo" class="mt-2">
                <img 
                  :src="getImageUrl(message.photo.url)" 
                  :alt="message.photo.filename"
                  class="rounded-lg max-w-full cursor-pointer"
                  :style="{
                    maxHeight: '300px',
                    width: 'auto'
                  }"
                  @click="openImage(message.photo.url)"
                />
              </div>
              
              <div 
                :class="[
                  'text-xs mt-1',
                  message.isFromAdmin ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                ]"
              >
                {{ formatTime(message.timestamp) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex gap-2">
            <input
              v-model="newMessage"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Type a message..."
              class="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <!-- Photo upload button -->
            <button
              @click="triggerFileInput"
              class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none"
              :disabled="isUploading"
            >
              <i class="fas fa-image"></i>
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            <button
              @click="sendMessage"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none"
              :disabled="!newMessage.trim() || isUploading"
            >
              <span v-if="!isUploading">Send</span>
              <i v-else class="fas fa-spinner fa-spin"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Select a conversation to start messaging
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import {useApi} from '@/composables/useApi';
import { getImageUrl } from '@/utils/imageUrl';

interface Photo {
  filename: string;
  url: string;
  width: number;
  height: number;
}

interface Message {
  _id: string;
  content: string;
  photo?: Photo;
  timestamp: number;
  isFromAdmin: boolean;
  isRead: boolean;
}

interface Conversation {
  userId: string;
  userEmail: string;
  userName?: string;
  lastMessage: {
    content: string;
    photo?: Photo;
    timestamp: number;
    isFromAdmin: boolean;
  };
  unreadCount: number;
  totalMessages: number;
}

const conversations = ref<Conversation[]>([]);
const messages = ref<Message[]>([]);
const selectedUserId = ref<string | null>(null);
const newMessage = ref('');
const totalUnread = ref(0);
const messagesContainer = ref<HTMLElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isUploading = ref(false);

const selectedConversation = computed(() => 
  conversations.value.find(c => c.userId === selectedUserId.value)
);

const totalMessages = computed(() => {
  return conversations.value.reduce((sum, conv) => sum + conv.totalMessages, 0);
});

const activeUsers = computed(() => {
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
  return conversations.value.filter(conv => conv.lastMessage.timestamp > twentyFourHoursAgo).length;
});

// Format timestamp to relative time
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
};

// Format last message preview
const formatLastMessage = (lastMessage: Conversation['lastMessage']) => {
  if (lastMessage.photo) return '📷 Photo';
  return lastMessage.content.length > 50 
    ? lastMessage.content.substring(0, 47) + '...' 
    : lastMessage.content;
};

// Fetch conversations
const fetchConversations = async () => {
  try {
    const response = await useApi().get('/admin/support/conversations');
    conversations.value = response.data.conversations;
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
  }
};

// Fetch messages for selected conversation
const fetchMessages = async () => {
  if (!selectedUserId.value) return;
  
  try {
    const response = await useApi().get(`/admin/support/messages/${selectedUserId.value}`);
    messages.value = response.data.messages;
    await nextTick();
    scrollToBottom();
  } catch (error) {
    console.error('Failed to fetch messages:', error);
  }
};

// Fetch unread counts
const fetchUnreadCounts = async () => {
  try {
    const response = await useApi().get('/admin/support/unread');
    totalUnread.value = response.data.total;
  } catch (error) {
    console.error('Failed to fetch unread counts:', error);
  }
};

// Confirm and delete all messages for the selected user
const confirmDeleteAllMessages = async () => {
  if (!selectedUserId.value) return;
  
  const userIdentifier = selectedConversation.value?.userName || 
                         selectedConversation.value?.userEmail || 
                         'this user';
  
  if (!confirm(`Are you sure you want to delete all messages with ${userIdentifier}? This action cannot be undone.`)) {
    return;
  }
  
  try {
    const response = await useApi().delete(`/admin/support/messages/${selectedUserId.value}`);
    
    if (response.data.success) {
      // Clear the messages array
      messages.value = [];
      
      // Update the conversations list
      await fetchConversations();
      
      // Update unread counts
      await fetchUnreadCounts();
      
      alert(`Successfully deleted ${response.data.deletedCount} messages.`);
    }
  } catch (error) {
    console.error('Failed to delete messages:', error);
    alert('Failed to delete messages. Please try again.');
  }
};

// Select conversation
const selectConversation = (conversation: Conversation) => {
  selectedUserId.value = conversation.userId;
};

// Send message
const sendMessage = async () => {
  if (!selectedUserId.value || !newMessage.value.trim()) return;

  try {
    const response = await useApi().post(`/admin/support/messages/${selectedUserId.value}`, {
      content: newMessage.value
    });
    
    messages.value.push(response.data);
    newMessage.value = '';
    await nextTick();
    scrollToBottom();
    
    // Update conversation list
    await fetchConversations();
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

// Scroll to bottom of messages
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Watch for conversation selection
watch(selectedUserId, () => {
  if (selectedUserId.value) {
    fetchMessages();
  }
  messages.value = [];
});

// Handle file selection
const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length || !selectedUserId.value) return;

  const file = input.files[0];
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file');
    return;
  }

  try {
    isUploading.value = true;
    
    // Create FormData
    const formData = new FormData();
    formData.append('photo', file);

    // Upload photo
    const response = await useApi().post(`/admin/support/messages/${selectedUserId.value}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    messages.value.push(response.data);
    await nextTick();
    scrollToBottom();
    
    // Update conversation list
    await fetchConversations();
  } catch (error) {
    console.error('Failed to upload photo:', error);
    alert('Failed to upload photo');
  } finally {
    isUploading.value = false;
    if (fileInput.value) {
      fileInput.value.value = ''; // Reset file input
    }
  }
};

// Trigger file input click
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const openImage = (url: string) => {
  window.open(getImageUrl(url), '_blank');
};

// Check for selected user ID in localStorage
const checkForSelectedUser = async () => {
  const userIdParam = localStorage.getItem('selectedChatUserId');
  
  if (userIdParam) {
    // Find the conversation for this user
    const conversation = conversations.value.find(conv => conv.userId === userIdParam);
    if (conversation) {
      // Select this conversation
      selectConversation(conversation);
      await fetchMessages();
      
      // Clear the localStorage item
      localStorage.removeItem('selectedChatUserId');
    }
  }
};

// Initial fetch
onMounted(async () => {
  await fetchConversations();
  await fetchUnreadCounts();
  
  // Check for selected user
  await checkForSelectedUser();
  
  // Set up polling for new messages and counts
  setInterval(() => {
    fetchConversations();
    fetchUnreadCounts();
    if (selectedUserId.value) {
      fetchMessages();
    }
  }, 10000); // Poll every 10 seconds
});
</script>

<style scoped>
.max-w-\[70\%\] img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Force light mode colors when dark mode is off */
:root:not(.dark) .bg-white {
  background-color: white !important;
}

:root:not(.dark) .bg-gray-50 {
  background-color: #f9fafb !important;
}

:root:not(.dark) .bg-gray-100 {
  background-color: #f3f4f6 !important;
}

:root:not(.dark) .text-gray-900 {
  color: #111827 !important;
}

:root:not(.dark) .text-gray-500 {
  color: #6b7280 !important;
}

:root:not(.dark) .text-gray-400 {
  color: #9ca3af !important;
}

:root:not(.dark) .border-gray-200 {
  border-color: #e5e7eb !important;
}

/* Fix dark mode transitioning */
.dark .dark\:bg-gray-900 {
  background-color: #111827 !important;
}

.dark .dark\:bg-gray-800 {
  background-color: #1f2937 !important;
}

.dark .dark\:bg-gray-700 {
  background-color: #374151 !important;
}

.dark .dark\:text-white {
  color: white !important;
}

.dark .dark\:text-gray-300 {
  color: #d1d5db !important;
}

.dark .dark\:text-gray-400 {
  color: #9ca3af !important;
}

.dark .dark\:border-gray-700 {
  border-color: #374151 !important;
}

/* Improved transition handling */
.bg-gray-50,
.bg-white,
.bg-gray-100,
.bg-gray-800,
.bg-gray-700,
.text-gray-500,
.text-gray-900,
.text-gray-400,
.text-gray-300,
.text-white,
.border-gray-200,
.border-gray-700,
.dark\:bg-gray-900,
.dark\:bg-gray-800,
.dark\:bg-gray-700,
.dark\:text-white,
.dark\:text-gray-300,
.dark\:text-gray-400,
.dark\:text-gray-500,
.dark\:border-gray-700 {
  transition-property: background-color, color, border-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

/* Override for elements that shouldn't transition */
.bg-blue-500,
.bg-red-500,
.bg-green-500,
.bg-purple-500,
button:active,
button:focus {
  transition: none;
}
</style> 