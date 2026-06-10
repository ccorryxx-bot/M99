<template>
  <div class="a-root">

    <!-- OVERLAY -->
    <Transition name="fade"><div v-if="leftDrawer||playerPanel" class="a-overlay" @click="leftDrawer=false;playerPanel=false" /></Transition>

    <!-- ═══ LEFT DRAWER ═══ -->
    <Transition name="slide-left">
      <aside v-if="leftDrawer" class="a-left-drawer">
        <div class="a-drawer-hdr">
          <span class="a-drawer-title">Site Management</span>
          <button @click="leftDrawer=false" class="a-icon-btn">
            <svg width="14" height="14" fill="none" stroke="#818cf8" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="a-drawer-body">

          <!-- Banners -->
          <div class="a-drawer-section">
            <div class="a-section-label">
              <svg width="13" height="13" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              Homepage Banners
            </div>
            <div v-for="i in 4" :key="i" class="a-banner-row">
              <span class="a-banner-num">{{ i }}</span>
              <input v-model="drawerSettings['banner_'+i+'_url']" class="a-input a-input-sm" :placeholder="'Banner '+i+' Image URL'" />
            </div>
          </div>

          <!-- CS Support -->
          <div class="a-drawer-section">
            <div class="a-section-label">
              <svg width="13" height="13" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              CS Support
            </div>
            <label class="a-mini-label">Telegram Username</label>
            <input v-model="drawerSettings.cs_telegram" class="a-input a-input-sm" placeholder="@username" />
            <label class="a-mini-label" style="margin-top:8px;">Live Chat URL</label>
            <input v-model="drawerSettings.cs_livechat_url" class="a-input a-input-sm" placeholder="https://..." />
            <label class="a-mini-label" style="margin-top:8px;">Control+ Number</label>
            <input v-model="drawerSettings.cs_control_plus" class="a-input a-input-sm" placeholder="09XXXXXXXXX" />
          </div>

          <button @click="saveDrawerSettings" :disabled="drawerSaving" class="a-btn-primary" style="width:100%;margin-top:4px;">
            <svg v-if="!drawerSaving" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            <span class="a-spinner-sm" v-else></span>
            {{ drawerSaving ? 'Saving...' : 'Save Changes' }}
          </button>
          <p v-if="drawerMsg" :class="drawerOk?'a-ok':'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ drawerMsg }}</p>
        </div>
      </aside>
    </Transition>

    <!-- ═══ RIGHT PLAYER DETAIL PANEL ═══ -->
    <Transition name="slide-right">
      <aside v-if="playerPanel && selectedPlayer" class="a-right-panel">
        <div class="a-panel-hdr">
          <button @click="playerPanel=false" class="a-icon-btn">
            <svg width="14" height="14" fill="none" stroke="#818cf8" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div class="a-panel-title">Player Detail</div>
          <div class="a-panel-av">{{ (selectedPlayer.username||'?')[0].toUpperCase() }}</div>
        </div>

        <div class="a-panel-body">
          <!-- Identity Card -->
          <div class="a-panel-card">
            <div class="a-panel-section-lbl">
              <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2"/></svg>
              Identity
            </div>
            <div class="a-info-row"><span>Username</span><span class="a-val">{{ selectedPlayer.username }}</span></div>
            <div class="a-info-row"><span>Player ID</span><span class="a-mono a-val">{{ selectedPlayer.id?.slice(0,16) }}...</span></div>
            <div class="a-info-row"><span>Phone</span><span class="a-val">{{ selectedPlayer.phone || '—' }}</span></div>
            <div class="a-info-row"><span>Registered</span><span class="a-val">{{ fmtDate(selectedPlayer.created_at) }}</span></div>
            <div class="a-info-row"><span>Referral Code</span><span class="a-val">{{ selectedPlayer.referral_code || '—' }}</span></div>
            <div class="a-info-row"><span>VIP Level</span><span class="a-val a-accent">VIP {{ selectedPlayer.vip_level || 0 }}</span></div>
            <div class="a-info-row"><span>Status</span>
              <span :class="selectedPlayer.is_banned ? 'a-danger' : 'a-success'">{{ selectedPlayer.is_banned ? 'BANNED' : 'ACTIVE' }}</span>
            </div>
          </div>

          <!-- Financial Summary -->
          <div class="a-panel-card">
            <div class="a-panel-section-lbl">
              <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Financials
            </div>
            <div class="a-fin-row a-fin-row--dep">
              <svg width="11" height="11" fill="none" stroke="#22d3ee" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
              <span>Total Deposited</span>
              <span class="a-cyan">{{ fmtNum(selectedPlayer.total_deposit) }} Ks</span>
            </div>
            <div class="a-fin-row a-fin-row--wd">
              <svg width="11" height="11" fill="none" stroke="#f87171" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              <span>Total Withdrawn</span>
              <span class="a-red">{{ fmtNum(playerTotalWd) }} Ks</span>
            </div>
            <div class="a-fin-row">
              <svg width="11" height="11" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 6v6l4 2"/></svg>
              <span>Current Balance</span>
              <span class="a-accent">{{ fmtNum(selectedPlayer.balance) }} Ks</span>
            </div>
            <div class="a-fin-row">
              <svg width="11" height="11" fill="none" stroke="#4ade80" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span>Net Profit (House)</span>
              <span :class="(selectedPlayer.total_deposit - playerTotalWd) >= 0 ? 'a-success' : 'a-danger'">
                {{ fmtNum((selectedPlayer.total_deposit||0) - playerTotalWd) }} Ks
              </span>
            </div>

            <!-- Adjust Balance -->
            <div class="a-adj-row">
              <input v-model.number="adjAmt" type="number" class="a-input a-input-sm" placeholder="Amount (+ or -)" />
              <button @click="doAdjustBalance" :disabled="panelLoading" class="a-btn-sm a-btn-primary-sm">Apply</button>
            </div>
            <p v-if="panelMsg" class="a-ok" style="font-size:10px;margin-top:4px;">{{ panelMsg }}</p>
          </div>

          <!-- Transaction History -->
          <div class="a-panel-card">
            <div class="a-panel-section-lbl">
              <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
              Transaction History
            </div>
            <div v-if="playerTxLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
            <div v-else>
              <div v-for="tx in playerTxList.slice(0,10)" :key="tx.id" class="a-ptx-row">
                <span class="a-ptx-badge" :class="tx.type==='deposit'?'badge-dep':'badge-wd'">{{ tx.type==='deposit'?'DEP':'WD' }}</span>
                <span class="a-ptx-method">{{ tx.method }}</span>
                <span class="a-ptx-amt" :class="tx.type==='deposit'?'a-cyan':'a-red'">{{ fmtNum(tx.amount) }} Ks</span>
                <span class="a-ptx-status" :class="`sdot-${tx.status}`">{{ tx.status }}</span>
              </div>
              <div v-if="!playerTxList.length" class="a-empty-sm">No transactions</div>
            </div>
          </div>

          <!-- Login / IP Sessions -->
          <div class="a-panel-card">
            <div class="a-panel-section-lbl">
              <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
              Login Sessions &amp; IP
            </div>
            <div v-if="playerSessLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
            <div v-else>
              <div v-for="s in playerSessions.slice(0,5)" :key="s.id" class="a-sess-row">
                <div class="a-sess-top">
                  <span class="a-mono" style="font-size:9px;color:#818cf8;">{{ s.ip_address || '—' }}</span>
                  <span style="font-size:9px;color:rgba(241,245,249,0.4);">{{ fmtDate(s.login_at) }}</span>
                </div>
                <div class="a-sess-bot">
                  <span>{{ s.device_type }} · {{ s.browser }} · {{ s.os }}</span>
                </div>
              </div>
              <div v-if="!playerSessions.length" class="a-empty-sm">No sessions found</div>
            </div>
          </div>

          <!-- Game Activity -->
          <div class="a-panel-card">
            <div class="a-panel-section-lbl">
              <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
              Game Activity
            </div>
            <div class="a-info-row"><span>Win Withdrawals</span><span class="a-val a-success">{{ playerWinWdCount }} TXs</span></div>
            <div class="a-info-row"><span>Total Win Amount</span><span class="a-val a-success">{{ fmtNum(playerWinAmt) }} Ks</span></div>
            <div class="a-info-row"><span>Last Active</span><span class="a-val">{{ playerSessions[0] ? fmtDate(playerSessions[0].login_at) : '—' }}</span></div>
          </div>

          <!-- Actions -->
          <div class="a-panel-card">
            <div class="a-panel-section-lbl">
              <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
              Actions
            </div>

            <!-- Reset Password -->
            <div class="a-mini-label" style="margin-bottom:4px;">Reset Password</div>
            <div class="a-adj-row">
              <input v-model="newPassword" type="text" class="a-input a-input-sm" :placeholder="genPassword" readonly />
              <button @click="newPassword=genPassword" class="a-btn-sm a-btn-ghost">Gen</button>
            </div>
            <button @click="doResetPassword" :disabled="panelLoading||!newPassword" class="a-btn-sm a-btn-warn" style="width:100%;margin-top:6px;">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
              Set New Password
            </button>

            <div style="height:1px;background:rgba(129,140,248,0.1);margin:10px 0;"></div>

            <!-- Ban/Unban -->
            <button @click="doToggleBan" :disabled="panelLoading"
              :class="selectedPlayer.is_banned ? 'a-btn-sm a-btn-success' : 'a-btn-sm a-btn-danger'"
              style="width:100%;">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path v-if="selectedPlayer.is_banned" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
              </svg>
              {{ panelLoading ? '...' : (selectedPlayer.is_banned ? 'Unban Player' : 'Ban Player') }}
            </button>
            <p v-if="panelActionMsg" :class="panelActionOk?'a-ok':'a-err'" style="margin-top:6px;text-align:center;font-size:10px;">{{ panelActionMsg }}</p>
          </div>
        </div>
      </aside>
    </Transition>

    <!-- ═══ HEADER ═══ -->
    <header class="a-header">
      <div class="a-hdr-left">
        <button v-if="loggedIn" @click="leftDrawer=!leftDrawer" class="a-hamburger">
          <svg width="16" height="16" fill="none" stroke="#818cf8" stroke-width="2.5" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="a-brand-block">
          <span class="a-brand">iW99</span>
          <span class="a-brand-sub">Hirzinal</span>
        </div>
      </div>
      <div v-if="loggedIn" class="a-tabs-scroll">
        <button v-for="(tab, i) in tabs" :key="i" @click="switchTab(i)"
          class="a-tab" :class="activeTab===i?'a-tab--on':''">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" v-html="tab.icon"></svg>
          {{ tab.label }}
        </button>
      </div>
      <button v-if="loggedIn" @click="logout" class="a-logout">
        <svg width="14" height="14" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      </button>
    </header>

    <!-- ═══ BODY ═══ -->
    <div class="a-body">

      <!-- LOGIN -->
      <div v-if="!loggedIn" class="a-login-wrap">
        <div class="a-login-card">
          <div class="a-login-glow"></div>
          <svg class="a-login-icon" width="36" height="36" fill="none" stroke="#818cf8" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
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

      <!-- DASHBOARD -->
      <div v-else>

        <!-- TAB 0: OVERVIEW -->
        <div v-if="activeTab===0" class="a-tab-content">
          <div class="a-metrics-grid">
            <div class="a-mcard" v-for="m in metricCards" :key="m.key">
              <div class="a-mcard-icon"><svg width="15" height="15" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24" v-html="m.svg"></svg></div>
              <div class="a-mcard-val" :class="m.cls">{{ fmtNum(m.val) }}</div>
              <div class="a-mcard-lbl">{{ m.label }}</div>
              <div class="a-mbar"><div class="a-mbar-fill" :style="{width:m.pct+'%',background:m.color}"></div></div>
            </div>
          </div>

          <div class="a-row-2col">
            <!-- Bar Chart -->
            <div class="a-card a-chart-card">
              <div class="a-card-hdr">
                <span class="a-card-ttl">7-Day Flow</span>
                <button @click="loadChart" class="a-icon-btn" :class="{spinning:chartLoading}">
                  <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                </button>
              </div>
              <svg viewBox="0 0 252 72" class="a-barchart">
                <line v-for="y in [18,36,54]" :key="y" :x1="0" :y1="y" :x2="252" :y2="y" stroke="rgba(129,140,248,0.07)" stroke-width="1"/>
                <g v-for="(d,i) in chartData" :key="i">
                  <rect :x="i*36+2" :y="72-d.dH" width="14" :height="d.dH" fill="url(#dg)" rx="2"/>
                  <rect :x="i*36+18" :y="72-d.wH" width="14" :height="d.wH" fill="url(#wg)" rx="2"/>
                  <text :x="i*36+18" y="71" font-size="5" fill="rgba(241,245,249,0.3)" text-anchor="middle">{{ d.l }}</text>
                </g>
                <defs>
                  <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#818cf8"/><stop offset="100%" stop-color="rgba(129,140,248,0.2)"/></linearGradient>
                  <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f87171"/><stop offset="100%" stop-color="rgba(248,113,113,0.2)"/></linearGradient>
                </defs>
              </svg>
              <div class="a-legend">
                <span class="a-leg-dot" style="background:#818cf8"></span><span>Deposits</span>
                <span class="a-leg-dot" style="background:#f87171;margin-left:10px;"></span><span>Withdrawals</span>
              </div>
            </div>

            <!-- Gauge -->
            <div class="a-gauges">
              <div class="a-card a-g-card">
                <div class="a-card-ttl" style="margin-bottom:6px;">Net Flow</div>
                <svg viewBox="0 0 80 48" class="a-gauge-svg">
                  <path d="M10 42 A30 30 0 0 1 70 42" fill="none" stroke="rgba(129,140,248,0.12)" stroke-width="9" stroke-linecap="round"/>
                  <path d="M10 42 A30 30 0 0 1 70 42" fill="none" stroke="url(#gg)" stroke-width="9" stroke-linecap="round"
                    :stroke-dasharray="`${gaugeArc} 95`"/>
                  <text x="40" y="40" font-size="10" font-weight="800" fill="#f1f5f9" text-anchor="middle">{{ netPct }}%</text>
                  <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#818cf8"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs>
                </svg>
                <div style="font-size:9px;color:rgba(241,245,249,0.4);text-align:center;">{{ fmtNum(netFlow) }} Ks net</div>
              </div>
              <div class="a-card a-g-card">
                <div class="a-card-ttl" style="margin-bottom:4px;">Platform</div>
                <div class="a-big-n">{{ fmtNum(stats.total_balance) }}</div>
                <div style="font-size:8px;color:rgba(241,245,249,0.3);">Kyat</div>
                <div class="a-pbar"><div class="a-pbar-fill" :style="{width:Math.min(100,(stats.total_balance||0)/10000000*100)+'%'}"></div></div>
                <div style="font-size:8px;color:rgba(241,245,249,0.3);margin-top:2px;">of 10M cap</div>
              </div>
            </div>
          </div>

          <!-- Health -->
          <div class="a-card" style="margin-bottom:8px;">
            <div class="a-card-hdr"><span class="a-card-ttl">System Health</span><span class="a-live">LIVE</span></div>
            <div v-for="h in healthBars" :key="h.label" class="a-health">
              <span class="a-health-l">{{ h.label }}</span>
              <div class="a-health-t"><div class="a-health-f" :style="{width:h.pct+'%',background:h.c}"></div></div>
              <span class="a-health-v">{{ h.pct }}%</span>
            </div>
          </div>

          <!-- Recent TX -->
          <div class="a-card">
            <div class="a-card-hdr"><span class="a-card-ttl">Recent Transactions</span><button @click="switchTab(1)" class="a-lnk">View All</button></div>
            <div v-if="recentLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
            <div v-else>
              <div v-for="tx in recentTx" :key="tx.id" class="a-rtx">
                <div class="a-rtx-dot" :class="tx.type==='deposit'?'dot-dep':'dot-wd'"></div>
                <span class="a-ptx-badge" :class="tx.type==='deposit'?'badge-dep':'badge-wd'">{{ tx.type==='deposit'?'DEP':'WD' }}</span>
                <span class="a-rtx-user">{{ tx.user_id?.slice(0,8) }}...</span>
                <span class="a-rtx-method">{{ tx.method }}</span>
                <span class="a-rtx-amt" :class="tx.type==='deposit'?'a-cyan':'a-red'">{{ fmtNum(tx.amount) }}</span>
              </div>
              <div v-if="!recentTx.length" class="a-empty-sm">No recent transactions</div>
            </div>
          </div>
        </div>

        <!-- TAB 1: TRANSACTIONS -->
        <div v-if="activeTab===1" class="a-tab-content">
          <div class="a-card" style="margin-bottom:8px;">
            <div class="a-filter-row">
              <select v-model="txFilter.status" class="a-select"><option value="">All Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="rejected">Rejected</option></select>
              <select v-model="txFilter.type" class="a-select"><option value="">All Types</option><option value="deposit">Deposit</option><option value="withdraw">Withdraw</option></select>
              <button @click="fetchTx" class="a-btn-primary a-btn-sm-p">Search</button>
            </div>
          </div>
          <div v-if="txLoading" class="a-loading"><span class="a-spinner"></span></div>
          <div v-else-if="txErr" class="a-err">{{ txErr }}</div>
          <div v-else>
            <div v-for="tx in txList" :key="tx.id" class="a-tx-card">
              <div class="a-tx-top">
                <span class="a-ptx-badge" :class="tx.type==='deposit'?'badge-dep':'badge-wd'">{{ tx.type?.toUpperCase() }}</span>
                <span class="a-tx-amt">{{ Number(tx.amount).toLocaleString() }} Ks</span>
                <span class="a-sbadge" :class="`sb-${tx.status}`">{{ tx.status }}</span>
              </div>
              <div class="a-tx-meta">
                <span>{{ tx.user_id?.slice(0,8) }}...</span>
                <span>{{ tx.method }}</span>
                <span>{{ tx.slip_last5||tx.phone||'—' }}</span>
                <span>{{ fmtDate(tx.created_at) }}</span>
              </div>
              <div v-if="tx.status==='pending'" class="a-tx-actions">
                <button @click="doApprove(tx.id,'approve')" class="a-btn-sm a-btn-success">Approve</button>
                <button @click="doApprove(tx.id,'reject')" class="a-btn-sm a-btn-danger">Reject</button>
              </div>
            </div>
            <div v-if="!txList.length" class="a-empty">No transactions</div>
          </div>
        </div>

        <!-- TAB 2: SETTINGS -->
        <div v-if="activeTab===2" class="a-tab-content">
          <div v-if="settLoading" class="a-loading"><span class="a-spinner"></span></div>
          <div v-else>
            <div class="a-card" style="margin-bottom:8px;">
              <div class="a-card-ttl" style="margin-bottom:10px;">KBZ Pay</div>
              <label class="a-mini-label">Recipient Name</label><input v-model="sett.kpay_recipient_name" class="a-input" placeholder="Name" />
              <label class="a-mini-label" style="margin-top:7px;">Account Number</label><input v-model="sett.kpay_recipient_account" class="a-input" placeholder="09XXXXXXXXX" />
            </div>
            <div class="a-card" style="margin-bottom:8px;">
              <div class="a-card-ttl" style="margin-bottom:10px;">Wave Pay</div>
              <label class="a-mini-label">Recipient Name</label><input v-model="sett.wave_recipient_name" class="a-input" placeholder="Name" />
              <label class="a-mini-label" style="margin-top:7px;">Account Number</label><input v-model="sett.wave_recipient_account" class="a-input" placeholder="09XXXXXXXXX" />
            </div>
            <div class="a-card" style="margin-bottom:8px;">
              <div class="a-card-ttl" style="margin-bottom:10px;">Commission &amp; Wagering</div>
              <label class="a-mini-label">Direct Commission (%)</label><input v-model.number="sett.commission_direct_rate" type="number" step="0.1" class="a-input" />
              <label class="a-mini-label" style="margin-top:7px;">Override Commission (%)</label><input v-model.number="sett.commission_override_rate" type="number" step="0.1" class="a-input" />
              <label class="a-mini-label" style="margin-top:7px;">Wagering Multiplier (x)</label><input v-model.number="sett.wagering_multiplier" type="number" step="1" class="a-input" />
              <label class="a-mini-label" style="margin-top:7px;">Cashback (%)</label><input v-model.number="sett.cashback_percent" type="number" step="0.5" class="a-input" />
              <label class="a-mini-label" style="margin-top:7px;">Min Deposit (Ks)</label><input v-model.number="sett.min_deposit" type="number" class="a-input" />
              <label class="a-mini-label" style="margin-top:7px;">Max Deposit (Ks)</label><input v-model.number="sett.max_deposit" type="number" class="a-input" />
            </div>
            <button @click="saveSett" :disabled="settSaving" class="a-btn-primary" style="width:100%;padding:11px;">
              <span v-if="settSaving" class="a-spinner-sm"></span>
              {{ settSaving ? 'Saving...' : 'Save Settings' }}
            </button>
            <p v-if="settMsg" :class="settOk?'a-ok':'a-err'" style="margin-top:6px;text-align:center;">{{ settMsg }}</p>
          </div>
        </div>

        <!-- TAB 3: USERS -->
        <div v-if="activeTab===3" class="a-tab-content">
          <div class="a-card" style="margin-bottom:8px;">
            <div class="a-filter-row">
              <input v-model="userQ" class="a-input" placeholder="Search username / phone..." style="flex:1;" />
              <button @click="fetchUsers" class="a-btn-primary a-btn-sm-p">Search</button>
            </div>
          </div>
          <div v-if="usersLoading" class="a-loading"><span class="a-spinner"></span></div>
          <div v-else>
            <div class="a-users-count">USERS ({{ filteredUsers.length }})</div>
            <div v-for="u in filteredUsers.slice(0,50)" :key="u.id" class="a-urow">
              <div class="a-uav">{{ (u.username||'?')[0].toUpperCase() }}</div>
              <div class="a-uinfo">
                <div class="a-uname">{{ u.username }}</div>
                <div class="a-umeta">{{ u.phone||'—' }} &nbsp;·&nbsp; VIP{{ u.vip_level||0 }} &nbsp;·&nbsp; {{ fmtNum(u.balance) }} Ks</div>
              </div>
              <span class="a-sbadge" :class="u.is_banned?'sb-rejected':'sb-confirmed'">{{ u.is_banned?'Banned':'Active' }}</span>
              <button @click="openPlayer(u)" class="a-eye-btn" title="View Details">
                <svg width="15" height="15" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
            <div v-if="!filteredUsers.length" class="a-empty">No users found</div>
          </div>
        </div>

        <!-- TAB 4: GAMES -->
        <div v-if="activeTab===4" class="a-tab-content">
          <div class="a-card" style="margin-bottom:8px;">
            <div class="a-filter-row">
              <input v-model="gameQ" class="a-input" placeholder="Search game..." style="flex:1;" />
              <select v-model="gameCat" class="a-select"><option value="">All</option><option v-for="c in gameCats" :key="c" :value="c">{{ c }}</option></select>
            </div>
          </div>
          <div class="a-games-summary">
            <span class="a-success">{{ games.filter(g=>g.is_active).length }} Active</span>
            <span class="a-sep">|</span>
            <span class="a-danger">{{ games.filter(g=>!g.is_active).length }} Off</span>
            <span class="a-sep">|</span>
            <span style="color:rgba(241,245,249,0.4);">{{ filteredGames.length }} Shown</span>
          </div>
          <div v-if="gamesLoading" class="a-loading"><span class="a-spinner"></span></div>
          <div v-else>
            <div v-for="g in filteredGames.slice(0,100)" :key="g.id" class="a-grow">
              <img v-if="g.image_url" :src="g.image_url" class="a-gimg" @error="e=>e.target.style.display='none'" />
              <div v-else class="a-gimg a-gimg-ph"><svg width="14" height="14" fill="none" stroke="#818cf8" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg></div>
              <div class="a-ginfo"><div class="a-gname">{{ g.name }}</div><div class="a-gmeta">{{ g.provider }} · {{ g.category }}</div></div>
              <button @click="doToggleGame(g)" class="a-toggle" :class="g.is_active?'tog-on':'tog-off'">{{ g.is_active?'ON':'OFF' }}</button>
            </div>
            <div v-if="!filteredGames.length" class="a-empty">No games</div>
          </div>
        </div>

        <!-- TAB 5: MESSAGES -->
        <div v-if="activeTab===5" class="a-tab-content">
          <div class="a-card" style="margin-bottom:8px;">
            <div class="a-card-ttl" style="margin-bottom:10px;">Broadcast</div>
            <label class="a-mini-label">Title</label><input v-model="newMsg.title" class="a-input" placeholder="Title..." />
            <label class="a-mini-label" style="margin-top:7px;">Body</label>
            <textarea v-model="newMsg.body" class="a-textarea" rows="3" placeholder="Message body..."></textarea>
            <button @click="sendMsg" :disabled="msgSending" class="a-btn-primary" style="width:100%;margin-top:8px;">
              <span v-if="msgSending" class="a-spinner-sm"></span>{{ msgSending?'Sending...':'Send Message' }}
            </button>
            <p v-if="msgResult" :class="msgOk?'a-ok':'a-err'" style="margin-top:6px;text-align:center;">{{ msgResult }}</p>
          </div>
          <div v-if="msgsLoading" class="a-loading"><span class="a-spinner"></span></div>
          <div v-else>
            <div v-for="m in msgs" :key="m.id" class="a-mrow">
              <div class="a-minfo"><div class="a-mtitle">{{ m.title }}</div><div class="a-mbody">{{ m.body }}</div><div class="a-mdate">{{ fmtDate(m.created_at) }}</div></div>
              <button @click="deleteMsg(m.id)" class="a-icon-btn a-del-btn"><svg width="12" height="12" fill="none" stroke="#f87171" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5 0V4h4v2"/></svg></button>
            </div>
            <div v-if="!msgs.length" class="a-empty">No messages</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Toast -->
    <Transition name="toast-anim">
      <div v-if="toast.show" class="a-toast" :class="`toast-${toast.type}`">{{ toast.msg }}</div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

const SUPA_URL = 'https://vuywhhmwrqykukcemifd.supabase.co'

// Auth
const adminKey    = ref('')
const loggedIn    = ref(false)
const loginLoading= ref(false)
const loginErr    = ref('')
const activeTab   = ref(0)

const tabs = [
  { label: 'Overview',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5zm-10 3a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z"/>' },
  { label: 'TX',           icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>' },
  { label: 'Settings',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>' },
  { label: 'Users',        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>' },
  { label: 'Games',        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>' },
  { label: 'Msgs',         icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>' },
]

// Stats
const stats = ref({ total_users:0, total_deposits:0, total_withdrawals:0, pending_tx:0, total_balance:0 })
const metricCards = computed(() => {
  const dep = stats.value.total_deposits||0
  const wd  = stats.value.total_withdrawals||0
  const tot = dep+wd||1
  return [
    { key:'u', val:stats.value.total_users, label:'Total Users',  pct:100, color:'#818cf8', cls:'', svg:'<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>' },
    { key:'d', val:dep, label:'Deposits',    pct:Math.round(dep/tot*100), color:'#22d3ee', cls:'a-cyan', svg:'<path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>' },
    { key:'w', val:wd,  label:'Withdrawals', pct:Math.round(wd/tot*100),  color:'#f87171', cls:'a-red',  svg:'<path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>' },
    { key:'p', val:stats.value.pending_tx||0, label:'Pending', pct:Math.min(100,(stats.value.pending_tx||0)/20*100), color:'#fbbf24', cls:'a-warn', svg:'<circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 8v4l3 3"/>' },
  ]
})
const netFlow = computed(() => (stats.value.total_deposits||0)-(stats.value.total_withdrawals||0))
const netPct  = computed(() => { const d=stats.value.total_deposits||1; return Math.min(100,Math.max(0,Math.round(netFlow.value/d*100))) })
const gaugeArc= computed(() => netPct.value/100*95)
const healthBars = computed(() => {
  const dep=stats.value.total_deposits||0, wd=stats.value.total_withdrawals||0, tot=dep+wd||1
  return [
    { label:'Deposit Rate',   pct:Math.round(dep/tot*100), c:'#818cf8' },
    { label:'Withdrawal Rate',pct:Math.round(wd/tot*100),  c:'#f87171' },
    { label:'Pending Load',   pct:Math.min(100,(stats.value.pending_tx||0)/20*100|0), c:'#fbbf24' },
    { label:'Active Games',   pct:gameActiveRate.value, c:'#22d3ee' },
  ]
})
const gameActiveRate = ref(0)

// Chart
const chartLoading = ref(false)
const chartData    = ref(Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-6+i); return {l:d.toLocaleDateString('en-US',{weekday:'short'}),dH:4,wH:4}; }))

// Recent TX
const recentLoading = ref(false)
const recentTx      = ref([])

// TX Tab
const txFilter = ref({ status:'', type:'' })
const txList   = ref([])
const txLoading= ref(false)
const txErr    = ref('')

// Settings
const sett      = ref({})
const settLoading=ref(false)
const settSaving= ref(false)
const settMsg   = ref('')
const settOk    = ref(false)

// Users
const users      = ref([])
const usersLoading=ref(false)
const userQ      = ref('')
const filteredUsers = computed(() => {
  const q = userQ.value.toLowerCase()
  return q ? users.value.filter(u=>(u.username||'').toLowerCase().includes(q)||(u.phone||'').includes(q)) : users.value
})

// Left Drawer
const leftDrawer = ref(false)
const drawerSettings = ref({ banner_1_url:'', banner_2_url:'', banner_3_url:'', banner_4_url:'', cs_telegram:'', cs_livechat_url:'', cs_control_plus:'' })
const drawerSaving = ref(false)
const drawerMsg  = ref('')
const drawerOk   = ref(false)

// Right Player Panel
const playerPanel   = ref(false)
const selectedPlayer= ref(null)
const playerTxList  = ref([])
const playerTxLoading=ref(false)
const playerSessions= ref([])
const playerSessLoading=ref(false)
const panelLoading  = ref(false)
const panelMsg      = ref('')
const panelActionMsg= ref('')
const panelActionOk = ref(false)
const adjAmt        = ref(0)
const newPassword   = ref('')
const genPassword   = computed(() => {
  if (!selectedPlayer.value) return ''
  return 'iW99@' + Math.random().toString(36).slice(2,8).toUpperCase()
})
const playerTotalWd = computed(() => playerTxList.value.filter(t=>t.type!=='deposit'&&t.status==='confirmed').reduce((s,t)=>s+(Number(t.amount)||0),0))
const playerWinWdCount = computed(() => playerTxList.value.filter(t=>t.type!=='deposit'&&t.status==='confirmed').length)
const playerWinAmt    = computed(() => playerTotalWd.value)

// Games
const games      = ref([])
const gamesLoading=ref(false)
const gameQ      = ref('')
const gameCat    = ref('')
const gameCats   = computed(() => [...new Set(games.value.map(g=>g.category).filter(Boolean))])
const filteredGames= computed(() => {
  let l=games.value
  if (gameQ.value) l=l.filter(g=>g.name?.toLowerCase().includes(gameQ.value.toLowerCase()))
  if (gameCat.value) l=l.filter(g=>g.category===gameCat.value)
  return l
})

// Messages
const msgs     = ref([])
const msgsLoading=ref(false)
const newMsg   = ref({ title:'', body:'' })
const msgSending=ref(false)
const msgResult= ref('')
const msgOk    = ref(false)

// Toast
const toast = ref({ show:false, msg:'', type:'info' })
const showToast = (msg, type='info') => { toast.value={show:true,msg,type}; setTimeout(()=>{toast.value.show=false},2600) }

// ── AUTH ──────────────────────────────────────────
const login = async () => {
  if (!adminKey.value) { loginErr.value='Enter password'; return }
  loginLoading.value=true; loginErr.value=''
  try {
    const { data, error } = await supabase.rpc('validate_admin', { p_key: adminKey.value })
    if (error) throw error
    if (data) { loggedIn.value=true; await loadOverview() }
    else loginErr.value='Invalid credentials'
  } catch(e) { loginErr.value=e.message }
  finally { loginLoading.value=false }
}
const logout = () => { loggedIn.value=false; adminKey.value=''; activeTab.value=0; leftDrawer.value=false; playerPanel.value=false }

const switchTab = async (i) => {
  activeTab.value=i; leftDrawer.value=false
  if (i===0) loadOverview()
  if (i===1) fetchTx()
  if (i===2) fetchSett()
  if (i===3) fetchUsers()
  if (i===4) fetchGames()
  if (i===5) fetchMsgs()
}

// ── OVERVIEW ──────────────────────────────────────
const loadOverview = async () => {
  await Promise.all([loadStats(), loadRecentTx(), loadChart()])
}
const loadStats = async () => {
  try { const {data}=await supabase.rpc('admin_get_stats',{p_key:adminKey.value}); if(data)stats.value=data } catch(e){}
}
const loadRecentTx = async () => {
  recentLoading.value=true
  try {
    const res=await fetch(`${SUPA_URL}/functions/v1/admin_get_transactions`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${adminKey.value}`},body:JSON.stringify({limit:5,offset:0})})
    const d=await res.json()
    recentTx.value=Array.isArray(d)?d.slice(0,5):(d.transactions||[]).slice(0,5)
  } catch(e){} finally {recentLoading.value=false}
}
const loadChart = async () => {
  chartLoading.value=true
  try {
    const days=[]
    for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push({date:d.toISOString().split('T')[0],l:d.toLocaleDateString('en-US',{weekday:'short'}),dep:0,wd:0})}
    const {data:txs}=await supabase.from('transactions').select('type,amount,created_at').gte('created_at',days[0].date+'T00:00:00Z').eq('status','confirmed')
    ;(txs||[]).forEach(tx=>{const d=tx.created_at.split('T')[0];const day=days.find(x=>x.date===d);if(!day)return;tx.type==='deposit'?day.dep+=Number(tx.amount)||0:day.wd+=Number(tx.amount)||0})
    const mx=Math.max(...days.map(d=>Math.max(d.dep,d.wd)),1)
    chartData.value=days.map(d=>({l:d.l,dH:Math.max(2,Math.round(d.dep/mx*62)),wH:Math.max(2,Math.round(d.wd/mx*62))}))
  } catch(e){} finally {chartLoading.value=false}
}

// ── TRANSACTIONS ──────────────────────────────────
const fetchTx = async () => {
  txLoading.value=true; txErr.value=''
  try {
    const res=await fetch(`${SUPA_URL}/functions/v1/admin_get_transactions`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${adminKey.value}`},body:JSON.stringify({status:txFilter.value.status||undefined,type:txFilter.value.type||undefined,limit:50})})
    const d=await res.json()
    if(d.error)throw new Error(d.error)
    txList.value=Array.isArray(d)?d:(d.transactions||[])
  } catch(e){txErr.value=e.message} finally{txLoading.value=false}
}
const doApprove = async (id, action) => {
  try {
    const res=await fetch(`${SUPA_URL}/functions/v1/admin_approve_reject_v4`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${adminKey.value}`},body:JSON.stringify({transaction_id:id,action})})
    const d=await res.json(); if(d.error)throw new Error(d.error)
    showToast(action==='approve'?'Approved':'Rejected','success'); fetchTx()
  } catch(e){showToast(e.message,'error')}
}

// ── SETTINGS ──────────────────────────────────────
const fetchSett = async () => {
  settLoading.value=true
  try { const {data}=await supabase.rpc('admin_get_settings',{p_key:adminKey.value}); if(data)sett.value={...data} } catch(e){}
  finally {settLoading.value=false}
}
const saveSett = async () => {
  settSaving.value=true; settMsg.value=''
  try { const {error}=await supabase.rpc('admin_save_settings',{p_key:adminKey.value,p_settings:sett.value}); if(error)throw error; settOk.value=true; settMsg.value='Saved'; showToast('Settings saved','success') }
  catch(e){settOk.value=false; settMsg.value=e.message}
  finally{settSaving.value=false; setTimeout(()=>{settMsg.value=''},3000)}
}

// ── USERS ─────────────────────────────────────────
const fetchUsers = async () => {
  usersLoading.value=true
  try { const {data}=await supabase.rpc('admin_list_users',{p_key:adminKey.value}); users.value=data||[] } catch(e){}
  finally{usersLoading.value=false}
}
const openPlayer = async (u) => {
  selectedPlayer.value={...u}; playerPanel.value=true
  panelMsg.value=''; panelActionMsg.value=''; adjAmt.value=0; newPassword.value=''
  await Promise.all([loadPlayerTx(u.id), loadPlayerSessions(u.id)])
}
const loadPlayerTx = async (uid) => {
  playerTxLoading.value=true; playerTxList.value=[]
  try {
    const res=await fetch(`${SUPA_URL}/functions/v1/admin_get_transactions`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${adminKey.value}`},body:JSON.stringify({user_id:uid,limit:20})})
    const d=await res.json()
    playerTxList.value=Array.isArray(d)?d:(d.transactions||[])
  } catch(e){} finally{playerTxLoading.value=false}
}
const loadPlayerSessions = async (uid) => {
  playerSessLoading.value=true; playerSessions.value=[]
  try {
    const {data}=await supabase.from('login_sessions').select('*').eq('user_id',uid).order('login_at',{ascending:false}).limit(5)
    playerSessions.value=data||[]
  } catch(e){} finally{playerSessLoading.value=false}
}
const doAdjustBalance = async () => {
  if(!adjAmt.value||!selectedPlayer.value)return
  panelLoading.value=true
  try {
    const {error}=await supabase.rpc('admin_adjust_balance',{p_key:adminKey.value,p_user_id:selectedPlayer.value.id,p_amount:adjAmt.value})
    if(error)throw error; panelMsg.value=`Adjusted by ${adjAmt.value>0?'+':''}${adjAmt.value} Ks`; adjAmt.value=0; showToast('Balance updated','success')
  } catch(e){showToast(e.message,'error')} finally{panelLoading.value=false}
}
const doToggleBan = async () => {
  if(!selectedPlayer.value)return; panelLoading.value=true
  try {
    const nb=!selectedPlayer.value.is_banned
    const {error}=await supabase.rpc('admin_ban_user',{p_key:adminKey.value,p_user_id:selectedPlayer.value.id,p_ban:nb})
    if(error)throw error; selectedPlayer.value.is_banned=nb
    const idx=users.value.findIndex(x=>x.id===selectedPlayer.value.id); if(idx!==-1)users.value[idx].is_banned=nb
    panelActionOk.value=true; panelActionMsg.value=nb?'User banned':'User unbanned'; showToast(panelActionMsg.value,'success')
  } catch(e){panelActionOk.value=false;panelActionMsg.value=e.message;showToast(e.message,'error')} finally{panelLoading.value=false}
}
const doResetPassword = async () => {
  if(!newPassword.value||!selectedPlayer.value)return; panelLoading.value=true
  try {
    const res=await fetch(`${SUPA_URL}/auth/v1/admin/users/${selectedPlayer.value.id}`,{method:'PATCH',headers:{'Content-Type':'application/json','apikey':import.meta.env.VITE_SUPABASE_ANON_KEY,'Authorization':`Bearer ${adminKey.value}`},body:JSON.stringify({password:newPassword.value})})
    const d=await res.json()
    if(d.error||d.msg)throw new Error(d.error||d.msg)
    panelActionOk.value=true; panelActionMsg.value='Password updated'; showToast('Password reset','success'); newPassword.value=''
  } catch(e){panelActionOk.value=false;panelActionMsg.value='Reset requires service role key'; showToast('Need service role for reset','error')} finally{panelLoading.value=false}
}

// ── LEFT DRAWER ───────────────────────────────────
const saveDrawerSettings = async () => {
  drawerSaving.value=true; drawerMsg.value=''
  try {
    const merged={...sett.value,...drawerSettings.value}
    const {error}=await supabase.rpc('admin_save_settings',{p_key:adminKey.value,p_settings:merged})
    if(error)throw error; drawerOk.value=true; drawerMsg.value='Saved'; showToast('Saved','success')
    Object.assign(sett.value,drawerSettings.value)
  } catch(e){drawerOk.value=false; drawerMsg.value=e.message}
  finally{drawerSaving.value=false; setTimeout(()=>{drawerMsg.value=''},3000)}
}

// ── GAMES ─────────────────────────────────────────
const fetchGames = async () => {
  gamesLoading.value=true
  try {
    const {data}=await supabase.rpc('admin_list_games',{p_key:adminKey.value}); games.value=data||[]
    gameActiveRate.value=Math.round(games.value.filter(g=>g.is_active).length/(games.value.length||1)*100)
  } catch(e){} finally{gamesLoading.value=false}
}
const doToggleGame = async (g) => {
  const ns=!g.is_active
  try {
    const {error}=await supabase.rpc('admin_toggle_game',{p_key:adminKey.value,p_game_id:g.id,p_active:ns}); if(error)throw error
    const idx=games.value.findIndex(x=>x.id===g.id); if(idx!==-1)games.value[idx].is_active=ns
    gameActiveRate.value=Math.round(games.value.filter(x=>x.is_active).length/(games.value.length||1)*100)
  } catch(e){showToast(e.message,'error')}
}

// ── MESSAGES ──────────────────────────────────────
const fetchMsgs = async () => {
  msgsLoading.value=true
  try { const {data}=await supabase.rpc('admin_list_messages',{p_key:adminKey.value}); msgs.value=data||[] } catch(e){} finally{msgsLoading.value=false}
}
const sendMsg = async () => {
  if(!newMsg.value.title.trim()||!newMsg.value.body.trim()){showToast('Title+body required','error');return}
  msgSending.value=true; msgResult.value=''
  try {
    const {error}=await supabase.rpc('admin_send_message',{p_key:adminKey.value,p_title:newMsg.value.title.trim(),p_body:newMsg.value.body.trim()})
    if(error)throw error; msgOk.value=true; msgResult.value='Sent to all users'; newMsg.value={title:'',body:''}; showToast('Message sent','success'); fetchMsgs()
  } catch(e){msgOk.value=false;msgResult.value=e.message} finally{msgSending.value=false;setTimeout(()=>{msgResult.value=''},4000)}
}
const deleteMsg = async (id) => {
  try {
    const {error}=await supabase.rpc('admin_delete_message',{p_key:adminKey.value,p_id:id}); if(error)throw error
    msgs.value=msgs.value.filter(m=>m.id!==id); showToast('Deleted','success')
  } catch(e){showToast(e.message,'error')}
}

// ── HELPERS ───────────────────────────────────────
const fmtNum=(n,dec=0)=>{const v=Number(n)||0;if(v>=1000000)return(v/1000000).toFixed(2)+'M';if(v>=1000)return new Intl.NumberFormat().format(Math.round(v));return v.toFixed(dec)}
const fmtDate=d=>d?new Date(d).toLocaleDateString('en-GB',{year:'numeric',month:'short',day:'numeric'}):'—'
const copyTxt=t=>navigator.clipboard.writeText(t).then(()=>showToast('Copied','info')).catch(()=>{})
</script>

<style scoped>
/* ═══ ROOT ═══════════════════════════════════════════════════════ */
.a-root {
  min-height:100vh;
  background:#0b0f1e;
  color:#f1f5f9;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  font-size:12px;
  -webkit-tap-highlight-color:transparent;
  position:relative;
  overflow-x:hidden;
}

/* ═══ OVERLAY ═══════════════════════════════════════════════════ */
.a-overlay {
  position:fixed;inset:0;z-index:100;
  background:rgba(0,0,0,0.65);
  backdrop-filter:blur(2px);
}
.fade-enter-active,.fade-leave-active{transition:opacity 0.22s}
.fade-enter-from,.fade-leave-to{opacity:0}

/* ═══ LEFT DRAWER ════════════════════════════════════════════════ */
.a-left-drawer {
  position:fixed;top:0;left:0;bottom:0;z-index:200;
  width:260px;max-width:80vw;
  background:#0f1428;
  border-right:1px solid rgba(129,140,248,0.18);
  display:flex;flex-direction:column;
  overflow:hidden;
}
.a-drawer-hdr {
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 14px 12px;
  border-bottom:1px solid rgba(129,140,248,0.1);
  flex-shrink:0;
}
.a-drawer-title {font-size:12px;font-weight:800;color:#818cf8;letter-spacing:0.06em;text-transform:uppercase;}
.a-drawer-body {flex:1;overflow-y:auto;padding:14px;scrollbar-width:thin;scrollbar-color:rgba(129,140,248,0.2) transparent;}
.a-drawer-section {margin-bottom:18px;}
.a-section-label {display:flex;align-items:center;gap:6px;font-size:10px;font-weight:700;color:#818cf8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;}
.a-banner-row {display:flex;align-items:center;gap:7px;margin-bottom:6px;}
.a-banner-num {width:16px;height:16px;border-radius:4px;background:rgba(129,140,248,0.15);color:#818cf8;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.a-mini-label {display:block;font-size:9px;color:rgba(241,245,249,0.4);margin-bottom:3px;}
.slide-left-enter-active,.slide-left-leave-active{transition:transform 0.25s cubic-bezier(0.4,0,0.2,1)}
.slide-left-enter-from,.slide-left-leave-to{transform:translateX(-100%)}

/* ═══ RIGHT PLAYER PANEL ══════════════════════════════════════════ */
.a-right-panel {
  position:fixed;top:0;right:0;bottom:0;z-index:200;
  width:320px;max-width:92vw;
  background:#0f1428;
  border-left:1px solid rgba(129,140,248,0.18);
  display:flex;flex-direction:column;
  overflow:hidden;
}
.a-panel-hdr {
  display:flex;align-items:center;gap:10px;
  padding:12px 14px;
  border-bottom:1px solid rgba(129,140,248,0.1);
  flex-shrink:0;
}
.a-panel-title {flex:1;font-size:13px;font-weight:800;color:#818cf8;}
.a-panel-av {width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#818cf8,#22d3ee);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#0b0f1e;flex-shrink:0;}
.a-panel-body {flex:1;overflow-y:auto;padding:10px 14px 24px;scrollbar-width:thin;scrollbar-color:rgba(129,140,248,0.2) transparent;display:flex;flex-direction:column;gap:8px;}
.a-panel-card {background:rgba(129,140,248,0.06);border:1px solid rgba(129,140,248,0.12);border-radius:10px;padding:10px 12px;}
.a-panel-section-lbl {display:flex;align-items:center;gap:6px;font-size:10px;font-weight:700;color:#818cf8;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;}
.a-info-row {display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(129,140,248,0.07);font-size:11px;}
.a-info-row:last-child{border-bottom:none;padding-bottom:0;}
.a-info-row span:first-child{color:rgba(241,245,249,0.4);}
.a-val{color:#f1f5f9;font-weight:600;text-align:right;}
.a-mono{font-family:monospace;font-size:10px;}
.a-fin-row {display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid rgba(129,140,248,0.07);font-size:11px;}
.a-fin-row:last-child{border-bottom:none;}
.a-fin-row span:nth-child(2){flex:1;color:rgba(241,245,249,0.5);}
.a-fin-row span:last-child{font-weight:700;}
.a-adj-row{display:flex;gap:6px;margin-top:8px;}
.a-ptx-row{display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid rgba(129,140,248,0.06);font-size:10px;}
.a-ptx-row:last-child{border-bottom:none;}
.a-ptx-method{flex:1;color:rgba(241,245,249,0.45);}
.a-ptx-amt{font-weight:700;}
.a-ptx-status{font-size:8px;font-weight:600;text-transform:uppercase;padding:1px 5px;border-radius:3px;}
.sdot-confirmed{background:rgba(34,211,238,0.12);color:#22d3ee;}
.sdot-pending{background:rgba(251,191,36,0.12);color:#fbbf24;}
.sdot-rejected{background:rgba(248,113,113,0.12);color:#f87171;}
.a-sess-row{padding:6px 0;border-bottom:1px solid rgba(129,140,248,0.06);}
.a-sess-row:last-child{border-bottom:none;}
.a-sess-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;}
.a-sess-bot{font-size:9px;color:rgba(241,245,249,0.3);}
.slide-right-enter-active,.slide-right-leave-active{transition:transform 0.25s cubic-bezier(0.4,0,0.2,1)}
.slide-right-enter-from,.slide-right-leave-to{transform:translateX(100%)}

/* ═══ HEADER ══════════════════════════════════════════════════════ */
.a-header {
  position:sticky;top:0;z-index:50;
  background:rgba(11,15,30,0.96);
  border-bottom:1px solid rgba(129,140,248,0.18);
  backdrop-filter:blur(14px);
  display:flex;align-items:center;gap:8px;
  padding:0 10px;min-height:46px;
}
.a-hdr-left{display:flex;align-items:center;gap:8px;flex-shrink:0;}
.a-hamburger {
  background:rgba(129,140,248,0.1);border:1px solid rgba(129,140,248,0.2);
  border-radius:7px;padding:6px;cursor:pointer;display:flex;align-items:center;
  transition:background 0.15s;
}
.a-hamburger:active{background:rgba(129,140,248,0.2);}
.a-brand-block{display:flex;flex-direction:column;line-height:1;}
.a-brand{font-size:14px;font-weight:900;color:#818cf8;letter-spacing:0.05em;}
.a-brand-sub{font-size:8px;color:rgba(241,245,249,0.35);font-weight:500;letter-spacing:0.08em;margin-top:1px;}
.a-tabs-scroll{flex:1;display:flex;overflow-x:auto;gap:0;scrollbar-width:none;min-width:0;}
.a-tabs-scroll::-webkit-scrollbar{display:none;}
.a-tab{flex-shrink:0;display:flex;align-items:center;gap:4px;padding:10px 9px;font-size:10px;font-weight:600;white-space:nowrap;background:none;border:none;border-bottom:2px solid transparent;color:rgba(241,245,249,0.4);cursor:pointer;transition:color 0.15s,border-color 0.15s;}
.a-tab--on{color:#818cf8;border-bottom-color:#818cf8;}
.a-logout{flex-shrink:0;background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.2);border-radius:7px;padding:6px 8px;cursor:pointer;display:flex;align-items:center;color:#f87171;}

/* ═══ BODY ════════════════════════════════════════════════════════ */
.a-body{padding:10px 10px 28px;}
.a-tab-content{display:flex;flex-direction:column;gap:0;}

/* ═══ LOGIN ═══════════════════════════════════════════════════════ */
.a-login-wrap{display:flex;justify-content:center;padding-top:70px;}
.a-login-card{background:rgba(129,140,248,0.06);border:1px solid rgba(129,140,248,0.2);border-radius:18px;padding:30px 22px;width:100%;max-width:310px;text-align:center;position:relative;overflow:hidden;}
.a-login-glow{position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:120px;height:120px;background:rgba(129,140,248,0.12);border-radius:50%;filter:blur(40px);pointer-events:none;}
.a-login-icon{display:block;margin:0 auto 14px;}
.a-login-title{font-size:17px;font-weight:900;color:#818cf8;margin-bottom:4px;}
.a-login-sub{font-size:11px;color:rgba(241,245,249,0.4);margin-bottom:18px;}
.a-login-btn{width:100%;padding:12px;margin-top:10px;}

/* ═══ CARD ════════════════════════════════════════════════════════ */
.a-card{background:rgba(129,140,248,0.05);border:1px solid rgba(129,140,248,0.12);border-radius:10px;padding:10px 12px;margin-bottom:8px;}
.a-card-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.a-card-ttl{font-size:10px;font-weight:800;color:rgba(241,245,249,0.6);text-transform:uppercase;letter-spacing:0.06em;}
.a-live{font-size:8px;font-weight:800;padding:2px 6px;border-radius:4px;background:rgba(129,140,248,0.15);color:#818cf8;border:1px solid rgba(129,140,248,0.3);letter-spacing:0.06em;}

/* ═══ METRICS ════════════════════════════════════════════════════ */
.a-metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px;}
@media(max-width:400px){.a-metrics-grid{grid-template-columns:repeat(2,1fr);}}
.a-mcard{background:rgba(129,140,248,0.05);border:1px solid rgba(129,140,248,0.1);border-radius:10px;padding:8px 9px;}
.a-mcard-icon{width:24px;height:24px;border-radius:6px;background:rgba(129,140,248,0.12);display:flex;align-items:center;justify-content:center;margin-bottom:5px;}
.a-mcard-val{font-size:15px;font-weight:900;color:#f1f5f9;line-height:1.1;}
.a-mcard-lbl{font-size:9px;color:rgba(241,245,249,0.35);margin:2px 0 5px;}
.a-mbar{height:2px;background:rgba(129,140,248,0.1);border-radius:1px;}
.a-mbar-fill{height:100%;border-radius:1px;transition:width 0.6s;}

/* ═══ CHART ══════════════════════════════════════════════════════ */
.a-row-2col{display:flex;gap:8px;margin-bottom:8px;align-items:stretch;}
.a-chart-card{flex:1;min-width:0;}
.a-barchart{width:100%;height:72px;display:block;margin:6px 0 4px;}
.a-legend{display:flex;align-items:center;font-size:9px;color:rgba(241,245,249,0.4);}
.a-leg-dot{display:inline-block;width:7px;height:7px;border-radius:2px;margin-right:4px;}

.a-gauges{display:flex;flex-direction:column;gap:8px;width:108px;flex-shrink:0;}
.a-g-card{padding:8px 10px;display:flex;flex-direction:column;align-items:center;}
.a-gauge-svg{width:80px;height:48px;}
.a-big-n{font-size:13px;font-weight:900;color:#818cf8;margin-top:4px;}
.a-pbar{height:3px;background:rgba(129,140,248,0.1);border-radius:2px;width:100%;margin-top:5px;}
.a-pbar-fill{height:100%;background:linear-gradient(90deg,#818cf8,#22d3ee);border-radius:2px;transition:width 0.6s;}

/* ═══ HEALTH ═════════════════════════════════════════════════════ */
.a-health{display:flex;align-items:center;gap:8px;margin-bottom:7px;}
.a-health:last-child{margin-bottom:0;}
.a-health-l{font-size:9px;color:rgba(241,245,249,0.4);width:88px;flex-shrink:0;}
.a-health-t{flex:1;height:4px;background:rgba(129,140,248,0.08);border-radius:2px;overflow:hidden;}
.a-health-f{height:100%;border-radius:2px;transition:width 0.6s;}
.a-health-v{font-size:9px;color:rgba(241,245,249,0.5);width:26px;text-align:right;flex-shrink:0;}

/* ═══ RECENT TX ══════════════════════════════════════════════════ */
.a-rtx{display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid rgba(129,140,248,0.07);font-size:10px;}
.a-rtx:last-child{border-bottom:none;}
.a-rtx-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.dot-dep{background:#818cf8;box-shadow:0 0 5px rgba(129,140,248,0.7);}
.dot-wd{background:#f87171;box-shadow:0 0 5px rgba(248,113,113,0.7);}
.a-rtx-user{flex:1;font-family:monospace;font-size:9px;color:rgba(241,245,249,0.45);}
.a-rtx-method{font-size:9px;color:rgba(241,245,249,0.3);}
.a-rtx-amt{font-weight:700;}

/* ═══ TX CARD ════════════════════════════════════════════════════ */
.a-tx-card{background:rgba(129,140,248,0.04);border:1px solid rgba(129,140,248,0.1);border-radius:9px;padding:9px 10px;margin-bottom:6px;}
.a-tx-top{display:flex;align-items:center;gap:7px;margin-bottom:5px;}
.a-tx-amt{flex:1;font-size:13px;font-weight:900;color:#f1f5f9;}
.a-tx-meta{font-size:10px;color:rgba(241,245,249,0.38);display:flex;flex-wrap:wrap;gap:8px;margin-bottom:6px;}
.a-tx-actions{display:flex;gap:7px;}

/* ═══ BADGES ═════════════════════════════════════════════════════ */
.a-ptx-badge{font-size:8px;font-weight:800;padding:2px 5px;border-radius:3px;flex-shrink:0;}
.badge-dep{background:rgba(34,211,238,0.15);color:#22d3ee;}
.badge-wd{background:rgba(248,113,113,0.15);color:#f87171;}
.a-sbadge{font-size:8px;font-weight:700;padding:2px 7px;border-radius:20px;text-transform:uppercase;}
.sb-pending{background:rgba(251,191,36,0.12);color:#fbbf24;border:1px solid rgba(251,191,36,0.2);}
.sb-confirmed{background:rgba(34,211,238,0.12);color:#22d3ee;border:1px solid rgba(34,211,238,0.2);}
.sb-rejected{background:rgba(248,113,113,0.12);color:#f87171;border:1px solid rgba(248,113,113,0.2);}

/* ═══ USERS ══════════════════════════════════════════════════════ */
.a-users-count{font-size:9px;font-weight:800;color:rgba(241,245,249,0.3);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;padding:0 2px;}
.a-urow{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:9px;margin-bottom:4px;background:rgba(129,140,248,0.04);border:1px solid rgba(129,140,248,0.09);cursor:default;}
.a-uav{width:30px;height:30px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#818cf8,#22d3ee);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#0b0f1e;}
.a-uinfo{flex:1;min-width:0;}
.a-uname{font-size:11px;font-weight:700;color:#f1f5f9;}
.a-umeta{font-size:9px;color:rgba(241,245,249,0.35);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.a-eye-btn{background:rgba(129,140,248,0.12);border:1px solid rgba(129,140,248,0.25);border-radius:7px;padding:5px 7px;cursor:pointer;display:flex;align-items:center;transition:background 0.15s;flex-shrink:0;}
.a-eye-btn:active{background:rgba(129,140,248,0.25);}

/* ═══ GAMES ══════════════════════════════════════════════════════ */
.a-games-summary{font-size:10px;margin-bottom:8px;padding:0 2px;}
.a-sep{margin:0 8px;color:rgba(241,245,249,0.15);}
.a-grow{display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:1px solid rgba(129,140,248,0.07);}
.a-gimg{width:34px;height:34px;object-fit:cover;border-radius:7px;flex-shrink:0;}
.a-gimg-ph{background:rgba(129,140,248,0.08);display:flex;align-items:center;justify-content:center;color:#818cf8;}
.a-ginfo{flex:1;min-width:0;}
.a-gname{font-size:11px;font-weight:600;color:#f1f5f9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.a-gmeta{font-size:9px;color:rgba(241,245,249,0.35);margin-top:1px;}
.a-toggle{flex-shrink:0;padding:4px 10px;border-radius:20px;font-size:9px;font-weight:800;border:none;cursor:pointer;transition:all 0.15s;}
.tog-on{background:rgba(129,140,248,0.15);color:#818cf8;border:1px solid rgba(129,140,248,0.3);}
.tog-off{background:rgba(241,245,249,0.05);color:rgba(241,245,249,0.3);border:1px solid rgba(241,245,249,0.1);}

/* ═══ MESSAGES ═══════════════════════════════════════════════════ */
.a-mrow{display:flex;align-items:flex-start;gap:8px;padding:9px 0;border-bottom:1px solid rgba(129,140,248,0.07);}
.a-minfo{flex:1;}
.a-mtitle{font-size:11px;font-weight:700;color:#f1f5f9;margin-bottom:2px;}
.a-mbody{font-size:10px;color:rgba(241,245,249,0.45);margin-bottom:3px;line-height:1.4;}
.a-mdate{font-size:9px;color:rgba(241,245,249,0.25);}

/* ═══ INPUTS ═════════════════════════════════════════════════════ */
.a-input{width:100%;box-sizing:border-box;background:rgba(0,0,0,0.25);border:1px solid rgba(129,140,248,0.15);border-radius:8px;padding:8px 10px;color:#f1f5f9;font-size:12px;outline:none;transition:border-color 0.2s;}
.a-input:focus{border-color:#818cf8;}
.a-input-sm{padding:6px 9px;font-size:11px;}
.a-textarea{width:100%;box-sizing:border-box;background:rgba(0,0,0,0.25);border:1px solid rgba(129,140,248,0.15);border-radius:8px;padding:8px 10px;color:#f1f5f9;font-size:12px;outline:none;resize:vertical;}
.a-textarea:focus{border-color:#818cf8;}
.a-select{background:rgba(0,0,0,0.25);border:1px solid rgba(129,140,248,0.15);border-radius:8px;padding:7px 8px;color:#f1f5f9;font-size:11px;outline:none;}
.a-filter-row{display:flex;gap:6px;align-items:center;}

/* ═══ BUTTONS ════════════════════════════════════════════════════ */
.a-btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:linear-gradient(135deg,#818cf8,#6366f1);color:#fff;font-weight:800;border:none;border-radius:8px;padding:9px 14px;cursor:pointer;font-size:11px;transition:opacity 0.15s;}
.a-btn-primary:disabled{opacity:0.5;cursor:not-allowed;}
.a-btn-primary:active:not(:disabled){opacity:0.8;}
.a-btn-sm-p{flex-shrink:0;padding:8px 12px;font-size:11px;}
.a-btn-sm{display:inline-flex;align-items:center;justify-content:center;gap:5px;border-radius:7px;padding:6px 12px;font-size:11px;font-weight:700;cursor:pointer;border:none;}
.a-btn-primary-sm{background:rgba(129,140,248,0.15);color:#818cf8;border:1px solid rgba(129,140,248,0.3);}
.a-btn-primary-sm:disabled{opacity:0.5;}
.a-btn-success{background:rgba(34,211,238,0.12);color:#22d3ee;border:1px solid rgba(34,211,238,0.25);}
.a-btn-danger{background:rgba(248,113,113,0.12);color:#f87171;border:1px solid rgba(248,113,113,0.25);}
.a-btn-warn{background:rgba(251,191,36,0.12);color:#fbbf24;border:1px solid rgba(251,191,36,0.25);}
.a-btn-ghost{background:rgba(241,245,249,0.06);color:rgba(241,245,249,0.6);border:1px solid rgba(241,245,249,0.1);}
.a-icon-btn{background:rgba(129,140,248,0.08);border:1px solid rgba(129,140,248,0.15);border-radius:6px;padding:4px 6px;cursor:pointer;color:rgba(241,245,249,0.5);display:flex;align-items:center;transition:opacity 0.15s;}
.a-icon-btn.spinning svg{animation:spin 0.7s linear infinite;}
.a-del-btn{background:rgba(248,113,113,0.07) !important;border-color:rgba(248,113,113,0.2) !important;}
.a-lnk{background:none;border:none;color:#818cf8;font-size:10px;font-weight:700;cursor:pointer;}
.a-hamburger svg,.a-logout svg{display:block;}

/* ═══ MISC ═══════════════════════════════════════════════════════ */
.a-loading{display:flex;justify-content:center;padding:28px 0;}
.a-mini-load{display:flex;justify-content:center;padding:12px 0;}
.a-spinner{width:24px;height:24px;border-radius:50%;border:2px solid rgba(129,140,248,0.1);border-top-color:#818cf8;animation:spin 0.7s linear infinite;}
.a-spinner-sm{display:inline-block;width:12px;height:12px;border-radius:50%;border:2px solid rgba(255,255,255,0.15);border-top-color:#fff;animation:spin 0.6s linear infinite;}
.a-empty{text-align:center;padding:22px;color:rgba(241,245,249,0.2);font-size:11px;}
.a-empty-sm{text-align:center;padding:10px 0;color:rgba(241,245,249,0.2);font-size:10px;}
.a-err{color:#f87171;font-size:11px;}
.a-ok{color:#4ade80;font-size:11px;}
.a-accent{color:#818cf8;font-weight:700;}
.a-success{color:#22d3ee;font-weight:600;}
.a-danger{color:#f87171;font-weight:600;}
.a-cyan{color:#22d3ee;font-weight:700;}
.a-red{color:#f87171;font-weight:700;}
.a-warn{color:#fbbf24;font-weight:700;}

/* ═══ TOAST ══════════════════════════════════════════════════════ */
.a-toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);border-radius:10px;padding:8px 18px;font-size:11px;font-weight:700;z-index:500;box-shadow:0 6px 24px rgba(0,0,0,0.5);pointer-events:none;white-space:nowrap;}
.toast-success{background:#0e2d1a;color:#4ade80;border:1px solid rgba(74,222,128,0.3);}
.toast-error{background:#2d0e0e;color:#fca5a5;border:1px solid rgba(252,165,165,0.3);}
.toast-info{background:#0e1a2d;color:#818cf8;border:1px solid rgba(129,140,248,0.3);}
.toast-anim-enter-active{transition:opacity 0.2s,transform 0.2s;}
.toast-anim-leave-active{transition:opacity 0.25s,transform 0.25s;}
.toast-anim-enter-from{opacity:0;transform:translateX(-50%) translateY(10px);}
.toast-anim-leave-to{opacity:0;transform:translateX(-50%) translateY(10px);}

@keyframes spin{to{transform:rotate(360deg);}}
</style>
