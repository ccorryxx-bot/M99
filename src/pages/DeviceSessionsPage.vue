<template>
  <div class="ds-root">
    <!-- Header -->
    <div class="ds-header">
      <button @click="$router.back()" class="ds-back">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="ds-title">စက်ပစ္စည်းသို့ လောဂ်အင်ဝင်ပါ</h1>
      <div class="w-8"></div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="ds-loading">
      <div class="ds-spinner"></div>
    </div>

    <div v-else class="ds-body">
      <!-- User Identity Card -->
      <div class="ds-id-card">
        <img src="https://ik.imagekit.io/rbok01qam/Brand%20Logo%20/IMG_20260605_215459.png?tr=f-auto" alt="NovaBett" style="height:26px;width:auto;object-fit:contain;display:block;" />
        <div class="ds-id-row">
          <span class="ds-id-label">ID:</span>
          <span class="ds-id-val">{{ shortId }}</span>
          <span class="ds-id-sep"></span>
          <span class="ds-id-label">အကောင့်:</span>
          <span class="ds-id-val">{{ username }}</span>
        </div>
      </div>

      <!-- Current Login Section -->
      <div class="ds-section-label">လက်ရှိ စက်ပစ္စည်း</div>

      <div class="ds-device-card">
        <div class="ds-device-icon-wrap">
          <div class="ds-device-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>

        <div class="ds-info-table">
          <div class="ds-row">
            <span class="ds-label">ကိရိယာ အမျိုး</span>
            <span class="ds-val">{{ info.device_type }}</span>
          </div>
          <div class="ds-row">
            <span class="ds-label">ဗားရှင်း</span>
            <span class="ds-val">{{ info.version }}</span>
          </div>
          <div class="ds-row">
            <span class="ds-label">ဘောင်ဆာ</span>
            <span class="ds-val">{{ info.browser }}</span>
          </div>
          <div class="ds-row">
            <span class="ds-label">စနစ်</span>
            <span class="ds-val">{{ info.os }}</span>
          </div>
          <div class="ds-row" style="align-items:flex-start;">
            <span class="ds-label">IP လိပ်စာ</span>
            <span class="ds-val ip-multi">{{ info.ipFull || (ipLoading ? 'ရယူနေသည်...' : '—') }}</span>
          </div>
          <div class="ds-row">
            <span class="ds-label">ဝင်ရောက်ချိန်</span>
            <span class="ds-val">{{ info.loginTime }}</span>
          </div>
        </div>
      </div>

      <!-- Past sessions -->
      <template v-if="history.length > 1">
        <div class="ds-section-label">မကြာသေးမီ ဝင်ရောက်မှုများ</div>
        <div class="ds-device-card" style="padding:10px 14px;">
          <div v-for="(s, i) in history.slice(1, 5)" :key="i" class="ds-hist-row">
            <div class="ds-hist-icon">
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="ds-hist-info">
              <span class="ds-hist-browser">{{ s.browser }} · {{ s.os }}</span>
              <span class="ds-hist-time">{{ s.loginTime }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'

const loading = ref(true)
const ipLoading = ref(true)
const username = ref('—')
const shortId = ref('—')
const history = ref([])
const info = ref({
  device_type: 'H5',
  version: '—',
  browser: '—',
  os: '—',
  ip: '—',
  ipFull: '',
  loginTime: '—',
})

function detectDevice() {
  const ua = navigator.userAgent

  let os = 'Unknown'
  if (/Android/i.test(ua)) os = 'Android'
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'
  else if (/Windows NT/i.test(ua)) os = 'Windows'
  else if (/Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Linux/i.test(ua)) os = 'Linux'
  else if (/CrOS/i.test(ua)) os = 'ChromeOS'

  let browser = 'Unknown'
  let version = 'v1.0'
  const edgeM = ua.match(/Edg(?:e|A|iOS)?\/(\d+[\d.]+)/)
  const samsungM = ua.match(/SamsungBrowser\/(\d+[\d.]+)/)
  const chromeM = ua.match(/(?:Chrome|CriOS)\/(\d+[\d.]+)/)
  const ffM = ua.match(/Firefox\/(\d+[\d.]+)/)
  const safariM = ua.match(/Version\/(\d+[\d.]+).*Safari/)

  if (edgeM) { browser = `Edge/${edgeM[1]}`; version = `v${edgeM[1]}` }
  else if (samsungM) { browser = `Samsung/${samsungM[1]}`; version = `v${samsungM[1]}` }
  else if (chromeM) { browser = `Chrome/${chromeM[1]}`; version = `v${chromeM[1]}` }
  else if (ffM) { browser = `Firefox/${ffM[1]}`; version = `v${ffM[1]}` }
  else if (safariM) { browser = `Safari/${safariM[1]}`; version = `v${safariM[1]}` }

  return { os, browser, version, device_type: 'H5' }
}

function formatTime(ts) {
  const d = ts ? new Date(ts) : new Date()
  const local = new Date(d.getTime() + 6.5 * 3600 * 1000)
  const pad = n => String(n).padStart(2, '0')
  return `UTC+06:30 ${local.getUTCFullYear()}-${pad(local.getUTCMonth()+1)}-${pad(local.getUTCDate())} ${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}:${pad(local.getUTCSeconds())}`
}

onMounted(async () => {
  try {
    const { data: { session: authSession } } = await supabase.auth.getSession()
    if (!authSession) { loading.value = false; return }

    const user = authSession.user
    const uname = user.user_metadata?.username ||
      user.email?.replace('@novabett.internal', '') || '—'
    username.value = uname
    shortId.value = user.id?.slice(0, 8).toUpperCase() || '—'

    const device = detectDevice()
    const loginTime = formatTime()

    info.value = { ...device, ip: '—', ipFull: '', loginTime }
    loading.value = false

    // ── Fetch history from Supabase ───────────────────────────────
    const { data: rows } = await supabase
      .from('login_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('login_at', { ascending: false })
      .limit(10)

    history.value = (rows || []).map(r => ({
      device_type: r.device_type || 'H5',
      version:     r.app_version || '—',
      browser:     r.browser     || '—',
      os:          r.os          || '—',
      ip:          r.ip_address  || '—',
      ipFull:      r.ip_info     || r.ip_address || '—',
      loginTime:   r.login_at ? formatTime(r.login_at) : '—',
    }))

    // ── Insert this session (without IP first) ────────────────────
    const { data: inserted } = await supabase
      .from('login_sessions')
      .insert({
        user_id:      user.id,
        username:     uname,
        device_type:  device.device_type,
        app_version:  device.version,
        browser:      device.browser,
        os:           device.os,
        ip_address:   '—',
        ip_info:      '',
      })
      .select('id')
      .single()

    // Prepend current session to history list
    const currentEntry = { ...device, ip: '—', ipFull: '', loginTime }
    history.value = [currentEntry, ...history.value]

    // ── Fetch IP async, then update row ───────────────────────────
    ipLoading.value = true
    try {
      const r = await fetch('https://ipapi.co/json/')
      if (r.ok) {
        const d = await r.json()
        const ip     = d.ip           || '—'
        const org    = d.org          || ''
        const region = d.region       || ''
        const country= d.country_name || ''
        const ipFull = `${ip} ${country}/${region} ${org}`.trim()

        info.value.ip     = ip
        info.value.ipFull = ipFull
        if (history.value[0]) {
          history.value[0].ip     = ip
          history.value[0].ipFull = ipFull
        }

        // Update the inserted row with real IP
        if (inserted?.id) {
          await supabase.from('login_sessions')
            .update({ ip_address: ip, ip_info: ipFull })
            .eq('id', inserted.id)
        }
      }
    } catch (_) {
      try {
        const r2 = await fetch('https://api64.ipify.org?format=json')
        if (r2.ok) {
          const d2 = await r2.json()
          info.value.ip     = d2.ip || '—'
          info.value.ipFull = d2.ip || '—'
          if (inserted?.id) {
            await supabase.from('login_sessions')
              .update({ ip_address: d2.ip || '—', ip_info: d2.ip || '—' })
              .eq('id', inserted.id)
          }
        }
      } catch (_) {}
    } finally {
      ipLoading.value = false
    }
  } catch (e) {
    console.error(e)
    loading.value = false
  }
})
</script>

<style scoped>
.ds-root {
  min-height: 100dvh;
  background: #3d4187;
  display: flex;
  flex-direction: column;
}
.ds-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  padding-top: max(14px, env(safe-area-inset-top));
}
.ds-back {
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.06);
  border-radius: 50%;
  color: #fff;
}
.ds-title {
  font-size: 14.5px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.2px;
}
.ds-loading {
  flex: 1; display: flex; align-items: center; justify-content: center;
}
.ds-spinner {
  width: 30px; height: 30px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: #f59e0b;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.ds-body {
  flex: 1;
  padding: 6px 14px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
/* ID Card */
.ds-id-card {
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ds-logo-text {
  font-size: 24px;
  font-weight: 900;
  color: #fff;
  letter-spacing: 3px;
}
.ds-id-row {
  display: flex; align-items: center; gap: 5px; flex-wrap: wrap; justify-content: center;
}
.ds-id-label { font-size: 12px; color: rgba(255,255,255,0.4); }
.ds-id-val { font-size: 12px; color: #fff; font-weight: 600; }
.ds-id-sep { width: 1px; height: 12px; background: rgba(255,255,255,0.12); margin: 0 6px; }
/* Section label */
.ds-section-label {
  font-size: 11.5px;
  color: rgba(255,255,255,0.35);
  padding-left: 2px;
  letter-spacing: 0.3px;
}
/* Device card */
.ds-device-card {
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 14px 16px;
}
.ds-device-icon-wrap {
  margin-bottom: 12px;
}
.ds-device-icon {
  width: 42px; height: 42px;
  background: rgba(99,102,241,0.15);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #818cf8;
}
/* Info table */
.ds-info-table { display: flex; flex-direction: column; gap: 0; }
.ds-row {
  display: flex;
  align-items: center;
  padding: 9px 0;
}
.ds-row + .ds-row {
  border-top: 1px solid rgba(255,255,255,0.05);
}
.ds-label {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  width: 90px;
  flex-shrink: 0;
}
.ds-val {
  font-size: 12.5px;
  color: #e5e7eb;
  font-weight: 500;
  flex: 1;
}
.ip-multi {
  font-size: 11.5px;
  line-height: 1.5;
  word-break: break-all;
}
/* History */
.ds-hist-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
}
.ds-hist-row + .ds-hist-row {
  border-top: 1px solid rgba(255,255,255,0.05);
}
.ds-hist-icon {
  width: 28px; height: 28px;
  background: rgba(100,116,139,0.15);
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  color: #94a3b8;
  flex-shrink: 0;
}
.ds-hist-info {
  display: flex; flex-direction: column; gap: 2px;
}
.ds-hist-browser { font-size: 11.5px; color: rgba(255,255,255,0.7); font-weight: 500; }
.ds-hist-time { font-size: 10.5px; color: rgba(255,255,255,0.3); }
</style>
