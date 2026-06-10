<template>
  <div class="a-tab-content">

    <!-- Active Bonus Rules Summary -->
    <div class="bonus-stats-row">
      <div class="bonus-stat-card">
        <div class="bonus-stat-val" style="color:#16a34a;">{{ activeRules.length }}</div>
        <div class="bonus-stat-lbl">Active Rules</div>
      </div>
      <div class="bonus-stat-card">
        <div class="bonus-stat-val" style="color:#4f46e5;">{{ fmtNum(totalBonusPaid) }}</div>
        <div class="bonus-stat-lbl">Total Paid (Ks)</div>
      </div>
      <div class="bonus-stat-card">
        <div class="bonus-stat-val" style="color:#d97706;">{{ pendingBonuses }}</div>
        <div class="bonus-stat-lbl">Pending Claims</div>
      </div>
    </div>

    <!-- Add / Edit Bonus Rule -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        {{ editMode ? 'Edit Bonus Rule' : 'Add Bonus Rule' }}
      </div>

      <div class="bonus-form-grid">
        <div>
          <label class="a-mini-label">Rule Name</label>
          <input v-model="form.name" class="a-input" placeholder="e.g. First Deposit Bonus" />
        </div>
        <div>
          <label class="a-mini-label">Bonus Type</label>
          <select v-model="form.type" class="a-select" style="width:100%;">
            <option value="first_deposit">First Deposit</option>
            <option value="deposit_match">Deposit Match %</option>
            <option value="fixed">Fixed Amount</option>
            <option value="cashback">Cashback %</option>
            <option value="referral">Referral Bonus</option>
            <option value="daily_login">Daily Login</option>
            <option value="level_up">Level Up Reward</option>
          </select>
        </div>
        <div>
          <label class="a-mini-label">{{ form.type === 'deposit_match' || form.type === 'cashback' ? 'Percentage (%)' : 'Amount (Ks)' }}</label>
          <input v-model.number="form.value" type="number" class="a-input" placeholder="e.g. 100 or 10" />
        </div>
        <div>
          <label class="a-mini-label">Max Bonus Cap (Ks)</label>
          <input v-model.number="form.max_amount" type="number" class="a-input" placeholder="0 = no cap" />
        </div>
        <div>
          <label class="a-mini-label">Min Deposit Trigger (Ks)</label>
          <input v-model.number="form.min_deposit" type="number" class="a-input" placeholder="e.g. 5000" />
        </div>
        <div>
          <label class="a-mini-label">Wagering Requirement (x)</label>
          <input v-model.number="form.wagering" type="number" class="a-input" placeholder="e.g. 3 = 3x turnover" />
        </div>
        <div>
          <label class="a-mini-label">Expiry (days from claim)</label>
          <input v-model.number="form.expiry_days" type="number" class="a-input" placeholder="e.g. 7" />
        </div>
        <div>
          <label class="a-mini-label">Max Uses (0 = unlimited)</label>
          <input v-model.number="form.max_uses" type="number" class="a-input" placeholder="0" />
        </div>
        <div class="bonus-form-full">
          <label class="a-mini-label">Target Segment</label>
          <select v-model="form.segment" class="a-select" style="width:100%;">
            <option value="all">All Players</option>
            <option value="new">New Players Only</option>
            <option value="vip">VIP 3+ Only</option>
            <option value="inactive">Re-engage Inactive</option>
            <option value="high_val">High Value Players</option>
          </select>
        </div>
        <div class="bonus-form-full" style="display:flex;align-items:center;gap:12px;">
          <label class="a-mini-label" style="margin:0;">Active</label>
          <button @click="form.is_active = !form.is_active" class="a-tog" :class="form.is_active ? 'a-tog-on' : 'a-tog-off'">
            {{ form.is_active ? 'ON' : 'OFF' }}
          </button>
          <label class="a-mini-label" style="margin:0 0 0 12px;">Auto-apply</label>
          <button @click="form.auto_apply = !form.auto_apply" class="a-tog" :class="form.auto_apply ? 'a-tog-on' : 'a-tog-off'">
            {{ form.auto_apply ? 'ON' : 'OFF' }}
          </button>
        </div>
      </div>

      <div style="display:flex;gap:8px;margin-top:10px;">
        <button v-if="editMode" @click="cancelEdit" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
        <button @click="saveRule" :disabled="saving" class="a-btn-primary" :style="editMode ? 'flex:2;' : 'width:100%;'">
          <span v-if="saving" class="a-spinner-sm"></span>
          {{ saving ? 'Saving...' : editMode ? 'Update Rule' : 'Add Rule' }}
        </button>
      </div>
      <p v-if="saveMsg" :class="saveOk ? 'a-ok' : 'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ saveMsg }}</p>
    </div>

    <!-- Existing Bonus Rules -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h7"/></svg>
        Bonus Rules ({{ bonusRules.length }})
      </div>

      <div v-if="rulesLoading" class="a-loading"><span class="a-spinner"></span></div>
      <div v-else-if="!bonusRules.length" class="a-empty">No bonus rules yet — add one above</div>
      <div v-else>
        <div v-for="rule in bonusRules" :key="rule.id" class="bonus-rule-row">
          <div class="bonus-rule-icon" :style="`background:${bonusTypeColor(rule.type)}20;color:${bonusTypeColor(rule.type)}`">
            {{ bonusTypeIcon(rule.type) }}
          </div>
          <div class="bonus-rule-info">
            <div class="bonus-rule-name">{{ rule.name }}</div>
            <div class="bonus-rule-meta">
              <span class="bonus-type-chip" :style="`background:${bonusTypeColor(rule.type)}15;color:${bonusTypeColor(rule.type)}`">{{ rule.type }}</span>
              <span>{{ rule.type === 'deposit_match' || rule.type === 'cashback' ? rule.value + '%' : fmtNum(rule.value) + ' Ks' }}</span>
              <span v-if="rule.wagering">{{ rule.wagering }}x wagering</span>
              <span v-if="rule.segment && rule.segment !== 'all'" class="seg-chip">{{ rule.segment }}</span>
            </div>
            <div class="bonus-rule-stats">
              <span>Uses: {{ rule.use_count || 0 }}{{ rule.max_uses ? '/'+rule.max_uses : '' }}</span>
              <span>Paid: {{ fmtNum(rule.total_paid || 0) }} Ks</span>
              <span v-if="rule.expiry_days">Exp: {{ rule.expiry_days }}d</span>
            </div>
          </div>
          <div class="bonus-rule-actions">
            <button @click="toggleRule(rule)" class="a-tog" :class="rule.is_active ? 'a-tog-on' : 'a-tog-off'" style="font-size:9px;padding:3px 7px;">
              {{ rule.is_active ? 'ON' : 'OFF' }}
            </button>
            <button @click="editRule(rule)" class="a-btn-sm a-btn-ghost">✏</button>
            <button @click="deleteRule(rule.id)" class="a-btn-sm a-btn-danger">✕</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Manual Bonus Grant -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">Manual Bonus Grant</div>
      <p class="a-mini-label" style="margin-bottom:8px;">Send a one-time bonus to a specific player</p>
      <div class="bonus-manual-grid">
        <div>
          <label class="a-mini-label">Username</label>
          <input v-model="manual.username" class="a-input" placeholder="Player username..." />
        </div>
        <div>
          <label class="a-mini-label">Amount (Ks)</label>
          <input v-model.number="manual.amount" type="number" class="a-input" placeholder="e.g. 5000" />
        </div>
        <div class="bonus-form-full">
          <label class="a-mini-label">Reason</label>
          <input v-model="manual.reason" class="a-input" placeholder="Bonus reason..." />
        </div>
      </div>
      <button @click="grantManualBonus" :disabled="manual.busy" class="a-btn-primary" style="width:100%;margin-top:8px;">
        <span v-if="manual.busy" class="a-spinner-sm"></span>
        {{ manual.busy ? 'Sending...' : 'Grant Bonus' }}
      </button>
      <p v-if="manual.msg" :class="manual.ok ? 'a-ok' : 'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ manual.msg }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { adminKey, users, fmtNum, showToast, writeAudit } = useAdmin()

const bonusRules  = ref([])
const rulesLoading = ref(false)
const editMode    = ref(false)
const saving      = ref(false)
const saveMsg     = ref('')
const saveOk      = ref(false)

const form = reactive({
  id: null, name: '', type: 'first_deposit', value: 0, max_amount: 0,
  min_deposit: 0, wagering: 1, expiry_days: 7, max_uses: 0,
  segment: 'all', is_active: true, auto_apply: false
})

const manual = reactive({ username: '', amount: 0, reason: '', busy: false, msg: '', ok: false })

const totalBonusPaid  = computed(() => bonusRules.value.reduce((s, r) => s + (r.total_paid || 0), 0))
const activeRules     = computed(() => bonusRules.value.filter(r => r.is_active))
const pendingBonuses  = computed(() => bonusRules.value.filter(r => r.pending_count > 0).length)

const bonusTypeColor = (t) => ({
  first_deposit: '#16a34a', deposit_match: '#4f46e5', fixed: '#0891b2',
  cashback: '#d97706', referral: '#7c3aed', daily_login: '#db2777', level_up: '#dc2626'
}[t] || '#64748b')

const bonusTypeIcon = (t) => ({
  first_deposit: '🎁', deposit_match: '💰', fixed: '⚡', cashback: '♻',
  referral: '👥', daily_login: '📅', level_up: '⭐'
}[t] || '🎯')

async function loadRules() {
  rulesLoading.value = true
  try {
    const { data } = await supabase.from('bonus_rules').select('*').order('created_at', { ascending: false })
    bonusRules.value = data || []
  } catch (e) {
    bonusRules.value = []
  } finally { rulesLoading.value = false }
}

function editRule(rule) {
  editMode.value = true
  Object.assign(form, { ...rule })
}
function cancelEdit() {
  editMode.value = false
  Object.assign(form, { id: null, name: '', type: 'first_deposit', value: 0, max_amount: 0, min_deposit: 0, wagering: 1, expiry_days: 7, max_uses: 0, segment: 'all', is_active: true, auto_apply: false })
}

async function saveRule() {
  if (!form.name || !form.value) { showToast('Fill name & value', 'error'); return }
  saving.value = true; saveMsg.value = ''
  try {
    const payload = { name: form.name, type: form.type, value: form.value, max_amount: form.max_amount, min_deposit: form.min_deposit, wagering: form.wagering, expiry_days: form.expiry_days, max_uses: form.max_uses, segment: form.segment, is_active: form.is_active, auto_apply: form.auto_apply }
    if (editMode.value && form.id) {
      await supabase.from('bonus_rules').update(payload).eq('id', form.id)
      saveMsg.value = 'Rule updated!'
    } else {
      await supabase.from('bonus_rules').insert(payload)
      saveMsg.value = 'Rule added!'
    }
    saveOk.value = true
    showToast(saveMsg.value, 'success')
    writeAudit(editMode.value ? 'UPDATE_BONUS_RULE' : 'ADD_BONUS_RULE', form.name, '')
    cancelEdit()
    await loadRules()
  } catch (e) { saveOk.value = false; saveMsg.value = e.message; showToast(e.message, 'error') }
  finally { saving.value = false; setTimeout(() => { saveMsg.value = '' }, 3000) }
}

async function toggleRule(rule) {
  const newVal = !rule.is_active
  await supabase.from('bonus_rules').update({ is_active: newVal }).eq('id', rule.id)
  rule.is_active = newVal
  showToast(`Rule ${newVal ? 'enabled' : 'disabled'}`, 'success')
}

async function deleteRule(id) {
  if (!confirm('Delete this bonus rule?')) return
  await supabase.from('bonus_rules').delete().eq('id', id)
  bonusRules.value = bonusRules.value.filter(r => r.id !== id)
  showToast('Rule deleted', 'success')
  writeAudit('DELETE_BONUS_RULE', id, '')
}

async function grantManualBonus() {
  if (!manual.username || !manual.amount) { showToast('Enter username & amount', 'error'); return }
  manual.busy = true; manual.msg = ''
  try {
    const user = users.value.find(u => u.username === manual.username)
    if (!user) throw new Error('User not found')
    const { error } = await supabase.rpc('admin_adjust_balance', { p_key: adminKey.value, p_user_id: user.id, p_amount: manual.amount })
    if (error) throw error
    await supabase.from('bonus_claims').insert({ user_id: user.id, rule_id: null, amount: manual.amount, reason: manual.reason, status: 'granted' }).catch(() => {})
    manual.ok = true; manual.msg = `Bonus of ${fmtNum(manual.amount)} Ks granted to ${manual.username}`
    showToast('Bonus granted ✓', 'success')
    writeAudit('MANUAL_BONUS', manual.username, `${manual.amount} Ks - ${manual.reason}`)
    manual.username = ''; manual.amount = 0; manual.reason = ''
  } catch (e) { manual.ok = false; manual.msg = e.message; showToast(e.message, 'error') }
  finally { manual.busy = false; setTimeout(() => { manual.msg = '' }, 4000) }
}

onMounted(loadRules)
</script>

<style scoped>
.bonus-stats-row { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px; }
.bonus-stat-card { background:#fff;border-radius:10px;padding:12px;text-align:center; }
.bonus-stat-val { font-size:20px;font-weight:900;line-height:1;margin-bottom:4px; }
.bonus-stat-lbl { font-size:9px;color:#94a3b8;font-weight:600; }
.bonus-form-grid { display:grid;grid-template-columns:1fr 1fr;gap:8px; }
.bonus-form-full { grid-column:1/-1; }
.bonus-rule-row { display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9; }
.bonus-rule-icon { width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0; }
.bonus-rule-info { flex:1;min-width:0; }
.bonus-rule-name { font-size:12px;font-weight:700;color:#0f172a;margin-bottom:4px; }
.bonus-rule-meta { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px;align-items:center; }
.bonus-type-chip { font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px; }
.seg-chip { font-size:9px;background:#ede9fe;color:#4f46e5;padding:2px 6px;border-radius:4px;font-weight:700; }
.bonus-rule-stats { font-size:9px;color:#94a3b8;display:flex;gap:10px; }
.bonus-rule-actions { display:flex;flex-direction:column;gap:4px;align-items:flex-end;flex-shrink:0; }
.bonus-manual-grid { display:grid;grid-template-columns:1fr 1fr;gap:8px; }
</style>
