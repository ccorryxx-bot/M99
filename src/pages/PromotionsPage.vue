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
          <div v-for="card in allCards" :key="card.id" class="promo-card">
            <img :src="card.img" :alt="card.title" class="promo-card-img" loading="lazy" />
          </div>
        </main>
      </template>

      <!-- ===== VIP TAB ===== -->
      <template v-else-if="activeTopTab === 'vvip'">
        <main class="vip-area">

          <!-- VIP User Banner -->
          <div class="vip-banner">
            <div class="vip-banner-left">
              <div class="vip-badge-wrap">
                <div class="vip-badge-circle">
                  <span class="vip-badge-num">0</span>
                </div>
              </div>
              <div class="vip-banner-info">
                <div class="vip-tag">လက်ရှိဆင့် <span class="vip-tag-name">VIP1</span></div>
                <div class="vip-banner-row">
                  <span class="vip-label">အာမိန်ဘွဲ့ ရရှိရာ တိုတောင်းနေပါ</span>
                </div>
                <div class="vip-banner-row">
                  <span class="vip-amount">3,000.00</span>
                </div>
                <div class="vip-banner-row vip-turnover">
                  <span>လောင်ကျော် တိုတောင်းနေသား</span>
                </div>
                <div class="vip-banner-row">
                  <span class="vip-amount">50,000.00</span>
                  <svg class="vip-refresh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="vip-banner-right">
              <button class="vip-deposit-btn">
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
          <div class="vip-table-header">
            <div class="vip-th vip-th--badge"></div>
            <div class="vip-th vip-th--req">အဆင်တရောင်မြင်တင်ရရာနေများ</div>
            <div class="vip-th vip-th--bonus">ဘောနပ်ဒ်</div>
          </div>

          <!-- Level Rows 0-50 (scrollable) -->
          <div class="vip-level-list">
            <div
              v-for="lv in vipLevels" :key="lv.level"
              class="vip-level-row"
            >
              <div class="vip-lv-badge">
                <img v-if="lv.badgeImg" :src="lv.badgeImg" :alt="'VIP ' + lv.level" class="vip-lv-img" loading="lazy" />
                <div v-else class="vip-lv-placeholder">
                  <span>{{ lv.level }}</span>
                </div>
              </div>
              <div class="vip-lv-req">
                <span class="vip-lv-dep">{{ lv.deposit }}</span>
                <span class="vip-lv-turn">{{ lv.turnover }}</span>
              </div>
              <div class="vip-lv-bonus">{{ lv.bonus }}</div>
            </div>
          </div>

        </main>
      </template>

      <!-- ===== OTHER TABS ===== -->
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
import { ref } from 'vue'

const topTabs = [
  { key: 'events',  label: 'ဖြစ်ရပ်များ' },
  { key: 'mission', label: 'တာဝန်' },
  { key: 'vvip',    label: 'VIP' },
  { key: 'reward',  label: 'ဆုလာဘ်' },
  { key: 'history', label: 'သမိုင်း' },
]
const activeTopTab = ref('events')

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
.promo-card:active { transform: scale(0.975); }
.promo-card-img { width:100%; display:block; border-radius:14px; object-fit:cover; }

/* ===== EMPTY STATE ===== */
.promo-empty {
  flex:1; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:12px; padding:60px 0;
}
.promo-empty-text { font-size:12px; color:rgba(255,255,255,0.25); font-weight:500; }

/* ===== VIP AREA ===== */
.vip-area {
  flex: 1; min-width: 0; overflow-y: auto;
  -webkit-overflow-scrolling: touch; overscroll-behavior: contain;
  padding-bottom: 96px;
}
.vip-area::-webkit-scrollbar { width: 2px; }
.vip-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius:10px; }

/* VIP Banner */
.vip-banner {
  margin: 10px 10px 0;
  background: linear-gradient(135deg, #1a1f4e 0%, #2d3480 100%);
  border: 1px solid rgba(99,102,241,0.3);
  border-radius: 14px; padding: 14px 12px;
  display: flex; gap: 10px; align-items: flex-start;
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

/* Level list */
.vip-level-list { display: flex; flex-direction: column; }
.vip-level-row {
  display: flex; align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.12s;
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
</style>
