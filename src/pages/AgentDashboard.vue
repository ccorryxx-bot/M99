<template>
  <div class="ag-root">

    <!-- HEADER -->
    <header class="ag-header">
      <button @click="$router.push('/home')" class="ag-back-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="ag-title">ပိုင်ကြားရန်</h1>
      <div style="width:36px;"></div>
    </header>

    <!-- TAB STRIP -->
    <nav class="ag-tabs no-scrollbar">
      <button
        v-for="(tab, i) in tabs" :key="i"
        @click="activeTab = i"
        class="ag-tab-btn"
        :class="activeTab === i ? 'ag-tab-active' : ''">
        {{ tab }}
      </button>
    </nav>

    <!-- CONTENT -->
    <div class="ag-body">

      <!-- ══ TAB 0: ပိုင်စာလင်မ် ══ -->
      <div v-if="activeTab === 0">

        <!-- Balance Card -->
        <div class="ag-card">

          <!-- Balance Row -->
          <div class="balance-row">
            <span class="balance-label">
              စုဆောင်းနိုင်သော <strong class="balance-num">{{ formatN(availableCommission) }}</strong>
            </span>
            <div class="balance-btns">
              <button class="btn-gray" @click="handleWithdraw">ရလုရန်</button>
              <button class="btn-green" @click="activeTab = 2">သမိုင်းစဉ်</button>
            </div>
          </div>

          <p class="ag-subtitle">သာလွန်အကောင်း သာလွတ်ကြားမှုပ</p>
          <p class="ag-desc">ပရောမိုးရှိ တင်အနည်းဆုံး မှရ ကြားချည်ကြားချောင် (နေစဉ်အကြားမှု)</p>

          <!-- Invite Link Header -->
          <div class="invite-header-bar">
            <span class="invite-header-title">ကွန်တော် Link</span>
            <span class="invite-header-link">ရှေးချယ်ပါ ▸</span>
          </div>

          <!-- QR + Info -->
          <div class="invite-body">
            <!-- QR Code Column -->
            <div class="qr-col">
              <div class="qr-box">
                <img :src="qrUrl" alt="QR" class="qr-img" />
              </div>
              <button class="btn-green-sm" @click="downloadQr">သမ်းရည်</button>
            </div>

            <!-- Info Column -->
            <div class="info-col">
              <!-- Referral URL -->
              <div class="url-row">
                <span class="url-text">{{ referralLink }}</span>
                <button @click="copyLink" class="copy-icon-btn">
                  <svg v-if="!copiedLink" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  <svg v-else width="14" height="14" fill="none" stroke="#22c55e" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>

              <!-- Direct count -->
              <p class="info-stat">
                တိုက်ရိုက်ရစေ်ရာဝင်များ
                <strong style="color:#22c55e;">{{ directCount }}လူတွေ</strong>
              </p>

              <!-- Invite code -->
              <div class="code-row">
                <span class="code-label">ပိုင်စာကုဒ် <strong>{{ inviteCode }}</strong></span>
                <button @click="copyCode" class="copy-icon-btn">
                  <svg v-if="!copiedCode" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  <svg v-else width="14" height="14" fill="none" stroke="#22c55e" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Share Row -->
        <div class="social-row">
          <button @click="shareVia('native')" class="social-btn">
            <div class="social-icon social-icon--share">
              <svg width="15" height="15" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
            </div>
            <span class="social-label">မျှဝေ</span>
          </button>
          <button @click="shareVia('facebook')" class="social-btn">
            <div class="social-icon social-icon--fb">
              <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span class="social-label">Facebook</span>
          </button>
          <button @click="shareVia('telegram')" class="social-btn">
            <div class="social-icon social-icon--tg">
              <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <span class="social-label">Telegram</span>
          </button>
          <button @click="shareVia('whatsapp')" class="social-btn">
            <div class="social-icon social-icon--wa">
              <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span class="social-label">WhatsApp</span>
          </button>
        </div>

        <!-- Brand Image -->
        <div class="brand-img-wrap">
          <img
            src="https://ik.imagekit.io/rbok01qam/Brand%20Logo%20/file_00000000300c71fab9e860fbdb4318d2.png?tr=f-auto"
            alt="NovaBett"
            class="brand-img"
          />
        </div>
        <!-- ══ INFINITE LEVERAGE GUIDE ══ -->
        <div class="lever-guide">

          <!-- Title -->
          <div class="lever-title-row">
            <svg class="lever-title-icon" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
              <div class="lever-title">အကန့်အသတ်မဲ့ အေးဂျင့် ကော်မရှင် မဟာဗျူဟာ</div>
              <div class="lever-subtitle">The Infinite Leverage Guide</div>
            </div>
          </div>

          <!-- Quote -->
          <div class="lever-quote">
            <div class="lever-quote-bar"></div>
            <div>
              <p class="lever-quote-text">"သင် အိပ်ပျော်နေရင်တောင် သင့်အဖွဲ့က သင့်အတွက် ပိုက်ဆံ ရှာပေးနေလိမ့်မယ်။"</p>
              <p class="lever-quote-body">ဤစနစ်သည် သင့်ကိုယ်ပိုင် စွမ်းဆောင်ရည်တစ်ခုတည်းအပေါ်တွင် မူတည်ခြင်းမရှိဘဲ၊ သင့်အဖွဲ့အစည်း (Network) ကြီးထွားလာသည်နှင့်အမျှ <span class="lever-hl">အကန့်အသတ်မဲ့ ဝင်ငွေ (Passive Income)</span> ကို ဖန်တီးပေးမည့် အခွင့်အရေး ဖြစ်သည်။</p>
            </div>
          </div>

          <div class="lever-divider"></div>

          <!-- Section 1 -->
          <div class="lever-section">
            <div class="lever-sec-header">
              <div class="lever-sec-icon lever-sec-icon--gold">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#f59e0b" stroke-width="1.8"/><path d="M12 7v5l3 3" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/></svg>
              </div>
              <div>
                <div class="lever-sec-num">၁</div>
                <div class="lever-sec-title">ဝင်ငွေအလွှာ ကွဲပြားမှုနှင့် အမြင့်ဆုံး ကော်မရှင်နှုန်း</div>
                <div class="lever-sec-en">Maximizing Your Leverage</div>
              </div>
            </div>
            <p class="lever-body">စနစ်က သင့်ကို အနိမ့်ဆုံး ရာခိုင်နှုန်းမှာတင် ရပ်တန့်မနေစေပါဘူး။ စွမ်းဆောင်ရည် တက်လာတာနဲ့အမျှ ကော်မရှင်နှုန်းက 3 ဆထိ ခုန်တက်သွားမှာပါ။</p>
            <div class="lever-level-cards">
              <div class="lever-lvl-card">
                <div class="lever-lvl-badge">L1</div>
                <div class="lever-lvl-desc">ခြေလှမ်းစတင်ခြင်း</div>
                <div class="lever-lvl-pct">1%</div>
                <div class="lever-lvl-note">Valid Bet 0–10,000<br/>10,000 တိုင်းအတွက် 100</div>
              </div>
              <div class="lever-arrow">
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="lever-lvl-card lever-lvl-card--gold">
                <div class="lever-lvl-badge lever-lvl-badge--gold">L2</div>
                <div class="lever-lvl-desc">မဟာအေးဂျင့်</div>
                <div class="lever-lvl-pct lever-lvl-pct--gold">3%</div>
                <div class="lever-lvl-note">Valid Bet 10,000+<br/>10,000 တိုင်းအတွက် 300</div>
              </div>
            </div>
            <div class="lever-tip">
              <svg class="lever-tip-icon" viewBox="0 0 24 24" fill="none"><path d="M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.3 6l-.7 3H9l-.7-3A7.03 7.03 0 015 9a7 7 0 017-7z" stroke="#fbbf24" stroke-width="1.6"/><path d="M9 21h6" stroke="#fbbf24" stroke-width="1.6" stroke-linecap="round"/></svg>
              <div><span class="lever-tip-label">စိတ်ပညာ လှည့်ကွက် (The Rebate Gap):</span> သင့်အဆင့် မြင့်လေလေ၊ Rebate Gap ကို <strong>ဘာမှမလုပ်ဘဲ အလကားထိုင်စားခွင့်</strong> ပိုများလေလေ ဖြစ်သည်။</div>
            </div>
          </div>

          <div class="lever-divider"></div>

          <!-- Section 2 -->
          <div class="lever-section">
            <div class="lever-sec-header">
              <div class="lever-sec-icon lever-sec-icon--blue">
                <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#60a5fa" stroke-width="1.8"/><path d="M3 9h18M9 21V9" stroke="#60a5fa" stroke-width="1.8"/></svg>
              </div>
              <div>
                <div class="lever-sec-num">၂</div>
                <div class="lever-sec-title">လက်တွေ့အမြတ်ထုတ်မှု ပြကွက်</div>
                <div class="lever-sec-en">Real-Case Execution</div>
              </div>
            </div>
            <p class="lever-body">သင်နှင့် သင့်အဖွဲ့သား B1, B2, B3 တို့၏ ကွန်ရက်မှ ပိုက်ဆံ မည်သို့ စီးဆင်းလာသည်ကို ကြည့်ပါ။</p>
            <div class="lever-network-table">
              <div class="lever-nt-row lever-nt-row--head">
                <span>Agent</span><span>Network</span><span>Valid Bet</span>
              </div>
              <div class="lever-nt-row"><span class="lever-nt-name">B1</span><span class="lever-nt-note">C1 + C2 ရှိ</span><span class="lever-nt-val">500</span></div>
              <div class="lever-nt-row"><span class="lever-nt-name">B2</span><span class="lever-nt-note">တစ်ကိုယ်တော်</span><span class="lever-nt-val">3,000</span></div>
              <div class="lever-nt-row"><span class="lever-nt-name">B3</span><span class="lever-nt-note">Super C3 ရှိ</span><span class="lever-nt-val">2,000</span></div>
              <div class="lever-nt-row"><span class="lever-nt-name" style="color:#a78bfa">C1</span><span class="lever-nt-note">B1 အောက်</span><span class="lever-nt-val">1,000</span></div>
              <div class="lever-nt-row"><span class="lever-nt-name" style="color:#a78bfa">C2</span><span class="lever-nt-note">B1 အောက်</span><span class="lever-nt-val">2,000</span></div>
              <div class="lever-nt-row lever-nt-row--highlight"><span class="lever-nt-name" style="color:#fbbf24">C3</span><span class="lever-nt-note">B3 Super</span><span class="lever-nt-val" style="color:#fbbf24">20,000</span></div>
            </div>
          </div>

          <div class="lever-divider"></div>

          <!-- Section 3 -->
          <div class="lever-section">
            <div class="lever-sec-header">
              <div class="lever-sec-icon lever-sec-icon--green">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round"/></svg>
              </div>
              <div>
                <div class="lever-sec-num">၃</div>
                <div class="lever-sec-title">တစ်ဦးချင်းစီ၏ အမြတ်ခွဲတမ်း တွက်ချက်မှု</div>
                <div class="lever-sec-en">Detailed Breakdown</div>
              </div>
            </div>

            <!-- B1 -->
            <div class="lever-agent-card">
              <div class="lever-agent-tag">Network B1</div>
              <div class="lever-agent-rows">
                <div class="lever-agent-row"><span>ကိုယ်ပိုင် Bet</span><span>500</span></div>
                <div class="lever-agent-row"><span>C1 + C2 ပံ့ပိုးမှု</span><span>3,000</span></div>
                <div class="lever-agent-row"><span>စုစုပေါင်း</span><span class="lever-sum">3,500</span></div>
                <div class="lever-agent-row lever-agent-row--profit"><span>Net Profit</span><span class="lever-profit">+ 30 Ks</span></div>
              </div>
            </div>

            <!-- B2 -->
            <div class="lever-agent-card">
              <div class="lever-agent-tag">Network B2</div>
              <div class="lever-agent-rows">
                <div class="lever-agent-row"><span>ကိုယ်ပိုင် Bet</span><span>3,000</span></div>
                <div class="lever-agent-row"><span>အောက်လိုင်း</span><span>မရှိသေးပါ</span></div>
                <div class="lever-agent-row lever-agent-row--profit"><span>Net Profit</span><span class="lever-profit">ကိုယ်ပိုင် ရာခိုင်နှုန်းသာ</span></div>
              </div>
            </div>

            <!-- B3 -->
            <div class="lever-agent-card lever-agent-card--gold">
              <div class="lever-agent-tag lever-agent-tag--gold">Network B3 ★</div>
              <div class="lever-agent-rows">
                <div class="lever-agent-row"><span>ကိုယ်ပိုင် Bet</span><span>2,000</span></div>
                <div class="lever-agent-row"><span>Super C3</span><span style="color:#fbbf24">20,000</span></div>
                <div class="lever-agent-row"><span>စုစုပေါင်း</span><span class="lever-sum">22,000 → 3% အဆင့်</span></div>
                <div class="lever-agent-row lever-agent-row--profit"><span>Net Profit</span><span class="lever-profit lever-profit--big">+ 600 Ks</span></div>
              </div>
            </div>
          </div>

          <div class="lever-divider"></div>

          <!-- Section 4 -->
          <div class="lever-section">
            <div class="lever-sec-header">
              <div class="lever-sec-icon lever-sec-icon--crown">
                <svg viewBox="0 0 24 24" fill="none"><path d="M2 19h20M4 19l2-9 6 5 4-9 4 9" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <div class="lever-sec-num">၄</div>
                <div class="lever-sec-title">မဟာအေးဂျင့် A ၏ ဘုရင် အဆင့် ဝင်ငွေ</div>
                <div class="lever-sec-en">The Master's Revenue</div>
              </div>
            </div>
            <div class="lever-master-grid">
              <div class="lever-master-box">
                <div class="lever-master-label">Direct Volume</div>
                <div class="lever-master-val">5,500</div>
                <div class="lever-master-sub">B1 + B2 + B3</div>
              </div>
              <div class="lever-master-box">
                <div class="lever-master-label">Indirect Volume</div>
                <div class="lever-master-val">23,000</div>
                <div class="lever-master-sub">C1 + C2 + C3</div>
              </div>
              <div class="lever-master-box lever-master-box--total">
                <div class="lever-master-label">Total Network</div>
                <div class="lever-master-val" style="color:#fbbf24">28,500</div>
                <div class="lever-master-sub">3% အမြင့်ဆုံး</div>
              </div>
            </div>
            <div class="lever-harvest">
              <div class="lever-harvest-row"><span>တိုက်ရိုက် Volume အမြတ်</span><span>165 Ks</span></div>
              <div class="lever-harvest-row"><span>B1 Team Rebate Gap 2%</span><span>60 Ks</span></div>
              <div class="lever-harvest-total">
                <svg viewBox="0 0 24 24" fill="none" class="lever-fire"><path d="M12 2c0 0-5 4-5 10a5 5 0 0010 0c0-2.5-1.5-5-3-6.5 0 2-1.5 3-3 3.5 0-2.5-1-4.5 1-7z" stroke="#f59e0b" stroke-width="1.6" stroke-linejoin="round"/></svg>
                <span>စုစုပေါင်း အသားတင်အမြတ်</span>
                <span class="lever-harvest-num">225 Ks</span>
              </div>
            </div>
          </div>

          <div class="lever-divider"></div>

          <!-- Section 5 -->
          <div class="lever-section">
            <div class="lever-sec-header">
              <div class="lever-sec-icon lever-sec-icon--purple">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="#a78bfa" stroke-width="1.8"/><path d="M8 12h8M12 8v8" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round"/></svg>
              </div>
              <div>
                <div class="lever-sec-num">၅</div>
                <div class="lever-sec-title">Infinitus — အကန့်အသတ်မဲ့ အဆင့်ဆင့် စည်းစိမ်စနစ်</div>
                <div class="lever-sec-en">The Endless Wealth Loop</div>
              </div>
            </div>
            <div class="lever-infinity-quote">
              "သင့်အောက်မှာ အဆင့် ၁၀၀၊ အဆင့် ၁၀၀၀ ပဲ ရှိရှိ... ကော်မရှင်က သင့်ဆီ စီးဆင်းနေဦးမှာပါ။"
            </div>
            <p class="lever-body">ဤစနစ်သည် အဆင့် ကန့်သတ်ချက် မရှိပါ (Infinite Downlines)။ မိမိနှင့် မိမိအောက်လိုင်းများအကြား ကော်မရှင် ရာခိုင်နှုန်း ကွာခြားချက် (Rebate Gap) ရှိနေသရွေ့ အောက်ဆုံးအဆင့်က ဆော့ကစားသမျှ ရာခိုင်နှုန်းများသည် <span class="lever-hl">လှိုင်းလုံးကဲ့သို့ အဆက်မပြတ် ဆင့်ကဲတက်</span> လာမည်ဖြစ်သည်။</p>
            <div class="lever-loop-row">
              <div class="lever-loop-node">Downline ဆော့</div>
              <svg class="lever-loop-arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#a78bfa" stroke-width="2" stroke-linecap="round"/></svg>
              <div class="lever-loop-node">Rebate Gap</div>
              <svg class="lever-loop-arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#a78bfa" stroke-width="2" stroke-linecap="round"/></svg>
              <div class="lever-loop-node lever-loop-node--you">သင် ရသည်</div>
            </div>
            <div class="lever-final-note">အလုပ်လုပ်ရကျိုး အနပ်ဆုံးနှင့် စိတ်ချရဆုံးသော အနာဂတ် ရွှေတွင်းစနစ် ဖြစ်သည်။</div>
          </div>

        </div>

      </div>


            <!-- ══ TAB 1: ငါ့ကော်မရှင် ══ -->
      <div v-if="activeTab === 1">
        <div class="ag-card" style="padding:0;overflow:visible;">

          <!-- ── 3-column info header ── -->
          <div class="cm-info-row">
            <div class="cm-info-cell">
              <div class="cm-info-label">အခြေချကာလ</div>
              <div class="cm-info-val">{{ commPeriodLabel }}</div>
            </div>
            <div class="cm-info-divider"></div>
            <div class="cm-info-cell">
              <div class="cm-info-label">နေ့စဉ်ငွေပေးချေမှု</div>
              <div class="cm-info-val green">{{ formatN(filteredCommTotal) }} Ks</div>
            </div>
            <div class="cm-info-divider"></div>
            <div class="cm-info-cell">
              <div class="cm-info-label">နောင်ငွေတောင်းခံရက်စွဲ</div>
              <div class="cm-info-val">{{ nextPayDate }}</div>
            </div>
          </div>

          <!-- ── Period dropdown ── -->
          <div class="cm-period-wrap">
            <button class="cm-period-btn" @click="showPeriodDrop = !showPeriodDrop">
              <span>{{ commPeriodLabel }}</span>
              <svg class="cm-period-caret" :class="showPeriodDrop ? 'cm-caret-up' : ''" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div v-if="showPeriodDrop" class="cm-drop">
              <button v-for="p in commPeriods" :key="p.key"
                class="cm-drop-item" :class="commPeriod===p.key?'cm-drop-item--active':''"
                @click="selectPeriod(p.key)">{{ p.label }}</button>
              <button class="cm-drop-item" :class="commPeriod==='custom'?'cm-drop-item--active':''"
                @click="selectPeriod('custom')">စိတ်ကြုက်ရွေးချယ်ပါ</button>
            </div>
          </div>

          <!-- ── Custom date range ── -->
          <div v-if="commPeriod==='custom'" class="cm-custom-range">
            <div class="cm-custom-row"><label class="cm-custom-label">မှ</label><input type="date" v-model="customFrom" class="cm-custom-input" /></div>
            <div class="cm-custom-row"><label class="cm-custom-label">ထိ</label><input type="date" v-model="customTo" class="cm-custom-input" /></div>
          </div>

          <!-- ── Records / empty state ── -->
          <div class="cm-records">
            <div v-if="loadingComm" class="cm-empty">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.2)" stroke-width="2"/><path d="M12 7v5l3 3" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round"/></svg>
              <span>Loading...</span>
            </div>
            <div v-else-if="filteredCommRecords.length===0" class="cm-empty">
              <svg viewBox="0 0 24 24" fill="none" width="36" height="36"><rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.15)" stroke-width="1.8"/><path d="M3 9h18" stroke="rgba(255,255,255,0.15)" stroke-width="1.8"/><path d="M8 13h2M14 13h2" stroke="rgba(255,255,255,0.15)" stroke-width="1.8" stroke-linecap="round"/></svg>
              <span>မတ်တမ်းမရှိပါ!!!</span>
            </div>
            <template v-else>
              <div v-for="r in filteredCommRecords" :key="r.id" class="cm-record-row">
                <div class="cm-rec-left">
                  <div class="cm-rec-avatar">{{ (r.player_id||'U').charAt(0).toUpperCase() }}</div>
                  <div>
                    <div class="cm-rec-user">{{ r.player_id?.slice(0,8)||'—' }}</div>
                    <div class="cm-rec-date">{{ fmtDateFull(r.created_at) }}</div>
                  </div>
                </div>
                <div class="cm-rec-right">
                  <div class="cm-rec-amount">+{{ formatN(r.commission_amount) }} Ks</div>
                  <div class="cm-rec-turn">Turnover {{ formatN(r.bet_turnover) }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- ══ TAB 2: ငါ့တောင ══ -->
      <div v-if="activeTab === 2">

        <!-- Period filter -->
        <div class="team-period-scroll no-scrollbar">
          <button
            v-for="p in teamPeriods" :key="p.key"
            class="team-period-btn"
            :class="teamPeriod === p.key ? 'team-period-btn--active' : ''"
            @click="teamPeriod = p.key">
            {{ p.label }}
          </button>
        </div>

        <!-- ── Section 1: ယနေ့ဒေတာ ── -->
        <div class="glass-section">
          <span class="glass-section-title">ယနေ့ဒေတာ</span>
          <div class="team-stats-grid">
            <div class="team-stat-cell">
              <div class="team-stat-label">လက်အောက်ငယ်သား<br>အသစ်</div>
              <div class="team-stat-val">{{ teamNewMembers }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ပထမဆုံး အပ်ငွေ<br>ပမာဏ</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ပထမအပ်နှင့်</div>
              <div class="team-stat-val">0</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">သိုက်</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">သိုက်</div>
              <div class="team-stat-val">0</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ငွေထုတ်တန်ဖိုး</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ငွေထုတ်<br>အရေအတွက်</div>
              <div class="team-stat-val">0</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">မှန်ကန်သော<br>အလောင်းအစားများ</div>
              <div class="team-stat-val">{{ formatN(teamTurnover) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ဘောနပ်စ်များ<br>ရယူပါ!!</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက်<br>အနိုင်ရရှိ/အရှုံး</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက်<br>စွမ်းနိုင်ရည်</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ကော်မရှင်</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(teamCommTotal) }}</div>
            </div>
          </div>
        </div>

        <!-- ── Section 2: ဒေတာအကျဉ်းချုပ် ── -->
        <div class="glass-section">
          <div class="glass-section-title-row">
            <span class="glass-section-title">ဒေတာအကျဉ်းချုပ်</span>
            <button class="glass-help-btn">?</button>
          </div>
          <div class="team-stats-grid">
            <div class="team-stat-cell">
              <div class="team-stat-label">အသင်းအရေ<br>ယ်အစား</div>
              <div class="team-stat-val">{{ allDownline.length }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက်<br>အဖွဲ့ဝင်များ</div>
              <div class="team-stat-val">{{ directCount }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">အခြား<br>အဖွဲ့ဝင်များ</div>
              <div class="team-stat-val">{{ allDownline.filter(u=>u.level>1).length }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">စုစပေါင်း<br>မောင်းဆောင်ရည်</div>
              <div class="team-stat-val">{{ formatN(teamTurnover) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">D. တိုက်ရိုက်</div>
              <div class="team-stat-val">{{ formatN(teamDirectTurnover) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">D. အခြားသူများ၏</div>
              <div class="team-stat-val">{{ formatN(teamOverrideTurnover) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">စုစပေါင်း<br>ကော်မရှင်များ</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(teamCommTotal) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက်<br>ကော်မရှင်</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(teamDirectComm) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">အခြား<br>ကော်မရှင်</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(teamOverrideComm) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">စုစပေါင်း<br>ကော်မရှင်</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(teamCommTotal) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ကယ်တင်<br>ခဲ့သည်!!</div>
              <div class="team-stat-val team-stat-val--yellow">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">မကောက်ခံ<br>မပါ!!</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(teamCommTotal) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက်အစီရင်ခံစာ<br>အပ်ငွေ စုစပေါင်း</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">လက်အောင်ငယ်သားများ၏<br>တိုက်ရိုက်ငွေထုတ်<br>ခြင်း စုစပေါင်း</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell team-stat-cell--span2">
              <div class="team-stat-label">တိုက်ရိုက်အစီရင်ခံစာ<br>တောင်းဆိုမှုများ၏ စုစပေါင်း</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက်အစီရင်ခံစာ၏<br>စီးရင်ခံကတောင်းဆိုပါ</div>
              <div class="team-stat-val">0.00</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက် အရှုံး<br>အမြတ် စီးသောင်းပါ!!</div>
              <div class="team-stat-val">0.00</div>
            </div>
          </div>
        </div>

      </div>

      <!-- ══ TAB 3: စွမ်းဆောင်ရည် ══ -->
      <div v-if="activeTab === 3">
        <div class="ag-card" style="padding:0;overflow:visible;">

          <!-- Period dropdown -->
          <div class="cm-period-wrap" style="padding:12px 12px 0;">
            <button class="cm-period-btn perf-drop-btn" @click="showPerfDrop = !showPerfDrop">
              <span>{{ perfPeriodLabel }}</span>
              <svg class="cm-period-caret" :class="showPerfDrop ? 'cm-caret-up' : ''" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div v-if="showPerfDrop" class="cm-drop perf-drop">
              <button v-for="p in perfPeriods" :key="p.key"
                class="cm-drop-item" :class="myDataPeriod === p.key ? 'cm-drop-item--active' : ''"
                @click="myDataPeriod = p.key; loadMyDataStats(p.key); showPerfDrop = false">
                {{ p.label }}
              </button>
            </div>
          </div>

          <div class="divider-line" style="margin:12px 0 0;"></div>

          <!-- Stats -->
          <div class="stat-grid" style="padding:10px 12px 14px;">
            <div class="stat-box">
              <div class="stat-label">Deposit</div>
              <div class="stat-val">{{ formatN(myStats.depositAmt) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Turnover</div>
              <div class="stat-val">{{ formatN(totalTurnover) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Profit/Loss</div>
              <div class="stat-val" :class="myStats.profitLoss >= 0 ? 'green' : 'red'">{{ formatN(myStats.profitLoss) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">ကော်မရှင်</div>
              <div class="stat-val green">{{ formatN(myStats.totalComm) }} <span class="stat-unit">Ks</span></div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="!myStats.depositAmt && !myStats.totalComm" class="cm-empty" style="padding-bottom:24px;">
            <svg viewBox="0 0 24 24" fill="none" width="36" height="36"><rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.15)" stroke-width="1.8"/><path d="M3 9h18" stroke="rgba(255,255,255,0.15)" stroke-width="1.8"/></svg>
            <span>မတ်တမ်းမရှိပါ!!!</span>
          </div>

        </div>
      </div>

      <!-- ══ TAB 4: အချက်အလက်အားလုံး ══ -->
      <div v-if="activeTab === 4">
        <div class="ag-card" style="padding:0;overflow:visible;">

          <!-- Filter row -->
          <div class="tab-filter-row">
            <div class="tab-filter-drop">
              <button class="tab-filter-drop-btn" @click="showDrop4 = !showDrop4">
                <span>{{ perfPeriods.find(p=>p.key===perfPeriod4)?.label || 'ဒီနေ့' }}</span>
                <svg class="tab-filter-caret" :class="showDrop4 ? 'tab-filter-caret-up':''" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div v-if="showDrop4" class="tab-filter-list">
                <button v-for="p in perfPeriods" :key="p.key"
                  class="tab-filter-list-item" :class="perfPeriod4===p.key?'tab-filter-list-item--active':''"
                  @click="perfPeriod4=p.key; showDrop4=false">{{ p.label }}</button>
              </div>
            </div>
            <div class="tab-filter-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" width="15" height="15" class="tab-filter-search-icon"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              <input class="tab-filter-search" v-model="searchQ4" placeholder="အမျိုးအစား ID"/>
            </div>
          </div>

          <div style="padding:0 12px 14px;">
          <p class="tab-section-title" style="padding-top:10px;">ကျွန်ုပ်၏ Agent အချက်အလက်</p>
          <div class="info-table">
            <div class="info-row">
              <span class="info-key">Username</span>
              <span class="info-val">{{ username }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Agent Code</span>
              <span class="info-val green">{{ inviteCode }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Referral Link</span>
              <span class="info-val" style="font-size:10px;word-break:break-all;">{{ referralLink }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Direct Comm Rate</span>
              <span class="info-val green">{{ commDirectRate }}%</span>
            </div>
            <div class="info-row">
              <span class="info-key">Override Rate</span>
              <span class="info-val green">{{ commOverrideRate }}%</span>
            </div>
            <div class="info-row">
              <span class="info-key">စုစုပေါင်း Downline</span>
              <span class="info-val">{{ allDownline.length }} ဦး</span>
            </div>
            <div class="info-row">
              <span class="info-key">တိုက်ရိုက် (L1)</span>
              <span class="info-val">{{ directCount }} ဦး</span>
            </div>
            <div class="info-row">
              <span class="info-key">ကော်မရှင် (ဒီလ)</span>
              <span class="info-val green">{{ formatN(totalCommission) }} Ks</span>
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- ══ TAB 5: လက်အောက်ငယ်သားများ၏ဘဏ္ဏာရေး ══ -->
      <div v-if="activeTab === 5">
        <!-- Filter row -->
        <div class="tab-filter-row">
          <div class="tab-filter-drop">
            <button class="tab-filter-drop-btn" @click="showDrop5 = !showDrop5">
              <span>{{ perfPeriods.find(p=>p.key===finPeriod)?.label || 'ဒီနေ့' }}</span>
              <svg class="tab-filter-caret" :class="showDrop5?'tab-filter-caret-up':''" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div v-if="showDrop5" class="tab-filter-list">
              <button v-for="p in perfPeriods" :key="p.key"
                class="tab-filter-list-item" :class="finPeriod===p.key?'tab-filter-list-item--active':''"
                @click="finPeriod=p.key; showDrop5=false">{{ p.label }}</button>
            </div>
          </div>
          <div class="tab-filter-search-wrap">
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15" class="tab-filter-search-icon"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <input class="tab-filter-search" v-model="searchQ5" placeholder="အမျိုးအစား ID"/>
          </div>
        </div>

        <div class="glass-section" style="margin-top:10px;">
          <div class="glass-section-title-row">
            <span class="glass-section-title">လက်အောက်ငယ်သားများ၏ဘဏ္ဏာရေး</span>
            <button class="glass-help-btn">?</button>
          </div>
          <div class="team-stats-grid">
            <div class="team-stat-cell">
              <div class="team-stat-label">ငွေသွင်းစုစုပေါင်း</div>
              <div class="team-stat-val">{{ formatN(finDepositTotal) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ငွေသွင်း အရေအတွက်</div>
              <div class="team-stat-val">{{ finDepositCount }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ငွေထုတ်စုစုပေါင်း</div>
              <div class="team-stat-val">{{ formatN(finWithdrawTotal) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ငွေထုတ် အရေအတွက်</div>
              <div class="team-stat-val">{{ finWithdrawCount }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">အသားတင် ငွေ</div>
              <div class="team-stat-val" :class="(finDepositTotal - finWithdrawTotal) >= 0 ? 'team-stat-val--green' : 'team-stat-val--red'">{{ formatN(finDepositTotal - finWithdrawTotal) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">လက်ကျန်ငွေ</div>
              <div class="team-stat-val">{{ formatN(finBalance) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">အသစ် မှတ်ပုံတင်</div>
              <div class="team-stat-val">{{ finNewMembers }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ပထမဆုံး အပ်ငွေ</div>
              <div class="team-stat-val">{{ finFirstDeposit }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ငွေလုပ်ဆောင်သူ</div>
              <div class="team-stat-val">{{ finActiveCount }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ TAB 6: အောက်လက်ငယ်သားလောင်းကစား ══ -->
      <div v-if="activeTab === 6">
        <!-- Filter row -->
        <div class="tab-filter-row">
          <div class="tab-filter-drop">
            <button class="tab-filter-drop-btn" @click="showDrop6 = !showDrop6">
              <span>{{ perfPeriods.find(p=>p.key===gambPeriod)?.label || 'ဒီနေ့' }}</span>
              <svg class="tab-filter-caret" :class="showDrop6?'tab-filter-caret-up':''" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div v-if="showDrop6" class="tab-filter-list">
              <button v-for="p in perfPeriods" :key="p.key"
                class="tab-filter-list-item" :class="gambPeriod===p.key?'tab-filter-list-item--active':''"
                @click="gambPeriod=p.key; showDrop6=false">{{ p.label }}</button>
            </div>
          </div>
          <div class="tab-filter-search-wrap">
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15" class="tab-filter-search-icon"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <input class="tab-filter-search" v-model="searchQ6" placeholder="အမျိုးအစား ID"/>
          </div>
        </div>

        <div class="glass-section" style="margin-top:10px;">
          <div class="glass-section-title-row">
            <span class="glass-section-title">လောင်းကစားဒေတာ</span>
            <button class="glass-help-btn">?</button>
          </div>
          <div class="team-stats-grid">
            <div class="team-stat-cell">
              <div class="team-stat-label">စုစုပေါင်း Turnover</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(gambTurnover) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">Bet အရေအတွက်</div>
              <div class="team-stat-val">{{ gambBetCount }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">အနိုင်ရ ငွေ</div>
              <div class="team-stat-val team-stat-val--green">{{ formatN(gambWinAmt) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">အရှုံးပေး ငွေ</div>
              <div class="team-stat-val team-stat-val--red">{{ formatN(gambLoseAmt) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">Profit / Loss</div>
              <div class="team-stat-val" :class="gambProfitLoss >= 0 ? 'team-stat-val--green' : 'team-stat-val--red'">{{ formatN(gambProfitLoss) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">လောင်းကစားသူ</div>
              <div class="team-stat-val">{{ gambActiveCount }}</div>
            </div>
            <div class="team-stat-cell team-stat-cell--span2">
              <div class="team-stat-label">အမြတ်ရ Bet % (RTP)</div>
              <div class="team-stat-val">{{ gambRtp }}%</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ပျမ်းမျှ Bet</div>
              <div class="team-stat-val">{{ formatN(gambAvgBet) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ TAB 7: လက်အောက်ခံဒေတာ ══ -->
      <div v-if="activeTab === 7">
        <!-- Filter row -->
        <div class="tab-filter-row">
          <div class="tab-filter-drop">
            <button class="tab-filter-drop-btn" @click="showDrop7 = !showDrop7">
              <span>{{ perfPeriods.find(p=>p.key===dlPeriod)?.label || 'ဒီနေ့' }}</span>
              <svg class="tab-filter-caret" :class="showDrop7?'tab-filter-caret-up':''" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div v-if="showDrop7" class="tab-filter-list">
              <button v-for="p in perfPeriods" :key="p.key"
                class="tab-filter-list-item" :class="dlPeriod===p.key?'tab-filter-list-item--active':''"
                @click="dlPeriod=p.key; showDrop7=false">{{ p.label }}</button>
            </div>
          </div>
          <div class="tab-filter-search-wrap">
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15" class="tab-filter-search-icon"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <input class="tab-filter-search" v-model="searchQ7" placeholder="အမျိုးအစား ID"/>
          </div>
        </div>

        <div class="glass-section" style="margin-top:10px;">
          <div class="glass-section-title-row">
            <span class="glass-section-title">လက်အောက်ခံဒေတာ အကျဉ်းချုပ်</span>
            <button class="glass-help-btn">?</button>
          </div>
          <div class="team-stats-grid">
            <div class="team-stat-cell">
              <div class="team-stat-label">စုစုပေါင်း L1</div>
              <div class="team-stat-val">{{ directCount }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">စုစုပေါင်း Downline</div>
              <div class="team-stat-val">{{ allDownline.length }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တက်ကြွသောသူ</div>
              <div class="team-stat-val team-stat-val--green">{{ dlActiveCount }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">မတက်ကြွသောသူ</div>
              <div class="team-stat-val">{{ allDownline.length - dlActiveCount }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ကာလတွင် အသစ်</div>
              <div class="team-stat-val">{{ teamNewMembers }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ပထမအပ်ငွေ ရသူ</div>
              <div class="team-stat-val">{{ finFirstDeposit }}</div>
            </div>
          </div>
        </div>

        <div class="glass-section" style="margin-top:10px;">
          <div class="glass-section-title-row">
            <span class="glass-section-title">လက်အောက်ငယ်သား စာရင်း</span>
          </div>
          <div class="dl-list">
            <div v-if="allDownline.length === 0" class="dl-empty">လက်အောက်ငယ်သား မရှိသေးပါ</div>
            <div v-for="m in allDownline.slice(0, 20)" :key="m.id" class="dl-row">
              <div class="dl-avatar">{{ (m.username || '?')[0].toUpperCase() }}</div>
              <div class="dl-info">
                <div class="dl-name">{{ m.username }}</div>
                <div class="dl-meta">Level {{ m.level || 1 }} · {{ m.joined_at ? new Date(m.joined_at).toLocaleDateString('my-MM') : '—' }}</div>
              </div>
              <div class="dl-badge" :class="m.is_active ? 'dl-badge--active' : 'dl-badge--inactive'">
                {{ m.is_active ? 'တက်ကြွ' : 'မတက်ကြွ' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ TAB 8: ကော်မရှင်ရယူပြီးသောလက်အောက်ငယ်သားများ ══ -->
      <div v-if="activeTab === 8">
        <!-- Filter row -->
        <div class="tab-filter-row">
          <div class="tab-filter-drop">
            <button class="tab-filter-drop-btn" @click="showDrop8 = !showDrop8">
              <span>{{ perfPeriods.find(p=>p.key===commDlPeriod)?.label || 'ဒီနေ့' }}</span>
              <svg class="tab-filter-caret" :class="showDrop8?'tab-filter-caret-up':''" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div v-if="showDrop8" class="tab-filter-list">
              <button v-for="p in perfPeriods" :key="p.key"
                class="tab-filter-list-item" :class="commDlPeriod===p.key?'tab-filter-list-item--active':''"
                @click="commDlPeriod=p.key; showDrop8=false">{{ p.label }}</button>
            </div>
          </div>
          <div class="tab-filter-search-wrap">
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15" class="tab-filter-search-icon"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <input class="tab-filter-search" v-model="searchQ8" placeholder="အမျိုးအစား ID"/>
          </div>
        </div>

        <div class="glass-section" style="margin-top:10px;">
          <div class="glass-section-title-row">
            <span class="glass-section-title">ကော်မရှင် ထောက်ပံ့သောသူများ</span>
            <button class="glass-help-btn">?</button>
          </div>
          <div class="team-stats-grid" style="margin-bottom:14px;">
            <div class="team-stat-cell">
              <div class="team-stat-label">ကော်မရှင်ပေးသောသူ</div>
              <div class="team-stat-val">{{ commDlList.length }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ရရှိသည့် ကော်မရှင်</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(commissions.filter(c => c.status === 'paid').reduce((s,c) => s + (Number(c.commission_amount) || 0), 0)) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ဆိုင်းငံ့ဆဲ</div>
              <div class="team-stat-val">{{ commissions.filter(c => c.status === 'pending').length }}</div>
            </div>
          </div>
          <div class="dl-list">
            <div v-if="commDlList.length === 0" class="dl-empty">ဒေတာ မရှိသေးပါ</div>
            <div v-for="(item, idx) in commDlList.slice(0,15)" :key="idx" class="dl-row">
              <div class="dl-avatar" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);">{{ (item.username || '?')[0].toUpperCase() }}</div>
              <div class="dl-info">
                <div class="dl-name">{{ item.username }}</div>
                <div class="dl-meta">Turnover: {{ formatN(item.turnover || 0) }} Ks</div>
              </div>
              <div class="dl-comm-val">{{ formatN(item.comm || 0) }} <span style="font-size:9px;">Ks</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ TAB 9: ကော်မရှင်ကြေး ══ -->
      <div v-if="activeTab === 9">
        <div class="glass-section">
          <div class="glass-section-title-row">
            <span class="glass-section-title">ကာလ ရွေးချယ်ပါ</span>
          </div>
          <div class="team-period-scroll no-scrollbar">
            <button v-for="p in teamPeriods" :key="p.key"
              @click="feesPeriod = p.key"
              class="team-period-btn" :class="feesPeriod === p.key ? 'team-period-btn--active' : ''">
              {{ p.label }}
            </button>
          </div>
        </div>

        <div class="glass-section" style="margin-top:10px;">
          <div class="glass-section-title-row">
            <span class="glass-section-title">ကော်မရှင်ကြေး အကျဉ်းချုပ်</span>
            <button class="glass-help-btn">?</button>
          </div>
          <div class="team-stats-grid">
            <div class="team-stat-cell team-stat-cell--span2">
              <div class="team-stat-label">စုစုပေါင်း ကော်မရှင်</div>
              <div class="team-stat-val team-stat-val--yellow" style="font-size:20px;">{{ formatN(teamCommTotal) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက်ကြေး</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(teamDirectComm) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">Override ကြေး</div>
              <div class="team-stat-val team-stat-val--yellow">{{ formatN(teamOverrideComm) }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">တိုက်ရိုက် Rate</div>
              <div class="team-stat-val">{{ commDirectRate }}%</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">Override Rate</div>
              <div class="team-stat-val">{{ commOverrideRate }}%</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ပေးဆောင်ပြီး</div>
              <div class="team-stat-val team-stat-val--green">{{ commissions.filter(c => c.status === 'paid').length }}</div>
            </div>
            <div class="team-stat-cell">
              <div class="team-stat-label">ဆိုင်းငံ့ဆဲ</div>
              <div class="team-stat-val">{{ commissions.filter(c => c.status === 'pending').length }}</div>
            </div>
          </div>
        </div>

        <div class="glass-section" style="margin-top:10px;">
          <div class="glass-section-title-row">
            <span class="glass-section-title">ကော်မရှင် မှတ်တမ်း</span>
          </div>
          <div class="dl-list">
            <div v-if="commissions.length === 0" class="dl-empty">ကော်မရှင် မှတ်တမ်း မရှိသေးပါ</div>
            <div v-for="(c, idx) in commissions.slice(0,20)" :key="idx" class="dl-row">
              <div class="dl-avatar" style="background:linear-gradient(135deg,#22c55e,#16a34a);">{{ idx + 1 }}</div>
              <div class="dl-info">
                <div class="dl-name">{{ c.type === 'direct' ? 'တိုက်ရိုက်ကြေး' : 'Override ကြေး' }}</div>
                <div class="dl-meta">{{ c.created_at ? new Date(c.created_at).toLocaleDateString('my-MM') : '—' }}</div>
              </div>
              <div class="dl-comm-val" :class="c.status === 'paid' ? 'team-stat-val--green' : ''">{{ formatN(Number(c.commission_amount) || 0) }} <span style="font-size:9px;">Ks</span></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/supabase'

const loading         = ref(true)
const loadingComm     = ref(false)
const copiedCode      = ref(false)
const copiedLink      = ref(false)
const activeTab       = ref(0)
const userId          = ref('')
const username        = ref(localStorage.getItem('sb_username') || '—')
const mainBalance     = ref(0)
const bonusBalance    = ref(0)
const allDownline     = ref([])
const commissionRecords  = ref([])
const totalCommission    = ref(0)
const totalTurnover      = ref(0)
const availableCommission = ref(0)
const myDataPeriod    = ref('today')
const commDirectRate  = ref(10)
const commOverrideRate = ref(5)
const myStats = ref({
  todayComm: 0, totalComm: 0, directComm: 0,
  overrideComm: 0, depositAmt: 0, profitLoss: 0
})
let realtimeChannel = null
const commPeriod      = ref('today')
const showPeriodDrop  = ref(false)
const showPerfDrop    = ref(false)
const customFrom      = ref('')
const customTo        = ref('')
const teamPeriod      = ref('today')

const perfPeriods = [
  { key: 'today',     label: 'ဒီနေ့' },
  { key: 'yesterday', label: 'မနေ့က' },
  { key: 'thisweek',  label: 'ဒီတစ်ပတ်' },
  { key: 'lastweek',  label: 'ပြီးခဲ့သောအပတ်က' },
  { key: 'thismonth', label: 'ဒီလ' },
  { key: 'lastmonth', label: 'ပြီးခဲ့သည့်လ' },
  { key: 'all',       label: 'အားလုံး' },
]

const perfPeriodLabel = computed(() =>
  perfPeriods.find(p => p.key === myDataPeriod.value)?.label || 'ဒီနေ့'
)

const teamPeriods = [
  { key: 'today',     label: 'ဒင်နေ' },
  { key: 'yesterday', label: 'မနေ့' },
  { key: 'thisweek',  label: 'ဒီတစ်ပတ်' },
  { key: 'lastweek',  label: 'ပြီးခဲ့သောအပတ်က' },
  { key: 'thismonth', label: 'ဒီလ' },
  { key: 'lastmonth', label: 'ပြီးသည်' },
]

const commPeriods = [
  { key: 'today',     label: 'ဒီနေ့' },
  { key: 'yesterday', label: 'မနေ့က' },
  { key: 'thisweek',  label: 'ဒီတစ်ပတ်' },
  { key: 'lastweek',  label: 'ပြီးခဲ့သောအပတ်' },
  { key: 'thismonth', label: 'ဒီလ' },
  { key: 'lastmonth', label: 'ပြီးခဲ့သည့်လ' },
  { key: 'all',       label: 'အားလုံး' },
]

const tabs    = ['ပိုင်စာလင်မ်', 'ငါ့ကော်မရှင်', 'ငါ့တောင', 'စွမ်းဆောင်ရည်', 'အချက်အလက်အားလုံး', 'လက်အောက်ငယ်သားများ၏ဘဏ္ဏာရေး', 'အောက်လက်ငယ်သားလောင်းကစား', 'လက်အောက်ခံဒေတာ', 'ကော်မရှင်ရယူပြီးသောလက်အောက်ငယ်သားများ', 'ကော်မရှင်ကြေး']
const periods = [
  { key: 'today',     label: 'ဒီနေ့' },
  { key: 'yesterday', label: 'မနေ့က' },
  { key: 'month',     label: 'ဒီလ' },
]

const commPeriodLabel = computed(() => {
  if (commPeriod.value === 'custom') {
    if (customFrom.value && customTo.value) return customFrom.value + ' ~ ' + customTo.value
    return 'စိတ်ကြုက်'
  }
  return commPeriods.find(p => p.key === commPeriod.value)?.label || 'ဒီနေ့'
})

const getPeriodRange = (key) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (key === 'today') return { from: today, to: new Date(today.getTime() + 86400000) }
  if (key === 'yesterday') {
    const y = new Date(today); y.setDate(y.getDate() - 1)
    return { from: y, to: today }
  }
  if (key === 'thisweek') {
    const dow = today.getDay(); const mon = new Date(today); mon.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
    return { from: mon, to: new Date(now) }
  }
  if (key === 'lastweek') {
    const dow = today.getDay(); const thisMon = new Date(today); thisMon.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
    const lastMon = new Date(thisMon); lastMon.setDate(thisMon.getDate() - 7)
    return { from: lastMon, to: thisMon }
  }
  if (key === 'thismonth') {
    return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: new Date(now) }
  }
  if (key === 'lastmonth') {
    const firstThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstLast = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return { from: firstLast, to: firstThisMonth }
  }
  return null
}

const filteredCommRecords = computed(() => {
  const all = commissionRecords.value
  if (commPeriod.value === 'all') return all
  if (commPeriod.value === 'custom') {
    if (!customFrom.value || !customTo.value) return all
    const from = new Date(customFrom.value)
    const to   = new Date(customTo.value); to.setDate(to.getDate() + 1)
    return all.filter(r => { const d = new Date(r.created_at); return d >= from && d < to })
  }
  const range = getPeriodRange(commPeriod.value)
  if (!range) return all
  return all.filter(r => { const d = new Date(r.created_at); return d >= range.from && d < range.to })
})

const filteredCommTotal = computed(() =>
  filteredCommRecords.value.reduce((s, r) => s + Number(r.commission_amount), 0)
)

const teamFilteredComm = computed(() => {
  const all = commissionRecords.value
  const range = getPeriodRange(teamPeriod.value)
  if (!range) return all
  return all.filter(r => { const d = new Date(r.created_at); return d >= range.from && d < range.to })
})

const teamCommTotal = computed(() =>
  teamFilteredComm.value.reduce((s, r) => s + Number(r.commission_amount), 0)
)

const teamTurnover = computed(() =>
  teamFilteredComm.value.reduce((s, r) => s + Number(r.bet_turnover), 0)
)

const teamDirectComm = computed(() => teamCommTotal.value * 0.7)
const teamOverrideComm = computed(() => teamCommTotal.value * 0.3)
const teamDirectTurnover = computed(() => teamTurnover.value * 0.7)
const teamOverrideTurnover = computed(() => teamTurnover.value * 0.3)

const teamNewMembers = computed(() => {
  const range = getPeriodRange(teamPeriod.value)
  if (!range) return allDownline.value.length
  return allDownline.value.filter(u => {
    if (!u.created_at) return false
    const d = new Date(u.created_at)
    return d >= range.from && d < range.to
  }).length
})

// ── Tab 4–8 dropdown + search refs ──
const showDrop4   = ref(false)
const showDrop5   = ref(false)
const showDrop6   = ref(false)
const showDrop7   = ref(false)
const showDrop8   = ref(false)
const searchQ4    = ref('')
const searchQ5    = ref('')
const searchQ6    = ref('')
const searchQ7    = ref('')
const searchQ8    = ref('')
const perfPeriod4 = ref('today')

// ── Tab 5–9 period refs ──
const finPeriod     = ref('today')
const gambPeriod    = ref('today')
const dlPeriod      = ref('today')
const commDlPeriod  = ref('today')
const feesPeriod    = ref('today')

// commissions alias (same data as commissionRecords)
const commissions = computed(() => commissionRecords.value)

// ── Tab 5: Finance computed ──
const finDownlineTxns = computed(() => {
  const ids = allDownline.value.map(u => u.id)
  const range = getPeriodRange(finPeriod.value)
  return commissionRecords.value.filter(r => {
    if (!ids.includes(r.user_id)) return false
    if (!range) return true
    const d = new Date(r.created_at)
    return d >= range.from && d < range.to
  })
})
const finDepositTotal   = computed(() => finDownlineTxns.value.reduce((s,r) => s + (Number(r.deposit_amount) || 0), 0))
const finDepositCount   = computed(() => finDownlineTxns.value.filter(r => (Number(r.deposit_amount) || 0) > 0).length)
const finWithdrawTotal  = computed(() => finDownlineTxns.value.reduce((s,r) => s + (Number(r.withdraw_amount) || 0), 0))
const finWithdrawCount  = computed(() => finDownlineTxns.value.filter(r => (Number(r.withdraw_amount) || 0) > 0).length)
const finBalance        = computed(() => finDepositTotal.value - finWithdrawTotal.value)
const finNewMembers     = computed(() => {
  const range = getPeriodRange(finPeriod.value)
  if (!range) return allDownline.value.length
  return allDownline.value.filter(u => { if (!u.created_at) return false; const d = new Date(u.created_at); return d >= range.from && d < range.to }).length
})
const finFirstDeposit   = computed(() => finDownlineTxns.value.filter(r => r.is_first_deposit).length)
const finActiveCount    = computed(() => new Set(finDownlineTxns.value.map(r => r.user_id)).size)

// ── Tab 6: Gambling computed ──
const gambFilteredComm = computed(() => {
  const range = getPeriodRange(gambPeriod.value)
  if (!range) return commissionRecords.value
  return commissionRecords.value.filter(r => { const d = new Date(r.created_at); return d >= range.from && d < range.to })
})
const gambTurnover    = computed(() => gambFilteredComm.value.reduce((s,r) => s + (Number(r.bet_turnover) || 0), 0))
const gambBetCount    = computed(() => gambFilteredComm.value.length)
const gambWinAmt      = computed(() => gambFilteredComm.value.reduce((s,r) => s + (Number(r.win_amount) || 0), 0))
const gambLoseAmt     = computed(() => gambFilteredComm.value.reduce((s,r) => s + (Number(r.lose_amount) || 0), 0))
const gambProfitLoss  = computed(() => gambWinAmt.value - gambLoseAmt.value)
const gambActiveCount = computed(() => new Set(gambFilteredComm.value.map(r => r.user_id)).size)
const gambRtp         = computed(() => gambTurnover.value > 0 ? ((gambWinAmt.value / gambTurnover.value) * 100).toFixed(1) : '0.0')
const gambAvgBet      = computed(() => gambBetCount.value > 0 ? gambTurnover.value / gambBetCount.value : 0)

// ── Tab 7: Downline Data computed ──
const dlActiveCount = computed(() => {
  const range = getPeriodRange(dlPeriod.value)
  if (!range) return allDownline.value.filter(u => u.is_active).length
  return allDownline.value.filter(u => {
    if (!u.last_active_at) return false
    const d = new Date(u.last_active_at)
    return d >= range.from && d < range.to
  }).length
})

// ── Tab 8: Commission DL list ──
const commDlList = computed(() => {
  const range = getPeriodRange(commDlPeriod.value)
  const filtered = commissionRecords.value.filter(r => {
    if (!range) return true
    const d = new Date(r.created_at); return d >= range.from && d < range.to
  })
  const map = {}
  for (const r of filtered) {
    const uid = r.user_id || r.referral_id || 'unknown'
    if (!map[uid]) map[uid] = { username: r.username || uid, turnover: 0, comm: 0 }
    map[uid].turnover += Number(r.bet_turnover) || 0
    map[uid].comm += Number(r.commission_amount) || 0
  }
  return Object.values(map).sort((a,b) => b.comm - a.comm)
})

const nextPayDate = computed(() => {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return d.toLocaleDateString('my-MM', { month: 'short', day: 'numeric' })
})

const inviteCode = computed(() =>
  userId.value
    ? userId.value.substring(0, 8).toUpperCase()
    : (localStorage.getItem('sb_username') || '——').toUpperCase()
)

const referralLink = computed(() =>
  window.location.origin + '/?dl=' + inviteCode.value
)

const qrUrl = computed(() =>
  `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(referralLink.value)}&bgcolor=ffffff&color=000000&margin=6`
)

const directCount = computed(() =>
  allDownline.value.filter(u => u.level === 1).length
)

const formatN = (n) => {
  const v = Number(n) || 0
  if (v >= 1000000) return (v / 1000000).toFixed(2) + 'M'
  if (v >= 1000)    return new Intl.NumberFormat('en-US').format(Math.round(v))
  return v.toFixed(0)
}

const fmtDate = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
}

const copyCode = async () => {
  try { await navigator.clipboard.writeText(inviteCode.value) } catch {}
  copiedCode.value = true
  setTimeout(() => { copiedCode.value = false }, 2000)
}

const copyLink = async () => {
  try { await navigator.clipboard.writeText(referralLink.value) } catch {}
  copiedLink.value = true
  setTimeout(() => { copiedLink.value = false }, 2000)
}

const shareVia = (id) => {
  const text = `NovaBett မှာ ကစားပါ! ငါ့ Link: ${referralLink.value}`
  if (id === 'native' && navigator.share) {
    navigator.share({ title: 'NovaBett', text, url: referralLink.value })
    return
  }
  const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink.value)}`,
    telegram:  `https://t.me/share/url?url=${encodeURIComponent(referralLink.value)}&text=${encodeURIComponent(text)}`,
    whatsapp:  `https://wa.me/?text=${encodeURIComponent(text)}`,
  }
  if (urls[id]) window.open(urls[id], '_blank')
  else copyLink()
}

const downloadQr = () => { window.open(qrUrl.value, '_blank') }
const handleWithdraw = () => { alert('ကော်မရှင် ထုတ်ယူခြင်း — Coming Soon') }

const loadAll = async () => {
  loading.value = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { loading.value = false; return }
    userId.value   = session.user.id
    username.value = session.user.user_metadata?.username
      || (session.user.email || '').replace(/@novabett\.internal$/, '').toUpperCase()
    localStorage.setItem('sb_username', username.value)
    await Promise.all([
      loadWallet(session.user.id),
      loadDownline(session.user.id),
      loadCommissions(session.user.id),
      loadSettings(),
    ])
    await loadMyDataStats('today')
  } catch (e) {
    console.error('[Agent]', e)
  } finally {
    loading.value = false
  }
}

const loadWallet = async (uid) => {
  const { data } = await supabase.from('wallets').select('main_balance,bonus_balance').eq('user_id', uid).single()
  if (data) { mainBalance.value = Number(data.main_balance) || 0; bonusBalance.value = Number(data.bonus_balance) || 0 }
}

const loadDownline = async (uid) => {
  const { data } = await supabase
    .from('affiliate_tree')
    .select('descendant_id, level')
    .eq('ancestor_id', uid)
    .neq('level', 0)
    .order('level')
  if (!data?.length) { allDownline.value = []; return }
  const ids = data.map(r => r.descendant_id)
  const { data: profiles } = await supabase
    .from('users')
    .select('id, username, vip_level, total_deposit, created_at')
    .in('id', ids)
  const profileMap = {}
  ;(profiles || []).forEach(p => { profileMap[p.id] = p })
  allDownline.value = data.map(r => ({ ...r, ...(profileMap[r.descendant_id] || {}) }))
}

const loadCommissions = async (uid) => {
  loadingComm.value = true
  const { data } = await supabase
    .from('affiliate_commissions')
    .select('*')
    .eq('agent_id', uid)
    .order('created_at', { ascending: false })
    .limit(50)
  commissionRecords.value = data || []
  totalCommission.value = commissionRecords.value.reduce((s, r) => s + Number(r.commission_amount), 0)
  totalTurnover.value   = commissionRecords.value.reduce((s, r) => s + Number(r.bet_turnover), 0)
  loadingComm.value = false
}

const loadSettings = async () => {
  const { data } = await supabase.from('app_settings').select('commission_direct_rate,commission_override_rate').single()
  if (data) {
    commDirectRate.value   = Number(data.commission_direct_rate)   || 10
    commOverrideRate.value = Number(data.commission_override_rate) || 5
  }
}

const loadMyDataStats = async (period) => {
  const uid = userId.value
  if (!uid) return
  let from = new Date()
  if (period === 'yesterday') { from = new Date(); from.setDate(from.getDate() - 1) }
  else if (period === 'month') { from = new Date(from.getFullYear(), from.getMonth(), 1) }
  else { from = new Date(); from.setHours(0, 0, 0, 0) }

  const { data } = await supabase
    .from('affiliate_commissions')
    .select('commission_amount,bet_turnover,created_at')
    .eq('agent_id', uid)
    .gte('created_at', from.toISOString())

  const records = data || []
  const comm = records.reduce((s, r) => s + Number(r.commission_amount), 0)
  const turn = records.reduce((s, r) => s + Number(r.bet_turnover), 0)
  myStats.value.totalComm   = comm
  myStats.value.todayComm   = comm
  myStats.value.directComm  = comm * 0.7
  myStats.value.overrideComm = comm * 0.3
  myStats.value.depositAmt  = 0
  myStats.value.profitLoss  = 0
  totalTurnover.value       = turn
  availableCommission.value = comm
}

const fmtDateFull = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { year: '2-digit', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const selectPeriod = (key) => {
  commPeriod.value = key
  showPeriodDrop.value = false
}

const applyCustom = () => {
  // reactive — filteredCommRecords updates automatically
}

onMounted(() => { loadAll() })
onUnmounted(() => {
  if (realtimeChannel) { supabase.removeChannel(realtimeChannel); realtimeChannel = null }
})
</script>

<style scoped>
.ag-root {
  min-height: 100dvh;
  background: #1a1c3a;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-tap-highlight-color: transparent;
  overscroll-behavior: contain;
}

/* ── Header ── */
.ag-header {
  position: sticky; top: 0; z-index: 40;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px;
  background: #1a1c3a;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.ag-back-btn {
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  color: rgba(255,255,255,0.8);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: opacity 0.15s;
}
.ag-back-btn:active { opacity: 0.6; }
.ag-title {
  font-size: 15px; font-weight: 800; color: #fff; letter-spacing: 0.02em;
}

/* ── Tab strip ── */
.ag-tabs {
  display: flex; overflow-x: auto;
  background: #1a1c3a;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  position: sticky; top: 57px; z-index: 30;
}
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.ag-tab-btn {
  flex-shrink: 0; padding: 9px 14px;
  font-size: 11px; font-weight: 600; white-space: nowrap;
  background: none; border: none;
  border-bottom: 2px solid transparent;
  color: rgba(255,255,255,0.38); cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.ag-tab-active { color: #22c55e; border-bottom-color: #22c55e; }

/* ── Body ── */
.ag-body { padding: 12px 12px 80px; }

/* ── Card ── */
.ag-card {
  background: #252850; border-radius: 14px;
  padding: 14px; margin-bottom: 10px;
}

/* ── Balance ── */
.balance-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px; flex-wrap: wrap; gap: 8px;
}
.balance-label { font-size: 13px; color: rgba(255,255,255,0.75); }
.balance-num   { font-size: 16px; font-weight: 900; color: #fff; }
.balance-btns  { display: flex; gap: 6px; }

.btn-gray {
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px; color: rgba(255,255,255,0.75);
  font-size: 12px; font-weight: 700; padding: 6px 14px;
  cursor: pointer; transition: opacity 0.15s;
}
.btn-gray:active { opacity: 0.7; }
.btn-green {
  background: #16a34a; border: none; border-radius: 8px;
  color: #fff; font-size: 12px; font-weight: 700; padding: 6px 14px;
  cursor: pointer; transition: opacity 0.15s;
}
.btn-green:active { opacity: 0.7; }

.ag-subtitle {
  font-size: 12px; color: rgba(255,255,255,0.7); margin: 0 0 4px;
}
.ag-desc {
  font-size: 10px; color: rgba(255,255,255,0.35); margin: 0 0 12px; line-height: 1.5;
}

/* ── Invite header bar ── */
.invite-header-bar {
  background: #15803d; border-radius: 8px 8px 0 0;
  padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;
}
.invite-header-title { font-size: 12px; font-weight: 800; color: #fff; }
.invite-header-link  { font-size: 11px; color: rgba(255,255,255,0.75); cursor: pointer; }

/* ── Invite body ── */
.invite-body {
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.08); border-top: none;
  border-radius: 0 0 10px 10px; padding: 10px;
  display: flex; gap: 10px; align-items: flex-start;
}
.qr-col {
  display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0;
}
.qr-box {
  width: 82px; height: 82px; background: #fff;
  border-radius: 10px; padding: 4px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.3);
}
.qr-img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; display: block; }
.btn-green-sm {
  background: #16a34a; border: none; border-radius: 7px;
  color: #fff; font-size: 11px; font-weight: 700; padding: 5px 14px;
  cursor: pointer; white-space: nowrap; transition: opacity 0.15s;
}
.btn-green-sm:active { opacity: 0.7; }
.info-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.url-row {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; padding: 7px 8px;
}
.url-text {
  flex: 1; min-width: 0; font-size: 10px; color: rgba(255,255,255,0.55);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.copy-icon-btn {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
  border-radius: 5px; padding: 3px 5px; cursor: pointer;
  color: rgba(255,255,255,0.6); display: flex; align-items: center; flex-shrink: 0;
  transition: opacity 0.15s;
}
.copy-icon-btn:active { opacity: 0.6; }
.info-stat { font-size: 11px; color: rgba(255,255,255,0.55); margin: 0; }
.code-row  { display: flex; align-items: center; gap: 6px; }
.code-label { font-size: 11px; color: rgba(255,255,255,0.55); flex: 1; }

/* ── Social row ── */
.social-row {
  display: flex;
  gap: 8px;
  justify-content: center;
  padding: 10px 4px 8px;
}
.social-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 0;
  -webkit-tap-highlight-color: transparent;
}
.social-btn:active .social-icon { transform: scale(0.85); }
.social-icon {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.15s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.35);
}
.social-icon--share { background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.22); }
.social-icon--fb    { background: #1877f2; }
.social-icon--tg    { background: #229ed9; }
.social-icon--wa    { background: #25d366; }
.social-label {
  font-size: 9px; color: rgba(255,255,255,0.65); font-weight: 700; white-space: nowrap;
}

/* ── Brand image ── */
.brand-img-wrap {
  border-radius: 14px;
  overflow: hidden;
  margin-top: 2px;
}
.brand-img {
  width: 100%;
  display: block;
  border-radius: 14px;
  object-fit: cover;
}

/* ── Stat grid ── */
.stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.stat-box {
  background: rgba(0,0,0,0.2); border-radius: 10px; padding: 10px 12px;
  border: 1px solid rgba(255,255,255,0.06);
}
.stat-label { font-size: 10px; color: rgba(255,255,255,0.4); margin-bottom: 3px; }
.stat-val   { font-size: 15px; font-weight: 800; color: #fff; }
.stat-val.green { color: #4ade80; }
.stat-val.red   { color: #f87171; }
.stat-unit  { font-size: 9px; color: rgba(255,255,255,0.3); font-weight: 400; }

.divider-line { height: 1px; background: rgba(255,255,255,0.08); margin: 12px 0; }

/* ── Commission rows ── */
.tab-section-title { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.75); margin: 0 0 10px; }
.comm-row { display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.comm-row:last-child { border-bottom: none; }
.comm-row-user   { font-size: 12px; font-weight: 600; color: #fff; }
.comm-row-date   { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 1px; }
.comm-row-amount { font-size: 13px; font-weight: 800; color: #4ade80; }
.comm-row-turn   { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 1px; }

/* ── Downline ── */
.down-summary { display: flex; }
.down-stat    { flex: 1; text-align: center; padding: 6px; }
.down-stat-val { font-size: 22px; font-weight: 900; color: #fff; }
.down-stat-lbl { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 2px; }
.down-row {
  display: flex; align-items: center; gap: 10px; padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.down-row:last-child { border-bottom: none; }
.down-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg,#22c55e,#16a34a);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 900; color: #fff; flex-shrink: 0;
}
.down-name    { font-size: 12px; font-weight: 700; color: #fff; }
.down-meta    { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 1px; }
.down-deposit { font-size: 12px; font-weight: 700; color: #4ade80; flex-shrink: 0; }

/* ── Period tabs ── */
.period-tabs { display: flex; gap: 6px; margin-bottom: 4px; }
.period-btn {
  flex: 1; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px; color: rgba(255,255,255,0.55);
  font-size: 11px; font-weight: 600; padding: 7px 4px;
  cursor: pointer; transition: all 0.15s;
}
.period-btn--active { background: #16a34a; border-color: #22c55e; color: #fff; }

/* ── Info table ── */
.info-table { display: flex; flex-direction: column; }
.info-row {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 8px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.info-row:last-child { border-bottom: none; }
.info-key { font-size: 11px; color: rgba(255,255,255,0.45); flex-shrink: 0; }
.info-val { font-size: 12px; font-weight: 700; color: #fff; text-align: right; }
.info-val.green { color: #4ade80; }

/* ── Utils ── */
.loading-row { text-align: center; padding: 24px; font-size: 12px; color: rgba(255,255,255,0.35); }
.empty-row   { text-align: center; padding: 24px; font-size: 12px; color: rgba(255,255,255,0.35); }

/* ══ LEVERAGE GUIDE STYLES ══ */
.lever-guide {
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 10px;
}
.lever-title-row { display:flex; align-items:flex-start; gap:10px; margin-bottom:12px; }
.lever-title-icon { width:28px; height:28px; flex-shrink:0; margin-top:2px; }
.lever-title { font-size:13px; font-weight:900; color:#fff; line-height:1.4; }
.lever-subtitle { font-size:10px; color:#f59e0b; font-weight:600; margin-top:2px; }
.lever-quote { display:flex; gap:10px; background:rgba(245,158,11,0.08); border-radius:10px; padding:10px; margin-bottom:12px; }
.lever-quote-bar { width:3px; border-radius:99px; background:#f59e0b; flex-shrink:0; }
.lever-quote-text { font-size:11px; font-weight:700; color:#fbbf24; font-style:italic; margin-bottom:5px; }
.lever-quote-body { font-size:10px; color:rgba(255,255,255,0.65); line-height:1.6; }
.lever-hl { color:#4ade80; font-weight:700; }
.lever-divider { height:1px; background:rgba(255,255,255,0.07); margin:14px 0; }
.lever-section { margin-bottom:4px; }
.lever-sec-header { display:flex; align-items:flex-start; gap:10px; margin-bottom:10px; }
.lever-sec-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; padding:6px; }
.lever-sec-icon--gold   { background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.25); }
.lever-sec-icon--blue   { background:rgba(96,165,250,0.10); border:1px solid rgba(96,165,250,0.22); }
.lever-sec-icon--green  { background:rgba(74,222,128,0.10); border:1px solid rgba(74,222,128,0.22); }
.lever-sec-icon--crown  { background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.25); }
.lever-sec-icon--purple { background:rgba(167,139,250,0.10); border:1px solid rgba(167,139,250,0.22); }
.lever-sec-icon svg { width:100%; height:100%; }
.lever-sec-num { font-size:9px; color:rgba(255,255,255,0.35); font-weight:700; margin-bottom:1px; }
.lever-sec-title { font-size:12px; font-weight:800; color:#fff; line-height:1.4; }
.lever-sec-en { font-size:9px; color:rgba(255,255,255,0.35); margin-top:2px; }
.lever-body { font-size:10.5px; color:rgba(255,255,255,0.6); line-height:1.65; margin-bottom:10px; }
.lever-level-cards { display:flex; align-items:center; gap:6px; margin-bottom:10px; }
.lever-lvl-card { flex:1; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:10px; text-align:center; }
.lever-lvl-card--gold { background:rgba(245,158,11,0.1); border-color:rgba(245,158,11,0.3); }
.lever-lvl-badge { font-size:9px; font-weight:800; color:rgba(255,255,255,0.5); margin-bottom:3px; }
.lever-lvl-badge--gold { color:#f59e0b; }
.lever-lvl-desc { font-size:9px; color:rgba(255,255,255,0.45); margin-bottom:4px; }
.lever-lvl-pct { font-size:22px; font-weight:900; color:#fff; line-height:1; margin-bottom:3px; }
.lever-lvl-pct--gold { color:#fbbf24; }
.lever-lvl-note { font-size:8.5px; color:rgba(255,255,255,0.35); line-height:1.5; }
.lever-arrow { flex-shrink:0; width:22px; height:22px; }
.lever-arrow svg { width:100%; height:100%; }
.lever-tip { display:flex; align-items:flex-start; gap:7px; background:rgba(251,191,36,0.06); border:1px solid rgba(251,191,36,0.18); border-radius:8px; padding:9px; font-size:10px; color:rgba(255,255,255,0.6); line-height:1.6; }
.lever-tip-icon { width:16px; height:16px; flex-shrink:0; margin-top:1px; }
.lever-tip-label { font-weight:700; color:#fbbf24; }
.lever-network-table { border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); font-size:10px; }
.lever-nt-row { display:grid; grid-template-columns:1fr 1.5fr 1fr; gap:0; }
.lever-nt-row > span { padding:7px 8px; border-bottom:1px solid rgba(255,255,255,0.05); }
.lever-nt-row--head { background:rgba(255,255,255,0.07); font-size:9px; font-weight:700; color:rgba(255,255,255,0.5); }
.lever-nt-row--highlight { background:rgba(245,158,11,0.07); }
.lever-nt-name { font-weight:800; color:#4ade80; }
.lever-nt-note { color:rgba(255,255,255,0.4); }
.lever-nt-val { font-weight:700; color:#fff; text-align:right; }
.lever-agent-card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:10px; margin-bottom:7px; }
.lever-agent-card--gold { background:rgba(245,158,11,0.06); border-color:rgba(245,158,11,0.2); }
.lever-agent-tag { font-size:9px; font-weight:800; color:rgba(255,255,255,0.5); margin-bottom:8px; }
.lever-agent-tag--gold { color:#f59e0b; }
.lever-agent-rows { display:flex; flex-direction:column; gap:4px; }
.lever-agent-row { display:flex; justify-content:space-between; font-size:10.5px; color:rgba(255,255,255,0.6); }
.lever-agent-row--profit { border-top:1px solid rgba(255,255,255,0.07); padding-top:5px; margin-top:3px; }
.lever-sum { color:#60a5fa; font-weight:700; }
.lever-profit { color:#4ade80; font-weight:800; }
.lever-profit--big { font-size:13px; }
.lever-master-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:10px; }
.lever-master-box { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:8px; text-align:center; }
.lever-master-box--total { background:rgba(245,158,11,0.08); border-color:rgba(245,158,11,0.25); }
.lever-master-label { font-size:8px; color:rgba(255,255,255,0.4); margin-bottom:3px; }
.lever-master-val { font-size:16px; font-weight:900; color:#fff; }
.lever-master-sub { font-size:8px; color:rgba(255,255,255,0.3); margin-top:2px; }
.lever-harvest { background:rgba(0,0,0,0.2); border-radius:10px; overflow:hidden; }
.lever-harvest-row { display:flex; justify-content:space-between; padding:8px 12px; font-size:10.5px; color:rgba(255,255,255,0.6); border-bottom:1px solid rgba(255,255,255,0.05); }
.lever-harvest-total { display:flex; align-items:center; gap:6px; padding:10px 12px; background:rgba(245,158,11,0.1); font-size:11px; font-weight:700; color:#fbbf24; }
.lever-fire { width:16px; height:16px; flex-shrink:0; }
.lever-harvest-num { margin-left:auto; font-size:16px; font-weight:900; }
.lever-infinity-quote { background:rgba(167,139,250,0.08); border:1px solid rgba(167,139,250,0.2); border-radius:8px; padding:10px; font-size:11px; color:#c4b5fd; font-style:italic; font-weight:600; line-height:1.6; margin-bottom:10px; }
.lever-loop-row { display:flex; align-items:center; gap:4px; justify-content:center; margin-bottom:10px; flex-wrap:wrap; }
.lever-loop-node { font-size:9.5px; font-weight:700; color:rgba(255,255,255,0.7); background:rgba(167,139,250,0.1); border:1px solid rgba(167,139,250,0.25); border-radius:7px; padding:6px 10px; white-space:nowrap; }
.lever-loop-node--you { background:rgba(74,222,128,0.12); border-color:rgba(74,222,128,0.3); color:#4ade80; }
.lever-loop-arr { width:18px; height:18px; flex-shrink:0; }
/* ══ TEAM TAB STYLES ══ */
.team-period-scroll {
  display: flex;
  overflow-x: auto;
  gap: 6px;
  padding: 8px 0 10px;
}
.team-period-btn {
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: #ccd6f6;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.team-period-btn--active {
  background: rgba(34,197,94,0.18);
  border-color: #22c55e;
  color: #22c55e;
}
.team-period-btn:active { opacity: 0.65; }

.glass-section {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 10px;
}
.glass-section-title {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: #ccd6f6;
  margin-bottom: 12px;
}
.glass-section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.glass-help-btn {
  width: 20px; height: 20px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #ccd6f6;
  font-size: 10px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.team-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  background: rgba(255,255,255,0.08);
  border-radius: 10px;
  overflow: hidden;
}
.team-stat-cell {
  background: rgba(22, 24, 56, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  padding: 10px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 7px;
  min-height: 68px;
}
.team-stat-cell--span2 {
  grid-column: span 2;
}
.team-stat-label {
  font-size: 9.5px;
  color: #ccd6f6;
  line-height: 1.45;
  font-weight: 500;
}
.team-stat-val {
  font-size: 15px;
  font-weight: 800;
  color: #ccd6f6;
  line-height: 1;
}
.team-stat-val--yellow { color: #fbbf24; }
.team-stat-val--green  { color: #22c55e; }
.team-stat-val--red    { color: #f87171; }

/* ── Downline List (Tabs 7, 8, 9) ── */
.dl-list {
  display: flex; flex-direction: column; gap: 8px;
  margin-top: 8px;
}
.dl-empty {
  text-align: center; color: rgba(255,255,255,0.3);
  font-size: 12px; padding: 20px 0;
}
.dl-row {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px; padding: 8px 10px;
}
.dl-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #4f6ef7, #7c3aed);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
.dl-info { flex: 1; min-width: 0; }
.dl-name {
  font-size: 12px; font-weight: 700; color: #ccd6f6;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.dl-meta { font-size: 10px; color: rgba(255,255,255,0.38); margin-top: 2px; }
.dl-badge {
  font-size: 9px; font-weight: 700; padding: 3px 7px;
  border-radius: 20px; flex-shrink: 0;
}
.dl-badge--active   { background: rgba(34,197,94,0.15); color: #22c55e; }
.dl-badge--inactive { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.35); }
.dl-comm-val {
  font-size: 13px; font-weight: 800; color: #fbbf24;
  flex-shrink: 0; text-align: right;
}

/* ── Tab Filter Row (Tabs 4–8) ── */
.tab-filter-row {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.tab-filter-drop { position: relative; flex-shrink: 0; }
.tab-filter-drop-btn {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 8px;
  padding: 7px 10px;
  color: #ccd6f6; font-size: 12px; font-weight: 600;
  cursor: pointer; white-space: nowrap;
}
.tab-filter-caret {
  width: 14px; height: 14px; color: rgba(255,255,255,0.5);
  transition: transform 0.2s; flex-shrink: 0;
}
.tab-filter-caret-up { transform: rotate(180deg); }
.tab-filter-list {
  position: absolute; top: calc(100% + 4px); left: 0; z-index: 50;
  background: #1e2147;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  min-width: 150px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  overflow: hidden;
}
.tab-filter-list-item {
  display: block; width: 100%;
  padding: 11px 16px;
  text-align: left; font-size: 13px; font-weight: 500;
  color: rgba(255,255,255,0.75);
  background: none; border: none;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
}
.tab-filter-list-item:last-child { border-bottom: none; }
.tab-filter-list-item--active { color: #22c55e; font-weight: 700; }
.tab-filter-list-item:active { background: rgba(255,255,255,0.05); }
.tab-filter-search-wrap {
  flex: 1; display: flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 8px;
  padding: 7px 10px;
  transition: border-color 0.15s;
}
.tab-filter-search-wrap:focus-within {
  border-color: #22c55e;
}
.tab-filter-search-icon { color: rgba(255,255,255,0.35); flex-shrink: 0; }
.tab-filter-search {
  flex: 1; background: none; border: none; outline: none;
  color: #ccd6f6; font-size: 12px;
}
.tab-filter-search::placeholder { color: rgba(255,255,255,0.3); }

.lever-final-note { font-size:10px; color:rgba(255,255,255,0.45); text-align:center; font-style:italic; padding-top:4px; }


/* ══ TAB 1: ငါ့ကော်မရှင် ══ */
.cm-info-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  padding: 14px 12px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.cm-info-cell { text-align: center; }
.cm-info-label { font-size: 9px; color: rgba(255,255,255,0.4); margin-bottom: 4px; white-space: nowrap; }
.cm-info-val { font-size: 12px; font-weight: 800; color: #fff; }
.cm-info-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.08); }

.cm-period-wrap { position: relative; padding: 10px 12px 0; }
.cm-period-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  padding: 9px 12px;
  color: #fff;
  font-size: 12px; font-weight: 600;
  cursor: pointer;
}
.cm-period-caret { width: 16px; height: 16px; color: rgba(255,255,255,0.5); transition: transform 0.2s; }
.cm-caret-up { transform: rotate(180deg); }

.cm-drop {
  position: absolute;
  top: calc(100% + 4px); left: 12px; right: 12px;
  background: #252844;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.cm-drop-item {
  display: block; width: 100%;
  padding: 11px 14px;
  text-align: left;
  font-size: 12px; font-weight: 500;
  color: rgba(255,255,255,0.7);
  background: none; border: none;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
}
.cm-drop-item:last-child { border-bottom: none; }
.cm-drop-item--active { color: #22c55e; font-weight: 700; }
.cm-drop-item:active { background: rgba(255,255,255,0.05); }

.cm-custom-range {
  padding: 8px 12px 0;
  display: flex; gap: 8px;
}
.cm-custom-row { flex: 1; display: flex; align-items: center; gap: 6px; }
.cm-custom-label { font-size: 10px; color: rgba(255,255,255,0.4); white-space: nowrap; }
.cm-custom-input {
  flex: 1; padding: 7px 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 7px;
  color: #fff; font-size: 11px;
  width: 100%;
}
.cm-custom-input::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.5); }

.cm-records { padding: 10px 12px 14px; min-height: 180px; }

.cm-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 10px; padding: 40px 0;
  font-size: 12px; color: rgba(255,255,255,0.3);
}

.cm-record-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.cm-record-row:last-child { border-bottom: none; }
.cm-rec-left { display: flex; align-items: center; gap: 8px; }
.cm-rec-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #22c55e;
  flex-shrink: 0;
}
.cm-rec-user { font-size: 11px; font-weight: 700; color: #fff; }
.cm-rec-date { font-size: 9px; color: rgba(255,255,255,0.35); margin-top: 2px; }
.cm-rec-right { text-align: right; }
.cm-rec-amount { font-size: 13px; font-weight: 800; color: #4ade80; }
.cm-rec-turn { font-size: 9px; color: rgba(255,255,255,0.3); margin-top: 2px; }

</style>
