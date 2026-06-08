<template>
    <div class="nova-app">

      <!-- ══ HEADER ══ -->
      <header class="nova-header">
        <div class="nova-brand-wrap">
          <div class="nova-neural-dots">
            <span class="nova-ndot nova-ndot--1"></span>
            <span class="nova-ndot nova-ndot--2"></span>
            <span class="nova-ndot nova-ndot--3"></span>
          </div>
          <div class="nova-brand"><img src="https://ik.imagekit.io/rbok01qam/Brand%20Logo%20/IMG_20260605_215459.png?tr=f-auto" alt="NovaBett" style="height:34px;width:auto;object-fit:contain;display:block;" /></div>
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
      <div style="position:relative;overflow:hidden;aspect-ratio:2.2/1;background:#252870;">
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
      <div class="nova-marquee-bar" style="display:flex;align-items:center;background:rgba(45,51,117,0.92);border-top:1px solid rgba(34,197,94,0.1);border-bottom:1px solid rgba(34,197,94,0.1);padding:7px 12px;gap:8px;overflow:hidden;">
        <!-- Modern animated bell -->
        <div class="nova-bell-wrap" style="flex-shrink:0;">
          <svg class="nova-bell-svg" width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="rgba(34,197,94,0.95)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="rgba(34,197,94,0.95)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="18" cy="6" r="3" fill="#ef4444" stroke="#2e3375" stroke-width="1.5"/>
          </svg>
        </div>
        <div style="flex:1;overflow:hidden;"><span class="nova-marquee">iW99 မှ ကြိုဆိုပါသည်&nbsp;&nbsp;&nbsp;ငွေသွင်းငွေထုတ် 24/7&nbsp;&nbsp;&nbsp;JILI, PP, PG ဂိမ်းများ&nbsp;&nbsp;&nbsp;VIP အဖွဲ့ဝင်များ အထူးဆုများ&nbsp;&nbsp;&nbsp;Customer Support 24/7&nbsp;&nbsp;&nbsp;</span></div>
        <!-- Clickable inbox envelope -->
        <button @click="showInbox=true" class="nova-inbox-btn" style="position:relative;flex-shrink:0;background:none;border:none;cursor:pointer;padding:2px;-webkit-tap-highlight-color:transparent;">
          <svg class="nova-inbox-svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2.5" stroke="rgba(255,255,255,0.55)" stroke-width="1.8"/>
            <path d="M2 8l10 7 10-7" stroke="rgba(255,255,255,0.55)" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span class="nova-inbox-badge">{{ adminMessages.length > 0 ? (adminMessages.length > 99 ? '99+' : adminMessages.length) : '0' }}</span>
        </button>
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
      <div v-if="isLoggedIn" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;background:rgba(34,197,94,0.04);border-bottom:1px solid rgba(34,197,94,0.08);">
        <!-- LEFT: Avatar + info -->
        <div style="display:flex;align-items:center;gap:10px;">
          <NftAvatar :username="username" :size="38" />
          <div>
            <div style="font-size:11px;font-weight:700;color:#4ade80;margin-bottom:3px;letter-spacing:0.04em;text-shadow:0 0 8px rgba(74,222,128,0.6);">{{ username }}</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="font-size:17px;font-weight:900;color:#4ade80;">{{ formatCurrency(mainBalance) }} <span style="font-size:10px;color:rgba(255,255,255,0.3);">MMK</span></div>
              <button @click="refreshBalance" :class="['refresh-toggle', { 'refresh-toggle--spin': balanceRefreshing }]">
                <svg class="refresh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              </button>
            </div>
          </div>
        </div>
        <!-- RIGHT: 6 tiny shortcut buttons above + deposit/withdraw below -->
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;">
          <!-- 6 buttons row: same size, tight together -->
          <div style="display:flex;gap:3px;">
            <!-- KPay -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="showDepositModal=true">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;border:1.5px solid rgba(74,222,128,0.55);background:rgba(74,222,128,0.06);box-shadow:0 0 6px rgba(74,222,128,0.15);animation-delay:0s;overflow:hidden;display:flex;align-items:center;justify-content:center;"><img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-27-327_mark.via.gp_1780510112167edit.jpg?tr=f-auto" style="width:100%;height:100%;object-fit:cover;" @error="e=>e.target.style.display='none'"/></div>
              <span style="font-size:8px;color:rgba(255,255,255,0.6);font-weight:600;">KPay</span>
            </div>
            <!-- Wave -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="showDepositModal=true">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;border:1.5px solid rgba(74,222,128,0.55);background:rgba(74,222,128,0.06);box-shadow:0 0 6px rgba(74,222,128,0.15);animation-delay:0.3s;overflow:hidden;display:flex;align-items:center;justify-content:center;"><img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-34-166_mark.via.gp_1780510124725edit.jpg?tr=f-auto" style="width:100%;height:100%;object-fit:cover;" @error="e=>e.target.style.display='none'"/></div>
              <span style="font-size:8px;color:rgba(255,255,255,0.6);font-weight:600;">Wave</span>
            </div>
            <!-- UAB -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="showDepositModal=true">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;border:1.5px solid rgba(74,222,128,0.55);background:rgba(74,222,128,0.06);box-shadow:0 0 6px rgba(74,222,128,0.15);animation-delay:0.6s;"></div>
              <span style="font-size:8px;color:rgba(255,255,255,0.6);font-weight:600;">UAB</span>
            </div>
            <!-- VIP -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="$router.push('/vip')">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,rgba(245,158,11,0.22),rgba(217,119,6,0.12));border:1.5px solid rgba(251,191,36,0.6);box-shadow:0 0 8px rgba(251,191,36,0.25);display:flex;align-items:center;justify-content:center;animation-delay:0.9s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 17h20l-2-9-5 5-3-7-3 7-5-5-2 9z" fill="url(#vg2)" stroke="#f59e0b" stroke-width="0.5"/><defs><linearGradient id="vg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#d97706"/></linearGradient></defs><circle cx="12" cy="8" r="1.5" fill="#fef3c7"/><circle cx="2.5" cy="8.5" r="1" fill="#fef3c7"/><circle cx="21.5" cy="8.5" r="1" fill="#fef3c7"/></svg>
              </div>
              <span style="font-size:8px;color:#fbbf24;font-weight:600;text-shadow:0 0 5px rgba(251,191,36,0.4);">VIP</span>
            </div>
            <!-- Bot -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,rgba(74,222,128,0.15),rgba(16,185,129,0.08));border:1.5px solid rgba(74,222,128,0.55);box-shadow:0 0 8px rgba(74,222,128,0.2);display:flex;align-items:center;justify-content:center;animation-delay:1.2s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="16" height="12" rx="3" fill="#0f2a1a" stroke="#4ade80" stroke-width="1.2"/><rect x="7" y="4" width="10" height="5" rx="2" fill="#0f2a1a" stroke="#4ade80" stroke-width="1"/><line x1="12" y1="4" x2="12" y2="2" stroke="#4ade80" stroke-width="1.2" stroke-linecap="round"/><circle cx="12" cy="2" r="1" fill="#4ade80"/><circle cx="9" cy="13" r="1.8" fill="#4ade80" opacity="0.9"/><circle cx="15" cy="13" r="1.8" fill="#4ade80" opacity="0.9"/><rect x="8" y="17" width="8" height="1.5" rx="0.75" fill="#4ade80" opacity="0.6"/></svg>
              </div>
              <span style="font-size:8px;color:#4ade80;font-weight:600;text-shadow:0 0 5px rgba(74,222,128,0.3);">Bot</span>
            </div>
            <!-- Download -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,rgba(34,211,238,0.15),rgba(6,182,212,0.08));border:1.5px solid rgba(34,211,238,0.55);box-shadow:0 0 8px rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;animation-delay:1.5s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" fill="#061828" stroke="#22d3ee" stroke-width="1.2"/><path d="M12 7v7" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round"/><path d="M8.5 11l3.5 4 3.5-4" stroke="#22d3ee" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><line x1="7" y1="18" x2="17" y2="18" stroke="#22d3ee" stroke-width="1.4" stroke-linecap="round"/></svg>
              </div>
              <span style="font-size:8px;color:#22d3ee;font-weight:600;text-shadow:0 0 5px rgba(34,211,238,0.3);">ဒေါင်း</span>
            </div>
          </div>
          <!-- Deposit / Withdraw buttons -->
          <div style="display:flex;gap:6px;">
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
      </div>
      <!-- ══ CATEGORY BAR + GAME GRID ══ -->
      <div style="display:flex;flex-direction:column;" class="nova-game-area">

        <!-- HORIZONTAL CATEGORY BAR: first tab pinned, rest scrollable -->
        <div class="nova-hcat-wrapper">
          <!-- ① Pinned first tab — sits outside the scroll container entirely -->
          <button class="nova-hcat-btn nova-hcat-pin"
            :class="activeCategory===categories[0].id?'nova-hcat-btn--active':''"
            @click="activeCategory=categories[0].id">
            <span class="nova-hcat-icon">
              <img :src="categories[0].imageUrl" class="nova-hcat-img"
                @error="e=>{e.target.style.display='none';const fb=e.target.nextElementSibling;if(fb)fb.style.display='inline-flex';}" />
              <span class="nova-hcat-emoji" :style="categories[0].imageUrl?'display:none':'display:inline-flex'">{{ categories[0].emoji }}</span>
            </span>
            <span class="nova-hcat-label">{{ categories[0].name }}</span>
          </button>
          <!-- ② Scrollable remaining tabs — slide under pinned first tab -->
          <div class="nova-hcat-scroll">
            <div class="nova-hcat-bar">
              <button v-for="cat in categories.slice(1)" :key="cat.id"
                @click="activeCategory=cat.id"
                :class="['nova-hcat-btn', activeCategory===cat.id?'nova-hcat-btn--active':'']">
                <span class="nova-hcat-icon">
                  <img v-if="cat.imageUrl" :src="cat.imageUrl" class="nova-hcat-img"
                    @error="e=>{e.target.style.display='none';const fb=e.target.nextElementSibling;if(fb)fb.style.display='inline-flex';}" />
                  <span class="nova-hcat-emoji" :style="cat.imageUrl?'display:none':'display:inline-flex'">{{ cat.emoji }}</span>
                  <svg v-if="cat.arcadeSvg" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="nova-hcat-svg" v-html="cat.arcadeSvg"></svg>
                </span>
                <span class="nova-hcat-label">{{ cat.name }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- GAME GRID (full width) -->
        <div style="flex:1;min-width:0;padding:8px;">
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
              <div style="position:relative;aspect-ratio:3/4;overflow:hidden;background:#2e3375;">
                <img :src="game.image_url" alt="" @error="e=>e.target.style.display='none'" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy"/>
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(6,8,18,0.95) 0%,rgba(6,8,18,0.3) 40%,transparent 100%);"></div>
                <div v-if="idx%5<2" class="nova-badge nova-badge--hot">HOT</div>
                <div class="nova-badge nova-badge--provider">{{ game.provider }}</div>
                <div style="position:absolute;bottom:0;left:0;right:0;padding:4px 5px 5px;">
                  <div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.9);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.3;">{{ game.name }}</div>
                </div>
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
          <p style="font-size:11px;line-height:1.85;color:rgba(255,255,255,0.5);margin-bottom:10px;"><span style="color:#4ade80;font-weight:700;">iW99</span> သည် ကာစိန်ဂိမ်းများ၊ ပိုကာဂိမ်းများ၊ စလော့ဂိမ်းများ မြင်းပြိုင်မြောက်မြားစွာ ဆော့ကစားနိုင်သောနေရာတစ်ခု ဖြစ်သည်။ ငွေသွင်းငွေထုတ် 24/7 ရနိုင်ပြီး Customer Support ကို အမြဲတမ်း ဆက်သွယ်နိုင်သည်။</p>
          <p style="font-size:10px;color:rgba(255,255,255,0.35);text-align:center;">© လုပ်ပိုင်ခွင့်များ ၂၀၀၀ - ၂၀၃၀</p>
        </div>
      </div>

      <!-- ══ MODALS ══ -->
      <DepositModal v-model="showDepositModal" @submit="handleDepositSubmit"/>
      <WithdrawModal v-model="showWithdrawModal" :balance="mainBalance" @submit="handleWithdrawSubmit"/>

      <!-- ══ INBOX MODAL ══ -->
      <Transition name="inbox-slide">
        <div v-if="showInbox" class="nova-inbox-overlay" @click.self="showInbox=false">
          <div class="nova-inbox-sheet">
            <div class="nova-inbox-handle"></div>
            <div class="nova-inbox-header">
              <div style="display:flex;align-items:center;gap:8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2.5" stroke="#22c55e" stroke-width="2"/><path d="M2 8l10 7 10-7" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/></svg>
                <span style="font-size:15px;font-weight:800;color:#fff;letter-spacing:0.04em;">Admin Inbox</span>
              </div>
              <button @click="showInbox=false" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,0.6);font-size:14px;">✕</button>
            </div>
            <div v-if="adminMessages.length === 0" class="nova-inbox-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="opacity:0.25;margin-bottom:12px;"><rect x="2" y="4" width="20" height="16" rx="2.5" stroke="#fff" stroke-width="1.5"/><path d="M2 8l10 7 10-7" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
              <div style="color:rgba(255,255,255,0.35);font-size:13px;font-weight:600;">မက်ဆေ့ မရှိသေးပါ</div>
              <div style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:4px;">Admin မှ မက်ဆေ့များ ဤနေရာတွင် ပေါ်လာပါမည်</div>
            </div>
            <div v-for="msg in adminMessages" :key="msg.id" class="nova-inbox-item">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;">
                <span class="nova-inbox-item-title">{{ msg.title }}</span>
                <span class="nova-inbox-item-time">{{ msg.time }}</span>
              </div>
              <div class="nova-inbox-item-body">{{ msg.body }}</div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ══ AUTH PANEL — Slide from right ══ -->
      <Teleport to="body">
        <Transition name="nova-auth-slide">
          <div v-if="showAuthModal" class="nova-auth-panel">

            <!-- ── Header: back + tabs ── -->
            <div class="nova-auth-header">
              <button @click="showAuthModal=false" class="nova-auth-back">
                <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div class="nova-auth-tabs">
                <button @click="authTab='register'" :class="['nova-auth-tab-btn', authTab==='register'?'nova-auth-tab-btn--active':'']">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" style="opacity:0.75;"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  မှတ်ပုံတင်
                </button>
                <button @click="authTab='login'" :class="['nova-auth-tab-btn', authTab==='login'?'nova-auth-tab-btn--active':'']">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" style="opacity:0.75;"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                  လောဂ်အင်
                </button>
              </div>
              <div style="width:36px;"></div>
            </div>

            <!-- ── Scrollable form area ── -->
            <div class="nova-auth-body">

              <!-- REGISTER FORM -->
              <div v-if="authTab==='register'" class="nova-auth-form-body">
                <p class="nova-auth-subtitle">အကူညီများသာဘဖြစ်သည်။ အကောင့် မှတ်ပုံတင်</p>
                <div class="nova-auth-field">
                  <svg width="15" height="15" fill="rgba(180,180,180,0.5)" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  <input v-model="regUsername" type="text" placeholder="*ကျေးဇူးပြု၍ ဝင်ပါ အကောင့်" class="nova-auth-input"/>
                  <button v-if="regUsername" @click="regUsername=''" class="nova-clear-btn"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                </div>
                <div class="nova-auth-field">
                  <svg width="15" height="15" fill="rgba(180,180,180,0.5)" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                  <input v-model="regPassword" :type="regShowPassword?'text':'password'" placeholder="*စကားဝှက်ထည့်ဆည်ပါ" class="nova-auth-input"/>
                  <button v-if="regPassword" @click="regPassword=''" class="nova-clear-btn"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                  <button @click="regShowPassword=!regShowPassword" class="nova-clear-btn" style="margin-left:2px;"><svg width="16" height="16" fill="none" stroke="rgba(180,180,180,0.5)" stroke-width="2" viewBox="0 0 24 24"><path :d="regShowPassword?'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22':'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z'"/></svg></button>
                </div>
                <div style="margin-bottom:12px;">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;color:rgba(255,255,255,0.35);">ခွန်အား</span>
                    <div style="display:flex;gap:3px;flex:1;">
                      <div v-for="i in 5" :key="i" :style="i<=pwStrength?'background:'+pwColor+';':'background:rgba(255,255,255,0.1);'" style="height:3px;flex:1;border-radius:2px;transition:all 0.3s;"></div>
                    </div>
                  </div>
                </div>
                <div class="nova-auth-field">
                  <div style="display:flex;align-items:center;gap:6px;padding-right:8px;border-right:1px solid rgba(255,255,255,0.1);flex-shrink:0;">
                    <span style="font-size:16px;">🇲🇲</span>
                    <span style="font-size:12px;color:rgba(255,255,255,0.55);font-weight:600;">+95</span>
                  </div>
                  <input v-model="regPhone" type="tel" placeholder="*ဖုန်းနံပါတ်ထည့်ဆည်ပါ" class="nova-auth-input" style="padding-left:8px;"/>
                  <button v-if="regPhone" @click="regPhone=''" class="nova-clear-btn"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                </div>
                <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:18px;">
                  <div @click="reg18Agreed=!reg18Agreed" :style="reg18Agreed?'background:#22c55e;border-color:#22c55e;':''" style="width:18px;height:18px;border-radius:4px;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;margin-top:1px;">
                    <svg v-if="reg18Agreed" width="10" height="10" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <p style="font-size:11px;color:rgba(255,255,255,0.45);line-height:1.6;margin:0;">ကျွန်ုပ်သည် အသက် 18 နှစ်ကျော်သည်။ <span style="color:#22c55e;font-weight:700;">«အသုံးပြုသူသဘောတူညီချက်»</span> ကို ဖတ်ပြီး သဘောတူသည်</p>
                </div>
                <p v-if="regError" class="nova-auth-error">{{ regError }}</p>
                <button @click="handleRegister" :disabled="regLoading" class="nova-auth-submit-btn"><span>{{ regLoading ? 'Loading...' : 'မှတ်ပုံတင်' }}</span></button>
                <div style="text-align:center;margin-top:14px;"><span style="font-size:11px;color:rgba(255,255,255,0.32);cursor:pointer;">ဘည်ဝန်ဆောင်မှု</span></div>
                <div class="nova-auth-divider"><div style="flex:1;height:1px;background:rgba(255,255,255,0.08);"></div><span style="font-size:11px;color:rgba(255,255,255,0.22);">မှတ်ပုံတင်ခြင်း</span><div style="flex:1;height:1px;background:rgba(255,255,255,0.08);"></div></div>
                <div style="display:flex;justify-content:center;"><button class="nova-fb-btn"><svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button></div>
              </div>

              <!-- LOGIN FORM -->
              <div v-if="authTab==='login'" class="nova-auth-form-body">
                <p class="nova-auth-subtitle">ဖုန်းနံပါတ်/အကောင့် ဖြင့် လောဂ်အင်ဝင်ပါ</p>
                <div class="nova-auth-field">
                  <svg width="15" height="15" fill="rgba(180,180,180,0.5)" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  <input v-model="loginUsername" type="text" placeholder="*ဖုန်းနံပါတ်/အကောင့်" class="nova-auth-input"/>
                  <button v-if="loginUsername" @click="loginUsername=''" class="nova-clear-btn"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                </div>
                <div style="display:flex;gap:8px;margin-bottom:9px;">
                  <button @click="loginType='password'" :class="['nova-login-type-btn', loginType==='password'?'nova-login-type-btn--active':'']"><span style="font-size:13px;">🔒</span> ကားဝှက် လောဂ်အင်</button>
                  <button @click="loginType='otp'" :class="['nova-login-type-btn', loginType==='otp'?'nova-login-type-btn--active':'']"><span style="font-size:13px;">🔢</span> အတည်ပြကုဒ်</button>
                </div>
                <div class="nova-auth-field">
                  <svg width="15" height="15" fill="rgba(180,180,180,0.5)" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                  <input v-model="loginPassword" :type="loginShowPassword?'text':'password'" placeholder="*သင်ကားဝှက်ကို ထည့်ဆည်ပါ" class="nova-auth-input"/>
                  <button v-if="loginPassword" @click="loginPassword=''" class="nova-clear-btn"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                  <button @click="loginShowPassword=!loginShowPassword" class="nova-clear-btn" style="margin-left:2px;"><svg width="16" height="16" fill="none" stroke="rgba(180,180,180,0.5)" stroke-width="2" viewBox="0 0 24 24"><path :d="loginShowPassword?'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22':'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z'"/></svg></button>
                </div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
                  <div @click="rememberMe=!rememberMe" :style="rememberMe?'background:#22c55e;border-color:#22c55e;':''" style="width:18px;height:18px;border-radius:4px;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;">
                    <svg v-if="rememberMe" width="10" height="10" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <span style="font-size:11px;color:rgba(255,255,255,0.45);">အကောင့်ကားဝှက်ကို မှတ်ထားပါ</span>
                </div>
                <p v-if="loginError" class="nova-auth-error">{{ loginError }}</p>
                <button @click="handleLogin" :disabled="loginLoading" class="nova-auth-submit-btn"><span>{{ loginLoading ? 'Loading...' : 'လောဂ်အင်' }}</span></button>
                <div style="display:flex;justify-content:space-between;margin-top:14px;">
                  <span style="font-size:11px;color:rgba(255,255,255,0.32);cursor:pointer;">ဘည်ဝန်ဆောင်မှု</span>
                  <span style="font-size:11px;color:rgba(255,255,255,0.5);cursor:pointer;">ကားဝှက်မေ့နေသည်</span>
                </div>
                <div class="nova-auth-divider"><div style="flex:1;height:1px;background:rgba(255,255,255,0.08);"></div><span style="font-size:11px;color:rgba(255,255,255,0.22);">အဂြန်ဝင်ရောက်မှု</span><div style="flex:1;height:1px;background:rgba(255,255,255,0.08);"></div></div>
                <div style="display:flex;justify-content:center;"><button class="nova-fb-btn"><svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button></div>
              </div>

            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </template>

  <script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { showToast } from 'vant'
  import { supabase } from '@/supabase'
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
  const showInbox = ref(false)
  const adminMessages = ref([])
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
  const bannerImages = ref(['https://ik.imagekit.io/tdpebgueq/NOVABETT,%20BANNER%20/1780215182926.png?tr=f-auto','https://ik.imagekit.io/tdpebgueq/NOVABETT,%20BANNER%20/f9b69370-5cc9-11f1-b238-fb0c6456ca35%20(5).png?tr=f-auto','https://ik.imagekit.io/tdpebgueq/NOVABETT,%20BANNER%20/1780214089706.png?tr=f-auto'])
  const bannerIdx = ref(0); let bannerTimer = null; let touchStartX = 0
  function startBannerTimer() { clearInterval(bannerTimer); bannerTimer = setInterval(() => { bannerIdx.value = (bannerIdx.value+1)%bannerImages.value.length }, 4000) }
  function onBannerTouchStart(e) { touchStartX = e.touches[0].clientX; clearInterval(bannerTimer) }
  function onBannerTouchMove(e) { e.preventDefault() }
  function onBannerTouchEnd(e) { const dx=touchStartX-e.changedTouches[0].clientX; if(Math.abs(dx)>40) bannerIdx.value=dx>0?(bannerIdx.value+1)%bannerImages.value.length:bannerIdx.value===0?bannerImages.value.length-1:bannerIdx.value-1; startBannerTimer() }

  // Categories
  const categories = ref([
    { id:'popular', name:'နာမည်ကြီး', emoji:'🔥', imageUrl:'https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-02-41-326_mark.via.gp_1780514832069edit.jpg?tr=f-auto' },
    { id:'slot',    name:'စလော့',     emoji:'🎰', imageUrl:'https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-02-48-594_mark.via.gp_1780511877479edit.jpg?tr=f-auto' },
    { id:'fish',    name:'ငါးဖမ်း',   emoji:'🐬', imageUrl:'https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-02-57-533_mark.via.gp_1780511863896edit.jpg?tr=f-auto' },
    { id:'live',    name:'တိုက်ရိုက် ကာစီနို', emoji:'🃏', imageUrl:'https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-03-25-338_mark.via.gp_1780511848574edit.jpg?tr=f-auto' },
    { id:'arcade',  name:'Arcade',    emoji:'🕹️', arcadeSvg:`<defs><linearGradient id="arc-b" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#4f46e5"/></linearGradient><radialGradient id="arc-s" cx="50%" cy="30%" r="60%"><stop offset="0%" stop-color="#e879f9"/><stop offset="100%" stop-color="#a855f7"/></radialGradient></defs><rect x="5" y="17" width="18" height="9" rx="3" fill="url(#arc-b)"/><rect x="7" y="8" width="14" height="9" rx="2" fill="rgba(0,0,0,0.65)" stroke="rgba(168,85,247,0.7)" stroke-width="0.8"/><rect x="9" y="10" width="10" height="5" rx="1" fill="rgba(168,85,247,0.18)"/><text x="14" y="13.8" text-anchor="middle" font-size="3.6" font-weight="900" fill="#e879f9" font-family="Arial">ARCADE</text><line x1="8" y1="9.5" x2="20" y2="9.5" stroke="rgba(255,255,255,0.18)" stroke-width="0.6"/><circle cx="10" cy="21" r="3" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" stroke-width="0.7"/><circle cx="10" cy="21" r="1.6" fill="url(#arc-s)"/><circle cx="10" cy="21" r="0.7" fill="rgba(255,255,255,0.6)"/><circle cx="17" cy="20" r="1.6" fill="#f43f5e" opacity="0.95"/><circle cx="20.2" cy="20" r="1.6" fill="#22d3ee" opacity="0.95"/><circle cx="17" cy="23.2" r="1.6" fill="#4ade80" opacity="0.95"/><circle cx="20.2" cy="23.2" r="1.6" fill="#fbbf24" opacity="0.95"/><rect x="13" y="20.8" width="2.5" height="1.2" rx="0.5" fill="rgba(255,255,255,0.4)"/>`},
    { id:'fav',     name:'အကြိုက်ဆုံး', emoji:'⭐', imageUrl:'https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-04-03-664_mark.via.gp_1780514801506edit.jpg?tr=f-auto' },
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
    try { const {data:{session}}=await supabase.auth.getSession(); if(!session)return; const {data}=await supabase.from('wallets').select('main_balance').eq('user_id',session.user.id).single(); if(data)mainBalance.value=Number(data.main_balance)||0 }
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


  // ── HIGH FPS SMOOTH SCROLL BOOSTER ──
  let rafId = null
  let lastScrollY = 0
  let currentScrollY = 0
  const EASE = 0.12   // smoothing factor (lower = smoother/slower)

  function smoothScrollTick() {
    const diff = lastScrollY - currentScrollY
    if (Math.abs(diff) > 0.5) {
      currentScrollY += diff * EASE
      window.scrollTo(0, currentScrollY)
    } else {
      currentScrollY = lastScrollY
    }
    rafId = requestAnimationFrame(smoothScrollTick)
  }

  function onWheelSmooth(e) {
    e.preventDefault()
    lastScrollY = Math.max(0, Math.min(lastScrollY + e.deltaY * 0.85, document.body.scrollHeight - window.innerHeight))
    if (!rafId) rafId = requestAnimationFrame(smoothScrollTick)
  }
  onMounted(()=>{
    loadUserInfo(); fetchGames(); startBannerTimer()
    // GPU layer hints
    document.documentElement.style.setProperty('--perf-hint','auto')
    // 61 FPS smooth scroll on desktop wheel events
    window.addEventListener('wheel', onWheelSmooth, { passive: false })
  })
  onUnmounted(()=>{
    clearInterval(bannerTimer)
    document.body.style.overflow=''
    document.body.style.touchAction=''
    window.removeEventListener('wheel', onWheelSmooth)
    if (rafId) { cancelAnimationFrame(rafId); rafId = null }
  })
  </script>

  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;600&display=swap');
  /* ── BASE ── */
  .nova-app { background: #3d4187; min-height:100vh; color:#fff; -webkit-tap-highlight-color:rgba(0,0,0,0); overscroll-behavior:contain; -webkit-overflow-scrolling:touch; scroll-behavior:smooth; }
.nova-bg-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; }
.nova-bg-orb--1 { width:300px; height:300px; top:-80px; left:-80px; background:radial-gradient(circle,rgba(34,197,94,0.13) 0%,rgba(34,197,94,0.04) 50%,transparent 70%); animation:orb-drift1 12s ease-in-out infinite; }
.nova-bg-orb--2 { width:340px; height:340px; top:38%; right:-110px; background:radial-gradient(circle,rgba(99,102,241,0.12) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); animation:orb-drift2 16s ease-in-out infinite; }
.nova-bg-orb--3 { width:240px; height:240px; bottom:70px; left:-20px; background:radial-gradient(circle,rgba(168,85,247,0.1) 0%,rgba(236,72,153,0.05) 50%,transparent 70%); animation:orb-drift3 14s ease-in-out infinite; }

  /* ══ BRAND LOGO ══ */
  .nova-brand-wrap { position:relative; z-index:1; display:flex; align-items:center; gap:8px; }
  .nova-brand {
    display: flex;
    align-items: center;
    user-select: none;
  }
  /* Neural dots */
  .nova-neural-dots { display:flex; gap:4px; align-items:center; padding-left:1px; }
  .nova-ndot {
    display:inline-block; border-radius:50%;
    will-change:opacity,transform;
  }
  .nova-ndot--1 {
    width:4px; height:4px;
    background:rgba(6,182,212,0.95);
    box-shadow:0 0 5px rgba(6,182,212,0.9);
    animation:ndot-pulse 2.4s ease-in-out infinite;
  }
  .nova-ndot--2 {
    width:3px; height:3px;
    background:rgba(6,182,212,0.65);
    box-shadow:0 0 4px rgba(6,182,212,0.6);
    animation:ndot-pulse 2.4s ease-in-out 0.5s infinite;
  }
  .nova-ndot--3 {
    width:2.5px; height:2.5px;
    background:rgba(6,182,212,0.4);
    box-shadow:0 0 3px rgba(6,182,212,0.4);
    animation:ndot-pulse 2.4s ease-in-out 1s infinite;
  }
  @keyframes ndot-pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%     { opacity:0.3; transform:scale(0.6); }
  }

  /* ── HEADER ── */
  .nova-header {
    position:relative; z-index:10; background:transparent;
    padding:8px 14px 6px; display:flex; align-items:center; justify-content:space-between;
  }
  /* Radial glow behind brand text — "floating text on background" cinematic vibe */
  .nova-header::before {
    content:'';
    position:absolute; left:0; top:0; width:65%; height:100%;
    background: radial-gradient(ellipse at 28% 50%, rgba(34,197,94,0.07) 0%, rgba(6,182,212,0.04) 40%, transparent 70%);
    pointer-events:none; z-index:0;
  }
  /* nova-brand-wrap defined above */



  /* ── BELL ── */
  .nova-bell-wrap { display:flex; align-items:center; justify-content:center; }
  .nova-bell-svg { animation: bell-ring 4s ease-in-out infinite; transform-origin: 12px 4px; }
  @keyframes bell-ring {
    0%,100%  { transform: rotate(0deg); }
    5%       { transform: rotate(14deg); }
    10%      { transform: rotate(-14deg); }
    15%      { transform: rotate(10deg); }
    20%      { transform: rotate(-6deg); }
    25%      { transform: rotate(0deg); }
  }

  /* ── INBOX BUTTON ── */
  .nova-inbox-btn { }
  .nova-inbox-svg { animation: inbox-bounce 3s ease-in-out infinite; }
  @keyframes inbox-bounce {
    0%,100% { transform: translateY(0); }
    45%     { transform: translateY(0); }
    50%     { transform: translateY(-3px); }
    55%     { transform: translateY(0); }
    60%     { transform: translateY(-2px); }
    65%     { transform: translateY(0); }
  }
  .nova-inbox-badge { position:absolute; top:-5px; right:-6px; background:#ef4444; color:#fff; font-size:8px; font-weight:900; border-radius:10px; padding:1px 4px; line-height:14px; pointer-events:none; }

  /* ── INBOX MODAL ── */
  .nova-inbox-overlay { position:fixed; inset:0; z-index:500; background:rgba(0,0,0,0.72); display:flex; flex-direction:column; justify-content:flex-end; }
  .nova-inbox-sheet { background:#2e3375; border-radius:20px 20px 0 0; border-top:1px solid rgba(34,197,94,0.2); max-height:70vh; overflow-y:auto; padding:0 0 80px; }
  .nova-inbox-handle { width:36px; height:4px; background:rgba(255,255,255,0.15); border-radius:2px; margin:12px auto 0; }
  .nova-inbox-header { display:flex; justify-content:space-between; align-items:center; padding:14px 18px 12px; border-bottom:1px solid rgba(255,255,255,0.06); }
  .nova-inbox-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 20px; }
  .nova-inbox-item { margin:8px 14px; padding:12px 14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); border-radius:12px; }
  .nova-inbox-item-title { font-size:13px; font-weight:700; color:#fff; }
  .nova-inbox-item-time { font-size:10px; color:rgba(255,255,255,0.3); flex-shrink:0; margin-left:8px; }
  .nova-inbox-item-body { font-size:12px; color:rgba(255,255,255,0.55); margin-top:4px; line-height:1.5; }
  .inbox-slide-enter-active { transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.25s; }
  .inbox-slide-leave-active { transition: transform 0.28s ease-in, opacity 0.2s; }
  .inbox-slide-enter-from, .inbox-slide-leave-to { transform: translateY(100%); opacity:0; }
  .inbox-slide-enter-to, .inbox-slide-leave-from { transform: translateY(0); opacity:1; }

  /* ── SEARCH ── */
  .nova-search-bar { position:relative; padding:8px 16px; background:transparent; border-bottom:1px solid rgba(255,255,255,0.07); }

  /* ── MARQUEE ── */
  @keyframes nova-marquee { from{transform:translateX(100vw);}to{transform:translateX(-100%);} }
  .nova-marquee { display:inline-block; animation:nova-marquee 30s linear infinite; will-change:transform; white-space:nowrap; font-size:12px; color:rgba(255,255,255,0.58); }

  /* ── HORIZONTAL CATEGORY BAR — pinned first + scrollable rest ── */
  /* Outer wrapper: flex row, glass bg + bottom border on the WHOLE bar */
  .nova-hcat-wrapper {
    display:flex; align-items:stretch;
    background:rgba(255,255,255,0.04);
    backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
    border-bottom:1.5px solid rgba(255,255,255,0.09);
  }
  /* Pinned first tab — outside scroll, opaque bg so scroll content hides behind */
  .nova-hcat-pin {
    flex-shrink:0;
    background:#3d4187;
    border-right:1.5px solid rgba(255,255,255,0.12);
    z-index:2;
  }
  /* Scroll container: only remaining tabs */
  .nova-hcat-scroll {
    flex:1; min-width:0;
    overflow-x:auto; overflow-y:hidden;
    -webkit-overflow-scrolling:touch; scrollbar-width:none;
    background:transparent;
  }
  .nova-hcat-scroll::-webkit-scrollbar { display:none; }
  .nova-hcat-bar { display:flex; align-items:stretch; width:max-content; height:100%; }
  /* Every tab button */
  .nova-hcat-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:11px 18px;
    border:none; border-radius:0; background:transparent;
    cursor:pointer; -webkit-tap-highlight-color:transparent;
    transition:opacity 0.15s, color 0.2s; white-space:nowrap;
    position:relative; flex-shrink:0;
  }
  /* Bottom indicator line — slides in when active */
  .nova-hcat-btn::after {
    content:''; position:absolute; bottom:0; left:50%;
    transform:translateX(-50%) scaleX(0); width:70%; height:2.5px;
    background:linear-gradient(90deg,#818cf8,#c7d2fe);
    border-radius:2px 2px 0 0;
    transition:transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
  }
  .nova-hcat-btn--active::after { transform:translateX(-50%) scaleX(1); }
  .nova-hcat-btn:active { opacity:0.65; }
  /* Icon */
  .nova-hcat-icon { display:inline-flex; align-items:center; flex-shrink:0; }
  .nova-hcat-img { width:30px; height:30px; object-fit:contain; border-radius:6px; display:block; }
  .nova-hcat-emoji { font-size:26px; line-height:1; display:inline-flex; align-items:center; }
  .nova-hcat-svg { width:28px; height:28px; }
  /* Label */
  .nova-hcat-label { font-size:13px; font-weight:700; color:rgba(255,255,255,0.45); letter-spacing:0.01em; transition:color 0.2s; }
  .nova-hcat-btn--active .nova-hcat-label { color:rgba(255,255,255,0.96); text-shadow:0 0 14px rgba(200,210,255,0.6); }

  /* ── GAME CARDS ── */
  .nova-game-card { border-radius:14px; overflow:hidden; cursor:pointer; background:rgba(255,255,255,0.058); border:1px solid rgba(255,255,255,0.14); box-shadow:0 4px 22px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.08) inset, 0 0 0 0.5px rgba(34,197,94,0.08); will-change:transform; transform:translateZ(0); transition:transform 0.15s ease, box-shadow 0.15s ease; -webkit-tap-highlight-color:transparent; contain:layout style; }
.nova-game-card:active { transform:scale(0.95) translateZ(0); box-shadow:0 2px 10px rgba(0,0,0,0.65); }
.nova-game-card:hover { transform:translateY(-2px) translateZ(0); box-shadow:0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,197,94,0.18), 0 1px 0 rgba(255,255,255,0.1) inset; }
  .nova-badge { position:absolute; font-size:7px; font-weight:900; border-radius:5px; padding:2px 4px; }
  .nova-badge--hot { top:5px; right:5px; background:linear-gradient(135deg,#ef4444,#dc2626); color:#fff; box-shadow:0 2px 6px rgba(239,68,68,0.4); }
  .nova-badge--provider { top:5px; left:5px; background:rgba(0,0,0,0.72); color:rgba(255,255,255,0.65); }

  /* ── QUICK ICONS ── */
  .nova-quick-icon { display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;-webkit-tap-highlight-color:transparent; }
  .nova-quick-icon span { font-size:8.5px;color:rgba(255,255,255,0.42);font-weight:600;white-space:nowrap; }
  .nova-quick-icon:active { opacity:0.65; }

  /* ── GLASS BUTTONS ── */
  .glass-btn-auth { height:34px;padding:0 13px;border-radius:10px;cursor:pointer;font-size:11.5px;font-weight:700;letter-spacing:0.03em;color:rgba(255,255,255,0.8);position:relative;overflow:hidden;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.16);box-shadow:0 2px 8px rgba(0,0,0,0.3);transition:opacity 0.15s, transform 0.15s;-webkit-tap-highlight-color:transparent;white-space:nowrap; }
  .glass-btn-auth:active { transform:scale(0.95);opacity:0.82; }
  .glass-btn-auth--primary { background:linear-gradient(135deg,rgba(34,197,94,0.78),rgba(21,128,61,0.85));border-color:rgba(34,197,94,0.38);color:#fff;box-shadow:0 4px 14px rgba(34,197,94,0.24),inset 0 1px 0 rgba(255,255,255,0.16); }
  .glass-btn-sm { border-radius:8px;cursor:pointer;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);-webkit-tap-highlight-color:transparent;transition:opacity 0.15s; }
  .glass-btn-sm:active { opacity:0.7; }
  .glass-btn-icon { width:36px;height:36px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);-webkit-tap-highlight-color:transparent;transition:opacity 0.15s; }
  .glass-btn-icon:active { opacity:0.7; }

  /* ── INPUTS ── */
  .nova-input { width:100%;box-sizing:border-box;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:11px 12px;color:#fff;font-size:14px;outline:none;transition:border-color 0.2s; }
  .nova-input::placeholder { color:rgba(255,255,255,0.18); }
  .nova-input:focus { border-color:rgba(34,197,94,0.42);box-shadow:0 0 0 3px rgba(34,197,94,0.07); }

  /* ══ AUTH PANEL — Slide from right ══ */
  .nova-auth-panel {
    position: fixed; inset: 0; z-index: 1000;
    background: linear-gradient(160deg, #16183a 0%, #252870 55%, #16183a 100%);
    display: flex; flex-direction: column; overflow: hidden;
  }

  /* Header */
  .nova-auth-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 14px 0; flex-shrink: 0;
  }
  .nova-auth-back {
    width: 36px; height: 36px; background: none; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }

  /* Tabs */
  .nova-auth-tabs {
    display: flex; flex: 1; justify-content: center;
  }
  .nova-auth-tab-btn {
    flex: 1; max-width: 150px; padding: 10px 10px 12px; background: transparent; border: none; cursor: pointer;
    font-size: 13.5px; font-weight: 700; color: rgba(255,255,255,0.28);
    display: flex; align-items: center; justify-content: center; gap: 5px;
    position: relative; transition: color 0.2s; -webkit-tap-highlight-color: transparent; letter-spacing: 0.02em;
  }
  .nova-auth-tab-btn--active { color: rgba(255,255,255,0.95); }
  .nova-auth-tab-btn--active::after {
    content: ''; position: absolute; bottom: 0; left: 18%; right: 18%; height: 2px;
    background: rgba(255,255,255,0.75); border-radius: 2px;
  }

  /* Scrollable body */
  .nova-auth-body { flex: 1; overflow-y: auto; -ms-overflow-style: none; scrollbar-width: none; }
  .nova-auth-body::-webkit-scrollbar { display: none; }

  /* Form */
  .nova-auth-form-body { padding: 20px 20px 32px; }
  .nova-auth-subtitle { font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 18px; line-height: 1.5; }
  .nova-auth-error { color: #f87171; font-size: 11px; text-align: center; margin-bottom: 8px; }
  .nova-auth-divider { display: flex; align-items: center; gap: 10px; margin: 16px 0; }

  /* Input fields — soft card */
  .nova-auth-field {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px; padding: 12px 14px; margin-bottom: 11px;
    transition: border-color 0.2s, background 0.2s;
  }
  .nova-auth-field:focus-within {
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.1);
  }
  .nova-auth-input {
    flex: 1; background: transparent; border: none; outline: none;
    color: rgba(255,255,255,0.92); font-size: 13.5px; min-width: 0;
  }
  .nova-auth-input::placeholder { color: rgba(255,255,255,0.22); }

  /* Clear / eye button */
  .nova-clear-btn {
    background: none; border: none; cursor: pointer; padding: 0;
    display: flex; align-items: center; flex-shrink: 0;
    -webkit-tap-highlight-color: transparent; transition: opacity 0.15s;
  }
  .nova-clear-btn:active { opacity: 0.5; }

  /* Submit button — gold */
  .nova-auth-submit-btn {
    width: 100%; height: 48px; border-radius: 12px; border: none; cursor: pointer;
    font-size: 15px; font-weight: 800; letter-spacing: 0.05em; color: #1a1a2e;
    background: linear-gradient(135deg, #f0b429 0%, #f59e0b 50%, #d97706 100%);
    box-shadow: 0 4px 18px rgba(240,180,41,0.28);
    transition: transform 0.1s; -webkit-tap-highlight-color: transparent;
  }
  .nova-auth-submit-btn:active { transform: scale(0.97); }
  .nova-auth-submit-btn:disabled { opacity: 0.45; }

  /* Login type pills */
  .nova-login-type-btn {
    flex: 1; padding: 8px 6px; border-radius: 9px; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1); cursor: pointer; color: rgba(255,255,255,0.35);
    font-size: 10.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px;
    transition: all 0.2s; -webkit-tap-highlight-color: transparent;
  }
  .nova-login-type-btn--active { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.9); }

  /* Facebook button */
  .nova-fb-btn {
    width: 46px; height: 46px; border-radius: 50%;
    background: linear-gradient(135deg, #1877f2, #0a5dc9); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(24,119,242,0.4); -webkit-tap-highlight-color: transparent;
  }

  /* Slide transition */
  .nova-auth-slide-enter-active { transition: transform 0.3s cubic-bezier(0.32,0.72,0,1); }
  .nova-auth-slide-leave-active  { transition: transform 0.25s cubic-bezier(0.32,0.72,0,1); }
  .nova-auth-slide-enter-from,.nova-auth-slide-leave-to { transform: translateX(100%); }

  /* ── FOOTER ── */
  .nova-contact-icon { display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 14px;border-radius:14px;cursor:pointer;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);box-shadow:0 1px 6px rgba(0,0,0,0.25);-webkit-tap-highlight-color:transparent; }
  .nova-contact-icon span { font-size:10px;color:rgba(255,255,255,0.45);font-weight:600; }
  .nova-social-icon { width:62px;height:62px;border-radius:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.06);box-shadow:0 1px 6px rgba(0,0,0,0.22); }
  .nova-license-slot { height:50px;border-radius:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center; }
  .nova-footer-link { font-size:11px;color:rgba(255,255,255,0.45);cursor:pointer;line-height:1.5; }

  /* ── BOTTOM NAV ── */
  .nova-bottom-nav { position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(45,51,117,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.1);padding-bottom:env(safe-area-inset-bottom,0);box-shadow:0 -4px 28px rgba(0,0,0,0.45), 0 -1px 0 rgba(255,255,255,0.05) inset; }
  .nova-nav-item { flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:rgba(255,255,255,0.28);font-size:9px;font-weight:700;padding:6px 4px;border-radius:10px;transition:color 0.2s,opacity 0.15s;-webkit-tap-highlight-color:transparent;user-select:none;letter-spacing:0.03em;contain:layout style; }
  .nova-nav-item svg { flex-shrink:0;width:24px;height:24px;display:block; }
  .nova-nav-item span { display:block;white-space:nowrap;line-height:1; }
  .nova-nav-item:active { opacity:0.6; }
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
  /* .nova-cat-icon-wrap--brand legacy — removed */.nova-cat-icon-wrap--brand-legacy {
    background:transparent !important;
    border-color:transparent !important;
    box-shadow:none !important;
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
.qrow { display:flex; align-items:center; justify-content:space-around; padding:0 10px 10px; gap:4px; }.qrow--compact { padding:0; gap:3px; }.qbtn { display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; -webkit-tap-highlight-color:transparent; user-select:none; flex:1; }.qbtn-frame { width:42px; height:42px; border-radius:10px; border:1.5px solid rgba(74,222,128,0.55); background:rgba(74,222,128,0.06); display:flex; align-items:center; justify-content:center; box-shadow:0 0 8px rgba(74,222,128,0.18); overflow:hidden; position:relative; }.qbtn-img-blank { width:100%; height:100%; background:rgba(74,222,128,0.04); }.qbtn-frame--sm { width:32px; height:32px; border-radius:8px; }.qbtn-icon-wrap--sm { width:32px; height:32px; border-radius:8px; }.qbtn-frame::after { content:''; position:absolute; inset:0; border-radius:9px; border:1px solid rgba(74,222,128,0.25); pointer-events:none; }.qbtn-icon-wrap { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; }.qbtn-icon-wrap--vip { background:linear-gradient(135deg,rgba(245,158,11,0.22),rgba(217,119,6,0.12)); border:1.5px solid rgba(251,191,36,0.6); box-shadow:0 0 10px rgba(251,191,36,0.28); }.qbtn-icon-wrap--bot { background:linear-gradient(135deg,rgba(74,222,128,0.15),rgba(16,185,129,0.08)); border:1.5px solid rgba(74,222,128,0.55); box-shadow:0 0 10px rgba(74,222,128,0.22); }.qbtn-icon-wrap--dl { background:linear-gradient(135deg,rgba(34,211,238,0.15),rgba(6,182,212,0.08)); border:1.5px solid rgba(34,211,238,0.55); box-shadow:0 0 10px rgba(34,211,238,0.22); }.qbtn-lbl { font-size:9px; font-weight:600; color:rgba(255,255,255,0.65); letter-spacing:0.02em; text-align:center; }.qbtn-lbl--vip { color:#fbbf24; text-shadow:0 0 6px rgba(251,191,36,0.5); }.qbtn-lbl--bot { color:#4ade80; text-shadow:0 0 6px rgba(74,222,128,0.4); }.qbtn-lbl--dl { color:#22d3ee; text-shadow:0 0 6px rgba(34,211,238,0.4); }.qbtn:active .qbtn-frame,.qbtn:active .qbtn-icon-wrap { transform:scale(0.93); opacity:0.8; }

.qsc-icon { animation: qsc-bounce 1.8s ease-in-out infinite; }
@keyframes qsc-bounce {
  0%, 13%, 100% { transform: scale(1) translateY(0); filter: brightness(1); }
  6%  { transform: scale(1.25) translateY(-5px); filter: brightness(1.7); }
  10% { transform: scale(0.93) translateY(0); filter: brightness(1); }
}

  /* ── GLASS SECTIONS ── */
  .glass-section { background:rgba(255,255,255,0.03); border-top:1px solid rgba(255,255,255,0.06); border-bottom:1px solid rgba(255,255,255,0.06); }
  .glass-user-row { background:rgba(255,255,255,0.03); border-bottom:1px solid rgba(255,255,255,0.06); }
  .glass-marquee { background:rgba(45,51,117,0.92) !important; }
  /* Smooth mobile scroll on game grid */
  .nova-game-scroll { -webkit-overflow-scrolling:touch; overflow-y:auto; scroll-behavior:smooth; }
  /* Floating card feel on QSC icons */
  .qsc-icon { animation: qsc-bounce 1.8s ease-in-out infinite; }
  /* Game card hover lift */
  .nova-game-card:hover { transform:translateY(-2px) translateZ(0); box-shadow:0 8px 28px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.08) inset; }

  /* ══ HIGH FPS GPU ACCELERATION ══ */
  /* Promote scroll container to own GPU layer */
  .nova-game-scroll { will-change:transform; transform:translateZ(0); }
  /* Prevent layout thrash on animated elements */
  .nova-game-card, .qsc-icon, .nova-cat-icon-wrap, .nova-cash-btn, .nova-coin,
  .nova-bottom-nav, .nova-header, .holo-scan, .portrait-svg {
    will-change:transform; transform:translateZ(0);
  }
  /* Touch action: let browser know we only scroll vertically */
  .nova-app { touch-action:pan-y; }
  .nova-hcat-scroll { touch-action:pan-x; }
  /* Contain paint for isolated sections */
  .nova-game-card, .nova-cat-icon-wrap { contain:layout style paint; }
  /* Smooth momentum for game grid container */
  .nova-game-area { overscroll-behavior-y:contain; }
  /* Reduce layout shift during scroll */
  .nova-cat-btn { contain:layout style; }
  /* Orb drift animations (smooth, low CPU) */
  @keyframes orb-drift1 { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(12px,-18px) scale(1.08);} }
  @keyframes orb-drift2 { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-14px,16px) scale(1.06);} }
  @keyframes orb-drift3 { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(10px,-12px) scale(1.1);} }
  /* Banner swipe — high FPS with cubic-bezier */
  .nova-banner-track { transition:transform 0.38s cubic-bezier(0.22,0.61,0.36,1); will-change:transform; transform:translateZ(0); }
  /* Active nav item glow */
  .nova-nav-active svg { filter:drop-shadow(0 0 5px rgba(34,197,94,0.7)); }
  /* Color boost — green glow on active cat bar */

  /* Bottom nav item press — opacity only, no layout shift */
  /* Colorful header logo pulse */
  .nova-logo { animation:logo-pulse 4s ease-in-out infinite; }
  @keyframes logo-pulse { 0%,100%{box-shadow:0 0 18px rgba(34,197,94,0.45);}50%{box-shadow:0 0 28px rgba(34,197,94,0.7), 0 0 48px rgba(34,197,94,0.2);} }
  /* Marquee bar color accent */
  .nova-marquee-bar { background:rgba(45,51,117,0.92) !important; border-top:1px solid rgba(34,197,94,0.1) !important; border-bottom:1px solid rgba(34,197,94,0.1) !important; }

  /* ══ AI BRAIN AGENT BUTTON — elevated floating ══ */
  .nova-agent-inactive { color: rgba(255,255,255,0.45); }
  .nova-agent-active   { color: #f59e0b; }
  .nova-brain-wrap {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle at 42% 38%, rgba(245,158,11,0.14) 0%, rgba(5,8,20,0.98) 65%);
    border: 1.5px solid rgba(245,158,11,0.55);
    box-shadow:
      0 0 0 3px rgba(45,51,117,0.75),
      0 0 18px rgba(245,158,11,0.42),
      0 0 38px rgba(245,158,11,0.16),
      0 -8px 22px rgba(0,0,0,0.75);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto;
    margin-top: -20px;
    animation: bwrap-pulse 3s ease-in-out infinite;
  }
  @keyframes bwrap-pulse {
    0%,100% { box-shadow: 0 0 0 3px rgba(45,51,117,0.75), 0 0 16px rgba(245,158,11,0.38), 0 0 32px rgba(245,158,11,0.12), 0 -8px 22px rgba(0,0,0,0.75); }
    50%      { box-shadow: 0 0 0 3px rgba(45,51,117,0.75), 0 0 28px rgba(245,158,11,0.62), 0 0 54px rgba(245,158,11,0.24), 0 -8px 22px rgba(0,0,0,0.75); }
  }
  /* Neural tendril flow — signal moving outward */
  .nb-tdl { animation: tdl-flow 1.8s linear infinite; }
  @keyframes tdl-flow {
    0%   { stroke-dashoffset: 16; opacity: 0.65; }
    50%  { opacity: 1; }
    100% { stroke-dashoffset: 0;  opacity: 0.65; }
  }
  /* Energy nodes — staggered pulse per node */
  .nb-node-1,.nb-node-2,.nb-node-3,.nb-node-4,.nb-node-5 {
    transform-box: fill-box; transform-origin: center;
  }
  .nb-node-1 { animation: nb-node 2s ease-in-out infinite 0s;    }
  .nb-node-2 { animation: nb-node 2s ease-in-out infinite 0.4s;  }
  .nb-node-3 { animation: nb-node 2s ease-in-out infinite 0.8s;  }
  .nb-node-4 { animation: nb-node 2s ease-in-out infinite 1.2s;  }
  .nb-node-5 { animation: nb-node 2s ease-in-out infinite 1.6s;  }
  @keyframes nb-node {
    0%, 100% { opacity: 0.6;  transform: scale(0.8);  }
    50%       { opacity: 1;    transform: scale(1.3);  }
  }
</style>
