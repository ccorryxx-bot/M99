<template>
  <div class="a-tab-content">

    <!-- Banner Overview -->
    <div class="banner-stats-row">
      <div class="banner-stat">
        <div class="banner-stat-val" style="color:#4f46e5;">{{ activeBanners }}</div>
        <div class="banner-stat-lbl">Active Banners</div>
      </div>
      <div class="banner-stat">
        <div class="banner-stat-val" style="color:#0891b2;">{{ announcements.length }}</div>
        <div class="banner-stat-lbl">Announcements</div>
      </div>
      <div class="banner-stat">
        <div class="banner-stat-val" style="color:#d97706;">{{ scheduledBanners }}</div>
        <div class="banner-stat-lbl">Scheduled</div>
      </div>
    </div>

    <!-- Banner Slots -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><rect x="3" y="3" width="18" height="18" rx="2"/><path stroke-linecap="round" d="M3 9h18M9 21V9"/></svg>
        Homepage Banners
      </div>
      <div v-for="(slot, i) in bannerSlots" :key="i" class="banner-slot">
        <div class="banner-slot-num">{{ i + 1 }}</div>
        <div class="banner-slot-preview" v-if="slot.url">
          <img :src="slot.url" :alt="`Banner ${i+1}`" class="banner-preview-img" />
        </div>
        <div class="banner-slot-ph" v-else>
          <svg width="20" height="20" fill="none" stroke="#cbd5e1" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path stroke-linecap="round" d="M3 9h18M9 21V9"/></svg>
          <span>Empty</span>
        </div>
        <div class="banner-slot-fields">
          <label class="a-mini-label">Image URL</label>
          <input v-model="slot.url" class="a-input" :placeholder="`Banner ${i+1} URL...`" style="margin-bottom:4px;" />
          <label class="a-mini-label">Link URL (optional)</label>
          <input v-model="slot.link" class="a-input" placeholder="https://..." style="margin-bottom:4px;" />
          <label class="a-mini-label">Alt Text</label>
          <input v-model="slot.alt" class="a-input" placeholder="Banner description" />
        </div>
        <div class="banner-slot-right">
          <button @click="slot.active = !slot.active" class="a-tog" :class="slot.active ? 'a-tog-on' : 'a-tog-off'">
            {{ slot.active ? 'ON' : 'OFF' }}
          </button>
          <button @click="clearSlot(i)" class="a-btn-sm a-btn-ghost">✕</button>
        </div>
      </div>
      <button @click="saveBanners" :disabled="bannerSaving" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <span v-if="bannerSaving" class="a-spinner-sm"></span>
        {{ bannerSaving ? 'Saving...' : 'Save All Banners' }}
      </button>
      <p v-if="bannerMsg" :class="bannerOk ? 'a-ok' : 'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ bannerMsg }}</p>
    </div>

    <!-- Popup Announcements -->
    <div class="a-sett-block">
      <div class="a-sett-ttl" style="display:flex;align-items:center;justify-content:space-between;">
        <span>📢 Announcements</span>
        <button @click="addAnnouncement" class="a-btn-sm a-btn-primary-sm">+ Add</button>
      </div>
      <div v-for="ann in announcements" :key="ann.id" class="ann-row">
        <div class="ann-icon">{{ ann.type === 'popup' ? '💬' : ann.type === 'banner' ? '🖼' : '📢' }}</div>
        <div class="ann-info">
          <div class="ann-title">{{ ann.title }}</div>
          <div class="ann-meta">
            <span class="ann-type-chip" :style="`background:${annTypeColor(ann.type)}15;color:${annTypeColor(ann.type)}`">{{ ann.type }}</span>
            <span v-if="ann.start_date">{{ fmtDate(ann.start_date) }} → {{ fmtDate(ann.end_date) }}</span>
          </div>
        </div>
        <div class="ann-right">
          <button @click="ann.is_active = !ann.is_active; saveAnn(ann)" class="a-tog" :class="ann.is_active ? 'a-tog-on' : 'a-tog-off'" style="font-size:9px;padding:3px 7px;">
            {{ ann.is_active ? 'ON' : 'OFF' }}
          </button>
          <button @click="editAnn(ann)" class="a-btn-sm a-btn-ghost">✏</button>
          <button @click="deleteAnn(ann.id)" class="a-btn-sm a-btn-danger">✕</button>
        </div>
      </div>
      <div v-if="!announcements.length" class="a-empty-sm">No announcements yet</div>
    </div>

    <!-- Marquee Manager -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">📣 Marquee Text</div>
      <div class="marquee-preview">
        <div class="marquee-track" :style="`animation-duration:${marqueeSpeed}s`">
          {{ sett.marquee_text || 'Marquee text preview...' }}
        </div>
      </div>
      <textarea v-model="sett.marquee_text" class="a-input a-textarea" rows="2" placeholder="Scrolling announcement text..." style="margin-bottom:8px;"></textarea>
      <div class="marquee-controls">
        <div>
          <label class="a-mini-label">Speed (seconds)</label>
          <input v-model.number="marqueeSpeed" type="range" min="5" max="40" class="speed-slider" />
          <span style="font-size:10px;color:#64748b;">{{ marqueeSpeed }}s</span>
        </div>
        <button @click="saveSett" :disabled="settSaving" class="a-btn-primary a-btn-sm">
          <span v-if="settSaving" class="a-spinner-sm"></span>
          Save
        </button>
      </div>
    </div>

    <!-- Add/Edit Announcement Modal -->
    <Teleport to="body">
      <div v-if="annModal.open" class="tx-modal-overlay" @click.self="annModal.open=false">
        <div class="tx-modal" style="max-width:380px;">
          <h3 style="font-size:14px;font-weight:800;color:#0f172a;margin:0 0 12px;">{{ annModal.id ? 'Edit' : 'Add' }} Announcement</h3>
          <label class="a-mini-label">Title</label>
          <input v-model="annModal.title" class="a-input" placeholder="Announcement title" style="margin-bottom:8px;" />
          <label class="a-mini-label">Body</label>
          <textarea v-model="annModal.body" class="a-input a-textarea" rows="3" placeholder="Announcement content..." style="margin-bottom:8px;"></textarea>
          <label class="a-mini-label">Type</label>
          <select v-model="annModal.type" class="a-select" style="width:100%;margin-bottom:8px;">
            <option value="popup">Popup</option>
            <option value="marquee">Marquee</option>
            <option value="banner">Banner</option>
            <option value="notification">Notification</option>
          </select>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
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
              {{ annModal.id ? 'Update' : 'Add' }}
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

const bannerSlots = reactive([
  { url: '', link: '', alt: '', active: true },
  { url: '', link: '', alt: '', active: true },
  { url: '', link: '', alt: '', active: true },
  { url: '', link: '', alt: '', active: true },
])

const announcements = ref([])
const bannerSaving  = ref(false)
const bannerMsg     = ref('')
const bannerOk      = ref(false)
const settSaving    = ref(false)
const marqueeSpeed  = ref(20)

const activeBanners    = computed(() => bannerSlots.filter(b => b.url && b.active).length)
const scheduledBanners = computed(() => announcements.value.filter(a => a.start_date && new Date(a.start_date) > new Date()).length)

function annTypeColor(t) { return { popup: '#4f46e5', banner: '#0891b2', marquee: '#16a34a', notification: '#d97706' }[t] || '#94a3b8' }

function clearSlot(i) { bannerSlots[i] = { url: '', link: '', alt: '', active: true } }

async function saveBanners() {
  bannerSaving.value = true; bannerMsg.value = ''
  try {
    const settObj = {}
    bannerSlots.forEach((b, i) => {
      settObj[`banner_${i+1}_url`]    = b.url
      settObj[`banner_${i+1}_link`]   = b.link
      settObj[`banner_${i+1}_alt`]    = b.alt
      settObj[`banner_${i+1}_active`] = b.active
    })
    const { error } = await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: settObj })
    if (error) throw error
    bannerOk.value = true; bannerMsg.value = 'Banners saved!'
    showToast('Banners saved ✓', 'success')
    writeAudit('SAVE_BANNERS', '', '')
  } catch (e) { bannerOk.value = false; bannerMsg.value = e.message; showToast(e.message, 'error') }
  finally { bannerSaving.value = false; setTimeout(() => { bannerMsg.value = '' }, 3000) }
}

async function loadAnnouncements() {
  const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false })
  announcements.value = data || []
}

function addAnnouncement() {
  Object.assign(annModal, { open: true, id: null, title: '', body: '', type: 'popup', start_date: '', end_date: '', saving: false })
}

function editAnn(ann) {
  Object.assign(annModal, { open: true, id: ann.id, title: ann.title, body: ann.body, type: ann.type, start_date: ann.start_date || '', end_date: ann.end_date || '', saving: false })
}

async function saveAnn(ann) {
  await supabase.from('announcements').update({ is_active: ann.is_active }).eq('id', ann.id).catch(() => {})
}

async function deleteAnn(id) {
  if (!confirm('Delete this announcement?')) return
  await supabase.from('announcements').delete().eq('id', id)
  announcements.value = announcements.value.filter(a => a.id !== id)
  showToast('Announcement deleted', 'success')
}

const annModal = reactive({ open: false, id: null, title: '', body: '', type: 'popup', start_date: '', end_date: '', saving: false })

async function saveAnnModal() {
  annModal.saving = true
  try {
    const payload = { title: annModal.title, body: annModal.body, type: annModal.type, start_date: annModal.start_date || null, end_date: annModal.end_date || null, is_active: true }
    if (annModal.id) {
      await supabase.from('announcements').update(payload).eq('id', annModal.id)
      const idx = announcements.value.findIndex(a => a.id === annModal.id)
      if (idx !== -1) Object.assign(announcements.value[idx], payload)
    } else {
      const { data } = await supabase.from('announcements').insert(payload).select()
      if (data) announcements.value.unshift(data[0])
    }
    showToast('Announcement saved ✓', 'success')
    writeAudit('SAVE_ANNOUNCEMENT', annModal.title, annModal.type)
    annModal.open = false
  } catch (e) { showToast(e.message, 'error') }
  finally { annModal.saving = false }
}

async function saveSett() {
  settSaving.value = true
  try { await adminSaveSett() }
  finally { settSaving.value = false }
}

onMounted(async () => {
  await fetchSett()
  if (sett.value.banner_1_url) {
    [1,2,3,4].forEach(i => {
      const b = bannerSlots[i-1]
      b.url  = sett.value[`banner_${i}_url`]  || ''
      b.link = sett.value[`banner_${i}_link`] || ''
      b.alt  = sett.value[`banner_${i}_alt`]  || ''
      b.active = sett.value[`banner_${i}_active`] !== false
    })
  }
  await loadAnnouncements()
})
</script>

<style scoped>
.banner-stats-row { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px; }
.banner-stat { background:#fff;border-radius:10px;padding:10px;text-align:center; }
.banner-stat-val { font-size:22px;font-weight:900;line-height:1;margin-bottom:3px; }
.banner-stat-lbl { font-size:9px;color:#94a3b8;font-weight:600; }
.banner-slot { display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9; }
.banner-slot-num { width:20px;height:20px;border-radius:50%;background:#ede9fe;color:#4f46e5;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:4px; }
.banner-slot-preview { width:60px;height:40px;border-radius:6px;overflow:hidden;flex-shrink:0;border:1px solid #e2e8f0; }
.banner-preview-img { width:100%;height:100%;object-fit:cover; }
.banner-slot-ph { width:60px;height:40px;border-radius:6px;background:#f8fafc;border:1px dashed #e2e8f0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;flex-shrink:0; }
.banner-slot-ph span { font-size:7px;color:#cbd5e1; }
.banner-slot-fields { flex:1;min-width:0; }
.banner-slot-right { display:flex;flex-direction:column;gap:4px;flex-shrink:0;align-items:flex-end; }
.ann-row { display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f1f5f9; }
.ann-icon { font-size:16px;flex-shrink:0; }
.ann-info { flex:1;min-width:0; }
.ann-title { font-size:12px;font-weight:700;color:#0f172a;margin-bottom:3px; }
.ann-meta { display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:10px;color:#94a3b8; }
.ann-type-chip { font-size:9px;font-weight:700;padding:1px 6px;border-radius:4px; }
.ann-right { display:flex;align-items:center;gap:4px;flex-shrink:0; }
.marquee-preview { background:#0f172a;border-radius:8px;padding:10px 14px;margin-bottom:8px;overflow:hidden; }
.marquee-track { white-space:nowrap;color:#f59e0b;font-size:11px;font-weight:600;display:inline-block;animation:marquee linear infinite; }
@keyframes marquee { from{transform:translateX(100vw)}to{transform:translateX(-100%)} }
.marquee-controls { display:flex;align-items:center;gap:10px;justify-content:space-between; }
.speed-slider { width:120px; }
.tx-modal-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px; }
.tx-modal { background:#fff;border-radius:12px;padding:18px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3); }
</style>
