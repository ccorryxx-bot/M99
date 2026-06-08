<template>
  <div class="db-root">

    <!-- HEADER -->
    <header class="db-header">
      <button @click="$router.back()" class="db-back-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <span class="db-title">နေ့စဉ်ဘောနပ်</span>
      <button class="db-hist-btn" @click="$router.push('/promotions')">သမိုင်းဝင်</button>
    </header>

    <!-- BODY -->
    <div class="db-body">

      <p class="db-intro">(IW99) VIP အဖွဲ့ဝင် ဖြစ်လိုက်ပါ၊အကျိုးကျေးဇူးများစွာခံစားရမည်၊ နေ့စဉ်အဆက်မပျက်ငွေသားဆုများဆက်တိုက်ရယူလိုက်ပါ။</p>

      <div class="db-section-label">VIPဘောနပ်အကြောင်းအရာ -</div>
      <p class="db-text">Systemအဖွဲ့ဝင်၏ VIP အဆင့်အရ နေ့စဉ် ငွေသားဆုများကို အလိုအလျောက်ပေးအပ်မည်ဖြစ်သည်။ သင်၏အဆင့်သည် VIP1 သို့မဟုတ် အထက်တို့‌ရောက်ရှိနေပါက၊ မည့်သည့်အခြေအနေမဆို System ကနေ့ စဥ်ဘောနပ်များကိုပေးအပ်မည်ဖြစ်ပါသည်။ သင်၏ VIP အဆင့် မြင့်လာလေလေ၊Systemမှ ပေးအပ်သော ဘောနပ်လည်း မြင့်မားလေလေ ဖြစ်သည်။ (ဘောနပ်ပေးအပ်ချိန်မှာ မြန်မာစံတော်ချိန် နေ့လည် 12မှ2 နာရီကြား ကိုယ်တိုင် ဝင်ရောက်၍ လက်ခံရယူရန် လိုအပ်သည်။)</p>

      <div class="db-table-wrap">
        <table class="db-table">
          <thead>
            <tr>
              <th>VIPအဆင့်</th>
              <th>နေ့စဥ်ဘောနပ်</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>VIP1--VIP10</td><td>50～268000</td></tr>
            <tr><td>VIP11--VIP20</td><td>3000～3680000</td></tr>
            <tr><td>VIP21--VIP30</td><td>40000～11800000</td></tr>
            <tr><td>VIP31--VIP40</td><td>130000～41800000</td></tr>
            <tr><td>VIP41--VIP50</td><td>460000～138800000</td></tr>
          </tbody>
        </table>
      </div>

      <div class="db-section-label">ဘောနပ်စည်းကမ်းနှင့်သတ်မှတ်ချက်များ</div>
      <p class="db-text">VIP1 သို့မဟုတ် အထက်တို့‌ရောက်ရှိနေပါကမည့်သည့်အခြေအနေမဆို System ကနေ့ စဥ်ဘောနပ်များကိုပေးအပ်မည်ဖြစ်ပါသည်။</p>
      <p class="db-text">1.လည်ပတ်ကြိမ် 1ကြိမ် ကစားပြီး နိုင်ငွေကို အကန့်အသတ်မရှိအကုန်ထုတ်ယူနိုင်ပါသည်။</p>
      <p class="db-text">2.နေ့စဥ်ဘောနပ်ကိုနောက်နေ့တွင်Systemမှအော်တိုထည့်ပေးပါမည်။</p>
      <p class="db-text">3.ဘောနပ်ကုန်ဆုံးချိန်နေ့တိုင်းပေးအပ်သောနေ့စဥ်ဘောနပ်သည် နောက်နေ့လျှင်အကျုံးဝင်တော့မည်မဟုတ်ပါ။သတ်မှတ်ထားသောအချိန်အတွင်း မလက်ခံရင် အလိုအလျောက်သက်တမ်းကုန်သွားပါမယ်။</p>
      <p class="db-text">4.ကစားသမားတစ်ဦးစီ၊ အမည်၊ ဖုန်းနံပါတ်၊ ဖုန်းအမျိုးအစား ၊ ဘဏ်ကတ်အချက်အလက်စသည်ဖြင့် အကောင့်တစ်ခုနှင့် ပရိုမိုးရှင်းကို ထပ်ခါထပ်ခါ လျှောက်ထားပါက၊ ပရိုမိုးရှင်း ကို ပယ်ဖျက်ရန် သိုမဟုတ် နုတ်ယူခွင့်ရှိသည်။</p>
      <p class="db-text">5.ပရိုမိုးများကို အကျုံးဝင်သည့်ရက် အသိပေးချင်းမရှိဘဲ အစီစဉ်ကို ပြင်ဆင်ခြင်း နှင့်ရပ်စဲခြင်းကို IWBET မှကန့်သတ်ပိုင်ခွင့်ရှိသည်။စကားလုံး အဓိပ္ပာယ်လွဲမှားပြီး အငြင်းပွားမူ့ဖြစ်လာပါက IWBET ဆုံးဖြတ်ချက်သာအတည်ဖြစ်သည်။ ယခုအချက်လက်သည် IWBET တွင်ရှိသည့် ပိုမိုးရှင်း အားလုံးအတွက်အကျုံးဝင်သည်။</p>
      <p class="db-text">ကစားသမားတစ်ဦးစီ၊ အမည်၊ ဖုန်းနံပါတ်၊ ဖုန်းအမျိုးအစား ၊ ဘဏ်ကတ်အချက်အလက်စသည်ဖြင့် အကောင့်တစ်ခုနှင့် ပရိုမိုးရှင်းကို ထပ်ခါထပ်ခါ လျှောက်ထားပါက၊ ပရိုမိုးရှင်း ကို ပယ်ဖျက်ရန် သိုမဟုတ် နုတ်ယူခွင့်ရှိသည်။</p>

      <!-- Promo thumbnails -->
      <div class="db-thumbs-wrap">
        <div v-for="card in allCards" :key="card.id" class="db-thumb-item" @click="handleThumbClick(card)">
          <img :src="card.img" :alt="card.title" class="db-thumb-img" loading="lazy" />
          <span class="db-thumb-label" :class="{ active: card.id === 2 }">{{ card.title }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const allCards = [
  { id:1, title:'兑换码',          route:'/exchange-code', img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780759978456.png?updatedAt=1780760966566&tr=f-auto' },
  { id:2, title:'နေ့စဉ်ဘောနပ်', route:'/daily-bonus',   img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760107731.png?updatedAt=1780760988859&tr=f-auto' },
  { id:3, title:'IW Member Day',  route:'/promotions',    img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760192895.png?updatedAt=1780761005943&tr=f-auto' },
  { id:4, title:'လျှို',          route:'/promotions',    img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760302584.png?updatedAt=1780761039585&tr=f-auto' },
]

function handleThumbClick(card) {
  router.push(card.route)
}
</script>

<style scoped>
.db-root {
  min-height: 100vh;
  background: #3d4187;
  display: flex;
  flex-direction: column;
  color: rgba(255,255,255,0.92);
  font-family: system-ui, sans-serif;
}

.db-header {
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
.db-back-btn {
  background: none; border: none;
  color: rgba(255,255,255,0.85);
  cursor: pointer; padding: 4px;
  display: flex; align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.db-title {
  font-size: 13px; font-weight: 700;
  color: #fff; letter-spacing: 0.02em;
}
.db-hist-btn {
  background: none; border: none;
  color: rgba(74,222,128,0.9);
  font-size: 11px; font-weight: 600;
  cursor: pointer; padding: 4px 2px;
  -webkit-tap-highlight-color: transparent;
}

.db-body {
  flex: 1;
  padding: 12px 14px 28px;
  overflow-y: auto;
}

.db-intro {
  font-size: 10.5px;
  color: rgba(255,255,255,0.78);
  line-height: 1.6;
  margin: 0 0 12px 0;
}
.db-section-label {
  font-size: 10px;
  color: rgba(255,255,255,0.5);
  margin: 0 0 4px 0;
}
.db-text {
  font-size: 10px;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
  margin: 0 0 7px 0;
}

.db-table-wrap {
  margin: 10px 0 14px 0;
  overflow-x: auto;
}
.db-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}
.db-table thead tr {
  background: rgba(74,222,128,0.1);
}
.db-table th {
  padding: 7px 10px;
  text-align: left;
  color: rgba(255,255,255,0.65);
  font-weight: 600;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.db-table td {
  padding: 7px 10px;
  color: rgba(255,255,255,0.78);
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.db-table tbody tr:nth-child(odd) {
  background: rgba(255,255,255,0.02);
}

.db-thumbs-wrap {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-top: 18px;
  -webkit-overflow-scrolling: touch;
}
.db-thumbs-wrap::-webkit-scrollbar { display: none; }
.db-thumb-item {
  flex-shrink: 0; width: 78px;
  display: flex; flex-direction: column;
  align-items: center; gap: 4px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.db-thumb-img {
  width: 78px; height: 52px;
  object-fit: cover; border-radius: 7px;
  display: block;
}
.db-thumb-label {
  font-size: 9.5px;
  color: rgba(255,255,255,0.4);
  text-align: center; line-height: 1.3;
}
.db-thumb-label.active { color: rgba(74,222,128,0.9); }
</style>
