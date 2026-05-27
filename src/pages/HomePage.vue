<template>
    <div class="nova-app">

      <!-- ══ HEADER ══ -->
      <header class="nova-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="nova-logo">N</div>
          <div>
            <div style="font-size:9px;color:rgba(34,197,94,0.55);letter-spacing:0.2em;text-transform:uppercase;line-height:1;">WELCOME TO</div>
            <div class="nova-brand">NovaBETT</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button @click="toggleLanguage" class="glass-btn-sm" style="color:rgba(34,197,94,0.9);font-size:11px;font-weight:700;padding:5px 10px;">{{ currentLang === 'en' ? 'မြန်မာ' : 'EN' }}</button>
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

      <!-- ══ BANNER SWIPER ══ -->
      <div style="position:relative;overflow:hidden;aspect-ratio:2.2/1;background:#0d0d0d;">
        <div style="display:flex;transition:transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94);will-change:transform;"
          :style="{ transform: 'translateX(-' + (bannerIdx * 100) + '%)' }"
          @touchstart="onBannerTouchStart" @touchmove.prevent="onBannerTouchMove" @touchend="onBannerTouchEnd">
          <div v-for="(img, i) in bannerImages" :key="i" style="min-width:100%;aspect-ratio:2.2/1;position:relative;">
            <img :src="img" style="width:100%;height:100%;object-fit:cover;display:block;" alt="" loading="lazy" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.5) 0%,transparent 55%);"></div>
          </div>
        </div>
        <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:5px;z-index:2;">
          <div v-for="(_, i) in bannerImages" :key="i" @click="bannerIdx = i"
            :style="i === bannerIdx ? 'width:20px;height:4px;background:#22c55e;border-radius:2px;' : 'width:4px;height:4px;background:rgba(255,255,255,0.28);border-radius:50%;'"
            style="transition:all 0.3s;cursor:pointer;"></div>
        </div>
      </div>

      <!-- ══ MARQUEE ══ -->
      <div style="display:flex;align-items:center;background:#111;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);padding:7px 12px;gap:8px;overflow:hidden;">
        <svg width="15" height="15" fill="rgba(34,197,94,0.85)" viewBox="0 0 24 24" style="flex-shrink:0;"><path d="M18 9v-3a6 6 0 10-12 0v3l-2 2v1h16v-1l-2-2zm-6 13a3 3 0 003-3H9a3 3 0 003 3z"/></svg>
        <div style="flex:1;overflow:hidden;"><span class="nova-marquee" style="font-size:12px;color:rgba(255,255,255,0.58);">NovaBETT မှ ကြိုဆိုပါသည်&nbsp;&nbsp;&nbsp;ငွေသွင်းငွေထုတ် 24/7&nbsp;&nbsp;&nbsp;JILI, PP, PG ဂိမ်းများ&nbsp;&nbsp;&nbsp;VIP အဖွဲ့ဝင်များ အထူးဆုများ&nbsp;&nbsp;&nbsp;Customer Support 24/7&nbsp;&nbsp;&nbsp;</span></div>
        <div style="position:relative;flex-shrink:0;">
          <svg width="17" height="17" fill="rgba(255,255,255,0.32)" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span style="position:absolute;top:-5px;right:-6px;background:#ef4444;color:#fff;font-size:8px;font-weight:900;border-radius:10px;padding:1px 4px;line-height:14px;">99+</span>
        </div>
      </div>

      <!-- ══ ACTION ROW ══ -->
      <div v-if="!isLoggedIn" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div style="display:flex;align-items:center;gap:7px;flex-shrink:0;">
          <button @click="showAuthModal=true;authTab='login'" class="glass-btn-auth">လောဂ်အင်</button>
          <button @click="showAuthModal=true;authTab='register'" class="glass-btn-auth glass-btn-auth--primary">မှတ်ပုံတင်</button>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div @click="showAuthModal=true;authTab='login'" class="nova-quick-icon">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            <span>ငွေသွင်းရန်</span>
          </div>
          <div @click="showAuthModal=true;authTab='login'" class="nova-quick-icon">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M7 15h4m1-5h3"/></svg>
            <span>ငွေထုတ်ရန်</span>
          </div>
          <div class="nova-quick-icon">
            <svg width="16" height="16" fill="none" stroke="rgba(234,179,8,0.85)" stroke-width="1.8" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
            <span>VIP</span>
          </div>
          <div class="nova-quick-icon">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 000 4h4v-4h-4z"/></svg>
            <span>ပံ့ပိုးမှု</span>
          </div>
        </div>
      </div>
      <div v-if="isLoggedIn" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,0.32);margin-bottom:2px;">{{ username }}</div>
          <div style="font-size:17px;font-weight:900;color:#4ade80;">{{ formatCurrency(mainBalance) }} <span style="font-size:10px;color:rgba(255,255,255,0.3);">MMK</span></div>
        </div>
        <div style="display:flex;gap:8px;">
          <button @click="showDepositModal=true" class="glass-btn-auth glass-btn-auth--primary">ငွေသွင်း</button>
          <button @click="showWithdrawModal=true" class="glass-btn-auth">ငွေထုတ်</button>
        </div>
      </div>

      <!-- ══ SIDEBAR + GAME GRID SECTION ══ -->
      <div style="display:flex;position:relative;">

        <!-- LEFT: 3D Category Sidebar -->
        <div class="nova-sidebar" :style="{ top: sidebarTop }">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="['nova-cat-btn', activeCategory === cat.id ? 'nova-cat-btn--active' : '']">
            <!-- Canvas glow drawn per button -->
            <canvas v-if="activeCategory === cat.id" class="nova-cat-glow" :ref="el => registerGlowCanvas(el, cat.id)" width="68" height="72"></canvas>
            <!-- 3D SVG Icon -->
            <div class="nova-cat-icon-wrap">
              <svg class="nova-cat-svg" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient :id="'rg-' + cat.id" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" :stop-color="activeCategory === cat.id ? 'rgba(120,255,160,0.9)' : 'rgba(200,210,220,0.5)'" />
                    <stop offset="100%" :stop-color="activeCategory === cat.id ? 'rgba(34,197,94,0.3)' : 'rgba(80,100,120,0.15)'" />
                  </radialGradient>
                  <filter :id="'glow-' + cat.id">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <circle cx="14" cy="14" r="13" :fill="'url(#rg-' + cat.id + ')'" opacity="0.15"/>
                <g :filter="'url(#glow-' + cat.id + ')'">
                  <path :d="cat.svgPath" :fill="activeCategory === cat.id ? '#4ade80' : 'rgba(180,195,210,0.75)'" />
                </g>
              </svg>
            </div>
            <!-- Label -->
            <span class="nova-cat-label">{{ cat.name }}</span>
            <!-- Active indicator bar -->
            <div v-if="activeCategory === cat.id" class="nova-cat-active-bar"></div>
          </button>
        </div>

        <!-- RIGHT: Game Grid -->
        <div style="flex:1;min-width:0;padding:8px 8px 8px 4px;">
          <!-- Skeleton -->
          <div v-if="loadingGames" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
            <div v-for="n in 9" :key="n" style="border-radius:12px;aspect-ratio:3/4;background:rgba(255,255,255,0.04);animation:nova-pulse 1.5s ease-in-out infinite;"></div>
          </div>
          <!-- Error -->
          <div v-else-if="fetchError" style="text-align:center;padding:30px 0;">
            <p style="color:rgba(255,100,100,0.8);font-size:12px;margin-bottom:10px;">{{ fetchError }}</p>
            <button @click="fetchGames" class="glass-btn-sm" style="color:#4ade80;padding:6px 14px;">Retry</button>
          </div>
          <!-- Empty -->
          <div v-else-if="filteredGames.length === 0" style="text-align:center;padding:30px 0;">
            <p style="color:rgba(255,255,255,0.22);font-size:12px;">ဂိမ်းမတွေ့ပါ</p>
          </div>
          <!-- Games: 3 col -->
          <div v-else style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
            <div v-for="(game, idx) in filteredGames" :key="game.id"
              class="nova-game-card" @click="openGame(game)"
              @touchstart="e => e.currentTarget.style.transform='scale(0.93)'"
              @touchend="e => e.currentTarget.style.transform='scale(1)'">
              <div style="position:relative;aspect-ratio:3/4;overflow:hidden;">
                <img :src="game.image_url" style="width:100%;height:100%;object-fit:cover;display:block;" :alt="game.name" loading="lazy" />
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.9) 0%,rgba(10,10,10,0.05) 45%,transparent 100%);"></div>
                <!-- HOT badge -->
                <div v-if="idx % 5 < 2" class="nova-badge nova-badge--hot">HOT</div>
                <!-- Provider -->
                <div class="nova-badge nova-badge--provider">{{ game.provider }}</div>
                <!-- Name -->
                <div style="position:absolute;bottom:0;left:0;right:0;padding:5px;">
                  <div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ game.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ FOOTER ══ -->
      <div style="padding:0 16px;border-top:1px solid rgba(255,255,255,0.07);margin-top:16px;">
        <!-- Contact -->
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

        <!-- Footer links 3-col -->
        <div style="padding:18px 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.55);margin-bottom:10px;">ကာစိန်</p>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <span class="nova-footer-link">မြန်အမ်းငွေ</span>
              <span class="nova-footer-link">ဆုလာဘ်</span>
              <span class="nova-footer-link">VIP</span>
              <span class="nova-footer-link">အေးချင့်</span>
              <span class="nova-footer-link">လုပ်ငန်းမူ</span>
            </div>
          </div>
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.55);margin-bottom:10px;">ဂိမ်း</p>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <span class="nova-footer-link">နာမည်ကြီး</span>
              <span class="nova-footer-link">စလော့</span>
              <span class="nova-footer-link">ကဒ်ဂိမ်းများ</span>
              <span class="nova-footer-link">ငါးမျှားရ</span>
              <span class="nova-footer-link">Live Casino</span>
              <span class="nova-footer-link">အားကစား</span>
            </div>
          </div>
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.55);margin-bottom:10px;">အကူအညီ</p>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <span class="nova-footer-link">အကောင့်အကူ</span>
              <span class="nova-footer-link">ဆောင်းတ</span>
              <span class="nova-footer-link">ကြေငြာချက်</span>
            </div>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 -16px;"></div>

        <!-- Social icons -->
        <div style="padding:18px 0;display:flex;justify-content:center;gap:14px;">
          <div class="nova-social-icon" style="background:rgba(41,182,246,0.1);border-color:rgba(41,182,246,0.2);">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none"><path d="M32 10.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.6.8-2.5 1A4.2 4.2 0 0020.4 15c0 .3 0 .6.1.9C15.2 15.7 11 12.8 8.1 8.7c-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.5-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.3 4.3 0 01-1.9.1c.5 1.7 2.1 2.9 3.9 3A8.4 8.4 0 018 22.8c1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.2z" fill="rgba(41,182,246,0.9)"/></svg>
          </div>
          <div class="nova-social-icon" style="background:rgba(131,58,180,0.1);border-color:rgba(131,58,180,0.25);">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none"><rect x="10" y="10" width="20" height="20" rx="6" stroke="url(#igs)" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="5" stroke="url(#igs)" stroke-width="2.5" fill="none"/><circle cx="27" cy="13" r="1.3" fill="#fcb045"/><defs><linearGradient id="igs" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#833ab4"/><stop offset=".5" stop-color="#fd1d1d"/><stop offset="1" stop-color="#fcb045"/></linearGradient></defs></svg>
          </div>
          <div class="nova-social-icon" style="background:rgba(114,0,212,0.1);border-color:rgba(114,0,212,0.22);">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none"><path d="M20 8C13.4 8 8 13.4 8 20c0 2.7.9 5.2 2.4 7.2L8.3 32l5-2.1C15 31.2 17.4 32 20 32c6.6 0 12-5.4 12-12S26.6 8 20 8zm5.9 16.4c-.3.8-1.5 1.5-2.1 1.5-.6.1-1.1.3-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.2-.2-1.5-2-1.5-3.8s1-2.6 1.3-3c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.5.3.6 1 2.3 1.1 2.5.1.2.2.4.1.7-.1.2-.2.4-.4.6l-.5.6c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.3 1.1 2.5 1.5 2.8 1.6.3.1.6.1.8-.1l.5-.6c.3-.3.5-.2.8-.1l2.3 1.1c.3.1.5.2.5.5.1.5-.1 1.4-.4 2.2z" fill="rgba(130,80,230,0.9)"/></svg>
          </div>
          <div class="nova-social-icon" style="background:rgba(24,119,242,0.1);border-color:rgba(24,119,242,0.22);">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none"><path d="M22.7 21h-2.7v9H17v-9h-2v-3h2v-1.9c0-1.6.8-4.1 4.1-4.1H24v3h-2.1c-.4 0-.8.1-.8.8V18H24l-.4 3h-.9z" fill="rgba(24,119,242,0.9)"/></svg>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 -16px;"></div>

        <!-- License grid -->
        <div style="padding:18px 0;">
          <p style="font-size:10px;color:rgba(255,255,255,0.4);text-align:center;margin-bottom:12px;letter-spacing:0.1em;font-weight:600;">LICENSED & CERTIFIED</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">
            <div v-for="n in 8" :key="n" class="nova-license-slot"></div>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 -16px;"></div>

        <!-- Description -->
        <div style="padding:18px 0 140px;">
          <p style="font-size:11px;line-height:1.85;color:rgba(255,255,255,0.5);margin-bottom:10px;">
            <span style="color:#4ade80;font-weight:700;">NovaBETT</span> သည် ကာစိန်ဂိမ်းများ၊ ပိုကာဂိမ်းများ၊ စလော့ဂိမ်းများ မြင်းပြိုင်မြောက်မြားစွာ ဆော့ကစားနိုင်သောနေရာတစ်ခု ဖြစ်သည်။ ငွေသွင်းငွေထုတ် 24/7 ရနိုင်ပြီး Customer Support ကို အမြဲတမ်း ဆက်သွယ်နိုင်သည်။
          </p>
          <p style="font-size:10px;color:rgba(255,255,255,0.35);text-align:center;">© လုပ်ပိုင်ခွင့်များ ၂၀၀၀ - ၂၀၃၀</p>
        </div>
      </div>

      <!-- ══ BOTTOM NAV ══ -->
      <nav class="nova-bottom-nav">
        <div style="display:flex;justify-content:space-around;align-items:center;padding:8px 0 4px;">
          <router-link to="/home" style="text-decoration:none;" :class="['nova-nav-item', $route.path === '/home' ? 'nova-nav-active' : '']">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span>ပင်မ</span>
          </router-link>
          <router-link to="/promotions" style="text-decoration:none;" :class="['nova-nav-item', $route.path === '/promotions' ? 'nova-nav-active' : '']">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 12c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8 8-3.58 8-8zM6 12l6-6 1.41 1.41L8.83 12l4.58 4.59L12 18l-6-6z"/></svg>
            <span>ပရိုမို</span>
          </router-link>
          <router-link to="/agent" style="text-decoration:none;" :class="['nova-nav-item', $route.path === '/agent' ? 'nova-nav-active' : '']">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            <span>အေးဂျင့်</span>
          </router-link>
          <router-link to="/service" style="text-decoration:none;" :class="['nova-nav-item', $route.path === '/service' ? 'nova-nav-active' : '']">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            <span>ဆက်သွယ်</span>
          </router-link>
          <router-link to="/account" style="text-decoration:none;" :class="['nova-nav-item', $route.path === '/account' ? 'nova-nav-active' : '']">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            <span>အကောင့်</span>
          </router-link>
        </div>
      </nav>

      <!-- ══ MODALS ══ -->
      <DepositModal v-model="showDepositModal" @submit="handleDepositSubmit" />
      <WithdrawModal v-model="showWithdrawModal" :balance="mainBalance" @submit="handleWithdrawSubmit" />

      <!-- ══ AUTH POPUP ══ -->
      <van-popup v-model:show="showAuthModal" position="bottom" round
        :style="{ background: 'rgba(13,17,14,0.98)', maxHeight: '88vh', overflow: 'auto' }">
        <div style="padding:20px;">
          <div style="width:38px;height:4px;background:rgba(255,255,255,0.12);border-radius:2px;margin:0 auto 18px;"></div>
          <div style="text-align:center;margin-bottom:18px;">
            <div style="width:46px;height:46px;border-radius:14px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.22);display:flex;align-items:center;justify-content:center;margin:0 auto 10px;"><span style="font-size:22px;font-weight:900;color:#4ade80;">N</span></div>
            <div style="font-size:19px;font-weight:900;color:rgba(255,255,255,0.9);letter-spacing:0.1em;">NOVABETT</div>
            <div style="font-size:9px;color:rgba(255,255,255,0.22);letter-spacing:0.2em;text-transform:uppercase;margin-top:4px;">Premium Gaming Platform</div>
          </div>
          <div style="display:flex;background:rgba(255,255,255,0.04);border-radius:24px;padding:3px;margin-bottom:18px;border:1px solid rgba(255,255,255,0.06);">
            <button @click="authTab='login'" class="nova-auth-tab" :class="authTab==='login'?'nova-auth-tab--active':''">ဝင်ရောက်မည်</button>
            <button @click="authTab='register'" class="nova-auth-tab" :class="authTab==='register'?'nova-auth-tab--active':''">အကောင့်ဖွင့်မည်</button>
          </div>
          <div v-if="authTab === 'login'" style="display:flex;flex-direction:column;gap:13px;">
            <div><label class="nova-label">အကောင့်အမည်</label><input v-model="loginUsername" type="text" placeholder="အကောင့်နာမည်" class="nova-input" /></div>
            <div>
              <label class="nova-label">စကားဝှက်</label>
              <div style="position:relative;"><input v-model="loginPassword" :type="loginShowPassword?'text':'password'" placeholder="••••••••" class="nova-input" style="padding-right:40px;" />
              <button @click="loginShowPassword=!loginShowPassword" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.3);"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path :d="loginShowPassword?'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22':'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z'"/></svg></button></div>
            </div>
            <p v-if="loginError" style="color:#f87171;font-size:11px;text-align:center;margin:0;">{{ loginError }}</p>
            <button @click="handleLogin" :disabled="loginLoading" class="glass-btn-primary"><span>{{ loginLoading ? 'Loading...' : 'ဝင်ရောက်မည်' }}</span></button>
          </div>
          <div v-if="authTab === 'register'" style="display:flex;flex-direction:column;gap:13px;">
            <div><label class="nova-label">အကောင့်အမည်</label><input v-model="regUsername" type="text" placeholder="အကောင့်နာမည်" class="nova-input" /></div>
            <div><label class="nova-label">ဖုန်းနံပါတ်</label><input v-model="regPhone" type="tel" placeholder="09xxxxxxxxx" class="nova-input" /></div>
            <div>
              <label class="nova-label">စကားဝှက်</label>
              <div style="position:relative;"><input v-model="regPassword" :type="regShowPassword?'text':'password'" placeholder="••••••••" class="nova-input" style="padding-right:40px;" />
              <button @click="regShowPassword=!regShowPassword" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.3);"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path :d="regShowPassword?'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22':'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z'"/></svg></button></div>
            </div>
            <p v-if="regError" style="color:#f87171;font-size:11px;text-align:center;margin:0;">{{ regError }}</p>
            <button @click="handleRegister" :disabled="regLoading" class="glass-btn-primary"><span>{{ regLoading ? 'Loading...' : 'အကောင့်ဖွင့်မည်' }}</span></button>
          </div>
          <div style="height:20px;"></div>
        </div>
      </van-popup>
    </div>
  </template>

  <script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
  import { useRoute } from 'vue-router'
  import { showToast } from 'vant'
  import { supabase } from '@/lib/supabase'
  import DepositModal from '@/components/DepositModal.vue'
  import WithdrawModal from '@/components/WithdrawModal.vue'

  const route = useRoute()

  // ── STATE ──
  const isLoggedIn = ref(false)
  const username = ref('')
  const mainBalance = ref(0)
  const currentLang = ref('en')
  const showAuthModal = ref(false)
  const authTab = ref('login')
  const loginUsername = ref(''); const loginPassword = ref(''); const loginShowPassword = ref(false); const loginLoading = ref(false); const loginError = ref('')
  const regUsername = ref(''); const regPhone = ref(''); const regPassword = ref(''); const regShowPassword = ref(false); const regLoading = ref(false); const regError = ref('')
  const searchVisible = ref(false); const searchQuery = ref('')
  const showDepositModal = ref(false); const showWithdrawModal = ref(false)
  const sidebarTop = ref('53px')

  // ── BANNER ──
  const bannerImages = ref(['/images/banners/banner1.jpg','/images/banners/banner2.jpg','/images/banners/banner3.jpg','/images/banners/banner4.jpg','/images/banners/banner5.jpg'])
  const bannerIdx = ref(0)
  let bannerTimer = null; let touchStartX = 0
  function startBannerTimer() { clearInterval(bannerTimer); bannerTimer = setInterval(() => { bannerIdx.value = (bannerIdx.value + 1) % bannerImages.value.length }, 4000) }
  function onBannerTouchStart(e) { touchStartX = e.touches[0].clientX; clearInterval(bannerTimer) }
  function onBannerTouchMove(e) { e.preventDefault() }
  function onBannerTouchEnd(e) {
    const dx = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) bannerIdx.value = dx > 0 ? (bannerIdx.value + 1) % bannerImages.value.length : bannerIdx.value === 0 ? bannerImages.value.length - 1 : bannerIdx.value - 1
    startBannerTimer()
  }

  // ── CATEGORIES with SVG paths (no emoji) ──
  const categories = ref([
    { id: 'popular', name: 'နာမည်ကြီး',    svgPath: 'M12 2C9 7 4 8 4 13a8 8 0 0016 0c0-5-5-6-8-11zm0 14a3 3 0 01-3-3c0-2 2-3 3-5 1 2 3 3 3 5a3 3 0 01-3 3z' },
    { id: 'slot',    name: '777 စလော့',    svgPath: 'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 5v8h2V8H8zm4 0v8h2V8h-2zm4 0v8h2V8h-2z' },
    { id: 'pp',      name: 'Pragmatic',     svgPath: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 3a5 5 0 100 10A5 5 0 0012 7zm0 2a3 3 0 110 6 3 3 0 010-6z' },
    { id: 'jili',    name: 'JILI Slot',     svgPath: 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z' },
    { id: 'pg',      name: 'PG Soft',       svgPath: 'M3 3h8v8H3zm10 0h8v8h-8zm0 10h8v8h-8zM3 13h8v8H3z' },
    { id: 'jdb',     name: 'JDB Slot',      svgPath: 'M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm0 4l1.5 4.5H18l-3.7 2.7 1.4 4.3L12 16l-3.7 2.5 1.4-4.3L6 11.5h4.5z' },
    { id: 'live',    name: 'Live Casino',   svgPath: 'M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z' },
    { id: 'fish',    name: 'ငါးမျှားရ',  svgPath: 'M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' },
    { id: 'fav',     name: 'အကြိုက်ဆုံး', svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
    { id: 'recent',  name: 'မကြာသေးမီက', svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z' },
    { id: 'fishing', name: 'ငါးဖမ်း',    svgPath: 'M6 3v7a6 6 0 006 6 6 6 0 006-6V3h-2v7a4 4 0 01-4 4 4 4 0 01-4-4V3H6zm-1 9a7 7 0 007 7 7 7 0 007-7h-2a5 5 0 01-5 5 5 5 0 01-5-5H5z' },
  ])
  const activeCategory = ref('popular')

  // ── Canvas glow for active category button ──
  const glowCanvases = {}
  function registerGlowCanvas(el, catId) {
    if (!el) return
    glowCanvases[catId] = el
    nextTick(() => drawGlow(el))
  }
  function drawGlow(canvas) {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width, h = canvas.height
    ctx.clearRect(0, 0, w, h)
    const gradient = ctx.createRadialGradient(w/2, h/2, 2, w/2, h/2, w * 0.65)
    gradient.addColorStop(0, 'rgba(34,197,94,0.28)')
    gradient.addColorStop(0.5, 'rgba(34,197,94,0.10)')
    gradient.addColorStop(1, 'rgba(34,197,94,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
  }

  // ── GAMES ──
  const games = ref([]); const loadingGames = ref(true); const fetchError = ref(null)
  async function fetchGames() {
    loadingGames.value = true; fetchError.value = null
    try {
      const { data, error } = await supabase.from('games').select('*').eq('is_active', true).order('provider', { ascending: true })
      if (error) throw error
      games.value = data || []
    } catch { fetchError.value = 'ဂိမ်းများ ရယူ၍မရပါ' }
    finally { loadingGames.value = false }
  }
  const filteredGames = computed(() => {
    let list = games.value
    if (searchQuery.value) { const q = searchQuery.value.toLowerCase(); list = list.filter(g => g.name?.toLowerCase().includes(q)) }
    return list
  })

  // ── AUTH ──
  async function loadUserInfo() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { isLoggedIn.value = false; return }
      isLoggedIn.value = true
      username.value = (session.user.email || '').replace(/@novabett\.internal$/, '').toUpperCase()
      await fetchBalance()
    } catch { isLoggedIn.value = false }
  }
  async function fetchBalance() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const { data } = await supabase.from('wallets').select('balance').eq('user_id', session.user.id).single()
      if (data) mainBalance.value = Number(data.balance) || 0
    } catch {}
  }
  async function handleLogin() {
    loginError.value = ''
    if (!loginUsername.value || !loginPassword.value) { loginError.value = 'အချက်အလက်များ ဖြည့်ပါ'; return }
    loginLoading.value = true
    try {
      const email = loginUsername.value.toUpperCase() + '@novabett.internal'
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: loginPassword.value })
      if (error) throw error
      if (data.session?.access_token) localStorage.setItem('sb_token', data.session.access_token)
      await loadUserInfo()
      showToast({ type: 'success', message: 'ဝင်ရောက်မှု အောင်မြင်ပါသည်' })
      showAuthModal.value = false; loginUsername.value = ''; loginPassword.value = ''
    } catch { loginError.value = 'Username သို့မဟုတ် Password မမှန်ပါ' }
    finally { loginLoading.value = false }
  }
  async function handleRegister() {
    regError.value = ''
    if (!regUsername.value || !regPhone.value || !regPassword.value) { regError.value = 'အချက်အလက်များ ဖြည့်ပါ'; return }
    regLoading.value = true
    try {
      const referral = route.query.dl || ''
      const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/register3', {
        method: 'POST', headers: { 'Authorization': 'Bearer sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb', 'apikey': 'sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb', 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: regUsername.value, phone: regPhone.value, password: regPassword.value, referral })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const email = regUsername.value.toUpperCase() + '@novabett.internal'
      const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({ email, password: regPassword.value })
      if (loginErr) throw loginErr
      if (loginData.session?.access_token) localStorage.setItem('sb_token', loginData.session.access_token)
      await loadUserInfo()
      showToast({ type: 'success', message: 'အကောင့်ဖွင့် အောင်မြင်ပါသည်' })
      showAuthModal.value = false; regUsername.value = ''; regPhone.value = ''; regPassword.value = ''
    } catch (e) { regError.value = e.message }
    finally { regLoading.value = false }
  }
  function openGame(game) {
    if (!isLoggedIn.value) { showAuthModal.value = true; authTab.value = 'login'; return }
    showToast(game.name + ' မကြာမီ ရနိုင်မည်')
  }
  function toggleLanguage() { currentLang.value = currentLang.value === 'en' ? 'mm' : 'en' }
  const formatCurrency = (n) => new Intl.NumberFormat('en-US').format(n)

  async function handleDepositSubmit(data) {
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token
      if (!token) { showToast({ type: 'fail', message: 'ဝင်ရောက်ပါ' }); return }
      const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/deposit', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }, body: JSON.stringify({ method: data.method, amount: data.amount, slip: data.slip }) })
      const result = await res.json()
      if (result.error) throw new Error(result.error)
      showToast({ type: 'success', message: 'ငွေသွင်းမှု အောင်မြင်ပါသည်' }); setTimeout(() => fetchBalance(), 2000)
    } catch (e) { showToast({ type: 'fail', message: e.message }) }
  }
  async function handleWithdrawSubmit(data) {
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token
      if (!token) { showToast({ type: 'fail', message: 'ဝင်ရောက်ပါ' }); return }
      const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/withdraw', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }, body: JSON.stringify({ method: data.method, phone: data.phone, accountName: data.accountName, amount: data.amount }) })
      const result = await res.json()
      if (result.error) throw new Error(result.error)
      showToast({ type: 'success', message: 'ငွေထုတ်မှု အောင်မြင်ပါသည်' }); setTimeout(() => fetchBalance(), 2000)
    } catch (e) { showToast({ type: 'fail', message: e.message }) }
  }

  onMounted(() => { loadUserInfo(); fetchGames(); startBannerTimer() })
  onUnmounted(() => clearInterval(bannerTimer))
  </script>

  <style scoped>
  /* ── BASE ── */
  .nova-app { background:#0a0a0a; min-height:100vh; color:#fff; -webkit-tap-highlight-color:rgba(0,0,0,0); }

  /* ── HEADER ── */
  .nova-header {
    position:sticky; top:0; z-index:100;
    background:rgba(10,10,10,0.95);
    backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(255,255,255,0.06);
    padding:10px 16px; display:flex; align-items:center; justify-content:space-between;
  }
  .nova-logo {
    width:36px; height:36px; border-radius:10px;
    background:linear-gradient(135deg,#22c55e,#15803d);
    display:flex; align-items:center; justify-content:center;
    font-weight:900; font-size:16px; color:#fff; flex-shrink:0;
    box-shadow:0 0 18px rgba(34,197,94,0.45);
  }
  .nova-brand {
    font-size:20px; font-weight:900; line-height:1.15;
    background:linear-gradient(135deg,#4ade80,#22c55e);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }

  /* ── SEARCH ── */
  .nova-search-bar {
    position:relative; padding:8px 16px;
    background:#0a0a0a; border-bottom:1px solid rgba(255,255,255,0.06);
  }

  /* ── MARQUEE ── */
  @keyframes nova-marquee { from { transform:translateX(100vw); } to { transform:translateX(-100%); } }
  .nova-marquee { display:inline-block; animation:nova-marquee 30s linear infinite; will-change:transform; white-space:nowrap; }

  /* ── SIDEBAR ── */
  .nova-sidebar {
    width:72px; flex-shrink:0;
    position:sticky; height:calc(100vh - 53px);
    overflow-y:auto; align-self:flex-start;
    background:rgba(10,10,10,0.98);
    border-right:1px solid rgba(255,255,255,0.055);
    padding:6px 0;
    -ms-overflow-style:none; scrollbar-width:none;
  }
  .nova-sidebar::-webkit-scrollbar { display:none; }

  /* ── 3D Category Button ── */
  .nova-cat-btn {
    position:relative; width:100%; display:flex; flex-direction:column;
    align-items:center; gap:5px; padding:10px 4px;
    background:transparent; border:none; cursor:pointer;
    -webkit-tap-highlight-color:transparent; overflow:hidden;
    transition:background 0.2s;
  }
  .nova-cat-btn:active { opacity:0.75; }

  .nova-cat-btn--active {
    background:rgba(34,197,94,0.06);
  }

  /* Canvas glow overlay */
  .nova-cat-glow {
    position:absolute; inset:0; width:100%; height:100%;
    pointer-events:none; z-index:0;
  }

  /* 3D SVG icon container */
  .nova-cat-icon-wrap {
    position:relative; z-index:1;
    width:40px; height:40px; border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    /* 3D glass surface */
    background: linear-gradient(145deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 50%,rgba(0,0,0,0.15) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow:
      0 2px 4px rgba(0,0,0,0.4),
      0 4px 12px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(255,255,255,0.12),
      inset 0 -1px 0 rgba(0,0,0,0.2);
    backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    transform: perspective(120px) rotateX(4deg);
    transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
  }
  .nova-cat-btn--active .nova-cat-icon-wrap {
    background: linear-gradient(145deg,rgba(34,197,94,0.18) 0%,rgba(34,197,94,0.06) 50%,rgba(0,0,0,0.1) 100%);
    border-color: rgba(34,197,94,0.35);
    box-shadow:
      0 2px 4px rgba(0,0,0,0.35),
      0 6px 18px rgba(34,197,94,0.2),
      0 0 22px rgba(34,197,94,0.1),
      inset 0 1px 0 rgba(255,255,255,0.18),
      inset 0 -1px 0 rgba(0,0,0,0.15);
    transform: perspective(120px) rotateX(4deg) translateY(-1px);
  }

  .nova-cat-svg { width:18px; height:18px; }

  /* Label */
  .nova-cat-label {
    position:relative; z-index:1;
    font-size:9px; font-weight:700; color:rgba(255,255,255,0.38);
    text-align:center; line-height:1.2; letter-spacing:0.01em;
    word-break:break-all; hyphens:auto;
    transition:color 0.2s;
  }
  .nova-cat-btn--active .nova-cat-label { color:rgba(74,222,128,0.9); }

  /* Active left bar indicator */
  .nova-cat-active-bar {
    position:absolute; left:0; top:20%; bottom:20%;
    width:3px; border-radius:0 2px 2px 0;
    background:linear-gradient(to bottom,#4ade80,#22c55e);
    box-shadow:0 0 8px rgba(34,197,94,0.6);
  }

  /* ── GAME CARDS ── */
  .nova-game-card {
    border-radius:12px; overflow:hidden; cursor:pointer;
    background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);
    box-shadow:0 2px 10px rgba(0,0,0,0.45);
    transform:translateZ(0); transition:transform 0.12s ease;
    -webkit-tap-highlight-color:transparent;
  }
  .nova-badge {
    position:absolute; font-size:7px; font-weight:900; border-radius:5px; padding:2px 4px;
  }
  .nova-badge--hot {
    top:5px; right:5px;
    background:linear-gradient(135deg,#ef4444,#dc2626);
    color:#fff; box-shadow:0 2px 6px rgba(239,68,68,0.4);
  }
  .nova-badge--provider {
    top:5px; left:5px;
    background:rgba(0,0,0,0.65); color:rgba(255,255,255,0.65);
    backdrop-filter:blur(4px);
  }

  /* ── QUICK ICONS ── */
  .nova-quick-icon { display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;-webkit-tap-highlight-color:transparent; }
  .nova-quick-icon span { font-size:8.5px;color:rgba(255,255,255,0.42);font-weight:600;white-space:nowrap; }
  .nova-quick-icon:active { opacity:0.65; }

  /* ── GLASS TECH BUTTONS ── */
  .glass-btn-primary {
    width:100%; height:48px; border-radius:12px; border:none; cursor:pointer;
    font-size:15px; font-weight:800; letter-spacing:0.06em; color:#fff;
    position:relative; overflow:hidden;
    background:linear-gradient(135deg,rgba(34,197,94,0.88),rgba(21,128,61,0.92));
    box-shadow:0 6px 22px rgba(34,197,94,0.28), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.12);
    backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
    transition:box-shadow 0.2s,transform 0.1s; -webkit-tap-highlight-color:transparent;
  }
  .glass-btn-primary::before { content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(to bottom,rgba(255,255,255,0.14),transparent);border-radius:12px 12px 0 0;pointer-events:none; }
  .glass-btn-primary:active { transform:scale(0.97); }
  .glass-btn-primary:disabled { opacity:0.45; }

  .glass-btn-auth {
    height:34px; padding:0 13px; border-radius:9px; cursor:pointer;
    font-size:11.5px; font-weight:700; letter-spacing:0.03em; color:rgba(255,255,255,0.72);
    position:relative; overflow:hidden;
    background:rgba(255,255,255,0.065);
    border:1px solid rgba(255,255,255,0.13);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.09), 0 2px 8px rgba(0,0,0,0.3);
    backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
    transition:all 0.18s; -webkit-tap-highlight-color:transparent; white-space:nowrap;
  }
  .glass-btn-auth::before { content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(to bottom,rgba(255,255,255,0.08),transparent);pointer-events:none; }
  .glass-btn-auth:active { transform:scale(0.95); opacity:0.82; }
  .glass-btn-auth--primary {
    background:linear-gradient(135deg,rgba(34,197,94,0.78),rgba(21,128,61,0.85));
    border-color:rgba(34,197,94,0.38); color:#fff;
    box-shadow:0 4px 14px rgba(34,197,94,0.24), inset 0 1px 0 rgba(255,255,255,0.16);
  }

  .glass-btn-sm {
    border-radius:8px; cursor:pointer;
    background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);
    backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
    -webkit-tap-highlight-color:transparent; transition:opacity 0.15s;
  }
  .glass-btn-sm:active { opacity:0.7; }
  .glass-btn-icon {
    width:36px; height:36px; border-radius:50%; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);
    backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
    -webkit-tap-highlight-color:transparent; transition:opacity 0.15s;
  }
  .glass-btn-icon:active { opacity:0.7; }

  /* ── INPUTS ── */
  .nova-input {
    width:100%; box-sizing:border-box;
    background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
    border-radius:10px; padding:11px 12px; color:#fff; font-size:14px; outline:none;
    backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.05); transition:border-color 0.2s;
  }
  .nova-input::placeholder { color:rgba(255,255,255,0.18); }
  .nova-input:focus { border-color:rgba(34,197,94,0.42); box-shadow:0 0 0 3px rgba(34,197,94,0.07),inset 0 1px 0 rgba(255,255,255,0.05); }
  .nova-label { display:block; font-size:11px; color:rgba(255,255,255,0.32); margin-bottom:6px; font-weight:600; }

  /* ── AUTH TABS ── */
  .nova-auth-tab { flex:1; padding:9px; border-radius:21px; font-size:12px; font-weight:700; cursor:pointer; letter-spacing:0.04em; background:transparent; border:1px solid transparent; color:rgba(255,255,255,0.28); transition:all 0.22s; -webkit-tap-highlight-color:transparent; }
  .nova-auth-tab--active { background:linear-gradient(135deg,rgba(34,197,94,0.22),rgba(21,128,61,0.18)); border-color:rgba(34,197,94,0.28); color:rgba(74,222,128,0.95); }

  /* ── CONTACT / SOCIAL ── */
  .nova-contact-icon { display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 14px;border-radius:14px;cursor:pointer;border:1px solid rgba(255,255,255,0.08);-webkit-tap-highlight-color:transparent; }
  .nova-contact-icon span { font-size:10px;color:rgba(255,255,255,0.45);font-weight:600; }
  .nova-contact-icon:active { opacity:0.7; }
  .nova-social-icon { width:62px;height:62px;border-radius:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(255,255,255,0.08);-webkit-tap-highlight-color:transparent; }
  .nova-social-icon:active { opacity:0.7; }

  /* ── LICENSE ── */
  .nova-license-slot { height:50px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center; }

  /* ── FOOTER LINKS ── */
  .nova-footer-link { font-size:11px;color:rgba(255,255,255,0.45);cursor:pointer;line-height:1.5;-webkit-tap-highlight-color:transparent; }
  .nova-footer-link:active { color:rgba(255,255,255,0.65); }

  /* ── BOTTOM NAV ── */
  .nova-bottom-nav {
    position:fixed; bottom:0; left:0; right:0; z-index:200;
    background:rgba(10,10,10,0.96);
    backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
    border-top:1px solid rgba(255,255,255,0.07);
    padding-bottom:env(safe-area-inset-bottom,0);
  }
  .nova-nav-item { display:flex;flex-direction:column;align-items:center;gap:2px;color:rgba(255,255,255,0.28);font-size:9px;font-weight:700;padding:4px 10px;border-radius:10px;transition:color 0.2s;-webkit-tap-highlight-color:transparent;user-select:none;letter-spacing:0.03em; }
  .nova-nav-active { color:#22c55e !important; }

  /* ── SKELETON ── */
  @keyframes nova-pulse { 0%,100%{opacity:.35;}50%{opacity:.65;} }

  /* ── VANT OVERRIDES ── */
  :deep(.van-popup) { border-radius:24px 24px 0 0 !important; }
  :deep(.van-overlay) { background:rgba(0,0,0,0.75) !important; backdrop-filter:blur(4px); }
  </style>
  