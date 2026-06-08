<template>
  <div class="nova-root">
    <DesktopSidebar v-if="!isFullScreen" />
    <div class="nova-content-wrap">
      <div class="nova-page-frame">
        <router-view />
      </div>
      <BottomNav v-if="!isFullScreen" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
import DesktopSidebar from '@/components/DesktopSidebar.vue'

const route = useRoute()
const fullScreenRoutes = ['/exchange-code', '/daily-bonus']
const isFullScreen = computed(() => fullScreenRoutes.includes(route.path))
</script>

<style>
html, body { margin: 0; padding: 0; min-height: 100vh; }
body {
  background: #3d4187;
}

.nova-root {
  min-height: 100vh;
  position: relative;
}

.nova-content-wrap {
  min-height: 100vh;
  position: relative;
}

.nova-page-frame {
  /* no flex on mobile */
}

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
    background: #3d4187;
  }

  /* full-screen pages: remove sidebar offset */
  .nova-root.full-screen-page {
    margin-left: 0;
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
