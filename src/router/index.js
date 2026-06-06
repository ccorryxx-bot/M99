import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PromotionsPage from '@/pages/PromotionsPage.vue'
import AgentDashboard from '@/pages/AgentDashboard.vue'
import ReferralPage from '@/pages/ReferralPage.vue'
import ServicePage from '@/pages/ServicePage.vue'
import AccountPage from '@/pages/AccountPage.vue'
import AdminDashboard from '@/pages/AdminDashboard.vue'
import DeviceSessionsPage from '@/pages/DeviceSessionsPage.vue'
import { supabase } from '@/supabase'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomePage },
  { path: '/promotions', component: PromotionsPage, meta: { requiresAuth: true } },
  { path: '/network', component: ReferralPage, meta: { requiresAuth: true } },
  { path: '/agent', component: AgentDashboard, meta: { requiresAuth: true } },
  { path: '/service', component: ServicePage, meta: { requiresAuth: true } },
  { path: '/account', component: AccountPage, meta: { requiresAuth: true } },
  { path: '/device-sessions', component: DeviceSessionsPage, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminDashboard },
  { path: '/login', redirect: '/home?auth=login' },
  { path: '/register', redirect: '/home?auth=register' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      if (session.access_token) {
        localStorage.setItem('sb_token', session.access_token)
      }
      if (session.user?.user_metadata?.username) {
        localStorage.setItem('sb_username', session.user.user_metadata.username)
      }
      next()
    } else {
      localStorage.removeItem('sb_token')
      next('/home?auth=login')
    }
  } catch (err) {
    console.error('[Router] Auth check failed:', err)
    localStorage.removeItem('sb_token')
    next('/home?auth=login')
  }
})

export default router
