<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Users Management</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all users in your account.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="showAddUserModal = true"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add User
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <!-- Total Users Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ users.length }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Online Users Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Online Users</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ onlineUsers }}</div>
                <span class="ml-2 text-sm text-green-600">Active now</span>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Users Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Active Users</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ activeUsers }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Users Card -->
      <div class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Admin Users</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-bold text-gray-900">{{ adminUsers }}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="mt-4 rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-red-800">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="mt-4 flex flex-wrap gap-4">
      <div class="flex-1 min-w-[250px]">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by name or email..."
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @input="applyFilters"
        >
      </div>
      <div class="w-48">
        <select
          v-model="roleFilter"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="w-48">
        <select
          v-model="statusFilter"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>
      <div class="w-48">
        <select
          v-model="subscriptionFilter"
          class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Subscriptions</option>
          <option value="active">Active Plan</option>
          <option value="inactive">No Active Plan</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-xl bg-white">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-50/50">
                  <th scope="col" class="py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6 cursor-pointer" @click="handleSort('name')">
                    <div class="flex items-center">
                      Name
                      <svg v-if="sortBy === 'name'" class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900 cursor-pointer" @click="handleSort('email')">
                    <div class="flex items-center">
                      Email
                      <svg v-if="sortBy === 'email'" class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900 cursor-pointer" @click="handleSort('role')">
                    <div class="flex items-center">
                      Role
                      <svg v-if="sortBy === 'role'" class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900 cursor-pointer" @click="handleSort('status')">
                    <div class="flex items-center">
                      Status
                      <svg v-if="sortBy === 'status'" class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" class="px-3 py-4 text-left text-sm font-medium text-gray-900">Current Plan</th>
                  <th scope="col" class="relative py-4 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="loading" class="animate-pulse">
                  <td colspan="7" class="text-center py-4">
                    <div class="flex justify-center">
                      <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="users.length === 0">
                  <td colspan="7" class="text-center py-4 text-gray-500">No users found</td>
                </tr>
                <tr v-for="user in users" :key="user.id" class="transition-colors duration-200 hover:bg-gray-50/50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img v-if="user.avatarUrl" :src="getAvatarUrl(user.avatarUrl)" class="h-10 w-10 rounded-full object-cover" :alt="`${user.name}'s avatar`" @error="handleAvatarError" />
                        <div v-else class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <span class="text-white font-medium">{{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}</span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ user.name }}</div>
                        <div class="flex items-center">
                          <div class="h-2 w-2 rounded-full" :class="user.isOnline ? 'bg-green-400' : 'bg-gray-400'"></div>
                          <span class="ml-1 text-xs text-gray-500" :title="user.lastOnlineAt ? new Date(user.lastOnlineAt).toLocaleString() : ''">
                            {{ user.isOnline ? 'Online' : user.lastOnlineAt ? 'Last seen ' + formatLastOnline(user.lastOnlineAt) : 'Never online' }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span :class="user.role === 'admin' ? 'text-purple-600 bg-purple-100' : 'text-blue-600 bg-blue-100'" 
                          class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span v-if="user.isDeleted" class="px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                      Deleted
                    </span>
                    <span v-else :class="user.status === 'active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'" 
                          class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ user.status }}
                    </span>
                    <span v-if="!user.isDeleted && user.isBlocked" class="ml-2 px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                      Blocked
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <div v-if="user.currentPlan?.isActive" class="flex flex-col">
                      <span :class="user.currentPlan.isActive ? 'text-green-600' : 'text-red-600'" class="font-medium">
                        {{ user.currentPlan.planName }}
                      </span>
                      <span class="text-xs text-gray-500">
                        {{ Number(user.currentPlan.endDate) === 0 ? 'Unlimited' : `Expires: ${new Date(user.currentPlan.endDate).toLocaleDateString()}` }}
                      </span>
                    </div>
                    <div v-else class="text-gray-500">
                      No active plan
                    </div>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div class="relative inline-block text-left" v-click-outside="() => (user.showActions = false)">
                      <button
                        @click="toggleDropdown($event, user)"
                        class="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pagination Controls -->
    <div class="mt-5 sm:flex sm:items-center sm:justify-between">
      <div class="text-sm text-gray-700">
        Showing <span class="font-medium">{{ users.length ? (pagination.page - 1) * pagination.limit + 1 : 0 }}</span> to <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span> of <span class="font-medium">{{ pagination.total }}</span> users
      </div>
      <div class="flex items-center mt-3 sm:mt-0">
        <div class="mr-4">
          <select
            v-model="itemsPerPage"
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            @change="changeItemsPerPage(Number(itemsPerPage))"
          >
            <option :value="10">10 per page</option>
            <option :value="25">25 per page</option>
            <option :value="50">50 per page</option>
            <option :value="100">100 per page</option>
          </select>
        </div>
        <div class="flex-1 flex justify-between sm:justify-end">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page <= 1"
            :class="pagination.page <= 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            Previous
          </button>
          <div class="hidden md:flex mx-1">
            <template v-if="pagination.pages <= 7">
              <button
                v-for="page in pagination.pages"
                :key="page"
                @click="changePage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-10',
                  pagination.page === page 
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
                class="border mx-0.5 rounded-md"
              >
                {{ page }}
              </button>
            </template>
            <template v-else>
              <!-- First page -->
              <button
                @click="changePage(1)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-10',
                  pagination.page === 1 
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
                class="border mx-0.5 rounded-md"
              >
                1
              </button>
              
              <!-- Ellipsis for skipped pages at start -->
              <span v-if="pagination.page > 3" class="px-2 py-2 text-gray-500">...</span>
              
              <!-- Show pages around current page -->
              <button
                v-for="page in pagination.pages"
                :key="page"
                v-show="page !== 1 && page !== pagination.pages && Math.abs(page - pagination.page) <= 1"
                @click="changePage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-10',
                  pagination.page === page 
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
                class="border mx-0.5 rounded-md"
              >
                {{ page }}
              </button>
              
              <!-- Ellipsis for skipped pages at end -->
              <span v-if="pagination.page < pagination.pages - 2" class="px-2 py-2 text-gray-500">...</span>
              
              <!-- Last page -->
              <button
                @click="changePage(pagination.pages)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-10',
                  pagination.page === pagination.pages 
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
                class="border mx-0.5 rounded-md"
              >
                {{ pagination.pages }}
              </button>
            </template>
          </div>
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page >= pagination.pages"
            :class="pagination.page >= pagination.pages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'"
            class="ml-3 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Sessions Modal -->
    <div v-if="showSessionsModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Active Sessions for {{ selectedUserForSessions?.name || selectedUserForSessions?.email }}</h2>
          <button @click="closeSessionsModal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="loadingSessions" class="flex justify-center py-8">
          <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <div v-else-if="userSessions.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No active sessions</h3>
          <p class="mt-1 text-sm text-gray-500">This user has no active sessions at the moment.</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="session in userSessions" :key="session.id" 
               class="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-500 transition-colors duration-200">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center">
                  <svg class="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h4 class="text-sm font-medium text-gray-900">{{ session.deviceName || 'Unknown Device' }}</h4>
                  <span v-if="session.isCurrentSession" class="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Current Session
                  </span>
                </div>
                <div class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <span class="font-medium">Browser:</span> {{ session.browser }}
                  </div>
                  <div>
                    <span class="font-medium">OS:</span> {{ session.os }}
                  </div>
                  <div>
                    <span class="font-medium">IP Address:</span> {{ session.ip }}
                  </div>
                  <div>
                    <span class="font-medium">Last Active:</span> {{ formatDate(session.lastActive) }}
                  </div>
                </div>
              </div>
              <button
                @click="terminateSession(session.id)"
                class="ml-4 flex-shrink-0 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                :disabled="session.isCurrentSession"
              >
                <svg class="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div v-if="showAddUserModal || editingUser" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">{{ editingUser ? 'Edit User' : 'Add New User' }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <div v-if="formError" class="mb-4 rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ formError }}</p>
              </div>
            </div>
          </div>

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
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                v-model="formData.email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Role</label>
              <select
                v-model="formData.role"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div v-if="!editingUser">
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                v-model="formData.password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                :required="!editingUser"
                minlength="8"
              >
              <p class="mt-1 text-sm text-gray-500">Password must be at least 8 characters long</p>
            </div>
            <div v-else>
              <label class="block text-sm font-medium text-gray-700">New Password (optional)</label>
              <input
                type="password"
                v-model="formData.password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                minlength="8"
              >
              <p class="mt-1 text-sm text-gray-500">Leave blank to keep current password</p>
            </div>
            <div v-if="editingUser">
              <label class="block text-sm font-medium text-gray-700">Account Status</label>
              <div class="mt-2 space-y-4">
                <!-- Block Status -->
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="isBlocked"
                    v-model="formData.isBlocked"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :disabled="formData.role === 'admin' || formData.isDeleted"
                  >
                  <label for="isBlocked" class="ml-2 block text-sm text-gray-900">
                    Block user
                  </label>
                </div>
                <p class="text-sm text-gray-500">Blocked users cannot access the system</p>

                <!-- Delete Status -->
                <div class="flex items-center pt-4 border-t">
                  <input
                    type="checkbox"
                    id="isDeleted"
                    v-model="formData.isDeleted"
                    class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    :disabled="formData.role === 'admin'"
                  >
                  <label for="isDeleted" class="ml-2 block text-sm text-gray-900">
                    Mark account as deleted
                  </label>
                </div>
                <p class="text-sm text-gray-500">Deleted accounts are permanently deactivated and cannot be accessed</p>
                
                <div v-if="formData.isDeleted" class="rounded-md bg-yellow-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
                      <div class="mt-2 text-sm text-yellow-700">
                        <p>Marking an account as deleted will:</p>
                        <ul class="list-disc pl-5 mt-1">
                          <li>Prevent the user from accessing their account</li>
                          <li>Keep their data for record-keeping</li>
                          <li>Cannot be undone without admin intervention</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              :disabled="formLoading"
            >
              <span v-if="formLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>{{ editingUser ? 'Save Changes' : 'Add User' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- EMB Accounts Modal -->
    <div v-if="showEmbAccountsModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-4xl w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">EMB Accounts for {{ selectedUserForEmb?.name || selectedUserForEmb?.email }}</h2>
          <button @click="closeEmbAccountsModal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="embAccountsError" class="mb-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">{{ embAccountsError }}</p>
            </div>
          </div>
        </div>

        <div v-if="loadingEmbAccounts" class="flex justify-center py-8">
          <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <div v-else-if="selectedUserEmbAccounts.length === 0" class="text-center py-8 text-gray-500">
          No EMB accounts found for this user
        </div>

        <div v-else class="mt-4">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">EMB ID</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">External ID</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Added</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="account in selectedUserEmbAccounts" :key="account.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{{ account.email }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ account.embId }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ account.externalId }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ new Date(account.dateAdded).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add Plan Activation Modal -->
    <div v-if="showActivatePlanModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">Activate Plan for {{ selectedUserForPlan?.name || selectedUserForPlan?.email }}</h2>
          <button @click="closeActivatePlanModal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="planActivationError" class="mb-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">{{ planActivationError }}</p>
            </div>
          </div>
        </div>

        <div v-if="loadingPlans" class="flex justify-center py-8">
          <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <form v-else @submit.prevent="handlePlanActivation" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Select Plan</label>
            <select
              v-model="selectedPlan"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Choose a plan</option>
              <option v-for="plan in availablePlans" :key="plan._id" :value="plan._id">
                {{ plan.name }} - ${{ plan.price }} ({{ plan.durationDays }} days)
              </option>
            </select>
          </div>

          <div v-if="selectedPlanDetails" class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Plan Features:</h3>
            <ul class="space-y-2">
              <li v-for="feature in selectedPlanDetails.features" :key="feature.feature_key" class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm text-gray-700">{{ feature.title }}</span>
              </li>
            </ul>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeActivatePlanModal"
              class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              :disabled="!selectedPlan || activatingPlan"
            >
              <span v-if="activatingPlan" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Activating...
              </span>
              <span v-else>Activate Plan</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteDialog" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Delete User Account
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Please select how you would like to delete the account for {{ userToDelete?.name || userToDelete?.email }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-5 space-y-4">
            <!-- Soft Delete Option -->
            <div class="relative flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer" @click="handleSoftDelete">
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900">Mark as Deleted</h4>
                <p class="mt-1 text-sm text-gray-500">
                  The user account will be marked as deleted and deactivated, but all data will be preserved. This action can be reversed.
                </p>
              </div>
            </div>

            <!-- Hard Delete Option -->
            <div class="relative flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer" @click="handleHardDelete">
              <div class="flex-1">
                <h4 class="text-sm font-medium text-red-600">Permanently Delete</h4>
                <p class="mt-1 text-sm text-gray-500">
                  The user account and all associated data will be permanently deleted. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-5 sm:mt-6">
            <button
              type="button"
              class="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              @click="closeDeleteDialog"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dropdown Portal -->
    <Teleport to="body">
      <div v-for="user in users" :key="user.id">
        <div v-if="user.showActions"
             class="fixed z-[100] bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 py-2"
             :style="dropdownPosition[user.id]"
             @click.stop
        >
          <button
            @click="editUser(user)"
            class="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            @click="showUserSessions(user)"
            class="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Sessions
          </button>
          <button
            @click="activatePlan(user)"
            class="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Activate Plan
          </button>
          <UserChatButton 
            :userId="user.id" 
            :isDropdownItem="true"
            @closeDropdown="user.showActions = false"
            class="w-full"
          />
          <button
            v-if="!user.isDeleted"
            @click="toggleBanUser(user)"
            class="flex w-full items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200"
            :class="user.isBlocked ? 'text-green-700' : 'text-orange-700'"
            :disabled="user.role === 'admin'"
          >
            <svg class="mr-3 h-5 w-5" :class="user.isBlocked ? 'text-green-400' : 'text-orange-400'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {{ user.isBlocked ? 'Unblock' : 'Block' }}
          </button>
          <button
            v-if="user.isDeleted"
            @click="undeleteUser(user)"
            class="flex w-full items-center px-4 py-3 text-sm text-green-700 hover:bg-gray-50 transition-colors duration-200"
            :disabled="user.role === 'admin'"
          >
            <svg class="mr-3 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Undelete
          </button>
          <button
            @click="deleteUser(user)"
            class="flex w-full items-center px-4 py-3 text-sm text-red-700 hover:bg-gray-50 transition-colors duration-200"
            :disabled="user.role === 'admin'"
          >
            <svg class="mr-3 h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {useApi} from '@/composables/useApi'
import { debounce } from 'lodash'
import UserChatButton from '@/components/UserChatButton.vue'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  status: 'active' | 'inactive'
  isBlocked: boolean
  isDeleted: boolean
  embAccountsCount?: number
  avatarUrl?: string
  currentPlan?: {
    planId: string
    planName: string
    startDate: string
    endDate: string
    isActive: boolean
  }
  isOnline: boolean
  lastOnlineAt?: number
  showActions?: boolean
}

interface EmbAccount {
  id: string
  email: string
  embId: string
  externalId: string
  dateAdded: string
}

interface Plan {
  _id: string;
  name: string;
  durationDays: number;
  price: number;
  features: Array<{
    title: string;
    title_fa: string;
    feature_key: string;
    feature_value: string;
  }>;
  isActive: boolean;
}

interface Session {
  id: string
  deviceName: string
  browser: string
  os: string
  ip: string
  lastActive: string
  isCurrentSession: boolean
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')
const showAddUserModal = ref(false)
const editingUser = ref<User | null>(null)
const formLoading = ref(false)
const formError = ref('')
const searchQuery = ref('')
const roleFilter = ref('')
// const onlineFilter = ref('')
const statusFilter = ref('')
const subscriptionFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const pagination = ref<Pagination>({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})
const sortBy = ref('createdAt')
const sortOrder = ref('desc')

// Add new state for EMB accounts modal
const showEmbAccountsModal = ref(false)
const selectedUserEmbAccounts = ref<EmbAccount[]>([])
const loadingEmbAccounts = ref(false)
const embAccountsError = ref('')
const selectedUserForEmb = ref<User | null>(null)

// Add new refs for plan activation
const showActivatePlanModal = ref(false)
const selectedUserForPlan = ref<User | null>(null)
const availablePlans = ref<Plan[]>([])
const selectedPlan = ref('')
const loadingPlans = ref(false)
const activatingPlan = ref(false)
const planActivationError = ref('')

const showDeleteDialog = ref(false)
const userToDelete = ref<User | null>(null)

const formData = ref({
  name: '',
  email: '',
  role: 'user' as 'user' | 'admin',
  password: '' as string | undefined,
  isBlocked: false,
  isDeleted: false
})

const onlineUsers = computed(() => {
  return users.value.filter(user => user.isOnline).length
})

const activeUsers = computed(() => {
  return users.value.filter(user => user.status === 'active' && !user.isBlocked && !user.isDeleted).length
})

const adminUsers = computed(() => {
  return users.value.filter(user => user.role === 'admin').length
})

const closeEmbAccountsModal = () => {
  showEmbAccountsModal.value = false
  selectedUserForEmb.value = null
  selectedUserEmbAccounts.value = []
  embAccountsError.value = ''
}

const applyFilters = debounce(() => {
  currentPage.value = 1
  fetchUsers()
}, 300)

const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Build query parameters
    const params: Record<string, string | number> = {
      page: currentPage.value,
      limit: itemsPerPage.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value
    }
    
    // Add filters if they exist
    if (searchQuery.value) params.search = searchQuery.value
    if (roleFilter.value) params.role = roleFilter.value
    if (statusFilter.value) params.status = statusFilter.value
    if (subscriptionFilter.value) params.subscription = subscriptionFilter.value
    
    const response = await useApi().get('/admin/users', { params })
    
    // Update pagination data
    pagination.value = response.data.pagination
    
    users.value = response.data.users.map((user: any) => {
      // planId is already the populated plan object from MongoDB
      const planData = typeof user.subscription?.planId === 'object' ? user.subscription.planId : null
      
      // Consider user online if lastOnlineAt is within last 5 minutes
      const isOnline = user.lastOnlineAt && (Date.now() - user.lastOnlineAt) <= 5 * 60 * 1000;
      
      // Get avatar URL from the avatar object
      const avatarUrl = user.avatar?.url || user.avatar?.path || null;
      
      return {
        id: user._id || user.id,
        name: user.name || '',
        email: user.email,
        role: user.isAdmin ? 'admin' : 'user',
        status: user.isVerified ? 'active' : 'inactive',
        isBlocked: user.isBlocked || false,
        isDeleted: user.isDeleted || false,
        embAccountsCount: user.embAccountsCount || 0,
        avatarUrl: avatarUrl,
        currentPlan: user.subscription ? {
          planId: planData?._id || user.subscription.planId,
          planName: planData?.name || 'No Plan Name',
          startDate: user.subscription.startDate,
          endDate: user.subscription.endDate,
          isActive: user.subscription.isActive
        } : undefined,
        isOnline,
        lastOnlineAt: user.lastOnlineAt
      }
    })
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch users'
    console.error('Failed to fetch users:', err)
  } finally {
    loading.value = false
  }
}

const handleSort = (field: string) => {
  if (sortBy.value === field) {
    // Toggle sort order if clicking the same field
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Default to descending for new sort field
    sortBy.value = field
    sortOrder.value = 'desc'
  }
  fetchUsers()
}

const changePage = (page: number) => {
  currentPage.value = page
  fetchUsers()
}

const changeItemsPerPage = (limit: number) => {
  itemsPerPage.value = limit
  currentPage.value = 1 // Reset to first page when changing items per page
  fetchUsers()
}

const handleSubmit = async () => {
  try {
    formLoading.value = true
    formError.value = ''
    
    if (!editingUser.value) {
      console.log('Creating new user:', formData.value);
      await useApi().post('/admin/users', formData.value)
    } else {
      // Check if user ID is defined
      if (!editingUser.value.id) {
        formError.value = 'User ID is undefined. Cannot update user.';
        console.error('User ID is undefined:', editingUser.value);
        return;
      }
      
      const dataToSend = { ...formData.value }
      if (!dataToSend.password) {
        delete dataToSend.password
      }
      
      console.log(`Updating user ${editingUser.value.id}:`, dataToSend);
      await useApi().put(`/admin/users/${editingUser.value.id}`, dataToSend)
    }
    
    await fetchUsers()
    closeModal()
  } catch (err: any) {
    formError.value = err.response?.data?.message || 'Failed to save user'
    console.error('Failed to save user:', err)
  } finally {
    formLoading.value = false
  }
}

const editUser = (user: User) => {
  // Check if user ID is defined
  if (!user.id) {
    error.value = 'User ID is undefined. Cannot edit user.';
    console.error('User ID is undefined:', user);
    return;
  }
  
  console.log('Editing user:', user);
  
  editingUser.value = user
  formData.value = {
    name: user.name,
    email: user.email,
    role: user.role,
    password: '',
    isBlocked: user.isBlocked,
    isDeleted: user.isDeleted
  }
}

const deleteUser = (user: User) => {
  if (user.role === 'admin') {
    return
  }
  userToDelete.value = user
  showDeleteDialog.value = true
}

const handleSoftDelete = async () => {
  if (!userToDelete.value?.id) return

  try {
    loading.value = true
    error.value = ''

    await useApi().put(`/admin/users/${userToDelete.value.id}/soft-delete`)
    await fetchUsers()
    showDeleteDialog.value = false
    userToDelete.value = null
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to mark user as deleted'
    console.error('Failed to soft delete user:', err)
  } finally {
    loading.value = false
  }
}

const handleHardDelete = async () => {
  if (!userToDelete.value?.id) return

  try {
    loading.value = true
    error.value = ''

    await useApi().delete(`/admin/users/${userToDelete.value.id}/hard-delete`)
    await fetchUsers()
    showDeleteDialog.value = false
    userToDelete.value = null
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to delete user'
    console.error('Failed to hard delete user:', err)
  } finally {
    loading.value = false
  }
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  userToDelete.value = null
}

const closeModal = () => {
  showAddUserModal.value = false
  editingUser.value = null
  formData.value = {
    name: '',
    email: '',
    role: 'user' as 'user' | 'admin',
    password: '',
    isBlocked: false,
    isDeleted: false
  }
  formError.value = ''
}

const handleSearch = debounce(() => {
  currentPage.value = 1
}, 300)

watch([searchQuery, roleFilter], () => {
  handleSearch()
})

const toggleBanUser = async (user: User) => {
  if (user.role === 'admin') {
    return;
  }
  
  // Check if user ID is defined
  if (!user.id) {
    error.value = 'User ID is undefined. Cannot perform block operation.';
    console.error('User ID is undefined:', user);
    return;
  }
  
  const action = user.isBlocked ? 'unblock' : 'block';
  const confirmMessage = user.isBlocked 
    ? `Are you sure you want to unblock ${user.name || user.email}?` 
    : `Are you sure you want to block ${user.name || user.email}? This will prevent them from accessing the system.`;
  
  if (!confirm(confirmMessage)) {
    return;
  }
  
  try {
    loading.value = true;
    error.value = '';
    
    console.log(`Attempting to ${action} user:`, user);
    
    await useApi().put(`/admin/users/${user.id}/block`, {
      isBlocked: !user.isBlocked
    });
    
    await fetchUsers();
  } catch (err: any) {
    console.error(`Failed to ${action} user:`, err);
    error.value = err.response?.data?.message || `Failed to ${action} user`;
  } finally {
    loading.value = false;
  }
}

const selectedPlanDetails = computed(() => {
  return availablePlans.value.find(plan => plan._id === selectedPlan.value)
})

const fetchPlans = async () => {
  try {
    loadingPlans.value = true
    const response = await useApi().get('/admin/plans')
    availablePlans.value = response.data.filter((plan: Plan) => plan.isActive)
  } catch (err: any) {
    planActivationError.value = err.response?.data?.message || 'Failed to fetch plans'
    console.error('Failed to fetch plans:', err)
  } finally {
    loadingPlans.value = false
  }
}

const activatePlan = async (user: User) => {
  selectedUserForPlan.value = user
  showActivatePlanModal.value = true
  await fetchPlans()
}

const handlePlanActivation = async () => {
  if (!selectedUserForPlan.value?.id || !selectedPlan.value) return

  try {
    activatingPlan.value = true
    planActivationError.value = ''

    await useApi().post(`/admin/users/${selectedUserForPlan.value.id}/activate-plan`, {
      planId: selectedPlan.value,
      paymentMethod: 'admin_panel',
      transactionId: `admin_${Date.now()}`
    })

    await fetchUsers()
    closeActivatePlanModal()
  } catch (err: any) {
    planActivationError.value = err.response?.data?.message || 'Failed to activate plan'
    console.error('Failed to activate plan:', err)
  } finally {
    activatingPlan.value = false
  }
}

const closeActivatePlanModal = () => {
  showActivatePlanModal.value = false
  selectedUserForPlan.value = null
  selectedPlan.value = ''
  planActivationError.value = ''
}

const showSessionsModal = ref(false)
const selectedUserForSessions = ref<User | null>(null)
const userSessions = ref<Session[]>([])
const loadingSessions = ref(false)

const showUserSessions = async (user: User) => {
  selectedUserForSessions.value = user
  showSessionsModal.value = true
  await fetchUserSessions(user.id)
}

const closeSessionsModal = () => {
  showSessionsModal.value = false
  selectedUserForSessions.value = null
  userSessions.value = []
}

const fetchUserSessions = async (userId: string) => {
  try {
    loadingSessions.value = true
    const response = await useApi().get(`/admin/users/${userId}/sessions`)
    userSessions.value = response.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch user sessions'
    console.error('Failed to fetch user sessions:', err)
  } finally {
    loadingSessions.value = false
  }
}

const terminateSession = async (sessionId: string) => {
  if (!selectedUserForSessions.value) return

  try {
    await useApi().delete(`/admin/users/${selectedUserForSessions.value.id}/sessions/${sessionId}`)
    await fetchUserSessions(selectedUserForSessions.value.id)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to terminate session'
    console.error('Failed to terminate session:', err)
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}

const formatLastOnline = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  
  // Less than a minute
  if (diff < 60000) {
    return 'just now';
  }
  
  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than a day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // More than a day
  const days = Math.floor(diff / 86400000);
  if (days === 1) {
    return 'yesterday';
  }
  
  // If more than 7 days, show the date
  if (days > 7) {
    return new Date(timestamp).toLocaleDateString();
  }
  
  return `${days} days ago`;
};

onMounted(() => {
  fetchUsers()
})

// Watch isDeleted to automatically unblock when deleted
watch(() => formData.value.isDeleted, (newValue) => {
  if (newValue) {
    formData.value.isBlocked = false
  }
})

// Update the grid columns for stats cards
// const statsGridCols = computed(() => {
//   return 'grid-cols-1 sm:grid-cols-4'
// })

// Add these to the script section, before the existing refs
const dropdownPosition = ref<{ [key: string]: { top: string; left: string } }>({})

// Add this new method to handle dropdown positioning
const toggleDropdown = (event: MouseEvent, user: User) => {
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceRight = window.innerWidth - rect.left
  
  // Calculate if we need to show above or below
  const showAbove = spaceBelow < 320 // approximate height of dropdown
  
  // Calculate if we need to show left or right
  const showLeft = spaceRight < 250 // approximate width of dropdown
  
  dropdownPosition.value[user.id] = {
    top: `${showAbove ? rect.top - 320 : rect.bottom + 5}px`,
    left: `${showLeft ? rect.right - 250 : rect.left}px`
  }
  
  user.showActions = !user.showActions
  
  // Close other dropdowns
  users.value.forEach(u => {
    if (u.id !== user.id) {
      u.showActions = false
    }
  })
}

// const openChat = (user: User) => {
//   user.showActions = false // Close the dropdown
//   // Emit an event or use your chat system's method to open the chat
//   console.log('Opening chat with user:', user.name || user.email)
// }

const undeleteUser = async (user: User) => {
  if (user.role === 'admin') {
    return;
  }

  try {
    loading.value = true;
    error.value = '';
    
    await useApi().put(`/admin/users/${user.id}/undelete`);
    await fetchUsers();
  } catch (err: any) {
    console.error('Failed to undelete user:', err);
    error.value = err.response?.data?.message || 'Failed to undelete user';
  } finally {
    loading.value = false;
  }
}

// Add these new functions after the imports and before the interfaces
const getAvatarUrl = (avatarUrl: string) => {
  if (!avatarUrl) return '';
  return avatarUrl; // Return the URL as is since it's already a full URL
}

const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  const userId = img.alt?.split("'")[0] || ''; // Extract user name from alt text
  
  // Replace with fallback avatar div
  const parent = img.parentElement;
  if (parent) {
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center';
    const span = document.createElement('span');
    span.className = 'text-white font-medium';
    span.textContent = userId.charAt(0).toUpperCase() || 'U';
    fallbackDiv.appendChild(span);
    parent.replaceChild(fallbackDiv, img);
  }
}
</script> 