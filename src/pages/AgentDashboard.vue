<template>
  <div class="agent-page min-h-screen overflow-x-hidden select-none" style="background: #040608; color: rgba(255,255,255,0.85);">

    <!-- ── HEADER ── -->
    <header class="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
      style="background: rgba(4,6,8,0.92); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-bottom: 1px solid rgba(255,255,255,0.05);">
      <button @click="$router.push('/home')" class="flex items-center gap-1.5 active:opacity-50 transition-opacity"
        style="color: rgba(255,255,255,0.4);">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        <span class="text-xs font-medium tracking-wider">NovaBETT</span>
      </button>
      <h1 class="text-sm font-bold tracking-[0.15em]" style="color: rgba(255,255,255,0.7);">AGENT</h1>
      <button @click="loadAll" :class="['w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90', loading ? 'animate-spin' : '']"
        style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.4);">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
      </button>
    </header>

    <!-- ── SCROLLABLE TAB BAR ── -->
    <div class="sticky z-30 no-scrollbar overflow-x-auto"
      style="top: 49px; background: rgba(4,6,8,0.88); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.04);">
      <div class="flex items-center gap-1.5 px-3 py-2.5 w-max">
        <button v-for="(tab, i) in tabs" :key="i" @click="activeTab = i"
          class="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 active:scale-95 whitespace-nowrap"
          :style="activeTab === i
            ? 'background: rgba(255,193,7,0.18); border: 1px solid rgba(255,193,7,0.35); color: rgba(255,193,7,0.95);'
            : 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.38);'">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- ── MAIN CONTENT ── -->
    <div class="pb-32">

      <!-- ═══════════════════════════════════════════
           TAB 0: ပင်မ (Overview)
           ═══════════════════════════════════════════ -->
      <div v-if="activeTab === 0" class="space-y-3 px-4 pt-4">

        <!-- Banner -->
        <div class="fp-card rounded-2xl overflow-hidden relative" style="height: 148px;">
          <img src="/images/banners/banner2.jpg" class="w-full h-full object-cover" alt="Banner"
            onerror="this.src='/images/banners/banner1.jpg'" />
          <div class="absolute inset-0 pointer-events-none"
            style="background: linear-gradient(to right, rgba(4,6,8,0.5) 0%, transparent 60%, rgba(4,6,8,0.25) 100%);"></div>
          <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full"
            style="background: rgba(255,193,7,0.15); border: 1px solid rgba(255,193,7,0.3); backdrop-filter: blur(8px);">
            <span class="text-[10px] font-bold tracking-wider" style="color: rgba(255,193,7,0.9);">10% COMMISSION</span>
          </div>
          <div class="absolute bottom-3 left-4">
            <p class="text-[9px] font-black tracking-[0.25em] uppercase" style="color: rgba(255,255,255,0.5);">NOVABETT AGENT PROGRAM</p>
          </div>
        </div>

        <!-- Agent Identity Card -->
        <div class="fp-card rounded-2xl p-4 relative overflow-hidden"
          style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(20px);">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-16 pointer-events-none"
            style="background: radial-gradient(ellipse, rgba(255,193,7,0.06) 0%, transparent 70%); filter: blur(10px);"></div>

          <div class="flex items-center gap-3">
            <!-- Rank Badge -->
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
              style="background: linear-gradient(135deg, rgba(255,193,7,0.15), rgba(255,152,0,0.08)); border: 1px solid rgba(255,193,7,0.25);">
              <span class="text-2xl font-black" style="color: rgba(255,193,7,0.9);">{{ agentRank }}</span>
              <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style="background: rgba(255,193,7,0.18); border: 1px solid rgba(255,193,7,0.35);">
                <svg class="w-2.5 h-2.5" style="color: rgba(255,193,7,0.9);" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <p class="text-base font-bold truncate" style="color: rgba(255,255,255,0.88);">
                  <span v-if="loadingData" class="animate-pulse">Loading...</span>
                  <span v-else>{{ username }}</span>
                </p>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold"
                  style="background: rgba(255,193,7,0.12); color: rgba(255,193,7,0.8); border: 1px solid rgba(255,193,7,0.2);">AGENT</span>
              </div>
              <p class="text-[10px] font-mono" style="color: rgba(255,255,255,0.3);">VIP {{ userVipLevel }}</p>
              <p class="text-[10px] mt-0.5" style="color: rgba(255,255,255,0.25);">ဆက်ဆံရေး: {{ memberSince }}</p>
            </div>

            <div class="text-right flex-shrink-0">
              <p class="text-[9px] tracking-wider" style="color: rgba(255,255,255,0.28);">DOWNLINE</p>
              <p class="text-xl font-black mt-0.5" style="color: rgba(255,255,255,0.88);">
                <span v-if="loadingData" class="animate-pulse text-sm" style="color: rgba(255,255,255,0.2);">...</span>
                <span v-else>{{ totalDownline }}</span>
              </p>
              <p class="text-[9px]" style="color: rgba(100,220,120,0.7);">{{ activeDownline }} active</p>
            </div>
          </div>

          <div class="mt-3 h-px" style="background: rgba(255,255,255,0.05);"></div>

          <!-- Sub stats row -->
          <div class="flex justify-between mt-3">
            <div>
              <p class="text-[9px]" style="color: rgba(255,255,255,0.28);">ကော်မရှင်ရက်</p>
              <p class="text-xs font-semibold mt-0.5" style="color: rgba(255,255,255,0.6);">{{ todayDate }}</p>
            </div>
            <div class="text-center">
              <p class="text-[9px]" style="color: rgba(255,255,255,0.28);">မျှဝေနှုန်း</p>
              <p class="text-xs font-bold mt-0.5" style="color: rgba(255,193,7,0.8);">1.00</p>
            </div>
            <div class="text-right">
              <p class="text-[9px]" style="color: rgba(255,255,255,0.28);">Total Deposit</p>
              <p class="text-xs font-semibold mt-0.5" style="color: rgba(255,255,255,0.6);">{{ formatN(userTotalDeposit) }} Ks</p>
            </div>
          </div>
        </div>

        <!-- Scrolling Ticker -->
        <div class="fp-card relative rounded-xl overflow-hidden" style="height: 42px; border: 1px solid rgba(255,193,7,0.2);">
          <div class="absolute inset-0" style="background: linear-gradient(90deg, rgba(255,152,0,0.1), rgba(255,193,7,0.06), rgba(255,152,0,0.1));"></div>
          <div class="absolute inset-y-0 left-0 w-8 z-10 pointer-events-none" style="background: linear-gradient(to right, #040608, transparent);"></div>
          <div class="absolute inset-y-0 right-0 w-8 z-10 pointer-events-none" style="background: linear-gradient(to left, #040608, transparent);"></div>
          <div ref="tickerEl" class="flex items-center h-full whitespace-nowrap overflow-hidden">
            <div class="ticker-track flex items-center gap-10 px-6">
              <span v-for="(item, i) in tickerItems" :key="i" class="flex items-center gap-2 text-[11px] font-semibold flex-shrink-0">
                <span>🔥</span>
                <span style="color: rgba(255,193,7,0.9);">ID: {{ item.id }}</span>
                <span style="color: rgba(255,255,255,0.4);">ကော်မရှင်:</span>
                <span style="color: rgba(255,193,7,1); font-weight: 800;">{{ item.amount }} Ks</span>
                <span style="color: rgba(255,193,7,0.25);">◆</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Stats Grid 2×2 -->
        <div class="grid grid-cols-2 gap-2.5">
          <div v-for="s in statsGrid" :key="s.key" class="fp-card rounded-2xl p-3.5 relative overflow-hidden"
            style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);">
            <div class="absolute top-0 right-0 w-12 h-12 pointer-events-none"
              :style="`background: radial-gradient(circle, ${s.glow} 0%, transparent 70%); filter: blur(8px);`"></div>
            <p class="text-[9px] tracking-[0.08em] mb-1.5" style="color: rgba(255,255,255,0.28);">{{ s.label }}</p>
            <p class="text-lg font-black" :style="`color: ${s.color};`">
              <span v-if="loadingData" class="text-sm animate-pulse" style="color:rgba(255,255,255,0.15);">...</span>
              <span v-else>{{ formatN(s.value) }}</span>
            </p>
            <p class="text-[8px] mt-0.5" style="color: rgba(255,255,255,0.18);">Ks</p>
          </div>
        </div>

        <!-- Referral Panel (ပင်မ tab) -->
        <div class="fp-card rounded-2xl p-4 relative overflow-hidden"
          style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(16px);">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
            style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent);"></div>

          <p class="text-[9px] tracking-[0.14em] mb-3" style="color: rgba(255,255,255,0.3);">သင်မျှဝေရန် လင့်</p>

          <!-- QR + Link row -->
          <div class="flex gap-3 items-start">
            <div class="flex-shrink-0 rounded-xl overflow-hidden p-1.5" style="background: white; width: 76px; height: 76px;">
              <img :src="qrUrl" class="w-full h-full object-contain" alt="QR Code" loading="lazy" />
            </div>
            <div class="flex-1 min-w-0 space-y-2">
              <div class="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07);">
                <p class="text-[11px] font-mono truncate flex-1" style="color: rgba(255,255,255,0.5);">{{ referralLink }}</p>
                <button @click="copyText(referralLink)" class="flex-shrink-0 active:scale-90 transition-all">
                  <svg class="w-4 h-4" :style="copiedLink ? 'color:rgba(100,220,120,0.8)' : 'color:rgba(255,255,255,0.3)'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="copiedLink ? 'M5 13l4 4L19 7' : 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'"/>
                  </svg>
                </button>
              </div>
              <p class="text-[9px]" style="color: rgba(255,255,255,0.2);">ဖိတ်ကုဒ်: <span style="color: rgba(255,193,7,0.75);">{{ username }}</span></p>
            </div>
          </div>

          <!-- Social Share Buttons -->
          <div class="mt-4">
            <p class="text-[9px] tracking-[0.12em] mb-2.5" style="color: rgba(255,255,255,0.22);">မျှဝေရန်</p>
            <div class="grid grid-cols-5 gap-2">
              <button v-for="s in socialButtons" :key="s.id" @click="shareVia(s.id)"
                class="flex flex-col items-center gap-1.5 active:scale-90 transition-all">
                <div class="w-10 h-10 rounded-2xl flex items-center justify-center" :style="`background: ${s.bg}; border: 1px solid ${s.border};`">
                  <span v-html="s.icon" class="w-5 h-5 flex items-center justify-center"></span>
                </div>
                <span class="text-[9px]" style="color: rgba(255,255,255,0.3);">{{ s.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-2 gap-2.5">
          <button @click="activeTab = 6"
            class="fp-card rounded-2xl p-3.5 flex items-center gap-2.5 active:scale-[0.97] transition-all text-left"
            style="background: rgba(255,193,7,0.07); border: 1px solid rgba(255,193,7,0.15);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style="background: rgba(255,193,7,0.12);">
              <svg class="w-5 h-5" style="color: rgba(255,193,7,0.85);" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold" style="color: rgba(255,193,7,0.85);">အောက်လက်ငယ်သား</p>
              <p class="text-[9px]" style="color: rgba(255,255,255,0.28);">Downline List</p>
            </div>
            <svg class="w-4 h-4 ml-auto flex-shrink-0" style="color: rgba(255,193,7,0.35);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>

          <button @click="activeTab = 5"
            class="fp-card rounded-2xl p-3.5 flex items-center gap-2.5 active:scale-[0.97] transition-all text-left"
            style="background: rgba(100,200,120,0.07); border: 1px solid rgba(100,200,120,0.15);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style="background: rgba(100,200,120,0.12);">
              <svg class="w-5 h-5" style="color: rgba(100,220,120,0.85);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold" style="color: rgba(100,220,120,0.85);">ကော်မရှင်</p>
              <p class="text-[9px]" style="color: rgba(255,255,255,0.28);">History</p>
            </div>
            <svg class="w-4 h-4 ml-auto flex-shrink-0" style="color: rgba(100,220,120,0.35);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

      </div>

      <!-- ═══════════════════════════════════════════
           TAB 1: ဖိတ်ခေါ်လင့် — Invisible Interface Redesign
           ═══════════════════════════════════════════ -->
      <div v-else-if="activeTab === 1" class="referral-tab pb-6">

        <!-- ── AMBIENT HERO BG ── -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden" style="z-index:0;">
          <div class="absolute top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full"
            style="background: radial-gradient(circle, rgba(255,193,7,0.06) 0%, transparent 70%); filter: blur(40px);"></div>
          <div class="absolute top-48 left-8 w-40 h-40 rounded-full"
            style="background: radial-gradient(circle, rgba(100,180,255,0.05) 0%, transparent 70%); filter: blur(30px);"></div>
        </div>

        <div class="relative z-10 px-4 pt-4 space-y-4">

          <!-- ── INVITE HEADER ── -->
          <div class="referral-hero-card relative overflow-hidden rounded-3xl px-5 pt-5 pb-4"
            style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(24px);">

            <!-- top shimmer line -->
            <div class="absolute top-0 left-0 right-0 h-px"
              style="background: linear-gradient(90deg, transparent 5%, rgba(255,193,7,0.25) 40%, rgba(255,255,255,0.15) 60%, transparent 95%);"></div>

            <!-- Invite label + token row -->
            <div class="flex items-center justify-between mb-4">
              <p class="text-[10px] font-semibold tracking-[0.18em] uppercase"
                style="color: rgba(255,255,255,0.35);">သူငယ်ချင်းများကို ဖိတ်ကြားသည်</p>
              <div class="flex items-center gap-2 rounded-xl px-3 py-1.5"
                style="background: rgba(255,193,7,0.08); border: 1px solid rgba(255,193,7,0.18);">
                <p class="text-[11px] font-black tracking-widest" style="color: rgba(255,193,7,0.9);">ဖိတ်တိုကင်: {{ username }}</p>
                <button @click="copyText(username)" class="active:scale-75 transition-transform">
                  <svg v-if="!copiedCode" class="w-3.5 h-3.5" style="color:rgba(255,193,7,0.6)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  <svg v-else class="w-3.5 h-3.5" style="color:rgba(100,220,120,0.9)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </button>
              </div>
            </div>

            <!-- QR + Link row -->
            <div class="flex gap-3 items-center">
              <!-- QR -->
              <div class="flex-shrink-0 rounded-2xl overflow-hidden p-1.5 shadow-lg"
                style="background: rgba(255,255,255,0.95); width: 80px; height: 80px;">
                <img :src="qrUrl" class="w-full h-full object-contain" alt="QR" loading="lazy" />
              </div>

              <!-- Link + expand/copy -->
              <div class="flex-1 min-w-0 space-y-2">
                <div class="flex items-center gap-2 rounded-xl px-3 py-2.5"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);">
                  <p class="text-[10px] font-mono truncate flex-1" style="color: rgba(255,255,255,0.45);">{{ referralLink }}</p>
                  <button @click="copyText(referralLink)" class="flex-shrink-0 active:scale-75 transition-transform">
                    <svg v-if="!copiedLink" class="w-4 h-4" style="color:rgba(255,255,255,0.3)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <svg v-else class="w-4 h-4" style="color:rgba(100,220,120,0.9)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  </button>
                </div>
                <!-- Caption -->
                <p class="text-[9px] pl-1" style="color: rgba(255,255,255,0.2);">ဖိတ်ကုဒ်: <span style="color:rgba(255,193,7,0.65)">{{ username }}</span></p>
              </div>
            </div>

            <!-- Social share pills -->
            <div class="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              <button v-for="s in socialButtons" :key="s.id" @click="shareVia(s.id)"
                class="flex items-center gap-2 flex-shrink-0 px-3 py-2 rounded-full active:scale-90 transition-all"
                :style="`background: ${s.bg}; border: 1px solid ${s.border};`">
                <span v-html="s.icon" class="w-4 h-4 flex items-center justify-center flex-shrink-0"></span>
                <span class="text-[10px] font-semibold whitespace-nowrap" style="color:rgba(255,255,255,0.6)">{{ s.label }}</span>
              </button>
            </div>
          </div>

          <!-- ══════════════════════════════════════════════════════
               FLOATING NODE SYSTEM — Neural Network Org Graph
               ════════════════════════════════════════════════════ -->
          <div class="floating-node-card relative overflow-hidden rounded-3xl"
            style="background: rgba(5,8,20,0.85); border: 1px solid rgba(120,100,255,0.15); backdrop-filter: blur(24px);">

            <!-- Section header -->
            <div class="px-5 pt-4 pb-3 flex items-center justify-between" style="border-bottom: 1px solid rgba(120,100,255,0.1);">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:rgba(140,120,255,0.9);box-shadow:0 0 6px rgba(140,120,255,0.8)"></div>
                <p class="text-[10px] font-bold tracking-[0.18em] uppercase" style="color: rgba(180,160,255,0.7);">Neural Commission Network</p>
              </div>
              <span class="text-[8px] px-2 py-0.5 rounded-full" style="background:rgba(120,100,255,0.12);border:1px solid rgba(120,100,255,0.25);color:rgba(160,140,255,0.7)">ဥပမာ ရှင်းပြချက်</span>
            </div>

            <!-- Tab switcher -->
            <div class="px-4 pt-3 flex gap-2">
              <button @click="demoTab = 'A'"
                class="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all active:scale-95"
                :style="demoTab === 'A'
                  ? 'background:rgba(140,100,255,0.22);border:1px solid rgba(140,100,255,0.5);color:rgba(200,180,255,0.95)'
                  : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.35)'">
                A ၏ ကော်မှင်
              </button>
              <button @click="demoTab = 'B1'"
                class="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all active:scale-95"
                :style="demoTab === 'B1'
                  ? 'background:rgba(0,210,255,0.15);border:1px solid rgba(0,210,255,0.4);color:rgba(120,230,255,0.95)'
                  : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.35)'">
                B1 ၏ ကော်မှင်
              </button>
              <button @click="demoTab = 'B2'"
                class="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all active:scale-95"
                :style="demoTab === 'B2'
                  ? 'background:rgba(0,210,255,0.15);border:1px solid rgba(0,210,255,0.4);color:rgba(120,230,255,0.95)'
                  : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.35)'">
                B2 ၏ ကော်မှင်
              </button>
            </div>

            <!-- Commission Summary Box -->
            <div class="mx-4 mt-3 rounded-2xl overflow-hidden" style="background:rgba(10,12,30,0.8);border:1px solid rgba(100,80,255,0.15);">
              <div v-if="demoTab === 'A'" class="flex gap-3 p-3 items-start">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center relative"
                  style="background:linear-gradient(135deg,rgba(140,100,255,0.35),rgba(100,60,200,0.2));border:1.5px solid rgba(140,100,255,0.6);box-shadow:0 0 20px rgba(140,100,255,0.3)">
                  <svg class="w-8 h-8" style="color:rgba(200,180,255,0.95)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <div class="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black" style="background:linear-gradient(135deg,#8060ff,#6040dd);color:#fff;box-shadow:0 0 8px rgba(140,100,255,0.5)">A</div>
                </div>
                <div class="flex-1 text-[11px] leading-relaxed space-y-0.5">
                  <p style="color:rgba(255,255,255,0.55)">တိုက်ရိုက်စုပေါင်း = 500+3000 = <span style="color:rgba(255,255,255,0.85);font-weight:700">3500</span></p>
                  <p style="color:rgba(255,255,255,0.55)">တိုက်ရိုက်ကော်မှင် = 3500×10% = <span style="color:rgba(200,180,255,0.95);font-weight:800">350</span></p>
                  <p style="color:rgba(255,255,255,0.55)">အခြားကော်မှင် = 30+60+<span style="color:rgba(0,210,255,0.8)">600</span> = <span style="color:rgba(0,210,255,0.85);font-weight:700">690</span></p>
                  <p class="font-black" style="color:rgba(180,150,255,1)">ကော်မှင်စုစုပေါင်း = 350+690 = <span style="font-size:13px;color:rgba(200,180,255,1)">1040</span></p>
                </div>
              </div>
              <div v-else-if="demoTab === 'B1'" class="flex gap-3 p-3 items-start">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center relative"
                  style="background:linear-gradient(135deg,rgba(0,200,255,0.25),rgba(0,150,200,0.15));border:1.5px solid rgba(0,200,255,0.4);box-shadow:0 0 16px rgba(0,200,255,0.2)">
                  <svg class="w-8 h-8" style="color:rgba(100,230,255,0.9)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <div class="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-black" style="background:linear-gradient(135deg,#00c8ff,#0090cc);color:#000;box-shadow:0 0 8px rgba(0,200,255,0.4)">B1</div>
                </div>
                <div class="flex-1 text-[11px] leading-relaxed space-y-0.5">
                  <p style="color:rgba(255,255,255,0.5)">B1 ၏ Downline: <span style="color:rgba(100,230,255,0.85);font-weight:700">C1, C2</span></p>
                  <p style="color:rgba(255,255,255,0.55)">C1 = 1000×10%×30% = <span style="color:rgba(100,230,255,0.9);font-weight:700">30</span></p>
                  <p style="color:rgba(255,255,255,0.55)">C2 = 2000×10%×30% = <span style="color:rgba(100,230,255,0.9);font-weight:700">60</span></p>
                  <p class="font-black" style="color:rgba(100,230,255,1)">B1 မှ A ရ = <span style="font-size:13px">90</span></p>
                </div>
              </div>
              <div v-else class="flex gap-3 p-3 items-start">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center relative"
                  style="background:linear-gradient(135deg,rgba(0,200,255,0.25),rgba(0,150,200,0.15));border:1.5px solid rgba(0,200,255,0.4);box-shadow:0 0 16px rgba(0,200,255,0.2)">
                  <svg class="w-8 h-8" style="color:rgba(100,230,255,0.9)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <div class="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-black" style="background:linear-gradient(135deg,#00c8ff,#0090cc);color:#000;box-shadow:0 0 8px rgba(0,200,255,0.4)">B2</div>
                </div>
                <div class="flex-1 text-[11px] leading-relaxed space-y-0.5">
                  <p style="color:rgba(255,255,255,0.5)">B2 ၏ Downline: <span style="color:rgba(100,230,255,0.85);font-weight:700">C3</span></p>
                  <p style="color:rgba(255,255,255,0.55)">C3 = 20000×10%×30% = <span style="color:rgba(100,230,255,0.9);font-weight:700">600</span></p>
                  <p class="font-black" style="color:rgba(100,230,255,1)">B2 မှ A ရ = <span style="font-size:13px">600</span></p>
                </div>
              </div>
            </div>

            <!-- FLOATING NODE SVG CANVAS -->
            <div class="relative mx-3 mt-4 mb-2 rounded-2xl overflow-hidden" style="height:310px;background:radial-gradient(ellipse at 50% 20%,rgba(80,50,200,0.1) 0%,rgba(0,150,220,0.05) 40%,transparent 70%),radial-gradient(ellipse at 20% 80%,rgba(140,100,255,0.06) 0%,transparent 50%),rgba(2,4,14,0.6);">

              <!-- Particle dots -->
              <div class="absolute inset-0 pointer-events-none overflow-hidden">
                <div class="node-particle" style="left:6%;top:12%;animation-delay:0s;animation-duration:4.2s"></div>
                <div class="node-particle" style="left:88%;top:22%;animation-delay:1.1s;animation-duration:5.1s"></div>
                <div class="node-particle" style="left:12%;top:68%;animation-delay:2.3s;animation-duration:3.8s"></div>
                <div class="node-particle" style="left:80%;top:75%;animation-delay:0.7s;animation-duration:4.6s"></div>
                <div class="node-particle" style="left:48%;top:90%;animation-delay:1.8s;animation-duration:5.4s"></div>
                <div class="node-particle" style="left:94%;top:48%;animation-delay:3.0s;animation-duration:4.0s;background:rgba(0,200,255,0.4)"></div>
                <div class="node-particle" style="left:3%;top:42%;animation-delay:0.3s;animation-duration:5.8s;background:rgba(0,200,255,0.35)"></div>
                <div class="node-particle" style="left:62%;top:8%;animation-delay:2.0s;animation-duration:4.4s;background:rgba(0,200,255,0.3)"></div>
                <div class="node-particle" style="left:35%;top:55%;animation-delay:1.5s;animation-duration:6.0s;width:3px;height:3px"></div>
                <div class="node-particle" style="left:72%;top:38%;animation-delay:0.9s;animation-duration:4.8s;width:2px;height:2px;background:rgba(180,160,255,0.5)"></div>
              </div>

              <!-- SVG Lines & Pulses -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 310" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="lgPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="rgba(160,130,255,0.9)"/>
                    <stop offset="100%" stop-color="rgba(0,180,255,0.5)"/>
                  </linearGradient>
                  <linearGradient id="lgCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="rgba(0,210,255,0.7)"/>
                    <stop offset="100%" stop-color="rgba(60,180,255,0.35)"/>
                  </linearGradient>
                  <filter id="glow1">
                    <feGaussianBlur stdDeviation="2.5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="glow2" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                <!-- Connection lines -->
                <path d="M 170,65 C 170,105 100,108 100,148" stroke="url(#lgPurple)" stroke-width="1.5" fill="none" filter="url(#glow1)">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 170,65 C 170,105 240,108 240,148" stroke="url(#lgPurple)" stroke-width="1.5" fill="none" filter="url(#glow1)">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="3.0s" begin="0.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 100,202 C 100,228 68,230 68,252" stroke="url(#lgCyan)" stroke-width="1.2" fill="none">
                  <animate attributeName="opacity" values="0.5;0.85;0.5" dur="2.8s" begin="0.3s" repeatCount="indefinite"/>
                </path>
                <path d="M 100,202 C 100,228 138,230 138,252" stroke="url(#lgCyan)" stroke-width="1.2" fill="none">
                  <animate attributeName="opacity" values="0.5;0.85;0.5" dur="3.2s" begin="0.8s" repeatCount="indefinite"/>
                </path>
                <path d="M 240,202 C 240,228 268,230 268,252" stroke="url(#lgCyan)" stroke-width="1.2" fill="none">
                  <animate attributeName="opacity" values="0.5;0.85;0.5" dur="2.6s" begin="1.1s" repeatCount="indefinite"/>
                </path>

                <!-- Hidden motion paths -->
                <path id="mp_ab1" d="M 170,65 C 170,105 100,108 100,148" fill="none" stroke="none"/>
                <path id="mp_ab2" d="M 170,65 C 170,105 240,108 240,148" fill="none" stroke="none"/>
                <path id="mp_b1c1" d="M 100,202 C 100,228 68,230 68,252" fill="none" stroke="none"/>
                <path id="mp_b1c2" d="M 100,202 C 100,228 138,230 138,252" fill="none" stroke="none"/>
                <path id="mp_b2c3" d="M 240,202 C 240,228 268,230 268,252" fill="none" stroke="none"/>

                <!-- Traveling pulse dots -->
                <circle r="3" fill="rgba(200,180,255,0.95)" filter="url(#glow2)">
                  <animateMotion dur="1.8s" repeatCount="indefinite" begin="0s"><mpath href="#mp_ab1"/></animateMotion>
                </circle>
                <circle r="3" fill="rgba(200,180,255,0.95)" filter="url(#glow2)">
                  <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.9s"><mpath href="#mp_ab2"/></animateMotion>
                </circle>
                <circle r="2.5" fill="rgba(80,220,255,0.9)" filter="url(#glow2)">
                  <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.2s"><mpath href="#mp_b1c1"/></animateMotion>
                </circle>
                <circle r="2.5" fill="rgba(80,220,255,0.9)" filter="url(#glow2)">
                  <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.9s"><mpath href="#mp_b1c2"/></animateMotion>
                </circle>
                <circle r="2.5" fill="rgba(80,220,255,0.9)" filter="url(#glow2)">
                  <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s"><mpath href="#mp_b2c3"/></animateMotion>
                </circle>
              </svg>

              <!-- NODE A -->
              <div class="absolute" style="left:50%;top:8px;transform:translateX(-50%);" @click="demoTab='A'">
                <div class="flex flex-col items-center gap-1.5 cursor-pointer">
                  <div class="relative">
                    <div class="absolute inset-0 rounded-2xl" style="background:rgba(140,100,255,0.15);animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;border-radius:1rem"></div>
                    <div class="node-float-a w-[58px] h-[58px] rounded-2xl flex items-center justify-center relative transition-all duration-300"
                      :style="demoTab==='A'
                        ? 'background:linear-gradient(135deg,rgba(150,110,255,0.55),rgba(90,55,200,0.4));border:2px solid rgba(170,140,255,0.85);box-shadow:0 0 32px rgba(140,100,255,0.55),0 0 70px rgba(100,70,220,0.25)'
                        : 'background:linear-gradient(135deg,rgba(140,100,255,0.28),rgba(80,50,180,0.18));border:1.5px solid rgba(140,100,255,0.5);box-shadow:0 0 20px rgba(140,100,255,0.3)'">
                      <svg class="w-7 h-7" style="color:rgba(230,220,255,0.95)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                      <div class="absolute -bottom-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black" style="background:linear-gradient(135deg,#9070ff,#6040cc);color:#fff;border:1.5px solid rgba(0,0,0,0.25);box-shadow:0 0 10px rgba(140,100,255,0.7)">A</div>
                    </div>
                  </div>
                  <p class="text-[9px] font-bold" style="color:rgba(210,190,255,0.85);text-shadow:0 0 12px rgba(140,100,255,0.5)">You (Agent A)</p>
                </div>
              </div>

              <!-- NODE B1 -->
              <div class="absolute cursor-pointer" style="left:calc(50% - 112px);top:135px;" @click="demoTab='B1'">
                <div class="node-float-b1 w-[56px] rounded-xl p-2 flex flex-col items-center gap-0.5 relative transition-all duration-300"
                  :style="demoTab==='B1'
                    ? 'background:linear-gradient(135deg,rgba(0,210,255,0.32),rgba(0,150,210,0.22));border:1.5px solid rgba(0,210,255,0.65);box-shadow:0 0 24px rgba(0,210,255,0.4)'
                    : 'background:linear-gradient(135deg,rgba(0,200,255,0.12),rgba(0,140,200,0.08));border:1px solid rgba(0,200,255,0.25);box-shadow:0 0 12px rgba(0,180,230,0.15)'">
                  <svg class="w-5 h-5" style="color:rgba(100,230,255,0.9)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <p class="text-[7px] text-center leading-tight mt-0.5" style="color:rgba(255,255,255,0.5)">500<br>×10%=50</p>
                  <div class="absolute -bottom-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-black" style="background:linear-gradient(135deg,#00ccff,#0099cc);color:#000;box-shadow:0 0 6px rgba(0,200,255,0.5)">B1</div>
                </div>
              </div>

              <!-- NODE B2 -->
              <div class="absolute cursor-pointer" style="left:calc(50% + 56px);top:135px;" @click="demoTab='B2'">
                <div class="node-float-b2 w-[56px] rounded-xl p-2 flex flex-col items-center gap-0.5 relative transition-all duration-300"
                  :style="demoTab==='B2'
                    ? 'background:linear-gradient(135deg,rgba(0,210,255,0.32),rgba(0,150,210,0.22));border:1.5px solid rgba(0,210,255,0.65);box-shadow:0 0 24px rgba(0,210,255,0.4)'
                    : 'background:linear-gradient(135deg,rgba(0,200,255,0.12),rgba(0,140,200,0.08));border:1px solid rgba(0,200,255,0.25);box-shadow:0 0 12px rgba(0,180,230,0.15)'">
                  <svg class="w-5 h-5" style="color:rgba(100,230,255,0.9)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <p class="text-[7px] text-center leading-tight mt-0.5" style="color:rgba(255,255,255,0.5)">3000<br>×10%=300</p>
                  <div class="absolute -bottom-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-black" style="background:linear-gradient(135deg,#00ccff,#0099cc);color:#000;box-shadow:0 0 6px rgba(0,200,255,0.5)">B2</div>
                </div>
              </div>

              <!-- NODE C1 -->
              <div class="absolute" style="left:calc(50% - 148px);top:240px;">
                <div class="node-float-c1 w-[52px] rounded-xl p-1.5 flex flex-col items-center gap-0.5 relative"
                  style="background:linear-gradient(135deg,rgba(50,170,255,0.12),rgba(30,120,200,0.08));border:1px solid rgba(50,170,255,0.22);box-shadow:0 0 10px rgba(50,170,255,0.12)">
                  <svg class="w-4 h-4" style="color:rgba(100,200,255,0.75)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <p class="text-[6.5px] text-center leading-tight" style="color:rgba(255,255,255,0.4)">1000<br>×10%×30%</p>
                  <p class="text-[8px] font-black" style="color:rgba(0,210,255,0.85)">=30</p>
                  <div class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[6px] font-black" style="background:rgba(50,170,255,0.8);color:#000;box-shadow:0 0 5px rgba(50,170,255,0.4)">C1</div>
                </div>
              </div>

              <!-- NODE C2 -->
              <div class="absolute" style="left:calc(50% - 88px);top:240px;">
                <div class="node-float-c2 w-[52px] rounded-xl p-1.5 flex flex-col items-center gap-0.5 relative"
                  style="background:linear-gradient(135deg,rgba(50,170,255,0.12),rgba(30,120,200,0.08));border:1px solid rgba(50,170,255,0.22);box-shadow:0 0 10px rgba(50,170,255,0.12)">
                  <svg class="w-4 h-4" style="color:rgba(100,200,255,0.75)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <p class="text-[6.5px] text-center leading-tight" style="color:rgba(255,255,255,0.4)">2000<br>×10%×30%</p>
                  <p class="text-[8px] font-black" style="color:rgba(0,210,255,0.85)">=60</p>
                  <div class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[6px] font-black" style="background:rgba(50,170,255,0.8);color:#000;box-shadow:0 0 5px rgba(50,170,255,0.4)">C2</div>
                </div>
              </div>

              <!-- NODE C3 -->
              <div class="absolute" style="left:calc(50% + 42px);top:240px;">
                <div class="node-float-c3 w-[52px] rounded-xl p-1.5 flex flex-col items-center gap-0.5 relative"
                  style="background:linear-gradient(135deg,rgba(50,170,255,0.12),rgba(30,120,200,0.08));border:1px solid rgba(50,170,255,0.22);box-shadow:0 0 10px rgba(50,170,255,0.12)">
                  <svg class="w-4 h-4" style="color:rgba(100,200,255,0.75)" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <p class="text-[6.5px] text-center leading-tight" style="color:rgba(255,255,255,0.4)">20000<br>×10%×30%</p>
                  <p class="text-[8px] font-black" style="color:rgba(0,210,255,0.85)">=600</p>
                  <div class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[6px] font-black" style="background:rgba(50,170,255,0.8);color:#000;box-shadow:0 0 5px rgba(50,170,255,0.4)">C3</div>
                </div>
              </div>

            </div><!-- /floating node canvas -->

            <!-- N node explanation -->
            <div class="mx-3 mb-4 rounded-2xl p-3 flex gap-3 items-start"
              style="background:rgba(80,200,120,0.05);border:1px solid rgba(80,200,120,0.14)">
              <div class="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style="background:rgba(80,200,120,0.14);border:1.5px solid rgba(80,200,120,0.32);box-shadow:0 0 10px rgba(80,200,120,0.12)">
                <span class="text-[10px] font-black" style="color:rgba(120,230,140,0.95)">N</span>
              </div>
              <div>
                <p class="text-[9px] mb-0.5" style="color:rgba(255,255,255,0.28)">(ပရေးထမ်ဆိုင်ဆော လက်အောက်ကအသားများ)</p>
                <p class="text-[10px] leading-relaxed" style="color:rgba(255,255,255,0.42)">အဆင့်တိုင်းသည် A အတွက် ကော်မှင်ကို ထပ်ပေးမည်။ Downline အဆင့် အကန့်အသတ်မရှိဘဲ ပိုကောင်းလေပါ။</p>
              </div>
            </div>

          </div><!-- /floating node card -->

          <!-- ══════════════════════════════════════════════════════
               REAL DOWNLINE LIST — Supabase ကနေ လာသောဒေတာ
               ════════════════════════════════════════════════════ -->
          <div class="rounded-3xl overflow-hidden"
            style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.055);">
            <div class="px-5 pt-4 pb-3 flex items-center justify-between" style="border-bottom:1px solid rgba(255,255,255,0.05);">
              <p class="text-[10px] font-bold tracking-[0.18em] uppercase" style="color:rgba(255,255,255,0.4)">ကျွန်ုပ်၏ Downline များ</p>
              <p class="text-[10px]" style="color:rgba(255,255,255,0.25)">{{ allDownline.length }} members</p>
            </div>
            <div v-if="loadingData" class="p-8 flex justify-center">
              <div class="w-5 h-5 border-2 rounded-full animate-spin" style="border-color:rgba(255,255,255,0.1);border-top-color:rgba(255,193,7,0.6)"></div>
            </div>
            <div v-else-if="allDownline.length === 0" class="p-8 flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-2xl flex items-center justify-center" style="background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.1)">
                <svg class="w-5 h-5" style="color:rgba(255,255,255,0.15)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <p class="text-xs" style="color:rgba(255,255,255,0.25)">Downline မရှိသေးပါ</p>
              <p class="text-[10px]" style="color:rgba(255,255,255,0.15)">Referral link မျှဝေပြီး ဖိတ်ပါ</p>
            </div>
            <div v-else>
              <div v-for="user in allDownline.slice(0,10)" :key="user.descendant_id"
                class="flex items-center justify-between px-4 py-3"
                style="border-bottom:1px solid rgba(255,255,255,0.04)">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                    :style="user.level===1
                      ? 'background:rgba(255,193,7,0.12);color:rgba(255,193,7,0.85);border:1px solid rgba(255,193,7,0.2)'
                      : 'background:rgba(180,220,255,0.1);color:rgba(180,220,255,0.75);border:1px solid rgba(180,220,255,0.15)'">
                    {{ (user.username||'?').charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <p class="text-xs font-semibold" style="color:rgba(255,255,255,0.75)">{{ user.username || user.descendant_id.substring(0,8) }}</p>
                      <span class="text-[8px] px-1.5 py-0.5 rounded-full font-bold"
                        :style="user.level===1
                          ? 'background:rgba(255,193,7,0.1);color:rgba(255,193,7,0.7)'
                          : 'background:rgba(180,220,255,0.1);color:rgba(180,220,255,0.65)'">
                        Lv{{ user.level }}
                      </span>
                    </div>
                    <p class="text-[9px] mt-0.5" style="color:rgba(255,255,255,0.2)">{{ fmtDate(user.created_at) }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-[11px] font-bold" style="color:rgba(255,193,7,0.8)">{{ formatN(user.total_deposit||0) }} Ks</p>
                  <p class="text-[8px]" style="color:rgba(255,255,255,0.2)">VIP {{ user.vip_level||1 }}</p>
                </div>
              </div>
            </div>
          </div><!-- /real downline list -->

          <!-- ── HOW TO INVITE (steps) ── -->
          <div class="rounded-2xl px-4 py-4" style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.055);">
            <p class="text-[9px] tracking-[0.18em] uppercase mb-3" style="color:rgba(255,255,255,0.28)">ဘောနပ်ရရှိရန် အဆင့်များ</p>
            <div class="space-y-2.5">
              <div v-for="(step, i) in inviteSteps" :key="i" class="flex items-start gap-3">
                <div class="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0 mt-0.5"
                  :style="step.style">{{ i+1 }}</div>
                <p class="text-[11px] leading-relaxed" style="color:rgba(255,255,255,0.45)">{{ step.text }}</p>
              </div>
            </div>
          </div>

        </div><!-- /relative z-10 -->
      </div>

      <!-- ═══════════════════════════════════════════
           TAB 2: ငါ့ ဒေတာ (My Data)
           ═══════════════════════════════════════════ -->
      <div v-else-if="activeTab === 2" class="space-y-3 px-4 pt-4">

        <div class="fp-card rounded-2xl overflow-hidden" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
          <div class="px-4 py-3" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <p class="text-xs font-bold tracking-widest" style="color: rgba(255,255,255,0.5);">ACCOUNT INFO</p>
          </div>
          <div class="divide-y" style="--tw-divide-opacity: 1;">
            <div v-for="row in myDataRows" :key="row.label" class="flex items-center justify-between px-4 py-3.5"
              style="border-bottom: 1px solid rgba(255,255,255,0.04);">
              <p class="text-xs" style="color: rgba(255,255,255,0.38);">{{ row.label }}</p>
              <p class="text-xs font-semibold" :style="row.style || 'color: rgba(255,255,255,0.75);'">
                <span v-if="loadingData" class="animate-pulse" style="color: rgba(255,255,255,0.2);">...</span>
                <span v-else>{{ row.value }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Transaction History -->
        <div class="fp-card rounded-2xl overflow-hidden" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
          <div class="px-4 py-3" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <p class="text-xs font-bold tracking-widest" style="color: rgba(255,255,255,0.5);">TRANSACTIONS</p>
          </div>
          <div v-if="loadingData" class="p-8 text-center">
            <div class="w-5 h-5 border-2 rounded-full animate-spin mx-auto" style="border-color: rgba(255,255,255,0.1); border-top-color: rgba(255,255,255,0.5);"></div>
          </div>
          <div v-else-if="userTransactions.length === 0" class="p-8 text-center">
            <p class="text-xs" style="color: rgba(255,255,255,0.25);">Transaction မှတ်တမ်း မရှိသေးပါ</p>
          </div>
          <div v-else v-for="tx in userTransactions" :key="tx.id" class="flex items-center justify-between px-4 py-3"
            style="border-bottom: 1px solid rgba(255,255,255,0.04);">
            <div>
              <p class="text-xs font-semibold capitalize" style="color: rgba(255,255,255,0.7);">{{ tx.type }}</p>
              <p class="text-[9px] mt-0.5" style="color: rgba(255,255,255,0.25);">{{ fmtDate(tx.created_at) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold" :style="tx.type === 'deposit' ? 'color:rgba(100,220,120,0.85)' : tx.type === 'withdraw' ? 'color:rgba(255,100,100,0.8)' : 'color:rgba(255,193,7,0.85)'">
                {{ tx.type === 'withdraw' ? '-' : '+' }}{{ formatN(tx.amount) }}
              </p>
              <span class="text-[9px] px-1.5 py-0.5 rounded" :style="tx.status === 'confirmed' ? 'background:rgba(100,220,120,0.1);color:rgba(100,220,120,0.7)' : 'background:rgba(255,193,7,0.1);color:rgba(255,193,7,0.6)'">
                {{ tx.status }}
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════════════
           TAB 3: စွမ်းဆောင်ရည် (Performance)
           ═══════════════════════════════════════════ -->
      <div v-else-if="activeTab === 3" class="space-y-3 px-4 pt-4">

        <!-- Period selector -->
        <div class="flex gap-2">
          <button v-for="p in periods" :key="p.key" @click="activePeriod = p.key"
            class="flex-1 py-2 rounded-xl text-[10px] font-semibold transition-all active:scale-95"
            :style="activePeriod === p.key
              ? 'background:rgba(255,193,7,0.15);border:1px solid rgba(255,193,7,0.3);color:rgba(255,193,7,0.9)'
              : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.35)'">
            {{ p.label }}
          </button>
        </div>

        <!-- Performance cards -->
        <div class="grid grid-cols-2 gap-2.5">
          <div v-for="card in perfCards" :key="card.label" class="fp-card rounded-2xl p-4 relative overflow-hidden"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);">
            <div class="absolute top-0 right-0 w-10 h-10" :style="`background:radial-gradient(circle,${card.glow} 0%,transparent 70%);filter:blur(6px);`"></div>
            <p class="text-[9px] tracking-wider mb-2" style="color:rgba(255,255,255,0.28);">{{ card.label }}</p>
            <p class="text-lg font-black" :style="`color:${card.color};`">
              <span v-if="loadingData" class="animate-pulse text-sm" style="color:rgba(255,255,255,0.15)">...</span>
              <span v-else>{{ formatN(card.value) }}</span>
            </p>
            <p class="text-[8px] mt-0.5" style="color:rgba(255,255,255,0.2);">{{ card.unit }}</p>
          </div>
        </div>

        <!-- Level breakdown -->
        <div class="fp-card rounded-2xl overflow-hidden" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
          <div class="px-4 py-3" style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <p class="text-xs font-bold tracking-widest" style="color:rgba(255,255,255,0.5);">LEVEL BREAKDOWN</p>
          </div>
          <div class="px-4 py-3 space-y-3">
            <div v-for="lv in levelBreakdown" :key="lv.level" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                  :style="lv.level===1?'background:rgba(255,193,7,0.15);color:rgba(255,193,7,0.85);border:1px solid rgba(255,193,7,0.25)':'background:rgba(100,180,255,0.12);color:rgba(100,180,255,0.8);border:1px solid rgba(100,180,255,0.2)'">
                  {{ lv.level }}
                </span>
                <p class="text-xs" style="color:rgba(255,255,255,0.5);">Level {{ lv.level }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs font-bold" :style="lv.level===1?'color:rgba(255,193,7,0.85)':'color:rgba(100,180,255,0.8)'">
                  {{ formatN(lv.commission) }} Ks
                </p>
                <p class="text-[9px]" style="color:rgba(255,255,255,0.25);">{{ lv.count }} users</p>
              </div>
            </div>
            <div v-if="levelBreakdown.length === 0 && !loadingData" class="py-4 text-center">
              <p class="text-xs" style="color:rgba(255,255,255,0.2);">ကော်မရှင် မရှိသေးပါ</p>
            </div>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════════════
           TAB 4: ကော်မရှင် (Commission)
           ═══════════════════════════════════════════ -->
      <div v-else-if="activeTab === 4" class="space-y-3 px-4 pt-4">

        <!-- Commission summary -->
        <div class="fp-card rounded-2xl p-4 relative overflow-hidden"
          style="background: rgba(255,193,7,0.06); border: 1px solid rgba(255,193,7,0.18);">
          <div class="absolute -top-4 right-4 w-20 h-20 pointer-events-none"
            style="background: radial-gradient(circle, rgba(255,193,7,0.1) 0%, transparent 70%); filter: blur(10px);"></div>
          <p class="text-[9px] tracking-widest mb-1" style="color: rgba(255,193,7,0.6);">TOTAL COMMISSION EARNED</p>
          <p class="text-3xl font-black" style="color: rgba(255,193,7,0.95);">
            <span v-if="loadingData" class="animate-pulse text-xl" style="color:rgba(255,193,7,0.3)">...</span>
            <span v-else>{{ formatN(totalCommission) }}</span>
          </p>
          <p class="text-xs mt-1" style="color: rgba(255,193,7,0.5);">Ks</p>
        </div>

        <!-- Commission records -->
        <div class="fp-card rounded-2xl overflow-hidden" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
          <div class="px-4 py-3" style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <p class="text-xs font-bold tracking-widest" style="color:rgba(255,255,255,0.5);">COMMISSION RECORDS</p>
          </div>
          <div v-if="loadingData" class="p-8 text-center">
            <div class="w-5 h-5 border-2 rounded-full animate-spin mx-auto" style="border-color:rgba(255,255,255,0.1);border-top-color:rgba(255,255,255,0.5)"></div>
          </div>
          <div v-else-if="commissionRecords.length === 0" class="p-8 text-center">
            <p class="text-sm mb-1" style="color:rgba(255,255,255,0.3)">ကော်မရှင်မှတ်တမ်း မရှိသေးပါ</p>
            <p class="text-xs" style="color:rgba(255,255,255,0.18)">Downline ကစားမှသာ ကော်မရှင်ရပါမည်</p>
          </div>
          <div v-else v-for="rec in commissionRecords" :key="rec.id" class="flex items-center justify-between px-4 py-3.5"
            style="border-bottom:1px solid rgba(255,255,255,0.04);">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold"
                  :style="rec.level===1?'background:rgba(255,193,7,0.12);color:rgba(255,193,7,0.8)':'background:rgba(100,180,255,0.12);color:rgba(100,180,255,0.8)'">
                  Lv {{ rec.level }}
                </span>
                <p class="text-xs" style="color:rgba(255,255,255,0.55)">Turnover: {{ formatN(rec.bet_turnover) }} Ks</p>
              </div>
              <p class="text-[9px] mt-0.5" style="color:rgba(255,255,255,0.25)">{{ fmtDate(rec.created_at) }}</p>
            </div>
            <p class="text-sm font-black" style="color:rgba(255,193,7,0.9)">+{{ formatN(rec.commission_amount) }}</p>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════════════
           TAB 5: ကော်မရှင် မှတ်တမ်း (Commission History detail)
           ═══════════════════════════════════════════ -->
      <div v-else-if="activeTab === 5" class="space-y-3 px-4 pt-4">

        <!-- Search downline -->
        <div class="relative">
          <input v-model="dlSearch" type="text" placeholder="Downline ရှာဖွေရန်..."
            class="w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none"
            style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.75);" />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style="color:rgba(255,255,255,0.25)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>

        <!-- Level filter -->
        <div class="flex gap-2">
          <button v-for="lf in [{key:0,label:'All'},{key:1,label:'Lv 1'},{key:2,label:'Lv 2+'}]" :key="lf.key"
            @click="dlLevelFilter = lf.key"
            class="flex-1 py-1.5 rounded-xl text-[10px] font-semibold transition-all active:scale-95"
            :style="dlLevelFilter === lf.key
              ? 'background:rgba(255,193,7,0.15);border:1px solid rgba(255,193,7,0.3);color:rgba(255,193,7,0.9)'
              : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.35)'">
            {{ lf.label }}
          </button>
        </div>

        <!-- Downline list -->
        <div class="fp-card rounded-2xl overflow-hidden" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
          <div class="flex items-center justify-between px-4 py-3" style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <p class="text-xs font-bold tracking-widest" style="color:rgba(255,255,255,0.5);">DOWNLINE MEMBERS</p>
            <p class="text-[10px]" style="color:rgba(255,255,255,0.3)">{{ filteredDownline.length }} members</p>
          </div>
          <div v-if="loadingData" class="p-8 text-center">
            <div class="w-5 h-5 border-2 rounded-full animate-spin mx-auto" style="border-color:rgba(255,255,255,0.1);border-top-color:rgba(255,255,255,0.5)"></div>
          </div>
          <div v-else-if="filteredDownline.length === 0" class="p-8 text-center">
            <p class="text-sm mb-1" style="color:rgba(255,255,255,0.3)">Downline မရှိသေးပါ</p>
            <p class="text-xs" style="color:rgba(255,255,255,0.18)">Referral link မျှဝေပြီး ဖိတ်ခေါ်ပါ</p>
          </div>
          <div v-else v-for="user in filteredDownline" :key="user.descendant_id" class="flex items-center justify-between px-4 py-3.5"
            style="border-bottom:1px solid rgba(255,255,255,0.04);">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                :style="user.level===1?'background:rgba(255,193,7,0.12);color:rgba(255,193,7,0.8)':'background:rgba(100,180,255,0.12);color:rgba(100,180,255,0.8)'">
                {{ (user.username||'?').charAt(0).toUpperCase() }}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-xs font-semibold" style="color:rgba(255,255,255,0.75)">{{ user.username || user.descendant_id.substring(0,8) }}</p>
                  <span class="text-[8px] px-1 py-0.5 rounded"
                    :style="user.level===1?'background:rgba(255,193,7,0.1);color:rgba(255,193,7,0.65)':'background:rgba(100,180,255,0.1);color:rgba(100,180,255,0.65)'">
                    Lv {{ user.level }}
                  </span>
                </div>
                <p class="text-[9px]" style="color:rgba(255,255,255,0.25)">{{ fmtDate(user.created_at) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[10px] font-bold" style="color:rgba(255,193,7,0.8)">{{ formatN(user.total_deposit||0) }} Ks</p>
              <p class="text-[9px]" style="color:rgba(255,255,255,0.25)">Deposit</p>
            </div>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════════════
           TAB 6: အောက်လက်ငယ်သား အချက်လက် (Downline Details)
           ═══════════════════════════════════════════ -->
      <div v-else-if="activeTab === 6" class="space-y-3 px-4 pt-4">

        <!-- Stats overview -->
        <div class="grid grid-cols-3 gap-2">
          <div v-for="ds in downlineStats" :key="ds.label" class="fp-card rounded-xl p-3 text-center relative overflow-hidden"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);">
            <div class="absolute inset-0 pointer-events-none" :style="`background:radial-gradient(circle at 50% 0%, ${ds.glow} 0%, transparent 70%);`"></div>
            <p class="text-xl font-black relative z-10" :style="`color:${ds.color}`">
              <span v-if="loadingData" class="text-sm animate-pulse" style="color:rgba(255,255,255,0.15)">-</span>
              <span v-else>{{ ds.value }}</span>
            </p>
            <p class="text-[9px] mt-1 relative z-10" style="color:rgba(255,255,255,0.28)">{{ ds.label }}</p>
          </div>
        </div>

        <!-- Same list as Tab 5 with full detail -->
        <div class="fp-card rounded-2xl overflow-hidden" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
          <div class="px-4 py-3" style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <p class="text-xs font-bold tracking-widest" style="color:rgba(255,255,255,0.5);">ALL DOWNLINE</p>
          </div>
          <div v-if="loadingData" class="p-8 text-center">
            <div class="w-5 h-5 border-2 rounded-full animate-spin mx-auto" style="border-color:rgba(255,255,255,0.1);border-top-color:rgba(255,255,255,0.5)"></div>
          </div>
          <div v-else-if="allDownline.length === 0" class="p-8 text-center">
            <p class="text-sm mb-2" style="color:rgba(255,255,255,0.3)">Downline မရှိသေးပါ</p>
            <button @click="activeTab = 1" class="text-xs px-4 py-2 rounded-xl transition-all active:scale-95"
              style="background:rgba(255,193,7,0.12);border:1px solid rgba(255,193,7,0.25);color:rgba(255,193,7,0.8)">
              ဖိတ်ခေါ်လင့် သွားမည်
            </button>
          </div>
          <div v-else v-for="user in allDownline" :key="user.descendant_id" class="px-4 py-3.5"
            style="border-bottom:1px solid rgba(255,255,255,0.04);">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                  :style="user.level===1?'background:rgba(255,193,7,0.12);color:rgba(255,193,7,0.85)':'background:rgba(100,180,255,0.1);color:rgba(100,180,255,0.8)'">
                  {{ (user.username||'?').charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="text-xs font-semibold" style="color:rgba(255,255,255,0.8)">{{ user.username || '—' }}</p>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[9px]" :style="user.level===1?'color:rgba(255,193,7,0.65)':'color:rgba(100,180,255,0.65)'">Level {{ user.level }}</span>
                    <span class="text-[9px]" style="color:rgba(255,255,255,0.2)">{{ fmtDate(user.created_at) }}</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs font-bold" style="color:rgba(255,255,255,0.7)">{{ formatN(user.total_deposit||0) }}</p>
                <p class="text-[9px]" style="color:rgba(255,255,255,0.25)">VIP {{ user.vip_level||1 }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════════════
           TAB 7 (idx 6): ပြန်ပေး ကော်မရှင် အမျိုး
           ═══════════════════════════════════════════ -->
      <!-- Note: tabs array has 7 items (index 0–6), this is index 6 visually but we map it to our tabs array -->
      <div v-else-if="activeTab === 7" class="space-y-3 px-4 pt-4">

        <div class="fp-card rounded-2xl p-4" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
          <p class="text-xs font-bold tracking-widest mb-4" style="color:rgba(255,255,255,0.5)">COMMISSION TYPES</p>
          <div class="space-y-4">
            <div v-for="ct in commissionTypes" :key="ct.title" class="rounded-xl p-3.5" :style="ct.style">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-lg">{{ ct.icon }}</span>
                <p class="text-xs font-bold" :style="ct.titleColor">{{ ct.title }}</p>
              </div>
              <p class="text-xs leading-relaxed" style="color:rgba(255,255,255,0.5)">{{ ct.desc }}</p>
              <p class="text-sm font-black mt-2" :style="ct.titleColor">{{ ct.rate }}</p>
            </div>
          </div>
        </div>

        <!-- Schedule -->
        <div class="fp-card rounded-2xl p-4" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
          <p class="text-[10px] tracking-widest mb-3" style="color:rgba(255,255,255,0.3)">ကော်မရှင်ထုတ်ချိန်</p>
          <div class="space-y-2.5">
            <div class="flex justify-between items-center">
              <p class="text-xs" style="color:rgba(255,255,255,0.5)">ပေးချေမည့်ရက်</p>
              <p class="text-xs font-semibold" style="color:rgba(255,255,255,0.75)">ပုံမှန်တိုင်း</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="text-xs" style="color:rgba(255,255,255,0.5)">အနည်းဆုံးပမာဏ</p>
              <p class="text-xs font-bold" style="color:rgba(255,193,7,0.85)">100 Ks</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="text-xs" style="color:rgba(255,255,255,0.5)">ငွေနည်းလမ်း</p>
              <p class="text-xs font-semibold" style="color:rgba(255,255,255,0.75)">Wallet ထဲ</p>
            </div>
          </div>
        </div>

      </div>

    </div><!-- /main content -->

    <!-- ── BOTTOM NAV ── -->
    <nav class="fixed bottom-0 left-0 right-0 z-40 py-2"
      style="background:rgba(4,6,8,0.94);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-top:1px solid rgba(255,255,255,0.05);">
      <div class="flex justify-around items-center px-2">
        <router-link v-for="nav in bottomNav" :key="nav.to" :to="nav.to"
          class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
          :style="$route.path === nav.to ? 'color:rgba(255,193,7,0.9)' : 'color:rgba(255,255,255,0.3)'">
          <span v-html="nav.icon" class="w-5 h-5"></span>
          <span class="text-[9px] font-semibold">{{ nav.label }}</span>
        </router-link>
      </div>
    </nav>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { supabase } from '@/lib/supabase'

// ── State ──────────────────────────────────────────────────
const activeTab    = ref(0)
const loading      = ref(false)
const loadingData  = ref(true)
const copiedCode   = ref(false)
const copiedLink   = ref(false)
const dlSearch     = ref('')
const dlLevelFilter= ref(0)
const activePeriod = ref('today')

// Tree tab state
const treeSelectedNode = ref('self')
const demoTab = ref('A')

// User info
const userId          = ref('')
const username        = ref(localStorage.getItem('sb_username') || '—')
const userVipLevel    = ref(1)
const userTotalDeposit= ref(0)
const memberSince     = ref('—')

// Financial
const mainBalance     = ref(0)
const bonusBalance    = ref(0)
const totalCommission = ref(0)
const totalTurnover   = ref(0)

// Lists
const allDownline      = ref([])
const commissionRecords= ref([])
const userTransactions = ref([])
const levelBreakdown   = ref([])

// Ticker (static showcase)
const tickerItems = [
  { id: '15****810', amount: '669,810' },
  { id: '22****345', amount: '412,500' },
  { id: '09****671', amount: '287,000' },
  { id: '33****089', amount: '198,750' },
  { id: '18****222', amount: '145,200' },
  { id: '27****556', amount: '98,400'  },
]

// ── Computed ───────────────────────────────────────────────
const referralLink = computed(() =>
  window.location.origin + '/?dl=' + username.value
)

const qrUrl = computed(() =>
  `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(referralLink.value)}&bgcolor=ffffff&color=000000&margin=6`
)

const todayDate = computed(() => new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'numeric' }))

const agentRank = computed(() => {
  const n = allDownline.value.filter(u=>u.level===1).length
  if (n >= 100) return 'S'
  if (n >= 50)  return 'A'
  if (n >= 20)  return 'B'
  if (n >= 5)   return 'C'
  return '1'
})

const totalDownline  = computed(() => allDownline.value.length)
const activeDownline = computed(() => allDownline.value.filter(u=>u.level===1).length)

const statsGrid = computed(() => [
  { key:'commission', label:'ကော်မရှင်',         value: totalCommission.value, color:'rgba(255,193,7,0.9)',    glow:'rgba(255,193,7,0.08)'    },
  { key:'bonus',      label:'ဆုလာဘ်',            value: bonusBalance.value,    color:'rgba(100,220,120,0.85)', glow:'rgba(100,220,120,0.07)'  },
  { key:'turnover',   label:'တိုက်ရိုက်လည်ပတ်မှု',  value: totalTurnover.value,   color:'rgba(140,180,255,0.85)', glow:'rgba(100,140,255,0.06)'  },
  { key:'main',       label:'ပင်မလက်ကျန်',         value: mainBalance.value,     color:'rgba(255,255,255,0.75)', glow:'rgba(255,255,255,0.04)'  },
])

const filteredDownline = computed(() => {
  let list = allDownline.value
  if (dlLevelFilter.value > 0) list = list.filter(u => dlLevelFilter.value === 2 ? u.level >= 2 : u.level === dlLevelFilter.value)
  if (dlSearch.value) list = list.filter(u => (u.username||'').toLowerCase().includes(dlSearch.value.toLowerCase()))
  return list
})

// Tree computed
const level1Downline = computed(() => allDownline.value.filter(u => u.level === 1))
const level2UnderSelected = computed(() => {
  if (treeSelectedNode.value === 'self') return []
  return allDownline.value.filter(u => u.level === 2)
})

const myDataRows = computed(() => [
  { label:'Username',     value: username.value },
  { label:'VIP Level',    value: 'VIP ' + userVipLevel.value },
  { label:'Member Since', value: memberSince.value },
  { label:'ပင်မလက်ကျန်',  value: formatN(mainBalance.value) + ' Ks' },
  { label:'ဘောနပ်လက်ကျန်', value: formatN(bonusBalance.value) + ' Ks', style:'color:rgba(100,220,120,0.85)' },
  { label:'Total Deposit', value: formatN(userTotalDeposit.value) + ' Ks' },
  { label:'Downline (Lv1)', value: allDownline.value.filter(u=>u.level===1).length + ' members' },
])

const perfCards = computed(() => [
  { label:'Total Turnover',   value: totalTurnover.value,   color:'rgba(140,180,255,0.9)', glow:'rgba(100,140,255,0.08)', unit:'Ks' },
  { label:'Total Commission', value: totalCommission.value, color:'rgba(255,193,7,0.9)',   glow:'rgba(255,193,7,0.08)',   unit:'Ks' },
  { label:'Direct Members',   value: allDownline.value.filter(u=>u.level===1).length, color:'rgba(100,220,120,0.9)', glow:'rgba(100,220,120,0.07)', unit:'members' },
  { label:'All Members',      value: totalDownline.value, color:'rgba(255,255,255,0.8)', glow:'rgba(255,255,255,0.04)', unit:'members' },
])

const downlineStats = computed(() => [
  { label:'စုစုပေါင်း',  value: totalDownline.value,  color:'rgba(255,255,255,0.85)',  glow:'rgba(255,255,255,0.04)' },
  { label:'Level 1',    value: allDownline.value.filter(u=>u.level===1).length, color:'rgba(255,193,7,0.9)',   glow:'rgba(255,193,7,0.06)' },
  { label:'Level 2+',   value: allDownline.value.filter(u=>u.level>=2).length, color:'rgba(100,180,255,0.9)', glow:'rgba(100,180,255,0.05)' },
])

// ── Config / Static Data ───────────────────────────────────
const tabs = [
  { label: 'ပင်မ' },
  { label: 'ဖိတ်ခေါ်လင့်' },
  { label: 'ငါ့ ဒေတာ' },
  { label: 'စွမ်းဆောင်ရည်' },
  { label: 'ကော်မရှင်' },
  { label: 'အောက်လက်ငယ်သား' },
  { label: 'ကော်မရှင် အမျိုး' },
]

const periods = [
  { key:'today',  label:'ယနေ့' },
  { key:'week',   label:'ဒီသတ်' },
  { key:'month',  label:'ဒီလ' },
]

const socialButtons = [
  {
    id: 'native', label: 'မျှဝေ',
    bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.1)',
    icon: `<svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.65)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>`
  },
  {
    id: 'telegram', label: 'Telegram',
    bg: 'rgba(42,171,238,0.13)', border: 'rgba(42,171,238,0.22)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(42,171,238,0.9)"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>`
  },
  {
    id: 'viber', label: 'Viber',
    bg: 'rgba(115,96,242,0.13)', border: 'rgba(115,96,242,0.22)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(115,96,242,0.9)"><path d="M12.03 0C5.385 0 0 5.385 0 12.03c0 6.645 5.385 12.03 12.03 12.03 6.644 0 12.03-5.385 12.03-12.03C24.06 5.385 18.674 0 12.03 0zm3.456 16.557c-.356.35-.829.544-1.313.544-.187 0-.375-.031-.558-.094-1.23-.42-2.382-1.074-3.392-1.924-1.004-.844-1.832-1.855-2.462-3-.634-1.158-1.02-2.43-1.02-3.638 0-.498.196-.977.548-1.33.35-.35.822-.548 1.316-.55h.003c.267 0 .528.1.723.278.46.425 1.294 1.626 1.48 2.102.097.25.065.537-.085.77-.1.155-.238.282-.4.37-.16.09-.3.21-.41.35-.1.134-.1.31-.01.454.39.65.92 1.228 1.54 1.704.622.476 1.32.833 2.064 1.05.16.047.33.024.47-.065.14-.09.24-.228.27-.387.03-.16.095-.31.19-.443.097-.135.23-.243.38-.313.273-.12.574-.098.83.058.45.272 1.588 1.14 1.99 1.623.186.218.26.508.196.79-.064.282-.237.527-.48.677l.002-.002z"/></svg>`
  },
  {
    id: 'facebook', label: 'Facebook',
    bg: 'rgba(24,119,242,0.13)', border: 'rgba(24,119,242,0.22)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(24,119,242,0.9)"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
  },
  {
    id: 'whatsapp', label: 'WhatsApp',
    bg: 'rgba(37,211,102,0.13)', border: 'rgba(37,211,102,0.22)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(37,211,102,0.9)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
  },
]

const inviteSteps = [
  { text: 'Referral link ကို copy ကူးပြီး မိတ်ဆွေများကို မျှဝေပါ', style:'background:rgba(255,193,7,0.15);color:rgba(255,193,7,0.85);border:1px solid rgba(255,193,7,0.25)' },
  { text: 'သူတို့ link ဖြင့် NovaBETT တွင် အကောင့်ဖွင့်ပါ', style:'background:rgba(100,220,120,0.1);color:rgba(100,220,120,0.8);border:1px solid rgba(100,220,120,0.2)' },
  { text: 'သူတို့ Deposit ထည့်ပြီး ကစားသောအခါ သင် Turnover × 10% ရမည်', style:'background:rgba(140,180,255,0.1);color:rgba(140,180,255,0.8);border:1px solid rgba(140,180,255,0.2)' },
]

const commissionTypes = [
  {
    icon:'🎯', title:'Level 1 — တိုက်ရိုက် (Direct)',
    rate: 'Turnover × 10%',
    desc: 'သင်တိုက်ရိုက် ဖိတ်ခေါ်သော အဖွဲ့ဝင်များ ကစားသည့် Turnover ၏ 10% ကို သင်ရမည်',
    style:'background:rgba(255,193,7,0.07);border:1px solid rgba(255,193,7,0.15);border-radius:12px;padding:12px',
    titleColor:'color:rgba(255,193,7,0.9)'
  },
  {
    icon:'🔗', title:'Level 2+ — Indirect Override',
    rate: 'Turnover × 10% × 30% ≈ 3%',
    desc: 'Level 1 အဖွဲ့ဝင်များ ဖိတ်ခေါ်သော သူများ၏ Turnover မှ 30% Override ရမည်',
    style:'background:rgba(100,180,255,0.06);border:1px solid rgba(100,180,255,0.13);border-radius:12px;padding:12px',
    titleColor:'color:rgba(100,180,255,0.9)'
  },
  {
    icon:'♾️', title:'Unlimited Depth',
    rate: 'အဆင့်မကန့်သတ်ဘဲ ရမည်',
    desc: 'Downline tree ၏ အဆင့် မည်မျှ နက်နက် ဆင်းဆင်း ကော်မရှင် ဆက်ရနိုင်သည်',
    style:'background:rgba(200,100,255,0.06);border:1px solid rgba(200,100,255,0.13);border-radius:12px;padding:12px',
    titleColor:'color:rgba(200,130,255,0.9)'
  },
]

const bottomNav = [
  { to:'/home',       label:'Home',  icon:`<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>` },
  { to:'/promotions', label:'Promo', icon:`<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36 0-2.58-2.09-4.64-4.67-4.64-1.42 0-2.69.62-3.56 1.6L8 3.4l-1.77-1.8C5.36 0.62 4.09 0 2.67 0 0.09 0-2 2.06-2 4.64c0 .48.11.92.18 1.36H-2l-2 14h24l-2-14zM12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>` },
  { to:'/agent',      label:'Agent', icon:`<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>` },
  { to:'/service',    label:'Chat',  icon:`<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>` },
  { to:'/account',    label:'You',   icon:`<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>` },
]

// ── Supabase Data Load ─────────────────────────────────────
async function loadAll() {
  loading.value = true
  loadingData.value = true
  try {
    // 1. Get authenticated user
    const { data: { user }, error: authErr } = await supabase.auth.getUser()
    if (authErr || !user) { loadingData.value = false; loading.value = false; return }
    userId.value = user.id

    // 2. Load user profile from users table (contains username, vip_level, total_deposit)
    const { data: profile } = await supabase
      .from('users')
      .select('username, vip_level, total_deposit, created_at')
      .eq('id', user.id)
      .single()

    if (profile) {
      username.value        = profile.username || user.user_metadata?.username || username.value
      userVipLevel.value    = profile.vip_level  || 1
      userTotalDeposit.value= Number(profile.total_deposit) || 0
      memberSince.value     = profile.created_at
        ? new Date(profile.created_at).toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'numeric' })
        : '—'
      // Sync username to localStorage
      localStorage.setItem('sb_username', username.value)
    }

    // 3. Load wallet
    const { data: wallet } = await supabase
      .from('wallets')
      .select('main_balance, bonus_balance')
      .eq('user_id', user.id)
      .single()
    if (wallet) {
      mainBalance.value  = Number(wallet.main_balance)  || 0
      bonusBalance.value = Number(wallet.bonus_balance) || 0
    }

    // 4. Load downline via affiliate_tree (level > 0 = not self-referential)
    //    Then join users table to get username, vip_level, total_deposit
    const { data: treeRows } = await supabase
      .from('affiliate_tree')
      .select('descendant_id, level')
      .eq('ancestor_id', user.id)
      .gt('level', 0)
      .order('level', { ascending: true })

    if (treeRows && treeRows.length > 0) {
      const descendantIds = treeRows.map(r => r.descendant_id)
      const { data: memberProfiles } = await supabase
        .from('users')
        .select('id, username, vip_level, total_deposit, created_at')
        .in('id', descendantIds)

      // Merge tree level info with profile data
      allDownline.value = treeRows.map(row => {
        const prof = memberProfiles?.find(p => p.id === row.descendant_id) || {}
        return { ...prof, descendant_id: row.descendant_id, level: row.level }
      })
    } else {
      allDownline.value = []
    }

    // 5. Load commission records from affiliate_commissions
    const { data: commData } = await supabase
      .from('affiliate_commissions')
      .select('id, from_user_id, bet_turnover, commission_amount, level, created_at')
      .eq('agent_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (commData) {
      commissionRecords.value = commData
      // Sum totals
      totalCommission.value = commData.reduce((s, r) => s + Number(r.commission_amount), 0)
      totalTurnover.value   = commData.reduce((s, r) => s + Number(r.bet_turnover), 0)

      // Level breakdown
      const byLevel = {}
      commData.forEach(r => {
        if (!byLevel[r.level]) byLevel[r.level] = { level: r.level, commission: 0, count: 0, users: new Set() }
        byLevel[r.level].commission += Number(r.commission_amount)
        byLevel[r.level].users.add(r.from_user_id)
      })
      levelBreakdown.value = Object.values(byLevel).map(l => ({
        level: l.level, commission: l.commission, count: l.users.size
      })).sort((a,b) => a.level - b.level)
    }

    // 6. Load user's own transactions
    const { data: txData } = await supabase
      .from('transactions')
      .select('id, type, amount, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
    userTransactions.value = txData || []

  } catch (err) {
    console.error('[AgentDashboard] loadAll error:', err)
  } finally {
    loadingData.value = false
    loading.value = false
  }
}

// ── Helpers ─────────────────────────────────────────────────
function formatN(n) {
  return new Intl.NumberFormat('en-US').format(Math.floor(n || 0))
}

function fmtDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'2-digit' })
}

async function copyText(text) {
  const isLink = text.startsWith('http')
  try {
    await navigator.clipboard.writeText(text)
    if (isLink) { copiedLink.value = true; setTimeout(() => copiedLink.value = false, 2200) }
    else        { copiedCode.value = true; setTimeout(() => copiedCode.value = false, 2200) }
  } catch {
    prompt('Copy manually:', text)
  }
}

function shareVia(platform) {
  const url  = encodeURIComponent(referralLink.value)
  const text = encodeURIComponent(`NovaBETT မှာ ကစားပါ! Referral: ${referralLink.value}`)
  const map = {
    native:   null,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    viber:    `viber://forward?text=${text}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${text}`,
  }
  if (platform === 'native') {
    if (navigator.share) {
      navigator.share({ title:'NovaBETT Agent Referral', text:'NovaBETT မှာ ကစားပါ!', url: referralLink.value }).catch(()=>{})
    } else {
      copyText(referralLink.value)
    }
    return
  }
  if (map[platform]) window.open(map[platform], '_blank')
}

// ── GSAP Ticker ─────────────────────────────────────────────
const tickerEl = ref(null)
let tickerTween = null

function initTicker() {
  if (!tickerEl.value) return
  const track = tickerEl.value.querySelector('.ticker-track')
  if (!track) return
  // Duplicate content for seamless loop
  const clone = track.cloneNode(true)
  tickerEl.value.appendChild(clone)
  const totalW = track.scrollWidth
  gsap.set([track, clone], { x: 0 })
  gsap.set(clone, { x: totalW })
  tickerTween = gsap.to([track, clone], {
    x: `-=${totalW}`,
    duration: 22,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalW)
    }
  })
}

function animateReferralTab() {
  gsap.from('.referral-hero-card', { opacity:0, y:22, duration:0.55, ease:'power3.out' })
  gsap.from('.referral-tree-card', { opacity:0, y:28, duration:0.6, ease:'power3.out', delay:0.12 })
  gsap.from('.tree-node-root', { opacity:0, scale:0.7, duration:0.5, ease:'back.out(1.8)', delay:0.25 })
  gsap.from('.tree-node-b', { opacity:0, scale:0.6, y:12, duration:0.45, stagger:0.08, ease:'back.out(1.6)', delay:0.4 })
  gsap.from('.tree-node-c', { opacity:0, scale:0.6, y:10, duration:0.4, stagger:0.07, ease:'back.out(1.5)', delay:0.6 })
  // Ambient glow pulse
  gsap.to('.referral-tab .absolute.inset-0 .rounded-full:first-child', {
    scale:1.15, opacity:0.7, duration:3.5, yoyo:true, repeat:-1, ease:'sine.inOut'
  })
}

onMounted(async () => {
  await loadAll()
  gsap.from('.fp-card', { opacity:0, y:18, duration:0.45, stagger:0.06, ease:'power2.out', delay:0.05 })
  setTimeout(initTicker, 400)
  if (activeTab.value === 1) animateReferralTab()
})

onUnmounted(() => {
  if (tickerTween) tickerTween.kill()
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.agent-page { -webkit-tap-highlight-color: transparent; }

/* ── Referral Tab — Invisible Interface ── */
.referral-tab {
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

.referral-hero-card {
  box-shadow:
    0 1px 0 0 rgba(255,255,255,0.06) inset,
    0 24px 48px rgba(0,0,0,0.25),
    0 0 0 1px rgba(255,255,255,0.03);
  transition: box-shadow 0.3s ease;
}

/* Floating Node Card */
.floating-node-card {
  box-shadow:
    0 1px 0 0 rgba(140,100,255,0.08) inset,
    0 20px 50px rgba(0,0,0,0.3),
    0 0 0 1px rgba(120,100,255,0.05);
}

/* Ambient particle dots */
.node-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(140,100,255,0.45);
  box-shadow: 0 0 6px rgba(140,100,255,0.5);
  animation: particleDrift linear infinite;
}

@keyframes particleDrift {
  0%   { transform: translateY(0px) scale(1);   opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.6; }
  100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
}

/* Node floating animations */
.node-float-a {
  animation: floatA 3.5s ease-in-out infinite;
}
@keyframes floatA {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-5px); }
}

.node-float-b1 {
  animation: floatB1 4.0s ease-in-out infinite;
  animation-delay: 0.4s;
}
@keyframes floatB1 {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-4px); }
}

.node-float-b2 {
  animation: floatB2 4.2s ease-in-out infinite;
  animation-delay: 0.8s;
}
@keyframes floatB2 {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-4px); }
}

.node-float-c1 {
  animation: floatC 5.0s ease-in-out infinite;
  animation-delay: 0.2s;
}
.node-float-c2 {
  animation: floatC 4.6s ease-in-out infinite;
  animation-delay: 1.0s;
}
.node-float-c3 {
  animation: floatC 5.2s ease-in-out infinite;
  animation-delay: 0.6s;
}
@keyframes floatC {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-3px); }
}

/* Ping animation for root node */
@keyframes ping {
  75%, 100% { transform: scale(1.6); opacity: 0; }
}
</style>
