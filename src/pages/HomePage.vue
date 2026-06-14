<template>
    <div class="nova-app">

      <!-- ══ BACKGROUND ORBS ══ -->
      <div class="nova-bg-orb nova-bg-orb--1"></div>
      <div class="nova-bg-orb nova-bg-orb--2"></div>
      <div class="nova-bg-orb nova-bg-orb--3"></div>

      <!-- ══ HEADER ══ -->
      <header class="nova-header">
        <div class="nova-brand-wrap">
          <div class="nova-brand"><img src="https://ik.imagekit.io/rbok01qam/Brand%20Logo%20/IMG_20260605_215459.png?tr=f-auto" alt="NovaBett" style="height:34px;width:auto;object-fit:contain;display:block;" /></div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <template v-if="!isLoggedIn">
            <button @click="openAuth('login')" class="glass-btn-auth" style="height:32px;padding:0 12px;font-size:11px;">လောဂ်အင်</button>
            <button @click="openAuth('register')" class="glass-btn-auth glass-btn-auth--primary" style="height:32px;padding:0 12px;font-size:11px;">မှတ်ပုံတင်ပါ</button>
          </template>
          <template v-else>
            <button @click="toggleLanguage" class="glass-btn-sm" style="color:rgba(34,197,94,0.9);font-size:11px;font-weight:700;padding:5px 10px;">{{ currentLang === 'en' ? '🇲🇲 မြန်မာ' : '🇬🇧 EN' }}</button>
          </template>
        </div>
      </header>

      <!-- Search -->
      <div class="nova-search-bar">
        <input v-model="searchQuery" type="text" placeholder="ဂိမ်းရှာပါ..." class="nova-input" style="padding-left:36px;" />
        <svg style="position:absolute;left:26px;top:50%;transform:translateY(-50%);" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <button @click="activeCategory='fav'" style="position:absolute;right:26px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:2px;-webkit-tap-highlight-color:transparent;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" :fill="activeCategory==='fav'?'#fbbf24':'none'" :stroke="activeCategory==='fav'?'#fbbf24':'rgba(255,255,255,0.45)'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>

      <!-- ══ BANNER ══ -->
      <div style="position:relative;overflow:hidden;aspect-ratio:2.2/1;background:#0c0e2a;">
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
            :style="i===bannerIdx?'width:20px;height:4px;background:#14b8a6;border-radius:2px;':'width:4px;height:4px;background:rgba(255,255,255,0.28);border-radius:50%;'"
            style="transition:all 0.3s;cursor:pointer;"></div>
        </div>
      </div>

      <!-- ══ MARQUEE ══ -->
      <div class="nova-marquee-bar" style="display:flex;align-items:center;background:rgba(6,8,24,0.96);border-top:1px solid rgba(20,184,166,0.2);border-bottom:1px solid rgba(20,184,166,0.2);padding:7px 12px;gap:8px;overflow:hidden;">
        <!-- Volume icon -->
        <div style="flex-shrink:0;cursor:pointer;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(20,184,166,0.85)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
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

      <!-- ══ ACTION ROW (pre-login) ══ -->
      <div v-if="!isLoggedIn" style="padding:8px 14px;display:flex;align-items:center;justify-content:flex-end;gap:8px;">
        <div style="flex:0;">
          <!-- Deposit icon -->
          <div @click="goUrl(depositUrl)" class="nova-quick-icon nova-quick-icon--framed">
            <div class="nova-quick-frame">
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="13" rx="2.5" fill="rgba(20,184,166,0.12)" stroke="rgba(20,184,166,0.7)" stroke-width="1.4"/>
                <path d="M2 10h20" stroke="rgba(20,184,166,0.7)" stroke-width="1.4"/>
                <path d="M6 14h4" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="18" cy="4" r="2.2" fill="rgba(20,184,166,0.9)">
                  <animate attributeName="cy" values="2;6;6;2" dur="1.6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;1;0;1" dur="1.6s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <span>ငွေသွင်းရန်</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <!-- Withdraw icon -->
          <div @click="goUrl(withdrawUrl)" class="nova-quick-icon nova-quick-icon--framed">
            <div class="nova-quick-frame">
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="13" rx="2.5" fill="rgba(20,184,166,0.08)" stroke="rgba(20,184,166,0.6)" stroke-width="1.4"/>
                <path d="M2 10h20" stroke="rgba(20,184,166,0.6)" stroke-width="1.4"/>
                <path d="M12 19v-6" stroke="rgba(20,184,166,0.85)" stroke-width="1.6" stroke-linecap="round">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
                </path>
                <path d="M9.5 15.5l2.5-2.5 2.5 2.5" stroke="rgba(20,184,166,0.85)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
            <span>ငွေထုတ်ရန်</span>
          </div>
          <!-- VIP -->
          <div class="nova-quick-icon" @click="goUrl(vipUrl)">
            <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <line x1="16" y1="2" x2="16" y2="7" stroke="rgba(20,184,166,0.8)" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="16" cy="2" r="1.5" fill="rgba(20,184,166,0.9)">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite"/>
              </circle>
              <rect x="3" y="12" width="3.5" height="6" rx="1.5" fill="rgba(20,184,166,0.5)" stroke="rgba(20,184,166,0.7)" stroke-width="0.8"/>
              <rect x="25.5" y="12" width="3.5" height="6" rx="1.5" fill="rgba(20,184,166,0.5)" stroke="rgba(20,184,166,0.7)" stroke-width="0.8"/>
              <rect x="6.5" y="7" width="19" height="18" rx="4" fill="rgba(15,30,20,0.95)" stroke="rgba(20,184,166,0.75)" stroke-width="1.2"/>
              <rect x="8.5" y="9.5" width="15" height="9" rx="2.5" fill="rgba(20,184,166,0.08)" stroke="rgba(20,184,166,0.35)" stroke-width="0.7"/>
              <rect x="10" y="11.5" width="5" height="5" rx="1.5" fill="rgba(20,184,166,0.15)" stroke="rgba(20,184,166,0.8)" stroke-width="0.8"/>
              <rect x="11.2" y="12.7" width="2.6" height="2.6" rx="0.8" fill="rgba(20,184,166,0.95)">
                <animate attributeName="fill-opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
              </rect>
              <rect x="17" y="11.5" width="5" height="5" rx="1.5" fill="rgba(20,184,166,0.15)" stroke="rgba(20,184,166,0.8)" stroke-width="0.8"/>
              <rect x="18.2" y="12.7" width="2.6" height="2.6" rx="0.8" fill="rgba(20,184,166,0.95)">
                <animate attributeName="fill-opacity" values="1;0.5;1" dur="1.5s" begin="0.4s" repeatCount="indefinite"/>
              </rect>
              <rect x="11" y="21" width="10" height="2" rx="1" fill="rgba(20,184,166,0.25)"/>
              <rect x="13" y="21" width="3" height="2" rx="1" fill="rgba(20,184,166,0.8)">
                <animate attributeName="width" values="3;7;3" dur="1.8s" repeatCount="indefinite"/>
              </rect>
            </svg>
            <span style="color:rgba(20,184,166,0.9);">VIP</span>
          </div>
          <!-- Install -->
          <div class="nova-quick-icon" @click="handleInstallClick">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="3" x2="12" y2="15" stroke="rgba(20,184,166,0.85)" stroke-width="2" stroke-linecap="round">
                <animate attributeName="opacity" values="1;0.35;1" dur="1.1s" repeatCount="indefinite"/>
              </line>
              <path d="M7.5 11l4.5 5 4.5-5" fill="none" stroke="rgba(20,184,166,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <animate attributeName="transform" attributeType="XML" type="translate" values="0,0;0,2;0,0" dur="1.1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.4;1" dur="1.1s" repeatCount="indefinite"/>
              </path>
              <line x1="6" y1="20" x2="18" y2="20" stroke="rgba(20,184,166,0.6)" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            <span>တပ်ဆင်မည်</span>
          </div>
        </div>
      </div>

      <!-- ══ ACTION ROW (logged-in) ══ -->
      <div v-if="isLoggedIn" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;background:rgba(20,184,166,0.04);border-bottom:1px solid rgba(20,184,166,0.08);">
        <!-- LEFT: Avatar + info -->
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <span style="font-size:15px;line-height:1;filter:drop-shadow(0 1px 4px rgba(0,0,0,0.6));">🇲🇲</span>
            <NftAvatar :username="username" :size="38" />
          </div>
          <div>
            <div style="font-size:11px;font-weight:700;color:#14b8a6;margin-bottom:3px;letter-spacing:0.04em;text-shadow:0 0 8px rgba(20,184,166,0.6);">{{ username }}</div>
            <div style="display:flex;align-items:center;gap:4px;">
              <div class="nova-balance-val">
                <span :style="{fontSize:balanceFontSize,fontWeight:900,color:'#14b8a6',fontVariantNumeric:'tabular-nums',transition:'font-size 0.2s',lineHeight:1.1}">{{ balanceHidden ? '••••••' : formatCurrency(mainBalance) }}</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.3);margin-left:3px;flex-shrink:0;">MMK</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex-shrink:0;">
                <button @click="toggleBalanceHide" class="nova-eye-btn">
                  <svg v-if="!balanceHidden" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
                <button @click="refreshBalance" :class="['nova-refresh-btn', { 'nova-refresh-btn--spinning': balanceRefreshing }]" :disabled="balanceRefreshing">
                  <span class="nova-refresh-ring"></span>
                  <svg class="nova-refresh-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- RIGHT: shortcut buttons -->
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;">
          <div style="display:flex;gap:3px;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="showDepositModal=true">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;border:1.5px solid rgba(20,184,166,0.55);background:rgba(20,184,166,0.06);box-shadow:0 0 6px rgba(20,184,166,0.15);animation-delay:0s;overflow:hidden;display:flex;align-items:center;justify-content:center;"><img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-27-327_mark.via.gp_1780510112167edit.jpg?tr=f-auto" style="width:100%;height:100%;object-fit:cover;" @error="e=>e.target.style.display='none'"/></div>
              <span style="font-size:8px;color:rgba(255,255,255,0.6);font-weight:600;">KPay</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="showDepositModal=true">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;border:1.5px solid rgba(20,184,166,0.55);background:rgba(20,184,166,0.06);box-shadow:0 0 6px rgba(20,184,166,0.15);animation-delay:0.3s;overflow:hidden;display:flex;align-items:center;justify-content:center;"><img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-34-166_mark.via.gp_1780510124725edit.jpg?tr=f-auto" style="width:100%;height:100%;object-fit:cover;" @error="e=>e.target.style.display='none'"/></div>
              <span style="font-size:8px;color:rgba(255,255,255,0.6);font-weight:600;">Wave</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="showDepositModal=true">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;border:1.5px solid rgba(20,184,166,0.55);background:rgba(20,184,166,0.06);box-shadow:0 0 6px rgba(20,184,166,0.15);animation-delay:0.6s;overflow:hidden;display:flex;align-items:center;justify-content:center;"><img src="https://ik.imagekit.io/0xfxtkccz/Uab/1781076796857.png?tr=f-auto" style="width:100%;height:100%;object-fit:cover;" @error="e=>e.target.style.display='none'"/></div>
              <span style="font-size:8px;color:rgba(255,255,255,0.6);font-weight:600;">UAB</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="$router.push('/vip')">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,rgba(245,158,11,0.22),rgba(217,119,6,0.12));border:1.5px solid rgba(251,191,36,0.6);box-shadow:0 0 8px rgba(251,191,36,0.25);display:flex;align-items:center;justify-content:center;animation-delay:0.9s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 17h20l-2-9-5 5-3-7-3 7-5-5-2 9z" fill="url(#vg2)" stroke="#f59e0b" stroke-width="0.5"/><defs><linearGradient id="vg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#d97706"/></linearGradient></defs><circle cx="12" cy="8" r="1.5" fill="#fef3c7"/><circle cx="2.5" cy="8.5" r="1" fill="#fef3c7"/><circle cx="21.5" cy="8.5" r="1" fill="#fef3c7"/></svg>
              </div>
              <span style="font-size:8px;color:#fbbf24;font-weight:600;text-shadow:0 0 5px rgba(251,191,36,0.4);">VIP</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,rgba(20,184,166,0.15),rgba(16,185,129,0.08));border:1.5px solid rgba(20,184,166,0.55);box-shadow:0 0 8px rgba(20,184,166,0.2);display:flex;align-items:center;justify-content:center;animation-delay:1.2s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="16" height="12" rx="3" fill="#0f2a1a" stroke="#14b8a6" stroke-width="1.2"/><rect x="7" y="4" width="10" height="5" rx="2" fill="#0f2a1a" stroke="#14b8a6" stroke-width="1"/><line x1="12" y1="4" x2="12" y2="2" stroke="#14b8a6" stroke-width="1.2" stroke-linecap="round"/><circle cx="12" cy="2" r="1" fill="#14b8a6"/><circle cx="9" cy="13" r="1.8" fill="#14b8a6" opacity="0.9"/><circle cx="15" cy="13" r="1.8" fill="#14b8a6" opacity="0.9"/><rect x="8" y="17" width="8" height="1.5" rx="0.75" fill="#14b8a6" opacity="0.6"/></svg>
              </div>
              <span style="font-size:8px;color:#14b8a6;font-weight:600;text-shadow:0 0 5px rgba(20,184,166,0.3);">Bot</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;" @click="handleInstallClick">
              <div class="qsc-icon" style="width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,rgba(34,211,238,0.15),rgba(6,182,212,0.08));border:1.5px solid rgba(34,211,238,0.55);box-shadow:0 0 8px rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;animation-delay:1.5s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" fill="#061828" stroke="#22d3ee" stroke-width="1.2"/><path d="M12 7v7" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round"/><path d="M8.5 11l3.5 4 3.5-4" stroke="#22d3ee" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><line x1="7" y1="18" x2="17" y2="18" stroke="#22d3ee" stroke-width="1.4" stroke-linecap="round"/></svg>
              </div>
              <span style="font-size:8px;color:#22d3ee;font-weight:600;text-shadow:0 0 5px rgba(34,211,238,0.3);">ဒေါင်း</span>
            </div>
          </div>
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
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style="flex-shrink:0;"><path d="M12 17V7" stroke="rgba(20,184,166,0.9)" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite"/></path><path d="M8 11l4-4 4 4" stroke="rgba(20,184,166,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite"/></path><rect x="4" y="18" width="16" height="2" rx="1" fill="rgba(20,184,166,0.5)"/></svg>
              ငွေထုတ်
            </button>
          </div>
        </div>
      </div>

      <!-- ══ RECENTLY PLAYED (logged-in users only) ══ -->
      <div v-if="isLoggedIn && recentGames.length > 0" class="nova-recent-section">
        <div class="nova-recent-header">
          <span class="nova-recent-title">
            <svg width="13" height="13" fill="none" stroke="rgba(251,191,36,0.9)" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v5l3 3"/></svg>
            မကြာမီ ကစားခဲ့သော
          </span>
          <button @click="activeCategory='recent'" class="nova-recent-more">အားလုံး »</button>
        </div>
        <div class="nova-recent-scroll">
          <div v-for="game in recentGames" :key="'r-' + game.id"
               class="nova-recent-card" @click="openGame(game)">
            <div class="nova-recent-img-wrap">
              <img :src="game.image_url" alt="" loading="lazy"
                   @error="e=>e.target.style.display='none'"
                   class="nova-recent-img"/>
              <div class="nova-recent-overlay"></div>
            </div>
            <div class="nova-recent-name">{{ game.game_name }}</div>
          </div>
        </div>
      </div>

      <!-- ══ CATEGORY BAR + GAME GRID ══ -->
      <div style="display:flex;flex-direction:column;" class="nova-game-area">

        <!-- HOT GAMES SECTION HEADER -->
        <div class="nova-hot-header">
          <span class="nova-hot-icon">🔥</span>
          <span class="nova-hot-title">ဟော်ကိမ်းများ</span>
        </div>

        <!-- HORIZONTAL CATEGORY BAR: first tab pinned, rest scrollable -->
        <div class="nova-hcat-wrapper">
          <!-- ① Pinned first tab -->
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
          <!-- ② Scrollable remaining tabs -->
          <div class="nova-hcat-scroll">
            <div class="nova-hcat-bar">
              <button v-for="cat in categories.slice(1)" :key="cat.id"
                @click="handleCatTabClick(cat.id)"
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

        <!-- GAME GRID -->
        <div style="flex:1;min-width:0;padding:8px;overflow:hidden;">
          <div v-if="loadingGames" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
            <div v-for="n in 9" :key="n" style="border-radius:12px;aspect-ratio:3/4;background:rgba(255,255,255,0.04);animation:nova-pulse 1.5s ease-in-out infinite;"></div>
          </div>
          <div v-else-if="fetchError" style="text-align:center;padding:30px 0;">
            <p style="color:rgba(255,100,100,0.8);font-size:12px;margin-bottom:10px;">{{ fetchError }}</p>
            <button @click="fetchGames" class="glass-btn-sm" style="color:#14b8a6;padding:6px 14px;">Retry</button>
          </div>
          <div v-else-if="displayedGames.length===0" style="text-align:center;padding:30px 0;">
            <p style="color:rgba(255,255,255,0.22);font-size:12px;">ဂိမ်းမတွေ့ပါ</p>
          </div>
          <div v-else :key="'pg-' + carouselPage" :data-dir="carouselDir" class="nova-pg-anim" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;" @touchstart="onCarouselTouchStart" @touchend="onCarouselTouchEnd">
            <div v-for="(game,idx) in displayedGames" :key="game.id"
              class="nova-game-card" @click="openGame(game)">
              <div style="position:relative;aspect-ratio:3/4;overflow:hidden;background:#0e1030;">
                <img :src="game.image_url" alt="" @error="e=>e.target.style.display='none'" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy"/>
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(6,8,18,0.85) 0%,rgba(6,8,18,0.2) 40%,transparent 100%);"></div>
                <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/ddca62d0-6422-11f1-aded-3d7319f38cf3.gif?tr=f-auto" style="position:absolute;top:4px;right:4px;width:20px;height:20px;object-fit:contain;z-index:10;pointer-events:none;" alt=""/>
                <div v-if="idx%5<2" class="nova-badge nova-badge--hot">HOT</div>
                <div class="nova-badge nova-badge--provider">{{ game.provider_code?.toUpperCase() }}</div>
                <!-- Star bookmark button -->
                <button @click.stop="toggleFav(game.game_code)" :class="['nova-fav-btn', isFav(game.game_code)?'nova-fav-btn--on':'']">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" :fill="isFav(game.game_code)?'#fbbf24':'none'" :stroke="isFav(game.game_code)?'#fbbf24':'rgba(255,255,255,0.7)'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <div style="position:absolute;bottom:0;left:0;right:0;padding:4px 5px 5px;">
                  <div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.9);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.3;">{{ game.game_name }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Pagination dots -->
          <div v-if="activeCategory==='popular' && !loadingGames && carouselPages.length > 0" class="nova-carousel-footer">
            <div class="nova-carousel-dots">
              <button v-for="(_, di) in carouselPages" :key="di"
                class="nova-carousel-dot"
                :class="di === carouselPage ? 'nova-carousel-dot--active' : ''"
                @click="setCarouselPage(di)">
              </button>
            </div>
            <button class="nova-carousel-all-btn" @click="openCatPanel('hot')">
              အားလုံး <span style="font-size:13px;">»</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ══ 777 SLOT PROVIDERS ══ -->
      <div class="nova-prov-section" id="slot-section">
        <div class="nova-prov-header">
          <svg width="24" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="20" rx="3" fill="url(#pg1)"/>
            <rect x="17" width="14" height="20" rx="3" fill="url(#pg2)"/>
            <rect x="34" width="14" height="20" rx="3" fill="url(#pg3)"/>
            <text x="3.5" y="14.5" font-family="Arial Black,sans-serif" font-size="12" font-weight="900" fill="#1a1c4e">7</text>
            <text x="20.5" y="14.5" font-family="Arial Black,sans-serif" font-size="12" font-weight="900" fill="#1a1c4e">7</text>
            <text x="37.5" y="14.5" font-family="Arial Black,sans-serif" font-size="12" font-weight="900" fill="#1a1c4e">7</text>
            <defs>
              <linearGradient id="pg1" x1="0" y1="0" x2="14" y2="20" gradientUnits="userSpaceOnUse"><stop stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b"/></linearGradient>
              <linearGradient id="pg2" x1="0" y1="0" x2="14" y2="20" gradientUnits="userSpaceOnUse"><stop stop-color="#fef3c7"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>
              <linearGradient id="pg3" x1="0" y1="0" x2="14" y2="20" gradientUnits="userSpaceOnUse"><stop stop-color="#fde68a"/><stop offset="1" stop-color="#d97706"/></linearGradient>
            </defs>
          </svg>
          <span class="nova-prov-title">စလော့ ဂိမ်း</span>
        </div>
        <div class="nova-prov-row3">
          <button class="nova-prov-card nova-prov-card--pg" @click="openProvPanel('pg')">
            <img src="https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/3b38cced-f446-4727-ab37-879557be37cb.png?tr=f-auto" class="nova-prov-img" alt="PG"/>
            <div class="nova-prov-info">
              <span class="nova-prov-name">PG Soft</span>
              <span class="nova-prov-sub">{{ games.filter(g=>g.provider_code==='pg').length }} ဂိမ်း</span>
            </div>
          </button>
          <button class="nova-prov-card nova-prov-card--pp" @click="openProvPanel('pp')">
            <img src="https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/a04d3bed-f475-42eb-9f35-4f9802068315.png?tr=f-auto" class="nova-prov-img" alt="PP"/>
            <div class="nova-prov-info">
              <span class="nova-prov-name">Pragmatic</span>
              <span class="nova-prov-sub">{{ games.filter(g=>g.provider_code==='pp').length }} ဂိမ်း</span>
            </div>
          </button>
          <button class="nova-prov-card nova-prov-card--jdb" @click="openProvPanel('jdb')">
            <img src="https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/f519ade7-dd80-4235-a650-3d8744d5795c.png?tr=f-auto" class="nova-prov-img" alt="JDB"/>
            <div class="nova-prov-info">
              <span class="nova-prov-name">JDB</span>
              <span class="nova-prov-sub">{{ games.filter(g=>g.provider_code==='jdb').length }} ဂိမ်း</span>
            </div>
          </button>
        </div>
        <div class="nova-prov-row1" style="margin-top:10px;">
          <button class="nova-prov-card nova-prov-card--jili nova-prov-card--wide" @click="openProvPanel('jili')">
            <img src="https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/40_N_JILI_LOGO.avif" class="nova-prov-img nova-prov-img--wide" alt="JILI"/>
            <div class="nova-prov-info">
              <span class="nova-prov-name">JILI Gaming</span>
              <span class="nova-prov-sub">{{ games.filter(g=>g.provider_code==='jili').length }} ဂိမ်း · Myanmar မှ ကြိုက်နှစ်သက်</span>
            </div>
          </button>
        </div>
      </div>

      <!-- ══ FISH GAMES ══ -->
      <div class="nova-fish-section" id="fish-section">
        <div class="nova-fish-header">
          <img src="https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-02-57-533_mark.via.gp_1780511863896edit.jpg?tr=f-auto"
            style="width:26px;height:26px;object-fit:cover;border-radius:6px;flex-shrink:0;"
            @error="e=>e.target.style.display='none'" alt="ငါးဖမ်း" />
          <span class="nova-fish-title">ငါးဖမ်း ဂိမ်းများ</span>
          <span class="nova-fish-count">{{ fishGames.length }} ဂိမ်း</span>
        </div>
        <div class="nova-fish-grid">
          <div v-for="game in fishGames" :key="game.id"
            class="nova-game-card" @click="openGame(game)">
            <div style="position:relative;aspect-ratio:3/4;overflow:hidden;background:#0c2a3a;">
              <img :src="game.image_url" alt="" @error="e=>e.target.style.display='none'"
                style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy"/>
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(4,16,32,0.82) 0%,rgba(4,16,32,0.12) 40%,transparent 100%);"></div>
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/ddca62d0-6422-11f1-aded-3d7319f38cf3.gif?tr=f-auto" style="position:absolute;top:4px;right:4px;width:20px;height:20px;object-fit:contain;z-index:10;pointer-events:none;" alt=""/>
              <div class="nova-badge nova-badge--provider">{{ game.provider_code?.toUpperCase() }}</div>
              <div style="position:absolute;bottom:0;left:0;right:0;padding:4px 5px 5px;">
                <div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.9);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.3;">{{ game.game_name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;padding:8px 0 2px;"><button class="nova-carousel-all-btn" @click="openCatPanel('fishing')">အားလုံး <span style="font-size:13px;">»</span></button></div>
      </div>

      <!-- ══ LIVE CASINO + ARCADE ══ -->
      <div class="nova-live-section">
        <div class="nova-live-header">
          <div class="nova-live-icon-wrap">
            <img src="https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-03-25-338_mark.via.gp_1780511848574edit.jpg?tr=f-auto"
              class="nova-live-icon-img"
              @error="e=>{e.target.style.display='none';e.target.nextElementSibling.style.display='flex'}"
              alt="live casino" />
            <span class="nova-live-icon-fallback">🃏</span>
          </div>
          <span class="nova-live-title">Live & Arcade</span>
          <span class="nova-live-count">{{ games.filter(g=>g.category==='live'||g.category==='arcade').length }} ဂိမ်း</span>
        </div>
        <div class="nova-live-row3">
          <div v-for="game in liveGames.slice(0,6)" :key="game.id"
            class="nova-game-card" @click="openGame(game)">
            <div style="position:relative;aspect-ratio:3/4;overflow:hidden;background:#1a0a2e;">
              <img :src="game.image_url" alt="" @error="e=>e.target.style.display='none'"
                style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy"/>
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(20,4,40,0.82) 0%,rgba(20,4,40,0.12) 40%,transparent 100%);"></div>
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/ddca62d0-6422-11f1-aded-3d7319f38cf3.gif?tr=f-auto" style="position:absolute;top:4px;right:4px;width:20px;height:20px;object-fit:contain;z-index:10;pointer-events:none;" alt=""/>
              <div class="nova-badge nova-badge--live">{{ game.category==='live'?'LIVE':'ARC' }}</div>
              <div class="nova-badge nova-badge--provider">{{ game.provider_code?.toUpperCase() }}</div>
              <div style="position:absolute;bottom:0;left:0;right:0;padding:4px 5px 5px;">
                <div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.9);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.3;">{{ game.game_name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="liveGames.length >= 7" style="margin-top:8px;">
          <div class="nova-game-card" @click="openGame(liveGames[6])">
            <div style="position:relative;aspect-ratio:16/7;overflow:hidden;background:#1a0a2e;">
              <img :src="liveGames[6].image_url" alt="" @error="e=>e.target.style.display='none'"
                style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy"/>
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(20,4,40,0.88) 0%,rgba(20,4,40,0.15) 45%,transparent 100%);"></div>
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/ddca62d0-6422-11f1-aded-3d7319f38cf3.gif?tr=f-auto" style="position:absolute;top:4px;right:4px;width:20px;height:20px;object-fit:contain;z-index:10;pointer-events:none;" alt=""/>
              <div class="nova-badge nova-badge--live">{{ liveGames[6].category==='live'?'LIVE':'ARC' }}</div>
              <div class="nova-badge nova-badge--provider">{{ liveGames[6].provider_code?.toUpperCase() }}</div>
              <div style="position:absolute;bottom:0;left:0;right:0;padding:6px 8px 8px;">
                <div style="font-size:11px;font-weight:800;color:rgba(255,255,255,0.95);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ liveGames[6].game_name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;padding:8px 0 2px;"><button class="nova-carousel-all-btn" @click="openCatPanel('live')">အားလုံး <span style="font-size:13px;">»</span></button></div>
      </div>

      <!-- ══ LIVE CASINO + ARCADE BUTTONS ══ -->
      <div class="nova-catbtn-section" id="live-arcade-section">
        <button class="nova-catbtn nova-catbtn--live" @click="openCatPanel('live')">
          <div class="nova-catbtn-img-wrap">
            <img src="https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-03-25-338_mark.via.gp_1780511848574edit.jpg?tr=f-auto"
              class="nova-catbtn-img" alt="Live Casino"
              @error="e=>{e.target.style.display='none';e.target.nextElementSibling.style.display='flex'}" />
            <span class="nova-catbtn-img-fallback">🃏</span>
          </div>
          <div class="nova-catbtn-info">
            <span class="nova-catbtn-name">တိုက်ရိုက် ကာစီနို</span>
            <span class="nova-catbtn-sub">{{ games.filter(g=>g.category==='live').length }} ဂိမ်း</span>
          </div>
        </button>
        <button class="nova-catbtn nova-catbtn--arcade" @click="openCatPanel('arcade')">
          <div class="nova-catbtn-img-wrap">
            <img src="https://ik.imagekit.io/rbok01qam/Cactheory%20imag/6852101165dd4643a1ec3adee41f5913.jpg?tr=f-auto"
              class="nova-catbtn-img" alt="Arcade"
              @error="e=>{e.target.style.display='none';e.target.nextElementSibling.style.display='flex'}" />
            <span class="nova-catbtn-img-fallback">🕹️</span>
          </div>
          <div class="nova-catbtn-info">
            <span class="nova-catbtn-name">Arcade ဂိမ်းများ</span>
            <span class="nova-catbtn-sub">{{ games.filter(g=>g.category==='arcade').length }} ဂိမ်း</span>
          </div>
        </button>
      </div>

      <!-- ══ FOOTER ══ -->
      <div style="padding:0 16px;border-top:1px solid rgba(255,255,255,0.07);margin-top:16px;">
        <div style="padding:20px 0 14px;text-align:center;">
          <p style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:16px;font-weight:600;">ဆက်သွယ်မှုကို ဆက်သွယ်ရန်</p>
          <div style="display:flex;justify-content:center;gap:18px;align-items:center;">
            <img src="https://ik.imagekit.io/tdpebgueq/Agent_Tap_icons/89dc6e632241379c113adf1bb70ecdb3.jpg?tr=f-auto"
              class="nova-contact-img" alt="Viber"
              @error="e=>e.target.style.display='none'"/>
            <img src="https://ik.imagekit.io/tdpebgueq/icons/telegram_logo_QeWRW9-okP.png?tr=f-auto"
              class="nova-contact-img" alt="Telegram"
              @error="e=>e.target.style.display='none'"/>
          </div>
        </div>
        <div style="padding:14px 0;border-top:1px solid rgba(255,255,255,0.05);display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">
          <img v-for="(logo,i) in licenseLogos" :key="i" :src="logo" alt="" loading="lazy"
            style="height:28px;width:auto;object-fit:contain;border-radius:4px;opacity:0.7;"
            @error="e=>e.target.style.display='none'"/>
        </div>
        <p style="text-align:center;font-size:10px;color:rgba(255,255,255,0.18);padding:10px 0 80px;line-height:1.6;">
          © 2026 iW99 · All rights reserved · 18+ Only
        </p>
      </div>

      <!-- ══ MODALS ══ -->
      <Transition name="modal-fade">
        <div v-if="showAuthModal" class="nova-auth-overlay" @click.self="showAuthModal=false">
          <div class="nova-auth-sheet">
            <div class="nova-auth-handle"></div>
            <div class="nova-auth-tabs">
              <button :class="['nova-auth-tab', authTab==='login'?'nova-auth-tab--active':'']" @click="authTab='login'">လောဂ်အင်</button>
              <button :class="['nova-auth-tab', authTab==='register'?'nova-auth-tab--active':'']" @click="authTab='register'">မှတ်ပုံတင်</button>
            </div>
            <!-- Login Form -->
            <div v-if="authTab==='login'" class="nova-auth-form">
              <div class="nova-field-wrap">
                <input v-model="loginUsername" type="text" class="nova-input" placeholder="Username သို့မဟုတ် Phone" autocomplete="username" />
              </div>
              <div class="nova-field-wrap" style="position:relative;">
                <input v-model="loginPassword" :type="loginShowPassword?'text':'password'" class="nova-input" placeholder="Password" autocomplete="current-password" />
                <button @click="loginShowPassword=!loginShowPassword" class="nova-eye-toggle">
                  <svg v-if="loginShowPassword" width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  <svg v-else width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
              <p v-if="loginError" class="nova-form-error">{{ loginError }}</p>
              <button @click="doLogin" :disabled="loginLoading || !loginFormFilled" class="nova-btn-submit">
                <span v-if="loginLoading" class="nova-spinner"></span>
                <span v-else>လောဂ်အင်ဝင်မည်</span>
              </button>
              <p style="text-align:center;font-size:12px;color:rgba(255,255,255,0.4);margin-top:12px;">
                အကောင့်မရှိသေးပါသလား?
                <button @click="authTab='register'" style="background:none;border:none;color:rgba(20,184,166,0.9);cursor:pointer;font-weight:700;font-size:12px;">မှတ်ပုံတင်မည်</button>
              </p>
            </div>
            <!-- Register Form -->
            <div v-if="authTab==='register'" class="nova-auth-form">
              <div class="nova-field-wrap">
                <input v-model="regUsername" type="text" class="nova-input" placeholder="Username (4-20 char)" autocomplete="username" />
              </div>
              <div class="nova-field-wrap">
                <input v-model="regPhone" type="tel" class="nova-input" placeholder="Phone (09xxxxxxxxx)" autocomplete="tel" inputmode="numeric"/>
              </div>
              <div class="nova-field-wrap" style="position:relative;">
                <input v-model="regPassword" :type="regShowPassword?'text':'password'" class="nova-input" placeholder="Password (6+ char)" autocomplete="new-password"/>
                <button @click="regShowPassword=!regShowPassword" class="nova-eye-toggle">
                  <svg v-if="regShowPassword" width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  <svg v-else width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
              <div v-if="regPassword" style="display:flex;gap:3px;padding:0 2px;margin-top:4px;">
                <div v-for="i in 5" :key="i" style="flex:1;height:3px;border-radius:2px;transition:background 0.3s;"
                  :style="{background: i <= pwStrength ? pwColor : 'rgba(255,255,255,0.1)'}"></div>
              </div>
              <div class="nova-field-wrap" style="margin-top:10px;">
                <input v-model="regReferral" type="text" class="nova-input" placeholder="Referral Code (ရှိလျှင်)" />
                <p v-if="refAgentInfo" style="font-size:10px;color:#14b8a6;margin-top:4px;padding-left:2px;">✓ {{ refAgentInfo }}</p>
              </div>
              <p v-if="regError" class="nova-form-error">{{ regError }}</p>
              <button @click="doRegister" :disabled="regLoading || !regFormFilled" class="nova-btn-submit">
                <span v-if="regLoading" class="nova-spinner"></span>
                <span v-else>အကောင့်ဖွင့်မည်</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Inbox Modal -->
      <Transition name="inbox-slide">
        <div v-if="showInbox" class="nova-inbox-overlay" @click.self="showInbox=false">
          <div class="nova-inbox-sheet">
            <div class="nova-inbox-handle"></div>
            <div class="nova-inbox-header">
              <span style="font-size:14px;font-weight:700;color:#fff;">📬 Inbox</span>
              <button @click="showInbox=false" style="background:none;border:none;color:rgba(255,255,255,0.5);cursor:pointer;font-size:20px;line-height:1;">×</button>
            </div>
            <div v-if="adminMessages.length===0" class="nova-inbox-empty">
              <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="M2 8l10 7 10-7"/></svg>
              <p style="color:rgba(255,255,255,0.25);font-size:13px;margin-top:12px;">မက်ဆေ့ဂျ်မရှိပါ</p>
            </div>
            <div v-for="msg in adminMessages" :key="msg.id" class="nova-inbox-item">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <span class="nova-inbox-item-title">{{ msg.title }}</span>
                <span class="nova-inbox-item-time">{{ new Date(msg.created_at).toLocaleDateString('my') }}</span>
              </div>
              <p class="nova-inbox-item-body">{{ msg.body }}</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Deposit / Withdraw modals -->
      <DepositModal v-if="showDepositModal" @close="showDepositModal=false" :username="username" />
      <WithdrawModal v-if="showWithdrawModal" @close="showWithdrawModal=false" :username="username" :balance="mainBalance" />
      <SpinWheelModal v-if="showSpinWheel" @close="showSpinWheel=false" :username="username" />

      <!-- Provider/Category Panel overlays -->
      <ProviderGamePanel v-if="activeProvPanel" :provider="activeProvPanel" :games="games" @close="activeProvPanel=null" @open-game="openGame" />
      <CategoryGamePanel v-if="activeCatPanel" :category="activeCatPanel" :games="games" @close="activeCatPanel=null" @open-game="openGame" />

      <!-- TxStatusTracker (logged in only) -->
      <TxStatusTracker v-if="isLoggedIn" :username="username" />

      <!-- FAB stack right side -->
      <Teleport to="body">
        <div class="nova-fab-stack" v-if="!isLoggedIn || true">
          <button class="nova-fab nova-fab--wheel" @click="showSpinWheel=true" v-if="isLoggedIn">
            <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/3ad58290-642f-11f1-aded-3d7319f38cf3.gif?tr=f-auto" class="nova-fab-img" alt="Spin"/>
          </button>
          <button class="nova-fab nova-fab--cs" @click="openCustomerService">
            <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/2b5f5dc0-6422-11f1-a3e1-aff0ca16f106.gif?tr=f-auto" class="nova-fab-img" alt="CS"/>
          </button>
          <button class="nova-fab nova-fab--payment" @click="showDepositModal=true" v-if="isLoggedIn">
            <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/payment_fab_1781087400547.gif?tr=f-auto" class="nova-fab-img" alt="Pay"/>
          </button>
        </div>
        <!-- Left side FAB (notification/close banner) -->
        <div class="nova-fab-stack-left" v-if="showPwaBanner || showIosInstallModal || showAndroidInstallModal">
          <button class="nova-fab nova-fab--left" @click="showPwaBanner=false;showIosInstallModal=false;showAndroidInstallModal=false;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </Teleport>

      <!-- PWA Install modals -->
      <Transition name="modal-fade">
        <div v-if="showIosInstallModal" class="nova-auth-overlay" @click.self="showIosInstallModal=false">
          <div class="nova-auth-sheet" style="padding-bottom:32px;">
            <div class="nova-auth-handle"></div>
            <div style="padding:20px 20px 0;text-align:center;">
              <p style="font-size:15px;font-weight:800;color:#fff;margin-bottom:8px;">📱 iPhone/iPad တပ်ဆင်ရန်</p>
              <p style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;">
                Safari မှ <strong style="color:#14b8a6;">Share</strong> ခလုတ် နှိပ်ပြီး
                <strong style="color:#14b8a6;">"Add to Home Screen"</strong> ကို ရွေးပါ
              </p>
              <div style="margin-top:16px;padding:12px;background:rgba(20,184,166,0.08);border:1px solid rgba(20,184,166,0.25);border-radius:12px;">
                <p style="font-size:11px;color:rgba(255,255,255,0.4);">
                  Share icon → Add to Home Screen → Add
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <Transition name="modal-fade">
        <div v-if="showAndroidInstallModal" class="nova-auth-overlay" @click.self="showAndroidInstallModal=false">
          <div class="nova-auth-sheet" style="padding-bottom:32px;">
            <div class="nova-auth-handle"></div>
            <div style="padding:20px 20px 0;text-align:center;">
              <p style="font-size:15px;font-weight:800;color:#fff;margin-bottom:8px;">📲 Android တပ်ဆင်ရန်</p>
              <p style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;">
                Browser menu (⋮) မှ <strong style="color:#14b8a6;">"Add to Home Screen"</strong> ကို ရွေးပါ
              </p>
              <div style="margin-top:16px;padding:12px;background:rgba(20,184,166,0.08);border:1px solid rgba(20,184,166,0.25);border-radius:12px;">
                <p style="font-size:11px;color:rgba(255,255,255,0.4);">
                  Chrome menu → Add to Home Screen → Install
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </template>