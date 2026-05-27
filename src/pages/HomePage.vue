<template>
  <div class="min-h-screen text-gray-200 flex flex-col" style="background:linear-gradient(180deg,#040f07 0%,#051209 50%,#040f07 100%)">

    <!-- Toast Container -->
    <Teleport to="body">
      <div class="fixed top-4 right-4 z-[100] space-y-2 w-72 pointer-events-none">
        <TransitionGroup name="toast">
          <div v-for="toast in toasts" :key="toast.id"
            class="pointer-events-auto p-3 rounded-lg border shadow-lg backdrop-blur-md flex items-center gap-2 text-sm font-semibold"
            :class="{
              'bg-green-500/10 border-green-500/30 text-green-300': toast.type === 'success',
              'bg-red-500/10 border-red-500/30 text-red-400': toast.type === 'error',
              'bg-yellow-500/10 border-yellow-500/30 text-yellow-400': toast.type === 'warning'
            }">
            <span v-if="toast.type === 'success'">✓</span>
            <span v-else-if="toast.type === 'error'">✕</span>
            <span v-else>⚠</span>
            <span>{{ toast.message }}</span>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>

    <!-- ══ STICKY HEADER ══ -->
    <header class="sticky top-0 z-40 px-4 pt-3 pb-2.5 flex items-center justify-between" style="background:#040f07;border-bottom:1px solid rgba(34,197,94,0.1);">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-base"
          style="background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;box-shadow:0 0 14px rgba(34,197,94,0.4),0 2px 8px rgba(0,0,0,0.5);">
          N
        </div>
        <div>
          <p class="text-[8px] font-bold uppercase tracking-[0.3em] leading-none mb-0.5" style="color:rgba(34,197,94,0.55);">Welcome to</p>
          <h1 class="font-black leading-none" style="font-size:clamp(18px,5.5vw,24px);background:linear-gradient(135deg,#4ade80 0%,#22c55e 50%,#86efac 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 10px rgba(34,197,94,0.35));">NovaBETT</h1>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button @click="toggleLanguage"
          class="h-7 px-2.5 rounded-full text-[10px] font-bold transition-all active:scale-90"
          style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);color:rgba(34,197,94,0.85);">
          {{ currentLang === 'en' ? 'မြန်မာ' : 'EN' }}
        </button>
        <button @click="toggleSearch"
          class="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
          style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.18);">
          <svg class="w-4 h-4" style="color:rgba(34,197,94,0.8);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Search Bar -->
    <div v-if="searchVisible" class="px-4 pt-2 pb-1">
      <div class="relative">
        <input v-model="searchQuery" type="text" placeholder="ဂိမ်းရှာပါ..."
          class="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
          style="background:#0a1f0e;border:1px solid rgba(34,197,94,0.25);color:#fff;" />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:rgba(34,197,94,0.5);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </div>

    <div class="flex-1">

      <!-- ══ BANNER CAROUSEL ══ -->
      <div class="px-3 pt-2">
        <div class="rounded-2xl overflow-hidden relative h-44" style="border:1px solid rgba(34,197,94,0.12);">
          <div class="absolute inset-0 flex transition-transform duration-500" :style="{ transform: `translateX(-${carouselIndex * 100}%)` }">
            <div v-for="(img, i) in carouselImages" :key="i" class="w-full h-full flex-shrink-0 relative">
              <img :src="img.image" class="w-full h-full object-cover" alt="" />
              <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(4,15,7,0.5) 0%,transparent 60%);"></div>
            </div>
          </div>
          <div class="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <button v-for="(img, i) in carouselImages" :key="i" @click="carouselIndex = i"
              class="h-1.5 rounded-full transition-all"
              :class="i === carouselIndex ? 'w-5' : 'w-1.5'"
              :style="i === carouselIndex ? 'background:#22c55e;' : 'background:rgba(255,255,255,0.3);'">
            </button>
          </div>
        </div>
      </div>

      <!-- ══ MARQUEE ANNOUNCEMENT ══ -->
      <div class="mx-3 mt-2 px-3 py-2 rounded-xl flex items-center gap-2" style="background:rgba(34,197,94,0.07);border:1px solid rgba(34,197,94,0.14);overflow:hidden;">
        <svg class="w-4 h-4 flex-shrink-0" style="color:rgba(34,197,94,0.8);" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/>
        </svg>
        <div class="overflow-hidden flex-1">
          <div class="marquee-text whitespace-nowrap text-[11px] font-semibold" style="color:rgba(200,255,210,0.75);">
            🎉 NovaBETT မှ ကြိုဆိုပါတယ်! &nbsp;&nbsp;&nbsp; 💰 ပထမဆုံးဒေပါ့ဇစ် 100% Bonus &nbsp;&nbsp;&nbsp; 🏆 Lucky Wheel spin တိုင်း ဆုထူးများ &nbsp;&nbsp;&nbsp; ⚡ KPay / WavePay ဖြင့် အလျင်အမြန် ဆောင်ရွက်နိုင်သည် &nbsp;&nbsp;&nbsp; 🎰 JILI, PP, PG ဂိမ်းများ ပါဝင်သည်
          </div>
        </div>
        <div class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style="background:linear-gradient(135deg,#ef4444,#dc2626);">
          99+
        </div>
      </div>

      <!-- ══ PRE-LOGIN: Login / Register + Quick Links ══ -->
      <div v-if="!isLoggedIn" class="px-3 mt-3 space-y-2.5">
        <div class="flex gap-2.5">
          <button @click="showAuthModal = true; authTab = 'login'"
            class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
            style="border:1px solid rgba(34,197,94,0.45);color:#4ade80;background:rgba(34,197,94,0.08);">
            လော့အင်
          </button>
          <button @click="showAuthModal = true; authTab = 'register'"
            class="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
            style="background:linear-gradient(135deg,#22c55e,#15803d);box-shadow:0 0 16px rgba(34,197,94,0.3),0 2px 8px rgba(0,0,0,0.4);">
            မှတ်ပုံတင်
          </button>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <button @click="showAuthModal = true; authTab = 'login'"
            class="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all active:scale-95"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">
            <svg class="w-6 h-6" style="color:rgba(34,197,94,0.9);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-[9px] font-semibold" style="color:rgba(255,255,255,0.55);">ငွေသွင်း</span>
          </button>
          <button @click="showAuthModal = true; authTab = 'login'"
            class="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all active:scale-95"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">
            <svg class="w-6 h-6" style="color:rgba(34,197,94,0.9);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            <span class="text-[9px] font-semibold" style="color:rgba(255,255,255,0.55);">ငွေထုတ်</span>
          </button>
          <button @click="$router.push('/promotions')"
            class="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all active:scale-95"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">
            <svg class="w-6 h-6" style="color:rgba(251,191,36,0.9);" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="text-[9px] font-semibold" style="color:rgba(255,255,255,0.55);">VIP</span>
          </button>
          <button @click="$router.push('/promotions')"
            class="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all active:scale-95"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">
            <svg class="w-6 h-6" style="color:rgba(251,191,36,0.9);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
            </svg>
            <span class="text-[9px] font-semibold" style="color:rgba(255,255,255,0.55);">ပရိုမိုး</span>
          </button>
        </div>
      </div>

      <!-- ══ LOGGED-IN: Account Strip ══ -->
      <div v-if="isLoggedIn" class="px-3 mt-3">
        <div class="flex items-center justify-between px-4 py-3 rounded-xl" style="background:rgba(34,197,94,0.07);border:1px solid rgba(34,197,94,0.15);">
          <div class="flex items-center gap-3">
            <NftAvatar :username="username" :size="40" />
            <div>
              <p class="text-xs font-bold text-white">{{ username.slice(0, 10) }}</p>
              <p class="text-[10px] mt-0.5">
                <span v-if="balanceLoading" class="animate-pulse" style="color:rgba(255,255,255,0.3);">…</span>
                <span v-else class="font-semibold" style="color:#4ade80;">{{ formatCurrency(mainBalance) }} Ks</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="showDepositModal = true"
              class="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold active:scale-95 transition-all"
              style="background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;box-shadow:0 0 10px rgba(34,197,94,0.3);">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              Deposit
            </button>
            <button @click="showWithdrawModal = true"
              class="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold active:scale-95 transition-all"
              style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:rgba(74,222,128,0.9);">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4m0 0l4-4m-4 4l4 4"/></svg>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <!-- ══ JACKPOT TICKER ══ -->
      <div class="mx-3 mt-3 px-4 py-2.5 rounded-xl flex items-center justify-between" style="background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(21,128,61,0.05));border:1px solid rgba(34,197,94,0.18);">
        <div class="flex items-center gap-2">
          <span class="text-base">🏆</span>
          <div>
            <p class="text-[8px] uppercase tracking-widest font-bold" style="color:rgba(34,197,94,0.6);">Jackpot</p>
            <p class="text-sm font-black" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">{{ displayedJackpot }}</p>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-2 h-2 rounded-full animate-pulse" style="background:#22c55e;box-shadow:0 0 6px #22c55e;"></div>
          <span class="text-[10px] font-semibold" style="color:rgba(34,197,94,0.7);">{{ onlinePlayers }} Online</span>
        </div>
      </div>

      <!-- ══ CATEGORY TABS ══ -->
      <div class="px-3 mt-4">
        <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button v-for="cat in categories" :key="cat.name" @click="activeCategory = cat.name"
            class="flex items-center gap-1.5 flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95"
            :style="activeCategory === cat.name
              ? 'background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;box-shadow:0 0 14px rgba(34,197,94,0.35),0 2px 8px rgba(0,0,0,0.4);'
              : 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.45);'">
            <img v-if="cat.logo" :src="cat.logo" class="w-4 h-4 rounded-full object-cover" alt="" />
            <span v-else>{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
          </button>
        </div>
      </div>

      <!-- ══ GAME GRID ══ -->
      <div class="px-3 mt-3">
        <!-- Skeleton -->
        <div v-if="loadingGames" class="grid grid-cols-3 gap-2">
          <div v-for="n in 9" :key="n" class="rounded-2xl overflow-hidden animate-pulse" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.05);">
            <div class="aspect-square" style="background:rgba(255,255,255,0.03);"></div>
            <div class="px-2 py-2"><div class="h-2 rounded-full w-3/4" style="background:rgba(255,255,255,0.05);"></div></div>
          </div>
        </div>

        <!-- Games -->
        <div v-else class="grid grid-cols-3 gap-2">
          <div v-for="(game, idx) in filteredGames" :key="game.id" @click="openGame(game)"
            class="group relative rounded-2xl overflow-hidden cursor-pointer active:scale-[0.94] transition-transform duration-150"
            style="background:linear-gradient(155deg,#0a1f0e,#061408);border:1px solid rgba(34,197,94,0.1);box-shadow:0 4px 12px rgba(0,0,0,0.5);">
            <div class="relative w-full aspect-square overflow-hidden">
              <img :src="game.image_url" class="w-full h-full object-cover" alt="" />
              <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(4,15,7,0.85) 0%,rgba(4,15,7,0.1) 45%,transparent 100%);"></div>
              <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,rgba(34,197,94,0.25),transparent);"></div>
              <div v-if="idx < 3"
                class="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[7px] font-black"
                style="background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;box-shadow:0 0 8px rgba(239,68,68,0.5);">
                🔥HOT
              </div>
              <div v-else-if="idx >= 3 && idx < 6"
                class="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[7px] font-black"
                style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;">
                NEW
              </div>
              <div class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[7px] font-bold"
                style="background:rgba(0,0,0,0.7);color:rgba(255,255,255,0.6);border:0.5px solid rgba(255,255,255,0.1);">
                {{ game.provider }}
              </div>
            </div>
            <div class="px-2 py-1.5">
              <h3 class="text-[10px] font-bold leading-tight truncate" style="color:rgba(255,255,255,0.8);">{{ game.name }}</h3>
            </div>
            <div class="absolute bottom-0 left-2 right-2 h-px opacity-0 group-hover:opacity-100 transition-opacity"
              style="background:linear-gradient(90deg,transparent,rgba(34,197,94,0.5),transparent);"></div>
          </div>
        </div>

        <!-- Error -->
        <div v-if="!loadingGames && fetchError" class="text-center py-10">
          <p class="text-sm mb-3" style="color:rgba(255,80,80,0.8);">{{ fetchError }}</p>
          <button @click="fetchGames" class="text-xs font-bold px-5 py-2 rounded-full" style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);color:#4ade80;">Retry</button>
        </div>
        <div v-if="!loadingGames && !fetchError && filteredGames.length === 0" class="text-center py-10">
          <p class="text-sm" style="color:rgba(255,255,255,0.2);">No games found.</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="mx-3 mt-4 h-px" style="background:linear-gradient(90deg,transparent,rgba(34,197,94,0.15),transparent);"></div>
      <div class="px-3 pb-36 space-y-2.5 mt-4">
        <button @click="showFooterModal('team')" class="w-full rounded-xl p-3.5 text-left text-xs font-semibold transition-all" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);">NovaBETT Team</button>
        <button @click="showFooterModal('terms')" class="w-full rounded-xl p-3.5 text-left text-xs font-semibold transition-all" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);">Terms of Service</button>
        <button @click="showFooterModal('plus18')" class="w-full rounded-xl p-3.5 text-left text-xs font-semibold transition-all" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);">18+ Responsible Gaming</button>
        <p class="text-center text-[10px] pt-2" style="color:rgba(255,255,255,0.15);">&copy; 2026 NovaBETT. All rights reserved.</p>
      </div>
    </div>

    <!-- ══ BOTTOM NAV ══ -->
    <nav class="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom" style="background:#040f07;border-top:1px solid rgba(34,197,94,0.12);">
      <div class="flex justify-around items-center py-2 px-1">
        <router-link to="/home" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all" :class="$route.path === '/home' ? 'text-green-400' : 'text-gray-600'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span class="text-[9px] font-semibold">ပင်မ</span>
        </router-link>
        <router-link to="/promotions" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all" :class="$route.path === '/promotions' ? 'text-green-400' : 'text-gray-600'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 12v8H4v-8l8-8 8 8zm-2 2H6v4h12v-4zM12 2l-8 8h16l-8-8z"/></svg>
          <span class="text-[9px] font-semibold">ပရိုမို</span>
        </router-link>
        <router-link to="/agent" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all" :class="$route.path === '/agent' ? 'text-green-400' : 'text-gray-600'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          <span class="text-[9px] font-semibold">အေးဂျင့်</span>
        </router-link>
        <router-link to="/service" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all" :class="$route.path === '/service' ? 'text-green-400' : 'text-gray-600'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          <span class="text-[9px] font-semibold">ဆက်သွယ်</span>
        </router-link>
        <router-link to="/account" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all" :class="$route.path === '/account' ? 'text-green-400' : 'text-gray-600'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="text-[9px] font-semibold">အကောင့်</span>
        </router-link>
      </div>
    </nav>

    <!-- ══ MODALS ══ -->
    <DepositModal v-model="showDepositModal" @submit="handleDepositSubmit" />
    <WithdrawModal v-model="showWithdrawModal" :balance="mainBalance" @submit="handleWithdrawSubmit" />

    <!-- AUTH MODAL -->
    <Teleport to="body">
      <Transition :css="false" @enter="onModalEnter" @leave="onModalLeave">
        <div v-if="showAuthModal"
          class="auth-modal-wrapper fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          @click.self="showAuthModal = false">
          <div class="auth-backdrop absolute inset-0 bg-[#020508]/75 backdrop-blur-2xl pointer-events-none"></div>
          <div class="auth-modal-card relative w-full max-w-[340px] mx-4 mb-6 sm:mb-0 overflow-hidden rounded-[28px]"
            style="background:rgba(4,14,7,0.97);border:1px solid rgba(34,197,94,0.14);box-shadow:0 40px 100px rgba(0,0,0,0.85),inset 0 1px 0 rgba(34,197,94,0.08);">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px" style="background:linear-gradient(90deg,transparent,rgba(34,197,94,0.3),transparent);"></div>
            <div class="relative z-10 p-6">
              <!-- Brand -->
              <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-3" style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);">
                  <span class="text-xl font-black" style="color:#4ade80;">N</span>
                </div>
                <h2 class="text-xl font-bold tracking-[0.12em]" style="color:rgba(255,255,255,0.88);">NOVABETT</h2>
                <p class="text-[9px] tracking-[0.25em] uppercase mt-1.5 font-medium" style="color:rgba(255,255,255,0.22);">Premium Gaming Platform</p>
              </div>
              <!-- Tabs -->
              <div class="flex mb-5 p-0.5 rounded-full" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);">
                <button @click="authTab = 'login'"
                  class="flex-1 py-2 rounded-full text-[11px] font-semibold tracking-[0.08em] transition-all duration-300"
                  :style="authTab === 'login' ? 'background:linear-gradient(135deg,rgba(34,197,94,0.25),rgba(21,128,61,0.2));color:rgba(74,222,128,0.95);border:1px solid rgba(34,197,94,0.25);' : 'color:rgba(255,255,255,0.28);border:1px solid transparent;'">
                  ဝင်ရောက်မည်
                </button>
                <button @click="authTab = 'register'"
                  class="flex-1 py-2 rounded-full text-[11px] font-semibold tracking-[0.08em] transition-all duration-300"
                  :style="authTab === 'register' ? 'background:linear-gradient(135deg,rgba(34,197,94,0.25),rgba(21,128,61,0.2));color:rgba(74,222,128,0.95);border:1px solid rgba(34,197,94,0.25);' : 'color:rgba(255,255,255,0.28);border:1px solid transparent;'">
                  အကောင့်ဖွင့်မည်
                </button>
              </div>
              <!-- LOGIN -->
              <div v-if="authTab === 'login'" class="space-y-3">
                <div>
                  <label class="block text-[10px] font-semibold mb-1.5" style="color:rgba(255,255,255,0.38);">အကောင့်အမည်</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:rgba(34,197,94,0.4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <input v-model="loginUsername" type="text" placeholder="အကောင့်နာမည်ထည့်ပါ"
                      class="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                      style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.88);" />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-semibold mb-1.5" style="color:rgba(255,255,255,0.38);">စကားဝှက်</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:rgba(34,197,94,0.4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <input v-model="loginPassword" :type="loginShowPassword ? 'text' : 'password'" placeholder="••••••••"
                      class="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                      style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.88);" />
                    <button type="button" @click="loginShowPassword = !loginShowPassword" class="absolute right-3 top-1/2 -translate-y-1/2" style="color:rgba(255,255,255,0.25);">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="loginShowPassword ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"/></svg>
                    </button>
                  </div>
                </div>
                <p v-if="loginError" class="text-[11px] text-red-400">{{ loginError }}</p>
                <button @click="doLogin" :disabled="loginLoading || !loginUsernameValid || !loginPasswordValid"
                  class="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                  style="background:linear-gradient(135deg,#22c55e,#15803d);box-shadow:0 0 20px rgba(34,197,94,0.35);">
                  {{ loginLoading ? 'စစ်ဆေးနေသည်...' : 'ဝင်ရောက်မည်' }}
                </button>
              </div>
              <!-- REGISTER -->
              <div v-else class="space-y-3">
                <div>
                  <label class="block text-[10px] font-semibold mb-1.5" style="color:rgba(255,255,255,0.38);">အကောင့်အမည်</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:rgba(34,197,94,0.4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <input v-model="regUsername" type="text" placeholder="အကောင့်နာမည်ထည့်ပါ"
                      class="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                      style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.88);" />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-semibold mb-1.5" style="color:rgba(255,255,255,0.38);">ဖုန်းနံပါတ်</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:rgba(34,197,94,0.4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <input v-model="regPhone" type="tel" placeholder="09xxxxxxxxx"
                      class="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                      style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.88);" />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-semibold mb-1.5" style="color:rgba(255,255,255,0.38);">စကားဝှက်</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:rgba(34,197,94,0.4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <input v-model="regPassword" :type="regShowPassword ? 'text' : 'password'" placeholder="••••••••"
                      class="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                      style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.88);" />
                    <button type="button" @click="regShowPassword = !regShowPassword" class="absolute right-3 top-1/2 -translate-y-1/2" style="color:rgba(255,255,255,0.25);">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="regShowPassword ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"/></svg>
                    </button>
                  </div>
                  <div v-if="regPassword.length > 0" class="flex gap-1 mt-1.5">
                    <div v-for="i in 3" :key="i" class="h-1 flex-1 rounded-full transition-all" :class="strengthBarClass(i)"></div>
                  </div>
                  <p v-if="regPassword.length > 0" class="text-[9px] mt-1" :class="strengthTextColor">{{ strengthLabel }}</p>
                </div>
                <p v-if="regError" class="text-[11px] text-red-400">{{ regError }}</p>
                <button @click="doRegister" :disabled="regLoading || !regUsernameValid || !regPasswordValid || !regPhoneValid"
                  class="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                  style="background:linear-gradient(135deg,#22c55e,#15803d);box-shadow:0 0 20px rgba(34,197,94,0.35);">
                  {{ regLoading ? 'ဖွင့်နေသည်...' : 'အကောင့်ဖွင့်မည်' }}
                </button>
              </div>
              <!-- Close -->
              <button @click="showAuthModal = false" class="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center" style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- FOOTER MODAL -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="footerModal" class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" @click.self="footerModal = null">
          <div class="w-full max-w-md rounded-t-2xl p-6 pb-10" style="background:#0a1f0e;border-top:1px solid rgba(34,197,94,0.2);">
            <h3 class="text-base font-bold text-white mb-3">{{ footerModalTitle }}</h3>
            <p class="text-sm text-gray-400">{{ footerModalContent }}</p>
            <button @click="footerModal = null" class="mt-4 w-full py-2.5 rounded-xl font-bold text-sm" style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);color:#4ade80;">Close</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import DepositModal from '@/components/DepositModal.vue'
import WithdrawModal from '@/components/WithdrawModal.vue'
import NftAvatar from '@/components/NftAvatar.vue'
import { gsap } from 'gsap'

function onModalEnter(el, done) {
  const backdrop = el.querySelector('.auth-backdrop')
  const card = el.querySelector('.auth-modal-card')
  gsap.set(el, { opacity: 1 })
  gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
  gsap.fromTo(card,
    { opacity: 0, y: 36, scale: 0.96, filter: 'blur(6px)' },
    { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out', delay: 0.05, onComplete: done }
  )
}
function onModalLeave(el, done) {
  const backdrop = el.querySelector('.auth-backdrop')
  const card = el.querySelector('.auth-modal-card')
  gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: 'power2.in' })
  gsap.to(card, { opacity: 0, y: 20, scale: 0.97, filter: 'blur(4px)', duration: 0.28, ease: 'power2.in', onComplete: done })
}

const route = useRoute()
const { locale } = useI18n()
const currentLang = ref(locale.value)
const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'mm' : 'en'
  currentLang.value = locale.value
  localStorage.setItem('lang', locale.value)
}

const isLoggedIn = ref(false)
const username = ref('')
const mainBalance = ref(0)
const balanceLoading = ref(false)
const avatarColors = ['linear-gradient(135deg,#f6d365,#fda085)','linear-gradient(135deg,#a1c4fd,#c2e9fb)','linear-gradient(135deg,#ffecd2,#fcb69f)','linear-gradient(135deg,#a18cd1,#fbc2eb)','linear-gradient(135deg,#84fab0,#8fd3f4)']
const avatarColor = ref(avatarColors[0])

const showAuthModal = ref(false)
const authTab = ref('login')
const loginShowPassword = ref(false)
const regShowPassword = ref(false)

const toasts = ref([])
let toastId = 0
const addToast = (message, type = 'success') => {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 3000)
}

onMounted(async () => {
  showAuthModal.value = false
  if (route.query.auth === 'login') {
    showAuthModal.value = true
    authTab.value = 'login'
    window.history.replaceState({}, document.title, window.location.pathname)
  }
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    await loadUserInfo()
    if (!username.value) {
      const saved = localStorage.getItem('sb_username')
      if (saved) username.value = saved
    }
  }
  const savedLang = localStorage.getItem('lang') || 'mm'
  if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'mm')
  locale.value = savedLang
  currentLang.value = savedLang
  let storedAvatar = localStorage.getItem('avatarIndex')
  if (storedAvatar === null) { storedAvatar = Math.floor(Math.random() * avatarColors.length); localStorage.setItem('avatarIndex', storedAvatar) }
  avatarColor.value = avatarColors[storedAvatar]
  fetchGames()
})

async function loadUserInfo() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  isLoggedIn.value = true
  username.value = user.user_metadata?.username || user.email?.split('@')[0] || 'PLAYER'
  localStorage.setItem('sb_username', username.value)
  await fetchBalance()
}

async function fetchBalance() {
  balanceLoading.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: wallet } = await supabase.from('wallets').select('main_balance').eq('user_id', user.id).single()
    mainBalance.value = wallet?.main_balance || 0
  } catch (e) { console.error(e) } finally { balanceLoading.value = false }
}

const loginUsernameValid = computed(() => loginUsername.value.trim().length > 0)
const loginPasswordValid = computed(() => loginPassword.value.length > 0)
const regUsernameValid = computed(() => regUsername.value.trim().length > 0)
const regPasswordValid = computed(() => regPassword.value.length >= 3)
const regPhoneValid = computed(() => regPhone.value.trim().length >= 6)

const loginUsername = ref('')
const loginPassword = ref('')
const loginLoading = ref(false)
const loginError = ref('')
async function doLogin() {
  loginError.value = ''
  if (!loginUsernameValid.value || !loginPasswordValid.value) return
  loginLoading.value = true
  try {
    const email = `${loginUsername.value.toUpperCase()}@novabett.internal`
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: loginPassword.value })
    if (error) throw error
    if (data.session?.access_token) localStorage.setItem('sb_token', data.session.access_token)
    await loadUserInfo()
    addToast('Successfully logged in', 'success')
    showAuthModal.value = false
    loginUsername.value = ''; loginPassword.value = ''
  } catch (e) { loginError.value = e.message; addToast(e.message, 'error') } finally { loginLoading.value = false }
}

const regUsername = ref('')
const regPhone = ref('')
const regPassword = ref('')
const regLoading = ref(false)
const regError = ref('')
async function doRegister() {
  regError.value = ''
  if (!regUsernameValid.value || !regPasswordValid.value || !regPhoneValid.value) return
  regLoading.value = true
  try {
    const referral = route.query.dl || ''
    const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/register3', {
      method: 'POST',
      headers: { 'Authorization': `Bearer sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb`, 'apikey': 'sb_publishable_nQArOtFqTbi9ZtJCJC0STA_pE4ztXGb', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: regUsername.value, phone: regPhone.value, password: regPassword.value, referral })
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    const email = `${regUsername.value.toUpperCase()}@novabett.internal`
    const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({ email, password: regPassword.value })
    if (loginErr) throw loginErr
    if (loginData.session?.access_token) localStorage.setItem('sb_token', loginData.session.access_token)
    await loadUserInfo()
    addToast('Account created successfully!', 'success')
    showAuthModal.value = false
    regUsername.value = ''; regPhone.value = ''; regPassword.value = ''
  } catch (e) { regError.value = e.message; addToast(e.message, 'error') } finally { regLoading.value = false }
}

const strengthLevel = computed(() => {
  const p = regPassword.value
  if (p.length === 0) return 0
  let score = 0
  if (p.length >= 6) score++
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  if (score <= 1) return 1
  if (score <= 3) return 2
  return 3
})
const strengthLabel = computed(() => ({ 1: 'Weak', 2: 'Medium', 3: 'Strong' }[strengthLevel.value] || ''))
const strengthTextColor = computed(() => ({ 1: 'text-red-400', 2: 'text-orange-400', 3: 'text-green-400' }[strengthLevel.value] || 'text-gray-400'))
function strengthBarClass(index) {
  if (strengthLevel.value >= index) {
    if (strengthLevel.value === 1) return 'bg-red-500'
    if (strengthLevel.value === 2) return 'bg-orange-500'
    return 'bg-green-500'
  }
  return 'bg-gray-700'
}

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
    console.error('Game fetch error:', e)
    fetchError.value = 'Failed to load games.'
  } finally { loadingGames.value = false }
}

const jackpot = ref(893619157998)
const displayedJackpot = ref('893,619,157,998')
const onlinePlayers = ref(247)
const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num)
onMounted(() => {
  setInterval(() => {
    const inc = Math.floor(Math.random() * 500000 + 100000)
    jackpot.value += inc
    animateValue(jackpot.value - inc, jackpot.value)
  }, 5000)
  setInterval(() => {
    const delta = Math.floor(Math.random() * 7) - 3
    onlinePlayers.value = Math.max(180, Math.min(999, onlinePlayers.value + delta))
  }, 3000)
})
function animateValue(start, end) {
  let current = start
  const range = end - start, dur = 800, stepTime = 20, steps = dur / stepTime, inc = range / steps
  let step = 0
  const timer = setInterval(() => {
    current += inc
    if (step >= steps) { current = end; clearInterval(timer) }
    displayedJackpot.value = formatNumber(Math.floor(current))
    step++
  }, stepTime)
}
const formatCurrency = (num) => new Intl.NumberFormat('en-US').format(num)

const carouselImages = [
  { image: '/images/banners/banner1.jpg', title: 'SLOT GAMES' },
  { image: '/images/banners/banner2.jpg', title: 'FISHING' },
  { image: '/images/banners/banner3.jpg', title: 'LIVE CASINO' },
  { image: '/images/banners/banner4.jpg', title: 'SPORTS' },
  { image: '/images/banners/banner5.jpg', title: 'ARCADE' }
]
const carouselIndex = ref(0)
let carouselTimer
onMounted(() => { carouselTimer = setInterval(() => nextSlide(), 4000) })
const prevSlide = () => { carouselIndex.value = carouselIndex.value === 0 ? carouselImages.length - 1 : carouselIndex.value - 1; resetTimer() }
const nextSlide = () => { carouselIndex.value = (carouselIndex.value + 1) % carouselImages.length; resetTimer() }
const resetTimer = () => { clearInterval(carouselTimer); carouselTimer = setInterval(() => nextSlide(), 4000) }

const searchVisible = ref(false)
const searchQuery = ref('')
const toggleSearch = () => { searchVisible.value = !searchVisible.value }

const categories = ref([
  { name: 'အားလုံး', icon: '🎮', logo: null, filter: 'All' },
  { name: 'JILI', icon: null, logo: '/images/providers/logo1.jpg', filter: 'JILI' },
  { name: 'PP', icon: null, logo: '/images/providers/logo2.jpg', filter: 'PP' },
  { name: 'PG', icon: null, logo: '/images/providers/logo3.jpg', filter: 'PG' },
  { name: 'Pragmatic', icon: null, logo: '/images/providers/logo4.jpg', filter: 'Pragmatic' },
  { name: 'Live', icon: '🎰', logo: null, filter: 'Live' },
  { name: 'Fishing', icon: '🎣', logo: null, filter: 'Fishing' }
])
const activeCategory = ref('အားလုံး')
const filteredGames = computed(() => {
  let list = games.value
  const cat = categories.value.find(c => c.name === activeCategory.value)
  if (cat && cat.filter !== 'All') {
    list = list.filter(g => g.provider === cat.filter || g.category === cat.filter)
  }
  if (searchQuery.value) {
    list = list.filter(g => g.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  return list
})
const openGame = (game) => {
  if (!isLoggedIn.value) { showAuthModal.value = true; authTab.value = 'login'; return }
  alert(`Opening ${game.name}`)
}

const showDepositModal = ref(false)
const showWithdrawModal = ref(false)

const handleDepositSubmit = async (data) => {
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) { addToast('Please login first', 'error'); return }
    const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/deposit', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: data.method, amount: data.amount, slip: data.slip })
    })
    const result = await res.json()
    if (result.error) throw new Error(result.error)
    addToast('Deposit request submitted! Pending admin approval.', 'success')
    setTimeout(() => fetchBalance(), 2000)
  } catch (e) { addToast('Deposit failed: ' + e.message, 'error') }
}

const handleWithdrawSubmit = async (data) => {
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) { addToast('Please login first', 'error'); return }
    const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/withdraw', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: data.method, phone: data.phone, accountName: data.accountName, amount: data.amount })
    })
    const result = await res.json()
    if (result.error) throw new Error(result.error)
    addToast('Withdrawal request submitted! Pending admin approval.', 'success')
    setTimeout(() => fetchBalance(), 2000)
  } catch (e) { addToast('Withdrawal failed: ' + e.message, 'error') }
}

const footerModal = ref(null)
const footerModalTitle = computed(() => ({ team: 'NovaBETT Team', terms: 'Terms of Service', plus18: '18+ Responsible Gaming' }[footerModal.value] || ''))
const footerModalContent = computed(() => ({ team: 'We are a passionate team dedicated to providing the best online gaming experience.', terms: 'By using NovaBETT you agree to our terms and conditions. Please gamble responsibly.', plus18: 'You must be 18 years or older to use this platform. Gamble responsibly.' }[footerModal.value] || ''))
const showFooterModal = (type) => { footerModal.value = type }
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes marquee {
  0% { transform: translateX(100vw); }
  100% { transform: translateX(-100%); }
}
.marquee-text { display: inline-block; animation: marquee 25s linear infinite; }

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from { opacity: 0; transform: translateX(100%); }
.toast-leave-to { opacity: 0; transform: translateX(100%); }

.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.auth-modal-card input::placeholder { color: rgba(255,255,255,0.2); }
.auth-modal-card input:focus {
  background: rgba(34,197,94,0.06) !important;
  border-color: rgba(34,197,94,0.35) !important;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.06);
}
.auth-modal-card button:disabled { opacity: 0.3; cursor: not-allowed; pointer-events: none; }
.auth-modal-wrapper { cursor: default; }
</style>
