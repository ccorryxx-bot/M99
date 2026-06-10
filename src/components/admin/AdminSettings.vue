<template>
  <div class="a-tab-content">
    <div v-if="settLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>

      <!-- Maintenance Mode -->
      <div class="a-sett-block">
        <div class="a-sett-ttl" style="display:flex;align-items:center;justify-content:space-between;">
          <span>
            <svg width="12" height="12" fill="none" stroke="#d97706" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            Maintenance Mode
          </span>
          <button @click="sett.maintenance_mode = !sett.maintenance_mode"
            class="a-tog" :class="sett.maintenance_mode?'a-tog-danger':'a-tog-on'">
            {{ sett.maintenance_mode ? '🔴 ON' : '🟢 OFF' }}
          </button>
        </div>
        <p class="a-mini-label" style="margin-top:4px;">When ON, only admins can access the site. Users will see a maintenance message.</p>
      </div>

      <!-- Payment — KBZ Pay -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">KBZ Pay</div>
        <label class="a-mini-label">Recipient Name</label>
        <input v-model="sett.kpay_recipient_name" class="a-input" placeholder="Name" />
        <label class="a-mini-label" style="margin-top:7px;">Account Number</label>
        <input v-model="sett.kpay_recipient_account" class="a-input" placeholder="09XXXXXXXXX" />
      </div>

      <!-- Payment — Wave Pay -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">Wave Pay</div>
        <label class="a-mini-label">Recipient Name</label>
        <input v-model="sett.wave_recipient_name" class="a-input" placeholder="Name" />
        <label class="a-mini-label" style="margin-top:7px;">Account Number</label>
        <input v-model="sett.wave_recipient_account" class="a-input" placeholder="09XXXXXXXXX" />
      </div>

      <!-- Payment — USDT -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">USDT (TRC20)</div>
        <label class="a-mini-label">Wallet Address</label>
        <input v-model="sett.usdt_wallet_address" class="a-input" placeholder="TRC20 address..." />
        <label class="a-mini-label" style="margin-top:7px;">Rate (1 USDT = ? Ks)</label>
        <input v-model.number="sett.usdt_rate" type="number" class="a-input" placeholder="e.g. 3200" />
      </div>

      <!-- Deposit / Withdrawal Limits -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">Deposit Limits (Ks)</div>
        <div class="a-form-row">
          <div class="a-form-col">
            <label class="a-mini-label">Min Deposit</label>
            <input v-model.number="sett.min_deposit" type="number" class="a-input a-input-sm" placeholder="1000" />
          </div>
          <div class="a-form-col">
            <label class="a-mini-label">Max Deposit</label>
            <input v-model.number="sett.max_deposit" type="number" class="a-input a-input-sm" placeholder="10000000" />
          </div>
        </div>
      </div>

      <div class="a-sett-block">
        <div class="a-sett-ttl">Withdrawal Limits (Ks)</div>
        <div class="a-form-row">
          <div class="a-form-col">
            <label class="a-mini-label">Min Withdrawal</label>
            <input v-model.number="sett.min_withdraw" type="number" class="a-input a-input-sm" placeholder="5000" />
          </div>
          <div class="a-form-col">
            <label class="a-mini-label">Max Per Day</label>
            <input v-model.number="sett.max_withdraw_daily" type="number" class="a-input a-input-sm" placeholder="5000000" />
          </div>
        </div>
      </div>

      <!-- Commission -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">Commission</div>
        <label class="a-mini-label">Referral Commission (%)</label>
        <input v-model.number="sett.referral_commission_pct" type="number" class="a-input" placeholder="e.g. 5" />
      </div>

      <!-- VIP Level Config -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">VIP Level Thresholds</div>
        <div class="a-vip-grid">
          <div v-for="lvl in 5" :key="lvl" class="a-vip-row">
            <span class="a-vip-badge" :style="{ background: vipColors[lvl-1] }">VIP {{ lvl }}</span>
            <div class="a-form-col" style="flex:1;">
              <label class="a-mini-label">Min Turnover (Ks)</label>
              <input v-model.number="sett['vip_' + lvl + '_threshold']" type="number" class="a-input a-input-sm" :placeholder="defaultVipThresholds[lvl-1]" />
            </div>
            <div class="a-form-col" style="flex:1;">
              <label class="a-mini-label">Daily Bonus (Ks)</label>
              <input v-model.number="sett['vip_' + lvl + '_bonus']" type="number" class="a-input a-input-sm" :placeholder="defaultVipBonuses[lvl-1]" />
            </div>
          </div>
        </div>
      </div>

      <!-- Marquee / Announcement -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">
          <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
          Marquee Text
        </div>
        <textarea v-model="sett.marquee_text" class="a-input a-textarea" rows="2" placeholder="Scrolling announcement text on homepage..."></textarea>
      </div>

      <!-- Spin Wheel Prizes -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">Spin Wheel Prizes</div>
        <p class="a-mini-label" style="margin-bottom:6px;">JSON array: [&#123;"label":"500 Ks","amount":500,"weight":30&#125;, ...]</p>
        <textarea v-model="sett.spin_prizes_json" class="a-input a-textarea" rows="4"
          placeholder='[{"label":"500 Ks","amount":500,"weight":30},{"label":"1000 Ks","amount":1000,"weight":20},{"label":"5000 Ks","amount":5000,"weight":5}]'></textarea>
      </div>

      <!-- Popup Announcement -->
      <div class="a-sett-block">
        <div class="a-sett-ttl">Popup Announcement</div>
        <label class="a-mini-label">Title</label>
        <input v-model="sett.popup_title" class="a-input" placeholder="Announcement title..." />
        <label class="a-mini-label" style="margin-top:7px;">Body</label>
        <textarea v-model="sett.popup_body" class="a-input a-textarea" rows="3" placeholder="Announcement content..."></textarea>
        <div class="a-form-row" style="margin-top:7px;align-items:center;">
          <label class="a-mini-label" style="margin:0;">Show popup</label>
          <button @click="sett.popup_enabled = !sett.popup_enabled"
            class="a-tog" :class="sett.popup_enabled?'a-tog-on':'a-tog-off'">
            {{ sett.popup_enabled ? 'ON' : 'OFF' }}
          </button>
        </div>
      </div>

      <button @click="saveSett" :disabled="settSaving" class="a-btn-primary" style="width:100%;margin-top:4px;">
        <svg v-if="!settSaving" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        <span v-else class="a-spinner-sm"></span>
        {{ settSaving ? 'Saving...' : 'Save All Settings' }}
      </button>
      <p v-if="settMsg" :class="settOk?'a-ok':'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ settMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { sett, settLoading, settSaving, settMsg, settOk, saveSett } = useAdmin()

const vipColors = ['#f59e0b','#6366f1','#0891b2','#d97706','#dc2626']
const defaultVipThresholds = ['100,000','500,000','2,000,000','10,000,000','50,000,000']
const defaultVipBonuses    = ['500','2,000','10,000','50,000','200,000']
</script>
