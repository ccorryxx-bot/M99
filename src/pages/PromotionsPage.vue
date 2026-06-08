<template>
  <div class="promo-root">
    <div class="bg-orb bg-orb--1"></div>
    <div class="bg-orb bg-orb--2"></div>

    <!-- HEADER -->
    <header class="promo-header">
      <button @click="$router.back()" class="promo-back-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="promo-top-tabs">
        <button
          v-for="tab in topTabs" :key="tab.key"
          class="promo-top-tab" :class="{ active: activeTopTab === tab.key }"
          @click="activeTopTab = tab.key"
        >{{ tab.label }}</button>
      </div>
    </header>

    <!-- BODY -->
    <div class="promo-body">

      <!-- ===== ဖြစ်ရပ်များ TAB ===== -->
      <template v-if="activeTopTab === 'events'">
        <!-- Sidebar -->
        <aside class="promo-sidebar">
          <button
            v-for="cat in sideCategories" :key="cat.key"
            class="promo-cat-btn" :class="{ active: activeCat === cat.key }"
            @click="activeCat = cat.key" :title="cat.label"
          >
            <svg v-if="cat.key === 'all'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
            </svg>
            <svg v-if="cat.key === 'discount'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <svg v-if="cat.key === 'history'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="12 8 12 12 14.5 14.5"/>
              <path d="M3.05 11a9 9 0 1 0 .5-4H1"/><polyline points="1 2 1 7 6 7"/>
            </svg>
            <svg v-if="cat.key === 'refill'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span class="cat-label">{{ cat.label }}</span>
          </button>
        </aside>
        <!-- Cards -->
        <main class="promo-cards-area">
          <div v-for="card in allCards" :key="card.id" class="promo-card" :style="card.id===1?{cursor:'pointer'}:{}" @click="card.id===1?$router.push('/exchange-code'):card.id===2?$router.push('/daily-bonus'):null">
            <img :src="card.img" :alt="card.title" class="promo-card-img" loading="lazy" />
          </div>
        </main>
      </template>

      <!-- ===== VIP TAB ===== -->
      <template v-else-if="activeTopTab === 'vvip'">
        <main class="vip-area">

          <!-- ── Fixed top section (never scrolls) ── -->
          <div class="vip-sticky-top">

          <!-- VIP User Banner -->
          <div class="vip-banner">
            <div class="vip-current-level-tag">လက်ရှိအဆင့်</div>
            <div class="vip-banner-left">
              <div class="vip-badge-wrap">
                <img
                  v-if="currentLevelImg"
                  :src="currentLevelImg"
                  :alt="'VIP ' + userVipLevel"
                  class="vip-banner-badge-img"
                />
                <div v-else class="vip-badge-circle">
                  <span class="vip-badge-num">{{ userVipLevel }}</span>
                </div>
              </div>
              <div class="vip-banner-info">
                <div class="vip-tag">လက်ရှိဆင့် <span class="vip-tag-name">VIP{{ userVipLevel }}</span></div>
                <div class="vip-banner-row">
                  <span class="vip-label">အာမိန်ဘွဲ့ ရရှိရာ တိုတောင်းနေပါ</span>
                </div>
                <div class="vip-banner-row">
                  <span class="vip-amount">{{ depositRemaining }}</span>
                </div>
                <div class="vip-banner-row vip-turnover">
                  <span>လောင်ကျော် တိုတောင်းနေသား</span>
                </div>
                <div class="vip-banner-row">
                  <span class="vip-amount">{{ turnoverTarget }}</span>
                  <button
                    class="vip-refresh-btn"
                    :class="{ spinning: refreshing }"
                    @click="fetchVipData"
                    :disabled="refreshing"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="vip-banner-right">
              <button class="vip-deposit-btn" @click="$router.push('/deposit')">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5"/></svg>
                <span>မြဲပြာ</span>
              </button>
              <div class="vip-claim-label">အဆင်<br/>အားလုံးတိုင်<br/>လုပ်ခွင့်<br/>သည်</div>
            </div>
          </div>

          <!-- Section title -->
          <div class="vip-section-title">VIP အဆင်တရောင်</div>

          <!-- 5 Fixed Sub-tabs -->
          <div class="vip-subtabs">
            <button
              v-for="st in vipSubTabs" :key="st.key"
              class="vip-subtab" :class="{ active: activeVipTab === st.key }"
              @click="activeVipTab = st.key"
            >{{ st.label }}</button>
          </div>

          <!-- Table header -->
          <div v-if="activeVipTab === 'extra'" class="vip-table-header">
            <div class="vip-th vip-th--badge"></div>
            <div class="vip-th vip-th--req">အဆင်တရောင်မြင်တင်ရရာနေများ</div>
            <div class="vip-th vip-th--bonus">ဘောနပ်ဒ်</div>
          </div>
          <div v-else-if="activeVipTab === 'weekly'" class="vip-table-header vip-table-header--weekly">
            <div class="vip-th vip-th--wbadge">အဆင့်</div>
            <div class="vip-th vip-th--wcol">အပတ်စဉ် အကျုံးဝင်သောငွေဖြည့်သွင်းမှု</div>
            <div class="vip-th vip-th--wcol">အပတ်စဉ် တရားဝင်သောအလောင်းအစားများ</div>
            <div class="vip-th vip-th--wbonus">အပတ်စဉ် ဘောနပ်စ်</div>
          </div>
          <div v-else-if="activeVipTab === 'monthly'" class="vip-table-header vip-table-header--weekly">
            <div class="vip-th vip-th--wbadge">အဆင့်</div>
            <div class="vip-th vip-th--wcol">လစဉ် အကျုံးဝင်သောငွေဖြည့်သွင်းမှု</div>
            <div class="vip-th vip-th--wcol">လစဉ် အကျုံးဝင်သောအလောင်းအစားများ</div>
            <div class="vip-th vip-th--wbonus">လစဉ် ဘောနပ်စ်</div>
          </div>
          <div v-else-if="activeVipTab === 'benefit'" class="vip-table-header vip-table-header--weekly">
            <div class="vip-th vip-th--wbadge">အဆင့်</div>
            <div class="vip-th vip-th--wcol">နေ့စဉ်ထုတ်ယူမှု<br/>စုစုပေါင်း<br/>ကန့်သတ်ချက်</div>
            <div class="vip-th vip-th--wcol">နေ့စဉ်ငွေထုတ်သည့်<br/>အရေအတွက်<br/>ကန့်သတ်ချက်</div>
            <div class="vip-th vip-th--wbonus">တစ်ခုတည်းထုတ်ယူချင်း<br/>ကန့်သတ်ချက်</div>
          </div>
          <div v-else class="vip-table-header vip-table-header--weekly">
            <div class="vip-th vip-th--wbadge">အဆင့်</div>
            <div class="vip-th vip-th--wcol">မွေးနေ့<br/>ဘောနပ်စ်</div>
            <div class="vip-th vip-th--wcol">လစဉ်<br/>စာအိတ်အနီ</div>
            <div class="vip-th vip-th--wbonus">ပြန်အမ်းငွေ</div>
          </div>

          </div><!-- /vip-sticky-top -->

          <!-- Level Rows 0-50 — ONLY THIS SCROLLS -->
          <div class="vip-level-list">

            <!-- ── Regular tab rows ── -->
            <template v-if="activeVipTab === 'extra'">
              <div
                v-for="lv in vipLevels" :key="lv.level"
                class="vip-level-row"
                :class="{ 'vip-level-row--active': lv.level === userVipLevel }"
              >
                <div class="vip-hand-cell">
                  <svg v-if="lv.level === userVipLevel" class="vip-hand-svg" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4C22 1.8 20.2 0 18 0C15.8 0 14 1.8 14 4V22L10 20C8 19 6 20.5 6.5 22.5L12 42C13.5 49 19.5 56 27 56H28C34 56 40 50 40 44V28C40 25.8 38.2 24 36 24C35.2 24 34.4 24.3 33.8 24.8C33.2 23 31.5 21.8 29.6 22C28.8 20.6 27.3 19.7 25.6 19.8C25.2 18.7 24.2 17.8 23 17.4V4z" fill="#4ade80"/>
                    <path d="M14 4C14 1.8 15.8 0 18 0C20.2 0 22 1.8 22 4V22" stroke="#22c55e" stroke-width="1.5" fill="none"/>
                  </svg>
                </div>
                <div class="vip-lv-badge">
                  <img v-if="lv.badgeImg" :src="lv.badgeImg" :alt="'VIP ' + lv.level" class="vip-lv-img" loading="lazy" />
                  <div v-else class="vip-lv-placeholder"><span>{{ lv.level }}</span></div>
                </div>
                <div class="vip-lv-req">
                  <span class="vip-lv-dep">{{ lv.deposit }}</span>
                  <span class="vip-lv-turn">{{ lv.turnover }}</span>
                </div>
                <div class="vip-lv-bonus">{{ lv.bonus }}</div>
              </div>
            </template>

            <!-- ── Weekly bonus rows ── -->
            <template v-else-if="activeVipTab === 'weekly'">
              <div
                v-for="(wb, idx) in weeklyBonuses" :key="'w' + idx"
                class="vip-level-row vip-level-row--weekly"
                :class="{ 'vip-level-row--active': idx === userVipLevel }"
              >
                <div class="vip-hand-cell">
                  <svg v-if="idx === userVipLevel" class="vip-hand-svg" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4C22 1.8 20.2 0 18 0C15.8 0 14 1.8 14 4V22L10 20C8 19 6 20.5 6.5 22.5L12 42C13.5 49 19.5 56 27 56H28C34 56 40 50 40 44V28C40 25.8 38.2 24 36 24C35.2 24 34.4 24.3 33.8 24.8C33.2 23 31.5 21.8 29.6 22C28.8 20.6 27.3 19.7 25.6 19.8C25.2 18.7 24.2 17.8 23 17.4V4z" fill="#4ade80"/>
                    <path d="M14 4C14 1.8 15.8 0 18 0C20.2 0 22 1.8 22 4V22" stroke="#22c55e" stroke-width="1.5" fill="none"/>
                  </svg>
                </div>
                <div class="vip-lv-badge">
                  <img v-if="vipLevels[idx]?.badgeImg" :src="vipLevels[idx].badgeImg" :alt="'VIP ' + idx" class="vip-lv-img" loading="lazy" />
                  <div v-else class="vip-lv-placeholder"><span>{{ idx }}</span></div>
                </div>
                <div class="vip-wcell">3,000.00</div>
                <div class="vip-wcell vip-wcell--dim">0.00</div>
                <div class="vip-wcell vip-wcell--bonus">{{ fmtNum(wb) }}</div>
              </div>
            </template>

            <!-- ── Monthly bonus rows ── -->
            <template v-else-if="activeVipTab === 'monthly'">
              <div
                v-for="(mb, idx) in monthlyBonuses" :key="'m' + idx"
                class="vip-level-row vip-level-row--weekly"
                :class="{ 'vip-level-row--active': idx === userVipLevel }"
              >
                <div class="vip-hand-cell">
                  <svg v-if="idx === userVipLevel" class="vip-hand-svg" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4C22 1.8 20.2 0 18 0C15.8 0 14 1.8 14 4V22L10 20C8 19 6 20.5 6.5 22.5L12 42C13.5 49 19.5 56 27 56H28C34 56 40 50 40 44V28C40 25.8 38.2 24 36 24C35.2 24 34.4 24.3 33.8 24.8C33.2 23 31.5 21.8 29.6 22C28.8 20.6 27.3 19.7 25.6 19.8C25.2 18.7 24.2 17.8 23 17.4V4z" fill="#4ade80"/>
                    <path d="M14 4C14 1.8 15.8 0 18 0C20.2 0 22 1.8 22 4V22" stroke="#22c55e" stroke-width="1.5" fill="none"/>
                  </svg>
                </div>
                <div class="vip-lv-badge">
                  <img v-if="vipLevels[idx]?.badgeImg" :src="vipLevels[idx].badgeImg" :alt="'VIP ' + idx" class="vip-lv-img" loading="lazy" />
                  <div v-else class="vip-lv-placeholder"><span>{{ idx }}</span></div>
                </div>
                <div class="vip-wcell">3,000.00</div>
                <div class="vip-wcell vip-wcell--dim">0.00</div>
                <div class="vip-wcell vip-wcell--bonus">{{ fmtNum(mb) }}</div>
              </div>
            </template>

            <!-- ── VIP ခံစားခွင့် rows ── -->
            <template v-else-if="activeVipTab === 'benefit'">
              <div
                v-for="(lv, idx) in vipLevels" :key="'bf' + idx"
                class="vip-level-row vip-level-row--weekly"
                :class="{ 'vip-level-row--active': idx === userVipLevel }"
              >
                <div class="vip-hand-cell">
                  <svg v-if="idx === userVipLevel" class="vip-hand-svg" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4C22 1.8 20.2 0 18 0C15.8 0 14 1.8 14 4V22L10 20C8 19 6 20.5 6.5 22.5L12 42C13.5 49 19.5 56 27 56H28C34 56 40 50 40 44V28C40 25.8 38.2 24 36 24C35.2 24 34.4 24.3 33.8 24.8C33.2 23 31.5 21.8 29.6 22C28.8 20.6 27.3 19.7 25.6 19.8C25.2 18.7 24.2 17.8 23 17.4V4z" fill="#4ade80"/>
                    <path d="M14 4C14 1.8 15.8 0 18 0C20.2 0 22 1.8 22 4V22" stroke="#22c55e" stroke-width="1.5" fill="none"/>
                  </svg>
                </div>
                <div class="vip-lv-badge">
                  <img v-if="lv.badgeImg" :src="lv.badgeImg" :alt="'VIP ' + idx" class="vip-lv-img" loading="lazy" />
                  <div v-else class="vip-lv-placeholder"><span>{{ idx }}</span></div>
                </div>
                <div class="vip-wcell" style="font-size:10px">100,000,000.00</div>
                <div class="vip-wcell">10</div>
                <div class="vip-wcell vip-wcell--bonus" style="font-size:10px">5,000,000.00</div>
              </div>
            </template>

            <!-- ── VIP အကြိုးကျေးဇူးများ rows ── -->
            <template v-else>
              <div
                v-for="(pd, idx) in privilegeData" :key="'pv' + idx"
                class="vip-level-row vip-level-row--weekly"
                :class="{ 'vip-level-row--active': idx === userVipLevel }"
              >
                <div class="vip-hand-cell">
                  <svg v-if="idx === userVipLevel" class="vip-hand-svg" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4C22 1.8 20.2 0 18 0C15.8 0 14 1.8 14 4V22L10 20C8 19 6 20.5 6.5 22.5L12 42C13.5 49 19.5 56 27 56H28C34 56 40 50 40 44V28C40 25.8 38.2 24 36 24C35.2 24 34.4 24.3 33.8 24.8C33.2 23 31.5 21.8 29.6 22C28.8 20.6 27.3 19.7 25.6 19.8C25.2 18.7 24.2 17.8 23 17.4V4z" fill="#4ade80"/>
                    <path d="M14 4C14 1.8 15.8 0 18 0C20.2 0 22 1.8 22 4V22" stroke="#22c55e" stroke-width="1.5" fill="none"/>
                  </svg>
                </div>
                <div class="vip-lv-badge">
                  <img v-if="vipLevels[idx]?.badgeImg" :src="vipLevels[idx].badgeImg" :alt="'VIP ' + idx" class="vip-lv-img" loading="lazy" />
                  <div v-else class="vip-lv-placeholder"><span>{{ idx }}</span></div>
                </div>
                <div class="vip-wcell">{{ pd.birthday }}</div>
                <div class="vip-wcell">{{ pd.envelope }}</div>
                <div class="vip-wcell vip-wcell--bonus">{{ pd.cashback }}</div>
              </div>
            </template>

            <!-- ══ Rules separator ══ -->
            <div class="vip-rules-sep">
              <div class="vip-rules-sep-line"></div>
              <div class="vip-rules-sep-label">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>VIP စည်းကမ်းများ</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div class="vip-rules-sep-line"></div>
            </div>

            <!-- ══ VIP Rules Section (after level 50) ══ -->
            <div class="vip-rules">

              <!-- Title -->
              <div class="vr-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>VIP အဖွဲ့ဝင်များအတွက် သီးသန့်စည်းကမ်းနှင့် သတ်မှတ်ချက်များ</span>
              </div>
              <p class="vr-intro">ဤစည်းကမ်းချက်များသည် VIP အဆင့်ကို ထိန်းသိမ်းရန်နှင့် ရပိုင်ခွင့်များကို ကာကွယ်ရန်ဖြစ်သည်။</p>

              <!-- Rule 1 -->
              <div class="vr-rule">
                <div class="vr-rule-head">
                  <svg class="vr-icon vr-icon--gold" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span>VIP Upgrade (အဆင့်မြှင့်တင်ခြင်း)</span>
                </div>
                <ul class="vr-list">
                  <li>အပ်ငွေ (Deposit) နှင့် တရားဝင်လောင်းကြေး (Valid Turnover) နှစ်မျိုးလုံး ပြည့်မီရမည်။</li>
                  <li>အဆင့်များစွာ ကျော်တက်သွားပါက၊ ရောက်ရှိသည့် အဆင့်၏ Upgrade Bonus ကိုသာ ရရှိမည်။</li>
                  <li>အဆင့်မြှင့်ပြီး နောက်တစ်နေ့မှ ဘောနပ်စ် တောင်းခံနိုင်သည်။</li>
                </ul>
              </div>

              <!-- Rule 2 -->
              <div class="vr-rule">
                <div class="vr-rule-head">
                  <svg class="vr-icon vr-icon--teal" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>နေ့စဉ်အပိုဆု (Daily Bonus)</span>
                </div>
                <ul class="vr-list">
                  <li>နေ့စဉ် သတ်မှတ်ထားသော အပ်ငွေ + Turnover ပြည့်မီမှ ရမည်။</li>
                  <li>အဆင့် ကျော်တက်သော်လည်း လက်ရှိအဆင့်၏ Daily Bonus တစ်ခုသာ ရမည်။</li>
                  <li>တစ်ရက်တာ ကန့်သတ်ချက် — နေ့စဉ် 00:00:00 တွင် Reset ဖြစ်သည်။</li>
                </ul>
              </div>

              <!-- Rule 3 -->
              <div class="vr-rule">
                <div class="vr-rule-head">
                  <svg class="vr-icon vr-icon--purple" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  <span>အပတ်စဉ်ဘောနပ်စ် (Weekly Bonus)</span>
                </div>
                <ul class="vr-list">
                  <li>အပတ်စဉ် သတ်မှတ်ချက်များ ပြည့်မီပါက ရရှိမည်။ အဆင့်ကျော်တက်သော်လည်း လက်ရှိ VIP Weekly Bonus သာ ရမည်။</li>
                  <li>တောင်းဆိုချိန် — တနင်္လာနေ့တိုင်း 00:00:00 – 23:59:59 အတွင်း။</li>
                </ul>
              </div>

              <!-- Rule 4 -->
              <div class="vr-rule">
                <div class="vr-rule-head">
                  <svg class="vr-icon vr-icon--blue" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                  <span>လစဉ်ဘောနပ်စ် (Monthly Bonus)</span>
                </div>
                <ul class="vr-list">
                  <li>လအလိုက် သတ်မှတ်ထားသော အပ်ငွေ + Turnover ပြည့်မီမှ ရမည်။ အဆင့်ကျော်တက်သော်လည်း လက်ရှိ VIP Monthly Bonus သာ ရမည်။</li>
                  <li>တောင်းဆိုချိန် — လစဉ် (၁) ရက်နေ့တိုင်း 00:00:00 – 23:59:59 အတွင်း။</li>
                </ul>
              </div>

              <!-- Divider -->
              <div class="vr-divider">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(239,68,68,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span>Anti-Fraud &amp; Audit Compliance</span>
              </div>

              <!-- Rule 5 -->
              <div class="vr-rule">
                <div class="vr-rule-head">
                  <svg class="vr-icon vr-icon--orange" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>ဆုကြေးသက်တမ်း ကန့်သတ်ချက် (Validity)</span>
                </div>
                <ul class="vr-list">
                  <li>VIP ဘောနပ်စ်သည် ထုတ်ပေးသည့်နေ့မှ <strong>(၇) ရက်</strong> သာ သက်တမ်းရှိသည်။</li>
                  <li>(၇) ရက်အတွင်း မတောင်းဆိုပါက စနစ်မှ အလိုအလျောက် ရုပ်သိမ်းသည်။</li>
                </ul>
              </div>

              <!-- Rule 6 -->
              <div class="vr-rule">
                <div class="vr-rule-head">
                  <svg class="vr-icon vr-icon--teal" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                  <span>Audit &amp; ဂိမ်းကန့်သတ်ချက်</span>
                </div>
                <ul class="vr-list">
                  <li>ဘောနပ်စ် ငွေထုတ်ရန် အနည်းဆုံး <strong>1x Turnover</strong> ကစားရမည်။</li>
                  <li>Slot, ငါးဖမ်း, CQ9 / JDB / MG / WG / KA / NetEnt / Redtiger / PP / JILI / Joker / ELK / Thunderkick / Blockchain တွင်သာ ကစားရမည်။</li>
                </ul>
              </div>

              <!-- Rule 7 -->
              <div class="vr-rule">
                <div class="vr-rule-head">
                  <svg class="vr-icon vr-icon--red" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                  <span>တရားမဝင် ဆော့ကစားမှု ပိတ်ပင်ချက်</span>
                </div>
                <ul class="vr-list">
                  <li>အကောင့်များစွာ ငှားရမ်း / ဂိုဏ်းစုဖွဲ့ ကစားခြင်း တားမြစ်သည်။</li>
                  <li>ဘေးနှစ်ဖက်မျှ လောင်းခြင်း၊ Arbitrage နည်း သုံးခြင်း တားမြစ်သည်။</li>
                  <li>Software / Bot ဖြင့် အလိုအလျောက် ကစားခြင်း တားမြစ်သည်။</li>
                </ul>
                <div class="vr-warning">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#ef4444" stroke="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                  <span>ချိုးဖောက်မှု တွေ့ရှိပါက — အကောင့်ပိတ်ခြင်း၊ ဘောနပ်စ်နှင့် အမြတ်ငွေများ သိမ်းဆည်းခြင်း ဆောင်ရွက်ခြင်း ခံရမည်။</span>
                </div>
              </div>

              <!-- Rule 8 -->
              <div class="vr-rule vr-rule--last">
                <div class="vr-rule-head">
                  <svg class="vr-icon vr-icon--gold" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  <span>အပြီးသတ် ရှင်းလင်းချက်</span>
                </div>
                <ul class="vr-list">
                  <li>VIP ဆုများ တောင်းခံခြင်းဖြင့် ဤစည်းကမ်းများ အားလုံးကို သဘောတူသည်ဟု မှတ်ယူသည်။</li>
                  <li>အပြီးသတ် အနက်ဖွင့်ဆိုပိုင်ခွင့်နှင့် ပြင်ဆင်ပိုင်ခွင့် (Final Interpretation Right) သည် ပလတ်ဖောင်းထံတွင်သာ ရှိသည်။</li>
                </ul>
              </div>

            </div><!-- /vip-rules -->
          </div>

        </main>
      </template>

      <!-- ===== ဆုလာဘ် TAB ===== -->
      <template v-else-if="activeTopTab === 'reward'">
        <main class="reward-area">

          <!-- Top row: balance pill + activity points -->
          <div class="reward-top-row">

            <!-- Left: Balance pill -->
            <div class="reward-balance-pill">
              <!-- Myanmar flag emoji -->
              <span class="reward-flag-emoji">🇲🇲</span>

              <!-- Amount -->
              <span class="reward-balance-amount">{{ rewardBalance }}</span>

              <!-- Refresh toggle — 3 states: idle / spinning / done -->
              <button
                class="reward-refresh-btn"
                :class="{ 'is-done': rewardRefreshDone }"
                @click="refreshRewardBalance"
                :disabled="rewardRefreshing"
                aria-label="Balance refresh"
              >
                <svg
                  class="reward-refresh-svg"
                  :class="{ 'is-spinning': rewardRefreshing }"
                  width="18" height="18" viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <marker id="rw-arr"
                      markerWidth="10" markerHeight="9"
                      refX="8" refY="4.5"
                      orient="auto"
                      markerUnits="userSpaceOnUse">
                      <polyline points="0,1 7,4.5 0,8"
                        fill="none"
                        stroke="#00c896"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                    </marker>
                  </defs>
                  <g>
                    <path d="M 8.6 14.6 A 10 10 0 0 1 27.4 14.6"
                      fill="none" stroke="#00c896" stroke-width="2.2"
                      stroke-linecap="round" marker-end="url(#rw-arr)"/>
                    <path d="M 27.4 21.4 A 10 10 0 0 1 8.6 21.4"
                      fill="none" stroke="#00c896" stroke-width="2.2"
                      stroke-linecap="round" marker-end="url(#rw-arr)"/>
                  </g>
                </svg>
              </button>
            </div>

            <!-- Right: Activity points -->
            <div class="reward-activity">
              <span class="reward-activity-label">လှုပ်ရှားမှုအဆင်</span>
              <span class="reward-activity-val">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4ade80" stroke="none">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                {{ activityPoints }}
              </span>
            </div>
          </div>

          <!-- Empty state -->
          <div class="reward-empty">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.1)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <p class="reward-empty-text">မတ်တာမရှိပါ</p>
          </div>

        </main>
      </template>

      <!-- ===== သမိုင်း TAB ===== -->
      <template v-else-if="activeTopTab === 'history'">
        <main class="hist-area" @click.self="histDateOpen=false;histTypeOpen=false">

          <!-- Filter row -->
          <div class="hist-filter-row">

            <!-- Date filter dropdown -->
            <div class="hist-dropdown" :class="{ open: histDateOpen }">
              <button class="hist-dd-btn" @click.stop="histDateOpen=!histDateOpen; histTypeOpen=false">
                <span>{{ histDateLabel }}</span>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path :d="histDateOpen ? 'M2 7l3-4 3 4' : 'M2 3l3 4 3-4'"
                    stroke="#00c896" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <transition name="hist-dd-fade">
                <div v-if="histDateOpen" class="hist-dd-menu">
                  <button
                    v-for="opt in histDateOptions" :key="opt.key"
                    class="hist-dd-item" :class="{ active: histDateFilter === opt.key }"
                    @click.stop="histDateFilter=opt.key; histDateOpen=false"
                  >{{ opt.label }}</button>
                </div>
              </transition>
            </div>

            <!-- Type filter dropdown -->
            <div class="hist-dropdown" :class="{ open: histTypeOpen }">
              <button class="hist-dd-btn" @click.stop="histTypeOpen=!histTypeOpen; histDateOpen=false">
                <span>{{ histTypeLabel }}</span>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path :d="histTypeOpen ? 'M2 7l3-4 3 4' : 'M2 3l3 4 3-4'"
                    stroke="#00c896" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <transition name="hist-dd-fade">
                <div v-if="histTypeOpen" class="hist-dd-menu">
                  <button
                    v-for="opt in histTypeOptions" :key="opt.key"
                    class="hist-dd-item" :class="{ active: histTypeFilter === opt.key }"
                    @click.stop="histTypeFilter=opt.key; histTypeOpen=false"
                  >{{ opt.label }}</button>
                </div>
              </transition>
            </div>

            <!-- Bonus total (right) -->
            <div class="hist-bonus-total">
              <span class="hist-bonus-label">ဘောနပ်စီ</span>
              <span class="hist-bonus-val">{{ fmtNum(histBonusTotal) }}</span>
            </div>
          </div>

          <!-- Empty state -->
          <div class="hist-empty" @click="histDateOpen=false;histTypeOpen=false">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.1)" stroke-width="1.2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
              <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
            </svg>
            <p class="hist-empty-text">{{ histDateLabel }} မှတ်တမ်းများ မရှိပါ</p>
            <p class="hist-empty-sub">ဒီလကိုကြည့်ပါ</p>
          </div>

        </main>
      </template>

      <!-- ===== တာဝန် + ကျန်တဲ့ tabs ===== -->
      <template v-else>
        <main class="promo-cards-area">
          <div class="promo-empty">
            <svg width="38" height="38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <p class="promo-empty-text">မကြာမီ ဆောင်ရွက်ပေးမည်</p>
          </div>
        </main>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

// ─── Real-time user VIP data ───
const deposited    = ref(0)
const refreshing   = ref(false)
const vipLevelsDb  = ref([])

async function fetchVipData() {
  refreshing.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Total confirmed deposits
    const { data: txs } = await supabase
      .from('transactions').select('amount')
      .eq('user_id', user.id).eq('type', 'deposit').eq('status', 'confirmed')
    if (txs) deposited.value = txs.reduce((s, t) => s + Number(t.amount), 0)

    // VIP thresholds from DB
    const { data: lvls } = await supabase.from('vip_levels').select('*').order('level')
    if (lvls) vipLevelsDb.value = lvls
  } catch (_) {
  } finally {
    setTimeout(() => { refreshing.value = false }, 600)
  }
}

onMounted(fetchVipData)

const userVipLevel = computed(() => {
  let lvl = 0
  if (vipLevelsDb.value.length) {
    vipLevelsDb.value.forEach(r => {
      if (deposited.value >= Number(r.min_deposit)) lvl = r.level
    })
  }
  return lvl
})

const currentLevelImg = computed(() =>
  vipLevels.value.find(l => l.level === userVipLevel.value)?.badgeImg || ''
)

const nextLevelStatic = computed(() =>
  vipLevels.value.find(l => l.level === userVipLevel.value + 1) || null
)

const nextLevelDb = computed(() =>
  vipLevelsDb.value.find(r => r.level === userVipLevel.value + 1) || null
)

const depositRemaining = computed(() => {
  if (nextLevelDb.value) {
    return fmtNum(Math.max(0, Number(nextLevelDb.value.min_deposit) - deposited.value))
  }
  return nextLevelStatic.value?.deposit || '0.00'
})

const turnoverTarget = computed(() =>
  nextLevelStatic.value?.turnover || '0.00'
)

function fmtNum(n) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const topTabs = [
  { key: 'events',  label: 'ဖြစ်ရပ်များ' },
  { key: 'mission', label: 'တာဝန်' },
  { key: 'vvip',    label: 'VIP' },
  { key: 'reward',  label: 'ဆုလာဘ်' },
  { key: 'history', label: 'သမိုင်း' },
]
const activeTopTab = ref('events')

// ─── ဆုလာဘ် tab state ───
const rewardBalance     = ref('0.00')
const activityPoints    = ref('0.00')
const rewardRefreshing  = ref(false)
const rewardRefreshDone = ref(false)

async function refreshRewardBalance() {
  if (rewardRefreshing.value) return
  rewardRefreshing.value  = true
  rewardRefreshDone.value = false
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: wallet } = await supabase
        .from('wallets').select('main_balance').eq('user_id', user.id).single()
      if (wallet) rewardBalance.value = fmtNum(wallet.main_balance)
    }
  } catch (_) {}
  setTimeout(() => {
    rewardRefreshing.value  = false
    rewardRefreshDone.value = true
    setTimeout(() => { rewardRefreshDone.value = false }, 900)
  }, 800)
}

// ─── သမိုင်း tab state ───
const histDateFilter = ref('today')
const histTypeFilter = ref('all')
const histDateOpen   = ref(false)
const histTypeOpen   = ref(false)
const histBonusTotal = ref(0)

const histDateOptions = [
  { key: 'today',     label: 'ဒီနေ့' },
  { key: 'yesterday', label: 'မနေ့က' },
  { key: 'thisweek',  label: 'ဒီတပ်ပတ်' },
  { key: 'lastweek',  label: 'ပြီးခဲ့သောအပတ်က' },
  { key: 'thismonth', label: 'ဒီလ' },
  { key: 'lastmonth', label: 'ပြီးခဲ့သည့်လက' },
]
const histTypeOptions = [
  { key: 'all',       label: 'အားလုး' },
  { key: 'collected', label: 'စုဆောင်းထားသည်' },
  { key: 'sent',      label: 'မြန်ဝေခဲ့သည်' },
]
const histDateLabel = computed(() =>
  histDateOptions.find(o => o.key === histDateFilter.value)?.label ?? 'ဒီနေ့'
)
const histTypeLabel = computed(() =>
  histTypeOptions.find(o => o.key === histTypeFilter.value)?.label ?? 'အားလုး'
)

const sideCategories = [
  { key: 'all',      label: 'အားလုံး'  },
  { key: 'discount', label: 'လျော့ဈေး' },
  { key: 'history',  label: 'သမိုင်း'  },
  { key: 'refill',   label: 'အားဖြည့်' },
]
const activeCat = ref('all')
const allCards = ref([
  { id:1, title:'Exchange Code',   img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780759978456.png?updatedAt=1780760966566&tr=f-auto' },
  { id:2, title:'နေ့စဉ်ဘောနပ်',  img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760107731.png?updatedAt=1780760988859&tr=f-auto' },
  { id:3, title:'ဆုကြေးငွေချပ်', img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760192895.png?updatedAt=1780761005943&tr=f-auto' },
  { id:4, title:'VVIP ဘောနပ်',    img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760302584.png?updatedAt=1780761039585&tr=f-auto' },
  { id:5, title:'တာဝန်ဆုကြေး',   img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760367968.png?updatedAt=1780761073668&tr=f-auto' },
  { id:6, title:'ဘောနပ်မိမိ',    img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760452860.png?updatedAt=1780761090851&tr=f-auto' },
])

const vipSubTabs = [
  { key: 'extra',     label: 'ပရိုမိုးရှင်းအပိုဆု' },
  { key: 'weekly',    label: 'အပတ်စဉ် ဘောနပ်' },
  { key: 'monthly',   label: 'လစဉ် ဘောနပ်' },
  { key: 'benefit',   label: 'VIP ခံစားခွင့်' },
  { key: 'privilege', label: 'VIP အကြိုးကျေးဇူးများ' },
]
const activeVipTab = ref('extra')

const weeklyBonuses = [
  200, 300, 500, 800, 1300, 1800, 2800,
  4300, 6300, 8800, 11800, 15300,
  19800, 24800, 30800, 37800, 45800,
  54800, 65800, 77800, 91800, 107800,
  125800, 145800, 170800, 198800, 229800,
  263800, 301800, 343800, 393800, 448800,
  508800, 573800, 643800, 718800, 808800,
  908800, 1018800, 1138800, 1268800, 1408800,
  1568800, 1743800, 1933800, 2138800, 2358800,
  2593800, 2843800, 3108800, 3388800,
]

const monthlyBonuses = [
  300, 500, 800, 1500, 2300, 3800, 7800,
  12000, 17600, 24600, 33000, 42800,
  55400, 69400, 86200, 105800, 128200,
  153400, 184200, 217800, 257000, 301800,
  352200, 408200, 478200, 556600, 643400,
  738600, 845000, 962600, 1102600, 1256600,
  1424600, 1606600, 1802600, 2012600, 2264600,
  2544600, 2852600, 3188600, 3552600, 3944600,
  4392600, 4882600, 5414600, 5988600, 6604600,
  7262600, 7962600, 8704600, 9488600,
]

const privilegeData = Array.from({ length: 51 }, (_, i) => ({
  birthday: 0,
  envelope: '0.00',
  cashback: i === 0 ? '0%' : i <= 10 ? '0.6%' : i <= 20 ? '0.8%' : i <= 30 ? '1.0%' : i <= 40 ? '1.2%' : '1.5%',
}))

const vipLevels = ref([
  { level: 0,  deposit: '0',                      turnover: '0',                   bonus: '0.00',         badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/62cf696c-b2f6-4a6c-acd5-501c79dc2f50.png?tr=f-auto' },
  { level: 1,  deposit: '3,000.00',               turnover: '50,000.00',           bonus: '1,500.00',     badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/dfeb825d-6f63-46f5-a3ea-b472f4ddaff1.png?tr=f-auto' },
  { level: 2,  deposit: '3,000.00',               turnover: '150,000.00',          bonus: '2,500.00',     badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/5ea5657f-9a07-41a9-b869-9dee36f5b805.png?tr=f-auto' },
  { level: 3,  deposit: '3,000.00',               turnover: '750,000.00',          bonus: '5,000.00',     badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/47c06c9b-32d2-4906-8cd2-7277f32c64a2.png?tr=f-auto' },
  { level: 4,  deposit: '3,000.00',               turnover: '1,650,000.00',        bonus: '9,000.00',     badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/a563b371-a36b-4456-97b8-40bc9e1590e2.png?tr=f-auto' },
  { level: 5,  deposit: '3,000.00',               turnover: '6,500,000.00',        bonus: '20,000.00',    badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/dfc63a7f-b27b-441a-9d6e-8668769a5aca.png?tr=f-auto' },
  { level: 6,  deposit: '3,000.00',               turnover: '30,000,000.00',       bonus: '38,000.00',    badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/e000c280-1c1f-46a7-bb6d-3a73c0f17e2c.png?tr=f-auto' },
  { level: 7,  deposit: '3,000.00',               turnover: '120,000,000.00',      bonus: '68,000.00',    badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/b577b877-aa6a-45c5-a7dc-0a6e57532bed.png?tr=f-auto' },
  { level: 8,  deposit: '3,000.00',               turnover: '330,000,000.00',      bonus: '118,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/b09d940f-6292-4638-9c03-93de174f5a9e.png?tr=f-auto' },
  { level: 9,  deposit: '3,000.00',               turnover: '600,000,000.00',      bonus: '158,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/232e445e-3638-40af-bdb2-6e15aedc739a.png?tr=f-auto' },
  { level: 10, deposit: '3,000.00',               turnover: '900,000,000.00',      bonus: '218,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/18beaa06-1041-4220-85fa-8c799f5d3cea.png?tr=f-auto' },
  { level: 11, deposit: '3,000.00',               turnover: '1,200,000,000.00',    bonus: '251,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/bf8eac00-9ce9-44cd-892e-4329fcb5db37.png?tr=f-auto' },
  { level: 12, deposit: '3,000.00',               turnover: '1,600,000,000.00',    bonus: '387,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/1ebae457-e6ca-4903-9380-6d3fddc7ef93.png?tr=f-auto' },
  { level: 13, deposit: '3,000.00',               turnover: '3,440,000,000.00',    bonus: '430,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/a9fb8c9e-43d0-48cf-9040-8ff3e3f4525b.png?tr=f-auto' },
  { level: 14, deposit: '3,000.00',               turnover: '4,300,000,000.00',    bonus: '473,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/68473b49-14ef-4207-8c18-2dd667e33c92.png?tr=f-auto' },
  { level: 15, deposit: '3,000.00',               turnover: '5,160,000,000.00',    bonus: '516,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/e5d4fffd-731a-416c-85a4-058aa9a989b3.png?tr=f-auto' },
  { level: 16, deposit: '3,000.00',               turnover: '6,020,000,000.00',    bonus: '559,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/a3fa5319-a6c0-43ff-93fc-e861919ed7cf.png?tr=f-auto' },
  { level: 17, deposit: '3,000.00',               turnover: '6,880,000,000.00',    bonus: '602,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/21ad6d6e-1c52-4c68-be68-a593e9ea0c38.png?tr=f-auto' },
  { level: 18, deposit: '3,000.00',               turnover: '7,740,000,000.00',    bonus: '645,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/780d34db-de12-4f55-a8a5-bf768b5e9716.png?tr=f-auto' },
  { level: 19, deposit: '3,000.00',               turnover: '9,030,000,000.00',    bonus: '688,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/8b58a700-e2a2-4f32-8ce6-2dcba1ff77fe.png?tr=f-auto' },
  { level: 20, deposit: '3,000.00',               turnover: '10,320,000,000.00',   bonus: '731,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/41f6de69-c5a4-49e5-ba7f-aabad40992ce.png?tr=f-auto' },
  { level: 21, deposit: '3,000.00',               turnover: '11,610,000,000.00',   bonus: '817,000.00',   badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/b753262e-c102-4bb4-8968-2c9112c2c2b6.png?tr=f-auto' },
  { level: 22, deposit: '3,000.00',               turnover: '12,900,000,000.00',   bonus: '1,161,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/2090bb15-c391-4a02-8e20-fe2e39e137d5.png?tr=f-auto' },
  { level: 23, deposit: '3,000.00',               turnover: '15,050,000,000.00',   bonus: '1,204,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/7eefc194-21fa-4f23-8a5d-48d68f377a6a.png?tr=f-auto' },
  { level: 24, deposit: '3,000.00',               turnover: '17,200,000,000.00',   bonus: '1,247,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/5407e2c4-5b05-44a0-be30-d5fdb7e356a4.png?tr=f-auto' },
  { level: 25, deposit: '3,000.00',               turnover: '19,350,000,000.00',   bonus: '1,290,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/ea639c2d-377f-4880-be1e-5563f3153ae8.png?tr=f-auto' },
  { level: 26, deposit: '3,000.00',               turnover: '21,500,000,000.00',   bonus: '1,333,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/d9945bd5-0e81-42b1-9ea0-36b8537fa2e6.png?tr=f-auto' },
  { level: 27, deposit: '3,000.00',               turnover: '23,650,000,000.00',   bonus: '1,376,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/0c0238d0-5dda-4cb1-9e3d-8042e704c7af.png?tr=f-auto' },
  { level: 28, deposit: '3,000.00',               turnover: '25,800,000,000.00',   bonus: '2,365,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/92d93b41-5ceb-4b50-ba94-bf91403994b7.png?tr=f-auto' },
  { level: 29, deposit: '3,000.00',               turnover: '30,100,000,000.00',   bonus: '2,494,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/be721faa-9624-444b-ac25-5e0711b4ef5a.png?tr=f-auto' },
  { level: 30, deposit: '3,000.00',               turnover: '34,400,000,000.00',   bonus: '2,623,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/8c45b901-1807-4eb2-8d60-66b5a8b4f22d.png?tr=f-auto' },
  { level: 31, deposit: '3,000.00',               turnover: '38,700,000,000.00',   bonus: '2,752,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/eb64a0ba-4ee1-4e1e-8147-12c335529474.png?tr=f-auto' },
  { level: 32, deposit: '3,000.00',               turnover: '43,000,000,000.00',   bonus: '2,881,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/3e7b77a3-1ebf-4ca9-9099-f3a25c4e2522.png?tr=f-auto' },
  { level: 33, deposit: '3,000.00',               turnover: '47,300,000,000.00',   bonus: '3,010,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/d2cba07a-e01f-4636-8695-105d68492316.png?tr=f-auto' },
  { level: 34, deposit: '3,000.00',               turnover: '51,600,000,000.00',   bonus: '5,160,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/bf5407bb-45d5-491b-9ba9-c8f18d0db49c.png?tr=f-auto' },
  { level: 35, deposit: '3,000.00',               turnover: '60,200,000,000.00',   bonus: '5,375,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/fcfc7c26-0be4-4f08-b484-51644ce0235b.png?tr=f-auto' },
  { level: 36, deposit: '3,000.00',               turnover: '68,800,000,000.00',   bonus: '5,590,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/18d9f6e0-57eb-483f-913b-4cef2d062853.png?tr=f-auto' },
  { level: 37, deposit: '3,000.00',               turnover: '77,400,000,000.00',   bonus: '5,805,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/81423c38-af50-4aab-aa0d-d3c389876191.png?tr=f-auto' },
  { level: 38, deposit: '3,000.00',               turnover: '86,000,000,000.00',   bonus: '7,654,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/9a061855-2795-45b3-b3a8-32b237d07def.png?tr=f-auto' },
  { level: 39, deposit: '3,000.00',               turnover: '98,900,000,000.00',   bonus: '8,170,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/949f7f5d-cbb8-4f32-aebf-738e3c89f1c9.png?tr=f-auto' },
  { level: 40, deposit: '3,000.00',               turnover: '111,800,000,000.00',  bonus: '8,600,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/8f262c5a-b2df-4bb9-a9b9-186fb8fcb066.png?tr=f-auto' },
  { level: 41, deposit: '3,000.00',               turnover: '124,700,000,000.00',  bonus: '9,030,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/28fd9140-7172-48ce-8172-4bc0efeaab26.png?tr=f-auto' },
  { level: 42, deposit: '3,000.00',               turnover: '137,600,000,000.00',  bonus: '9,460,000.00', badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/85a9a1ea-c9a1-4c9a-b1ff-2f9dcbe2cc51.png?tr=f-auto' },
  { level: 43, deposit: '3,000.00',               turnover: '150,500,000,000.00',  bonus: '12,900,000.00',badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/08173b03-2b76-4fce-ad74-787e9452d165.png?tr=f-auto' },
  { level: 44, deposit: '3,000.00',               turnover: '172,000,000,000.00',  bonus: '13,000,000.00',badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/73b9210c-6cb4-4551-b45e-ae8cf66996e3.png?tr=f-auto' },
  { level: 45, deposit: '3,000.00',               turnover: '193,500,000,000.00',  bonus: '13,760,000.00',badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/68b91b29-cac8-4895-805d-e8d2fed83986.png?tr=f-auto' },
  { level: 46, deposit: '3,000.00',               turnover: '215,000,000,000.00',  bonus: '14,190,000.00',badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/f0689f9a-3aae-4e3a-a26a-0152e37787e8.png?tr=f-auto' },
  { level: 47, deposit: '3,000.00',               turnover: '236,500,000,000.00',  bonus: '14,620,000.00',badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/73972439-0db5-47e6-9b84-b0ddf392fc9b.png?tr=f-auto' },
  { level: 48, deposit: '3,000.00',               turnover: '258,000,000,000.00',  bonus: '27,950,000.00',badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/406edfe8-9ecc-4e1e-9d30-49f03d657ca4.png?tr=f-auto' },
  { level: 49, deposit: '3,000.00',               turnover: '279,500,000,000.00',  bonus: '30,100,000.00',badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/e090fa8b-f145-4fa1-a3c5-7c68fb4a0fd4.png?tr=f-auto' },
  { level: 50, deposit: '3,000.00',               turnover: '301,000,000,000.00',  bonus: '34,400,000.00',badgeImg: 'https://ik.imagekit.io/rbok01qam/VIP%20LEVEL%20img/c04a5850-3b58-438c-ba03-1b99c2a59eeb.png?tr=f-auto' },
])
</script>

<style scoped>
/* ===== ROOT — height:100dvh fixes inner scroll ===== */
.promo-root {
  height: 100dvh;
  background: linear-gradient(160deg, #16183a 0%, #252870 50%, #16183a 100%);
  color: #fff;
  display: flex; flex-direction: column;
  overscroll-behavior: contain;
  -webkit-tap-highlight-color: transparent;
  position: relative; overflow: hidden;
}
.bg-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; }
.bg-orb--1 { width:240px;height:240px;top:-50px;left:-50px;background:radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%);animation:orb1 14s ease-in-out infinite; }
.bg-orb--2 { width:280px;height:280px;bottom:50px;right:-80px;background:radial-gradient(circle,rgba(34,197,94,0.1) 0%,transparent 70%);animation:orb2 18s ease-in-out infinite; }
@keyframes orb1 { 0%,100%{transform:translate(0,0);}50%{transform:translate(12px,-18px);} }
@keyframes orb2 { 0%,100%{transform:translate(0,0);}50%{transform:translate(-14px,16px);} }

/* ===== HEADER ===== */
.promo-header {
  position: sticky; top: 0; z-index: 30;
  display: flex; align-items: stretch; gap: 6px;
  padding: 10px 10px 0;
  background: rgba(22,24,58,0.88);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.promo-back-btn {
  width: 32px; height: 32px; align-self: center;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.07); border: none;
  border-radius: 9px; color: rgba(255,255,255,0.7);
  cursor: pointer; flex-shrink: 0; transition: opacity 0.15s;
}
.promo-back-btn:active { opacity: 0.5; }
.promo-top-tabs {
  display: flex; overflow-x: auto; flex: 1;
  scrollbar-width: none; -webkit-overflow-scrolling: touch;
}
.promo-top-tabs::-webkit-scrollbar { display: none; }
.promo-top-tab {
  flex-shrink: 0; padding: 10px 13px 9px;
  font-size: 12px; font-weight: 600; white-space: nowrap;
  cursor: pointer; background: none; border: none;
  color: rgba(255,255,255,0.35);
  border-bottom: 2px solid transparent;
  transition: color 0.18s, border-color 0.18s;
}
.promo-top-tab.active { color: #4ade80; border-bottom-color: #4ade80; font-weight: 700; }
.promo-top-tab:active { opacity: 0.6; }

/* ===== BODY ===== */
.promo-body {
  display: flex; flex: 1; min-height: 0;
  position: relative; z-index: 1; overflow: hidden;
}

/* ===== EVENTS SIDEBAR ===== */
.promo-sidebar {
  width: 58px; flex-shrink: 0;
  display: flex; flex-direction: column;
  gap: 0; padding: 8px 4px;
  background: rgba(0,0,0,0.22);
  border-right: 1px solid rgba(255,255,255,0.05);
  overflow-y: auto; scrollbar-width: none;
}
.promo-sidebar::-webkit-scrollbar { display: none; }
.promo-cat-btn {
  display: flex; flex-direction: column;
  align-items: center; gap: 3px;
  padding: 9px 2px;
  border-radius: 10px; cursor: pointer; border: none;
  background: transparent; color: rgba(255,255,255,0.32);
  transition: all 0.16s; -webkit-tap-highlight-color: transparent;
  user-select: none; width: 100%;
}
.promo-cat-btn.active { background: #0d9488; color: #fff; box-shadow: 0 3px 12px rgba(13,148,136,0.45); }
.promo-cat-btn:not(.active):active { background: rgba(255,255,255,0.06); }
.cat-label { font-size: 8px; font-weight: 700; text-align: center; line-height: 1.2; white-space: nowrap; }

/* ===== EVENTS CARDS ===== */
.promo-cards-area {
  flex: 1; min-width: 0; overflow-y: auto;
  padding: 10px 8px 96px;
  display: flex; flex-direction: column; gap: 9px;
  -webkit-overflow-scrolling: touch; overscroll-behavior: contain;
}
.promo-cards-area::-webkit-scrollbar { width: 2px; }
.promo-cards-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius:10px; }
.promo-card {
  border-radius: 14px; overflow: hidden; flex-shrink: 0; cursor: pointer;
  box-shadow: 0 4px 18px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07);
  transition: transform 0.13s; -webkit-tap-highlight-color: transparent;
  background: rgba(255,255,255,0.04);
}
.promo-card:active { /* scale removed */ }
.promo-card-img { width:100%; display:block; border-radius:14px; object-fit:cover; }

/* ===== EMPTY STATE ===== */
.promo-empty {
  flex:1; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:12px; padding:60px 0;
}
.promo-empty-text { font-size:12px; color:rgba(255,255,255,0.25); font-weight:500; }

/* ===== VIP AREA ===== */
.vip-area {
  flex: 1; min-width: 0; min-height: 0;
  display: flex; flex-direction: column;
  overflow: hidden;
}

/* Banner + title + subtabs + table-header — never scroll */
.vip-sticky-top {
  flex-shrink: 0;
}

/* ONLY the level list scrolls */
.vip-level-list {
  flex: 1; min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; overscroll-behavior: contain;
  padding-bottom: 96px;
}
.vip-level-list::-webkit-scrollbar { width: 2px; }
.vip-level-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius:10px; }

/* Banner badge image */
.vip-banner-badge-img {
  width: 52px; height: 52px; object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(20,184,166,0.5));
}

/* Refresh button */
.vip-refresh-btn {
  background: none; border: none; padding: 2px;
  cursor: pointer; display: flex; align-items: center;
  border-radius: 50%; transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.vip-refresh-btn:active { background: rgba(255,255,255,0.08); }
.vip-refresh-btn:disabled { cursor: not-allowed; opacity: 0.6; }
.vip-refresh-btn.spinning svg {
  animation: vip-spin 0.7s linear infinite;
}
@keyframes vip-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* VIP Banner */
.vip-banner {
  margin: 10px 10px 0;
  background: linear-gradient(135deg, #1a1f4e 0%, #2d3480 100%);
  border: 1px solid rgba(99,102,241,0.3);
  border-radius: 14px; padding: 14px 12px;
  display: flex; gap: 10px; align-items: flex-start;
  position: relative;
  overflow: hidden;
}

/* Current level red tag — top-left corner of banner */
.vip-current-level-tag {
  position: absolute;
  top: 0; left: 0;
  background: #ef4444;
  color: #fff;
  font-size: 8.5px;
  font-weight: 700;
  padding: 3px 9px 3px 7px;
  border-radius: 0 0 8px 0;
  letter-spacing: 0.3px;
  line-height: 1;
  z-index: 2;
}

/* Hand indicator cell in each row */
.vip-hand-cell {
  width: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vip-hand-svg {
  width: 14px;
  height: 19px;
  filter: drop-shadow(0 0 4px rgba(74,222,128,0.6));
}

/* Active (current) level row highlight */
.vip-level-row--active {
  background: rgba(74, 222, 128, 0.05);
  border-left: 2px solid rgba(74,222,128,0.5);
}
.vip-banner-left { display: flex; gap: 10px; flex: 1; min-width: 0; }
.vip-badge-wrap { flex-shrink: 0; }
.vip-badge-circle {
  width: 48px; height: 48px; border-radius: 50%;
  background: linear-gradient(135deg, #0f766e, #14b8a6);
  border: 2px solid rgba(20,184,166,0.5);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 16px rgba(20,184,166,0.4);
}
.vip-badge-num { font-size: 20px; font-weight: 900; color: #fff; }
.vip-banner-info { flex: 1; min-width: 0; }
.vip-tag { font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 3px; }
.vip-tag-name { color: #fbbf24; font-weight: 700; }
.vip-banner-row { display: flex; align-items: center; gap: 4px; margin-top: 2px; }
.vip-label { font-size: 10px; color: rgba(255,255,255,0.45); }
.vip-amount { font-size: 13px; font-weight: 700; color: #fff; }
.vip-turnover { margin-top: 5px; }
.vip-turnover span { font-size: 10px; color: rgba(255,255,255,0.45); }
.vip-refresh-icon { flex-shrink: 0; }
.vip-banner-right {
  display: flex; flex-direction: column;
  align-items: center; gap: 6px; flex-shrink: 0;
}
.vip-deposit-btn {
  background: #14b8a6; border: none; border-radius: 8px;
  color: #fff; font-size: 10px; font-weight: 700;
  padding: 6px 10px; cursor: pointer;
  display: flex; align-items: center; gap: 3px;
  white-space: nowrap; box-shadow: 0 2px 8px rgba(20,184,166,0.4);
}
.vip-claim-label {
  font-size: 8px; color: rgba(255,255,255,0.35);
  text-align: center; line-height: 1.4;
}

/* Section title */
.vip-section-title {
  font-size: 13px; font-weight: 700; color: #fff;
  text-align: center; margin: 16px 0 10px;
  letter-spacing: 0.5px;
}

/* VIP Sub-tabs */
.vip-subtabs {
  display: flex; overflow-x: auto;
  scrollbar-width: none; -webkit-overflow-scrolling: touch;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 0 10px;
}
.vip-subtabs::-webkit-scrollbar { display: none; }
.vip-subtab {
  flex-shrink: 0; padding: 8px 12px;
  font-size: 11px; font-weight: 600; white-space: nowrap;
  cursor: pointer; background: none; border: none;
  color: rgba(255,255,255,0.32);
  border-bottom: 2px solid transparent;
  transition: color 0.18s, border-color 0.18s;
}
.vip-subtab.active { color: #4ade80; border-bottom-color: #4ade80; font-weight: 700; }
.vip-subtab:active { opacity: 0.6; }

/* Table header */
.vip-table-header {
  display: flex; align-items: center;
  padding: 8px 10px;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.vip-th { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.4); }
.vip-th--badge { width: 48px; flex-shrink: 0; }
.vip-th--req { flex: 1; padding-left: 8px; }
.vip-th--bonus { width: 90px; text-align: right; flex-shrink: 0; }

/* Weekly table header */
.vip-table-header--weekly { padding: 6px 10px; gap: 0; }
.vip-th--wbadge { width: 48px; flex-shrink: 0; text-align: center; font-size: 8.5px; font-weight: 700; color: rgba(255,255,255,0.5); }
.vip-th--wcol { flex: 1; text-align: center; font-size: 7.5px; font-weight: 700; color: rgba(255,255,255,0.4); line-height: 1.3; padding: 0 2px; }
.vip-th--wbonus { width: 80px; flex-shrink: 0; text-align: right; font-size: 7.5px; font-weight: 700; color: rgba(251,191,36,0.7); }

/* Weekly rows */
.vip-level-row--weekly { padding: 9px 10px; }
.vip-wcell { flex: 1; text-align: center; font-size: 11.5px; color: rgba(255,255,255,0.65); font-weight: 500; }
.vip-wcell--dim { color: rgba(255,255,255,0.3); }
.vip-wcell--bonus { flex: none; width: 80px; text-align: right; font-size: 12.5px; font-weight: 700; color: #fbbf24; }

/* Level list */
.vip-level-list { display: flex; flex-direction: column; }
/* (overflow/scroll rules are declared above in the VIP AREA block) */
.vip-level-row {
  display: flex; align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.12s;
  flex-shrink: 0;
}
.vip-level-row:active { background: rgba(255,255,255,0.04); }

/* Badge */
.vip-lv-badge { width: 48px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.vip-lv-img { width: 42px; height: 42px; object-fit: contain; }
.vip-lv-placeholder {
  width: 42px; height: 42px; border-radius: 50%;
  background: rgba(255,255,255,0.07);
  border: 1.5px dashed rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
}
.vip-lv-placeholder span { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.3); }

/* Requirements */
.vip-lv-req {
  flex: 1; padding-left: 10px;
  display: flex; flex-direction: column; gap: 2px;
}
.vip-lv-dep { font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 500; }
.vip-lv-turn { font-size: 11px; color: rgba(255,255,255,0.35); }

/* Bonus */
.vip-lv-bonus {
  width: 90px; text-align: right; flex-shrink: 0;
  font-size: 13px; font-weight: 700; color: #fbbf24;
}

@media (min-width: 768px) { .promo-sidebar { width: 66px; } }

/* Rules separator */
.vip-rules-sep {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 12px 8px;
  flex-shrink: 0;
}
.vip-rules-sep-line {
  flex: 1; height: 1px;
  background: linear-gradient(to right, transparent, rgba(251,191,36,0.3), transparent);
}
.vip-rules-sep-label {
  display: flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 700; color: rgba(251,191,36,0.8);
  white-space: nowrap; letter-spacing: 0.4px;
}

/* ===== VIP RULES ===== */
.vip-rules {
  margin: 6px 10px 0;
  border-radius: 12px;
  border: 1px solid rgba(99,102,241,0.2);
  background: rgba(15,17,45,0.6);
  flex-shrink: 0;
}

/* Title */
.vr-title {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 12px 4px;
  font-size: 11px; font-weight: 700; color: #fbbf24;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.vr-intro {
  font-size: 10px; color: rgba(255,255,255,0.4);
  padding: 6px 12px 8px; margin: 0;
  line-height: 1.5;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

/* Individual rule block */
.vr-rule {
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.vr-rule--last { border-bottom: none; }

.vr-rule-head {
  display: flex; align-items: center; gap: 5px;
  margin-bottom: 5px;
  font-size: 10.5px; font-weight: 700;
  color: rgba(255,255,255,0.8);
}

/* SVG icon colours */
.vr-icon { flex-shrink: 0; }
.vr-icon--gold   { stroke: #fbbf24; }
.vr-icon--teal   { stroke: #2dd4bf; }
.vr-icon--purple { stroke: #a78bfa; }
.vr-icon--blue   { stroke: #60a5fa; }
.vr-icon--orange { stroke: #fb923c; }
.vr-icon--red    { stroke: #f87171; }

/* ══════════════════════════════════════
   ဆုလာဘ် Reward Tab
   ══════════════════════════════════════ */
.reward-area {
  flex: 1; display: flex; flex-direction: column;
  padding: 10px 12px; overflow-y: auto;
}

/* Top row */
.reward-top-row {
  display: flex; align-items: center;
  justify-content: space-between; gap: 10px;
  margin-bottom: 0;
}

/* Balance pill — no box, no border */
.reward-balance-pill {
  display: flex; align-items: center; gap: 6px;
}

/* Flag emoji */
.reward-flag-emoji {
  font-size: 16px; line-height: 1;
  flex-shrink: 0; user-select: none;
}

/* Amount */
.reward-balance-amount {
  font-size: 14px; font-weight: 700;
  color: #f59e0b; white-space: nowrap;
  border-bottom: 1.5px solid #f59e0b;
  padding-bottom: 1px; line-height: 1.2;
}

/* Refresh button */
.reward-refresh-btn {
  background: none; border: none; padding: 2px;
  cursor: pointer; flex-shrink: 0;
  color: rgba(255,255,255,0.45);
  display: flex; align-items: center;
  border-radius: 50%;
  transition: color 0.3s, background 0.2s;
}
.reward-refresh-btn:not(:disabled):hover {
  color: rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.06);
}
.reward-refresh-btn.is-done { color: #4ade80; }

/* Refresh SVG */
.reward-refresh-svg {
  display: block; flex-shrink: 0;
  transform-origin: center center;
}
.reward-refresh-svg.is-spinning {
  animation: rw-spin 0.6s linear infinite;
}
@keyframes rw-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.reward-refresh-btn:active .reward-refresh-svg {
  opacity: 0.65;
}

/* Activity points (right side) */
.reward-activity {
  display: flex; flex-direction: column;
  align-items: flex-end; gap: 2px; flex-shrink: 0;
}
.reward-activity-label {
  font-size: 10px; color: rgba(255,255,255,0.45);
  white-space: nowrap;
}
.reward-activity-val {
  display: flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 700; color: #4ade80;
}

/* Empty state */
.reward-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 10px; padding-bottom: 40px;
}
.reward-empty-text {
  font-size: 12px; color: rgba(255,255,255,0.22); margin: 0;
}

/* ══════════════════════════════════════
   သမိုင်း History Tab
   ══════════════════════════════════════ */
.hist-area {
  flex: 1; display: flex; flex-direction: column;
  padding: 10px 12px; overflow-y: auto;
}

/* Filter row */
.hist-filter-row {
  display: flex; align-items: center;
  gap: 7px; position: relative; z-index: 10;
}

/* Dropdown wrapper */
.hist-dropdown { position: relative; }

/* Dropdown button — pill with teal border */
.hist-dd-btn {
  display: flex; align-items: center; gap: 5px;
  background: transparent;
  border: 1px solid rgba(0,200,150,0.45);
  border-radius: 20px; padding: 4px 10px;
  color: #00c896; font-size: 11.5px; font-weight: 500;
  cursor: pointer; white-space: nowrap;
  transition: background 0.15s;
}
.hist-dropdown.open .hist-dd-btn,
.hist-dd-btn:active {
  background: rgba(0,200,150,0.1);
}

/* Dropdown menu */
.hist-dd-menu {
  position: absolute; top: calc(100% + 5px); left: 0;
  background: #151b28;
  border: 1px solid rgba(0,200,150,0.18);
  border-radius: 10px; overflow: hidden;
  min-width: 140px; z-index: 100;
  box-shadow: 0 8px 28px rgba(0,0,0,0.55);
}

/* Dropdown item */
.hist-dd-item {
  display: block; width: 100%; text-align: left;
  padding: 9px 14px; background: none; border: none;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 12px; color: rgba(255,255,255,0.65);
  cursor: pointer; transition: background 0.12s, color 0.12s;
}
.hist-dd-item:last-child { border-bottom: none; }
.hist-dd-item:active { background: rgba(0,200,150,0.08); }
.hist-dd-item.active {
  color: #00c896; font-weight: 600;
  background: rgba(0,200,150,0.06);
}

/* Dropdown fade transition */
.hist-dd-fade-enter-active,
.hist-dd-fade-leave-active { transition: opacity 0.15s, transform 0.15s; }
.hist-dd-fade-enter-from,
.hist-dd-fade-leave-to { opacity: 0; transform: translateY(-4px); }

/* Bonus total (right-aligned) */
.hist-bonus-total {
  margin-left: auto; display: flex;
  align-items: center; gap: 5px; flex-shrink: 0;
}
.hist-bonus-label {
  font-size: 11px; color: rgba(255,255,255,0.45);
}
.hist-bonus-val {
  font-size: 13px; font-weight: 700; color: #00c896;
}

/* Empty state */
.hist-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px; padding-bottom: 40px;
}
.hist-empty-text {
  font-size: 12px; color: rgba(255,255,255,0.28); margin: 0;
}
.hist-empty-sub {
  font-size: 11px; color: #00c896; margin: 0;
}

/* Bullet list */
.vr-list {
  margin: 0; padding: 0 0 0 14px;
  list-style: none;
  display: flex; flex-direction: column; gap: 3px;
}
.vr-list li {
  font-size: 10px; color: rgba(255,255,255,0.5);
  line-height: 1.55; position: relative;
}
.vr-list li::before {
  content: '·';
  position: absolute; left: -10px;
  color: rgba(255,255,255,0.2); font-weight: 700;
}
.vr-list strong { color: rgba(255,255,255,0.75); font-weight: 700; }

/* Section divider */
.vr-divider {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 12px 5px;
  font-size: 9.5px; font-weight: 700;
  color: rgba(239,68,68,0.8);
  background: rgba(239,68,68,0.05);
  border-top: 1px solid rgba(239,68,68,0.15);
  border-bottom: 1px solid rgba(239,68,68,0.1);
  text-transform: uppercase; letter-spacing: 0.4px;
}

/* Warning callout */
.vr-warning {
  margin-top: 6px;
  display: flex; align-items: flex-start; gap: 5px;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.2);
  border-radius: 7px; padding: 6px 8px;
}
.vr-warning svg { flex-shrink: 0; margin-top: 1px; }
.vr-warning span {
  font-size: 9.5px; color: rgba(239,68,68,0.85);
  line-height: 1.5;
}
</style>
