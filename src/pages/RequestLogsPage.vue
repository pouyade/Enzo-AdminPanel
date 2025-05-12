<!-- RequestLogs.vue -->
<template>
  <div class="request-logs">
    <div class="header">
      <div class="header-top">
        <h1>Request Logs</h1>
        <button 
          @click="showClearConfirmation = true"
          class="clear-logs-btn"
        >
          Clear All Logs
        </button>
      </div>
      <div class="stats-cards">
        <div class="stat-card">
          <h3>Total Requests</h3>
          <p>{{ stats.totalRequests || 0 }}</p>
        </div>
        <div class="stat-card">
          <h3>Average Duration</h3>
          <p>{{ formatDuration(stats.averageDuration) }}</p>
        </div>
        <div class="stat-card">
          <h3>Error Count</h3>
          <p>{{ stats.errorCount || 0 }}</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <label>Date Range</label>
        <div class="date-inputs">
          <input type="datetime-local" v-model="filters.startDate" @change="loadLogs" />
          <input type="datetime-local" v-model="filters.endDate" @change="loadLogs" />
        </div>
      </div>
      <div class="filter-group">
        <label>Method</label>
        <select v-model="filters.method" @change="loadLogs">
          <option value="">All</option>
          <option v-for="method in ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']" :key="method" :value="method">
            {{ method }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label>Status Code</label>
        <input type="number" v-model="filters.statusCode" @change="loadLogs" placeholder="e.g. 200, 404, 500" />
      </div>
      <div class="filter-group">
        <label>Endpoint</label>
        <input type="text" v-model="filters.endpoint" @input="debounceLoadLogs" placeholder="Filter by endpoint" />
      </div>
      <div class="filter-group">
        <label>User Agent</label>
        <input type="text" v-model="filters.userAgent" @input="debounceLoadLogs" placeholder="Filter by user agent" />
      </div>
      <div class="filter-group">
        <label>IP</label>
        <input type="text" v-model="filters.ip" @input="debounceLoadLogs" placeholder="Filter by IP" />
      </div>
      <div class="filter-group">
        <label>Show Errors Only</label>
        <input type="checkbox" v-model="filters.error" @change="loadLogs" />
      </div>
    </div>

    <!-- Logs Table -->
    <div class="logs-table">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Duration</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log._id" :class="{ 'has-error': log.error }">
            <td>{{ formatDate(log.timestamp) }}</td>
            <td>{{ log.method }}</td>
            <td>{{ log.endpoint }}</td>
            <td :class="getStatusClass(log.responseData.statusCode)">
              {{ log.responseData.statusCode }}
            </td>
            <td>{{ formatDuration(log.duration) }}</td>
            <td>{{ log.userId?.email || 'Anonymous' }}</td>
            <td>
              <button @click="showDetails(log)" class="details-btn">
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="pagination.pages > 1">
      <button 
        :disabled="pagination.page === 1"
        @click="changePage(pagination.page - 1)"
      >
        Previous
      </button>
      <span>Page {{ pagination.page }} of {{ pagination.pages }}</span>
      <button 
        :disabled="pagination.page === pagination.pages"
        @click="changePage(pagination.page + 1)"
      >
        Next
      </button>
    </div>

    <!-- Details Modal -->
    <div v-if="selectedLog" class="modal">
      <div class="modal-content">
        <h2>Request Details</h2>
        <div class="details-grid">
          <div class="detail-item">
            <h3>Request</h3>
            <pre>{{ JSON.stringify(selectedLog.requestData, null, 2) }}</pre>
          </div>
          <div class="detail-item">
            <h3>Response</h3>
            <pre>{{ JSON.stringify(selectedLog.responseData, null, 2) }}</pre>
          </div>
          <div class="detail-item" v-if="selectedLog.error">
            <h3>Error</h3>
            <pre>{{ JSON.stringify(selectedLog.error, null, 2) }}</pre>
          </div>
          <div class="detail-item">
            <h3>Additional Info</h3>
            <p><strong>IP:</strong> {{ selectedLog.ip }}</p>
            <p><strong>User Agent:</strong> {{ selectedLog.userAgent }}</p>
            <p><strong>Tags:</strong> {{ selectedLog.tags?.join(', ') || 'None' }}</p>
          </div>
        </div>
        <button @click="selectedLog = null" class="close-btn">Close</button>
      </div>
    </div>

    <!-- Clear Confirmation Modal -->
    <div v-if="showClearConfirmation" class="modal">
      <div class="modal-content">
        <h2>Clear All Logs</h2>
        <p>Are you sure you want to clear all request logs? This action cannot be undone.</p>
        <div class="modal-actions">
          <button 
            @click="clearLogs" 
            class="confirm-btn"
            :disabled="clearingLogs"
          >
            {{ clearingLogs ? 'Clearing...' : 'Confirm' }}
          </button>
          <button 
            @click="showClearConfirmation = false" 
            class="cancel-btn"
            :disabled="clearingLogs"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { debounce } from 'lodash';
import {useApi} from '@/composables/useApi';

interface User {
  _id: string;
  email: string;
  name?: string;
}

interface RequestLogData {
  _id: string;
  timestamp: number;
  method: string;
  endpoint: string;
  userId?: User;
  requestData: {
    body?: Record<string, any>;
    query?: Record<string, any>;
    params?: Record<string, any>;
  };
  responseData: {
    statusCode: number;
    body?: Record<string, any>;
  };
  error?: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
  };
  duration: number;
  ip: string;
  userAgent?: string;
  tags?: string[];
}

const logs = ref<RequestLogData[]>([]);
const selectedLog = ref<RequestLogData | null>(null);
const stats = ref({
  totalRequests: 0,
  averageDuration: 0,
  errorCount: 0,
  statusCodeStats: {},
  methodStats: {},
  topEndpoints: []
});

const pagination = ref({
  page: 1,
  pages: 1,
  total: 0
});

const filters = ref({
  startDate: '',
  endDate: '',
  method: '',
  statusCode: '',
  endpoint: '',
  userAgent: '',
  ip: '',
  error: false,
  page: 1
});

const showClearConfirmation = ref(false);
const clearingLogs = ref(false);

const loadLogs = async () => {
  try {
    const params = {
      ...filters.value,
      startDate: filters.value.startDate ? new Date(filters.value.startDate).getTime() : undefined,
      endDate: filters.value.endDate ? new Date(filters.value.endDate).getTime() : undefined
    };

    // Add console logs for debugging
    console.log('Loading logs with params:', params);
    console.log('Current token:', localStorage.getItem('admin_token'));

    // Ensure the Authorization header is set
    const token = localStorage.getItem('admin_token');
    if (token) {
     useApi().defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
      const [logsResponse, statsResponse] = await Promise.all([
       useApi().get('/admin/request-logs', { 
          params,
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('admin_token')}` 
          }
        }),
       useApi().get('/admin/request-logs/stats', {
          params: {
            startDate: params.startDate,
            endDate: params.endDate
          },
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('admin_token')}` 
          }
        })
      ]);

      console.log('Logs response:', logsResponse.data);
      console.log('Stats response:', statsResponse.data);

      logs.value = logsResponse.data.logs;
      pagination.value = logsResponse.data.pagination;
      stats.value = statsResponse.data;
    } catch (apiError: any) {
      console.error('API Error:', apiError.response?.data || apiError.message);
      
      // If unauthorized, try to refresh the page or redirect to login
      if (apiError.response?.status === 401 || apiError.response?.status === 403) {
        console.log('Authentication error, redirecting to login');
        // Redirect to login after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    }
  } catch (error) {
    console.error('Error loading logs:', error);
    // Handle error (show notification, etc.)
  }
};

const debounceLoadLogs = debounce(loadLogs, 300);

const changePage = (page: number) => {
  filters.value.page = page;
  loadLogs();
};

const showDetails = (log: any) => {
  selectedLog.value = log;
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

const formatDuration = (duration: number) => {
  return duration < 1000 ? `${duration}ms` : `${(duration / 1000).toFixed(2)}s`;
};

const getStatusClass = (status: number) => {
  if (status < 300) return 'status-success';
  if (status < 400) return 'status-redirect';
  if (status < 500) return 'status-client-error';
  return 'status-server-error';
};

const clearLogs = async () => {
  try {
    clearingLogs.value = true;
    await useApi().delete('/admin/request-logs/clear');
    showClearConfirmation.value = false;
    await loadLogs(); // Refresh the logs list
  } catch (error: any) {
    console.error('Error clearing logs:', error);
    // You might want to show an error notification here
  } finally {
    clearingLogs.value = false;
  }
};

onMounted(() => {
  loadLogs();
});
</script>

<style scoped>
.request-logs {
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.clear-logs-btn {
  padding: 8px 16px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.clear-logs-btn:hover {
  background-color: #b91c1c;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-inputs {
  display: flex;
  gap: 10px;
}

.logs-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f5f5f5;
  font-weight: 600;
}

.has-error {
  background-color: #fff5f5;
}

.status-success { color: #2f855a; }
.status-redirect { color: #2b6cb0; }
.status-client-error { color: #c05621; }
.status-server-error { color: #c53030; }

.details-btn {
  padding: 4px 8px;
  background: #4a5568;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.details-btn:hover {
  background: #2d3748;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.detail-item {
  background: #f7fafc;
  padding: 15px;
  border-radius: 4px;
}

.detail-item pre {
  white-space: pre-wrap;
  word-break: break-all;
  background: #edf2f7;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}

.close-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background: #4a5568;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.close-btn:hover {
  background: #2d3748;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.confirm-btn {
  padding: 8px 16px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  min-width: 100px;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #b91c1c;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #4b5563;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #374151;
}

.confirm-btn:disabled,
.cancel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }

  .filters {
    grid-template-columns: 1fr;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style> 