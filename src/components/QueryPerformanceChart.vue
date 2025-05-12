<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">Query Performance</h3>
        <div class="flex space-x-2">
          <button 
            v-for="option in timeframeOptions" 
            :key="option.value"
            @click="setTimeframe(option.value)"
            :class="[
              'px-3 py-1 text-sm rounded-md',
              selectedTimeframe === option.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
    
    <div class="p-4">
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
      
      <div v-else-if="chartData.length === 0" class="flex justify-center items-center h-64">
        <div class="text-gray-500 text-center">
          <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="mt-2">No data available for the selected timeframe</p>
        </div>
      </div>
      
      <div v-else>
        <!-- Chart Container -->
        <div class="h-64" ref="chartContainer"></div>
        
        <!-- Stats Summary -->
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm text-gray-500">Avg. Duration</div>
            <div class="text-lg font-semibold">{{ averageStats.avgDuration }}ms</div>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm text-gray-500">Max Duration</div>
            <div class="text-lg font-semibold">{{ averageStats.maxDuration }}ms</div>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm text-gray-500">Success Rate</div>
            <div class="text-lg font-semibold">{{ averageStats.successRate }}%</div>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm text-gray-500">Total Requests</div>
            <div class="text-lg font-semibold">{{ averageStats.totalRequests }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import {useApi} from '@/composables/useApi';
import * as echarts from 'echarts';

// Chart data and state
const chartData = ref<any[]>([]);
const loading = ref(false);
const error = ref('');
const chartInstance = ref<echarts.ECharts | null>(null);
const chartContainer = ref<HTMLElement | null>(null);

// Timeframe options
const timeframeOptions = [
  { label: 'Hour', value: 'hour' },
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' }
];
const selectedTimeframe = ref('day');

// Computed stats
const averageStats = computed(() => {
  if (chartData.value.length === 0) {
    return {
      avgDuration: 0,
      maxDuration: 0,
      successRate: 0,
      totalRequests: 0
    };
  }
  
  const totalRequests = chartData.value.reduce((sum, item) => sum + item.requestCount, 0);
  const successfulRequests = chartData.value.reduce((sum, item) => sum + item.successCount, 0);
  const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;
  
  // Filter out items with no requests to calculate average duration
  const itemsWithRequests = chartData.value.filter(item => item.requestCount > 0);
  const avgDuration = itemsWithRequests.length > 0
    ? itemsWithRequests.reduce((sum, item) => sum + item.avgDuration, 0) / itemsWithRequests.length
    : 0;
  
  // Find max duration
  const maxDuration = chartData.value.reduce((max, item) => 
    item.maxDuration > max ? item.maxDuration : max, 0);
  
  return {
    avgDuration: Math.round(avgDuration),
    maxDuration,
    successRate: Math.round(successRate * 100) / 100,
    totalRequests
  };
});

// Fetch chart data
const fetchChartData = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    console.log(`Fetching chart data for timeframe: ${selectedTimeframe.value}`);
    const response = await useApi().get(`/admin/request-logs/chart-data?timeframe=${selectedTimeframe.value}`);
    console.log('Chart data response:', response.data);
    
    chartData.value = response.data.data;
    
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

// Set timeframe and refetch data
const setTimeframe = (timeframe: string) => {
  selectedTimeframe.value = timeframe;
  fetchChartData();
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
  
  console.log('Initializing chart with data:', chartData.value);
  
  // Create new chart instance
  chartInstance.value = echarts.init(chartContainer.value);
  
  // Prepare chart data
  const timestamps = chartData.value.map(item => item.timestamp);
  const durations = chartData.value.map(item => item.avgDuration);
  const successRates = chartData.value.map(item => item.successRate);
  
  console.log('Chart data prepared:', { timestamps, durations, successRates });
  
  // Set chart options
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Avg Duration (ms)', 'Success Rate (%)']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: timestamps,
        axisLabel: {
          formatter: (value: string) => {
            // Format based on timeframe
            if (selectedTimeframe.value === 'hour') {
              return value.split(' ')[1]; // Just show time
            } else if (selectedTimeframe.value === 'day') {
              return value.split(' ')[1] + 'h'; // Show hour with h suffix
            } else {
              return value.split(' ')[0]; // Just show date
            }
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Duration (ms)',
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#5470c6'
          }
        },
        axisLabel: {
          formatter: '{value} ms'
        }
      },
      {
        type: 'value',
        name: 'Success Rate (%)',
        position: 'right',
        min: 0,
        max: 100,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#91cc75'
          }
        },
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: 'Avg Duration (ms)',
        type: 'line',
        yAxisIndex: 0,
        data: durations,
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#5470c6'
        },
        areaStyle: {
          opacity: 0.2,
          color: '#5470c6'
        }
      },
      {
        name: 'Success Rate (%)',
        type: 'line',
        yAxisIndex: 1,
        data: successRates,
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#91cc75'
        },
        areaStyle: {
          opacity: 0.2,
          color: '#91cc75'
        }
      }
    ]
  };
  
  // Set chart options
  chartInstance.value.setOption(option);
  console.log('Chart initialized');
};

// Handle window resize
const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

// Lifecycle hooks
onMounted(() => {
  console.log('QueryPerformanceChart component mounted');
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