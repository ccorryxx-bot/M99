<template>
  <div class="a-tab-content">

    <!-- VIP Overview Cards -->
    <div class="vip-tier-grid">
      <div v-for="tier in vipTiers" :key="tier.level" class="vip-tier-card" :style="`border-top:3px solid ${tier.color}`">
        <div class="vip-tier-badge" :style="`background:${tier.color}20;color:${tier.color}`">VIP {{ tier.level }}</div>
        <div class="vip-tier-count">{{ tier.count }}</div>
        <div class="vip-tier-label">Players</div>
        <div class="vip-tier-vol">{{ fmtNum(tier.threshold) }} Ks</div>
        <div class="vip-tier-label">Min Turnover</div>
      </div>
    </div>

    <!-- VIP Level Configuration -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3l14 9-14 9V3z"/></svg>
        VIP Level Configuration
      </div>
      <div class="vip-config-table">
        <div class="vip-config-hdr">
          <span>Level</span><span>Min Turnover (Ks)</span><span>Daily Bonus (Ks)</span><span>Withdraw Bonus %</span><span>Max Withdraw/Day</span>
        </div>
        <div v-for="lvl in 5" :key="lvl" class="vip-config-row">
          <div class="vip-lbadge" :style="`background:${vipColors[lvl-1]}20;color:${vipColors[lvl-1]}`">VIP {{ lvl }}</div>
          <input v-model.number="vipConfig[lvl-1].threshold"  type="number" class="a-input a-input-sm" :placeholder="defaultThresholds[lvl-1]" />
          <input v-model.number="vipConfig[lvl-1].bonus"      type="number" class="a-input a-input-sm" :placeholder="defaultBonuses[lvl-1]" />
          <input v-model.number="vipConfig[lvl-1].bonus_pct"  type="number" class="a-input a-input-sm" placeholder="0" />
          <input v-model.number="vipConfig[lvl-1].max_wd"     type="number" class="a-input a-input-sm" placeholder="5000000" />
        </div>
      </div>
      <button @click="saveVipConfig" :disabled="vipSaving" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <span v-if="vipSaving" class="a-spinner-sm"></span>
        {{ vipSaving ? 'Saving...' : 'Save VIP Config' }}
      </button>
      <p v-if="vipMsg" :class="vipOk ? 'a-ok' : 'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ vipMsg }}</p>
    </div>

    <!-- VIP Users List -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>
        VIP Players
        <select v-model="vipFilter" class="a-select" style="margin-left:8px;font-size:10px;">
          <option value="0">All VIP</option>
          <option v-for="l in 5" :key="l" :value="l">VIP {{ l }}</option>
        </select>
      </div>

      <div v-if="vipLoading" class="a-loading"><span class="a-spinner"></span></div>
      <div v-else>
        <div v-for="u in filteredVipUsers" :key="u.id" class="vip-user-row">
          <div class="vip-av" :style="`background:${vipColors[(u.vip_level||1)-1]}20;color:${vipColors[(u.vip_level||1)-1]}`">
            {{ (u.username||'?')[0].toUpperCase() }}
          </div>
          <div class="vip-uinfo">
            <span class="vip-uname">{{ u.username }}</span>
            <span class="vip-umeta">{{ u.phone || '—' }} · {{ fmtNum(u.balance) }} Ks</span>
          </div>
          <div class="vip-uright">
            <span class="vip-lbadge" :style="`background:${vipColors[(u.vip_level||1)-1]}20;color:${vipColors[(u.vip_level||1)-1]}`">VIP {{ u.vip_level || 0 }}</span>
            <div class="vip-change-row">
              <select v-model="u._newLevel" class="a-select" style="font-size:10px;padding:3px 6px;">
                <option value="">Change...</option>
                <option v-for="l in 5" :key="l" :value="l">VIP {{ l }}</option>
              </select>
              <button v-if="u._newLevel" @click="changeVipLevel(u)" :disabled="u._busy" class="a-btn-sm a-btn-primary-sm">
                <span v-if="u._busy" class="a-spinner-sm"></span>
                Set
              </button>
            </div>
          </div>
        </div>
        <div v-if="!filteredVipUsers.length" class="a-empty">No VIP players found</div>
      </div>
    </div>

    <!-- Bulk VIP Actions -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">Bulk VIP Bonus Claim</div>
      <p class="a-mini-label" style="margin-bottom:8px;">Manually trigger daily VIP bonus for all eligible players</p>
      <div class="vip-bulk-row">
        <select v-model="bulkBonusLevel" class="a-select">
          <option value="0">All VIP Levels</option>
          <option v-for="l in 5" :key="l" :value="l">VIP {{ l }} Only</option>
        </select>
        <button @click="claimBulkBonus" :disabled="bonusBusy" class="a-btn-primary a-btn-sm">
          <span v-if="bonusBusy" class="a-spinner-sm"></span>
          {{ bonusBusy ? 'Processing...' : 'Trigger Bonus' }}
        </button>
      </div>
      <p v-if="bonusMsg" class="a-ok" style="margin-top:6px;font-size:10px;text-align:center;">{{ bonusMsg }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { adminKey, users, fmtNum, fetchUsers, showToast, writeAudit } = useAdmin()

const vipColors = ['#f59e0b','#6366f1','#0891b2','#d97706','#dc2626']
const defaultThresholds = ['100000','500000','2000000','10000000','50000000']
const defaultBonuses    = ['500','2000','10000','50000','200000']

const vipFilter  = ref(0)
const vipLoading = ref(false)
const vipSaving  = ref(false)
const vipMsg     = ref('')
const vipOk      = ref(false)

const vipConfig = reactive([
  { level:1, threshold:100000,   bonus:500,    bonus_pct:0, max_wd:1000000 },
  { level:2, threshold:500000,   bonus:2000,   bonus_pct:0, max_wd:3000000 },
  { level:3, threshold:2000000,  bonus:10000,  bonus_pct:1, max_wd:10000000 },
  { level:4, threshold:10000000, bonus:50000,  bonus_pct:2, max_wd:30000000 },
  { level:5, threshold:50000000, bonus:200000, bonus_pct:3, max_wd:99999999 },
])

const vipTiers = computed(() => vipConfig.map((c, i) => ({
  level: i + 1,
  color: vipColors[i],
  threshold: c.threshold,
  count: users.value.filter(u => (u.vip_level || 0) === i + 1).length
})))

const filteredVipUsers = computed(() => {
  let list = users.value.filter(u => (u.vip_level || 0) > 0)
  if (vipFilter.value > 0) list = list.filter(u => u.vip_level === vipFilter.value)
  return list.sort((a, b) => (b.vip_level || 0) - (a.vip_level || 0))
})

async function saveVipConfig() {
  vipSaving.value = true; vipMsg.value = ''
  try {
    const settObj = {}
    vipConfig.forEach(c => {
      settObj[`vip_${c.level}_threshold`] = c.threshold
      settObj[`vip_${c.level}_bonus`]     = c.bonus
      settObj[`vip_${c.level}_bonus_pct`] = c.bonus_pct
      settObj[`vip_${c.level}_max_wd`]    = c.max_wd
    })
    const { error } = await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: settObj })
    if (error) throw error
    vipOk.value = true; vipMsg.value = 'VIP config saved!'
    showToast('VIP config saved ✓', 'success')
    writeAudit('SAVE_VIP_CONFIG', '', JSON.stringify(settObj))
  } catch (e) { vipOk.value = false; vipMsg.value = e.message; showToast(e.message, 'error') }
  finally { vipSaving.value = false; setTimeout(() => { vipMsg.value = '' }, 3000) }
}

async function changeVipLevel(user) {
  if (!user._newLevel) return
  user._busy = true
  try {
    const { error } = await supabase.rpc('admin_adjust_vip', {
      p_key: adminKey.value, p_user_id: user.id, p_level: Number(user._newLevel)
    })
    if (error) throw error
    user.vip_level = Number(user._newLevel)
    user._newLevel = ''
    showToast(`VIP level updated to VIP ${user.vip_level}`, 'success')
    writeAudit('SET_VIP_LEVEL', user.username, `VIP ${user.vip_level}`)
  } catch (e) {
    await supabase.from('profiles').update({ vip_level: Number(user._newLevel) }).eq('id', user.id)
    user.vip_level = Number(user._newLevel); user._newLevel = ''
    showToast('VIP level updated', 'success')
  } finally { user._busy = false }
}

const bulkBonusLevel = ref(0)
const bonusBusy = ref(false)
const bonusMsg  = ref('')
async function claimBulkBonus() {
  bonusBusy.value = true; bonusMsg.value = ''
  try {
    const targets = bulkBonusLevel.value === 0
      ? users.value.filter(u => (u.vip_level || 0) > 0)
      : users.value.filter(u => u.vip_level === bulkBonusLevel.value)
    let count = 0
    for (const u of targets) {
      const bonus = vipConfig[(u.vip_level || 1) - 1]?.bonus || 0
      if (bonus > 0) {
        await supabase.rpc('admin_adjust_balance', { p_key: adminKey.value, p_user_id: u.id, p_amount: bonus }).catch(() => {})
        count++
      }
    }
    bonusMsg.value = `Bonus sent to ${count} players`
    showToast(`VIP bonus triggered for ${count} players`, 'success')
    writeAudit('BULK_VIP_BONUS', '', `${count} players`)
  } catch (e) { showToast(e.message, 'error') }
  finally { bonusBusy.value = false; setTimeout(() => { bonusMsg.value = '' }, 4000) }
}

onMounted(async () => { vipLoading.value = true; await fetchUsers(); vipLoading.value = false })
</script>

<style scoped>
.vip-tier-grid { display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:12px; }
@media(max-width:400px) { .vip-tier-grid { grid-template-columns:repeat(3,1fr); } }
.vip-tier-card { background:#fff;border-radius:10px;padding:10px 8px;text-align:center; }
.vip-tier-badge { font-size:10px;font-weight:800;padding:3px 8px;border-radius:6px;display:inline-block;margin-bottom:6px; }
.vip-tier-count { font-size:20px;font-weight:900;color:#0f172a;line-height:1; }
.vip-tier-vol { font-size:9px;font-weight:700;color:#0891b2;margin-top:4px; }
.vip-tier-label { font-size:8px;color:#94a3b8;margin:1px 0; }
.vip-config-table { width:100%;overflow-x:auto; }
.vip-config-hdr { display:grid;grid-template-columns:70px 1fr 1fr 1fr 1fr;gap:6px;font-size:9px;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #f1f5f9; }
.vip-config-row { display:grid;grid-template-columns:70px 1fr 1fr 1fr 1fr;gap:6px;margin-bottom:6px;align-items:center; }
.vip-lbadge { font-size:10px;font-weight:800;padding:3px 8px;border-radius:6px;display:inline-block;white-space:nowrap; }
.vip-user-row { display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9; }
.vip-av { width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0; }
.vip-uinfo { flex:1;min-width:0; }
.vip-uname { display:block;font-size:11px;font-weight:700;color:#0f172a; }
.vip-umeta { font-size:9px;color:#94a3b8; }
.vip-uright { display:flex;flex-direction:column;align-items:flex-end;gap:4px; }
.vip-change-row { display:flex;gap:4px;align-items:center; }
.vip-bulk-row { display:flex;gap:8px;align-items:center; }
</style>
