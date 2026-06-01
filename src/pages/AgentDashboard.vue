<template>
  <div class="agent-page min-h-screen overflow-x-hidden" style="color: #1a2b1a;">

    <!-- ── HEADER ── -->
    <header class="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
      style="background: #b0baaf; border-bottom: 1px solid rgba(0,0,0,0.09);">
      <button @click="$router.push('/home')" class="flex items-center gap-1.5 active:opacity-50 transition-opacity"
        style="color: #1a2b1a;">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        <span class="text-xs font-medium tracking-wider">NovaBETT</span>
      </button>
      <span class="text-sm font-bold tracking-wide" style="color:#1a2b1a;">Agent Dashboard</span>
      <button @click="loadAll" :class="['w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90', loading ? 'animate-spin' : '']"
        style="background: transparent; border: none; color: #1a2b1a;">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
      </button>
    </header>

    <!-- ── SCROLLABLE TAB BAR ── -->
    <div class="sticky z-30 no-scrollbar overflow-x-auto"
      style="top: 49px; background: #b0baaf; border-bottom: 1px solid rgba(0,0,0,0.09);">
      <div class="flex items-center gap-0.5 px-3 py-2 w-max">
        <button v-for="(tab, i) in tabs" :key="i" @click="activeTab = i"
          class="flex-shrink-0 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-200 whitespace-nowrap"
          :style="activeTab === i
            ? 'color: #1a2b1a; font-weight:700; border-bottom: 2px solid #717a71; padding-bottom: 4px;'
            : 'color: rgba(0,0,0,0.45);'">
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

        <!-- Banner — Dynamic image (from settings / upload) -->
        <div class="fp-card rounded-2xl overflow-hidden relative" style="height: 148px;">
          <img :src="agentBannerUrl" class="w-full h-full object-cover" alt="Agent Banner"
            @error="agentBannerUrl = '/images/banners/banner1.jpg'" />
          <div class="absolute inset-0 pointer-events-none"
            style="background: linear-gradient(to right, rgba(4,6,8,0.55) 0%, transparent 55%, rgba(4,6,8,0.2) 100%);"></div>
          <!-- Commission badge -->
          <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full"
            style="background: rgba(255,193,7,0.15); border: 1px solid rgba(255,193,7,0.3); backdrop-filter: blur(8px);">
            <span class="text-[10px] font-bold tracking-wider" style="color: rgba(255,193,7,0.9);">10% COMMISSION</span>
          </div>
          <!-- Bottom label -->
          <div class="absolute bottom-3 left-4">
            <p class="text-[9px] font-black tracking-[0.25em] uppercase" style="color: rgba(0,0,0,0.45);">NOVABETT AGENT PROGRAM</p>
          </div>
        </div>

        <!-- Agent Identity Card -->
        <div class="fp-card rounded-2xl p-4 relative overflow-hidden"
          style="background: rgba(255,255,255,0.38); border: 1px solid rgba(26,43,26,0.12); box-shadow: 0 4px 20px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.55); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-16 pointer-events-none"
            style="background: radial-gradient(ellipse, rgba(255,193,7,0.06) 0%, transparent 70%); filter: blur(10px);"></div>

          <div class="flex items-center gap-3">
            <!-- ══════════════════════════════════════════════
                 EVOLUTION AGENT BADGE — silhouette changes per tier
                 Bronze→simple shield · Silver→spikes · Gold→crown
                 Emerald→wing-buds · Sapphire→full wings
                 Ruby→battle wings · Diamond→grand pendant
                 Legend→flame wings · Mythic→cosmic legendary
                 ══════════════════════════════════════════════ -->
            <div style="position:relative;width:90px;height:90px;flex-shrink:0;overflow:visible;z-index:2;">
              <button @click="showLevelModal = true"
                class="active:scale-90 transition-transform duration-200"
                style="position:absolute;inset:0;cursor:pointer;background:none;border:none;padding:0;display:flex;align-items:center;justify-content:center;">
                <!-- LV1 — Bronze -->
                  <svg v-if="agentLevel===1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" width="80" height="90">
                    <defs>
                      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#cd7f32"/>
                        <stop offset="100%" stop-color="#8b4513"/>
                      </linearGradient>
                    </defs>
                    <path d="M40 6 L70 18 L70 50 Q70 75 40 86 Q10 75 10 50 L10 18 Z" fill="url(#g1)" stroke="#a0522d" stroke-width="2"/>
                    <path d="M40 12 L64 22 L64 50 Q64 70 40 80 Q16 70 16 50 L16 22 Z" fill="none" stroke="#e8a060" stroke-width="1" opacity="0.5"/>
                    <text x="40" y="52" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">LV1</text>
                  </svg>
                  <!-- LV2 — Bronze II -->
                  <svg v-else-if="agentLevel===2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" width="80" height="90">
                    <defs>
                      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#d4903a"/>
                        <stop offset="100%" stop-color="#7a3c10"/>
                      </linearGradient>
                    </defs>
                    <path d="M40 6 L70 18 L70 50 Q70 75 40 86 Q10 75 10 50 L10 18 Z" fill="url(#g2)" stroke="#c47830" stroke-width="2"/>
                    <path d="M40 12 L64 22 L64 50 Q64 70 40 80 Q16 70 16 50 L16 22 Z" fill="none" stroke="#f0b870" stroke-width="1" opacity="0.6"/>
                    <circle cx="12" cy="44" r="2.5" fill="#f0b870" opacity="0.7"/>
                    <circle cx="28" cy="16" r="2.5" fill="#f0b870" opacity="0.7"/>
                    <circle cx="52" cy="16" r="2.5" fill="#f0b870" opacity="0.7"/>
                    <circle cx="68" cy="44" r="2.5" fill="#f0b870" opacity="0.7"/>
                    <circle cx="56" cy="70" r="2.5" fill="#f0b870" opacity="0.7"/>
                    <circle cx="24" cy="70" r="2.5" fill="#f0b870" opacity="0.7"/>
                    <text x="40" y="52" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">LV2</text>
                  </svg>
                  <!-- LV3 — Bronze III -->
                  <svg v-else-if="agentLevel===3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" width="80" height="90">
                    <defs>
                      <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#e09040"/>
                        <stop offset="100%" stop-color="#6b3010"/>
                      </linearGradient>
                      <style>@keyframes p3{0%,100%{opacity:0.3}50%{opacity:0.9}}</style>
                    </defs>
                    <path d="M40 4 L72 17 L72 50 Q72 77 40 88 Q8 77 8 50 L8 17 Z" fill="url(#g3)" stroke="#c47830" stroke-width="2.5"/>
                    <path d="M40 4 L72 17 L72 50 Q72 77 40 88 Q8 77 8 50 L8 17 Z" fill="none" stroke="#ffcc80" stroke-width="1.5" opacity="0.4" style="animation:p3 2s ease-in-out infinite"/>
                    <path d="M40 14 L62 24 L62 50 Q62 68 40 78 Q18 68 18 50 L18 24 Z" fill="none" stroke="#f0a050" stroke-width="1" opacity="0.5"/>
                    <line x1="40" y1="18" x2="40" y2="78" stroke="#f0b060" stroke-width="0.8" opacity="0.3"/>
                    <line x1="18" y1="44" x2="62" y2="44" stroke="#f0b060" stroke-width="0.8" opacity="0.3"/>
                    <text x="40" y="52" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">LV3</text>
                  </svg>
                  <!-- LV4 — Silver -->
                  <svg v-else-if="agentLevel===4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" width="80" height="90">
                    <defs>
                      <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#c0cdd8"/>
                        <stop offset="100%" stop-color="#607080"/>
                      </linearGradient>
                      <style>@keyframes p4{0%,100%{opacity:0.2}50%{opacity:0.7}}</style>
                    </defs>
                    <path d="M40 4 L72 17 L72 50 Q72 77 40 88 Q8 77 8 50 L8 17 Z" fill="url(#g4)" stroke="#90a8b8" stroke-width="2.5"/>
                    <path d="M40 4 L72 17 L72 50 Q72 77 40 88 Q8 77 8 50 L8 17 Z" fill="none" stroke="#e0eaf0" stroke-width="1.5" opacity="0.5" style="animation:p4 2.5s ease-in-out infinite"/>
                    <path d="M40 14 L62 24 L62 50 Q62 68 40 78 Q18 68 18 50 L18 24 Z" fill="none" stroke="#b0c8d8" stroke-width="1.2"/>
                    <line x1="28" y1="30" x2="52" y2="30" stroke="#d0e0ea" stroke-width="1.5" stroke-linecap="round"/>
                    <line x1="28" y1="60" x2="52" y2="60" stroke="#d0e0ea" stroke-width="1.5" stroke-linecap="round"/>
                    <text x="40" y="52" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">LV4</text>
                  </svg>
                  <!-- LV5 — Silver II -->
                  <svg v-else-if="agentLevel===5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" width="80" height="90">
                    <defs>
                      <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#d0dde8"/>
                        <stop offset="100%" stop-color="#506070"/>
                      </linearGradient>
                      <style>@keyframes spin5{from{transform-origin:40px 44px;transform:rotate(0deg)}to{transform-origin:40px 44px;transform:rotate(360deg)}}</style>
                    </defs>
                    <path d="M40 4 L72 17 L72 50 Q72 77 40 88 Q8 77 8 50 L8 17 Z" fill="url(#g5)" stroke="#90a8c0" stroke-width="2.5"/>
                    <circle cx="40" cy="44" r="22" fill="none" stroke="#b0c8d8" stroke-width="0.8" stroke-dasharray="4,3" style="animation:spin5 12s linear infinite"/>
                    <path d="M40 14 L62 24 L62 50 Q62 68 40 78 Q18 68 18 50 L18 24 Z" fill="none" stroke="#c0d8e8" stroke-width="1"/>
                    <rect x="24" y="18" width="8" height="8" rx="2" fill="none" stroke="#d0e8f0" stroke-width="1.5" transform="rotate(45,28,22)"/>
                    <rect x="48" y="18" width="8" height="8" rx="2" fill="none" stroke="#d0e8f0" stroke-width="1.5" transform="rotate(45,52,22)"/>
                    <rect x="24" y="62" width="8" height="8" rx="2" fill="none" stroke="#d0e8f0" stroke-width="1.5" transform="rotate(45,28,66)"/>
                    <rect x="48" y="62" width="8" height="8" rx="2" fill="none" stroke="#d0e8f0" stroke-width="1.5" transform="rotate(45,52,66)"/>
                    <text x="40" y="52" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">LV5</text>
                  </svg>
                  <!-- LV6 — Silver III -->
                  <svg v-else-if="agentLevel===6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" width="80" height="90">
                    <defs>
                      <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#c8d8b0"/>
                        <stop offset="100%" stop-color="#486050"/>
                      </linearGradient>
                      <style>@keyframes spinS6{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}</style>
                    </defs>
                    <path d="M40 4 L72 17 L72 50 Q72 77 40 88 Q8 77 8 50 L8 17 Z" fill="url(#g6)" stroke="#80a890" stroke-width="2.5"/>
                    <path d="M40 14 L62 24 L62 50 Q62 68 40 78 Q18 68 18 50 L18 24 Z" fill="none" stroke="#a0c8b0" stroke-width="1.2"/>
                    <g style="transform-origin:40px 44px;animation:spinS6 8s linear infinite">
                      <line x1="40" y1="44" x2="60" y2="44" stroke="#b0e0c0" stroke-width="0.8" opacity="0.5"/>
                      <line x1="40" y1="44" x2="50" y2="61" stroke="#b0e0c0" stroke-width="0.8" opacity="0.5"/>
                      <line x1="40" y1="44" x2="30" y2="61" stroke="#b0e0c0" stroke-width="0.8" opacity="0.5"/>
                      <line x1="40" y1="44" x2="20" y2="44" stroke="#b0e0c0" stroke-width="0.8" opacity="0.5"/>
                      <line x1="40" y1="44" x2="30" y2="27" stroke="#b0e0c0" stroke-width="0.8" opacity="0.5"/>
                      <line x1="40" y1="44" x2="50" y2="27" stroke="#b0e0c0" stroke-width="0.8" opacity="0.5"/>
                    </g>
                    <polygon points="40,28 43,38 53,38 45,44 48,54 40,48 32,54 35,44 27,38 37,38" fill="#c0e8c8" stroke="#80c090" stroke-width="1"/>
                    <text x="40" y="68" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold" font-family="monospace">LV6</text>
                  </svg>
                  <!-- LV7 — Gold -->
                  <svg v-else-if="agentLevel===7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 96" width="80" height="96">
                    <defs>
                      <linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffd700"/>
                        <stop offset="100%" stop-color="#b8860b"/>
                      </linearGradient>
                      <style>@keyframes glow7{0%,100%{opacity:0.3}50%{opacity:1}}</style>
                    </defs>
                    <path d="M24 18 L28 8 L40 16 L52 8 L56 18 Z" fill="#ffd700" stroke="#daa520" stroke-width="1.5"/>
                    <circle cx="28" cy="8" r="3" fill="#ffd700"/>
                    <circle cx="40" cy="5" r="3.5" fill="#ffe44d"/>
                    <circle cx="52" cy="8" r="3" fill="#ffd700"/>
                    <path d="M40 18 L72 28 L72 58 Q72 82 40 93 Q8 82 8 58 L8 28 Z" fill="url(#g7)" stroke="#daa520" stroke-width="2.5"/>
                    <path d="M40 18 L72 28 L72 58 Q72 82 40 93 Q8 82 8 58 L8 28 Z" fill="none" stroke="#ffe88a" stroke-width="2" style="animation:glow7 2s ease-in-out infinite"/>
                    <path d="M40 26 L64 34 L64 58 Q64 76 40 86 Q16 76 16 58 L16 34 Z" fill="none" stroke="#ffd700" stroke-width="1"/>
                    <text x="40" y="62" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">LV7</text>
                  </svg>
                  <!-- LV8 — Gold II -->
                  <svg v-else-if="agentLevel===8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
                    <defs>
                      <linearGradient id="g8" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffe44d"/>
                        <stop offset="100%" stop-color="#a07010"/>
                      </linearGradient>
                      <style>@keyframes flap8{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.1)}}</style>
                    </defs>
                    <g style="transform-origin:8px 50px;animation:flap8 2s ease-in-out infinite">
                      <path d="M16 40 Q4 44 2 55 Q8 50 14 52 Q6 58 8 65 Q14 58 18 56 Z" fill="#ffd700" opacity="0.7"/>
                    </g>
                    <g style="transform-origin:88px 50px;animation:flap8 2s ease-in-out infinite">
                      <path d="M80 40 Q92 44 94 55 Q88 50 82 52 Q90 58 88 65 Q82 58 78 56 Z" fill="#ffd700" opacity="0.7"/>
                    </g>
                    <path d="M48 10 L76 22 L76 54 Q76 78 48 88 Q20 78 20 54 L20 22 Z" fill="url(#g8)" stroke="#daa520" stroke-width="2.5"/>
                    <path d="M48 18 L68 28 L68 54 Q68 72 48 82 Q28 72 28 54 L28 28 Z" fill="none" stroke="#ffe88a" stroke-width="1.2"/>
                    <line x1="35" y1="30" x2="61" y2="30" stroke="#ffd700" stroke-width="1.5" stroke-dasharray="3,3"/>
                    <text x="48" y="59" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">LV8</text>
                  </svg>
                  <!-- LV9 — Gold III -->
                  <svg v-else-if="agentLevel===9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 100" width="96" height="100">
                    <defs>
                      <linearGradient id="g9" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fff176"/>
                        <stop offset="100%" stop-color="#e65100"/>
                      </linearGradient>
                      <style>
                        @keyframes spinR9{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                        @keyframes pulse9{0%,100%{opacity:0.5}50%{opacity:1}}
                      </style>
                    </defs>
                    <g style="transform-origin:48px 52px;animation:spinR9 6s linear infinite">
                      <circle cx="48" cy="52" r="42" fill="none" stroke="#ffd700" stroke-width="1" stroke-dasharray="6,4" opacity="0.6"/>
                      <circle cx="90" cy="52" r="2.5" fill="#ffe44d"/>
                      <circle cx="6"  cy="52" r="2.5" fill="#ffe44d"/>
                      <circle cx="48" cy="10" r="2.5" fill="#ffe44d"/>
                      <circle cx="48" cy="94" r="2.5" fill="#ffe44d"/>
                      <circle cx="78" cy="18" r="2.5" fill="#ffe44d"/>
                      <circle cx="18" cy="18" r="2.5" fill="#ffe44d"/>
                      <circle cx="78" cy="86" r="2.5" fill="#ffe44d"/>
                      <circle cx="18" cy="86" r="2.5" fill="#ffe44d"/>
                    </g>
                    <path d="M48 8 L80 22 L80 55 Q80 82 48 94 Q16 82 16 55 L16 22 Z" fill="url(#g9)" stroke="#daa520" stroke-width="2.5" style="animation:pulse9 2s ease-in-out infinite"/>
                    <path d="M48 16 L72 28 L72 55 Q72 76 48 86 Q24 76 24 55 L24 28 Z" fill="none" stroke="#fff176" stroke-width="1"/>
                    <path d="M33 22 L48 12 L63 22" fill="none" stroke="#ffe44d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="48" cy="12" r="4" fill="#fff176"/>
                    <text x="48" y="60" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">LV9</text>
                  </svg>
                  <!-- LV10 — Platinum -->
                  <svg v-else-if="agentLevel===10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 100" width="96" height="100">
                    <defs>
                      <linearGradient id="g10" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#c080f0"/>
                        <stop offset="100%" stop-color="#4b0082"/>
                      </linearGradient>
                      <style>
                        @keyframes spin10{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                        @keyframes spinB10{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
                      </style>
                    </defs>
                    <g style="transform-origin:48px 52px;animation:spin10 8s linear infinite">
                      <circle cx="48" cy="52" r="42" fill="none" stroke="#9040c0" stroke-width="0.8" stroke-dasharray="2,4"/>
                    </g>
                    <g style="transform-origin:48px 52px;animation:spinB10 12s linear infinite">
                      <circle cx="48" cy="52" r="36" fill="none" stroke="#a050d0" stroke-width="0.8" stroke-dasharray="4,2" opacity="0.5"/>
                    </g>
                    <path d="M48 8 L82 23 L82 56 Q82 84 48 96 Q14 84 14 56 L14 23 Z" fill="url(#g10)" stroke="#9040c0" stroke-width="2.5"/>
                    <path d="M48 16 L74 29 L74 56 Q74 78 48 88 Q22 78 22 56 L22 29 Z" fill="none" stroke="#d090ff" stroke-width="1.2"/>
                    <polygon points="48,32 60,44 48,56 36,44" fill="#e0b0ff" stroke="#c070f0" stroke-width="1.5"/>
                    <polygon points="48,36 56,44 48,52 40,44" fill="#c070f0" opacity="0.6"/>
                    <circle cx="48" cy="44" r="4" fill="#fff" opacity="0.7"/>
                    <text x="48" y="72" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="monospace">LV10</text>
                  </svg>
                  <!-- LV11 — Platinum II -->
                  <svg v-else-if="agentLevel===11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 104" width="100" height="104">
                    <defs>
                      <linearGradient id="g11" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#d090ff"/>
                        <stop offset="100%" stop-color="#3b0070"/>
                      </linearGradient>
                      <style>
                        @keyframes flash11{0%,90%,100%{opacity:0}45%,55%{opacity:1}}
                        @keyframes spin11{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
                      </style>
                    </defs>
                    <g style="transform-origin:50px 54px;animation:spin11 5s linear infinite">
                      <line x1="50" y1="54" x2="96" y2="54" stroke="#9040c0" stroke-width="0.5" opacity="0.4"/>
                      <line x1="50" y1="54" x2="73" y2="14" stroke="#9040c0" stroke-width="0.5" opacity="0.4"/>
                      <line x1="50" y1="54" x2="27" y2="14" stroke="#9040c0" stroke-width="0.5" opacity="0.4"/>
                      <line x1="50" y1="54" x2="4"  y2="54" stroke="#9040c0" stroke-width="0.5" opacity="0.4"/>
                      <line x1="50" y1="54" x2="27" y2="94" stroke="#9040c0" stroke-width="0.5" opacity="0.4"/>
                      <line x1="50" y1="54" x2="73" y2="94" stroke="#9040c0" stroke-width="0.5" opacity="0.4"/>
                    </g>
                    <path d="M50 8 L84 24 L84 58 Q84 86 50 98 Q16 86 16 58 L16 24 Z" fill="url(#g11)" stroke="#a050d0" stroke-width="2.5"/>
                    <path d="M50 16 L76 30 L76 58 Q76 80 50 90 Q24 80 24 58 L24 30 Z" fill="none" stroke="#e0a0ff" stroke-width="1"/>
                    <path d="M38 28 L32 46 L40 46 L34 66" fill="none" stroke="#e0c0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:flash11 3s ease-in-out infinite"/>
                    <path d="M62 28 L68 46 L60 46 L66 66" fill="none" stroke="#e0c0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:flash11 3s ease-in-out infinite 1.5s"/>
                    <text x="50" y="79" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="monospace">LV11</text>
                  </svg>
                  <!-- LV12 — Platinum III -->
                  <svg v-else-if="agentLevel===12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 108" width="104" height="108">
                    <defs>
                      <linearGradient id="g12" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#e0a0ff"/>
                        <stop offset="100%" stop-color="#2d0060"/>
                      </linearGradient>
                      <style>
                        @keyframes spin12a{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                        @keyframes spin12b{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
                      </style>
                    </defs>
                    <g style="transform-origin:52px 56px;animation:spin12a 4s linear infinite">
                      <circle cx="52" cy="56" r="47" fill="none" stroke="#8030b0" stroke-width="1" stroke-dasharray="3,5"/>
                    </g>
                    <g style="transform-origin:52px 56px;animation:spin12b 7s linear infinite">
                      <circle cx="52" cy="56" r="40" fill="none" stroke="#a040d0" stroke-width="0.8" stroke-dasharray="6,3"/>
                      <polygon points="92,56 88,61 88,51" fill="#c060e0"/>
                      <polygon points="12,56 16,61 16,51" fill="#c060e0"/>
                      <polygon points="52,16 57,20 47,20" fill="#c060e0"/>
                      <polygon points="52,96 57,92 47,92" fill="#c060e0"/>
                      <polygon points="80,28 82,34 76,32" fill="#c060e0"/>
                    </g>
                    <path d="M52 8 L88 26 L88 60 Q88 90 52 102 Q16 90 16 60 L16 26 Z" fill="url(#g12)" stroke="#a040d0" stroke-width="2.5"/>
                    <path d="M52 16 L80 32 L80 60 Q80 84 52 94 Q24 84 24 60 L24 32 Z" fill="none" stroke="#e0b0ff" stroke-width="1.2"/>
                    <polygon points="52,28 68,48 52,68 36,48" fill="#d080ff" stroke="#e0b0ff" stroke-width="1.5" opacity="0.9"/>
                    <polygon points="52,34 62,48 52,62 42,48" fill="#8030b0"/>
                    <circle cx="52" cy="48" r="6" fill="#fff" opacity="0.8"/>
                    <text x="52" y="83" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="monospace">LV12</text>
                  </svg>
                  <!-- LV13 — Diamond -->
                  <svg v-else-if="agentLevel===13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 112" width="110" height="112">
                    <defs>
                      <linearGradient id="g13" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ff6080"/>
                        <stop offset="100%" stop-color="#800020"/>
                      </linearGradient>
                      <style>
                        @keyframes spin13{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                        @keyframes ember{0%,100%{opacity:0;transform:translateY(0)}50%{opacity:1;transform:translateY(-6px)}}
                      </style>
                    </defs>
                    <path d="M20 52 Q2 30 6 18 Q12 28 18 34 Q10 22 16 14 Q22 26 24 38 Q18 24 26 20 Q28 36 26 46 Z" fill="#cc2040" opacity="0.8"/>
                    <path d="M90 52 Q108 30 104 18 Q98 28 92 34 Q100 22 94 14 Q88 26 86 38 Q92 24 84 20 Q82 36 84 46 Z" fill="#cc2040" opacity="0.8"/>
                    <g style="transform-origin:55px 58px;animation:spin13 3s linear infinite">
                      <line x1="55" y1="58" x2="103" y2="58" stroke="#ff3050" stroke-width="0.6" opacity="0.35"/>
                      <line x1="55" y1="58" x2="79"  y2="17" stroke="#ff3050" stroke-width="0.6" opacity="0.35"/>
                      <line x1="55" y1="58" x2="31"  y2="17" stroke="#ff3050" stroke-width="0.6" opacity="0.35"/>
                      <line x1="55" y1="58" x2="7"   y2="58" stroke="#ff3050" stroke-width="0.6" opacity="0.35"/>
                      <line x1="55" y1="58" x2="31"  y2="99" stroke="#ff3050" stroke-width="0.6" opacity="0.35"/>
                      <line x1="55" y1="58" x2="79"  y2="99" stroke="#ff3050" stroke-width="0.6" opacity="0.35"/>
                    </g>
                    <path d="M55 8 L90 26 L90 60 Q90 90 55 104 Q20 90 20 60 L20 26 Z" fill="url(#g13)" stroke="#cc2040" stroke-width="3"/>
                    <path d="M55 16 L82 32 L82 60 Q82 84 55 96 Q28 84 28 60 L28 32 Z" fill="none" stroke="#ff8090" stroke-width="1.5"/>
                    <circle cx="38" cy="50" r="2.5" fill="#ff6040" style="animation:ember 1.5s ease-in-out infinite 0s"/>
                    <circle cx="48" cy="50" r="2.5" fill="#ff6040" style="animation:ember 1.5s ease-in-out infinite 0.3s"/>
                    <circle cx="58" cy="50" r="2.5" fill="#ff6040" style="animation:ember 1.5s ease-in-out infinite 0.6s"/>
                    <circle cx="68" cy="50" r="2.5" fill="#ff6040" style="animation:ember 1.5s ease-in-out infinite 0.9s"/>
                    <polygon points="55,26 63,40 78,40 66,50 70,64 55,55 40,64 44,50 32,40 47,40" fill="#ff4060" stroke="#ff8090" stroke-width="1.5"/>
                    <text x="55" y="84" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="monospace">LV13</text>
                  </svg>
                  <!-- LV14 — Diamond II -->
                  <svg v-else-if="agentLevel===14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114 116" width="114" height="116">
                    <defs>
                      <linearGradient id="g14a" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#00e5ff"/>
                        <stop offset="50%" stop-color="#7c4dff"/>
                        <stop offset="100%" stop-color="#ff1744"/>
                      </linearGradient>
                      <linearGradient id="g14b" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#ff6d00"/>
                        <stop offset="100%" stop-color="#00bfa5"/>
                      </linearGradient>
                      <style>
                        @keyframes cosmo14{0%{stroke:#00e5ff}33%{stroke:#7c4dff}66%{stroke:#ff1744}100%{stroke:#00e5ff}}
                        @keyframes spinA14{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                        @keyframes spinB14{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
                      </style>
                    </defs>
                    <g style="transform-origin:57px 60px;animation:spinA14 3s linear infinite">
                      <circle cx="57" cy="60" r="52" fill="none" stroke="#00e5ff" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>
                    </g>
                    <g style="transform-origin:57px 60px;animation:spinB14 5s linear infinite">
                      <circle cx="57" cy="60" r="44" fill="none" stroke="#7c4dff" stroke-width="1" stroke-dasharray="6,3" opacity="0.5"/>
                      <polygon points="101,60 97,65 97,55" fill="#7c4dff"/>
                      <polygon points="13,60 17,65 17,55"  fill="#7c4dff"/>
                      <polygon points="57,16 62,20 52,20"  fill="#7c4dff"/>
                      <polygon points="57,104 62,100 52,100" fill="#7c4dff"/>
                      <polygon points="88,31 91,37 85,35" fill="#7c4dff"/>
                      <polygon points="26,31 29,37 23,35" fill="#7c4dff"/>
                    </g>
                    <path d="M22 56 Q4 34 8 18 Q14 30 20 38 Q12 24 18 14 Q24 28 26 44 Z" fill="url(#g14b)" opacity="0.7"/>
                    <path d="M92 56 Q110 34 102 18 Q96 30 90 38 Q98 24 92 14 Q86 28 84 44 Z" fill="url(#g14a)" opacity="0.7"/>
                    <path d="M57 8 L93 28 L93 62 Q93 92 57 106 Q21 92 21 62 L21 28 Z" fill="url(#g14a)" stroke-width="2.5" style="animation:cosmo14 3s linear infinite"/>
                    <path d="M57 16 L85 34 L85 62 Q85 86 57 98 Q29 86 29 62 L29 34 Z" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
                    <polygon points="57,28 66,44 82,44 70,54 74,70 57,60 40,70 44,54 32,44 48,44" fill="url(#g14b)" stroke="#fff" stroke-width="1"/>
                    <text x="57" y="88" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="monospace">LV14</text>
                  </svg>
                  <!-- LV15 — Legend -->
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
                    <defs>
                      <linearGradient id="g15a" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fff176"/>
                        <stop offset="30%" stop-color="#ff6d00"/>
                        <stop offset="60%" stop-color="#d500f9"/>
                        <stop offset="100%" stop-color="#00e5ff"/>
                      </linearGradient>
                      <style>
                        @keyframes rainbow15{0%{stroke:#fff176}20%{stroke:#ff6d00}40%{stroke:#ff1744}60%{stroke:#d500f9}80%{stroke:#00e5ff}100%{stroke:#fff176}}
                        @keyframes spinFwd15{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                        @keyframes spinRev15{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
                        @keyframes ultPulse15{0%,100%{opacity:0.7}50%{opacity:1}}
                      </style>
                    </defs>
                    <g style="transform-origin:60px 62px;animation:spinFwd15 2s linear infinite">
                      <circle cx="60" cy="62" r="56" fill="none" stroke="#fff176" stroke-width="1.2" stroke-dasharray="3,3"/>
                      <circle cx="116" cy="62" r="2" fill="#fff176"/>
                      <circle cx="4"   cy="62" r="2" fill="#fff176"/>
                      <circle cx="60"  cy="6"  r="2" fill="#fff176"/>
                      <circle cx="60"  cy="118" r="2" fill="#fff176"/>
                      <circle cx="104" cy="18" r="2" fill="#fff176"/>
                      <circle cx="16"  cy="18" r="2" fill="#fff176"/>
                      <circle cx="104" cy="106" r="2" fill="#fff176"/>
                      <circle cx="16"  cy="106" r="2" fill="#fff176"/>
                    </g>
                    <g style="transform-origin:60px 62px;animation:spinRev15 3s linear infinite">
                      <circle cx="60" cy="62" r="48" fill="none" stroke="#ff6d00" stroke-width="1" stroke-dasharray="6,3"/>
                      <polygon points="108,62 104,67 104,57" fill="#ff6d00"/>
                      <polygon points="12,62  16,67  16,57"  fill="#ff6d00"/>
                      <polygon points="60,14  65,18  55,18"  fill="#ff6d00"/>
                      <polygon points="60,110 65,106 55,106" fill="#ff6d00"/>
                      <polygon points="94,28 97,34 91,32"   fill="#ff6d00"/>
                      <polygon points="26,28 29,34 23,32"   fill="#ff6d00"/>
                      <polygon points="94,96 97,90 91,92"   fill="#ff6d00"/>
                      <polygon points="26,96 29,90 23,92"   fill="#ff6d00"/>
                    </g>
                    <path d="M24 60 Q4 36 8 18 Q16 32 22 42 Q12 26 20 14 Q26 30 28 48 Q20 30 30 22 Q32 42 30 56 Z" fill="#ff6d00" opacity="0.9"/>
                    <path d="M96 60 Q116 36 112 18 Q104 32 98 42 Q108 26 100 14 Q94 30 92 48 Q100 30 90 22 Q88 42 90 56 Z" fill="#d500f9" opacity="0.9"/>
                    <path d="M60 6 L98 26 L98 62 Q98 94 60 108 Q22 94 22 62 L22 26 Z" fill="url(#g15a)" stroke-width="3" style="animation:rainbow15 2s linear infinite,ultPulse15 1.5s ease-in-out infinite"/>
                    <path d="M60 14 L90 32 L90 62 Q90 88 60 100 Q30 88 30 62 L30 32 Z" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
                    <path d="M44 26 L48 14 L60 22 L72 14 L76 26 Z" fill="#fff176" stroke="#ff6d00" stroke-width="1.5"/>
                    <circle cx="48" cy="14" r="3.5" fill="#fff176"/>
                    <circle cx="60" cy="10" r="4.5" fill="#fff"/>
                    <circle cx="72" cy="14" r="3.5" fill="#fff176"/>
                    <polygon points="60,34 65,48 80,48 68,57 73,71 60,62 47,71 52,57 40,48 55,48" fill="#fff176" stroke="#ff6d00" stroke-width="1.5"/>
                    <circle cx="60" cy="52" r="6" fill="#fff" opacity="0.9"/>
                    <text x="60" y="88" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="monospace">LV15</text>
                  </svg>
                </button>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <p class="text-base font-bold truncate" style="color: #1a2b1a;">
                  <span v-if="loadingData" class="animate-pulse">Loading...</span>
                  <span v-else>{{ username }}</span>
                </p>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold"
                  style="background: rgba(255,193,7,0.12); color: rgba(255,193,7,0.8); border: 1px solid rgba(255,193,7,0.2);">AGENT</span>
              </div>
              <p class="text-[11px] font-mono" style="color: rgba(0,0,0,0.4);">VIP {{ userVipLevel }}</p>
              <p class="text-[11px] mt-0.5" style="color: rgba(0,0,0,0.4);">ဆက်ဆံရေး: {{ memberSince }}</p>
            </div>

            <div class="text-right flex-shrink-0">
              <p class="text-[11px] font-semibold tracking-wider" style="color: #3a5040;">DOWNLINE</p>
              <p class="text-xl font-black mt-0.5" style="color: #1a2b1a;">
                <span v-if="loadingData" class="animate-pulse text-sm" style="color: rgba(0,0,0,0.28);">...</span>
                <span v-else>{{ totalDownline }}</span>
              </p>
              <p class="text-[10px] font-medium" style="color: rgba(100,220,120,0.8);">{{ activeDownline }} active</p>
            </div>
          </div>

          <div class="mt-3 h-px" style="background: rgba(26,43,26,0.10);"></div>

          <!-- Sub stats row -->
          <div class="flex justify-between mt-3">
            <div>
              <p class="text-[11px] font-medium" style="color: rgba(0,0,0,0.45);">ကော်မရှင်ရက်</p>
              <p class="text-xs font-semibold mt-0.5" style="color: rgba(0,0,0,0.55);">{{ todayDate }}</p>
            </div>
            <div class="text-center">
              <p class="text-[11px] font-medium" style="color: rgba(0,0,0,0.45);">မျှဝေနှုန်း</p>
              <p class="text-xs font-bold mt-0.5" style="color: rgba(255,193,7,0.8);">1.00</p>
            </div>
            <div class="text-right">
              <p class="text-[11px] font-medium" style="color: rgba(0,0,0,0.45);">Total Deposit</p>
              <p class="text-xs font-semibold mt-0.5" style="color: rgba(0,0,0,0.55);">{{ formatN(userTotalDeposit) }} Ks</p>
            </div>
          </div>
        </div>

        <!-- Referral Panel (ပင်မ tab) — Floating Control Center -->
        <div class="nova-ref-card rounded-2xl p-4 relative overflow-hidden" style="background: rgba(255,255,255,0.38); border: 1px solid rgba(26,43,26,0.12); box-shadow: 0 4px 20px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.55); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">

          <!-- Ambient blue top glow -->
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 w-52 h-16 pointer-events-none"
            style="background: radial-gradient(ellipse, rgba(45,74,45,0.08) 0%, transparent 70%); filter: blur(14px);"></div>
          <!-- Side ambient glow -->
          <div class="absolute top-4 right-0 w-24 h-24 pointer-events-none"
            style="background: transparent;"></div>

          <!-- Top shimmer line -->
          <div class="absolute top-0 left-0 right-0 h-px"
            style="background: linear-gradient(90deg, transparent 5%, rgba(45,74,45,0.3) 40%, rgba(26,43,26,0.15) 60%, transparent 95%);"></div>

          <!-- Header badge -->
          <div class="flex items-center gap-2 mb-4">
            <div class="nova-live-dot w-1.5 h-1.5 rounded-full"
              style="background: #2d4a2d; box-shadow: 0 0 5px rgba(45,74,45,0.6);"></div>
            <p class="text-[9px] tracking-[0.22em] font-bold uppercase"
              style="color: #3a5040;">ဖိတ်ကြားရေး</p>
            <div class="flex-1 h-px" style="background: rgba(26,43,26,0.12);"></div>
            <div class="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style="background: rgba(45,74,45,0.15); border: 1px solid rgba(26,43,26,0.2);">
              <div class="nova-pulse-dot w-1 h-1 rounded-full"
                style="background: #2d4a2d;"></div>
              <span class="text-[8px] font-bold" style="color: #2d4a2d;">LIVE</span>
            </div>
          </div>

          <!-- QR + URL stacked layout -->
          <div class="space-y-3">

            <!-- ── FLOATING QR OBJECT — centered ── -->
            <div class="flex justify-center">
              <div class="relative" style="width: 108px; height: 108px;">
                <!-- Outer ambient ring 3 -->
                <div class="nova-qr-ring-3 absolute -inset-4 rounded-3xl pointer-events-none"
                  style="border: 1px solid rgba(26,43,26,0.08);"></div>
                <!-- Mid pulse ring 2 -->
                <div class="nova-qr-ring-2 absolute -inset-2 rounded-2xl pointer-events-none"
                  style="border: 1px solid rgba(26,43,26,0.14);"></div>
                <!-- Inner glow ring 1 -->
                <div class="nova-qr-ring-1 absolute inset-0 rounded-2xl pointer-events-none"
                  style="border: 1px solid rgba(26,43,26,0.22);"></div>
                <!-- QR floating card -->
                <div class="nova-qr-float absolute inset-0 rounded-2xl overflow-hidden"
                  style="background: rgba(255,255,255,0.97); padding: 6px; box-shadow: 0 0 28px rgba(50,130,255,0.45), 0 4px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,1);">
                  <img :src="qrUrl" class="w-full h-full object-contain" alt="QR" loading="lazy" />
                  <div class="nova-qr-scan absolute left-0 right-0 h-0.5 pointer-events-none"
                    style="background: linear-gradient(90deg, transparent, rgba(45,74,45,0.4), transparent);"></div>
                </div>
                <!-- Corner accent dot -->
                <div class="nova-corner-dot absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                  style="background: #2d4a2d; box-shadow: 0 0 6px rgba(45,74,45,0.6);"></div>
              </div>
            </div>

            <!-- ── NODE TYPE BADGE ── -->
            <div class="flex items-center justify-center gap-1.5">
              <div class="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style="background: rgba(45,74,45,0.12); border: 1px solid rgba(26,43,26,0.2);">
                <svg class="w-2.5 h-2.5" style="color:#2d4a2d" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
                </svg>
                <span class="text-[8px] font-black tracking-[0.15em]" style="color:#1a2b1a">QR</span>
              </div>
              <span class="text-[8px]" style="color:rgba(26,43,26,0.35)">·</span>
              <span class="text-[8px] font-mono" style="color:rgba(26,43,26,0.5)">AGENT LINK</span>
            </div>

            <!-- ── FULL URL — below QR, full width, soft color ── -->
            <div class="nova-link-node relative rounded-xl overflow-hidden"
              style="background: rgba(26,43,26,0.12); border: 1px solid rgba(26,43,26,0.18); box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);">
              <!-- Sweep shimmer -->
              <div class="nova-link-sweep absolute inset-0 pointer-events-none"
                style="background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%); width: 60%;"></div>
              <div class="flex items-start gap-2.5 px-3 py-3 relative z-10">
                <svg class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style="color:rgba(26,43,26,0.5)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
                <p class="text-[11px] font-mono flex-1 break-all leading-relaxed"
                  style="color: #1a2b1a; user-select: text; -webkit-user-select: text; cursor: text; letter-spacing: 0.01em;">{{ referralLink }}</p>
                <button @click="copyText(referralLink)" class="flex-shrink-0 active:scale-75 transition-all mt-0.5">
                  <div class="px-2 py-1.5 rounded-lg transition-all"
                    :style="copiedLink ? 'background:rgba(45,74,45,0.2);border:1px solid rgba(45,74,45,0.35)' : 'background:rgba(255,255,255,0.3);border:1px solid rgba(26,43,26,0.15)'">
                    <svg v-if="!copiedLink" class="w-3.5 h-3.5" style="color:rgba(26,43,26,0.6)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    <svg v-else class="w-3.5 h-3.5" style="color:rgba(80,220,120,0.95)" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            <!-- ဖိတ်ကုဒ် caption -->
            <p class="text-[11px] text-center font-mono" style="color: rgba(0,0,0,0.38);">
              ဖိတ်ကုဒ်: <span style="color:#1a2b1a; font-weight:800;">{{ inviteCode }}</span>
            </p>
          </div>

          <!-- Social Share Buttons -->
          <div class="mt-4">
            <div class="flex items-center gap-2 mb-2.5">
              <div class="flex-1 h-px" style="background: linear-gradient(to right, transparent, rgba(26,43,26,0.15));"></div>
              <p class="text-[8px] tracking-[0.2em] font-bold" style="color: rgba(26,43,26,0.4);">SHARE VIA</p>
              <div class="flex-1 h-px" style="background: linear-gradient(to left, transparent, rgba(26,43,26,0.15));"></div>
            </div>
            <div class="grid grid-cols-5 gap-2">
              <button v-for="s in socialButtons" :key="s.id" @click="shareVia(s.id)"
                class="nova-social-btn flex flex-col items-center gap-1.5 active:scale-90 transition-all duration-200">
                <div class="w-10 h-10 rounded-2xl flex items-center justify-center"
                  :style="`background: ${s.bg}; border: 1px solid ${s.border}; box-shadow: 0 2px 12px rgba(0,0,0,0.32);`">
                  <span v-html="s.icon" class="w-5 h-5 flex items-center justify-center"></span>
                </div>
                <span class="text-[9px]" style="color: rgba(0,0,0,0.38);">{{ s.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Scrolling Ticker -->
        <div class="fp-card relative rounded-xl overflow-hidden" style="height: 42px; border: 1px solid rgba(26,43,26,0.18); border-radius: 10px;">
          <div class="absolute inset-0" style="background: linear-gradient(90deg, rgba(255,152,0,0.1), rgba(255,193,7,0.06), rgba(255,152,0,0.1));"></div>
          <div class="absolute inset-y-0 left-0 w-8 z-10 pointer-events-none" style="background: linear-gradient(to right, #040608, transparent);"></div>
          <div class="absolute inset-y-0 right-0 w-8 z-10 pointer-events-none" style="background: linear-gradient(to left, #040608, transparent);"></div>
          <div ref="tickerEl" class="flex items-center h-full whitespace-nowrap overflow-hidden">
            <div class="ticker-track flex items-center gap-10 px-6">
              <span v-for="(item, i) in tickerItems" :key="i" class="flex items-center gap-2 text-[11px] font-semibold flex-shrink-0">
                <span>🔥</span>
                <span style="color: rgba(255,193,7,0.9);">ID: {{ item.id }}</span>
                <span style="color: rgba(0,0,0,0.4);">ကော်မရှင်:</span>
                <span style="color: rgba(255,193,7,1); font-weight: 800;">{{ item.amount }} Ks</span>
                <span style="color: rgba(255,193,7,0.25);">◆</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Stats Grid 2×2 -->
        <div class="grid grid-cols-2 gap-2.5">
          <div v-for="s in statsGrid" :key="s.key" class="fp-card rounded-2xl p-3.5 relative overflow-hidden"
            style="background: rgba(255,255,255,0.38); border: 1px solid rgba(26,43,26,0.12); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.55);">
            <div class="absolute top-0 right-0 w-12 h-12 pointer-events-none"
              :style="`background: radial-gradient(circle, ${s.glow} 0%, transparent 70%); filter: blur(8px);`"></div>
            <p class="text-[11px] font-semibold tracking-[0.04em] mb-1.5" style="color: #3a5040;">{{ s.label }}</p>
            <p class="text-lg font-black" :style="`color: ${s.color};`">
              <span v-if="loadingData" class="text-sm animate-pulse" style="color:rgba(26,43,26,0.3);">...</span>
              <span v-else>{{ formatN(s.value) }}</span>
            </p>
            <p class="text-[10px] font-medium mt-0.5" style="color: rgba(0,0,0,0.35);">Ks</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-2 gap-2.5">
          <button @click="activeTab = 6"
            class="fp-card rounded-2xl p-3.5 flex items-center gap-2.5 active:scale-[0.97] transition-all text-left"
            style="background: #2d4a2d; border: none; box-shadow: 0 2px 12px rgba(30,60,30,0.2);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style="background: rgba(255,193,7,0.12);">
              <svg class="w-5 h-5" style="color: rgba(255,193,7,0.85);" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold" style="color: #f5f0e8;">အောက်လက်ငယ်သား</p>
              <p class="text-[11px]" style="color: rgba(255,255,255,0.6);">Downline List</p>
            </div>
            <svg class="w-4 h-4 ml-auto flex-shrink-0" style="color: rgba(255,255,255,0.5);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>

          <button @click="activeTab = 5"
            class="fp-card rounded-2xl p-3.5 flex items-center gap-2.5 active:scale-[0.97] transition-all text-left"
            style="background: #2d4a2d; border: none; box-shadow: 0 2px 12px rgba(30,60,30,0.2);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style="background: rgba(100,200,120,0.12);">
              <svg class="w-5 h-5" style="color: rgba(100,220,120,0.85);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold" style="color: #f5f0e8;">ကော်မရှင်</p>
              <p class="text-[11px]" style="color: rgba(255,255,255,0.6);">History</p>
            </div>
            <svg class="w-4 h-4 ml-auto flex-shrink-0" style="color: rgba(255,255,255,0.5);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
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
          <div class="referral-hero-card relative overflow-hidden rounded-3xl px-5 pt-5 pb-4">

            <!-- top shimmer line -->
            <div class="absolute top-0 left-0 right-0 h-px"
              style="background: linear-gradient(90deg, transparent 5%, rgba(26,43,26,0.18) 40%, rgba(26,43,26,0.08) 60%, transparent 95%);"></div>

            <!-- Invite label + token row -->
            <div class="flex items-center justify-between mb-4">
              <p class="text-[10px] font-semibold tracking-[0.18em] uppercase"
                style="color: rgba(0,0,0,0.4);">သူငယ်ချင်းများကို ဖိတ်ကြားသည်</p>
              <div class="flex items-center gap-2 rounded-xl px-3 py-1.5"
                style="background: rgba(255,255,255,0.4); border: 1px solid rgba(26,43,26,0.18);">
                <p class="text-[11px] font-black tracking-widest font-mono" style="color: #1a2b1a;">ဖိတ်ကုဒ်: {{ inviteCode }}</p>
                <button @click="copyText(inviteCode)" class="active:scale-75 transition-transform">
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
                  style="background: rgba(26,43,26,0.10); border: 1px solid rgba(26,43,26,0.15);">
                  <p class="text-[10px] font-mono flex-1 overflow-x-auto whitespace-nowrap no-scrollbar" style="color: #1a2b1a; user-select: text; -webkit-user-select: text; cursor: text; font-weight:600;">{{ referralLink }}</p>
                  <button @click="copyText(referralLink)" class="flex-shrink-0 active:scale-75 transition-transform">
                    <svg v-if="!copiedLink" class="w-4 h-4" style="color:rgba(255,255,255,0.3)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <svg v-else class="w-4 h-4" style="color:rgba(100,220,120,0.9)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  </button>
                </div>
                <!-- Caption -->
                <p class="text-[11px] pl-1 font-mono" style="color: rgba(0,0,0,0.45);">ဖိတ်ကုဒ်: <span style="color:#1a2b1a;font-weight:800;">{{ inviteCode }}</span></p>
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
            style="background: transparent;">

            <!-- Section header -->
            <div class="px-5 pt-4 pb-3 flex items-center justify-between" style="border-bottom: 1px solid rgba(120,100,255,0.1);">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:rgba(140,120,255,0.9);box-shadow:0 0 6px rgba(140,120,255,0.8)"></div>
                <p class="text-[10px] font-bold tracking-[0.18em] uppercase" style="color: #3a5040;">Commission Network</p>
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
                  <div class="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black" style="background:linear-gradient(135deg,#8060ff,#6040dd);color:#1a2b1a;box-shadow:0 0 8px rgba(140,100,255,0.5)">A</div>
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
                      <div class="absolute -bottom-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black" style="background:linear-gradient(135deg,#9070ff,#6040cc);color:#1a2b1a;border:1.5px solid rgba(0,0,0,0.25);box-shadow:0 0 10px rgba(140,100,255,0.7)">A</div>
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
                        ? 'background:linear-gradient(135deg,#8050ff,#5030cc);color:#1a2b1a;box-shadow:0 0 5px rgba(120,80,255,0.5)'
                        : 'background:linear-gradient(135deg,#0090cc,#006699);color:#1a2b1a;box-shadow:0 0 5px rgba(0,160,220,0.4)'">
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

          <!-- ── AGENT SYSTEM EXAMPLE EXPLANATION ── -->
          <div class="rounded-2xl px-4 py-5" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);">

            <!-- Header -->
            <div class="flex items-center gap-2.5 mb-5">
              <div class="w-1 h-5 rounded-full flex-shrink-0" style="background:linear-gradient(180deg,rgba(100,220,120,0.9),rgba(0,180,100,0.4));"></div>
              <p class="text-[10px] font-bold tracking-[0.18em] uppercase" style="color:rgba(255,255,255,0.82)">အေးဂျင့် စနစ် ဥပမာပေး ရှင်းလင်းချက်</p>
            </div>

            <!-- ① Commission rates -->
            <div class="mb-5">
              <div class="flex items-center gap-2.5 mb-3">
                <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black" style="background:rgba(255,193,7,0.2);border:1.5px solid rgba(255,193,7,0.5);color:rgba(255,193,7,0.95);">①</div>
                <p class="text-[11px] font-bold" style="color:rgba(255,255,255,0.88);line-height:1.6;font-weight:700;">အခြေခံ ကော်မရှင်နှုန်းထားများ</p>
              </div>
              <div class="pl-8 space-y-2">
                <div class="flex items-start gap-2">
                  <div class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background:rgba(255,193,7,0.6);"></div>
                  <p class="text-[11px]" style="color:rgba(255,255,255,0.75);line-height:1.75;">တိုက်ရိုက်လက်အောက်ခံများထံမှ ကော်မရှင်နှုန်း — <span style="color:rgba(255,193,7,0.9);font-weight:700">10%</span></p>
                </div>
                <div class="flex items-start gap-2">
                  <div class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background:rgba(100,200,255,0.55);"></div>
                  <p class="text-[11px]" style="color:rgba(255,255,255,0.75);line-height:1.75;">အဆင့်ကျော် Override ကော်မရှင် (ပိုင်ရှင်မှ လက်ဆောင်) — <span style="color:rgba(100,200,255,0.9);font-weight:700">30%</span></p>
                </div>
              </div>
            </div>

            <div class="mb-5" style="height:1px;background:rgba(255,255,255,0.05);"></div>

            <!-- ② Member tree -->
            <div class="mb-5">
              <div class="flex items-center gap-2.5 mb-3">
                <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black" style="background:rgba(140,180,255,0.18);border:1.5px solid rgba(140,180,255,0.45);color:rgba(140,180,255,0.95);">②</div>
                <p class="text-[11px] font-bold" style="color:rgba(255,255,255,0.88);line-height:1.6;font-weight:700;">အဖွဲ့ဝင်များ တိုးချဲ့မှု ပုံစံ</p>
              </div>
              <div class="pl-8">
                <div class="rounded-xl p-3" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);">
                  <!-- A -->
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black flex-shrink-0" style="background:rgba(255,193,7,0.18);border:1px solid rgba(255,193,7,0.32);color:rgba(255,193,7,0.95);">A</div>
                    <p class="text-[10px]" style="color:rgba(255,255,255,0.78);line-height:1.6;">ပထမဆုံး စီးပွားရေးအခွင့်အလမ်း တွေ့ရှိသူ</p>
                  </div>
                  <!-- L1 branch -->
                  <div class="ml-2 pl-3 mb-2.5" style="border-left:1px dashed rgba(100,200,255,0.2);">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,200,255,0.13);border:1px solid rgba(100,200,255,0.22);color:rgba(100,200,255,0.9);">B1</div>
                      <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,200,255,0.13);border:1px solid rgba(100,200,255,0.22);color:rgba(100,200,255,0.9);">B2</div>
                      <span class="text-[9px]" style="color:rgba(255,255,255,0.55)">← A ၏ တိုက်ရိုက် (Level 1)</span>
                    </div>
                    <!-- L2 branch -->
                    <div class="ml-2 pl-3" style="border-left:1px dashed rgba(100,220,120,0.18);">
                      <div class="flex items-center gap-1.5">
                        <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,220,120,0.1);border:1px solid rgba(100,220,120,0.18);color:rgba(100,220,120,0.85);">C1</div>
                        <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,220,120,0.1);border:1px solid rgba(100,220,120,0.18);color:rgba(100,220,120,0.85);">C2</div>
                        <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,220,120,0.1);border:1px solid rgba(100,220,120,0.18);color:rgba(100,220,120,0.85);">C3</div>
                        <span class="text-[9px]" style="color:rgba(255,255,255,0.52)">← B1,B2 ၏ တိုက်ရိုက် (Level 2)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-5" style="height:1px;background:rgba(255,255,255,0.05);"></div>

            <!-- ③ Turnover data table -->
            <div class="mb-5">
              <div class="flex items-center gap-2.5 mb-3">
                <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black" style="background:rgba(200,150,255,0.18);border:1.5px solid rgba(200,150,255,0.45);color:rgba(200,150,255,0.95);">③</div>
                <p class="text-[11px] font-bold" style="color:rgba(255,255,255,0.88);line-height:1.6;font-weight:700;">နောက်တစ်နေ့ ထိရောက်သောလောင်းကြေးများ</p>
              </div>
              <div class="pl-8 space-y-1.5">
                <div class="flex items-center justify-between py-1.5 px-3 rounded-lg" style="background:rgba(100,200,255,0.04);">
                  <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,200,255,0.12);border:1px solid rgba(100,200,255,0.2);color:rgba(100,200,255,0.9);">B1</div>
                    <span class="text-[10px]" style="color:rgba(255,255,255,0.68)">ထိရောက်သောလောင်းကြေး</span>
                  </div>
                  <span class="text-[12px] font-bold tabular-nums" style="color:rgba(100,200,255,0.88)">500 Ks</span>
                </div>
                <div class="flex items-center justify-between py-1.5 px-3 rounded-lg" style="background:rgba(100,200,255,0.04);">
                  <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,200,255,0.12);border:1px solid rgba(100,200,255,0.2);color:rgba(100,200,255,0.9);">B2</div>
                    <span class="text-[10px]" style="color:rgba(255,255,255,0.68)">ထိရောက်သောလောင်းကြေး</span>
                  </div>
                  <span class="text-[12px] font-bold tabular-nums" style="color:rgba(100,200,255,0.88)">3,000 Ks</span>
                </div>
                <div class="flex items-center justify-between py-1.5 px-3 rounded-lg" style="background:rgba(100,220,120,0.03);">
                  <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,220,120,0.1);border:1px solid rgba(100,220,120,0.18);color:rgba(100,220,120,0.85);">C1</div>
                    <span class="text-[10px]" style="color:rgba(255,255,255,0.68)">ထိရောက်သောလောင်းကြေး</span>
                  </div>
                  <span class="text-[12px] font-bold tabular-nums" style="color:rgba(100,220,120,0.82)">1,000 Ks</span>
                </div>
                <div class="flex items-center justify-between py-1.5 px-3 rounded-lg" style="background:rgba(100,220,120,0.03);">
                  <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,220,120,0.1);border:1px solid rgba(100,220,120,0.18);color:rgba(100,220,120,0.85);">C2</div>
                    <span class="text-[10px]" style="color:rgba(255,255,255,0.68)">ထိရောက်သောလောင်းကြေး</span>
                  </div>
                  <span class="text-[12px] font-bold tabular-nums" style="color:rgba(100,220,120,0.82)">2,000 Ks</span>
                </div>
                <div class="flex items-center justify-between py-1.5 px-3 rounded-lg" style="background:rgba(100,220,120,0.05);">
                  <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0" style="background:rgba(100,220,120,0.12);border:1px solid rgba(100,220,120,0.22);color:rgba(100,220,120,0.9);">C3</div>
                    <span class="text-[10px]" style="color:rgba(255,255,255,0.68)">ထိရောက်သောလောင်းကြေး</span>
                  </div>
                  <span class="text-[12px] font-bold tabular-nums" style="color:rgba(100,220,120,0.9)">20,000 Ks</span>
                </div>
              </div>
            </div>

            <div class="mb-5" style="height:1px;background:rgba(255,255,255,0.05);"></div>

            <!-- ④ A's commission calculation -->
            <div class="mb-5">
              <div class="flex items-center gap-2.5 mb-3">
                <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black" style="background:rgba(255,193,7,0.2);border:1.5px solid rgba(255,193,7,0.48);color:rgba(255,193,7,0.95);">④</div>
                <p class="text-[11px] font-bold" style="color:rgba(255,255,255,0.88);line-height:1.6;font-weight:700;">A ၏ ဝင်ငွေတွက်ချက်ပုံ</p>
              </div>
              <div class="pl-8 space-y-3">

                <!-- Direct commission block -->
                <div class="rounded-xl p-3.5" style="background:rgba(100,200,255,0.04);border:1px solid rgba(100,200,255,0.1);">
                  <p class="text-[9px] font-bold tracking-widest uppercase mb-2.5" style="color:rgba(100,200,255,0.82)">တိုက်ရိုက် ကော်မရှင်</p>
                  <div class="space-y-2">
                    <div class="flex items-baseline justify-between">
                      <span class="text-[10px]" style="color:rgba(255,255,255,0.68);line-height:1.6;">တိုက်ရိုက်စွမ်းဆောင်ရည် = B1 + B2</span>
                      <span class="text-[11px] font-semibold tabular-nums" style="color:rgba(255,255,255,0.5)">500 + 3,000</span>
                    </div>
                    <div class="flex items-baseline justify-between">
                      <span class="text-[10px]" style="color:rgba(255,255,255,0.35);">= စုစုပေါင်း</span>
                      <span class="text-[12px] font-bold tabular-nums" style="color:rgba(100,200,255,0.88)">3,500 Ks</span>
                    </div>
                    <div class="flex items-baseline justify-between pt-2" style="border-top:1px solid rgba(100,200,255,0.1);">
                      <span class="text-[10px]" style="color:rgba(255,255,255,0.72);line-height:1.6;">3,500 × <span style="color:rgba(255,193,7,0.9);font-weight:700">10%</span></span>
                      <span class="text-[14px] font-black tabular-nums" style="color:rgba(255,193,7,0.95)">= 350 Ks</span>
                    </div>
                  </div>
                </div>

                <!-- Indirect commission block -->
                <div class="rounded-xl p-3.5" style="background:rgba(100,220,120,0.04);border:1px solid rgba(100,220,120,0.1);">
                  <p class="text-[9px] font-bold tracking-widest uppercase mb-2.5" style="color:rgba(100,220,120,0.82)">အခြားကော်မရှင် (Override)</p>
                  <div class="space-y-2">
                    <div class="flex items-baseline justify-between">
                      <span class="text-[10px]" style="color:rgba(255,255,255,0.68);line-height:1.6;">C1 + C2 + C3 Turnover</span>
                      <span class="text-[11px] font-semibold tabular-nums" style="color:rgba(255,255,255,0.5)">1,000+2,000+20,000</span>
                    </div>
                    <div class="flex items-baseline justify-between">
                      <span class="text-[10px]" style="color:rgba(255,255,255,0.35);">= စုစုပေါင်း</span>
                      <span class="text-[12px] font-bold tabular-nums" style="color:rgba(100,220,120,0.82)">23,000 Ks</span>
                    </div>
                    <div class="flex items-baseline justify-between pt-2" style="border-top:1px solid rgba(100,220,120,0.1);">
                      <span class="text-[10px]" style="color:rgba(255,255,255,0.72);line-height:1.6;">23,000 × <span style="color:rgba(255,193,7,0.9);font-weight:700">10%</span> × <span style="color:rgba(100,200,255,0.8);font-weight:700">30%</span></span>
                      <span class="text-[14px] font-black tabular-nums" style="color:rgba(100,220,120,0.95)">= 690 Ks</span>
                    </div>
                  </div>
                </div>

                <!-- Total result -->
                <div class="rounded-xl p-4 flex items-center justify-between" style="background:linear-gradient(135deg,rgba(255,193,7,0.08),rgba(255,140,0,0.04));border:1px solid rgba(255,193,7,0.2);">
                  <div>
                    <p class="text-[9px] font-bold tracking-widest uppercase mb-1" style="color:rgba(255,193,7,0.78)">A ၏ ယခုကာလ ကော်မရှင်</p>
                    <p class="text-[11px]" style="color:rgba(255,255,255,0.65)">350 + 690</p>
                  </div>
                  <div class="text-right">
                    <span class="text-2xl font-black tabular-nums" style="color:rgba(255,193,7,0.97);text-shadow:0 0 24px rgba(255,193,7,0.35);">1,040</span>
                    <span class="text-[12px] font-bold ml-1" style="color:rgba(255,193,7,0.6)">Ks</span>
                  </div>
                </div>

              </div>
            </div>

            <div class="mb-4" style="height:1px;background:rgba(255,255,255,0.05);"></div>

            <!-- Note -->
            <div class="flex items-start gap-2.5">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-black" style="background:rgba(200,150,255,0.18);border:1.5px solid rgba(200,150,255,0.4);color:rgba(200,150,255,0.92);">N</div>
              <p class="text-[10px]" style="color:rgba(255,255,255,0.65);line-height:1.85;">
                အေးဂျင့်စနစ်သည် <span style="color:rgba(210,160,255,0.95);font-weight:700">အကန့်အသတ်မရှိ</span> လက်အောက်ခံများကို တိုးချဲ့နိုင်သည်။ ဘေးတိုက်ရော ဒေါင်လိုက်ပါ တစ်ပြိုင်နက် တိုးချဲ့နိုင်ပြီး ဤဥပမာတွင် <span style="color:rgba(210,160,255,0.92)">အဆင့် ၂ ဆင့်</span> သာ ဖော်ပြထားသည်။
              </p>
            </div>

          </div>

        </div><!-- /relative z-10 -->
      </div>

      <!-- ═══════════════════════════════════════════
           TAB 2: ငါ့ ဒေတာ (My Data)
           ═══════════════════════════════════════════ -->
      <!-- ═══════════════════════════════════════════
           TAB 2: ငါ့ ဒေတာ — My Detailed Stats
           ═══════════════════════════════════════════ -->
      <div v-else-if="activeTab === 2" class="pb-8">

        <!-- ── Period Sub-tabs (sticky) ── -->
        <div class="sticky top-0 z-20 px-3 pt-3 pb-2.5" style="background:#b0baaf;border-bottom:1px solid rgba(0,0,0,0.08);">
          <div class="flex gap-1.5 overflow-x-auto no-scrollbar">
            <button v-for="p in myDataPeriods" :key="p.key" @click="switchMyDataPeriod(p.key)"
              class="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all active:scale-90"
              :style="myDataPeriod===p.key
                ? 'background:rgba(255,193,7,0.18);border:1.5px solid rgba(255,193,7,0.52);color:rgba(255,193,7,0.95);box-shadow:0 0 12px rgba(255,193,7,0.15)'
                : 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.52)'">
              {{ p.label }}
            </button>
          </div>
        </div>

        <!-- ── Loading ── -->
        <div v-if="myDataLoading" class="flex flex-col items-center justify-center py-16 gap-3">
          <div class="w-7 h-7 border-2 rounded-full animate-spin" style="border-color:rgba(255,255,255,0.08);border-top-color:rgba(255,193,7,0.85)"></div>
          <p class="text-[10px]" style="color:rgba(255,255,255,0.35)">ဒေတာ ဖတ်နေသည်...</p>
        </div>

        <div v-else class="px-3 pt-3 space-y-3">

          <!-- ════════════════════════════════════════════
               SECTION 1: အောက်လက်ငယ်သားများ၏ စာရင်း
               ════════════════════════════════════════════ -->
          <div class="fp-card rounded-2xl overflow-hidden">
            <div class="px-4 pt-3.5 pb-2.5 flex items-center justify-between" style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <p class="text-[11px] font-black tracking-wide" style="color:rgba(255,255,255,0.88);">အောက်လက်ငယ်သားများ၏ စာရင်းဇယား</p>
              <span class="text-[8px] px-2 py-0.5 rounded-full" style="background:rgba(255,193,7,0.1);border:1px solid rgba(255,193,7,0.2);color:rgba(255,193,7,0.7);">Direct</span>
            </div>
            <!-- 3-col grid -->
            <div class="grid grid-cols-3" style="border-color:rgba(255,255,255,0.05);">

              <!-- Row 1 -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တိုက်ရိုက်<br>အစီရင်ခံစာများ</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ myStats.directNewReg }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အပ်ငွေ ထည့်သော<br>ကစားသူ အရေအတွက်</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ myStats.depositingCount }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ပထမအကြိမ် အပ်ငွေ<br>ထည့်သောသူ အရေ</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ myStats.firstDepositCount }}</p>
              </div>

              <!-- Row 2 -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အကောက်ဖွင့်ပြီး ပထမ<br>အပ်ငွေ ထည့်သူများ</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ myStats.activeFirstDeposit }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အပ်ငွေ<br>ပမာဏ</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ formatN(myStats.depositAmount) }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ပထမဆုံး<br>အပ်ငွေပမာဏ</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ formatN(myStats.firstDepositAmount) }}</p>
              </div>

              <!-- Row 3 -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အကောက်ဝင်ပြီး ပထမ<br>အပ်ငွေသွင်းသည်</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ myStats.activeRegistrations }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ငွေထုတ်<br>ပမာဏ</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ formatN(myStats.withdrawalAmount) }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ငွေထုတ်သော<br>အရေအတွက်</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ myStats.withdrawalCount }}</p>
              </div>

              <!-- Row 4 -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ဆုလာဘ်<br>တောင်းဆို</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ formatN(myStats.bonusRequests) }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">လက်ခံသော<br>အရေအတွက်</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ myStats.acceptedBonuses }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တရားဝင်<br>လောင်းကြေး</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ formatN(myStats.singleBetAmount) }}</p>
              </div>

              <!-- Row 5 -->
              <div class="p-3 text-center border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">လောင်းကစားသူ/<br>အရေအတွက်</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ formatN(myStats.totalTurnover) }}</p>
              </div>
              <div class="p-3 text-center border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တိုက်ရိုက် အနိုင်/<br>အရှုံးများ</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ formatN(myStats.directBetAmount) }}</p>
              </div>
              <div class="p-3 text-center" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တိုက်ရိုက် <br>စွမ်းဆောင်ရည်</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ formatN(myStats.directEffectiveTurnover) }}</p>
              </div>

            </div>
          </div>

          <!-- ════════════════════════════════════════════
               SECTION 2: တိုက်ရိုက်ဝင်ငွေ (Direct Commission)
               ════════════════════════════════════════════ -->
          <div class="fp-card rounded-2xl overflow-hidden">
            <div class="px-4 pt-3.5 pb-2.5" style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <p class="text-[11px] font-black tracking-wide" style="color:rgba(255,255,255,0.88);">တိုက်ရိုက်ဝင်ငွေ</p>
            </div>
            <div class="grid grid-cols-3" style="border-color:rgba(255,255,255,0.05);">
              <!-- Row 1: highlighted yellow -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တိုက်ရိုက်<br>ကော်မရှင်</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(myStats.directComm) }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အခြား<br>ကော်မရှင်များ</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(myStats.indirectComm) }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">စုစုပေါင်း<br>ကော်မရှင်</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(myStats.totalComm) }}</p>
              </div>
              <!-- Row 2 -->
              <div class="p-3 text-center border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ကော်မရှင်<br>ရယူပါ!</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(0) }}</p>
              </div>
              <div class="p-3 text-center border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ဆိုင်းငံ့<br>ကော်မရှင်</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(myStats.pendingComm) }}</p>
              </div>
              <div class="p-3 text-center" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အေးဂျင့်များ၏<br>လှုပ်ရှားမှု့များ</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(0) }}</p>
              </div>
            </div>
          </div>

          <!-- ════════════════════════════════════════════
               SECTION 3: ဒေတာအားလုံး (All Downline Data)
               ════════════════════════════════════════════ -->
          <div class="fp-card rounded-2xl overflow-hidden">
            <div class="px-4 pt-3.5 pb-2.5" style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <p class="text-[11px] font-black tracking-wide" style="color:rgba(255,255,255,0.88);">ဒေတာအားလုံး</p>
              <p class="text-[8.5px] mt-0.5" style="color:rgba(255,255,255,0.42);">(အခြားလက်အောက်ငယ်သားများပါဝင်သည်)</p>
            </div>
            <div class="grid grid-cols-3" style="border-color:rgba(255,255,255,0.05);">
              <!-- Row 1: Members -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">စုစုပေါင်းလူ</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(255,255,255,0.92);">{{ myStats.totalMembers }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တိုက်ရိုက်</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(100,220,120,0.92);">{{ myStats.directMembers }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အခြားအရေအတွက်</p>
                <p class="text-[16px] font-black tabular-nums" style="color:rgba(100,180,255,0.92);">{{ myStats.indirectMembers }}</p>
              </div>
              <!-- Row 2: Turnover -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တိုက်ရိုက်<br>လောင်းကြေး</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(myStats.allDirectTurnover) }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အခြား<br>လောင်းကြေး</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(myStats.allIndirectTurnover) }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">စုစုပေါင်း<br>လောင်းကြေး</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(myStats.allTotalTurnover) }}</p>
              </div>
              <!-- Row 3: Effective turnover -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">စုဆောင်းမိသောတိုက်ရိုက်<br>ငွေပေးချေမှု့</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(myStats.directEffectiveTurnover) }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">စုဆောင်းငွေတိုက်ရိုက်<br>ငွေထုတ်</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(myStats.overrideTurnover) }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">စုစုပေါင်းတိုက်ရိုက်<br>စုစည်းမှု့</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(myStats.allTotalTurnover) }}</p>
              </div>
              <!-- Row 4: 2-col win/lose -->
              <div class="p-3 text-center border-r col-span-1" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">စုစည်းမှူတိုက်ရိုက်ထိရောက်သော<br>အလောင်းအစား</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(100,220,120,0.88);">{{ formatDec(0) }}</p>
              </div>
              <div class="p-3 text-center col-span-2" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တိုက်ရိုက်အရှုံးအမြတ်<br>စုစည်းမှု့!</p>
                <p class="text-[14px] font-black tabular-nums" style="color:rgba(255,100,100,0.88);">{{ formatDec(0) }}</p>
              </div>
            </div>
          </div>

          <!-- ════════════════════════════════════════════
               SECTION 4: ငါ့စုစုပေါင်းဝင်ငွေ (My Total Commission)
               ════════════════════════════════════════════ -->
          <div class="fp-card rounded-2xl overflow-hidden">
            <div class="px-4 pt-3.5 pb-2.5" style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <p class="text-[11px] font-black tracking-wide" style="color:rgba(255,255,255,0.88);">ငါ့စုစုပေါင်းဝင်ငွေ</p>
            </div>
            <div class="grid grid-cols-3" style="border-color:rgba(255,255,255,0.05);">
              <!-- Row 1: yellow commissions -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">တိုက်ရိုက်<br>ကော်မရှင်</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(myStats.directComm) }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အခြား<br>ကော်မရှင်များ</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(myStats.indirectComm) }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">စုစုပေါင်း<br>ကော်မရှင်</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(myStats.totalComm) }}</p>
              </div>
              <!-- Row 2: bonus, rank, monthly -->
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ဆုလာဘ်</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(myStats.bonusComm) }}</p>
              </div>
              <div class="p-3 text-center border-b border-r" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">ရရှိ<br>ခဲ့သော</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(0) }}</p>
              </div>
              <div class="p-3 text-center border-b" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">လစာ<br>အပြည့်(Full)</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,193,7,0.95);">{{ formatDec(0) }}</p>
              </div>
              <!-- Row 3: pending, invalid — 2-col -->
              <div class="p-3 text-center border-r col-span-1" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">Promotionလုပ်ဆောင်မှူ့<br>စုဆောင်းငွေများ</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(myStats.pendingComm) }}</p>
              </div>
              <div class="p-3 text-center col-span-2" style="border-color:rgba(255,255,255,0.05);">
                <p class="text-[8.5px] leading-snug mb-2" style="color:rgba(255,255,255,0.58);">အေဂျင်စီလုပ်ငန်းများအတွက်<br>စုဆောင်းငွေများ</p>
                <p class="text-[15px] font-black tabular-nums" style="color:rgba(255,255,255,0.88);">{{ formatDec(0) }}</p>
              </div>
            </div>
          </div>

          <!-- Real-time indicator -->
          <div class="flex items-center justify-center gap-2 py-2">
            <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:rgba(100,220,120,0.85);box-shadow:0 0 6px rgba(100,220,120,0.6)"></div>
            <p class="text-[9px]" style="color:rgba(255,255,255,0.3)">Real-Time • ဒေတာ အလိုအလျောက် ပြောင်းနေသည်!!</p>
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
        <div class="fp-card rounded-2xl overflow-hidden">
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
        <div class="fp-card rounded-2xl overflow-hidden">
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
        <div class="fp-card rounded-2xl overflow-hidden">
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
        <div class="fp-card rounded-2xl overflow-hidden">
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

        <div class="fp-card rounded-2xl p-4">
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
        <div class="fp-card rounded-2xl p-4">
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

    <!-- ══════════════════════════════════════════════════════════════
         ✦ ULTRA LUXURY VIP CASINO LEVEL SYSTEM MODAL ✦
         ══════════════════════════════════════════════════════════════ -->
    <Transition name="level-modal">
      <div v-if="showLevelModal"
        class="fixed inset-0 z-50 flex flex-col justify-end"
        style="background:rgba(0,0,0,0.88)">

        <!-- Tap-outside to close -->
        <div class="absolute inset-0" @click="showLevelModal = false"></div>

        <!-- Sheet -->
        <div class="relative rounded-t-[32px] overflow-hidden lux-modal-sheet"
          style="max-height:91vh;background:linear-gradient(180deg,#161228 0%,#0d0920 50%,#090616 100%);border-top:1.5px solid rgba(255,200,80,0.30);">

          <!-- Top ambient radial glow — brighter -->
          <div class="absolute top-0 left-0 right-0 h-56 pointer-events-none"
            style="background:radial-gradient(ellipse at 50% -5%,rgba(255,190,0,0.28) 0%,rgba(140,60,220,0.10) 55%,transparent 82%)"></div>

          <!-- Drag handle -->
          <div class="flex justify-center pt-3 pb-0 relative z-10">
            <div class="w-10 h-1 rounded-full" style="background:rgba(255,255,255,0.15)"></div>
          </div>

          <!-- ── HEADER ── -->
          <div class="sticky top-0 z-20 px-5 pt-4 pb-3 flex items-center justify-between"
            style="background:rgba(8,6,18,0.95);border-bottom:1px solid rgba(255,180,0,0.09);backdrop-filter:blur(20px);">

            <!-- Left: current badge mini + title -->
            <div class="flex items-center gap-3">
              <!-- Mini current badge — Shield shape -->
              <div class="flex-shrink-0 relative" style="width:48px;height:52px;">
                <!-- Shield SVG -->
                <div v-html="miniShieldHtml(currentLevelData)"
                  class="absolute inset-0"
                  :style="`overflow:visible;filter:drop-shadow(0 0 10px ${currentLevelData.glowColor}) drop-shadow(0 2px 4px rgba(0,0,0,0.9));`">
                </div>
                <!-- AG level text overlay on shield -->
                <div class="absolute inset-0 flex items-center justify-center" style="padding-top:6px;">
                  <div class="ag-on-shield"
                    :style="`background:linear-gradient(135deg,${currentLevelData.rimColor}55,${currentLevelData.rimColor}22);border:1px solid ${currentLevelData.rimColor}95;color:${currentLevelData.rimColor};text-shadow:0 0 12px ${currentLevelData.glowColor},0 1px 0 rgba(0,0,0,0.9);box-shadow:0 0 14px ${currentLevelData.glowColor}60;`">
                    <span class="relative z-10 font-black tracking-wide" style="font-size:9px;line-height:1;">AG{{ agentLevel }}</span>
                  </div>
                </div>
                <!-- Tier label below shield -->
                <div class="absolute w-full text-center" style="bottom:-10px;">
                  <span class="font-black tracking-wider" style="font-size:5px;letter-spacing:0.1em;"
                    :style="`color:${currentLevelData.rimColor};text-shadow:0 0 6px ${currentLevelData.glowColor};`">
                    {{ currentLevelData.tierName }}
                  </span>
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
          <div class="px-5 py-2 flex items-center gap-3" style="border-bottom:1px solid rgba(255,255,255,0.08)">
            <div class="w-[58px] flex-shrink-0 text-[8px] font-bold tracking-widest uppercase" style="color:rgba(255,255,255,0.45)">Badge</div>
            <div class="flex-1 text-[8px] font-bold tracking-widest uppercase" style="color:rgba(255,255,255,0.45)">Min Commission</div>
            <div class="w-10 text-right text-[8px] font-bold tracking-widest uppercase" style="color:rgba(255,255,255,0.45)">Rate</div>
          </div>

          <!-- ── SCROLLABLE LEVEL ROWS ── -->
          <div ref="levelScrollRef" class="overflow-y-auto px-3 pt-2 pb-12 relative" style="max-height:54vh;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;will-change:scroll-position;">
            <div v-for="lv in AGENT_LEVELS" :key="lv.level"
              class="lv-row flex items-center gap-3 px-3 py-3 rounded-2xl mb-2 overflow-hidden relative z-[2]"
              :class="lv.level === agentLevel ? 'lv-current' : lv.level < agentLevel ? 'lv-past' : 'lv-future'">

              <!-- Lightweight left accent bar -->
              <div class="absolute left-0 top-2 bottom-2 w-[3px] rounded-full pointer-events-none"
                :style="lv.level <= agentLevel
                  ? `background:linear-gradient(180deg,${lv.rimColor},${lv.glowColor});box-shadow:0 0 10px 2px ${lv.glowColor};`
                  : 'background:rgba(255,255,255,0.07)'">
              </div>

              <!-- ═══════════════════════════════════════════════
                   ✦ LEGENDARY CROWN SHIELD — all FX on badge ✦
                   ═══════════════════════════════════════════════ -->
              <div class="flex-shrink-0 relative z-10" style="width:64px;overflow:visible;">

                <!-- Crown Shield container (all FX inside here) -->
                <div class="relative mx-auto" style="width:56px;height:56px;isolation:isolate;">

                  <!-- ① Crown Aura — radial glow bloom behind shield -->
                  <div class="absolute pointer-events-none crown-aura"
                    :class="`crown-aura-${lv.tierName.toLowerCase()}`"
                    :style="`inset:-10px;border-radius:50%;background:radial-gradient(circle,${lv.glowColor}60 0%,${lv.glowColor}25 38%,transparent 68%);`">
                  </div>

                  <!-- ② Outer rotating ring — Silver+ -->
                  <div v-if="lv.level >= 4"
                    class="absolute pointer-events-none crown-ring-outer"
                    :class="`crown-ring-${lv.tierName.toLowerCase()}`"
                    :style="`inset:-6px;border-radius:50%;border:1px solid ${lv.rimColor}60;`">
                  </div>

                  <!-- ③ Inner dashed ring — Gold+ -->
                  <div v-if="lv.level >= 7"
                    class="absolute pointer-events-none crown-ring-inner"
                    :style="`inset:-2px;border-radius:50%;border:1px dashed ${lv.rimColor}80;animation:crown-cw ${lv.level >= 13 ? '2.2' : lv.level >= 10 ? '2.8' : '3.5'}s linear infinite;`">
                  </div>

                  <!-- ④ Shield SVG (badge itself, larger now) -->
                  <div v-html="miniShieldHtml(lv)"
                    class="absolute"
                    :style="`width:52px;height:52px;left:2px;top:2px;overflow:visible;`
                      + (lv.level <= agentLevel
                        ? `filter:drop-shadow(0 0 12px ${lv.glowColor}) drop-shadow(0 3px 6px rgba(0,0,0,0.9));`
                        : `filter:drop-shadow(0 0 10px ${lv.glowColor}80) drop-shadow(0 3px 6px rgba(0,0,0,0.8)) brightness(1.05) saturate(1.25);`)">
                  </div>

                  <!-- ⑤ Royal sweep shimmer across shield face — Bronze+ always -->
                  <div class="absolute pointer-events-none overflow-hidden" style="inset:4px;border-radius:8px;">
                    <div class="absolute inset-0 crown-royal-sweep"
                      :style="`background:linear-gradient(110deg,transparent 20%,${lv.rimColor}${lv.level <= agentLevel ? '35' : '12'} 50%,transparent 80%);`">
                    </div>
                  </div>

                  <!-- ⑥ Floating gem particles — close orbit around shield (Gold+) -->
                  <template v-if="lv.level >= 7">
                    <!-- Gem A — clockwise primary orbit -->
                    <div class="absolute pointer-events-none crown-gem"
                      style="left:50%;top:50%;width:4px;height:4px;margin-left:-2px;margin-top:-2px;border-radius:50%;"
                      :style="`background:${lv.rimColor};box-shadow:0 0 7px 2px ${lv.glowColor};`
                        + `animation:crown-gem-a ${lv.level >= 22 ? '1.4' : lv.level >= 19 ? '1.7' : lv.level >= 16 ? '2.0' : lv.level >= 13 ? '2.4' : lv.level >= 10 ? '2.9' : '3.6'}s linear infinite;`">
                    </div>
                    <!-- Gem B — counter-clockwise offset -->
                    <div class="absolute pointer-events-none crown-gem"
                      style="left:50%;top:50%;width:3px;height:3px;margin-left:-1.5px;margin-top:-1.5px;border-radius:50%;"
                      :style="`background:rgba(255,255,255,0.95);box-shadow:0 0 6px 2px ${lv.glowColor};`
                        + `animation:crown-gem-b ${lv.level >= 22 ? '1.6' : lv.level >= 19 ? '2.0' : lv.level >= 16 ? '2.4' : lv.level >= 13 ? '2.8' : lv.level >= 10 ? '3.3' : '4.2'}s linear infinite;`">
                    </div>
                    <!-- Gem C — Emerald+ third gem -->
                    <div v-if="lv.level >= 10"
                      class="absolute pointer-events-none crown-gem"
                      style="left:50%;top:50%;width:3px;height:3px;margin-left:-1.5px;margin-top:-1.5px;border-radius:50%;"
                      :style="`background:${lv.rimColor};box-shadow:0 0 5px 2px ${lv.glowColor};`
                        + `animation:crown-gem-c ${lv.level >= 22 ? '1.8' : lv.level >= 19 ? '2.2' : lv.level >= 16 ? '2.7' : lv.level >= 13 ? '3.1' : '3.8'}s linear infinite;`">
                    </div>
                    <!-- Gem D — Ruby+ fourth prestige gem -->
                    <div v-if="lv.level >= 16"
                      class="absolute pointer-events-none crown-gem"
                      style="left:50%;top:50%;width:4px;height:4px;margin-left:-2px;margin-top:-2px;border-radius:1px;"
                      :style="`background:${lv.rimColor};box-shadow:0 0 8px 3px ${lv.glowColor};`
                        + `animation:crown-gem-d ${lv.level >= 22 ? '2.0' : lv.level >= 19 ? '2.5' : '3.0'}s linear infinite;`">
                    </div>
                  </template>

                  <!-- ⑦ Prestige particle sparks — Diamond+ -->
                  <template v-if="lv.level >= 19 && lv.level <= agentLevel">
                    <div class="absolute pointer-events-none"
                      style="left:50%;top:50%;width:2px;height:2px;margin-left:-1px;margin-top:-1px;border-radius:50%;"
                      :style="`background:rgba(255,255,255,0.9);box-shadow:0 0 5px rgba(255,255,255,0.8);animation:crown-prestige-a 1.2s ease-in-out infinite;`">
                    </div>
                    <div class="absolute pointer-events-none"
                      style="left:50%;top:50%;width:2px;height:2px;margin-left:-1px;margin-top:-1px;border-radius:50%;"
                      :style="`background:${lv.rimColor};box-shadow:0 0 5px ${lv.glowColor};animation:crown-prestige-b 1.5s ease-in-out infinite 0.6s;`">
                    </div>
                  </template>

                  <!-- ⑧ YOU level — extra strong crown halo -->
                  <div v-if="lv.level === agentLevel"
                    class="absolute pointer-events-none"
                    style="inset:-12px;border-radius:50%;animation:crown-you-halo 1.5s ease-in-out infinite;"
                    :style="`background:radial-gradient(circle,${lv.glowColor}45 0%,transparent 65%);`">
                  </div>

                  <!-- ⑨ AG label centered on shield -->
                  <div class="absolute inset-0 flex items-center justify-center" style="padding-top:4px;">
                    <div class="ag-on-shield relative overflow-hidden"
                      :class="lv.level <= agentLevel ? `ag-btn-tier-${lv.tierName.toLowerCase()}` : ''"
                      :style="lv.level <= agentLevel
                        ? `background:linear-gradient(135deg,${lv.rimColor}55,${lv.rimColor}22);border:1px solid ${lv.rimColor}95;color:${lv.rimColor};text-shadow:0 0 14px ${lv.glowColor},0 1px 0 rgba(0,0,0,0.95);box-shadow:0 0 20px ${lv.glowColor}80,inset 0 1px 0 rgba(255,255,255,0.3);`
                        : 'background:rgba(30,15,55,0.92);border:1px solid rgba(255,255,255,0.35);color:rgba(255,255,255,0.92);font-weight:900;'">
                      <span class="relative z-10 font-black tracking-wide" style="font-size:9px;line-height:1;">AG{{ lv.level }}</span>
                      <div v-if="lv.level <= agentLevel" class="ag-btn-sweep absolute inset-0 pointer-events-none"
                        :style="`background:linear-gradient(105deg,transparent 25%,${lv.rimColor}35 50%,transparent 75%);`"></div>
                    </div>
                  </div>
                </div>

                <!-- YOU / LOCKED under badge -->
                <div class="flex justify-center mt-0.5">
                  <span v-if="lv.level === agentLevel"
                    class="text-[6px] px-1.5 py-0.5 rounded-full font-black lux-you-badge"
                    style="background:linear-gradient(90deg,rgba(255,215,0,0.35),rgba(255,140,0,0.28));border:1px solid rgba(255,215,0,0.55);color:#FFD700;">
                    ▶ YOU
                  </span>
                  <span v-else-if="lv.level > agentLevel"
                    class="text-[6px] font-bold tracking-wider"
                    :style="`color:${lv.rimColor};text-shadow:0 0 8px ${lv.glowColor};`">
                    LOCKED
                  </span>
                  <span v-else class="text-[6px] font-bold" style="color:rgba(80,240,120,0.95);text-shadow:0 0 8px rgba(80,240,120,0.6);">✓</span>
                </div>
              </div>

              <!-- Commission (flex-1 — takes remaining space) -->
              <div class="flex-1 relative z-10">
                <p class="font-bold"
                  :style="`font-size:12px;` + (lv.level <= agentLevel
                    ? lv.numberStyle + ';text-shadow:0 0 12px currentColor;'
                    : 'color:rgba(255,255,255,0.82);font-weight:600')">
                  {{ lv.required === 0 ? '—' : formatN(lv.required) + ' Ks' }}
                </p>
              </div>

              <!-- Rate -->
              <div class="w-12 text-right relative z-10">
                <span
                  :class="lv.level === agentLevel ? 'lv-rate-current' : ''"
                  :style="`font-size:13px;font-weight:900;` + (lv.level === agentLevel
                    ? lv.numberStyle + ';text-shadow:0 0 16px currentColor;'
                    : lv.level < agentLevel
                      ? 'color:rgba(255,255,255,0.80)'
                      : 'color:rgba(255,255,255,0.75);font-weight:700')">
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
const agentBannerUrl = ref('/images/banners/banner2.jpg')
const copiedCode   = ref(false)
const copiedLink   = ref(false)
const dlSearch     = ref('')
const dlLevelFilter= ref(0)
const activePeriod = ref('today')

// Tree tab state
const treeSelectedNode = ref('self')
const demoTab = ref('A')
const showLevelModal = ref(false)

// ── My Data Tab State ──────────────────────────────────────────
const myDataPeriod  = ref('today')
const myDataLoading = ref(false)
const myStats = ref({
  // Section 1 — direct downline stats
  directNewReg:          0,
  depositingCount:       0,
  firstDepositCount:     0,
  activeFirstDeposit:    0,
  depositAmount:         0,
  firstDepositAmount:    0,
  activeRegistrations:   0,
  withdrawalAmount:      0,
  withdrawalCount:       0,
  bonusRequests:         0,
  acceptedBonuses:       0,
  singleBetAmount:       0,
  totalTurnover:         0,
  directBetAmount:       0,
  directEffectiveTurnover: 0,
  // Section 2 — commission
  directComm:            0,
  indirectComm:          0,
  totalComm:             0,
  pendingComm:           0,
  bonusComm:             0,
  // Section 3 — all downline
  totalMembers:          0,
  directMembers:         0,
  indirectMembers:       0,
  allDirectTurnover:     0,
  allIndirectTurnover:   0,
  allTotalTurnover:      0,
  overrideTurnover:      0,
})

const myDataPeriods = [
  { key: 'today',     label: 'ဒိုင်' },
  { key: 'yesterday', label: 'မနေ့' },
  { key: 'thisweek',  label: 'ယခုအပတ်' },
  { key: 'lastweek',  label: 'ပြီးခဲ့သောအပတ်' },
  { key: 'thismonth', label: 'ဒါလ' },
  { key: 'all',       label: 'ပြ' },
]

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

// Neural Flow Canvas (Level Modal)
const neuralCanvasRef = ref(null)
const levelScrollRef  = ref(null)
let   neuralRaf       = null

function startNeuralFlow() {
  const canvas = neuralCanvasRef.value
  const container = levelScrollRef.value
  if (!canvas || !container) return

  canvas.width  = container.offsetWidth
  canvas.height = container.scrollHeight || container.offsetHeight

  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height

  // Node positions along the left edge (badge centres) + right edge
  const nodeCount = 30
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.55,
    vy: (Math.random() - 0.5) * 0.35 + 0.15,
    r: Math.random() * 1.8 + 0.6,
    hue: Math.random() > 0.5 ? Math.random() * 60 + 200 : Math.random() * 40 + 30,
    alpha: Math.random() * 0.5 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.012 + 0.006,
  }))

  // Flowing energy stream paths (3 bezier curves)
  const streams = [
    { oy: H * 0.25, freq: 0.42, amp: 22, hue: 210, speed: 0.7 },
    { oy: H * 0.52, freq: 0.35, amp: 18, hue: 160, speed: 0.5 },
    { oy: H * 0.78, freq: 0.50, amp: 26, hue: 280, speed: 0.9 },
  ]
  const pulses = streams.map(s => ({ t: Math.random(), speed: s.speed * 0.004 }))

  let frame = 0

  function draw() {
    ctx.clearRect(0, 0, W, H)
    frame++
    const t = frame * 0.016

    // ── 1. Energy streams (bezier wave lines) ──
    streams.forEach((s, i) => {
      const p = pulses[i]
      p.t += p.speed
      if (p.t > 1) p.t -= 1

      const cp1x = W * 0.28, cp1y = s.oy + Math.sin(t * s.freq + 1.1) * s.amp
      const cp2x = W * 0.72, cp2y = s.oy + Math.cos(t * s.freq + 2.3) * s.amp
      const endY = s.oy + Math.sin(t * s.freq * 0.7) * (s.amp * 0.5)

      const grad = ctx.createLinearGradient(0, 0, W, 0)
      grad.addColorStop(0,   `hsla(${s.hue},90%,65%,0)`)
      grad.addColorStop(0.35,`hsla(${s.hue},90%,65%,0.18)`)
      grad.addColorStop(0.65,`hsla(${s.hue},90%,65%,0.18)`)
      grad.addColorStop(1,   `hsla(${s.hue},90%,65%,0)`)

      ctx.strokeStyle = grad
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(0, s.oy)
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, W, endY)
      ctx.stroke()

      // Pulse dot travelling along the path
      const px = W * p.t
      const interp = (a, b, x) => a + (b - a) * x
      const tt = p.t
      const bx = interp(interp(0, cp1x, tt), interp(cp1x, cp2x, tt), tt)
      const by = interp(interp(s.oy, cp1y, tt), interp(cp1y, cp2y, tt), tt)
      ctx.fillStyle = `hsla(${s.hue},100%,75%,0.85)`
      ctx.shadowColor = `hsla(${s.hue},100%,75%,0.9)`
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.arc(bx, by, 2.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // ── 2. Neural nodes + connection lines ──
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      n.phase += n.speed
      n.x += n.vx
      n.y += n.vy

      if (n.x < 0 || n.x > W) n.vx *= -1
      if (n.y < 0) n.y = H
      if (n.y > H) n.y = 0

      // Connection lines
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j]
        const dx = n.x - m.x, dy = n.y - m.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 90) {
          const alpha = (1 - dist / 90) * 0.22
          ctx.strokeStyle = `rgba(120,190,255,${alpha})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(m.x, m.y)
          ctx.stroke()
        }
      }

      // Node dot
      const pulse = (Math.sin(n.phase) * 0.5 + 0.5)
      const bright = 50 + pulse * 25
      ctx.globalAlpha = n.alpha * (0.55 + pulse * 0.45)
      ctx.fillStyle = `hsl(${n.hue},85%,${bright}%)`
      ctx.shadowColor = `hsl(${n.hue},100%,70%)`
      ctx.shadowBlur = 5
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r * (0.8 + pulse * 0.4), 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    ctx.shadowBlur = 0

    neuralRaf = requestAnimationFrame(draw)
  }

  draw()
}

function stopNeuralFlow() {
  if (neuralRaf) { cancelAnimationFrame(neuralRaf); neuralRaf = null }
}

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

// Invite code = the dl= param in the URL (not the display username)
const inviteCode = computed(() =>
  userId.value ? userId.value.substring(0, 8).toUpperCase() : username.value
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

// ── EVOLUTION BADGE SYSTEM ──────────────────────────────────────
function getLvTier(level) {
  if (level <= 3)  return 'bronze'
  if (level <= 5)  return 'silver'
  if (level <= 7)  return 'gold'
  if (level <= 9)  return 'emerald'
  if (level <= 11) return 'sapphire'
  if (level === 12) return 'ruby'
  if (level === 13) return 'diamond'
  if (level === 14) return 'legend'
  return 'mythic'
}
const badgeTier = computed(() => getLvTier(agentLevel.value))
const evoParticleCount = computed(() => {
  const lv = agentLevel.value
  if (lv >= 15) return 16
  if (lv >= 14) return 12
  if (lv >= 13) return 10
  if (lv >= 12) return 8
  if (lv >= 10) return 6
  if (lv >= 8)  return 4
  return 2
})

function miniShieldHtml(lv) {
    const n = lv.level
    const gid = `ms${n}`
    const wrap = (body) =>
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" style="overflow:visible;width:100%;height:100%;"><defs><linearGradient id="${gid}" x1="5%" y1="5%" x2="95%" y2="95%"><stop stop-color="${lv.gradStart}" offset="0%"/><stop stop-color="${lv.gradEnd}" offset="100%"/></linearGradient></defs>${body}</svg>`

    const shield = (sw) =>
      `<path d="M35,6 L59,15 V39 C59,53 35,63 35,63 C35,63 11,53 11,39 V15 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="${sw}"/>
       <path d="M35,9 L56,17 V38 C56,50 35,61 35,61 C35,61 14,50 14,38 V17 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
       <path d="M35,9 L56,17 V26 C49,24 41,22 35,22 C29,22 21,24 14,26 V17 Z" fill="rgba(255,255,255,0.14)" stroke="none"/>`

    // LV1 — Bronze I: plain shield + subtle inner outline
    if (n === 1) return wrap(
      shield('1.6') +
      `<path d="M35,13 L53,20 V38 C53,49 35,58 35,58 C35,58 17,49 17,38 V20 Z" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.35"/>`
    )

    // LV2 — Bronze II: + 6 corner dots
    if (n === 2) return wrap(
      shield('1.7') +
      `<circle cx="11" cy="15" r="2" fill="${lv.rimColor}" opacity="0.7"/>
       <circle cx="59" cy="15" r="2" fill="${lv.rimColor}" opacity="0.7"/>
       <circle cx="35" cy="5"  r="2" fill="${lv.rimColor}" opacity="0.8"/>
       <circle cx="35" cy="63" r="2" fill="${lv.rimColor}" opacity="0.6"/>
       <circle cx="14" cy="51" r="1.6" fill="${lv.rimColor}" opacity="0.55"/>
       <circle cx="56" cy="51" r="1.6" fill="${lv.rimColor}" opacity="0.55"/>`
    )

    // LV3 — Bronze III: pulsing outline (uses lv-bronze-pulse)
    if (n === 3) return wrap(
      `<path d="M35,4 L61,14 V39 C61,54 35,65 35,65 C35,65 9,54 9,39 V14 Z" fill="${lv.gradStart}" stroke="${lv.rimColor}" stroke-width="1" opacity="0.25" style="animation:lv-bronze-pulse 2s ease-in-out infinite"/>` +
      shield('1.8') +
      `<line x1="35" y1="13" x2="35" y2="61" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.22"/>
       <line x1="17" y1="37" x2="53" y2="37" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.22"/>`
    )

    // LV4 — Silver I: side nubs + mini triple-top spikes
    if (n === 4) return wrap(
      `<path d="M11,30 L5,35 L11,40 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.8"/>
       <path d="M59,30 L65,35 L59,40 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.8"/>` +
      shield('1.9') +
      `<path d="M28,6 L31,0 L34,6 Z" fill="${lv.rimColor}"/>
       <path d="M33,4 L35,-1 L37,4 Z" fill="${lv.rimColor}"/>
       <path d="M36,6 L39,0 L42,6 Z" fill="${lv.rimColor}"/>
       <circle cx="11" cy="15" r="1.6" fill="${lv.rimColor}" opacity="0.8"/>
       <circle cx="59" cy="15" r="1.6" fill="${lv.rimColor}" opacity="0.8"/>`
    )

    // LV5 — Silver II: spinning dashed ring (crown-cw) + nubs
    if (n === 5) return wrap(
      `<path d="M11,30 L5,35 L11,40 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.8"/>
       <path d="M59,30 L65,35 L59,40 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.8"/>` +
      shield('2.0') +
      `<circle cx="35" cy="36" r="17" fill="none" stroke="${lv.rimColor}" stroke-width="0.8" stroke-dasharray="4,3" opacity="0.5" style="animation:crown-cw 10s linear infinite"/>
       <path d="M28,6 L31,0 L34,6 Z" fill="${lv.rimColor}"/>
       <path d="M33,4 L35,-1 L37,4 Z" fill="${lv.rimColor}"/>
       <path d="M36,6 L39,0 L42,6 Z" fill="${lv.rimColor}"/>`
    )

    // LV6 — Silver III: spinning ring (cw+ccw) + nubs + 5-point star
    if (n === 6) return wrap(
      `<path d="M11,30 L5,35 L11,40 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.8"/>
       <path d="M59,30 L65,35 L59,40 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.8"/>` +
      shield('2.0') +
      `<circle cx="35" cy="36" r="17" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" stroke-dasharray="4,3" opacity="0.45" style="animation:crown-cw 9s linear infinite"/>
       <circle cx="35" cy="36" r="12" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" stroke-dasharray="3,2" opacity="0.38" style="animation:crown-ccw 7s linear infinite"/>
       <polygon points="35,27 36.5,32 41.5,32 37.5,35 39,40 35,37 31,40 32.5,35 28.5,32 33.5,32" fill="${lv.rimColor}" opacity="0.85"/>
       <path d="M28,6 L31,0 L34,6 Z" fill="${lv.rimColor}"/>
       <path d="M33,4 L35,-1 L37,4 Z" fill="${lv.rimColor}"/>
       <path d="M36,6 L39,0 L42,6 Z" fill="${lv.rimColor}"/>`
    )

    // LV7 — Gold I: crown + glowing outline pulse (lv-gold-glow)
    if (n === 7) return wrap(
      `<path d="M35,4 L61,14 V39 C61,54 35,65 35,65 C35,65 9,54 9,39 V14 Z" fill="${lv.gradStart}" stroke="${lv.rimColor}" stroke-width="1" opacity="0.2" style="animation:lv-gold-glow 2s ease-in-out infinite"/>` +
      shield('2.1') +
      `<path d="M18,7 L22,1 L27,6 L35,-1 L43,6 L48,1 L52,7" stroke="${lv.rimColor}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <circle cx="35" cy="-1" r="2.8" fill="${lv.rimColor}"/>
       <circle cx="35" cy="36" r="16" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.4" stroke-dasharray="3,2"/>`
    )

    // LV8 — Gold II: wing buds + crown (lv-gold-glow)
    if (n === 8) return wrap(
      `<path d="M35,4 L61,14 V39 C61,54 35,65 35,65 C35,65 9,54 9,39 V14 Z" fill="${lv.gradStart}" stroke="${lv.rimColor}" stroke-width="1" opacity="0.2" style="animation:lv-gold-glow 2.2s ease-in-out infinite"/>` +
      `<path d="M11,23 C4,21 0,27 2,35 C4,43 11,45 11,45 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1"/>
       <path d="M59,23 C66,21 70,27 68,35 C66,43 59,45 59,45 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1"/>` +
      shield('2.2') +
      `<path d="M18,7 L22,1 L27,6 L35,-1 L43,6 L48,1 L52,7" stroke="${lv.rimColor}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <circle cx="35" cy="-1" r="2.8" fill="${lv.rimColor}"/>
       <circle cx="35" cy="36" r="16" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.4" stroke-dasharray="3,2"/>
       <circle cx="35" cy="36" r="22" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.3" stroke-dasharray="4,2"/>`
    )

    // LV9 — Gold III: small wings + spinning ring + crown
    if (n === 9) return wrap(
      `<path d="M11,20 C3,15 -4,22 -2,33 C0,43 8,48 11,48 L11,23 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.2"/>
       <path d="M59,20 C67,15 74,22 72,33 C70,43 62,48 59,48 L59,23 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.2"/>
       <path d="M-2,33 L-8,26 L-4,20 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.6"/>
       <path d="M72,33 L78,26 L74,20 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.6"/>` +
      shield('2.2') +
      `<circle cx="35" cy="36" r="16" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.4" stroke-dasharray="3,2" style="animation:crown-cw 8s linear infinite"/>
       <circle cx="35" cy="36" r="22" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.28" stroke-dasharray="4,2" style="animation:crown-ccw 12s linear infinite"/>
       <path d="M17,7 L21,1 L26,6 L35,-2 L44,6 L49,1 L53,7" stroke="${lv.rimColor}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <circle cx="35" cy="-2" r="3.2" fill="${lv.rimColor}"/>
       <circle cx="21" cy="1" r="1.2" fill="${lv.rimColor}" opacity="0.8"/>
       <circle cx="49" cy="1" r="1.2" fill="${lv.rimColor}" opacity="0.8"/>`
    )

    // LV10 — Platinum I: med wings + dual spin + diamond center
    if (n === 10) return wrap(
      `<path d="M11,17 C1,9 -7,17 -5,32 C-3,44 6,51 11,51 L11,21 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.3"/>
       <path d="M59,17 C69,9 77,17 75,32 C73,44 64,51 59,51 L59,21 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.3"/>
       <path d="M-5,32 L-12,23 L-6,15 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M75,32 L82,23 L76,15 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <polygon points="4,31 7,35 4,39 1,35" fill="${lv.rimColor}" opacity="0.8"/>
       <polygon points="66,31 69,35 66,39 63,35" fill="${lv.rimColor}" opacity="0.8"/>` +
      shield('2.3') +
      `<circle cx="35" cy="36" r="14" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.5" style="animation:crown-cw 6s linear infinite"/>
       <circle cx="35" cy="36" r="20" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.35" stroke-dasharray="5,2" style="animation:crown-ccw 9s linear infinite"/>
       <polygon points="35,27 42,36 35,45 28,36" fill="${lv.rimColor}" opacity="0.9"/>
       <polygon points="35,31 39,36 35,41 31,36" fill="${lv.gradEnd}"/>
       <path d="M15,7 L19,1 L25,6 L31,-3 L35,2 L39,-3 L45,6 L51,1 L55,7" stroke="${lv.rimColor}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <circle cx="35" cy="2" r="3.5" fill="${lv.rimColor}"/>
       <circle cx="31" cy="-3" r="1.8" fill="${lv.rimColor}" opacity="0.8"/>
       <circle cx="39" cy="-3" r="1.8" fill="${lv.rimColor}" opacity="0.8"/>`
    )

    // LV11 — Platinum II: large wings + dual spin + 3-ring
    if (n === 11) return wrap(
      `<path d="M11,15 C0,6 -10,15 -8,31 C-6,44 3,52 11,53 L11,19 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.3"/>
       <path d="M59,15 C70,6 80,15 78,31 C76,44 67,52 59,53 L59,19 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.3"/>
       <path d="M-8,31 L-16,20 L-10,12 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M78,31 L86,20 L80,12 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M-8,31 L-12,43 L-4,41 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M78,31 L82,43 L74,41 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <polygon points="1,25 4,29 1,33 -2,29" fill="${lv.rimColor}" opacity="0.9"/>
       <polygon points="69,25 72,29 69,33 66,29" fill="${lv.rimColor}" opacity="0.9"/>` +
      shield('2.4') +
      `<circle cx="35" cy="36" r="13" fill="none" stroke="${lv.rimColor}" stroke-width="0.55" opacity="0.42"/>
       <circle cx="35" cy="36" r="16" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.35" stroke-dasharray="3,2" style="animation:crown-cw 5s linear infinite"/>
       <circle cx="35" cy="36" r="22" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.28" stroke-dasharray="4,2" style="animation:crown-ccw 8s linear infinite"/>
       <path d="M15,7 L19,1 L25,6 L31,-3 L35,2 L39,-3 L45,6 L51,1 L55,7" stroke="${lv.rimColor}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <circle cx="35" cy="2" r="3.5" fill="${lv.rimColor}"/>
       <circle cx="31" cy="-3" r="1.8" fill="${lv.rimColor}" opacity="0.8"/>
       <circle cx="39" cy="-3" r="1.8" fill="${lv.rimColor}" opacity="0.8"/>`
    )

    // LV12 — Platinum III: flame wings + pendant + 3-ring
    if (n === 12) return wrap(
      `<path d="M11,13 C-2,3 -13,13 -11,30 C-9,45 0,54 11,55 C7,46 5,36 7,27 C9,19 13,15 11,13 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.4"/>
       <path d="M59,13 C72,3 83,13 81,30 C79,45 70,54 59,55 C63,46 65,36 63,27 C61,19 57,15 59,13 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.4"/>
       <path d="M-11,30 L-19,18 L-13,10 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M81,30 L89,18 L83,10 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M-11,30 L-15,44 L-5,42 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M81,30 L85,44 L75,42 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <polygon points="1,25 4,29 1,33 -2,29" fill="${lv.rimColor}" opacity="0.9"/>
       <polygon points="69,25 72,29 69,33 66,29" fill="${lv.rimColor}" opacity="0.9"/>` +
      shield('2.5') +
      `<path d="M30,63 L35,73 L40,63 L37,77 L35,81 L33,77 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.1"/>
       <circle cx="35" cy="78" r="2.5" fill="${lv.rimColor}"/>
       <circle cx="35" cy="36" r="13" fill="none" stroke="${lv.rimColor}" stroke-width="0.55" opacity="0.42"/>
       <circle cx="35" cy="36" r="16" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.35" stroke-dasharray="3,2" style="animation:crown-cw 4.5s linear infinite"/>
       <circle cx="35" cy="36" r="22" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.28" stroke-dasharray="4,2" style="animation:crown-ccw 7s linear infinite"/>
       <path d="M26,7 L29,1 L32,7 Z" fill="${lv.rimColor}"/>
       <path d="M32,5 L35,-2 L38,5 Z" fill="${lv.rimColor}"/>
       <path d="M38,7 L41,1 L44,7 Z" fill="${lv.rimColor}"/>
       <circle cx="35" cy="-2" r="2.2" fill="${lv.rimColor}"/>`
    )

    // LV13 — Diamond I: cosmic wings + pendant + crownFire + 3-ring
    if (n === 13) return wrap(
      `<path d="M11,11 C-5,0 -17,11 -15,30 C-13,47 -1,57 11,58 C5,47 3,36 5,26 C7,17 13,13 11,11 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.5"/>
       <path d="M59,11 C75,0 87,11 85,30 C83,47 71,57 59,58 C65,47 67,36 65,26 C63,17 57,13 59,11 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.5"/>
       <path d="M-15,30 L-24,17 L-17,8 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M85,30 L94,17 L87,8 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M-15,30 L-20,45 L-9,43 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M85,30 L90,45 L79,43 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <polygon points="-7,18 -4,22 -7,26 -10,22" fill="${lv.rimColor}"/>
       <polygon points="77,18 80,22 77,26 74,22" fill="${lv.rimColor}"/>` +
      shield('2.6') +
      `<path d="M28,63 L35,76 L42,63 L39,82 L35,87 L31,82 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.3"/>
       <circle cx="35" cy="83" r="3.2" fill="${lv.rimColor}"/>
       <circle cx="35" cy="36" r="13" fill="none" stroke="${lv.rimColor}" stroke-width="0.55" opacity="0.42"/>
       <circle cx="35" cy="36" r="16" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.35" stroke-dasharray="3,2" style="animation:crown-cw 4s linear infinite"/>
       <circle cx="35" cy="36" r="22" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.28" stroke-dasharray="4,2" style="animation:crown-ccw 6.5s linear infinite"/>
       <path d="M20,7 L24,1 L30,6 L35,-5 L40,6 L46,1 L50,7" stroke="${lv.rimColor}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M32,-5 C31,-9 33,-13 35,-11 C37,-13 39,-9 38,-5" stroke="${lv.rimColor}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
       <circle cx="35" cy="-5" r="4" fill="${lv.rimColor}"/>
       <circle cx="24" cy="1" r="1.8" fill="${lv.rimColor}" opacity="0.9"/>
       <circle cx="46" cy="1" r="1.8" fill="${lv.rimColor}" opacity="0.9"/>`
    )

    // LV14 — Diamond II: same as 13 + reactor rings
    if (n === 14) return wrap(
      `<path d="M11,11 C-5,0 -17,11 -15,30 C-13,47 -1,57 11,58 C5,47 3,36 5,26 C7,17 13,13 11,11 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.5"/>
       <path d="M59,11 C75,0 87,11 85,30 C83,47 71,57 59,58 C65,47 67,36 65,26 C63,17 57,13 59,11 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.5"/>
       <path d="M-15,30 L-24,17 L-17,8 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M85,30 L94,17 L87,8 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M-15,30 L-20,45 L-9,43 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M85,30 L90,45 L79,43 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <polygon points="-7,18 -4,22 -7,26 -10,22" fill="${lv.rimColor}"/>
       <polygon points="77,18 80,22 77,26 74,22" fill="${lv.rimColor}"/>` +
      shield('2.7') +
      `<path d="M28,63 L35,76 L42,63 L39,82 L35,87 L31,82 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.3"/>
       <circle cx="35" cy="83" r="3.2" fill="${lv.rimColor}"/>
       <circle cx="35" cy="36" r="22" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.22" stroke-dasharray="5,2" style="animation:crown-ccw 5s linear infinite"/>
       <circle cx="35" cy="36" r="17" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.3" style="animation:crown-cw 3.5s linear infinite"/>
       <circle cx="35" cy="36" r="12" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.44"/>
       <circle cx="35" cy="36" r="6"  fill="none" stroke="${lv.rimColor}" stroke-width="1"   opacity="0.65"/>
       <path d="M18,7 L22,1 L28,6 L35,-6 L42,6 L48,1 L52,7" stroke="${lv.rimColor}" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M31,-6 C30,-11 33,-15 35,-13 C37,-15 40,-11 39,-6" stroke="${lv.rimColor}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
       <circle cx="35" cy="-6" r="4.5" fill="${lv.rimColor}"/>
       <circle cx="22" cy="1" r="2.2" fill="${lv.rimColor}" opacity="0.95"/>
       <circle cx="48" cy="1" r="2.2" fill="${lv.rimColor}" opacity="0.95"/>`
    )

    // LV15 — Legend: cosmic wings + both pendants + reactor rings + cosmic crown + lv-legend-aura
    return wrap(
      `<path d="M35,2 L63,13 V39 C63,55 35,67 35,67 C35,67 7,55 7,39 V13 Z" fill="${lv.gradStart}" stroke="${lv.rimColor}" stroke-width="0.8" opacity="0.18" style="animation:lv-legend-aura 1.5s ease-in-out infinite"/>` +
      `<path d="M11,11 C-5,0 -17,11 -15,30 C-13,47 -1,57 11,58 C5,47 3,36 5,26 C7,17 13,13 11,11 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.5"/>
       <path d="M59,11 C75,0 87,11 85,30 C83,47 71,57 59,58 C65,47 67,36 65,26 C63,17 57,13 59,11 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.5"/>
       <path d="M-15,30 L-24,17 L-17,8 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M85,30 L94,17 L87,8 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M-15,30 L-20,45 L-9,43 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <path d="M85,30 L90,45 L79,43 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="0.7"/>
       <polygon points="-7,18 -4,22 -7,26 -10,22" fill="${lv.rimColor}"/>
       <polygon points="77,18 80,22 77,26 74,22" fill="${lv.rimColor}"/>` +
      shield('2.8') +
      `<path d="M28,63 L35,76 L42,63 L39,82 L35,87 L31,82 Z" fill="url(#${gid})" stroke="${lv.rimColor}" stroke-width="1.3"/>
       <circle cx="35" cy="83" r="3.2" fill="${lv.rimColor}"/>
       <circle cx="35" cy="36" r="22" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.22" stroke-dasharray="5,2" style="animation:crown-ccw 4s linear infinite"/>
       <circle cx="35" cy="36" r="17" fill="none" stroke="${lv.rimColor}" stroke-width="0.6" opacity="0.30" style="animation:crown-cw 2.8s linear infinite"/>
       <circle cx="35" cy="36" r="12" fill="none" stroke="${lv.rimColor}" stroke-width="0.7" opacity="0.44"/>
       <circle cx="35" cy="36" r="6"  fill="none" stroke="${lv.rimColor}" stroke-width="1"   opacity="0.65"/>
       <path d="M18,7 L22,1 L28,6 L35,-6 L42,6 L48,1 L52,7" stroke="${lv.rimColor}" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M31,-6 C30,-11 33,-15 35,-13 C37,-15 40,-11 39,-6" stroke="${lv.rimColor}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
       <circle cx="35" cy="-6" r="4.5" fill="${lv.rimColor}"/>
       <circle cx="22" cy="1" r="2.2" fill="${lv.rimColor}" opacity="0.95"/>
       <circle cx="48" cy="1" r="2.2" fill="${lv.rimColor}" opacity="0.95"/>`
    )
  }
  

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


// ── My Data Period Helper ──────────────────────────────────────
function getMyDataDateRange(period) {
  const now  = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  switch (period) {
    case 'today':     return { start: todayStart, end: null }
    case 'yesterday': return { start: new Date(todayStart.getTime() - 86400000), end: todayStart }
    case 'thisweek':  { const dow = now.getDay(); return { start: new Date(todayStart.getTime() - dow*86400000), end: null } }
    case 'lastweek':  { const dow = now.getDay(); const ws = new Date(todayStart.getTime() - dow*86400000); return { start: new Date(ws.getTime()-7*86400000), end: ws } }
    case 'thismonth': return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: null }
    default:          return { start: null, end: null }
  }
}

function inRange(dateStr, range) {
  const d = new Date(dateStr)
  if (range.start && d < range.start) return false
  if (range.end   && d >= range.end)  return false
  return true
}

function formatDec(n) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 }).format(Number(n)||0)
}

async function loadMyDataStats(period) {
  if (!userId.value) return
  myDataLoading.value = true
  try {
    const range = getMyDataDateRange(period)

    // Direct downline ids (level 1)
    const directIds = allDownline.value.filter(u => u.level === 1).map(u => u.descendant_id || u.id)
    const allIds    = allDownline.value.map(u => u.descendant_id || u.id)

    // ── Filter commission records by period ──
    const filteredComm = commissionRecords.value.filter(r => inRange(r.created_at, range))
    const directComm   = filteredComm.filter(r => r.level === 1)
    const indirectComm = filteredComm.filter(r => r.level > 1)
    const dCommSum     = directComm.reduce((s, r) => s + Number(r.commission_amount), 0)
    const iCommSum     = indirectComm.reduce((s, r) => s + Number(r.commission_amount), 0)
    const dTurnover    = directComm.reduce((s, r) => s + Number(r.bet_turnover), 0)
    const iTurnover    = indirectComm.reduce((s, r) => s + Number(r.bet_turnover), 0)

    // ── Load downline transactions for the period ──
    let dlTxRows = []
    if (directIds.length > 0) {
      let query = supabase
        .from('transactions')
        .select('user_id, type, amount, status, created_at')
        .in('user_id', directIds)
      if (range.start) query = query.gte('created_at', range.start.toISOString())
      if (range.end)   query = query.lt('created_at', range.end.toISOString())
      const { data } = await query.limit(500)
      dlTxRows = data || []
    }

    // ── New registrations (filter affiliate_tree rows by period) ──
    const newRegMembers = allDownline.value.filter(u => u.level === 1 && u.created_at && inRange(u.created_at, range))

    // ── Deposits ──
    const deposits    = dlTxRows.filter(t => t.type === 'deposit' && t.status === 'confirmed')
    const withdrawals = dlTxRows.filter(t => t.type === 'withdraw' && t.status === 'confirmed')
    const bonuses     = dlTxRows.filter(t => t.type === 'bonus')

    // First-deposit members: members whose first ever deposit was in this period
    // Approximate: members who appear in our deposit list but joined recently
    const depositingUserIds = [...new Set(deposits.map(t => t.user_id))]
    const firstDepositUserIds = newRegMembers.filter(u => depositingUserIds.includes(u.descendant_id || u.id))

    const depositSum     = deposits.reduce((s,t) => s + Number(t.amount), 0)
    const withdrawalSum  = withdrawals.reduce((s,t) => s + Number(t.amount), 0)
    const bonusSum       = bonuses.reduce((s,t) => s + Number(t.amount), 0)
    const bonusAccepted  = bonuses.filter(t => t.status === 'confirmed')

    myStats.value = {
      // Section 1
      directNewReg:          newRegMembers.length,
      depositingCount:       depositingUserIds.length,
      firstDepositCount:     firstDepositUserIds.length,
      activeFirstDeposit:    firstDepositUserIds.length,
      depositAmount:         depositSum,
      firstDepositAmount:    firstDepositUserIds.reduce((s,u) => {
        const d = deposits.filter(t => t.user_id === (u.descendant_id||u.id))
        return s + (d.length ? Number(d[0].amount) : 0)
      }, 0),
      activeRegistrations:   newRegMembers.length,
      withdrawalAmount:      withdrawalSum,
      withdrawalCount:       withdrawals.length,
      bonusRequests:         bonusSum,
      acceptedBonuses:       bonusAccepted.length,
      singleBetAmount:       dTurnover,
      totalTurnover:         dTurnover + iTurnover,
      directBetAmount:       dTurnover,
      directEffectiveTurnover: dTurnover,
      // Section 2
      directComm:            dCommSum,
      indirectComm:          iCommSum,
      totalComm:             dCommSum + iCommSum,
      pendingComm:           0,
      bonusComm:             0,
      // Section 3
      totalMembers:          allIds.length,
      directMembers:         directIds.length,
      indirectMembers:       allIds.length - directIds.length,
      allDirectTurnover:     dTurnover,
      allIndirectTurnover:   iTurnover,
      allTotalTurnover:      dTurnover + iTurnover,
      overrideTurnover:      iTurnover,
    }
  } catch (e) {
    console.error('[myDataStats]', e)
  } finally {
    myDataLoading.value = false
  }
}

async function switchMyDataPeriod(p) {
  myDataPeriod.value = p
  await loadMyDataStats(p)
}

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

    // 6b. Load agent banner from settings table (key = 'agent_banner_url')
    const { data: bannerSetting } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'agent_banner_url')
      .maybeSingle()
    if (bannerSetting?.value) agentBannerUrl.value = bannerSetting.value

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

  const NUM = 8
  const MAX_DIST = 80
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
      { event: 'INSERT', schema: 'public', table: 'affiliate_commissions', filter: `agent_id=eq.${myUserId}` },
      async (payload) => {
        const r = payload.new
        if (!r) return
        commissionRecords.value = [r, ...commissionRecords.value].slice(0, 50)
        totalCommission.value = commissionRecords.value.reduce((s,x) => s + Number(x.commission_amount), 0)
        totalTurnover.value   = commissionRecords.value.reduce((s,x) => s + Number(x.bet_turnover), 0)
        await loadMyDataStats(myDataPeriod.value)
      }
    )
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
  await loadMyDataStats('today')
  await nextTick()
  if (plexusRef.value) initPlexus(plexusRef.value)
  watch(plexusRef, (el) => { if (el) initPlexus(el) })
  if (userId.value) setupRealtimeDownline(userId.value)
  gsap.from('.fp-card', { opacity:0, y:18, duration:0.45, stagger:0.06, ease:'power2.out', delay:0.05 })
  setTimeout(initTicker, 400)
  if (activeTab.value === 1) animateReferralTab()

  // Neural Flow: start when modal opens, stop when it closes
  watch(showLevelModal, async (open) => {
    if (open) {
      await nextTick()
      await nextTick()
      startNeuralFlow()
    } else {
      stopNeuralFlow()
    }
  })
})

onUnmounted(() => {
  if (tickerTween) tickerTween.kill()
  if (plexusRaf) { cancelAnimationFrame(plexusRaf); plexusRaf = null }
  if (neuralRaf)  { cancelAnimationFrame(neuralRaf);  neuralRaf  = null }
  if (realtimeChannel) { supabase.removeChannel(realtimeChannel); realtimeChannel = null }
})
</script>
<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.agent-page { -webkit-tap-highlight-color: transparent; }

/* ── Glass Vibe: fp-card base ── */
.fp-card {
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  box-shadow: none;
}

/* ── Referral Tab — Invisible Interface ── */
.referral-tab {
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

.referral-hero-card {
  background: rgba(255,255,255,0.38);
  border: 1px solid rgba(26,43,26,0.12);
  box-shadow: 0 4px 20px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Floating Node Card */
.floating-node-card {
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  box-shadow: none;
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
  background: rgba(13,9,34,0.72);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(130,90,255,0.11);
  box-shadow:
    0 1px 0 0 rgba(100,80,255,0.09) inset,
    0 20px 50px rgba(0,0,0,0.38);
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
   ✦ EVOLUTION BADGE SYSTEM — tier silhouette changes ✦
   Bronze→Silver→Gold→Emerald→Sapphire→Ruby→Diamond→Legend→Mythic
   ══════════════════════════════════════════════════ */

/* ── Badge button base ──────────────────────────── */
.evo-badge-btn { background: none; border: none; padding: 0; cursor: pointer; }

/* ═══════════════════════════════════════════════════
   ✦ REACTOR ENERGY SYSTEM — always active from LV1  ✦
   Pulse waves · rotating rings · plasma glow · ripple
   ═══════════════════════════════════════════════════ */

/* Plasma pulse rings — concentric beat waves */
.reactor-pulse-1 {
  position: absolute;
  width: 78px; height: 78px;
  left: 6px; top: 6px;
  border-radius: 50%;
  border: 1.5px solid;
  animation: reactor-beat 3s ease-in-out infinite;
  pointer-events: none;
}
.reactor-pulse-2 {
  position: absolute;
  width: 94px; height: 94px;
  left: -2px; top: -2px;
  border-radius: 50%;
  border: 1px solid;
  animation: reactor-beat 1.8s ease-in-out infinite 0.45s;
  pointer-events: none;
}
.reactor-pulse-3 {
  position: absolute;
  width: 110px; height: 110px;
  left: -10px; top: -10px;
  border-radius: 50%;
  border: 1px solid;
  animation: reactor-beat 1.8s ease-in-out infinite 0.9s;
  pointer-events: none;
}
@keyframes reactor-beat {
  0%, 100% { transform: scale(1);    opacity: 0.9; }
  50%       { transform: scale(1.06); opacity: 0.4; }
}

/* Plasma glow core — radial bloom behind shield */
.reactor-core {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  animation: reactor-glow 2.2s ease-in-out infinite;
  pointer-events: none;
}
@keyframes reactor-glow {
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50%       { opacity: 0.85; transform: scale(1.1); }
}

/* Energy ripple — expanding outward burst rings */
.reactor-ripple-a {
  position: absolute;
  width: 90px; height: 90px;
  left: 0px; top: 0px;
  animation: reactor-ripple 2.6s linear infinite;
  pointer-events: none;
}
.reactor-ripple-b {
  position: absolute;
  width: 90px; height: 90px;
  left: 0px; top: 0px;
  animation: reactor-ripple 2.6s linear infinite 1.3s;
  pointer-events: none;
}
@keyframes reactor-ripple {
  0%   { transform: scale(0.85); opacity: 0.8; }
  100% { transform: scale(1.55); opacity: 0; }
}

/* Orbit rings — spin around the badge center */
.evo-orbit {
  position: absolute;
  border-style: solid;
  border-radius: 50%;
  pointer-events: none;
}
.evo-orbit-1 {
  width: 82px; height: 82px;
  left: 4px; top: 4px;
  border-width: 1.5px;
  border-style: dashed;
  animation: evo-cw 8s linear infinite;
}
.evo-orbit-2 {
  width: 102px; height: 102px;
  left: -6px; top: -6px;
  border-width: 1px;
  animation: evo-ccw 5.5s linear infinite;
}
.evo-orbit-3 {
  width: 122px; height: 122px;
  left: -16px; top: -16px;
  border-width: 1px;
  border-style: dashed;
  animation: evo-cw 8s linear infinite;
}
@keyframes evo-cw  { to { transform: rotate(360deg);  } }
@keyframes evo-ccw { to { transform: rotate(-360deg); } }

/* AG Button sweep animation */
.ag-btn-sweep {
  animation: ag-sweep 2.4s linear infinite;
}
@keyframes ag-sweep {
  0%   { background-position: -100% 0; transform: translateX(-100%); }
  100% { background-position: 200% 0; transform: translateX(200%); }
}

/* Floating particles — orbit the badge at varying radii + speeds */
.evo-particle {
  position: absolute;
  width: 4px; height: 4px;
  border-radius: 50%;
  left: calc(50% - 2px);
  top: calc(50% - 2px);
}
.evo-ep1  { animation: p30  3.2s linear infinite; }
.evo-ep2  { animation: p30  3.2s linear infinite; animation-delay:-1.6s; }
.evo-ep3  { animation: p40  4.8s linear infinite; animation-delay:-2.4s; }
.evo-ep4  { animation: p40  4.8s linear infinite; animation-delay:0s; }
.evo-ep5  { animation: p50  6.8s linear infinite; animation-delay:-3.4s; }
.evo-ep6  { animation: p50  6.8s linear infinite; animation-delay:0s; }
.evo-ep7  { animation: p36r 4.0s linear infinite; animation-delay:0s; }
.evo-ep8  { animation: p36r 4.0s linear infinite; animation-delay:-2.0s; }
.evo-ep9  { animation: p46r 5.8s linear infinite; animation-delay:-2.9s; }
.evo-ep10 { animation: p46r 5.8s linear infinite; animation-delay:0s; }
.evo-ep11 { animation: p28  2.6s linear infinite; animation-delay:-1.3s; }
.evo-ep12 { animation: p28  2.6s linear infinite; animation-delay:0s; }
.evo-ep13 { animation: p55  7.8s linear infinite; animation-delay:-3.9s; }
.evo-ep14 { animation: p55  7.8s linear infinite; animation-delay:0s; }
.evo-ep15 { animation: p38  3.7s linear infinite; animation-delay:-1.85s; }
.evo-ep16 { animation: p44r 5.2s linear infinite; animation-delay:-2.6s; }

@keyframes p28  { from{transform:rotate(0deg)   translateX(28px)rotate(0deg);}   to{transform:rotate(360deg)  translateX(28px)rotate(-360deg);} }
@keyframes p30  { from{transform:rotate(0deg)   translateX(30px)rotate(0deg);}   to{transform:rotate(360deg)  translateX(30px)rotate(-360deg);} }
@keyframes p36r { from{transform:rotate(0deg)   translateX(36px)rotate(0deg);}   to{transform:rotate(-360deg) translateX(36px)rotate(360deg);}  }
@keyframes p38  { from{transform:rotate(45deg)  translateX(38px)rotate(-45deg);}  to{transform:rotate(405deg)  translateX(38px)rotate(-405deg);} }
@keyframes p40  { from{transform:rotate(90deg)  translateX(40px)rotate(-90deg);}  to{transform:rotate(450deg)  translateX(40px)rotate(-450deg);} }
@keyframes p44r { from{transform:rotate(135deg) translateX(44px)rotate(-135deg);} to{transform:rotate(-225deg) translateX(44px)rotate(225deg);}  }
@keyframes p46r { from{transform:rotate(180deg) translateX(46px)rotate(-180deg);} to{transform:rotate(-180deg) translateX(46px)rotate(180deg);}  }
@keyframes p50  { from{transform:rotate(270deg) translateX(50px)rotate(-270deg);} to{transform:rotate(630deg)  translateX(50px)rotate(-630deg);} }
@keyframes p55  { from{transform:rotate(315deg) translateX(55px)rotate(-315deg);} to{transform:rotate(675deg)  translateX(55px)rotate(-675deg);} }

/* Hologram overlay — Diamond (LV13)+ */
.evo-hologram {
  border-radius: 14px;
  background: repeating-linear-gradient(
    0deg,
    transparent 0,
    transparent 3px,
    rgba(255,255,255,0.035) 3px,
    rgba(255,255,255,0.035) 4px
  );
  mix-blend-mode: overlay;
  animation: evo-holo 0.65s linear infinite;
  pointer-events: none;
}
@keyframes evo-holo {
  from { background-position: 0 0; }
  to   { background-position: 0 7px; }
}

/* Mythic cosmic aura — Mythic (LV15) only */
.evo-mythic-aura {
  position: absolute;
  inset: -24px;
  border-radius: 50%;
  animation: evo-mythic-pulse 2.0s ease-in-out infinite;
  pointer-events: none;
}
@keyframes evo-mythic-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.12); }
}

/* Tier glow filters — all tiers glow, intensity escalates */
.evo-bronze  { animation: evo-glow-pulse 3.5s ease-in-out infinite; }
.evo-silver  { animation: evo-glow-pulse 3.2s ease-in-out infinite; }
.evo-gold    { animation: evo-glow-pulse 2.8s ease-in-out infinite; }
.evo-emerald { animation: evo-glow-pulse 2.5s ease-in-out infinite; }
.evo-sapphire{ animation: evo-glow-pulse 2.2s ease-in-out infinite; }
.evo-ruby    { animation: evo-glow-pulse 2.0s ease-in-out infinite; }
.evo-diamond { animation: evo-glow-pulse-strong 1.8s ease-in-out infinite; }
.evo-legend  { animation: evo-fire-glow 1.6s ease-in-out infinite; }
.evo-mythic  { animation: evo-cosmic-glow 1.4s ease-in-out infinite; }

@keyframes evo-glow-pulse {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 8px currentColor); }
  50%       { filter: brightness(1.15) drop-shadow(0 0 16px currentColor); }
}
@keyframes evo-glow-pulse-strong {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 12px currentColor); }
  50%       { filter: brightness(1.2) drop-shadow(0 0 24px currentColor); }
}
@keyframes evo-fire-glow {
  0%, 100% { filter: drop-shadow(0 0 14px rgba(255,140,0,0.75)) brightness(1); }
  50%       { filter: drop-shadow(0 0 28px rgba(255,60,0,0.95))  brightness(1.22); }
}
@keyframes evo-cosmic-glow {
  0%, 100% { filter: drop-shadow(0 0 16px rgba(220,80,255,0.8))  brightness(1); }
  50%       { filter: drop-shadow(0 0 32px rgba(180,0,255,1.0))  brightness(1.25); }
}

/* ── Modal Sheet ────────────────────────────────── */
.lux-modal-sheet {
  box-shadow: 0 -8px 60px rgba(0,0,0,0.85), 0 -2px 20px rgba(255,180,0,0.06);
}

/* ── Modal Transitions ──────────────────────────── */
.level-modal-enter-active { transition: all 0.38s cubic-bezier(0.16,1,0.3,1); }
.level-modal-leave-active { transition: all 0.24s cubic-bezier(0.4,0,1,1); }
.level-modal-enter-from > div:last-child { transform: translateY(100%); }
.level-modal-leave-to   > div:last-child { transform: translateY(100%); }
.level-modal-enter-from { opacity: 0; }
.level-modal-leave-to   { opacity: 0; }

/* ── Progress bar shimmer ───────────────────────── */
.lux-progress-shimmer {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: lux-shimmer 1.8s linear infinite;
}
@keyframes lux-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

/* YOU badge pulse */
.lux-you-badge {
  animation: lux-you-pulse 1.6s ease-in-out infinite;
}
@keyframes lux-you-pulse {
  0%, 100% { opacity: 0.85; }
  50%       { opacity: 1; box-shadow: 0 0 10px rgba(255,215,0,0.45); }
}

/* ═══════════════════════════════════════════════════════════
   ✦ LEGENDARY CROWN SHIELD — all FX on badge, nothing outside ✦
   Crown Aura · Rotating Rings · Royal Sweep · Orbiting Gems
   ═══════════════════════════════════════════════════════════ */

/* Crown aura base — every tier pulses, intensity escalates */
.crown-aura { animation: crown-aura-pulse 2.2s ease-in-out infinite; will-change: transform, opacity; transform: translateZ(0); }
.crown-aura-bronze   { animation-duration: 3.6s; }
.crown-aura-silver   { animation-duration: 3.2s; }
.crown-aura-gold     { animation-duration: 2.8s; }
.crown-aura-emerald  { animation-duration: 2.4s; }
.crown-aura-sapphire { animation-duration: 2.1s; }
.crown-aura-ruby     { animation-duration: 1.8s; }
.crown-aura-diamond  { animation-duration: 1.5s; }
.crown-aura-legend   { animation-duration: 1.3s; }
.crown-aura-mythic   { animation-duration: 1.1s; }
@keyframes crown-aura-pulse {
  0%,100% { opacity: 0.55; transform: scale(1); }
  50%     { opacity: 1.0;  transform: scale(1.12); }
}

/* Outer rotating ring — Silver+ CW, speed scales per tier */
.crown-ring-outer { animation: crown-cw 5s linear infinite; will-change: transform; transform: translateZ(0); }
.crown-ring-silver   { animation-duration: 7s; }
.crown-ring-gold     { animation-duration: 5.5s; }
.crown-ring-emerald  { animation-duration: 4.5s; }
.crown-ring-sapphire { animation-duration: 3.8s; }
.crown-ring-ruby     { animation-duration: 3.2s; }
.crown-ring-diamond  { animation-duration: 2.6s; }
.crown-ring-legend   { animation-duration: 2.0s; }
.crown-ring-mythic   { animation-duration: 1.5s; }
@keyframes crown-cw  { to { transform: rotate(360deg);  } }
@keyframes crown-ccw { to { transform: rotate(-360deg); } }

/* Royal sweep shimmer across shield face */
.crown-royal-sweep { animation: crown-sweep 2.6s linear infinite; will-change: transform; transform: translateZ(0); }
@keyframes crown-sweep {
  0%   { transform: translateX(-120%); opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateX(220%);  opacity: 0; }
}

/* ── Orbiting gem particles (radius 20px from centre) ── */
/* Gem A — CW from top */
.crown-gem { will-change: transform; transform: translateZ(0); }

@keyframes crown-gem-a {
  from { transform: rotate(0deg)   translateX(20px) rotate(0deg);   }
  to   { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
}
/* Gem B — CCW from bottom */
@keyframes crown-gem-b {
  from { transform: rotate(180deg)  translateX(20px) rotate(-180deg);  }
  to   { transform: rotate(-180deg) translateX(20px) rotate(180deg);   }
}
/* Gem C — CW offset 120° */
@keyframes crown-gem-c {
  from { transform: rotate(120deg) translateX(20px) rotate(-120deg); }
  to   { transform: rotate(480deg) translateX(20px) rotate(-480deg); }
}
/* Gem D — CCW offset 60° (Ruby+) */
@keyframes crown-gem-d {
  from { transform: rotate(60deg)   translateX(22px) rotate(-60deg);  }
  to   { transform: rotate(-300deg) translateX(22px) rotate(300deg);  }
}

/* Prestige sparks — Diamond+ */
@keyframes crown-prestige-a {
  0%,100% { transform: translate(-14px,-14px) scale(0.5); opacity: 0; }
  40%,60% { transform: translate(-16px,-18px) scale(1.4); opacity: 1; }
}
@keyframes crown-prestige-b {
  0%,100% { transform: translate(14px,-12px) scale(0.5); opacity: 0; }
  40%,60% { transform: translate(17px,-15px) scale(1.4); opacity: 1; }
}

/* YOU halo — extra strong radial pulse */
@keyframes crown-you-halo {
  0%,100% { opacity: 0.5; transform: scale(1);    }
  50%     { opacity: 1.0; transform: scale(1.15);  }
}

/* ── AG label ON shield ─────────────────────────── */
.ag-on-shield {
  border-radius: 7px;
  padding: 2px 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  min-width: 32px;
  transition: box-shadow 0.3s;
}

/* ── Level rows ─────────────────────────────────── */
.lv-row { position: relative; contain: style paint; }
.lv-current {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,200,0,0.28);
  box-shadow: 0 2px 24px rgba(255,193,7,0.10), inset 0 1px 0 rgba(255,255,255,0.10);
}
.lv-past   { background: rgba(255,255,255,0.025); }
.lv-future { opacity: 1; }

/* ═══════════════════════════════════════════════════════
   ✦ TIER-PROGRESSIVE ROW ANIMATIONS                     ✦
   Bronze (subtle) → Mythic (full cosmic) escalating FX  ✦
   ═══════════════════════════════════════════════════════ */

/* BRONZE (LV1-3): Warm slow pulse on row bg */
.lv-tier-bronze { animation: lv-bronze-pulse 3.5s ease-in-out infinite; }
@keyframes lv-bronze-pulse {
  0%,100% { background-color: rgba(205,127,50,0.03); }
  50%     { background-color: rgba(205,127,50,0.07); }
}

/* SILVER (LV4-6): Metallic cool shimmer */
.lv-tier-silver { animation: lv-silver-pulse 3.0s ease-in-out infinite; }
@keyframes lv-silver-pulse {
  0%,100% { background-color: rgba(192,192,192,0.03); }
  50%     { background-color: rgba(192,192,192,0.08); }
}

/* GOLD (LV7-9): Golden glow with animated left bar */
.lv-tier-gold { animation: lv-gold-glow 2.5s ease-in-out infinite; }
@keyframes lv-gold-glow {
  0%,100% { background-color: rgba(255,215,0,0.04); box-shadow: none; }
  50%     { background-color: rgba(255,215,0,0.09); box-shadow: 0 0 12px rgba(255,215,0,0.08) inset; }
}

/* EMERALD (LV10-12): Green sparkle bg pulse */
.lv-tier-emerald { animation: lv-emerald-glow 2.2s ease-in-out infinite; }
@keyframes lv-emerald-glow {
  0%,100% { background-color: rgba(0,200,100,0.04); }
  50%     { background-color: rgba(0,220,120,0.10); box-shadow: 0 0 16px rgba(0,200,100,0.10) inset; }
}

/* SAPPHIRE (LV13-15): Blue wave + spinning border */
.lv-tier-sapphire { animation: lv-sapphire-glow 2.0s ease-in-out infinite; }
@keyframes lv-sapphire-glow {
  0%,100% { background-color: rgba(30,100,255,0.04); }
  50%     { background-color: rgba(60,130,255,0.10); box-shadow: 0 0 18px rgba(30,100,255,0.12) inset; }
}

/* RUBY (LV16-18): Red fire pulse */
.lv-tier-ruby { animation: lv-ruby-fire 1.8s ease-in-out infinite; }
@keyframes lv-ruby-fire {
  0%,100% { background-color: rgba(220,30,60,0.05); }
  33%     { background-color: rgba(255,60,0,0.10); }
  66%     { background-color: rgba(220,0,80,0.08); }
}

/* DIAMOND (LV19-21): Prismatic sheen + strong pulse */
.lv-tier-diamond { animation: lv-diamond-pulse 1.6s ease-in-out infinite; }
@keyframes lv-diamond-pulse {
  0%,100% { background-color: rgba(120,210,255,0.05); box-shadow: 0 0 0 rgba(180,230,255,0); }
  50%     { background-color: rgba(180,230,255,0.12); box-shadow: 0 0 22px rgba(120,210,255,0.14) inset; }
}

/* LEGEND (LV22-24): Fire + aura + orange-purple gradient bg */
.lv-tier-legend { animation: lv-legend-aura 1.4s ease-in-out infinite; }
@keyframes lv-legend-aura {
  0%    { background-color: rgba(255,100,0,0.06); }
  33%   { background-color: rgba(200,0,255,0.07); }
  66%   { background-color: rgba(255,60,0,0.08); }
  100%  { background-color: rgba(255,100,0,0.06); }
}

/* MYTHIC (LV25): Full cosmic pulse, rainbow aura */
.lv-tier-mythic { animation: lv-mythic-cosmic 1.2s ease-in-out infinite; }
@keyframes lv-mythic-cosmic {
  0%   { background-color: rgba(180,0,255,0.08); box-shadow: 0 0 30px rgba(220,80,255,0.12) inset; }
  25%  { background-color: rgba(255,0,100,0.07); }
  50%  { background-color: rgba(80,0,255,0.09);  box-shadow: 0 0 40px rgba(180,0,255,0.18) inset; }
  75%  { background-color: rgba(0,200,255,0.06); }
  100% { background-color: rgba(180,0,255,0.08); box-shadow: 0 0 30px rgba(220,80,255,0.12) inset; }
}

/* Left bar pulse animation */
.lv-row-leftbar { animation: lv-leftbar-pulse 2s ease-in-out infinite; }
@keyframes lv-leftbar-pulse {
  0%,100% { opacity: 0.7; }
  50%     { opacity: 1; }
}

/* Row sweep shimmer: Gold+ */
.lv-row-sweep { animation: lv-row-sweep-anim 3.5s linear infinite; }
@keyframes lv-row-sweep-anim {
  0%   { transform: translateX(-100%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

/* Rotating conic border: Sapphire+ */
.lv-row-spin-border { animation: lv-spin-border 4s linear infinite; opacity: 0.18; }
@keyframes lv-spin-border {
  from { --angle: 0deg; transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Fire flicker: Ruby+ */
.lv-row-fire { animation: lv-fire-flicker 0.8s ease-in-out infinite alternate; }
@keyframes lv-fire-flicker {
  0%   { opacity: 0.4; }
  100% { opacity: 0.9; }
}

/* Prismatic scroll: Diamond+ */
@keyframes lv-prism-scroll {
  0%   { background-position: 0% 0; }
  100% { background-position: 400% 0; }
}

/* Cosmic center line: Legend+ */
@keyframes lv-cosmic-pulse {
  0%,100% { opacity: 0.2; transform: translateY(-50%) scaleX(0.6); }
  50%     { opacity: 0.7; transform: translateY(-50%) scaleX(1); }
}

/* Mythic full aura */
@keyframes lv-mythic-aura {
  0%,100% { opacity: 0.4; transform: scale(1); }
  50%     { opacity: 0.85; transform: scale(1.03); }
}

/* Floating spark dots: Emerald+ */
@keyframes lv-spark-float {
  0%,100% { opacity: 0; transform: translateY(0) scale(0.8); }
  30%     { opacity: 1; transform: translateY(-4px) scale(1.2); }
  70%     { opacity: 0.7; transform: translateY(-2px) scale(1); }
}

/* LV number glow shimmer: Gold+ */
.lv-num-glow { animation: lv-num-shimmer 2.5s ease-in-out infinite; }
@keyframes lv-num-shimmer {
  0%,100% { text-shadow: 0 0 6px currentColor; }
  50%     { text-shadow: 0 0 14px currentColor, 0 0 28px currentColor; }
}

/* Rate % pulse on current level */
.lv-rate-current { animation: lv-rate-pulse 1.8s ease-in-out infinite; }
@keyframes lv-rate-pulse {
  0%,100% { filter: brightness(1); }
  50%     { filter: brightness(1.25) drop-shadow(0 0 8px currentColor); }
}

/* AG button tier-specific animations */
.ag-btn-tier-gold     { animation: ag-btn-pulse 2.5s ease-in-out infinite; }
.ag-btn-tier-emerald  { animation: ag-btn-pulse 2.2s ease-in-out infinite; }
.ag-btn-tier-sapphire { animation: ag-btn-pulse 2.0s ease-in-out infinite; }
.ag-btn-tier-ruby     { animation: ag-btn-pulse 1.8s ease-in-out infinite; }
.ag-btn-tier-diamond  { animation: ag-btn-strong-pulse 1.6s ease-in-out infinite; }
.ag-btn-tier-legend   { animation: ag-btn-fire-pulse  1.4s ease-in-out infinite; }
.ag-btn-tier-mythic   { animation: ag-btn-cosmic-pulse 1.2s ease-in-out infinite; }
@keyframes ag-btn-pulse {
  0%,100% { box-shadow: 0 0 8px currentColor; }
  50%     { box-shadow: 0 0 18px currentColor, 0 0 30px currentColor; }
}
@keyframes ag-btn-strong-pulse {
  0%,100% { box-shadow: 0 0 12px currentColor; filter: brightness(1); }
  50%     { box-shadow: 0 0 24px currentColor, 0 0 40px currentColor; filter: brightness(1.2); }
}
@keyframes ag-btn-fire-pulse {
  0%,100% { box-shadow: 0 0 14px rgba(255,140,0,0.8); }
  50%     { box-shadow: 0 0 28px rgba(255,60,0,1), 0 0 48px rgba(255,140,0,0.6); }
}
@keyframes ag-btn-cosmic-pulse {
  0%   { box-shadow: 0 0 16px rgba(220,80,255,0.9); }
  33%  { box-shadow: 0 0 30px rgba(180,0,255,1), 0 0 50px rgba(220,80,255,0.7); }
  66%  { box-shadow: 0 0 20px rgba(100,0,255,0.9); }
  100% { box-shadow: 0 0 16px rgba(220,80,255,0.9); }
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


/* ══════════════════════════════════════════════
   ✦ NOVA FLOATING QR + NEURAL LINK SYSTEM ✦
   Soft blue ambient · floating QR · identity node
   ══════════════════════════════════════════════ */

/* Floating QR drift */
@keyframes nova-qr-float-anim {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-5px); }
}
.nova-qr-float {
  animation: nova-qr-float-anim 3.8s ease-in-out infinite;
}

/* QR pulse rings */
@keyframes nova-ring-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.04); }
}
.nova-qr-ring-1 { animation: nova-ring-pulse 2.4s ease-in-out infinite; }
.nova-qr-ring-2 { animation: nova-ring-pulse 3.0s ease-in-out infinite 0.5s; }
.nova-qr-ring-3 { animation: nova-ring-pulse 3.8s ease-in-out infinite 1.0s; }

/* QR scan line */
@keyframes nova-scan-anim {
  0%   { top: -2px;  opacity: 0; }
  8%   { opacity: 1; }
  92%  { opacity: 0.5; }
  100% { top: 100%;  opacity: 0; }
}
.nova-qr-scan { animation: nova-scan-anim 2.6s linear infinite; }

/* Corner accent blink */
@keyframes nova-corner-blink {
  0%, 100% { opacity: 0.55; }
  50%       { opacity: 1; box-shadow: 0 0 12px rgba(80,180,255,1); }
}
.nova-corner-dot { animation: nova-corner-blink 2s ease-in-out infinite; }

/* Live dot pulse */
@keyframes nova-live-dot-anim {
  0%, 100% { opacity: 0.6; transform: scale(1); box-shadow: 0 0 5px rgba(70,160,255,0.6); }
  50%       { opacity: 1;   transform: scale(1.25); box-shadow: 0 0 10px rgba(70,160,255,1); }
}
.nova-live-dot { animation: nova-live-dot-anim 2s ease-in-out infinite; }

/* Pulse dot (LIVE badge) */
@keyframes nova-pulse-dot-anim {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.4); box-shadow: 0 0 6px rgba(80,220,180,0.8); }
}
.nova-pulse-dot { animation: nova-pulse-dot-anim 1.6s ease-in-out infinite; }

/* Link node shimmer sweep */
@keyframes nova-sweep-anim {
  0%   { transform: translateX(-100%); opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 0.8; }
  100% { transform: translateX(260%); opacity: 0; }
}
.nova-link-sweep { animation: nova-sweep-anim 3.2s ease-in-out infinite; }

/* Social button hover lift */
.nova-social-btn:active { transform: scale(0.9); }

</style>
