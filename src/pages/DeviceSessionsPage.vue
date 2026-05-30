<template>
  <div class="ds-root">
    <!-- Header -->
    <div class="ds-header">
      <button @click="$router.back()" class="ds-back">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="ds-title">စက်ပစ္စည်း လောဂ်အင်မှတ်တမ်း</h1>
      <div class="w-8"></div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="ds-loading">
      <div class="ds-spinner"></div>
    </div>

    <div v-else class="ds-body">
      <!-- User Identity Card -->
      <div class="ds-id-card">
        <div class="ds-logo-row">
          <span class="ds-logo-text">NOVA<span style="color:#f59e0b;">BET</span></span>
        </div>
        <div class="ds-id-row">
          <span class="ds-id-label">ID:</span>
          <span class="ds-id-val">{{ userId }}</span>
          <span class="ds-id-label" style="margin-left:16px;">အကောင့်:</span>
          <span class="ds-id-val">{{ username }}</span>
        </div>
      </div>

      <!-- Current Device Section -->
      <div class="ds-section-label">လက်ရှိ ဝင်ရောက်မှု</div>

      <div class="ds-device-card" v-if="session">
        <div class="ds-device-icon-row">
          <div class="ds-device-icon">
            <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>

        <table class="ds-table">
          <tbody>
            <tr>
              <td class="ds-td-label">ကိရိယာ ကွာ</td>
              <td class="ds-td-val">{{ session.device_type || 'H5' }}</td>
            </tr>
            <tr>
              <td class="ds-td-label">ဗားရှင်း</td>
              <td class="ds-td-val">{{ session.app_version || '—' }}</td>
            </tr>
            <tr>
              <td class="ds-td-label">ဘောင်ဆာ</td>
              <td class="ds-td-val">{{ session.browser || '—' }}</td>
            </tr>
            <tr>
              <td class="ds-td-label">စနစ်</td>
              <td class="ds-td-val">{{ session.os || '—' }}</td>
            </tr>
            <tr>
              <td class="ds-td-label">IP လိပ်စာ</td>
              <td class="ds-td-val ip-val">{{ session.ip_info || session.ip_address || '—' }}</td>
            </tr>
            <tr>
              <td class="ds-td-label">လောဂ်အင် အချိန်</td>
              <td class="ds-td-val">{{ formatTime(session.login_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Error state -->
      <div v-else class="ds-empty">
        <p style="color:rgba(255,255,255,0.4);font-size:13px;">Session အချက်အလက် မရှိသေးပါ</p>
        <p style="color:rgba(255,255,255,0.25);font-size:11px;margin-top:6px;">ထပ်မံ ဝင်ရောက်ပါ</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const loading = ref(true)
const session = ref(null)
const username = ref('—')
const userId = ref('—')

function detectDevice() {
  const ua = navigator.userAgent
  let os = 'Unknown'
  if (/Android/i.test(ua)) os = 'Android'
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'
  else if (/Windows/i.test(ua)) os = 'Windows'
  else if (/Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Linux/i.test(ua)) os = 'Linux'

  let browser = 'Unknown'
  const edgeM = ua.match(/Edg(?:e|\/)([\d.]+)/)
  const chromeM = ua.match(/(?:Chrome|CriOS)\/([\d.]+)/)
  const ffM = ua.match(/Firefox\/([\d.]+)/)
  const safM = ua.match(/Version\/([\d.]+).*Safari/)
  if (edgeM) browser = `Edge/${edgeM[1]}`
  else if (chromeM) browser = `Chrome/${chromeM[1]}`
  else if (ffM) browser = `Firefox/${ffM[1]}`
  else if (safM) browser = `Safari/${safM[1]}`

  const verM = ua.match(/(?:Chrome|CriOS)\/([\d.]+)/) ||
               ua.match(/Firefox\/([\d.]+)/) ||
               ua.match(/Version\/([\d.]+)/)
  const version = verM ? `v${verM[1]}` : 'v1.0'

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua)
  return { device_type: 'H5', os, browser, app_version: version }
}

function formatTime(ts) {
  if (!ts) return '—'
  const d = new Date(ts)
  const off = '+06:30'
  const local = new Date(d.getTime() + 6.5 * 60 * 60 * 1000)
  const yyyy = local.getUTCFullYear()
  const mm = String(local.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(local.getUTCDate()).padStart(2, '0')
  const hh = String(local.getUTCHours()).padStart(2, '0')
  const mi = String(local.getUTCMinutes()).padStart(2, '0')
  const ss = String(local.getUTCSeconds()).padStart(2, '0')
  return `UTC${off} ${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
}

onMounted(async () => {
  try {
    const { data: { session: authSession } } = await supabase.auth.getSession()
    if (!authSession) { loading.value = false; return }

    const user = authSession.user
    username.value = user.user_metadata?.username ||
      user.email?.replace('@novabett.internal', '') || '—'
    userId.value = user.id?.slice(0, 8).toUpperCase() || '—'

    const token = authSession.access_token
    const deviceInfo = detectDevice()

    // Call track-session edge function
    try {
      const res = await fetch(
        'https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/track-session',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'apikey': 'sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deviceInfo),
        }
      )
      const json = await res.json()
      if (json.data) {
        session.value = json.data
      } else {
        // Edge function not deployed yet — show local device info
        session.value = {
          ...deviceInfo,
          ip_address: '—',
          ip_info: '—',
          login_at: new Date().toISOString(),
        }
      }
    } catch (_) {
      // Offline or function not deployed — show local info
      session.value = {
        ...deviceInfo,
        ip_address: '—',
        ip_info: '—',
        login_at: new Date().toISOString(),
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.ds-root {
  min-height: 100dvh;
  background: #0f1117;
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
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.3px;
}
.ds-loading {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
}
.ds-spinner {
  width: 32px; height: 32px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: #f59e0b;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.ds-body {
  flex: 1;
  padding: 8px 14px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ds-id-card {
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.ds-logo-row { display: flex; align-items: center; }
.ds-logo-text {
  font-size: 22px;
  font-weight: 900;
  color: #fff;
  letter-spacing: 2px;
}
.ds-id-row {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}
.ds-id-label { font-size: 12px; color: rgba(255,255,255,0.4); }
.ds-id-val { font-size: 12px; color: #fff; font-weight: 600; }
.ds-section-label {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  padding-left: 2px;
}
.ds-device-card {
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 16px;
}
.ds-device-icon-row {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.ds-device-icon {
  width: 44px; height: 44px;
  background: rgba(99,102,241,0.15);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #818cf8;
}
.ds-table { width: 100%; border-collapse: collapse; }
.ds-table tr td { padding: 8px 0; vertical-align: top; }
.ds-td-label {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  width: 110px;
  padding-right: 12px;
  white-space: nowrap;
}
.ds-td-val {
  font-size: 12px;
  color: #fff;
  font-weight: 500;
  word-break: break-all;
}
.ip-val { font-size: 11.5px; }
.ds-empty {
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  padding: 32px 16px;
  text-align: center;
}
</style>
