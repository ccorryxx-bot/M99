<template>
  <div class="nova-swiper-wrap">
    <swiper
      :modules="modules"
      :slides-per-view="1.08"
      :centered-slides="true"
      :space-between="10"
      :loop="true"
      :autoplay="{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }"
      :pagination="{ clickable: true, el: '.nova-swiper-dots' }"
      class="nova-swiper"
    >
      <swiper-slide v-for="(slide, i) in slides" :key="i">
        <div class="nova-slide" :style="{ background: slide.bg }">
          <!-- Left: text -->
          <div class="nova-slide-text">
            <span v-if="slide.badge" class="nova-slide-badge">{{ slide.badge }}</span>
            <h3 class="nova-slide-title">{{ slide.title }}</h3>
            <p  class="nova-slide-sub">{{ slide.sub }}</p>
            <button v-if="slide.cta" class="nova-slide-btn" @click="$emit('action', slide.action)">
              {{ slide.cta }}
            </button>
          </div>
          <!-- Right: icon/illustration -->
          <div class="nova-slide-img">
            <span class="nova-slide-emoji">{{ slide.icon }}</span>
          </div>
          <!-- Glow orb -->
          <div class="nova-slide-orb" :style="{ background: slide.orb }"></div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Custom pagination dots -->
    <div class="nova-swiper-dots"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

defineEmits(['action'])

const modules = [Autoplay, Pagination]

const slides = [
  {
    badge: '🔥 အထူးပေးဆပ်',
    title: 'ဘောနပ် 20%',
    sub:   'ပထမဆုံးငွေသွင်း ≥ 3,000 Ks',
    cta:   'ယခု ငွေသွင်းပါ',
    action:'deposit',
    icon:  '💰',
    bg:    'linear-gradient(120deg,rgba(8,16,42,0.95) 0%,rgba(5,50,30,0.92) 100%)',
    orb:   'radial-gradient(circle,rgba(34,197,94,0.35) 0%,transparent 70%)',
  },
  {
    badge: '⚡ Daily Bonus',
    title: 'ဘောနပ် 1%',
    sub:   'နေ့စဉ် ငွေပြန်သွင်းတိုင်း',
    cta:   'ကစားပါ',
    action:'play',
    icon:  '🎁',
    bg:    'linear-gradient(120deg,rgba(8,16,42,0.95) 0%,rgba(20,10,60,0.92) 100%)',
    orb:   'radial-gradient(circle,rgba(139,92,246,0.35) 0%,transparent 70%)',
  },
  {
    badge: '👥 Referral',
    title: 'သူငယ်ချင်း ဖိတ်ပါ',
    sub:   'ကိုယ်စာရင်းသွင်းတိုင်း ဆု',
    cta:   'Refer ပါ',
    action:'refer',
    icon:  '🤝',
    bg:    'linear-gradient(120deg,rgba(8,16,42,0.95) 0%,rgba(40,10,30,0.92) 100%)',
    orb:   'radial-gradient(circle,rgba(236,72,153,0.3) 0%,transparent 70%)',
  },
  {
    badge: '🏆 VIP',
    title: 'VIP အဆင့်',
    sub:   'ပိုသွင်း ပိုဆု ရပါ',
    cta:   'VIP ကြည့်',
    action:'vip',
    icon:  '👑',
    bg:    'linear-gradient(120deg,rgba(8,16,42,0.95) 0%,rgba(40,30,0,0.92) 100%)',
    orb:   'radial-gradient(circle,rgba(234,179,8,0.35) 0%,transparent 70%)',
  },
]
</script>

<style scoped>
.nova-swiper-wrap { width:100%;padding-bottom:20px;position:relative; }

.nova-swiper { width:100%;overflow:visible; }

.nova-slide {
  position:relative;overflow:hidden;
  border-radius:14px;
  padding:14px 14px;
  display:flex;align-items:center;justify-content:space-between;
  min-height:88px;
  box-shadow:0 4px 20px rgba(0,0,0,0.4);
  border:1px solid rgba(255,255,255,0.07);
}

.nova-slide-text { flex:1;position:relative;z-index:2; }
.nova-slide-badge {
  display:inline-block;
  font-size:9px;font-weight:700;letter-spacing:0.05em;
  padding:2px 7px;border-radius:99px;margin-bottom:4px;
  background:rgba(255,255,255,0.1);color:rgba(226,232,240,0.8);
}
.nova-slide-title {
  font-size:18px;font-weight:900;
  color:#fff;margin:0 0 2px 0;
  text-shadow:0 1px 8px rgba(0,0,0,0.5);
}
.nova-slide-sub {
  font-size:10px;color:rgba(148,163,184,0.8);margin:0 0 8px 0;
}
.nova-slide-btn {
  font-size:10px;font-weight:700;padding:5px 13px;border-radius:99px;
  border:1px solid rgba(255,255,255,0.2);
  background:rgba(255,255,255,0.1);
  color:rgba(226,232,240,0.9);
  cursor:pointer;transition:all 0.15s;
  backdrop-filter:blur(4px);
}
.nova-slide-btn:hover   { background:rgba(255,255,255,0.18); }
.nova-slide-btn:active  { transform:scale(0.96); }

.nova-slide-img {
  width:56px;height:56px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  position:relative;z-index:2;
}
.nova-slide-emoji { font-size:42px;line-height:1;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.4)); }

.nova-slide-orb {
  position:absolute;right:-20px;top:50%;transform:translateY(-50%);
  width:140px;height:140px;border-radius:50%;
  pointer-events:none;z-index:1;
}

/* Pagination dots */
.nova-swiper-dots {
  display:flex;justify-content:center;gap:5px;margin-top:8px;
}
/* Swiper injects .swiper-pagination-bullet into .nova-swiper-dots */
:deep(.nova-swiper-dots .swiper-pagination-bullet) {
  width:5px;height:5px;border-radius:99px;
  background:rgba(255,255,255,0.2);opacity:1;
  transition:all 0.25s;
}
:deep(.nova-swiper-dots .swiper-pagination-bullet-active) {
  width:18px;
  background:rgba(34,197,94,0.8);
}
</style>
