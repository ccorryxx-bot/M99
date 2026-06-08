<template>
  <div class="ec-root">

    <!-- HEADER -->
    <header class="ec-header">
      <button @click="$router.back()" class="ec-back-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <span class="ec-title">ကစားသမားသစ် အပိုဆု</span>
      <button class="ec-hist-btn" @click="$router.push('/promotions')">သမိုင်းဝင်</button>
    </header>

    <!-- BODY -->
    <div class="ec-body">

      <!-- Code input box -->
      <div class="ec-code-box">
        <div class="ec-code-left">
          <span class="ec-code-icon">🎫</span>
          <input
            v-model="bonusCode"
            class="ec-code-input"
            placeholder="ရွေးနှုတ်ကတ်ကို ထည့်ပါ။"
            type="text"
          />
        </div>
        <button class="ec-redeem-btn" @click="redeemCode">ကူးသည်ရန်</button>
      </div>

      <!-- Bonus value -->
      <div class="ec-bonus-val">အပိုဆုတန်ဖိုး <span class="ec-bonus-num">-1000.00</span></div>

      <!-- Event time -->
      <div class="ec-section-label">ပွဲချိန်</div>
      <div class="ec-section-text">06/06/2026 22:30:00~07/06/2026 22:30:00</div>

      <!-- Rules -->
      <div class="ec-section-label">ပွဲလမ်းညွှန်များ</div>
      <div class="ec-rules">
        <p>1. digitis သည်အပိုဆုကြေးရရှိရန်မှန်ကန်သောကယ်ဆယ်ရေးကုဒ်ကိုသင်အောင်မြင်စွာရရှိပါကအပိုဆုကြေးကိုသင်၏အကောင့်သို့တိုက်ရိုက်အသိအမှတ်ပြုလိမ့်မည်။</p>
        <p>3. Exchange ကုဒ်ကိုတရားဝင်မှုကာလအတွင်းထုတ်ပေးသည်။ ထို့နောက်မမှန်ကန်ပါလိမ့်မည်။ ဖြစ်ရပ်ကာလအတွင်းကုဒ်တစ်ခုတည်းကိုသာအသုံးပြုနိုင်သည်။</p>
        <p>4. ဤဖြစ်ရပ်တွင်ခွင့်ပြုထားသောအပိုဆုကြေး (အဓိကအား) အပိုဆုကြေးသည်မဆွဲမီ 1.00</p>
      </div>

      <!-- Promo thumbnails -->
      <div class="ec-thumbs-wrap">
        <div
          v-for="card in allCards"
          :key="card.id"
          class="ec-thumb-item"
          @click="$router.push('/promotions')"
        >
          <img :src="card.img" :alt="card.title" class="ec-thumb-img" loading="lazy" />
          <span class="ec-thumb-label">{{ card.title }}</span>
        </div>
      </div>

    </div>

    <!-- Bottom button -->
    <div class="ec-footer">
      <button class="ec-apply-btn" @click="$router.push('/promotions')">ဘောနပ်များကို ရှေးပါ</button>
    </div>

    <!-- Toast -->
    <div v-if="toast.show" class="ec-toast" :class="toast.type">{{ toast.msg }}</div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'

const bonusCode = ref('')
const toast = ref({ show: false, msg: '', type: '' })

function showToastMsg(msg, type = 'info') {
  toast.value = { show: true, msg, type }
  setTimeout(() => { toast.value.show = false }, 2200)
}

async function redeemCode() {
  const code = bonusCode.value.trim()
  if (!code) { showToastMsg('ကုဒ် ထည့်ပါ', 'fail'); return }
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { showToastMsg('အကောင့်ဝင်ပါ', 'fail'); return }
    const res = await fetch('https://vuywhhmwrqykukcemifd.supabase.co/functions/v1/redeem_code', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + session.access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })
    const data = await res.json()
    if (data.error) showToastMsg(data.error, 'fail')
    else { showToastMsg('အောင်မြင်ပါသည်', 'success'); bonusCode.value = '' }
  } catch (e) {
    showToastMsg('Network error', 'fail')
  }
}

const allCards = [
  { id:1, title:'兑换码',           img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780759978456.png?updatedAt=1780760966566&tr=f-auto' },
  { id:2, title:'နေ့စဉ်ဘောနပ်',  img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760107731.png?updatedAt=1780760988859&tr=f-auto' },
  { id:3, title:'IW Member Day',   img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760192895.png?updatedAt=1780761005943&tr=f-auto' },
  { id:4, title:'လျှို',           img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760302584.png?updatedAt=1780761039585&tr=f-auto' },
]
</script>

<style scoped>
.ec-root {
  min-height: 100vh;
  background: #3d4187;
  display: flex;
  flex-direction: column;
  color: rgba(255,255,255,0.92);
  font-family: system-ui, sans-serif;
}

/* HEADER */
.ec-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: rgba(30,35,100,0.6);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  position: sticky;
  top: 0;
  z-index: 10;
}
.ec-back-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.ec-title {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.02em;
}
.ec-hist-btn {
  background: none;
  border: none;
  color: rgba(74,222,128,0.9);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 2px;
  -webkit-tap-highlight-color: transparent;
}

/* BODY */
.ec-body {
  flex: 1;
  padding: 16px 14px 24px;
  overflow-y: auto;
}

/* Code input box */
.ec-code-box {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 10px;
  padding: 10px 12px;
  gap: 8px;
  margin-bottom: 14px;
}
.ec-code-left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}
.ec-code-icon {
  font-size: 16px;
  flex-shrink: 0;
}
.ec-code-input {
  background: none;
  border: none;
  outline: none;
  color: rgba(255,255,255,0.9);
  font-size: 13px;
  flex: 1;
  min-width: 0;
}
.ec-code-input::placeholder {
  color: rgba(255,255,255,0.3);
}
.ec-redeem-btn {
  background: none;
  border: none;
  color: rgba(74,222,128,0.9);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

/* Content sections - plain, no borders/frames */
.ec-bonus-val {
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 18px;
}
.ec-bonus-num {
  color: rgba(255,255,255,0.85);
}
.ec-section-label {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  margin-bottom: 4px;
  margin-top: 2px;
}
.ec-section-text {
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  margin-bottom: 16px;
}
.ec-rules {
  margin-bottom: 24px;
}
.ec-rules p {
  font-size: 12.5px;
  color: rgba(255,255,255,0.75);
  line-height: 1.65;
  margin: 0 0 10px 0;
}

/* Thumbnails */
.ec-thumbs-wrap {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 6px;
  -webkit-overflow-scrolling: touch;
}
.ec-thumbs-wrap::-webkit-scrollbar { display: none; }
.ec-thumb-item {
  flex-shrink: 0;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.ec-thumb-img {
  width: 80px;
  height: 54px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.ec-thumb-label {
  font-size: 10px;
  color: rgba(74,222,128,0.9);
  text-align: center;
  line-height: 1.3;
}

/* Footer */
.ec-footer {
  padding: 12px 14px 24px;
  background: rgba(30,35,100,0.4);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.ec-apply-btn {
  width: 100%;
  padding: 14px;
  background: rgba(60,70,140,0.5);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

/* Toast */
.ec-toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(30,35,100,0.95);
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 13px;
  z-index: 999;
  pointer-events: none;
  border: 1px solid rgba(255,255,255,0.1);
}
.ec-toast.success { border-color: rgba(74,222,128,0.4); color: #4ade80; }
.ec-toast.fail { border-color: rgba(239,68,68,0.4); color: #f87171; }
</style>
