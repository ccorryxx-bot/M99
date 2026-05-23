<template>
  <div class="agent-page min-h-screen overflow-x-hidden" style="background: #040608; color: rgba(255,255,255,0.85);">

    <!-- ── HEADER ── -->
    <header class="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
      style="background: rgba(4,6,8,0.88); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-bottom: 1px solid rgba(255,255,255,0.05);">
      <button @click="$router.push('/home')" class="flex items-center gap-1.5 transition-opacity active:opacity-50"
        style="color: rgba(255,255,255,0.45);">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        <span class="text-xs font-medium tracking-wider">NovaBETT</span>
      </button>

      <h1 class="text-sm font-bold tracking-[0.15em]" style="color: rgba(255,255,255,0.75);">AGENT DASHBOARD</h1>

      <div class="flex items-center gap-2">
        <!-- Refresh -->
        <button @click="loadAll" :class="loading ? 'animate-spin' : ''"
          class="w-7 h-7 flex items-center justify-center rounded-full transition-all active:scale-90"
          style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4);">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        </button>
      </div>
    </header>

    <!-- ── MAIN SCROLL ── -->
    <div class="pb-32 space-y-3 px-4 pt-4">

      <!-- ── BANNER ── -->
      <div class="agent-panel rounded-2xl overflow-hidden relative" style="height: 148px;">
        <img src="/images/banners/banner2.jpg" class="w-full h-full object-cover" alt="Agent Banner" />
        <!-- Cinematic overlay -->
        <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(4,6,8,0.45) 0%, transparent 50%, rgba(4,6,8,0.25) 100%);"></div>
        <!-- Brand watermark -->
        <div class="absolute bottom-3 left-4">
          <p class="text-[10px] font-black tracking-[0.25em] uppercase" style="color: rgba(255,255,255,0.6);">NOVABETT</p>
          <p class="text-[8px] tracking-[0.15em]" style="color: rgba(255,255,255,0.3);">AGENT PROGRAM</p>
        </div>
        <!-- Commission rate badge -->
        <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full"
          style="background: rgba(255,193,7,0.15); border: 1px solid rgba(255,193,7,0.3); backdrop-filter: blur(8px);">
          <span class="text-[10px] font-bold tracking-wider" style="color: rgba(255,193,7,0.9);">10% COMMISSION</span>
        </div>
      </div>

      <!-- ── AGENT IDENTITY CARD ── -->
      <div class="agent-panel relative rounded-2xl p-4 overflow-hidden"
        style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(20px);">
        <!-- Ambient top glow -->
        <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 pointer-events-none"
          style="background: radial-gradient(ellipse, rgba(255,193,7,0.07) 0%, transparent 70%); filter: blur(8px);"></div>

        <div class="flex items-center gap-3 relative z-10">
          <!-- Rank Badge -->
          <div class="relative flex-shrink-0">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center relative"
              style="background: linear-gradient(135deg, rgba(255,193,7,0.15), rgba(255,152,0,0.1)); border: 1px solid rgba(255,193,7,0.25);">
              <span class="text-2xl font-black" style="color: rgba(255,193,7,0.9);">{{ agentRank }}</span>
              <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style="background: rgba(255,193,7,0.2); border: 1px solid rgba(255,193,7,0.4);">
                <svg class="w-2.5 h-2.5" style="color: rgba(255,193,7,0.9);" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <p class="text-base font-bold truncate" style="color: rgba(255,255,255,0.88);">{{ username }}</p>
              <span v-if="!loadingData" class="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider"
                style="background: rgba(255,193,7,0.12); color: rgba(255,193,7,0.8); border: 1px solid rgba(255,193,7,0.2);">
                AGENT
              </span>
            </div>
            <p class="text-[11px] font-mono" style="color: rgba(255,255,255,0.35);">ID: {{ agentId }}</p>
            <p class="text-[10px] mt-0.5" style="color: rgba(255,255,255,0.28);">Member since {{ memberSince }}</p>
          </div>

          <!-- Right stats -->
          <div class="text-right flex-shrink-0">
            <p class="text-[9px] tracking-wider mb-0.5" style="color: rgba(255,255,255,0.3);">DOWNLINE</p>
            <p class="text-xl font-black" style="color: rgba(255,255,255,0.88);">
              <span v-if="loadingData" class="animate-pulse text-sm">...</span>
              <span v-else>{{ downlineStats.total }}</span>
            </p>
            <p class="text-[9px]" style="color: rgba(100,220,120,0.7);">
              {{ downlineStats.active }} active
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div class="mt-3 mb-3 h-px" style="background: rgba(255,255,255,0.05);"></div>

        <!-- Commission date row -->
        <div class="flex justify-between relative z-10">
          <div>
            <p class="text-[9px] tracking-wider mb-0.5" style="color: rgba(255,255,255,0.28);">ကော်မရှင်ရက်</p>
            <p class="text-xs font-semibold" style="color: rgba(255,255,255,0.6);">{{ todayDate }}</p>
          </div>
          <div class="text-right">
            <p class="text-[9px] tracking-wider mb-0.5" style="color: rgba(255,255,255,0.28);">ထုတ်ငွေရက်</p>
            <p class="text-xs font-semibold" style="color: rgba(255,255,255,0.6);">{{ todayDate }}</p>
          </div>
        </div>
      </div>

      <!-- ── SCROLLING TICKER ── -->
      <div class="agent-panel relative rounded-xl overflow-hidden"
        style="background: linear-gradient(90deg, rgba(255,152,0,0.12), rgba(255,193,7,0.08), rgba(255,152,0,0.12)); border: 1px solid rgba(255,193,7,0.2); height: 40px;">
        <!-- Glow edges -->
        <div class="absolute inset-y-0 left-0 w-8 z-10 pointer-events-none"
          style="background: linear-gradient(to right, rgba(4,6,8,0.8), transparent);"></div>
        <div class="absolute inset-y-0 right-0 w-8 z-10 pointer-events-none"
          style="background: linear-gradient(to left, rgba(4,6,8,0.8), transparent);"></div>
        <!-- Ticker content -->
        <div ref="tickerEl" class="flex items-center h-full whitespace-nowrap">
          <div class="ticker-track flex items-center gap-8 px-4">
            <template v-for="(item, i) in tickerItems" :key="i">
              <span class="flex items-center gap-2 text-[11px] font-semibold">
                <span>🔥</span>
                <span style="color: rgba(255,193,7,0.9);">ID: {{ item.id }}</span>
                <span style="color: rgba(255,255,255,0.45);">ယနေ့ကော်မရှင်:</span>
                <span style="color: rgba(255,193,7,1);">{{ item.amount }} Ks</span>
              </span>
              <span style="color: rgba(255,193,7,0.3);">◆</span>
            </template>
          </div>
        </div>
      </div>

      <!-- ── STATS GRID 2×2 ── -->
      <div class="grid grid-cols-2 gap-2.5">
        <div v-for="stat in statsCards" :key="stat.key"
          class="agent-panel rounded-2xl p-3.5 relative overflow-hidden"
          style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);">
          <!-- Ambient glow -->
          <div class="absolute top-0 right-0 w-12 h-12 pointer-events-none"
            :style="`background: radial-gradient(circle, ${stat.glow} 0%, transparent 70%); filter: blur(8px);`"></div>
          <p class="text-[9px] tracking-[0.1em] mb-1.5 relative z-10" style="color: rgba(255,255,255,0.3);">{{ stat.label }}</p>
          <p class="text-lg font-black relative z-10" :style="`color: ${stat.color};`">
            <span v-if="loadingData" class="text-sm animate-pulse" style="color: rgba(255,255,255,0.2);">...</span>
            <span v-else>{{ formatNumber(stat.value) }}</span>
          </p>
          <p class="text-[8px] mt-0.5 relative z-10" style="color: rgba(255,255,255,0.2);">Ks</p>
        </div>
      </div>

      <!-- ── REFERRAL PANEL ── -->
      <div class="agent-panel rounded-2xl p-4 relative overflow-hidden"
        style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(16px);">
        <!-- Top hairline -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
          style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);"></div>

        <p class="text-[10px] tracking-[0.15em] mb-3" style="color: rgba(255,255,255,0.35);">သင်မျှဝေရန် လင့်ခ်</p>

        <!-- QR + Link row -->
        <div class="flex gap-3 items-start">
          <!-- QR Code -->
          <div class="flex-shrink-0 rounded-xl overflow-hidden p-1.5"
            style="background: white; width: 72px; height: 72px;">
            <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(referralLink)}`"
              class="w-full h-full object-contain" alt="QR Code" />
          </div>

          <!-- Link + copy -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-2 rounded-xl px-3 py-2.5"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07);">
              <p class="text-[11px] font-mono truncate flex-1" style="color: rgba(255,255,255,0.55);">{{ referralLink }}</p>
              <button @click="copyReferral" class="flex-shrink-0 transition-all active:scale-90">
                <svg v-if="!copied" class="w-4 h-4" style="color: rgba(255,255,255,0.35);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <svg v-else class="w-4 h-4" style="color: rgba(100,220,120,0.8);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </button>
            </div>
            <p class="text-[9px]" style="color: rgba(255,255,255,0.22);">ဖိတ်ကုဒ်: <span style="color: rgba(255,193,7,0.7);">{{ username }}</span></p>
          </div>
        </div>

        <!-- ── SOCIAL SHARE BUTTONS ── -->
        <div class="mt-4">
          <p class="text-[9px] tracking-[0.12em] mb-2.5" style="color: rgba(255,255,255,0.25);">မျှဝေရန်</p>
          <div class="grid grid-cols-5 gap-2">
            <!-- Native Share -->
            <button @click="nativeShare"
              class="flex flex-col items-center gap-1.5 active:scale-90 transition-all">
              <div class="w-10 h-10 rounded-2xl flex items-center justify-center"
                style="background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08);">
                <svg class="w-5 h-5" style="color: rgba(255,255,255,0.65);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              </div>
              <span class="text-[9px] font-medium" style="color: rgba(255,255,255,0.35);">မျှဝေ</span>
            </button>

            <!-- Telegram -->
            <button @click="shareVia('telegram')"
              class="flex flex-col items-center gap-1.5 active:scale-90 transition-all">
              <div class="w-10 h-10 rounded-2xl flex items-center justify-center"
                style="background: rgba(42,171,238,0.15); border: 1px solid rgba(42,171,238,0.2);">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="rgba(42,171,238,0.9)">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
                </svg>
              </div>
              <span class="text-[9px] font-medium" style="color: rgba(255,255,255,0.35);">Telegram</span>
            </button>

            <!-- Viber -->
            <button @click="shareVia('viber')"
              class="flex flex-col items-center gap-1.5 active:scale-90 transition-all">
              <div class="w-10 h-10 rounded-2xl flex items-center justify-center"
                style="background: rgba(115,96,242,0.15); border: 1px solid rgba(115,96,242,0.2);">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="rgba(115,96,242,0.9)">
                  <path d="M12.03 0C5.385 0 0 5.385 0 12.03c0 6.645 5.385 12.03 12.03 12.03 6.644 0 12.03-5.385 12.03-12.03C24.06 5.385 18.674 0 12.03 0zm-.03 3.5c1.8 0 3.27.48 4.37 1.43 1.04.89 1.59 2.17 1.59 3.74 0 1.58-.49 2.81-1.37 3.62-.18.17-.49.24-.79.17-.3-.06-.5-.22-.57-.44l-.16-.58c-.05-.19.01-.36.17-.48.44-.37.68-.86.7-1.48 0-1.25-.99-2.27-2.22-2.27-.82 0-1.47.28-1.88.81-.37.48-.56 1.09-.56 1.77 0 .89.24 1.63.7 2.13.38.41.72.6 1.01.55.35-.05.56-.25.59-.55 0-.19-.06-.44-.16-.72l-.36-1.07c-.13-.35-.19-.62-.19-.82 0-.26.08-.46.24-.59.16-.13.38-.19.65-.19.5 0 .91.26 1.19.75.28.49.42 1.15.42 1.98 0 1.33-.48 2.4-1.37 3.12-.89.71-2.07 1.08-3.42 1.08-1.97 0-3.54-.65-4.57-1.89-1-1.24-1.54-2.9-1.54-4.61C4.17 7.15 4.96 5.33 6.49 4.13 7.96 2.98 9.97 2.39 12.03 3.5z"/>
                </svg>
              </div>
              <span class="text-[9px] font-medium" style="color: rgba(255,255,255,0.35);">Viber</span>
            </button>

            <!-- Facebook -->
            <button @click="shareVia('facebook')"
              class="flex flex-col items-center gap-1.5 active:scale-90 transition-all">
              <div class="w-10 h-10 rounded-2xl flex items-center justify-center"
                style="background: rgba(24,119,242,0.15); border: 1px solid rgba(24,119,242,0.2);">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="rgba(24,119,242,0.9)">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span class="text-[9px] font-medium" style="color: rgba(255,255,255,0.35);">Facebook</span>
            </button>

            <!-- WhatsApp -->
            <button @click="shareVia('whatsapp')"
              class="flex flex-col items-center gap-1.5 active:scale-90 transition-all">
              <div class="w-10 h-10 rounded-2xl flex items-center justify-center"
                style="background: rgba(37,211,102,0.15); border: 1px solid rgba(37,211,102,0.2);">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="rgba(37,211,102,0.9)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span class="text-[9px] font-medium" style="color: rgba(255,255,255,0.35);">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── QUICK ACTIONS ── -->
      <div class="grid grid-cols-2 gap-2.5">
        <button @click="activeTab = 'downline'"
          class="agent-panel rounded-2xl p-3.5 flex items-center gap-3 active:scale-[0.97] transition-all text-left"
          style="background: rgba(255,193,7,0.08); border: 1px solid rgba(255,193,7,0.15);">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style="background: rgba(255,193,7,0.12);">
            <svg class="w-4.5 h-4.5 w-[18px] h-[18px]" style="color: rgba(255,193,7,0.8);" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>
          <div>
            <p class="text-xs font-bold" style="color: rgba(255,193,7,0.85);">အဆင့်ခွဲ</p>
            <p class="text-[9px]" style="color: rgba(255,255,255,0.3);">Downline List</p>
          </div>
          <svg class="w-4 h-4 ml-auto" style="color: rgba(255,193,7,0.4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button @click="activeTab = 'commission'"
          class="agent-panel rounded-2xl p-3.5 flex items-center gap-3 active:scale-[0.97] transition-all text-left"
          style="background: rgba(100,200,120,0.08); border: 1px solid rgba(100,200,120,0.15);">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style="background: rgba(100,200,120,0.12);">
            <svg class="w-[18px] h-[18px]" style="color: rgba(100,220,120,0.8);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <p class="text-xs font-bold" style="color: rgba(100,220,120,0.85);">ကော်မရှင်</p>
            <p class="text-[9px]" style="color: rgba(255,255,255,0.3);">Commission History</p>
          </div>
          <svg class="w-4 h-4 ml-auto" style="color: rgba(100,220,120,0.4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- ── CONTENT SECTION (dynamic tabs) ── -->

      <!-- DOWNLINE LIST -->
      <div v-if="activeTab === 'downline'" class="agent-panel rounded-2xl overflow-hidden"
        style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
        <!-- Tab header -->
        <div class="flex items-center justify-between px-4 py-3"
          style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <p class="text-xs font-bold tracking-wider" style="color: rgba(255,255,255,0.6);">DOWNLINE LIST</p>
          <div class="flex gap-2 items-center">
            <!-- Search -->
            <input v-model="searchQuery" type="text" placeholder="ရှာဖွေ..."
              class="text-xs px-2.5 py-1 rounded-lg focus:outline-none"
              style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); width: 100px;" />
            <button @click="activeTab = 'overview'"
              class="w-6 h-6 flex items-center justify-center rounded-full"
              style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4);">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <!-- List -->
        <div class="divide-y" style="divide-color: rgba(255,255,255,0.04);">
          <div v-if="loadingData" class="p-6 text-center">
            <div class="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-2"
              style="border-color: rgba(255,255,255,0.15); border-top-color: transparent;"></div>
            <p class="text-xs" style="color: rgba(255,255,255,0.25);">Loading...</p>
          </div>
          <div v-else-if="filteredDownline.length === 0" class="p-8 text-center">
            <p class="text-sm mb-1" style="color: rgba(255,255,255,0.3);">Downline မရှိသေးပါ</p>
            <p class="text-xs" style="color: rgba(255,255,255,0.18);">Referral link မျှဝေပြီး အဖွဲ့ဝင်ဖိတ်ပါ</p>
          </div>
          <div v-else v-for="user in filteredDownline" :key="user.id"
            class="flex items-center justify-between px-4 py-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style="background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.55);">
                {{ (user.username || '?').charAt(0) }}
              </div>
              <div>
                <p class="text-xs font-semibold" style="color: rgba(255,255,255,0.75);">{{ user.username }}</p>
                <p class="text-[9px]" style="color: rgba(255,255,255,0.25);">{{ user.created_at ? new Date(user.created_at).toLocaleDateString() : '-' }}</p>
              </div>
            </div>
            <div class="text-right">
              <span :style="user.is_active ? 'color: rgba(100,220,120,0.8)' : 'color: rgba(255,255,255,0.25)'"
                class="text-[9px] font-bold">
                ● {{ user.is_active ? 'Active' : 'Inactive' }}
              </span>
              <p class="text-[10px] font-semibold mt-0.5" style="color: rgba(255,193,7,0.7);">
                {{ formatNumber(user.total_deposit || 0) }} Ks
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- COMMISSION HISTORY -->
      <div v-else-if="activeTab === 'commission'" class="agent-panel rounded-2xl overflow-hidden"
        style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
        <div class="flex items-center justify-between px-4 py-3"
          style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <p class="text-xs font-bold tracking-wider" style="color: rgba(255,255,255,0.6);">COMMISSION HISTORY</p>
          <button @click="activeTab = 'overview'"
            class="w-6 h-6 flex items-center justify-center rounded-full"
            style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4);">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="divide-y" style="divide-color: rgba(255,255,255,0.04);">
          <div v-if="commissionHistory.length === 0" class="p-8 text-center">
            <p class="text-sm mb-1" style="color: rgba(255,255,255,0.3);">ကော်မရှင်မှတ်တမ်း မရှိသေးပါ</p>
            <p class="text-xs" style="color: rgba(255,255,255,0.18);">Downline ကစားမှသာ ကော်မရှင်ရပါမည်</p>
          </div>
          <div v-else v-for="tx in commissionHistory" :key="tx.id"
            class="flex items-center justify-between px-4 py-3">
            <div>
              <p class="text-xs font-semibold" style="color: rgba(255,255,255,0.7);">Commission</p>
              <p class="text-[9px]" style="color: rgba(255,255,255,0.25);">{{ tx.created_at ? new Date(tx.created_at).toLocaleDateString() : '-' }}</p>
            </div>
            <p class="text-sm font-bold" style="color: rgba(100,220,120,0.85);">+{{ formatNumber(tx.amount) }} Ks</p>
          </div>
        </div>
      </div>

      <!-- OVERVIEW (default) — Tutorial card -->
      <div v-else class="agent-panel rounded-2xl p-4 relative overflow-hidden"
        style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
        <p class="text-[10px] tracking-[0.15em] mb-3" style="color: rgba(255,255,255,0.3);">ကော်မရှင်ပုံစံ</p>
        <div class="space-y-2.5">
          <div class="flex items-start gap-3">
            <span class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5"
              style="background: rgba(255,193,7,0.15); color: rgba(255,193,7,0.8); border: 1px solid rgba(255,193,7,0.2);">1</span>
            <p class="text-xs" style="color: rgba(255,255,255,0.55);">
              <span style="color: rgba(255,193,7,0.8);">Level 1</span> (Direct): Turnover × <strong style="color: rgba(255,255,255,0.8);">10%</strong>
            </p>
          </div>
          <div class="flex items-start gap-3">
            <span class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5"
              style="background: rgba(100,200,120,0.15); color: rgba(100,220,120,0.8); border: 1px solid rgba(100,220,120,0.2);">2</span>
            <p class="text-xs" style="color: rgba(255,255,255,0.55);">
              <span style="color: rgba(100,220,120,0.8);">Level 2+</span>: Turnover × 10% × 30% ≈ <strong style="color: rgba(255,255,255,0.8);">3%</strong>
            </p>
          </div>
          <div class="flex items-start gap-3">
            <span class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5"
              style="background: rgba(150,100,255,0.15); color: rgba(180,130,255,0.8); border: 1px solid rgba(150,100,255,0.2);">∞</span>
            <p class="text-xs" style="color: rgba(255,255,255,0.55);">အဆင့်အကန့်အသတ်မရှိ — Unlimited depth</p>
          </div>
        </div>
        <p class="text-[9px] mt-3 pt-3" style="border-top: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.2);">
          ကစားသောသူ Win/Loss မဟုတ်ဘဲ Turnover ကိုသာ အခြေခံသည်
        </p>
      </div>

      <!-- ── GAME POOL ── -->
      <div class="agent-panel rounded-2xl p-4"
        style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
        <div class="flex items-center justify-between mb-3">
          <p class="text-[10px] tracking-[0.15em]" style="color: rgba(255,255,255,0.3);">ပွဲအတွက် စုဆောင်းငွေ</p>
          <button class="text-[9px] px-2 py-1 rounded-lg transition-all active:scale-95"
            style="background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.35);">
            လက်ခံမည်
          </button>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xl font-black" style="color: rgba(255,255,255,0.1);">0.00</p>
          <p class="text-[9px]" style="color: rgba(255,255,255,0.2);">Ks</p>
        </div>
      </div>

    </div><!-- /main scroll -->

    <!-- ── BOTTOM NAVIGATION ── -->
    <nav class="fixed bottom-0 left-0 right-0 z-40 py-2"
      style="background: rgba(4,6,8,0.92); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-top: 1px solid rgba(255,255,255,0.05);">
      <div class="flex justify-around items-center px-2">
        <router-link to="/home" class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
          :style="$route.path === '/home' ? 'color: rgba(255,193,7,0.9)' : 'color: rgba(255,255,255,0.3)'">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span class="text-[9px] font-semibold">Home</span>
        </router-link>
        <router-link to="/promotions" class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
          :style="$route.path === '/promotions' ? 'color: rgba(255,193,7,0.9)' : 'color: rgba(255,255,255,0.3)'">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 12v8H4v-8l8-8 8 8zm-2 2H6v4h12v-4zM12 2l-8 8h16l-8-8z"/></svg>
          <span class="text-[9px] font-semibold">Promo</span>
        </router-link>
        <router-link to="/agent" class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
          :style="$route.path === '/agent' ? 'color: rgba(255,193,7,0.9)' : 'color: rgba(255,255,255,0.3)'">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          <span class="text-[9px] font-semibold">Agent</span>
        </router-link>
        <router-link to="/service" class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
          :style="$route.path === '/service' ? 'color: rgba(255,193,7,0.9)' : 'color: rgba(255,255,255,0.3)'">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          <span class="text-[9px] font-semibold">Chat</span>
        </router-link>
        <router-link to="/account" class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
          :style="$route.path === '/account' ? 'color: rgba(255,193,7,0.9)' : 'color: rgba(255,255,255,0.3)'">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="text-[9px] font-semibold">You</span>
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
const username    = ref(localStorage.getItem('sb_username') || 'AGENT')
const agentId     = ref('')
const memberSince = ref('—')
const loading     = ref(false)
const loadingData = ref(true)
const activeTab   = ref('overview')
const copied      = ref(false)
const searchQuery = ref('')

// Balances / stats
const mainBalance       = ref(0)
const commissionBalance = ref(0)
const bonusBalance      = ref(0)
const directTurnover    = ref(0)
const downlineUsers     = ref([])
const commissionHistory = ref([])

const referralLink = computed(() =>
  window.location.origin + '/?dl=' + username.value.toUpperCase()
)

const todayDate = computed(() => new Date().toLocaleDateString('en-GB', {
  day: '2-digit', month: '2-digit', year: 'numeric'
}))

// Agent rank based on downline count
const agentRank = computed(() => {
  const n = downlineUsers.value.length
  if (n >= 100) return 'S'
  if (n >= 50)  return 'A'
  if (n >= 20)  return 'B'
  if (n >= 5)   return 'C'
  return '1'
})

const downlineStats = computed(() => ({
  total:  downlineUsers.value.length,
  active: downlineUsers.value.filter(u => u.is_active).length
}))

const filteredDownline = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return downlineUsers.value
  return downlineUsers.value.filter(u =>
    (u.username || '').toLowerCase().includes(q)
  )
})

// Stats cards
const statsCards = computed(() => [
  {
    key: 'commission',
    label: 'ကော်မရှင်',
    value: commissionBalance.value,
    color: 'rgba(255,193,7,0.9)',
    glow: 'rgba(255,193,7,0.08)'
  },
  {
    key: 'bonus',
    label: 'ဆုလာဘ်',
    value: bonusBalance.value,
    color: 'rgba(100,220,120,0.85)',
    glow: 'rgba(100,220,120,0.07)'
  },
  {
    key: 'turnover',
    label: 'တိုက်ရိုက်လည်ပတ်မှု',
    value: directTurnover.value,
    color: 'rgba(140,180,255,0.85)',
    glow: 'rgba(100,140,255,0.06)'
  },
  {
    key: 'main',
    label: 'လစာအပြည့်',
    value: mainBalance.value,
    color: 'rgba(255,255,255,0.7)',
    glow: 'rgba(255,255,255,0.04)'
  }
])

// Ticker items (simulated + real top earners)
const tickerItems = ref([
  { id: '15****810', amount: '669,810' },
  { id: '22****345', amount: '412,500' },
  { id: '09****671', amount: '287,000' },
  { id: '33****089', amount: '198,750' },
  { id: '18****222', amount: '145,200' },
])

// ── Supabase Data Load ─────────────────────────────────────
async function loadAll() {
  loading.value = true
  loadingData.value = true
  try {
    const { data: { user }, error: authErr } = await supabase.auth.getUser()
    if (authErr || !user) { loadingData.value = false; loading.value = false; return }

    // Agent ID from user UUID
    agentId.value = user.id.substring(0, 8).toUpperCase()

    // Member since
    if (user.created_at) {
      memberSince.value = new Date(user.created_at).toLocaleDateString('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      })
    }

    // Username sync
    if (user.user_metadata?.username) {
      username.value = user.user_metadata.username
      localStorage.setItem('sb_username', username.value)
    }

    // Wallet balances
    await loadWallet(user.id)

    // Downline (users referred by this user)
    await loadDownline(user.id)

    // Commission transactions
    await loadCommissionHistory(user.id)

  } catch (err) {
    console.error('[AgentDashboard] loadAll error:', err)
  } finally {
    loadingData.value = false
    loading.value = false
  }
}

async function loadWallet(userId) {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('main_balance, bonus_balance, commission_balance')
      .eq('user_id', userId)
      .single()

    if (error) {
      // commission_balance column might not exist — graceful fallback
      const { data: w2 } = await supabase
        .from('wallets')
        .select('main_balance, bonus_balance')
        .eq('user_id', userId)
        .single()
      if (w2) {
        mainBalance.value   = Number(w2.main_balance)   || 0
        bonusBalance.value  = Number(w2.bonus_balance)  || 0
      }
    } else if (data) {
      mainBalance.value         = Number(data.main_balance)         || 0
      bonusBalance.value        = Number(data.bonus_balance)        || 0
      commissionBalance.value   = Number(data.commission_balance)   || 0
    }
  } catch (e) {
    console.error('[AgentDashboard] loadWallet:', e)
  }
}

async function loadDownline(userId) {
  try {
    // Try common column names for referral relationship
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, created_at, is_active, total_deposit')
      .eq('referred_by', userId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      downlineUsers.value = data
      return
    }

    // Fallback: try 'users' table
    const { data: d2, error: e2 } = await supabase
      .from('users')
      .select('id, username, created_at, is_active, total_deposit')
      .eq('referred_by', userId)

    if (!e2 && d2) {
      downlineUsers.value = d2
    }

  } catch (e) {
    console.error('[AgentDashboard] loadDownline:', e)
  }
}

async function loadCommissionHistory(userId) {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('id, amount, created_at, status')
      .eq('user_id', userId)
      .eq('type', 'commission')
      .eq('status', 'confirmed')
      .order('created_at', { ascending: false })
      .limit(20)

    if (!error && data) {
      commissionHistory.value = data

      // Sum commission from transactions if commission_balance not in wallet
      if (commissionBalance.value === 0 && data.length > 0) {
        commissionBalance.value = data.reduce((s, t) => s + Number(t.amount), 0)
      }
    }
  } catch (e) {
    console.error('[AgentDashboard] loadCommissionHistory:', e)
  }
}

// ── Interactions ────────────────────────────────────────────
function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(Math.floor(num || 0))
}

function copyReferral() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(referralLink.value)
      .then(() => { copied.value = true; setTimeout(() => { copied.value = false }, 2200) })
  } else {
    prompt('Copy manually:', referralLink.value)
  }
}

function shareVia(platform) {
  const url  = encodeURIComponent(referralLink.value)
  const text = encodeURIComponent(`NovaBETT မှာ ကစားပါ! ကျွန်တော်၏ referral link: ${referralLink.value}`)

  const urls = {
    telegram:  `https://t.me/share/url?url=${url}&text=${text}`,
    viber:     `viber://forward?text=${text}%20${url}`,
    facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp:  `https://wa.me/?text=${text}%20${url}`
  }
  if (urls[platform]) window.open(urls[platform], '_blank')
}

async function nativeShare() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'NovaBETT Agent Referral',
        text:  'NovaBETT မှာ ကစားပါ! အကောင့်ဖွင့်ပြီး ဆုများရယူပါ',
        url:   referralLink.value
      })
    } catch (e) { /* user cancelled */ }
  } else {
    copyReferral()
  }
}

// ── GSAP Animations ─────────────────────────────────────────
const tickerEl = ref(null)
let tickerAnim = null

function startTicker() {
  if (!tickerEl.value) return
  const track = tickerEl.value.querySelector('.ticker-track')
  if (!track) return
  const w = track.offsetWidth
  gsap.set(track, { x: 0 })
  tickerAnim = gsap.to(track, {
    x: -w / 2,
    duration: 18,
    ease: 'none',
    repeat: -1
  })
}

onMounted(async () => {
  // Load data
  await loadAll()

  // Stagger panel entrance
  gsap.from('.agent-panel', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.07,
    ease: 'power2.out',
    delay: 0.1
  })

  // Start ticker
  setTimeout(startTicker, 300)
})

onUnmounted(() => {
  if (tickerAnim) tickerAnim.kill()
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Duplicate ticker track for seamless loop */
.ticker-track {
  display: flex;
  animation: none;
}

/* Agent page — no white flash */
.agent-page { -webkit-tap-highlight-color: transparent; }

/* Card hover depth on desktop */
@media (hover: hover) {
  .agent-panel {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .agent-panel:active {
    transform: translateY(1px);
  }
}
</style>
