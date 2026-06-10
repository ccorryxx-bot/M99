<template>
  <Transition name="slide-right">
    <aside v-if="playerPanel && selectedPlayer" class="a-right-panel">
      <div class="a-panel-hdr">
        <button @click="playerPanel=false" class="a-icon-btn">
          <svg width="14" height="14" fill="none" stroke="#4f46e5" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div class="a-panel-title">Player Detail</div>
        <div class="a-panel-av">{{ (selectedPlayer.username||'?')[0].toUpperCase() }}</div>
      </div>

      <div class="a-panel-body">

        <!-- IDENTITY -->
        <div class="a-section-block">
          <div class="a-section-hdr">
            <svg width="11" height="11" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2"/></svg>
            IDENTITY
          </div>
          <div class="a-row"><span class="a-lbl">Username</span><span class="a-val-dark">{{ selectedPlayer.username }}</span></div>
          <div class="a-row"><span class="a-lbl">Player ID</span><span class="a-val-dark a-mono-val">{{ (selectedPlayer.referral_code || selectedPlayer.id?.slice(0,8) || '—').toUpperCase() }}</span></div>
          <div class="a-row"><span class="a-lbl">Phone</span><span class="a-val-dark">{{ selectedPlayer.phone || '—' }}</span></div>
          <div class="a-row"><span class="a-lbl">Registered</span><span class="a-val-dark">{{ fmtDate(selectedPlayer.created_at) }}</span></div>
          <div class="a-row"><span class="a-lbl">Referral Code</span><span class="a-val-dark a-mono-val">{{ (selectedPlayer.referral_code || '—').toUpperCase() }}</span></div>
          <div class="a-row"><span class="a-lbl">VIP Level</span><span class="a-val-accent">VIP {{ selectedPlayer.vip_level || 0 }}</span></div>
          <div class="a-row a-row-last"><span class="a-lbl">Status</span>
            <span :class="selectedPlayer.is_banned ? 'a-badge-danger' : 'a-badge-success'">{{ selectedPlayer.is_banned ? 'BANNED' : 'ACTIVE' }}</span>
          </div>
        </div>

        <!-- FINANCIALS -->
        <div class="a-section-block">
          <div class="a-section-hdr">
            <svg width="11" height="11" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            FINANCIALS
          </div>
          <div class="a-row">
            <span class="a-lbl-icon"><svg width="10" height="10" fill="none" stroke="#0891b2" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>Total Deposited</span>
            <span class="a-val-in">{{ fmtNum(selectedPlayer.total_deposit) }} Ks</span>
          </div>
          <div class="a-row">
            <span class="a-lbl-icon"><svg width="10" height="10" fill="none" stroke="#dc2626" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>Total Withdrawn</span>
            <span class="a-val-out">{{ fmtNum(playerTotalWd) }} Ks</span>
          </div>
          <div class="a-row">
            <span class="a-lbl-icon"><svg width="10" height="10" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 6v6l4 2"/></svg>Current Balance</span>
            <span class="a-val-accent">{{ fmtNum(selectedPlayer.balance) }} Ks</span>
          </div>
          <div class="a-row a-row-last">
            <span class="a-lbl-icon"><svg width="10" height="10" fill="none" stroke="#16a34a" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Net Profit (House)</span>
            <span :class="(selectedPlayer.total_deposit - playerTotalWd) >= 0 ? 'a-val-success' : 'a-val-danger'">
              {{ fmtNum((selectedPlayer.total_deposit||0) - playerTotalWd) }} Ks
            </span>
          </div>
          <div class="a-adj-row">
            <input v-model.number="adjAmt" type="number" class="a-input a-input-sm" placeholder="Amount (+ or -)" />
            <button @click="doAdjustBalance" :disabled="panelLoading" class="a-btn-sm a-btn-primary-sm">Apply</button>
          </div>
          <p v-if="panelMsg" class="a-ok" style="font-size:10px;margin-top:4px;">{{ panelMsg }}</p>
        </div>

        <!-- TRANSACTION HISTORY -->
        <div class="a-section-block">
          <div class="a-section-hdr">
            <svg width="11" height="11" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
            TRANSACTION HISTORY
          </div>
          <div v-if="playerTxLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
          <div v-else>
            <div v-for="tx in playerTxList.slice(0,10)" :key="tx.id" class="a-ptx-row">
              <span class="a-io-badge" :class="tx.type==='deposit'?'badge-in':'badge-out'">{{ tx.type==='deposit'?'IN':'OUT' }}</span>
              <span class="a-ptx-method">{{ tx.method }}</span>
              <span class="a-ptx-amt" :class="tx.type==='deposit'?'a-val-in':'a-val-out'">{{ fmtNum(tx.amount) }} Ks</span>
              <span class="a-ptx-status" :class="`sdot-${tx.status}`">{{ tx.status }}</span>
            </div>
            <div v-if="!playerTxList.length" class="a-empty-sm">No transactions</div>
          </div>
        </div>

        <!-- LOGIN SESSIONS & IP -->
        <div class="a-section-block">
          <div class="a-section-hdr">
            <svg width="11" height="11" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
            LOGIN SESSIONS &amp; IP
          </div>
          <div v-if="playerSessLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
          <div v-else>
            <div v-for="s in playerSessions.slice(0,5)" :key="s.id" class="a-sess-row">
              <div class="a-sess-top">
                <span class="a-mono-val" style="font-size:9px;color:#4f46e5;font-weight:700;">{{ s.ip_address || '—' }}</span>
                <span style="font-size:9px;color:#94a3b8;">{{ fmtDate(s.login_at) }}</span>
              </div>
              <div class="a-sess-bot">{{ s.device_type }} · {{ s.browser }} · {{ s.os }}</div>
            </div>
            <div v-if="!playerSessions.length" class="a-empty-sm">No sessions found</div>
          </div>
        </div>

        <!-- GAME ACTIVITY -->
        <div class="a-section-block">
          <div class="a-section-hdr">
            <svg width="11" height="11" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
            GAME ACTIVITY
          </div>
          <div class="a-row"><span class="a-lbl">Win Withdrawals</span><span class="a-val-success">{{ playerWinWdCount }} TXs</span></div>
          <div class="a-row"><span class="a-lbl">Total Win Amount</span><span class="a-val-success">{{ fmtNum(playerWinAmt) }} Ks</span></div>
          <div class="a-row a-row-last"><span class="a-lbl">Last Active</span><span class="a-val-dark">{{ playerSessions[0] ? fmtDate(playerSessions[0].login_at) : '—' }}</span></div>
        </div>

        <!-- ACTIONS -->
        <div class="a-section-block">
          <div class="a-section-hdr">
            <svg width="11" height="11" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
            ACTIONS
          </div>
          <div class="a-mini-label" style="margin-bottom:5px;">Reset Password</div>
          <div class="a-adj-row">
            <input v-model="newPassword" type="text" class="a-input a-input-sm" :placeholder="genPassword" readonly />
            <button @click="newPassword=genPassword" class="a-btn-sm a-btn-ghost">Gen</button>
          </div>
          <button @click="doResetPassword" :disabled="panelLoading||!newPassword" class="a-btn-sm a-btn-warn" style="width:100%;margin-top:7px;">
            <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
            Set New Password
          </button>
          <div style="height:1px;background:#e2e8f0;margin:12px 0;"></div>
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
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const {
  playerPanel, selectedPlayer,
  playerTxList, playerTxLoading,
  playerSessions, playerSessLoading,
  panelLoading, panelMsg, panelActionMsg, panelActionOk,
  adjAmt, newPassword, genPassword,
  playerTotalWd, playerWinWdCount, playerWinAmt,
  fmtNum, fmtDate,
  doAdjustBalance, doToggleBan, doResetPassword,
} = useAdmin()
</script>
