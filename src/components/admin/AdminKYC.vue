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
            <button @click="viewKYC(kyc)" class="a-btn-sm a-btn-ghost">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
              View
            </button>
          </div>
        </div>
      </div>
      <div v-if="!filteredKYC.length" class="a-empty">No KYC requests found</div>
    </div>

    <!-- KYC Settings -->
    <div class="a-sett-block" style="margin-top:12px;">
      <div class="a-sett-ttl">KYC Settings</div>
      <div class="kyc-req-row">
        <span class="kyc-req-label">Required for withdrawal above (Ks)</span>
        <input v-model.number="kycThreshold" type="number" class="a-input a-input-sm" style="width:100px;" placeholder="100000" />
      </div>
      <div class="kyc-req-row">
        <span class="kyc-req-label">Auto-approve verified users</span>
        <button @click="autoApprove=!autoApprove" class="a-tog" :class="autoApprove?'a-tog-on':'a-tog-off'">{{ autoApprove?'ON':'OFF' }}</button>
      </div>
      <div class="kyc-doc-types">
        <label v-for="dt in docTypes" :key="dt" class="kyc-doc-check">
          <input type="checkbox" :value="dt" v-model="allowedDocs" class="sel-cb" /> {{ dt }}
        </label>
      </div>
      <button @click="saveKYCSettings" :disabled="settSaving" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <span v-if="settSaving" class="a-spinner-sm"></span>
        {{ settSaving ? 'Saving...' : 'Save KYC Settings' }}
      </button>
    </div>

    <!-- KYC Document Viewer Modal -->
    <Transition name="bulk-slide">
      <div v-if="detailModal.open" class="tx-modal-overlay" @click.self="detailModal.open=false">
        <div class="kyc-doc-modal">
          <div class="kyc-doc-modal-hdr">
            <div>
              <h3 class="tx-card-title">KYC Documents</h3>
              <p class="tx-card-sub">{{ detailModal.kyc?.username }} · {{ detailModal.kyc?.doc_type || 'NRC' }}</p>
            </div>
            <button @click="detailModal.open=false" class="a-btn-sm a-btn-ghost">✕</button>
          </div>

          <!-- Basic Info -->
          <div class="detail-grid" style="margin-bottom:10px;">
            <div class="detail-row"><span class="dl">Name</span><span class="dv">{{ detailModal.kyc?.username }}</span></div>
            <div class="detail-row"><span class="dl">Phone</span><span class="dv">{{ detailModal.kyc?.phone || '—' }}</span></div>
            <div class="detail-row"><span class="dl">Doc Type</span><span class="dv">{{ detailModal.kyc?.doc_type || 'NRC' }}</span></div>
            <div class="detail-row"><span class="dl">Doc #</span><span class="dv mono">{{ detailModal.kyc?.doc_number || '—' }}</span></div>
            <div class="detail-row"><span class="dl">Status</span>
              <span class="kyc-status-badge" :class="`kyc-${detailModal.kyc?.kyc_status||'pending'}`">{{ detailModal.kyc?.kyc_status || 'pending' }}</span>
            </div>
          </div>

          <!-- Documents from kyc_documents table -->
          <div v-if="kycDocs.loading" class="a-mini-load"><span class="a-spinner-sm"></span> Loading documents...</div>
          <div v-else-if="kycDocs.front || kycDocs.back || kycDocs.selfie">
            <div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:6px;">Documents</div>
            <div class="kyc-img-grid">
              <div v-if="kycDocs.front" class="kyc-img-wrap" @click="lightbox.url=kycDocs.front;lightbox.open=true">
                <img :src="kycDocs.front" alt="Front" class="kyc-doc-img" />
                <span class="kyc-img-label">Front</span>
              </div>
              <div v-if="kycDocs.back" class="kyc-img-wrap" @click="lightbox.url=kycDocs.back;lightbox.open=true">
                <img :src="kycDocs.back" alt="Back" class="kyc-doc-img" />
                <span class="kyc-img-label">Back</span>
              </div>
              <div v-if="kycDocs.selfie" class="kyc-img-wrap" @click="lightbox.url=kycDocs.selfie;lightbox.open=true">
                <img :src="kycDocs.selfie" alt="Selfie" class="kyc-doc-img" />
                <span class="kyc-img-label">Selfie</span>
              </div>
            </div>
          </div>
          <div v-else class="kyc-no-docs">
            <svg width="28" height="28" fill="none" stroke="#e2e8f0" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <p>No documents uploaded yet</p>
          </div>

          <!-- Actions -->
          <div v-if="(detailModal.kyc?.kyc_status||'pending')==='pending'" style="display:flex;gap:8px;margin-top:14px;">
            <button @click="approveKYC(detailModal.kyc);detailModal.open=false" class="a-btn-sm a-btn-success" style="flex:1;">✓ Verify</button>
            <button @click="openReject(detailModal.kyc);detailModal.open=false" class="a-btn-sm a-btn-danger" style="flex:1;">✗ Reject</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Reject Modal -->
    <Transition name="bulk-slide">
      <div v-if="rejectModal.open" class="tx-modal-overlay" @click.self="rejectModal.open=false">
        <div class="tx-modal" style="max-width:340px;">
          <h3 class="tx-card-title">Reject KYC</h3>
          <p class="tx-card-sub">{{ rejectModal.kyc?.username }}</p>
          <select v-model="rejectModal.reason" class="a-select" style="width:100%;margin-bottom:8px;">
            <option value="">Select reason...</option>
            <option>Photo unclear or blurry</option>
            <option>Document expired</option>
            <option>Name mismatch</option>
            <option>Selfie doesn't match ID</option>
            <option>Incomplete documents</option>
            <option>Fake/forged document</option>
          </select>
          <textarea v-model="rejectModal.note" class="a-input a-textarea" rows="2" placeholder="Additional note..."></textarea>
          <div style="display:flex;gap:8px;margin-top:10px;">
            <button @click="rejectModal.open=false" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button @click="confirmReject" :disabled="rejectModal.busy||!rejectModal.reason" class="a-btn-sm a-btn-danger" style="flex:2;">
              <span v-if="rejectModal.busy" class="a-spinner-sm"></span>
              Reject
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Lightbox -->
    <Transition name="bulk-slide">
      <div v-if="lightbox.open" class="kyc-lightbox" @click="lightbox.open=false">
        <img :src="lightbox.url" class="kyc-lightbox-img" @click.stop />
        <button @click="lightbox.open=false" class="kyc-lightbox-close">✕</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useAdmin } from '@/composables/useAdmin'

const { fmtDate, adminKey, showToast, writeAudit, sett } = useAdmin()

const kycList   = ref([])
const loading   = ref(false)
const kycStatus = ref('pending')
const kycSearch = ref('')
const kycThreshold = ref(100000)
const autoApprove  = ref(false)
const allowedDocs  = ref(['NRC', 'Passport', 'Driver License'])
const docTypes     = ['NRC', 'Passport', 'Driver License', 'Voter ID']
const settSaving   = ref(false)

const pendingKYC  = computed(() => kycList.value.filter(u => (u.kyc_status||'pending')==='pending'))
const approvedKYC = computed(() => kycList.value.filter(u => u.kyc_status==='approved').length)
const rejectedKYC = computed(() => kycList.value.filter(u => u.kyc_status==='rejected').length)
const filteredKYC = computed(() => {
  let list = kycList.value
  if (kycStatus.value) list = list.filter(u => (u.kyc_status||'pending') === kycStatus.value)
  if (kycSearch.value) list = list.filter(u => (u.username||'').toLowerCase().includes(kycSearch.value.toLowerCase()))
  return list
})

async function loadKYC() {
  loading.value = true
  try {
    const { data } = await supabase.from('users').select('id,username,phone,kyc_status,created_at')
      .not('kyc_status', 'eq', 'none').order('created_at', { ascending: false })
    kycList.value = (data || []).filter(u => u.kyc_status || true)
  } catch (e) { showToast(e.message, 'error') }
  finally { loading.value = false }
}

async function approveKYC(kyc) {
  kyc._busy = 'approve'
  try {
    const { error } = await supabase.from('users').update({ kyc_status: 'approved' }).eq('id', kyc.id)
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
    await supabase.from('users').update({ kyc_status: 'rejected' }).eq('id', rejectModal.kyc.id)
    rejectModal.kyc.kyc_status = 'rejected'
    showToast('KYC rejected', 'success')
    writeAudit('REJECT_KYC', rejectModal.kyc.username, rejectModal.reason)
    rejectModal.open = false
  } catch (e) { showToast(e.message, 'error') }
  finally { rejectModal.busy = false }
}

// Document viewer
const detailModal = reactive({ open: false, kyc: null })
const kycDocs     = reactive({ loading: false, front: null, back: null, selfie: null })
const lightbox    = reactive({ open: false, url: '' })

async function viewKYC(kyc) {
  Object.assign(detailModal, { open: true, kyc })
  Object.assign(kycDocs, { loading: true, front: null, back: null, selfie: null })
  try {
    // Load from kyc_documents table
    const { data } = await supabase.from('kyc_documents')
      .select('front_url, back_url, selfie_url').eq('user_id', kyc.id)
      .order('submitted_at', { ascending: false }).limit(1).maybeSingle()
    if (data) {
      kycDocs.front  = data.front_url  ? await getSignedUrl('kyc-documents', data.front_url)  : null
      kycDocs.back   = data.back_url   ? await getSignedUrl('kyc-documents', data.back_url)   : null
      kycDocs.selfie = data.selfie_url ? await getSignedUrl('kyc-documents', data.selfie_url) : null
    }
  } catch (e) {} finally { kycDocs.loading = false }
}

async function getSignedUrl(bucket, path) {
  try {
    const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 3600)
    return data?.signedUrl || null
  } catch (e) { return path }
}

async function saveKYCSettings() {
  settSaving.value = true
  try {
    const { error } = await supabase.rpc('admin_save_settings', {
      p_key: adminKey.value,
      p_settings: { kyc_threshold: kycThreshold.value, kyc_allowed_docs: allowedDocs.value.join(','), kyc_auto_approve: autoApprove.value }
    })
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
.kyc-doc-types { display:flex;flex-wrap:wrap;gap:8px;padding:8px 0; }
.kyc-doc-check { display:flex;align-items:center;gap:4px;font-size:10px;color:#0f172a;cursor:pointer; }
.sel-cb { width:14px;height:14px;accent-color:#4f46e5; }
.tx-modal-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px; }
.tx-modal { background:#fff;border-radius:12px;padding:18px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3); }
.kyc-doc-modal { background:#fff;border-radius:12px;padding:18px;width:100%;max-width:400px;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3); }
.kyc-doc-modal-hdr { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px; }
.kyc-img-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px; }
.kyc-img-wrap { position:relative;cursor:pointer;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;aspect-ratio:3/4; }
.kyc-doc-img { width:100%;height:100%;object-fit:cover;transition:transform .2s; }
.kyc-img-wrap:hover .kyc-doc-img { transform:scale(1.05); }
.kyc-img-label { position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);color:#fff;font-size:9px;font-weight:700;text-align:center;padding:3px; }
.kyc-no-docs { display:flex;flex-direction:column;align-items:center;gap:6px;padding:20px;color:#94a3b8;font-size:10px;text-align:center; }
.kyc-lightbox { position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center; }
.kyc-lightbox-img { max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;box-shadow:0 0 60px rgba(0,0,0,.5); }
.kyc-lightbox-close { position:absolute;top:16px;right:16px;background:rgba(255,255,255,.15);border:none;border-radius:50%;width:36px;height:36px;color:#fff;font-size:16px;cursor:pointer; }
.detail-grid { display:flex;flex-direction:column; }
.detail-row { display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f1f5f9; }
.dl { font-size:10px;color:#94a3b8;font-weight:600; }
.dv { font-size:11px;color:#0f172a;font-weight:700; }
.mono { font-family:monospace; }
.tx-card-title { font-size:14px;font-weight:800;color:#0f172a;margin:0 0 3px; }
.tx-card-sub { font-size:10px;color:#64748b;margin:0; }
.bulk-slide-enter-active,.bulk-slide-leave-active { transition:all .2s; }
.bulk-slide-enter-from,.bulk-slide-leave-to { opacity:0;transform:scale(0.96); }
</style>
