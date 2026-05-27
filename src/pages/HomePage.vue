<template>
    <div class="nova-app" style="background:#0a0a0a;min-height:100vh;color:#fff;-webkit-tap-highlight-color:rgba(0,0,0,0);">

      <!-- ══ HEADER ══ -->
      <header class="nova-header" style="position:sticky;top:0;z-index:100;background:#0a0a0a;border-bottom:1px solid rgba(255,255,255,0.06);padding:10px 16px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#15803d);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#fff;flex-shrink:0;box-shadow:0 0 16px rgba(34,197,94,0.4);">N</div>
          <div>
            <div style="font-size:9px;color:rgba(34,197,94,0.6);letter-spacing:0.2em;text-transform:uppercase;line-height:1;">WELCOME TO</div>
            <div style="font-size:20px;font-weight:900;line-height:1.1;background:linear-gradient(135deg,#4ade80,#22c55e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">NovaBETT</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button @click="toggleLanguage" style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);border-radius:20px;color:rgba(34,197,94,0.9);font-size:11px;font-weight:700;padding:5px 10px;cursor:pointer;">{{ currentLang === 'en' ? 'မြန်မာ' : 'EN' }}</button>
          <button @click="searchVisible = !searchVisible" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>
      </header>

      <!-- Search Bar -->
      <div v-if="searchVisible" style="padding:8px 16px;background:#0a0a0a;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="position:relative;">
          <input v-model="searchQuery" type="text" placeholder="ဂိမ်းရှာပါ..."
            style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 12px 10px 36px;color:#fff;font-size:13px;outline:none;" />
          <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
      </div>

      <!-- ══ SWIPER BANNER ══ -->
      <div style="position:relative;overflow:hidden;aspect-ratio:2.1/1;background:#111;">
        <div ref="bannerTrack" style="display:flex;transition:transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);will-change:transform;"
          :style="{ transform: 'translateX(-' + (bannerIdx * 100) + '%)' }"
          @touchstart="onBannerTouchStart" @touchmove="onBannerTouchMove" @touchend="onBannerTouchEnd">
          <div v-for="(img, i) in bannerImages" :key="i" style="min-width:100%;position:relative;">
            <img :src="img" style="width:100%;height:100%;object-fit:cover;display:block;" alt="banner" loading="lazy" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.4) 0%,transparent 60%);"></div>
          </div>
        </div>
        <!-- Dots -->
        <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:5px;">
          <div v-for="(_, i) in bannerImages" :key="i"
            :style="i === bannerIdx ? 'width:20px;height:4px;border-radius:2px;background:#22c55e;' : 'width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,0.35);'"
            style="transition:all 0.3s;"></div>
        </div>
      </div>

      <!-- ══ MARQUEE NOTICE BAR ══ -->
      <div style="display:flex;align-items:center;background:#111;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);padding:6px 12px;gap:8px;overflow:hidden;">
        <svg width="16" height="16" fill="rgba(34,197,94,0.8)" viewBox="0 0 24 24" style="flex-shrink:0;"><path d="M18 9v-3a6 6 0 10-12 0v3l-2 2v1h16v-1l-2-2zm-6 13a3 3 0 003-3H9a3 3 0 003 3z"/></svg>
        <div style="flex:1;overflow:hidden;position:relative;">
          <div class="nova-marquee" style="white-space:nowrap;font-size:12px;color:rgba(255,255,255,0.65);display:inline-block;">
            🎉 NovaBETT မှ ကြိုဆိုပါသည်။ &nbsp;&nbsp; ⚡ ငွေသွင်းငွေထုတ် 24/7 &nbsp;&nbsp; 🎰 JILI, PP, PG ဂိမ်းများ ဆော့နိုင်ပြီ &nbsp;&nbsp; 🏆 VIP အဖွဲ့ဝင်များ အထူးဆုများ &nbsp;&nbsp; 📞 Customer Support 24 နာရီ &nbsp;&nbsp;
          </div>
        </div>
        <div style="position:relative;flex-shrink:0;">
          <svg width="18" height="18" fill="rgba(255,255,255,0.4)" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span style="position:absolute;top:-5px;right:-6px;background:#ef4444;color:#fff;font-size:8px;font-weight:900;border-radius:10px;padding:1px 4px;min-width:16px;text-align:center;line-height:14px;">99+</span>
        </div>
      </div>

      <!-- ══ LOGIN / REGISTER BUTTONS (guest) ══ -->
      <div v-if="!isLoggedIn" style="padding:10px 16px;display:flex;gap:10px;">
        <van-button @click="showAuthModal = true; authTab = 'login'" style="flex:1;height:42px;border-radius:8px;border:1px solid rgba(255,255,255,0.25);background:transparent;color:rgba(255,255,255,0.88);font-size:14px;font-weight:700;letter-spacing:0.05em;">
          လောဂ်အင်
        </van-button>
        <van-button @click="showAuthModal = true; authTab = 'register'" type="primary" style="flex:1;height:42px;border-radius:8px;background:linear-gradient(135deg,#22c55e,#15803d);border:none;color:#fff;font-size:14px;font-weight:700;letter-spacing:0.05em;box-shadow:0 4px 16px rgba(34,197,94,0.35);">
          မတ်ပ်ပုံတင်
        </van-button>
      </div>

      <!-- ══ LOGGED-IN BALANCE ROW ══ -->
      <div v-if="isLoggedIn" style="padding:10px 16px;display:flex;align-items:center;justify-content:space-between;background:rgba(34,197,94,0.05);border-bottom:1px solid rgba(34,197,94,0.1);">
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:2px;">ကြိုဆိုပါသည်, {{ username }}</div>
          <div style="font-size:18px;font-weight:900;color:#4ade80;">{{ formatCurrency(mainBalance) }} <span style="font-size:11px;color:rgba(255,255,255,0.4);">MMK</span></div>
        </div>
        <div style="display:flex;gap:8px;">
          <van-button @click="showDepositModal = true" type="primary" size="small" style="border-radius:8px;background:linear-gradient(135deg,#22c55e,#15803d);border:none;font-weight:700;padding:0 14px;font-size:12px;">ငွေသွင်း</van-button>
          <van-button @click="showWithdrawModal = true" size="small" style="border-radius:8px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:#4ade80;font-weight:700;padding:0 14px;font-size:12px;">ငွေထုတ်</van-button>
        </div>
      </div>

      <!-- ══ QUICK LINKS (4 icons) ══ -->
      <div style="padding:12px 16px;background:#0a0a0a;">
        <van-grid :column-num="4" :border="false" style="background:transparent;">
          <van-grid-item @click="isLoggedIn ? (showDepositModal = true) : (showAuthModal = true, authTab = 'login')">
            <template #default>
              <div style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;">
                <div style="width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
                </div>
                <span style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600;">ငွေသွင်းရန်</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item @click="isLoggedIn ? (showWithdrawModal = true) : (showAuthModal = true, authTab = 'login')">
            <template #default>
              <div style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;">
                <div style="width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M7 15h4m1-5h3"/></svg>
                </div>
                <span style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600;">ငွေထုတ်ရန်</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item @click="() => {}">
            <template #default>
              <div style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;">
                <div style="width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(234,179,8,0.9)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600;">VIP</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template #default>
              <div style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;">
                <div style="width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.8"><path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 000 4h4v-4h-4z"/></svg>
                </div>
                <span style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600;">ပံ့ပိုးမှုရန်</span>
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- ══ CATEGORY TABS (horizontal swipe) ══ -->
      <div style="padding:0 16px 8px;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch;" class="nova-no-scrollbar">
        <div style="display:inline-flex;gap:8px;">
          <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat.id"
            :style="activeCategory === cat.id
              ? 'background:linear-gradient(135deg,#22c55e,#15803d);border:none;color:#fff;box-shadow:0 4px 14px rgba(34,197,94,0.35);'
              : 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.55);'"
            style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;flex-shrink:0;white-space:nowrap;transition:all 0.25s;-webkit-tap-highlight-color:transparent;user-select:none;">
            <span>{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
          </button>
        </div>
      </div>

      <!-- ══ GAME GRID ══ -->
      <div style="padding:0 12px 120px;">
        <!-- Loading Skeleton -->
        <div v-if="loadingGames" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
          <div v-for="n in 9" :key="n" style="border-radius:14px;overflow:hidden;background:rgba(255,255,255,0.04);aspect-ratio:3/4;animation:nova-pulse 1.5s ease-in-out infinite;"></div>
        </div>

        <!-- Error -->
        <div v-else-if="fetchError" style="text-align:center;padding:40px 0;">
          <p style="color:rgba(255,100,100,0.8);font-size:13px;margin-bottom:12px;">{{ fetchError }}</p>
          <van-button @click="fetchGames" size="small" style="border-radius:20px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:#4ade80;">ထပ်ကြိုးစားပါ</van-button>
        </div>

        <!-- Empty -->
        <div v-else-if="filteredGames.length === 0" style="text-align:center;padding:40px 0;">
          <p style="color:rgba(255,255,255,0.2);font-size:13px;">ဂိမ်းမတွေ့ပါ</p>
        </div>

        <!-- Games -->
        <div v-else style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
          <div v-for="(game, idx) in filteredGames" :key="game.id" @click="openGame(game)"
            style="border-radius:14px;overflow:hidden;cursor:pointer;position:relative;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);box-shadow:0 2px 12px rgba(0,0,0,0.4);transform:translateZ(0);transition:transform 0.12s ease,box-shadow 0.12s ease;"
            @touchstart="e => e.currentTarget.style.transform='scale(0.94)'"
            @touchend="e => e.currentTarget.style.transform='scale(1)'">
            <!-- Game Image -->
            <div style="position:relative;aspect-ratio:3/4;overflow:hidden;">
              <img :src="game.image_url" style="width:100%;height:100%;object-fit:cover;display:block;" :alt="game.name" loading="lazy" />
              <!-- Overlay gradient -->
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.9) 0%,rgba(10,10,10,0.1) 45%,transparent 100%);"></div>
              <!-- HOT badge -->
              <div v-if="idx % 5 < 2" style="position:absolute;top:6px;right:6px;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;font-size:7px;font-weight:900;border-radius:6px;padding:2px 5px;">🔥 HOT</div>
              <!-- Provider logo area -->
              <div style="position:absolute;top:6px;left:6px;background:rgba(0,0,0,0.65);border-radius:4px;padding:1px 5px;font-size:8px;font-weight:700;color:rgba(255,255,255,0.7);backdrop-filter:blur(4px);">{{ game.provider }}</div>
              <!-- PLAY center button on hover - mobile tap visible -->
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;" class="nova-play-overlay">
                <div style="width:36px;height:36px;border-radius:50%;background:rgba(34,197,94,0.85);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);">
                  <svg width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <!-- Game name bottom overlay -->
              <div style="position:absolute;bottom:0;left:0;right:0;padding:8px 6px 6px;">
                <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.88);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ game.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ BOTTOM NAV ══ -->
      <nav style="position:fixed;bottom:0;left:0;right:0;z-index:200;background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.08);padding-bottom:env(safe-area-inset-bottom,0);">
        <div style="display:flex;justify-content:space-around;align-items:center;padding:8px 0 4px;">
          <router-link to="/home" style="text-decoration:none;" class="nova-nav-item" :class="$route.path === '/home' ? 'nova-nav-active' : ''">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span>ပင်မ</span>
          </router-link>
          <router-link to="/promotions" style="text-decoration:none;" class="nova-nav-item" :class="$route.path === '/promotions' ? 'nova-nav-active' : ''">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            <span>ပရိုမို</span>
          </router-link>
          <router-link to="/agent" style="text-decoration:none;" class="nova-nav-item" :class="$route.path === '/agent' ? 'nova-nav-active' : ''">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            <span>အေးဂျင့်</span>
          </router-link>
          <router-link to="/service" style="text-decoration:none;" class="nova-nav-item" :class="$route.path === '/service' ? 'nova-nav-active' : ''">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            <span>ဆက်သွယ်</span>
          </router-link>
          <router-link to="/account" style="text-decoration:none;" class="nova-nav-item" :class="$route.path === '/account' ? 'nova-nav-active' : ''">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            <span>အကောင့်</span>
          </router-link>
        </div>
      </nav>

      <!-- ══ MODALS ══ -->
      <DepositModal v-model="showDepositModal" @submit="handleDepositSubmit" />
      <WithdrawModal v-model="showWithdrawModal" :balance="mainBalance" @submit="handleWithdrawSubmit" />

      <!-- ══ AUTH MODAL ══ -->
      <van-popup v-model:show="showAuthModal" position="bottom" round
        :style="{ background: 'rgba(14,18,16,0.98)', maxHeight: '90vh', overflow: 'auto', backdropFilter: 'blur(20px)' }">
        <div style="padding:24px;">
          <!-- Handle bar -->
          <div style="width:40px;height:4px;background:rgba(255,255,255,0.15);border-radius:2px;margin:0 auto 20px;"></div>
          <!-- Brand -->
          <div style="text-align:center;margin-bottom:20px;">
            <div style="width:48px;height:48px;border-radius:14px;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.25);display:flex;align-items:center;justify-content:center;margin:0 auto 10px;">
              <span style="font-size:22px;font-weight:900;color:#4ade80;">N</span>
            </div>
            <div style="font-size:20px;font-weight:900;color:rgba(255,255,255,0.9);letter-spacing:0.1em;">NOVABETT</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.2);letter-spacing:0.25em;text-transform:uppercase;margin-top:4px;">Premium Gaming Platform</div>
          </div>

          <!-- Tabs -->
          <div style="display:flex;background:rgba(255,255,255,0.05);border-radius:25px;padding:3px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.07);">
            <button @click="authTab = 'login'"
              :style="authTab === 'login' ? 'background:linear-gradient(135deg,rgba(34,197,94,0.3),rgba(21,128,61,0.2));color:rgba(74,222,128,0.95);border:1px solid rgba(34,197,94,0.3);' : 'background:transparent;color:rgba(255,255,255,0.3);border:1px solid transparent;'"
              style="flex:1;padding:10px;border-radius:22px;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.25s;letter-spacing:0.05em;">ဝင်ရောက်မည်</button>
            <button @click="authTab = 'register'"
              :style="authTab === 'register' ? 'background:linear-gradient(135deg,rgba(34,197,94,0.3),rgba(21,128,61,0.2));color:rgba(74,222,128,0.95);border:1px solid rgba(34,197,94,0.3);' : 'background:transparent;color:rgba(255,255,255,0.3);border:1px solid transparent;'"
              style="flex:1;padding:10px;border-radius:22px;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.25s;letter-spacing:0.05em;">အကောင့်ဖွင့်မည်</button>
          </div>

          <!-- LOGIN FORM -->
          <div v-if="authTab === 'login'" style="display:flex;flex-direction:column;gap:14px;">
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:6px;font-weight:600;">အကောင့်အမည်</label>
              <van-field v-model="loginUsername" placeholder="အကောင့်နာမည်ထည့်ပါ"
                :style="{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }" />
            </div>
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:6px;font-weight:600;">စကားဝှက်</label>
              <van-field v-model="loginPassword" :type="loginShowPassword ? 'text' : 'password'" placeholder="••••••••"
                :right-icon="loginShowPassword ? 'eye-o' : 'closed-eye'" @click-right-icon="loginShowPassword = !loginShowPassword"
                :style="{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }" />
            </div>
            <p v-if="loginError" style="color:#f87171;font-size:12px;text-align:center;">{{ loginError }}</p>
            <van-button @click="handleLogin" :loading="loginLoading" type="primary" block
              style="height:48px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#15803d);border:none;font-size:15px;font-weight:800;letter-spacing:0.08em;box-shadow:0 6px 20px rgba(34,197,94,0.4);">
              ဝင်ရောက်မည်
            </van-button>
          </div>

          <!-- REGISTER FORM -->
          <div v-if="authTab === 'register'" style="display:flex;flex-direction:column;gap:14px;">
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:6px;font-weight:600;">အကောင့်အမည်</label>
              <van-field v-model="regUsername" placeholder="အကောင့်နာမည်ထည့်ပါ"
                :style="{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }" />
            </div>
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:6px;font-weight:600;">ဖုန်းနံပါတ်</label>
              <van-field v-model="regPhone" type="tel" placeholder="09xxxxxxxxx"
                :style="{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }" />
            </div>
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:6px;font-weight:600;">စကားဝှက်</label>
              <van-field v-model="regPassword" :type="regShowPassword ? 'text' : 'password'" placeholder="••••••••"
                :right-icon="regShowPassword ? 'eye-o' : 'closed-eye'" @click-right-icon="regShowPassword = !regShowPassword"
                :style="{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }" />
            </div>
            <p v-if="regError" style="color:#f87171;font-size:12px;text-align:center;">{{ regError }}</p>
            <van-button @click="handleRegister" :loading="regLoading" type="primary" block
              style="height:48px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#15803d);border:none;font-size:15px;font-weight:800;letter-spacing:0.08em;box-shadow:0 6px 20px rgba(34,197,94,0.4);">
              အကောင့်ဖွင့်မည်
            </van-button>
          </div>
          <div style="height:16px;"></div>
        </div>
      </van-popup>

      <!-- Toast -->
      <van-toast />
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
  let bannerTouchStartX = 0
  let bannerTouchStartY = 0

  function startBannerTimer() {
    bannerTimer = setInterval(() => {
      bannerIdx.value = (bannerIdx.value + 1) % bannerImages.value.length
    }, 4000)
  }

  function onBannerTouchStart(e) {
    bannerTouchStartX = e.touches[0].clientX
    bannerTouchStartY = e.touches[0].clientY
    clearInterval(bannerTimer)
  }

  function onBannerTouchMove(e) {
    // prevent page scroll during horizontal swipe
    const dx = Math.abs(e.touches[0].clientX - bannerTouchStartX)
    const dy = Math.abs(e.touches[0].clientY - bannerTouchStartY)
    if (dx > dy) e.preventDefault()
  }

  function onBannerTouchEnd(e) {
    const dx = bannerTouchStartX - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) {
      if (dx > 0) bannerIdx.value = (bannerIdx.value + 1) % bannerImages.value.length
      else bannerIdx.value = bannerIdx.value === 0 ? bannerImages.value.length - 1 : bannerIdx.value - 1
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
    loadingGames.value = true
    fetchError.value = null
    try {
      const { data, error } = await supabase.from('games').select('*').eq('is_active', true).order('provider', { ascending: true })
      if (error) throw error
      games.value = data || []
    } catch (e) {
      fetchError.value = 'ဂိမ်းများ ရယူ၍မရပါ'
    } finally {
      loadingGames.value = false
    }
  }

  const filteredGames = computed(() => {
    let list = games.value
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter(g => g.name?.toLowerCase().includes(q))
    }
    return list
  })

  // ── AUTH ──
  async function loadUserInfo() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { isLoggedIn.value = false; return }
      isLoggedIn.value = true
      const email = session.user.email || ''
      username.value = email.replace(/@novabett\.internal$/, '').toUpperCase()
      await fetchBalance()
    } catch (e) {
      isLoggedIn.value = false
    }
  }

  async function fetchBalance() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const { data } = await supabase.from('wallets').select('balance').eq('user_id', session.user.id).single()
      if (data) mainBalance.value = Number(data.balance) || 0
    } catch (e) {}
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
    } catch (e) {
      loginError.value = 'Username သို့မဟုတ် Password မမှန်ပါ'
    } finally {
      loginLoading.value = false
    }
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
    } catch (e) {
      regError.value = e.message
    } finally {
      regLoading.value = false
    }
  }

  function openGame(game) {
    if (!isLoggedIn.value) { showAuthModal.value = true; authTab.value = 'login'; return }
    showToast(game.name + ' မကြာမီ ရနိုင်မည်')
  }

  function toggleLanguage() {
    currentLang.value = currentLang.value === 'en' ? 'mm' : 'en'
  }

  const formatCurrency = (n) => new Intl.NumberFormat('en-US').format(n)

  async function handleDepositSubmit(data) {
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token
      if (!token) { showToast({ type: 'fail', message: 'ဝင်ရောက်ပါ' }); return }
      const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/deposit', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
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
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: data.method, phone: data.phone, accountName: data.accountName, amount: data.amount })
      })
      const result = await res.json()
      if (result.error) throw new Error(result.error)
      showToast({ type: 'success', message: 'ငွေထုတ်မှု အောင်မြင်ပါသည်' })
      setTimeout(() => fetchBalance(), 2000)
    } catch (e) { showToast({ type: 'fail', message: e.message }) }
  }

  onMounted(() => {
    loadUserInfo()
    fetchGames()
    startBannerTimer()
  })

  onUnmounted(() => {
    clearInterval(bannerTimer)
  })
  </script>

  <style scoped>
  /* Marquee animation */
  @keyframes nova-marquee {
    from { transform: translateX(100vw); }
    to { transform: translateX(-100%); }
  }
  .nova-marquee {
    animation: nova-marquee 28s linear infinite;
    will-change: transform;
  }

  /* Skeleton pulse */
  @keyframes nova-pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }

  /* Hide scrollbar */
  .nova-no-scrollbar::-webkit-scrollbar { display: none; }
  .nova-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* Bottom nav */
  .nova-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    color: rgba(255,255,255,0.3);
    font-size: 9px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 10px;
    transition: color 0.2s;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    letter-spacing: 0.03em;
  }
  .nova-nav-active {
    color: #22c55e !important;
  }

  /* Override Vant styles for dark theme */
  :deep(.van-field) {
    background: transparent !important;
    padding: 0 !important;
  }
  :deep(.van-field__control) {
    color: #fff !important;
    font-size: 14px !important;
  }
  :deep(.van-field__control::placeholder) {
    color: rgba(255,255,255,0.2) !important;
  }
  :deep(.van-grid-item__content) {
    background: transparent !important;
    padding: 0 !important;
  }
  :deep(.van-popup) {
    border-radius: 24px 24px 0 0 !important;
  }
  :deep(.van-notice-bar) {
    color: rgba(255,255,255,0.65) !important;
    background: transparent !important;
  }
  </style>
  