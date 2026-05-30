<template>
  <nav class="gnav">
    <div class="gnav-inner">
      <router-link to="/home" class="gnav-item" :class="{active: route.path==='/home'}">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        <span>ပင်မ</span>
      </router-link>
      <router-link to="/promotions" class="gnav-item" :class="{active: route.path==='/promotions'}">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
        <span>ပရိုမို</span>
      </router-link>
      <!-- ══ AGENT — elevated AI brain ══ -->
      <router-link to="/agent" class="gnav-agent" :class="{active: route.path==='/agent'}">
        <div class="brain-wrap">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" style="overflow:visible">
            <defs>
              <filter id="gnav-wg" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="1.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="gnav-ng" x="-90%" y="-90%" width="280%" height="280%">
                <feGaussianBlur stdDeviation="3.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="gnav-amb" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6"/>
              </filter>
            </defs>
            <!-- ambient warm glow -->
            <ellipse cx="30" cy="40" rx="20" ry="15" fill="rgba(245,158,11,0.25)" filter="url(#gnav-amb)"/>
            <!-- BRAIN left hemisphere -->
            <path d="M30 20 C25 20 18 22 15 27 C12 32 11 35 11 38 C11 43 13 47 17 50 C19 52 22 54 26 54 L30 54 L30 20Z"
                  stroke="#f59e0b" stroke-width="2.7" fill="rgba(245,158,11,0.16)" filter="url(#gnav-wg)"/>
            <!-- BRAIN right hemisphere -->
            <path d="M30 20 C35 20 42 22 45 27 C48 32 49 35 49 38 C49 43 47 47 43 50 C41 52 38 54 34 54 L30 54 L30 20Z"
                  stroke="#f59e0b" stroke-width="2.7" fill="rgba(245,158,11,0.16)" filter="url(#gnav-wg)"/>
            <!-- center divider -->
            <line x1="30" y1="20" x2="30" y2="54" stroke="#f59e0b" stroke-width="1" opacity="0.5"/>
            <!-- LEFT gyri folds — cream for max contrast -->
            <path d="M16 28 C19 25 23 25 27 28" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.9"/>
            <path d="M12 34 C15 31 20 30 24 32" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.87"/>
            <path d="M12 40 C15 37 19 36 22 38" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.87"/>
            <path d="M14 45 C17 42 20 41 23 43" stroke="#fef3c7" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.78"/>
            <path d="M19 51 C22 49 25 49 27 50" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.65"/>
            <!-- RIGHT gyri folds -->
            <path d="M44 28 C41 25 37 25 33 28" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.9"/>
            <path d="M48 34 C45 31 40 30 36 32" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.87"/>
            <path d="M48 40 C45 37 41 36 38 38" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.87"/>
            <path d="M46 45 C43 42 40 41 37 43" stroke="#fef3c7" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.78"/>
            <path d="M41 51 C38 49 35 49 33 50" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.65"/>
            <!-- neural tendrils -->
            <path d="M17 23 C13 16 9 11 5 6"   stroke="#06b6d4" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <path d="M23 19 C21 13 19 7 18 2"   stroke="#22c55e" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <path d="M30 17 C30 11 30 5 30 1"   stroke="#a855f7" stroke-width="1.2" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <path d="M37 19 C39 13 41 7 42 2"   stroke="#f59e0b" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <path d="M43 23 C47 16 51 11 55 6"  stroke="#ec4899" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <!-- ENERGY NODES -->
            <circle cx="17" cy="23" r="5.2" fill="#06b6d4" filter="url(#gnav-ng)" class="nb-node-1"/>
            <circle cx="23" cy="19" r="5.2" fill="#22c55e" filter="url(#gnav-ng)" class="nb-node-2"/>
            <circle cx="30" cy="17" r="6"   fill="#a855f7" filter="url(#gnav-ng)" class="nb-node-3"/>
            <circle cx="37" cy="19" r="5.2" fill="#f59e0b" filter="url(#gnav-ng)" class="nb-node-4"/>
            <circle cx="43" cy="23" r="5.2" fill="#ec4899" filter="url(#gnav-ng)" class="nb-node-5"/>
            <!-- node shine highlights -->
            <circle cx="15.5" cy="21.5" r="1.8" fill="rgba(255,255,255,0.72)"/>
            <circle cx="21.5" cy="17.5" r="1.8" fill="rgba(255,255,255,0.72)"/>
            <circle cx="28.5" cy="15.5" r="2"   fill="rgba(255,255,255,0.72)"/>
            <circle cx="35.5" cy="17.5" r="1.8" fill="rgba(255,255,255,0.72)"/>
            <circle cx="41.5" cy="21.5" r="1.8" fill="rgba(255,255,255,0.72)"/>
          </svg>
        </div>
        <span class="agent-lbl">အေးဂျင့်</span>
      </router-link>
      <router-link to="/service" class="gnav-item" :class="{active: route.path==='/service'}">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        <span>ဆက်သွယ်</span>
      </router-link>
      <router-link to="/account" class="gnav-item" :class="{active: route.path==='/account'}">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        <span>အကောင့်</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.gnav {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
  background: rgba(6,10,22,0.92);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-bottom: env(safe-area-inset-bottom, 0);
  box-shadow: 0 -4px 28px rgba(0,0,0,0.45);
}
.gnav-inner {
  display: flex; justify-content: space-around; align-items: center;
  padding: 8px 0 4px;
}
.gnav-item {
  flex: 1; min-width: 0; text-decoration: none;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 2px; padding: 6px 4px;
  color: rgba(255,255,255,0.28);
  font-size: 9px; font-weight: 700; white-space: nowrap; letter-spacing: 0.03em;
  -webkit-tap-highlight-color: transparent; user-select: none;
  transition: color 0.2s, opacity 0.15s;
}
.gnav-item span { line-height: 1; }
.gnav-item.active { color: #22c55e; }
.gnav-item.active svg { filter: drop-shadow(0 0 5px rgba(34,197,94,0.7)); }
.gnav-item:active { opacity: 0.6; }
.gnav-agent {
  flex: none; width: 52px; text-decoration: none;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  color: rgba(255,255,255,0.45);
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.gnav-agent.active { color: #f59e0b; }
.brain-wrap {
  width: 46px; height: 46px; border-radius: 50%;
  background: radial-gradient(circle at 42% 38%, rgba(245,158,11,0.18) 0%, rgba(5,8,20,0.98) 65%);
  border: 1.5px solid rgba(245,158,11,0.62);
  box-shadow:
    0 0 0 2px rgba(6,10,22,0.82),
    0 0 14px rgba(245,158,11,0.44),
    0 0 30px rgba(245,158,11,0.14),
    0 -6px 18px rgba(0,0,0,0.82);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto; margin-top: -14px;
  animation: bwrap-pulse 3s ease-in-out infinite;
}
@keyframes bwrap-pulse {
  0%,100% { box-shadow: 0 0 0 2px rgba(6,10,22,0.82), 0 0 12px rgba(245,158,11,0.4), 0 0 26px rgba(245,158,11,0.12), 0 -6px 18px rgba(0,0,0,0.82); }
  50%      { box-shadow: 0 0 0 2px rgba(6,10,22,0.82), 0 0 24px rgba(245,158,11,0.65), 0 0 46px rgba(245,158,11,0.26), 0 -6px 18px rgba(0,0,0,0.82); }
}
.agent-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.04em; line-height: 1; }
.nb-tdl { animation: tdl-flow 1.8s linear infinite; }
@keyframes tdl-flow {
  0%   { stroke-dashoffset: 16; opacity: 0.55; }
  50%  { opacity: 1; }
  100% { stroke-dashoffset: 0;  opacity: 0.55; }
}
.nb-node-1,.nb-node-2,.nb-node-3,.nb-node-4,.nb-node-5 {
  transform-box: fill-box; transform-origin: center;
}
.nb-node-1 { animation: nb-node 2s ease-in-out infinite 0s;   }
.nb-node-2 { animation: nb-node 2s ease-in-out infinite 0.4s; }
.nb-node-3 { animation: nb-node 2s ease-in-out infinite 0.8s; }
.nb-node-4 { animation: nb-node 2s ease-in-out infinite 1.2s; }
.nb-node-5 { animation: nb-node 2s ease-in-out infinite 1.6s; }
@keyframes nb-node {
  0%,100% { opacity: 0.55; transform: scale(0.78); }
  50%      { opacity: 1;    transform: scale(1.32); }
}
</style>