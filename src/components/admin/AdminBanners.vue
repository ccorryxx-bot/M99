<template>
  <div class="a-tab-content">

    <!-- Stats row -->
    <div class="banner-stats-row">
      <div class="banner-stat">
        <div class="banner-stat-val" style="color:#4f46e5;">{{ announcements.filter(a=>a.is_active).length }}</div>
        <div class="banner-stat-lbl">Active Announcements</div>
      </div>
      <div class="banner-stat">
        <div class="banner-stat-val" style="color:#0891b2;">{{ announcements.length }}</div>
        <div class="banner-stat-lbl">Total</div>
      </div>
      <div class="banner-stat">
        <div class="banner-stat-val" style="color:#d97706;">{{ scheduledCount }}</div>
        <div class="banner-stat-lbl">Scheduled</div>
      </div>
    </div>

    <!-- Note: Banner Images managed in Images tab -->
    <div class="banners-note">
      <svg width="12" height="12" fill="none" stroke="#0891b2" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      Banner image URLs are managed in the <strong>Images &amp; Links</strong> tab (URLs tab).
    </div>

    <!-- ── Popup Announcements ── -->
    <div class="a-sett-block">
      <div class="a-sett-ttl" style="display:flex;align-items:center;justify-content:space-between;">
        <span>📢 Announcements</span>
        <button @click="openAddAnn" class="a-btn-sm a-btn-primary-sm">+ Add</button>
      </div>

      <div v-if="annLoading" class="a-loading"><span class="a-spinner"></span></div>
      <div v-else>
        <!-- Type filter pills -->
        <div class="ann-filter-pills">
          <button
            v-for="t in annTypes"
            :key="t.val"
            @click="annFilter = t.val"
            class="ann-pill"
            :class="annFilter === t.val ? 'ann-pill--on' : ''"
            :style="annFilter === t.val ? `background:${t.color}15;color:${t.color};border-color:${t.color}30;` : ''"
          >{{ t.label }}</button>
        </div>

        <div v-for="ann in filteredAnns" :key="ann.id" class="ann-row">
          <div class="ann-icon">{{ annIcon(ann.type) }}</div>
          <div class="ann-info">
            <div class="ann-title">{{ ann.title }}</div>
            <div class="ann-meta">
              <span class="ann-type-chip" :style="`background:${annTypeColor(ann.type)}15;color:${annTypeColor(ann.type)}`">{{ ann.type }}</span>
              <span v-if="ann.start_date" style="font-size:9px;color:#94a3b8;">
                {{ fmtDate(ann.start_date) }} → {{ fmtDate(ann.end_date) }}
              </span>
              <span v-if="ann.body" class="ann-body-preview">{{ ann.body.slice(0,40) }}{{ ann.body.length>40?'…':'' }}</span>
            </div>
          </div>
          <div class="ann-right">
            <button
              @click="toggleAnn(ann)"
              class="a-tog"
              :class="ann.is_active ? 'a-tog-on' : 'a-tog-off'"
              style="font-size:9px;padding:3px 7px;"
            >{{ ann.is_active ? 'ON' : 'OFF' }}</button>
            <button @click="editAnn(ann)" class="a-btn-sm a-btn-ghost">✏</button>
            <button @click="deleteAnn(ann.id)" class="a-btn-sm a-btn-danger">✕</button>
          </div>
        </div>
        <div v-if="!filteredAnns.length" class="a-empty-sm">No announcements yet</div>
      </div>
    </div>

    <!-- ── Marquee Manager ── -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">📣 Marquee Text</div>
      <div class="marquee-preview">
        <div class="marquee-track" :style="`animation-duration:${marqueeSpeed}s`">
          {{ sett.marquee_text || '⚡ Welcome to iW99 — Your #1 Gaming Platform ⚡' }}
        </div>
      </div>
      <textarea
        v-model="sett.marquee_text"
        class="a-input a-textarea"
        rows="2"
        placeholder="Scrolling announcement text..."
        style="margin-bottom:8px;"
      ></textarea>
      <div class="marquee-controls">
        <div style="flex:1;">
          <label class="a-mini-label">Scroll Speed ({{ marqueeSpeed }}s — lower = faster)</label>
          <input v-model.number="marqueeSpeed" type="range" min="5" max="50" step="1" class="speed-slider" />
        </div>
        <button @click="saveSett" :disabled="settSaving" class="a-btn-primary a-btn-sm">
          <span v-if="settSaving" class="a-spinner-sm"></span>
          Save Marquee
        </button>
      </div>
    </div>

    <!-- Add/Edit Announcement Modal -->
    <Teleport to="body">
      <div v-if="annModal.open" class="tx-modal-overlay" @click.self="annModal.open=false">
        <div class="tx-modal" style="max-width:400px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h3 style="font-size:14px;font-weight:800;color:#0f172a;margin:0;">
              {{ annModal.id ? 'Edit' : 'New' }} Announcement
            </h3>
            <button @click="annModal.open=false" class="a-btn-sm a-btn-ghost" style="padding:2px 7px;">✕</button>
          </div>

          <label class="a-mini-label">Title *</label>
          <input v-model="annModal.title" class="a-input" placeholder="Announcement title" style="margin-bottom:8px;" />

          <label class="a-mini-label">Type</label>
          <div class="ann-type-picker">
            <button
              v-for="t in annTypes.filter(x=>x.val!=='')"
              :key="t.val"
              @click="annModal.type=t.val"
              class="ann-type-btn"
              :class="annModal.type===t.val ? 'ann-type-btn--on' : ''"
              :style="annModal.type===t.val ? `background:${t.color}15;border-color:${t.color};color:${t.color};` : ''"
            >{{ annIcon(t.val) }} {{ t.label }}</button>
          </div>

          <label class="a-mini-label" style="margin-top:8px;">Body (optional)</label>
          <textarea v-model="annModal.body" class="a-input a-textarea" rows="3" placeholder="Announcement content..." style="margin-bottom:8px;"></textarea>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
            <div>
              <label class="a-mini-label">Start Date</label>
              <input v-model="annModal.start_date" type="date" class="a-input" />
            </div>
            <div>
              <label class="a-mini-label">End Date</label>
              <input v-model="annModal.end_date" type="date" class="a-input" />
            </div>
          </div>

          <div style="display:flex;gap:8px;">
            <button @click="annModal.open=false" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button @click="saveAnnModal" :disabled="annModal.saving || !annModal.title" class="a-btn-primary" style="flex:2;">
              <span v-if="annModal.saving" class="a-spinner-sm"></span>
              {{ annModal.saving ? 'Saving...' : annModal.id ? 'Update' : 'Add' }}
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

const { sett, adminKey, fmtDate, showToast, writeAudit, saveSett: adminSaveSett, fetchSett } = useAdmin()

const announcements = ref([])
const annLoading    = ref(false)
const annFilter     = ref('')
const settSaving    = ref(false)
const marqueeSpeed  = ref(20)

const annTypes = [
  { val: '',             label: 'All',          color: '#64748b' },
  { val: 'popup',        label: 'Popup',        color: '#4f46e5' },
  { val: 'marquee',      label: 'Marquee',      color: '#16a34a' },
  { val: 'banner',       label: 'Banner',       color: '#0891b2' },
  { val: 'notification', label: 'Notification', color: '#d97706' },
]

const filteredAnns = computed(() =>
  annFilter.value
    ? announcements.value.filter(a => a.type === annFilter.value)
    : announcements.value
)

const scheduledCount = computed(() =>
  announcements.value.filter(a => a.start_date && new Date(a.start_date) > new Date()).length
)

function annTypeColor(t) {
  return { popup: '#4f46e5', banner: '#0891b2', marquee: '#16a34a', notification: '#d97706' }[t] || '#94a3b8'
}

function annIcon(t) {
  return { popup: '💬', banner: '🖼️', marquee: '📣', notification: '🔔' }[t] || '📢'
}

async function loadAnnouncements() {
  annLoading.value = true
  try {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
    announcements.value = data || []
  } catch (e) {
    showToast(e.message, 'error')
  } finally { annLoading.value = false }
}

function openAddAnn() {
  Object.assign(annModal, { open: true, id: null, title: '', body: '', type: 'popup', start_date: '', end_date: '', saving: false })
}

function editAnn(ann) {
  Object.assign(annModal, {
    open: true, id: ann.id,
    title: ann.title, body: ann.body || '',
    type: ann.type,
    start_date: ann.start_date || '',
    end_date: ann.end_date || '',
    saving: false
  })
}

async function toggleAnn(ann) {
  ann.is_active = !ann.is_active
  await supabase.from('announcements').update({ is_active: ann.is_active }).eq('id', ann.id).catch(() => {})
  showToast(`Announcement ${ann.is_active ? 'activated' : 'deactivated'}`, 'success')
}

async function deleteAnn(id) {
  if (!confirm('Delete this announcement?')) return
  await supabase.from('announcements').delete().eq('id', id)
  announcements.value = announcements.value.filter(a => a.id !== id)
  showToast('Deleted', 'success')
  writeAudit('DELETE_ANNOUNCEMENT', id, '')
}

const annModal = reactive({
  open: false, id: null, title: '', body: '',
  type: 'popup', start_date: '', end_date: '', saving: false
})

async function saveAnnModal() {
  if (!annModal.title.trim()) return
  annModal.saving = true
  try {
    const payload = {
      title: annModal.title.trim(),
      body: annModal.body,
      type: annModal.type,
      start_date: annModal.start_date || null,
      end_date: annModal.end_date || null,
      is_active: true
    }
    if (annModal.id) {
      await supabase.from('announcements').update(payload).eq('id', annModal.id)
      const idx = announcements.value.findIndex(a => a.id === annModal.id)
      if (idx !== -1) Object.assign(announcements.value[idx], payload)
      writeAudit('UPDATE_ANNOUNCEMENT', annModal.title, annModal.type)
    } else {
      const { data } = await supabase.from('announcements').insert(payload).select()
      if (data) announcements.value.unshift(data[0])
      writeAudit('ADD_ANNOUNCEMENT', annModal.title, annModal.type)
    }
    showToast('Announcement saved ✓', 'success')
    annModal.open = false
  } catch (e) { showToast(e.message, 'error') }
  finally { annModal.saving = false }
}

async function saveSett() {
  settSaving.value = true
  try {
    await supabase.rpc('admin_save_settings', {
      p_key: adminKey.value,
      p_settings: { marquee_text: sett.value.marquee_text }
    })
    showToast('Marquee saved ✓', 'success')
    writeAudit('SAVE_MARQUEE', '', '')
  } catch (e) { showToast(e.message, 'error') }
  finally { settSaving.value = false }
}

onMounted(async () => {
  await fetchSett()
  loadAnnouncements()
})
</script>

<style scoped>
.banner-stats-row { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px; }
.banner-stat { background:#fff;border-radius:10px;padding:10px;text-align:center; }
.banner-stat-val { font-size:22px;font-weight:900;line-height:1;margin-bottom:3px; }
.banner-stat-lbl { font-size:9px;color:#94a3b8;font-weight:600; }

.banners-note { background:#e0f2fe;border:1px solid #bae6fd;border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:10px;color:#0369a1;display:flex;align-items:center;gap:7px; }

.ann-filter-pills { display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px; }
.ann-pill { background:#f8fafc;border:1px solid #e2e8f0;border-radius:99px;padding:3px 10px;font-size:9.5px;font-weight:700;color:#64748b;cursor:pointer; }
.ann-pill--on { font-weight:800; }

.ann-row { display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid #f1f5f9; }
.ann-row:last-child { border-bottom:none; }
.ann-icon { font-size:16px;flex-shrink:0;margin-top:2px; }
.ann-info { flex:1;min-width:0; }
.ann-title { font-size:12px;font-weight:700;color:#0f172a;margin-bottom:3px; }
.ann-meta { display:flex;flex-wrap:wrap;gap:6px;align-items:center; }
.ann-type-chip { font-size:9px;font-weight:700;padding:1px 6px;border-radius:4px; }
.ann-body-preview { font-size:9px;color:#94a3b8;font-style:italic; }
.ann-right { display:flex;align-items:center;gap:4px;flex-shrink:0; }

.marquee-preview { background:#0f172a;border-radius:8px;padding:10px 14px;margin-bottom:8px;overflow:hidden; }
.marquee-track { white-space:nowrap;color:#f59e0b;font-size:11px;font-weight:600;display:inline-block;animation:marquee linear infinite; }
@keyframes marquee { from{transform:translateX(100vw)}to{transform:translateX(-100%)} }
.marquee-controls { display:flex;align-items:flex-end;gap:10px; }
.speed-slider { width:100%;margin-top:5px; }

.ann-type-picker { display:flex;gap:5px;flex-wrap:wrap;margin-top:4px;margin-bottom:0; }
.ann-type-btn { padding:4px 10px;border:1px solid #e2e8f0;border-radius:6px;background:#f8fafc;font-size:9.5px;font-weight:700;color:#64748b;cursor:pointer; }
.ann-type-btn--on { font-weight:800; }

.tx-modal-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto; }
.tx-modal { background:#fff;border-radius:12px;padding:18px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3);max-height:90vh;overflow-y:auto; }
</style>
