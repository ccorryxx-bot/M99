<template>
  <div class="nova-acc-root">

    <!-- ══ HEADER ══ -->
    <header class="nova-acc-header">
      <button @click="$router.back()" class="nova-icon-btn">
        <svg class="w-5 h-5" fill="none" stroke="rgba(255,255,255,0.85)" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="flex items-center gap-2">
        <button class="nova-icon-btn">
          <svg class="w-4 h-4" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </button>
        <button class="nova-icon-btn relative">
          <svg class="w-4 h-4" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span class="notif-dot">3</span>
        </button>
      </div>
    </header>

    <div class="nova-acc-body">

      <!-- ══ PROFILE SECTION ══ -->
      <div class="profile-section">
        <div class="profile-row">
          <div class="avatar-wrap" @click="showProfileModal = true">
            <div class="avatar-img-wrap">
              <img :src="selectedAvatar" class="avatar-img" alt="avatar" />
              <div class="avatar-edit-badge">
                <svg width="10" height="10" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
              </div>
            </div>
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
        </div>
        <div class="balance-area">
          <div class="flex flex-col items-center gap-1">
            <div class="flex items-center gap-1">
              <span class="balance-flag">🇲🇲</span>
              <span class="balance-amount">{{ formatBalance(mainBalance) }}</span>
            </div>
            <button @click="fetchWallet" class="refresh-btn" :class="{ 'refreshing': refreshing }">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="refresh-svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.35"/>
                <path d="M12 5C8.13 5 5 8.13 5 12s3.13 7 7 7c2.76 0 5.16-1.59 6.34-3.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M17 7.5l1.5 3.5-3.5 0.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="2.2" fill="currentColor" opacity="0.9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ══ ACTION BUTTONS ══ -->
      <div class="action-menu-block">
        <button @click="$router.push('/home')" class="action-menu-row">
          <div class="action-menu-icon">
            <svg width="19" height="19" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="14" width="20" height="7" rx="2"/>
              <path d="M12 2v10m0 0l-3.5-3.5M12 12l3.5-3.5"/>
              <path d="M6 14v-2a1 1 0 011-1h10a1 1 0 011 1v2" opacity="0.35"/>
            </svg>
          </div>
          <span class="action-menu-lbl">ငွေထုတ်ရန်</span>
          <svg class="m-arr" fill="none" stroke="rgba(255,255,255,0.45)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="$router.push('/home')" class="action-menu-row">
          <div class="action-menu-icon">
            <svg width="19" height="19" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="14" width="20" height="7" rx="2"/>
              <path d="M12 12V2m0 0L8.5 5.5M12 2l3.5 3.5"/>
              <path d="M6 14v-2a1 1 0 011-1h10a1 1 0 011 1v2" opacity="0.35"/>
            </svg>
          </div>
          <span class="action-menu-lbl">ငွေသွင်းရန်</span>
          <svg class="m-arr" fill="none" stroke="rgba(255,255,255,0.45)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- ══ VIP CARD ══ -->
      <div class="vip-card">
        <div class="vip-shimmer"></div>
        <div class="vip-top-row">
          <div class="vip-lvl-badge"><span class="vip-badge-txt">VIP{{ vipLevel }}</span></div>
          <div class="flex-1 min-w-0 pl-2">
            <div class="flex flex-wrap items-baseline gap-x-1">
              <span class="vip-top-label">လက်ကျန် </span>
              <span class="vip-top-accent">VIP{{ nextLevel }}</span>
              <span class="vip-top-label"> အားပြန်သင့်ရန် </span>
              <span class="vip-top-bold">{{ formatCurrency(nextLevelTarget) }}</span>
              <span class="vip-top-label"> လောင်းကြေးအတွက် </span>
              <span class="vip-top-bold">{{ formatCurrency(nextLevelMaxDeposit) }}</span>
            </div>
          </div>
          <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" viewBox="0 0 24 24" class="flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <div class="vip-divider"></div>
        <div class="vip-prog-wrap">
          <div class="vip-prog-row">
            <div class="vip-coin-badge"><span style="font-size:11px;font-weight:900;color:#fbbf24;">{{ vipLevel }}</span></div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <span class="vip-prog-lbl">ပရိမိုးရှင်းအတွက် အားပြန်သင့်ဗုဒ္ဓ</span>
                <span class="vip-prog-val">{{ formatCurrency(deposited) }}/ {{ formatCurrency(nextLevelTarget) }}</span>
              </div>
              <div class="vip-bar-track"><div class="vip-bar-fill" :style="{ width: progressPercent + '%' }"></div></div>
            </div>
          </div>
          <div class="vip-prog-row" style="margin-top:6px;">
            <div style="width:26px;"></div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <span class="vip-prog-lbl">ပရိမိုးရှင်းအတွက် လောင်းကြေး</span>
                <span class="vip-prog-val">{{ formatCurrency(deposited) }}/ {{ formatCurrency(nextLevelMaxDeposit) }}</span>
              </div>
              <div class="vip-bar-track"><div class="vip-bar-fill2" :style="{ width: wagProgressPercent + '%' }"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ MENU BLOCK ══ -->
      <div class="menu-block">
        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(251,146,60,0.18);">
            <svg class="w-[15px] h-[15px] text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <div class="flex-1 text-left"><p class="m-title">ငါ့မတ်တမ်း</p><p class="m-sub">အသေးစိတ်၊ လောင်းကစား၊ အတိုရ၊ လက်ကျန်</p></div>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(239,68,68,0.14);">
            <svg class="w-[15px] h-[15px] text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
          </div>
          <p class="flex-1 text-left m-title">ငွေထုတ်စီမံခန့်ခွဲမှု</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="$router.push('/agent')" class="menu-row">
          <div class="m-icon" style="background:rgba(245,158,11,0.16);">
            <svg class="w-[15px] h-[15px] text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <p class="flex-1 text-left m-title">အေးဂျင့်</p>
          <span class="text-[11px] font-bold mr-1" style="color:#d97706;">တစ်လဝင်ငွေ တစ်သန်း</span>
          <svg class="w-[14px] h-[14px] flex-shrink-0" style="color:#d97706;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="showProfileModal = true" class="menu-row">
          <div class="m-icon" style="background:rgba(99,102,241,0.14);">
            <svg class="w-[15px] h-[15px] text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <p class="flex-1 text-left m-title">ကိုယ်ရေးအချက်အလက်များ</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(34,197,94,0.14);">
            <svg class="w-[15px] h-[15px] text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <p class="flex-1 text-left m-title">လုံခြုံရေးစင်တာ</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(14,165,233,0.14);">
            <svg class="w-[15px] h-[15px] text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
          </div>
          <p class="flex-1 text-left m-title">ဘာသာစကား</p>
          <span class="text-[11px] mr-1" style="color:#666;">မြန်မာဘာသာ</span>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(168,85,247,0.14);">
            <svg class="w-[15px] h-[15px] text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p class="flex-1 text-left m-title">တောက်သည်ဝန်ဆောင်မှု</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="comingSoon" class="menu-row">
          <div class="m-icon" style="background:rgba(20,184,166,0.14);">
            <svg class="w-[15px] h-[15px] text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </div>
          <p class="flex-1 text-left m-title">အကြံပေးချုပ်</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="$router.push('/device-sessions')" class="menu-row">
          <div class="m-icon" style="background:rgba(100,116,139,0.15);">
            <svg class="w-[15px] h-[15px] text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>
          </div>
          <p class="flex-1 text-left m-title">စက်ပစ္စည်းသို့ ဝင်ရောက်ပါ</p>
          <svg class="m-arr" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="menu-divider"></div>
        <button @click="logout" class="menu-row">
          <div class="m-icon" style="background:rgba(239,68,68,0.13);">
            <svg class="w-[15px] h-[15px] text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </div>
          <p class="flex-1 text-left m-title" style="color:#dc2626;">အကောင့်ထွက်ရန်</p>
          <svg class="m-arr" style="color:#dc2626;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

    </div>

    <!-- ══════════════════════════════════════════════
         PROFILE MODAL (ကိုယ်ရေးအကျဉ်း)
         ══════════════════════════════════════════════ -->
    <Transition name="slide-up">
      <div v-if="showProfileModal" class="glass-overlay">
        <!-- blurred bg layer -->
        <div class="glass-overlay-bg" @click="showProfileModal = false"></div>

        <div class="glass-sheet">
          <!-- Header -->
          <div class="gs-header">
            <button @click="showProfileModal = false" class="gs-back-btn">
              <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <span class="gs-title">ကိုယ်ရေးအကျဉ်း</span>
            <div style="width:36px;"></div>
          </div>

          <!-- Avatar + info -->
          <div class="gs-body">
            <div class="gs-avatar-section">
              <div class="gs-avatar-wrap" @click="openAvatarPicker">
                <img :src="selectedAvatar" class="gs-avatar-img" alt="avatar" />
                <div class="gs-vip-pill" :style="vipBadgeBg">VIP{{ vipLevel }}</div>
                <div class="gs-avatar-overlay">
                  <svg width="18" height="18" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <circle cx="12" cy="13" r="3"/>
                  </svg>
                </div>
              </div>
              <div class="gs-user-meta">
                <div class="gs-user-label">တည်ဆောက်သည်</div>
                <div class="gs-user-id-row">
                  <span class="gs-user-id">ID:{{ gameId }}</span>
                  <button @click="copyText(gameId)" class="gs-copy-btn">
                    <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="2"/>
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="gs-fields-label">ပုံမှန်တော်ပြုသင်္ကေတ အချက်အလက်</div>

            <!-- Username field -->
            <div class="gs-field-card">
              <div class="gs-field-icon">
                <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span class="gs-field-val">{{ username }}</span>
              <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>

            <!-- Phone field -->
            <div class="gs-field-card" style="margin-top:10px;">
              <div class="gs-field-icon">
                <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <span class="gs-field-val" style="color:rgba(255,255,255,0.45);">+95 *** ***</span>
            </div>

          </div>

          <!-- Footer -->
          <div class="gs-footer">
            <button @click="showProfileModal = false" class="gs-btn-back">နောက်သို့</button>
            <button @click="showProfileModal = false" class="gs-btn-save">သိမ်းဆည်းပါ!!</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══════════════════════════════════════════════
         AVATAR PICKER MODAL
         ══════════════════════════════════════════════ -->
    <Transition name="slide-up">
      <div v-if="showAvatarPicker" class="glass-overlay">
        <div class="glass-overlay-bg" @click="showAvatarPicker = false"></div>

        <div class="glass-sheet glass-sheet--picker">
          <!-- Header -->
          <div class="gs-header">
            <button @click="showAvatarPicker = false" class="gs-back-btn">
              <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <span class="gs-title">avatar ကိုပြောင်းပါ</span>
            <div style="width:36px;"></div>
          </div>

          <!-- Tab bar -->
          <div class="ap-tabs">
            <button
              v-for="(tab, i) in pickerTabs" :key="i"
              @click="activePickerTab = i"
              :class="['ap-tab-btn', activePickerTab === i ? 'ap-tab-active' : '']">
              {{ tab }}
            </button>
          </div>

          <!-- Grid -->
          <div class="ap-grid-wrap">
            <div class="ap-grid">
              <div
                v-for="(url, idx) in currentTabAvatars" :key="idx"
                @click="pendingAvatar = url"
                :class="['ap-item', pendingAvatar === url ? 'ap-item--selected' : '']">
                <img :src="url" class="ap-img" :alt="'avatar ' + idx" loading="lazy" />
                <div v-if="pendingAvatar === url" class="ap-check">
                  <svg width="14" height="14" fill="none" stroke="#fff" stroke-width="3" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Save button -->
          <div class="ap-footer">
            <button @click="saveAvatar" class="ap-save-btn">ကယ်ဆယ်</button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

const username = ref(localStorage.getItem('sb_username') || 'PLAYER')
const gameId   = ref('')
const mainBalance  = ref(0)
const bonusBalance = ref(0)
const refreshing   = ref(false)

const showProfileModal = ref(false)
const showAvatarPicker = ref(false)
const activePickerTab  = ref(0)
const pickerTabs = ['♂ မိတာ', '♀ ပေ']

const AVATAR_URLS_TAB1 = [
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/b8a2f5c9-7574-412c-a057-172ac9d1e640.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/baff936b-edd2-46e9-b395-d691af92aca5.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/3171b481-26a1-4503-aa19-63acc6c89618.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/665389a4-01d5-4b70-a451-355244a2d03f.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/d3b603ce-d092-4cfb-9456-fe6ad6fae24b.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/45afb939-e53a-4a93-bda0-59e186268be1.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/2dfcec40-17c8-430d-8f67-6ecdcfb52d0e.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/86990cae-637f-4af0-bd8a-990acbb53ce7.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/8741cb28-1221-40f3-9201-d5995b1c2f40.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/8cfcd2fe-a061-4b39-9103-8a099e58c600.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/87578a69-c7e6-4b5b-945a-a953c0edb828.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/864813bd-fd7f-44b1-88f1-97333e077044.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/786b175d-f5f5-4115-9523-0684d872725f.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/51c46fea-78cd-4556-9e4f-ee022be7f89c.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/2efd6c8b-b189-4a38-bdaf-cc145d126227.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/9e64975f-75f3-4443-9c80-2daf2b30b48e.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/b17e1315-4ef0-4a09-a3f9-f042fcfe8a8c.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/6fb538a9-0ef0-4692-a801-8110031721c9.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/1ea77014-b7bc-41d5-b361-0d316ef0e09c.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/9732226e-406c-4316-aabf-6f381957fa62.png?tr=f-auto',
]

const AVATAR_URLS_TAB2 = [
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/050c9fd3-5a54-42ed-a13c-58a75a9b1930.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/2b6e926e-a975-4bd9-b8ed-b51aa89c7ceb.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/673e14f6-1664-420f-9ccf-e939e4a47902.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/183c069c-e24c-4d4a-9398-fb7100fd43d0.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/e895fe09-fe1d-4710-a36e-74dde41f8d93.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/52af147f-fabc-4928-b59d-7dc09968d14f.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/a43d09ea-c655-4902-b54c-4da5b4b5ee5e.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/75c9c94d-2e5f-465c-903f-d4bf301901c6.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/2cac91b9-b64a-4462-bf55-46938bec2698.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/452eaaf7-f333-483b-bc50-8977b1e5eaaa.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/b348ae8a-2302-45c1-88a0-371d1157dad6.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/e80ce256-fc16-411f-b2aa-fce93572151b.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/2d1bc982-a1e2-40b3-9f89-f1649b5e032a.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/af0f98c0-9e4e-4fb6-8ca4-d1f46e0c7fa8.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/a3b9960e-c271-44b6-b1c0-2106632ffd21.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/67a222de-be4b-4f1f-8424-25ba3dfff02c.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/e395f861-d4f2-478a-833d-dc224cf1aa86.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/ba02cc06-882d-4213-b6e3-d90c58fafcea.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/c5c3fdce-6912-4418-8947-355c2feb704b.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Avatar%20Img/fea609f6-6f52-45f1-9db9-fa0482f61d3b.png?tr=f-auto',
]

const DEFAULT_AVATAR = AVATAR_URLS_TAB1[0]

const selectedAvatar = ref(localStorage.getItem('sb_avatar_url') || DEFAULT_AVATAR)
const pendingAvatar  = ref(selectedAvatar.value)

const currentTabAvatars = computed(() =>
  activePickerTab.value === 0 ? AVATAR_URLS_TAB1 : AVATAR_URLS_TAB2
)

function openAvatarPicker() {
  pendingAvatar.value = selectedAvatar.value
  activePickerTab.value = 0
  showAvatarPicker.value = true
}

function saveAvatar() {
  selectedAvatar.value = pendingAvatar.value
  localStorage.setItem('sb_avatar_url', pendingAvatar.value)
  showAvatarPicker.value = false
}

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
      mainBalance.value  = wallet.main_balance
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
  supabase.channel('vip-levels-watch')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'vip_levels' }, () => loadVipLevels())
    .subscribe()
})

const vipLevelsData = ref([])
async function loadVipLevels() {
  const { data } = await supabase.from('vip_levels').select('*').order('level')
  if (data) vipLevelsData.value = data
}

const vipLevel = computed(() => {
  if (!vipLevelsData.value.length) {
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

const vipBadgeBg = computed(() => {
  const glowMap = {
    Silver:   'linear-gradient(135deg,#b45309,#facc15)',
    Green:    'linear-gradient(135deg,#16a34a,#22c55e)',
    Blue:     'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    Purple:   'linear-gradient(135deg,#7c3aed,#a855f7)',
    Gold:     'linear-gradient(135deg,#ca8a04,#fde047)',
    Red:      'linear-gradient(135deg,#dc2626,#f87171)',
    Diamond:  'linear-gradient(135deg,#0e7490,#22d3ee)',
    Platinum: 'linear-gradient(135deg,#475569,#cbd5e1)',
    Master:   'linear-gradient(135deg,#92400e,#fbbf24)',
    Royal:    'linear-gradient(135deg,#d97706,#fef08a)',
  }
  const glowColorMap = {
    Silver: 'rgba(250,204,21,0.7)', Green: 'rgba(34,197,94,0.6)',
    Blue: 'rgba(59,130,246,0.6)', Purple: 'rgba(168,85,247,0.6)',
    Gold: 'rgba(250,204,21,0.7)', Red: 'rgba(248,113,113,0.6)',
    Diamond: 'rgba(34,211,238,0.6)', Platinum: 'rgba(203,213,225,0.5)',
    Master: 'rgba(251,191,36,0.7)', Royal: 'rgba(254,240,138,0.7)',
  }
  const currentRow = vipLevelsData.value.find(r => r.level === vipLevel.value)
  const glow   = currentRow?.glow_color || 'Silver'
  const bg     = glowMap[glow] || glowMap.Silver
  const shadow = glowColorMap[glow] || glowColorMap.Silver
  return `background:${bg};color:#fff;box-shadow:0 0 8px ${shadow},0 0 2px ${shadow};text-shadow:0 0 6px rgba(0,0,0,0.4);`
})

const formatCurrency = (num) => new Intl.NumberFormat('en-US').format(num || 0)
const formatBalance  = (num) => {
  const n = Number(num) || 0
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000)    return (n / 1000).toFixed(1) + 'K'
  return n.toFixed(1)
}
const copyText = async (text) => { try { await navigator.clipboard.writeText(text) } catch {} }
const logout   = async () => {
  await supabase.auth.signOut()
  ;['sb_token','sb_refresh','sb_username','sb_avatar_url'].forEach(k => localStorage.removeItem(k))
  window.location.href = '/home'
}
const comingSoon = () => alert('Coming Soon')
</script>

<style scoped>
/* ── Root ── */
.nova-acc-root {
  display: flex; flex-direction: column;
  min-height: 100dvh; width: 100%;
  background: #3d4187; color: #fff;
  overscroll-behavior: contain;
  -webkit-tap-highlight-color: transparent;
}

/* ── Header ── */
.nova-acc-header {
  position: relative; display: flex; align-items: center;
  justify-content: space-between; padding: 8px 14px; background: transparent;
}
.nova-icon-btn {
  width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
  border-radius: 10px; background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  cursor: pointer; transition: transform 0.12s, background 0.12s;
}
.nova-icon-btn:active { transform: scale(0.88); background: #4a4e99; }
.notif-dot {
  position: absolute; top: -3px; right: -3px; width: 15px; height: 15px;
  background: #ef4444; border-radius: 50%; font-size: 8px; font-weight: 700;
  color: #fff; display: flex; align-items: center; justify-content: center;
}

/* ── Body ── */
.nova-acc-body { flex: 1; padding: 6px 12px 96px; display: flex; flex-direction: column; gap: 7px; }

/* ── Profile ── */
.profile-section { display: flex; align-items: center; gap: 8px; }
.profile-row {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  flex: 1; min-width: 0;
  border: 1px solid rgba(99,102,241,0.5); border-radius: 14px;
  background: rgba(255,255,255,0.08);
  box-shadow: 0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
  animation: green-pulse 3s ease-in-out infinite;
}
@keyframes green-pulse {
  0%,100% { border-color: rgba(34,197,94,0.4); }
  50%      { border-color: rgba(74,222,128,0.65); }
}

/* Avatar in profile row */
.avatar-wrap { position: relative; flex-shrink: 0; overflow: visible; cursor: pointer; }
.avatar-img-wrap {
  width: 54px; height: 54px; border-radius: 14px; overflow: hidden;
  border: 2px solid rgba(255,255,255,0.25);
  box-shadow: 0 0 14px rgba(34,197,94,0.4);
  position: relative;
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.avatar-edit-badge {
  position: absolute; bottom: 0; right: 0;
  width: 18px; height: 18px; border-radius: 5px;
  background: rgba(34,197,94,0.85); border: 1.5px solid #3d4187;
  display: flex; align-items: center; justify-content: center;
}
.vip-badge-pill {
  position: absolute; bottom: -4px; right: -6px;
  padding: 2px 5px; border-radius: 5px;
  font-size: 9px; font-weight: 900; color: #fff; line-height: 1.4; z-index: 2;
}
.profile-info { flex: 1; min-width: 0; }
.profile-username { font-size: 15px; font-weight: 800; color: #fff; letter-spacing: 0.02em; }
.profile-id { font-size: 12px; color: rgba(255,255,255,0.55); font-family: monospace; font-weight: 600; }
.copy-btn {
  color: rgba(255,255,255,0.6); cursor: pointer;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px; padding: 3px 5px; display: inline-flex; align-items: center;
  transition: transform 0.1s; min-width: 28px; min-height: 26px; justify-content: center;
}
.copy-btn:active { transform: scale(0.82); }
.copy-btn--id { color: #60a5fa; border-color: rgba(96,165,250,0.25); background: rgba(96,165,250,0.08); }
.balance-area { flex-shrink: 0; }
.balance-flag  { font-size: 15px; line-height: 1; }
.balance-amount { font-size: 18px; font-weight: 900; color: #34d399; }
.refresh-btn {
  width: 24px; height: 24px; background: rgba(34,197,94,0.12);
  border: 1px solid rgba(34,197,94,0.35); border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; color: #16a34a; transition: transform 0.15s;
}
.refresh-btn:active { transform: scale(0.82); }
.refresh-btn.refreshing .refresh-svg { animation: nova-spin 0.7s linear infinite; }

/* ── Action row ── */
.action-menu-block { background: transparent; border: none; box-shadow: none; }
.action-menu-row {
  display: flex; align-items: center; gap: 10px; padding: 9px 4px; width: 100%;
  cursor: pointer; background: none; border: none;
  transition: opacity 0.15s; -webkit-tap-highlight-color: transparent;
}
.action-menu-row:active { opacity: 0.6; }
.action-menu-icon {
  width: 30px; height: 30px; border-radius: 8px;
  background: rgba(255,255,255,0.1); border: 1.5px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.action-menu-lbl { flex: 1; font-size: 13px; font-weight: 600; color: #fff; text-align: left; }

/* ── VIP card ── */
.vip-card {
  position: relative; overflow: hidden; border-radius: 14px; padding: 11px 13px 12px;
  background: linear-gradient(135deg, #0d9488 0%, #14b8a6 45%, #0f766e 100%);
}
.vip-shimmer {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(110deg,transparent 30%,rgba(255,255,255,0.14) 50%,transparent 70%);
}
.vip-top-row { position: relative; z-index: 1; display: flex; align-items: flex-start; gap: 0; }
.vip-lvl-badge {
  flex-shrink: 0; background: rgba(255,255,255,0.2); border-radius: 7px; padding: 3px 8px;
  display: flex; align-items: center; justify-content: center;
}
.vip-badge-txt { font-size: 12px; font-weight: 900; color: #fff; }
.vip-top-label  { font-size: 11px; color: rgba(255,255,255,0.9); }
.vip-top-accent { font-size: 11.5px; font-weight: 900; color: #fef9c3; font-style: italic; }
.vip-top-bold   { font-size: 12px; font-weight: 900; color: #fff; }
.vip-divider    { position: relative; z-index: 1; margin: 7px 0; height: 1px; background: rgba(255,255,255,0.2); }
.vip-prog-wrap  { position: relative; z-index: 1; }
.vip-prog-row   { display: flex; align-items: flex-start; gap: 8px; }
.vip-coin-badge {
  width: 26px; height: 26px; border-radius: 50%;
  background: radial-gradient(circle, #fde68a 30%, #f59e0b 100%);
  border: 2px solid rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.vip-prog-lbl { font-size: 10px; color: rgba(255,255,255,0.88); }
.vip-prog-val { font-size: 10px; font-weight: 700; color: #fff; white-space: nowrap; }
.vip-bar-track { height: 6px; border-radius: 999px; background: rgba(0,0,0,0.18); overflow: hidden; }
.vip-bar-fill  { height: 100%; border-radius: 999px; background: rgba(255,255,255,0.85); transition: width 0.5s ease; }
.vip-bar-fill2 { height: 100%; border-radius: 999px; background: rgba(254,243,199,0.75); transition: width 0.5s ease; }

/* ── Menu block ── */
.menu-block { background: transparent; border: none; box-shadow: none; }
.menu-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 0 4px; }
.menu-row {
  display: flex; align-items: center; gap: 10px; padding: 9px 4px; width: 100%;
  cursor: pointer; background: none; border: none;
  transition: opacity 0.15s; -webkit-tap-highlight-color: transparent;
}
.menu-row:active { opacity: 0.6; }
.m-icon { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.m-title { font-size: 13px; font-weight: 600; color: #fff; }
.m-sub   { font-size: 9.5px; color: #666; margin-top: 1px; }
.m-arr   { width: 14px; height: 14px; color: #bbb; flex-shrink: 0; }

/* ══════════════════════════════════════════════
   GLASSMORPHISM OVERLAY
   ══════════════════════════════════════════════ */
.glass-overlay {
  position: fixed; inset: 0; z-index: 300;
  display: flex; align-items: flex-end;
}
.glass-overlay-bg {
  position: absolute; inset: 0;
  background: rgba(6, 8, 24, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.glass-sheet {
  position: relative; z-index: 1;
  width: 100%; max-height: 92dvh;
  background: rgba(20, 22, 55, 0.88);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border-top: 1px solid rgba(255,255,255,0.14);
  border-left: 1px solid rgba(255,255,255,0.09);
  border-right: 1px solid rgba(255,255,255,0.09);
  border-radius: 22px 22px 0 0;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12);
}
.glass-sheet--picker { max-height: 95dvh; }

/* Header */
.gs-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  flex-shrink: 0;
}
.gs-back-btn {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.14);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: transform 0.12s;
}
.gs-back-btn:active { transform: scale(0.85); }
.gs-title { font-size: 15px; font-weight: 800; color: #fff; letter-spacing: 0.02em; }

/* Body */
.gs-body { flex: 1; overflow-y: auto; padding: 18px 16px; }

/* Avatar section */
.gs-avatar-section { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
.gs-avatar-wrap {
  position: relative; width: 70px; height: 70px; flex-shrink: 0; cursor: pointer;
}
.gs-avatar-img {
  width: 70px; height: 70px; border-radius: 16px; object-fit: cover;
  border: 2.5px solid rgba(255,255,255,0.22);
  box-shadow: 0 0 18px rgba(34,197,94,0.35);
}
.gs-vip-pill {
  position: absolute; bottom: -5px; left: -4px;
  padding: 2px 6px; border-radius: 6px;
  font-size: 9px; font-weight: 900; color: #fff; line-height: 1.4; z-index: 2;
}
.gs-avatar-overlay {
  position: absolute; inset: 0; border-radius: 14px;
  background: rgba(0,0,0,0.38);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.15s;
}
.gs-avatar-wrap:active .gs-avatar-overlay { opacity: 1; }

.gs-user-meta { flex: 1; min-width: 0; }
.gs-user-label { font-size: 11px; color: rgba(255,255,255,0.55); margin-bottom: 4px; }
.gs-user-id-row { display: flex; align-items: center; gap: 6px; }
.gs-user-id { font-size: 13px; font-weight: 700; color: #4ade80; font-family: monospace; }
.gs-copy-btn {
  background: rgba(74,222,128,0.12); border: 1px solid rgba(74,222,128,0.3);
  border-radius: 5px; padding: 3px 5px; color: #4ade80; cursor: pointer;
  display: inline-flex; align-items: center; transition: transform 0.1s;
}
.gs-copy-btn:active { transform: scale(0.82); }

.gs-fields-label { font-size: 11px; color: rgba(255,255,255,0.38); margin-bottom: 10px; letter-spacing: 0.04em; }

/* Field card — glassmorphism */
.gs-field-card {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px; border-radius: 14px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08);
}
.gs-field-icon {
  width: 28px; height: 28px; border-radius: 8px;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.gs-field-val { flex: 1; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85); }

/* Footer */
.gs-footer {
  display: flex; gap: 10px; padding: 12px 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  flex-shrink: 0;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
}
.gs-btn-back {
  flex: 1; padding: 13px; border-radius: 14px;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.75); font-size: 14px; font-weight: 700; cursor: pointer;
  transition: opacity 0.15s;
}
.gs-btn-back:active { opacity: 0.6; }
.gs-btn-save {
  flex: 2; padding: 13px; border-radius: 14px;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  border: none; color: #fff; font-size: 14px; font-weight: 800; cursor: pointer;
  box-shadow: 0 4px 14px rgba(34,197,94,0.4);
  transition: transform 0.12s, box-shadow 0.12s;
}
.gs-btn-save:active { transform: scale(0.96); box-shadow: 0 2px 8px rgba(34,197,94,0.3); }

/* ══════════════════════════════════════════════
   AVATAR PICKER
   ══════════════════════════════════════════════ */
.ap-tabs {
  display: flex; gap: 8px; padding: 10px 16px 0;
  flex-shrink: 0;
}
.ap-tab-btn {
  flex: 1; padding: 9px 0; border-radius: 12px;
  background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.18s;
}
.ap-tab-active {
  background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.55);
  color: #4ade80; box-shadow: 0 0 12px rgba(34,197,94,0.25);
}

.ap-grid-wrap { flex: 1; overflow-y: auto; padding: 12px 14px; }
.ap-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 9px;
}
.ap-item {
  position: relative; aspect-ratio: 1 / 1; border-radius: 14px; overflow: hidden;
  cursor: pointer; border: 2.5px solid transparent;
  transition: transform 0.12s, border-color 0.15s;
  background: rgba(255,255,255,0.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.ap-item:active { transform: scale(0.9); }
.ap-item--selected {
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34,197,94,0.3), 0 2px 12px rgba(34,197,94,0.4);
}
.ap-img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 11px; }
.ap-check {
  position: absolute; top: 4px; right: 4px;
  width: 22px; height: 22px; border-radius: 50%;
  background: rgba(34,197,94,0.9);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 8px rgba(34,197,94,0.6);
}

.ap-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  flex-shrink: 0;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
}
.ap-save-btn {
  width: 100%; padding: 15px; border-radius: 14px;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  border: none; color: #fff; font-size: 15px; font-weight: 800; cursor: pointer;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 18px rgba(34,197,94,0.45);
  transition: transform 0.12s, box-shadow 0.12s;
}
.ap-save-btn:active { transform: scale(0.97); box-shadow: 0 2px 10px rgba(34,197,94,0.3); }

/* ── Slide-up transition ── */
.slide-up-enter-active { transition: transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.28s ease; }
.slide-up-leave-active { transition: transform 0.22s ease-in, opacity 0.18s ease; }
.slide-up-enter-from  { transform: translateY(100%); opacity: 0; }
.slide-up-leave-to    { transform: translateY(100%); opacity: 0; }

/* ── Spin ── */
@keyframes nova-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
