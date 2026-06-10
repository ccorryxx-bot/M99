<template>
  <div class="adm-root">

    <!-- HEADER -->
    <header class="adm-header">
      <div class="adm-header-left">
        <div class="adm-logo-mark"></div>
        <span class="adm-brand">NOVABETT <span class="adm-brand-sub">ADMIN</span></span>
      </div>
      <div v-if="loggedIn" class="adm-tabs-scroll">
        <button v-for="(tab, i) in tabs" :key="i"
          @click="switchTab(i)"
          class="adm-tab" :class="activeTab === i ? 'adm-tab--on' : ''">
          <component :is="'svg'" v-html="tab.icon" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="adm-tab-icon" />
          {{ tab.label }}
        </button>
      </div>
      <button v-if="loggedIn" @click="logout" class="adm-logout-btn">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      </button>
    </header>

    <div class="adm-body">

      <!-- LOGIN -->
      <div v-if="!loggedIn" class="adm-login-wrap">
        <div class="adm-login-card">
          <div class="adm-login-icon">
            <svg width="32" height="32" fill="none" stroke="#0dd3c5" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h2 class="adm-login-title">Admin Access</h2>
          <p class="adm-login-sub">Enter credentials to continue</p>
          <input v-model="adminKey" type="password" placeholder="Admin Password"
            class="adm-input" @keyup.enter="login" />
          <button @click="login" :disabled="loginLoading" class="adm-btn-primary adm-login-btn">
            <span v-if="loginLoading" class="adm-spinner-sm"></span>
            <span>{{ loginLoading ? 'Verifying...' : 'Login' }}</span>
          </button>
          <p v-if="loginError" class="adm-err">{{ loginError }}</p>
        </div>
      </div>

      <!-- DASHBOARD CONTENT -->
      <div v-else>

        <!-- TAB 0: OVERVIEW -->
        <div v-if="activeTab === 0" class="adm-tab-body">

          <!-- Metric Cards Row -->
          <div class="adm-metrics-row">
            <div class="adm-metric-card">
              <div class="adm-metric-icon adm-metric-icon--blue">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div class="adm-metric-val">{{ fmtNum(stats.total_users) }}</div>
              <div class="adm-metric-lbl">Total Users</div>
              <div class="adm-metric-bar"><div class="adm-metric-fill adm-metric-fill--blue" style="width:100%"></div></div>
            </div>
            <div class="adm-metric-card">
              <div class="adm-metric-icon adm-metric-icon--green">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8H2a1 1 0 00-1 1v9a2 2 0 002 2h14a2 2 0 002-2V9a1 1 0 00-1-1h-3"/></svg>
              </div>
              <div class="adm-metric-val adm-metric-val--green">{{ fmtNum(stats.total_deposits) }}</div>
              <div class="adm-metric-lbl">Total Deposits</div>
              <div class="adm-metric-bar"><div class="adm-metric-fill adm-metric-fill--green" :style="{width: depPct+'%'}"></div></div>
            </div>
            <div class="adm-metric-card">
              <div class="adm-metric-icon adm-metric-icon--red">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              </div>
              <div class="adm-metric-val adm-metric-val--red">{{ fmtNum(stats.total_withdrawals) }}</div>
              <div class="adm-metric-lbl">Withdrawals</div>
              <div class="adm-metric-bar"><div class="adm-metric-fill adm-metric-fill--red" :style="{width: wdPct+'%'}"></div></div>
            </div>
            <div class="adm-metric-card">
              <div class="adm-metric-icon adm-metric-icon--yellow">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 8v4l3 3"/></svg>
              </div>
              <div class="adm-metric-val adm-metric-val--yellow">{{ stats.pending_tx ?? '—' }}</div>
              <div class="adm-metric-lbl">Pending TXs</div>
              <div class="adm-metric-bar"><div class="adm-metric-fill adm-metric-fill--yellow" style="width:60%"></div></div>
            </div>
          </div>

          <!-- Main Chart + Side Panel -->
          <div class="adm-chart-row">
            <!-- Bar Chart -->
            <div class="adm-card adm-chart-card">
              <div class="adm-card-hdr">
                <span class="adm-card-title">Transaction Flow — Last 7 Days</span>
                <button @click="loadChartData" class="adm-icon-btn" :class="{spinning: chartLoading}">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                </button>
              </div>
              <div class="adm-chart-area">
                <svg class="adm-bar-chart" viewBox="0 0 280 80" preserveAspectRatio="none">
                  <!-- Grid lines -->
                  <line x1="0" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                  <line x1="0" y1="40" x2="280" y2="40" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                  <line x1="0" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                  <!-- Deposit bars -->
                  <g v-for="(d, i) in chartData" :key="'d'+i">
                    <rect
                      :x="i * 40 + 2" :y="80 - d.depH" width="16" :height="d.depH"
                      fill="url(#depGrad)" rx="2"/>
                    <rect
                      :x="i * 40 + 21" :y="80 - d.wdH" width="16" :height="d.wdH"
                      fill="url(#wdGrad)" rx="2"/>
                    <text :x="i * 40 + 20" y="78" font-size="5" fill="rgba(255,255,255,0.3)" text-anchor="middle">{{ d.label }}</text>
                  </g>
                  <defs>
                    <linearGradient id="depGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#0dd3c5"/>
                      <stop offset="100%" stop-color="rgba(13,211,197,0.3)"/>
                    </linearGradient>
                    <linearGradient id="wdGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#f87171"/>
                      <stop offset="100%" stop-color="rgba(248,113,113,0.3)"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="adm-chart-legend">
                <span class="adm-legend-dot" style="background:#0dd3c5"></span><span class="adm-legend-lbl">Deposits</span>
                <span class="adm-legend-dot" style="background:#f87171;margin-left:12px;"></span><span class="adm-legend-lbl">Withdrawals</span>
              </div>
            </div>

            <!-- Gauges Panel -->
            <div class="adm-gauges-col">
              <div class="adm-card adm-gauge-card">
                <div class="adm-card-title" style="margin-bottom:8px;">Net Balance</div>
                <!-- Gauge SVG -->
                <div class="adm-gauge-wrap">
                  <svg viewBox="0 0 80 46" class="adm-gauge-svg">
                    <path d="M8 40 A32 32 0 0 1 72 40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="8" stroke-linecap="round"/>
                    <path d="M8 40 A32 32 0 0 1 72 40" fill="none" stroke="url(#gaugeGrad)" stroke-width="8" stroke-linecap="round"
                      :stroke-dasharray="`${gaugeArc} 100`" stroke-dashoffset="0"/>
                    <text x="40" y="38" font-size="9" font-weight="bold" fill="white" text-anchor="middle">{{ netFlowPct }}%</text>
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#0dd3c5"/>
                        <stop offset="100%" stop-color="#6366f1"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div class="adm-gauge-lbl">{{ fmtNum(netFlow) }} Ks net</div>
              </div>

              <div class="adm-card adm-balance-card">
                <div class="adm-card-title">Platform Balance</div>
                <div class="adm-big-num">{{ fmtNum(stats.total_balance) }}</div>
                <div class="adm-big-unit">Kyat</div>
                <div class="adm-prog-track">
                  <div class="adm-prog-fill" :style="{width: Math.min(100, (stats.total_balance || 0) / 10000000 * 100)+'%'}"></div>
                </div>
                <div class="adm-prog-label">{{ fmtNum((stats.total_balance || 0) / 10000000 * 100, 1) }}% of 10M cap</div>
              </div>
            </div>
          </div>

          <!-- System Health Bars -->
          <div class="adm-card" style="margin-bottom:8px;">
            <div class="adm-card-hdr" style="margin-bottom:10px;">
              <span class="adm-card-title">System Health</span>
              <span class="adm-live-badge">LIVE</span>
            </div>
            <div class="adm-health-row">
              <span class="adm-health-lbl">Deposit Ratio</span>
              <div class="adm-health-track"><div class="adm-health-fill" :style="{width:depRatio+'%',background:'#0dd3c5'}"></div></div>
              <span class="adm-health-val">{{ depRatio }}%</span>
            </div>
            <div class="adm-health-row">
              <span class="adm-health-lbl">Withdrawal Rate</span>
              <div class="adm-health-track"><div class="adm-health-fill" :style="{width:wdRatio+'%',background:'#f87171'}"></div></div>
              <span class="adm-health-val">{{ wdRatio }}%</span>
            </div>
            <div class="adm-health-row">
              <span class="adm-health-lbl">Pending Load</span>
              <div class="adm-health-track"><div class="adm-health-fill" :style="{width:pendingLoad+'%',background:'#fbbf24'}"></div></div>
              <span class="adm-health-val">{{ pendingLoad }}%</span>
            </div>
            <div class="adm-health-row">
              <span class="adm-health-lbl">Active Games</span>
              <div class="adm-health-track"><div class="adm-health-fill" :style="{width:gameActiveRate+'%',background:'#818cf8'}"></div></div>
              <span class="adm-health-val">{{ gameActiveRate }}%</span>
            </div>
          </div>

          <!-- Recent Transactions -->
          <div class="adm-card">
            <div class="adm-card-hdr">
              <span class="adm-card-title">Recent Transactions</span>
              <button @click="switchTab(1)" class="adm-link-btn">View All</button>
            </div>
            <div v-if="recentTxLoading" class="adm-mini-load"><div class="adm-spinner-sm"></div></div>
            <div v-else>
              <div v-for="tx in recentTxList" :key="tx.id" class="adm-recent-tx">
                <div class="adm-tx-dot" :class="tx.type==='deposit'?'adm-dot--green':'adm-dot--red'"></div>
                <div class="adm-tx-info">
                  <span class="adm-tx-type-badge" :class="tx.type==='deposit'?'badge--dep':'badge--wd'">{{ tx.type==='deposit'?'DEP':'WD' }}</span>
                  <span class="adm-tx-user">{{ tx.user_id?.slice(0,8) }}...</span>
                  <span class="adm-tx-method">{{ tx.method }}</span>
                </div>
                <div class="adm-tx-right">
                  <span class="adm-tx-amt" :class="tx.type==='deposit'?'amt--green':'amt--red'">{{ fmtNum(tx.amount) }}</span>
                  <span class="adm-status-dot" :class="`sdot--${tx.status}`"></span>
                </div>
              </div>
              <div v-if="recentTxList.length===0" class="adm-empty-sm">No recent transactions</div>
            </div>
          </div>
        </div>

        <!-- TAB 1: TRANSACTIONS -->
        <div v-if="activeTab === 1" class="adm-tab-body">
          <div class="adm-card" style="margin-bottom:8px;">
            <div class="adm-filter-row">
              <select v-model="filter.status" class="adm-select">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="rejected">Rejected</option>
              </select>
              <select v-model="filter.type" class="adm-select">
                <option value="">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
              </select>
              <button @click="fetchTransactions" class="adm-btn-primary adm-filter-btn">Search</button>
            </div>
          </div>
          <div v-if="loadingTx" class="adm-loading"><div class="adm-spinner"></div></div>
          <div v-else-if="txError" class="adm-err">{{ txError }}</div>
          <div v-else>
            <div v-for="tx in transactions" :key="tx.id" class="adm-tx-row">
              <div class="adm-tx-row-top">
                <span class="adm-tx-type-badge" :class="tx.type==='deposit'?'badge--dep':'badge--wd'">{{ tx.type==='deposit'?'DEPOSIT':'WITHDRAW' }}</span>
                <span class="adm-tx-amount">{{ Number(tx.amount).toLocaleString() }} Ks</span>
                <span class="adm-status-badge" :class="`sb--${tx.status}`">{{ tx.status }}</span>
              </div>
              <div class="adm-tx-row-meta">
                <span>User: {{ tx.user_id?.slice(0,8) }}...</span>
                <span>Method: {{ tx.method }}</span>
                <span>Ref: {{ tx.slip_last5 || tx.phone || '—' }}</span>
              </div>
              <div class="adm-tx-row-id">
                <span class="adm-mono">{{ tx.id }}</span>
                <button @click="copyText(tx.id)" class="adm-icon-btn">
                  <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
              </div>
              <div v-if="tx.status === 'pending'" class="adm-tx-row-actions">
                <button @click="approveReject(tx.id, 'approve')" class="adm-btn-approve">Approve</button>
                <button @click="approveReject(tx.id, 'reject')" class="adm-btn-reject">Reject</button>
              </div>
            </div>
            <div v-if="transactions.length === 0" class="adm-empty">No transactions found</div>
          </div>
        </div>

        <!-- TAB 2: SETTINGS -->
        <div v-if="activeTab === 2" class="adm-tab-body">
          <div v-if="loadingSettings" class="adm-loading"><div class="adm-spinner"></div></div>
          <div v-else>
            <div class="adm-card" style="margin-bottom:8px;">
              <div class="adm-card-title" style="margin-bottom:10px;">KBZ Pay</div>
              <label class="adm-label">Recipient Name</label>
              <input v-model="settings.kpay_recipient_name" class="adm-input" placeholder="KBZ Pay Name" />
              <label class="adm-label mt6">Account Number</label>
              <input v-model="settings.kpay_recipient_account" class="adm-input" placeholder="09XXXXXXXXX" />
            </div>
            <div class="adm-card" style="margin-bottom:8px;">
              <div class="adm-card-title" style="margin-bottom:10px;">Wave Pay</div>
              <label class="adm-label">Recipient Name</label>
              <input v-model="settings.wave_recipient_name" class="adm-input" placeholder="Wave Pay Name" />
              <label class="adm-label mt6">Account Number</label>
              <input v-model="settings.wave_recipient_account" class="adm-input" placeholder="09XXXXXXXXX" />
            </div>
            <div class="adm-card" style="margin-bottom:8px;">
              <div class="adm-card-title" style="margin-bottom:10px;">Commission & Wagering</div>
              <label class="adm-label">Direct Commission Rate (%)</label>
              <input v-model.number="settings.commission_direct_rate" type="number" step="0.1" min="0" max="100" class="adm-input" />
              <label class="adm-label mt6">Override Commission Rate (%)</label>
              <input v-model.number="settings.commission_override_rate" type="number" step="0.1" min="0" max="100" class="adm-input" />
              <label class="adm-label mt6">Wagering Multiplier (x)</label>
              <input v-model.number="settings.wagering_multiplier" type="number" step="1" min="1" max="100" class="adm-input" />
              <label class="adm-label mt6">Cashback (%)</label>
              <input v-model.number="settings.cashback_percent" type="number" step="0.5" min="0" max="50" class="adm-input" />
            </div>
            <div class="adm-card" style="margin-bottom:8px;">
              <div class="adm-card-title" style="margin-bottom:10px;">Deposit Limits</div>
              <label class="adm-label">Min Deposit (Ks)</label>
              <input v-model.number="settings.min_deposit" type="number" step="1000" min="0" class="adm-input" />
              <label class="adm-label mt6">Max Deposit (Ks)</label>
              <input v-model.number="settings.max_deposit" type="number" step="10000" min="0" class="adm-input" />
            </div>
            <button @click="saveSettings" :disabled="savingSettings" class="adm-btn-primary adm-save-btn">
              <span v-if="savingSettings" class="adm-spinner-sm"></span>
              {{ savingSettings ? 'Saving...' : 'Save All Settings' }}
            </button>
            <p v-if="settingsMsg" :class="settingsOk ? 'adm-ok' : 'adm-err'" style="margin-top:6px;text-align:center;">{{ settingsMsg }}</p>
          </div>
        </div>

        <!-- TAB 3: USERS -->
        <div v-if="activeTab === 3" class="adm-tab-body">
          <div class="adm-card" style="margin-bottom:8px;">
            <div class="adm-filter-row">
              <input v-model="userSearch" class="adm-input" placeholder="Search username / phone..." style="flex:1;" />
              <button @click="fetchUsers" class="adm-btn-primary adm-filter-btn">Search</button>
            </div>
          </div>

          <!-- User detail modal -->
          <div v-if="selectedUser" class="adm-modal-overlay" @click.self="selectedUser = null">
            <div class="adm-modal">
              <button @click="selectedUser = null" class="adm-modal-close">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div class="adm-modal-title">{{ selectedUser.username }}</div>
              <div class="adm-info-rows">
                <div class="adm-info-row"><span>ID</span><span class="adm-mono">{{ selectedUser.id?.slice(0,12) }}...</span></div>
                <div class="adm-info-row"><span>Phone</span><span>{{ selectedUser.phone || '—' }}</span></div>
                <div class="adm-info-row"><span>Balance</span><span class="adm-green">{{ fmtNum(selectedUser.balance) }} Ks</span></div>
                <div class="adm-info-row"><span>Total Deposit</span><span>{{ fmtNum(selectedUser.total_deposit) }} Ks</span></div>
                <div class="adm-info-row"><span>VIP Level</span><span>{{ selectedUser.vip_level || 0 }}</span></div>
                <div class="adm-info-row"><span>Referral Code</span><span>{{ selectedUser.referral_code || '—' }}</span></div>
                <div class="adm-info-row"><span>Joined</span><span>{{ fmtDate(selectedUser.created_at) }}</span></div>
                <div class="adm-info-row"><span>Status</span>
                  <span :class="selectedUser.is_banned ? 'adm-red' : 'adm-green'">{{ selectedUser.is_banned ? 'Banned' : 'Active' }}</span>
                </div>
              </div>
              <div class="adm-modal-actions">
                <button @click="toggleBan(selectedUser)" :class="selectedUser.is_banned ? 'adm-btn-approve' : 'adm-btn-reject'" :disabled="actionLoading">
                  {{ actionLoading ? '...' : (selectedUser.is_banned ? 'Unban User' : 'Ban User') }}
                </button>
              </div>
              <div style="margin-top:10px;">
                <div class="adm-card-title" style="margin-bottom:6px;">Adjust Balance</div>
                <div class="adm-filter-row">
                  <input v-model.number="adjustAmt" type="number" placeholder="Amount (+ or -)" class="adm-input" style="flex:1;" />
                  <button @click="adjustBalance(selectedUser)" class="adm-btn-primary adm-filter-btn" :disabled="actionLoading">Apply</button>
                </div>
                <p v-if="userActionMsg" class="adm-ok" style="margin-top:4px;">{{ userActionMsg }}</p>
              </div>
            </div>
          </div>

          <div v-if="loadingUsers" class="adm-loading"><div class="adm-spinner"></div></div>
          <div v-else>
            <div class="adm-card-title" style="margin-bottom:6px;padding:0 2px;">Users ({{ filteredUsers.length }})</div>
            <div v-for="u in filteredUsers.slice(0, 50)" :key="u.id"
              class="adm-user-row" @click="selectUser(u)">
              <div class="adm-user-av">{{ (u.username || '?')[0].toUpperCase() }}</div>
              <div class="adm-user-info">
                <div class="adm-user-name">{{ u.username }}</div>
                <div class="adm-user-meta">{{ u.phone || '—' }} · VIP{{ u.vip_level || 0 }} · {{ fmtNum(u.balance) }} Ks</div>
              </div>
              <span class="adm-status-badge" :class="u.is_banned ? 'sb--rejected' : 'sb--confirmed'">
                {{ u.is_banned ? 'Banned' : 'Active' }}
              </span>
            </div>
            <div v-if="filteredUsers.length === 0" class="adm-empty">No users found</div>
            <div v-if="filteredUsers.length > 50" class="adm-empty" style="font-size:10px;">Showing first 50 of {{ filteredUsers.length }}</div>
          </div>
        </div>

        <!-- TAB 4: GAMES -->
        <div v-if="activeTab === 4" class="adm-tab-body">
          <div class="adm-card" style="margin-bottom:8px;">
            <div class="adm-filter-row">
              <input v-model="gameSearch" class="adm-input" placeholder="Search game name..." style="flex:1;" />
              <select v-model="gameCatFilter" class="adm-select">
                <option value="">All Categories</option>
                <option v-for="c in gameCategories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
          </div>
          <div class="adm-games-summary">
            <span class="adm-green">{{ games.filter(g=>g.is_active).length }} Active</span>
            <span style="margin:0 8px;color:rgba(255,255,255,0.2);">|</span>
            <span class="adm-red">{{ games.filter(g=>!g.is_active).length }} Inactive</span>
            <span style="margin:0 8px;color:rgba(255,255,255,0.2);">|</span>
            <span style="color:rgba(255,255,255,0.5);">Total: {{ filteredGames.length }}</span>
          </div>
          <div v-if="loadingGames" class="adm-loading"><div class="adm-spinner"></div></div>
          <div v-else>
            <div v-for="g in filteredGames.slice(0,100)" :key="g.id" class="adm-game-row">
              <img v-if="g.image_url" :src="g.image_url" class="adm-game-img" @error="e=>e.target.style.display='none'" />
              <div v-else class="adm-game-img adm-game-img--ph">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8m-4-4v4"/></svg>
              </div>
              <div class="adm-game-info">
                <div class="adm-game-name">{{ g.name }}</div>
                <div class="adm-game-meta">{{ g.provider }} · {{ g.category }}</div>
              </div>
              <button @click="toggleGame(g)" class="adm-toggle" :class="g.is_active ? 'adm-toggle--on' : 'adm-toggle--off'">
                {{ g.is_active ? 'ON' : 'OFF' }}
              </button>
            </div>
            <div v-if="filteredGames.length === 0" class="adm-empty">No games found</div>
          </div>
        </div>

        <!-- TAB 5: MESSAGES -->
        <div v-if="activeTab === 5" class="adm-tab-body">
          <div class="adm-card" style="margin-bottom:8px;">
            <div class="adm-card-title" style="margin-bottom:10px;">Broadcast Message</div>
            <label class="adm-label">Title</label>
            <input v-model="newMsg.title" class="adm-input" placeholder="Message title..." />
            <label class="adm-label mt6">Body</label>
            <textarea v-model="newMsg.body" class="adm-textarea" placeholder="Message body..." rows="3"></textarea>
            <button @click="sendMessage" :disabled="sendingMsg" class="adm-btn-primary" style="width:100%;margin-top:8px;">
              <span v-if="sendingMsg" class="adm-spinner-sm"></span>
              {{ sendingMsg ? 'Sending...' : 'Send Message' }}
            </button>
            <p v-if="msgSendResult" :class="msgSendOk?'adm-ok':'adm-err'" style="margin-top:6px;text-align:center;">{{ msgSendResult }}</p>
          </div>

          <div v-if="loadingMsgs" class="adm-loading"><div class="adm-spinner"></div></div>
          <div v-else>
            <div v-for="m in messages" :key="m.id" class="adm-msg-row">
              <div class="adm-msg-info">
                <div class="adm-msg-title">{{ m.title }}</div>
                <div class="adm-msg-body">{{ m.body }}</div>
                <div class="adm-msg-date">{{ fmtDate(m.created_at) }}</div>
              </div>
              <button @click="deleteMessage(m.id)" class="adm-icon-btn adm-del-btn">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5 0V4h4v2"/></svg>
              </button>
            </div>
            <div v-if="messages.length===0" class="adm-empty">No messages yet</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Toast -->
    <Transition name="adm-toast-anim">
      <div v-if="toast.show" class="adm-toast" :class="`adm-toast--${toast.type}`">{{ toast.msg }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

const SUPABASE_URL = 'https://vuywhhmwrqykukcemifd.supabase.co'

const adminKey  = ref('')
const loggedIn  = ref(false)
const loginLoading = ref(false)
const loginError = ref('')
const activeTab  = ref(0)

const tabs = [
  { label: 'Overview',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5zm-10 3a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z"/>' },
  { label: 'Transactions', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>' },
  { label: 'Settings',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>' },
  { label: 'Users',        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>' },
  { label: 'Games',        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>' },
  { label: 'Messages',     icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>' },
]

// Stats
const stats = ref({ total_users:0, total_deposits:0, total_withdrawals:0, pending_tx:0, total_balance:0 })

// Chart
const chartLoading = ref(false)
const chartData = ref([])

// Health computed
const netFlow = computed(() => (stats.value.total_deposits||0) - (stats.value.total_withdrawals||0))
const netFlowPct = computed(() => {
  const d = stats.value.total_deposits || 1
  return Math.min(100, Math.round((netFlow.value / d) * 100))
})
const gaugeArc = computed(() => {
  const pct = Math.max(0, Math.min(100, netFlowPct.value)) / 100
  return pct * 100.5
})
const total = computed(() => (stats.value.total_deposits||0) + (stats.value.total_withdrawals||0) || 1)
const depPct = computed(() => Math.round((stats.value.total_deposits||0) / total.value * 100))
const wdPct  = computed(() => Math.round((stats.value.total_withdrawals||0) / total.value * 100))
const depRatio = computed(() => depPct.value)
const wdRatio  = computed(() => wdPct.value)
const pendingLoad = computed(() => Math.min(100, (stats.value.pending_tx||0) / 20 * 100))
const gameActiveRate = ref(0)

// Recent TX
const recentTxLoading = ref(false)
const recentTxList = ref([])

// Transactions tab
const filter = ref({ status: '', type: '' })
const transactions = ref([])
const loadingTx = ref(false)
const txError = ref('')

// Settings
const settings = ref({})
const loadingSettings = ref(false)
const savingSettings = ref(false)
const settingsMsg = ref('')
const settingsOk = ref(false)

// Users
const users = ref([])
const loadingUsers = ref(false)
const userSearch = ref('')
const selectedUser = ref(null)
const actionLoading = ref(false)
const adjustAmt = ref(0)
const userActionMsg = ref('')
const filteredUsers = computed(() => {
  const q = userSearch.value.toLowerCase()
  if (!q) return users.value
  return users.value.filter(u => (u.username||'').toLowerCase().includes(q) || (u.phone||'').includes(q))
})

// Games
const games = ref([])
const loadingGames = ref(false)
const gameSearch = ref('')
const gameCatFilter = ref('')
const gameCategories = computed(() => [...new Set(games.value.map(g=>g.category).filter(Boolean))])
const filteredGames = computed(() => {
  let list = games.value
  if (gameSearch.value) list = list.filter(g => g.name?.toLowerCase().includes(gameSearch.value.toLowerCase()))
  if (gameCatFilter.value) list = list.filter(g => g.category === gameCatFilter.value)
  return list
})

// Messages
const messages = ref([])
const loadingMsgs = ref(false)
const newMsg = ref({ title: '', body: '' })
const sendingMsg = ref(false)
const msgSendResult = ref('')
const msgSendOk = ref(false)

// Toast
const toast = ref({ show: false, msg: '', type: 'info' })
const showToast = (msg, type='info') => {
  toast.value = { show: true, msg, type }
  setTimeout(() => { toast.value.show = false }, 2800)
}

const login = async () => {
  if (!adminKey.value) { loginError.value = 'Enter password'; return }
  loginLoading.value = true; loginError.value = ''
  try {
    const { data, error } = await supabase.rpc('validate_admin', { p_key: adminKey.value })
    if (error) throw error
    if (data === true || data === 'true' || data) {
      loggedIn.value = true
      await loadStats()
      await loadRecentTx()
      await loadChartData()
    } else {
      loginError.value = 'Invalid credentials'
    }
  } catch(e) { loginError.value = e.message }
  finally { loginLoading.value = false }
}

const logout = () => { loggedIn.value = false; adminKey.value = ''; activeTab.value = 0 }

const switchTab = async (i) => {
  activeTab.value = i
  if (i === 0) { await loadStats(); await loadRecentTx(); await loadChartData() }
  if (i === 1) fetchTransactions()
  if (i === 2) fetchSettings()
  if (i === 3) fetchUsers()
  if (i === 4) fetchGames()
  if (i === 5) fetchMessages()
}

const loadStats = async () => {
  try {
    const { data } = await supabase.rpc('admin_get_stats', { p_key: adminKey.value })
    if (data) stats.value = data
  } catch(e) { console.error('loadStats:', e) }
}

const loadRecentTx = async () => {
  recentTxLoading.value = true
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/admin_get_transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ limit: 5, offset: 0 })
    })
    const data = await res.json()
    recentTxList.value = Array.isArray(data) ? data.slice(0,5) : (data.transactions||[]).slice(0,5)
  } catch(e) { console.error('recentTx:', e) }
  finally { recentTxLoading.value = false }
}

const loadChartData = async () => {
  chartLoading.value = true
  try {
    const days = []
    const maxDep = 1
    const raw = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const label = d.toLocaleDateString('en-US', { weekday: 'short' })
      days.push({ date: dateStr, label, dep: 0, wd: 0 })
    }
    const from = days[0].date + 'T00:00:00.000Z'
    const { data: txs } = await supabase
      .from('transactions')
      .select('type,amount,created_at')
      .gte('created_at', from)
      .eq('status', 'confirmed')
    ;(txs || []).forEach(tx => {
      const d = tx.created_at.split('T')[0]
      const day = days.find(x => x.date === d)
      if (!day) return
      if (tx.type === 'deposit') day.dep += Number(tx.amount)||0
      else day.wd += Number(tx.amount)||0
    })
    const maxVal = Math.max(...days.map(d => Math.max(d.dep, d.wd)), 1)
    chartData.value = days.map(d => ({
      label: d.label,
      depH: Math.max(2, Math.round((d.dep / maxVal) * 65)),
      wdH: Math.max(2, Math.round((d.wd / maxVal) * 65))
    }))
    // game active rate
    const actGames = games.value.filter(g=>g.is_active).length
    const totalGames = games.value.length || 1
    gameActiveRate.value = Math.round(actGames / totalGames * 100)
  } catch(e) { console.error('chartData:', e) }
  finally { chartLoading.value = false }
}

const fetchTransactions = async () => {
  loadingTx.value = true; txError.value = ''
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/admin_get_transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ status: filter.value.status || undefined, type: filter.value.type || undefined, limit: 50 })
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    transactions.value = Array.isArray(data) ? data : (data.transactions || [])
  } catch(e) { txError.value = e.message }
  finally { loadingTx.value = false }
}

const approveReject = async (id, action) => {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/admin_approve_reject_v4`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ transaction_id: id, action })
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    showToast(action === 'approve' ? 'Approved' : 'Rejected', 'success')
    fetchTransactions()
  } catch(e) { showToast(e.message, 'error') }
}

const fetchSettings = async () => {
  loadingSettings.value = true
  try {
    const { data } = await supabase.rpc('admin_get_settings', { p_key: adminKey.value })
    if (data) settings.value = { ...data }
  } catch(e) { console.error(e) }
  finally { loadingSettings.value = false }
}

const saveSettings = async () => {
  savingSettings.value = true; settingsMsg.value = ''
  try {
    const { error } = await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: settings.value })
    if (error) throw error
    settingsOk.value = true; settingsMsg.value = 'Saved successfully'
    showToast('Settings saved', 'success')
  } catch(e) { settingsOk.value = false; settingsMsg.value = e.message }
  finally { savingSettings.value = false; setTimeout(() => { settingsMsg.value = '' }, 3000) }
}

const fetchUsers = async () => {
  loadingUsers.value = true
  try {
    const { data } = await supabase.rpc('admin_list_users', { p_key: adminKey.value })
    users.value = data || []
  } catch(e) { console.error(e) }
  finally { loadingUsers.value = false }
}

const selectUser = (u) => { selectedUser.value = { ...u }; adjustAmt.value = 0; userActionMsg.value = '' }

const toggleBan = async (u) => {
  actionLoading.value = true
  try {
    const newBan = !u.is_banned
    const { error } = await supabase.rpc('admin_ban_user', { p_key: adminKey.value, p_user_id: u.id, p_ban: newBan })
    if (error) throw error
    selectedUser.value.is_banned = newBan
    const idx = users.value.findIndex(x => x.id === u.id)
    if (idx !== -1) users.value[idx].is_banned = newBan
    showToast(newBan ? 'User banned' : 'User unbanned', 'success')
  } catch(e) { showToast(e.message, 'error') }
  finally { actionLoading.value = false }
}

const adjustBalance = async (u) => {
  if (!adjustAmt.value) return
  actionLoading.value = true
  try {
    const { error } = await supabase.rpc('admin_adjust_balance', { p_key: adminKey.value, p_user_id: u.id, p_amount: adjustAmt.value })
    if (error) throw error
    userActionMsg.value = `Balance adjusted by ${adjustAmt.value > 0 ? '+' : ''}${adjustAmt.value}`
    adjustAmt.value = 0
    showToast('Balance updated', 'success')
  } catch(e) { showToast(e.message, 'error') }
  finally { actionLoading.value = false }
}

const fetchGames = async () => {
  loadingGames.value = true
  try {
    const { data } = await supabase.rpc('admin_list_games', { p_key: adminKey.value })
    games.value = data || []
    const actGames = games.value.filter(g=>g.is_active).length
    gameActiveRate.value = Math.round(actGames / (games.value.length||1) * 100)
  } catch(e) { console.error(e) }
  finally { loadingGames.value = false }
}

const toggleGame = async (g) => {
  const newState = !g.is_active
  try {
    const { error } = await supabase.rpc('admin_toggle_game', { p_key: adminKey.value, p_game_id: g.id, p_active: newState })
    if (error) throw error
    const idx = games.value.findIndex(x => x.id === g.id)
    if (idx !== -1) games.value[idx].is_active = newState
    gameActiveRate.value = Math.round(games.value.filter(x=>x.is_active).length / (games.value.length||1) * 100)
  } catch(e) { showToast(e.message, 'error') }
}

const fetchMessages = async () => {
  loadingMsgs.value = true
  try {
    const { data } = await supabase.rpc('admin_list_messages', { p_key: adminKey.value })
    messages.value = data || []
  } catch(e) { console.error(e) }
  finally { loadingMsgs.value = false }
}

const sendMessage = async () => {
  if (!newMsg.value.title.trim() || !newMsg.value.body.trim()) {
    showToast('Title and body required', 'error'); return
  }
  sendingMsg.value = true; msgSendResult.value = ''
  try {
    const { error } = await supabase.rpc('admin_send_message', {
      p_key: adminKey.value, p_title: newMsg.value.title.trim(), p_body: newMsg.value.body.trim()
    })
    if (error) throw error
    msgSendOk.value = true; msgSendResult.value = 'Message sent to all users'
    newMsg.value = { title: '', body: '' }
    showToast('Message sent', 'success')
    fetchMessages()
  } catch(e) { msgSendOk.value = false; msgSendResult.value = e.message }
  finally { sendingMsg.value = false; setTimeout(() => { msgSendResult.value = '' }, 4000) }
}

const deleteMessage = async (id) => {
  try {
    const { error } = await supabase.rpc('admin_delete_message', { p_key: adminKey.value, p_id: id })
    if (error) throw error
    messages.value = messages.value.filter(m => m.id !== id)
    showToast('Deleted', 'success')
  } catch(e) { showToast(e.message, 'error') }
}

const fmtNum = (n, dec = 0) => {
  const v = Number(n) || 0
  if (v >= 1000000) return (v/1000000).toFixed(2) + 'M'
  if (v >= 1000) return new Intl.NumberFormat('en-US').format(Math.round(v))
  return v.toFixed(dec)
}
const fmtDate = d => d ? new Date(d).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'numeric' }) : '—'
const copyText = t => navigator.clipboard.writeText(t).then(() => showToast('Copied', 'info')).catch(()=>{})
</script>

<style scoped>
/* ── ROOT ── */
.adm-root {
  min-height: 100vh;
  background: #233030;
  color: rgba(255,255,255,0.88);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  -webkit-tap-highlight-color: transparent;
}

/* ── HEADER ── */
.adm-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(20,28,28,0.96);
  border-bottom: 1px solid rgba(13,211,197,0.15);
  backdrop-filter: blur(12px);
  display: flex; align-items: center; gap: 8px;
  padding: 0 12px;
  min-height: 44px;
}
.adm-header-left { display: flex; align-items: center; gap: 7px; flex-shrink: 0; }
.adm-logo-mark {
  width: 8px; height: 8px; border-radius: 2px;
  background: #0dd3c5;
  box-shadow: 0 0 8px rgba(13,211,197,0.7);
}
.adm-brand { font-size: 11px; font-weight: 800; color: #0dd3c5; letter-spacing: 0.08em; }
.adm-brand-sub { color: rgba(255,255,255,0.4); font-weight: 400; }

.adm-tabs-scroll {
  flex: 1; display: flex; overflow-x: auto; gap: 2px;
  scrollbar-width: none; min-width: 0;
}
.adm-tabs-scroll::-webkit-scrollbar { display: none; }
.adm-tab {
  flex-shrink: 0; display: flex; align-items: center; gap: 4px;
  padding: 10px 10px;
  font-size: 10px; font-weight: 600; white-space: nowrap;
  background: none; border: none; border-bottom: 2px solid transparent;
  color: rgba(255,255,255,0.4); cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.adm-tab--on { color: #0dd3c5; border-bottom-color: #0dd3c5; }
.adm-tab-icon { flex-shrink: 0; }
.adm-logout-btn {
  flex-shrink: 0; background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.25);
  border-radius: 6px; padding: 5px 7px; color: #f87171; cursor: pointer;
  display: flex; align-items: center;
}
.adm-logout-btn:active { opacity: 0.7; }

/* ── BODY ── */
.adm-body { padding: 10px 10px 24px; }
.adm-tab-body { display: flex; flex-direction: column; gap: 0; }

/* ── LOGIN ── */
.adm-login-wrap { display: flex; justify-content: center; padding-top: 60px; }
.adm-login-card {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(13,211,197,0.2);
  border-radius: 16px; padding: 28px 22px; width: 100%; max-width: 320px; text-align: center;
}
.adm-login-icon { display: flex; justify-content: center; margin-bottom: 12px; }
.adm-login-title { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.adm-login-sub { font-size: 11px; color: rgba(255,255,255,0.4); margin-bottom: 16px; }
.adm-login-btn { width: 100%; padding: 11px; margin-top: 8px; }

/* ── CARD ── */
.adm-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px; padding: 10px 12px;
  margin-bottom: 8px;
}
.adm-card-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.adm-card-title { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.7); letter-spacing: 0.04em; text-transform: uppercase; }
.adm-live-badge {
  font-size: 8px; font-weight: 800; padding: 2px 6px; border-radius: 4px;
  background: rgba(13,211,197,0.15); color: #0dd3c5; border: 1px solid rgba(13,211,197,0.3);
  letter-spacing: 0.06em;
}

/* ── METRICS ── */
.adm-metrics-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 8px;
}
@media (max-width: 400px) { .adm-metrics-row { grid-template-columns: repeat(2, 1fr); } }
.adm-metric-card {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px; padding: 8px 9px;
}
.adm-metric-icon {
  width: 24px; height: 24px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 5px;
}
.adm-metric-icon--blue  { background: rgba(99,102,241,0.15); color: #818cf8; }
.adm-metric-icon--green { background: rgba(13,211,197,0.12); color: #0dd3c5; }
.adm-metric-icon--red   { background: rgba(248,113,113,0.12); color: #f87171; }
.adm-metric-icon--yellow{ background: rgba(251,191,36,0.12); color: #fbbf24; }
.adm-metric-val { font-size: 15px; font-weight: 800; color: #fff; line-height: 1.1; }
.adm-metric-val--green  { color: #0dd3c5; }
.adm-metric-val--red    { color: #f87171; }
.adm-metric-val--yellow { color: #fbbf24; }
.adm-metric-lbl { font-size: 9px; color: rgba(255,255,255,0.38); margin: 2px 0 5px; }
.adm-metric-bar { height: 2px; background: rgba(255,255,255,0.07); border-radius: 1px; }
.adm-metric-fill { height: 100%; border-radius: 1px; transition: width 0.6s ease; }
.adm-metric-fill--blue  { background: #818cf8; }
.adm-metric-fill--green { background: #0dd3c5; }
.adm-metric-fill--red   { background: #f87171; }
.adm-metric-fill--yellow{ background: #fbbf24; }

/* ── CHART ROW ── */
.adm-chart-row { display: flex; gap: 8px; margin-bottom: 0; align-items: stretch; }
.adm-chart-card { flex: 1; min-width: 0; }
.adm-chart-area { margin: 6px 0 4px; }
.adm-bar-chart { width: 100%; height: 80px; display: block; }
.adm-chart-legend { display: flex; align-items: center; font-size: 9px; color: rgba(255,255,255,0.45); }
.adm-legend-dot { display: inline-block; width: 7px; height: 7px; border-radius: 2px; margin-right: 4px; }
.adm-legend-lbl { }

.adm-gauges-col { display: flex; flex-direction: column; gap: 8px; width: 110px; flex-shrink: 0; }
.adm-gauge-card { padding: 8px 10px; display: flex; flex-direction: column; align-items: center; }
.adm-gauge-wrap { width: 80px; height: 46px; }
.adm-gauge-svg { width: 100%; height: 100%; }
.adm-gauge-lbl { font-size: 9px; color: rgba(255,255,255,0.4); margin-top: 2px; text-align: center; }
.adm-balance-card { padding: 8px 10px; }
.adm-big-num { font-size: 14px; font-weight: 800; color: #0dd3c5; margin-top: 4px; }
.adm-big-unit { font-size: 8px; color: rgba(255,255,255,0.3); margin-bottom: 6px; }
.adm-prog-track { height: 3px; background: rgba(255,255,255,0.07); border-radius: 2px; margin-bottom: 3px; }
.adm-prog-fill { height: 100%; background: linear-gradient(90deg,#0dd3c5,#6366f1); border-radius: 2px; transition: width 0.6s; }
.adm-prog-label { font-size: 8px; color: rgba(255,255,255,0.3); }

/* ── HEALTH BARS ── */
.adm-health-row { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
.adm-health-row:last-child { margin-bottom: 0; }
.adm-health-lbl { font-size: 9px; color: rgba(255,255,255,0.45); width: 90px; flex-shrink: 0; }
.adm-health-track { flex: 1; height: 4px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
.adm-health-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }
.adm-health-val { font-size: 9px; color: rgba(255,255,255,0.55); width: 28px; text-align: right; flex-shrink: 0; }

/* ── RECENT TX ── */
.adm-recent-tx {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.adm-recent-tx:last-child { border-bottom: none; padding-bottom: 0; }
.adm-tx-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.adm-dot--green { background: #0dd3c5; box-shadow: 0 0 4px rgba(13,211,197,0.6); }
.adm-dot--red   { background: #f87171; box-shadow: 0 0 4px rgba(248,113,113,0.6); }
.adm-tx-info { flex: 1; display: flex; align-items: center; gap: 6px; min-width: 0; }
.adm-tx-type-badge { font-size: 8px; font-weight: 700; padding: 2px 5px; border-radius: 3px; flex-shrink: 0; }
.badge--dep { background: rgba(13,211,197,0.15); color: #0dd3c5; }
.badge--wd  { background: rgba(248,113,113,0.15); color: #f87171; }
.adm-tx-user { font-size: 9px; color: rgba(255,255,255,0.55); font-family: monospace; }
.adm-tx-method { font-size: 9px; color: rgba(255,255,255,0.35); }
.adm-tx-right { display: flex; align-items: center; gap: 5px; flex-shrink: 0; }
.adm-tx-amt { font-size: 10px; font-weight: 700; }
.amt--green { color: #0dd3c5; }
.amt--red   { color: #f87171; }
.adm-status-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.sdot--confirmed { background: #4ade80; }
.sdot--pending   { background: #fbbf24; }
.sdot--rejected  { background: #f87171; }

/* ── TX ROW (Tab 1) ── */
.adm-tx-row {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px; padding: 9px 10px; margin-bottom: 6px;
}
.adm-tx-row-top { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
.adm-tx-amount { flex: 1; font-size: 13px; font-weight: 800; color: #e2e8f0; }
.adm-tx-row-meta { font-size: 10px; color: rgba(255,255,255,0.4); display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 5px; }
.adm-tx-row-id { display: flex; align-items: center; gap: 5px; margin-bottom: 6px; }
.adm-mono { font-size: 9px; color: rgba(255,255,255,0.3); font-family: monospace; word-break: break-all; flex: 1; }
.adm-tx-row-actions { display: flex; gap: 7px; }

.adm-status-badge {
  font-size: 8px; font-weight: 700; padding: 2px 7px; border-radius: 20px; text-transform: uppercase;
}
.sb--pending   { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
.sb--confirmed { background: rgba(74,222,128,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.25); }
.sb--rejected  { background: rgba(248,113,113,0.15); color: #f87171; border: 1px solid rgba(248,113,113,0.25); }

/* ── INPUTS ── */
.adm-input {
  width: 100%; box-sizing: border-box;
  background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; padding: 8px 10px; color: #e2e8f0; font-size: 12px; outline: none;
  transition: border-color 0.2s;
}
.adm-input:focus { border-color: #0dd3c5; }
.adm-textarea {
  width: 100%; box-sizing: border-box;
  background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; padding: 8px 10px; color: #e2e8f0; font-size: 12px; outline: none; resize: vertical;
}
.adm-textarea:focus { border-color: #0dd3c5; }
.adm-label { display: block; font-size: 10px; color: rgba(255,255,255,0.45); margin-bottom: 4px; }
.adm-select {
  background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; padding: 7px 8px; color: #e2e8f0; font-size: 11px; outline: none;
}
.mt6 { margin-top: 6px; }

/* ── BUTTONS ── */
.adm-btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  background: linear-gradient(135deg, #0dd3c5, #0891b2);
  color: #fff; font-weight: 700; border: none; border-radius: 8px;
  padding: 9px 14px; cursor: pointer; font-size: 11px; transition: opacity 0.15s;
}
.adm-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.adm-btn-primary:active:not(:disabled) { opacity: 0.8; }
.adm-btn-approve {
  background: rgba(74,222,128,0.12); border: 1px solid rgba(74,222,128,0.25);
  color: #4ade80; border-radius: 7px; padding: 6px 12px; font-size: 11px; font-weight: 700; cursor: pointer;
}
.adm-btn-reject {
  background: rgba(248,113,113,0.12); border: 1px solid rgba(248,113,113,0.25);
  color: #f87171; border-radius: 7px; padding: 6px 12px; font-size: 11px; font-weight: 700; cursor: pointer;
}
.adm-icon-btn {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 5px; padding: 4px 6px; cursor: pointer; color: rgba(255,255,255,0.55);
  display: flex; align-items: center; transition: opacity 0.15s;
}
.adm-icon-btn:active { opacity: 0.6; }
.adm-icon-btn.spinning svg { animation: spin 0.7s linear infinite; }
.adm-link-btn {
  background: none; border: none; color: #0dd3c5; font-size: 10px; font-weight: 600; cursor: pointer;
}
.adm-save-btn { width: 100%; padding: 11px; margin-top: 4px; }
.adm-filter-row { display: flex; gap: 6px; align-items: center; }
.adm-filter-btn { flex-shrink: 0; padding: 8px 12px; font-size: 11px; }
.adm-del-btn { color: #f87171; background: rgba(248,113,113,0.07); border-color: rgba(248,113,113,0.2); }

/* ── USERS ── */
.adm-user-row {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 8px; cursor: pointer; margin-bottom: 4px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  transition: background 0.15s;
}
.adm-user-row:active { background: rgba(255,255,255,0.06); }
.adm-user-av {
  width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #0dd3c5, #6366f1);
  display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800;
}
.adm-user-info { flex: 1; min-width: 0; }
.adm-user-name { font-size: 11px; font-weight: 700; color: #e2e8f0; }
.adm-user-meta { font-size: 9px; color: rgba(255,255,255,0.38); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ── GAMES ── */
.adm-games-summary { font-size: 10px; margin-bottom: 8px; padding: 0 2px; }
.adm-game-row {
  display: flex; align-items: center; gap: 9px;
  padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.adm-game-img { width: 34px; height: 34px; object-fit: cover; border-radius: 7px; flex-shrink: 0; }
.adm-game-img--ph {
  background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.3);
}
.adm-game-info { flex: 1; min-width: 0; }
.adm-game-name { font-size: 11px; font-weight: 600; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.adm-game-meta { font-size: 9px; color: rgba(255,255,255,0.38); margin-top: 1px; }
.adm-toggle {
  flex-shrink: 0; padding: 4px 10px; border-radius: 20px;
  font-size: 9px; font-weight: 700; border: none; cursor: pointer; transition: all 0.15s;
}
.adm-toggle--on  { background: rgba(13,211,197,0.15); color: #0dd3c5; border: 1px solid rgba(13,211,197,0.3); }
.adm-toggle--off { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.35); border: 1px solid rgba(255,255,255,0.1); }

/* ── MESSAGES ── */
.adm-msg-row {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.adm-msg-info { flex: 1; }
.adm-msg-title { font-size: 11px; font-weight: 700; color: #e2e8f0; margin-bottom: 2px; }
.adm-msg-body { font-size: 10px; color: rgba(255,255,255,0.45); margin-bottom: 3px; line-height: 1.4; }
.adm-msg-date { font-size: 9px; color: rgba(255,255,255,0.25); }

/* ── INFO ROWS ── */
.adm-info-rows { margin-bottom: 10px; }
.adm-info-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 11px;
}
.adm-info-row span:first-child { color: rgba(255,255,255,0.4); }
.adm-info-row span:last-child { color: #e2e8f0; font-weight: 600; text-align: right; }

/* ── MODAL ── */
.adm-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200;
  display: flex; align-items: center; justify-content: center; padding: 16px;
}
.adm-modal {
  background: #1c2828; border: 1px solid rgba(13,211,197,0.15);
  border-radius: 16px; padding: 18px; width: 100%; max-width: 340px;
  max-height: 85vh; overflow-y: auto; position: relative;
}
.adm-modal-close {
  position: absolute; top: 12px; right: 12px;
  background: rgba(255,255,255,0.08); border: none; color: #e2e8f0;
  width: 24px; height: 24px; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.adm-modal-title { font-size: 13px; font-weight: 800; color: #0dd3c5; margin-bottom: 10px; }
.adm-modal-actions { display: flex; gap: 7px; margin-top: 10px; }

/* ── MISC ── */
.adm-loading { display: flex; justify-content: center; padding: 28px 0; }
.adm-mini-load { display: flex; justify-content: center; padding: 12px 0; }
.adm-spinner {
  width: 24px; height: 24px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1); border-top-color: #0dd3c5;
  animation: spin 0.7s linear infinite;
}
.adm-spinner-sm {
  display: inline-block; width: 12px; height: 12px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff;
  animation: spin 0.6s linear infinite;
}
.adm-empty { text-align: center; padding: 20px; color: rgba(255,255,255,0.25); font-size: 11px; }
.adm-empty-sm { text-align: center; padding: 10px 0; color: rgba(255,255,255,0.25); font-size: 10px; }
.adm-err { color: #f87171; font-size: 11px; }
.adm-ok  { color: #4ade80; font-size: 11px; }
.adm-green { color: #4ade80; font-weight: 600; }
.adm-red   { color: #f87171; font-weight: 600; }

/* ── TOAST ── */
.adm-toast {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  background: #1c2828; border-radius: 10px; padding: 8px 16px;
  font-size: 11px; font-weight: 600; z-index: 300;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5); pointer-events: none; white-space: nowrap;
}
.adm-toast--success { background: #14402a; color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
.adm-toast--error   { background: #3f1a1a; color: #fca5a5; border: 1px solid rgba(252,165,165,0.3); }
.adm-toast--info    { background: #1a2e40; color: #7dd3fc; border: 1px solid rgba(125,211,252,0.3); }
.adm-toast-anim-enter-active { transition: opacity 0.2s, transform 0.2s; }
.adm-toast-anim-leave-active { transition: opacity 0.25s, transform 0.25s; }
.adm-toast-anim-enter-from { opacity: 0; transform: translateX(-50%) translateY(8px); }
.adm-toast-anim-leave-to   { opacity: 0; transform: translateX(-50%) translateY(8px); }

@keyframes spin { to { transform: rotate(360deg); } }
</style>
