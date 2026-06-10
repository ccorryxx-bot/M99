<template>
  <Transition name="slide-left">
    <aside v-if="leftDrawer" class="a-left-drawer">
      <div class="a-drawer-hdr">
        <span class="a-drawer-title">Site Management</span>
        <button @click="leftDrawer=false" class="a-icon-btn">
          <svg width="14" height="14" fill="none" stroke="#4f46e5" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="a-drawer-body">
        <div class="a-drawer-section">
          <div class="a-section-label">
            <svg width="13" height="13" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            Homepage Banners
          </div>
          <div v-for="i in 4" :key="i" class="a-banner-row">
            <span class="a-banner-num">{{ i }}</span>
            <input v-model="drawerSettings['banner_'+i+'_url']" class="a-input a-input-sm" :placeholder="'Banner '+i+' Image URL'" />
          </div>
        </div>

        <div class="a-drawer-section">
          <div class="a-section-label">
            <svg width="13" height="13" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            CS Support
          </div>
          <label class="a-mini-label">Telegram Username</label>
          <input v-model="drawerSettings.cs_telegram" class="a-input a-input-sm" placeholder="@username" />
          <label class="a-mini-label" style="margin-top:8px;">Live Chat URL</label>
          <input v-model="drawerSettings.cs_livechat_url" class="a-input a-input-sm" placeholder="https://..." />
          <label class="a-mini-label" style="margin-top:8px;">Control+ Number</label>
          <input v-model="drawerSettings.cs_control_plus" class="a-input a-input-sm" placeholder="09XXXXXXXXX" />
        </div>

        <button @click="saveDrawerSettings" :disabled="drawerSaving" class="a-btn-primary" style="width:100%;margin-top:4px;">
          <svg v-if="!drawerSaving" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <span class="a-spinner-sm" v-else></span>
          {{ drawerSaving ? 'Saving...' : 'Save Changes' }}
        </button>
        <p v-if="drawerMsg" :class="drawerOk?'a-ok':'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ drawerMsg }}</p>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { leftDrawer, drawerSettings, drawerSaving, drawerMsg, drawerOk, saveDrawerSettings } = useAdmin()
</script>
