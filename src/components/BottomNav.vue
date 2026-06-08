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

      <!-- POSITION 2: Network (always) -->
      <router-link to="/network" class="gnav-item" :class="{active: route.path==='/network'}">
        <img
            src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/4415ded0-6355-11f1-9488-d1cd5b84fe3e.gif?tr=f-auto"
            alt="အေးဂျင့်ကွန်ရက်"
            class="network-gif-icon"
          />
        <span>အေးဂျင့်ကွန်ရက်</span>
      </router-link>

      <!-- CENTER: AGENT (logged in) / REGISTER (not logged in) -->
      <template v-if="isLoggedIn">
        <router-link to="/agent" class="gnav-item gnav-agent-flat" :class="{active: route.path==='/agent'}">
          <img
            src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/2029838589331070977.gif?tr=f-auto"
            alt="agent"
            class="agent-gif-icon"
          />
          <span>အေးဂျင့်</span>
        </router-link>
      </template>

      <template v-else>
        <router-link to="/register" class="gnav-item gnav-register-flat" :class="{active: route.path==='/register'}">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/>
            <path d="M2 21c0-4 3.6-6.5 8-6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="19" y1="14" x2="19" y2="20" stroke="#4ade80" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="16" y1="17" x2="22" y2="17" stroke="#4ade80" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
          <span>မှတ်ပုံတင်</span>
        </router-link>
      </template>

      <!-- POSITION 4: Promotions GIF (always) -->
      <router-link to="/promotions" class="gnav-item gnav-promo-gif" :class="{active: route.path==='/promotions'}">
        <img
          src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/2029438851734429697.gif?tr=f-auto"
          alt="ပရိုမိုးရှင်း"
          class="promo-gif-icon"
        />
        <span>ပရိုမိုးရှင်း</span>
      </router-link>

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

/* ── agent flat center (logged in) — same size as others ── */
.gnav-agent-flat {
  color: rgba(147,197,253,0.6);
}
.gnav-agent-flat.active { color: #60a5fa; }
.agent-gif-icon {
  width: 26px; height: 26px;
  object-fit: cover;
  border-radius: 50%;
  border: 1.5px solid rgba(59,130,246,0.5);
}

/* ── register flat (not logged in center) ── */
.gnav-register-flat {
  color: rgba(74,222,128,0.75);
}
.gnav-register-flat.active { color: #4ade80; }
.gnav-register-flat svg { filter: drop-shadow(0 0 3px rgba(74,222,128,0.4)); }

/* ── promotions gif slot (always at position 4) ── */
.gnav-promo-gif {
  color: rgba(251,191,36,0.75);
}
.gnav-promo-gif.active { color: #fbbf24; }
.promo-gif-icon {
  width: 24px; height: 24px;
  object-fit: contain;
  border-radius: 6px;
}

/* ── hide on desktop ── */
@media (min-width: 768px) { .gnav { display: none; } }
/* ── network gif icon ── */
.network-gif-icon {
  width: 24px; height: 24px;
  object-fit: contain;
  border-radius: 6px;
}
</style>