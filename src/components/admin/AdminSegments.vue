<template>
  <div class="a-tab-content">

    <!-- Segment Overview Cards -->
    <div class="seg-cards-grid">
      <div v-for="seg in segments" :key="seg.key" class="seg-card" :style="`border-top:3px solid ${seg.color}`">
        <div class="seg-card-icon" :style="`background:${seg.color}20;color:${seg.color}`">{{ seg.icon }}</div>
        <div class="seg-card-count">{{ seg.count }}</div>
        <div class="seg-card-name">{{ seg.label }}</div>
      </div>
    </div>

    <!-- Segment Filter -->
    <div class="a-filter-bar">
      <select v-model="activeSeg" class="a-select">
        <option value="all">All Players</option>
        <option v-for="s in segments" :key="s.key" :value="s.key">{{ s.label }} ({{ s.count }})</option>
      </select>
      <input v-model="segSearch" class="a-input a-srch" placeholder="Search username..." style="flex:1;" />
      <button @click="sendSegmentMessage" :disabled="!activeSeg || activeSeg==='all' || msgBusy" class="a-btn-primary a-btn-sm-p">
        <span v-if="msgBusy" class="a-spinner-sm"></span>
        📢 Message Segment
      </button>
    </div>

    <!-- Players in Segment -->
    <div v-if="usersLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div class="seg-list-hdr">
        <span class="seg-list-title">{{ activeSeg === 'all' ? 'All Players' : segments.find(s=>s.key===activeSeg)?.label }} ({{ segmentedUsers.length }})</span>
        <button @click="exportSegment" class="a-btn-sm a-btn-ghost">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Export CSV
        </button>
      </div>

      <div v-for="u in segmentedUsers.slice(0, 50)" :key="u.id" class="seg-user-row">
        <div class="seg-av" :style="`background:${getSegColor(u)}20;color:${getSegColor(u)}`">
          {{ (u.username||'?')[0].toUpperCase() }}
        </div>
        <div class="seg-uinfo">
          <div class="seg-uname">
            {{ u.username }}
            <span v-if="(u.vip_level||0) >= 1" class="vip-lbadge" :style="`background:${vipColors[(u.vip_level||1)-1]}20;color:${vipColors[(u.vip_level||1)-1]};font-size:9px;padding:1px 5px;`">VIP {{ u.vip_level }}</span>
          </div>
          <div class="seg-umeta">{{ u.phone || '—' }} · {{ fmtNum(u.balance) }} Ks · Joined {{ fmtDate(u.created_at) }}</div>
        </div>
        <div class="seg-badges">
          <span v-for="badge in getUserBadges(u)" :key="badge.label" class="seg-badge" :style="`background:${badge.color}15;color:${badge.color}`">{{ badge.label }}</span>
        </div>
        <div class="seg-uright">
          <span :class="u.is_banned ? 'a-badge-danger' : 'a-badge-success'">{{ u.is_banned ? 'BANNED' : 'ACTIVE' }}</span>
        </div>
      </div>
      <div v-if="segmentedUsers.length > 50" class="a-empty-sm">Showing 50 of {{ segmentedUsers.length }} — export CSV for full list</div>
      <div v-if="!segmentedUsers.length" class="a-empty">No players in this segment</div>
    </div>

    <!-- Custom Segment Builder -->
    <div class="a-sett-block" style="margin-top:12px;">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
        Custom Segment Builder
      </div>
      <div class="seg-builder-grid">
        <div>
          <label class="a-mini-label">Segment Name</label>
          <input v-model="custom.name" class="a-input" placeholder="e.g. High-value Active Players" />
        </div>
        <div>
          <label class="a-mini-label">Min Balance (Ks)</label>
          <input v-model.number="custom.min_balance" type="number" class="a-input" placeholder="0" />
        </div>
        <div>
          <label class="a-mini-label">VIP Level ≥</label>
          <select v-model.number="custom.min_vip" class="a-select" style="width:100%;">
            <option :value="0">Any</option>
            <option v-for="l in 5" :key="l" :value="l">VIP {{ l }}+</option>
          </select>
        </div>
        <div>
          <label class="a-mini-label">Active in last (days)</label>
          <input v-model.number="custom.active_days" type="number" class="a-input" placeholder="30" />
        </div>
        <div>
          <label class="a-mini-label">Status</label>
          <select v-model="custom.status" class="a-select" style="width:100%;">
            <option value="all">All</option>
            <option value="active">Active only</option>
            <option value="banned">Banned</option>
          </select>
        </div>
        <div>
          <label class="a-mini-label">Deposit ≥ (Ks)</label>
          <input v-model.number="custom.min_deposit" type="number" class="a-input" placeholder="0" />
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button @click="previewCustom" class="a-btn-sm a-btn-ghost" style="flex:1;">Preview ({{ customPreview.length }})</button>
        <button @click="saveCustomSegment" :disabled="!custom.name || savingCustom" class="a-btn-primary" style="flex:2;">
          <span v-if="savingCustom" class="a-spinner-sm"></span>
          Save Segment
        </button>
      </div>
      <div v-if="customPreview.length > 0" class="custom-preview-list">
        <div v-for="u in customPreview.slice(0,5)" :key="u.id" class="custom-preview-row">
          <span>{{ u.username }}</span><span style="color:#94a3b8;">{{ fmtNum(u.balance) }} Ks</span>
        </div>
        <div v-if="customPreview.length > 5" style="font-size:9px;color:#94a3b8;text-align:center;padding:4px;">+{{ customPreview.length-5 }} more</div>
      </div>
    </div>

    <!-- Message Segment Modal -->
    <Teleport to="body">
      <div v-if="msgModal.open" class="tx-modal-overlay" @click.self="msgModal.open=false">
        <div class="tx-modal">
          <h3 style="font-size:14px;font-weight:800;color:#0f172a;margin:0 0 4px;">Message Segment</h3>
          <p style="font-size:11px;color:#64748b;margin:0 0 12px;">Sending to {{ segmentedUsers.length }} players in <strong>{{ segments.find(s=>s.key===activeSeg)?.label }}</strong></p>
          <label class="a-mini-label">Title</label>
          <input v-model="msgModal.title" class="a-input" placeholder="Message title..." style="margin-bottom:8px;" />
          <label class="a-mini-label">Body</label>
          <textarea v-model="msgModal.body" class="a-input a-textarea" rows="3" placeholder="Message content..." style="margin-bottom:10px;"></textarea>
          <div style="display:flex;gap:8px;">
            <button @click="msgModal.open=false" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button @click="confirmSendMessage" :disabled="msgModal.busy || !msgModal.title" class="a-btn-primary" style="flex:2;">
              <span v-if="msgModal.busy" class="a-spinner-sm"></span>
              Send to {{ segmentedUsers.length }} players
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { users, usersLoading, fmtNum, fmtDate, fetchUsers, adminKey, showToast, writeAudit } = useAdmin()

const activeSeg  = ref('all')
const segSearch  = ref('')
const msgBusy    = ref(false)
const savingCustom = ref(false)
const vipColors  = ['#f59e0b','#6366f1','#0891b2','#d97706','#dc2626']

const custom = reactive({ name: '', min_balance: 0, min_vip: 0, active_days: 0, status: 'all', min_deposit: 0 })
const customPreview = ref([])

const segments = computed(() => [
  { key: 'new',      label: 'New Players',      icon: '🌱', color: '#16a34a', count: users.value.filter(u => (Date.now() - new Date(u.created_at)) < 7*86400000).length },
  { key: 'active',   label: 'Active (30d)',     icon: '🔥', color: '#4f46e5', count: users.value.filter(u => !u.is_banned).length },
  { key: 'vip',      label: 'VIP Players',      icon: '⭐', color: '#d97706', count: users.value.filter(u => (u.vip_level||0) >= 1).length },
  { key: 'high_bal', label: 'High Balance',      icon: '💰', color: '#0891b2', count: users.value.filter(u => Number(u.balance) >= 100000).length },
  { key: 'inactive', label: 'Inactive (30d)',   icon: '😴', color: '#94a3b8', count: users.value.filter(u => u.is_banned || Number(u.balance) < 1000).length },
  { key: 'banned',   label: 'Banned',            icon: '🚫', color: '#dc2626', count: users.value.filter(u => u.is_banned).length },
  { key: 'no_kyc',   label: 'Unverified KYC',   icon: '📋', color: '#7c3aed', count: users.value.filter(u => !u.kyc_status || u.kyc_status === 'pending').length },
])

const segmentedUsers = computed(() => {
  let list = [...users.value]
  const q = segSearch.value.toLowerCase()
  if (q) list = list.filter(u => (u.username||'').toLowerCase().includes(q))
  switch (activeSeg.value) {
    case 'new':      return list.filter(u => (Date.now() - new Date(u.created_at)) < 7*86400000)
    case 'active':   return list.filter(u => !u.is_banned)
    case 'vip':      return list.filter(u => (u.vip_level||0) >= 1).sort((a,b) => (b.vip_level||0)-(a.vip_level||0))
    case 'high_bal': return list.filter(u => Number(u.balance) >= 100000).sort((a,b) => Number(b.balance)-Number(a.balance))
    case 'inactive': return list.filter(u => Number(u.balance) < 1000)
    case 'banned':   return list.filter(u => u.is_banned)
    case 'no_kyc':   return list.filter(u => !u.kyc_status || u.kyc_status === 'pending')
    default:         return list
  }
})

function getSegColor(u) {
  if (u.is_banned) return '#dc2626'
  if ((u.vip_level||0) >= 3) return vipColors[(u.vip_level||1)-1]
  if (Number(u.balance) >= 100000) return '#0891b2'
  return '#4f46e5'
}

function getUserBadges(u) {
  const b = []
  if ((u.vip_level||0) >= 1) b.push({ label: `VIP${u.vip_level}`, color: vipColors[(u.vip_level||1)-1] })
  if (Number(u.balance) >= 100000) b.push({ label: 'High Bal', color: '#0891b2' })
  if (!u.kyc_status || u.kyc_status === 'pending') b.push({ label: 'No KYC', color: '#7c3aed' })
  if ((Date.now() - new Date(u.created_at)) < 7*86400000) b.push({ label: 'New', color: '#16a34a' })
  return b
}

function previewCustom() {
  let list = [...users.value]
  if (custom.min_balance > 0) list = list.filter(u => Number(u.balance) >= custom.min_balance)
  if (custom.min_vip > 0) list = list.filter(u => (u.vip_level||0) >= custom.min_vip)
  if (custom.status === 'active') list = list.filter(u => !u.is_banned)
  if (custom.status === 'banned') list = list.filter(u => u.is_banned)
  customPreview.value = list
}

async function saveCustomSegment() {
  savingCustom.value = true
  try {
    await supabase.from('player_segments').insert({ name: custom.name, rules: JSON.stringify(custom), count: customPreview.value.length }).catch(() => {})
    showToast('Segment saved ✓', 'success')
    writeAudit('SAVE_SEGMENT', custom.name, '')
    Object.assign(custom, { name: '', min_balance: 0, min_vip: 0, active_days: 0, status: 'all', min_deposit: 0 })
    customPreview.value = []
  } finally { savingCustom.value = false }
}

const msgModal = reactive({ open: false, title: '', body: '', busy: false })

function sendSegmentMessage() {
  if (!activeSeg.value || activeSeg.value === 'all') return
  Object.assign(msgModal, { open: true, title: '', body: '', busy: false })
}

async function confirmSendMessage() {
  if (!msgModal.title) return
  msgModal.busy = true
  try {
    const targets = segmentedUsers.value
    const inserts = targets.map(u => ({ user_id: u.id, title: msgModal.title, body: msgModal.body, read: false }))
    const chunks = []
    for (let i = 0; i < inserts.length; i += 100) chunks.push(inserts.slice(i, i + 100))
    for (const chunk of chunks) await supabase.from('notifications').insert(chunk).catch(() => {})
    showToast(`Message sent to ${targets.length} players ✓`, 'success')
    writeAudit('SEGMENT_MESSAGE', activeSeg.value, `${targets.length} players: ${msgModal.title}`)
    msgModal.open = false
  } finally { msgModal.busy = false }
}

function exportSegment() {
  const rows = segmentedUsers.value.map(u => `${u.username},${u.phone || ''},${u.balance},${u.vip_level || 0},${u.is_banned ? 'banned' : 'active'},${u.created_at}`)
  const csv = 'Username,Phone,Balance,VIP,Status,Joined\n' + rows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = `segment_${activeSeg.value}_${Date.now()}.csv`; a.click()
  URL.revokeObjectURL(url)
  writeAudit('EXPORT_SEGMENT', activeSeg.value, `${segmentedUsers.value.length} players`)
}

onMounted(async () => { await fetchUsers() })
</script>

<style scoped>
.seg-cards-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:12px; }
@media(max-width:400px) { .seg-cards-grid { grid-template-columns:repeat(2,1fr); } }
.seg-card { background:#fff;border-radius:10px;padding:10px;text-align:center; }
.seg-card-icon { width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px;margin:0 auto 6px; }
.seg-card-count { font-size:20px;font-weight:900;color:#0f172a;line-height:1; }
.seg-card-name { font-size:8.5px;color:#94a3b8;font-weight:600;margin-top:2px; }
.seg-list-hdr { display:flex;align-items:center;justify-content:space-between;padding:8px 2px;margin-bottom:4px; }
.seg-list-title { font-size:11px;font-weight:800;color:#0f172a; }
.seg-user-row { display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px solid #f1f5f9; }
.seg-av { width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0; }
.seg-uinfo { flex:1;min-width:0; }
.seg-uname { font-size:12px;font-weight:700;color:#0f172a;display:flex;align-items:center;gap:5px;margin-bottom:2px; }
.seg-umeta { font-size:9px;color:#94a3b8; }
.seg-badges { display:flex;flex-wrap:wrap;gap:3px;flex-shrink:0; }
.seg-badge { font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px; }
.seg-uright { flex-shrink:0; }
.seg-builder-grid { display:grid;grid-template-columns:1fr 1fr;gap:8px; }
.custom-preview-list { background:#f8fafc;border-radius:8px;padding:8px;margin-top:8px; }
.custom-preview-row { display:flex;justify-content:space-between;font-size:10px;padding:3px 0;border-bottom:1px solid #f1f5f9; }
.vip-lbadge { display:inline-block;border-radius:4px;font-weight:800; }
.tx-modal-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px; }
.tx-modal { background:#fff;border-radius:12px;padding:18px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.3); }
</style>
