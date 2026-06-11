<template>
  <div class="nova-root">
    <DesktopSidebar v-if="!isFullScreen" />
    <div class="nova-content-wrap">
      <div class="nova-page-frame">
        <router-view />
      </div>
      <BottomNav v-if="!isFullScreen" />
    </div>

    <!-- ── Global Session Toast ── -->
    <Transition name="g-toast-slide">
      <div v-if="sessionToast.show" class="g-session-toast" :class="'g-toast--' + sessionToast.type">
        <span>{{ sessionToast.msg }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
import DesktopSidebar from '@/components/DesktopSidebar.vue'
import { supabase } from '@/supabase'

const route = useRoute()
const fullScreenRoutes = ['/exchange-code', '/daily-bonus', '/admin', '/device-sessions']
const isFullScreen = computed(() => fullScreenRoutes.includes(route.path))

// ── Session expiry toast ───────────────────────────────────────────────────────
const sessionToast = ref({ show: false, msg: '', type: 'info' })
let sessionToastTimer = null
let authListener = null

function showSessionToast(msg, type = 'info') {
  sessionToast.value = { show: true, msg, type }
  clearTimeout(sessionToastTimer)
  sessionToastTimer = setTimeout(() => { sessionToast.value.show = false }, 3500)
}

onMounted(() => {
  const { data } = supabase.auth.onAuthStateChange((event) => {
    if (event === 'TOKEN_REFRESHED') return
    if (event === 'SIGNED_OUT') {
      localStorage.removeItem('sb_token')
      showSessionToast('⚠️ Session ကုန်သွားပြီ — ပြန် Login ဝင်ပါ', 'warn')
    }
  })
  authListener = data
})

onUnmounted(() => {
  authListener?.subscription?.unsubscribe()
  clearTimeout(sessionToastTimer)
})
</script>

<style>
html, body { margin: 0; padding: 0; min-height: 100vh; }

/* ── Global session toast ── */
.g-session-toast {
  position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
  z-index: 99999; padding: 11px 20px; border-radius: 99px;
  font-size: 12.5px; font-weight: 700; white-space: nowrap;
  box-shadow: 0 6px 24px rgba(0,0,0,0.45);
  pointer-events: none;
}
.g-toast--warn { background: rgba(217,119,6,0.95); color: #fff; border: 1px solid rgba(251,191,36,0.4); }
.g-toast--info { background: rgba(14,20,56,0.95); color: #fff; border: 1px solid rgba(34,197,94,0.3); }
.g-toast--error { background: rgba(185,28,28,0.95); color: #fff; border: 1px solid rgba(248,113,113,0.4); }
.g-toast-slide-enter-active { animation: gToastIn 0.3s cubic-bezier(0.22,1,0.36,1); }
.g-toast-slide-leave-active { animation: gToastIn 0.2s ease-in reverse; }
@keyframes gToastIn { from { opacity: 0; transform: translateX(-50%) translateY(-10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
body { background: #3d4187; }

.nova-root { min-height: 100vh; position: relative; }
.nova-content-wrap { min-height: 100vh; position: relative; }

@media (min-width: 768px) {
  .nova-root { display: flex; margin-left: 230px; }
  .nova-content-wrap { flex: 1; display: flex; justify-content: center; background: transparent; }
  .nova-page-frame {
    width: 100%; max-width: 520px; min-height: 100vh; position: relative;
    box-shadow: 0 0 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04);
    background: #3d4187;
  }
}
@media (min-width: 1280px) {
  .nova-root { margin-left: 260px; }
  .nova-page-frame { max-width: 560px; }
}
</style>
