<template>
  <div class="a-tab-content">

    <!-- KYC Stats -->
    <div class="kyc-stats-grid">
      <div class="kyc-stat" style="border-left:3px solid #d97706;">
        <div class="kyc-stat-val" style="color:#d97706;">{{ pendingKYC.length }}</div>
        <div class="kyc-stat-lbl">Pending Review</div>
      </div>
      <div class="kyc-stat" style="border-left:3px solid #16a34a;">
        <div class="kyc-stat-val" style="color:#16a34a;">{{ approvedKYC }}</div>
        <div class="kyc-stat-lbl">Verified</div>
      </div>
      <div class="kyc-stat" style="border-left:3px solid #dc2626;">
        <div class="kyc-stat-val" style="color:#dc2626;">{{ rejectedKYC }}</div>
        <div class="kyc-stat-lbl">Rejected</div>
      </div>
    </div>

    <!-- Filter + Refresh -->
    <div class="a-filter-bar" style="flex-wrap:wrap;gap:6px;">
      <select v-model="kycStatus" class="a-select">
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="">All</option>
      </select>
      <input v-model="kycSearch" class="a-input a-srch" placeholder="Search username..." style="flex:1;" />
      <button @click="loadKYC" :disabled="loading" class="a-btn-primary a-btn-sm-p">Refresh</button>
    </div>

    <div v-if="loading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div v-for="kyc in filteredKYC" :key="kyc.id" class="kyc-row">
        <div class="kyc-av">{{ (kyc.username||'?')[0].toUpperCase() }}</div>
        <div class="kyc-info">
          <div class="kyc-name">{{ kyc.username }}</div>
          <div class="kyc-meta">
            <span>{{ kyc.phone || '—' }}</span>
            <span class="kyc-type-chip">{{ kyc.doc_type || 'NRC' }}</span>
            <span>{{ fmtDate(kyc.submitted_at || kyc.created_at) }}</span>
          </div>
          <div class="kyc-doc-id" v-if="kyc.doc_number">Doc: {{ kyc.doc_number }}</div>
        </div>
        <div class="kyc-right">
          <span class="kyc-status-badge" :class="`kyc-${kyc.kyc_status || 'pending'}`">
            {{ kyc.kyc_status || 'pending' }}
          </span>
          <div class="kyc-actions">
            <template v-if="(kyc.kyc_status || 'pending') === 'pending'">
              <button @click="approveKYC(kyc)" :disabled="kyc._busy" class="a-btn-sm a-btn-success">
                <span v-if="kyc._busy === 'approve'" class="a-spinner-sm"></span>
                ✓ Verify
              </button>
              <button @click="openReject(kyc)" class="a-btn-sm a-btn-danger">✗ Reject</button>
            </template>
            <button @click="viewKYC(kyc)" class="a-btn-sm a-btn-ghost">View</button>
          </div>
        </div>
      </div>
      <div v-if="!filteredKYC.length" class="a-empty">No KYC submissions found</div>
    </div>

    <!-- KYC Config -->
    <div class="a-sett-block" style="margin-top:12px;">
      <div class="a-sett-ttl">KYC Requirements</div>
      <div class="kyc-req-row">
        <label class="kyc-req-label">Require KYC for withdrawal above:</label>
        <div style="display:flex;gap:6px;align-items:center;">
          <input v-model.number="kycThreshold" type="number" class="a-input a-input-sm" style="width:100px;" placeholder="500000" />
          <span class="a-mini-label" style="margin:0;">Ks</span>
        </div>
      </div>
      <div class="kyc-req-row">
        <label class="kyc-req-label">Allowed documents:</label>
        <div class="kyc-doc-types">
          <label v-for="dt in docTypes" :key="dt" class="kyc-doc-check">
            <input type="checkbox" v-model="allowedDocs" :value="dt" class="sel-cb" />
            {{ dt }}
          </label>
        </div>
      </div>
      <div class="kyc-req-row">
        <label class="kyc-req-label">Auto-approve after manual review:</label>
        <button @click="autoApprove = !autoApprove" class="a-tog" :class="autoApprove ? 'a-tog-on' : 'a-tog-off'">
          {{ autoApprove ? 'ON' : 'OFF' }}
        </button>
      </div>
      <button @click="saveKYCSettings" :disabled="settSaving" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <span v-if="settSaving" class="a-spinner-sm"></span>
        Save KYC Settings
      </button>
    </div>

    <!-- KYC Detail Modal -->
    <Teleport to="body">
      <div v-if="detailModal.open" class="tx-modal-overlay" @click.self="detailModal.open=false">
        <div class="tx-modal" style="max-width:380px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <h3 style="margin:0;font-size:14px;font-weight:800;color:#0f172a;">KYC Detail</h3>
            <button @click="detailModal.open=false" class="a-btn-sm a-btn-ghost">✕</button>
          </div>
          <div class="detail-grid">
            <div class="detail-row"><span class="dl">Username</span><span class="dv">{{ detailModal.kyc?.username }}</span></div>
            <div class="detail-row"><span class="dl">Phone</span><span class="dv">{{ detailModal.kyc?.phone }}</span></div>
            <div class="detail-row"><span class="dl">Doc Type</span><span class="dv">{{ detailModal.kyc?.doc_type }}</span></div>
            <div class="detail-row"><span class="dl">Doc Number</span><span class="dv mono">{{ detailModal.kyc?.doc_number }}</span></div>
            <div class="detail-row"><span class="dl">Real Name</span><span class="dv">{{ detailModal.kyc?.real_name || '—' }}</span></div>
            <div class="detail-row"><span class="dl">Status</span><span class="kyc-status-badge" :class="`kyc-${detailModal.kyc?.kyc_status}`">{{ detailModal.kyc?.kyc_status }}</span></div>
            <div class="detail-row" v-if="detailModal.kyc?.reject_reason"><span class="dl">Reason</span><span class="dv" style="color:#dc2626;">{{ detailModal.kyc.reject_reason }}</span></div>
            <div class="detail-row"><span class="dl">Submitted</span><span class="dv">{{ fmtDate(detailModal.kyc?.submitted_at) }}</span></div>
          </div>
          <div v-if="detailModal.kyc?.kyc_status === 'pending'" style="display:flex;gap:8px;margin-top:12px;">
            <button @click="approveKYC(detailModal.kyc);detailModal.open=false" class="a-btn-sm a-btn-success" style="flex:1;">✓ Approve</button>
            <button @click="openReject(detailModal.kyc);detailModal.open=false" class="a-btn-sm a-btn-danger" style="flex:1;">✗ Reject</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Reject Reason Modal -->
    <Teleport to="body">
      <div v-if="rejectModal.open" class="tx-modal-overlay" @click.self="rejectModal.open=false">
        <div class="tx-modal">
          <h3 style="font-size:14px;font-weight:800;color:#0f172a;margin:0 0 10px;">Reject KYC</h3>
          <p style="font-size:11px;color:#64748b;margin:0 0 12px;">{{ rejectModal.kyc?.username }}</p>
          <label class="a-mini-label">Reason</label>
          <select v-model="rejectModal.reason" class="a-select" style="width:100%;margin-bottom:8px;">
            <option value="">Select reason...</option>
            <option>Document unclear or unreadable</option>
            <option>Document expired</option>
            <option>Name mismatch</option>
            <option>Fake/forged document</option>
            <option>Document not supported</option>
          </select>
          <textarea v-model="rejectModal.note" class="a-input a-textarea" rows="2" placeholder="Additional note..." style="margin-bottom:10px;"></textarea>
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

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { adminKey, fmtDate, showToast, writeAudit } = useAdmin()

const kycList    = ref([])
const loading    = ref(false)
const kycStatus  = ref('pending')
const kycSearch  = ref('')
const kycThreshold = ref(500000)
const allowedDocs  = ref(['NRC', 'Passport', 'Driver License'])
const autoApprove  = ref(false)
const settSaving   = ref(false)
const docTypes = ['NRC', 'Passport', 'Driver License', 'Student ID']

const pendingKYC  = computed(() => kycList.value.filter(k => (k.kyc_status || 'pending') === 'pending'))
const approvedKYC = computed(() => kycList.value.filter(k => k.kyc_status === 'approved').length)
const rejectedKYC = computed(() => kycList.value.filter(k => k.kyc_status === 'rejected').length)

const filteredKYC = computed(() => {
  const q = kycSearch.value.toLowerCase()
  return kycList.value.filter(k => {
    const statusMatch = !kycStatus.value || (k.kyc_status || 'pending') === kycStatus.value
    const searchMatch = !q || (k.username || '').toLowerCase().includes(q)
    return statusMatch && searchMatch
  })
})

async function loadKYC() {
  loading.value = true
  try {
    const { data } = await supabase.from('profiles').select('id,username,phone,vip_level,balance,kyc_status,doc_type,doc_number,real_name,submitted_at,reject_reason,created_at').order('created_at', { ascending: false })
    kycList.value = (data || []).filter(u => u.kyc_status || true)
  } catch (e) { showToast(e.message, 'error') }
  finally { loading.value = false }
}

async function approveKYC(kyc) {
  kyc._busy = 'approve'
  try {
    const { error } = await supabase.from('profiles').update({ kyc_status: 'approved' }).eq('id', kyc.id)
    if (error) throw error
    kyc.kyc_status = 'approved'
    showToast(`${kyc.username} KYC approved ✓`, 'success')
    writeAudit('APPROVE_KYC', kyc.username, '')
  } catch (e) { showToast(e.message, 'error') }
  finally { kyc._busy = '' }
}

const rejectModal = reactive({ open: false, kyc: null, reason: '', note: '', busy: false })
function openReject(kyc) { Object.assign(rejectModal, { open: true, kyc, reason: '', note: '', busy: false }) }
async function confirmReject() {
  rejectModal.busy = true
  try {
    await supabase.from('profiles').update({ kyc_status: 'rejected', reject_reason: rejectModal.reason }).eq('id', rejectModal.kyc.id)
    rejectModal.kyc.kyc_status = 'rejected'
    rejectModal.kyc.reject_reason = rejectModal.reason
    showToast('KYC rejected', 'success')
    writeAudit('REJECT_KYC', rejectModal.kyc.username, rejectModal.reason)
    rejectModal.open = false
  } catch (e) { showToast(e.message, 'error') }
  finally { rejectModal.busy = false }
}

const detailModal = reactive({ open: false, kyc: null })
function viewKYC(kyc) { Object.assign(detailModal, { open: true, kyc }) }

async function saveKYCSettings() {
  settSaving.value = true
  try {
    const { error } = await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: { kyc_threshold: kycThreshold.value, kyc_allowed_docs: allowedDocs.value.join(','), kyc_auto_approve: autoApprove.value } })
    if (error) throw error
    showToast('KYC settings saved ✓', 'success')
    writeAudit('SAVE_KYC_SETTINGS', '', '')
  } catch (e) { showToast(e.message, 'error') }
  finally { settSaving.value = false }
}

onMounted(loadKYC)
</script>

<style scoped>
.kyc-stats-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px; }
.kyc-stat { background:#fff;border-radius:10px;padding:10px 12px;text-align:center; }
.kyc-stat-val { font-size:22px;font-weight:900;line-height:1;margin-bottom:3px; }
.kyc-stat-lbl { font-size:9px;color:#94a3b8;font-weight:600; }
.kyc-row { display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid #f1f5f9; }
.kyc-av { width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#0891b2);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
.kyc-info { flex:1;min-width:0; }
.kyc-name { font-size:12px;font-weight:700;color:#0f172a;margin-bottom:3px; }
.kyc-meta { display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:10px;color:#64748b; }
.kyc-type-chip { background:#ede9fe;color:#4f46e5;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:700; }
.kyc-doc-id { font-size:9.5px;color:#94a3b8;font-family:monospace;margin-top:2px; }
.kyc-right { display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0; }
.kyc-status-badge { font-size:10px;font-weight:800;padding:3px 8px;border-radius:6px; }
.kyc-pending  { background:#fef9c3;color:#854d0e; }
.kyc-approved { background:#dcfce7;color:#15803d; }
.kyc-rejected { background:#fee2e2;color:#dc2626; }
.kyc-actions { display:flex;gap:4px; }
.kyc-req-row { display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid #f1f5f9;gap:10px; }
.kyc-req-label { font-size:11px;color:#0f172a;font-weight:600;flex:1; }
.kyc-doc-types { display:flex;flex-wrap:wrap;gap:8px; }
.kyc-doc-check { display:flex;align-items:center;gap:4px;font-size:10px;color:#0f172a;cursor:pointer; }
.sel-cb { width:14px;height:14px;accent-color:#4f46e5; }
.tx-modal-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px; }
.tx-modal { background:#fff;border-radius:12px;padding:18px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3); }
.detail-grid { display:flex;flex-direction:column; }
.detail-row { display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9; }
.dl { font-size:10px;color:#94a3b8;font-weight:600; }
.dv { font-size:11px;color:#0f172a;font-weight:600; }
.mono { font-family:monospace; }
</style>
