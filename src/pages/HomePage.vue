<template>
    <div class="nova-app">

      <!-- ══ HEADER ══ -->
      <header class="nova-header">
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="nova-logo">N</div>
          <div class="nova-brand-wrap">
            <div class="nova-welcome">WELCOME TO</div>
            <div class="nova-brand" data-text="NovaBETT">NovaBETT</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button @click="toggleLanguage" class="glass-btn-sm" style="color:rgba(34,197,94,0.9);font-size:11px;font-weight:700;padding:5px 10px;">{{ currentLang === 'en' ? '🇲🇲 မြန်မာ' : '🇬🇧 EN' }}</button>
          <button @click="searchVisible = !searchVisible" class="glass-btn-icon">
            <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>
      </header>

      <!-- Search -->
      <div v-if="searchVisible" class="nova-search-bar">
        <input v-model="searchQuery" type="text" placeholder="ဂိမ်းရှာပါ..." class="nova-input" style="padding-left:36px;" />
        <svg style="position:absolute;left:26px;top:50%;transform:translateY(-50%);" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </div>

      <!-- ══ BANNER ══ -->
      <div style="position:relative;overflow:hidden;aspect-ratio:2.2/1;background:#0d0d0d;">
        <div style="display:flex;transition:transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94);will-change:transform;"
          :style="{ transform: 'translateX(-' + (bannerIdx*100) + '%)' }"
          @touchstart="onBannerTouchStart" @touchmove.prevent="onBannerTouchMove" @touchend="onBannerTouchEnd">
          <div v-for="(img,i) in bannerImages" :key="i" style="min-width:100%;aspect-ratio:2.2/1;position:relative;">
            <img :src="img" style="width:100%;height:100%;object-fit:cover;display:block;" alt="" loading="lazy"/>
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.5) 0%,transparent 55%);"></div>
          </div>
        </div>
        <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:5px;z-index:2;">
          <div v-for="(_,i) in bannerImages" :key="i" @click="bannerIdx=i"
            :style="i===bannerIdx?'width:20px;height:4px;background:#22c55e;border-radius:2px;':'width:4px;height:4px;background:rgba(255,255,255,0.28);border-radius:50%;'"
            style="transition:all 0.3s;cursor:pointer;"></div>
        </div>
      </div>

      <!-- ══ MARQUEE ══ -->
      <div style="display:flex;align-items:center;background:#111;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);padding:7px 12px;gap:8px;overflow:hidden;">
        <svg width="15" height="15" fill="rgba(34,197,94,0.85)" viewBox="0 0 24 24" style="flex-shrink:0;"><path d="M18 9v-3a6 6 0 10-12 0v3l-2 2v1h16v-1l-2-2zm-6 13a3 3 0 003-3H9a3 3 0 003 3z"/></svg>
        <div style="flex:1;overflow:hidden;"><span class="nova-marquee">NovaBETT မှ ကြိုဆိုပါသည်&nbsp;&nbsp;&nbsp;ငွေသွင်းငွေထုတ် 24/7&nbsp;&nbsp;&nbsp;JILI, PP, PG ဂိမ်းများ&nbsp;&nbsp;&nbsp;VIP အဖွဲ့ဝင်များ အထူးဆုများ&nbsp;&nbsp;&nbsp;Customer Support 24/7&nbsp;&nbsp;&nbsp;</span></div>
        <div style="position:relative;flex-shrink:0;">
          <svg width="17" height="17" fill="rgba(255,255,255,0.32)" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span style="position:absolute;top:-5px;right:-6px;background:#ef4444;color:#fff;font-size:8px;font-weight:900;border-radius:10px;padding:1px 4px;line-height:14px;">99+</span>
        </div>
      </div>

      <!-- ══ ACTION ROW ══ -->
      <div v-if="!isLoggedIn" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div style="display:flex;align-items:center;gap:7px;flex-shrink:0;">
          <button @click="openAuth('login')" class="glass-btn-auth">လောဂ်အင်</button>
          <button @click="openAuth('register')" class="glass-btn-auth glass-btn-auth--primary">မှတ်ပုံတင်</button>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <!-- Deposit icon — green frame -->
          <div @click="goUrl(depositUrl)" class="nova-quick-icon nova-quick-icon--framed">
            <div class="nova-quick-frame">
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="13" rx="2.5" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.7)" stroke-width="1.4"/>
                <path d="M2 10h20" stroke="rgba(34,197,94,0.7)" stroke-width="1.4"/>
                <path d="M6 14h4" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round"/>
                <!-- animated coin drop -->
                <circle cx="18" cy="4" r="2.2" fill="rgba(34,197,94,0.9)">
                  <animate attributeName="cy" values="2;6;6;2" dur="1.6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;1;0;1" dur="1.6s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <span>ငွေသွင်းရန်</span>
          </div>
          <!-- Withdraw icon — green frame -->
          <div @click="goUrl(withdrawUrl)" class="nova-quick-icon nova-quick-icon--framed">
            <div class="nova-quick-frame">
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="13" rx="2.5" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.6)" stroke-width="1.4"/>
                <path d="M2 10h20" stroke="rgba(34,197,94,0.6)" stroke-width="1.4"/>
                <!-- animated up arrow -->
                <path d="M12 19v-6" stroke="rgba(34,197,94,0.85)" stroke-width="1.6" stroke-linecap="round">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
                </path>
                <path d="M9.5 15.5l2.5-2.5 2.5 2.5" stroke="rgba(34,197,94,0.85)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
            <span>ငွေထုတ်ရန်</span>
          </div>
          <!-- VIP — AI Bot Head Logo -->
          <div class="nova-quick-icon" @click="goUrl(vipUrl)">
            <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <!-- antenna -->
              <line x1="16" y1="2" x2="16" y2="7" stroke="rgba(34,197,94,0.8)" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="16" cy="2" r="1.5" fill="rgba(34,197,94,0.9)">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite"/>
              </circle>
              <!-- ear left -->
              <rect x="3" y="12" width="3.5" height="6" rx="1.5" fill="rgba(34,197,94,0.5)" stroke="rgba(34,197,94,0.7)" stroke-width="0.8"/>
              <!-- ear right -->
              <rect x="25.5" y="12" width="3.5" height="6" rx="1.5" fill="rgba(34,197,94,0.5)" stroke="rgba(34,197,94,0.7)" stroke-width="0.8"/>
              <!-- head body -->
              <rect x="6.5" y="7" width="19" height="18" rx="4" fill="rgba(15,30,20,0.95)" stroke="rgba(34,197,94,0.75)" stroke-width="1.2"/>
              <!-- visor / face plate -->
              <rect x="8.5" y="9.5" width="15" height="9" rx="2.5" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.35)" stroke-width="0.7"/>
              <!-- left eye -->
              <rect x="10" y="11.5" width="5" height="5" rx="1.5" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.8)" stroke-width="0.8"/>
              <rect x="11.2" y="12.7" width="2.6" height="2.6" rx="0.8" fill="rgba(34,197,94,0.95)">
                <animate attributeName="fill-opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
              </rect>
              <!-- right eye -->
              <rect x="17" y="11.5" width="5" height="5" rx="1.5" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.8)" stroke-width="0.8"/>
              <rect x="18.2" y="12.7" width="2.6" height="2.6" rx="0.8" fill="rgba(34,197,94,0.95)">
                <animate attributeName="fill-opacity" values="1;0.5;1" dur="1.5s" begin="0.4s" repeatCount="indefinite"/>
              </rect>
              <!-- scan line across visor -->
              <line x1="8.5" y1="14" x2="23.5" y2="14" stroke="rgba(34,197,94,0.5)" stroke-width="0.6">
                <animate attributeName="y1" values="10;18;10" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="y2" values="10;18;10" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
              </line>
              <!-- mouth / data bar -->
              <rect x="11" y="21" width="10" height="2" rx="1" fill="rgba(34,197,94,0.25)"/>
              <rect x="13" y="21" width="3" height="2" rx="1" fill="rgba(34,197,94,0.8)">
                <animate attributeName="width" values="3;7;3" dur="1.8s" repeatCount="indefinite"/>
              </rect>
            </svg>
            <span style="color:rgba(34,197,94,0.9);">VIP</span>
          </div>
          <!-- Install — Single animated download arrow -->
          <div class="nova-quick-icon" @click="goUrl(installUrl)">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <!-- shaft -->
              <line x1="12" y1="3" x2="12" y2="15" stroke="rgba(34,197,94,0.85)" stroke-width="2" stroke-linecap="round">
                <animate attributeName="opacity" values="1;0.35;1" dur="1.1s" repeatCount="indefinite"/>
              </line>
              <!-- arrowhead -->
              <path d="M7.5 11l4.5 5 4.5-5" fill="none" stroke="rgba(34,197,94,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <animate attributeName="transform" attributeType="XML" type="translate" values="0,0;0,2;0,0" dur="1.1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.4;1" dur="1.1s" repeatCount="indefinite"/>
              </path>
              <!-- ground bar -->
              <line x1="6" y1="20" x2="18" y2="20" stroke="rgba(34,197,94,0.6)" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            <span>တပ်ဆင်မည်</span>
          </div>
        </div>
      </div>
      <div v-if="isLoggedIn" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:10px;">
          <NftAvatar :username="username" :size="38" />
          <div>
            <div style="font-size:11px;font-weight:700;color:#4ade80;margin-bottom:3px;letter-spacing:0.04em;text-shadow:0 0 8px rgba(74,222,128,0.6);">{{ username }}</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="font-size:17px;font-weight:900;color:#4ade80;">{{ formatCurrency(mainBalance) }} <span style="font-size:10px;color:rgba(255,255,255,0.3);">MMK</span></div>
              <button @click="refreshBalance" :class="['refresh-toggle', { 'refresh-toggle--spin': balanceRefreshing }]">
                <svg class="refresh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button @click="showDepositModal=true" class="glass-btn-auth glass-btn-auth--primary nova-cash-btn">
            <span class="nova-cash-particles">
              <span class="nova-coin c1">💰</span>
              <span class="nova-coin c2">💵</span>
              <span class="nova-coin c3">🪙</span>
            </span>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style="flex-shrink:0;"><rect x="2" y="6" width="20" height="13" rx="2" fill="rgba(255,255,255,0.3)"/><path d="M2 10h20" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/><circle cx="18" cy="15" r="2" fill="rgba(255,255,255,0.85)"/></svg>
            ငွေသွင်း
          </button>
          <button @click="showWithdrawModal=true" class="glass-btn-auth nova-withdraw-btn">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style="flex-shrink:0;"><path d="M12 17V7" stroke="rgba(34,197,94,0.9)" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite"/></path><path d="M8 11l4-4 4 4" stroke="rgba(34,197,94,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite"/></path><rect x="4" y="18" width="16" height="2" rx="1" fill="rgba(34,197,94,0.5)"/></svg>
            ငွေထုတ်
          </button>
        </div>
      </div>

      <!-- ══ QUICK SHORTCUT ROW ══ -->
      <div v-if="isLoggedIn" class="qrow">
        <!-- KPay -->
        <div class="qbtn qbtn--pay" @click="showDepositModal=true">
          <div class="qbtn-frame"><div class="qbtn-img-blank"></div></div>
          <span class="qbtn-lbl">KPay</span>
        </div>
        <!-- Wave -->
        <div class="qbtn qbtn--pay" @click="showDepositModal=true">
          <div class="qbtn-frame"><div class="qbtn-img-blank"></div></div>
          <span class="qbtn-lbl">Wave</span>
        </div>
        <!-- UABPay -->
        <div class="qbtn qbtn--pay" @click="showDepositModal=true">
          <div class="qbtn-frame"><div class="qbtn-img-blank"></div></div>
          <span class="qbtn-lbl">UAB</span>
        </div>
        <!-- VIP -->
        <div class="qbtn qbtn--vip" @click="$router.push(`/vip`)">
          <div class="qbtn-icon-wrap qbtn-icon-wrap--vip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 17h20l-2-9-5 5-3-7-3 7-5-5-2 9z" fill="url(#vipGrad)" stroke="#f59e0b" stroke-width="0.5"/><defs><linearGradient id="vipGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/></linearGradient></defs><circle cx="12" cy="8" r="1.5" fill="#fef3c7"/><circle cx="2.5" cy="8.5" r="1" fill="#fef3c7"/><circle cx="21.5" cy="8.5" r="1" fill="#fef3c7"/></svg>
          </div>
          <span class="qbtn-lbl qbtn-lbl--vip">VIP</span>
        </div>
        <!-- Bot -->
        <div class="qbtn qbtn--bot" @click="">
          <div class="qbtn-icon-wrap qbtn-icon-wrap--bot">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="16" height="12" rx="3" fill="#0f2a1a" stroke="#4ade80" stroke-width="1.2"/><rect x="7" y="4" width="10" height="5" rx="2" fill="#0f2a1a" stroke="#4ade80" stroke-width="1"/><line x1="12" y1="4" x2="12" y2="2" stroke="#4ade80" stroke-width="1.2" stroke-linecap="round"/><circle cx="12" cy="2" r="1" fill="#4ade80"/><circle cx="9" cy="13" r="1.8" fill="#4ade80" opacity="0.9"/><circle cx="15" cy="13" r="1.8" fill="#4ade80" opacity="0.9"/><rect x="8" y="17" width="8" height="1.5" rx="0.75" fill="#4ade80" opacity="0.6"/><line x1="2" y1="13" x2="4" y2="13" stroke="#4ade80" stroke-width="1.2" stroke-linecap="round"/><line x1="20" y1="13" x2="22" y2="13" stroke="#4ade80" stroke-width="1.2" stroke-linecap="round"/></svg>
          </div>
          <span class="qbtn-lbl qbtn-lbl--bot">Bot</span>
        </div>
        <!-- Download -->
        <div class="qbtn qbtn--dl" @click="">
          <div class="qbtn-icon-wrap qbtn-icon-wrap--dl">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="4" fill="#061828" stroke="#22d3ee" stroke-width="1.2"/><path d="M12 7v7" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round"/><path d="M8.5 11l3.5 4 3.5-4" stroke="#22d3ee" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><line x1="7" y1="18" x2="17" y2="18" stroke="#22d3ee" stroke-width="1.4" stroke-linecap="round"/></svg>
          </div>
          <span class="qbtn-lbl qbtn-lbl--dl">ဒေါင်း</span>
        </div>
      </div>
      <!-- ══ SIDEBAR + GAME GRID ══ -->
      <div style="display:flex;position:relative;">

        <!-- LEFT SIDEBAR -->
        <div class="nova-sidebar">
          <button v-for="cat in categories" :key="cat.id" @click="activeCategory=cat.id"
            :class="['nova-cat-btn', activeCategory===cat.id ? 'nova-cat-btn--active' : '']">
            <canvas v-if="activeCategory===cat.id" class="nova-cat-glow" :ref="el=>registerGlowCanvas(el,cat.id)" width="72" height="74"></canvas>
            <div class="nova-cat-icon-wrap" :class="cat.brandBg ? 'nova-cat-icon-wrap--brand' : ''">
              <!-- Brand provider logo (JILI, PP, PG, JDB) -->
              <svg v-if="cat.brandSvg" class="nova-cat-svg nova-cat-svg--brand" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" v-html="cat.brandSvg"></svg>
              <!-- Generic icon -->
              <svg v-else class="nova-cat-svg" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient :id="'rg-'+cat.id" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" :stop-color="activeCategory===cat.id?'rgba(120,255,160,0.9)':'rgba(200,210,220,0.5)'"/>
                    <stop offset="100%" :stop-color="activeCategory===cat.id?'rgba(34,197,94,0.3)':'rgba(80,100,120,0.15)'"/>
                  </radialGradient>
                  <filter :id="'gf-'+cat.id"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <circle cx="14" cy="14" r="13" :fill="'url(#rg-'+cat.id+')'"/>
                <g :filter="'url(#gf-'+cat.id+')'">
                  <path :d="cat.svgPath" :fill="activeCategory===cat.id?'#4ade80':'rgba(180,195,210,0.75)'"/>
                </g>
              </svg>
            </div>
            <span class="nova-cat-label">{{ cat.name }}</span>
            <div v-if="activeCategory===cat.id" class="nova-cat-active-bar"></div>
          </button>
        </div>

        <!-- RIGHT GAME GRID -->
        <div style="flex:1;min-width:0;padding:8px 8px 8px 4px;">
          <div v-if="loadingGames" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
            <div v-for="n in 9" :key="n" style="border-radius:12px;aspect-ratio:3/4;background:rgba(255,255,255,0.04);animation:nova-pulse 1.5s ease-in-out infinite;"></div>
          </div>
          <div v-else-if="fetchError" style="text-align:center;padding:30px 0;">
            <p style="color:rgba(255,100,100,0.8);font-size:12px;margin-bottom:10px;">{{ fetchError }}</p>
            <button @click="fetchGames" class="glass-btn-sm" style="color:#4ade80;padding:6px 14px;">Retry</button>
          </div>
          <div v-else-if="filteredGames.length===0" style="text-align:center;padding:30px 0;">
            <p style="color:rgba(255,255,255,0.22);font-size:12px;">ဂိမ်းမတွေ့ပါ</p>
          </div>
          <div v-else style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
            <div v-for="(game,idx) in filteredGames" :key="game.id"
              class="nova-game-card" @click="openGame(game)"
              @touchstart="e=>e.currentTarget.style.transform='scale(0.93)'"
              @touchend="e=>e.currentTarget.style.transform='scale(1)'">
              <div style="position:relative;aspect-ratio:3/4;overflow:hidden;">
                <img :src="game.image_url" style="width:100%;height:100%;object-fit:cover;display:block;" :alt="game.name" loading="lazy"/>
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.9) 0%,rgba(10,10,10,0.05) 45%,transparent 100%);"></div>
                <div v-if="idx%5<2" class="nova-badge nova-badge--hot">HOT</div>
                <div class="nova-badge nova-badge--provider">{{ game.provider }}</div>
                <div style="position:absolute;bottom:0;left:0;right:0;padding:5px;"><div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ game.name }}</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ FOOTER ══ -->
      <div style="padding:0 16px;border-top:1px solid rgba(255,255,255,0.07);margin-top:16px;">
        <div style="padding:20px 0 14px;text-align:center;">
          <p style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:14px;font-weight:600;">ဆက်သွယ်မှုကို ဆက်သွယ်ရန်</p>
          <div style="display:flex;justify-content:center;gap:14px;">
            <div class="nova-contact-icon" style="background:rgba(114,0,212,0.1);border-color:rgba(114,0,212,0.2);">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none"><path d="M20 8C13.4 8 8 13.4 8 20c0 2.7.9 5.2 2.4 7.2L8.3 32l5-2.1C15 31.2 17.4 32 20 32c6.6 0 12-5.4 12-12S26.6 8 20 8zm5.9 16.4c-.3.8-1.5 1.5-2.1 1.5-.6.1-1.1.3-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.2-.2-1.5-2-1.5-3.8s1-2.6 1.3-3c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.5.3.6 1 2.3 1.1 2.5.1.2.2.4.1.7-.1.2-.2.4-.4.6l-.5.6c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.3 1.1 2.5 1.5 2.8 1.6.3.1.6.1.8-.1l.5-.6c.3-.3.5-.2.8-.1l2.3 1.1c.3.1.5.2.5.5.1.5-.1 1.4-.4 2.2z" fill="rgba(130,80,230,0.9)"/></svg>
              <span>Viber</span>
            </div>
            <div class="nova-contact-icon" style="background:rgba(41,182,246,0.08);border-color:rgba(41,182,246,0.2);">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none"><path d="M28.3 12.5l-3.3 16.1c-.2 1.1-1 1.3-1.8.8l-5-3.8-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.5-8.6c.4-.4-.1-.6-.6-.2L10.3 21.5l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6l22.3-8.6c.9-.3 1.7.2 1.4 1.7z" fill="rgba(41,182,246,0.9)"/></svg>
              <span>Telegram</span>
            </div>
            <div class="nova-contact-icon" style="background:rgba(24,119,242,0.08);border-color:rgba(24,119,242,0.2);">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none"><path d="M22.7 21h-2.7v9H17v-9h-2v-3h2v-1.9c0-1.6.8-4.1 4.1-4.1H24v3h-2.1c-.4 0-.8.1-.8.8V18H24l-.4 3h-.9z" fill="rgba(24,119,242,0.9)"/></svg>
              <span>Facebook</span>
            </div>
          </div>
        </div>
        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 -16px;"></div>
        <div style="padding:18px 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.55);margin-bottom:10px;">ကာစိန်</p>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <span class="nova-footer-link">မြန်အမ်းငွေ</span><span class="nova-footer-link">ဆုလာဘ်</span><span class="nova-footer-link">VIP</span><span class="nova-footer-link">အေးချင့်</span><span class="nova-footer-link">လုပ်ငန်းမူ</span>
            </div>
          </div>
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.55);margin-bottom:10px;">ဂိမ်း</p>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <span class="nova-footer-link">နာမည်ကြီး</span><span class="nova-footer-link">စလော့</span><span class="nova-footer-link">ကဒ်ဂိမ်းများ</span><span class="nova-footer-link">ငါးမျှားရ</span><span class="nova-footer-link">Live Casino</span><span class="nova-footer-link">အားကစား</span>
            </div>
          </div>
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.55);margin-bottom:10px;">အကူအညီ</p>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <span class="nova-footer-link">အကောင့်အကူ</span><span class="nova-footer-link">ဆောင်းတ</span><span class="nova-footer-link">ကြေငြာချက်</span>
            </div>
          </div>
        </div>
        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 -16px;"></div>
        <div style="padding:18px 0;display:flex;justify-content:center;gap:14px;">
          <div class="nova-social-icon" style="background:rgba(41,182,246,0.1);border-color:rgba(41,182,246,0.2);"><svg width="30" height="30" viewBox="0 0 40 40" fill="none"><path d="M32 10.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.6.8-2.5 1A4.2 4.2 0 0020.4 15c0 .3 0 .6.1.9C15.2 15.7 11 12.8 8.1 8.7c-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.5-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.3 4.3 0 01-1.9.1c.5 1.7 2.1 2.9 3.9 3A8.4 8.4 0 018 22.8c1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.2z" fill="rgba(41,182,246,0.9)"/></svg></div>
          <div class="nova-social-icon" style="background:rgba(131,58,180,0.1);border-color:rgba(131,58,180,0.25);"><svg width="30" height="30" viewBox="0 0 40 40" fill="none"><rect x="10" y="10" width="20" height="20" rx="6" stroke="url(#igs2)" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="5" stroke="url(#igs2)" stroke-width="2.5" fill="none"/><circle cx="27" cy="13" r="1.3" fill="#fcb045"/><defs><linearGradient id="igs2" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#833ab4"/><stop offset=".5" stop-color="#fd1d1d"/><stop offset="1" stop-color="#fcb045"/></linearGradient></defs></svg></div>
          <div class="nova-social-icon" style="background:rgba(114,0,212,0.1);border-color:rgba(114,0,212,0.22);"><svg width="30" height="30" viewBox="0 0 40 40" fill="none"><path d="M20 8C13.4 8 8 13.4 8 20c0 2.7.9 5.2 2.4 7.2L8.3 32l5-2.1C15 31.2 17.4 32 20 32c6.6 0 12-5.4 12-12S26.6 8 20 8zm5.9 16.4c-.3.8-1.5 1.5-2.1 1.5-.6.1-1.1.3-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.2-.2-1.5-2-1.5-3.8s1-2.6 1.3-3c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.5.3.6 1 2.3 1.1 2.5.1.2.2.4.1.7-.1.2-.2.4-.4.6l-.5.6c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.3 1.1 2.5 1.5 2.8 1.6.3.1.6.1.8-.1l.5-.6c.3-.3.5-.2.8-.1l2.3 1.1c.3.1.5.2.5.5.1.5-.1 1.4-.4 2.2z" fill="rgba(130,80,230,0.9)"/></svg></div>
          <div class="nova-social-icon" style="background:rgba(24,119,242,0.1);border-color:rgba(24,119,242,0.22);"><svg width="30" height="30" viewBox="0 0 40 40" fill="none"><path d="M22.7 21h-2.7v9H17v-9h-2v-3h2v-1.9c0-1.6.8-4.1 4.1-4.1H24v3h-2.1c-.4 0-.8.1-.8.8V18H24l-.4 3h-.9z" fill="rgba(24,119,242,0.9)"/></svg></div>
        </div>
        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 -16px;"></div>
        <div style="padding:18px 0;">
          <p style="font-size:10px;color:rgba(255,255,255,0.4);text-align:center;margin-bottom:12px;letter-spacing:0.1em;font-weight:600;">LICENSED &amp; CERTIFIED</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">
            <div v-for="n in 8" :key="n" class="nova-license-slot"></div>
          </div>
        </div>
        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 -16px;"></div>
        <div style="padding:18px 0 140px;">
          <p style="font-size:11px;line-height:1.85;color:rgba(255,255,255,0.5);margin-bottom:10px;"><span style="color:#4ade80;font-weight:700;">NovaBETT</span> သည် ကာစိန်ဂိမ်းများ၊ ပိုကာဂိမ်းများ၊ စလော့ဂိမ်းများ မြင်းပြိုင်မြောက်မြားစွာ ဆော့ကစားနိုင်သောနေရာတစ်ခု ဖြစ်သည်။ ငွေသွင်းငွေထုတ် 24/7 ရနိုင်ပြီး Customer Support ကို အမြဲတမ်း ဆက်သွယ်နိုင်သည်။</p>
          <p style="font-size:10px;color:rgba(255,255,255,0.35);text-align:center;">© လုပ်ပိုင်ခွင့်များ ၂၀၀၀ - ၂၀၃၀</p>
        </div>
      </div>

      <!-- ══ BOTTOM NAV ══ -->
      <nav class="nova-bottom-nav">
        <div style="display:flex;justify-content:space-around;align-items:center;padding:8px 0 4px;">
          <router-link to="/home" style="text-decoration:none;" :class="['nova-nav-item',$route.path==='/home'?'nova-nav-active':'']"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg><span>ပင်မ</span></router-link>
          <router-link to="/promotions" style="text-decoration:none;" :class="['nova-nav-item',$route.path==='/promotions'?'nova-nav-active':'']"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg><span>ပရိုမို</span></router-link>
          <router-link to="/agent" style="text-decoration:none;" :class="['nova-nav-item',$route.path==='/agent'?'nova-nav-active':'']"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg><span>အေးဂျင့်</span></router-link>
          <router-link to="/service" style="text-decoration:none;" :class="['nova-nav-item',$route.path==='/service'?'nova-nav-active':'']"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg><span>ဆက်သွယ်</span></router-link>
          <router-link to="/account" style="text-decoration:none;" :class="['nova-nav-item',$route.path==='/account'?'nova-nav-active':'']"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg><span>အကောင့်</span></router-link>
        </div>
      </nav>

      <!-- ══ MODALS ══ -->
      <DepositModal v-model="showDepositModal" @submit="handleDepositSubmit"/>
      <WithdrawModal v-model="showWithdrawModal" :balance="mainBalance" @submit="handleWithdrawSubmit"/>

      <!-- ══ AUTH MODAL — Green Theme ══ -->
      <Teleport to="body">
        <Transition name="nova-auth-fade">
          <div v-if="showAuthModal" class="nova-auth-overlay" @click.self="showAuthModal=false">

            <!-- CARD -->
            <div class="nova-auth-card">
              <!-- TABS -->
              <div class="nova-auth-tabs">
                <button @click="authTab='register'" :class="['nova-auth-tab-btn', authTab==='register'?'nova-auth-tab-btn--active':'']">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style="opacity:0.7;"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  မှတ်ပုံတင်
                </button>
                <button @click="authTab='login'" :class="['nova-auth-tab-btn', authTab==='login'?'nova-auth-tab-btn--active':'']">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style="opacity:0.7;"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                  လောဂ်အင်
                </button>
              </div>

              <!-- REGISTER FORM -->
              <div v-if="authTab==='register'" class="nova-auth-form-body">
                <p class="nova-auth-subtitle">အထောက်အပံ့များသာဘဖြစ်သည်။ အကောင့် မှတ်ပုံတင်</p>
                <!-- Username -->
                <div class="nova-auth-field">
                  <svg width="15" height="15" fill="rgba(180,180,180,0.5)" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  <input v-model="regUsername" type="text" placeholder="*ကျေးဇူးပြု၍ ဝင်ပါ အကောင့်" class="nova-auth-input"/>
                  <button v-if="regUsername" @click="regUsername=''" class="nova-clear-btn">
                    <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <!-- Password -->
                <div class="nova-auth-field">
                  <svg width="15" height="15" fill="rgba(180,180,180,0.5)" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                  <input v-model="regPassword" :type="regShowPassword?'text':'password'" placeholder="*စကားဝှက်ထည့်ဆည်ပါ" class="nova-auth-input"/>
                  <button v-if="regPassword" @click="regPassword=''" class="nova-clear-btn">
                    <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                  <button @click="regShowPassword=!regShowPassword" class="nova-clear-btn" style="margin-left:2px;">
                    <svg width="16" height="16" fill="none" stroke="rgba(180,180,180,0.5)" stroke-width="2" viewBox="0 0 24 24"><path :d="regShowPassword?'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22':'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z'"/></svg>
                  </button>
                </div>
                <!-- Strength bars -->
                <div style="margin-bottom:10px;">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;color:rgba(255,255,255,0.4);">ခွန်အား</span>
                    <div style="display:flex;gap:3px;flex:1;">
                      <div v-for="i in 5" :key="i" :style="i<=pwStrength?'background:'+pwColor+';':'background:rgba(255,255,255,0.1);'" style="height:3px;flex:1;border-radius:2px;transition:all 0.3s;"></div>
                    </div>
                  </div>
                </div>
                <!-- Phone -->
                <div class="nova-auth-field">
                  <div style="display:flex;align-items:center;gap:6px;padding-right:8px;border-right:1px solid rgba(255,255,255,0.1);flex-shrink:0;">
                    <span style="font-size:16px;">🇲🇲</span>
                    <span style="font-size:12px;color:rgba(255,255,255,0.55);font-weight:600;">+95</span>
                  </div>
                  <input v-model="regPhone" type="tel" placeholder="*ဖုန်းနံပါတ်ထည့်ဆည်ပါ" class="nova-auth-input" style="padding-left:8px;"/>
                  <button v-if="regPhone" @click="regPhone=''" class="nova-clear-btn">
                    <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <!-- 18+ checkbox -->
                <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;">
                  <div @click="reg18Agreed=!reg18Agreed" :style="reg18Agreed?'background:#22c55e;border-color:#22c55e;':''" style="width:18px;height:18px;border-radius:4px;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;margin-top:1px;">
                    <svg v-if="reg18Agreed" width="10" height="10" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <p style="font-size:11px;color:rgba(255,255,255,0.45);line-height:1.6;margin:0;">ကျွန်ုပ်သည် အသက် 18 နှစ်ကျော်သည်။ <span style="color:#22c55e;font-weight:700;">«အသုံးပြုသူသဘောတူညီချက်»</span> ကို ဖတ်ပြီး သဘောတူသည်</p>
                </div>
                <p v-if="regError" class="nova-auth-error">{{ regError }}</p>
                <button @click="handleRegister" :disabled="regLoading" class="nova-auth-submit-btn">
                  <span>{{ regLoading ? 'Loading...' : 'မှတ်ပုံတင်' }}</span>
                </button>
                <div style="text-align:center;margin-top:12px;">
                  <span style="font-size:11px;color:rgba(255,255,255,0.35);cursor:pointer;">ဘည်ဝန်ဆောင်မှု</span>
                </div>
                <div class="nova-auth-divider">
                  <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
                  <span style="font-size:11px;color:rgba(255,255,255,0.25);">မှတ်ပုံတင်ခြင်း</span>
                  <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
                </div>
                <div style="display:flex;justify-content:center;">
                  <button class="nova-fb-btn">
                    <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                </div>
              </div>

              <!-- LOGIN FORM -->
              <div v-if="authTab==='login'" class="nova-auth-form-body">
                <p class="nova-auth-subtitle">ဖုန်းနံပါတ်/အကောင့် ဖြင့် လောဂ်အင်ဝင်ပါ</p>
                <!-- Username/Phone -->
                <div class="nova-auth-field">
                  <svg width="15" height="15" fill="rgba(180,180,180,0.5)" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  <input v-model="loginUsername" type="text" placeholder="*ဖုန်းနံပါတ်/အကောင့်" class="nova-auth-input"/>
                  <button v-if="loginUsername" @click="loginUsername=''" class="nova-clear-btn">
                    <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <!-- Password type toggle -->
                <div style="display:flex;gap:8px;margin-bottom:9px;">
                  <button @click="loginType='password'" :class="['nova-login-type-btn', loginType==='password'?'nova-login-type-btn--active':'']">
                    <span style="font-size:13px;">🔒</span> ကားဝှက် လောဂ်အင်
                  </button>
                  <button @click="loginType='otp'" :class="['nova-login-type-btn', loginType==='otp'?'nova-login-type-btn--active':'']">
                    <span style="font-size:13px;">🔢</span> အတည်ပြကုဒ်
                  </button>
                </div>
                <!-- Password -->
                <div class="nova-auth-field">
                  <svg width="15" height="15" fill="rgba(180,180,180,0.5)" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                  <input v-model="loginPassword" :type="loginShowPassword?'text':'password'" placeholder="*သင်ကားဝှက်ကို ထည့်ဆည်ပါ" class="nova-auth-input"/>
                  <button v-if="loginPassword" @click="loginPassword=''" class="nova-clear-btn">
                    <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                  <button @click="loginShowPassword=!loginShowPassword" class="nova-clear-btn" style="margin-left:2px;">
                    <svg width="16" height="16" fill="none" stroke="rgba(180,180,180,0.5)" stroke-width="2" viewBox="0 0 24 24"><path :d="loginShowPassword?'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22':'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z'"/></svg>
                  </button>
                </div>
                <!-- Remember me -->
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
                  <div @click="rememberMe=!rememberMe" :style="rememberMe?'background:#22c55e;border-color:#22c55e;':''" style="width:18px;height:18px;border-radius:4px;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;">
                    <svg v-if="rememberMe" width="10" height="10" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <span style="font-size:11px;color:rgba(255,255,255,0.45);">အကောင့်ကားဝှက်ကို မှတ်ထားပါ</span>
                </div>
                <p v-if="loginError" class="nova-auth-error">{{ loginError }}</p>
                <button @click="handleLogin" :disabled="loginLoading" class="nova-auth-submit-btn">
                  <span>{{ loginLoading ? 'Loading...' : 'လောဂ်အင်' }}</span>
                </button>
                <div style="display:flex;justify-content:space-between;margin-top:12px;">
                  <span style="font-size:11px;color:rgba(255,255,255,0.35);cursor:pointer;">ဘည်ဝန်ဆောင်မှု</span>
                  <span style="font-size:11px;color:rgba(34,197,94,0.7);cursor:pointer;">ကားဝှက်မေ့နေသည်</span>
                </div>
                <div class="nova-auth-divider">
                  <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
                  <span style="font-size:11px;color:rgba(255,255,255,0.25);">အဂြန်ဝင်ရောက်မှု</span>
                  <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
                </div>
                <div style="display:flex;justify-content:center;">
                  <button class="nova-fb-btn">
                    <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- ✦ CLOSE BUTTON — BELOW CARD ✦ -->
            <button @click="showAuthModal=false" class="nova-auth-close-bottom">
              <svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

          </div>
        </Transition>
      </Teleport>
    </div>
  </template>

  <script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { showToast } from 'vant'
  import { supabase } from '@/lib/supabase'
  import DepositModal from '@/components/DepositModal.vue'
  import WithdrawModal from '@/components/WithdrawModal.vue'
  import NftAvatar from '@/components/NftAvatar.vue'

  const route = useRoute()

  // ── Blank URL slots — fill these with real links ──
  const depositUrl  = ref('')   // TODO: add deposit page URL
  const withdrawUrl = ref('')   // TODO: add withdraw page URL
  const vipUrl      = ref('')   // TODO: add VIP page URL
  const installUrl  = ref('')   // TODO: add app install URL
  function goUrl(url) { if (url) window.open(url, '_blank') }

  const isLoggedIn = ref(false); const username = ref(''); const mainBalance = ref(0); const currentLang = ref('en')
  const showAuthModal = ref(false); const authTab = ref('login')
  const loginUsername = ref(''); const loginPassword = ref(''); const loginShowPassword = ref(false); const loginLoading = ref(false); const loginError = ref(''); const loginType = ref('password'); const rememberMe = ref(false)
  const regUsername = ref(''); const regPhone = ref(''); const regPassword = ref(''); const regShowPassword = ref(false); const regLoading = ref(false); const regError = ref(''); const reg18Agreed = ref(false)
  const searchVisible = ref(false); const searchQuery = ref('')
  const showDepositModal = ref(false); const showWithdrawModal = ref(false)
  const balanceRefreshing = ref(false)

  // ── Scroll lock when auth modal is open ──
  watch(showAuthModal, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
    document.body.style.touchAction = val ? 'none' : ''
  })

  // Password strength
  const pwStrength = computed(() => {
    const p = regPassword.value; if (!p) return 0
    let s = 0; if (p.length >= 6) s++; if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })
  const pwColor = computed(() => pwStrength.value <= 1 ? '#ef4444' : pwStrength.value <= 3 ? '#f59e0b' : '#22c55e')

  function openAuth(tab) { authTab.value = tab; showAuthModal.value = true }

  // Banner
  const bannerImages = ref(['/images/banners/banner1.jpg','/images/banners/banner2.jpg','/images/banners/banner3.jpg','/images/banners/banner4.jpg','/images/banners/banner5.jpg'])
  const bannerIdx = ref(0); let bannerTimer = null; let touchStartX = 0
  function startBannerTimer() { clearInterval(bannerTimer); bannerTimer = setInterval(() => { bannerIdx.value = (bannerIdx.value+1)%bannerImages.value.length }, 4000) }
  function onBannerTouchStart(e) { touchStartX = e.touches[0].clientX; clearInterval(bannerTimer) }
  function onBannerTouchMove(e) { e.preventDefault() }
  function onBannerTouchEnd(e) { const dx=touchStartX-e.changedTouches[0].clientX; if(Math.abs(dx)>40) bannerIdx.value=dx>0?(bannerIdx.value+1)%bannerImages.value.length:bannerIdx.value===0?bannerImages.value.length-1:bannerIdx.value-1; startBannerTimer() }

  // Categories
  const categories = ref([
    { id:'popular', name:'နာမည်ကြီး',  svgPath:'M12 2C9 7 4 8 4 13a8 8 0 0016 0c0-5-5-6-8-11zm0 14a3 3 0 01-3-3c0-2 2-3 3-5 1 2 3 3 3 5a3 3 0 01-3 3z' },
    { id:'slot',    name:'777 စလော့', svgPath:'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 5v8h2V8H8zm4 0v8h2V8h-2zm4 0v8h2V8h-2z' },
    {
      id:'pp', name:'Pragmatic',
      brandSvg: `
        <defs>
          <linearGradient id="pp-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e8420a"/>
            <stop offset="100%" stop-color="#b02d06"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="26" height="26" rx="6" fill="url(#pp-g)"/>
        <!-- Lion head silhouette — Pragmatic Play style -->
        <path d="M14 5.5c-1 0-1.8.4-2.3 1-.3.3-.5.7-.6 1.1-.6.1-1.1.4-1.5.8-.5.6-.6 1.4-.4 2.1-.8.4-1.4 1.2-1.4 2.2 0 .9.5 1.7 1.2 2.1-.1.3-.1.6-.1.9 0 2.2 2 3.8 4.6 3.8s4.6-1.7 4.6-3.8c0-.3 0-.6-.1-.9.7-.4 1.2-1.2 1.2-2.1 0-1-.6-1.8-1.4-2.2.2-.7.1-1.5-.4-2.1-.4-.4-.9-.7-1.5-.8-.1-.4-.3-.8-.6-1.1C15.8 5.9 15 5.5 14 5.5z" fill="rgba(255,255,255,0.95)"/>
        <circle cx="11.5" cy="11" r="0.9" fill="#e8420a"/>
        <circle cx="16.5" cy="11" r="0.9" fill="#e8420a"/>
        <path d="M12 14c.5.6 1 .9 2 .9s1.5-.3 2-.9" fill="none" stroke="#e8420a" stroke-width="0.8" stroke-linecap="round"/>
        <!-- PP letters -->
        <text x="14" y="24" text-anchor="middle" font-size="5" font-weight="900" fill="rgba(255,255,255,0.9)" font-family="Arial,sans-serif">PP</text>
      `
    },
    {
      id:'jili', name:'JILI Slot',
      brandSvg: `
        <defs>
          <linearGradient id="jili-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff4500"/>
            <stop offset="100%" stop-color="#cc2200"/>
          </linearGradient>
          <linearGradient id="jili-flame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#ff8c00"/>
            <stop offset="100%" stop-color="#ffdd00"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="26" height="26" rx="6" fill="url(#jili-g)"/>
        <!-- Flame shape -->
        <path d="M14 3.5c0 0-4.5 4.5-3 8.5-1.5-1-2-3.5-2-3.5s-2.5 4 0 7.5c1 1.5 2.5 2.5 5 2.5s4-1 5-2.5c2.5-3.5 0-7.5 0-7.5s-.5 2.5-2 3.5c1.5-4-3-8.5-3-8.5z" fill="url(#jili-flame)"/>
        <path d="M14 10c0 0-2 2.5-1 4.5.5-1 1.5-1.5 1-3 .5 1.5 1.5 2 1 3 1-2-1-4.5-1-4.5z" fill="rgba(255,255,255,0.7)"/>
        <!-- JILI text -->
        <text x="14" y="25.5" text-anchor="middle" font-size="5.5" font-weight="900" fill="rgba(255,255,255,0.95)" font-family="Arial,sans-serif" letter-spacing="0.5">JILI</text>
      `
    },
    {
      id:'pg', name:'PG Soft',
      brandSvg: `
        <defs>
          <linearGradient id="pg-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a6bcc"/>
            <stop offset="100%" stop-color="#0d4a8f"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="26" height="26" rx="6" fill="url(#pg-g)"/>
        <!-- PG hexagon geometry -->
        <polygon points="14,4 20,7.5 20,14.5 14,18 8,14.5 8,7.5" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
        <polygon points="14,6.5 18,9 18,14 14,16.5 10,14 10,9" fill="rgba(255,255,255,0.12)"/>
        <!-- P shape -->
        <text x="10.5" y="15.5" font-size="9" font-weight="900" fill="rgba(255,255,255,0.95)" font-family="Arial,sans-serif">P</text>
        <!-- G shape -->
        <text x="15.5" y="15.5" font-size="9" font-weight="900" fill="rgba(100,200,255,0.9)" font-family="Arial,sans-serif">G</text>
        <!-- SOFT text -->
        <text x="14" y="24" text-anchor="middle" font-size="4" font-weight="700" fill="rgba(255,255,255,0.5)" font-family="Arial,sans-serif" letter-spacing="0.5">SOFT</text>
      `
    },
    {
      id:'jdb', name:'JDB Slot',
      brandSvg: `
        <defs>
          <linearGradient id="jdb-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8b2fc9"/>
            <stop offset="100%" stop-color="#5b0f99"/>
          </linearGradient>
          <linearGradient id="gem-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e879f9"/>
            <stop offset="50%" stop-color="#a855f7"/>
            <stop offset="100%" stop-color="#7c3aed"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="26" height="26" rx="6" fill="url(#jdb-g)"/>
        <!-- Gem/Diamond shape — JDB identity -->
        <polygon points="14,4 20,9.5 17.5,18 10.5,18 8,9.5" fill="url(#gem-g)"/>
        <polygon points="14,4 20,9.5 14,8" fill="rgba(255,255,255,0.4)"/>
        <polygon points="14,8 20,9.5 17.5,18" fill="rgba(255,255,255,0.08)"/>
        <polygon points="14,8 10.5,18 8,9.5" fill="rgba(255,255,255,0.15)"/>
        <polygon points="14,8 17.5,18 10.5,18" fill="rgba(255,255,255,0.06)"/>
        <!-- shine -->
        <circle cx="12" cy="7.5" r="1" fill="rgba(255,255,255,0.6)"/>
        <!-- JDB text -->
        <text x="14" y="25" text-anchor="middle" font-size="5.5" font-weight="900" fill="rgba(255,255,255,0.9)" font-family="Arial,sans-serif" letter-spacing="0.3">JDB</text>
      `
    },
    { id:'live',    name:'Live Casino', svgPath:'M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z' },
    { id:'fish',    name:'ငါးမျှားရ', svgPath:'M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' },
    { id:'fav',     name:'အကြိုက်ဆုံး',svgPath:'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
    { id:'recent',  name:'မကြာသေးမီက',svgPath:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z' },
    { id:'fishing', name:'ငါးဖမ်း',   svgPath:'M6 3v7a6 6 0 006 6 6 6 0 006-6V3h-2v7a4 4 0 01-4 4 4 4 0 01-4-4V3H6zm-1 9a7 7 0 007 7 7 7 0 007-7h-2a5 5 0 01-5 5 5 5 0 01-5-5H5z' },
  ])
  const activeCategory = ref('popular')
  const glowCanvases = {}
  function registerGlowCanvas(el,catId) { if(!el)return; glowCanvases[catId]=el; nextTick(()=>drawGlow(el)) }
  function drawGlow(canvas) { if(!canvas)return; const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height; ctx.clearRect(0,0,w,h); const g=ctx.createRadialGradient(w/2,h/2,2,w/2,h/2,w*.65); g.addColorStop(0,'rgba(34,197,94,0.28)'); g.addColorStop(.5,'rgba(34,197,94,0.10)'); g.addColorStop(1,'rgba(34,197,94,0)'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h) }

  // Games
  const games = ref([]); const loadingGames = ref(true); const fetchError = ref(null)
  async function fetchGames() {
    loadingGames.value=true; fetchError.value=null
    try { const {data,error}=await supabase.from('games').select('*').eq('is_active',true).order('provider',{ascending:true}); if(error)throw error; games.value=data||[] }
    catch { fetchError.value='ဂိမ်းများ ရယူ၍မရပါ' } finally { loadingGames.value=false }
  }
  const filteredGames = computed(() => { let l=games.value; if(searchQuery.value){const q=searchQuery.value.toLowerCase();l=l.filter(g=>g.name?.toLowerCase().includes(q))} return l })

  async function loadUserInfo() {
    try { const {data:{session}}=await supabase.auth.getSession(); if(!session){isLoggedIn.value=false;return}; isLoggedIn.value=true; username.value=(session.user.email||'').replace(/@novabett\.internal$/,'').toUpperCase(); await fetchBalance() }
    catch { isLoggedIn.value=false }
  }
  async function fetchBalance() {
    try { const {data:{session}}=await supabase.auth.getSession(); if(!session)return; const {data}=await supabase.from('wallets').select('balance').eq('user_id',session.user.id).single(); if(data)mainBalance.value=Number(data.balance)||0 }
    catch {}
  }
  async function refreshBalance() {
    if (balanceRefreshing.value) return
    balanceRefreshing.value = true
    await fetchBalance()
    setTimeout(() => { balanceRefreshing.value = false }, 700)
  }
  async function handleLogin() {
    loginError.value=''; if(!loginUsername.value||!loginPassword.value){loginError.value='အချက်အလက်များ ဖြည့်ပါ';return}
    loginLoading.value=true
    try { const email=loginUsername.value.toUpperCase()+'@novabett.internal'; const {data,error}=await supabase.auth.signInWithPassword({email,password:loginPassword.value}); if(error)throw error; if(data.session?.access_token)localStorage.setItem('sb_token',data.session.access_token); await loadUserInfo(); showToast({type:'success',message:'ဝင်ရောက်မှု အောင်မြင်ပါသည်'}); showAuthModal.value=false; loginUsername.value='';loginPassword.value='' }
    catch { loginError.value='Username သို့မဟုတ် Password မမှန်ပါ' } finally { loginLoading.value=false }
  }
  async function handleRegister() {
    regError.value=''; if(!regUsername.value||!regPhone.value||!regPassword.value){regError.value='အချက်အလက်များ ဖြည့်ပါ';return}
    regLoading.value=true
    try { const referral=route.query.dl||''; const res=await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/register3',{method:'POST',headers:{'Authorization':'Bearer sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb','apikey':'sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb','Content-Type':'application/json'},body:JSON.stringify({username:regUsername.value,phone:regPhone.value,password:regPassword.value,referral})}); const data=await res.json(); if(data.error)throw new Error(data.error); const email=regUsername.value.toUpperCase()+'@novabett.internal'; const {data:ld,error:le}=await supabase.auth.signInWithPassword({email,password:regPassword.value}); if(le)throw le; if(ld.session?.access_token)localStorage.setItem('sb_token',ld.session.access_token); await loadUserInfo(); showToast({type:'success',message:'အကောင့်ဖွင့် အောင်မြင်ပါသည်'}); showAuthModal.value=false; regUsername.value='';regPhone.value='';regPassword.value='' }
    catch(e) { regError.value=e.message } finally { regLoading.value=false }
  }
  function openGame(game) { if(!isLoggedIn.value){showAuthModal.value=true;authTab.value='login';return}; showToast(game.name+' မကြာမီ ရနိုင်မည်') }
  function toggleLanguage() { currentLang.value=currentLang.value==='en'?'mm':'en' }
  const formatCurrency = n => new Intl.NumberFormat('en-US').format(n)
  async function handleDepositSubmit(data) { try { const token=(await supabase.auth.getSession()).data.session?.access_token; if(!token){showToast({type:'fail',message:'ဝင်ရောက်ပါ'});return}; const res=await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/deposit',{method:'POST',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({method:data.method,amount:data.amount,slip:data.slip})}); const result=await res.json(); if(result.error)throw new Error(result.error); showToast({type:'success',message:'ငွေသွင်းမှု အောင်မြင်ပါသည်'}); setTimeout(()=>fetchBalance(),2000) } catch(e){showToast({type:'fail',message:e.message})} }
  async function handleWithdrawSubmit(data) { try { const token=(await supabase.auth.getSession()).data.session?.access_token; if(!token){showToast({type:'fail',message:'ဝင်ရောက်ပါ'});return}; const res=await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/withdraw',{method:'POST',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({method:data.method,phone:data.phone,accountName:data.accountName,amount:data.amount})}); const result=await res.json(); if(result.error)throw new Error(result.error); showToast({type:'success',message:'ငွေထုတ်မှု အောင်မြင်ပါသည်'}); setTimeout(()=>fetchBalance(),2000) } catch(e){showToast({type:'fail',message:e.message})} }

  onMounted(()=>{ loadUserInfo(); fetchGames(); startBannerTimer() })
  onUnmounted(()=>{ clearInterval(bannerTimer); document.body.style.overflow=''; document.body.style.touchAction='' })
  </script>

  <style scoped>
  /* ── BASE ── */
  .nova-app { background:#0a0a0a; min-height:100vh; color:#fff; -webkit-tap-highlight-color:rgba(0,0,0,0); }

  /* ══ CINEMATIC GLOW BRAND ══ */
  .nova-brand-wrap { display:flex; flex-direction:column; gap:1px; }
  .nova-welcome {
    font-size:8px; letter-spacing:0.35em; text-transform:uppercase;
    color:rgba(34,197,94,0.45); font-weight:500;
    text-shadow: 0 0 12px rgba(34,197,94,0.4);
  }
  .nova-brand {
    font-size:21px; font-weight:900; letter-spacing:0.18em; text-transform:uppercase;
    line-height:1.1; position:relative;
    background: linear-gradient(170deg,#ffffff 0%,rgba(255,255,255,0.95) 30%,rgba(200,230,210,0.85) 65%,rgba(134,239,172,0.9) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    filter: drop-shadow(0 0 8px rgba(34,197,94,0.55)) drop-shadow(0 0 20px rgba(34,197,94,0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.6));
  }
  .nova-brand-wrap::after {
    content: 'NovaBETT'; position:absolute; font-size:21px; font-weight:900; letter-spacing:0.18em; text-transform:uppercase;
    color: rgba(34,197,94,0.35); filter: blur(14px); pointer-events:none; z-index:-1; top:18px; left:46px; white-space:nowrap;
  }

  /* ── HEADER ── */
  .nova-header {
    position:sticky; top:0; z-index:100;
    background:rgba(10,10,10,0.96); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(255,255,255,0.06); padding:10px 16px; display:flex; align-items:center; justify-content:space-between;
  }
  .nova-logo {
    width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#22c55e,#15803d);
    display:flex; align-items:center; justify-content:center; font-weight:900; font-size:16px; color:#fff; flex-shrink:0;
    box-shadow:0 0 18px rgba(34,197,94,0.45);
  }

  /* ── SEARCH ── */
  .nova-search-bar { position:relative; padding:8px 16px; background:#0a0a0a; border-bottom:1px solid rgba(255,255,255,0.06); }

  /* ── MARQUEE ── */
  @keyframes nova-marquee { from{transform:translateX(100vw);}to{transform:translateX(-100%);} }
  .nova-marquee { display:inline-block; animation:nova-marquee 30s linear infinite; will-change:transform; white-space:nowrap; font-size:12px; color:rgba(255,255,255,0.58); }

  /* ── SIDEBAR — scrolls together with game grid ── */
  .nova-sidebar {
    width:72px; flex-shrink:0;
    align-self:flex-start;
    background:rgba(10,10,10,0.98); border-right:1px solid rgba(255,255,255,0.055); padding:6px 0;
  }
  .nova-cat-btn { position:relative; width:100%; display:flex; flex-direction:column; align-items:center; gap:5px; padding:10px 4px; background:transparent; border:none; cursor:pointer; -webkit-tap-highlight-color:transparent; overflow:hidden; transition:background 0.2s; }
  .nova-cat-btn--active { background:rgba(34,197,94,0.06); }
  .nova-cat-glow { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0; }
  .nova-cat-icon-wrap {
    position:relative; z-index:1; width:40px; height:40px; border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    background:linear-gradient(145deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 50%,rgba(0,0,0,0.15) 100%);
    border:1px solid rgba(255,255,255,0.1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2);
    backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    transform:perspective(120px) rotateX(4deg); transition:all 0.2s;
  }
  .nova-cat-btn--active .nova-cat-icon-wrap {
    background:linear-gradient(145deg,rgba(34,197,94,0.18) 0%,rgba(34,197,94,0.06) 50%,rgba(0,0,0,0.1) 100%);
    border-color:rgba(34,197,94,0.35);
    box-shadow: 0 2px 4px rgba(0,0,0,0.35), 0 6px 18px rgba(34,197,94,0.2), 0 0 22px rgba(34,197,94,0.1), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.15);
    transform:perspective(120px) rotateX(4deg) translateY(-1px);
  }
  .nova-cat-svg { width:18px; height:18px; }
  .nova-cat-label { position:relative; z-index:1; font-size:9px; font-weight:700; color:rgba(255,255,255,0.38); text-align:center; line-height:1.2; letter-spacing:0.01em; word-break:break-all; transition:color 0.2s; }
  .nova-cat-btn--active .nova-cat-label { color:rgba(74,222,128,0.9); }
  .nova-cat-active-bar { position:absolute; left:0; top:20%; bottom:20%; width:3px; border-radius:0 2px 2px 0; background:linear-gradient(to bottom,#4ade80,#22c55e); box-shadow:0 0 8px rgba(34,197,94,0.6); }

  /* ── GAME CARDS ── */
  .nova-game-card { border-radius:12px; overflow:hidden; cursor:pointer; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); box-shadow:0 2px 10px rgba(0,0,0,0.45); transform:translateZ(0); transition:transform 0.12s ease; -webkit-tap-highlight-color:transparent; }
  .nova-badge { position:absolute; font-size:7px; font-weight:900; border-radius:5px; padding:2px 4px; }
  .nova-badge--hot { top:5px; right:5px; background:linear-gradient(135deg,#ef4444,#dc2626); color:#fff; box-shadow:0 2px 6px rgba(239,68,68,0.4); }
  .nova-badge--provider { top:5px; left:5px; background:rgba(0,0,0,0.65); color:rgba(255,255,255,0.65); backdrop-filter:blur(4px); }

  /* ── QUICK ICONS ── */
  .nova-quick-icon { display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;-webkit-tap-highlight-color:transparent; }
  .nova-quick-icon span { font-size:8.5px;color:rgba(255,255,255,0.42);font-weight:600;white-space:nowrap; }
  .nova-quick-icon:active { opacity:0.65; }

  /* ── GLASS BUTTONS ── */
  .glass-btn-auth { height:34px;padding:0 13px;border-radius:9px;cursor:pointer;font-size:11.5px;font-weight:700;letter-spacing:0.03em;color:rgba(255,255,255,0.72);position:relative;overflow:hidden;background:rgba(255,255,255,0.065);border:1px solid rgba(255,255,255,0.13);box-shadow:inset 0 1px 0 rgba(255,255,255,0.09),0 2px 8px rgba(0,0,0,0.3);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:all 0.18s;-webkit-tap-highlight-color:transparent;white-space:nowrap; }
  .glass-btn-auth:active { transform:scale(0.95);opacity:0.82; }
  .glass-btn-auth--primary { background:linear-gradient(135deg,rgba(34,197,94,0.78),rgba(21,128,61,0.85));border-color:rgba(34,197,94,0.38);color:#fff;box-shadow:0 4px 14px rgba(34,197,94,0.24),inset 0 1px 0 rgba(255,255,255,0.16); }
  .glass-btn-sm { border-radius:8px;cursor:pointer;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);-webkit-tap-highlight-color:transparent;transition:opacity 0.15s; }
  .glass-btn-sm:active { opacity:0.7; }
  .glass-btn-icon { width:36px;height:36px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);-webkit-tap-highlight-color:transparent;transition:opacity 0.15s; }
  .glass-btn-icon:active { opacity:0.7; }

  /* ── INPUTS ── */
  .nova-input { width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:11px 12px;color:#fff;font-size:14px;outline:none;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:border-color 0.2s; }
  .nova-input::placeholder { color:rgba(255,255,255,0.18); }
  .nova-input:focus { border-color:rgba(34,197,94,0.42);box-shadow:0 0 0 3px rgba(34,197,94,0.07); }

  /* ══ AUTH MODAL — Green Theme ══ */
  .nova-auth-overlay {
    position:fixed; inset:0; z-index:1000;
    background:rgba(0,0,0,0.82);
    backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    padding:16px 16px 20px;
    overflow:hidden;
  }

  .nova-auth-card {
    width:100%; max-width:360px;
    max-height:calc(100vh - 110px);
    overflow-y:auto; border-radius:18px;
    background:linear-gradient(170deg,rgba(10,22,14,0.98) 0%,rgba(8,18,12,0.99) 100%);
    border:1px solid rgba(34,197,94,0.18);
    box-shadow: 0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(34,197,94,0.12) inset;
    -ms-overflow-style:none; scrollbar-width:none;
  }
  .nova-auth-card::-webkit-scrollbar { display:none; }

  /* Tabs */
  .nova-auth-tabs {
    display:flex; border-bottom:1px solid rgba(255,255,255,0.07);
    position:sticky; top:0; z-index:1;
    background:linear-gradient(170deg,rgba(10,22,14,0.99),rgba(8,18,12,0.99));
    border-radius:18px 18px 0 0;
  }
  .nova-auth-tab-btn {
    flex:1; padding:14px 12px; background:transparent; border:none; cursor:pointer;
    font-size:13.5px; font-weight:700; color:rgba(255,255,255,0.3);
    display:flex; align-items:center; justify-content:center; gap:6px;
    position:relative; transition:color 0.2s; -webkit-tap-highlight-color:transparent; letter-spacing:0.03em;
  }
  .nova-auth-tab-btn--active { color:#22c55e; }
  .nova-auth-tab-btn--active::after {
    content:''; position:absolute; bottom:0; left:16px; right:16px; height:2px;
    background:linear-gradient(90deg,transparent,#22c55e,transparent);
    border-radius:2px; box-shadow:0 0 10px rgba(34,197,94,0.7);
  }

  /* Form body */
  .nova-auth-form-body { padding:14px 18px 18px; }
  .nova-auth-subtitle { font-size:11.5px; color:rgba(255,255,255,0.4); margin-bottom:12px; line-height:1.5; }
  .nova-auth-error { color:#f87171; font-size:11px; text-align:center; margin-bottom:8px; }
  .nova-auth-divider { display:flex; align-items:center; gap:10px; margin:12px 0; }

  /* Auth fields */
  .nova-auth-field {
    display:flex; align-items:center; gap:8px;
    background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
    border-radius:10px; padding:9px 10px; margin-bottom:9px;
    transition:border-color 0.2s;
  }
  .nova-auth-field:focus-within {
    border-color:rgba(34,197,94,0.45);
    box-shadow:0 0 0 3px rgba(34,197,94,0.07);
  }
  .nova-auth-input {
    flex:1; background:transparent; border:none; outline:none;
    color:rgba(255,255,255,0.85); font-size:13px; min-width:0;
  }
  .nova-auth-input::placeholder { color:rgba(255,255,255,0.22); }

  /* Clear / eye button */
  .nova-clear-btn {
    background:none; border:none; cursor:pointer; padding:0;
    display:flex; align-items:center; flex-shrink:0;
    -webkit-tap-highlight-color:transparent; transition:opacity 0.15s;
  }
  .nova-clear-btn:active { opacity:0.5; }

  /* Submit button — green */
  .nova-auth-submit-btn {
    width:100%; height:46px; border-radius:12px; border:none; cursor:pointer;
    font-size:15px; font-weight:800; letter-spacing:0.06em; color:#fff;
    background:linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#15803d 100%);
    box-shadow:0 6px 22px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15);
    position:relative; overflow:hidden; transition:transform 0.1s, box-shadow 0.2s;
    -webkit-tap-highlight-color:transparent;
  }
  .nova-auth-submit-btn::before { content:''; position:absolute; top:0; left:0; right:0; height:50%; background:linear-gradient(to bottom,rgba(255,255,255,0.15),transparent); border-radius:12px 12px 0 0; pointer-events:none; }
  .nova-auth-submit-btn:active { transform:scale(0.97); box-shadow:0 3px 12px rgba(34,197,94,0.25); }
  .nova-auth-submit-btn:disabled { opacity:0.45; }

  /* Login type pills */
  .nova-login-type-btn {
    flex:1; padding:7px 6px; border-radius:8px; background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.1); cursor:pointer; color:rgba(255,255,255,0.38);
    font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; gap:4px;
    transition:all 0.2s; -webkit-tap-highlight-color:transparent;
  }
  .nova-login-type-btn--active { background:rgba(34,197,94,0.1); border-color:rgba(34,197,94,0.4); color:#22c55e; }

  /* Facebook button */
  .nova-fb-btn {
    width:46px; height:46px; border-radius:50%;
    background:linear-gradient(135deg,#1877f2,#0a5dc9); border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 14px rgba(24,119,242,0.4); -webkit-tap-highlight-color:transparent;
  }

  /* ✦ Close button — BELOW the card ✦ */
  .nova-auth-close-bottom {
    margin-top:18px;
    width:44px; height:44px; border-radius:50%;
    background:rgba(255,255,255,0.1);
    border:1.5px solid rgba(255,255,255,0.2);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; flex-shrink:0;
    -webkit-tap-highlight-color:transparent;
    transition:background 0.2s, transform 0.15s;
    box-shadow:0 4px 16px rgba(0,0,0,0.5);
  }
  .nova-auth-close-bottom:active { transform:scale(0.9); background:rgba(255,255,255,0.18); }

  /* Transition */
  .nova-auth-fade-enter-active,.nova-auth-fade-leave-active { transition:opacity 0.22s ease,transform 0.22s ease; }
  .nova-auth-fade-enter-from,.nova-auth-fade-leave-to { opacity:0; transform:scale(0.96) translateY(8px); }

  /* ── FOOTER ── */
  .nova-contact-icon { display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 14px;border-radius:14px;cursor:pointer;border:1px solid rgba(255,255,255,0.08);-webkit-tap-highlight-color:transparent; }
  .nova-contact-icon span { font-size:10px;color:rgba(255,255,255,0.45);font-weight:600; }
  .nova-social-icon { width:62px;height:62px;border-radius:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(255,255,255,0.08); }
  .nova-license-slot { height:50px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center; }
  .nova-footer-link { font-size:11px;color:rgba(255,255,255,0.45);cursor:pointer;line-height:1.5; }

  /* ── BOTTOM NAV ── */
  .nova-bottom-nav { position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(10,10,10,0.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);padding-bottom:env(safe-area-inset-bottom,0); }
  .nova-nav-item { display:flex;flex-direction:column;align-items:center;gap:2px;color:rgba(255,255,255,0.28);font-size:9px;font-weight:700;padding:4px 10px;border-radius:10px;transition:color 0.2s;-webkit-tap-highlight-color:transparent;user-select:none;letter-spacing:0.03em; }
  .nova-nav-active { color:#22c55e !important; }

  /* ── SKELETON ── */
  @keyframes nova-pulse { 0%,100%{opacity:.35;}50%{opacity:.65;} }

  /* ── VANT ── */
  :deep(.van-overlay) { background:rgba(0,0,0,0.7) !important; }

  /* ── QUICK ICON — green frame ── */
  .nova-quick-frame {
    width:30px; height:30px; border-radius:8px;
    border:1.5px solid rgba(34,197,94,0.55);
    background:rgba(34,197,94,0.07);
    box-shadow:0 0 8px rgba(34,197,94,0.18), inset 0 0 6px rgba(34,197,94,0.08);
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
  }
  .nova-quick-frame::after {
    content:''; position:absolute; top:0; left:-60%; width:40%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(34,197,94,0.22),transparent);
    animation:nova-frame-shine 2.8s ease-in-out infinite;
  }
  @keyframes nova-frame-shine { 0%,100%{left:-60%} 50%{left:140%} }

  /* ── CASH BUTTON ANIMATIONS ── */
  .nova-cash-btn { position:relative; overflow:hidden; display:flex; align-items:center; gap:5px; }
  .nova-withdraw-btn { display:flex; align-items:center; gap:5px; }
  .nova-cash-particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
  .nova-coin {
    position:absolute; font-size:9px; opacity:0;
    animation:nova-coin-burst 2.4s ease-in-out infinite;
  }
  .nova-coin.c1 { left:15%; animation-delay:0s; }
  .nova-coin.c2 { left:45%; animation-delay:0.6s; }
  .nova-coin.c3 { left:72%; animation-delay:1.2s; }
  @keyframes nova-coin-burst {
    0%   { opacity:0; transform:translateY(20px) scale(0.6) rotate(0deg); }
    20%  { opacity:0.9; }
    60%  { opacity:0.6; transform:translateY(-18px) scale(1.1) rotate(25deg); }
    100% { opacity:0; transform:translateY(-30px) scale(0.7) rotate(45deg); }
  }

  /* ── BRAND LOGOS in sidebar ── */
  .nova-cat-icon-wrap--brand {
    background:transparent !important;
    border-color:transparent !important;
    box-shadow:0 2px 8px rgba(0,0,0,0.5) !important;
    padding:0;
  }
  .nova-cat-svg--brand { width:32px !important; height:32px !important; border-radius:6px; overflow:visible; }
  
@keyframes nft-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.refresh-btn {
    background: transparent;
    border: none;
    padding: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.85;
    transition: opacity 0.2s;
  }
  .refresh-btn svg {
    transition: transform 0.1s;
  }
  .refresh-btn.spinning {
    opacity: 0.55;
  }
  .refresh-btn.spinning svg {
    animation: btn-spin 0.6s linear infinite;
  }
  @keyframes btn-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
.refresh-toggle {  background: transparent;  border: none;  padding: 3px;  cursor: pointer;  display: flex;  align-items: center;  justify-content: center;  opacity: 0.85;  transition: opacity 0.2s;}.refresh-toggle .refresh-icon {  display: block;  transition: opacity 0.2s;}.refresh-toggle--spin .refresh-icon {  animation: refresh-spin 0.65s linear infinite;  opacity: 0.55;}@keyframes refresh-spin {  from { transform: rotate(0deg); }  to   { transform: rotate(360deg); }}
.qrow { display:flex; align-items:center; justify-content:space-around; padding:0 10px 10px; gap:4px; }.qbtn { display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; -webkit-tap-highlight-color:transparent; user-select:none; flex:1; }.qbtn-frame { width:42px; height:42px; border-radius:10px; border:1.5px solid rgba(74,222,128,0.55); background:rgba(74,222,128,0.06); display:flex; align-items:center; justify-content:center; box-shadow:0 0 8px rgba(74,222,128,0.18); overflow:hidden; position:relative; }.qbtn-img-blank { width:100%; height:100%; background:rgba(74,222,128,0.04); }.qbtn-frame::after { content:''; position:absolute; inset:0; border-radius:9px; border:1px solid rgba(74,222,128,0.25); pointer-events:none; }.qbtn-icon-wrap { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; }.qbtn-icon-wrap--vip { background:linear-gradient(135deg,rgba(245,158,11,0.22),rgba(217,119,6,0.12)); border:1.5px solid rgba(251,191,36,0.6); box-shadow:0 0 10px rgba(251,191,36,0.28); }.qbtn-icon-wrap--bot { background:linear-gradient(135deg,rgba(74,222,128,0.15),rgba(16,185,129,0.08)); border:1.5px solid rgba(74,222,128,0.55); box-shadow:0 0 10px rgba(74,222,128,0.22); }.qbtn-icon-wrap--dl { background:linear-gradient(135deg,rgba(34,211,238,0.15),rgba(6,182,212,0.08)); border:1.5px solid rgba(34,211,238,0.55); box-shadow:0 0 10px rgba(34,211,238,0.22); }.qbtn-lbl { font-size:9px; font-weight:600; color:rgba(255,255,255,0.65); letter-spacing:0.02em; text-align:center; }.qbtn-lbl--vip { color:#fbbf24; text-shadow:0 0 6px rgba(251,191,36,0.5); }.qbtn-lbl--bot { color:#4ade80; text-shadow:0 0 6px rgba(74,222,128,0.4); }.qbtn-lbl--dl { color:#22d3ee; text-shadow:0 0 6px rgba(34,211,238,0.4); }.qbtn:active .qbtn-frame,.qbtn:active .qbtn-icon-wrap { transform:scale(0.93); opacity:0.8; }
</style>
