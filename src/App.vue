<template>
  <div class="nova-root">
    <DesktopSidebar />
    <div class="nova-content-wrap">
      <div class="nova-page-frame">
        <router-view />
      </div>
      <BottomNav />
    </div>
  </div>
</template>

<script setup>
import BottomNav from '@/components/BottomNav.vue'
import DesktopSidebar from '@/components/DesktopSidebar.vue'
</script>

<style>
html, body { margin: 0; padding: 0; min-height: 100vh; }
body {
  background: linear-gradient(160deg, #06091a 0%, #060e1c 50%, #050c14 100%);
}

/* ── Mobile: plain block — no flex, no interference with inner scroll/sticky ── */
.nova-root {
  min-height: 100vh;
  position: relative;
}

.nova-content-wrap {
  min-height: 100vh;
  position: relative;
}

.nova-page-frame {
  /* no flex on mobile — pages manage their own height */
}

/* ── Desktop 768px+: introduce sidebar flex layout ── */
@media (min-width: 768px) {
  .nova-root {
    display: flex;
    margin-left: 230px;
  }

  .nova-content-wrap {
    flex: 1;
    display: flex;
    justify-content: center;
    background: transparent;
  }

  .nova-page-frame {
    width: 100%;
    max-width: 520px;
    min-height: 100vh;
    position: relative;
    box-shadow: 0 0 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04);
    background: linear-gradient(160deg, #08102a 0%, #0d1a36 20%, #0c1828 40%, #091420 60%, #07101a 80%, #050c14 100%);
  }
}

@media (min-width: 1280px) {
  .nova-root {
    margin-left: 260px;
  }
  .nova-page-frame {
    max-width: 560px;
  }
}
</style>
