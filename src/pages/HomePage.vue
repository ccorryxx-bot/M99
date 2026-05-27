<template>
    <div class="nova-app" style="background:#0a0a0a;min-height:100vh;color:#fff;-webkit-tap-highlight-color:rgba(0,0,0,0);">

      <!-- ══ HEADER ══ -->
      <header style="position:sticky;top:0;z-index:100;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.06);padding:10px 16px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#15803d);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#fff;flex-shrink:0;box-shadow:0 0 16px rgba(34,197,94,0.4);">N</div>
          <div>
            <div style="font-size:9px;color:rgba(34,197,94,0.55);letter-spacing:0.2em;text-transform:uppercase;line-height:1;">WELCOME TO</div>
            <div style="font-size:20px;font-weight:900;line-height:1.15;background:linear-gradient(135deg,#4ade80,#22c55e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">NovaBETT</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button @click="toggleLanguage" class="glass-btn-sm" style="color:rgba(34,197,94,0.9);font-size:11px;font-weight:700;padding:5px 10px;">{{ currentLang === 'en' ? 'မြန်မာ' : 'EN' }}</button>
          <button @click="searchVisible = !searchVisible" class="glass-btn-icon">
            <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>
      </header>

      <!-- Search Bar -->
      <div v-if="searchVisible" style="padding:8px 16px;background:#0a0a0a;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="position:relative;">
          <input v-model="searchQuery" type="text" placeholder="ဂိမ်းရှာပါ..."
            class="nova-input" style="padding-left:36px;" />
          <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
      </div>

      <!-- ══ SWIPER BANNER ══ -->
      <div style="position:relative;overflow:hidden;aspect-ratio:2.2/1;background:#111;">
        <div style="display:flex;transition:transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);will-change:transform;"
          :style="{ transform: 'translateX(-' + (bannerIdx * 100) + '%)' }"
          @touchstart="onBannerTouchStart" @touchmove.prevent="onBannerTouchMove" @touchend="onBannerTouchEnd">
          <div v-for="(img, i) in bannerImages" :key="i" style="min-width:100%;position:relative;aspect-ratio:2.2/1;">
            <img :src="img" style="width:100%;height:100%;object-fit:cover;display:block;" alt="banner" loading="lazy" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.45) 0%,transparent 55%);"></div>
          </div>
        </div>
        <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:5px;z-index:2;">
          <div v-for="(_, i) in bannerImages" :key="i" @click="bannerIdx = i"
            :style="i === bannerIdx ? 'width:20px;height:4px;background:#22c55e;border-radius:2px;' : 'width:4px;height:4px;background:rgba(255,255,255,0.3);border-radius:50%;'"
            style="transition:all 0.3s;cursor:pointer;"></div>
        </div>
      </div>

      <!-- ══ MARQUEE BAR ══ -->
      <div style="display:flex;align-items:center;background:#111;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);padding:7px 12px;gap:8px;overflow:hidden;">
        <svg width="15" height="15" fill="rgba(34,197,94,0.85)" viewBox="0 0 24 24" style="flex-shrink:0;"><path d="M18 9v-3a6 6 0 10-12 0v3l-2 2v1h16v-1l-2-2zm-6 13a3 3 0 003-3H9a3 3 0 003 3z"/></svg>
        <div style="flex:1;overflow:hidden;position:relative;">
          <span class="nova-marquee" style="font-size:12px;color:rgba(255,255,255,0.6);">🎉 NovaBETT မှ ကြိုဆိုပါသည်&nbsp;&nbsp;&nbsp;⚡ ငွေသွင်းငွေထုတ် 24/7&nbsp;&nbsp;&nbsp;🎰 JILI, PP, PG ဂိမ်းများ&nbsp;&nbsp;&nbsp;🏆 VIP အဖွဲ့ဝင်များ အထူးဆုများ&nbsp;&nbsp;&nbsp;📞 Customer Support 24/7&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div style="position:relative;flex-shrink:0;">
          <svg width="17" height="17" fill="rgba(255,255,255,0.35)" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span style="position:absolute;top:-5px;right:-6px;background:#ef4444;color:#fff;font-size:8px;font-weight:900;border-radius:10px;padding:1px 4px;min-width:16px;text-align:center;line-height:14px;">99+</span>
        </div>
      </div>

      <!-- ══ ACTION ROW: Login/Register (LEFT small) + Quick Icons (RIGHT) ══ -->
      <div v-if="!isLoggedIn" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <!-- LEFT: Login + Register buttons (small) -->
        <div style="display:flex;align-items:center;gap:7px;flex-shrink:0;">
          <button @click="showAuthModal = true; authTab = 'login'" class="glass-btn-auth">
            <span>လောဂ်အင်</span>
          </button>
          <button @click="showAuthModal = true; authTab = 'register'" class="glass-btn-auth glass-btn-auth--primary">
            <span>မှတ်ပုံတင်</span>
          </button>
        </div>
        <!-- RIGHT: 4 Quick icons -->
        <div style="display:flex;align-items:center;gap:10px;">
          <div @click="showAuthModal = true; authTab = 'login'" class="nova-quick-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            <span>ငွေသွင်းရန်</span>
          </div>
          <div @click="showAuthModal = true; authTab = 'login'" class="nova-quick-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M7 15h4m1-5h3"/></svg>
            <span>ငွေထုတ်ရန်</span>
          </div>
          <div class="nova-quick-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(234,179,8,0.9)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>VIP</span>
          </div>
          <div class="nova-quick-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.8"><path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 000 4h4v-4h-4z"/></svg>
            <span>ပံ့ပိုးမှုရန်</span>
          </div>
        </div>
      </div>

      <!-- ══ LOGGED-IN ROW ══ -->
      <div v-if="isLoggedIn" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,0.35);margin-bottom:2px;">{{ username }}</div>
          <div style="font-size:17px;font-weight:900;color:#4ade80;">{{ formatCurrency(mainBalance) }} <span style="font-size:10px;color:rgba(255,255,255,0.3);">MMK</span></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button @click="showDepositModal = true" class="glass-btn-auth glass-btn-auth--primary">ငွေသွင်း</button>
          <button @click="showWithdrawModal = true" class="glass-btn-auth">ငွေထုတ်</button>
          <div @click="() => {}" class="nova-quick-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(234,179,8,0.9)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>VIP</span>
          </div>
          <div class="nova-quick-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.8"><path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 000 4h4v-4h-4z"/></svg>
            <span>ပံ့ပိုးမှုရန်</span>
          </div>
        </div>
      </div>

      <!-- ══ CATEGORY TABS ══ -->
      <div style="padding:0 14px 10px;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch;" class="nova-no-scrollbar">
        <div style="display:inline-flex;gap:7px;">
          <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat.id"
            :class="activeCategory === cat.id ? 'nova-tab nova-tab--active' : 'nova-tab'">
            <span>{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
          </button>
        </div>
      </div>

      <!-- ══ GAME GRID ══ -->
      <div style="padding:0 12px;">
        <!-- Skeleton -->
        <div v-if="loadingGames" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
          <div v-for="n in 9" :key="n" style="border-radius:14px;overflow:hidden;background:rgba(255,255,255,0.04);aspect-ratio:3/4;animation:nova-pulse 1.6s ease-in-out infinite;"></div>
        </div>
        <!-- Error -->
        <div v-else-if="fetchError" style="text-align:center;padding:40px 0;">
          <p style="color:rgba(255,100,100,0.8);font-size:13px;margin-bottom:12px;">{{ fetchError }}</p>
          <button @click="fetchGames" class="glass-btn-sm" style="color:#4ade80;">ထပ်ကြိုးစားပါ</button>
        </div>
        <!-- Empty -->
        <div v-else-if="filteredGames.length === 0" style="text-align:center;padding:40px 0;">
          <p style="color:rgba(255,255,255,0.2);font-size:13px;">ဂိမ်းမတွေ့ပါ</p>
        </div>
        <!-- Games -->
        <div v-else style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
          <div v-for="(game, idx) in filteredGames" :key="game.id" @click="openGame(game)"
            class="nova-game-card"
            @touchstart="e => e.currentTarget.style.transform='scale(0.93)'"
            @touchend="e => e.currentTarget.style.transform='scale(1)'">
            <div style="position:relative;aspect-ratio:3/4;overflow:hidden;">
              <img :src="game.image_url" style="width:100%;height:100%;object-fit:cover;display:block;" :alt="game.name" loading="lazy" />
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.88) 0%,rgba(10,10,10,0.05) 45%,transparent 100%);"></div>
              <div v-if="idx % 5 < 2" style="position:absolute;top:6px;right:6px;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;font-size:7px;font-weight:900;border-radius:6px;padding:2px 5px;letter-spacing:0.05em;">🔥 HOT</div>
              <div style="position:absolute;top:6px;left:6px;background:rgba(0,0,0,0.6);border-radius:4px;padding:1px 5px;font-size:8px;font-weight:700;color:rgba(255,255,255,0.65);backdrop-filter:blur(6px);">{{ game.provider }}</div>
              <div style="position:absolute;bottom:0;left:0;right:0;padding:6px;">
                <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.88);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ game.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ FOOTER SECTION ══ -->
      <div style="margin-top:32px;padding:0 16px;border-top:1px solid rgba(255,255,255,0.06);">

        <!-- Contact Section -->
        <div style="padding:20px 0 16px;text-align:center;">
          <p style="font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:14px;">ဆက်သွယ်မှုကို ဆက်သွယ်ရန်</p>
          <div style="display:flex;justify-content:center;gap:16px;">
            <div class="nova-contact-icon" style="background:rgba(255,255,255,0.06);">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.08)"/>
                <path d="M20 8C13.4 8 8 13.4 8 20c0 2.7.9 5.2 2.4 7.2L8.3 32l5-2.1C15 31.2 17.4 32 20 32c6.6 0 12-5.4 12-12S26.6 8 20 8zm5.9 16.4c-.3.8-1.5 1.5-2.1 1.5-.6.1-1.1.3-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.2-.2-1.5-2-1.5-3.8s1-2.6 1.3-3c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.5.3.6 1 2.3 1.1 2.5.1.2.2.4.1.7-.1.2-.2.4-.4.6l-.5.6c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.3 1.1 2.5 1.5 2.8 1.6.3.1.6.1.8-.1l.5-.6c.3-.3.5-.2.8-.1l2.3 1.1c.3.1.5.2.5.5.1.5-.1 1.4-.4 2.2z" fill="rgba(255,255,255,0.7)"/>
              </svg>
              <span>Viber</span>
            </div>
            <div class="nova-contact-icon" style="background:rgba(41,182,246,0.1);">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="rgba(41,182,246,0.15)"/>
                <path d="M32 10.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.6.8-2.5 1A4.2 4.2 0 0020.4 15c0 .3 0 .6.1.9C15.2 15.7 11 12.8 8.1 8.7c-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.5-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.3 4.3 0 01-1.9.1c.5 1.7 2.1 2.9 3.9 3A8.4 8.4 0 018 22.8c1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.2z" fill="rgba(41,182,246,0.85)"/>
              </svg>
              <span>Twitter</span>
            </div>
            <div class="nova-contact-icon" style="background:rgba(0,119,181,0.1);">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="rgba(24,119,242,0.15)"/>
                <path d="M22.7 21h-2.7v9H17v-9h-2v-3h2v-1.9c0-1.6.8-4.1 4.1-4.1H24v3h-2.1c-.4 0-.8.1-.8.8V18H24l-.4 3h-.9z" fill="rgba(24,119,242,0.9)"/>
              </svg>
              <span>Facebook</span>
            </div>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.05);margin:0 -16px;"></div>

        <!-- Official channels -->
        <div style="padding:16px 0;text-align:center;">
          <p style="font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:14px;">တရားဝင်ချန်နယ်</p>
          <div style="display:flex;justify-content:center;gap:14px;">
            <div class="nova-contact-icon" style="background:rgba(41,182,246,0.1);">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="rgba(41,182,246,0.15)"/>
                <path d="M28.3 12.5l-3.3 16.1c-.2 1.1-1 1.3-1.8.8l-5-3.8-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.5-8.6c.4-.4-.1-.6-.6-.2L10.3 21.5l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6l22.3-8.6c.9-.3 1.7.2 1.4 1.7z" fill="rgba(41,182,246,0.85)"/>
              </svg>
              <span>Telegram</span>
            </div>
            <div class="nova-contact-icon" style="background:rgba(24,119,242,0.1);">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="rgba(24,119,242,0.15)"/>
                <path d="M22.7 21h-2.7v9H17v-9h-2v-3h2v-1.9c0-1.6.8-4.1 4.1-4.1H24v3h-2.1c-.4 0-.8.1-.8.8V18H24l-.4 3h-.9z" fill="rgba(24,119,242,0.9)"/>
              </svg>
              <span>Facebook</span>
            </div>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.05);margin:0 -16px;"></div>

        <!-- Footer Links 3-col -->
        <div style="padding:20px 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.45);margin-bottom:10px;">ကာစိန်</p>
            <div style="display:flex;flex-direction:column;gap:7px;">
              <span class="nova-footer-link">မြန်အမ်းငွေ</span>
              <span class="nova-footer-link">ဆုလာဘ်</span>
              <span class="nova-footer-link">VIP</span>
              <span class="nova-footer-link">အေးချင့်</span>
              <span class="nova-footer-link">လုပ်ငန်းမူ</span>
            </div>
          </div>
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.45);margin-bottom:10px;">ဂိမ်း</p>
            <div style="display:flex;flex-direction:column;gap:7px;">
              <span class="nova-footer-link">နာမည်ကြီး</span>
              <span class="nova-footer-link">စလော့</span>
              <span class="nova-footer-link">ကဒ်ဂိမ်းများ</span>
              <span class="nova-footer-link">ငါးမျှားရ</span>
              <span class="nova-footer-link">Live Casino</span>
              <span class="nova-footer-link">အားကစား</span>
            </div>
          </div>
          <div>
            <p style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.45);margin-bottom:10px;">အကူအညီ</p>
            <div style="display:flex;flex-direction:column;gap:7px;">
              <span class="nova-footer-link">အကောင့်အကူ</span>
              <span class="nova-footer-link">အကောင့်စာတ</span>
              <span class="nova-footer-link">ကြေငြာချက်</span>
            </div>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.05);margin:0 -16px;"></div>

        <!-- Social icons big row -->
        <div style="padding:20px 0;display:flex;justify-content:center;gap:16px;">
          <div style="width:64px;height:64px;border-radius:18px;background:rgba(41,182,246,0.12);border:1px solid rgba(41,182,246,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><path d="M32 10.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.6.8-2.5 1A4.2 4.2 0 0020.4 15c0 .3 0 .6.1.9C15.2 15.7 11 12.8 8.1 8.7c-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.5-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.3 4.3 0 01-1.9.1c.5 1.7 2.1 2.9 3.9 3A8.4 8.4 0 018 22.8c1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.2z" fill="rgba(41,182,246,0.9)"/></svg>
          </div>
          <div style="width:64px;height:64px;border-radius:18px;background:rgba(131,58,180,0.12);border:1px solid rgba(131,58,180,0.25);display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect x="9" y="9" width="22" height="22" rx="7" stroke="url(#ig)" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="5.5" stroke="url(#ig)" stroke-width="2.5" fill="none"/><circle cx="27" cy="13" r="1.5" fill="rgba(252,176,69,0.9)"/><defs><linearGradient id="ig" x1="9" y1="9" x2="31" y2="31" gradientUnits="userSpaceOnUse"><stop stop-color="#833ab4"/><stop offset=".5" stop-color="#fd1d1d"/><stop offset="1" stop-color="#fcb045"/></linearGradient></defs></svg>
          </div>
          <div style="width:64px;height:64px;border-radius:18px;background:rgba(114,0,212,0.12);border:1px solid rgba(114,0,212,0.25);display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><path d="M20 8C13.4 8 8 13.4 8 20c0 2.7.9 5.2 2.4 7.2L8.3 32l5-2.1C15 31.2 17.4 32 20 32c6.6 0 12-5.4 12-12S26.6 8 20 8zm5.9 16.4c-.3.8-1.5 1.5-2.1 1.5-.6.1-1.1.3-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.2-.2-1.5-2-1.5-3.8s1-2.6 1.3-3c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.5.3.6 1 2.3 1.1 2.5.1.2.2.4.1.7-.1.2-.2.4-.4.6l-.5.6c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.3 1.1 2.5 1.5 2.8 1.6.3.1.6.1.8-.1l.5-.6c.3-.3.5-.2.8-.1l2.3 1.1c.3.1.5.2.5.5.1.5-.1 1.4-.4 2.2z" fill="rgba(114,0,212,0.85)"/></svg>
          </div>
          <div style="width:64px;height:64px;border-radius:18px;background:rgba(24,119,242,0.12);border:1px solid rgba(24,119,242,0.25);display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><path d="M22.7 21h-2.7v9H17v-9h-2v-3h2v-1.9c0-1.6.8-4.1 4.1-4.1H24v3h-2.1c-.4 0-.8.1-.8.8V18H24l-.4 3h-.9z" fill="rgba(24,119,242,0.9)"/></svg>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.05);margin:0 -16px;"></div>

        <!-- License logos grid (2 col) - blank placeholders for PNG upload -->
        <div style="padding:20px 0;">
          <p style="font-size:11px;color:rgba(255,255,255,0.25);text-align:center;margin-bottom:14px;letter-spacing:0.08em;">LICENSED & CERTIFIED</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div v-for="n in 8" :key="n" class="nova-license-slot">
              <!-- Placeholder - PNG/JPG ထည့်ရန် -->
            </div>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.05);margin:0 -16px;"></div>

        <!-- Description + Copyright -->
        <div style="padding:20px 0 140px;">
          <p style="font-size:11px;line-height:1.75;color:rgba(255,255,255,0.25);margin-bottom:12px;">
            <span style="color:rgba(34,197,94,0.7);font-weight:700;">NovaBETT</span> သည် ကာစိန်ဂိမ်းများ၊ ပိုကာဂိမ်းများ၊ စလော့ဂိမ်းများ မြင်းပြိုင်မြောက်မြားစွာ ဆော့ကစားနိုင်သောနေရာတစ်ခု ဖြစ်သည်။ ငွေသွင်းငွေထုတ် 24/7 ရနိုင်ပြီး Customer Support ကို အမြဲတမ်း ဆက်သွယ်နိုင်သည်။
          </p>
          <p style="font-size:10px;color:rgba(255,255,255,0.15);text-align:center;">© လုပ်ပိုင်ခွင့်များ ၂၀၀၀ - ၂၀၃၀</p>
        </div>
      </div>

      <!-- ══ BOTTOM NAV ══ -->
      <nav style="position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(10,10,10,0.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);padding-bottom:env(safe-area-inset-bottom,0);">
        <div style="display:flex;justify-content:space-around;align-items:center;padding:8px 0 4px;">
          <router-link to="/home" style="text-decoration:none;" :class="['nova-nav-item', $route.path === '/home' ? 'nova-nav-active' : '']">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span>ပင်မ</span>
          </router-link>
          <router-link to="/promotions" style="text-decoration:none;" :class="['nova-nav-item', $route.path === '/promotions' ? 'nova-nav-active' : '']">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
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

      <!-- ══ AUTH MODAL (Vant bottom sheet) ══ -->
      <van-popup v-model:show="showAuthModal" position="bottom" round
        :style="{ background: 'rgba(13,17,14,0.98)', maxHeight: '88vh', overflow: 'auto' }">
        <div style="padding:20px 20px 16px;">
          <div style="width:38px;height:4px;background:rgba(255,255,255,0.12);border-radius:2px;margin:0 auto 18px;"></div>
          <!-- Brand -->
          <div style="text-align:center;margin-bottom:18px;">
            <div style="width:46px;height:46px;border-radius:14px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.22);display:flex;align-items:center;justify-content:center;margin:0 auto 10px;">
              <span style="font-size:22px;font-weight:900;color:#4ade80;">N</span>
            </div>
            <div style="font-size:19px;font-weight:900;color:rgba(255,255,255,0.9);letter-spacing:0.1em;">NOVABETT</div>
            <div style="font-size:9px;color:rgba(255,255,255,0.18);letter-spacing:0.25em;text-transform:uppercase;margin-top:4px;">Premium Gaming Platform</div>
          </div>
          <!-- Tabs -->
          <div style="display:flex;background:rgba(255,255,255,0.04);border-radius:24px;padding:3px;margin-bottom:18px;border:1px solid rgba(255,255,255,0.06);">
            <button @click="authTab = 'login'" class="nova-auth-tab" :class="authTab === 'login' ? 'nova-auth-tab--active' : ''">ဝင်ရောက်မည်</button>
            <button @click="authTab = 'register'" class="nova-auth-tab" :class="authTab === 'register' ? 'nova-auth-tab--active' : ''">အကောင့်ဖွင့်မည်</button>
          </div>
          <!-- LOGIN -->
          <div v-if="authTab === 'login'" style="display:flex;flex-direction:column;gap:13px;">
            <div>
              <label class="nova-label">အကောင့်အမည်</label>
              <input v-model="loginUsername" type="text" placeholder="အကောင့်နာမည်ထည့်ပါ" class="nova-input" />
            </div>
            <div>
              <label class="nova-label">စကားဝှက်</label>
              <div style="position:relative;">
                <input v-model="loginPassword" :type="loginShowPassword ? 'text' : 'password'" placeholder="••••••••" class="nova-input" style="padding-right:40px;" />
                <button @click="loginShowPassword = !loginShowPassword" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.3);">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path :d="loginShowPassword ? 'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22' : 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z'"/></svg>
                </button>
              </div>
            </div>
            <p v-if="loginError" style="color:#f87171;font-size:11px;text-align:center;margin:0;">{{ loginError }}</p>
            <button @click="handleLogin" :disabled="loginLoading" class="glass-btn-primary">
              <span v-if="loginLoading">Loading...</span>
              <span v-else>ဝင်ရောက်မည်</span>
            </button>
          </div>
          <!-- REGISTER -->
          <div v-if="authTab === 'register'" style="display:flex;flex-direction:column;gap:13px;">
            <div>
              <label class="nova-label">အကောင့်အမည်</label>
              <input v-model="regUsername" type="text" placeholder="အကောင့်နာမည်ထည့်ပါ" class="nova-input" />
            </div>
            <div>
              <label class="nova-label">ဖုန်းနံပါတ်</label>
              <input v-model="regPhone" type="tel" placeholder="09xxxxxxxxx" class="nova-input" />
            </div>
            <div>
              <label class="nova-label">စကားဝှက်</label>
              <div style="position:relative;">
                <input v-model="regPassword" :type="regShowPassword ? 'text' : 'password'" placeholder="••••••••" class="nova-input" style="padding-right:40px;" />
                <button @click="regShowPassword = !regShowPassword" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.3);">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path :d="regShowPassword ? 'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22' : 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z'"/></svg>
                </button>
              </div>
            </div>
            <p v-if="regError" style="color:#f87171;font-size:11px;text-align:center;margin:0;">{{ regError }}</p>
            <button @click="handleRegister" :disabled="regLoading" class="glass-btn-primary">
              <span v-if="regLoading">Loading...</span>
              <span v-else>အကောင့်ဖွင့်မည်</span>
            </button>
          </div>
          <div style="height:20px;"></div>
        </div>
      </van-popup>
    </div>
  </template>

  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { showToast } from 'vant'
  import { supabase } from '@/lib/supabase'
  import DepositModal from '@/components/DepositModal.vue'
  import WithdrawModal from '@/components/WithdrawModal.vue'

  const route = useRoute()

  // ── AUTH STATE ──
  const isLoggedIn = ref(false)
  const username = ref('')
  const mainBalance = ref(0)
  const currentLang = ref('en')
  const showAuthModal = ref(false)
  const authTab = ref('login')
  const loginUsername = ref('')
  const loginPassword = ref('')
  const loginShowPassword = ref(false)
  const loginLoading = ref(false)
  const loginError = ref('')
  const regUsername = ref('')
  const regPhone = ref('')
  const regPassword = ref('')
  const regShowPassword = ref(false)
  const regLoading = ref(false)
  const regError = ref('')
  const searchVisible = ref(false)
  const searchQuery = ref('')
  const showDepositModal = ref(false)
  const showWithdrawModal = ref(false)

  // ── BANNER ──
  const bannerImages = ref([
    '/images/banners/banner1.jpg',
    '/images/banners/banner2.jpg',
    '/images/banners/banner3.jpg',
    '/images/banners/banner4.jpg',
    '/images/banners/banner5.jpg'
  ])
  const bannerIdx = ref(0)
  let bannerTimer = null
  let touchStartX = 0

  function startBannerTimer() {
    clearInterval(bannerTimer)
    bannerTimer = setInterval(() => {
      bannerIdx.value = (bannerIdx.value + 1) % bannerImages.value.length
    }, 4000)
  }
  function onBannerTouchStart(e) { touchStartX = e.touches[0].clientX; clearInterval(bannerTimer) }
  function onBannerTouchMove(e) { e.preventDefault() }
  function onBannerTouchEnd(e) {
    const dx = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) {
      bannerIdx.value = dx > 0
        ? (bannerIdx.value + 1) % bannerImages.value.length
        : bannerIdx.value === 0 ? bannerImages.value.length - 1 : bannerIdx.value - 1
    }
    startBannerTimer()
  }

  // ── CATEGORIES ──
  const categories = ref([
    { id: 'all', name: 'နာမည်ကြီး', icon: '🔥' },
    { id: 'slot', name: 'စလော့', icon: '777' },
    { id: 'card', name: 'ကဒ်ဂိမ်းများ', icon: '🃏' },
    { id: 'fish', name: 'ငါးမျှားရ', icon: '🐟' },
    { id: 'live', name: 'Live', icon: '🎰' },
    { id: 'sport', name: 'အားကစား', icon: '⚽' }
  ])
  const activeCategory = ref('all')

  // ── GAMES ──
  const games = ref([])
  const loadingGames = ref(true)
  const fetchError = ref(null)
  async function fetchGames() {
    loadingGames.value = true; fetchError.value = null
    try {
      const { data, error } = await supabase.from('games').select('*').eq('is_active', true).order('provider', { ascending: true })
      if (error) throw error
      games.value = data || []
    } catch (e) { fetchError.value = 'ဂိမ်းများ ရယူ၍မရပါ' }
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
      showAuthModal.value = false
      loginUsername.value = ''; loginPassword.value = ''
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
        method: 'POST',
        headers: { 'Authorization': 'Bearer sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb', 'apikey': 'sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb', 'Content-Type': 'application/json' },
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
      showAuthModal.value = false
      regUsername.value = ''; regPhone.value = ''; regPassword.value = ''
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
      const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/deposit', {
        method: 'POST', headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: data.method, amount: data.amount, slip: data.slip })
      })
      const result = await res.json()
      if (result.error) throw new Error(result.error)
      showToast({ type: 'success', message: 'ငွေသွင်းမှု အောင်မြင်ပါသည်' })
      setTimeout(() => fetchBalance(), 2000)
    } catch (e) { showToast({ type: 'fail', message: e.message }) }
  }
  async function handleWithdrawSubmit(data) {
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token
      if (!token) { showToast({ type: 'fail', message: 'ဝင်ရောက်ပါ' }); return }
      const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/withdraw', {
        method: 'POST', headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: data.method, phone: data.phone, accountName: data.accountName, amount: data.amount })
      })
      const result = await res.json()
      if (result.error) throw new Error(result.error)
      showToast({ type: 'success', message: 'ငွေထုတ်မှု အောင်မြင်ပါသည်' })
      setTimeout(() => fetchBalance(), 2000)
    } catch (e) { showToast({ type: 'fail', message: e.message }) }
  }

  onMounted(() => { loadUserInfo(); fetchGames(); startBannerTimer() })
  onUnmounted(() => clearInterval(bannerTimer))
  </script>

  <style scoped>
  /* ══ MARQUEE ══ */
  @keyframes nova-marquee { from { transform: translateX(100vw); } to { transform: translateX(-100%); } }
  .nova-marquee { display:inline-block; animation:nova-marquee 30s linear infinite; will-change:transform; white-space:nowrap; }

  /* ══ SKELETON ══ */
  @keyframes nova-pulse { 0%,100% { opacity:.35; } 50% { opacity:.7; } }

  /* ══ NO SCROLLBAR ══ */
  .nova-no-scrollbar::-webkit-scrollbar { display:none; }
  .nova-no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }

  /* ══ GLASS TECH BUTTONS (main action) ══ */
  .glass-btn-primary {
    width:100%; height:48px; border-radius:12px; border:none; cursor:pointer;
    font-size:15px; font-weight:800; letter-spacing:0.06em; color:#fff;
    position:relative; overflow:hidden;
    background: linear-gradient(135deg, rgba(34,197,94,0.85) 0%, rgba(21,128,61,0.9) 100%);
    box-shadow: 0 6px 24px rgba(34,197,94,0.3), inset 0 1px 0 rgba(255,255,255,0.18);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: box-shadow 0.2s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .glass-btn-primary::before {
    content:'';
    position:absolute; top:0; left:0; right:0; height:50%;
    background:linear-gradient(to bottom,rgba(255,255,255,0.12),transparent);
    border-radius:12px 12px 0 0; pointer-events:none;
  }
  .glass-btn-primary:active { transform:scale(0.97); box-shadow:0 2px 12px rgba(34,197,94,0.2); }
  .glass-btn-primary:disabled { opacity:0.5; }

  /* ══ GLASS TECH AUTH BUTTONS (small, left-aligned) ══ */
  .glass-btn-auth {
    height:34px; padding:0 14px; border-radius:9px; cursor:pointer;
    font-size:12px; font-weight:700; letter-spacing:0.04em; color:rgba(255,255,255,0.75);
    position:relative; overflow:hidden;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.18s;
    -webkit-tap-highlight-color: transparent;
    white-space:nowrap;
  }
  .glass-btn-auth::before {
    content:'';
    position:absolute; top:0; left:0; right:0; height:50%;
    background:linear-gradient(to bottom,rgba(255,255,255,0.08),transparent);
    pointer-events:none;
  }
  .glass-btn-auth:active { transform:scale(0.95); opacity:0.85; }
  .glass-btn-auth--primary {
    background: linear-gradient(135deg,rgba(34,197,94,0.75),rgba(21,128,61,0.8));
    border-color: rgba(34,197,94,0.4);
    color: #fff;
    box-shadow: 0 4px 16px rgba(34,197,94,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
  }

  /* ══ SMALL GLASS BUTTON ══ */
  .glass-btn-sm {
    border-radius:8px; cursor:pointer;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s;
  }
  .glass-btn-sm:active { opacity:0.7; }

  /* ══ ICON BUTTON ══ */
  .glass-btn-icon {
    width:36px; height:36px; border-radius:50%; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s;
  }
  .glass-btn-icon:active { opacity:0.7; }

  /* ══ QUICK ICONS ══ */
  .nova-quick-icon {
    display:flex; flex-direction:column; align-items:center; gap:3px;
    cursor:pointer; -webkit-tap-highlight-color:transparent;
  }
  .nova-quick-icon span {
    font-size:9px; color:rgba(255,255,255,0.45); font-weight:600; white-space:nowrap;
  }
  .nova-quick-icon:active { opacity:0.7; }

  /* ══ CATEGORY TABS ══ */
  .nova-tab {
    display:inline-flex; align-items:center; gap:5px;
    padding:7px 13px; border-radius:20px; font-size:12px; font-weight:700;
    cursor:pointer; flex-shrink:0; white-space:nowrap;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.09);
    color:rgba(255,255,255,0.45);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
    backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    transition:all 0.22s; -webkit-tap-highlight-color:transparent;
    user-select:none;
  }
  .nova-tab--active {
    background:linear-gradient(135deg,rgba(34,197,94,0.85),rgba(21,128,61,0.9));
    border-color:rgba(34,197,94,0.5);
    color:#fff;
    box-shadow:0 4px 16px rgba(34,197,94,0.3), inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .nova-tab:active { transform:scale(0.95); }

  /* ══ GAME CARDS ══ */
  .nova-game-card {
    border-radius:14px; overflow:hidden; cursor:pointer;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.07);
    box-shadow:0 2px 12px rgba(0,0,0,0.45);
    transform:translateZ(0);
    transition:transform 0.12s ease;
    -webkit-tap-highlight-color:transparent;
  }

  /* ══ CONTACT ICONS ══ */
  .nova-contact-icon {
    display:flex; flex-direction:column; align-items:center; gap:5px;
    padding:10px 14px; border-radius:14px; cursor:pointer;
    border:1px solid rgba(255,255,255,0.08);
    -webkit-tap-highlight-color:transparent;
  }
  .nova-contact-icon span { font-size:10px; color:rgba(255,255,255,0.4); font-weight:600; }
  .nova-contact-icon:active { opacity:0.7; }

  /* ══ LICENSE SLOTS ══ */
  .nova-license-slot {
    height:52px; border-radius:10px;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.07);
    display:flex; align-items:center; justify-content:center;
  }

  /* ══ FOOTER LINKS ══ */
  .nova-footer-link {
    font-size:11px; color:rgba(255,255,255,0.28); cursor:pointer; line-height:1.5;
    -webkit-tap-highlight-color:transparent;
  }
  .nova-footer-link:active { color:rgba(255,255,255,0.5); }

  /* ══ INPUTS ══ */
  .nova-input {
    width:100%; box-sizing:border-box;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:10px; padding:11px 12px;
    color:#fff; font-size:14px; outline:none;
    backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);
    transition:border-color 0.2s;
  }
  .nova-input::placeholder { color:rgba(255,255,255,0.18); }
  .nova-input:focus { border-color:rgba(34,197,94,0.4); box-shadow:0 0 0 3px rgba(34,197,94,0.07),inset 0 1px 0 rgba(255,255,255,0.05); }

  /* ══ LABELS ══ */
  .nova-label {
    display:block; font-size:11px; color:rgba(255,255,255,0.32); margin-bottom:6px; font-weight:600;
  }

  /* ══ AUTH TABS ══ */
  .nova-auth-tab {
    flex:1; padding:9px; border-radius:21px;
    font-size:12px; font-weight:700; cursor:pointer; letter-spacing:0.04em;
    background:transparent; border:1px solid transparent; color:rgba(255,255,255,0.28);
    transition:all 0.22s; -webkit-tap-highlight-color:transparent;
  }
  .nova-auth-tab--active {
    background:linear-gradient(135deg,rgba(34,197,94,0.25),rgba(21,128,61,0.2));
    border-color:rgba(34,197,94,0.28);
    color:rgba(74,222,128,0.95);
  }

  /* ══ BOTTOM NAV ══ */
  .nova-nav-item {
    display:flex; flex-direction:column; align-items:center; gap:2px;
    color:rgba(255,255,255,0.28); font-size:9px; font-weight:700;
    padding:4px 10px; border-radius:10px;
    transition:color 0.2s; -webkit-tap-highlight-color:transparent;
    user-select:none; letter-spacing:0.03em;
  }
  .nova-nav-active { color:#22c55e !important; }

  /* ══ VANT OVERRIDES ══ */
  :deep(.van-popup) { border-radius:24px 24px 0 0 !important; }
  :deep(.van-overlay) { background:rgba(0,0,0,0.72) !important; backdrop-filter:blur(4px); }
  </style>
  