<template>
  <nav class="gnav" v-show="route.path !== '/agent'">
    <div class="gnav-inner">

      <!-- HOME -->
      <router-link to="/home" class="gnav-item" :class="{active: route.path==='/home'}">
        <svg width="22" height="22" fill="none" viewBox="0 0 38 41" xmlns="http://www.w3.org/2000/svg">
          <path d="M 4 20 L 19 4 L 34 20 L 34 38 Q 34 40 32 40 L 25 40 L 25 30 Q 25 26 19 26 Q 13 26 13 30 L 13 40 L 6 40 Q 4 40 4 38 Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{{ isLoggedIn ? 'အိမ်' : 'ပင်မ' }}</span>
      </router-link>

      <!-- PROMOTIONS -->
      <router-link to="/promotions" class="gnav-item" :class="{active: route.path==='/promotions'}">
        <svg width="22" height="22" fill="none" viewBox="0 0 38 41" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="18" width="28" height="21" rx="2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <rect x="4" y="13" width="30" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="19" y1="13" x2="19" y2="39" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M 19 13 Q 14 10 15 7 Q 16 4 19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M 19 13 Q 24 10 23 7 Q 22 4 19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
        <span>ပရိုမိုးရှင်း</span>
      </router-link>

      <!-- CENTER: AGENT (logged in) / REGISTER (not logged in) -->
      <template v-if="isLoggedIn">
        <router-link to="/agent" class="gnav-agent" :class="{active: route.path==='/agent'}">
          <div class="brain-wrap">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28" style="overflow:visible">
              <defs>
                <filter id="gnav-wg" x="-35%" y="-35%" width="170%" height="170%"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="gnav-ng" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="gnav-amb" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6"/></filter>
              </defs>
              <ellipse cx="30" cy="40" rx="20" ry="15" fill="rgba(30,58,138,0.4)" filter="url(#gnav-amb)"/>
              <path d="M30 20 C25 20 18 22 15 27 C12 32 11 35 11 38 C11 43 13 47 17 50 C19 52 22 54 26 54 L30 54 L30 20Z" stroke="#3b82f6" stroke-width="2.7" fill="rgba(30,58,138,0.22)" filter="url(#gnav-wg)"/>
              <path d="M30 20 C35 20 42 22 45 27 C48 32 49 35 49 38 C49 43 47 47 43 50 C41 52 38 54 34 54 L30 54 L30 20Z" stroke="#3b82f6" stroke-width="2.7" fill="rgba(30,58,138,0.22)" filter="url(#gnav-wg)"/>
              <line x1="30" y1="20" x2="30" y2="54" stroke="#3b82f6" stroke-width="1" opacity="0.5"/>
              <path d="M16 28 C19 25 23 25 27 28" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.9"/>
              <path d="M12 34 C15 31 20 30 24 32" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.87"/>
              <path d="M12 40 C15 37 19 36 22 38" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.87"/>
              <path d="M14 45 C17 42 20 41 23 43" stroke="#bfdbfe" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.78"/>
              <path d="M19 51 C22 49 25 49 27 50" stroke="#bfdbfe" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.65"/>
              <path d="M44 28 C41 25 37 25 33 28" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.9"/>
              <path d="M48 34 C45 31 40 30 36 32" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.87"/>
              <path d="M48 40 C45 37 41 36 38 38" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.87"/>
              <path d="M46 45 C43 42 40 41 37 43" stroke="#bfdbfe" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.78"/>
              <path d="M41 51 C38 49 35 49 33 50" stroke="#bfdbfe" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.65"/>
              <path d="M17 23 C13 16 9 11 5 6" stroke="#60a5fa" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
              <path d="M23 19 C21 13 19 7 18 2" stroke="#93c5fd" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
              <path d="M30 17 C30 11 30 5 30 1" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
              <path d="M37 19 C39 13 41 7 42 2" stroke="#1d4ed8" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
              <path d="M43 23 C47 16 51 11 55 6" stroke="#2563eb" stroke-width="1.1" stroke-linecap="round" fill="none" class="nb-tdl" stroke-dasharray="12 4"/>
              <circle cx="17" cy="23" r="5.2" fill="#60a5fa" filter="url(#gnav-ng)" class="nb-node-1"/>
              <circle cx="23" cy="19" r="5.2" fill="#93c5fd" filter="url(#gnav-ng)" class="nb-node-2"/>
              <circle cx="30" cy="17" r="6"   fill="#3b82f6" filter="url(#gnav-ng)" class="nb-node-3"/>
              <circle cx="37" cy="19" r="5.2" fill="#1d4ed8" filter="url(#gnav-ng)" class="nb-node-4"/>
              <circle cx="43" cy="23" r="5.2" fill="#2563eb" filter="url(#gnav-ng)" class="nb-node-5"/>
              <circle cx="15.5" cy="21.5" r="1.8" fill="rgba(255,255,255,0.72)"/>
              <circle cx="21.5" cy="17.5" r="1.8" fill="rgba(255,255,255,0.72)"/>
              <circle cx="28.5" cy="15.5" r="2"   fill="rgba(255,255,255,0.72)"/>
              <circle cx="35.5" cy="17.5" r="1.8" fill="rgba(255,255,255,0.72)"/>
              <circle cx="41.5" cy="21.5" r="1.8" fill="rgba(255,255,255,0.72)"/>
            </svg>
          </div>
          <span class="agent-lbl">အေးဂျင့်</span>
        </router-link>
      </template>

      <template v-else>
        <router-link to="/register" class="gnav-register" :class="{active: route.path==='/register'}">
          <div class="reg-wrap">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="7" r="4" stroke="rgba(255,255,255,0.9)" stroke-width="1.8"/>
              <path d="M2 21c0-4 3.6-6.5 8-6.5" stroke="rgba(255,255,255,0.9)" stroke-width="1.8" stroke-linecap="round"/>
              <line x1="19" y1="14" x2="19" y2="20" stroke="#4ade80" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="16" y1="17" x2="22" y2="17" stroke="#4ade80" stroke-width="2.2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="reg-lbl">မှတ်ပုံတင်</span>
        </router-link>
      </template>

      <!-- LOGIN (not logged in) / NETWORK (logged in) -->
      <template v-if="isLoggedIn">
        <router-link to="/network" class="gnav-item" :class="{active: route.path==='/network'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 38 41">
            <defs><filter id="gnav-pf"><feGaussianBlur stdDeviation="0.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
            <line x1="19" y1="20" x2="7" y2="10" stroke="#334155" stroke-width="1.2"/>
            <line x1="19" y1="20" x2="31" y2="10" stroke="#334155" stroke-width="1.2"/>
            <line x1="19" y1="20" x2="6" y2="32" stroke="#334155" stroke-width="1.2"/>
            <line x1="19" y1="20" x2="32" y2="32" stroke="#334155" stroke-width="1.2"/>
            <circle cx="19" cy="20" r="5" fill="#3d4187" stroke="currentColor" stroke-width="1.8" filter="url(#gnav-pf)"/>
            <circle cx="19" cy="18.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.2"/>
            <path d="M 15.5 22.5 Q 16 20.5 19 20 Q 22 20.5 22.5 22.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <circle cx="7" cy="10" r="3.5" fill="#3d4187" stroke="rgba(147,197,253,0.6)" stroke-width="1.5"/>
            <circle cx="31" cy="10" r="3.5" fill="#3d4187" stroke="rgba(147,197,253,0.6)" stroke-width="1.5"/>
            <circle cx="6" cy="32" r="3.5" fill="#3d4187" stroke="rgba(147,197,253,0.6)" stroke-width="1.5"/>
            <circle cx="32" cy="32" r="3.5" fill="#3d4187" stroke="rgba(147,197,253,0.6)" stroke-width="1.5"/>
          </svg>
          <span>အေးဂျင့်ကွန်ရက်</span>
        </router-link>
      </template>

      <template v-else>
        <router-link to="/login" class="gnav-item" :class="{active: route.path==='/login'}">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="10 17 15 12 10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>လော့ဂ်အင်</span>
        </router-link>
      </template>

      <!-- ACCOUNT -->
      <router-link to="/account" class="gnav-item" :class="{active: route.path==='/account'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 38 41">
          <circle cx="19" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 5 41 Q 5 27 19 27 Q 33 27 33 41" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        <span>{{ isLoggedIn ? 'ပရိုဖိုင်' : 'အကောင့်' }}</span>
      </router-link>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase'

const route     = useRoute()
const isLoggedIn = ref(false)

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  isLoggedIn.value = !!session
  supabase.auth.onAuthStateChange((_e, sess) => {
    isLoggedIn.value = !!sess
  })
})
</script>

<style scoped>
.gnav {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
  background: #2e3375;
  border-top: 1px solid rgba(59,130,246,0.15);
  padding-bottom: env(safe-area-inset-bottom, 0);
  box-shadow: 0 -2px 16px rgba(0,0,0,0.4);
}
.gnav-inner {
  display: flex; justify-content: space-around; align-items: center;
  padding: 6px 0 3px;
}

/* ── normal items ── */
.gnav-item {
  flex: 1; min-width: 0; text-decoration: none;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 2px; padding: 4px 2px;
  color: rgba(147,197,253,0.45);
  font-size: 8px; font-weight: 700; white-space: nowrap; letter-spacing: 0.03em;
  -webkit-tap-highlight-color: transparent; user-select: none;
  transition: color 0.2s, opacity 0.15s;
}
.gnav-item span { line-height: 1; }
.gnav-item.active { color: #3b82f6; }
.gnav-item.active svg { filter: drop-shadow(0 0 4px rgba(59,130,246,0.65)); }
.gnav-item:active { opacity: 0.6; }

/* ── agent center (logged in) ── */
.gnav-agent {
  flex: none; width: 48px; text-decoration: none;
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  color: rgba(147,197,253,0.5);
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.gnav-agent.active { color: #60a5fa; }
.brain-wrap {
  width: 40px; height: 40px; border-radius: 50%;
  background: #1e2220;
  border: 1.5px solid rgba(59,130,246,0.65);
  box-shadow: 0 0 0 2px #1e2220, 0 0 12px rgba(59,130,246,0.45), 0 0 24px rgba(30,58,138,0.25);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto; margin-top: -12px;
  animation: bwrap-pulse 3s ease-in-out infinite;
}
@keyframes bwrap-pulse {
  0%,100% { box-shadow: 0 0 0 2px #1e2220, 0 0 10px rgba(59,130,246,0.4), 0 0 20px rgba(30,58,138,0.2); }
  50%      { box-shadow: 0 0 0 2px #1e2220, 0 0 20px rgba(59,130,246,0.65), 0 0 38px rgba(30,58,138,0.35); }
}
.agent-lbl { font-size: 8px; font-weight: 700; letter-spacing: 0.04em; line-height: 1; }

/* ── register center (not logged in) ── */
.gnav-register {
  flex: none; width: 52px; text-decoration: none;
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  color: rgba(74,222,128,0.7);
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.gnav-register.active { color: #4ade80; }
.reg-wrap {
  width: 42px; height: 42px; border-radius: 50%;
  background: linear-gradient(135deg, #065f46, #047857);
  border: 1.5px solid rgba(74,222,128,0.6);
  box-shadow: 0 0 0 2px #2e3375, 0 0 12px rgba(74,222,128,0.4), 0 0 24px rgba(16,185,129,0.2);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto; margin-top: -12px;
  animation: reg-pulse 2.5s ease-in-out infinite;
}
@keyframes reg-pulse {
  0%,100% { box-shadow: 0 0 0 2px #2e3375, 0 0 8px rgba(74,222,128,0.35), 0 0 18px rgba(16,185,129,0.15); }
  50%      { box-shadow: 0 0 0 2px #2e3375, 0 0 16px rgba(74,222,128,0.6), 0 0 32px rgba(16,185,129,0.28); }
}
.reg-lbl { font-size: 8px; font-weight: 700; letter-spacing: 0.03em; line-height: 1; }

/* ── brain animations ── */
.nb-tdl { animation: tdl-flow 1.8s linear infinite; }
@keyframes tdl-flow { 0%{stroke-dashoffset:16;opacity:0.55} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.55} }
.nb-node-1,.nb-node-2,.nb-node-3,.nb-node-4,.nb-node-5 { transform-box:fill-box; transform-origin:center; }
.nb-node-1{animation:nb-node 2s ease-in-out infinite 0s}
.nb-node-2{animation:nb-node 2s ease-in-out infinite 0.4s}
.nb-node-3{animation:nb-node 2s ease-in-out infinite 0.8s}
.nb-node-4{animation:nb-node 2s ease-in-out infinite 1.2s}
.nb-node-5{animation:nb-node 2s ease-in-out infinite 1.6s}
@keyframes nb-node { 0%,100%{opacity:0.55;transform:scale(0.78)} 50%{opacity:1;transform:scale(1.32)} }

/* ── hide on desktop ── */
@media (min-width: 768px) { .gnav { display: none; } }
</style>
