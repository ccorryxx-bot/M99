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
        <AdminOverview   v-if="activeTab===0" @switch-tab="switchTab" />
        <AdminTransactions v-if="activeTab===1" />
        <AdminSettings   v-if="activeTab===2" />
        <AdminUsers      v-if="activeTab===3" />
        <AdminGames      v-if="activeTab===4" />
        <AdminMessages   v-if="activeTab===5" />
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
import SiteDrawer       from '@/components/admin/SiteDrawer.vue'
import PlayerDetailPanel from '@/components/admin/PlayerDetailPanel.vue'
import AdminOverview    from '@/components/admin/AdminOverview.vue'
import AdminTransactions from '@/components/admin/AdminTransactions.vue'
import AdminSettings    from '@/components/admin/AdminSettings.vue'
import AdminUsers       from '@/components/admin/AdminUsers.vue'
import AdminGames       from '@/components/admin/AdminGames.vue'
import AdminMessages    from '@/components/admin/AdminMessages.vue'

const {
  adminKey, loggedIn, loginLoading, loginErr,
  activeTab, leftDrawer, playerPanel, toast,
  login, logout,
  fetchTx, fetchSett, fetchUsers, fetchGames, fetchMsgs, loadOverview,
} = useAdmin()

const tabs = [
  { label: 'Overview',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
  { label: 'Transactions', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>' },
  { label: 'Settings',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>' },
  { label: 'Users',        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/>' },
  { label: 'Games',        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>' },
  { label: 'Messages',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>' },
]

const switchTab = async (i) => {
  activeTab.value = i; leftDrawer.value = false
  if (i === 0) loadOverview()
  if (i === 1) fetchTx()
  if (i === 2) fetchSett()
  if (i === 3) fetchUsers()
  if (i === 4) fetchGames()
  if (i === 5) fetchMsgs()
}
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

/* ═══ RIGHT PLAYER PANEL ══════════════════════════════════════════ */
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
.a-section-block { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; }
.a-section-hdr { display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 800; color: #4f46e5; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
.slide-right-enter-active,.slide-right-leave-active { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1) }
.slide-right-enter-from,.slide-right-leave-to { transform: translateX(100%) }

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
  flex-shrink: 0; display: flex; align-items: center; gap: 4px;
  padding: 10px 12px; font-size: 10px; font-weight: 600; white-space: nowrap;
  background: none; border: none; border-bottom: 2px solid transparent;
  color: #94a3b8; cursor: pointer; transition: color 0.15s, border-color 0.15s;
}
.a-tab--on { color: #4f46e5; border-bottom-color: #4f46e5; }
.a-logout { flex-shrink: 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; padding: 6px 8px; cursor: pointer; display: flex; align-items: center; }
.a-logout:active { background: #f1f5f9; }

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
.a-g-area { background: #ffffff; border-radius: 12px; padding: 10px 8px; text-align: center; }
.a-gauge-svg { width: 100%; max-width: 80px; display: block; margin: 0 auto; }
.a-big-n { font-size: 16px; font-weight: 900; color: #0f172a; }
.a-pbar { height: 4px; background: #f1f5f9; border-radius: 2px; margin-top: 6px; }
.a-pbar-fill { height: 100%; background: linear-gradient(90deg,#4f46e5,#0891b2); border-radius: 2px; transition: width 0.6s; }

/* ═══ AREA BLOCKS ═════════════════════════════════════════════════ */
.a-area-block { background: #ffffff; border-radius: 12px; padding: 10px 12px; margin-bottom: 8px; }
.a-live { font-size: 8px; font-weight: 800; color: #16a34a; background: #dcfce7; padding: 2px 6px; border-radius: 99px; letter-spacing: 0.06em; }
.a-lnk { font-size: 10px; color: #4f46e5; font-weight: 700; background: none; border: none; cursor: pointer; padding: 0; }
.a-health { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
.a-health-l { font-size: 9px; color: #64748b; width: 90px; flex-shrink: 0; }
.a-health-t { flex: 1; height: 4px; background: #f1f5f9; border-radius: 2px; }
.a-health-f { height: 100%; border-radius: 2px; transition: width 0.6s; }
.a-health-v { font-size: 9px; font-weight: 700; color: #0f172a; width: 28px; text-align: right; }

/* ═══ RECENT TX ═══════════════════════════════════════════════════ */
.a-rtx { display: flex; align-items: center; gap: 7px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
.a-rtx:last-child { border-bottom: none; }
.a-rtx-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.dot-in  { background: #0891b2; }
.dot-out { background: #dc2626; }
.a-rtx-user   { font-size: 10px; color: #64748b; flex: 1; }
.a-rtx-method { font-size: 10px; color: #94a3b8; }
.a-rtx-amt    { font-size: 10px; font-weight: 700; }

/* ═══ TX TAB ══════════════════════════════════════════════════════ */
.a-filter-bar { display: flex; gap: 6px; margin-bottom: 10px; flex-wrap: wrap; }
.a-select { padding: 7px 8px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 11px; color: #0f172a; background: #ffffff; flex-shrink: 0; outline: none; }
.a-tx-row { background: #ffffff; border-radius: 10px; padding: 10px 12px; margin-bottom: 6px; }
.a-tx-top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.a-tx-amt { flex: 1; font-size: 13px; font-weight: 900; color: #0f172a; }
.a-tx-meta { display: flex; gap: 10px; font-size: 10px; color: #94a3b8; flex-wrap: wrap; }
.a-tx-actions { display: flex; gap: 7px; margin-top: 8px; }

/* ═══ SETTINGS ════════════════════════════════════════════════════ */
.a-sett-block { background: #ffffff; border-radius: 12px; padding: 14px 14px 12px; margin-bottom: 8px; }
.a-sett-ttl { font-size: 12px; font-weight: 800; color: #0f172a; margin-bottom: 10px; }
.a-textarea { resize: vertical; min-height: 60px; line-height: 1.5; }

/* ═══ USERS ═══════════════════════════════════════════════════════ */
.a-user-row { display: flex; align-items: center; gap: 10px; background: #ffffff; border-radius: 10px; padding: 10px 12px; margin-bottom: 6px; transition: background 0.12s; }
.a-user-row:active { background: #f8fafc; }
.a-eye-btn {
  flex-shrink: 0; background: #ede9fe; border: none; border-radius: 8px;
  padding: 7px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.a-eye-btn:hover { background: #ddd6fe; }
.a-eye-btn:active { background: #c7d2fe; }
.a-uav { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,#4f46e5,#0891b2); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 900; color: #fff; flex-shrink: 0; }
.a-uinfo { flex: 1; min-width: 0; }
.a-uname { display: block; font-size: 12px; font-weight: 700; color: #0f172a; }
.a-umeta { display: block; font-size: 10px; color: #94a3b8; }
.a-uright { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }
.a-ubal { font-size: 11px; font-weight: 700; color: #4f46e5; }
.a-srch { flex: 1; min-width: 0; }

/* ═══ GAMES ═══════════════════════════════════════════════════════ */
.a-game-row { display: flex; align-items: center; gap: 10px; background: #ffffff; border-radius: 10px; padding: 8px 12px; margin-bottom: 6px; }
.a-game-thumb { width: 36px; height: 36px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
.a-game-thumb img { width: 100%; height: 100%; object-fit: cover; }
.a-game-thumb-ph { background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
.a-game-info { flex: 1; min-width: 0; }
.a-game-name { display: block; font-size: 11px; font-weight: 700; color: #0f172a; }
.a-game-cat  { display: block; font-size: 9px; color: #94a3b8; }
.a-tog { font-size: 9px; font-weight: 800; padding: 4px 10px; border: none; border-radius: 6px; cursor: pointer; letter-spacing: 0.06em; transition: background 0.15s; }
.a-tog-on  { background: #dcfce7; color: #15803d; }
.a-tog-off { background: #f1f5f9; color: #94a3b8; }

/* ═══ MESSAGES ════════════════════════════════════════════════════ */
.a-msg-row { display: flex; align-items: flex-start; gap: 8px; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
.a-msg-row:last-child { border-bottom: none; }
.a-msg-info { flex: 1; min-width: 0; }
.a-msg-title { display: block; font-size: 11px; font-weight: 700; color: #0f172a; }
.a-msg-body  { display: block; font-size: 10px; color: #64748b; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.a-msg-date  { display: block; font-size: 9px; color: #94a3b8; margin-top: 2px; }
.a-del-btn:hover svg { stroke: #b91c1c; }

/* ═══ TX / PANEL ROWS ═════════════════════════════════════════════ */
.a-ptx-row { display: flex; align-items: center; gap: 6px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-size: 10px; }
.a-ptx-row:last-child { border-bottom: none; }
.a-ptx-method { flex: 1; color: #64748b; }
.a-ptx-amt    { font-weight: 700; }
.a-ptx-status { font-size: 8px; font-weight: 700; text-transform: uppercase; padding: 1px 5px; border-radius: 3px; flex-shrink: 0; }
.a-sess-row { padding: 7px 0; border-bottom: 1px solid #f1f5f9; }
.a-sess-row:last-child { border-bottom: none; }
.a-sess-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
.a-sess-bot { font-size: 9px; color: #94a3b8; }
.a-adj-row { display: flex; gap: 6px; margin-top: 10px; }

/* ═══ BUTTONS ═════════════════════════════════════════════════════ */
.a-btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  background: #4f46e5; color: #ffffff; border: none; border-radius: 9px;
  padding: 9px 16px; font-size: 11px; font-weight: 700; cursor: pointer; transition: background 0.15s;
}
.a-btn-primary:hover:not(:disabled) { background: #4338ca; }
.a-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
.a-btn-sm { display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 6px 12px; border: none; border-radius: 7px; font-size: 10px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.a-btn-primary-sm { background: #4f46e5; color: #fff; }
.a-btn-success { background: #dcfce7; color: #15803d; }
.a-btn-danger  { background: #fee2e2; color: #dc2626; }
.a-btn-warn    { background: #fef9c3; color: #92400e; }
.a-btn-ghost   { background: #f1f5f9; color: #64748b; }
.a-btn-sm-p    { padding: 7px 14px; border: none; border-radius: 8px; font-size: 11px; font-weight: 700; background: #4f46e5; color: #fff; cursor: pointer; }
.a-icon-btn { background: none; border: none; cursor: pointer; display: flex; align-items: center; padding: 4px; border-radius: 6px; }
.a-icon-btn:hover { background: #f1f5f9; }

/* ═══ INPUTS ══════════════════════════════════════════════════════ */
.a-input {
  display: block; width: 100%; padding: 8px 10px; border: 1px solid #e2e8f0;
  border-radius: 8px; font-size: 11px; color: #0f172a; background: #ffffff;
  outline: none; box-sizing: border-box; transition: border-color 0.15s;
}
.a-input:focus { border-color: #4f46e5; }
.a-input-sm { padding: 6px 8px; }

/* ═══ LOADING / EMPTY ══════════════════════════════════════════════ */
.a-loading { display: flex; justify-content: center; padding: 40px; }
.a-spinner { width: 26px; height: 26px; border: 3px solid #e2e8f0; border-top-color: #4f46e5; border-radius: 50%; animation: spin 0.75s linear infinite; }
.a-spinner-sm { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: currentColor; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
@keyframes spin { to { transform: rotate(360deg) } }
.a-mini-load { display: flex; justify-content: center; padding: 12px; }
.a-empty    { text-align: center; padding: 24px; color: #94a3b8; font-size: 11px; }
.a-empty-sm { text-align: center; padding: 10px; color: #94a3b8; font-size: 10px; }
.a-ok  { color: #16a34a; font-size: 11px; }
.a-err { color: #dc2626; font-size: 11px; }
.spinning { animation: spin 0.8s linear infinite; }

/* ═══ TOAST ═══════════════════════════════════════════════════════ */
.a-toast { position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%); padding: 9px 20px; border-radius: 99px; font-size: 11px; font-weight: 700; z-index: 999; white-space: nowrap; }
.toast-success { background: #0f172a; color: #4ade80; }
.toast-error   { background: #0f172a; color: #f87171; }
.toast-info    { background: #0f172a; color: #e2e8f0; }
.toast-slide-enter-active,.toast-slide-leave-active { transition: all 0.25s }
.toast-slide-enter-from,.toast-slide-leave-to { opacity: 0; transform: translate(-50%,10px) }
</style>
