<template>
  <div class="acc-root">

    <!-- ══ PROFILE HEADER (Layer 0 — sits on background) ══ -->
    <div class="acc-ph" v-if="isLoggedIn">
      <div class="av-wrap" @click="openProfile">
        <img :src="selectedAvatar" class="av-img" alt="av" />
        <div class="vip-pill" :style="vipBadgeBg">V{{ vipLevel }}</div>
        <div class="av-edit">
          <svg width="9" height="9" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
        </div>
      </div>
      <div class="ph-info">
        <div class="ph-urow">
          <span class="ph-arrow">▼</span>
          <span class="ph-uname">{{ username }}</span>
          <button @click="copyText(username)" class="cp-btn"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
        </div>
        <div class="ph-idrow">
          <span class="ph-id">ID: {{ gameId }}</span>
          <button @click="copyText(gameId)" class="cp-btn cp-btn--blue"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
        </div>
      </div>
    </div>

    <!-- Guest header -->
    <div class="acc-ph" v-else>
      <div class="av-wrap">
        <div class="av-guest"><svg width="30" height="30" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.5" stroke="rgba(255,255,255,0.4)" stroke-width="1.6"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.4)" stroke-width="1.6" stroke-linecap="round"/></svg></div>
      </div>
      <div class="ph-info">
        <p style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.85);margin:0 0 8px;">ဦးစွာ လော့ဂ်အင် သို့မဟုတ် မတ်ပုံတင်</p>
        <div style="display:flex;gap:7px;">
          <button @click="$router.push('/home?auth=login')" class="g-btn">လောဂ်အင်</button>
          <button @click="$router.push('/home?auth=register')" class="g-btn g-btn--primary">မှတ်ပုံတင်</button>
        </div>
      </div>
    </div>

    <!-- ══ BODY ══ -->
    <div class="acc-body">

      <!-- ═══════════════════════════════════════
           LAYER 1 CARD 1 — Balance + Quick Actions
           ═══════════════════════════════════════ -->
      <div class="l1-card">

        <!-- LAYER 2 — Yellow Balance Card -->
        <div class="l2-yellow">
          <div class="ybal-left">
            <span style="font-size:18px;">🇲🇲</span>
            <span class="ybal-amt">{{ formatBalance(mainBalance) }}</span>
            <button @click="fetchWallet" class="yref-btn" :class="{ refreshing }">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="ref-svg"><path d="M12 5C8.13 5 5 8.13 5 12s3.13 7 7 7c2.76 0 5.16-1.59 6.34-3.93" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M17 7.5l1.5 3.5-3.5 0.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="ybal-btns">
            <button class="ybal-btn" @click="$router.push('/home')">ငွေသွင်းနန်</button>
            <button class="ybal-btn" @click="$router.push('/home')">ငွေထုတ်ရန်</button>
          </div>
        </div>

        <!-- Quick icon row (2 items) -->
        <div class="qi-row">
          <button class="qi-item" @click="comingSoon">
            <div class="qi-icon-wrap">
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/style_6_icon_list_zdjl.avif?updatedAt=1780926787548&tr=f-auto" class="qi-img" alt="" @error="e=>e.target.style.display='none'"/>
            </div>
            <span class="qi-lbl">ငါ့မှတ်တမ်း</span>
          </button>
          <button class="qi-item" @click="comingSoon">
            <div class="qi-icon-wrap">
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/style_6_icon_list_txgl.avif?updatedAt=1780926787637&tr=f-auto" class="qi-img" alt="" @error="e=>e.target.style.display='none'"/>
            </div>
            <span class="qi-lbl">ငွေထုတ်စီမံ<br>ခန့်ခွဲမှု</span>
          </button>
        </div>
      </div>

      <!-- ═══════════════════════════════════════
           LAYER 1 CARD 2 — ကမ်းလှမ်းချက်စင်တာ
           ═══════════════════════════════════════ -->
      <div class="l1-card">
        <div class="l1-title">ကမ်းလှမ်းချက်စင်တာ</div>

        <!-- LAYER 2 — Yellow VIP sub-card -->
        <div class="l2-vip">
          <div class="l2-vip-shimmer"></div>
          <div style="position:relative;z-index:1;display:flex;align-items:center;gap:10px;">
            <div class="vip-coin"><span style="font-size:11px;font-weight:900;color:#92400e;">{{ vipLevel }}</span></div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:baseline;gap:3px;flex-wrap:wrap;">
                <span style="font-size:14px;font-weight:900;color:#1a1a2e;letter-spacing:0.02em;">V{{ vipLevel }}</span>
                <span style="font-size:10px;color:rgba(30,30,80,0.7);margin-left:4px;">ပရိမိုးရှင်းအတွက် ပမာဏ {{ formatCurrency(nextLevelTarget) }}</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1px;">
                <span style="font-size:9.5px;color:rgba(30,30,80,0.65);">{{ formatCurrency(deposited) }}/{{ formatCurrency(nextLevelTarget) }}</span>
                <span style="font-size:9.5px;color:rgba(30,30,80,0.65);">VIP လိုအပ်သည် <span style="font-weight:700;color:#92400e;text-decoration:underline;">ငွေသွင်းနန် {{ formatCurrency(nextLevelTarget) }}</span></span>
              </div>
              <div class="vip-bar-track"><div class="vip-bar-fill" :style="{ width: progressPercent + '%' }"></div></div>
            </div>
            <svg width="14" height="14" fill="none" stroke="rgba(30,30,80,0.4)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>

        <!-- 4 icons below VIP card -->
        <div class="l1-grid4">
          <button class="gi-item" @click="$router.push('/agent')">
            <div class="gi-icon-wrap">
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/style_6_icon_list_fxzq.avif?updatedAt=1780926787711&tr=f-auto" class="gi-img" alt="" @error="e=>e.target.style.display='none'"/>
            </div>
            <span class="gi-lbl">အေးဂျင့်</span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-wrap">
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/style_6_icon_list_kyd.avif?updatedAt=1780926787634&tr=f-auto" class="gi-img" alt="" @error="e=>e.target.style.display='none'"/>
            </div>
            <span class="gi-lbl">ကံစမ်းမဲ</span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-wrap">
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/style_6_icon_list_czhd.avif?updatedAt=1780926787610&tr=f-auto" class="gi-img" alt="" @error="e=>e.target.style.display='none'"/>
            </div>
            <span class="gi-lbl">လုပ်ဆောင်ချ<br>ကိုကြိ အား..</span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-wrap">
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/style_6_icon_list_mrqd.avif?updatedAt=1780926787645&tr=f-auto" class="gi-img" alt="" @error="e=>e.target.style.display='none'"/>
            </div>
            <span class="gi-lbl">နေ့စဉ် ဆိုင်း<br>အပါဝင်ဘ..</span>
          </button>
        </div>
      </div>

      <!-- ═══════════════════════════════════════
           LAYER 1 CARD 3 — အခြားလုပ်ဆောင်ချက်များ
           ═══════════════════════════════════════ -->
      <div class="l1-card">
        <div class="l1-title">အခြားလုပ်ဆောင်ချက်များ</div>
        <div class="l1-grid4">
          <button class="gi-item" @click="openProfile">
            <div class="gi-icon-wrap">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="rgba(96,165,250,0.9)" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <span class="gi-lbl">ကိုယ်ရေး<br>အချက်... </span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-wrap">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="rgba(167,139,250,0.9)" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <span class="gi-lbl">လုံခြုံရေးစင်<br>တာ</span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-wrap">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="rgba(52,211,153,0.9)" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
            </div>
            <span class="gi-lbl">ဘာသာစကား</span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-wrap">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="rgba(251,191,36,0.9)" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span class="gi-lbl">ပောက်သည်<br>ဝင်ဆောင်မှု</span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-wrap">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="rgba(248,113,113,0.9)" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
            </div>
            <span class="gi-lbl">ကြေညာချက်<br>များ</span>
          </button>
          <button class="gi-item" @click="$router.push('/device-sessions')">
            <div class="gi-icon-wrap">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="rgba(156,163,175,0.9)" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>
            </div>
            <span class="gi-lbl">စက်ပစ္စည်းသို<br>ဝင်ရောက်ပါ</span>
          </button>
          <button class="gi-item" @click="logout">
            <div class="gi-icon-wrap">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="rgba(239,68,68,0.9)" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </div>
            <span class="gi-lbl" style="color:rgba(239,100,100,0.9);">လောဂ်ထွက်ရန်</span>
          </button>
        </div>
      </div>

    </div><!-- end acc-body -->

    <!-- ══════════════════════════════════════════════
         PROFILE FULL-SCREEN SLIDE-IN
         ══════════════════════════════════════════════ -->
    <Transition name="pg">
      <div v-if="showProfile" class="fullpage" style="background:#13152c;">
        <div class="fp-header">
          <button @click="showProfile = false" class="icon-btn">
            <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="fp-title">ကိုယ်ရေးအကျဉ်း</span>
          <div style="width:34px;"></div>
        </div>
        <div class="fp-body">
          <div style="display:flex;align-items:center;gap:13px;padding:16px 0 20px;">
            <div style="position:relative;cursor:pointer;" @click="openAvatarPicker">
              <img :src="selectedAvatar" style="width:62px;height:62px;border-radius:14px;object-fit:cover;border:1.5px solid rgba(255,255,255,0.15);" alt="av" />
              <div :style="vipBadgeBg" style="position:absolute;bottom:-5px;left:-4px;padding:1px 5px;border-radius:5px;font-size:8px;font-weight:900;color:#fff;line-height:1.5;">VIP{{ vipLevel }}</div>
              <div style="position:absolute;inset:0;border-radius:12px;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
                <svg width="17" height="17" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
            </div>
            <div>
              <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:3px;">ဂိမ်း ID</div>
              <div style="display:flex;align-items:center;gap:5px;">
                <span style="font-size:12px;font-weight:700;color:#4ade80;font-family:monospace;">ID:{{ gameId }}</span>
                <button @click="copyText(gameId)" style="background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.22);border-radius:4px;padding:2px 5px;color:#4ade80;cursor:pointer;display:flex;align-items:center;">
                  <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div style="font-size:10px;color:rgba(255,255,255,0.32);margin-bottom:10px;letter-spacing:0.05em;">ပုံမှန်တော်ပြုသင်္ကေတ အချက်အလက်</div>
          <div>
            <button @click="dropOpen = !dropOpen" style="width:100%;display:flex;align-items:center;gap:10px;padding:12px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;cursor:pointer;text-align:left;transition:border-color 0.15s;" :style="dropOpen ? 'border-color:rgba(255,255,255,0.18);border-radius:10px 10px 0 0;' : ''">
              <svg width="14" height="14" fill="none" stroke="#4ade80" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span style="flex:1;font-size:13px;color:rgba(255,255,255,0.85);font-weight:500;">{{ username }}</span>
              <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;transition:transform 0.2s;" :style="dropOpen ? 'transform:rotate(180deg);' : ''"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <Transition name="drop">
              <div v-if="dropOpen" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-top:none;border-radius:0 0 10px 10px;overflow:hidden;">
                <div style="display:flex;align-items:center;gap:10px;padding:11px 12px;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <svg width="14" height="14" fill="none" stroke="#4ade80" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  <span style="font-size:12.5px;color:rgba(255,255,255,0.8);">{{ username }}</span>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Avatar picker -->
    <Transition name="pg">
      <div v-if="showPicker" class="fullpage" style="background:#0f1128;">
        <div class="fp-header">
          <button @click="showPicker = false" class="icon-btn"><svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
          <span class="fp-title">Avatar ရွေးချယ်ရန်</span>
          <button @click="saveAvatar" style="background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.3);border-radius:7px;padding:4px 10px;color:#4ade80;font-size:11px;font-weight:700;cursor:pointer;">သိမ်းမည်</button>
        </div>
        <div style="display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,0.07);padding:0 14px;">
          <button v-for="(t,i) in tabs" :key="i" @click="activeTab=i" style="padding:9px 14px;font-size:11px;font-weight:600;cursor:pointer;background:none;border:none;border-bottom:2px solid transparent;transition:all 0.15s;" :style="activeTab===i ? 'color:#4ade80;border-bottom-color:#4ade80;' : 'color:rgba(255,255,255,0.3);'">{{ t }}</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:14px;overflow-y:auto;flex:1;">
          <div v-for="url in currentTabUrls" :key="url" @click="pendingAvatar=url" style="cursor:pointer;border-radius:10px;overflow:hidden;aspect-ratio:1;" :style="pendingAvatar===url ? 'outline:2px solid #4ade80;outline-offset:2px;' : ''">
            <img :src="url" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy" />
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

const isLoggedIn   = ref(false)
const username     = ref(localStorage.getItem('sb_username') || 'PLAYER')
const gameId       = ref('')
const mainBalance  = ref(0)
const deposited    = ref(0)
const refreshing   = ref(false)

const showProfile = ref(false)
const showPicker  = ref(false)
const dropOpen    = ref(false)
const activeTab   = ref(0)
const tabs = ['♂ မိတာ', '♀ ပေ']

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

function openProfile() { dropOpen.value = false; showProfile.value = true }
function openAvatarPicker() { pendingAvatar.value = selectedAvatar.value; activeTab.value = 0; showPicker.value = true }
function saveAvatar() { selectedAvatar.value = pendingAvatar.value; localStorage.setItem('sb_avatar_url', pendingAvatar.value); showPicker.value = false }

async function fetchWallet() {
  try {
    refreshing.value = true
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    gameId.value = user.id.substring(0, 9).toUpperCase()
    const { data: w } = await supabase.from('wallets').select('main_balance').eq('user_id', user.id).single()
    if (w) mainBalance.value = w.main_balance
    const { data: txs } = await supabase.from('transactions').select('amount').eq('user_id', user.id).eq('type','deposit').eq('status','confirmed')
    if (txs) deposited.value = txs.reduce((s, t) => s + Number(t.amount), 0)
  } catch {} finally { setTimeout(() => { refreshing.value = false }, 500) }
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  isLoggedIn.value = !!session
  if (session) {
    fetchWallet()
    loadVip()
    setInterval(fetchWallet, 5000)
  }
})

const vipLevels = ref([])
async function loadVip() { const { data } = await supabase.from('vip_levels').select('*').order('level'); if (data) vipLevels.value = data }

const vipLevel = computed(() => {
  if (!vipLevels.value.length) { const t=[0,10000,40000,60000,80000,100000,150000,200000,300000,500000]; let l=1; t.forEach((v,i)=>{ if(deposited.value>=v) l=i+1 }); return Math.min(l,10) }
  let l=1; vipLevels.value.forEach(r=>{ if(deposited.value>=Number(r.min_deposit)) l=r.level }); return l
})
const nextLevel = computed(() => Math.min(vipLevel.value+1, vipLevels.value.length||10))
const nextRow   = computed(() => vipLevels.value.find(r=>r.level===nextLevel.value)||null)
const nextLevelTarget     = computed(() => nextRow.value ? Number(nextRow.value.min_deposit) : 10000)
const nextLevelMaxDeposit = computed(() => nextRow.value ? Number(nextRow.value.max_deposit) : 40000)
const progressPercent = computed(() => {
  const cur=vipLevels.value.find(r=>r.level===vipLevel.value); const prev=cur?Number(cur.min_deposit):0
  const span=nextLevelTarget.value-prev; return span?Math.min(100,Math.max(0,Math.round((deposited.value-prev)/span*100))):100
})
const glowMap={Silver:'linear-gradient(135deg,#b45309,#facc15)',Green:'linear-gradient(135deg,#16a34a,#22c55e)',Blue:'linear-gradient(135deg,#1d4ed8,#3b82f6)',Purple:'linear-gradient(135deg,#7c3aed,#a855f7)',Gold:'linear-gradient(135deg,#ca8a04,#fde047)',Red:'linear-gradient(135deg,#dc2626,#f87171)',Diamond:'linear-gradient(135deg,#0e7490,#22d3ee)',Platinum:'linear-gradient(135deg,#475569,#cbd5e1)',Master:'linear-gradient(135deg,#92400e,#fbbf24)',Royal:'linear-gradient(135deg,#d97706,#fef08a)'}
const vipBadgeBg = computed(() => { const row=vipLevels.value.find(r=>r.level===vipLevel.value); const g=row?.glow_color||'Silver'; return `background:${glowMap[g]||glowMap.Silver};color:#fff;` })

const formatCurrency = n => new Intl.NumberFormat('en-US').format(n||0)
const formatBalance  = n => { const v=Number(n)||0; if(v>=1000000) return (v/1000000).toFixed(1)+'M'; if(v>=1000) return (v/1000).toFixed(1)+'K'; return v.toFixed(2) }
const copyText = async t => { try { await navigator.clipboard.writeText(t) } catch {} }
const logout = async () => { await supabase.auth.signOut(); ['sb_token','sb_refresh','sb_username','sb_avatar_url'].forEach(k=>localStorage.removeItem(k)); window.location.href='/home' }
const comingSoon = () => {}
</script>

<style scoped>
/* ═══════════════════════════════
   LAYER 0 — ROOT BACKGROUND
   ═══════════════════════════════ */
.acc-root {
  min-height: 100vh;
  background: linear-gradient(160deg, #16183a 0%, #252870 50%, #16183a 100%);
  display: flex; flex-direction: column;
  color: rgba(255,255,255,0.92);
  font-family: system-ui, sans-serif;
  padding-bottom: 80px;
}

/* ── Profile Header (on background, no card) ── */
.acc-ph {
  display: flex; align-items: center; gap: 13px;
  padding: 16px 16px 14px;
}
.av-wrap { position: relative; cursor: pointer; flex-shrink: 0; }
.av-img  {
  width: 72px; height: 72px; border-radius: 50%;
  object-fit: cover;
  border: 2.5px solid rgba(255,255,255,0.22);
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
.av-guest {
  width: 72px; height: 72px; border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 2px solid rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
}
.vip-pill {
  position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
  padding: 1px 7px; border-radius: 5px;
  font-size: 8px; font-weight: 900; line-height: 1.6;
  white-space: nowrap;
}
.av-edit {
  position: absolute; top: 2px; right: 2px;
  width: 18px; height: 18px; border-radius: 50%;
  background: rgba(29,78,216,0.9);
  display: flex; align-items: center; justify-content: center;
}
.ph-info { flex: 1; min-width: 0; }
.ph-urow { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.ph-arrow { font-size: 10px; color: #fbbf24; }
.ph-uname { font-size: 16px; font-weight: 800; color: #fff; }
.ph-idrow { display: flex; align-items: center; gap: 6px; }
.ph-id { font-size: 11px; color: rgba(255,255,255,0.45); font-family: monospace; }
.cp-btn {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 4px; padding: 2px 4px;
  color: rgba(255,255,255,0.45); cursor: pointer;
  display: flex; align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.cp-btn--blue { color: #60a5fa; border-color: rgba(96,165,250,0.25); background: rgba(96,165,250,0.06); }

/* ── Body ── */
.acc-body { padding: 0 12px; flex: 1; display: flex; flex-direction: column; gap: 12px; }

/* ═══════════════════════════════
   LAYER 1 — HEAVY CARDS
   ═══════════════════════════════ */
.l1-card {
  background: rgba(48, 52, 140, 0.82);
  border-radius: 16px;
  padding: 14px;
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 4px 24px rgba(0,0,0,0.35);
}
.l1-title {
  font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.55);
  margin-bottom: 12px;
  letter-spacing: 0.04em;
}

/* ═══════════════════════════════
   LAYER 2 — YELLOW BALANCE CARD
   ═══════════════════════════════ */
.l2-yellow {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 55%, #fbbf24 100%);
  border-radius: 12px;
  padding: 12px 14px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px;
  margin-bottom: 14px;
  box-shadow: 0 4px 16px rgba(217,119,6,0.4);
}
.ybal-left { display: flex; align-items: center; gap: 8px; }
.ybal-amt { font-size: 22px; font-weight: 900; color: #1a1440; letter-spacing: 0.03em; }
.yref-btn {
  background: rgba(0,0,0,0.15); border: none; border-radius: 6px;
  padding: 4px 6px; cursor: pointer; color: rgba(30,20,60,0.75);
  display: flex; align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.yref-btn.refreshing .ref-svg { animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.ybal-btns { display: flex; gap: 7px; }
.ybal-btn {
  padding: 7px 13px; border-radius: 8px;
  background: rgba(0,0,0,0.18);
  border: 1.5px solid rgba(255,255,255,0.35);
  color: #fff; font-size: 10.5px; font-weight: 700;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
  transition: opacity 0.15s;
}
.ybal-btn:active { opacity: 0.75; }

/* Quick icon row (2 items) */
.qi-row { display: flex; gap: 0; }
.qi-item {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  gap: 6px; padding: 10px 8px;
  background: none; border: none; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.qi-icon-wrap {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
.qi-img { width: 48px; height: 48px; object-fit: contain; }
.qi-lbl { font-size: 10px; color: rgba(255,255,255,0.75); line-height: 1.4; text-align: center; font-weight: 500; }

/* ═══════════════════════════════
   LAYER 2 — YELLOW VIP SUB-CARD
   ═══════════════════════════════ */
.l2-vip {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 60%, #fde68a 100%);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 14px;
  position: relative; overflow: hidden;
  box-shadow: 0 4px 16px rgba(217,119,6,0.35);
}
.l2-vip-shimmer {
  position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
  animation: shimmer 3s ease-in-out infinite;
}
@keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
.vip-coin {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(0,0,0,0.18);
  border: 2px solid rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.vip-bar-track {
  height: 5px; border-radius: 3px;
  background: rgba(0,0,0,0.18);
  overflow: hidden; margin-top: 5px;
}
.vip-bar-fill {
  height: 100%; border-radius: 3px;
  background: linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.85));
  transition: width 0.5s;
}

/* Grid 4-cols for icons */
.l1-grid4 {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}
.gi-item {
  display: flex; flex-direction: column; align-items: center;
  gap: 6px; padding: 10px 4px;
  background: none; border: none; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
}
.gi-icon-wrap {
  width: 48px; height: 48px; border-radius: 14px;
  background: rgba(255,255,255,0.06);
  display: flex; align-items: center; justify-content: center;
}
.gi-img { width: 40px; height: 40px; object-fit: contain; }
.gi-lbl { font-size: 9.5px; color: rgba(255,255,255,0.7); line-height: 1.35; text-align: center; }

/* ── Full-screen overlays ── */
.fullpage { position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; overflow: hidden; }
.fp-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.fp-title { font-size: 13px; font-weight: 700; color: #fff; }
.fp-body { flex: 1; overflow-y: auto; padding: 0 14px 20px; }
.icon-btn { background: none; border: none; cursor: pointer; padding: 5px; display: flex; align-items: center; -webkit-tap-highlight-color: transparent; }

/* ── Guest buttons ── */
.g-btn { padding: 7px 16px; border-radius: 8px; border: 1.5px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 700; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.g-btn:active { opacity: 0.7; }
.g-btn--primary { background: linear-gradient(135deg,#4f46e5,#7c3aed); border-color: transparent; color: #fff; }

/* ── Transitions ── */
.pg-enter-active, .pg-leave-active { transition: transform 0.28s cubic-bezier(0.4,0,0.2,1); }
.pg-enter-from { transform: translateX(100%); }
.pg-leave-to  { transform: translateX(100%); }
.drop-enter-active, .drop-leave-active { transition: all 0.18s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
