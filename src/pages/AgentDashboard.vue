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
            <!-- ═══ LUXURY VIP RANK BADGE ═══ -->
            <button @click="showLevelModal = true"
              class="lux-vip-badge flex-shrink-0 active:scale-90 transition-all duration-300"
              style="width:76px;height:82px;position:relative;flex-shrink:0;">

              <!-- Ambient outer glow -->
              <div class="absolute pointer-events-none lux-outer-aura"
                :style="`inset:-6px;border-radius:20px;background:radial-gradient(ellipse,${currentLevelData.rimColor}22 0%,transparent 72%);filter:blur(8px);`"></div>

              <!-- Pulsing ring -->
              <div class="absolute pointer-events-none lux-pulse-ring"
                :style="`inset:0;border-radius:18px;border:1.5px solid ${currentLevelData.rimColor};box-shadow:0 0 14px 2px ${currentLevelData.glowColor},inset 0 0 10px 1px ${currentLevelData.glowColor}33;`"></div>

              <!-- Badge body — layered metallic look -->
              <div class="absolute inset-0 rounded-[18px] overflow-hidden"
                :style="currentLevelData.badgeBg">
                <!-- Top specular highlight -->
                <div class="absolute inset-x-0 top-0 h-[45%] pointer-events-none"
                  style="background:linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 100%);border-radius:inherit;"></div>
                <!-- Bottom depth shadow -->
                <div class="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
                  style="background:linear-gradient(0deg,rgba(0,0,0,0.42) 0%,transparent 100%);"></div>
                <!-- Diagonal shine sweep -->
                <div class="lux-badge-sweep absolute inset-0 pointer-events-none"></div>
              </div>

              <!-- Crown decoration Gold+ -->
              <div v-if="agentLevel >= 6" class="absolute z-20 pointer-events-none lux-crown-float"
                style="top:-11px;left:50%;transform:translateX(-50%);">
                <svg width="30" height="17" viewBox="0 0 30 17" fill="none">
                  <path d="M15 1L22 9.5L30 5L25.5 17H4.5L0 5L8 9.5L15 1Z"
                    :fill="currentLevelData.crownColor"
                    style="filter:drop-shadow(0 0 5px currentColor)"/>
                  <circle cx="15" cy="1.5" r="2" :fill="currentLevelData.crownColor" opacity="0.9"/>
                  <circle cx="30" cy="5" r="1.5" :fill="currentLevelData.crownColor" opacity="0.7"/>
                  <circle cx="0" cy="5" r="1.5" :fill="currentLevelData.crownColor" opacity="0.7"/>
                </svg>
              </div>
              <!-- Flame for Mythic/Legend -->
              <div v-if="agentLevel >= 14" class="absolute z-20 pointer-events-none"
                style="top:-14px;left:50%;transform:translateX(-50%);">
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
                  <path d="M12 0C12 0 8 4 8 8C8 6 6 5 6 5C6 5 4 10 8 14C6 13 5 11 5 11C5 11 3 17 8 20C5 20 2 18 2 18C2 18 3 22 12 22C21 22 22 18 22 18C22 18 19 20 16 20C21 17 19 11 19 11C19 11 18 13 16 14C20 10 18 5 18 5C18 5 16 6 16 8C16 4 12 0 12 0Z"
                    :fill="currentLevelData.crownColor"/>
                </svg>
              </div>

              <!-- Number + tier label -->
              <div class="absolute inset-0 z-10 flex flex-col items-center justify-center"
                :style="agentLevel >= 6 ? 'padding-top:10px' : ''">
                <span class="lux-embossed-number font-black leading-none select-none"
                  :style="`font-size:${agentLevel >= 10 ? '23px' : '27px'};` + currentLevelData.numberStyle">{{ agentLevel }}</span>
                <span class="text-[6.5px] font-black tracking-[0.2em] uppercase mt-0.5 select-none"
                  :style="currentLevelData.tierStyle">{{ currentLevelData.tierName }}</span>
              </div>

              <!-- Corner star gem -->
              <div class="absolute z-20 -bottom-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                :style="currentLevelData.cornerStyle + ';box-shadow:0 0 8px ' + currentLevelData.glowColor">
                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </button>

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
                <p class="text-[9px] mb-0.5" style="color:rgba(255,255,255,0.28)">(မရေတွက်နိုင်သော လက်အောက်ငယ်သားများ)</p>
                <p class="text-[10px] leading-relaxed" style="color:rgba(255,255,255,0.42)">အဆင့်တိုင်းသည် A အတွက် ကော်မရှင် ထပ်ပေးမည်။ Downline အဆင့် အကန့်အသတ်မရှိဘဲ ပိုကောင်းလေပါ။</p>
              </div>
            </div>

          </div><!-- /floating node card -->

          <!-- ══════════════════════════════════════════════════════
               REAL DOWNLINE — Futuristic Network Node View
               ════════════════════════════════════════════════════ -->
          <div class="real-downline-card relative overflow-hidden rounded-3xl"
            style="background:rgba(4,6,18,0.9);border:1px solid rgba(100,80,255,0.12);">

            <!-- Header -->
            <div class="px-5 pt-4 pb-3 flex items-center justify-between" style="border-bottom:1px solid rgba(255,255,255,0.05);">
              <div class="flex items-center gap-2">
                <!-- Realtime dot -->
                <div class="relative flex items-center justify-center">
                  <div class="absolute w-3 h-3 rounded-full animate-ping" style="background:rgba(80,220,120,0.3)"></div>
                  <div class="w-1.5 h-1.5 rounded-full" style="background:rgba(80,220,120,0.9);box-shadow:0 0 6px rgba(80,220,120,0.7)"></div>
                </div>
                <p class="text-[10px] font-bold tracking-[0.18em] uppercase" style="color:rgba(255,255,255,0.4)">ကျွန်ုပ်၏ အောက်လက်ငယ်သားများ!</p>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="newMemberFlash" class="text-[9px] px-2 py-0.5 rounded-full font-bold animate-pulse"
                  style="background:rgba(80,220,120,0.15);border:1px solid rgba(80,220,120,0.35);color:rgba(80,220,120,0.9)">+1 NEW</span>
                <p class="text-[10px]" style="color:rgba(255,255,255,0.25)">{{ allDownline.length }} members</p>
              </div>
            </div>

            <!-- Loading -->
            <div v-if="loadingData" class="py-10 flex justify-center">
              <div class="w-5 h-5 border-2 rounded-full animate-spin" style="border-color:rgba(255,255,255,0.08);border-top-color:rgba(140,100,255,0.6)"></div>
            </div>

            <!-- ═══ EMPTY STATE — No downline yet ═══ -->
            <div v-else-if="allDownline.length === 0" class="relative">

              <!-- Plexus Canvas (background) -->
              <canvas ref="plexusRef"
                class="absolute inset-0 w-full pointer-events-none"
                style="height:280px;opacity:0.6"></canvas>

              <!-- Foreground content -->
              <div class="relative flex flex-col items-center pt-8 pb-6 px-4" style="height:280px;">

                <!-- Futuristic Avatar -->
                <div class="relative flex items-center justify-center mb-4">
                  <!-- Outer orbit ring 1 -->
                  <div class="absolute rounded-full avatar-orbit-1" style="width:110px;height:110px;border:1px solid rgba(120,100,255,0.2)"></div>
                  <!-- Outer orbit ring 2 -->
                  <div class="absolute rounded-full avatar-orbit-2" style="width:90px;height:90px;border:1px dashed rgba(0,200,255,0.18)"></div>
                  <!-- Glow halo -->
                  <div class="absolute rounded-full" style="width:70px;height:70px;background:radial-gradient(circle,rgba(120,80,255,0.25) 0%,transparent 70%)"></div>
                  <!-- Main avatar hex -->
                  <div class="avatar-hex relative z-10 flex items-center justify-center"
                    style="width:58px;height:58px;background:linear-gradient(135deg,rgba(130,90,255,0.45) 0%,rgba(0,160,255,0.25) 100%);border:2px solid rgba(140,100,255,0.55);border-radius:16px;box-shadow:0 0 30px rgba(120,80,255,0.4),0 0 60px rgba(120,80,255,0.15)">
                    <span class="text-xl font-black" style="color:rgba(230,220,255,0.95);text-shadow:0 0 15px rgba(160,130,255,0.8)">
                      {{ (username || '?').charAt(0).toUpperCase() }}
                    </span>
                    <!-- Scan line effect -->
                    <div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div class="avatar-scan"></div>
                    </div>
                  </div>
                  <!-- 2 open slot dots with dashed lines -->
                  <div class="absolute" style="left:-38px;top:50%;transform:translateY(-50%)">
                    <div class="flex flex-col items-center gap-1">
                      <div class="open-slot-dot"></div>
                      <div style="width:1px;height:18px;background:linear-gradient(to bottom,rgba(0,200,255,0.3),transparent)"></div>
                    </div>
                  </div>
                  <div class="absolute" style="right:-38px;top:50%;transform:translateY(-50%)">
                    <div class="flex flex-col items-center gap-1">
                      <div class="open-slot-dot" style="animation-delay:0.6s"></div>
                      <div style="width:1px;height:18px;background:linear-gradient(to bottom,rgba(0,200,255,0.3),transparent)"></div>
                    </div>
                  </div>
                </div>

                <!-- Text -->
                <p class="text-[13px] font-bold mb-1" style="color:rgba(255,255,255,0.6)">Downline မရှိသေးပါ</p>
                <p class="text-[10px] text-center leading-relaxed" style="color:rgba(255,255,255,0.25);max-width:200px">Referral link မျှဝေပြီး ဖိတ်ပါ<br>Network grow ဖြစ်သင့်ပြီ</p>

                <!-- Connection waiting indicators -->
                <div class="mt-4 flex items-center gap-3">
                  <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:rgba(0,200,255,0.5);animation-delay:0s"></div>
                    <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:rgba(0,200,255,0.4);animation-delay:0.3s"></div>
                    <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:rgba(0,200,255,0.3);animation-delay:0.6s"></div>
                  </div>
                  <p class="text-[9px]" style="color:rgba(255,255,255,0.2)">Waiting for connections...</p>
                </div>

              </div>
            </div>

            <!-- ═══ ACTIVE STATE — Has downline members ═══ -->
            <div v-else class="relative">

              <!-- Plexus Canvas background -->
              <canvas ref="plexusRef"
                class="absolute inset-0 w-full pointer-events-none"
                style="height:100%;min-height:220px;opacity:0.45"></canvas>

              <!-- Member nodes -->
              <div class="relative z-10 px-3 pt-3 pb-3 space-y-2">
                <div v-for="(user, idx) in allDownline.slice(0, 12)" :key="user.descendant_id"
                  class="downline-node-row flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all"
                  :class="{ 'new-node-flash': user.descendant_id === latestNewMemberId }"
                  :style="user.level === 1
                    ? 'background:rgba(120,80,255,0.1);border:1px solid rgba(120,80,255,0.2)'
                    : 'background:rgba(0,180,255,0.06);border:1px solid rgba(0,180,255,0.12)'">

                  <!-- Avatar node -->
                  <div class="flex-shrink-0 relative">
                    <div class="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black relative overflow-hidden"
                      :style="user.level === 1
                        ? 'background:linear-gradient(135deg,rgba(130,90,255,0.35),rgba(90,50,180,0.25));border:1.5px solid rgba(130,90,255,0.5);box-shadow:0 0 14px rgba(120,80,255,0.3)'
                        : 'background:linear-gradient(135deg,rgba(0,180,255,0.2),rgba(0,120,200,0.15));border:1px solid rgba(0,180,255,0.3);box-shadow:0 0 10px rgba(0,180,255,0.2)'">
                      <span :style="user.level===1 ? 'color:rgba(220,200,255,0.95)' : 'color:rgba(100,210,255,0.9)'">
                        {{ (user.username || '?').charAt(0).toUpperCase() }}
                      </span>
                      <!-- Scan effect on new member -->
                      <div v-if="user.descendant_id === latestNewMemberId" class="absolute inset-0 avatar-scan"></div>
                    </div>
                    <!-- Level badge -->
                    <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-black"
                      :style="user.level===1
                        ? 'background:linear-gradient(135deg,#8050ff,#5030cc);color:#fff;box-shadow:0 0 5px rgba(120,80,255,0.5)'
                        : 'background:linear-gradient(135deg,#0090cc,#006699);color:#fff;box-shadow:0 0 5px rgba(0,160,220,0.4)'">
                      {{ user.level }}
                    </div>
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-1.5">
                      <p class="text-[11px] font-semibold truncate" style="color:rgba(255,255,255,0.78)">
                        {{ user.username || user.descendant_id.substring(0,10) }}
                      </p>
                      <span v-if="user.descendant_id === latestNewMemberId"
                        class="text-[7px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 animate-pulse"
                        style="background:rgba(80,220,120,0.2);border:1px solid rgba(80,220,120,0.4);color:rgba(80,220,120,0.9)">NEW</span>
                    </div>
                    <p class="text-[9px] mt-0.5" style="color:rgba(255,255,255,0.2)">{{ fmtDate(user.created_at) }}</p>
                  </div>

                  <!-- Stats -->
                  <div class="text-right flex-shrink-0">
                    <p class="text-[11px] font-bold" style="color:rgba(200,180,255,0.8)">{{ formatN(user.total_deposit||0) }}</p>
                    <p class="text-[8px]" style="color:rgba(255,255,255,0.18)">VIP {{ user.vip_level||1 }}</p>
                  </div>

                </div>

                <!-- "More members" indicator -->
                <div v-if="allDownline.length > 12" class="text-center py-1.5">
                  <p class="text-[9px]" style="color:rgba(255,255,255,0.2)">+ {{ allDownline.length - 12 }} more members in network</p>
                </div>
              </div>

            </div>

          </div><!-- /real downline card -->

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

    <!-- ══════════════════════════════════════════════════════════════
         ✦ ULTRA LUXURY VIP CASINO LEVEL SYSTEM MODAL ✦
         ══════════════════════════════════════════════════════════════ -->
    <Transition name="level-modal">
      <div v-if="showLevelModal"
        class="fixed inset-0 z-50 flex flex-col justify-end"
        style="background:rgba(0,0,0,0.85);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)">

        <!-- Tap-outside to close -->
        <div class="absolute inset-0" @click="showLevelModal = false"></div>

        <!-- Sheet -->
        <div class="relative rounded-t-[32px] overflow-hidden lux-modal-sheet"
          style="max-height:91vh;background:linear-gradient(180deg,#0c0a1a 0%,#060410 100%);border-top:1px solid rgba(255,200,80,0.18);">

          <!-- Top ambient radial glow -->
          <div class="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style="background:radial-gradient(ellipse at 50% -10%,rgba(255,180,0,0.2) 0%,rgba(120,60,200,0.06) 55%,transparent 80%)"></div>

          <!-- Drag handle -->
          <div class="flex justify-center pt-3 pb-0 relative z-10">
            <div class="w-10 h-1 rounded-full" style="background:rgba(255,255,255,0.15)"></div>
          </div>

          <!-- ── HEADER ── -->
          <div class="sticky top-0 z-20 px-5 pt-4 pb-3 flex items-center justify-between"
            style="background:rgba(8,6,18,0.95);border-bottom:1px solid rgba(255,180,0,0.09);backdrop-filter:blur(20px);">

            <!-- Left: current badge mini + title -->
            <div class="flex items-center gap-3">
              <!-- Mini current badge -->
              <div class="lux-mini-badge relative w-11 h-11 rounded-[12px] overflow-hidden flex-shrink-0"
                :style="currentLevelData.badgeBg + ';box-shadow:0 0 16px 3px ' + currentLevelData.glowColor + ',inset 0 1px 0 rgba(255,255,255,0.2)'">
                <div class="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                  style="background:linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 100%)"></div>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-sm font-black leading-none" :style="currentLevelData.numberStyle">{{ agentLevel }}</span>
                  <span class="text-[6px] font-black tracking-wider uppercase mt-0.5" :style="currentLevelData.tierStyle">{{ currentLevelData.tierName }}</span>
                </div>
              </div>
              <div>
                <p class="text-[9px] font-bold tracking-[0.28em] uppercase" style="color:rgba(255,193,7,0.5)">NOVABETT AGENT</p>
                <h2 class="text-lg font-black tracking-wide" style="color:rgba(255,224,100,0.97);text-shadow:0 0 24px rgba(255,193,7,0.55),0 2px 4px rgba(0,0,0,0.8)">Level System</h2>
              </div>
            </div>

            <!-- Close button -->
            <button @click="showLevelModal = false"
              class="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-all"
              style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.45)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- ── PROGRESS CARD ── -->
          <div class="mx-4 mt-3 mb-2">
            <div v-if="nextLevelData" class="rounded-2xl p-4 relative overflow-hidden"
              style="background:linear-gradient(135deg,rgba(255,180,0,0.07) 0%,rgba(255,120,0,0.04) 100%);border:1px solid rgba(255,180,0,0.14)">
              <div class="absolute inset-0 pointer-events-none"
                style="background:radial-gradient(ellipse at 0% 50%,rgba(255,193,7,0.07) 0%,transparent 60%)"></div>
              <div class="flex items-center justify-between mb-2 relative z-10">
                <div>
                  <p class="text-[9px] tracking-[0.1em] uppercase" style="color:rgba(255,255,255,0.32)">Next Rank</p>
                  <p class="text-[13px] font-black mt-0.5" :style="nextLevelData.numberStyle">{{ nextLevelData.tierName }} LV{{ nextLevelData.level }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[9px]" style="color:rgba(255,255,255,0.32)">Progress</p>
                  <p class="text-lg font-black" style="color:rgba(255,193,7,0.95);text-shadow:0 0 12px rgba(255,193,7,0.5)">{{ levelProgress }}<span class="text-xs">%</span></p>
                </div>
              </div>
              <!-- Progress bar -->
              <div class="h-2 rounded-full overflow-hidden relative z-10" style="background:rgba(255,255,255,0.07)">
                <div class="h-full rounded-full lux-progress-fill transition-all duration-1000 relative overflow-hidden"
                  :style="'width:' + levelProgress + '%;' + currentLevelData.badgeBg">
                  <div class="absolute inset-0 lux-progress-shimmer"></div>
                </div>
              </div>
              <p class="text-[9px] mt-1.5 relative z-10" style="color:rgba(255,255,255,0.25)">
                {{ formatN(Math.max(0, nextLevelData.required - totalCommission)) }} Ks more needed
              </p>
            </div>
            <div v-else class="rounded-2xl p-3 text-center"
              style="background:linear-gradient(135deg,rgba(220,80,255,0.1),rgba(120,0,255,0.08));border:1px solid rgba(220,80,255,0.3)">
              <p class="text-[12px] font-black tracking-wider" style="color:rgba(220,120,255,0.95);text-shadow:0 0 16px rgba(220,80,255,0.6)">✦ MAX LEVEL REACHED ✦</p>
            </div>
          </div>

          <!-- ── COLUMN HEADERS ── -->
          <div class="px-5 py-2 flex items-center gap-2" style="border-bottom:1px solid rgba(255,255,255,0.04)">
            <div class="w-[88px] flex-shrink-0 text-[8px] font-bold tracking-widest uppercase" style="color:rgba(255,255,255,0.2)">Badge</div>
            <div class="flex-1 text-[8px] font-bold tracking-widest uppercase" style="color:rgba(255,255,255,0.2)">Level</div>
            <div class="w-[88px] text-right text-[8px] font-bold tracking-widest uppercase" style="color:rgba(255,255,255,0.2)">Min Commission</div>
            <div class="w-10 text-right text-[8px] font-bold tracking-widest uppercase" style="color:rgba(255,255,255,0.2)">Rate</div>
          </div>

          <!-- ── SCROLLABLE LEVEL ROWS ── -->
          <div class="overflow-y-auto px-3 pt-2 pb-12" style="max-height:54vh">
            <div v-for="lv in AGENT_LEVELS" :key="lv.level"
              class="lv-row flex items-center gap-2 px-2 py-2.5 rounded-2xl mb-1.5 transition-all duration-300"
              :class="lv.level === agentLevel ? 'lv-current' : lv.level < agentLevel ? 'lv-past' : 'lv-future'">

              <!-- VIP Badge pill (reference-image style) -->
              <div class="w-[88px] flex-shrink-0 flex items-center gap-1.5">
                <!-- Hexagon badge shield -->
                <div class="relative flex-shrink-0" style="width:38px;height:42px;">
                  <!-- SVG shield shape -->
                  <svg viewBox="0 0 38 42" class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient :id="`sg${lv.level}`" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop :stop-color="lv.gradStart" offset="0%"/>
                        <stop :stop-color="lv.gradEnd" offset="100%"/>
                      </linearGradient>
                    </defs>
                    <!-- Shield outer -->
                    <path d="M19 2L35 9V24C35 33 19 40 19 40C19 40 3 33 3 24V9L19 2Z"
                      :fill="lv.level <= agentLevel ? `url(#sg${lv.level})` : 'rgba(255,255,255,0.04)'"
                      :stroke="lv.level <= agentLevel ? lv.rimColor : 'rgba(255,255,255,0.08)'"
                      stroke-width="1.2"/>
                    <!-- Inner highlight -->
                    <path d="M19 5L33 11.5V25C33 32 19 38 19 38C19 38 5 32 5 25V11.5L19 5Z"
                      fill="rgba(255,255,255,0.07)"
                      stroke="none"/>
                  </svg>
                  <!-- Crown for Gold+ -->
                  <div v-if="lv.level >= 6 && lv.level <= agentLevel"
                    class="absolute z-10 pointer-events-none"
                    style="top:-6px;left:50%;transform:translateX(-50%);">
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path d="M10 1L14.5 7L20 4L17.5 12H2.5L0 4L5.5 7L10 1Z" :fill="lv.crownColor || '#FFD700'" opacity="0.9"/>
                    </svg>
                  </div>
                  <!-- Number inside shield -->
                  <div class="absolute inset-0 flex items-center justify-center"
                    style="padding-top:4px">
                    <span class="font-black leading-none select-none"
                      :style="`font-size:${lv.level >= 10 ? '12px' : '14px'};` + (lv.level <= agentLevel ? lv.numberStyle : 'color:rgba(255,255,255,0.2)')">
                      {{ lv.level }}
                    </span>
                  </div>
                  <!-- Glow when current -->
                  <div v-if="lv.level === agentLevel"
                    class="absolute inset-0 pointer-events-none lux-row-badge-glow"
                    :style="`box-shadow:0 0 18px 4px ${lv.glowColor};border-radius:4px;`"></div>
                </div>

                <!-- VIP label pill -->
                <div class="flex-1 flex flex-col items-start gap-0.5">
                  <div class="rounded-full px-2 py-0.5 text-[9px] font-black"
                    :style="lv.level <= agentLevel
                      ? `background:${lv.rimColor}22;border:1px solid ${lv.rimColor}55;` + lv.tierStyle
                      : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.2)'">
                    VIP{{ lv.level }}
                  </div>
                  <span v-if="lv.level === agentLevel"
                    class="text-[7px] px-1.5 py-0.5 rounded-full font-black lux-you-badge"
                    style="background:linear-gradient(90deg,rgba(255,215,0,0.25),rgba(255,140,0,0.2));border:1px solid rgba(255,215,0,0.4);color:#FFD700;">
                    ▶ YOU
                  </span>
                </div>
              </div>

              <!-- Level name -->
              <div class="flex-1 min-w-0">
                <span class="text-[12px] font-black"
                  :style="lv.level <= agentLevel ? lv.numberStyle : 'color:rgba(255,255,255,0.22)'">
                  LV {{ lv.level }}
                </span>
                <p class="text-[9px] font-bold"
                  :style="lv.level <= agentLevel ? lv.tierStyle : 'color:rgba(255,255,255,0.15)'">
                  {{ lv.tierName }}
                </p>
              </div>

              <!-- Required commission -->
              <div class="w-[88px] text-right">
                <p class="text-[11px] font-bold"
                  :style="lv.level <= agentLevel ? lv.numberStyle : 'color:rgba(255,255,255,0.2)'">
                  {{ lv.required === 0 ? '—' : formatN(lv.required) + ' Ks' }}
                </p>
              </div>

              <!-- Rate -->
              <div class="w-10 text-right">
                <span class="font-black"
                  :style="`font-size:12px;` + (lv.level === agentLevel ? lv.numberStyle : lv.level < agentLevel ? 'color:rgba(255,255,255,0.35)' : 'color:rgba(255,255,255,0.15)')">
                  {{ lv.rate }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
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
const showLevelModal = ref(false)

// ── Agent Level System Data (Luxury VIP Casino Edition) ─────────────────────
const AGENT_LEVELS = [
  // BRONZE (LV 1-3) — warm copper-bronze metallic
  { level:1,  required:0,       rate:10.0, tierName:'BRONZE',
    gradStart:'#6B3A1F', gradEnd:'#3D1F0A', rimColor:'#CD7F32', glowColor:'rgba(205,127,50,0.6)', crownColor:'#CD7F32',
    badgeBg:'background:linear-gradient(145deg,#6B3A1F 0%,#8B4513 35%,#5C2E0A 65%,#3D1F0A 100%)',
    badgeBorder:'border:1.5px solid rgba(205,127,50,0.6)',  glow:'rgba(205,127,50,0.5)',
    numberStyle:'color:#F4A460;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 20px rgba(205,127,50,0.9),0 0 40px rgba(205,127,50,0.4)',
    tierStyle:'color:rgba(244,164,96,0.85)',
    cornerStyle:'background:linear-gradient(135deg,rgba(205,127,50,0.4),rgba(139,69,19,0.3));border:1px solid rgba(205,127,50,0.6);color:#F4A460' },
  { level:2,  required:100,     rate:10.5, tierName:'BRONZE',
    gradStart:'#7A4020', gradEnd:'#441F0B', rimColor:'#D2822A', glowColor:'rgba(210,130,42,0.6)', crownColor:'#D2822A',
    badgeBg:'background:linear-gradient(145deg,#7A4020 0%,#9B4E18 35%,#63320C 65%,#441F0B 100%)',
    badgeBorder:'border:1.5px solid rgba(210,130,42,0.62)',  glow:'rgba(210,135,55,0.5)',
    numberStyle:'color:#F4A460;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 20px rgba(210,130,42,0.9),0 0 40px rgba(210,130,42,0.4)',
    tierStyle:'color:rgba(244,164,96,0.85)',
    cornerStyle:'background:linear-gradient(135deg,rgba(210,130,42,0.4),rgba(145,75,20,0.3));border:1px solid rgba(210,130,42,0.6);color:#F4A460' },
  { level:3,  required:300,     rate:11.0, tierName:'BRONZE',
    gradStart:'#8B4A22', gradEnd:'#4E2510', rimColor:'#E8922E', glowColor:'rgba(232,146,46,0.65)', crownColor:'#E8922E',
    badgeBg:'background:linear-gradient(145deg,#8B4A22 0%,#B05A1A 35%,#6E350E 65%,#4E2510 100%)',
    badgeBorder:'border:1.5px solid rgba(232,146,46,0.65)',  glow:'rgba(215,140,60,0.5)',
    numberStyle:'color:#FFB347;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 22px rgba(232,146,46,0.9),0 0 45px rgba(232,146,46,0.4)',
    tierStyle:'color:rgba(255,179,71,0.9)',
    cornerStyle:'background:linear-gradient(135deg,rgba(232,146,46,0.4),rgba(160,80,20,0.3));border:1px solid rgba(232,146,46,0.65);color:#FFB347' },

  // SILVER (LV 4-5) — cool chrome silver
  { level:4,  required:500,     rate:11.5, tierName:'SILVER',
    gradStart:'#5A5A70', gradEnd:'#2A2A3A', rimColor:'#C0C0D8', glowColor:'rgba(192,192,216,0.55)', crownColor:'#D8D8EE',
    badgeBg:'background:linear-gradient(145deg,#6A6A80 0%,#8A8AA0 35%,#4A4A60 65%,#2A2A3A 100%)',
    badgeBorder:'border:1.5px solid rgba(192,192,216,0.6)',  glow:'rgba(192,192,210,0.45)',
    numberStyle:'color:#E8E8FF;text-shadow:0 2px 0 rgba(0,0,0,0.6),0 0 20px rgba(200,200,230,0.8),0 0 40px rgba(192,192,216,0.4)',
    tierStyle:'color:rgba(220,220,245,0.85)',
    cornerStyle:'background:linear-gradient(135deg,rgba(192,192,216,0.35),rgba(130,130,160,0.25));border:1px solid rgba(192,192,216,0.55);color:#E8E8FF' },
  { level:5,  required:800,     rate:12.0, tierName:'SILVER',
    gradStart:'#686880', gradEnd:'#323248', rimColor:'#D0D0E8', glowColor:'rgba(208,208,232,0.6)', crownColor:'#E0E0F8',
    badgeBg:'background:linear-gradient(145deg,#767690 0%,#9898B0 35%,#565670 65%,#323248 100%)',
    badgeBorder:'border:1.5px solid rgba(208,208,232,0.65)',  glow:'rgba(205,205,222,0.45)',
    numberStyle:'color:#F0F0FF;text-shadow:0 2px 0 rgba(0,0,0,0.6),0 0 22px rgba(210,210,240,0.85),0 0 45px rgba(208,208,232,0.4)',
    tierStyle:'color:rgba(230,230,250,0.9)',
    cornerStyle:'background:linear-gradient(135deg,rgba(208,208,232,0.38),rgba(150,150,180,0.28));border:1px solid rgba(208,208,232,0.62);color:#F0F0FF' },

  // GOLD (LV 6-7) — deep rich gold with warm luminosity
  { level:6,  required:1000,    rate:12.5, tierName:'GOLD',
    gradStart:'#7A5C00', gradEnd:'#3D2E00', rimColor:'#FFD700', glowColor:'rgba(255,215,0,0.65)', crownColor:'#FFD700',
    badgeBg:'background:linear-gradient(145deg,#8A6800 0%,#B08800 35%,#6A5000 65%,#3D2E00 100%)',
    badgeBorder:'border:2px solid rgba(255,210,0,0.75)',  glow:'rgba(255,210,0,0.55)',
    numberStyle:'color:#FFE500;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 26px rgba(255,215,0,1),0 0 50px rgba(255,193,7,0.5)',
    tierStyle:'color:rgba(255,232,0,0.95)',
    cornerStyle:'background:linear-gradient(135deg,rgba(255,210,0,0.35),rgba(180,140,0,0.25));border:1px solid rgba(255,210,0,0.7);color:#FFE500' },
  { level:7,  required:10000,   rate:13.0, tierName:'GOLD',
    gradStart:'#8A6800', gradEnd:'#4A3600', rimColor:'#FFD700', glowColor:'rgba(255,215,0,0.72)', crownColor:'#FFD700',
    badgeBg:'background:linear-gradient(145deg,#9A7800 0%,#C09800 35%,#7A6000 65%,#4A3600 100%)',
    badgeBorder:'border:2px solid rgba(255,215,0,0.82)',  glow:'rgba(255,215,0,0.6)',
    numberStyle:'color:#FFEC00;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 30px rgba(255,215,0,1),0 0 60px rgba(255,193,7,0.6)',
    tierStyle:'color:rgba(255,236,0,1)',
    cornerStyle:'background:linear-gradient(135deg,rgba(255,215,0,0.38),rgba(190,150,0,0.28));border:1px solid rgba(255,215,0,0.75);color:#FFEC00' },

  // EMERALD (LV 8-9) — vivid emerald green
  { level:8,  required:30000,   rate:13.5, tierName:'EMERALD',
    gradStart:'#004A2A', gradEnd:'#002015', rimColor:'#00C878', glowColor:'rgba(0,200,120,0.65)', crownColor:'#00E090',
    badgeBg:'background:linear-gradient(145deg,#005C32 0%,#007A45 35%,#003A20 65%,#002015 100%)',
    badgeBorder:'border:2px solid rgba(0,200,120,0.7)',  glow:'rgba(0,200,120,0.55)',
    numberStyle:'color:#00F090;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 26px rgba(0,200,120,1),0 0 52px rgba(0,200,120,0.5)',
    tierStyle:'color:rgba(0,230,140,0.95)',
    cornerStyle:'background:linear-gradient(135deg,rgba(0,200,120,0.3),rgba(0,140,80,0.22));border:1px solid rgba(0,200,120,0.6);color:#00F090' },
  { level:9,  required:50000,   rate:14.0, tierName:'EMERALD',
    gradStart:'#005535', gradEnd:'#002A1A', rimColor:'#00DC90', glowColor:'rgba(0,220,144,0.7)', crownColor:'#00F0A0',
    badgeBg:'background:linear-gradient(145deg,#006840 0%,#009055 35%,#004530 65%,#002A1A 100%)',
    badgeBorder:'border:2px solid rgba(0,220,144,0.75)',  glow:'rgba(0,210,130,0.6)',
    numberStyle:'color:#00FFA0;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 30px rgba(0,220,144,1),0 0 60px rgba(0,200,130,0.5)',
    tierStyle:'color:rgba(0,244,150,1)',
    cornerStyle:'background:linear-gradient(135deg,rgba(0,220,144,0.33),rgba(0,160,96,0.25));border:1px solid rgba(0,220,144,0.65);color:#00FFA0' },

  // SAPPHIRE (LV 10-11) — electric blue
  { level:10, required:80000,   rate:14.5, tierName:'SAPPHIRE',
    gradStart:'#003080', gradEnd:'#001540', rimColor:'#0090FF', glowColor:'rgba(0,144,255,0.65)', crownColor:'#40B8FF',
    badgeBg:'background:linear-gradient(145deg,#003C98 0%,#0050C8 35%,#002870 65%,#001540 100%)',
    badgeBorder:'border:2px solid rgba(0,160,255,0.75)',  glow:'rgba(0,160,255,0.6)',
    numberStyle:'color:#40C8FF;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 28px rgba(0,180,255,1),0 0 56px rgba(0,144,255,0.5)',
    tierStyle:'color:rgba(40,208,255,0.95)',
    cornerStyle:'background:linear-gradient(135deg,rgba(0,160,255,0.32),rgba(0,100,200,0.24));border:1px solid rgba(0,160,255,0.65);color:#40C8FF' },
  { level:11, required:100000,  rate:15.0, tierName:'SAPPHIRE',
    gradStart:'#003890', gradEnd:'#001C50', rimColor:'#00AAFF', glowColor:'rgba(0,170,255,0.7)', crownColor:'#60C8FF',
    badgeBg:'background:linear-gradient(145deg,#0048B0 0%,#0064D8 35%,#003088 65%,#001C50 100%)',
    badgeBorder:'border:2px solid rgba(0,180,255,0.8)',  glow:'rgba(0,180,255,0.65)',
    numberStyle:'color:#60D8FF;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 32px rgba(0,200,255,1),0 0 65px rgba(0,170,255,0.55)',
    tierStyle:'color:rgba(60,224,255,1)',
    cornerStyle:'background:linear-gradient(135deg,rgba(0,180,255,0.35),rgba(0,120,210,0.26));border:1px solid rgba(0,180,255,0.7);color:#60D8FF' },

  // RUBY (LV 12) — deep crimson
  { level:12, required:1000000, rate:15.5, tierName:'RUBY',
    gradStart:'#6A0028', gradEnd:'#380012', rimColor:'#FF2060', glowColor:'rgba(255,32,96,0.7)', crownColor:'#FF5080',
    badgeBg:'background:linear-gradient(145deg,#820032 0%,#A80040 35%,#5C001A 65%,#380012 100%)',
    badgeBorder:'border:2px solid rgba(255,50,100,0.8)',  glow:'rgba(255,50,100,0.6)',
    numberStyle:'color:#FF6080;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 30px rgba(255,50,100,1),0 0 60px rgba(255,32,96,0.55)',
    tierStyle:'color:rgba(255,90,118,1)',
    cornerStyle:'background:linear-gradient(135deg,rgba(255,50,100,0.33),rgba(180,0,60,0.25));border:1px solid rgba(255,50,100,0.7);color:#FF6080' },

  // DIAMOND (LV 13) — prismatic purple
  { level:13, required:3000000, rate:16.0, tierName:'DIAMOND',
    gradStart:'#420090', gradEnd:'#200050', rimColor:'#B060FF', glowColor:'rgba(176,96,255,0.72)', crownColor:'#C890FF',
    badgeBg:'background:linear-gradient(145deg,#5000B0 0%,#6800D8 35%,#380088 65%,#200050 100%)',
    badgeBorder:'border:2px solid rgba(180,120,255,0.82)',  glow:'rgba(180,120,255,0.65)',
    numberStyle:'color:#C090FF;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 32px rgba(180,120,255,1),0 0 65px rgba(176,96,255,0.55)',
    tierStyle:'color:rgba(196,148,255,1)',
    cornerStyle:'background:linear-gradient(135deg,rgba(180,120,255,0.35),rgba(120,40,200,0.26));border:1px solid rgba(180,120,255,0.72);color:#C090FF' },

  // LEGEND (LV 14) — blazing orange fire
  { level:14, required:5000000, rate:16.5, tierName:'LEGEND',
    gradStart:'#803000', gradEnd:'#401800', rimColor:'#FF8C00', glowColor:'rgba(255,140,0,0.75)', crownColor:'#FFA020',
    badgeBg:'background:linear-gradient(145deg,#983800 0%,#C84800 35%,#702800 65%,#401800 100%)',
    badgeBorder:'border:2px solid rgba(255,140,0,0.85)',  glow:'rgba(255,140,0,0.7)',
    numberStyle:'color:#FFB030;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 35px rgba(255,160,0,1),0 0 70px rgba(255,100,0,0.6)',
    tierStyle:'color:rgba(255,168,32,1)',
    cornerStyle:'background:linear-gradient(135deg,rgba(255,140,0,0.38),rgba(200,80,0,0.28));border:1px solid rgba(255,140,0,0.78);color:#FFB030' },

  // MYTHIC (LV 15) — cosmic purple void
  { level:15, required:8000000, rate:17.0, tierName:'MYTHIC',
    gradStart:'#580080', gradEnd:'#280040', rimColor:'#DC50FF', glowColor:'rgba(220,80,255,0.8)', crownColor:'#E870FF',
    badgeBg:'background:linear-gradient(145deg,#6800A0 0%,#9000C0 35%,#480078 65%,#280040 100%)',
    badgeBorder:'border:2px solid rgba(220,80,255,0.9)',  glow:'rgba(220,80,255,0.75)',
    numberStyle:'color:#E080FF;text-shadow:0 2px 0 rgba(0,0,0,0.5),0 0 38px rgba(220,80,255,1),0 0 75px rgba(180,0,255,0.7)',
    tierStyle:'color:rgba(224,128,255,1)',
    cornerStyle:'background:linear-gradient(135deg,rgba(220,80,255,0.38),rgba(160,0,240,0.28));border:1px solid rgba(220,80,255,0.8);color:#E080FF' },
]

// Plexus & realtime state
const plexusRef         = ref(null)
const newMemberFlash    = ref(false)
const latestNewMemberId = ref(null)
let   plexusRaf         = null
let   realtimeChannel   = null

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
  window.location.origin + '/?dl=' + (userId.value ? userId.value.substring(0, 8).toUpperCase() : username.value)
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

const agentLevel = computed(() => {
  const comm = totalCommission.value || 0
  for (let i = AGENT_LEVELS.length - 1; i >= 0; i--) {
    if (comm >= AGENT_LEVELS[i].required) return AGENT_LEVELS[i].level
  }
  return 1
})
const currentLevelData = computed(() => AGENT_LEVELS[agentLevel.value - 1])
const nextLevelData     = computed(() => AGENT_LEVELS[agentLevel.value] || null)
const levelProgress     = computed(() => {
  if (!nextLevelData.value) return 100
  const curr = currentLevelData.value.required
  const next = nextLevelData.value.required
  const comm = totalCommission.value || 0
  return Math.min(100, Math.round(((comm - curr) / (next - curr)) * 100))
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
  gsap.from('.floating-node-card', { opacity:0, y:28, duration:0.6, ease:'power3.out', delay:0.12 })
  gsap.from('.tree-node-root', { opacity:0, scale:0.7, duration:0.5, ease:'back.out(1.8)', delay:0.25 })
  gsap.from('.tree-node-b', { opacity:0, scale:0.6, y:12, duration:0.45, stagger:0.08, ease:'back.out(1.6)', delay:0.4 })
  gsap.from('.tree-node-c', { opacity:0, scale:0.6, y:10, duration:0.4, stagger:0.07, ease:'back.out(1.5)', delay:0.6 })
  // Ambient glow pulse
  gsap.to('.referral-tab .absolute.inset-0 .rounded-full:first-child', {
    scale:1.15, opacity:0.7, duration:3.5, yoyo:true, repeat:-1, ease:'sine.inOut'
  })
}

// ── Plexus Canvas Animation ─────────────────────────────────────────────
function initPlexus(canvas) {
  if (!canvas) return
  if (plexusRaf) { cancelAnimationFrame(plexusRaf); plexusRaf = null }

  const ctx  = canvas.getContext('2d')
  const W    = canvas.offsetWidth  || 340
  const H    = canvas.offsetHeight || 280
  canvas.width  = W * window.devicePixelRatio
  canvas.height = H * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  const NUM = 28
  const MAX_DIST = 90
  const pts = Array.from({ length: NUM }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r:  1.4 + Math.random() * 1.4,
    hue: Math.random() > 0.5 ? 260 : 195,
  }))

  function draw() {
    ctx.clearRect(0, 0, W, H)

    // Update positions
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
    }

    // Draw connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x
        const dy = pts[i].y - pts[j].y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.35
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `hsla(${(pts[i].hue + pts[j].hue) / 2},90%,75%,${alpha})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }
    }

    // Draw nodes
    for (const p of pts) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue},90%,80%,0.75)`
      ctx.fill()
      // Glow
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue},90%,80%,0.08)`
      ctx.fill()
    }

    plexusRaf = requestAnimationFrame(draw)
  }
  draw()
}

// ── Supabase Realtime: watch for new downline members ────────────────────
async function setupRealtimeDownline(myUserId) {
  if (realtimeChannel) { supabase.removeChannel(realtimeChannel); realtimeChannel = null }

  realtimeChannel = supabase
    .channel('downline-watch-' + myUserId)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'affiliate_tree', filter: `ancestor_id=eq.${myUserId}` },
      async (payload) => {
        const newRow = payload.new
        if (!newRow || newRow.level === 0) return

        // Fetch the new member's profile
        const { data: prof } = await supabase
          .from('users')
          .select('id, username, vip_level, total_deposit, created_at')
          .eq('id', newRow.descendant_id)
          .single()

        const newMember = { ...(prof || {}), descendant_id: newRow.descendant_id, level: newRow.level }

        // Prepend to downline list (newest first)
        allDownline.value = [newMember, ...allDownline.value]

        // Flash UI
        latestNewMemberId.value = newRow.descendant_id
        newMemberFlash.value = true
        setTimeout(() => { newMemberFlash.value = false }, 4000)
        setTimeout(() => { if (latestNewMemberId.value === newRow.descendant_id) latestNewMemberId.value = null }, 6000)

        // Re-init plexus after DOM update
        await nextTick()
        if (plexusRef.value) initPlexus(plexusRef.value)
      }
    )
    .subscribe()
}

onMounted(async () => {
  await loadAll()
  // Start plexus canvas
  await nextTick()
  if (plexusRef.value) initPlexus(plexusRef.value)
  // Watch plexusRef for when it mounts (tab switch)
  watch(plexusRef, (el) => { if (el) initPlexus(el) })
  // Setup realtime if logged in
  if (userId.value) setupRealtimeDownline(userId.value)
  gsap.from('.fp-card', { opacity:0, y:18, duration:0.45, stagger:0.06, ease:'power2.out', delay:0.05 })
  setTimeout(initTicker, 400)
  if (activeTab.value === 1) animateReferralTab()
})

onUnmounted(() => {
  if (tickerTween) tickerTween.kill()
  if (plexusRaf) { cancelAnimationFrame(plexusRaf); plexusRaf = null }
  if (realtimeChannel) { supabase.removeChannel(realtimeChannel); realtimeChannel = null }
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

/* ── Real Downline Card ──────────────────────────────────── */
.real-downline-card {
  box-shadow:
    0 1px 0 0 rgba(100,80,255,0.06) inset,
    0 20px 50px rgba(0,0,0,0.3);
}

/* Avatar orbit rings */
.avatar-orbit-1 {
  animation: orbitSpin1 12s linear infinite;
}
@keyframes orbitSpin1 {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.avatar-orbit-2 {
  animation: orbitSpin2 18s linear infinite reverse;
}
@keyframes orbitSpin2 {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Avatar hex scan line */
.avatar-scan {
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(200,180,255,0.6), transparent);
  animation: scanDown 2.5s ease-in-out infinite;
}
@keyframes scanDown {
  0%   { top: -2px; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.4; }
  100% { top: 100%; opacity: 0; }
}

/* Open slot dots */
.open-slot-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px dashed rgba(0,200,255,0.4);
  animation: slotPulse 2s ease-in-out infinite;
}
@keyframes slotPulse {
  0%, 100% { border-color: rgba(0,200,255,0.25); box-shadow: none; }
  50%       { border-color: rgba(0,200,255,0.7);  box-shadow: 0 0 8px rgba(0,200,255,0.3); }
}

/* Downline member row */
.downline-node-row {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.downline-node-row:active {
  transform: scale(0.98);
}

/* New member flash animation */
.new-node-flash {
  animation: newFlash 1.5s ease-out;
}
@keyframes newFlash {
  0%   { box-shadow: 0 0 0 0 rgba(80,220,120,0.6); background: rgba(80,220,120,0.18); }
  50%  { box-shadow: 0 0 20px 4px rgba(80,220,120,0.3); }
  100% { box-shadow: none; }
}

/* ══════════════════════════════════════════════════
   ✦ LUXURY VIP BADGE & MODAL SYSTEM ✦
   ══════════════════════════════════════════════════ */

/* ── Main VIP Badge Button ──────────────────────── */
.lux-vip-badge { cursor: pointer; }

/* Ambient outer aura — subtle color bleed */
.lux-outer-aura {
  animation: lux-aura-breathe 3.2s ease-in-out infinite;
}
@keyframes lux-aura-breathe {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50%       { opacity: 1;    transform: scale(1.12); }
}

/* Pulsing border ring */
.lux-pulse-ring {
  animation: lux-ring-pulse 2.6s ease-in-out infinite;
}
@keyframes lux-ring-pulse {
  0%, 100% { opacity: 0.75; }
  50%       { opacity: 1; box-shadow: inherit; filter: brightness(1.3); }
}

/* Diagonal shine sweep across badge body */
.lux-badge-sweep {
  background: linear-gradient(
    118deg,
    transparent 20%,
    rgba(255,255,255,0.0) 35%,
    rgba(255,255,255,0.18) 50%,
    rgba(255,255,255,0.0) 65%,
    transparent 80%
  );
  background-size: 300% 100%;
  animation: lux-sweep 4.2s cubic-bezier(0.4,0,0.6,1) infinite;
}
@keyframes lux-sweep {
  0%        { background-position: 300% 0; }
  40%, 100% { background-position: -50% 0; }
}

/* Embossed number — depth feel */
.lux-embossed-number {
  letter-spacing: -0.02em;
  filter: drop-shadow(0 3px 6px rgba(0,0,0,0.7));
}

/* Crown float animation */
.lux-crown-float {
  animation: lux-crown-float 2.8s ease-in-out infinite;
}
@keyframes lux-crown-float {
  0%, 100% { transform: translateX(-50%) translateY(0);   }
  50%       { transform: translateX(-50%) translateY(-2px); }
}

/* ── Level Modal ────────────────────────────────── */
.lux-modal-sheet {
  box-shadow:
    0 -8px 60px rgba(0,0,0,0.8),
    0 -2px 20px rgba(255,180,0,0.06);
}

/* ── Modal Transitions ──────────────────────────── */
.level-modal-enter-active {
  transition: all 0.38s cubic-bezier(0.16,1,0.3,1);
}
.level-modal-leave-active {
  transition: all 0.24s cubic-bezier(0.4,0,1,1);
}
.level-modal-enter-from > div:last-child { transform: translateY(100%); }
.level-modal-leave-to > div:last-child   { transform: translateY(100%); }
.level-modal-enter-from { opacity: 0; }
.level-modal-leave-to   { opacity: 0; }

/* ── Progress bar shimmer ───────────────────────── */
.lux-progress-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.28) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: lux-shimmer 1.8s linear infinite;
}
@keyframes lux-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* ── Level rows ─────────────────────────────────── */
.lv-row { position: relative; }

.lv-current {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,200,0,0.18);
  box-shadow: 0 2px 20px rgba(255,193,7,0.06), inset 0 1px 0 rgba(255,255,255,0.06);
}
.lv-current::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  border-radius: 8px 0 0 8px;
  background: linear-gradient(180deg, rgba(255,215,0,0.95), rgba(255,140,0,0.75));
  box-shadow: 0 0 14px rgba(255,193,7,0.7);
}

.lv-past {
  background: rgba(255,255,255,0.014);
}

.lv-future {
  opacity: 0.42;
}

/* Row badge glow pulse for current level */
.lux-row-badge-glow {
  animation: lux-row-glow 2.5s ease-in-out infinite;
  pointer-events: none;
}
@keyframes lux-row-glow {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; filter: brightness(1.2); }
}

/* "YOU" badge bounce */
.lux-you-badge {
  animation: lux-you-pulse 2s ease-in-out infinite;
}
@keyframes lux-you-pulse {
  0%, 100% { opacity: 0.9; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.06); }
}

/* Mini badge in modal header */
.lux-mini-badge {
  animation: lux-mini-glow 2.8s ease-in-out infinite;
}
@keyframes lux-mini-glow {
  0%, 100% { filter: brightness(1); }
  50%       { filter: brightness(1.18) saturate(1.15); }
}

/* Old class kept for compatibility */
.level-badge-btn { cursor: pointer; }

</style>
