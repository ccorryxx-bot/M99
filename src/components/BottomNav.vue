<template>
  <nav class="gnav">
    <div class="gnav-inner">
      <router-link to="/home" class="gnav-item" :class="{active: route.path==='/home'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="41" viewBox="0 0 38 41">
          <path d="M 4 20 L 19 4 L 34 20 L 34 38 Q 34 40 32 40 L 25 40 L 25 30 Q 25 26 19 26 Q 13 26 13 30 L 13 40 L 6 40 Q 4 40 4 38 Z" fill="none" stroke="#6ee7b7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>အိမ်</span>
      </router-link>
      <router-link to="/promotions" class="gnav-item" :class="{active: route.path==='/promotions'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="41" viewBox="0 0 38 41">
          <defs><filter id="gnav-pf"><feGaussianBlur stdDeviation="0.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <line x1="19" y1="20" x2="7" y2="10" stroke="#4b5563" stroke-width="1.2"/>
          <line x1="19" y1="20" x2="31" y2="10" stroke="#4b5563" stroke-width="1.2"/>
          <line x1="19" y1="20" x2="6" y2="32" stroke="#4b5563" stroke-width="1.2"/>
          <line x1="19" y1="20" x2="32" y2="32" stroke="#4b5563" stroke-width="1.2"/>
          <line x1="7" y1="10" x2="31" y2="10" stroke="#374151" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.6"/>
          <line x1="6" y1="32" x2="32" y2="32" stroke="#374151" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.6"/>
          <circle cx="19" cy="20" r="8" fill="none" stroke="#818cf8" stroke-width="0.8" opacity="0">
            <animate attributeName="r" values="5;11;5" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="19" cy="20" r="5" fill="#0f172a" stroke="#818cf8" stroke-width="1.8" filter="url(#gnav-pf)"/>
          <circle cx="19" cy="18.5" r="1.6" fill="none" stroke="#818cf8" stroke-width="1.2"/>
          <path d="M 15.5 22.5 Q 16 20.5 19 20 Q 22 20.5 22.5 22.5" fill="none" stroke="#818cf8" stroke-width="1.2" stroke-linecap="round"/>
          <circle cx="7" cy="10" r="3.5" fill="#0f172a" stroke="#94a3b8" stroke-width="1.5"/>
          <circle cx="7" cy="9" r="1.2" fill="none" stroke="#94a3b8" stroke-width="1"/>
          <path d="M 4.5 12 Q 5 10.5 7 10 Q 9 10.5 9.5 12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-linecap="round"/>
          <circle cx="31" cy="10" r="3.5" fill="#0f172a" stroke="#94a3b8" stroke-width="1.5"/>
          <circle cx="31" cy="9" r="1.2" fill="none" stroke="#94a3b8" stroke-width="1"/>
          <path d="M 28.5 12 Q 29 10.5 31 10 Q 33 10.5 33.5 12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-linecap="round"/>
          <circle cx="6" cy="32" r="3.5" fill="#0f172a" stroke="#94a3b8" stroke-width="1.5"/>
          <circle cx="6" cy="31" r="1.2" fill="none" stroke="#94a3b8" stroke-width="1"/>
          <path d="M 3.5 34 Q 4 32.5 6 32 Q 8 32.5 8.5 34" fill="none" stroke="#94a3b8" stroke-width="1" stroke-linecap="round"/>
          <circle cx="32" cy="32" r="3.5" fill="#0f172a" stroke="#94a3b8" stroke-width="1.5"/>
          <circle cx="32" cy="31" r="1.2" fill="none" stroke="#94a3b8" stroke-width="1"/>
          <path d="M 29.5 34 Q 30 32.5 32 32 Q 34 32.5 34.5 34" fill="none" stroke="#94a3b8" stroke-width="1" stroke-linecap="round"/>
          <circle r="1.5" fill="#818cf8" opacity="0.9" filter="url(#gnav-pf)">
            <animateMotion path="M 19,20 L 7,10" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <span>အေးဂျင့်ကွန်ရက်</span>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="41" viewBox="0 0 38 41">
          <rect x="5" y="18" width="28" height="21" rx="2" fill="none" stroke="#6ee7b7" stroke-width="2.5" stroke-linecap="round"/>
          <rect x="4" y="13" width="30" height="7" rx="2" fill="none" stroke="#6ee7b7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="19" y1="13" x2="19" y2="39" stroke="#6ee7b7" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M 19 13 Q 14 10 15 7 Q 16 4 19 7" fill="none" stroke="#6ee7b7" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M 19 13 Q 24 10 23 7 Q 22 4 19 7" fill="none" stroke="#6ee7b7" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
        <span>ပရိုမိုးရှင်း</span>
      </router-link>
      <router-link to="/account" class="gnav-item" :class="{active: route.path==='/account'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="41" viewBox="0 0 38 41">
          <circle cx="19" cy="12" r="7" fill="none" stroke="#6ee7b7" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 5 41 Q 5 27 19 27 Q 33 27 33 41" fill="none" stroke="#6ee7b7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="19" y1="27" x2="19" y2="36" stroke="#6ee7b7" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
        <span>ပရိုဖိုင်</span>
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
