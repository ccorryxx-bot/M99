<template>
  <div class="nova-page-bg min-h-screen text-gray-200 pb-24 relative overflow-hidden">

    <!-- ── HEADER ── -->
    <header class="sticky top-0 z-30 px-4 py-3 flex items-center justify-between" style="background:rgba(8,16,42,0.88);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.06);">
      <button @click="$router.back()" class="w-9 h-9 flex items-center justify-center rounded-full" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <h2 class="text-base font-bold text-white">{{ $t('profile') }}</h2>
      <div class="flex items-center gap-2">
        <button class="w-9 h-9 flex items-center justify-center rounded-full" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);">
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        </button>
        <button class="w-9 h-9 flex items-center justify-center rounded-full relative" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);">
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">3</span>
        </button>
      </div>
    </header>

    <div class="px-4 pt-4 space-y-3 relative z-10">

      <!-- ── PROFILE CARD ── -->
      <div class="rounded-2xl p-4" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(16px);">
        <div class="flex items-center gap-3">
          <!-- Avatar -->
          <div class="relative flex-shrink-0">
            <div class="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black text-white" style="background:linear-gradient(135deg,#22c55e,#0ea5e9);">
              {{ username.charAt(0).toUpperCase() }}
            </div>
            <div class="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[9px] font-black" :style="vipBadgeBg">
              V{{ vipLevel }}
            </div>
          </div>

          <!-- User info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-bold text-white text-sm truncate">{{ username }}</span>
              <button @click="copyText(username)" class="flex-shrink-0 active:scale-75 transition-transform">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-gray-400 font-mono">ID: {{ gameId }}</span>
              <button @click="copyText(gameId)" class="flex-shrink-0 active:scale-75 transition-transform">
                <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
            </div>
          </div>

          <!-- Balance + refresh -->
          <div class="flex-shrink-0 flex items-center gap-2">
            <div class="text-right">
              <p class="text-[10px] text-gray-500">🇲🇲 လက်ကျန်</p>
              <p class="text-sm font-black text-cyan-300">{{ formatCurrency(mainBalance) }}</p>
            </div>
            <button @click="fetchWallet" class="w-7 h-7 flex items-center justify-center rounded-full active:scale-90 transition-transform" style="background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.25);">
              <svg class="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ── 2 ACTION BUTTONS ── -->
      <div class="grid grid-cols-2 gap-3">
        <button @click="$router.push('/home')" class="acc-action-btn flex flex-col items-center justify-center gap-2 py-4 rounded-2xl">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style="background:rgba(245,158,11,0.15);border:1.5px solid rgba(245,158,11,0.3);">
            🏦
          </div>
          <span class="text-xs font-bold text-white">{{ $t('depositBtn') }}</span>
        </button>
        <button @click="$router.push('/home')" class="acc-action-btn flex flex-col items-center justify-center gap-2 py-4 rounded-2xl">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style="background:rgba(14,165,233,0.15);border:1.5px solid rgba(14,165,233,0.3);">
            👛
          </div>
          <span class="text-xs font-bold text-white">{{ $t('withdrawBtn') }}</span>
        </button>
      </div>

      <!-- ── VIP CARD ── -->
      <div class="rounded-2xl p-4 relative overflow-hidden" style="background:linear-gradient(135deg,#b8860b 0%,#f5d060 35%,#d4950a 65%,#b07d10 100%);">
        <!-- shimmer overlay -->
        <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.18) 50%,transparent 70%);"></div>
        <div class="relative z-10 flex items-center gap-3">
          <!-- VIP Badge -->
          <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(0,0,0,0.25);border:1.5px solid rgba(255,255,255,0.3);">
            <span class="text-xs font-black text-white leading-tight text-center">V{{ vipLevel }}</span>
          </div>
          <!-- VIP Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold text-yellow-900">VIP {{ vipLevel }}</span>
              <span class="text-xs text-yellow-900 font-semibold">ပရိမိုးဘောနပ် {{ nextBonus }}%</span>
              <svg class="w-4 h-4 text-yellow-900/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
            <!-- Progress bar -->
            <div class="h-2 rounded-full overflow-hidden mb-1" style="background:rgba(0,0,0,0.2);">
              <div class="h-full rounded-full transition-all" style="background:rgba(255,255,255,0.8);" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-yellow-900/80">{{ formatCurrency(deposited) }} / {{ formatCurrency(nextLevelTarget) }}</span>
              <span class="text-[10px] text-yellow-900 font-semibold">VIP {{ nextLevel }} → {{ formatCurrency(remaining) }} ကျပ်</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── MENU SECTION 1 : Transactions ── -->
      <div class="rounded-2xl overflow-hidden" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">
        <button @click="comingSoon" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(251,146,60,0.15);border-color:rgba(251,146,60,0.3);">
            <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <div class="flex-1 text-left">
            <p class="text-sm font-semibold text-white">ငါ်မတ်တမ်း</p>
            <p class="text-[10px] text-gray-500 mt-0.5">အသေးစိတ်၊ လောင်းကစား၊ အတိုရ၊ လက်ကျန်</p>
          </div>
          <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="acc-divider"></div>
        <button @click="comingSoon" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.28);">
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
          </div>
          <div class="flex-1 text-left">
            <p class="text-sm font-semibold text-white">ငွေထုတ်စီမံခန့်ခွဲမှု</p>
          </div>
          <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- ── MENU SECTION 2 : Settings ── -->
      <div class="rounded-2xl overflow-hidden" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">

        <!-- Agent row — gold highlight -->
        <button @click="$router.push('/agent')" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(245,158,11,0.14);border-color:rgba(245,158,11,0.32);">
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <p class="flex-1 text-left text-sm font-semibold text-white">အေးဂျင့်</p>
          <span class="text-xs font-bold mr-1" style="color:#f59e0b;">တစ်လဝင်ငွေ တစ်သန်း</span>
          <svg class="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="acc-divider"></div>

        <!-- Personal info -->
        <button @click="comingSoon" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(99,102,241,0.13);border-color:rgba(99,102,241,0.3);">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <p class="flex-1 text-left text-sm font-semibold text-white">ကိုယ်ရေးအချက်အလက်များ</p>
          <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="acc-divider"></div>

        <!-- Security -->
        <button @click="comingSoon" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(34,197,94,0.12);border-color:rgba(34,197,94,0.28);">
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <p class="flex-1 text-left text-sm font-semibold text-white">လုံခြုံရေးစင်တာ</p>
          <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="acc-divider"></div>

        <!-- Language -->
        <button @click="comingSoon" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(14,165,233,0.13);border-color:rgba(14,165,233,0.28);">
            <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
          </div>
          <p class="flex-1 text-left text-sm font-semibold text-white">ဘာသာစကား</p>
          <span class="text-xs text-gray-400 mr-1">မြန်မာဘာသာ</span>
          <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="acc-divider"></div>

        <!-- Terms -->
        <button @click="comingSoon" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(168,85,247,0.12);border-color:rgba(168,85,247,0.28);">
            <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p class="flex-1 text-left text-sm font-semibold text-white">ထောက်သည်ဆောင်မူ</p>
          <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="acc-divider"></div>

        <!-- Feedback -->
        <button @click="comingSoon" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(236,72,153,0.12);border-color:rgba(236,72,153,0.28);">
            <svg class="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </div>
          <p class="flex-1 text-left text-sm font-semibold text-white">အကြံပေးချက်</p>
          <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="acc-divider"></div>

        <!-- Device login -->
        <button @click="comingSoon" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(20,184,166,0.12);border-color:rgba(20,184,166,0.28);">
            <svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
          <p class="flex-1 text-left text-sm font-semibold text-white">စက်မပူညွတ်သို့ ဝင်ရောက်ပါ။</p>
          <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="acc-divider"></div>

        <!-- Logout -->
        <button @click="logout" class="acc-menu-row w-full">
          <div class="acc-menu-icon" style="background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.28);">
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </div>
          <p class="flex-1 text-left text-sm font-semibold text-red-400">အကောင့်ထွက်ရန်</p>
          <svg class="w-4 h-4 text-red-500/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '@/lib/supabase'

const { t } = useI18n()

const username = ref(localStorage.getItem('sb_username') || 'PLAYER')
const gameId = ref('')
const mainBalance = ref(0)
const bonusBalance = ref(0)

async function fetchWallet() {
  try {
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
  } catch (e) { /* silent */ }
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

const formatCurrency = (num) => new Intl.NumberFormat('en-US').format(num)

const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text) } catch {}
}

const logout = async () => {
  await supabase.auth.signOut()
  ;['sb_token','sb_refresh','sb_username','avatarIndex'].forEach(k => localStorage.removeItem(k))
  window.location.href = '/login'
}

const comingSoon = () => alert('Coming Soon')
</script>

<style scoped>
.nova-page-bg {
  background: linear-gradient(160deg,#08102a 0%,#0d1a36 20%,#0c1828 40%,#091420 60%,#07101a 80%,#050c14 100%);
  min-height: 100vh;
  color: #fff;
  overscroll-behavior: contain;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

/* Action buttons */
.acc-action-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08);
  transition: transform 0.12s ease, box-shadow 0.15s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.acc-action-btn:active {
  transform: scale(0.97);
  box-shadow: 0 1px 4px rgba(0,0,0,0.30), inset 0 2px 6px rgba(0,0,0,0.25);
}

/* Menu rows */
.acc-menu-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
.acc-menu-row:active {
  background: rgba(255,255,255,0.04);
}

/* Icon container */
.acc-menu-icon {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Thin divider between menu items */
.acc-divider {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin: 0 16px;
}
</style>
