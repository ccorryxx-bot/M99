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

          <!-- Balance Row -->
          <div class="wd-balance-row">
            <span class="wd-balance-label">လက်ကျန်</span>
            <span class="wd-balance-num">{{ formatBal(balance) }}</span>
            <button class="wd-refresh-btn" @click="$emit('refresh')">
              <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M23 4v6h-6M1 20v-6h6"/>
                <path stroke-linecap="round" d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
              </svg>
            </button>
          </div>

          <!-- Linked Account Row -->
          <button class="wd-acct-row" @click="linkedAccount ? null : activeTab = 1">
            <div class="wd-acct-left">
              <div class="wd-acct-icon">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="rgba(255,200,50,0.9)" stroke-width="1.6"/>
                  <path d="M2 10h20" stroke="rgba(255,200,50,0.9)" stroke-width="1.6"/>
                  <path d="M6 15h4" stroke="rgba(255,200,50,0.6)" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="18" cy="15" r="1.5" fill="rgba(255,200,50,0.7)"/>
                </svg>
              </div>
              <div v-if="linkedAccount" class="wd-acct-info">
                <span class="wd-acct-method">{{ linkedAccount.label }}</span>
                <span class="wd-acct-phone">{{ linkedAccount.phone }}</span>
              </div>
              <span v-else class="wd-acct-placeholder">ငွေထုတ်အကောင့်ထည့်ပါ။</span>
            </div>
            <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Amount Label -->
          <div class="wd-section-label">ငွေထုတ်မမာ</div>

          <!-- Amount Input -->
          <div class="wd-amt-wrap">
            <span class="wd-k-prefix">K</span>
            <input
              v-model.number="amount"
              type="number"
              inputmode="numeric"
              class="wd-amt-input"
              :placeholder="linkedAccount ? 'ငွေထုတ်ယူမည့်ပမာဏ ထည့်ပါ' : 'ငွေထုတ်ယူမြင်မပြမမဲ ထုတ်ယူမည့်အကောင့်ကို ထည့်သွင်းပါ။'"
              :disabled="!linkedAccount"
            />
          </div>

          <!-- Error -->
          <p v-if="error" class="wd-error">{{ error }}</p>

          <!-- Spacer -->
          <div style="flex:1;"></div>

          <!-- Submit Button — HIGH ELEVATION -->
          <div class="wd-cta-wrap">
            <button
              class="wd-submit-btn"
              :class="canSubmit ? 'wd-submit-btn--active' : 'wd-submit-btn--disabled'"
              :disabled="!canSubmit"
              @click="submitWithdraw"
              @touchstart="btnPressed = true"
              @touchend="btnPressed = false"
              @mousedown="btnPressed = true"
              @mouseup="btnPressed = false">
              ငွေထုတ်ကြောင်း အတည်ပြုပါ။
            </button>
          </div>
        </div>

        <!-- ══ TAB 1: ငွေထုတ်အကောင့် ချိတ်ရန် ══ -->
        <div v-else-if="activeTab === 1" class="wd-body">

          <!-- Count Header -->
          <div class="wd-link-header">
            <span class="wd-link-title">ငွေထုတ်အကောင့် ချိတ်ရန်
              <span class="wd-link-count">({{ linkedAccount ? 1 : 0 }}/6)</span>
            </span>
            <button class="wd-refresh-btn">
              <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M23 4v6h-6M1 20v-6h6"/>
                <path stroke-linecap="round" d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
              </svg>
            </button>
          </div>

          <!-- KBZ Pay Row -->
          <button class="wd-method-row" @click="openLinkForm('kpay')">
            <div class="wd-method-left">
              <div class="wd-method-logo">
                <img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-27-327_mark.via.gp_1780510112167edit.jpg?tr=f-auto"
                  style="width:32px;height:32px;object-fit:cover;border-radius:6px;" alt="KBZ"/>
              </div>
              <div class="wd-method-info">
                <div v-if="linkedAccount?.key !== 'kpay'" class="wd-method-badge">ငွေထုတ်မပါဝင်နိုင်ပါ</div>
                <div v-else class="wd-method-badge wd-method-badge--ok">ချိတ်ဆက်ပြီး</div>
                <div class="wd-method-name">KBZPay</div>
              </div>
            </div>
            <div class="wd-method-link">
              {{ linkedAccount?.key === 'kpay' ? 'ဖျက်ရန်' : 'ချိတ်သက်ရန်' }}
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>

          <!-- Wave Money Row -->
          <button class="wd-method-row" @click="openLinkForm('wave')">
            <div class="wd-method-left">
              <div class="wd-method-logo">
                <img src="https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-34-166_mark.via.gp_1780510124725edit.jpg?tr=f-auto"
                  style="width:32px;height:32px;object-fit:cover;border-radius:6px;" alt="Wave"/>
              </div>
              <div class="wd-method-info">
                <div v-if="linkedAccount?.key !== 'wave'" class="wd-method-badge">ငွေထုတ်မပါဝင်နိုင်ပါ</div>
                <div v-else class="wd-method-badge wd-method-badge--ok">ချိတ်ဆက်ပြီး</div>
                <div class="wd-method-name">Wave Money</div>
              </div>
            </div>
            <div class="wd-method-link">
              {{ linkedAccount?.key === 'wave' ? 'ဖျက်ရန်' : 'ချိတ်သက်ရန်' }}
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        </div>

        <!-- ══ TAB 2: ငွေထုတ်မှတ်တမ်း ══ -->
        <div v-else-if="activeTab === 2" class="wd-body">

          <!-- Filter Row -->
          <div class="wd-hist-filters">
            <div class="wd-filter-wrap">
              <button class="wd-filter-btn">
                ဒိန္နဝ်
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <button class="wd-filter-btn">
                ဖော်ပြချက်အားလုံး
                <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
            <div class="wd-hist-bal">
              <span class="wd-hist-bal-label">ရပ်သည်မး</span>
              <span class="wd-hist-bal-num">K{{ formatBal(balance) }}</span>
              <button class="wd-refresh-btn">
                <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" d="M23 4v6h-6M1 20v-6h6"/>
                  <path stroke-linecap="round" d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div class="wd-empty">
            <div class="wd-empty-icon">
              <svg width="64" height="64" fill="none" viewBox="0 0 80 80">
                <rect x="8" y="28" width="56" height="44" rx="6" fill="rgba(100,110,200,0.35)" stroke="rgba(140,150,220,0.3)" stroke-width="1.5"/>
                <path d="M8 44l20-10 10 8 10-12 16 10" stroke="rgba(140,150,220,0.25)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M44 14 L56 26 L48 28 L40 18 Z" fill="rgba(140,150,220,0.5)"/>
                <path d="M56 26 L54 18 L44 14" fill="rgba(120,130,200,0.6)"/>
                <line x1="50" y1="22" x2="42" y2="32" stroke="rgba(180,190,240,0.7)" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <p class="wd-empty-text">
              ဒိန္နဝ် မှတ်တမ်းမရှိပါ။
              <span class="wd-empty-link" @click="activeTab = 0">ဝိုကြည်</span>
            </p>
          </div>
        </div>

        <!-- ══ LINK ACCOUNT SHEET ══ -->
        <Transition name="wd-sheet">
          <div v-if="showLinkForm" class="wd-link-overlay" @click.self="showLinkForm = false">
            <div class="wd-link-sheet">
              <div class="wd-link-sheet-header">
                <span class="wd-link-sheet-title">
                  {{ linkFormData.key === 'kpay' ? 'KBZPay' : 'Wave Money' }} ချိတ်ရန်
                </span>
                <button @click="showLinkForm = false" class="wd-link-close">
                  <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <label class="wd-field-label">ဖုန်းနံပါတ်</label>
              <input v-model="linkFormData.phone" type="tel" placeholder="09xxxxxxxxx"
                class="wd-field-input" inputmode="numeric"/>

              <label class="wd-field-label" style="margin-top:12px;">အကောင့်ရှင်အမည်</label>
              <input v-model="linkFormData.name" type="text" placeholder="အမည်အပြည့်အစုံ"
                class="wd-field-input"/>

              <p v-if="linkError" class="wd-error" style="margin-top:8px;">{{ linkError }}</p>

              <button class="wd-link-confirm-btn" @click="confirmLink">
                ချိတ်ဆက်မည်
              </button>
            </div>
          </div>
        </Transition>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  balance: { type: Number, default: 0 }
})
const emit = defineEmits(['update:modelValue', 'submit', 'refresh'])

const visible    = ref(props.modelValue)
const activeTab  = ref(0)
const amount     = ref(null)
const error      = ref('')
const btnPressed = ref(false)

const tabs = ['ငွေထုတ်', 'ငွေထုတ်အကောင့် ချိတ်ရန်', 'ငွေထုတ်မှတ်တမ်း']

const linkedAccount = ref(null)

const showLinkForm = ref(false)
const linkFormData = ref({ key: '', phone: '', name: '' })
const linkError    = ref('')

const canSubmit = computed(() =>
  linkedAccount.value &&
  amount.value > 0 &&
  amount.value <= props.balance
)

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    activeTab.value = 0
    amount.value    = null
    error.value     = ''
  }
})

function formatBal(n) {
  if (!n && n !== 0) return '0.00'
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function close() {
  emit('update:modelValue', false)
}

function openLinkForm(key) {
  if (linkedAccount.value?.key === key) {
    linkedAccount.value = null
    return
  }
  linkFormData.value = { key, phone: '', name: '' }
  linkError.value = ''
  showLinkForm.value = true
}

function confirmLink() {
  const p = linkFormData.value.phone.trim()
  const n = linkFormData.value.name.trim()
  if (p.length < 9) { linkError.value = 'ဖုန်းနံပါတ် မှန်ကန်အောင် ထည့်ပါ'; return }
  if (!n) { linkError.value = 'အမည် ထည့်ပါ'; return }
  linkedAccount.value = {
    key: linkFormData.value.key,
    label: linkFormData.value.key === 'kpay' ? 'KBZPay' : 'Wave Money',
    phone: p,
    name: n
  }
  showLinkForm.value = false
  activeTab.value = 0
}

function submitWithdraw() {
  if (!canSubmit.value) return
  if (amount.value > props.balance) {
    error.value = 'လက်ကျန်ငွေ မလုံလောက်ပါ'
    return
  }
  emit('submit', {
    method:      linkedAccount.value.key,
    phone:       linkedAccount.value.phone,
    accountName: linkedAccount.value.name,
    amount:      amount.value
  })
  close()
}
</script>

<style scoped>
/* ── Root overlay (full screen) ── */
.wd-root {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: #3d4187;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
  height: 100dvh;
}

/* ── Header ── */
.wd-header {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0 12px;
  height: 50px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: #3d4187;
}

.wd-back-btn {
  width: 34px;
  height: 34px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

.wd-tabs {
  flex: 1;
  display: flex;
  overflow-x: auto;
  gap: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.wd-tabs::-webkit-scrollbar { display: none; }

.wd-tab {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  padding: 0 10px;
  height: 50px;
  white-space: nowrap;
  position: relative;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s;
}
.wd-tab--active {
  color: #f5c842;
}
.wd-tab--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  height: 2.5px;
  background: #f5c842;
  border-radius: 2px 2px 0 0;
}

.wd-support-btn {
  width: 34px;
  height: 34px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ── Shared Body ── */
.wd-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* ── TAB 0 ── */
.wd-balance-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 16px 10px;
}
.wd-balance-label {
  font-size: 12px;
  color: rgba(255,255,255,0.55);
}
.wd-balance-num {
  font-size: 15px;
  font-weight: 800;
  color: #fff;
}
.wd-refresh-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.wd-acct-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 14px 14px;
  padding: 13px 14px;
  background: #313478;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s;
}
.wd-acct-row:active { background: #2a2d6a; }
.wd-acct-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.wd-acct-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(245,200,66,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.wd-acct-placeholder {
  font-size: 12px;
  color: rgba(255,255,255,0.45);
}
.wd-acct-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.wd-acct-method {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
}
.wd-acct-phone {
  font-size: 10px;
  color: rgba(255,255,255,0.5);
  font-family: monospace;
}

.wd-section-label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.65);
  padding: 0 16px 6px;
}

.wd-amt-wrap {
  position: relative;
  margin: 0 14px;
}
.wd-k-prefix {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,0.5);
  pointer-events: none;
  z-index: 1;
}
.wd-amt-input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px 13px 28px;
  background: #313478;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  outline: none;
  caret-color: #f5c842;
  -webkit-appearance: none;
  transition: border-color 0.15s;
}
.wd-amt-input::placeholder {
  color: rgba(255,255,255,0.22);
  font-size: 11px;
  font-weight: 500;
}
.wd-amt-input:focus {
  border-color: rgba(245,200,66,0.5);
}
.wd-amt-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
/* hide number input spinner */
.wd-amt-input::-webkit-outer-spin-button,
.wd-amt-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.wd-amt-input[type=number] { -moz-appearance: textfield; }

.wd-error {
  font-size: 11px;
  color: #f87171;
  padding: 6px 16px 0;
  margin: 0;
}

/* ── HIGH ELEVATION Submit Button ── */
.wd-cta-wrap {
  padding: 20px 14px calc(20px + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;
}
.wd-submit-btn {
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 0.03em;
  transition: transform 0.08s, box-shadow 0.08s;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.wd-submit-btn--active {
  background: #4e55b8;
  color: #fff;
  box-shadow:
    0 6px 0 #1e2268,
    0 9px 22px rgba(0,0,0,0.55);
  transform: translateY(0);
}
.wd-submit-btn--active:active {
  transform: translateY(5px);
  box-shadow:
    0 1px 0 #1e2268,
    0 4px 10px rgba(0,0,0,0.4);
}
.wd-submit-btn--disabled {
  background: #3f4596;
  color: rgba(255,255,255,0.28);
  box-shadow:
    0 5px 0 #1a1f5c,
    0 8px 18px rgba(0,0,0,0.4);
  cursor: not-allowed;
}

/* ── TAB 1 ── */
.wd-link-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.wd-link-title {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  flex: 1;
}
.wd-link-count {
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  font-weight: 600;
}

.wd-method-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s;
}
.wd-method-row:active { background: rgba(255,255,255,0.04); }
.wd-method-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.wd-method-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}
.wd-method-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-start;
}
.wd-method-badge {
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #e53e3e;
  padding: 2px 7px;
  border-radius: 4px;
  line-height: 1.5;
}
.wd-method-badge--ok {
  background: #22c55e;
}
.wd-method-name {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
}
.wd-method-link {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 700;
  color: #f5c842;
}

/* ── TAB 2 ── */
.wd-hist-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.wd-filter-wrap {
  display: flex;
  gap: 8px;
}
.wd-filter-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.15);
  background: #313478;
  color: rgba(255,255,255,0.7);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.wd-hist-bal {
  display: flex;
  align-items: center;
  gap: 4px;
}
.wd-hist-bal-label {
  font-size: 10px;
  color: rgba(255,255,255,0.45);
}
.wd-hist-bal-num {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
}
.wd-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 40px 20px;
}
.wd-empty-icon {
  opacity: 0.55;
}
.wd-empty-text {
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  margin: 0;
  text-align: center;
}
.wd-empty-link {
  color: #f5c842;
  cursor: pointer;
  font-weight: 700;
  margin-left: 4px;
}

/* ── Link Account Sheet ── */
.wd-link-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.wd-link-sheet {
  width: 100%;
  max-width: 480px;
  background: #2e3375;
  border-radius: 20px 20px 0 0;
  padding: 20px 18px calc(24px + env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
}
.wd-link-sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.wd-link-sheet-title {
  font-size: 14px;
  font-weight: 800;
  color: #fff;
}
.wd-link-close {
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255,255,255,0.08);
  border-radius: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wd-field-label {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  margin-bottom: 6px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.wd-field-input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  background: #252870;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  font-size: 13px;
  color: #fff;
  outline: none;
  caret-color: #f5c842;
  transition: border-color 0.15s;
}
.wd-field-input:focus { border-color: rgba(245,200,66,0.5); }
.wd-field-input::placeholder { color: rgba(255,255,255,0.22); }

/* HIGH ELEVATION — link confirm */
.wd-link-confirm-btn {
  margin-top: 20px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  background: #4e55b8;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  box-shadow:
    0 6px 0 #1e2268,
    0 9px 22px rgba(0,0,0,0.55);
  transition: transform 0.08s, box-shadow 0.08s;
}
.wd-link-confirm-btn:active {
  transform: translateY(5px);
  box-shadow:
    0 1px 0 #1e2268,
    0 4px 10px rgba(0,0,0,0.4);
}

/* ── Transitions ── */
.wd-slide-enter-active { animation: wd-in 0.28s cubic-bezier(0.22,1,0.36,1); }
.wd-slide-leave-active { animation: wd-in 0.18s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes wd-in {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.wd-sheet-enter-active { animation: wd-sheet-in 0.22s cubic-bezier(0.22,1,0.36,1); }
.wd-sheet-leave-active { animation: wd-sheet-in 0.15s ease-in reverse; }
@keyframes wd-sheet-in {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
