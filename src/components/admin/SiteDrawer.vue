<template>
  <Transition name="slide-left">
    <aside v-if="leftDrawer" class="a-left-drawer">

      <!-- Header -->
      <div class="a-drawer-hdr">
        <div class="drw-brand">
          <div class="drw-brand-icon">iW</div>
          <div>
            <div class="drw-brand-name">iW99 Admin</div>
            <div class="drw-brand-sub">Site Management</div>
          </div>
        </div>
        <button @click="leftDrawer=false" class="a-icon-btn">
          <svg width="14" height="14" fill="none" stroke="#64748b" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Admin Role Badge -->
      <div class="drw-role-bar">
        <div class="drw-role-av">A</div>
        <div class="drw-role-info">
          <div class="drw-role-name">Administrator</div>
          <span class="drw-role-badge drw-role-superadmin">⬡ Super Admin</span>
        </div>
      </div>

      <div class="a-drawer-body">

        <!-- ══ CORE ══ -->
        <div class="a-drawer-section">
          <div class="a-section-label">
            <svg width="11" height="11" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            Core
          </div>
          <div class="drw-nav-grid">
            <button @click="nav(0)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-indigo">📊</span>Overview
            </button>
            <button @click="nav(1)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-blue">↕️</span>TX
              <span v-if="stats.pending_tx>0" class="drw-nav-dot">{{ stats.pending_tx }}</span>
            </button>
            <button @click="nav(3)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-purple">👥</span>Users
            </button>
            <button @click="nav(8)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-green">📈</span>Reports
            </button>
          </div>
        </div>

        <!-- ══ CONTENT ══ -->
        <div class="a-drawer-section">
          <div class="a-section-label">
            <svg width="11" height="11" fill="none" stroke="#0891b2" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Content
          </div>
          <div class="drw-nav-grid">
            <button @click="nav(18)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-sky">🖼️</span>Banners
            </button>
            <button @click="nav(20)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-cyan">🔗</span>Images
            </button>
            <button @click="nav(4)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-orange">🎮</span>Games
            </button>
            <button @click="nav(6)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-pink">🏷️</span>Promos
            </button>
            <button @click="nav(5)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-indigo">📣</span>Messages
            </button>
            <button @click="nav(2)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-slate">⚙️</span>Settings
            </button>
          </div>
        </div>

        <!-- ══ FINANCE ══ -->
        <div class="a-drawer-section">
          <div class="a-section-label">
            <svg width="11" height="11" fill="none" stroke="#16a34a" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Finance & Rewards
          </div>
          <div class="drw-nav-grid">
            <button @click="nav(7)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-amber">🤝</span>Agents
            </button>
            <button @click="nav(11)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-green">🎁</span>Bonus
            </button>
            <button @click="nav(10)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-yellow">⭐</span>VIP
            </button>
            <button @click="nav(19)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-blue">🌿</span>Referral
            </button>
          </div>
        </div>

        <!-- ══ USER MANAGEMENT ══ -->
        <div class="a-drawer-section">
          <div class="a-section-label">
            <svg width="11" height="11" fill="none" stroke="#d97706" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            User Management
          </div>
          <div class="drw-nav-grid">
            <button @click="nav(13)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-blue">🪪</span>KYC
            </button>
            <button @click="nav(14)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-purple">🎯</span>Segments
            </button>
            <button @click="nav(16)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-slate">💻</span>Sessions
            </button>
          </div>
        </div>

        <!-- ══ SECURITY ══ -->
        <div class="a-drawer-section">
          <div class="a-section-label">
            <svg width="11" height="11" fill="none" stroke="#dc2626" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Security
          </div>
          <div class="drw-nav-grid">
            <button @click="nav(12)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-red">🚨</span>Fraud
            </button>
            <button @click="nav(9)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-slate">📋</span>Audit
            </button>
          </div>
        </div>

        <!-- ══ SYSTEM ══ -->
        <div class="a-drawer-section">
          <div class="a-section-label">
            <svg width="11" height="11" fill="none" stroke="#64748b" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-.022-2.85L15.95 9.121a2 2 0 00-2.828 0l-.007.007a2 2 0 00-.587 1.636L12 12l-2.172-.586a2 2 0 00-2.243 2.243L8 16.879a2 2 0 001.636.587l.007-.007a2 2 0 002.828 0L15.95 14.9a2 2 0 00.085-2.85"/></svg>
            System
          </div>

          <!-- Role list in system section -->
          <div class="drw-roles-list">
            <div class="drw-roles-title">
              <svg width="9" height="9" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              Admin Roles
            </div>
            <div class="drw-roles-chips">
              <span class="drw-role-chip drw-chip-superadmin">⬡ Super Admin</span>
              <span class="drw-role-chip drw-chip-manager">Manager</span>
              <span class="drw-role-chip drw-chip-moderator">Moderator</span>
              <span class="drw-role-chip drw-chip-support">Support</span>
              <span class="drw-role-chip drw-chip-readonly">Read Only</span>
            </div>
            <button @click="nav(15)" class="drw-roles-manage-btn">Manage Roles & Permissions →</button>
          </div>

          <div class="drw-nav-grid" style="margin-top:8px;">
            <button @click="nav(15)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-red">🛡️</span>Roles
            </button>
            <button @click="nav(17)" class="drw-nav-btn">
              <span class="drw-nav-icon drw-c-cyan">🎰</span>Providers
            </button>
          </div>
        </div>

        <!-- Logout at bottom -->
        <div style="margin-top:8px;padding-top:12px;border-top:1px solid #f1f5f9;">
          <button @click="logout();leftDrawer=false" class="drw-logout-btn">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Logout
          </button>
        </div>

      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { leftDrawer, stats, activeTab, logout } = useAdmin()

function nav(i) {
  activeTab.value = i
  leftDrawer.value = false
}
</script>

<style scoped>
.drw-brand { display:flex;align-items:center;gap:10px;flex:1;min-width:0; }
.drw-brand-icon { width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#4f46e5,#0891b2);color:#fff;font-size:13px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
.drw-brand-name { font-size:13px;font-weight:800;color:#0f172a; }
.drw-brand-sub { font-size:9px;color:#94a3b8;font-weight:600; }

.drw-role-bar { display:flex;align-items:center;gap:10px;padding:10px 14px;background:linear-gradient(135deg,rgba(79,70,229,.06),rgba(8,145,178,.04));border-bottom:1px solid #f1f5f9; }
.drw-role-av { width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#0891b2);color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
.drw-role-info { flex:1;min-width:0; }
.drw-role-name { font-size:11px;font-weight:700;color:#0f172a;margin-bottom:3px; }
.drw-role-badge { font-size:9px;font-weight:800;padding:2px 8px;border-radius:99px; }
.drw-role-superadmin { background:#fee2e2;color:#dc2626; }

.drw-nav-grid { display:grid;grid-template-columns:1fr 1fr;gap:5px; }
.drw-nav-btn {
  display:flex;align-items:center;gap:6px;
  background:#f8fafc;border:1px solid #f1f5f9;border-radius:8px;
  padding:7px 8px;cursor:pointer;font-size:10px;font-weight:700;color:#374151;
  text-align:left;transition:all .15s;position:relative;
}
.drw-nav-btn:hover { background:#ede9fe;border-color:#c7d2fe;color:#4f46e5; }
.drw-nav-icon { font-size:13px;flex-shrink:0; }
.drw-nav-dot { margin-left:auto;background:#dc2626;color:#fff;font-size:8px;font-weight:800;padding:1px 5px;border-radius:99px; }

.drw-c-indigo { filter:hue-rotate(0deg); }
.drw-c-blue   { filter:hue-rotate(30deg); }
.drw-c-purple { filter:hue-rotate(-30deg); }
.drw-c-green  { filter:hue-rotate(90deg); }
.drw-c-sky    { filter:hue-rotate(50deg); }
.drw-c-cyan   { filter:hue-rotate(60deg); }
.drw-c-orange { filter:hue-rotate(150deg); }
.drw-c-pink   { filter:hue-rotate(-60deg); }
.drw-c-amber  { filter:hue-rotate(140deg); }
.drw-c-yellow { filter:hue-rotate(120deg); }
.drw-c-red    { filter:hue-rotate(-120deg); }
.drw-c-slate  { filter:grayscale(0.6); }

.drw-roles-list { background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-bottom:0; }
.drw-roles-title { display:flex;align-items:center;gap:5px;font-size:9px;font-weight:800;color:#4f46e5;text-transform:uppercase;margin-bottom:7px; }
.drw-roles-chips { display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px; }
.drw-role-chip { font-size:8.5px;font-weight:700;padding:2px 7px;border-radius:99px; }
.drw-chip-superadmin { background:#fee2e2;color:#dc2626; }
.drw-chip-manager    { background:#fef3c7;color:#d97706; }
.drw-chip-moderator  { background:#ede9fe;color:#4f46e5; }
.drw-chip-support    { background:#e0f2fe;color:#0891b2; }
.drw-chip-readonly   { background:#f1f5f9;color:#64748b; }
.drw-roles-manage-btn { width:100%;background:transparent;border:1px dashed #c7d2fe;border-radius:6px;padding:5px;font-size:9.5px;font-weight:700;color:#4f46e5;cursor:pointer;text-align:center; }
.drw-roles-manage-btn:hover { background:#ede9fe; }

.drw-logout-btn { width:100%;display:flex;align-items:center;justify-content:center;gap:7px;padding:9px;background:#fee2e2;border:none;border-radius:9px;font-size:11px;font-weight:700;color:#dc2626;cursor:pointer; }
.drw-logout-btn:hover { background:#fecaca; }
</style>
