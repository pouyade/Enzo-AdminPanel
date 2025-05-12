<template>
  <div :class="['rounded-2xl shadow-sm overflow-hidden border',
    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100']">
    <div :class="['p-6 border-b', isDark ? 'border-gray-700' : 'border-gray-100']">
      <div class="sm:flex sm:items-center sm:justify-between">
        <h2 :class="['text-lg font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">Daily Active Users</h2>
        <div class="mt-3 sm:mt-0 sm:ml-4">
          <select
            v-model="selectedPeriod"
            :class="['block w-full pl-3 pr-10 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200',
              isDark ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200 text-gray-700']"
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="p-6">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      
      <div v-else-if="error" class="flex justify-center items-center h-64">
        <div class="text-red-500 text-center">
          <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="mt-2">{{ error }}</p>
          <button @click="fetchChartData" class="mt-2 text-indigo-600 hover:text-indigo-800">
            Try Again
          </button>
        </div>
      </div>
      
      <div v-else>
        <!-- Chart Container -->
        <div class="h-64" ref="chartContainer"></div>
        
        <!-- Stats Summary -->
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div :class="['p-3 rounded-lg', isDark ? 'bg-gray-700' : 'bg-gray-50']">
            <div :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">Total Users</div>
            <div :class="['text-lg font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">{{ totalUsers }}</div>
          </div>
          <div :class="['p-3 rounded-lg', isDark ? 'bg-gray-700' : 'bg-gray-50']">
            <div :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">Active Today</div>
            <div :class="['text-lg font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">{{ activeToday }}</div>
          </div>
          <div :class="['p-3 rounded-lg', isDark ? 'bg-gray-700' : 'bg-gray-50']">
            <div :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">Growth Rate</div>
            <div :class="['text-lg font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">
              {{ growthRate > 0 ? '+' : '' }}{{ growthRate }}%
            </div>
          </div>
          <div :class="['p-3 rounded-lg', isDark ? 'bg-gray-700' : 'bg-gray-50']">
            <div :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">Avg. Daily Active</div>
            <div :class="['text-lg font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">{{ avgDailyActive }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, inject, onUnmounted } from 'vue';
import {useApi} from '@/composables/useApi';
import * as echarts from 'echarts';

// Chart data and state
const chartData = ref<any[]>([]);
const loading = ref(false);
const error = ref('');
const chartInstance = ref<echarts.ECharts | null>(null);
const chartContainer = ref<HTMLElement | null>(null);
const selectedPeriod = ref('7');

// Stats
const totalUsers = ref(0);
const activeToday = ref(0);
const growthRate = ref(0);
const avgDailyActive = ref(0);

// Get theme state from parent
const isDark = inject('isDark', ref(false));

// Fetch chart data
const fetchChartData = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    const response = await useApi().get(`/admin/users/daily-stats?days=${selectedPeriod.value}`);
    chartData.value = response.data.data;
    
    // Update stats
    totalUsers.value = response.data.totalUsers;
    activeToday.value = response.data.activeToday;
    growthRate.value = response.data.growthRate;
    avgDailyActive.value = response.data.avgDailyActive;
    
    // Initialize or update chart after data is loaded
    setTimeout(() => {
      initChart();
    }, 0);
  } catch (err: any) {
    console.error('Failed to fetch chart data:', err);
    error.value = err.response?.data?.message || 'Failed to load chart data';
  } finally {
    loading.value = false;
  }
};

// Initialize chart
const initChart = () => {
  if (!chartContainer.value) {
    console.error('Chart container not found');
    return;
  }
  
  // Dispose existing chart instance if it exists
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  
  // Create new chart instance
  chartInstance.value = echarts.init(chartContainer.value);
  
  // Prepare chart data
  const dates = chartData.value.map(item => item.date);
  const activeUsers = chartData.value.map(item => item.activeUsers);
  const newUsers = chartData.value.map(item => item.newUsers);
  
  // Set chart options
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Active Users', 'New Users'],
      textStyle: {
        color: isDark.value ? '#9CA3AF' : '#4B5563'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: {
        color: isDark.value ? '#9CA3AF' : '#4B5563'
      },
      axisLine: {
        lineStyle: {
          color: isDark.value ? '#374151' : '#E5E7EB'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: isDark.value ? '#9CA3AF' : '#4B5563'
      },
      axisLine: {
        lineStyle: {
          color: isDark.value ? '#374151' : '#E5E7EB'
        }
      },
      splitLine: {
        lineStyle: {
          color: isDark.value ? '#374151' : '#E5E7EB'
        }
      }
    },
    series: [
      {
        name: 'Active Users',
        type: 'line',
        data: activeUsers,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#6366F1'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: isDark.value ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.2)'
            },
            {
              offset: 1,
              color: isDark.value ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.05)'
            }
          ])
        }
      },
      {
        name: 'New Users',
        type: 'bar',
        data: newUsers,
        barWidth: '40%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: isDark.value ? '#818CF8' : '#818CF8'
            },
            {
              offset: 1,
              color: isDark.value ? '#6366F1' : '#6366F1'
            }
          ])
        }
      }
    ]
  };
  
  // Set chart options
  chartInstance.value.setOption(option);
};

// Handle window resize
const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

// Watch for period changes
watch(selectedPeriod, () => {
  fetchChartData();
});

// Watch for theme changes
watch(isDark, () => {
  if (chartInstance.value) {
    initChart();
  }
});

// Lifecycle hooks
onMounted(() => {
  fetchChartData();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  window.removeEventListener('resize', handleResize);
});
</script> 