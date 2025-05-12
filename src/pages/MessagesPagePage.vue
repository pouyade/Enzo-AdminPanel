<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">User Messages</h1>
      <div v-for="msg in messages" :key="msg._id" class="mb-4 p-4 bg-gray-100 rounded">
        <p><strong>{{ msg.userId.username }}:</strong> {{ msg.content }}</p>
        <p v-if="msg.response" class="text-green-600">Response: {{ msg.response }}</p>
        <textarea v-model="responses[msg._id]" class="w-full p-2 mt-2 border rounded"></textarea>
        <button @click="respond(msg._id)" class="mt-2 bg-blue-500 text-white p-2 rounded">Send Response</button>
      </div>
    </div>
  </template>
  
  <script>
  import {useApi} from '@/composables/useApi'
  
  export default {
    data() {
      return {
        messages: [],
        loading: false,
        error: null,
        newMessage: '',
        responses: {}
      };
    },
    async mounted() {
      try {
        this.loading = true;
        const res = await useApi().get('/admin/messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.messages = res.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    methods: {
      async respond(id) {
        const token = localStorage.getItem('token');
        const response = this.responses[id];
        await useApi().post(
          `/admin/messages/${id}/respond`,
          { response },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const msg = this.messages.find((m) => m._id === id);
        msg.response = response;
        this.responses[id] = '';
      },
      async sendMessage() {
        if (!this.newMessage.trim()) return;
        
        try {
          await useApi().post('/admin/messages', {
            content: this.newMessage,
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          
          // Refresh messages
          const res = await useApi().get('/admin/messages', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.messages = res.data;
          this.newMessage = '';
        } catch (error) {
          this.error = error;
        }
      },
    },
  };
  </script>