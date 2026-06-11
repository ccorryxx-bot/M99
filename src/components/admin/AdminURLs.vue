<template>
  <div class="a-tab-content">

    <!-- Header stats -->
    <div class="url-stats-row">
      <div class="url-stat-card" v-for="s in urlStats" :key="s.label" :style="`border-left:3px solid ${s.color}`">
        <div class="url-stat-num" :style="`color:${s.color}`">{{ s.num }}</div>
        <div class="url-stat-lbl">{{ s.label }}</div>
      </div>
    </div>

    <!-- Save / Reset bar -->
    <div class="url-action-bar">
      <button @click="saveAll" :disabled="saving" class="a-btn-primary url-save-btn">
        <span v-if="saving" class="a-spinner-sm"></span>
        {{ saving ? 'Saving...' : '💾 Save All Changes' }}
      </button>
      <button @click="loadAll" class="a-btn-sm a-btn-ghost">↺ Refresh</button>
      <p v-if="saveMsg" :class="saveOk ? 'a-ok' : 'a-err'" style="margin:0;font-size:10px;">{{ saveMsg }}</p>
    </div>

    <!-- ── SECTION: Brand Logo ── -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">🏷️ Brand Logo</div>
      <div class="url-item">
        <div class="url-item-preview">
          <img :src="form.brand_logo_url || DEFAULTS.brand_logo_url" alt="Brand Logo"
            class="url-preview-img" @error="e=>e.target.style.display='none'" />
        </div>
        <div class="url-item-fields">
          <div class="url-item-label">Brand Logo URL</div>
          <div class="url-item-default">Default: <span class="url-mono">{{ DEFAULTS.brand_logo_url }}</span></div>
          <input v-model="form.brand_logo_url" class="a-input url-input" placeholder="Override brand logo URL..." />
        </div>
      </div>
    </div>

    <!-- ── SECTION: Banner Images ── -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">🖼️ Homepage Banners</div>
      <div v-for="i in 5" :key="i" class="url-item">
        <div class="url-item-preview">
          <img :src="form[`banner_${i}_url`] || DEFAULTS[`banner_${i}_url`]" :alt="`Banner ${i}`"
            class="url-preview-img url-preview-banner" @error="e=>e.target.style.display='none'" />
        </div>
        <div class="url-item-fields">
          <div class="url-item-label">Banner {{ i }} Image</div>
          <div class="url-item-default">Default: <span class="url-mono">{{ DEFAULTS[`banner_${i}_url`] }}</span></div>
          <input v-model="form[`banner_${i}_url`]" class="a-input url-input" :placeholder="`Banner ${i} URL...`" />
        </div>
      </div>
    </div>

    <!-- ── SECTION: Payment Method Icons ── -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">💳 Payment Method Icons</div>
      <div v-for="pm in paymentMethods" :key="pm.key" class="url-item">
        <div class="url-item-preview">
          <img :src="form[pm.key] || DEFAULTS[pm.key]" :alt="pm.label"
            class="url-preview-img url-preview-icon" @error="e=>e.target.style.display='none'" />
        </div>
        <div class="url-item-fields">
          <div class="url-item-label">{{ pm.label }}</div>
          <div class="url-item-default">Default: <span class="url-mono">{{ DEFAULTS[pm.key] }}</span></div>
          <input v-model="form[pm.key]" class="a-input url-input" :placeholder="`${pm.label} icon URL...`" />
        </div>
      </div>
    </div>

    <!-- ── SECTION: Provider Logos ── -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">🎮 Game Provider Logos</div>
      <div class="url-provider-grid">
        <div v-for="i in 6" :key="i" class="url-provider-item">
          <div class="url-provider-preview">
            <img :src="form[`provider_logo_${i}`] || DEFAULTS[`provider_logo_${i}`]" :alt="`Provider ${i}`"
              class="url-preview-img" @error="e=>e.target.style.display='none'" />
          </div>
          <div class="url-item-label" style="margin-bottom:3px;">Provider {{ i }}</div>
          <input v-model="form[`provider_logo_${i}`]" class="a-input url-input" :placeholder="`Provider ${i} logo URL...`" />
        </div>
      </div>
    </div>

    <!-- ── SECTION: CS & App Links ── -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">🔗 CS & App Links</div>
      <div v-for="lk in linkFields" :key="lk.key" class="url-link-item">
        <div class="url-item-label">{{ lk.label }}</div>
        <input v-model="form[lk.key]" class="a-input url-input" :placeholder="lk.placeholder" />
      </div>
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

const saving   = ref(false)
const saveMsg  = ref('')
const saveOk   = ref(false)
const loading  = ref(false)
const localToast = reactive({ show: false, msg: '', type: 'info' })

const paymentMethods = [
  { key: 'kpay_img_url',   label: 'KBZ Pay Icon'  },
  { key: 'wave_img_url',   label: 'Wave Money Icon' },
  { key: 'usdt_img_url',   label: 'USDT Icon'       },
  { key: 'uabpay_img_url', label: 'UAB Pay Icon'    },
]

const linkFields = [
  { key: 'cs_telegram',      label: 'Telegram CS Link',     placeholder: 'https://t.me/...' },
  { key: 'cs_livechat_url',  label: 'Live Chat URL',        placeholder: 'https://...' },
  { key: 'cs_control_plus',  label: 'Control+ CS URL',      placeholder: 'https://...' },
  { key: 'install_url',      label: 'App Install URL',       placeholder: 'https://...' },
  { key: 'vip_url',          label: 'VIP Page URL',          placeholder: 'https://...' },
  { key: 'deposit_url',      label: 'Deposit Direct URL',    placeholder: 'https://...' },
  { key: 'withdraw_url',     label: 'Withdraw Direct URL',   placeholder: 'https://...' },
]

const ALL_URL_KEYS = [
  'brand_logo_url',
  'banner_1_url','banner_2_url','banner_3_url','banner_4_url','banner_5_url',
  'kpay_img_url','wave_img_url','usdt_img_url','uabpay_img_url',
  'provider_logo_1','provider_logo_2','provider_logo_3','provider_logo_4','provider_logo_5','provider_logo_6',
  ...linkFields.map(l => l.key),
]

const form = reactive(Object.fromEntries(ALL_URL_KEYS.map(k => [k, ''])))

const urlStats = computed(() => {
  const customized = ALL_URL_KEYS.filter(k => form[k] && form[k] !== DEFAULTS[k]).length
  const linkCount  = linkFields.filter(l => form[l.key]).length
  return [
    { label: 'Customized URLs', num: customized, color: '#4f46e5' },
    { label: 'Image Slots',     num: 15,          color: '#0891b2' },
    { label: 'Links Set',       num: linkCount,   color: '#16a34a' },
  ]
})

function showLocal(msg, type = 'info') {
  Object.assign(localToast, { show: true, msg, type })
  setTimeout(() => { localToast.show = false }, 2800)
}

async function loadAll() {
  loading.value = true
  try {
    const { data, error } = await supabase.rpc('admin_get_settings', { p_key: adminKey.value })
    const src = (data && !error) ? data : {}
    ALL_URL_KEYS.forEach(k => { form[k] = src[k] ?? '' })
  } catch (e) {
    try {
      const { data } = await supabase.from('system_settings').select('key,value').in('key', ALL_URL_KEYS)
      const src = {}; (data || []).forEach(r => { src[r.key] = r.value })
      ALL_URL_KEYS.forEach(k => { form[k] = src[k] ?? '' })
    } catch {}
  } finally { loading.value = false }
}

async function saveAll() {
  saving.value = true; saveMsg.value = ''
  try {
    const payload = {}
    ALL_URL_KEYS.forEach(k => { if (form[k] !== undefined) payload[k] = form[k] || null })
    const { error } = await supabase.rpc('admin_save_settings', {
      p_key: adminKey.value,
      p_settings: payload
    })
    if (error) throw error
    invalidateSettings()
    saveOk.value = true; saveMsg.value = 'Saved!'
    showLocal('URL settings saved ✓', 'success')
    writeAudit('SAVE_URL_SETTINGS', '', `${Object.values(payload).filter(Boolean).length} URLs`)
  } catch (e) {
    saveOk.value = false; saveMsg.value = e.message
    showLocal(e.message, 'error')
  } finally {
    saving.value = false
    setTimeout(() => { saveMsg.value = '' }, 3500)
  }
}

onMounted(loadAll)
</script>

<style scoped>
.url-stats-row { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px; }
.url-stat-card { background:#fff;border-radius:10px;padding:10px;text-align:center; }
.url-stat-num { font-size:22px;font-weight:900;line-height:1; }
.url-stat-lbl { font-size:8.5px;color:#94a3b8;font-weight:600;margin-top:3px; }

.url-action-bar { display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap; }
.url-save-btn { flex-shrink:0; }

.url-item { display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #f1f5f9; }
.url-item:last-child { border-bottom:none; }
.url-item-preview { flex-shrink:0;width:60px;height:40px;border-radius:6px;overflow:hidden;background:#f8fafc;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center; }
.url-preview-img { width:100%;height:100%;object-fit:cover; }
.url-preview-banner { object-fit:cover; }
.url-preview-icon  { object-fit:contain;padding:2px; }
.url-item-fields { flex:1;min-width:0; }
.url-item-label { font-size:11px;font-weight:700;color:#0f172a;margin-bottom:2px; }
.url-item-default { font-size:9px;color:#94a3b8;margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.url-mono { font-family:monospace;color:#64748b; }
.url-input { font-size:10px;padding:6px 8px; }

.url-provider-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:10px; }
.url-provider-item { padding:8px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0; }
.url-provider-preview { width:100%;height:44px;border-radius:6px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;margin-bottom:6px; }

.url-link-item { padding:8px 0;border-bottom:1px solid #f1f5f9; }
.url-link-item:last-child { border-bottom:none; }

.url-toast { position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9999;padding:10px 20px;border-radius:99px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.3);pointer-events:none; }
.url-toast--success { background:#16a34a;color:#fff; }
.url-toast--error   { background:#dc2626;color:#fff; }
.url-toast--info    { background:#0f172a;color:#fff; }
.url-toast-enter-active { animation:utin .3s ease; }
.url-toast-leave-active { animation:utin .2s ease reverse; }
@keyframes utin { from { opacity:0;transform:translateX(-50%) translateY(8px); } to { opacity:1;transform:translateX(-50%) translateY(0); } }
</style>
