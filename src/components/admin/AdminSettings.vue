<template>
  <div class="a-tab-content">
    <div v-if="settLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div class="a-sett-block">
        <div class="a-sett-ttl">KBZ Pay</div>
        <label class="a-mini-label">Recipient Name</label>
        <input v-model="sett.kpay_recipient_name" class="a-input" placeholder="Name" />
        <label class="a-mini-label" style="margin-top:7px;">Account Number</label>
        <input v-model="sett.kpay_recipient_account" class="a-input" placeholder="09XXXXXXXXX" />
      </div>

      <div class="a-sett-block">
        <div class="a-sett-ttl">Wave Pay</div>
        <label class="a-mini-label">Recipient Name</label>
        <input v-model="sett.wave_recipient_name" class="a-input" placeholder="Name" />
        <label class="a-mini-label" style="margin-top:7px;">Account Number</label>
        <input v-model="sett.wave_recipient_account" class="a-input" placeholder="09XXXXXXXXX" />
      </div>

      <div class="a-sett-block">
        <div class="a-sett-ttl">Commission</div>
        <label class="a-mini-label">Referral Commission (%)</label>
        <input v-model.number="sett.referral_commission_pct" type="number" class="a-input" placeholder="e.g. 5" />
      </div>

      <button @click="saveSett" :disabled="settSaving" class="a-btn-primary" style="width:100%;margin-top:4px;">
        <svg v-if="!settSaving" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        <span v-else class="a-spinner-sm"></span>
        {{ settSaving ? 'Saving...' : 'Save Settings' }}
      </button>
      <p v-if="settMsg" :class="settOk?'a-ok':'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ settMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { sett, settLoading, settSaving, settMsg, settOk, saveSett } = useAdmin()
</script>
