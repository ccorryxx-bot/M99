<template>
  <nav class="gnav">
    <div class="gnav-inner">
      <router-link to="/home" class="gnav-item" :class="{active: route.path==='/home'}">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        <span>ပင်မ</span>
      </router-link>
      <router-link to="/promotions" class="gnav-item gnav-promo" :class="{active: route.path==='/promotions'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="41" viewBox="0 0 120 130">
          <defs>
            <filter id="gnav-pg2">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="gnav-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3"/>
              <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0"/>
            </radialGradient>
          </defs>
          <!-- Connection lines -->
          <line x1="60" y1="58" x2="25" y2="28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
          <line x1="60" y1="58" x2="95" y2="28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
          <line x1="60" y1="58" x2="22" y2="88" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
          <line x1="60" y1="58" x2="98" y2="88" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
          <line x1="60" y1="58" x2="60" y2="95" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
          <line x1="25" y1="28" x2="95" y2="28" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-dasharray="3,3" opacity="0.3"/>
          <line x1="22" y1="88" x2="98" y2="88" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-dasharray="3,3" opacity="0.3"/>
          <!-- Pulse ring -->
          <circle cx="60" cy="58" r="18" fill="url(#gnav-pulse)">
            <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <!-- CENTER node -->
          <circle cx="60" cy="58" r="13" fill="#0f172a" stroke="#6366f1" stroke-width="2" filter="url(#gnav-pg2)"/>
          <circle cx="60" cy="55" r="4.5" fill="none" stroke="#6366f1" stroke-width="1.5"/>
          <path d="M 50 66 Q 52 60 60 59 Q 68 60 70 66" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round"/>
          <!-- TOP-LEFT node -->
          <circle cx="25" cy="28" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="1.8"/>
          <circle cx="25" cy="26" r="3" fill="none" stroke="#94a3b8" stroke-width="1.3"/>
          <path d="M 19 34 Q 20 30 25 29 Q 30 30 31 34" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"/>
          <!-- TOP-RIGHT node -->
          <circle cx="95" cy="28" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="1.8"/>
          <circle cx="95" cy="26" r="3" fill="none" stroke="#94a3b8" stroke-width="1.3"/>
          <path d="M 89 34 Q 90 30 95 29 Q 100 30 101 34" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"/>
          <!-- BOTTOM-LEFT node -->
          <circle cx="22" cy="88" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="1.8"/>
          <circle cx="22" cy="86" r="3" fill="none" stroke="#94a3b8" stroke-width="1.3"/>
          <path d="M 16 94 Q 17 90 22 89 Q 27 90 28 94" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"/>
          <!-- BOTTOM-RIGHT node -->
          <circle cx="98" cy="88" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="1.8"/>
          <circle cx="98" cy="86" r="3" fill="none" stroke="#94a3b8" stroke-width="1.3"/>
          <path d="M 92 94 Q 93 90 98 89 Q 103 90 104 94" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"/>
          <!-- BOTTOM-CENTER node -->
          <circle cx="60" cy="100" r="7" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <line x1="56" y1="98" x2="64" y2="98" stroke="#475569" stroke-width="1.2" stroke-linecap="round"/>
          <line x1="56" y1="101" x2="64" y2="101" stroke="#475569" stroke-width="1.2" stroke-linecap="round"/>
          <line x1="56" y1="104" x2="64" y2="104" stroke="#475569" stroke-width="1.2" stroke-linecap="round"/>
          <!-- Flow dots -->
          <circle cx="0" cy="0" r="2" fill="#6366f1" opacity="0.9" filter="url(#gnav-pg2)">
            <animateMotion path="M 25,28 L 60,58" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="0" cy="0" r="2" fill="#6366f1" opacity="0.9" filter="url(#gnav-pg2)">
            <animateMotion path="M 60,58 L 98,88" dur="2.2s" repeatCount="indefinite" begin="0.8s"/>
            <animate attributeName="opacity" values="1;0" dur="2.2s" repeatCount="indefinite" begin="0.8s"/>
          </circle>
          <!-- Label — font-size 28 so it renders ~9px at 41px height -->
          <text x="60" y="122"
            text-anchor="middle"
            font-family="'Pyidaungsu','Myanmar Text',serif"
            font-size="28"
            fill="currentColor"
            letter-spacing="2">ပရိုမို</text>
        </svg>
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
            <ellipse cx="30" cy="40" rx="20" ry="15" fill="rgba(245,158,11,0.25)" filter="url(#gnav-amb)"/>
            <path d="M30 20 C25 20 18 22 15 27 C12 32 11 35 11 38 C11 43 13 47 17 50 C19 52 22 54 26 54 L30 54 L30 20Z"
                  stroke="#f59e0b" stroke-width="2.7" fill="rgba(245,158,11,0.16)" filter="url(#gnav-wg)"/>
            <path d="M30 20 C35 20 42 22 45 27 C48 32 49 35 49 38 C49 43 47 47 43 50 C41 52 38 54 34 54 L30 54 L30 20Z"
                  stroke="#f59e0b" stroke-width="2.7" fill="rgba(245,158,11,0.16)" filter="url(#gnav-wg)"/>
            <line x1="30" y1="20" x2="30" y2="54" stroke="#f59e0b" stroke-width="1" opacity="0.5"/>
            <path d="M16 28 C19 25 23 25 27 28" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.9"/>
            <path d="M12 34 C15 31 20 30 24 32" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.87"/>
            <path d="M12 40 C15 37 19 36 22 38" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.87"/>
            <path d="M14 45 C17 42 20 41 23 43" stroke="#fef3c7" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.78"/>
            <path d="M19 51 C22 49 25 49 27 50" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.65"/>
            <path d="M44 28 C41 25 37 25 33 28" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.9"/>
            <path d="M48 34 C45 31 40 30 36 32" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.87"/>
            <path d="M48 40 C45 37 41 36 38 38" stroke="#fef3c7" stroke-width="2"   stroke-linecap="round" fill="none" opacity="0.87"/>
            <path d="M46 45 C43 42 40 41 37 43" stroke="#fef3c7" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.78"/>
            <path d="M41 51 C38 49 35 49 33 50" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.65"/>
            <path d="M17 23 C13 16 9 11 5 6"   stroke="#06b6d4" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <path d="M23 19 C21 13 19 7 18 2"   stroke="#22c55e" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <path d="M30 17 C30 11 30 5 30 1"   stroke="#a855f7" stroke-width="1.2" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <path d="M37 19 C39 13 41 7 42 2"   stroke="#f59e0b" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <path d="M43 23 C47 16 51 11 55 6"  stroke="#ec4899" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
            <circle cx="17" cy="23" r="5.2" fill="#06b6d4" filter="url(#gnav-ng)" class="nb-node-1"/>
            <circle cx="23" cy="19" r="5.2" fill="#22c55e" filter="url(#gnav-ng)" class="nb-node-2"/>
            <circle cx="30" cy="17" r="6"   fill="#a855f7" filter="url(#gnav-ng)" class="nb-node-3"/>
            <circle cx="37" cy="19" r="5.2" fill="#f59e0b" filter="url(#gnav-ng)" class="nb-node-4"/>
            <circle cx="43" cy="23" r="5.2" fill="#ec4899" filter="url(#gnav-ng)" class="nb-node-5"/>
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
      <router-link to="/account" class="gnav-item gnav-profile" :class="{active: route.path==='/account'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 80 105">
          <defs>
            <filter id="gnav-pg">
              <feGaussianBlur stdDeviation="1.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <polygon points="40,4 58,14 58,34 40,44 22,34 22,14"
            fill="none" stroke="currentColor" stroke-width="1"
            stroke-dasharray="3,3" opacity="0.6"/>
          <circle cx="40" cy="24" r="13"
            fill="none" stroke="currentColor" stroke-width="2.2" filter="url(#gnav-pg)"/>
          <line x1="40" y1="37" x2="40" y2="44"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M 10 76 C 12 54 28 46 40 45 C 52 46 68 54 70 76"
            fill="none" stroke="currentColor" stroke-width="2.2"
            stroke-linecap="round" filter="url(#gnav-pg)"/>
          <circle cx="54" cy="20" r="3.5" fill="none" stroke="#22c55e" stroke-width="1.8"/>
          <circle cx="54" cy="20" r="1.5" fill="#22c55e"/>
          <path d="M 40 50 L 50 55 L 50 66 Q 50 73 40 77 Q 30 73 30 66 L 30 55 Z"
            fill="none" stroke="#22c55e" stroke-width="1.8"
            stroke-linejoin="round" filter="url(#gnav-pg)"/>
          <polyline points="35,63 38,67 45,59"
            fill="none" stroke="#22c55e" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="28" y1="88" x2="52" y2="88"
            stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
          <text x="40" y="102"
            text-anchor="middle"
            font-family="'Pyidaungsu','Myanmar Text',serif"
            font-size="13"
            fill="currentColor"
            letter-spacing="1">ပရိုဖိုင်</text>
        </svg>
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
  background: #b0baaf;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-bottom: env(safe-area-inset-bottom, 0);
  box-shadow: 0 -2px 12px rgba(0,0,0,0.12);
}
.gnav-inner {
  display: flex; justify-content: space-around; align-items: center;
  padding: 8px 0 4px;
}
.gnav-item {
  flex: 1; min-width: 0; text-decoration: none;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 2px; padding: 6px 4px;
  color: rgba(0,0,0,0.35);
  font-size: 9px; font-weight: 700; white-space: nowrap; letter-spacing: 0.03em;
  -webkit-tap-highlight-color: transparent; user-select: none;
  transition: color 0.2s, opacity 0.15s;
}
.gnav-item span { line-height: 1; }
.gnav-item.active { color: #16a34a; }
.gnav-item.active svg { filter: drop-shadow(0 0 4px rgba(22,163,74,0.5)); }
.gnav-item:active { opacity: 0.6; }
.gnav-agent {
  flex: none; width: 52px; text-decoration: none;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  color: rgba(0,0,0,0.4);
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.gnav-agent.active { color: #d97706; }
.brain-wrap {
  width: 46px; height: 46px; border-radius: 50%;
  background: radial-gradient(circle at 42% 38%, rgba(245,158,11,0.22) 0%, #b0baaf 65%);
  border: 1.5px solid rgba(245,158,11,0.7);
  box-shadow:
    0 0 0 2px #b0baaf,
    0 0 14px rgba(245,158,11,0.5),
    0 0 28px rgba(245,158,11,0.18);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto; margin-top: -14px;
  animation: bwrap-pulse 3s ease-in-out infinite;
}
@keyframes bwrap-pulse {
  0%,100% { box-shadow: 0 0 0 2px #b0baaf, 0 0 12px rgba(245,158,11,0.45), 0 0 24px rgba(245,158,11,0.15); }
  50%      { box-shadow: 0 0 0 2px #b0baaf, 0 0 22px rgba(245,158,11,0.7),  0 0 42px rgba(245,158,11,0.28); }
}
.agent-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.04em; line-height: 1; }
.gnav-profile { gap: 0; padding: 2px 4px; }
.gnav-profile svg { display: block; }
.gnav-promo { gap: 0; padding: 2px 4px; }
.gnav-promo svg { display: block; overflow: visible; }
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

/* ── HIDE on desktop (sidebar takes over) ── */
@media (min-width: 768px) {
  .gnav { display: none; }
}
</style>
