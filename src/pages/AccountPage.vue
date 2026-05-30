<template>
  <div class="nova-acc-root">

    <!-- ══ HEADER ══ -->
    <header class="nova-acc-header">
      <button @click="$router.back()" class="nova-icon-btn">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="flex items-center gap-2">
        <button class="nova-icon-btn">
          <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </button>
        <button class="nova-icon-btn relative">
          <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span class="notif-dot">3</span>
        </button>
      </div>
    </header>

    <div class="nova-acc-body">

      <!-- ══ PROFILE ROW ══ -->
      <div class="profile-row">
        <div class="avatar-wrap">
          <div class="avatar-circle">
            <span>{{ username.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="vip-badge-pill" :style="vipBadgeBg">V{{ vipLevel }}</div>
        </div>
        <div class="profile-info">
          <div class="flex items-center gap-1.5">
            <span class="profile-username">{{ username }}</span>
            <button @click="copyText(username)" class="copy-btn">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-1 mt-0.5">
            <span class="profile-id">ID: {{ gameId }}</span>
            <button @click="copyText(gameId)" class="copy-btn">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="balance-area">
          <div class="flex items-center gap-1">
            <span style="font-size:13px;">🇲🇲</span>
            <span class="balance-amount">{{ formatCurrency(mainBalance) }}</span>
            <button @click="fetchWallet" class="refresh-btn">
              <svg class="w-3.5 h-3.5" :class="{ 'spin-icon': refreshing }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ══ ACTION BUTTONS ══ -->
      <div class="action-row">
        <button @click="$router.push('/home')" class="action-btn">
          <div class="action-icon" style="background:rgba(245,158,11,0.18);border-color:rgba(245,158,11,0.38);">
            <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <span class="action-label">ငွေထုတ်ရန်</span>
        </button>
        <button @click="$router.push('/home')" class="action-btn">
          <div class="action-icon" style="background:rgba(14,165,233,0.18);border-color:rgba(14,165,233,0.38);">
            <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
            </svg>
          </div>
          <span class="action-label">ငွေသွင်းရန်</span>
        </button>
      </div>

      <!-- ══ VIP CARD ══ -->
      <div class="vip-card">
        <div class="vip-shimmer"></div>
        <div class="vip-inner">
          <div class="vip-lvl-badge">
            <span class="text-xs font-black text-white">V{{ vipLevel }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-bold text-yellow-900">ပရိမိုးရှင်း ဘောနပ်</span>
              <span class="text-xs font-semibold text-yellow-900">{{ nextBonus }}%</span>
            </div>
            <div class="vip-bar-track">
              <div class="vip-bar-fill" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div class="flex justify-between mt-1">
              <span class="vip-meta">{{ formatCurrency(deposited) }}/{{ formatCurrency(nextLevelTarget) }}</span>
              <span class="vip-meta font-semibold">VIP {{ nextLevel }} → {{ formatCurrency(remaining) }} ကျပ်</span>
            </div>
          </div>
          <svg class="w-4 h-4 flex-shrink-0" style="color:rgba(92,65,0,0.5);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      <!-- ══ MENU BLOCK 1 ══ -->
      <div class="menu-block">
        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(251,146,60,0.14);">
            <svg class="w-[15px] h-[15px] text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <div class="flex-1 text-left">
            <p class="m-title">ငါ့မတ်တမ်း</p>
            <p class="m-sub">အသေးစိတ်၊ လောင်းကစား၊ အတိုရ၊ လက်ကျန်</p>
          </div>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(239,68,68,0.12);">
            <svg class="w-[15px] h-[15px] text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title">ငွေထုတ်စီမံခန့်ခွဲမှု</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- ══ MENU BLOCK 2 ══ -->
      <div class="menu-block">
        <button @click="$router.push('/agent')" class="menu-row">
          <div class="m-icon" style="background:rgba(245,158,11,0.14);">
            <svg class="w-[15px] h-[15px] text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title">အေးဂျင့်</p>
          <span class="text-[11px] font-bold mr-1" style="color:#f59e0b;">တစ်လဝင်ငွေ တစ်သန်း</span>
          <svg class="w-[15px] h-[15px] flex-shrink-0" style="color:#f59e0b;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(99,102,241,0.13);">
            <svg class="w-[15px] h-[15px] text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title">ကိုယ်ရေးအချက်အလက်များ</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(34,197,94,0.12);">
            <svg class="w-[15px] h-[15px] text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title">လုံခြုံရေးစင်တာ</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(14,165,233,0.13);">
            <svg class="w-[15px] h-[15px] text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title">ဘာသာစကား</p>
          <span class="text-[11px] text-gray-400 mr-1">မြန်မာဘာသာ</span>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(168,85,247,0.13);">
            <svg class="w-[15px] h-[15px] text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title">တောက်သည်ဝန်ဆောင်မှု</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(20,184,166,0.13);">
            <svg class="w-[15px] h-[15px] text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title">အကြံပေးချုပ်</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(100,116,139,0.14);">
            <svg class="w-[15px] h-[15px] text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title">စက်ပစ္စည်းသို့ ဝင်ရောက်ပါ</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button @click="logout" class="menu-row">
          <div class="m-icon" style="background:rgba(239,68,68,0.12);">
            <svg class="w-[15px] h-[15px] text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </div>
          <p class="flex-1 text-left m-title" style="color:#f87171;">အကောင့်ထွက်ရန်</p>
          <svg class="m-arr" style="color:#f87171;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const username = ref(localStorage.getItem('sb_username') || 'PLAYER')
const gameId = ref('')
const mainBalance = ref(0)
const bonusBalance = ref(0)
const refreshing = ref(false)

async function fetchWallet() {
  try {
    refreshing.value = true
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    gameId.value = user.id.substring(0, 9).toUpperCase()
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('main_balance, bonus_balance')
      .eq('user_id', user.id)
      .single()
    if (wallet && !error) {
      mainBalance.value = wallet.main_balance
      bonusBalance.value = wallet.bonus_balance
      await fetchTotalDeposited(user.id)
    }
  } catch (e) { /* silent */ } finally {
    setTimeout(() => { refreshing.value = false }, 500)
  }
}

const deposited = ref(0)
async function fetchTotalDeposited(userId) {
  const { data } = await supabase
    .from('transactions')
    .select('amount')
    .eq('user_id', userId)
    .eq('type', 'deposit')
    .eq('status', 'confirmed')
  if (data) deposited.value = data.reduce((sum, tx) => sum + Number(tx.amount), 0)
}

onMounted(() => {
  fetchWallet()
  setInterval(fetchWallet, 5000)
})

const vipLevelThresholds = [0, 10000, 40000, 60000, 80000, 100000, 150000, 200000, 300000, 500000]
const vipLevel = computed(() => {
  let lvl = 1
  for (let i = 0; i < vipLevelThresholds.length; i++) {
    if (deposited.value >= vipLevelThresholds[i]) lvl = i + 1
  }
  return Math.min(lvl, 10)
})
const vipLevels = { 1: 10000, 2: 40000, 3: 60000, 4: 80000, 5: 100000, 6: 150000, 7: 200000, 8: 300000, 9: 500000, 10: Infinity }
const nextLevel = computed(() => Math.min(vipLevel.value + 1, 10))
const nextLevelTarget = computed(() => vipLevels[nextLevel.value] || 0)
const remaining = computed(() => Math.max(0, nextLevelTarget.value - deposited.value))
const progressPercent = computed(() => {
  if (nextLevelTarget.value === Infinity) return 100
  const prevTarget = vipLevels[vipLevel.value] || 0
  return Math.min(100, Math.max(0, Math.round((deposited.value - prevTarget) / (nextLevelTarget.value - prevTarget) * 100)))
})
const nextBonus = computed(() => {
  const bonuses = { 1: 10, 2: 30, 3: 40, 4: 50, 5: 55, 6: 60, 7: 70, 8: 80, 9: 100, 10: 120 }
  return bonuses[nextLevel.value] || 0
})
const vipBadgeBg = computed(() => {
  const g = {
    1: 'background:linear-gradient(135deg,#6b7280,#9ca3af)',
    2: 'background:linear-gradient(135deg,#16a34a,#22c55e)',
    3: 'background:linear-gradient(135deg,#1d4ed8,#3b82f6)',
    4: 'background:linear-gradient(135deg,#7c3aed,#a855f7)',
    5: 'background:linear-gradient(135deg,#ca8a04,#facc15)',
    6: 'background:linear-gradient(135deg,#dc2626,#f87171)',
    7: 'background:linear-gradient(135deg,#0e7490,#22d3ee)',
    8: 'background:linear-gradient(135deg,#475569,#cbd5e1)',
    9: 'background:linear-gradient(135deg,#b45309,#fde68a)',
    10: 'background:linear-gradient(135deg,#d97706,#fbbf24)',
  }
  return (g[vipLevel.value] || g[1]) + ';color:#fff;'
})

const formatCurrency = (num) => new Intl.NumberFormat('en-US').format(num || 0)
const copyText = async (text) => { try { await navigator.clipboard.writeText(text) } catch {} }
const logout = async () => {
  await supabase.auth.signOut()
  ;['sb_token', 'sb_refresh', 'sb_username', 'avatarIndex'].forEach(k => localStorage.removeItem(k))
  window.location.href = '/home'
}
const comingSoon = () => alert('Coming Soon')
</script>

<style scoped>
.nova-acc-root {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  background: linear-gradient(160deg, #08102a 0%, #0d1a36 20%, #0c1828 40%, #091420 60%, #07101a 80%, #050c14 100%);
  color: #fff;
  overscroll-behavior: contain;
  -webkit-tap-highlight-color: transparent;
}

/* ── Header ── */
.nova-acc-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(8,16,42,0.9);
  backdrop-filter: blur(20px);
}
.nova-icon-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.07);
  cursor: pointer;
  transition: transform 0.1s;
}
.nova-icon-btn:active { transform: scale(0.9); }
.notif-dot {
  position: absolute; top: -3px; right: -3px;
  width: 15px; height: 15px;
  background: #ef4444; border-radius: 50%;
  font-size: 8px; font-weight: 700; color: #fff;
  display: flex; align-items: center; justify-content: center;
}

/* ── Body ── */
.nova-acc-body {
  flex: 1;
  padding: 10px 12px 96px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ── Profile row ── */
.profile-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  background: rgba(255,255,255,0.05);
  border-radius: 14px;
  backdrop-filter: blur(12px);
}
.avatar-wrap { position: relative; flex-shrink: 0; }
.avatar-circle {
  width: 46px; height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg,#22c55e,#0ea5e9);
  display: flex; align-items: center; justify-content: center;
  font-size: 19px; font-weight: 900; color: #fff;
}
.vip-badge-pill {
  position: absolute; bottom: -3px; right: -4px;
  padding: 1.5px 5px;
  border-radius: 5px;
  font-size: 8px; font-weight: 900; color: #fff;
  line-height: 1.4;
}
.profile-info { flex: 1; min-width: 0; }
.profile-username { font-size: 13px; font-weight: 700; color: #fff; }
.profile-id { font-size: 10px; color: #9ca3af; font-family: monospace; }
.copy-btn {
  color: #6b7280; cursor: pointer;
  background: none; border: none; padding: 0;
  display: inline-flex; align-items: center;
  transition: transform 0.1s;
}
.copy-btn:active { transform: scale(0.72); }
.balance-area { flex-shrink: 0; }
.balance-amount { font-size: 14px; font-weight: 900; color: #67e8f9; }
.refresh-btn {
  width: 20px; height: 20px;
  background: rgba(34,197,94,0.1);
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; color: #4ade80;
  transition: transform 0.1s;
}
.refresh-btn:active { transform: scale(0.85); }

/* ── Action buttons ── */
.action-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.action-btn {
  display: flex; align-items: center; gap: 9px;
  padding: 9px 12px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  cursor: pointer;
  transition: transform 0.12s;
}
.action-btn:active { transform: scale(0.97); }
.action-icon {
  width: 34px; height: 34px;
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.action-label { font-size: 12px; font-weight: 700; color: #fff; }

/* ── VIP card ── */
.vip-card {
  position: relative; overflow: hidden;
  border-radius: 14px; padding: 12px;
  background: linear-gradient(135deg,#b8860b 0%,#f5d060 35%,#d4950a 65%,#b07d10 100%);
}
.vip-shimmer {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.18) 50%,transparent 70%);
}
.vip-inner { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }
.vip-lvl-badge {
  width: 38px; height: 38px; border-radius: 9px;
  background: rgba(0,0,0,0.25);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.vip-bar-track { height: 6px; border-radius: 999px; background: rgba(0,0,0,0.2); overflow: hidden; }
.vip-bar-fill { height: 100%; border-radius: 999px; background: rgba(255,255,255,0.8); transition: width 0.4s ease; }
.vip-meta { font-size: 9.5px; color: rgba(92,55,0,0.82); }

/* ── Menu blocks ── */
.menu-block {
  border-radius: 14px; overflow: hidden;
  background: rgba(255,255,255,0.04);
}
.menu-row {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 12px; width: 100%; cursor: pointer;
  transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.menu-row:active { background: rgba(255,255,255,0.04); }
.m-icon {
  width: 30px; height: 30px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.m-title { font-size: 13px; font-weight: 600; color: #fff; }
.m-sub { font-size: 9.5px; color: #6b7280; margin-top: 1px; }
.m-arr { width: 14px; height: 14px; color: #6b7280; flex-shrink: 0; }

/* Spin */
@keyframes nova-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.spin-icon { animation: nova-spin 0.7s linear infinite; }
</style>
