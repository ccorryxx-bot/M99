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
          <!-- NFT Avatar (from HomePage) -->
          <NftAvatar :seed="username" :size="54" />
          <div class="vip-badge-pill" :style="vipBadgeBg">V{{ vipLevel }}</div>
        </div>
        <div class="profile-info">
          <div class="flex items-center gap-2">
            <span class="profile-username">{{ username }}</span>
            <button @click="copyText(username)" class="copy-btn">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span class="profile-id">ID: {{ gameId }}</span>
            <button @click="copyText(gameId)" class="copy-btn copy-btn--id">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="balance-area">
          <div class="flex items-center gap-1">
            <NftAvatar :seed="username" :size="22" />
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
        <button @click="$router.push('/home')" class="action-flat-btn">
          <div class="action-flat-icon">
            <svg width="22" height="22" fill="none" stroke="#4ade80" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <span class="action-flat-lbl">ငွေထုတ်ရန်</span>
        </button>
        <button @click="$router.push('/home')" class="action-flat-btn">
          <div class="action-flat-icon">
            <svg width="22" height="22" fill="none" stroke="#4ade80" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
            </svg>
          </div>
          <span class="action-flat-lbl">ငွေသွင်းရန်</span>
        </button>
      </div>

      <!-- ══ VIP CARD ══ -->
      <div class="vip-card">
        <div class="vip-shimmer"></div>
        <!-- Top row -->
        <div class="vip-top-row">
          <div class="vip-lvl-badge">
            <span class="vip-badge-txt">VIP{{ vipLevel }}</span>
          </div>
          <div class="flex-1 min-w-0 pl-3">
            <div class="flex flex-wrap items-baseline gap-x-1">
              <span class="vip-top-label">လက်ကျန် </span>
              <span class="vip-top-accent">VIP{{ nextLevel }}</span>
              <span class="vip-top-label"> အားပြန်သင့်ရန် </span>
              <span class="vip-top-bold">{{ formatCurrency(nextLevelTarget) }}</span>
              <span class="vip-top-label"> လောင်းကြေး အတွက်</span>
            </div>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="vip-top-label">အတွက် </span>
              <span class="vip-top-bold">{{ formatCurrency(nextLevelMaxDeposit) }}</span>
            </div>
          </div>
          <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2" viewBox="0 0 24 24" class="flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <!-- Divider -->
        <div class="vip-divider"></div>
        <!-- Progress rows -->
        <div class="vip-prog-wrap">
          <!-- Row 1: deposit toward next level -->
          <div class="vip-prog-row">
            <div class="vip-coin-badge">
              <span style="font-size:11px;font-weight:900;color:#fbbf24;">{{ vipLevel }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <span class="vip-prog-lbl">ပရိမိုးရှင်းအတွက် အားပြန်သင့်ဗုဒ္ဓ</span>
                <span class="vip-prog-val">{{ formatCurrency(deposited) }}/ {{ formatCurrency(nextLevelTarget) }}</span>
              </div>
              <div class="vip-bar-track">
                <div class="vip-bar-fill" :style="{ width: progressPercent + '%' }"></div>
              </div>
            </div>
          </div>
          <!-- Row 2: bonus % info -->
          <div class="vip-prog-row" style="margin-top:10px;">
            <div style="width:28px;"></div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <span class="vip-prog-lbl">ပရိမိုးရှင်းအတွက် လောင်းကြေး</span>
                <span class="vip-prog-val">{{ formatCurrency(deposited) }}/ {{ formatCurrency(nextLevelMaxDeposit) }}</span>
              </div>
              <div class="vip-bar-track">
                <div class="vip-bar-fill2" :style="{ width: wagProgressPercent + '%' }"></div>
              </div>
            </div>
          </div>
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

        <button @click="$router.push('/device-sessions')" class="menu-row">
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
import NftAvatar from '@/components/NftAvatar.vue'

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
  loadVipLevels()
  setInterval(fetchWallet, 5000)
  // Real-time VIP updates
  supabase.channel('vip-levels-watch')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'vip_levels' }, () => loadVipLevels())
    .subscribe()
})

// ── VIP levels from Supabase ───────────────────────────────────
const vipLevelsData = ref([])

async function loadVipLevels() {
  const { data } = await supabase.from('vip_levels').select('*').order('level')
  if (data) vipLevelsData.value = data
}

const vipLevel = computed(() => {
  if (!vipLevelsData.value.length) {
    // fallback until loaded
    const thresholds = [0,10000,40000,60000,80000,100000,150000,200000,300000,500000]
    let lvl = 1
    thresholds.forEach((t,i) => { if (deposited.value >= t) lvl = i + 1 })
    return Math.min(lvl, 10)
  }
  let lvl = 1
  vipLevelsData.value.forEach(row => {
    if (deposited.value >= Number(row.min_deposit)) lvl = row.level
  })
  return lvl
})

const nextLevel = computed(() => {
  const max = vipLevelsData.value.length || 10
  return Math.min(vipLevel.value + 1, max)
})

const nextLevelRow = computed(() =>
  vipLevelsData.value.find(r => r.level === nextLevel.value) || null
)

const nextLevelTarget = computed(() =>
  nextLevelRow.value ? Number(nextLevelRow.value.min_deposit) : 10000
)

const nextLevelMaxDeposit = computed(() =>
  nextLevelRow.value ? Number(nextLevelRow.value.max_deposit) : 40000
)

const remaining = computed(() => Math.max(0, nextLevelTarget.value - deposited.value))

const progressPercent = computed(() => {
  const currentRow = vipLevelsData.value.find(r => r.level === vipLevel.value)
  const prevTarget = currentRow ? Number(currentRow.min_deposit) : 0
  const span = nextLevelTarget.value - prevTarget
  if (!span) return 100
  return Math.min(100, Math.max(0, Math.round((deposited.value - prevTarget) / span * 100)))
})

const wagProgressPercent = computed(() => {
  if (!nextLevelMaxDeposit.value) return 0
  return Math.min(100, Math.max(0, Math.round(deposited.value / nextLevelMaxDeposit.value * 100)))
})

const nextBonus = computed(() =>
  nextLevelRow.value ? Number(nextLevelRow.value.recurring_deposit_bonus_pct) : 10
)

const vipBadgeBg = computed(() => {
  const glowMap = {
    Silver:   'linear-gradient(135deg,#6b7280,#9ca3af)',
    Green:    'linear-gradient(135deg,#16a34a,#22c55e)',
    Blue:     'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    Purple:   'linear-gradient(135deg,#7c3aed,#a855f7)',
    Gold:     'linear-gradient(135deg,#ca8a04,#facc15)',
    Red:      'linear-gradient(135deg,#dc2626,#f87171)',
    Diamond:  'linear-gradient(135deg,#0e7490,#22d3ee)',
    Platinum: 'linear-gradient(135deg,#475569,#cbd5e1)',
    Master:   'linear-gradient(135deg,#b45309,#fde68a)',
    Royal:    'linear-gradient(135deg,#d97706,#fbbf24)',
  }
  const currentRow = vipLevelsData.value.find(r => r.level === vipLevel.value)
  const glow = currentRow?.glow_color || 'Silver'
  return `background:${glowMap[glow] || glowMap.Silver};color:#fff;`
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
  padding: 6px 4px;
}
.avatar-wrap { position: relative; flex-shrink: 0; }

/* NFT Avatar handled by NftAvatar component */
.vip-badge-pill {
  position: absolute; bottom: -3px; right: -4px;
  padding: 1.5px 5px;
  border-radius: 5px;
  font-size: 8px; font-weight: 900; color: #fff;
  line-height: 1.4;
}
.profile-info { flex: 1; min-width: 0; }
.profile-username { font-size: 15px; font-weight: 800; color: #ffffff; letter-spacing: 0.02em; }
.profile-id { font-size: 13px; color: #e2e8f0; font-family: monospace; font-weight: 600; letter-spacing: 0.03em; }
.copy-btn {
  color: #94a3b8; cursor: pointer;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 6px;
  padding: 4px 6px;
  display: inline-flex; align-items: center;
  transition: transform 0.1s, background 0.15s;
  min-width: 30px; min-height: 28px; justify-content: center;
}
.copy-btn:active { transform: scale(0.82); background: rgba(255,255,255,0.16); }
.copy-btn--id { color: #7dd3fc; border-color: rgba(125,211,252,0.25); background: rgba(125,211,252,0.08); }
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

/* ── Action buttons (flat style) ── */
.action-row { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.action-flat-btn {
  display: flex; flex-direction: column; align-items: center; gap: 7px;
  padding: 10px 8px 8px;
  background: none; border: none; cursor: pointer;
  transition: opacity 0.12s;
  -webkit-tap-highlight-color: transparent;
}
.action-flat-btn:active { opacity: 0.65; }
.action-flat-icon {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: rgba(74,222,128,0.12);
  display: flex; align-items: center; justify-content: center;
}
.action-flat-lbl {
  font-size: 12px; font-weight: 700; color: #e2e8f0;
  letter-spacing: 0.01em;
}

/* ── VIP card (teal, bigger, Screenshot 2 style) ── */
.vip-card {
  position: relative; overflow: hidden;
  border-radius: 16px; padding: 14px 14px 16px;
  background: linear-gradient(135deg, #0d9488 0%, #14b8a6 45%, #0f766e 100%);
}
.vip-shimmer {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(110deg,transparent 30%,rgba(255,255,255,0.14) 50%,transparent 70%);
}
/* Top row */
.vip-top-row { position: relative; z-index: 1; display: flex; align-items: flex-start; gap: 0; }
.vip-lvl-badge {
  flex-shrink: 0;
  background: rgba(255,255,255,0.18);
  border-radius: 8px;
  padding: 4px 8px;
  display: flex; align-items: center; justify-content: center;
}
.vip-badge-txt { font-size: 12px; font-weight: 900; color: #fff; }
.vip-top-label { font-size: 11.5px; color: rgba(255,255,255,0.88); }
.vip-top-accent { font-size: 12px; font-weight: 900; color: #fef9c3; font-style: italic; }
.vip-top-bold { font-size: 13px; font-weight: 900; color: #fff; }
/* Divider */
.vip-divider {
  position: relative; z-index: 1;
  margin: 10px 0;
  height: 1px;
  background: rgba(255,255,255,0.2);
}
/* Progress section */
.vip-prog-wrap { position: relative; z-index: 1; }
.vip-prog-row { display: flex; align-items: flex-start; gap: 8px; }
.vip-coin-badge {
  width: 28px; height: 28px; border-radius: 50%;
  background: radial-gradient(circle, #fde68a 30%, #f59e0b 100%);
  border: 2px solid rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.vip-prog-lbl { font-size: 10.5px; color: rgba(255,255,255,0.85); }
.vip-prog-val { font-size: 10.5px; font-weight: 700; color: #fff; white-space: nowrap; }
.vip-bar-track { height: 7px; border-radius: 999px; background: rgba(0,0,0,0.18); overflow: hidden; }
.vip-bar-fill { height: 100%; border-radius: 999px; background: rgba(255,255,255,0.85); transition: width 0.5s ease; }
.vip-bar-fill2 { height: 100%; border-radius: 999px; background: rgba(254,243,199,0.75); transition: width 0.5s ease; }

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
