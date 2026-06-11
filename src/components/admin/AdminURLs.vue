<template>
  <div class="a-tab-content">

    <!-- Stats bar -->
    <div class="img-stats-row">
      <div class="img-stat-card" style="border-left:3px solid #4f46e5;">
        <div class="img-stat-num" style="color:#4f46e5;">{{ activeImages }}</div>
        <div class="img-stat-lbl">Images Set</div>
      </div>
      <div class="img-stat-card" style="border-left:3px solid #0891b2;">
        <div class="img-stat-num" style="color:#0891b2;">{{ totalSlots }}</div>
        <div class="img-stat-lbl">Total Slots</div>
      </div>
      <div class="img-stat-card" style="border-left:3px solid #dc2626;">
        <div class="img-stat-num" style="color:#dc2626;">{{ emptySlots }}</div>
        <div class="img-stat-lbl">Using Default</div>
      </div>
      <div class="img-stat-card" style="border-left:3px solid #16a34a;">
        <div class="img-stat-num" style="color:#16a34a;">{{ customLinks }}</div>
        <div class="img-stat-lbl">Links Set</div>
      </div>
    </div>

    <!-- Action bar -->
    <div class="img-action-bar">
      <button @click="saveAll" :disabled="saving" class="a-btn-primary">
        <span v-if="saving" class="a-spinner-sm"></span>
        {{ saving ? 'Saving...' : '💾 Save All' }}
      </button>
      <button @click="loadAll" :disabled="loading" class="a-btn-sm a-btn-ghost">
        <span v-if="loading" class="a-spinner-sm"></span>
        ↺ Refresh
      </button>
      <select v-model="filterCat" class="a-select" style="flex:1;max-width:140px;">
        <option value="">All Categories</option>
        <option value="banner">Banners</option>
        <option value="brand">Brand</option>
        <option value="payment">Payment Icons</option>
        <option value="provider">Providers</option>
        <option value="link">Links</option>
      </select>
    </div>

    <!-- ════════════════════════════════
         SECTION: Banners
         ════════════════════════════════ -->
    <div v-if="!filterCat || filterCat==='banner'" class="a-sett-block">
      <div class="img-section-hdr">
        <div class="img-section-title">
          <span class="img-cat-badge img-cat-banner">🖼️ Banners</span>
          <span class="img-section-sub">Homepage slider images</span>
        </div>
      </div>
      <div class="img-card-grid">
        <div v-for="i in 5" :key="`b${i}`" class="img-card">
          <!-- Thumbnail -->
          <div class="img-thumb-wrap">
            <img
              :src="form[`banner_${i}_url`] || DEFAULTS[`banner_${i}_url`]"
              :alt="`Banner ${i}`"
              class="img-thumb img-thumb--banner"
              @error="e => e.target.src = fallbackImg"
            />
            <div class="img-card-num">{{ i }}</div>
            <span v-if="form[`banner_${i}_url`]" class="img-custom-dot" title="Custom URL">●</span>
          </div>
          <!-- Info + actions -->
          <div class="img-card-body">
            <div class="img-card-label">Banner {{ i }}</div>
            <div class="img-card-url" :title="form[`banner_${i}_url`] || DEFAULTS[`banner_${i}_url`]">
              {{ truncUrl(form[`banner_${i}_url`] || DEFAULTS[`banner_${i}_url`]) }}
            </div>
            <div v-if="editKey === `banner_${i}_url`" class="img-edit-row">
              <input
                v-model="editVal"
                class="a-input img-edit-input"
                placeholder="Paste new image URL..."
                @keyup.enter="commitEdit(`banner_${i}_url`)"
                @keyup.escape="editKey=''"
                autofocus
              />
              <button @click="commitEdit(`banner_${i}_url`)" class="a-btn-sm a-btn-success" style="flex-shrink:0;">✓</button>
              <button @click="editKey=''" class="a-btn-sm a-btn-ghost" style="flex-shrink:0;">✕</button>
            </div>
            <div v-else class="img-card-actions">
              <button @click="startEdit(`banner_${i}_url`)" class="img-act-btn img-act-replace">
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                Replace
              </button>
              <button v-if="form[`banner_${i}_url`]" @click="clearImg(`banner_${i}_url`)" class="img-act-btn img-act-delete">
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Reset
              </button>
              <a v-if="form[`banner_${i}_url`] || DEFAULTS[`banner_${i}_url`]"
                :href="form[`banner_${i}_url`] || DEFAULTS[`banner_${i}_url`]"
                target="_blank" class="img-act-btn img-act-view">
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════
         SECTION: Brand
         ════════════════════════════════ -->
    <div v-if="!filterCat || filterCat==='brand'" class="a-sett-block">
      <div class="img-section-hdr">
        <div class="img-section-title">
          <span class="img-cat-badge img-cat-brand">🏷️ Brand</span>
          <span class="img-section-sub">Logo & identity</span>
        </div>
      </div>
      <div class="img-card-grid img-card-grid--single">
        <div class="img-card">
          <div class="img-thumb-wrap">
            <img
              :src="form.brand_logo_url || DEFAULTS.brand_logo_url"
              alt="Brand Logo"
              class="img-thumb img-thumb--logo"
              @error="e => e.target.src = fallbackImg"
            />
            <span v-if="form.brand_logo_url" class="img-custom-dot" title="Custom URL">●</span>
          </div>
          <div class="img-card-body">
            <div class="img-card-label">Brand Logo</div>
            <div class="img-card-url" :title="form.brand_logo_url || DEFAULTS.brand_logo_url">
              {{ truncUrl(form.brand_logo_url || DEFAULTS.brand_logo_url) }}
            </div>
            <div v-if="editKey==='brand_logo_url'" class="img-edit-row">
              <input v-model="editVal" class="a-input img-edit-input" placeholder="Paste logo URL..." @keyup.enter="commitEdit('brand_logo_url')" @keyup.escape="editKey=''" />
              <button @click="commitEdit('brand_logo_url')" class="a-btn-sm a-btn-success" style="flex-shrink:0;">✓</button>
              <button @click="editKey=''" class="a-btn-sm a-btn-ghost" style="flex-shrink:0;">✕</button>
            </div>
            <div v-else class="img-card-actions">
              <button @click="startEdit('brand_logo_url')" class="img-act-btn img-act-replace">
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                Replace
              </button>
              <button v-if="form.brand_logo_url" @click="clearImg('brand_logo_url')" class="img-act-btn img-act-delete">
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Reset
              </button>
              <a :href="form.brand_logo_url || DEFAULTS.brand_logo_url" target="_blank" class="img-act-btn img-act-view">
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════
         SECTION: Payment Icons
         ════════════════════════════════ -->
    <div v-if="!filterCat || filterCat==='payment'" class="a-sett-block">
      <div class="img-section-hdr">
        <div class="img-section-title">
          <span class="img-cat-badge img-cat-payment">💳 Payment Icons</span>
          <span class="img-section-sub">KPay, Wave, USDT, UAB</span>
        </div>
      </div>
      <div class="img-card-grid">
        <div v-for="pm in paymentMethods" :key="pm.key" class="img-card">
          <div class="img-thumb-wrap">
            <img
              :src="form[pm.key] || DEFAULTS[pm.key]"
              :alt="pm.label"
              class="img-thumb img-thumb--icon"
              @error="e => e.target.src = fallbackImg"
            />
            <span v-if="form[pm.key]" class="img-custom-dot" title="Custom URL">●</span>
          </div>
          <div class="img-card-body">
            <div class="img-card-label">{{ pm.label }}</div>
            <div class="img-card-url" :title="form[pm.key] || DEFAULTS[pm.key]">
              {{ truncUrl(form[pm.key] || DEFAULTS[pm.key]) }}
            </div>
            <div v-if="editKey===pm.key" class="img-edit-row">
              <input v-model="editVal" class="a-input img-edit-input" :placeholder="`${pm.label} URL...`" @keyup.enter="commitEdit(pm.key)" @keyup.escape="editKey=''" />
              <button @click="commitEdit(pm.key)" class="a-btn-sm a-btn-success" style="flex-shrink:0;">✓</button>
              <button @click="editKey=''" class="a-btn-sm a-btn-ghost" style="flex-shrink:0;">✕</button>
            </div>
            <div v-else class="img-card-actions">
              <button @click="startEdit(pm.key)" class="img-act-btn img-act-replace">Replace</button>
              <button v-if="form[pm.key]" @click="clearImg(pm.key)" class="img-act-btn img-act-delete">Reset</button>
              <a :href="form[pm.key] || DEFAULTS[pm.key]" target="_blank" class="img-act-btn img-act-view">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════
         SECTION: Provider Logos
         ════════════════════════════════ -->
    <div v-if="!filterCat || filterCat==='provider'" class="a-sett-block">
      <div class="img-section-hdr">
        <div class="img-section-title">
          <span class="img-cat-badge img-cat-provider">🎮 Provider Logos</span>
          <span class="img-section-sub">Game provider brand images</span>
        </div>
      </div>
      <div class="img-card-grid">
        <div v-for="i in 6" :key="`p${i}`" class="img-card">
          <div class="img-thumb-wrap">
            <img
              :src="form[`provider_logo_${i}`] || DEFAULTS[`provider_logo_${i}`]"
              :alt="`Provider ${i}`"
              class="img-thumb img-thumb--icon"
              @error="e => e.target.src = fallbackImg"
            />
            <div class="img-card-num">{{ i }}</div>
            <span v-if="form[`provider_logo_${i}`]" class="img-custom-dot" title="Custom URL">●</span>
          </div>
          <div class="img-card-body">
            <div class="img-card-label">Provider {{ i }}</div>
            <div class="img-card-url" :title="form[`provider_logo_${i}`] || DEFAULTS[`provider_logo_${i}`]">
              {{ truncUrl(form[`provider_logo_${i}`] || DEFAULTS[`provider_logo_${i}`]) }}
            </div>
            <div v-if="editKey===`provider_logo_${i}`" class="img-edit-row">
              <input v-model="editVal" class="a-input img-edit-input" :placeholder="`Provider ${i} URL...`" @keyup.enter="commitEdit(`provider_logo_${i}`)" @keyup.escape="editKey=''" />
              <button @click="commitEdit(`provider_logo_${i}`)" class="a-btn-sm a-btn-success" style="flex-shrink:0;">✓</button>
              <button @click="editKey=''" class="a-btn-sm a-btn-ghost" style="flex-shrink:0;">✕</button>
            </div>
            <div v-else class="img-card-actions">
              <button @click="startEdit(`provider_logo_${i}`)" class="img-act-btn img-act-replace">Replace</button>
              <button v-if="form[`provider_logo_${i}`]" @click="clearImg(`provider_logo_${i}`)" class="img-act-btn img-act-delete">Reset</button>
              <a :href="form[`provider_logo_${i}`] || DEFAULTS[`provider_logo_${i}`]" target="_blank" class="img-act-btn img-act-view">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════
         SECTION: CS & App Links
         ════════════════════════════════ -->
    <div v-if="!filterCat || filterCat==='link'" class="a-sett-block">
      <div class="img-section-hdr">
        <div class="img-section-title">
          <span class="img-cat-badge img-cat-link">🔗 CS & App Links</span>
          <span class="img-section-sub">Support & navigation URLs</span>
        </div>
      </div>
      <div class="link-list">
        <div v-for="lk in linkFields" :key="lk.key" class="link-row">
          <div class="link-row-icon">{{ lk.icon }}</div>
          <div class="link-row-body">
            <div class="img-card-label">{{ lk.label }}</div>
            <div v-if="editKey===lk.key" class="img-edit-row" style="margin-top:4px;">
              <input v-model="editVal" class="a-input img-edit-input" :placeholder="lk.placeholder" @keyup.enter="commitEdit(lk.key)" @keyup.escape="editKey=''" />
              <button @click="commitEdit(lk.key)" class="a-btn-sm a-btn-success" style="flex-shrink:0;">✓</button>
              <button @click="editKey=''" class="a-btn-sm a-btn-ghost" style="flex-shrink:0;">✕</button>
            </div>
            <div v-else class="link-row-val-wrap">
              <span class="link-row-val" :class="form[lk.key] ? 'link-set' : 'link-unset'">
                {{ form[lk.key] || lk.placeholder }}
              </span>
              <div class="img-card-actions" style="margin-top:0;">
                <button @click="startEdit(lk.key)" class="img-act-btn img-act-replace">Edit</button>
                <button v-if="form[lk.key]" @click="clearImg(lk.key)" class="img-act-btn img-act-delete">Clear</button>
                <a v-if="form[lk.key]" :href="form[lk.key]" target="_blank" class="img-act-btn img-act-view">Open</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Save bar sticky -->
    <div v-if="hasUnsaved" class="img-unsaved-bar">
      <span class="img-unsaved-msg">⚠ Unsaved changes</span>
      <button @click="saveAll" :disabled="saving" class="a-btn-sm a-btn-success">
        <span v-if="saving" class="a-spinner-sm"></span>
        {{ saving ? 'Saving...' : '💾 Save Now' }}
      </button>
      <button @click="loadAll" class="a-btn-sm a-btn-ghost">↺ Discard</button>
    </div>

    <!-- Toast -->
    <Transition name="url-toast">
      <div v-if="localToast.show" class="url-toast" :class="`url-toast--${localToast.type}`">{{ localToast.msg }}</div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { useSettings, DEFAULTS as _DEFAULTS, invalidateSettings } from '@/composables/useSettings'
import { supabase } from '@/supabase'

const { adminKey, showToast, writeAudit } = useAdmin()
const { getSetting } = useSettings()
const DEFAULTS = _DEFAULTS

const saving      = ref(false)
const loading     = ref(false)
const filterCat   = ref('')
const editKey     = ref('')
const editVal     = ref('')
const localToast  = reactive({ show: false, msg: '', type: 'info' })
const fallbackImg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NiZDVlMSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIi8+PHBhdGggZD0iTTMgMTRsNS01IDQgNCA0LTMgNSA0Ii8+PC9zdmc+'

const paymentMethods = [
  { key: 'kpay_img_url',   label: 'KBZ Pay',   icon: '💳' },
  { key: 'wave_img_url',   label: 'Wave Money', icon: '🌊' },
  { key: 'usdt_img_url',   label: 'USDT',       icon: '💲' },
  { key: 'uabpay_img_url', label: 'UAB Pay',    icon: '🏦' },
]

const linkFields = [
  { key: 'cs_telegram',     label: 'Telegram CS',       icon: '✈️', placeholder: 'https://t.me/...' },
  { key: 'cs_livechat_url', label: 'Live Chat URL',     icon: '💬', placeholder: 'https://...' },
  { key: 'cs_control_plus', label: 'Control+ CS URL',   icon: '📞', placeholder: 'https://...' },
  { key: 'install_url',     label: 'App Install URL',   icon: '📲', placeholder: 'https://...' },
  { key: 'vip_url',         label: 'VIP Page URL',      icon: '⭐', placeholder: 'https://...' },
  { key: 'deposit_url',     label: 'Deposit Direct URL',icon: '💰', placeholder: 'https://...' },
  { key: 'withdraw_url',    label: 'Withdraw Direct URL',icon:'💸', placeholder: 'https://...' },
]

const ALL_KEYS = [
  'brand_logo_url',
  'banner_1_url','banner_2_url','banner_3_url','banner_4_url','banner_5_url',
  'kpay_img_url','wave_img_url','usdt_img_url','uabpay_img_url',
  'provider_logo_1','provider_logo_2','provider_logo_3','provider_logo_4','provider_logo_5','provider_logo_6',
  ...linkFields.map(l => l.key),
]

const form         = reactive(Object.fromEntries(ALL_KEYS.map(k => [k, ''])))
const savedForm    = reactive(Object.fromEntries(ALL_KEYS.map(k => [k, ''])))
const totalSlots   = 16  // 5 banners + 1 brand + 4 payment + 6 providers
const imageKeys    = ALL_KEYS.filter(k => !linkFields.some(l => l.key === k))
const activeImages = computed(() => imageKeys.filter(k => form[k] || DEFAULTS[k]).length)
const emptySlots   = computed(() => imageKeys.filter(k => !form[k]).length)
const customLinks  = computed(() => linkFields.filter(l => form[l.key]).length)
const hasUnsaved   = computed(() => ALL_KEYS.some(k => form[k] !== savedForm[k]))

function truncUrl(url) {
  if (!url) return '—'
  if (url.length <= 44) return url
  return url.slice(0, 28) + '…' + url.slice(-12)
}

function startEdit(key) {
  editKey.value = key
  editVal.value = form[key] || ''
}

function commitEdit(key) {
  form[key] = editVal.value.trim()
  editKey.value = ''
  editVal.value = ''
}

function clearImg(key) {
  form[key] = ''
  if (editKey.value === key) editKey.value = ''
}

function showLocal(msg, type = 'info') {
  Object.assign(localToast, { show: true, msg, type })
  setTimeout(() => { localToast.show = false }, 2800)
}

async function loadAll() {
  loading.value = true
  try {
    const { data, error } = await supabase.rpc('admin_get_settings', { p_key: adminKey.value })
    const src = (data && !error) ? data : {}
    if (!error) {
      ALL_KEYS.forEach(k => {
        form[k] = src[k] ?? ''
        savedForm[k] = src[k] ?? ''
      })
      return
    }
  } catch {}
  try {
    const { data } = await supabase.from('system_settings').select('key,value').in('key', ALL_KEYS)
    const src = {}; (data || []).forEach(r => { src[r.key] = r.value })
    ALL_KEYS.forEach(k => {
      form[k] = src[k] ?? ''
      savedForm[k] = src[k] ?? ''
    })
  } catch (e) { showLocal(e.message, 'error') }
  finally { loading.value = false }
}

async function saveAll() {
  saving.value = true
  try {
    const payload = {}
    ALL_KEYS.forEach(k => { payload[k] = form[k] || null })
    const { error } = await supabase.rpc('admin_save_settings', {
      p_key: adminKey.value,
      p_settings: payload
    })
    if (error) throw error
    ALL_KEYS.forEach(k => { savedForm[k] = form[k] })
    invalidateSettings()
    showLocal('All changes saved ✓', 'success')
    showToast('Saved!', 'success')
    writeAudit('SAVE_IMAGES', '', `${Object.values(payload).filter(Boolean).length} entries`)
    editKey.value = ''
  } catch (e) {
    showLocal(e.message, 'error')
    showToast(e.message, 'error')
  } finally { saving.value = false }
}

onMounted(loadAll)
</script>

<style scoped>
.img-stats-row { display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px; }
.img-stat-card { background:#fff;border-radius:10px;padding:10px;text-align:center; }
.img-stat-num { font-size:20px;font-weight:900;line-height:1; }
.img-stat-lbl { font-size:8.5px;color:#94a3b8;font-weight:600;margin-top:3px; }

.img-action-bar { display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap; }

.img-section-hdr { margin-bottom:10px; }
.img-section-title { display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
.img-section-sub { font-size:9.5px;color:#94a3b8; }
.img-cat-badge { font-size:10px;font-weight:800;padding:3px 9px;border-radius:6px; }
.img-cat-banner  { background:#ede9fe;color:#4f46e5; }
.img-cat-brand   { background:#fef9c3;color:#92400e; }
.img-cat-payment { background:#e0f2fe;color:#0891b2; }
.img-cat-provider{ background:#dcfce7;color:#15803d; }
.img-cat-link    { background:#f1f5f9;color:#475569; }

.img-card-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:8px; }
@media(min-width:400px) { .img-card-grid { grid-template-columns:repeat(2,1fr); } }
.img-card-grid--single { grid-template-columns:1fr; }

.img-card { background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden; }
.img-thumb-wrap { position:relative;width:100%;aspect-ratio:16/7;background:#f1f5f9;overflow:hidden; }
.img-thumb { width:100%;height:100%;object-fit:cover;display:block; }
.img-thumb--banner { object-fit:cover; }
.img-thumb--logo   { object-fit:contain;padding:6px; }
.img-thumb--icon   { object-fit:contain;padding:4px; }
.img-card-num { position:absolute;top:4px;left:4px;background:rgba(0,0,0,.55);color:#fff;font-size:9px;font-weight:800;padding:1px 5px;border-radius:4px; }
.img-custom-dot { position:absolute;top:4px;right:4px;color:#4f46e5;font-size:10px;background:#fff;border-radius:50%;line-height:1;padding:0 2px; }
.img-card-body { padding:8px; }
.img-card-label { font-size:10px;font-weight:800;color:#0f172a;margin-bottom:3px; }
.img-card-url { font-size:9px;color:#64748b;font-family:monospace;margin-bottom:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.img-card-actions { display:flex;gap:4px;flex-wrap:wrap; }
.img-act-btn { display:inline-flex;align-items:center;gap:3px;padding:3px 7px;border-radius:5px;font-size:9px;font-weight:700;cursor:pointer;border:none;text-decoration:none;transition:all .15s; }
.img-act-replace { background:#ede9fe;color:#4f46e5; }
.img-act-replace:hover { background:#c7d2fe; }
.img-act-delete { background:#fee2e2;color:#dc2626; }
.img-act-delete:hover { background:#fecaca; }
.img-act-view { background:#f1f5f9;color:#475569; }
.img-act-view:hover { background:#e2e8f0; }
.img-edit-row { display:flex;gap:4px;align-items:center;margin-top:4px; }
.img-edit-input { flex:1;font-size:10px;padding:5px 8px;min-width:0; }

.link-list { display:flex;flex-direction:column;gap:0; }
.link-row { display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9; }
.link-row:last-child { border-bottom:none; }
.link-row-icon { font-size:16px;flex-shrink:0;margin-top:2px; }
.link-row-body { flex:1;min-width:0; }
.link-row-val-wrap { display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px; }
.link-row-val { font-size:9.5px;font-family:monospace;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.link-set   { color:#0891b2; }
.link-unset { color:#cbd5e1;font-style:italic;font-family:inherit; }

.img-unsaved-bar { position:sticky;bottom:0;background:#fff;border-top:2px solid #fbbf24;padding:10px 12px;display:flex;align-items:center;gap:8px;margin-top:12px; }
.img-unsaved-msg { flex:1;font-size:10px;font-weight:700;color:#92400e; }

.url-toast { position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9999;padding:10px 20px;border-radius:99px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,.3);pointer-events:none; }
.url-toast--success { background:#16a34a;color:#fff; }
.url-toast--error   { background:#dc2626;color:#fff; }
.url-toast--info    { background:#0f172a;color:#fff; }
.url-toast-enter-active { animation:utin .3s ease; }
.url-toast-leave-active { animation:utin .2s ease reverse; }
@keyframes utin { from { opacity:0;transform:translateX(-50%) translateY(8px); } to { opacity:1;transform:translateX(-50%) translateY(0); } }
</style>
