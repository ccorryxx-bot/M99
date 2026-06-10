<template>
  <div class="a-tab-content">

    <!-- Filter Bar -->
    <div class="a-filter-bar" style="flex-wrap:wrap;gap:6px;">
      <select v-model="txFilter.status" class="a-select">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="rejected">Rejected</option>
      </select>
      <select v-model="txFilter.type" class="a-select">
        <option value="">All Types</option>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
      <input v-model="txSearch" class="a-input a-srch" placeholder="Search user/phone..." style="flex:1;min-width:100px;" />
      <button @click="fetchTx" class="a-btn-primary a-btn-sm-p">Search</button>
    </div>

    <!-- Bulk Action Bar -->
    <Transition name="bulk-slide">
      <div v-if="selectedIds.size > 0" class="bulk-bar">
        <span class="bulk-count">{{ selectedIds.size }} selected</span>
        <button @click="bulkAction('approve')" :disabled="bulkLoading" class="a-btn-sm a-btn-success">
          <span v-if="bulkLoading === 'approve'" class="a-spinner-sm"></span>
          ✓ Approve All
        </button>
        <button @click="bulkAction('reject')" :disabled="!!bulkLoading" class="a-btn-sm a-btn-danger">
          <span v-if="bulkLoading === 'reject'" class="a-spinner-sm"></span>
          ✗ Reject All
        </button>
        <button @click="clearSelection" class="a-btn-sm a-btn-ghost">✕</button>
      </div>
    </Transition>

    <!-- Select All + Live indicator -->
    <div v-if="!txLoading && pendingList.length > 0" class="sel-all-row">
      <label class="sel-all-label">
        <input type="checkbox" :checked="allPendingSelected" @change="toggleSelectAll" class="sel-cb" />
        Select all pending ({{ pendingList.length }})
      </label>
      <span class="rt-indicator" :class="rtLive ? 'rt-live' : 'rt-poll'">
        <span class="rt-dot"></span>
        {{ rtLive ? 'Live' : 'Polling' }}
      </span>
    </div>

    <!-- Loading / Error -->
    <div v-if="txLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else-if="txErr" class="a-err">{{ txErr }}</div>

    <!-- TX List -->
    <div v-else>
      <div
        v-for="tx in filteredList"
        :key="tx.id"
        class="a-tx-row"
        :class="[selectedIds.has(tx.id) ? 'tx-sel' : '', isFlagged(tx) ? 'tx-flagged' : '']"
      >
        <!-- Checkbox -->
        <div class="tx-cb-col">
          <input v-if="tx.status==='pending'" type="checkbox" :checked="selectedIds.has(tx.id)" @change="toggleOne(tx.id)" class="sel-cb" />
          <div v-else class="tx-cb-ph"></div>
        </div>

        <!-- Info -->
        <div style="flex:1;min-width:0;">
          <div class="a-tx-top">
            <span class="a-io-badge" :class="tx.type==='deposit'?'badge-in':'badge-out'">{{ tx.type==='deposit'?'IN':'OUT' }}</span>
            <span class="a-tx-amt">{{ Number(tx.amount).toLocaleString() }} Ks</span>
            <span class="a-sbadge" :class="`sb-${tx.status}`">{{ tx.status }}</span>
            <span v-if="isFlagged(tx)" class="risk-chip">⚠ Risk</span>
          </div>
          <div class="a-tx-meta">
            <span class="tx-user">{{ tx.username || tx.user_id?.slice(0,8) }}</span>
            <span class="tx-method">{{ tx.method }}</span>
            <span>{{ tx.slip_last5 || tx.phone || '—' }}</span>
            <span>{{ fmtDate(tx.created_at) }}</span>
          </div>
          <div v-if="tx.reject_reason" class="tx-reject-note">❌ {{ tx.reject_reason }}</div>
        </div>

        <!-- Actions -->
        <div class="a-tx-actions">
          <template v-if="tx.status==='pending'">
            <button @click="quickApprove(tx.id)" :disabled="!!actionBusy[tx.id]" class="a-btn-sm a-btn-success">
              <span v-if="actionBusy[tx.id]==='approve'" class="a-spinner-sm"></span>
              <template v-else>✓</template>
            </button>
            <button @click="openRejectModal(tx)" class="a-btn-sm a-btn-danger">✗</button>
          </template>
          <button @click="openDetail(tx)" class="a-btn-sm a-btn-ghost">
            <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
          </button>
        </div>
      </div>

      <div v-if="!filteredList.length" class="a-empty">No transactions found</div>
    </div>

    <!-- Reject Modal -->
    <Teleport to="body">
      <div v-if="rejectModal.open" class="tx-overlay" @click.self="rejectModal.open=false">
        <div class="tx-card">
          <h3 class="tx-card-title">Reject Transaction</h3>
          <p class="tx-card-sub">{{ rejectModal.tx?.username }} · {{ Number(rejectModal.tx?.amount).toLocaleString() }} Ks</p>
          <label class="a-mini-label">Reason</label>
          <select v-model="rejectModal.reason" class="a-select" style="width:100%;margin-bottom:8px;">
            <option value="">Select reason...</option>
            <option>Wrong slip number</option>
            <option>Amount mismatch</option>
            <option>Duplicate request</option>
            <option>Suspicious activity</option>
            <option>Account not verified</option>
          </select>
          <textarea v-model="rejectModal.note" class="a-input a-textarea" rows="2" placeholder="Note..." style="margin-bottom:10px;"></textarea>
          <div style="display:flex;gap:8px;">
            <button @click="rejectModal.open=false" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button @click="confirmReject" :disabled="rejectModal.busy" class="a-btn-sm a-btn-danger" style="flex:2;">
              <span v-if="rejectModal.busy" class="a-spinner-sm"></span>
              Confirm Reject
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Detail Modal -->
    <Teleport to="body">
      <div v-if="detail.open" class="tx-overlay" @click.self="detail.open=false">
        <div class="tx-card tx-card--wide">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h3 class="tx-card-title" style="margin:0;">Transaction Detail</h3>
            <button @click="detail.open=false" class="a-btn-sm a-btn-ghost">✕</button>
          </div>
          <div class="detail-grid">
            <div class="detail-row"><span class="dl">ID</span><span class="dv mono">{{ detail.tx?.id?.slice(0,20) }}...</span></div>
            <div class="detail-row"><span class="dl">Type</span><span class="dv">{{ detail.tx?.type }}</span></div>
            <div class="detail-row"><span class="dl">Amount</span><span class="dv" style="color:#0891b2;font-size:15px;font-weight:900;">{{ Number(detail.tx?.amount).toLocaleString() }} Ks</span></div>
            <div class="detail-row"><span class="dl">Status</span><span class="a-sbadge" :class="`sb-${detail.tx?.status}`">{{ detail.tx?.status }}</span></div>
            <div class="detail-row"><span class="dl">Method</span><span class="dv">{{ detail.tx?.method }}</span></div>
            <div class="detail-row"><span class="dl">User</span><span class="dv">{{ detail.tx?.username || detail.tx?.user_id?.slice(0,14) }}</span></div>
            <div class="detail-row"><span class="dl">Slip #</span><span class="dv mono">{{ detail.tx?.slip_last5 || '—' }}</span></div>
            <div class="detail-row"><span class="dl">Phone</span><span class="dv">{{ detail.tx?.phone || '—' }}</span></div>
            <div class="detail-row"><span class="dl">Bonus</span><span class="dv">{{ detail.tx?.bonus_option || 'none' }}</span></div>
            <div class="detail-row"><span class="dl">Date</span><span class="dv">{{ fmtDate(detail.tx?.created_at) }}</span></div>
            <div v-if="detail.tx?.reject_reason" class="detail-row"><span class="dl">Reject</span><span class="dv" style="color:#dc2626;">{{ detail.tx.reject_reason }}</span></div>
          </div>
          <!-- Slip Image Viewer -->
          <div v-if="detail.tx?.slip_url || detail.tx?.screenshot_url" class="slip-img-section">
            <div class="slip-img-label">📎 Slip Image</div>
            <div class="slip-img-grid">
              <div v-if="detail.tx?.slip_url" class="slip-img-wrap" @click="slipLightbox.url=getSlipSignedUrl(detail.tx.slip_url);slipLightbox.open=true">
                <img :src="detail.tx.slip_url" alt="Slip" class="slip-doc-img" @error="e=>e.target.style.display='none'" />
                <span class="slip-img-tag">Slip</span>
              </div>
              <div v-if="detail.tx?.screenshot_url" class="slip-img-wrap" @click="slipLightbox.url=detail.tx.screenshot_url;slipLightbox.open=true">
                <img :src="detail.tx.screenshot_url" alt="Screenshot" class="slip-doc-img" @error="e=>e.target.style.display='none'" />
                <span class="slip-img-tag">Screenshot</span>
              </div>
            </div>
          </div>
          <div v-if="detail.tx?.status==='pending'" style="display:flex;gap:8px;margin-top:12px;">
            <button @click="quickApprove(detail.tx.id);detail.open=false" class="a-btn-sm a-btn-success" style="flex:1;">✓ Approve</button>
            <button @click="openRejectModal(detail.tx);detail.open=false" class="a-btn-sm a-btn-danger" style="flex:1;">✗ Reject</button>
          </div>
        </div>
      </div>
    </Teleport>


  <!-- Slip Lightbox -->
  <Teleport to="body">
    <Transition name="bulk-slide">
      <div v-if="slipLightbox.open" class="slip-lightbox" @click="slipLightbox.open=false">
        <img :src="slipLightbox.url" class="slip-lightbox-img" @click.stop />
        <button @click="slipLightbox.open=false" class="slip-lightbox-close">✕</button>
      </div>
    </Transition>
  </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { txFilter, txList, txLoading, txErr, fmtDate, fetchTx, doApprove, writeAudit, showToast } = useAdmin()

const txSearch   = ref('')
const bulkLoading = ref('')
const rtLive     = ref(false)
const actionBusy = reactive({})
const selectedIds = ref(new Set())
let rtSub = null

const pendingList = computed(() => txList.value.filter(t => t.status === 'pending'))

const filteredList = computed(() => {
  const q = txSearch.value.toLowerCase()
  return txList.value.filter(t =>
    !q || (t.username||'').toLowerCase().includes(q) ||
    (t.phone||'').includes(q) || (t.user_id||'').includes(q)
  )
})

const allPendingSelected = computed(() =>
  pendingList.value.length > 0 && pendingList.value.every(t => selectedIds.value.has(t.id))
)

function isFlagged(tx) { return Number(tx.amount) >= 500000 }

function toggleSelectAll() {
  const s = new Set(selectedIds.value)
  if (allPendingSelected.value) { pendingList.value.forEach(t => s.delete(t.id)) }
  else { pendingList.value.forEach(t => s.add(t.id)) }
  selectedIds.value = s
}
function toggleOne(id) {
  const s = new Set(selectedIds.value)
  s.has(id) ? s.delete(id) : s.add(id)
  selectedIds.value = s
}
function clearSelection() { selectedIds.value = new Set() }

async function quickApprove(id) {
  actionBusy[id] = 'approve'
  try { await doApprove(id, 'approve') }
  finally { delete actionBusy[id] }
}

async function bulkAction(action) {
  bulkLoading.value = action
  try {
    const ids = [...selectedIds.value]
    await Promise.all(ids.map(id => doApprove(id, action)))
    await writeAudit(`BULK_${action.toUpperCase()}`, ids.join(','), `${ids.length} TX`)
    clearSelection()
    showToast(`Bulk ${action} done (${ids.length})`, 'success')
  } finally { bulkLoading.value = '' }
}

const rejectModal = reactive({ open: false, tx: null, reason: '', note: '', busy: false })
function openRejectModal(tx) { Object.assign(rejectModal, { open: true, tx, reason: '', note: '', busy: false }) }
async function confirmReject() {
  rejectModal.busy = true
  try {
    await doApprove(rejectModal.tx.id, 'reject')
    await writeAudit('REJECT_TX', rejectModal.tx.id, rejectModal.reason)
    rejectModal.open = false
  } finally { rejectModal.busy = false }
}

const detail = reactive({ open: false, tx: null })
const slipLightbox = reactive({ open: false, url: '' })

async function getSlipSignedUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  try {
    const { data } = await supabase.storage.from('slip-uploads').createSignedUrl(path, 3600)
    return data?.signedUrl || path
  } catch { return path }
}
function openDetail(tx) { Object.assign(detail, { open: true, tx }) }

function setupRealtime() {
  rtSub = supabase.channel('admin-tx')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => { fetchTx() })
    .subscribe(s => { rtLive.value = s === 'SUBSCRIBED' })
}

onMounted(() => { fetchTx(); setupRealtime() })
onUnmounted(() => { if (rtSub) supabase.removeChannel(rtSub) })
</script>

<style scoped>
.bulk-bar { display:flex;align-items:center;gap:8px;background:rgba(79,70,229,.08);border:1px solid rgba(79,70,229,.2);border-radius:8px;padding:8px 12px;margin-bottom:8px; }
.bulk-count { font-size:11px;font-weight:700;color:#4f46e5;flex:1; }
.bulk-slide-enter-active,.bulk-slide-leave-active { transition:all .2s; }
.bulk-slide-enter-from,.bulk-slide-leave-to { opacity:0;transform:translateY(-6px); }
.sel-all-row { display:flex;align-items:center;justify-content:space-between;padding:6px 2px;margin-bottom:6px; }
.sel-all-label { display:flex;align-items:center;gap:6px;font-size:11px;color:#64748b;cursor:pointer; }
.sel-cb { width:14px;height:14px;accent-color:#4f46e5;cursor:pointer; }
.rt-indicator { display:flex;align-items:center;gap:4px;font-size:10px;font-weight:600; }
.rt-live { color:#16a34a; } .rt-poll { color:#94a3b8; }
.rt-dot { width:7px;height:7px;border-radius:50%;background:currentColor;animation:rtb 1.5s ease-in-out infinite; }
@keyframes rtb { 0%,100%{opacity:1}50%{opacity:.4} }
.tx-cb-col { display:flex;align-items:center;padding-right:8px;flex-shrink:0; }
.tx-cb-ph { width:14px; }
.a-tx-row { display:flex;align-items:flex-start;gap:4px;padding:8px 6px;border-radius:8px;border-bottom:1px solid #f1f5f9; }
.tx-sel { background:rgba(79,70,229,.05); }
.tx-flagged { border-left:3px solid #dc2626; }
.tx-user { font-weight:700;color:#0f172a; }
.tx-method { background:#e0f2fe;color:#0891b2;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:700; }
.risk-chip { background:#fee2e2;color:#dc2626;padding:1px 5px;border-radius:4px;font-size:9px;font-weight:700; }
.tx-reject-note { font-size:9.5px;color:#dc2626;margin-top:2px; }
.tx-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px; }
.tx-card { background:#fff;border-radius:12px;padding:18px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.3); }
.tx-card--wide { max-width:400px; }
.tx-card-title { font-size:14px;font-weight:800;color:#0f172a;margin:0 0 6px; }
.tx-card-sub { font-size:11px;color:#64748b;margin:0 0 12px; }
.detail-grid { display:flex;flex-direction:column;gap:0; }
.detail-row { display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9; }
.dl { font-size:10px;color:#94a3b8;font-weight:600; }
.dv { font-size:11px;color:#0f172a;font-weight:600; }
.mono { font-family:monospace; }
.slip-img-section { margin-top:10px;padding-top:10px;border-top:1px solid #f1f5f9; }
.slip-img-label { font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:6px; }
.slip-img-grid { display:flex;gap:8px; }
.slip-img-wrap { position:relative;cursor:pointer;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;flex:1;aspect-ratio:4/3;max-width:120px; }
.slip-doc-img { width:100%;height:100%;object-fit:cover; }
.slip-img-tag { position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);color:#fff;font-size:9px;font-weight:700;text-align:center;padding:2px; }
.slip-lightbox { position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center; }
.slip-lightbox-img { max-width:90vw;max-height:88vh;object-fit:contain;border-radius:8px; }
.slip-lightbox-close { position:absolute;top:16px;right:16px;background:rgba(255,255,255,.15);border:none;border-radius:50%;width:36px;height:36px;color:#fff;font-size:16px;cursor:pointer; }

</style>
