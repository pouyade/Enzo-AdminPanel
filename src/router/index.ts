import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout.vue'
import Login from '@/pages/LoginPage.vue'
import VoucherList from '@/pages/VoucherListPage.vue'
import Dashboard from '@/pages/DashboardPage.vue'
import Plans from '@/pages/PlansPage.vue'
import Payments from '@/pages/PaymentsPage.vue'
import Support from '@/pages/SupportPage.vue'
import Analytics from '@/pages/AnalyticsPage.vue'
import Users from '@/pages/UsersPage.vue'
import Logs from '@/pages/LogsPage.vue'
import Settings from '@/pages/SettingsPage.vue'
import UpdateManager from '@/pages/UpdateManagerPage.vue'
import UploadManager from '@/pages/UploadManagerPage.vue'
import FileUploadLedger from '@/pages/FileUploadLedgerPage.vue'
import RequestLogs from '@/pages/RequestLogsPage.vue'
import BlockList from '@/pages/BlockListPage.vue'
import CrashReports from '@/pages/CrashReportsPage.vue'
import CrashBugs from '@/pages/CrashBugsPage.vue'
import MaintenanceManager from '@/pages/MaintenanceManagerPage.vue'
import TextManager from '@/pages/TextManagerPage.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'AdminLogin',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
         meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
         meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'plans',
        name: 'Plans',
        component: Plans,
         meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'payments',
        name: 'Payments',
        component: Payments,
         meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'support',
        name: 'Support',
        component: Support,
         meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: Analytics,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'logs',
        name: 'Logs',
        component: Logs
      },
      {
        path: 'request-logs',
        name: 'RequestLogs',
        component: RequestLogs,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: 'update-manager',
        name: 'UpdateManager',
        component: UpdateManager,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'upload-manager',
        name: 'UploadManager',
        component: UploadManager,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'file-ledger',
        name: 'FileUploadLedger',
        component: FileUploadLedger,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'block-list',
        name: 'Block list',
        component: BlockList,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'vouchers',
        name: 'Vouchers',
        component: VoucherList,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'maintenance',
        name: 'MaintenanceManager',
        component: MaintenanceManager,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'texts',
        name: 'TextManager',
        component:TextManager,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'crash-reports',
        name: 'CrashReports',
        component: CrashReports,
        meta: {
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: 'crash-bugs',
        name: 'CrashBugs',
        component: CrashBugs,
        meta: {
          requiresAuth: true,
          requiresAdmin: true
        }
      }
    ]
  },
  {
    path: '/',
    redirect: '/admin/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach(async (to, _from, next) => {
  const adminToken = localStorage.getItem('admin_token')
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}')
  const isAuthenticated = !!adminToken && adminUser.isAdmin
  console.log(adminToken,adminUser,isAuthenticated)

  // Guest routes (login)
  if (to.meta.requiresGuest) {
    if (isAuthenticated) {
      next('/')
    } else {
      next()
    }
    return
  }

  // Admin routes
  if (to.meta.requiresAdmin && !isAuthenticated) {
      next('/login')
  }

  next()
})

export default router 