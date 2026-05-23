import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PromotionsPage from '@/pages/PromotionsPage.vue'
import AgentDashboard from '@/pages/AgentDashboard.vue'
import ServicePage from '@/pages/ServicePage.vue'
import AccountPage from '@/pages/AccountPage.vue'
import AdminDashboard from '@/pages/AdminDashboard.vue'
import { supabase } from '@/lib/supabase'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomePage },
  { path: '/promotions', component: PromotionsPage, meta: { requiresAuth: true } },
  { path: '/agent', component: AgentDashboard, meta: { requiresAuth: true } },
  { path: '/service', component: ServicePage, meta: { requiresAuth: true } },
  { path: '/account', component: AccountPage, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminDashboard },
  { path: '/login', redirect: '/home?auth=login' },
  { path: '/register', redirect: '/home?auth=register' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ── Auth Guard ──────────────────────────────────────────────────
// FIX: Use supabase.auth.getSession() as the single source of truth.
// The old guard used localStorage.getItem('sb_token') which breaks when:
//   1. The JWT access token expires (default: 1 hour) — token still EXISTS in
//      localStorage as a string but is invalid for protected API calls.
//   2. The user opens a new tab or refreshes — Supabase auto-refreshes its own
//      session internally, but the manually-stored sb_token is never updated.
//   3. First-time or incognito users — sb_token never written, every protected
//      tap immediately bounces back to /home?auth=login (infinite redirect loop).
//
// The fix: await supabase.auth.getSession() which reads Supabase's own
// localStorage keys, verifies the session, and auto-refreshes if needed.
// We then keep sb_token in sync so any legacy code that reads it still works.
// ───────────────────────────────────────────────────────────────
router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      // Keep sb_token in sync with the live (possibly refreshed) access token
      if (session.access_token) {
        localStorage.setItem('sb_token', session.access_token)
      }
      if (session.user?.user_metadata?.username) {
        localStorage.setItem('sb_username', session.user.user_metadata.username)
      }
      next()
    } else {
      // No valid session — clear stale token and redirect to login
      localStorage.removeItem('sb_token')
      next('/home?auth=login')
    }
  } catch (err) {
    // Network or Supabase error — fail open to login rather than hard block
    console.error('[Router] Auth check failed:', err)
    localStorage.removeItem('sb_token')
    next('/home?auth=login')
  }
})

export default router
