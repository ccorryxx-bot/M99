<template>
  <div class="min-h-screen text-gray-200 flex flex-col selection:bg-cyan-500/30" style="background:linear-gradient(160deg,#060a18 0%,#080e1e 50%,#060d0e 100%)">
    <!-- Toast Container -->
    <Teleport to="body">
      <div class="fixed top-4 right-4 z-[100] space-y-2 w-72 pointer-events-none">
        <TransitionGroup name="toast">
          <div v-for="toast in toasts" :key="toast.id"
            class="pointer-events-auto p-3 rounded-lg border shadow-lg backdrop-blur-md flex items-center gap-2 text-sm font-semibold"
            :class="{
              'bg-teal-500/10 border-teal-500/30 text-teal-300': toast.type === 'success',
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

    <div class="flex-1">
      <!-- ══ CINEMATIC TOP HEADER ══ -->
      <div class="px-4 pt-4 pb-0 relative z-10">
        <div class="flex items-start justify-between gap-2">

          <!-- LEFT: Giant cinematic label block -->
          <div class="flex-1">
            <!-- "WELCOME TO" ambient label -->
            <p class="text-[9px] font-bold uppercase tracking-[0.35em] leading-none mb-0.5"
               style="color:rgba(0,229,255,0.55); text-shadow: 0 0 12px rgba(0,229,255,0.4);">
              Welcome to
            </p>
            <!-- Giant NOVABETT -->
            <h1 class="font-black uppercase leading-none select-none"
                style="
                  font-size: clamp(26px, 8vw, 34px);
                  letter-spacing: -0.02em;
                  background: linear-gradient(135deg, #00e5ff 0%, #00bcd4 40%, #80cbc4 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  filter: drop-shadow(0 0 14px rgba(0,229,255,0.45)) drop-shadow(0 2px 8px rgba(0,0,0,0.8));
                  text-shadow: none;
                ">
              NovaBETT
            </h1>
            <!-- Search + Language toggle below label -->
            <div class="flex items-center gap-1.5 mt-1.5">
              <button @click="toggleSearch"
                class="flex items-center justify-center w-7 h-7 rounded-full transition-all active:scale-90"
                style="background:rgba(0,229,255,0.08); border:1px solid rgba(0,229,255,0.18);">
                <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
              <button @click="toggleLanguage"
                class="flex items-center justify-center h-7 px-2.5 rounded-full text-[10px] font-bold transition-all active:scale-90"
                style="background:rgba(0,229,255,0.08); border:1px solid rgba(0,229,255,0.18); color:rgba(0,229,255,0.8);">
                {{ currentLang === 'en' ? 'မြန်မာ' : 'English' }}
              </button>
            </div>
          </div>

          <!-- RIGHT: Small brand badge + login -->
          <div class="flex flex-col items-end pt-0.5 gap-1.5">
            <div class="text-right">
              <p class="text-[10px] font-black tracking-tight leading-none"
                 style="background:linear-gradient(135deg,#00e5ff,#80cbc4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                NovaBETT
              </p>
              <p class="text-[7px] font-semibold uppercase tracking-widest leading-tight"
                 style="color:rgba(255,255,255,0.25);">
                Premium Online Casino
              </p>
            </div>
            <template v-if="!isLoggedIn">
              <button @click="showAuthModal = true; authTab = 'login'"
                class="bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg active:scale-95 transition-all"
                style="box-shadow:0 0 14px rgba(0,229,255,0.3);">
                Login
              </button>
            </template>
          </div>
        </div>

        <!-- Search bar (below header if open) -->
        <div v-if="searchVisible" class="relative mt-2">
          <input v-model="searchQuery" type="text" placeholder="Search games..."
            class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#111d26] border border-cyan-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm" />
          <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Carousel (Banner) — directly under labels, no gap -->
      <div class="px-4 pt-2">
        <div class="rounded-2xl overflow-hidden relative h-40 bg-[#111d26] border border-cyan-500/10 shadow-sm">
          <div class="absolute inset-0 flex transition-transform duration-500" :style="{ transform: `translateX(-${carouselIndex * 100}%)` }">
            <div v-for="(img, i) in carouselImages" :key="i" class="w-full h-full flex-shrink-0 relative">
              <img :src="img.image" class="w-full h-full object-cover brightness-110" alt="" />
              <div class="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <button v-for="(img, i) in carouselImages" :key="i" @click="carouselIndex = i" class="w-2 h-2 rounded-full transition-all" :class="i === carouselIndex ? 'bg-cyan-400 w-4' : 'bg-gray-600'"></button>
          </div>
        </div>
      </div>

      <!-- ══ ACCOUNT STRIP — right side, between banner & games ══ -->
      <div v-if="isLoggedIn" class="flex justify-end items-start px-4 pt-2.5 pb-0">
        <div class="flex flex-col items-end gap-2">

          <!-- Deposit + Withdraw buttons row -->
          <div class="flex items-center gap-2">
            <button @click="showDepositModal = true"
              class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold active:scale-95 transition-all"
              style="background:linear-gradient(135deg,#00c6e0,#007a94);box-shadow:0 0 12px rgba(0,198,224,0.35),0 2px 6px rgba(0,0,0,0.4);color:#fff;border:1px solid rgba(0,229,255,0.3);">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
              </svg>
              Deposit
            </button>
            <button @click="showWithdrawModal = true"
              class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold active:scale-95 transition-all"
              style="background:rgba(0,229,255,0.07);border:1px solid rgba(0,229,255,0.25);color:rgba(0,229,255,0.85);box-shadow:0 2px 8px rgba(0,0,0,0.3);">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4m0 0l4-4m-4 4l4 4"/>
              </svg>
              Withdraw
            </button>
          </div>

          <!-- NFT Avatar + username + balance (right-aligned below buttons) -->
          <div class="flex items-center gap-2">
            <div class="text-right">
              <p class="text-[11px] font-bold leading-tight" style="color:rgba(255,255,255,0.85);">{{ username.slice(0,4) }}</p>
              <p class="text-[10px] leading-tight">
                <span v-if="balanceLoading" class="animate-pulse" style="color:rgba(255,255,255,0.3);">…</span>
                <span v-else class="font-semibold" style="color:#00e5ff;">{{ formatCurrency(mainBalance) }} Ks</span>
              </p>
            </div>
            <NftAvatar :username="username" :size="44" />
          </div>

        </div>
      </div>

      <!-- ══ GAME ZONE: Vertical Sidebar + Cards ══ -->
      <div class="flex gap-0 pt-4 pb-2 px-2">

        <!-- ── LEFT: 3D Vertical Category Sidebar ── -->
        <div class="flex flex-col gap-2 w-[68px] flex-shrink-0 mr-2">
          <button v-for="cat in categories" :key="cat.name" @click="activeCategory = cat.name"
            class="relative flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl transition-all duration-200 active:scale-[0.91] w-full overflow-hidden"
            :style="activeCategory === cat.name
              ? 'background:linear-gradient(160deg,rgba(0,229,255,0.14),rgba(0,180,210,0.06));border:1px solid rgba(0,229,255,0.45);box-shadow:0 0 18px rgba(0,229,255,0.18),0 4px 12px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.12);'
              : 'background:linear-gradient(160deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02));border:1px solid rgba(255,255,255,0.07);box-shadow:0 2px 8px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.06);'">

            <!-- Active left glow bar -->
            <div v-if="activeCategory === cat.name"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-9 rounded-r-full"
              style="background:linear-gradient(180deg,#00e5ff,#00bcd4);box-shadow:0 0 8px 1px #00e5ff;"></div>

            <!-- ── 3D Icon Box ── -->
            <div class="w-10 h-10 rounded-xl relative overflow-hidden flex items-center justify-center"
              :style="activeCategory === cat.name
                ? 'background:linear-gradient(145deg,rgba(0,229,255,0.25),rgba(0,150,180,0.15));box-shadow:0 4px 12px rgba(0,229,255,0.25),0 1px 0 rgba(255,255,255,0.2) inset,0 -1px 0 rgba(0,0,0,0.3) inset;'
                : 'background:linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03));box-shadow:0 3px 8px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.1),inset 0 -1px 0 rgba(0,0,0,0.2);'">

              <!-- Logo image for provider categories -->
              <img v-if="cat.logo" :src="cat.logo" class="w-8 h-8 object-cover rounded-lg" alt=""
                :style="activeCategory !== cat.name ? 'filter:grayscale(60%) brightness(0.7);' : 'filter:grayscale(0%) brightness(1.1) drop-shadow(0 0 4px rgba(0,229,255,0.3));'" />

              <!-- SVG icon for "All" -->
              <svg v-else viewBox="0 0 32 32" class="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gAll1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" :stop-color="activeCategory === cat.name ? '#00e5ff' : '#3a5a70'"/>
                    <stop offset="100%" :stop-color="activeCategory === cat.name ? '#0099bb' : '#1e3040'"/>
                  </linearGradient>
                  <filter id="fAll"><feDropShadow dx="0" dy="1" stdDeviation="1.5" :flood-color="activeCategory === cat.name ? 'rgba(0,229,255,0.8)' : 'rgba(0,0,0,0.5)'" flood-opacity="0.9"/></filter>
                </defs>
                <rect x="3" y="3" width="11" height="11" rx="3" fill="url(#gAll1)" filter="url(#fAll)"/>
                <rect x="18" y="3" width="11" height="11" rx="3" fill="url(#gAll1)" filter="url(#fAll)" opacity="0.75"/>
                <rect x="3" y="18" width="11" height="11" rx="3" fill="url(#gAll1)" filter="url(#fAll)" opacity="0.75"/>
                <rect x="18" y="18" width="11" height="11" rx="3" fill="url(#gAll1)" filter="url(#fAll)" opacity="0.55"/>
                <!-- Shine highlight -->
                <rect x="3" y="3" width="11" height="4" rx="2" fill="rgba(255,255,255,0.25)"/>
              </svg>

              <!-- Top shine overlay (3D depth) -->
              <div class="absolute top-0 left-0 right-0 h-2/5 rounded-t-xl pointer-events-none"
                   style="background:linear-gradient(to bottom,rgba(255,255,255,0.18),transparent);"></div>
            </div>

            <!-- Category label -->
            <span class="text-[8px] font-bold text-center leading-tight px-0.5"
              :style="activeCategory === cat.name
                ? 'color:#00e5ff;text-shadow:0 0 8px rgba(0,229,255,0.6);'
                : 'color:rgba(255,255,255,0.32);'">
              {{ cat.name.length > 7 ? cat.name.slice(0,7) : cat.name }}
            </span>
          </button>
        </div>

        <!-- ── RIGHT: Premium 2-Column Game Cards ── -->
        <div class="flex-1 min-w-0">
          <div class="grid grid-cols-3 gap-2">

            <!-- Skeleton loaders -->
            <template v-if="loadingGames">
              <div v-for="n in 6" :key="n"
                class="rounded-2xl overflow-hidden animate-pulse"
                style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);">
                <div class="aspect-square" style="background:rgba(255,255,255,0.03);"></div>
                <div class="px-2 py-2 space-y-1.5">
                  <div class="h-2 rounded-full" style="background:rgba(255,255,255,0.06);width:75%;"></div>
                </div>
              </div>
            </template>

            <!-- Game Cards -->
            <div v-else v-for="(game, idx) in filteredGames" :key="game.id" @click="openGame(game)"
              class="group relative rounded-2xl overflow-hidden cursor-pointer active:scale-[0.94] transition-all duration-200"
              style="background:linear-gradient(155deg,#0d1d2c,#081320);border:1px solid rgba(255,255,255,0.08);box-shadow:0 4px 12px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.06);"
              onmouseover="this.style.borderColor='rgba(0,229,255,0.35)';this.style.boxShadow='0 6px 20px rgba(0,229,255,0.1),0 2px 8px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.08)'"
              onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.boxShadow='0 4px 12px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.06)'">

              <!-- Image -->
              <div class="relative w-full aspect-square overflow-hidden">
                <img :src="game.image_url" class="w-full h-full object-cover transition-transform duration-300 group-active:scale-110" alt="" />
                <!-- Dark gradient overlay bottom -->
                <div class="absolute inset-0"
                     style="background:linear-gradient(to top,rgba(6,12,20,0.85) 0%,rgba(6,12,20,0.1) 45%,transparent 100%);"></div>
                <!-- Top shine line (3D card effect) -->
                <div class="absolute top-0 left-0 right-0 h-px"
                     style="background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);"></div>

                <!-- HOT badge (first 3 games) -->
                <div v-if="idx < 3"
                  class="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[7px] font-black tracking-wide"
                  style="background:linear-gradient(135deg,#ff6b00,#f0a500);color:#fff;box-shadow:0 0 10px rgba(255,100,0,0.6),0 1px 3px rgba(0,0,0,0.4);">
                  🔥HOT
                </div>

                <!-- NEW badge (games 3-6) -->
                <div v-else-if="idx >= 3 && idx < 6"
                  class="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[7px] font-black tracking-wide"
                  style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;box-shadow:0 0 8px rgba(124,58,237,0.5);">
                  NEW
                </div>

                <!-- Provider tag -->
                <div class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[7px] font-bold"
                     style="background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);color:rgba(255,255,255,0.55);border:0.5px solid rgba(255,255,255,0.1);">
                  {{ game.provider }}
                </div>
              </div>

              <!-- Game name -->
              <div class="px-2 py-1.5">
                <h3 class="text-[10px] font-bold leading-tight truncate"
                    style="color:rgba(255,255,255,0.8);">{{ game.name }}</h3>
              </div>

              <!-- Bottom glow line when active -->
              <div class="absolute bottom-0 left-2 right-2 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                   style="background:linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent);"></div>
            </div>
          </div>

          <!-- Error State -->
          <div v-if="!loadingGames && fetchError" class="text-center py-10">
            <p class="text-sm mb-3" style="color:rgba(255,80,80,0.8);">{{ fetchError }}</p>
            <button @click="fetchGames"
              class="text-xs font-bold px-5 py-2 rounded-full transition-all active:scale-95"
              style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);color:#00e5ff;">
              Retry
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="!loadingGames && !fetchError && filteredGames.length === 0"
            class="text-center py-10">
            <p class="text-sm" style="color:rgba(255,255,255,0.2);">No games found.</p>
          </div>
        </div>
      </div>

      <!-- More games footer line -->
      <div class="h-4"></div>
      <div class="mx-4 h-px" style="background:linear-gradient(90deg,transparent,rgba(0,229,255,0.12),transparent);"></div>

      <!-- Footer -->
      <div class="px-4 pb-40 space-y-3 mt-4">
        <button @click="showFooterModal('team')" class="w-full bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/10 rounded-xl p-4 text-left text-sm font-semibold text-gray-300 hover:text-cyan-300 transition-all">
          NovaBETT Team
        </button>
        <button @click="showFooterModal('terms')" class="w-full bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/10 rounded-xl p-4 text-left text-sm font-semibold text-gray-300 hover:text-cyan-300 transition-all">
          Terms of Service
        </button>
        <button @click="showFooterModal('plus18')" class="w-full bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/10 rounded-xl p-4 text-left text-sm font-semibold text-gray-300 hover:text-cyan-300 transition-all">
          18+
        </button>
        <p class="text-center text-[10px] text-gray-600 pt-4">&copy; 2026 NovaBETT. All rights reserved.</p>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t border-cyan-500/10 z-50 pointer-events-auto safe-area-bottom" style="background:rgba(6,9,24,0.96)">
      <div class="flex justify-around items-center py-2 px-1">
        <router-link to="/home" class="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200" :class="$route.path === '/home' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span class="text-[10px] font-semibold">Home</span>
        </router-link>
        <router-link to="/promotions" class="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200" :class="$route.path === '/promotions' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 12v8H4v-8l8-8 8 8zm-2 2H6v4h12v-4zM12 2l-8 8h16l-8-8z"/></svg>
          <span class="text-[10px] font-semibold">Promos</span>
        </router-link>
        <router-link to="/agent" class="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200" :class="$route.path === '/agent' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          <span class="text-[10px] font-semibold">Agents</span>
        </router-link>
        <router-link to="/service" class="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200" :class="$route.path === '/service' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          <span class="text-[10px] font-semibold">Chat</span>
        </router-link>
        <router-link to="/account" class="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200" :class="$route.path === '/account' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="text-[10px] font-semibold">You</span>
        </router-link>
      </div>
    </nav>

    <!-- ===== AUTH MODAL — Ambient Luxury UI ===== -->
    <Teleport to="body">
      <Transition :css="false" @enter="onModalEnter" @leave="onModalLeave">
        <div v-if="showAuthModal"
          class="auth-modal-wrapper fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          @click.self="showAuthModal = false">

          <!-- Layered ambient backdrop -->
          <div class="auth-backdrop absolute inset-0 bg-[#020508]/75 backdrop-blur-2xl pointer-events-none"></div>

          <!-- Deep ambient orbs — barely visible, cinematic depth -->
          <div class="absolute top-[15%] left-[20%] w-72 h-72 rounded-full pointer-events-none"
            style="background: radial-gradient(circle, rgba(56,89,120,0.07) 0%, transparent 70%); filter: blur(40px);"></div>
          <div class="absolute bottom-[20%] right-[15%] w-56 h-56 rounded-full pointer-events-none"
            style="background: radial-gradient(circle, rgba(30,58,80,0.06) 0%, transparent 70%); filter: blur(50px);"></div>

          <!-- Modal Card -->
          <div class="auth-modal-card relative w-full max-w-[340px] mx-4 mb-6 sm:mb-0 overflow-hidden rounded-[28px]"
            style="background: rgba(7,10,16,0.95); border: 1px solid rgba(255,255,255,0.065); box-shadow: 0 40px 100px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06);">

            <!-- Top hairline shimmer -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px"
              style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);"></div>

            <!-- Subtle inner ambient top glow -->
            <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 rounded-full pointer-events-none"
              style="background: radial-gradient(ellipse, rgba(80,140,180,0.08) 0%, transparent 70%); filter: blur(12px);"></div>

            <div class="relative z-10 p-6">

              <!-- Brand Mark -->
              <div class="text-center mb-7">
                <div class="inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-3.5"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);">
                  <svg class="w-5 h-5" style="color: rgba(255,255,255,0.65);" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>
                  </svg>
                </div>
                <h2 class="text-xl font-bold tracking-[0.12em]" style="color: rgba(255,255,255,0.88); letter-spacing: 0.12em;">NOVABETT</h2>
                <p class="text-[9px] tracking-[0.25em] uppercase mt-1.5 font-medium" style="color: rgba(255,255,255,0.22);">Premium Gaming Platform</p>
              </div>

              <!-- Tabs — minimal pill style -->
              <div class="flex mb-5 p-0.5 rounded-full" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);">
                <button @click="authTab = 'login'"
                  class="flex-1 py-2 rounded-full text-[11px] font-semibold tracking-[0.1em] transition-all duration-400"
                  :style="authTab === 'login'
                    ? 'background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.88); border: 1px solid rgba(255,255,255,0.10); box-shadow: 0 2px 12px rgba(0,0,0,0.3);'
                    : 'color: rgba(255,255,255,0.28); border: 1px solid transparent;'">
                  LOGIN
                </button>
                <button @click="authTab = 'register'"
                  class="flex-1 py-2 rounded-full text-[11px] font-semibold tracking-[0.1em] transition-all duration-400"
                  :style="authTab === 'register'
                    ? 'background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.88); border: 1px solid rgba(255,255,255,0.10); box-shadow: 0 2px 12px rgba(0,0,0,0.3);'
                    : 'color: rgba(255,255,255,0.28); border: 1px solid transparent;'">
                  REGISTER
                </button>
              </div>

              <!-- ── LOGIN FORM ── -->
              <div v-if="authTab === 'login'" class="space-y-3">
                <div>
                  <label class="block text-[10px] font-semibold mb-1.5 tracking-[0.08em]" style="color: rgba(255,255,255,0.38);">USERNAME</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color: rgba(255,255,255,0.22);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <input v-model="loginUsername" type="text"
                      placeholder="အကောင့်နာမည်ထည့်ပါ"
                      class="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                      :style="loginUsernameValid
                        ? 'background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.88);'
                        : 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.88);'"
                      style="placeholder-color: rgba(255,255,255,0.2);"
                      @input="loginUsername = loginUsername.toUpperCase()" />
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-semibold mb-1.5 tracking-[0.08em]" style="color: rgba(255,255,255,0.38);">PASSWORD</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color: rgba(255,255,255,0.22);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <input v-model="loginPassword" :type="loginShowPassword ? 'text' : 'password'"
                      placeholder="စကားဝှက်ထည့်ပါ"
                      class="w-full pl-9 pr-11 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                      :style="loginPasswordValid
                        ? 'background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.88);'
                        : 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.88);'" />
                    <button @click="loginShowPassword = !loginShowPassword"
                      class="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                      :style="loginShowPassword ? 'color: rgba(255,255,255,0.5);' : 'color: rgba(255,255,255,0.22);'">
                      <svg v-if="!loginShowPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243"/></svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </button>
                  </div>
                </div>

                <div class="pt-1">
                  <button @click="doLogin"
                    :disabled="loginLoading || !loginUsernameValid || !loginPasswordValid"
                    class="w-full py-3 rounded-xl text-sm font-semibold tracking-[0.08em] transition-all duration-300 active:scale-[0.98]"
                    style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); box-shadow: 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);"
                    onmouseover="this.style.background='rgba(255,255,255,0.12)'; this.style.borderColor='rgba(255,255,255,0.18)';"
                    onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.borderColor='rgba(255,255,255,0.12)';">
                    <span v-if="loginLoading" class="flex items-center justify-center gap-2">
                      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Signing In...
                    </span>
                    <span v-else>Sign In</span>
                  </button>
                </div>

                <p v-if="loginError" class="text-[11px] text-center pt-0.5" style="color: rgba(240,100,100,0.85);">{{ loginError }}</p>
              </div>

              <!-- ── REGISTER FORM ── -->
              <div v-else class="space-y-3">
                <div>
                  <label class="block text-[10px] font-semibold mb-1.5 tracking-[0.08em]" style="color: rgba(255,255,255,0.38);">USERNAME</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color: rgba(255,255,255,0.22);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <input v-model="regUsername" type="text"
                      placeholder="e.g. MOEMOE"
                      class="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                      :style="regUsernameValid
                        ? 'background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.88);'
                        : 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.88);'"
                      @input="regUsername = regUsername.toUpperCase()" />
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-semibold mb-1.5 tracking-[0.08em]" style="color: rgba(255,255,255,0.38);">PASSWORD</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color: rgba(255,255,255,0.22);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <input v-model="regPassword" :type="regShowPassword ? 'text' : 'password'"
                      placeholder="e.g. moe#223"
                      class="w-full pl-9 pr-11 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                      :style="regPasswordValid
                        ? 'background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.88);'
                        : 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.88);'" />
                    <button @click="regShowPassword = !regShowPassword"
                      class="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                      :style="regShowPassword ? 'color: rgba(255,255,255,0.5);' : 'color: rgba(255,255,255,0.22);'">
                      <svg v-if="!regShowPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243"/></svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </button>
                  </div>
                  <!-- Strength Meter -->
                  <div class="mt-2 flex gap-1">
                    <div v-for="n in 3" :key="n" class="h-0.5 flex-1 rounded-full transition-all duration-500" :class="strengthBarClass(n)"></div>
                  </div>
                  <p class="text-[10px] mt-1 transition-colors duration-300" :class="strengthTextColor">{{ strengthLabel }}</p>
                </div>

                <div>
                  <label class="block text-[10px] font-semibold mb-1.5 tracking-[0.08em]" style="color: rgba(255,255,255,0.38);">PHONE NUMBER</label>
                  <div class="flex items-center rounded-xl transition-all duration-300"
                    style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);">
                    <span class="pl-3.5 pr-2 text-sm" style="color: rgba(255,255,255,0.55); border-right: 1px solid rgba(255,255,255,0.07);">🇲🇲 +95</span>
                    <input v-model="regPhone" type="tel"
                      placeholder="09123456789"
                      class="flex-1 px-3 py-2.5 bg-transparent text-sm focus:outline-none"
                      style="color: rgba(255,255,255,0.88);" />
                  </div>
                </div>

                <!-- Age Confirmation -->
                <div class="flex items-start gap-2.5 py-1">
                  <div class="flex-shrink-0 mt-0.5">
                    <svg class="w-4 h-4" style="color: rgba(100,200,140,0.7);" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <p class="text-[11px] leading-relaxed" style="color: rgba(255,255,255,0.3);">ကျွန်ုပ်သည် အသက် ၁၈ နှစ်ကျော်ပြီးဖြစ်ပါသည်။</p>
                </div>

                <div class="pt-0.5">
                  <button @click="doRegister"
                    :disabled="regLoading || !regUsernameValid || !regPasswordValid || !regPhoneValid"
                    class="w-full py-3 rounded-xl text-sm font-semibold tracking-[0.08em] transition-all duration-300 active:scale-[0.98]"
                    style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); box-shadow: 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);"
                    onmouseover="this.style.background='rgba(255,255,255,0.12)'; this.style.borderColor='rgba(255,255,255,0.18)';"
                    onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.borderColor='rgba(255,255,255,0.12)';">
                    <span v-if="regLoading" class="flex items-center justify-center gap-2">
                      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Creating Account...
                    </span>
                    <span v-else>Join NovaBETT</span>
                  </button>
                </div>

                <p v-if="regError" class="text-[11px] text-center pt-0.5" style="color: rgba(240,100,100,0.85);">{{ regError }}</p>
              </div>

            </div><!-- /relative z-10 -->

            <!-- Close button -->
            <button @click="showAuthModal = false"
              class="absolute top-4 right-4 z-20 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.3);"
              onmouseover="this.style.background='rgba(255,255,255,0.10)'; this.style.color='rgba(255,255,255,0.7)';"
              onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.color='rgba(255,255,255,0.3)';">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

          </div><!-- /auth-modal-card -->
        </div>
      </Transition>
    </Teleport>

    <!-- Footer Modals -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="footerModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" @click.self="footerModal = null">
          <div class="bg-[#0a1219] border border-cyan-500/20 rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto">
            <h2 class="text-xl font-bold text-white text-center mb-4">{{ footerModalTitle }}</h2>
            <p class="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{{ footerModalContent }}</p>
            <button @click="footerModal = null" class="mt-6 w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold py-3 rounded-2xl shadow transition-all">Close</button>
            <button @click="footerModal = null" class="absolute top-4 right-4 text-gray-400 hover:text-white"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Deposit/Withdraw Modals -->
    <DepositModal v-model="showDepositModal" @submit="handleDepositSubmit" />
    <WithdrawModal v-model="showWithdrawModal" :balance="mainBalance" @submit="handleWithdrawSubmit" />
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

// ── GSAP Modal Transition Hooks ──
function onModalEnter(el, done) {
  const backdrop = el.querySelector('.auth-backdrop')
  const card = el.querySelector('.auth-modal-card')

  gsap.set(el, { opacity: 1 })
  gsap.fromTo(backdrop,
    { opacity: 0 },
    { opacity: 1, duration: 0.45, ease: 'power2.out' }
  )
  gsap.fromTo(card,
    { opacity: 0, y: 36, scale: 0.96, filter: 'blur(6px)' },
    { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out', delay: 0.05, onComplete: done }
  )
}

function onModalLeave(el, done) {
  const backdrop = el.querySelector('.auth-backdrop')
  const card = el.querySelector('.auth-modal-card')

  gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: 'power2.in' })
  gsap.to(card,
    { opacity: 0, y: 20, scale: 0.97, filter: 'blur(4px)', duration: 0.28, ease: 'power2.in', onComplete: done }
  )
}

const route = useRoute()
const { locale } = useI18n()
const currentLang = ref(locale.value)
const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'mm' : 'en'
  currentLang.value = locale.value
  localStorage.setItem('lang', locale.value)
}

// Auth state
const isLoggedIn = ref(false)
const username = ref('')
const mainBalance = ref(0)
const balanceLoading = ref(false)

// Avatar random colors
const avatarColors = [
  'linear-gradient(135deg, #f6d365, #fda085)',
  'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
  'linear-gradient(135deg, #ffecd2, #fcb69f)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #84fab0, #8fd3f4)'
]
const avatarColor = ref(avatarColors[0])

// Auth modal
const showAuthModal = ref(false)
const authTab = ref('login')
const loginShowPassword = ref(false)
const regShowPassword = ref(false)

// Toast system
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
  locale.value = savedLang; currentLang.value = savedLang
  if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'mm')
  let storedAvatar = localStorage.getItem('avatarIndex')
  if (storedAvatar === null) {
    storedAvatar = Math.floor(Math.random() * avatarColors.length)
    localStorage.setItem('avatarIndex', storedAvatar)
  }
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

// Form validation
const loginUsernameValid = computed(() => loginUsername.value.trim().length > 0)
const loginPasswordValid = computed(() => loginPassword.value.length > 0)
const regUsernameValid = computed(() => regUsername.value.trim().length > 0)
const regPasswordValid = computed(() => regPassword.value.length >= 3)
const regPhoneValid = computed(() => regPhone.value.trim().length >= 6)

// Login
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

// Register
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
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password: regPassword.value })
    if (loginError) throw loginError
    if (loginData.session?.access_token) localStorage.setItem('sb_token', loginData.session.access_token)
    await loadUserInfo()
    addToast('Account created successfully!', 'success')
    showAuthModal.value = false
    regUsername.value = ''; regPhone.value = ''; regPassword.value = ''
  } catch (e) { regError.value = e.message; addToast(e.message, 'error') } finally { regLoading.value = false }
}

// Password strength logic
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
const strengthLabel = computed(() => {
  switch (strengthLevel.value) {
    case 1: return 'Weak'
    case 2: return 'Medium'
    case 3: return 'Strong'
    default: return ''
  }
})
const strengthTextColor = computed(() => {
  switch (strengthLevel.value) {
    case 1: return 'text-red-400'
    case 2: return 'text-orange-400'
    case 3: return 'text-green-400'
    default: return 'text-gray-400'
  }
})
function strengthBarClass(index) {
  if (strengthLevel.value >= index) {
    if (strengthLevel.value === 1) return 'bg-red-500'
    if (strengthLevel.value === 2) return 'bg-orange-500'
    return 'bg-green-500'
  }
  return 'bg-gray-600'
}

// Games fetch (only one)
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
    addToast(`Loaded ${games.value.length} games`, 'success')
  } catch (e) {
    console.error('Game fetch error:', e)
    fetchError.value = 'Failed to load games.'
    addToast('Failed to load games', 'error')
  } finally {
    loadingGames.value = false
  }
}

// Jackpot (animated counter) + Online Players
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
  const timer = setInterval(() => { current += inc; if (step >= steps) { current = end; clearInterval(timer) }; displayedJackpot.value = formatNumber(Math.floor(current)); step++ }, stepTime)
}
const formatCurrency = (num) => new Intl.NumberFormat('en-US').format(num)

// Carousel
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

// Search
const searchVisible = ref(false)
const searchQuery = ref('')
const toggleSearch = () => { searchVisible.value = !searchVisible.value }

// Categories
const categories = ref([
  { name: 'All', logo: null },
  { name: 'JILI', logo: '/images/providers/logo1.jpg' },
  { name: 'PP', logo: '/images/providers/logo2.jpg' },
  { name: 'PG', logo: '/images/providers/logo3.jpg' },
  { name: 'Pragmatic', logo: '/images/providers/logo4.jpg' },
  { name: 'Live', logo: '/images/providers/logo5.jpg' },
  { name: 'Fishing', logo: '/images/providers/logo6.jpg' }
])
const activeCategory = ref('All')
const filteredGames = computed(() => {
  let list = games.value
  if (activeCategory.value !== 'All') { list = list.filter(g => g.provider === activeCategory.value || g.category === activeCategory.value) }
  if (searchQuery.value) { list = list.filter(g => g.name.toLowerCase().includes(searchQuery.value.toLowerCase())) }
  return list
})
const openGame = (game) => alert(`Opening ${game.name}`)

// Deposit / Withdraw (Real Edge Function Calls)
const showDepositModal = ref(false)
const showWithdrawModal = ref(false)

const handleDepositSubmit = async (data) => {
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) { addToast('Please login first', 'error'); return }
    const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/deposit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        method: data.method,
        amount: data.amount,
        slip: data.slip
      })
    })
    const result = await res.json()
    if (result.error) throw new Error(result.error)
    addToast('Deposit request submitted! Pending admin approval.', 'success')
    setTimeout(() => fetchBalance(), 2000)
  } catch (e) {
    addToast('Deposit failed: ' + e.message, 'error')
  }
}

const handleWithdrawSubmit = async (data) => {
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) { addToast('Please login first', 'error'); return }
    const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/withdraw', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        method: data.method,
        phone: data.phone,
        accountName: data.accountName,
        amount: data.amount
      })
    })
    const result = await res.json()
    if (result.error) throw new Error(result.error)
    addToast('Withdrawal request submitted! Pending admin approval.', 'success')
    setTimeout(() => fetchBalance(), 2000)
  } catch (e) {
    addToast('Withdrawal failed: ' + e.message, 'error')
  }
}

// Footer modals
const footerModal = ref(null)
const footerModalTitle = computed(() => ({ team: 'NovaBETT Team', terms: 'Terms of Service', plus18: '18+ Responsible Gaming' }[footerModal.value] || ''))
const footerModalContent = computed(() => ({ team: 'We are a passionate team...', terms: 'Please read our terms...', plus18: 'You must be 18+ to play.' }[footerModal.value] || ''))
const showFooterModal = (type) => { footerModal.value = type }
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Shimmer brand animation */
@keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
.animate-shimmer { background-size: 200% auto; animation: shimmer 3s linear infinite; }
.animate-fade-in { animation: fadeIn 0.8s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

/* Auth modal inputs — placeholder color */
.auth-modal-card input::placeholder { color: rgba(255, 255, 255, 0.22); }

/* Auth modal — ambient luxury input focus ring */
.auth-modal-card input:focus {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.20) !important;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Auth modal button disabled */
.auth-modal-card button:disabled {
  opacity: 0.28;
  cursor: not-allowed;
  pointer-events: none;
}

/* Slow ambient float for orbs */
@keyframes ambientFloat {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-12px) scale(1.04); }
}

/* Modal wrapper backdrop click area fix */
.auth-modal-wrapper { cursor: default; }
</style>
