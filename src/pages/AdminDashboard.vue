<template>
  <div class="a-root">

    <!-- OVERLAY -->
    <Transition name="fade">
      <div v-if="leftDrawer||playerPanel" class="a-overlay" @click="leftDrawer=false;playerPanel=false" />
    </Transition>

    <!-- LEFT DRAWER -->
    <SiteDrawer />

    <!-- RIGHT PLAYER PANEL -->
    <PlayerDetailPanel />

    <!-- HEADER -->
    <header class="a-header">
      <!-- Row 1: Brand + Logout -->
      <div class="a-hdr-top">
        <div class="a-hdr-left">
          <button v-if="loggedIn" @click="leftDrawer=!leftDrawer" class="a-hamburger">
            <svg width="16" height="16" fill="none" stroke="#4f46e5" stroke-width="2.5" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="a-brand-block">
            <span class="a-brand">iW99</span>
            <span class="a-brand-sub">Admin</span>
          </div>
        </div>
        <!-- Pending TX Badge (real-time) -->
        <div v-if="loggedIn && stats.pending_tx > 0" class="a-pending-badge" @click="switchTab(1)">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {{ stats.pending_tx }} Pending
        </div>
        <!-- Sync Toggle -->
        <button v-if="loggedIn" @click="toggleSync" class="a-sync-toggle" :class="syncConnected ? 'a-sync--live' : syncEnabled ? 'a-sync--connecting' : 'a-sync--off'" :title="syncConnected ? 'Live sync ON — click to disable' : syncEnabled ? 'Connecting...' : 'Sync OFF — click to enable'">
          <span class="a-sync-dot"></span>
          <span class="a-sync-lbl">{{ syncConnected ? 'Live' : syncEnabled ? '···' : 'Off' }}</span>
        </button>
        <button v-if="loggedIn" @click="logout" class="a-logout">
          <svg width="14" height="14" fill="none" stroke="#64748b" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        </button>
      </div>
      <!-- Row 2: Tabs (full width scrollable) -->
      <div v-if="loggedIn" class="a-tabs-scroll">
        <button v-for="(tab, i) in tabs" :key="i" @click="switchTab(i)"
          class="a-tab" :class="activeTab===i?'a-tab--on':''">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" v-html="tab.icon"></svg>
          {{ tab.label }}
          <span v-if="i===1 && stats.pending_tx > 0" class="a-tab-badge">{{ stats.pending_tx }}</span>
        </button>
      </div>
    </header>

    <!-- BODY -->
    <div class="a-body">

      <!-- LOGIN -->
      <div v-if="!loggedIn" class="a-login-wrap">
        <div class="a-login-card">
          <svg class="a-login-icon" width="36" height="36" fill="none" stroke="#4f46e5" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          <h2 class="a-login-title">iW99 Admin</h2>
          <p class="a-login-sub">Enter your admin credentials</p>
          <input v-model="adminKey" type="password" placeholder="Admin Password" class="a-input" @keyup.enter="login" />
          <button @click="login" :disabled="loginLoading" class="a-btn-primary a-login-btn">
            <span v-if="loginLoading" class="a-spinner-sm"></span>
            {{ loginLoading ? 'Verifying...' : 'Login' }}
          </button>
          <p v-if="loginErr" class="a-err" style="margin-top:8px;text-align:center;">{{ loginErr }}</p>
        </div>
      </div>

      <!-- DASHBOARD TABS -->
      <div v-else>
        <AdminOverview      v-if="activeTab===0"  @switch-tab="switchTab" />
        <AdminTransactions  v-if="activeTab===1"  />
        <AdminSettings      v-if="activeTab===2"  />
        <AdminUsers         v-if="activeTab===3"  />
        <AdminGames         v-if="activeTab===4"  />
        <AdminMessages      v-if="activeTab===5"  />
        <AdminPromos        v-if="activeTab===6"  />
        <AdminAgents        v-if="activeTab===7"  />
        <AdminReports       v-if="activeTab===8"  />
        <AdminAudit         v-if="activeTab===9"  />
        <AdminVIP           v-if="activeTab===10" />
        <AdminBonus         v-if="activeTab===11" />
        <AdminFraud         v-if="activeTab===12" />
        <AdminKYC           v-if="activeTab===13" />
        <AdminSegments      v-if="activeTab===14" />
        <AdminRoles         v-if="activeTab===15" />
        <AdminSessions      v-if="activeTab===16" />
        <AdminProviders     v-if="activeTab===17" />
        <AdminBanners       v-if="activeTab===18" />
        <AdminReferralTree  v-if="activeTab===19" />
        <AdminURLs          v-if="activeTab===20" />
      </div>
    </div>

    <!-- TOAST -->
    <Transition name="toast-slide">
      <div v-if="toast.show" class="a-toast" :class="`toast-${toast.type}`">{{ toast.msg }}</div>
    </Transition>

  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
import {
  setupRealtimeNotifications, teardownRealtimeNotifications,
  requestNotifPermission
} from '@/composables/useAdmin'
import SiteDrawer        from '@/components/admin/SiteDrawer.vue'
import PlayerDetailPanel from '@/components/admin/PlayerDetailPanel.vue'
import AdminOverview     from '@/components/admin/AdminOverview.vue'
import AdminTransactions from '@/components/admin/AdminTransactions.vue'
import AdminSettings     from '@/components/admin/AdminSettings.vue'
import AdminUsers        from '@/components/admin/AdminUsers.vue'
import AdminGames        from '@/components/admin/AdminGames.vue'
import AdminMessages     from '@/components/admin/AdminMessages.vue'
import AdminPromos       from '@/components/admin/AdminPromos.vue'
import AdminAgents       from '@/components/admin/AdminAgents.vue'
import AdminReports      from '@/components/admin/AdminReports.vue'
import AdminAudit        from '@/components/admin/AdminAudit.vue'
import AdminVIP          from '@/components/admin/AdminVIP.vue'
import AdminBonus        from '@/components/admin/AdminBonus.vue'
import AdminFraud        from '@/components/admin/AdminFraud.vue'
import AdminKYC          from '@/components/admin/AdminKYC.vue'
import AdminSegments     from '@/components/admin/AdminSegments.vue'
import AdminRoles        from '@/components/admin/AdminRoles.vue'
import AdminSessions     from '@/components/admin/AdminSessions.vue'
import AdminProviders    from '@/components/admin/AdminProviders.vue'
import AdminBanners      from '@/components/admin/AdminBanners.vue'
import AdminReferralTree from '@/components/admin/AdminReferralTree.vue'
import AdminURLs        from '@/components/admin/AdminURLs.vue'

const {
  adminKey, loggedIn, loginLoading, loginErr,
  activeTab, leftDrawer, playerPanel, toast, stats,
  login, logout, tryAutoLogin,
  syncEnabled, syncConnected, newPendingCount,
  fetchTx, fetchSett, fetchUsers, fetchGames, fetchMsgs, loadOverview, loadStats, fetchPendingCount,
  fetchPromos, fetchAgents, fetchCommTx, fetchAuditLog, fetchIpList,
} = useAdmin()

const tabs = [
  { label: 'Overview',    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
  { label: 'TX',          icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>' },
  { label: 'Settings',   icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>' },
  { label: 'Users',      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/>' },
  { label: 'Games',      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>' },
  { label: 'Messages',   icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>' },
  { label: 'Promos',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>' },
  { label: 'Agents',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>' },
  { label: 'Reports',    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>' },
  { label: 'Audit',      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>' },
  { label: 'VIP',        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>' },
  { label: 'Bonus',      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>' },
  { label: 'Fraud',      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>' },
  { label: 'KYC',        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>' },
  { label: 'Segments',   icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>' },
  { label: 'Roles',      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>' },
  { label: 'Sessions',   icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/>' },
  { label: 'Providers',  icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>' },
  { label: 'Banners',    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>' },
  { label: 'Referral',   icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>' },
  { label: 'URLs',       icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>' },
]

const switchTab = async (i) => {
  activeTab.value = i; leftDrawer.value = false
  if (i === 1) { fetchTx(); fetchPendingCount() }
  if (i === 2)  fetchSett()
  if (i === 3)  fetchUsers()
  if (i === 4)  fetchGames()
  if (i === 5)  fetchMsgs()
  if (i === 6)  fetchPromos()
  if (i === 7)  { fetchAgents(); fetchCommTx() }
  if (i === 9)  { fetchAuditLog(); fetchIpList() }
  if (i === 10) fetchUsers()
  if (i === 14) fetchUsers()
  if (i === 19) fetchAgents()
}

const toggleSync = () => {
  if (syncEnabled.value) {
    syncEnabled.value = false
    teardownRealtimeNotifications()
  } else {
    syncEnabled.value = true
    setupRealtimeNotifications()
  }
}

import { onMounted, onUnmounted } from 'vue'
onMounted(async () => {
  try { await requestNotifPermission() } catch(e) {}
  setupRealtimeNotifications()
  const restored = await tryAutoLogin()
  if (restored) {
    await loadOverview()
    fetchSett()
  }
})
onUnmounted(() => { teardownRealtimeNotifications() })
</script>

<style>
/* ═══ ROOT ═══════════════════════════════════════════════════════ */
.a-root {
  min-height: 100vh; width: 100%;
  background: #f0f2f5; color: #0f172a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px; -webkit-tap-highlight-color: transparent;
  position: relative; overflow-x: hidden;
}

/* ═══ OVERLAY ════════════════════════════════════════════════════ */
.a-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(15,23,42,0.35); backdrop-filter: blur(2px); }
.fade-enter-active,.fade-leave-active { transition: opacity 0.22s }
.fade-enter-from,.fade-leave-to { opacity: 0 }

/* ═══ LEFT DRAWER ════════════════════════════════════════════════ */
.a-left-drawer {
  position: fixed; top: 0; left: 0; bottom: 0; z-index: 200;
  width: 260px; max-width: 80vw; background: #ffffff;
  border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; overflow: hidden;
}
.a-drawer-hdr { display: flex; align-items: center; justify-content: space-between; padding: 14px 14px 12px; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; }
.a-drawer-title { font-size: 12px; font-weight: 800; color: #4f46e5; letter-spacing: 0.06em; text-transform: uppercase; }
.a-drawer-body { flex: 1; overflow-y: auto; padding: 14px; scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent; }
.a-drawer-section { margin-bottom: 18px; }
.a-section-label { display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #4f46e5; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
.a-banner-row { display: flex; align-items: center; gap: 7px; margin-bottom: 6px; }
.a-banner-num { width: 16px; height: 16px; border-radius: 4px; background: #ede9fe; color: #4f46e5; font-size: 9px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.a-mini-label { display: block; font-size: 9px; color: #94a3b8; margin-bottom: 3px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
.slide-left-enter-active,.slide-left-leave-active { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1) }
.slide-left-enter-from,.slide-left-leave-to { transform: translateX(-100%) }

/* ═══ FULL SCREEN PLAYER PANEL ═══════════════════════════════════ */
.a-full-panel {
  position: fixed; inset: 0; z-index: 200;
  background: #f0f2f5; display: flex; flex-direction: column; overflow: hidden;
}
.a-full-hdr {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 16px; border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0; background: #ffffff; min-height: 50px;
}
.a-full-hdr-title { flex: 1; font-size: 14px; font-weight: 800; color: #0f172a; }
.a-full-body {
  flex: 1; overflow-y: auto; padding: 10px 12px 40px;
  scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent;
}
.a-full-body::-webkit-scrollbar { width: 3px; }
.a-full-body::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }
.slide-up-full-enter-active { transition: transform 0.3s cubic-bezier(0.32,0.72,0,1); }
.slide-up-full-leave-active  { transition: transform 0.25s cubic-bezier(0.32,0.72,0,1); }
.slide-up-full-enter-from, .slide-up-full-leave-to { transform: translateY(100%); }

/* Legacy right panel kept for compat */
.a-right-panel {
  position: fixed; top: 0; right: 0; bottom: 0; z-index: 200;
  width: 340px; max-width: 100vw; background: #ffffff;
  border-left: 1px solid #e2e8f0; display: flex; flex-direction: column; overflow: hidden;
}
.a-panel-hdr { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; background: #ffffff; }
.a-panel-title { flex: 1; font-size: 14px; font-weight: 800; color: #0f172a; }
.a-panel-av { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg,#4f46e5,#0891b2); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: #fff; flex-shrink: 0; }
.a-panel-body { flex: 1; overflow-y: auto; padding: 0; scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent; display: flex; flex-direction: column; }
.a-panel-body::-webkit-scrollbar { width: 3px; }
.a-panel-body::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }
.a-section-block { background: #ffffff; border-radius: 12px; padding: 14px 14px 12px; margin-bottom: 8px; }
.a-section-hdr { display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 800; color: #4f46e5; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
.slide-right-enter-active,.slide-right-leave-active { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1) }
.slide-right-enter-from,.slide-right-leave-to { transform: translateX(100%) }

/* ═══ BALANCE CARD ════════════════════════════════════════════════ */
.a-bal-card { background: linear-gradient(135deg,#4f46e5,#0891b2); border-radius: 12px; padding: 14px 16px; margin-bottom: 12px; text-align: center; }
.a-bal-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.7); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
.a-bal-value { font-size: 26px; font-weight: 900; color: #ffffff; line-height: 1.1; }
.a-bal-unit { font-size: 14px; font-weight: 700; opacity: 0.8; }

/* ═══ RISK SCORE ══════════════════════════════════════════════════ */
.a-risk-row { display: flex; align-items: center; padding: 7px 0; border-bottom: 1px solid #f1f5f9; gap: 10px; }
.a-risk-right { flex: 1; display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }
.a-risk-label { font-size: 10px; font-weight: 700; }
.a-risk-bar { width: 80px; height: 4px; background: #f1f5f9; border-radius: 2px; }
.a-risk-fill { height: 100%; border-radius: 2px; transition: width 0.5s; }

/* ═══ BALANCE ADJUST ══════════════════════════════════════════════ */
.a-adj-section { margin-top: 12px; background: #f8fafc; border-radius: 10px; padding: 10px; }
.a-adj-input-row { margin-bottom: 8px; }
.a-adj-btn-row { display: flex; gap: 8px; }
.a-adj-btn {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  padding: 9px 12px; border: none; border-radius: 9px; font-size: 11px; font-weight: 800;
  cursor: pointer; transition: opacity 0.15s; letter-spacing: 0.02em;
}
.a-adj-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.a-adj-btn--add    { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
.a-adj-btn--add:hover:not(:disabled) { background: #bbf7d0; }
.a-adj-btn--deduct { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
.a-adj-btn--deduct:hover:not(:disabled) { background: #fecaca; }
.a-adj-msg { font-size: 10px; font-weight: 700; color: #4f46e5; margin-top: 6px; text-align: center; }

/* ═══ TX STAT GRID ════════════════════════════════════════════════ */
.a-stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; margin-bottom: 10px; }
.a-stat-tile { background: #f8fafc; border-radius: 8px; padding: 8px 6px; text-align: center; }
.a-stat-val { font-size: 15px; font-weight: 900; color: #0f172a; line-height: 1.1; }
.a-stat-lbl { font-size: 8px; color: #94a3b8; margin-top: 2px; font-weight: 600; }
.a-stat-tile--in     .a-stat-val { color: #0891b2; }
.a-stat-tile--out    .a-stat-val { color: #dc2626; }
.a-stat-tile--warn   .a-stat-val { color: #d97706; }
.a-stat-tile--purple .a-stat-val { color: #4f46e5; }

/* ═══ PAYMENT METHOD ROW ══════════════════════════════════════════ */
.a-method-row { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid #f1f5f9; }
.a-method-row:last-child { border-bottom: none; }
.a-method-badge { font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 6px; letter-spacing: 0.04em; flex-shrink: 0; }
.a-method-badge--in  { background: #e0f2fe; color: #0891b2; }
.a-method-badge--out { background: #fee2e2; color: #dc2626; }
.a-method-stats { flex: 1; display: flex; justify-content: flex-end; align-items: center; gap: 10px; }
.a-method-count { font-size: 9px; color: #94a3b8; font-weight: 600; }
.a-ptx-date { font-size: 9px; color: #94a3b8; flex: 1; text-align: right; }

/* ═══ ROWS ════════════════════════════════════════════════════════ */
.a-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid #f1f5f9; }
.a-row-last { border-bottom: none; padding-bottom: 0; }
.a-lbl { font-size: 11px; color: #64748b; }
.a-lbl-icon { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #64748b; }
.a-val-dark { font-size: 11px; font-weight: 700; color: #0f172a; text-align: right; }
.a-mono-val { font-family: monospace; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; }
.a-val-accent  { font-size: 11px; font-weight: 700; color: #4f46e5; }
.a-val-in      { font-size: 11px; font-weight: 700; color: #0891b2; }
.a-val-out     { font-size: 11px; font-weight: 700; color: #dc2626; }
.a-val-success { font-size: 11px; font-weight: 700; color: #16a34a; }
.a-val-danger  { font-size: 11px; font-weight: 700; color: #dc2626; }
.a-val-warn    { font-size: 11px; font-weight: 700; color: #d97706; }

/* ═══ BADGES ══════════════════════════════════════════════════════ */
.a-badge-success { font-size: 10px; font-weight: 800; color: #16a34a; background: #dcfce7; padding: 2px 8px; border-radius: 99px; letter-spacing: 0.05em; }
.a-badge-danger  { font-size: 10px; font-weight: 800; color: #dc2626; background: #fee2e2; padding: 2px 8px; border-radius: 99px; letter-spacing: 0.05em; }
.a-io-badge { font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.06em; flex-shrink: 0; }
.badge-in  { background: #e0f2fe; color: #0891b2; }
.badge-out { background: #fee2e2; color: #dc2626; }
.a-sbadge { font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.04em; }
.sb-pending   { background: #fef9c3; color: #854d0e; }
.sb-confirmed { background: #dcfce7; color: #15803d; }
.sb-rejected  { background: #fee2e2; color: #dc2626; }
.sdot-confirmed { background: #dcfce7; color: #16a34a; }
.sdot-pending   { background: #fef9c3; color: #854d0e; }
.sdot-rejected  { background: #fee2e2; color: #dc2626; }

/* ═══ HEADER ══════════════════════════════════════════════════════ */
.a-header {
  position: sticky; top: 0; z-index: 50; background: #ffffff;
  border-bottom: 1px solid #e2e8f0; width: 100%; box-sizing: border-box;
  display: flex; flex-direction: column;
}
.a-hdr-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 10px; min-height: 44px; gap: 8px;
}
.a-hdr-left { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.a-hamburger { background: #ede9fe; border: none; border-radius: 8px; padding: 7px; cursor: pointer; display: flex; align-items: center; transition: background 0.15s; }
.a-hamburger:active { background: #ddd6fe; }
.a-brand-block { display: flex; flex-direction: column; line-height: 1; }
.a-brand { font-size: 15px; font-weight: 900; color: #4f46e5; letter-spacing: 0.04em; }
.a-brand-sub { font-size: 8px; color: #94a3b8; font-weight: 600; letter-spacing: 0.08em; margin-top: 1px; text-transform: uppercase; }
.a-tabs-scroll {
  display: flex; overflow-x: auto; scrollbar-width: none;
  width: 100%; border-top: 1px solid #f1f5f9;
}
.a-tabs-scroll::-webkit-scrollbar { display: none; }
.a-tab {
  flex-shrink: 0; display: flex; align-items: center; gap: 4px; position: relative;
  padding: 10px 12px; font-size: 10px; font-weight: 600; white-space: nowrap;
  background: none; border: none; border-bottom: 2px solid transparent;
  color: #94a3b8; cursor: pointer; transition: color 0.15s, border-color 0.15s;
}
.a-tab--on { color: #4f46e5; border-bottom-color: #4f46e5; }
.a-tab-badge {
  position: absolute; top: 3px; right: 2px;
  min-width: 16px; height: 16px; padding: 0 4px;
  border-radius: 99px; background: #dc2626; color: #fff;
  font-size: 9px; font-weight: 800; line-height: 16px;
  text-align: center; pointer-events: none;
  animation: tab-badge-pop 0.25s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes tab-badge-pop { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.a-logout { flex-shrink: 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; padding: 6px 8px; cursor: pointer; display: flex; align-items: center; }
.a-logout:active { background: #f1f5f9; }

/* ═══ SYNC TOGGLE ════════════════════════════════════════════════ */
.a-sync-toggle {
  flex-shrink: 0; display: flex; align-items: center; gap: 4px;
  border: none; border-radius: 99px; padding: 5px 9px;
  font-size: 9px; font-weight: 800; cursor: pointer;
  transition: background 0.2s, color 0.2s; letter-spacing: 0.04em;
}
.a-sync-dot {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  transition: background 0.3s;
}
.a-sync-lbl { line-height: 1; }
.a-sync--live   { background: #dcfce7; color: #15803d; }
.a-sync--live   .a-sync-dot { background: #16a34a; animation: sync-pulse 2s infinite; }
.a-sync--connecting { background: #fef9c3; color: #854d0e; }
.a-sync--connecting .a-sync-dot { background: #f59e0b; animation: sync-pulse 0.8s infinite; }
.a-sync--off    { background: #f1f5f9; color: #94a3b8; }
.a-sync--off    .a-sync-dot { background: #cbd5e1; }
@keyframes sync-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

/* ═══ PENDING BADGE ════════════════════════════════════════════════ */
.a-pending-badge {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 4px;
  background: #fef9c3; color: #854d0e; font-size: 10px; font-weight: 800;
  padding: 5px 10px; border-radius: 99px; cursor: pointer; border: 1px solid #fde68a;
  animation: pulse-warn 2s infinite;
}
@keyframes pulse-warn { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }

/* ═══ BODY ════════════════════════════════════════════════════════ */
.a-body { padding: 12px 10px 28px; width: 100%; box-sizing: border-box; }
.a-tab-content { display: flex; flex-direction: column; gap: 0; }

/* ═══ LOGIN ═══════════════════════════════════════════════════════ */
.a-login-wrap { display: flex; justify-content: center; padding-top: 70px; }
.a-login-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 32px 24px; width: 100%; max-width: 320px; text-align: center; }
.a-login-icon { display: block; margin: 0 auto 14px; }
.a-login-title { font-size: 18px; font-weight: 900; color: #4f46e5; margin-bottom: 4px; }
.a-login-sub { font-size: 11px; color: #94a3b8; margin-bottom: 18px; }
.a-login-btn { width: 100%; padding: 12px; margin-top: 10px; }

/* ═══ METRICS ═════════════════════════════════════════════════════ */
.a-metrics-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-bottom: 10px; }
@media(max-width:400px) { .a-metrics-grid { grid-template-columns: repeat(2,1fr); } }
.a-mcard { background: #ffffff; border-radius: 12px; padding: 10px 10px 8px; }
.a-mcard-icon { width: 26px; height: 26px; border-radius: 7px; background: #ede9fe; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; }
.a-mcard-val { font-size: 15px; font-weight: 900; color: #0f172a; line-height: 1.1; }
.a-mcard-lbl { font-size: 9px; color: #94a3b8; margin: 2px 0 6px; }
.a-mbar { height: 3px; background: #f1f5f9; border-radius: 2px; }
.a-mbar-fill { height: 100%; border-radius: 2px; transition: width 0.6s; }

/* ═══ CHART ═══════════════════════════════════════════════════════ */
.a-row-2col { display: grid; grid-template-columns: 1fr 120px; gap: 8px; margin-bottom: 8px; }
@media(max-width:380px) { .a-row-2col { grid-template-columns: 1fr; } }
.a-chart-area { background: #ffffff; border-radius: 12px; padding: 10px 10px 8px; }
.a-area-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.a-area-ttl { font-size: 11px; font-weight: 800; color: #0f172a; }
.a-barchart { width: 100%; height: 80px; display: block; }
.a-legend { display: flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 9px; color: #64748b; }
.a-leg-dot { width: 8px; height: 8px; border-radius: 2px; display: inline-block; }
.a-gauges { display: flex; flex-direction: column; gap: 8px; }
.a-g-area { background: #ffffff; border-radius: 12px; padding: 10px 10px 8px; text-align: center; }
.a-gauge-svg { width: 100%; display: block; }
.a-big-n { font-size: 15px; font-weight: 900; color: #0f172a; }
.a-pbar { height: 4px; background: #f1f5f9; border-radius: 2px; margin-top: 6px; }
.a-pbar-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg,#4f46e5,#0891b2); transition: width 0.6s; }
.a-icon-btn { background: none; border: none; cursor: pointer; padding: 4px; border-radius: 6px; }
.a-icon-btn:hover { background: #f1f5f9; }
.spinning { animation: spin .8s linear infinite; }
@keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }

/* ═══ HEALTH & LIVE ═══════════════════════════════════════════════ */
.a-area-block { background: #ffffff; border-radius: 12px; padding: 10px 12px 10px; margin-bottom: 8px; }
.a-live { font-size: 8px; font-weight: 800; color: #16a34a; background: #dcfce7; padding: 2px 7px; border-radius: 99px; letter-spacing: 0.06em; animation: pulse-live 2s infinite; }
@keyframes pulse-live { 0%,100%{opacity:1}50%{opacity:0.6} }
.a-health { display: flex; align-items: center; gap: 8px; padding: 5px 0; }
.a-health-l { font-size: 9px; color: #64748b; width: 90px; flex-shrink: 0; }
.a-health-t { flex: 1; height: 5px; background: #f1f5f9; border-radius: 3px; }
.a-health-f { height: 100%; border-radius: 3px; transition: width 0.5s; }
.a-health-v { font-size: 9px; font-weight: 800; color: #0f172a; width: 28px; text-align: right; }

/* ═══ RECENT TX ════════════════════════════════════════════════════ */
.a-rtx { display: flex; align-items: center; gap: 7px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
.a-rtx:last-child { border-bottom: none; }
.a-rtx-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.dot-in  { background: #0891b2; }
.dot-out { background: #dc2626; }
.a-rtx-user { flex: 1; font-size: 10px; color: #64748b; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.a-rtx-method { font-size: 9px; color: #94a3b8; flex-shrink: 0; }
.a-rtx-amt { font-size: 10px; font-weight: 800; flex-shrink: 0; }
.a-mini-load { display: flex; justify-content: center; padding: 10px; }
.a-lnk { font-size: 10px; color: #4f46e5; font-weight: 700; background: none; border: none; cursor: pointer; padding: 0; }

/* ═══ BUTTONS ═════════════════════════════════════════════════════ */
.a-btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  background: #4f46e5; color: #fff; border: none; border-radius: 10px;
  padding: 10px 16px; font-size: 11px; font-weight: 700; cursor: pointer; transition: opacity 0.15s;
}
.a-btn-primary:hover:not(:disabled) { opacity: 0.9; }
.a-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
.a-btn-primary-sm { background: #4f46e5; color: #fff; border: none; border-radius: 7px; padding: 6px 10px; font-size: 10px; font-weight: 700; cursor: pointer; display:inline-flex;align-items:center;gap:4px; }
.a-btn-sm {
  display: inline-flex; align-items: center; justify-content: center; gap: 4px;
  padding: 5px 10px; border-radius: 7px; font-size: 10px; font-weight: 700;
  cursor: pointer; border: none; transition: opacity 0.15s;
}
.a-btn-sm:disabled { opacity: 0.45; cursor: not-allowed; }
.a-btn-sm-p {
  display: inline-flex; align-items: center; justify-content: center; gap: 4px;
  background: #4f46e5; color: #fff; border: none; border-radius: 8px;
  padding: 7px 12px; font-size: 10px; font-weight: 700; cursor: pointer;
}
.a-btn-success { background: #dcfce7; color: #15803d; }
.a-btn-success:hover:not(:disabled) { background: #bbf7d0; }
.a-btn-danger  { background: #fee2e2; color: #dc2626; }
.a-btn-danger:hover:not(:disabled) { background: #fecaca; }
.a-btn-ghost   { background: #f1f5f9; color: #64748b; }
.a-btn-ghost:hover:not(:disabled) { background: #e2e8f0; }

/* ═══ TOGGLE ══════════════════════════════════════════════════════ */
.a-tog { border: none; border-radius: 6px; padding: 4px 9px; font-size: 10px; font-weight: 800; cursor: pointer; letter-spacing: 0.03em; transition: opacity 0.15s; }
.a-tog:disabled { opacity: 0.45; cursor: not-allowed; }
.a-tog-on     { background: #dcfce7; color: #15803d; }
.a-tog-off    { background: #f1f5f9; color: #94a3b8; }
.a-tog-danger { background: #fee2e2; color: #dc2626; }

/* ═══ FORM ════════════════════════════════════════════════════════ */
.a-input {
  width: 100%; box-sizing: border-box;
  border: 1px solid #e2e8f0; border-radius: 8px;
  padding: 8px 10px; font-size: 11px; color: #0f172a;
  background: #fff; outline: none; transition: border-color 0.15s;
}
.a-input:focus { border-color: #a5b4fc; }
.a-input::placeholder { color: #cbd5e1; }
.a-input-sm { padding: 6px 8px; font-size: 10px; }
.a-select {
  border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 10px;
  font-size: 10px; color: #0f172a; background: #fff; outline: none;
}
.a-textarea { resize: vertical; min-height: 60px; line-height: 1.5; }
.a-srch { min-width: 0; flex: 1; }
.a-filter-bar { display: flex; gap: 6px; margin-bottom: 10px; align-items: center; }
.a-form-row { display: flex; gap: 8px; }
.a-form-col { flex: 1; min-width: 0; }

/* ═══ SETTINGS ════════════════════════════════════════════════════ */
.a-sett-block { background: #ffffff; border-radius: 12px; padding: 14px 14px 12px; margin-bottom: 8px; }
.a-sett-ttl { font-size: 11px; font-weight: 800; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; }
.a-vip-grid { display: flex; flex-direction: column; gap: 8px; }
.a-vip-row { display: flex; align-items: center; gap: 8px; }
.a-vip-badge { font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 6px; flex-shrink: 0; }

/* ═══ TX ROWS ═════════════════════════════════════════════════════ */
.a-tx-row { padding: 8px 4px; border-bottom: 1px solid #f1f5f9; }
.a-tx-top { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.a-tx-amt { font-size: 13px; font-weight: 900; color: #0f172a; flex: 1; }
.a-tx-meta { display: flex; gap: 8px; flex-wrap: wrap; font-size: 9.5px; color: #94a3b8; margin-bottom: 4px; }
.a-tx-actions { display: flex; gap: 5px; }

/* ═══ USER ROW ════════════════════════════════════════════════════ */
.a-user-row { display: flex; align-items: center; gap: 10px; padding: 9px 4px; border-bottom: 1px solid #f1f5f9; }
.a-uav { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#4f46e5,#0891b2); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #fff; flex-shrink: 0; }
.a-uinfo { flex: 1; min-width: 0; }
.a-uname { display: block; font-size: 11px; font-weight: 700; color: #0f172a; }
.a-umeta { font-size: 9px; color: #94a3b8; }
.a-uright { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }
.a-ubal { font-size: 11px; font-weight: 700; color: #0f172a; }
.a-eye-btn { background: none; border: none; cursor: pointer; padding: 4px; border-radius: 6px; }
.a-risk-flag { font-size: 10px; font-weight: 800; padding: 2px 5px; border-radius: 4px; flex-shrink: 0; }
.a-risk-flag--high { background: #fee2e2; color: #dc2626; }
.a-risk-flag--med  { background: #fef9c3; color: #854d0e; }
.a-vip-pill { display: inline-block; font-size: 8px; font-weight: 800; background: #fef9c3; color: #854d0e; padding: 1px 5px; border-radius: 4px; margin-left: 4px; }

/* ═══ GAME ROW ════════════════════════════════════════════════════ */
.a-game-row { display: flex; align-items: center; gap: 10px; padding: 8px 4px; border-bottom: 1px solid #f1f5f9; }
.a-game-thumb { width: 40px; height: 40px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
.a-game-thumb img { width: 100%; height: 100%; object-fit: cover; }
.a-game-thumb-ph { width: 40px; height: 40px; border-radius: 8px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.a-game-info { flex: 1; min-width: 0; }
.a-game-name { display: block; font-size: 11px; font-weight: 700; color: #0f172a; }
.a-game-cat { font-size: 9px; color: #94a3b8; }

/* ═══ PROMO ROW ═══════════════════════════════════════════════════ */
.a-promo-row { display: flex; align-items: center; gap: 8px; padding: 9px 4px; border-bottom: 1px solid #f1f5f9; }
.a-promo-code { font-family: monospace; font-size: 13px; font-weight: 900; color: #4f46e5; letter-spacing: 0.1em; flex-shrink: 0; }
.a-promo-info { flex: 1; min-width: 0; }
.a-promo-amt { font-size: 11px; font-weight: 800; color: #16a34a; }
.a-promo-uses { font-size: 9px; color: #94a3b8; }

/* ═══ REPORTS ═════════════════════════════════════════════════════ */
.a-ptx-row { display: flex; align-items: center; gap: 6px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-size: 10px; }
.a-ptx-method { flex: 1; color: #64748b; }
.a-ptx-amt { flex-shrink: 0; font-weight: 700; }
.a-ptx-status { font-size: 9px; padding: 1px 5px; border-radius: 3px; flex-shrink: 0; }

/* ═══ AGENT ROW ═══════════════════════════════════════════════════ */
.a-ag-row { display: flex; align-items: center; gap: 10px; padding: 9px 4px; border-bottom: 1px solid #f1f5f9; }
.a-ag-av { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#d97706,#f59e0b); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #fff; flex-shrink: 0; }
.a-ag-info { flex: 1; min-width: 0; }
.a-ag-name { display: block; font-size: 11px; font-weight: 700; color: #0f172a; }
.a-ag-meta { font-size: 9px; color: #94a3b8; }
.a-ag-right { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.a-ag-comm { font-size: 12px; font-weight: 900; color: #16a34a; }
.a-ag-label { font-size: 8px; color: #94a3b8; }

/* ═══ AUDIT LOG ═══════════════════════════════════════════════════ */
.a-audit-row { display: flex; align-items: flex-start; gap: 8px; padding: 7px 0; border-bottom: 1px solid #f1f5f9; }
.a-audit-action { font-size: 9px; font-weight: 800; background: #ede9fe; color: #4f46e5; padding: 2px 6px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; }
.a-audit-target { font-size: 10px; font-weight: 700; color: #0f172a; }
.a-audit-detail { font-size: 9px; color: #94a3b8; margin-top: 1px; }
.a-audit-date { font-size: 9px; color: #94a3b8; flex-shrink: 0; }

/* ═══ MISC ════════════════════════════════════════════════════════ */
.a-loading { display: flex; justify-content: center; padding: 30px; }
.a-spinner { width: 22px; height: 22px; border: 3px solid #e2e8f0; border-top-color: #4f46e5; border-radius: 50%; animation: spin .7s linear infinite; }
.a-spinner-sm { width: 12px; height: 12px; border: 2px solid rgba(255,255,255,0.4); border-top-color: currentColor; border-radius: 50%; animation: spin .7s linear infinite; display: inline-block; }
@keyframes spin { to { transform: rotate(360deg) } }
.a-err { font-size: 10px; color: #dc2626; font-weight: 600; }
.a-ok  { font-size: 10px; color: #16a34a; font-weight: 600; }
.a-empty { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 30px 10px; font-size: 11px; color: #94a3b8; }
.a-empty-sm { font-size: 10px; color: #94a3b8; text-align: center; padding: 8px 0; }
.a-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #16a34a; animation: pulse-live 2s infinite; }

/* ═══ TOAST ═══════════════════════════════════════════════════════ */
.a-toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  padding: 10px 20px; border-radius: 99px; font-size: 11px; font-weight: 700;
  z-index: 9999; box-shadow: 0 4px 16px rgba(0,0,0,0.15); white-space: nowrap;
}
.toast-success { background: #0f172a; color: #4ade80; }
.toast-error   { background: #dc2626; color: #fff; }
.toast-info    { background: #0f172a; color: #fff; }
.toast-slide-enter-active,.toast-slide-leave-active { transition: all 0.3s; }
.toast-slide-enter-from,.toast-slide-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }
</style>
