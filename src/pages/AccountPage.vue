<template>
  <div class="acc-root">

    <!-- ══ HEADER ══ -->
    <header class="acc-header">
      <button @click="$router.back()" class="icon-btn">
        <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div style="display:flex;align-items:center;gap:8px;">
        <button class="icon-btn">
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </button>
        <button class="icon-btn" style="position:relative;">
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span class="notif-dot">3</span>
        </button>
      </div>
    </header>

    <div class="acc-body">

      <!-- ── Profile row ── -->
      <div style="display:flex;align-items:center;gap:10px;padding:10px 0;">
        <div class="av-wrap" @click="openProfile">
          <img :src="selectedAvatar" class="av-img" alt="avatar" />
          <div class="vip-pill" :style="vipBadgeBg">V{{ vipLevel }}</div>
          <div class="av-edit">
            <svg width="9" height="9" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg>
          </div>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span class="uname">{{ username }}</span>
            <button @click="copyText(username)" class="cp-btn">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:3px;">
            <span class="uid">ID: {{ gameId }}</span>
            <button @click="copyText(gameId)" class="cp-btn cp-btn--blue">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="display:flex;align-items:center;gap:3px;">
            <span style="font-size:15px;">🇲🇲</span>
            <span class="bal">{{ formatBalance(mainBalance) }}</span>
          </div>
          <button @click="fetchWallet" class="ref-btn" :class="{ refreshing }">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="ref-svg">
              <path d="M12 5C8.13 5 5 8.13 5 12s3.13 7 7 7c2.76 0 5.16-1.59 6.34-3.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M17 7.5l1.5 3.5-3.5 0.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ── Action rows (deposit/withdraw) ── -->
      <div class="thin-divider"></div>
      <button @click="$router.push('/home')" class="menu-row">
        <div class="micon" style="background:rgba(255,255,255,0.12);">
          <svg width="17" height="17" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="14" width="20" height="7" rx="2"/><path d="M12 2v10m0 0l-3.5-3.5M12 12l3.5-3.5"/>
          </svg>
        </div>
        <span class="mlabel">ငွေထုတ်ရန်</span>
        <svg class="marr" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>
      <button @click="$router.push('/home')" class="menu-row">
        <div class="micon" style="background:rgba(255,255,255,0.12);">
          <svg width="17" height="17" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="14" width="20" height="7" rx="2"/><path d="M12 12V2m0 0L8.5 5.5M12 2l3.5 3.5"/>
          </svg>
        </div>
        <span class="mlabel">ငွေသွင်းရန်</span>
        <svg class="marr" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>

      <!-- ── VIP card ── -->
      <div class="vip-card">
        <div class="vip-shimmer"></div>
        <div style="position:relative;z-index:1;display:flex;align-items:flex-start;gap:6px;">
          <div class="vip-lv-badge"><span style="font-size:12px;font-weight:900;color:#fff;">VIP{{ vipLevel }}</span></div>
          <div style="flex:1;min-width:0;padding-left:4px;">
            <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:3px;">
              <span style="font-size:11px;color:rgba(255,255,255,0.9);">လက်ကျန် </span>
              <span style="font-size:11.5px;font-weight:900;color:#fef9c3;font-style:italic;">VIP{{ nextLevel }}</span>
              <span style="font-size:11px;color:rgba(255,255,255,0.9);"> အားပြန်သင့်ရန် </span>
              <span style="font-size:12px;font-weight:900;color:#fff;">{{ formatCurrency(nextLevelTarget) }}</span>
            </div>
            <div style="font-size:10.5px;color:rgba(255,255,255,0.75);margin-top:1px;">လောင်းကြေးအတွက် {{ formatCurrency(nextLevelMaxDeposit) }}</div>
          </div>
          <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;margin-top:2px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <div style="position:relative;z-index:1;height:1px;background:rgba(255,255,255,0.2);margin:8px 0;"></div>
        <div style="position:relative;z-index:1;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <div class="vip-coin"><span style="font-size:11px;font-weight:900;color:#fbbf24;">{{ vipLevel }}</span></div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                <span style="font-size:10px;color:rgba(255,255,255,0.88);">ပရိမိုးရှင်းအတွက် အားပြန်သင့်ဗုဒ္ဓ</span>
                <span style="font-size:10px;font-weight:700;color:#fff;white-space:nowrap;">{{ formatCurrency(deposited) }}/{{ formatCurrency(nextLevelTarget) }}</span>
              </div>
              <div class="vbar"><div class="vbar-fill" :style="{ width: progressPercent + '%' }"></div></div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:26px;"></div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                <span style="font-size:10px;color:rgba(255,255,255,0.88);">ပရိမိုးရှင်းအတွက် လောင်းကြေး</span>
                <span style="font-size:10px;font-weight:700;color:#fff;white-space:nowrap;">{{ formatCurrency(deposited) }}/{{ formatCurrency(nextLevelMaxDeposit) }}</span>
              </div>
              <div class="vbar"><div class="vbar-fill2" :style="{ width: wagProgressPercent + '%' }"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Menu items ── -->
      <div class="thin-divider"></div>
      <button @click="comingSoon" class="menu-row">
        <div class="micon" style="background:rgba(251,146,60,0.18);"><svg width="15" height="15" fill="none" stroke="#fb923c" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div>
        <div style="flex:1;text-align:left;"><div class="mlabel">ငါ့မတ်တမ်း</div><div style="font-size:9.5px;color:rgba(255,255,255,0.35);margin-top:1px;">အသေးစိတ်၊ လောင်းကစား၊ အတိုရ၊ လက်ကျန်</div></div>
        <svg class="marr" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>
      <button @click="comingSoon" class="menu-row">
        <div class="micon" style="background:rgba(239,68,68,0.14);"><svg width="15" height="15" fill="none" stroke="#f87171" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg></div>
        <span class="mlabel" style="flex:1;text-align:left;">ငွေထုတ်စီမံခန့်ခွဲမှု</span>
        <svg class="marr" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>
      <button @click="$router.push('/agent')" class="menu-row">
        <div class="micon" style="background:rgba(245,158,11,0.16);"><svg width="15" height="15" fill="none" stroke="#f59e0b" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div>
        <span class="mlabel" style="flex:1;text-align:left;">အေးဂျင့်</span>
        <span style="font-size:10px;font-weight:700;color:#d97706;margin-right:4px;">တစ်လဝင်ငွေ တစ်သန်း</span>
        <svg class="marr" style="color:#d97706;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>
      <button @click="openProfile" class="menu-row">
        <div class="micon" style="background:rgba(99,102,241,0.14);"><svg width="15" height="15" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
        <span class="mlabel" style="flex:1;text-align:left;">ကိုယ်ရေးအချက်အလက်များ</span>
        <svg class="marr" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>
      <button @click="comingSoon" class="menu-row">
        <div class="micon" style="background:rgba(34,197,94,0.14);"><svg width="15" height="15" fill="none" stroke="#4ade80" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></div>
        <span class="mlabel" style="flex:1;text-align:left;">လုံခြုံရေးစင်တာ</span>
        <svg class="marr" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>
      <button @click="comingSoon" class="menu-row">
        <div class="micon" style="background:rgba(14,165,233,0.14);"><svg width="15" height="15" fill="none" stroke="#38bdf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg></div>
        <span class="mlabel" style="flex:1;text-align:left;">ဘာသာစကား</span>
        <span style="font-size:10px;color:rgba(255,255,255,0.35);margin-right:4px;">မြန်မာဘာသာ</span>
        <svg class="marr" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>
      <button @click="$router.push('/device-sessions')" class="menu-row">
        <div class="micon" style="background:rgba(100,116,139,0.15);"><svg width="15" height="15" fill="none" stroke="#94a3b8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg></div>
        <span class="mlabel" style="flex:1;text-align:left;">ကိုယ်ပိုင်စက်ပစ္စည်းများ</span>
        <svg class="marr" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="thin-divider"></div>
      <button @click="logout" class="menu-row">
        <div class="micon" style="background:rgba(239,68,68,0.13);"><svg width="15" height="15" fill="none" stroke="#f87171" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg></div>
        <span class="mlabel" style="flex:1;text-align:left;color:#f87171;">အကောင့်ထွက်ရန်</span>
        <svg class="marr" style="color:#f87171;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>

    <!-- ══════════════════════════════════════════════
         PROFILE PAGE — full screen
         ══════════════════════════════════════════════ -->
    <Transition name="page-slide">
      <div v-if="showProfile" class="fullpage" style="background:#14162e;">

        <!-- Header -->
        <div class="fp-header">
          <button @click="showProfile = false" class="icon-btn">
            <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <span class="fp-title">ကိုယ်ရေးအကျဉ်း</span>
          <div style="width:36px;"></div>
        </div>

        <!-- Avatar + info -->
        <div class="fp-body">
          <div style="display:flex;align-items:center;gap:14px;padding:18px 0 22px;">
            <div style="position:relative;cursor:pointer;" @click="openAvatarPicker">
              <img :src="selectedAvatar" style="width:70px;height:70px;border-radius:16px;object-fit:cover;border:2px solid rgba(255,255,255,0.18);" alt="av" />
              <div :style="vipBadgeBg" style="position:absolute;bottom:-5px;left:-4px;padding:2px 6px;border-radius:6px;font-size:9px;font-weight:900;color:#fff;line-height:1.4;">VIP{{ vipLevel }}</div>
              <div style="position:absolute;inset:0;border-radius:14px;background:rgba(0,0,0,0.32);display:flex;align-items:center;justify-content:center;">
                <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
              </div>
            </div>
            <div>
              <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:4px;">တည်ဆောက်သည်</div>
              <div style="display:flex;align-items:center;gap:6px;">
                <span style="font-size:13px;font-weight:700;color:#4ade80;font-family:monospace;">ID:{{ gameId }}</span>
                <button @click="copyText(gameId)" style="background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.25);border-radius:5px;padding:3px 5px;color:#4ade80;cursor:pointer;display:flex;align-items:center;">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:14px;letter-spacing:0.04em;">ပုံမှန်တော်ပြုသင်္ကေတ အချက်အလက်</div>

          <!-- Username field — minimal underline style -->
          <div class="fp-field">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span style="flex:1;font-size:13px;color:rgba(255,255,255,0.85);">{{ username }}</span>
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Phone field -->
          <div class="fp-field" style="margin-top:10px;">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span style="flex:1;font-size:13px;color:rgba(255,255,255,0.4);">+95 *** ***</span>
          </div>
        </div>

        <!-- Footer buttons -->
        <div class="fp-footer">
          <button @click="showProfile = false" class="fp-btn-back">နောက်သို့</button>
          <button @click="showProfile = false" class="fp-btn-save">သိမ်းဆည်းပါ!!</button>
        </div>

      </div>
    </Transition>

    <!-- ══════════════════════════════════════════════
         AVATAR PICKER PAGE — full screen
         ══════════════════════════════════════════════ -->
    <Transition name="page-slide">
      <div v-if="showPicker" class="fullpage" style="background:#14162e;">

        <!-- Header -->
        <div class="fp-header">
          <button @click="showPicker = false" class="icon-btn">
            <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <span class="fp-title">avatar ကိုပြောင်းပါ</span>
          <div style="width:36px;"></div>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:10px;padding:12px 16px 0;flex-shrink:0;">
          <button v-for="(tab,i) in tabs" :key="i" @click="activeTab = i"
            :style="activeTab === i
              ? 'background:rgba(34,197,94,0.18);border:1.5px solid rgba(34,197,94,0.5);color:#4ade80;'
              : 'background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.09);color:rgba(255,255,255,0.45);'"
            style="flex:1;padding:9px 0;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.18s;">
            {{ tab }}
          </button>
        </div>

        <!-- Grid -->
        <div class="ap-grid-scroll">
          <div class="ap-grid">
            <div v-for="(url,idx) in currentTabUrls" :key="idx"
              @click="pendingAvatar = url"
              :style="pendingAvatar === url ? 'border-color:#22c55e;box-shadow:0 0 0 2.5px rgba(34,197,94,0.35);' : 'border-color:transparent;'"
              style="position:relative;aspect-ratio:1/1;border-radius:14px;overflow:hidden;cursor:pointer;border:2.5px solid transparent;transition:border-color 0.15s,transform 0.1s;background:rgba(255,255,255,0.04);"
              @touchstart.passive="" @click.passive="">
              <img :src="url" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:11px;" loading="lazy" />
              <div v-if="pendingAvatar === url"
                style="position:absolute;top:4px;right:4px;width:22px;height:22px;border-radius:50%;background:rgba(34,197,94,0.9);display:flex;align-items:center;justify-content:center;box-shadow:0 0 8px rgba(34,197,94,0.6);">
                <svg width="13" height="13" fill="none" stroke="#fff" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Save button -->
        <div class="fp-footer" style="padding-top:10px;">
          <button @click="saveAvatar" class="ap-save">ကယ်ဆယ်</button>
        </div>

      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

// ── State ──────────────────────────────────────────
const username   = ref(localStorage.getItem('sb_username') || 'PLAYER')
const gameId     = ref('')
const mainBalance = ref(0)
const deposited   = ref(0)
const refreshing  = ref(false)

const showProfile = ref(false)
const showPicker  = ref(false)
const activeTab   = ref(0)
const tabs = ['♂ မိတာ', '♀ ပေ']

// ── Avatar URLs ────────────────────────────────────
const TAB1 = [
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
const TAB2 = [
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

const selectedAvatar = ref(localStorage.getItem('sb_avatar_url') || TAB1[0])
const pendingAvatar  = ref(selectedAvatar.value)
const currentTabUrls = computed(() => activeTab.value === 0 ? TAB1 : TAB2)

function openProfile() { showProfile.value = true }
function openAvatarPicker() {
  pendingAvatar.value = selectedAvatar.value
  activeTab.value = 0
  showPicker.value = true
}
function saveAvatar() {
  selectedAvatar.value = pendingAvatar.value
  localStorage.setItem('sb_avatar_url', pendingAvatar.value)
  showPicker.value = false
}

// ── Wallet ─────────────────────────────────────────
async function fetchWallet() {
  try {
    refreshing.value = true
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    gameId.value = user.id.substring(0, 9).toUpperCase()
    const { data: w } = await supabase.from('wallets').select('main_balance,bonus_balance').eq('user_id', user.id).single()
    if (w) mainBalance.value = w.main_balance
    const { data: txs } = await supabase.from('transactions').select('amount').eq('user_id', user.id).eq('type','deposit').eq('status','confirmed')
    if (txs) deposited.value = txs.reduce((s, t) => s + Number(t.amount), 0)
  } catch {}
  finally { setTimeout(() => { refreshing.value = false }, 500) }
}
onMounted(() => {
  fetchWallet()
  loadVip()
  setInterval(fetchWallet, 5000)
})

// ── VIP ────────────────────────────────────────────
const vipLevels = ref([])
async function loadVip() {
  const { data } = await supabase.from('vip_levels').select('*').order('level')
  if (data) vipLevels.value = data
}
const vipLevel = computed(() => {
  if (!vipLevels.value.length) {
    const t = [0,10000,40000,60000,80000,100000,150000,200000,300000,500000]
    let l = 1; t.forEach((v,i) => { if (deposited.value >= v) l = i + 1 }); return Math.min(l, 10)
  }
  let l = 1; vipLevels.value.forEach(r => { if (deposited.value >= Number(r.min_deposit)) l = r.level }); return l
})
const nextLevel = computed(() => Math.min(vipLevel.value + 1, vipLevels.value.length || 10))
const nextRow   = computed(() => vipLevels.value.find(r => r.level === nextLevel.value) || null)
const nextLevelTarget     = computed(() => nextRow.value ? Number(nextRow.value.min_deposit) : 10000)
const nextLevelMaxDeposit = computed(() => nextRow.value ? Number(nextRow.value.max_deposit) : 40000)
const progressPercent = computed(() => {
  const cur = vipLevels.value.find(r => r.level === vipLevel.value)
  const prev = cur ? Number(cur.min_deposit) : 0
  const span = nextLevelTarget.value - prev
  return span ? Math.min(100, Math.max(0, Math.round((deposited.value - prev) / span * 100))) : 100
})
const wagProgressPercent = computed(() => nextLevelMaxDeposit.value ? Math.min(100, Math.max(0, Math.round(deposited.value / nextLevelMaxDeposit.value * 100))) : 0)

const glowMap = { Silver:'linear-gradient(135deg,#b45309,#facc15)',Green:'linear-gradient(135deg,#16a34a,#22c55e)',Blue:'linear-gradient(135deg,#1d4ed8,#3b82f6)',Purple:'linear-gradient(135deg,#7c3aed,#a855f7)',Gold:'linear-gradient(135deg,#ca8a04,#fde047)',Red:'linear-gradient(135deg,#dc2626,#f87171)',Diamond:'linear-gradient(135deg,#0e7490,#22d3ee)',Platinum:'linear-gradient(135deg,#475569,#cbd5e1)',Master:'linear-gradient(135deg,#92400e,#fbbf24)',Royal:'linear-gradient(135deg,#d97706,#fef08a)' }
const vipBadgeBg = computed(() => {
  const row = vipLevels.value.find(r => r.level === vipLevel.value)
  const g = row?.glow_color || 'Silver'
  return `background:${glowMap[g]||glowMap.Silver};color:#fff;text-shadow:0 0 6px rgba(0,0,0,0.4);`
})

// ── Utils ──────────────────────────────────────────
const formatCurrency = n => new Intl.NumberFormat('en-US').format(n || 0)
const formatBalance  = n => { const v = Number(n) || 0; if (v >= 1000000) return (v/1000000).toFixed(1)+'M'; if (v >= 1000) return (v/1000).toFixed(1)+'K'; return v.toFixed(1) }
const copyText = async t => { try { await navigator.clipboard.writeText(t) } catch {} }
const logout = async () => {
  await supabase.auth.signOut()
  ;['sb_token','sb_refresh','sb_username','sb_avatar_url'].forEach(k => localStorage.removeItem(k))
  window.location.href = '/home'
}
const comingSoon = () => {}
</script>

<style scoped>
/* ── Root ── */
.acc-root { display:flex;flex-direction:column;min-height:100dvh;width:100%;background:#3d4187;color:#fff;overscroll-behavior:contain;-webkit-tap-highlight-color:transparent; }

/* ── Header ── */
.acc-header { display:flex;align-items:center;justify-content:space-between;padding:8px 14px; }
.icon-btn { width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.14);cursor:pointer;transition:transform 0.12s; }
.icon-btn:active { transform:scale(0.86); }
.notif-dot { position:absolute;top:-3px;right:-3px;width:15px;height:15px;background:#ef4444;border-radius:50%;font-size:8px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center; }

/* ── Body ── */
.acc-body { flex:1;padding:6px 14px 96px; }

/* ── Avatar in main ── */
.av-wrap { position:relative;flex-shrink:0;cursor:pointer; }
.av-img { width:54px;height:54px;border-radius:14px;object-fit:cover;border:2px solid rgba(255,255,255,0.2);box-shadow:0 0 12px rgba(34,197,94,0.35); }
.av-edit { position:absolute;bottom:0;right:0;width:17px;height:17px;border-radius:4px;background:rgba(34,197,94,0.85);border:1.5px solid #3d4187;display:flex;align-items:center;justify-content:center; }
.vip-pill { position:absolute;bottom:-4px;right:-6px;padding:2px 5px;border-radius:5px;font-size:9px;font-weight:900;color:#fff;line-height:1.4;z-index:2; }

/* ── Text ── */
.uname { font-size:15px;font-weight:800;color:#fff;letter-spacing:0.02em; }
.uid   { font-size:12px;color:rgba(255,255,255,0.5);font-family:monospace;font-weight:600; }
.bal   { font-size:18px;font-weight:900;color:#34d399; }

/* ── Copy btn ── */
.cp-btn { background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:3px 5px;cursor:pointer;display:flex;align-items:center;color:rgba(255,255,255,0.6);transition:transform 0.1s; }
.cp-btn:active { transform:scale(0.82); }
.cp-btn--blue { color:#60a5fa;border-color:rgba(96,165,250,0.25);background:rgba(96,165,250,0.08); }

/* ── Refresh btn ── */
.ref-btn { width:24px;height:24px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#16a34a; }
.ref-btn:active { transform:scale(0.82); }
.ref-btn.refreshing .ref-svg { animation:spin 0.7s linear infinite; }

/* ── Divider ── */
.thin-divider { height:1px;background:rgba(255,255,255,0.07);margin:0 0; }

/* ── Menu rows ── */
.menu-row { display:flex;align-items:center;gap:10px;padding:11px 0;width:100%;cursor:pointer;background:none;border:none;-webkit-tap-highlight-color:transparent;transition:opacity 0.15s; }
.menu-row:active { opacity:0.6; }
.micon { width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
.mlabel { font-size:13px;font-weight:600;color:#fff; }
.marr { width:14px;height:14px;flex-shrink:0; }

/* ── VIP card ── */
.vip-card { position:relative;overflow:hidden;border-radius:14px;padding:11px 13px 12px;background:linear-gradient(135deg,#0d9488 0%,#14b8a6 45%,#0f766e 100%);margin:8px 0; }
.vip-shimmer { position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,0.14) 50%,transparent 70%); }
.vip-lv-badge { flex-shrink:0;background:rgba(255,255,255,0.2);border-radius:7px;padding:3px 8px;display:flex;align-items:center;justify-content:center; }
.vip-coin { width:26px;height:26px;border-radius:50%;background:radial-gradient(circle,#fde68a 30%,#f59e0b 100%);border:2px solid rgba(255,255,255,0.35);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
.vbar { height:6px;border-radius:999px;background:rgba(0,0,0,0.18);overflow:hidden; }
.vbar-fill  { height:100%;border-radius:999px;background:rgba(255,255,255,0.85);transition:width 0.5s; }
.vbar-fill2 { height:100%;border-radius:999px;background:rgba(254,243,199,0.75);transition:width 0.5s; }

/* ═══════════════════════════════════════
   FULL-SCREEN PAGE
   ═══════════════════════════════════════ */
.fullpage {
  position: fixed; inset: 0; z-index: 300;
  display: flex; flex-direction: column;
  overflow: hidden;
}

/* ── Page header ── */
.fp-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px 10px; flex-shrink: 0;
}
.fp-title { font-size: 15px; font-weight: 800; color: #fff; }

/* ── Profile body ── */
.fp-body { flex: 1; overflow-y: auto; padding: 0 16px; }

/* ── Minimal field — just a line on bg, no box ── */
.fp-field {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 2px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

/* ── Avatar grid ── */
.ap-grid-scroll { flex: 1; overflow-y: auto; padding: 12px 14px; }
.ap-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 9px; }

/* ── Footer ── */
.fp-footer {
  display: flex; gap: 10px; padding: 12px 16px;
  flex-shrink: 0;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
}
.fp-btn-back {
  flex: 1; padding: 13px; border-radius: 14px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.72); font-size: 14px; font-weight: 700; cursor: pointer;
}
.fp-btn-back:active { opacity: 0.65; }
.fp-btn-save {
  flex: 2; padding: 13px; border-radius: 14px;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  border: none; color: #fff; font-size: 14px; font-weight: 800; cursor: pointer;
  box-shadow: 0 4px 14px rgba(34,197,94,0.38);
}
.fp-btn-save:active { transform: scale(0.97); }
.ap-save {
  width: 100%; padding: 15px; border-radius: 14px;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  border: none; color: #fff; font-size: 15px; font-weight: 800; cursor: pointer;
  box-shadow: 0 4px 18px rgba(34,197,94,0.42);
}
.ap-save:active { transform: scale(0.97); }

/* ── Page slide transition ── */
.page-slide-enter-active { transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94); }
.page-slide-leave-active { transition: transform 0.22s ease-in; }
.page-slide-enter-from  { transform: translateX(100%); }
.page-slide-leave-to    { transform: translateX(100%); }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
