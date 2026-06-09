<template>
  <Teleport to="body">
    <Transition name="wd-slide">
      <div v-if="visible" class="wd-root">

        <!-- HEADER -->
        <header class="wd-header">
          <button @click="close" class="wd-back-btn">
            <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <nav class="wd-tabs">
            <button v-for="(tab, i) in tabs" :key="i"
              class="wd-tab" :class="activeTab === i ? 'wd-tab--active' : ''"
              @click="activeTab = i">{{ tab }}</button>
          </nav>
          <button class="wd-support-btn">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M3 18v-6a9 9 0 0118 0v6" stroke="rgba(255,200,50,0.9)" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v3z" stroke="rgba(255,200,50,0.9)" stroke-width="1.8"/>
            </svg>
          </button>
        </header>

        <!-- ══ TAB 0: ငွေထုတ် ══ -->
        <div v-if="activeTab === 0" class="wd-body">
          <div class="wd-balance-row">
            <span class="wd-balance-label">လက်ကျန်</span>
            <span class="wd-balance-num wd-balance-num--gold">{{ formatBal(balance) }}</span>
            <button class="wd-vip-refresh" :class="{ spinning: balRefreshing }" @click="doBalRefresh">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f5c842" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </button>
          </div>

          <!-- Account row + gear icon -->
          <div class="wd-acct-outer">
            <button class="wd-acct-row wd-acct-row--yellow" @click="activeTab = 1">
              <div class="wd-acct-left">
                <!-- Logo / fallback icon -->
                <div class="wd-acct-logo-wrap">
                  <template v-if="linkedAccount">
                    <img v-if="methodImg(linkedAccount.key)"
                      :src="methodImg(linkedAccount.key)"
                      class="wd-acct-logo-img"
                      @error="e => e.target.style.display='none'"
                      alt=""/>
                    <div v-else class="wd-acct-logo-text" :style="{ background: methodBg(linkedAccount.key) }">
                      {{ methodSymbol(linkedAccount.key) }}
                    </div>
                  </template>
                  <template v-else>
                    <div class="wd-acct-logo-icon">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <rect x="2" y="5" width="20" height="14" rx="2" stroke="rgba(245,200,66,0.9)" stroke-width="1.6"/>
                        <path d="M2 10h20" stroke="rgba(245,200,66,0.9)" stroke-width="1.6"/>
                        <path d="M6 15h4" stroke="rgba(245,200,66,0.55)" stroke-width="1.5" stroke-linecap="round"/>
                        <circle cx="18" cy="15" r="1.5" fill="rgba(245,200,66,0.65)"/>
                      </svg>
                    </div>
                  </template>
                </div>

                <div v-if="linkedAccount" class="wd-acct-info">
                  <span class="wd-acct-display">{{ linkedAccount.label }}({{ maskPhone(linkedAccount.phone) }})</span>
                </div>
                <span v-else class="wd-acct-placeholder">ငွေထုတ်အကောင့်ထည့်ပါ။</span>
              </div>
              <!-- chevron -->
              <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Gear icon (settings) -->
            <button v-if="linkedAccount" class="wd-acct-gear" @click="activeTab = 1">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="14" rx="2" fill="rgba(245,200,66,0.15)" stroke="rgba(245,200,66,0.7)" stroke-width="1.5"/>
                <path d="M3 8h18" stroke="rgba(245,200,66,0.6)" stroke-width="1.3"/>
                <circle cx="9" cy="13" r="1.3" fill="rgba(245,200,66,0.7)"/>
                <path d="M20 18v2M20 21v.01" stroke="rgba(245,200,66,0.8)" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="20" cy="20" r="3" stroke="rgba(245,200,66,0.6)" stroke-width="1.3"/>
              </svg>
            </button>
          </div>

          <div class="wd-section-label">ငွေထုတ်မမာ</div>

          <!-- Amount input with "အားလုံး" button -->
          <div class="wd-amt-wrap wd-amt-wrap--yellow">
            <span class="wd-k-prefix">K</span>
            <input
              v-model.number="amount"
              type="number"
              inputmode="numeric"
              class="wd-amt-input"
              placeholder="အနည်းဆုံး 10000 အများဆုံး 1000000"
              :readonly="!linkedAccount"
              @focus="!linkedAccount ? ($event.target.blur(), activeTab = 1) : null"
            />
            <button v-if="linkedAccount && balance > 0" class="wd-amt-all-btn" @click.stop="amount = balance">
              အားလုံး
            </button>
            <!-- Transparent overlay tap target when no account -->
            <div v-if="!linkedAccount" class="wd-amt-tap-overlay" @click="activeTab = 1"></div>
          </div>

          <p v-if="error" class="wd-error">{{ error }}</p>

          <!-- Submit button — directly below input, not fixed to bottom -->
          <div class="wd-cta-wrap wd-cta-wrap--inline">
            <button
              class="wd-submit-btn"
              :class="canSubmit ? 'wd-submit-btn--active' : 'wd-submit-btn--disabled'"
              :disabled="!canSubmit"
              @click="submitWithdraw">
              ငွေထုတ်ကြောင်း အတည်ပြုပါ။
            </button>
          </div>

          <div style="flex:1;"></div>
        </div>

        <!-- ══ TAB 1: ငွေထုတ်အကောင့် ချိတ်ရန် ══ -->
        <div v-else-if="activeTab === 1" class="wd-body">
          <div class="wd-link-header">
            <span class="wd-link-title">ငွေထုတ်အကောင့် ချိတ်ရန်
              <span class="wd-link-count">({{ linkedAccount ? 1 : 0 }}/6)</span>
            </span>
            <button class="wd-vip-refresh" :class="{ spinning: linkRefreshing }" @click="doLinkRefresh">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </button>
          </div>

          <!-- Linked account card shown at top (same row style) -->
          <div v-if="linkedAccount" class="wd-method-row wd-method-row--linked">
            <div class="wd-method-left">
              <div class="wd-method-logo">
                <img v-if="methodImg(linkedAccount.key)"
                  :src="methodImg(linkedAccount.key)"
                  style="width:36px;height:36px;object-fit:cover;border-radius:7px;" alt=""/>
                <div v-else :style="{background: methodBg(linkedAccount.key), width:'36px', height:'36px', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center'}">
                  <span style="color:#fff;font-size:13px;font-weight:900;">{{ methodSymbol(linkedAccount.key) }}</span>
                </div>
              </div>
              <div class="wd-method-info">
                <div class="wd-method-badge wd-method-badge--ok">ချိတ်ဆက်ပြီး</div>
                <div class="wd-method-name">{{ linkedAccount.label }}({{ maskPhone(linkedAccount.phone) }})</div>
              </div>
            </div>
            <svg width="14" height="14" fill="none" stroke="rgba(245,200,66,0.6)" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>

          <!-- KBZ Pay -->
          <button class="wd-method-row"
            @click="linkedAccount?.key !== 'kpay' && openLinkForm('kpay')">
            <div class="wd-method-left">
              <div class="wd-method-logo">
                <img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-27-327_mark.via.gp_1780510112167edit.jpg?tr=f-auto" style="width:36px;height:36px;object-fit:cover;border-radius:7px;" alt="KBZ"/>
              </div>
              <div class="wd-method-info">
                <div :class="linkedAccount?.key === 'kpay' ? 'wd-method-badge wd-method-badge--ok' : 'wd-method-badge'">
                  {{ linkedAccount?.key === 'kpay' ? 'ချိတ်ဆက်ပြီး' : 'ငွေထုတ်မပါဝင်နိုင်ပါ' }}
                </div>
                <div class="wd-method-name">KBZPay</div>
              </div>
            </div>
            <div class="wd-method-link">
              {{ linkedAccount?.key === 'kpay' ? '' : 'ချိတ်သက်ရန်' }}
              <svg v-if="linkedAccount?.key !== 'kpay'" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>

          <!-- Wave Money -->
          <button class="wd-method-row"
            @click="linkedAccount?.key !== 'wave' && openLinkForm('wave')">
            <div class="wd-method-left">
              <div class="wd-method-logo">
                <img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-34-166_mark.via.gp_1780510124725edit.jpg?tr=f-auto" style="width:36px;height:36px;object-fit:cover;border-radius:7px;" alt="Wave"/>
              </div>
              <div class="wd-method-info">
                <div :class="linkedAccount?.key === 'wave' ? 'wd-method-badge wd-method-badge--ok' : 'wd-method-badge'">
                  {{ linkedAccount?.key === 'wave' ? 'ချိတ်ဆက်ပြီး' : 'ငွေထုတ်မပါဝင်နိုင်ပါ' }}
                </div>
                <div class="wd-method-name">Wave Money</div>
              </div>
            </div>
            <div class="wd-method-link">
              {{ linkedAccount?.key === 'wave' ? '' : 'ချိတ်သက်ရန်' }}
              <svg v-if="linkedAccount?.key !== 'wave'" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>

          <!-- USDT (real image from deposit modal) -->
          <button class="wd-method-row"
            @click="linkedAccount?.key !== 'usdt' && openLinkForm('usdt')">
            <div class="wd-method-left">
              <div class="wd-method-logo">
                <img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/61e20ad43bafe0ca2b7ada87f1792a4c.jpg?tr=f-auto"
                  style="width:36px;height:36px;object-fit:cover;border-radius:7px;" alt="USDT"
                  @error="e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }"/>
                <div style="display:none;background:#1ba27a;width:36px;height:36px;border-radius:7px;align-items:center;justify-content:center;">
                  <span style="color:#fff;font-size:14px;font-weight:900;">₮</span>
                </div>
              </div>
              <div class="wd-method-info">
                <div :class="linkedAccount?.key === 'usdt' ? 'wd-method-badge wd-method-badge--ok' : 'wd-method-badge'">
                  {{ linkedAccount?.key === 'usdt' ? 'ချိတ်ဆက်ပြီး' : 'ငွေထုတ်မပါဝင်နိုင်ပါ' }}
                </div>
                <div class="wd-method-name">USDT (TRC20)</div>
              </div>
            </div>
            <div class="wd-method-link">
              {{ linkedAccount?.key === 'usdt' ? '' : 'ချိတ်သက်ရန်' }}
              <svg v-if="linkedAccount?.key !== 'usdt'" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>

          <!-- UAB Pay — coming soon notice -->
          <button class="wd-method-row wd-method-row--soon" @click="showUabNotice">
            <div class="wd-method-left">
              <div class="wd-method-logo" style="background:#c0392b;display:flex;align-items:center;justify-content:center;border-radius:7px;">
                <span style="color:#fff;font-size:9px;font-weight:900;letter-spacing:0.5px;line-height:1;">UAB</span>
              </div>
              <div class="wd-method-info">
                <div class="wd-method-badge">ငွေထုတ်မပါဝင်နိုင်ပါ</div>
                <div class="wd-method-name">UAB Pay</div>
              </div>
            </div>
            <div class="wd-method-link" style="color:rgba(255,255,255,0.3);">
              ချိတ်သက်ရန်
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>

          <!-- UAB Notice Toast -->
          <Transition name="wd-toast">
            <div v-if="uabNoticeVisible" class="wd-uab-toast">
              <svg width="14" height="14" fill="none" stroke="#f5c842" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
              </svg>
              လတ်တလောမရနိုင်သေးပါ
            </div>
          </Transition>
        </div>

        <!-- ══ TAB 2: ငွေထုတ်မှတ်တမ်း ══ -->
        <div v-else-if="activeTab === 2" class="wd-body" @click="showStatusDropdown = false">

          <div class="wd-hist-filters">
            <div class="wd-filter-group">
              <!-- Date filter -->
              <button class="wd-filter-btn" :class="showDatePicker ? 'wd-filter-btn--open' : ''"
                @click.stop="showDatePicker = !showDatePicker; showStatusDropdown = false">
                ဒိန်း
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="showDatePicker ? 'M19 15l-7-7-7 7' : 'M19 9l-7 7-7-7'"/>
                </svg>
              </button>

              <!-- Status filter -->
              <div class="wd-filter-dropdown-wrap" @click.stop>
                <button class="wd-filter-btn" :class="showStatusDropdown ? 'wd-filter-btn--open' : ''"
                  @click.stop="showStatusDropdown = !showStatusDropdown; showDatePicker = false">
                  {{ selectedStatus.length > 10 ? selectedStatus.slice(0,10)+'…' : selectedStatus }}
                  <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="showStatusDropdown ? 'M19 15l-7-7-7 7' : 'M19 9l-7 7-7-7'"/>
                  </svg>
                </button>
                <Transition name="wd-drop">
                  <div v-if="showStatusDropdown" class="wd-status-dropdown">
                    <button v-for="opt in statusOptions" :key="opt"
                      class="wd-status-opt"
                      :class="selectedStatus === opt ? 'wd-status-opt--active' : ''"
                      @click.stop="selectedStatus = opt; showStatusDropdown = false">
                      {{ opt }}
                    </button>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="wd-hist-bal">
              <span class="wd-hist-bal-label">ရပ်သည်မး</span>
              <span class="wd-hist-bal-num">K{{ formatBal(balance) }}</span>
              <button class="wd-vip-refresh" :class="{ spinning: histRefreshing }" @click="doHistRefresh">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Date Picker Popup -->
          <Transition name="wd-drop">
            <div v-if="showDatePicker" class="wd-datepicker" @click.stop>
              <!-- ဒိန်း / မနေ tabs -->
              <div class="dp-tabs">
                <button class="dp-tab" :class="datePickerTab === 0 ? 'dp-tab--active' : ''" @click="datePickerTab = 0">ဒိန်း</button>
                <button class="dp-tab" :class="datePickerTab === 1 ? 'dp-tab--active' : ''" @click="datePickerTab = 1">မနေ</button>
              </div>

              <div class="dp-custom-label">စီတကြြဲက်လုပ်ပါ</div>

              <!-- Drum columns row -->
              <div class="dp-drums-row">
                <!-- Start Date -->
                <div class="dp-date-group">
                  <div class="dp-col-label">စတင်ရက်</div>
                  <div class="dp-drums">
                    <div class="dp-col">
                      <div class="dp-track" :ref="el => drumEls.sY = el" @scroll.passive="e => onDrumScroll(e, years, v => startYear = v)">
                        <div class="dp-spacer"></div>
                        <div v-for="y in years" :key="y" class="dp-item" :class="startYear === y ? 'dp-item--sel' : ''">{{ y }}</div>
                        <div class="dp-spacer"></div>
                      </div>
                    </div>
                    <div class="dp-col">
                      <div class="dp-track" :ref="el => drumEls.sM = el" @scroll.passive="e => onDrumScroll(e, months, v => startMonth = v)">
                        <div class="dp-spacer"></div>
                        <div v-for="m in months" :key="m" class="dp-item" :class="startMonth === m ? 'dp-item--sel' : ''">{{ pad(m) }}</div>
                        <div class="dp-spacer"></div>
                      </div>
                    </div>
                    <div class="dp-col">
                      <div class="dp-track" :ref="el => drumEls.sD = el" @scroll.passive="e => onDrumScroll(e, days, v => startDay = v)">
                        <div class="dp-spacer"></div>
                        <div v-for="d in days" :key="d" class="dp-item" :class="startDay === d ? 'dp-item--sel' : ''">{{ pad(d) }}</div>
                        <div class="dp-spacer"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="dp-divider"></div>

                <!-- End Date -->
                <div class="dp-date-group">
                  <div class="dp-col-label">ပြီးဆုံးရက်</div>
                  <div class="dp-drums">
                    <div class="dp-col">
                      <div class="dp-track" :ref="el => drumEls.eY = el" @scroll.passive="e => onDrumScroll(e, years, v => endYear = v)">
                        <div class="dp-spacer"></div>
                        <div v-for="y in years" :key="y" class="dp-item" :class="endYear === y ? 'dp-item--sel' : ''">{{ y }}</div>
                        <div class="dp-spacer"></div>
                      </div>
                    </div>
                    <div class="dp-col">
                      <div class="dp-track" :ref="el => drumEls.eM = el" @scroll.passive="e => onDrumScroll(e, months, v => endMonth = v)">
                        <div class="dp-spacer"></div>
                        <div v-for="m in months" :key="m" class="dp-item" :class="endMonth === m ? 'dp-item--sel' : ''">{{ pad(m) }}</div>
                        <div class="dp-spacer"></div>
                      </div>
                    </div>
                    <div class="dp-col">
                      <div class="dp-track" :ref="el => drumEls.eD = el" @scroll.passive="e => onDrumScroll(e, days, v => endDay = v)">
                        <div class="dp-spacer"></div>
                        <div v-for="d in days" :key="d" class="dp-item" :class="endDay === d ? 'dp-item--sel' : ''">{{ pad(d) }}</div>
                        <div class="dp-spacer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Selection highlight bar -->
              <div class="dp-highlight-overlay"></div>

              <!-- Buttons -->
              <div class="dp-actions">
                <button class="dp-cancel-btn" @click="showDatePicker = false">မလုပ်တော့</button>
                <button class="dp-confirm-btn" @click="confirmDate">အတည်ပြု</button>
              </div>
            </div>
          </Transition>

          <!-- Empty State -->
          <div class="wd-empty">
            <div class="wd-empty-icon">
              <svg width="72" height="72" fill="none" viewBox="0 0 90 90">
                <rect x="10" y="30" width="60" height="48" rx="7" fill="rgba(100,110,200,0.3)" stroke="rgba(140,150,220,0.25)" stroke-width="1.5"/>
                <rect x="20" y="40" width="20" height="3" rx="1.5" fill="rgba(140,150,220,0.3)"/>
                <rect x="20" y="48" width="30" height="3" rx="1.5" fill="rgba(140,150,220,0.2)"/>
                <rect x="20" y="56" width="25" height="3" rx="1.5" fill="rgba(140,150,220,0.15)"/>
                <path d="M55 18 L70 30 L60 32 L50 22 Z" fill="rgba(150,160,220,0.55)"/>
                <path d="M70 30 L67 20 L55 18" fill="rgba(130,140,210,0.65)"/>
                <line x1="63" y1="25" x2="53" y2="37" stroke="rgba(190,200,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <p class="wd-empty-text">
              ဒိန်း မှတ်တမ်းမရှိပါ။
              <span class="wd-empty-link" @click="activeTab = 0">ဝိုကြည်</span>
            </p>
          </div>
        </div>

        <!-- ══ LINK ACCOUNT SHEET ══ -->
        <Transition name="wd-sheet">
          <div v-if="showLinkForm" class="wd-link-overlay" @click.self="showLinkForm = false">
            <div class="wd-link-sheet">
              <div class="wd-link-sheet-header">
                <span class="wd-link-sheet-title">{{ methodLabel(linkFormData.key) }} ချိတ်ရန်</span>
                <button @click="showLinkForm = false" class="wd-link-close">
                  <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <label class="wd-field-label">{{ linkFormData.key === 'usdt' ? 'Wallet Address' : 'ဖုန်းနံပါတ်' }}</label>
              <input v-model="linkFormData.phone" :type="linkFormData.key === 'usdt' ? 'text' : 'tel'"
                :placeholder="linkFormData.key === 'usdt' ? 'T...' : '09xxxxxxxxx'"
                class="wd-field-input" :inputmode="linkFormData.key === 'usdt' ? 'text' : 'numeric'"/>
              <label class="wd-field-label" style="margin-top:12px;">အကောင့်ရှင်အမည်</label>
              <input v-model="linkFormData.name" type="text" placeholder="အမည်အပြည့်အစုံ" class="wd-field-input"/>
              <p v-if="linkError" class="wd-error" style="margin-top:8px;">{{ linkError }}</p>
              <button class="wd-link-confirm-btn" @click="confirmLink">ချိတ်ဆက်မည်</button>
            </div>
          </div>
        </Transition>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch, computed, nextTick, onMounted } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  balance: { type: Number, default: 0 },
  initialTab: { type: Number, default: 0 }
})
const emit = defineEmits(['update:modelValue', 'submit', 'refresh'])

const visible     = ref(props.modelValue)
const activeTab   = ref(props.initialTab)

watch(() => props.modelValue, (v) => {
  visible.value = v
  if (v) activeTab.value = props.initialTab
})
const amount      = ref(null)
const error       = ref('')

const tabs = ['ငွေထုတ်', 'ငွေထုတ်အကောင့် ချိတ်ရန်', 'ငွေထုတ်မှတ်တမ်း']

// Linked account
const linkedAccount = ref(null)

// Persist linked account — load on mount, save on link
const LINKED_KEY = 'iw99_linked_account'
onMounted(() => {
  const saved = localStorage.getItem(LINKED_KEY)
  if (saved) { try { linkedAccount.value = JSON.parse(saved) } catch {} }
})

// Link form
const showLinkForm = ref(false)
const linkFormData = reactive({ key: '', phone: '', name: '' })
const linkError    = ref('')

// Refresh states
const balRefreshing  = ref(false)
const linkRefreshing = ref(false)
const histRefreshing = ref(false)

// UAB coming-soon toast
const uabNoticeVisible = ref(false)
let uabTimer = null

// History tab
const showStatusDropdown = ref(false)
const selectedStatus     = ref('ဖော်ပြချက်အားလုံး')
const statusOptions = [
  'ဖော်ပြချက်အားလုံး',
  'ထုတ်ပေးရတော',
  'ငွေထုတ်ပယ်ချမြင်း',
  'ငွေထုတ်ရန် ငြင်းဆန်သည်',
  'ငွေထုတ်ကြောင်းအောင်မြင်'
]

// Date picker
const showDatePicker  = ref(false)
const datePickerTab   = ref(0)
const now             = new Date()
const ITEM_H          = 40

const years  = Array.from({ length: 6 }, (_, i) => now.getFullYear() - 2 + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days   = Array.from({ length: 31 }, (_, i) => i + 1)

let startYear  = now.getFullYear()
let startMonth = now.getMonth() + 1
let startDay   = now.getDate()
let endYear    = now.getFullYear()
let endMonth   = now.getMonth() + 1
let endDay     = now.getDate()

const drumEls = reactive({ sY: null, sM: null, sD: null, eY: null, eM: null, eD: null })

watch(showDatePicker, (open) => {
  if (open) nextTick(initDrums)
})

function initDrums() {
  setScroll(drumEls.sY, years, startYear)
  setScroll(drumEls.sM, months, startMonth)
  setScroll(drumEls.sD, days, startDay)
  setScroll(drumEls.eY, years, endYear)
  setScroll(drumEls.eM, months, endMonth)
  setScroll(drumEls.eD, days, endDay)
}
function setScroll(el, arr, val) {
  if (!el) return
  const idx = arr.indexOf(val)
  if (idx >= 0) el.scrollTop = idx * ITEM_H
}
function onDrumScroll(e, arr, setter) {
  const idx = Math.round(e.target.scrollTop / ITEM_H)
  if (idx >= 0 && idx < arr.length) setter(arr[idx])
}
function pad(n) { return String(n).padStart(2, '0') }
function confirmDate() { showDatePicker.value = false }

// Computed
const canSubmit = computed(() =>
  linkedAccount.value && amount.value > 0 && amount.value <= props.balance
)

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) { activeTab.value = 0; amount.value = null; error.value = '' }
})

function formatBal(n) {
  return Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function close() { emit('update:modelValue', false) }

function methodLabel(key) {
  return { kpay: 'KBZPay', wave: 'Wave Money', usdt: 'USDT', uab: 'UAB Pay' }[key] || key
}
function maskPhone(phone) {
  if (!phone) return ''
  if (phone.length <= 4) return phone
  return '****' + phone.slice(-4)
}
function methodImg(key) {
  const imgs = {
    kpay: 'https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-27-327_mark.via.gp_1780510112167edit.jpg?tr=f-auto',
    wave: 'https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-34-166_mark.via.gp_1780510124725edit.jpg?tr=f-auto',
    usdt: 'https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/61e20ad43bafe0ca2b7ada87f1792a4c.jpg?tr=f-auto'
  }
  return imgs[key] || null
}
function methodBg(key) {
  return { usdt: '#1ba27a', uab: '#c0392b' }[key] || '#3d4187'
}
function methodSymbol(key) {
  return { usdt: '₮', uab: 'UAB' }[key] || '?'
}

function openLinkForm(key) {
  linkFormData.key   = key
  linkFormData.phone = ''
  linkFormData.name  = ''
  linkError.value    = ''
  showLinkForm.value = true
}

function confirmLink() {
  const p = linkFormData.phone.trim()
  const n = linkFormData.name.trim()
  if (!p) { linkError.value = 'ဖုန်းနံပါတ် / Address ထည့်ပါ'; return }
  if (linkFormData.key !== 'usdt' && p.length < 9) { linkError.value = 'ဖုန်းနံပါတ် မှန်ကန်အောင် ထည့်ပါ'; return }
  if (!n) { linkError.value = 'အမည် ထည့်ပါ'; return }
  linkedAccount.value = { key: linkFormData.key, label: methodLabel(linkFormData.key), phone: p, name: n }
  localStorage.setItem(LINKED_KEY, JSON.stringify(linkedAccount.value))
  showLinkForm.value  = false
  activeTab.value     = 0
}

function submitWithdraw() {
  if (!canSubmit.value) return
  emit('submit', {
    method:      linkedAccount.value.key,
    phone:       linkedAccount.value.phone,
    accountName: linkedAccount.value.name,
    amount:      amount.value
  })
  close()
}

function doBalRefresh()  { spin(balRefreshing);  emit('refresh') }
function doLinkRefresh() { spin(linkRefreshing) }
function doHistRefresh() { spin(histRefreshing) }
function spin(r) { r.value = true; setTimeout(() => r.value = false, 800) }

function showUabNotice() {
  uabNoticeVisible.value = true
  clearTimeout(uabTimer)
  uabTimer = setTimeout(() => { uabNoticeVisible.value = false }, 2500)
}
</script>

<style scoped>
/* ── Root ── */
.wd-root {
  position: fixed; inset: 0; z-index: 9998;
  background: #3d4187;
  display: flex; flex-direction: column;
  overflow: hidden;
  height: 100vh; height: 100dvh;
}

/* ── Header ── */
.wd-header {
  display: flex; align-items: center;
  padding: 0 12px; height: 50px; flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.wd-back-btn, .wd-support-btn {
  width: 34px; height: 34px; border: none; background: none;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; -webkit-tap-highlight-color: transparent;
}
.wd-tabs {
  flex: 1; display: flex; overflow-x: auto;
  -ms-overflow-style: none; scrollbar-width: none;
}
.wd-tabs::-webkit-scrollbar { display: none; }
.wd-tab {
  border: none; background: none; cursor: pointer;
  font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.45);
  padding: 0 10px; height: 50px; white-space: nowrap;
  position: relative; flex-shrink: 0;
  -webkit-tap-highlight-color: transparent; transition: color 0.15s;
}
.wd-tab--active { color: #f5c842; }
.wd-tab--active::after {
  content: ''; position: absolute; bottom: 0; left: 10px; right: 10px;
  height: 2.5px; background: #f5c842; border-radius: 2px 2px 0 0;
}

/* ── Body ── */
.wd-body {
  flex: 1; display: flex; flex-direction: column;
  overflow-y: auto; -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* ── Refresh button (PromotionsPage style) ── */
.wd-vip-refresh {
  background: none; border: none; padding: 3px;
  cursor: pointer; display: flex; align-items: center;
  border-radius: 50%; transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.wd-vip-refresh:active { background: rgba(255,255,255,0.08); }
.wd-vip-refresh.spinning svg { animation: wd-spin 0.7s linear infinite; }
@keyframes wd-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ── TAB 0 ── */
.wd-balance-row {
  display: flex; align-items: center; gap: 6px;
  padding: 14px 16px 10px;
}
.wd-balance-label { font-size: 12px; color: rgba(255,255,255,0.55); }
.wd-balance-num { font-size: 15px; font-weight: 800; color: #fff; }
.wd-balance-num--gold { color: #f5c842; }

/* Account outer (row + gear side by side) */
.wd-acct-outer {
  display: flex; align-items: center; gap: 8px;
  margin: 6px 14px 14px;
}
.wd-acct-row {
  flex: 1; display: flex; align-items: center; justify-content: space-between;
  padding: 11px 12px;
  background: #313478; border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px; cursor: pointer; -webkit-tap-highlight-color: transparent;
  transition: background 0.12s; min-width: 0;
}
.wd-acct-row--yellow { border-color: rgba(245,200,66,0.3); }
.wd-acct-row:active { background: #2a2d6a; }
.wd-acct-left { display: flex; align-items: center; gap: 10px; min-width: 0; }

/* Logo area */
.wd-acct-logo-wrap { width: 36px; height: 36px; flex-shrink: 0; }
.wd-acct-logo-img { width: 36px; height: 36px; object-fit: cover; border-radius: 7px; display: block; }
.wd-acct-logo-text {
  width: 36px; height: 36px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 900; color: #fff;
}
.wd-acct-logo-icon {
  width: 36px; height: 36px; border-radius: 8px;
  background: rgba(245,200,66,0.12);
  display: flex; align-items: center; justify-content: center;
}

.wd-acct-info { display: flex; flex-direction: column; min-width: 0; }
.wd-acct-display {
  font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.92);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.wd-acct-placeholder { font-size: 12px; color: rgba(255,255,255,0.45); }

/* Gear settings button */
.wd-acct-gear {
  width: 44px; height: 44px; flex-shrink: 0;
  background: #313478; border: 1px solid rgba(245,200,66,0.3);
  border-radius: 10px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  -webkit-tap-highlight-color: transparent; transition: background 0.12s;
}
.wd-acct-gear:active { background: #2a2d6a; }

.wd-section-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.65); padding: 0 16px 6px; }

.wd-amt-wrap { position: relative; margin: 0 14px; }
.wd-amt-wrap--yellow {
  border: 1px solid rgba(245,200,66,0.3);
  border-radius: 10px;
}
.wd-amt-wrap--yellow .wd-amt-input {
  border: none;
}
.wd-k-prefix {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  font-size: 12px; font-weight: 800; color: rgba(255,255,255,0.5);
  pointer-events: none; z-index: 1;
}
.wd-amt-input {
  width: 100%; box-sizing: border-box; padding: 13px 60px 13px 28px;
  background: #313478; border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px; font-size: 14px; font-weight: 700; color: #fff;
  outline: none; caret-color: #f5c842; -webkit-appearance: none;
  transition: border-color 0.15s;
}
.wd-amt-input::placeholder { color: rgba(255,255,255,0.22); font-size: 11px; font-weight: 400; }
.wd-amt-input:focus { border-color: rgba(245,200,66,0.5); }
.wd-amt-input:disabled { opacity: 0.55; cursor: pointer; }
.wd-amt-input::-webkit-outer-spin-button,
.wd-amt-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.wd-amt-input[type=number] { -moz-appearance: textfield; }

/* "အားလုံး" max button */
.wd-amt-all-btn {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: rgba(245,200,66,0.15); border: 1px solid rgba(245,200,66,0.35);
  border-radius: 6px; padding: 4px 8px;
  font-size: 10px; font-weight: 700; color: #f5c842;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
}
.wd-amt-all-btn:active { background: rgba(245,200,66,0.25); }

/* Full-cover tap overlay when no account linked */
.wd-amt-tap-overlay {
  position: absolute; inset: 0; z-index: 2;
  border-radius: 10px; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.wd-error { font-size: 11px; color: #f87171; padding: 6px 16px 0; margin: 0; }

/* ── Submit Button (thin, gold, inline below input) ── */
.wd-cta-wrap {
  padding: 20px 14px calc(20px + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;
}
.wd-cta-wrap--inline {
  padding: 14px 14px 0;
}
.wd-submit-btn {
  width: 100%; border: none; border-radius: 10px; padding: 15px;
  font-size: 14px; font-weight: 800; cursor: pointer;
  letter-spacing: 0.03em;
  transition: transform 0.08s, box-shadow 0.08s;
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.wd-submit-btn--active {
  background: #f5c842; color: #1e1f5c;
  box-shadow: 0 3px 0 #a8860d, 0 6px 16px rgba(0,0,0,0.4);
}
.wd-submit-btn--active:active {
  transform: translateY(3px);
  box-shadow: 0 0 0 #a8860d, 0 2px 8px rgba(0,0,0,0.3);
}
.wd-submit-btn--disabled {
  background: rgba(245,200,66,0.13); color: rgba(245,200,66,0.45);
  border: 1px solid rgba(245,200,66,0.22);
  box-shadow: 0 2px 0 rgba(168,134,13,0.2);
  cursor: not-allowed;
}

/* ── TAB 1 ── */
.wd-link-header {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 16px 12px; border-bottom: 1px solid rgba(255,255,255,0.07);
}
.wd-link-title { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8); flex: 1; }
.wd-link-count { font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 600; }

.wd-method-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
  background: none; border-left: none; border-right: none; border-top: none;
  width: 100%; cursor: pointer; -webkit-tap-highlight-color: transparent;
  transition: background 0.12s;
}
.wd-method-row:active { background: rgba(255,255,255,0.04); }
/* Linked card at top — same row style with yellow left accent */
.wd-method-row--linked {
  background: rgba(245,200,66,0.06);
  border-left: 3px solid rgba(245,200,66,0.5) !important;
  border-bottom: 1px solid rgba(245,200,66,0.15) !important;
  cursor: default;
}
.wd-method-row--linked:active { background: rgba(245,200,66,0.06); }
/* Coming-soon row dimmed */
.wd-method-row--soon { opacity: 0.65; }
.wd-method-left { display: flex; align-items: center; gap: 12px; }
.wd-method-logo { width: 36px; height: 36px; border-radius: 7px; overflow: hidden; flex-shrink: 0; }
.wd-method-info { display: flex; flex-direction: column; gap: 3px; align-items: flex-start; }
.wd-method-badge {
  font-size: 9px; font-weight: 700; color: #fff;
  background: #e53e3e; padding: 2px 7px; border-radius: 4px; line-height: 1.5;
}
.wd-method-badge--ok { background: #22c55e; }
.wd-method-name { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.9); }
.wd-method-link { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 700; color: #f5c842; }

/* UAB coming-soon toast */
.wd-uab-toast {
  position: fixed; bottom: calc(90px + env(safe-area-inset-bottom, 0px));
  left: 50%; transform: translateX(-50%);
  background: #1e1f5c; border: 1px solid rgba(245,200,66,0.45);
  color: #f5c842; font-size: 12px; font-weight: 700;
  padding: 10px 18px; border-radius: 20px;
  display: flex; align-items: center; gap: 7px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  z-index: 9999; white-space: nowrap;
}
.wd-toast-enter-active, .wd-toast-leave-active { transition: opacity 0.25s, transform 0.25s; }
.wd-toast-enter-from { opacity: 0; transform: translateX(-50%) translateY(12px); }
.wd-toast-leave-to  { opacity: 0; transform: translateX(-50%) translateY(12px); }

/* ── TAB 2 ── */
.wd-hist-filters {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.07);
  position: relative; z-index: 10; flex-shrink: 0;
}
.wd-filter-group { display: flex; gap: 8px; align-items: center; }
.wd-filter-dropdown-wrap { position: relative; }
.wd-filter-btn {
  display: flex; align-items: center; gap: 4px;
  padding: 6px 12px; border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.18); background: #313478;
  color: rgba(255,255,255,0.75); font-size: 11px; font-weight: 600;
  cursor: pointer; -webkit-tap-highlight-color: transparent; white-space: nowrap;
}
.wd-filter-btn--open { border-color: #f5c842; color: #f5c842; }

/* Status Dropdown */
.wd-status-dropdown {
  position: absolute; top: calc(100% + 6px); left: 0;
  background: #2e3480; border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px; overflow: hidden; z-index: 100;
  min-width: 180px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
}
.wd-status-opt {
  display: block; width: 100%; text-align: left;
  padding: 11px 14px; background: none; border: none;
  color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 600;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.1s;
}
.wd-status-opt:last-child { border-bottom: none; }
.wd-status-opt:active { background: rgba(255,255,255,0.05); }
.wd-status-opt--active { color: #f5c842; }

.wd-hist-bal { display: flex; align-items: center; gap: 4px; }
.wd-hist-bal-label { font-size: 10px; color: rgba(255,255,255,0.45); }
.wd-hist-bal-num { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.8); }

/* ── Date Picker ── */
.wd-datepicker {
  background: #2e3480; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0 0 12px 12px; padding: 12px 14px 14px;
  flex-shrink: 0; overflow: hidden;
}
.dp-tabs {
  display: flex; gap: 8px; margin-bottom: 10px;
}
.dp-tab {
  padding: 6px 18px; border-radius: 8px; border: 1.5px solid rgba(255,255,255,0.2);
  background: none; color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 700;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
}
.dp-tab--active { border-color: #f5c842; color: #f5c842; }

.dp-custom-label { font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 8px; }

.dp-drums-row {
  display: flex; align-items: flex-start; gap: 6px;
  position: relative;
}
.dp-date-group { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.dp-col-label { font-size: 10px; color: rgba(255,255,255,0.45); text-align: center; font-weight: 700; }
.dp-drums { display: flex; gap: 2px; }
.dp-col { flex: 1; position: relative; }
.dp-divider { width: 1px; background: rgba(255,255,255,0.1); margin: 18px 0; align-self: stretch; }

.dp-track {
  height: 120px; overflow-y: scroll; scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch; scrollbar-width: none;
  position: relative;
}
.dp-track::-webkit-scrollbar { display: none; }
.dp-spacer { height: 40px; flex-shrink: 0; }
.dp-item {
  height: 40px; scroll-snap-align: center;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.3);
  transition: color 0.1s;
}
.dp-item--sel { color: #fff; font-weight: 800; }

/* Center highlight */
.dp-drums-row::after {
  content: ''; pointer-events: none;
  position: absolute; top: 26px; left: 0; right: 0;
  height: 40px; margin-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.18);
  border-bottom: 1px solid rgba(255,255,255,0.18);
}

.dp-actions { display: flex; gap: 10px; margin-top: 12px; }
.dp-cancel-btn {
  flex: 1; padding: 12px; border-radius: 9px;
  border: 1.5px solid #f5c842; background: none;
  color: #f5c842; font-size: 13px; font-weight: 800;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
}
.dp-confirm-btn {
  flex: 1; padding: 12px; border-radius: 9px; border: none;
  background: #f5c842; color: #1e1f5c;
  font-size: 13px; font-weight: 800; cursor: pointer;
  box-shadow: 0 3px 0 #a8860d;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.08s, box-shadow 0.08s;
}
.dp-confirm-btn:active { transform: translateY(3px); box-shadow: 0 0 0 #a8860d; }

/* ── Empty State ── */
.wd-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px; padding: 40px 20px;
}
.wd-empty-icon { opacity: 0.5; }
.wd-empty-text { font-size: 13px; color: rgba(255,255,255,0.4); margin: 0; text-align: center; }
.wd-empty-link { color: #f5c842; cursor: pointer; font-weight: 700; margin-left: 4px; }

/* ── Link Sheet ── */
.wd-link-overlay {
  position: absolute; inset: 0; z-index: 10;
  background: rgba(0,0,0,0.6);
  display: flex; align-items: flex-end; justify-content: center;
}
.wd-link-sheet {
  width: 100%; max-width: 480px; background: #2e3375;
  border-radius: 20px 20px 0 0;
  padding: 20px 18px calc(24px + env(safe-area-inset-bottom, 0px));
  display: flex; flex-direction: column;
}
.wd-link-sheet-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.wd-link-sheet-title { font-size: 14px; font-weight: 800; color: #fff; }
.wd-link-close {
  width: 28px; height: 28px; border: none; background: rgba(255,255,255,0.08);
  border-radius: 7px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.wd-field-label {
  font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.5);
  margin-bottom: 6px; display: block; text-transform: uppercase; letter-spacing: 0.04em;
}
.wd-field-input {
  width: 100%; box-sizing: border-box; padding: 12px 14px;
  background: #252870; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; font-size: 13px; color: #fff; outline: none;
  caret-color: #f5c842; transition: border-color 0.15s;
}
.wd-field-input:focus { border-color: rgba(245,200,66,0.5); }
.wd-field-input::placeholder { color: rgba(255,255,255,0.22); }

.wd-link-confirm-btn {
  margin-top: 20px; width: 100%; padding: 14px; border: none; border-radius: 10px;
  font-size: 14px; font-weight: 800; color: #1e1f5c; background: #f5c842;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  box-shadow: 0 3px 0 #a8860d, 0 6px 16px rgba(0,0,0,0.4);
  transition: transform 0.08s, box-shadow 0.08s;
}
.wd-link-confirm-btn:active { transform: translateY(3px); box-shadow: 0 0 0 #a8860d, 0 2px 8px rgba(0,0,0,0.3); }

/* ── Transitions ── */
.wd-slide-enter-active { animation: wd-in 0.28s cubic-bezier(0.22,1,0.36,1); }
.wd-slide-leave-active { animation: wd-in 0.18s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes wd-in { from { transform: translateY(100%); } to { transform: translateY(0); } }

.wd-sheet-enter-active { animation: wd-sheet-in 0.22s cubic-bezier(0.22,1,0.36,1); }
.wd-sheet-leave-active { animation: wd-sheet-in 0.15s ease-in reverse; }
@keyframes wd-sheet-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

.wd-drop-enter-active { animation: wd-drop-in 0.18s cubic-bezier(0.22,1,0.36,1); }
.wd-drop-leave-active { animation: wd-drop-in 0.12s ease-in reverse; }
@keyframes wd-drop-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
</style>
