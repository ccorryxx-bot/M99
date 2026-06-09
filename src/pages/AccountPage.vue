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
          <button class="qi-item" @click="openRecords">
            <div class="qi-icon-wrap">
              <img src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/style_6_icon_list_zdjl.avif?updatedAt=1780926787548&tr=f-auto" class="qi-img" alt="" @error="e=>e.target.style.display='none'"/>
            </div>
            <span class="qi-lbl">ငါ့မှတ်တမ်း</span>
          </button>
          <button class="qi-item" @click="showWithdrawModal=true">
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
            <div class="gi-icon-plain">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.80)" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <span class="gi-lbl">ကိုယ်ရေး<br>အချက်... </span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-plain">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.80)" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <span class="gi-lbl">လုံခြုံရေးစင်<br>တာ</span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-plain">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.80)" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
            </div>
            <span class="gi-lbl">ဘာသာစကား</span>
          </button>
          <button class="gi-item" @click="showCs=true">
            <div class="gi-icon-plain">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.80)" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span class="gi-lbl">ဖောက်သည်<br>ဝန်ဆောင်မှု</span>
          </button>
          <button class="gi-item" @click="comingSoon">
            <div class="gi-icon-plain">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.80)" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
            </div>
            <span class="gi-lbl">ကြေညာချက်<br>များ</span>
          </button>
          <button class="gi-item" @click="$router.push('/device-sessions')">
            <div class="gi-icon-plain">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.80)" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>
            </div>
            <span class="gi-lbl">စက်ပစ္စည်းသို<br>ဝင်ရောက်ပါ</span>
          </button>
          <button class="gi-item" @click="logout">
            <div class="gi-icon-plain">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.80)" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
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
      <div v-if="showProfile" class="fullpage prf-root">
        <!-- Header -->
        <div class="fp-header">
          <button @click="showProfile = false" class="icon-btn">
            <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="fp-title">ကိုယ်ရေးအချက်အလက်များ</span>
          <div style="width:34px;"></div>
        </div>

        <!-- Scrollable body -->
        <div class="prf-body">

          <!-- Avatar + ID row -->
          <div class="prf-av-row">
            <div style="position:relative;cursor:pointer;flex-shrink:0;" @click="openAvatarPicker">
              <img :src="selectedAvatar" class="prf-av-img" alt="av" />
              <div :style="vipBadgeBg" class="prf-vip-badge">VIP{{ vipLevel }}</div>
              <div class="prf-av-overlay">
                <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
            </div>
            <div class="prf-id-col">
              <div class="prf-id-row">
                <span class="prf-id-text">ID:{{ gameId }}</span>
                <button @click="copyText(gameId)" class="prf-copy-btn">
                  <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
              </div>
              <div class="prf-name-row">
                <span class="prf-name-text">{{ username }}</span>
                <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </div>
            </div>
          </div>

          <!-- Section: Basic Info -->
          <div class="prf-section-label">ပုံသေမြဲသျက်ကို အချက်အလက်</div>

          <!-- Username field -->
          <div class="prf-field" @click="dropOpen=!dropOpen" :style="dropOpen?'border-radius:8px 8px 0 0;border-color:rgba(255,255,255,0.2);':''">
            <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span class="prf-field-val">{{ username }}</span>
            <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;transition:transform 0.2s;" :style="dropOpen?'transform:rotate(180deg);':''"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </div>
          <Transition name="drop">
            <div v-if="dropOpen" class="prf-drop-panel">
              <div class="prf-drop-item">
                <svg width="13" height="13" fill="none" stroke="#4ade80" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                <span>{{ username }}</span>
              </div>
            </div>
          </Transition>

          <!-- Phone -->
          <div class="prf-section-label" style="margin-top:7px;">မိုဘိုင်းနံပါတ်ကို ချိတ်ပါ။</div>
          <div class="prf-field prf-field--readonly">
            <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="rgba(255,255,255,0.5)"/></svg>
            <span class="prf-field-val">{{ maskedPhone }}</span>
          </div>

          <!-- Social accounts -->
          <div class="prf-section-label" style="margin-top:7px;">တချိုး အကောင့်များ ချိတ်ဆက်ပါ</div>

          <!-- WhatsApp -->
          <div class="prf-social-field">
            <div class="prf-social-icon">
              <img src="https://ik.imagekit.io/tdpebgueq/Agent_Tap_icons/89dc6e632241379c113adf1bb70ecdb3.jpg?tr=f-auto" class="prf-social-img" alt="WA" @error="e=>e.target.style.display='none'" />
            </div>
            <input v-model="whatsappId" class="prf-social-input" placeholder="သင်၏ WhatsApp ID ကိုထည့်ပါ" />
          </div>

          <!-- Facebook -->
          <div class="prf-social-field">
            <div class="prf-social-icon">
              <img src="https://ik.imagekit.io/tdpebgueq/Agent_Tap_icons/5bb0f73a7b3e0f976acad614a42e5040.jpg?tr=f-auto" class="prf-social-img" alt="FB" @error="e=>e.target.style.display='none'" />
            </div>
            <input v-model="facebookId" class="prf-social-input" placeholder="သင်၏ Facebook ID ကိုထည့်ပါ" />
          </div>

          <!-- Telegram -->
          <div class="prf-social-field">
            <div class="prf-social-icon">
              <img src="https://ik.imagekit.io/tdpebgueq/icons/telegram_logo_QeWRW9-okP.png?tr=f-auto" class="prf-social-img" alt="TG" @error="e=>e.target.style.display='none'" />
            </div>
            <input v-model="telegramId" class="prf-social-input" placeholder="သင်၏ Telegram ID ကိုထည့်ပါ" />
          </div>

          <!-- Birthday -->
          <div class="prf-section-label" style="margin-top:7px;">မွေးနေ့ (သတ်မှတ်ပြီးနောက် ပြင်မရ)</div>
          <div class="prf-field prf-field--select" @click="showBirthPicker=!showBirthPicker" :style="showBirthPicker?'border-radius:8px 8px 0 0;border-color:rgba(255,255,255,0.2);':''">
            <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span class="prf-field-val" :style="birthDisplay?'':'color:rgba(255,255,255,0.3);'">{{ birthDisplay || 'ရက် လ နှစ်' }}</span>
            <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;transition:transform 0.2s;" :style="showBirthPicker?'transform:rotate(180deg);':''"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </div>
          <Transition name="drop">
            <div v-if="showBirthPicker" class="prf-birth-picker">
              <div class="prf-birth-cols">
                <div class="prf-birth-col">
                  <div class="prf-birth-col-label">နှစ်</div>
                  <select v-model="birthYear" class="prf-birth-select">
                    <option value="">နှစ်</option>
                    <option v-for="y in birthYears" :key="y" :value="y">{{ y }}</option>
                  </select>
                </div>
                <div class="prf-birth-col">
                  <div class="prf-birth-col-label">လ</div>
                  <select v-model="birthMonth" class="prf-birth-select">
                    <option value="">လ</option>
                    <option v-for="m in 12" :key="m" :value="m">{{ String(m).padStart(2,'0') }}</option>
                  </select>
                </div>
                <div class="prf-birth-col">
                  <div class="prf-birth-col-label">ရက်</div>
                  <select v-model="birthDay" class="prf-birth-select">
                    <option value="">ရက်</option>
                    <option v-for="d in 31" :key="d" :value="d">{{ String(d).padStart(2,'0') }}</option>
                  </select>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Age warning -->
          <p class="prf-age-warn">ငွေကြေးသုံးပြုလုပ်ရန် သင်သည် 18 နှင့်အထက်ကြီရန်လိုသည်။ ဆိုလိုသည်မှာ 10/06/2008 မတိုင်ခင်မွေးဖွားသည်ဖြစ်ရမည်။</p>

          <!-- Buttons inline -->
          <div class="prf-footer-inline">
            <button @click="showProfile=false" class="prf-btn-back">နောက်သို့</button>
            <button @click="saveProfile" :disabled="profileSaving" class="prf-btn-save">
              {{ profileSaving ? 'သိမ်းနေ...' : 'အတည်ပြုရန်' }}
            </button>
          </div>
          <div style="height:env(safe-area-inset-bottom,12px);min-height:12px;"></div>

        </div><!-- end prf-body -->
      </div>
    </Transition>

    <!-- ══════════════════════════════════════════════
         CUSTOMER SERVICE PANEL — Slide from right
         ══════════════════════════════════════════════ -->
    <Transition name="pg">
      <div v-if="showCs" class="fullpage cs-root">

        <!-- Header -->
        <div class="cs-header">
          <button @click="showCs=false" class="icon-btn">
            <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="fp-title">မက်ဆေ့ချ်စင်တာ</span>
          <div style="width:34px;"></div>
        </div>

        <!-- Tabs -->
        <div class="cs-tabs-wrap">
          <div class="cs-tabs">
            <button :class="['cs-tab', csTab==='service'?'cs-tab--active':'']" @click="csTab='service'">ဆောင်မှု</button>
            <button :class="['cs-tab', csTab==='announce'?'cs-tab--active':'']" @click="csTab='announce'">
              ကြော်ငြာချက်<span class="cs-badge">1</span>
            </button>
            <button :class="['cs-tab', csTab==='notify'?'cs-tab--active':'']" @click="csTab='notify'">
              အသိပေးချက်<span class="cs-badge cs-badge--red">66</span>
            </button>
            <button :class="['cs-tab', csTab==='marquee'?'cs-tab--active':'']" @click="csTab='marquee'">Marquee</button>
            <button :class="['cs-tab', csTab==='suggest'?'cs-tab--active':'']" @click="csTab='suggest'">အကြံပြုချက်</button>
          </div>
        </div>

        <!-- Body -->
        <div class="cs-body">

          <!-- ── SERVICE TAB ── -->
          <div v-if="csTab==='service'">

            <!-- Main support card -->
            <div class="cs-card">
              <div class="cs-card-title">24/7 အဝန်လိုင်းအကူအညီ</div>
              <div class="cs-card-desc">သင်ကြုံနေသောမည်သည့် ပြဿနာကိုမဆိုကျွန်ုပ်တို့ ဝန်ဆောင်မှုဆိုဒ် ဝင်ပြီး ဆက်သွယ်ဆောင်ရွက်ပါ</div>

              <!-- 24/7 button -->
              <div class="cs-247-row">
                <div class="cs-247-btn" @click="comingSoon">
                  <div class="cs-247-av">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.9)" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path stroke-linecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  </div>
                  <span class="cs-247-label">24/7<br>ဝန်ဆောင်မှု</span>
                </div>
              </div>

              <!-- Live chat + Telegram -->
              <div class="cs-link-row">
                <button class="cs-link-btn cs-link-btn--chat" @click="comingSoon">
                  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  <span>ထောင်မပ</span>
                </button>
                <button class="cs-link-btn cs-link-btn--tg" @click="comingSoon">
                  <img src="https://ik.imagekit.io/tdpebgueq/icons/telegram_logo_QeWRW9-okP.png?tr=f-auto" style="width:16px;height:16px;object-fit:contain;border-radius:50%;" alt="TG" />
                  <span>Telegram ဝန်ဆောင်မှု</span>
                </button>
              </div>
            </div>

            <!-- Agent card -->
            <div class="cs-agent-card">
              <div class="cs-agent-av">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,200,50,0.9)" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path stroke-linecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </div>
              <div class="cs-agent-info">
                <div class="cs-agent-title">အမည်ပြောင်: အဝန်လိုင်း တိုက်ရိုက်ဝင်...</div>
                <div class="cs-agent-name-row">
                  <span class="cs-agent-name">Customer1</span>
                  <button @click="copyText('Customer1')" class="cs-copy-btn">
                    <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  </button>
                </div>
                <div class="cs-agent-time">ဝန်ဆောင်းအချိန်: 00:00 - 23:59</div>
              </div>
              <button class="cs-contact-btn" @click="comingSoon">ဆောင်ရွက်ပါ</button>
            </div>

          </div>

          <!-- ── SUGGEST TAB ── -->
          <div v-else-if="csTab==='suggest'">

            <!-- Sub-tabs: Create / Mine -->
            <div class="sg-sub-tabs">
              <button :class="['sg-sub-tab', suggestSubTab==='create'?'sg-sub-tab--active':'']" @click="suggestSubTab='create'">ဖန်တီးပါ</button>
              <button :class="['sg-sub-tab', suggestSubTab==='mine'?'sg-sub-tab--active':'']" @click="suggestSubTab='mine'">ကျွန်ုပ်တော်: ပြဿနာ</button>
            </div>

            <!-- CREATE form -->
            <div v-if="suggestSubTab==='create'" class="sg-form">

              <!-- Category -->
              <div class="sg-group">
                <div class="sg-label">တဲပြင်နဲ့မြင်အမျိုးအစား <span class="sg-required">*</span></div>
                <div class="sg-select-wrap">
                  <select v-model="suggestCat" class="sg-select">
                    <option value="">ကောင်းမျဉ်ဆံသောကြာနောင်ကို ရွေးပါ...</option>
                    <option value="gameplay">ဂိမ်းကစားခြင်း</option>
                    <option value="payment">ငွေပေးချေမှု</option>
                    <option value="deposit">ငွေသွင်းမှု</option>
                    <option value="withdraw">ငွေထုတ်မှု</option>
                    <option value="account">အကောင့်</option>
                    <option value="bonus">ဘောနပ်စ်</option>
                    <option value="other">အခြား</option>
                  </select>
                  <svg width="11" height="11" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2.2" viewBox="0 0 24 24" class="sg-select-arrow"><path stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>

              <!-- Content -->
              <div class="sg-group">
                <div class="sg-label">
                  အကြောင်းအရာ
                  <span class="sg-hint"> (သင်ကြုံသောနာများကို တင်ပြပြီး ကျွန်ုပ်တို့ ပြင်ဆင်ပေးနသည်/မိုကောင်းအောင်လုပ်ပေးသည်)</span>
                  <span class="sg-required">*</span>
                </div>
                <textarea
                  v-model="suggestContent"
                  class="sg-textarea"
                  maxlength="1000"
                  rows="6"
                  placeholder="သင်အကြံပြချင်သောအကြောင်းများသည် ကျွန်ုပ်တို့အတွက် အရေးပါသည်။ လက်ရှိရှိသော ဝန်ဆောင်မှုများကို ပိုကောင်းအောင် သုံးပြုသမျှ ငြိမ်းချမ်းသောနှုန်းများ ချိုးနှိုင်းမည်ဖြစ်ပြီး ဝင်ဆောင်ဆုပ်ကိုင်ထားသောမြ ပင်တေဝင်မိုတင်ပေမည်ဖြစ်ပါသည်။"
                ></textarea>
                <div class="sg-char-count">{{ suggestContent.length }}/1000</div>
              </div>

              <!-- Image upload -->
              <div class="sg-group">
                <div class="sg-label">
                  တတ်ပုံများ မလိမ်မပေလို့
                  <span class="sg-hint"> (ရွေးချယ်ရန် မကိုင်ကြ ဖိုင်ကွဲမပေဝ)</span>
                </div>
                <div class="sg-upload-area">
                  <div
                    v-for="(img, idx) in suggestImages" :key="idx"
                    class="sg-upload-thumb"
                  >
                    <img :src="img.url" class="sg-thumb-img" />
                    <button class="sg-thumb-remove" @click="suggestImages.splice(idx,1)">✕</button>
                  </div>
                  <label class="sg-upload-add" v-if="suggestImages.length < 5">
                    <svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                    <input type="file" accept="image/*,video/*" multiple style="display:none" @change="onSuggestImg" />
                  </label>
                </div>
                <div class="sg-upload-note">ပုံများနှင့် ဗိဒ်ယိုများ အပ်လုပ်တင်ခြင်းကို ပံ့ပိုးပေးသည်။ ပုံရွယ်အားသည် 10MB ထက်မပိုရမည်ဖြစ်ပြီး ဗိဒ်ယိုရွယ်အားများမှာ 20MB ထက်မပိုရပါ။</div>
              </div>

              <!-- Terms -->
              <div class="sg-terms">သင်ကိုပေးကောင်းကဲ့အတွေ့ကို ပေးရမည်ဆိုသောအချက်ကို ရင်ဆိုင်နှင့် လုပ်ဆောင်ချက်ကို အကောင်ဆုံးကိုရှာ ကောင်းသောဝန်ဆောင်မှုနှုန်းကို ဆုကြဲကြပြုလုပ်သွားမည်ဖြစ်သည်။ လက်ကျင်ဆဲသားများ သတ်မှတ်ထားသော လမ်းညွှန်ချက်ကို လိုက်နာရမည်ဖြစ်ပြီး ဆုကို အကြမ်းဖျင်းပြင်ဆင်ခိုင်ကို ဝင်ရောက်မပေမည်ဖြစ်မည်ဆိုသည်ကို ဝမ်းမနည်းနဲ့ ဆင်ဆင်ကြည်ပြင်ဆင်မပေမည်ဖြစ်မည်။</div>

              <!-- Submit -->
              <button
                class="sg-submit-btn"
                :disabled="!suggestCat || !suggestContent.trim() || suggestSubmitting"
                @click="submitSuggestion"
              >{{ suggestSubmitting ? 'တင်ပြနေ...' : 'အကြံပြုချက် တင်ပြပါ' }}</button>
              <div style="height:env(safe-area-inset-bottom,12px);min-height:12px;"></div>

            </div><!-- end create form -->

            <!-- MY SUGGESTIONS -->
            <div v-else class="cs-empty">
              <svg width="44" height="44" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.28);">မှတ်တမ်းမရှိသေးပါ</p>
            </div>
          </div>

          <!-- ── OTHER TABS ── -->
          <div v-else class="cs-empty">
            <svg width="44" height="44" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.28);">မှတ်တမ်းမရှိသေးပါ</p>
          </div>

        </div><!-- end cs-body -->
      </div>
    </Transition>

    <!-- ══════════════════════════════════════════════
         RECORDS PANEL — Slide from right
         ══════════════════════════════════════════════ -->
    <Transition name="pg">
      <div v-if="showRecords" class="fullpage" style="background:#07091b;">

        <!-- Header: back + scrollable tabs -->
        <div style="background:linear-gradient(135deg,#2a3299,#3848d4);border-bottom:1px solid rgba(255,255,255,0.1);">
          <div style="display:flex;align-items:center;gap:0;">
            <button @click="showRecords=false" class="icon-btn" style="padding:12px 12px;">
              <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div class="rec-tabs-scroll">
              <button v-for="t in recordsTabs" :key="t.id"
                @click="recordsTab=t.id; fetchRecords()"
                :class="['rec-tab', recordsTab===t.id?'rec-tab--active':'']">
                {{ t.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- ══ ACCOUNT TAB content ══ -->
        <template v-if="recordsTab === 'account'">
          <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;" @click="showTypeDrop=false;showStatusDrop=false;">
            <div class="rec-bal-card">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div>
                  <div style="font-size:9.5px;color:rgba(255,255,255,0.45);margin-bottom:2px;">လက်ကျန်လက်ကျန်ကျန်ငွေ</div>
                  <div style="display:flex;align-items:center;gap:7px;">
                    <span style="font-size:22px;font-weight:900;color:#f5c842;">{{ formatBalance(mainBalance) }}</span>
                    <button @click.stop="fetchWallet" class="rec-ref-btn" :class="{refreshing}">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="ref-svg"><path d="M12 5C8.13 5 5 8.13 5 12s3.13 7 7 7c2.76 0 5.16-1.59 6.34-3.93"/><path d="M17 7.5l1.5 3.5-3.5 0.5"/></svg>
                    </button>
                  </div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:9px;color:rgba(255,255,255,0.35);">ငွေသွင်းပြီးမှ</div>
                  <div style="font-size:10px;color:#f5c842;font-weight:700;cursor:pointer;" @click.stop="$router.push('/home')">ဆုဲစဲ → သောဘူကျိုပ ရယူပါ &rsaquo;</div>
                </div>
              </div>
              <div class="rec-note-box">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style="flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/><path d="M12 8v4M12 16h.01" stroke="rgba(255,255,255,0.5)" stroke-width="1.8" stroke-linecap="round"/></svg>
                <span>ဝင်ငွေထွက်ငွေ စစ်ဆေးရန် ဒိုနေ့ ရဲ့ မှတ်တမ်း filter ကိုသုံးပါ။ ငွေသွင်းမှု၊ ငွေထုတ်မှု အားလုံး ဤနေရာမှာ ကြည့်ရပါမည်။</span>
              </div>
            </div>
            <div class="rec-filters" @click.stop style="position:relative;z-index:100;flex-shrink:0;">
              <div class="rec-date-tabs">
                <button :class="['rec-date-btn', recDateFilter==='today'?'active':'']" @click="recDateFilter='today';fetchRecords()">ဒိုနေ့</button>
                <button :class="['rec-date-btn', recDateFilter==='yesterday'?'active':'']" @click="recDateFilter='yesterday';fetchRecords()">မနေ့က</button>
              </div>
              <div class="rec-drop-wrap">
                <button class="rec-drop-btn" @click.stop="calcDropPos($event.currentTarget,'recType');showTypeDrop=!showTypeDrop;showStatusDrop=false">
                  <span>{{ recTypeLabel }}</span>
                  <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :style="showTypeDrop?'transform:rotate(180deg);transition:0.2s':'transition:0.2s'"><path stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <Transition name="drop">
                  <div v-if="showTypeDrop" class="rec-drop-list" :style="{position:'fixed',top:(dropPos.recType?dropPos.recType.top:0)+'px',left:(dropPos.recType?dropPos.recType.left:0)+'px',zIndex:9999}" @click.stop>
                    <button v-for="opt in typeOptions" :key="opt.value" :class="['rec-drop-item', recTypeFilter===opt.value?'active':'']" @click="recTypeFilter=opt.value;showTypeDrop=false;fetchRecords()">{{ opt.label }}</button>
                  </div>
                </Transition>
              </div>
              <div class="rec-drop-wrap">
                <button class="rec-drop-btn" @click.stop="calcDropPos($event.currentTarget,'recStatus');showStatusDrop=!showStatusDrop;showTypeDrop=false">
                  <span>{{ recStatusLabel }}</span>
                  <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :style="showStatusDrop?'transform:rotate(180deg);transition:0.2s':'transition:0.2s'"><path stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <Transition name="drop">
                  <div v-if="showStatusDrop" class="rec-drop-list" :style="{position:'fixed',top:(dropPos.recStatus?dropPos.recStatus.top:0)+'px',left:(dropPos.recStatus?dropPos.recStatus.left:0)+'px',zIndex:9999}" @click.stop>
                    <button v-for="opt in statusOptions" :key="opt.value" :class="['rec-drop-item', recStatusFilter===opt.value?'active':'']" @click="recStatusFilter=opt.value;showStatusDrop=false;fetchRecords()">
                      {{ opt.label }}
                      <svg v-if="recStatusFilter===opt.value" width="13" height="13" fill="#f5c842" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
            <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;">
            <div v-if="recLoading" style="display:flex;justify-content:center;padding:40px 0;"><div class="rec-spinner"></div></div>
            <div v-else-if="recTransactions.length===0" class="rec-empty">
              <svg width="64" height="64" viewBox="0 0 80 80" fill="none" style="opacity:0.22;"><rect x="10" y="30" width="60" height="42" rx="6" stroke="rgba(255,255,255,0.8)" stroke-width="3"/><path d="M10 46h60" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><path d="M27 30c0-7.18 5.82-13 13-13s13 5.82 13 13" stroke="rgba(255,255,255,0.6)" stroke-width="3" stroke-linecap="round"/></svg>
              <div style="color:rgba(255,255,255,0.28);font-size:12px;margin-top:10px;">ဒိုနေ့ မှတ်တမ်းမရှိပါ</div>
              <div style="color:#f5c842;font-size:10px;margin-top:3px;font-weight:600;">ပိုင်ကြည်</div>
            </div>
            <div v-else style="padding:0 10px 10px;">
              <div v-for="tx in recTransactions" :key="tx.id" class="rec-tx-item">
                <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">
                  <div :class="['rec-tx-dot', tx.type==='deposit'?'dot-green':'dot-red']"></div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.9);">{{ tx.type==='deposit'?'ငွေသွင်း':'ငွေထုတ်' }}</div>
                    <div style="font-size:9px;color:rgba(255,255,255,0.35);margin-top:1px;">{{ formatTxDate(tx.created_at) }}</div>
                  </div>
                </div>
                <div style="text-align:right;flex-shrink:0;">
                  <div :style="tx.type==='deposit'?'color:#4ade80;':'color:#f87171;'" style="font-size:13px;font-weight:800;">{{ tx.type==='deposit'?'+':'-' }}{{ formatCurrency(tx.amount) }}</div>
                  <div :class="['rec-status-badge', tx.status==='confirmed'?'badge-ok':tx.status==='pending'?'badge-pending':'badge-fail']">{{ tx.status==='confirmed'?'အတည်ပြု':tx.status==='pending'?'စောင့်':'ပယ်ဖျက်' }}</div>
                </div>
              </div>
            </div>
            <div style="height:16px;"></div>
            </div><!-- /inner scroll -->
          </div>
          <div class="rec-bottom-bar">
            <div style="text-align:center;">
              <div style="font-size:9px;color:rgba(255,255,255,0.4);">အဘိုးဘျပ်သော ငွေ</div>
              <div style="font-size:13px;font-weight:800;color:#4ade80;">+{{ formatCurrency(recTotalIn) }}</div>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.08);height:28px;"></div>
            <div style="text-align:center;">
              <div style="font-size:9px;color:rgba(255,255,255,0.4);">ဆုံးရှုံးမှု</div>
              <div style="font-size:13px;font-weight:800;color:#f87171;">-{{ formatCurrency(recTotalOut) }}</div>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.08);height:28px;"></div>
            <div style="text-align:center;">
              <div style="font-size:9px;color:rgba(255,255,255,0.4);">ဆုပ်ပေါ်ဖြစ်</div>
              <div :style="(recTotalIn-recTotalOut)>=0?'color:#4ade80':'color:#f87171'" style="font-size:13px;font-weight:800;">{{ (recTotalIn-recTotalOut)>=0?'+':'' }}{{ formatCurrency(recTotalIn-recTotalOut) }}</div>
            </div>
          </div>
        </template>

        <!-- ══ REPORT TAB content ══ -->
        <template v-else-if="recordsTab === 'report'">
          <div class="rpt-page" @click="showRptDatePicker=false">

            <!-- Stats summary grid -->
            <div class="rpt-stats-grid">
              <div class="rpt-stat-cell">
                <div class="rpt-stat-label">စုစုပေါင်း W/L</div>
                <div class="rpt-stat-value rpt-val-red">{{ formatCurrency(0) }}</div>
              </div>
              <div class="rpt-stat-cell rpt-cell-right">
                <div class="rpt-stat-label">စုသောင်းဇဲပမာ</div>
                <div class="rpt-stat-value">{{ formatCurrency(0) }}</div>
              </div>
              <div class="rpt-stat-cell">
                <div class="rpt-stat-label">စုစုပေါင်း တရားဝင် လောင်းကြေး</div>
                <div class="rpt-stat-value">{{ formatCurrency(0) }}</div>
              </div>
              <div class="rpt-stat-cell rpt-cell-right">
                <div class="rpt-stat-label">စုစုပေါင်းအမိနူပမာ</div>
                <div class="rpt-stat-value">0</div>
              </div>
            </div>

            <!-- Filter row + sort label -->
            <div class="rpt-filter-row" @click.stop>
              <div class="rpt-drop-wrap">
                <button class="rpt-date-btn" :class="showRptDatePicker?'rpt-date-btn--open':''" @click.stop="calcDropPos($event.currentTarget,'rptDate');showRptDatePicker=!showRptDatePicker">
                  <span>{{ rptDateLabel }}</span>
                  <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :style="showRptDatePicker?'transform:rotate(180deg);':''" style="transition:transform 0.2s;flex-shrink:0;"><path stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
                </button>

                <!-- Drum Date Picker -->
                <Transition name="bet-drop">
                  <div v-if="showRptDatePicker" class="rpt-datepicker" :style="{position:'fixed',top:(dropPos.rptDate?dropPos.rptDate.top:0)+'px',left:(dropPos.rptDate?dropPos.rptDate.left:0)+'px',zIndex:9999}" @click.stop>
                    <div class="bdp-tabs">
                      <button :class="['bdp-tab', rptQuickDate==='today'?'bdp-tab--active':'']" @click="rptQuickDate='today'">ဒီနေ့</button>
                      <button :class="['bdp-tab', rptQuickDate==='yesterday'?'bdp-tab--active':'']" @click="rptQuickDate='yesterday'">မနေကာ</button>
                    </div>
                    <div class="bdp-custom-label">စီတင်ကြိုက်လပ်ပါ</div>
                    <div class="bdp-drums-row">
                      <div class="bdp-date-group">
                        <div class="bdp-col-label">စတင်ရက်</div>
                        <div class="bdp-drums">
                          <div class="bdp-col"><div class="bdp-track" @scroll.passive="e=>onBetDrumScroll(e,betYears,v=>rptStartYear=v)"><div class="bdp-spacer"></div><div v-for="y in betYears" :key="y" class="bdp-item" :class="rptStartYear===y?'bdp-item--sel':''">{{y}}</div><div class="bdp-spacer"></div></div></div>
                          <div class="bdp-col"><div class="bdp-track" @scroll.passive="e=>onBetDrumScroll(e,betMonths,v=>rptStartMonth=v)"><div class="bdp-spacer"></div><div v-for="m in betMonths" :key="m" class="bdp-item" :class="rptStartMonth===m?'bdp-item--sel':''">{{bdpPad(m)}}</div><div class="bdp-spacer"></div></div></div>
                          <div class="bdp-col"><div class="bdp-track" @scroll.passive="e=>onBetDrumScroll(e,betDays,v=>rptStartDay=v)"><div class="bdp-spacer"></div><div v-for="d in betDays" :key="d" class="bdp-item" :class="rptStartDay===d?'bdp-item--sel':''">{{bdpPad(d)}}</div><div class="bdp-spacer"></div></div></div>
                        </div>
                      </div>
                      <div class="bdp-divider"></div>
                      <div class="bdp-date-group">
                        <div class="bdp-col-label">ပြီးဆုံးရက်</div>
                        <div class="bdp-drums">
                          <div class="bdp-col"><div class="bdp-track" @scroll.passive="e=>onBetDrumScroll(e,betYears,v=>rptEndYear=v)"><div class="bdp-spacer"></div><div v-for="y in betYears" :key="y" class="bdp-item" :class="rptEndYear===y?'bdp-item--sel':''">{{y}}</div><div class="bdp-spacer"></div></div></div>
                          <div class="bdp-col"><div class="bdp-track" @scroll.passive="e=>onBetDrumScroll(e,betMonths,v=>rptEndMonth=v)"><div class="bdp-spacer"></div><div v-for="m in betMonths" :key="m" class="bdp-item" :class="rptEndMonth===m?'bdp-item--sel':''">{{bdpPad(m)}}</div><div class="bdp-spacer"></div></div></div>
                          <div class="bdp-col"><div class="bdp-track" @scroll.passive="e=>onBetDrumScroll(e,betDays,v=>rptEndDay=v)"><div class="bdp-spacer"></div><div v-for="d in betDays" :key="d" class="bdp-item" :class="rptEndDay===d?'bdp-item--sel':''">{{bdpPad(d)}}</div><div class="bdp-spacer"></div></div></div>
                        </div>
                      </div>
                    </div>
                    <div class="bdp-actions">
                      <button class="bdp-cancel-btn" @click="showRptDatePicker=false">မလပ်တော?</button>
                      <button class="bdp-confirm-btn" @click="applyRptDate">အတည်ပြ</button>
                    </div>
                  </div>
                </Transition>
              </div>

              <div class="rpt-sort-label">
                <span>အနိုင် နှင့် ရှုံး</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2.2" stroke-linecap="round"><path d="M8 6l4-4 4 4M16 18l-4 4-4-4"/></svg>
                <span>မ အတင်</span>
              </div>
            </div>

            <!-- Scroll area -->
            <div class="bet-scroll-area">
              <div class="rec-empty" style="padding-top:70px;">
                <svg width="90" height="90" viewBox="0 0 120 120" fill="none" style="opacity:0.3;">
                  <rect x="15" y="58" width="90" height="54" rx="9" fill="rgba(80,90,200,0.5)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
                  <path d="M15 58l45-28 45 28" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linejoin="round"/>
                  <rect x="15" y="30" width="90" height="54" rx="9" fill="rgba(60,70,180,0.5)" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>
                  <path d="M15 30l45-24 45 24" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M75 18 Q90 10 85 26 Q95 20 88 34" stroke="rgba(245,200,66,0.7)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                  <polygon points="88,34 82,28 94,28" fill="rgba(245,200,66,0.7)" transform="rotate(30 88 34)"/>
                </svg>
                <div style="color:rgba(255,255,255,0.28);font-size:13px;margin-top:12px;">ဒီနေ့ မှတ်တမ်းမရှိပါ</div>
                <div style="color:#f5c842;font-size:11px;margin-top:4px;font-weight:700;cursor:pointer;" @click="$router.push('/home')">ပိုကြာ &rsaquo;</div>
              </div>
            </div>

          </div>
        </template>

        <!-- ══ BALANCE TAB content ══ -->
        <template v-else-if="recordsTab === 'balance'">
          <div class="bal-page">

            <!-- Top balance card -->
            <div class="bal-top-card">
              <div class="bal-top-row">
                <div>
                  <div class="bal-top-label">လက်ဆိုင်လက်ကျန်ငွေ</div>
                  <div class="bal-top-amount-row">
                    <span class="bal-top-amount">{{ formatBalance(mainBalance) }}</span>
                    <button @click="fetchWallet" :class="['refresh-toggle', refreshing?'refresh-toggle--spin':'']" style="margin-left:4px;">
                      <svg class="refresh-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                    </button>
                  </div>
                </div>
                <button class="bal-yellow-btn" @click="showComingSoon">ရိုနင်ကိုတွေ ရနော?</button>
              </div>
              <div class="bal-info-text">
                လက်ကျန်စီ ကိုနံပြည်သူ-ပြန်ပြောင်းနိုင်သည်မှာများကို ထုတ်ယူနိုင်သည် (ဆုံးရှုံးသည်မှာ ဒသပ်ဒသမ မပါဝင်)။ လက်ကျန်ငွေကို သင်ကိုယ်တိုင် မည်ဝင်ဆောင်ငွေ သင်ကောင်မြဲနိုင်သော ဘဏ်ကစားပါ။
                <span class="bal-info-link" @click="$router.push('/home')">မည်ဝင်ဆောင်ငွေ &rsaquo;</span>
              </div>
            </div>

            <!-- Split layout: sidebar + cards -->
            <div class="bal-split">

              <!-- Left category sidebar -->
              <div class="bal-sidebar">
                <button v-for="cat in balCategories" :key="cat.id"
                  :class="['bal-cat-btn', balCat===cat.id?'bal-cat-btn--active':'']"
                  @click="balCat=cat.id">
                  <span class="bal-cat-icon" v-html="cat.icon"></span>
                  <span class="bal-cat-label">{{ cat.label }}</span>
                </button>
              </div>

              <!-- Right: search + cards -->
              <div class="bal-right">
                <div class="bal-search-wrap">
                  <input v-model="balSearch" class="bal-search-input" :placeholder="'ပလမ်ဖောင်း ရှာဖွေမှ'" />
                  <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2" viewBox="0 0 24 24" class="bal-search-icon"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" stroke-linecap="round"/></svg>
                </div>
                <div class="bal-cards-grid">
                  <div v-for="p in filteredProviders" :key="p.id" class="bal-provider-card">
                    <div class="bal-card-top">
                      <div class="bal-card-logo" :style="'background:'+p.bg">
                        <img :src="p.img" :alt="p.abbr"
                          style="width:100%;height:100%;object-fit:contain;border-radius:6px;"
                          @error="e=>{e.target.style.display='none';e.target.nextElementSibling.style.display='flex'}" />
                        <span class="bal-card-abbr" :style="'color:'+p.ac" style="display:none">{{ p.abbr }}</span>
                      </div>
                      <span class="bal-card-name">{{ p.name }}</span>
                    </div>
                    <div class="bal-card-balance">0.00</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </template>

        <!-- ══ BET TAB content ══ -->
        <template v-else>
          <div class="bet-page" @click="closeBetDrops">

            <!-- 4-filter bar -->
            <div class="bet-filter-bar" @click.stop>

              <!-- Filter 1: Date -->
              <div class="bet-drop-wrap">
                <button class="bet-filter-btn" :class="showBetDatePicker?'bet-filter-btn--open':''" @click.stop="calcDropPos($event.currentTarget,'betDate');showBetDatePicker=!showBetDatePicker;showBetStatusDrop=false;showBetTypeDrop=false;showBetPlatformDrop=false">
                  <span>{{ betDateLabel }}</span>
                  <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :style="showBetDatePicker?'transform:rotate(180deg);':''" style="transition:transform 0.2s;flex-shrink:0;"><path stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
                </button>

                <!-- Drum Date Picker dropdown -->
                <Transition name="bet-drop">
                  <div v-if="showBetDatePicker" class="bet-datepicker" :style="{position:'fixed',top:(dropPos.betDate?dropPos.betDate.top:0)+'px',left:(dropPos.betDate?dropPos.betDate.left:0)+'px',zIndex:9999}" @click.stop>
                    <div class="bdp-tabs">
                      <button :class="['bdp-tab', betQuickDate==='today'?'bdp-tab--active':'']" @click="betQuickDate='today'">ဒီနေ့</button>
                      <button :class="['bdp-tab', betQuickDate==='yesterday'?'bdp-tab--active':'']" @click="betQuickDate='yesterday'">မနေ</button>
                    </div>
                    <div class="bdp-custom-label">စီတကြြဲက်လုပ်ပါ</div>
                    <div class="bdp-drums-row">
                      <div class="bdp-date-group">
                        <div class="bdp-col-label">စတင်ရက်</div>
                        <div class="bdp-drums">
                          <div class="bdp-col"><div class="bdp-track" :ref="el=>betDrumEls.sY=el" @scroll.passive="e=>onBetDrumScroll(e,betYears,v=>betStartYear=v)"><div class="bdp-spacer"></div><div v-for="y in betYears" :key="y" class="bdp-item" :class="betStartYear===y?'bdp-item--sel':''">{{y}}</div><div class="bdp-spacer"></div></div></div>
                          <div class="bdp-col"><div class="bdp-track" :ref="el=>betDrumEls.sM=el" @scroll.passive="e=>onBetDrumScroll(e,betMonths,v=>betStartMonth=v)"><div class="bdp-spacer"></div><div v-for="m in betMonths" :key="m" class="bdp-item" :class="betStartMonth===m?'bdp-item--sel':''">{{bdpPad(m)}}</div><div class="bdp-spacer"></div></div></div>
                          <div class="bdp-col"><div class="bdp-track" :ref="el=>betDrumEls.sD=el" @scroll.passive="e=>onBetDrumScroll(e,betDays,v=>betStartDay=v)"><div class="bdp-spacer"></div><div v-for="d in betDays" :key="d" class="bdp-item" :class="betStartDay===d?'bdp-item--sel':''">{{bdpPad(d)}}</div><div class="bdp-spacer"></div></div></div>
                        </div>
                      </div>
                      <div class="bdp-divider"></div>
                      <div class="bdp-date-group">
                        <div class="bdp-col-label">ပြီးဆုံးရက်</div>
                        <div class="bdp-drums">
                          <div class="bdp-col"><div class="bdp-track" :ref="el=>betDrumEls.eY=el" @scroll.passive="e=>onBetDrumScroll(e,betYears,v=>betEndYear=v)"><div class="bdp-spacer"></div><div v-for="y in betYears" :key="y" class="bdp-item" :class="betEndYear===y?'bdp-item--sel':''">{{y}}</div><div class="bdp-spacer"></div></div></div>
                          <div class="bdp-col"><div class="bdp-track" :ref="el=>betDrumEls.eM=el" @scroll.passive="e=>onBetDrumScroll(e,betMonths,v=>betEndMonth=v)"><div class="bdp-spacer"></div><div v-for="m in betMonths" :key="m" class="bdp-item" :class="betEndMonth===m?'bdp-item--sel':''">{{bdpPad(m)}}</div><div class="bdp-spacer"></div></div></div>
                          <div class="bdp-col"><div class="bdp-track" :ref="el=>betDrumEls.eD=el" @scroll.passive="e=>onBetDrumScroll(e,betDays,v=>betEndDay=v)"><div class="bdp-spacer"></div><div v-for="d in betDays" :key="d" class="bdp-item" :class="betEndDay===d?'bdp-item--sel':''">{{bdpPad(d)}}</div><div class="bdp-spacer"></div></div></div>
                        </div>
                      </div>
                    </div>
                    <div class="bdp-actions">
                      <button class="bdp-cancel-btn" @click="showBetDatePicker=false">မလုပ်တော့</button>
                      <button class="bdp-confirm-btn" @click="applyBetDate">အတည်ပြု</button>
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- Filter 2: Status (ဖောပြချက်) -->
              <div class="bet-drop-wrap">
                <button class="bet-filter-btn" :class="showBetStatusDrop?'bet-filter-btn--open':''" @click.stop="calcDropPos($event.currentTarget,'betStatus');showBetStatusDrop=!showBetStatusDrop;showBetDatePicker=false;showBetTypeDrop=false;showBetPlatformDrop=false">
                  <span>{{ betStatusLabel }}</span>
                  <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :style="showBetStatusDrop?'transform:rotate(180deg);':''" style="transition:transform 0.2s;flex-shrink:0;"><path stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <Transition name="bet-drop">
                  <div v-if="showBetStatusDrop" class="bet-drop-list" :style="{position:'fixed',top:(dropPos.betStatus?dropPos.betStatus.top:0)+'px',left:(dropPos.betStatus?dropPos.betStatus.left:0)+'px',zIndex:9999}" @click.stop>
                    <button v-for="opt in betStatusOptions" :key="opt.value"
                      :class="['bet-drop-item', betStatusFilter===opt.value?'bet-drop-item--active':'']"
                      @click="betStatusFilter=opt.value;showBetStatusDrop=false">
                      {{ opt.label }}
                      <svg v-if="betStatusFilter===opt.value" width="13" height="13" fill="#f5c842" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </button>
                  </div>
                </Transition>
              </div>

              <!-- Filter 3: Game Type (အမျိုးအစား) -->
              <div class="bet-drop-wrap">
                <button class="bet-filter-btn" :class="showBetTypeDrop?'bet-filter-btn--open':''" @click.stop="calcDropPos($event.currentTarget,'betType');showBetTypeDrop=!showBetTypeDrop;showBetDatePicker=false;showBetStatusDrop=false;showBetPlatformDrop=false">
                  <span>{{ betTypeLabel }}</span>
                  <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :style="showBetTypeDrop?'transform:rotate(180deg);':''" style="transition:transform 0.2s;flex-shrink:0;"><path stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <Transition name="bet-drop">
                  <div v-if="showBetTypeDrop" class="bet-drop-list" :style="{position:'fixed',top:(dropPos.betType?dropPos.betType.top:0)+'px',left:(dropPos.betType?dropPos.betType.left:0)+'px',zIndex:9999}" @click.stop>
                    <button v-for="opt in betTypeOptions" :key="opt.value"
                      :class="['bet-drop-item', betTypeFilter===opt.value?'bet-drop-item--active':'']"
                      @click="betTypeFilter=opt.value;showBetTypeDrop=false">
                      {{ opt.label }}
                      <svg v-if="betTypeFilter===opt.value" width="13" height="13" fill="#f5c842" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </button>
                  </div>
                </Transition>
              </div>

              <!-- Filter 4: Platform -->
              <div class="bet-drop-wrap">
                <button class="bet-filter-btn" :class="showBetPlatformDrop?'bet-filter-btn--open':''" @click.stop="calcDropPos($event.currentTarget,'betPlatform');showBetPlatformDrop=!showBetPlatformDrop;showBetDatePicker=false;showBetStatusDrop=false;showBetTypeDrop=false">
                  <span>{{ betPlatformLabel }}</span>
                  <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :style="showBetPlatformDrop?'transform:rotate(180deg);':''" style="transition:transform 0.2s;flex-shrink:0;"><path stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <Transition name="bet-drop">
                  <div v-if="showBetPlatformDrop" class="bet-drop-list" :style="{position:'fixed',top:(dropPos.betPlatform?dropPos.betPlatform.top:0)+'px',left:(dropPos.betPlatform?dropPos.betPlatform.left:0)+'px',zIndex:9999}" @click.stop>
                    <button v-for="opt in betPlatformOptions" :key="opt.value"
                      :class="['bet-drop-item', betPlatformFilter===opt.value?'bet-drop-item--active':'']"
                      @click="betPlatformFilter=opt.value;showBetPlatformDrop=false">
                      {{ opt.label }}
                      <svg v-if="betPlatformFilter===opt.value" width="13" height="13" fill="#f5c842" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </button>
                  </div>
                </Transition>
              </div>

            </div><!-- end bet-filter-bar -->

            <!-- Scrollable records area -->
            <div class="bet-scroll-area">
              <div v-if="betLoading" style="display:flex;justify-content:center;padding:60px 0;"><div class="rec-spinner"></div></div>
              <div v-else class="rec-empty" style="padding-top:80px;">
                <svg width="72" height="72" viewBox="0 0 90 90" fill="none" style="opacity:0.25;">
                  <rect x="8" y="28" width="64" height="50" rx="7" stroke="rgba(255,255,255,0.8)" stroke-width="2.5"/>
                  <path d="M8 44h64" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
                  <path d="M30 28c0-8.28 6.72-15 15-15s15 6.72 15 15" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
                  <path d="M55 12l8 6-4 3" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="60" y1="18" x2="52" y2="30" stroke="rgba(200,200,255,0.6)" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <div style="color:rgba(255,255,255,0.28);font-size:13px;margin-top:12px;">ဒီနေ့ မှတ်တမ်းမရှိပါ</div>
                <div style="color:#f5c842;font-size:11px;margin-top:4px;font-weight:700;cursor:pointer;" @click="$router.push('/home')">ပိုကြည် &rsaquo;</div>
              </div>
            </div>

            <!-- Bet bottom bar -->
            <div class="rec-bottom-bar">
              <div style="text-align:center;">
                <div style="font-size:9px;color:rgba(255,255,255,0.4);">လောင်းကြေး</div>
                <div style="font-size:13px;font-weight:800;color:rgba(255,255,255,0.75);">0</div>
              </div>
              <div style="width:1px;background:rgba(255,255,255,0.08);height:28px;"></div>
              <div style="text-align:center;">
                <div style="font-size:9px;color:rgba(255,255,255,0.4);">နိုင်ငွေ</div>
                <div style="font-size:13px;font-weight:800;color:#4ade80;">0</div>
              </div>
              <div style="width:1px;background:rgba(255,255,255,0.08);height:28px;"></div>
              <div style="text-align:center;">
                <div style="font-size:9px;color:rgba(255,255,255,0.4);">အမြတ်/အရှုံး</div>
                <div style="font-size:13px;font-weight:800;color:rgba(255,255,255,0.75);">0</div>
              </div>
            </div>
          </div>
        </template>

      </div>
    </Transition>

    <!-- Avatar picker -->
    <Transition name="pg">
      <div v-if="showPicker" class="fullpage" style="background:#07091b;">
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

  <!-- ── Toast ── -->
  <Transition name="toast">
    <div v-if="toastVisible" class="app-toast">{{ toastMsg }}</div>
  </Transition>

  <!-- Withdraw Modal — opened via ငွေထုတ်စီမံခန့်ခွဲမှု button, lands on tab 1 -->
  <WithdrawModal v-model="showWithdrawModal" :balance="mainBalance" :initial-tab="1" @submit="() => {}" />

</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'
import WithdrawModal from '@/components/WithdrawModal.vue'

const isLoggedIn   = ref(false)
const username     = ref(localStorage.getItem('sb_username') || 'PLAYER')
const gameId       = ref('')
const mainBalance  = ref(0)
const deposited    = ref(0)
const refreshing   = ref(false)

const showProfile = ref(false)
const showCs      = ref(false)
const csTab       = ref('service')
const suggestSubTab    = ref('create')
const suggestCat       = ref('')
const suggestContent   = ref('')
const suggestImages    = ref([])
const suggestSubmitting = ref(false)
const showPicker  = ref(false)
const dropOpen    = ref(false)

// ── Profile social data ──
const userPhone       = ref('')
const whatsappId      = ref('')
const facebookId      = ref('')
const telegramId      = ref('')
const birthYear       = ref('')
const birthMonth      = ref('')
const birthDay        = ref('')
const showBirthPicker = ref(false)
const profileSaving   = ref(false)

const birthYears = Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - 17 - i)

const maskedPhone = computed(() => {
  if (!userPhone.value) return '+95 **---'
  const p = String(userPhone.value).replace(/\D/g, '')
  if (p.length < 4) return userPhone.value
  return '+95 **' + p.slice(-3)
})

const birthDisplay = computed(() => {
  if (!birthYear.value || !birthMonth.value || !birthDay.value) return ''
  return `${birthYear.value}/${String(birthMonth.value).padStart(2,'0')}/${String(birthDay.value).padStart(2,'0')}`
})
const activeTab   = ref(0)
const tabs = ['♂ မိတာ', '♀ ပေ']

// ── Records panel ──
const showRecords    = ref(false)
const recordsTab     = ref('account')
const recTransactions = ref([])
const recLoading     = ref(false)
const recDateFilter  = ref('today')
const recTypeFilter  = ref('all')
const recStatusFilter = ref('all')
const showTypeDrop   = ref(false)
const showStatusDrop = ref(false)

// ── Fixed dropdown positioning (position:fixed to escape overflow:hidden) ──
const dropPos = reactive({})
function calcDropPos(el, key) {
  if (el && typeof el.getBoundingClientRect === 'function') {
    const r = el.getBoundingClientRect()
    dropPos[key] = { top: r.bottom + 4, left: r.left }
  }
}

const recordsTabs = [
  { id: 'account', label: 'အကောင့်အသေးစိတ်' },
  { id: 'bet',     label: 'လောင်းကစားမှတ်တမ်း' },
  { id: 'report',  label: 'ကိုယ်ရေးကိုယ်တာထုတ်ပြန်ချက်' },
  { id: 'balance', label: 'လက်ကျန်' },
]

// ── Bet Tab state ──
const betLoading        = ref(false)
const showBetDatePicker = ref(false)
const showBetStatusDrop = ref(false)
const showBetTypeDrop   = ref(false)
const showBetPlatformDrop = ref(false)
const betQuickDate      = ref('today')
const betStatusFilter   = ref('all')
const betTypeFilter     = ref('all')
const betPlatformFilter = ref('all')

const betNow = new Date()
const betStartYear  = ref(betNow.getFullYear())
const betStartMonth = ref(betNow.getMonth() + 1)
const betStartDay   = ref(betNow.getDate())
const betEndYear    = ref(betNow.getFullYear())
const betEndMonth   = ref(betNow.getMonth() + 1)
const betEndDay     = ref(betNow.getDate())
const betYears  = Array.from({ length: 5 }, (_, i) => betNow.getFullYear() - 2 + i)
const betMonths = Array.from({ length: 12 }, (_, i) => i + 1)
const betDays   = Array.from({ length: 31 }, (_, i) => i + 1)
const betDrumEls = {}

const betStatusOptions = [
  { value: 'all',       label: 'ဖောပြချက်အားလုံး' },
  { value: 'confirmed', label: 'အတည်တကျ' },
  { value: 'cancelled', label: 'အမြဲချသည်' },
  { value: 'void',      label: 'အောင်ဒိုကို ပယ်ဖျက်ခဲ့သည်' },
]
const betTypeOptions = [
  { value: 'all',        label: 'အမျိုးအစားအားလုံး' },
  { value: 'electronic', label: 'အီလက်ထရောနစ်' },
  { value: 'fish',       label: 'ငါးဖမ်း' },
  { value: 'chess',      label: 'စမ်တုရင် နှင့်ကတ်များ' },
  { value: 'live',       label: 'တကယ်လူ' },
  { value: 'blockchain', label: 'Blockchain ဂိမ်းများ' },
]
const betPlatformOptions = [
  { value: 'all',  label: 'ပလမ်ဖောင်အားလုံး' },
  { value: 'pg',   label: 'PG Soft' },
  { value: 'pp',   label: 'Pragmatic Play' },
  { value: 'jdb',  label: 'JDB' },
  { value: 'jili', label: 'JILI' },
]

const betDateLabel     = computed(() => {
  if (betQuickDate.value === 'today')     return 'ဒီနေ့'
  if (betQuickDate.value === 'yesterday') return 'မနေ့က'
  return `${bdpPad(betStartMonth.value)}/${bdpPad(betStartDay.value)} ~ ${bdpPad(betEndMonth.value)}/${bdpPad(betEndDay.value)}`
})
const betStatusLabel   = computed(() => betStatusOptions.find(o => o.value === betStatusFilter.value)?.label || 'ဖောပြချက်အားလုံး')
const betTypeLabel     = computed(() => betTypeOptions.find(o => o.value === betTypeFilter.value)?.label || 'အမျိုးအစားအားလုံး')
const betPlatformLabel = computed(() => betPlatformOptions.find(o => o.value === betPlatformFilter.value)?.label || 'ပလမ်ဖောင်...')

// ── Report Tab state ──
const showRptDatePicker = ref(false)
const rptQuickDate      = ref('today')
const rptStartYear  = ref(betNow.getFullYear())
const rptStartMonth = ref(betNow.getMonth() + 1)
const rptStartDay   = ref(betNow.getDate())
const rptEndYear    = ref(betNow.getFullYear())
const rptEndMonth   = ref(betNow.getMonth() + 1)
const rptEndDay     = ref(betNow.getDate())

const rptDateLabel = computed(() => {
  if (rptQuickDate.value === 'today')     return 'ဒီနေ့'
  if (rptQuickDate.value === 'yesterday') return 'မနေကာ'
  return `${bdpPad(rptStartMonth.value)}/${bdpPad(rptStartDay.value)} ~ ${bdpPad(rptEndMonth.value)}/${bdpPad(rptEndDay.value)}`
})

function applyRptDate() {
  rptQuickDate.value = 'custom'
  showRptDatePicker.value = false
}

function bdpPad(n) { return String(n).padStart(2, '0') }

function onBetDrumScroll(e, list, setter) {
  const itemH = 40
  const idx   = Math.round(e.target.scrollTop / itemH)
  setter(list[Math.max(0, Math.min(idx, list.length - 1))])
}

function applyBetDate() {
  betQuickDate.value = 'custom'
  showBetDatePicker.value = false
}

function closeBetDrops() {
  showBetDatePicker.value  = false
  showBetStatusDrop.value  = false
  showBetTypeDrop.value    = false
  showBetPlatformDrop.value = false
}

const typeOptions = [
  { value: 'all',      label: 'အကောင့်အမျိုးအစားများ ပြောင်းလဲသည်။' },
  { value: 'deposit',  label: 'ရန်ပုံငွေဒေပ ပြောင်းခဲ' },
  { value: 'withdraw', label: 'အဖွဲ့ ဘားရပ်လည်မြင်သည်' },
  { value: 'bonus',    label: 'အဖွဲ့ ငွေထုတ်ခြင်း' },
  { value: 'transfer', label: 'ဘက်ငွေပေးသေချမ်' },
  { value: 'refund',   label: 'ရန်ပုံငွေပြင်ဆင်ခြင်း' },
]

const statusOptions = [
  { value: 'all',       label: 'အမျိုးအစောဆုံးအသေးစိတ်' },
  { value: 'confirmed', label: 'အတည်ပြုပြီး' },
  { value: 'pending',   label: 'ဆောင်ရွက်ဆဲ' },
  { value: 'rejected',  label: 'ပယ်ဖျက်ခဲ' },
]

const recTypeLabel   = computed(() => typeOptions.find(o => o.value === recTypeFilter.value)?.label || 'အကောင့်အမျိုးအစား...')
const recStatusLabel = computed(() => statusOptions.find(o => o.value === recStatusFilter.value)?.label || 'အမျိုးအစော')
const recTotalIn     = computed(() => recTransactions.value.filter(t => t.type==='deposit'||t.type==='bonus').reduce((s,t)=>s+Number(t.amount),0))
const recTotalOut    = computed(() => recTransactions.value.filter(t => t.type==='withdraw').reduce((s,t)=>s+Number(t.amount),0))

async function fetchRecords() {
  recLoading.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { recTransactions.value = []; return }
    let query = supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(100)
    const now = new Date()
    if (recDateFilter.value === 'today') {
      const start = new Date(now); start.setHours(0,0,0,0)
      query = query.gte('created_at', start.toISOString())
    } else if (recDateFilter.value === 'yesterday') {
      const start = new Date(now); start.setDate(start.getDate()-1); start.setHours(0,0,0,0)
      const end = new Date(now); end.setHours(0,0,0,0)
      query = query.gte('created_at', start.toISOString()).lt('created_at', end.toISOString())
    }
    if (recTypeFilter.value !== 'all') query = query.eq('type', recTypeFilter.value)
    if (recStatusFilter.value !== 'all') query = query.eq('status', recStatusFilter.value)
    const { data } = await query
    recTransactions.value = data || []
  } catch { recTransactions.value = [] } finally { recLoading.value = false }
}

function openRecords() {
  showRecords.value = true
  recDateFilter.value = 'today'
  recTypeFilter.value = 'all'
  recStatusFilter.value = 'all'
  recordsTab.value = 'account'
  fetchRecords()
}

function formatTxDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' })
}

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

function openProfile() { dropOpen.value = false; showBirthPicker.value = false; showProfile.value = true; loadProfile() }

async function loadProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    userPhone.value = user.phone || user.user_metadata?.phone || ''
    const { data: prof } = await supabase
      .from('profiles')
      .select('whatsapp_id,facebook_id,telegram_id,birth_year,birth_month,birth_day')
      .eq('user_id', user.id)
      .single()
    if (prof) {
      whatsappId.value  = prof.whatsapp_id  || ''
      facebookId.value  = prof.facebook_id  || ''
      telegramId.value  = prof.telegram_id  || ''
      birthYear.value   = prof.birth_year   || ''
      birthMonth.value  = prof.birth_month  || ''
      birthDay.value    = prof.birth_day    || ''
    }
  } catch {}
}

async function saveProfile() {
  profileSaving.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { showToast('အကောင့်ဝင်ပါ'); profileSaving.value = false; return }
    const { error } = await supabase.from('profiles').upsert({
      user_id:     user.id,
      whatsapp_id: whatsappId.value || null,
      facebook_id: facebookId.value || null,
      telegram_id: telegramId.value || null,
      birth_year:  birthYear.value  || null,
      birth_month: birthMonth.value || null,
      birth_day:   birthDay.value   || null,
    }, { onConflict: 'user_id' })
    if (error) throw error
    showToast('သိမ်းဆည်းပြီးပါပြီ ✓')
    showProfile.value = false
  } catch (e) {
    showToast('မသိမ်းနိုင်ပါ: ' + (e?.message || 'Error'))
  } finally {
    profileSaving.value = false
  }
}
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
// ── Toast ──
const toastMsg     = ref('')
const toastVisible = ref(false)
let toastTimer = null
function showToast(msg) {
  toastMsg.value = msg
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2200)
}
const comingSoon  = () => showToast('လတ်တလောမရနိုင်သေးပါ')

function onSuggestImg(e) {
  const files = Array.from(e.target.files || [])
  files.forEach(f => {
    if (suggestImages.value.length >= 5) return
    const url = URL.createObjectURL(f)
    suggestImages.value.push({ file: f, url })
  })
  e.target.value = ''
}
async function submitSuggestion() {
  if (!suggestCat.value || !suggestContent.value.trim()) return
  suggestSubmitting.value = true
  await new Promise(r => setTimeout(r, 900))
  showToast('အကြံပြုချက် တင်သွင်းပြီးပါပြီ!')
  suggestCat.value = ''; suggestContent.value = ''; suggestImages.value = []
  suggestSubmitting.value = false
}
const showWithdrawModal = ref(false)
const showComingSoon = () => showToast('လတ်တလောမရနိုင်သေးပါ')

// ── Balance Tab state ──
const balCat    = ref('all')
const balSearch = ref('')

const balCategories = [
  { id: 'all',   icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" fill="#f5c842"/><rect x="13" y="3" width="8" height="8" rx="2" fill="#f5c842" opacity=".7"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#f5c842" opacity=".7"/><rect x="13" y="13" width="8" height="8" rx="2" fill="#f5c842" opacity=".5"/></svg>', label: 'အားလုံး' },
  { id: 'slots', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="14" rx="3"/><circle cx="8" cy="13" r="2"/><circle cx="12" cy="13" r="2"/><circle cx="16" cy="13" r="2"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/></svg>', label: 'စလော' },
  { id: 'fish',  icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/><path d="M20 12c1.5 0 2.5-.8 2.5-2" stroke-linecap="round"/></svg>', label: 'ငါးဖမ်း' },
  { id: 'live',  icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>', label: 'Live Casino' },
]

const balProviders = [
  { id: 'pp',   name: 'PP',   cat: ['all','slots','live'], bg: '#c87020', abbr: 'PP',   ac: '#fff', img: 'https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/a04d3bed-f475-42eb-9f35-4f9802068315.png?tr=f-auto' },
  { id: 'pg',   name: 'PG',   cat: ['all','slots'],        bg: '#0a6e3d', abbr: 'PG',   ac: '#fff', img: 'https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/3b38cced-f446-4727-ab37-879557be37cb.png?tr=f-auto' },
  { id: 'jili', name: 'JILI', cat: ['all','slots','fish'], bg: '#b8860b', abbr: 'JILI', ac: '#fff', img: 'https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/40_N_JILI_LOGO.avif' },
  { id: 'jdb',  name: 'JDB',  cat: ['all','fish'],         bg: '#1a3a8f', abbr: 'JDB',  ac: '#fff', img: 'https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/f519ade7-dd80-4235-a650-3d8744d5795c.png?tr=f-auto' },
]

const filteredProviders = computed(() => {
  const q = balSearch.value.trim().toLowerCase()
  return balProviders.filter(p => {
    const catOk = p.cat.includes(balCat.value)
    const qOk   = !q || p.name.toLowerCase().includes(q)
    return catOk && qOk
  })
})
</script>

<style scoped>
/* ═══════════════════════════════
   LAYER 0 — ROOT BACKGROUND
   ═══════════════════════════════ */
.acc-root {
  min-height: 100vh;
  background: #07091b;
  display: flex; flex-direction: column;
  color: rgba(255,255,255,0.95);
  font-family: system-ui, sans-serif;
  padding-bottom: 80px;
}

/* ── Profile Header (on background, no card) ── */
.acc-ph {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px 8px;
}
.av-wrap { position: relative; cursor: pointer; flex-shrink: 0; }
.av-img  {
  width: 52px; height: 52px; border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.22);
  box-shadow: 0 2px 12px rgba(0,0,0,0.35);
}
.av-guest {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 2px solid rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
}
.vip-pill {
  position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
  padding: 0px 5px; border-radius: 4px;
  font-size: 7px; font-weight: 900; line-height: 1.5;
  white-space: nowrap;
}
.av-edit {
  position: absolute; top: 1px; right: 1px;
  width: 14px; height: 14px; border-radius: 50%;
  background: rgba(29,78,216,0.9);
  display: flex; align-items: center; justify-content: center;
}
.ph-info { flex: 1; min-width: 0; }
.ph-urow { display: flex; align-items: center; gap: 5px; margin-bottom: 2px; }
.ph-arrow { font-size: 9px; color: #fbbf24; }
.ph-uname { font-size: 13px; font-weight: 800; color: #fff; }
.ph-idrow { display: flex; align-items: center; gap: 5px; }
.ph-id { font-size: 10px; color: rgba(255,255,255,0.45); font-family: monospace; }
.cp-btn {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 4px; padding: 2px 4px;
  color: rgba(255,255,255,0.45); cursor: pointer;
  display: flex; align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.cp-btn--blue { color: #60a5fa; border-color: rgba(96,165,250,0.25); background: rgba(96,165,250,0.06); }

/* ── Body ── */
.acc-body { padding: 0 10px 16px; flex: 1; display: flex; flex-direction: column; gap: 7px; }

/* ═══════════════════════════════
   LAYER 1 — HEAVY CARDS
   ═══════════════════════════════ */
.l1-card {
  background: rgba(72, 80, 190, 0.65);
  border-radius: 12px;
  padding: 10px;
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
}
.l1-title {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.55);
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}

/* ═══════════════════════════════
   LAYER 2 — YELLOW BALANCE CARD
   ═══════════════════════════════ */
.l2-yellow {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 55%, #fbbf24 100%);
  border-radius: 10px;
  padding: 9px 12px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 6px;
  margin-bottom: 8px;
  box-shadow: 0 3px 10px rgba(217,119,6,0.35);
}
.ybal-left { display: flex; align-items: center; gap: 6px; }
.ybal-amt { font-size: 17px; font-weight: 900; color: #1a1440; letter-spacing: 0.02em; }
.yref-btn {
  background: rgba(0,0,0,0.15); border: none; border-radius: 5px;
  padding: 3px 5px; cursor: pointer; color: rgba(30,20,60,0.75);
  display: flex; align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.yref-btn.refreshing .ref-svg { animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.ybal-btns { display: flex; gap: 6px; }
.ybal-btn {
  padding: 5px 10px; border-radius: 7px;
  background: rgba(0,0,0,0.18);
  border: 1.5px solid rgba(255,255,255,0.35);
  color: #fff; font-size: 9.5px; font-weight: 700;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
  transition: opacity 0.15s;
}
.ybal-btn:active { opacity: 0.75; }

/* Quick icon row (2 items) */
.qi-row { display: flex; gap: 0; }
.qi-item {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  gap: 4px; padding: 6px 4px;
  background: none; border: none; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.qi-icon-wrap {
  width: 30px; height: 30px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.qi-img { width: 26px; height: 26px; object-fit: contain; }
.qi-lbl { font-size: 9px; color: rgba(255,255,255,0.75); line-height: 1.35; text-align: center; font-weight: 500; }

/* ═══════════════════════════════
   LAYER 2 — YELLOW VIP SUB-CARD
   ═══════════════════════════════ */
.l2-vip {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 60%, #fde68a 100%);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 8px;
  position: relative; overflow: hidden;
  box-shadow: 0 3px 10px rgba(217,119,6,0.3);
}
.l2-vip-shimmer {
  position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
  animation: shimmer 3s ease-in-out infinite;
}
@keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
.vip-coin {
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,0,0,0.18);
  border: 1.5px solid rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.vip-bar-track {
  height: 4px; border-radius: 2px;
  background: rgba(0,0,0,0.18);
  overflow: hidden; margin-top: 4px;
}
.vip-bar-fill {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.85));
  transition: width 0.5s;
}

/* Grid 4-cols for icons */
.l1-grid4 {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
.gi-item {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; padding: 6px 3px;
  background: none; border: none; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
}
.gi-icon-wrap {
  width: 28px; height: 28px; border-radius: 8px;
  background: rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
}
.gi-img { width: 22px; height: 22px; object-fit: contain; }
.gi-icon-plain {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
}
.gi-lbl { font-size: 8.5px; color: rgba(255,255,255,0.7); line-height: 1.3; text-align: center; }

/* ── Full-screen overlays ── */
.fullpage { position: fixed; inset: 0; z-index: 300; display: flex; flex-direction: column; overflow: hidden; }
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

/* ══════════════════════════════════════
   RECORDS PANEL STYLES
   ══════════════════════════════════════ */

/* Scrollable tab bar */
.rec-tabs-scroll {
  flex: 1; display: flex; overflow-x: auto; gap: 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.rec-tabs-scroll::-webkit-scrollbar { display: none; }

.rec-tab {
  flex-shrink: 0;
  padding: 10px 13px;
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,0.45);
  background: none; border: none; cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.18s, border-color 0.18s;
}
.rec-tab--active {
  color: #f5c842;
  border-bottom-color: #f5c842;
}

/* Balance card */
.rec-bal-card {
  margin: 10px; padding: 12px 14px;
  background: linear-gradient(135deg, rgba(72,80,190,0.85) 0%, rgba(56,72,212,0.7) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
}

/* Refresh btn inside balance card */
.rec-ref-btn {
  background: rgba(255,255,255,0.08); border: none; border-radius: 5px;
  padding: 3px 5px; cursor: pointer; color: rgba(255,255,255,0.55);
  display: flex; align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.rec-ref-btn.refreshing .ref-svg { animation: spin 0.6s linear infinite; }

/* Info note box */
.rec-note-box {
  display: flex; align-items: flex-start; gap: 6px;
  margin-top: 10px; padding: 8px 10px;
  background: rgba(0,0,0,0.2); border-radius: 7px;
  font-size: 9.5px; color: rgba(255,255,255,0.45); line-height: 1.55;
}

/* Filters row */
.rec-filters {
  display: flex; align-items: center; gap: 6px;
  padding: 0 10px 8px;
  flex-wrap: nowrap; overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.rec-filters::-webkit-scrollbar { display: none; }

/* Date tabs */
.rec-date-tabs { display: flex; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); flex-shrink: 0; }
.rec-date-btn {
  padding: 6px 12px; font-size: 10.5px; font-weight: 600;
  background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.45);
  border: none; cursor: pointer; white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s, color 0.15s;
}
.rec-date-btn.active { background: #f5c842; color: #1a1440; }

/* Dropdown wrapper */
.rec-drop-wrap { position: relative; flex-shrink: 0; }
.rec-drop-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 6px 10px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.65); font-size: 10px; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}
.rec-drop-list {
  position: fixed; z-index: 9999;
  min-width: 180px; background: #1e2060;
  border: 1px solid rgba(255,255,255,0.12); border-radius: 8px;
  overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.5);
}
.rec-drop-item {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 10px 13px; text-align: left;
  background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.7); font-size: 11px; cursor: pointer;
  white-space: nowrap; -webkit-tap-highlight-color: transparent;
  transition: background 0.12s;
}
.rec-drop-item:last-child { border-bottom: none; }
.rec-drop-item:active { background: rgba(255,255,255,0.06); }
.rec-drop-item.active { color: #f5c842; font-weight: 700; }

/* Spinner */
.rec-spinner {
  width: 28px; height: 28px; border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: #f5c842;
  animation: spin 0.7s linear infinite;
}

/* Empty state */
.rec-empty {
  display: flex; flex-direction: column; align-items: center;
  padding: 50px 20px 30px; text-align: center;
}

/* Transaction item */
.rec-tx-item {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 12px;
  background: rgba(255,255,255,0.04);
  border-radius: 10px; margin-bottom: 6px;
  border: 1px solid rgba(255,255,255,0.07);
}
.rec-tx-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot-green { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5); }
.dot-red   { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.5); }

/* Status badge */
.rec-status-badge {
  font-size: 8px; font-weight: 700; padding: 2px 5px; border-radius: 4px;
  margin-top: 2px; display: inline-block;
}
.badge-ok      { background: rgba(74,222,128,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.25); }
.badge-pending { background: rgba(251,191,36,0.15);  color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
.badge-fail    { background: rgba(248,113,113,0.15); color: #f87171; border: 1px solid rgba(248,113,113,0.25); }

/* Bottom total bar */
.rec-bottom-bar {
  display: flex; align-items: center; justify-content: space-around;
  padding: 10px 14px 12px;
  background: rgba(15,18,56,0.98);
  border-top: 1px solid rgba(255,255,255,0.08);
}

/* ══════════════════════════════════════
   REPORT TAB STYLES
   ══════════════════════════════════════ */

.rpt-page {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
}

/* 2×2 stats grid */
.rpt-stats-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  flex-shrink: 0;
}
.rpt-stat-cell {
  padding: 10px 14px 10px;
  border-right: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.rpt-cell-right { border-right: none; }
.rpt-stat-label {
  font-size: 9px; color: rgba(255,255,255,0.38);
  margin-bottom: 3px; line-height: 1.4;
}
.rpt-stat-value {
  font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.85);
}
.rpt-val-red { color: #f87171; }

/* Filter row */
.rpt-filter-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px 8px;
  flex-shrink: 0;
}
.rpt-drop-wrap { position: relative; }

.rpt-date-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: 8px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.8); font-size: 11px; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.15s, background 0.15s;
}
.rpt-date-btn--open {
  background: rgba(245,200,66,0.1);
  border-color: rgba(245,200,66,0.4);
  color: #f5c842;
}

/* Sort label on the right */
.rpt-sort-label {
  display: flex; align-items: center; gap: 3px;
  font-size: 9px; color: rgba(255,255,255,0.35);
  flex-shrink: 0;
}

/* Date picker — positioned same as bet tab */
.rpt-datepicker {
  position: fixed; z-index: 9999;
  width: 310px; background: #181b4a;
  border: 1px solid rgba(255,255,255,0.12); border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.7);
  overflow: hidden;
}

/* ══════════════════════════════════════
   BET TAB STYLES
   ══════════════════════════════════════ */

.bet-page {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
}

/* 4-filter scrollable bar */
.bet-filter-bar {
  position: relative; z-index: 100;
  display: flex; align-items: center; gap: 6px;
  padding: 10px 10px 6px;
  overflow-x: auto; flex-shrink: 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.bet-filter-bar::-webkit-scrollbar { display: none; }

/* Each filter wrapper */
.bet-drop-wrap { position: relative; flex-shrink: 0; }

/* Filter button pill */
.bet-filter-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 11px; border-radius: 8px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.75); font-size: 10.5px; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.15s, background 0.15s;
}
.bet-filter-btn--open {
  background: rgba(245,200,66,0.12);
  border-color: rgba(245,200,66,0.45);
  color: #f5c842;
}

/* Bet dropdown list */
.bet-drop-list {
  position: fixed; z-index: 9999;
  min-width: 200px; background: #181b4a;
  border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
  overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.6);
}
.bet-drop-item {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 11px 14px; text-align: left;
  background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.7); font-size: 11.5px; cursor: pointer;
  white-space: nowrap; -webkit-tap-highlight-color: transparent;
  transition: background 0.12s;
}
.bet-drop-item:last-child { border-bottom: none; }
.bet-drop-item:active { background: rgba(255,255,255,0.06); }
.bet-drop-item--active { color: #f5c842; font-weight: 700; }

/* ── Drum Date Picker ── */
.bet-datepicker {
  position: absolute; top: calc(100% + 6px); left: 0; z-index: 90;
  width: 310px; background: #181b4a;
  border: 1px solid rgba(255,255,255,0.12); border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.7);
  padding: 0;
  overflow: hidden;
}

/* Today / Yesterday tab switcher */
.bdp-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.bdp-tab {
  flex: 1; padding: 10px 0; font-size: 12px; font-weight: 600;
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.45);
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s, background 0.15s;
}
.bdp-tab--active {
  color: #f5c842; background: rgba(245,200,66,0.08);
  border-bottom: 2px solid #f5c842;
}

/* Custom date section label */
.bdp-custom-label {
  font-size: 9.5px; color: rgba(255,255,255,0.35); letter-spacing: 0.04em;
  padding: 10px 14px 4px; text-transform: uppercase;
}

/* Start + End drum columns side by side */
.bdp-drums-row {
  display: flex; align-items: stretch;
  padding: 0 10px 6px;
  gap: 4px;
}
.bdp-date-group {
  flex: 1; display: flex; flex-direction: column; gap: 4px;
}
.bdp-col-label {
  font-size: 9px; color: rgba(255,255,255,0.35); text-align: center;
  padding: 4px 0;
}
.bdp-drums {
  display: flex; gap: 2px;
}
.bdp-col { flex: 1; }
.bdp-divider {
  width: 1px; background: rgba(255,255,255,0.07); flex-shrink: 0; margin: 10px 4px;
}

/* Drum track */
.bdp-track {
  height: 120px; overflow-y: scroll; scroll-snap-type: y mandatory;
  scrollbar-width: none; -webkit-overflow-scrolling: touch;
  position: relative;
}
.bdp-track::-webkit-scrollbar { display: none; }
.bdp-spacer { height: 40px; flex-shrink: 0; }
.bdp-item {
  height: 40px; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.3);
  scroll-snap-align: start; cursor: default;
  transition: color 0.1s;
}
.bdp-item--sel {
  color: #f5c842; font-weight: 800;
}

/* Action buttons */
.bdp-actions {
  display: flex; gap: 8px; padding: 10px 14px 14px;
}
.bdp-cancel-btn {
  flex: 1; padding: 9px 0; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 600;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
}
.bdp-confirm-btn {
  flex: 1; padding: 9px 0; border-radius: 8px;
  background: linear-gradient(135deg,#f5c842,#e5a800);
  border: none; color: #1a1440; font-size: 12px; font-weight: 700;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
}

/* Records scroll area */
.bet-scroll-area {
  flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
}

/* Bet drop transition */
.bet-drop-enter-active, .bet-drop-leave-active { transition: all 0.2s cubic-bezier(0.4,0,0.2,1); }
.bet-drop-enter-from, .bet-drop-leave-to { opacity: 0; transform: translateY(-8px) scale(0.97); }

/* ══════════════════════════════════════
   BALANCE TAB STYLES
   ══════════════════════════════════════ */

.bal-page {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
}

/* Top card */
.bal-top-card {
  margin: 10px 10px 6px;
  padding: 12px 14px 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; flex-shrink: 0;
}
.bal-top-row {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
}
.bal-top-label {
  font-size: 9.5px; color: rgba(255,255,255,0.45); margin-bottom: 3px;
}
.bal-top-amount-row {
  display: flex; align-items: center; gap: 2px;
}
.bal-top-amount {
  font-size: 20px; font-weight: 900; color: #f5c842;
}
.bal-yellow-btn {
  flex-shrink: 0;
  background: linear-gradient(135deg,#f5c842,#e5a800);
  border: none; border-radius: 7px;
  padding: 6px 10px; font-size: 10px; font-weight: 700;
  color: #1a1440; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
}
.bal-info-text {
  margin-top: 8px; font-size: 9.5px; color: rgba(255,255,255,0.35);
  line-height: 1.6;
}
.bal-info-link {
  color: #f5c842; font-weight: 700; cursor: pointer; margin-left: 3px;
}

/* Refresh toggle (same as HomePage) */
.refresh-toggle {
  background: transparent; border: none; padding: 3px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  opacity: 0.85; transition: opacity 0.2s;
}
.refresh-toggle .refresh-icon { display: block; transition: opacity 0.2s; }
.refresh-toggle--spin .refresh-icon {
  animation: refresh-spin 0.65s linear infinite; opacity: 0.55;
}
@keyframes refresh-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* Split layout */
.bal-split {
  flex: 1; display: flex; overflow: hidden;
}

/* Left sidebar */
.bal-sidebar {
  width: 60px; flex-shrink: 0;
  overflow-y: auto; overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex; flex-direction: column; gap: 0;
}
.bal-sidebar::-webkit-scrollbar { display: none; }
.bal-cat-btn {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 8px 3px;
  background: none; border: none; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-left: 3px solid transparent;
  transition: background 0.15s, border-color 0.15s;
}
.bal-cat-btn--active {
  background: rgba(245,200,66,0.1);
  border-left-color: #f5c842;
}
.bal-cat-icon {
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.4);
}
.bal-cat-btn--active .bal-cat-icon { color: #f5c842; }
.bal-cat-label {
  font-size: 7.5px; color: rgba(255,255,255,0.38);
  text-align: center; line-height: 1.2; word-break: break-all;
}
.bal-cat-btn--active .bal-cat-label { color: #f5c842; font-weight: 700; }

/* Right side */
.bal-right {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
}

/* Search bar */
.bal-search-wrap {
  position: relative; margin: 6px 6px 5px; flex-shrink: 0;
}
.bal-search-input {
  width: 100%; padding: 6px 28px 6px 10px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 7px;
  color: rgba(255,255,255,0.8); font-size: 10px;
  outline: none; box-sizing: border-box;
}
.bal-search-input::placeholder { color: rgba(255,255,255,0.3); }
.bal-search-icon {
  position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
  pointer-events: none;
}

/* Provider cards grid */
.bal-cards-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 6px; padding: 0 6px 10px;
  overflow-y: auto; -webkit-overflow-scrolling: touch;
  flex: 1;
}
.bal-provider-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 9px; padding: 8px 8px 7px;
  display: flex; flex-direction: column; gap: 4px;
}
.bal-card-top {
  display: flex; align-items: center; gap: 6px;
}
.bal-card-logo {
  width: 28px; height: 28px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; overflow: hidden;
}
.bal-card-abbr {
  font-size: 9px; font-weight: 900; font-family: Arial, sans-serif;
  letter-spacing: -0.02em;
}
.bal-card-name {
  font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.85);
}
.bal-card-balance {
  font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.5);
  padding-left: 1px;
}

/* ══ Toast ══ */
.app-toast {
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
  background: rgba(30,32,70,0.96); border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 600;
  padding: 10px 22px; border-radius: 22px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.5);
  z-index: 9999; white-space: nowrap; pointer-events: none;
}
.toast-enter-active, .toast-leave-active { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(12px); }

/* ══════════════════════════════════════════════
   PROFILE PAGE STYLES — compact
   ══════════════════════════════════════════════ */
.prf-root { background: #07091b; display: flex; flex-direction: column; }

.prf-body {
  flex: 1; overflow-y: auto; padding: 10px 12px 0;
  -webkit-overflow-scrolling: touch;
}

/* Avatar row */
.prf-av-row {
  display: flex; align-items: center; gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  margin-bottom: 9px;
}
.prf-av-img {
  width: 58px; height: 58px; border-radius: 11px;
  object-fit: cover; border: 1.5px solid rgba(255,255,255,0.15);
}
.prf-vip-badge {
  position: absolute; bottom: -5px; left: -3px;
  padding: 1px 5px; border-radius: 4px;
  font-size: 7.5px; font-weight: 900; color: #fff; line-height: 1.5;
}
.prf-av-overlay {
  position: absolute; inset: 0; border-radius: 10px;
  background: rgba(0,0,0,0.28);
  display: flex; align-items: center; justify-content: center;
}
.prf-id-col { flex: 1; min-width: 0; }
.prf-id-row {
  display: flex; align-items: center; gap: 5px; margin-bottom: 4px;
}
.prf-id-text {
  font-size: 12px; font-weight: 800; color: #4ade80; font-family: monospace;
}
.prf-copy-btn {
  background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25);
  border-radius: 4px; padding: 2px 6px; color: #4ade80;
  cursor: pointer; display: flex; align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.prf-name-row { display: flex; align-items: center; gap: 4px; }
.prf-name-text { font-size: 11.5px; color: rgba(255,255,255,0.58); }

/* Section label */
.prf-section-label {
  font-size: 9.5px; color: rgba(255,255,255,0.4);
  margin-bottom: 4px; letter-spacing: 0.04em; font-weight: 600;
}

/* Standard field row */
.prf-field {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 8px; padding: 9px 11px;
  margin-bottom: 4px; cursor: pointer;
  transition: border-color 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.prf-field--readonly { cursor: default; }
.prf-field-val {
  flex: 1; font-size: 12px; color: rgba(255,255,255,0.85); font-weight: 500;
}

/* Dropdown panel */
.prf-drop-panel {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.11);
  border-top: none; border-radius: 0 0 8px 8px;
  overflow: hidden; margin-bottom: 4px;
}
.prf-drop-item {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 11px; font-size: 12px; color: rgba(255,255,255,0.8);
}

/* Social fields */
.prf-social-field {
  display: flex; align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 8px; margin-bottom: 4px; overflow: hidden;
}
.prf-social-icon {
  width: 38px; height: 38px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.prf-social-img {
  width: 38px; height: 38px; object-fit: cover; display: block;
}
.prf-social-input {
  flex: 1; background: transparent; border: none; outline: none;
  padding: 9px 11px; font-size: 12px;
  color: rgba(255,255,255,0.85); font-family: system-ui, sans-serif;
}
.prf-social-input::placeholder { color: rgba(255,255,255,0.28); font-size: 11.5px; }

/* Birthday picker */
.prf-birth-picker {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.11);
  border-top: none; border-radius: 0 0 8px 8px;
  padding: 8px 10px; margin-bottom: 4px;
}
.prf-birth-cols { display: flex; gap: 7px; }
.prf-birth-col { flex: 1; }
.prf-birth-col-label {
  font-size: 9px; color: rgba(255,255,255,0.36);
  margin-bottom: 3px; text-align: center;
}
.prf-birth-select {
  width: 100%; background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.13); border-radius: 7px;
  padding: 7px 3px; color: #fff; font-size: 12px;
  outline: none; cursor: pointer; text-align: center;
  -webkit-appearance: none; appearance: none;
}

/* Age warning */
.prf-age-warn {
  font-size: 9.5px; color: rgba(255,100,70,0.88);
  line-height: 1.5; margin: 6px 0 8px; font-weight: 500;
}

/* Footer buttons — inline below content */
.prf-footer-inline {
  display: flex; gap: 8px; padding: 8px 0;
  margin-top: 6px;
}
.prf-btn-back {
  flex: 1; height: 40px; border-radius: 9px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.13);
  color: rgba(255,255,255,0.78); font-size: 12.5px; font-weight: 700;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
}
.prf-btn-save {
  flex: 1.5; height: 40px; border-radius: 9px;
  background: linear-gradient(135deg, #f0b429 0%, #d97706 100%);
  border: none; color: #1a1440; font-size: 12.5px; font-weight: 800;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 10px rgba(240,180,41,0.28);
  transition: opacity 0.15s;
}
.prf-btn-save:disabled { opacity: 0.55; cursor: not-allowed; }
.prf-btn-save:active:not(:disabled) { opacity: 0.82; }

/* ══════════════════════════════════════════════
   CUSTOMER SERVICE PANEL STYLES
   ══════════════════════════════════════════════ */
.cs-root { background: #07091b; display: flex; flex-direction: column; }

.cs-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 14px; border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}

/* Tabs */
.cs-tabs-wrap {
  border-bottom: 1px solid rgba(255,255,255,0.08);
  overflow-x: auto; flex-shrink: 0;
  -webkit-overflow-scrolling: touch;
}
.cs-tabs-wrap::-webkit-scrollbar { display: none; }
.cs-tabs { display: flex; padding: 0 10px; min-width: max-content; }
.cs-tab {
  position: relative; background: none; border: none; outline: none;
  padding: 10px 10px 9px; font-size: 11.5px; font-weight: 600;
  color: rgba(255,255,255,0.45); cursor: pointer; white-space: nowrap;
  display: flex; align-items: center; gap: 3px;
  -webkit-tap-highlight-color: transparent; transition: color 0.15s;
}
.cs-tab--active { color: #f0b429; }
.cs-tab--active::after {
  content: ''; position: absolute; bottom: 0; left: 8px; right: 8px;
  height: 2px; background: #f0b429; border-radius: 2px 2px 0 0;
}
.cs-badge {
  background: rgba(240,180,41,0.85); color: #1a1440;
  font-size: 8px; font-weight: 800; padding: 1px 4px;
  border-radius: 8px; line-height: 1.4;
}
.cs-badge--red { background: #ef4444; color: #fff; }

/* Body */
.cs-body {
  flex: 1; overflow-y: auto; padding: 12px;
  -webkit-overflow-scrolling: touch;
}

/* Main support card */
.cs-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px; padding: 14px; margin-bottom: 10px;
}
.cs-card-title {
  font-size: 13px; font-weight: 800; color: #fff; margin-bottom: 6px;
}
.cs-card-desc {
  font-size: 11px; color: rgba(255,255,255,0.5);
  line-height: 1.55; margin-bottom: 12px;
}

/* 24/7 clickable button */
.cs-247-row { margin-bottom: 12px; }
.cs-247-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(74,222,128,0.12);
  border: 1px solid rgba(74,222,128,0.3);
  border-radius: 9px; padding: 7px 14px; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.cs-247-av {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(74,222,128,0.18);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cs-247-label {
  font-size: 11px; font-weight: 700; color: #4ade80; line-height: 1.3;
}

/* Link buttons row */
.cs-link-row { display: flex; gap: 8px; }
.cs-link-btn {
  flex: 1; display: flex; align-items: center; justify-content: center;
  gap: 6px; padding: 9px 8px; border-radius: 8px; border: none;
  font-size: 11.5px; font-weight: 700; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.cs-link-btn--chat {
  background: rgba(34,158,217,0.18); color: #38bdf8;
  border: 1px solid rgba(56,189,248,0.25);
}
.cs-link-btn--tg {
  background: rgba(34,158,217,0.12); color: #38bdf8;
  border: 1px solid rgba(56,189,248,0.2);
}

/* Agent card */
.cs-agent-card {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px; padding: 12px;
}
.cs-agent-av {
  width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
  background: rgba(240,180,41,0.12);
  border: 1.5px solid rgba(240,180,41,0.3);
  display: flex; align-items: center; justify-content: center;
}
.cs-agent-info { flex: 1; min-width: 0; }
.cs-agent-title {
  font-size: 10px; color: rgba(255,255,255,0.45);
  margin-bottom: 3px; line-height: 1.4;
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.cs-agent-name-row { display: flex; align-items: center; gap: 5px; margin-bottom: 2px; }
.cs-agent-name { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.88); }
.cs-copy-btn {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px; padding: 2px 5px; color: rgba(255,255,255,0.55);
  cursor: pointer; display: flex; align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.cs-agent-time { font-size: 10px; color: rgba(255,255,255,0.38); }
.cs-contact-btn {
  flex-shrink: 0; padding: 8px 13px; border-radius: 8px;
  background: linear-gradient(135deg, #f0b429, #d97706);
  border: none; color: #1a1440; font-size: 11.5px; font-weight: 800;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 8px rgba(240,180,41,0.28);
}

/* Empty state */
.cs-empty {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 60px 0;
}

/* ══════════════════════════════════════════════
   SUGGESTION FORM STYLES
   ══════════════════════════════════════════════ */

/* Sub-tabs */
.sg-sub-tabs {
  display: flex; gap: 8px; padding: 10px 0 12px;
}
.sg-sub-tab {
  padding: 6px 16px; border-radius: 20px; border: none; outline: none;
  font-size: 12px; font-weight: 600; cursor: pointer;
  background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.45);
  -webkit-tap-highlight-color: transparent; transition: all 0.15s;
}
.sg-sub-tab--active {
  background: #f0b429; color: #1a1440;
}

/* Form */
.sg-form { padding-bottom: 4px; }
.sg-group { margin-bottom: 14px; }
.sg-label {
  font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.75);
  margin-bottom: 6px; line-height: 1.5;
}
.sg-hint { font-size: 10px; color: rgba(255,255,255,0.38); font-weight: 400; }
.sg-required { color: #ef4444; margin-left: 2px; }

/* Category select */
.sg-select-wrap {
  position: relative; display: flex; align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 9px; overflow: hidden;
}
.sg-select {
  flex: 1; appearance: none; -webkit-appearance: none;
  background: transparent; border: none; outline: none;
  padding: 11px 34px 11px 12px;
  font-size: 12px; color: rgba(255,255,255,0.82); font-family: system-ui, sans-serif;
  cursor: pointer;
}
.sg-select option { background: #111827; color: #fff; }
.sg-select-arrow {
  position: absolute; right: 11px; pointer-events: none; flex-shrink: 0;
}

/* Textarea */
.sg-textarea {
  width: 100%; box-sizing: border-box;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 9px; padding: 11px 12px;
  font-size: 12px; color: rgba(255,255,255,0.82);
  font-family: system-ui, sans-serif; resize: none; outline: none;
  line-height: 1.6;
}
.sg-textarea::placeholder { color: rgba(255,255,255,0.2); font-size: 11px; }
.sg-char-count {
  text-align: right; font-size: 10px; color: rgba(255,255,255,0.3);
  margin-top: 4px;
}

/* Image upload area */
.sg-upload-area {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 7px;
}
.sg-upload-thumb {
  width: 72px; height: 72px; border-radius: 8px; overflow: hidden;
  position: relative; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.12);
}
.sg-thumb-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.sg-thumb-remove {
  position: absolute; top: 2px; right: 2px;
  background: rgba(0,0,0,0.65); border: none; color: #fff;
  font-size: 9px; width: 18px; height: 18px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  -webkit-tap-highlight-color: transparent;
}
.sg-upload-add {
  width: 72px; height: 72px; border-radius: 8px; flex-shrink: 0;
  border: 1.5px dashed rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
}
.sg-upload-note {
  font-size: 10px; color: rgba(255,255,255,0.32); line-height: 1.5;
}

/* Terms */
.sg-terms {
  font-size: 10px; color: rgba(255,255,255,0.35);
  line-height: 1.55; margin: 6px 0 14px;
}

/* Submit button */
.sg-submit-btn {
  width: 100%; height: 44px; border-radius: 10px;
  background: linear-gradient(135deg, #f0b429 0%, #d97706 100%);
  border: none; color: #1a1440; font-size: 14px; font-weight: 800;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  box-shadow: 0 3px 12px rgba(240,180,41,0.3);
  transition: opacity 0.15s;
}
.sg-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.sg-submit-btn:active:not(:disabled) { opacity: 0.82; }
</style>
