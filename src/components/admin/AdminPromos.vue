<template>
  <div class="a-tab-content">

    <!-- Create new promo -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="margin-right:5px;vertical-align:middle"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        Create Promo Code
      </div>
      <div class="a-promo-form">
        <div class="a-form-row">
          <div class="a-form-col">
            <label class="a-mini-label">Code</label>
            <input v-model="newPromo.code" class="a-input a-input-sm" placeholder="BONUS100" style="text-transform:uppercase;" />
          </div>
          <div class="a-form-col">
            <label class="a-mini-label">Bonus (Ks)</label>
            <input v-model.number="newPromo.bonus_amount" type="number" min="0" class="a-input a-input-sm" placeholder="5000" />
          </div>
        </div>
        <div class="a-form-row" style="margin-top:7px;">
          <div class="a-form-col">
            <label class="a-mini-label">Max Uses</label>
            <input v-model.number="newPromo.max_uses" type="number" min="1" class="a-input a-input-sm" placeholder="100" />
          </div>
          <div class="a-form-col">
            <label class="a-mini-label">Expiry Date</label>
            <input v-model="newPromo.expiry_date" type="date" class="a-input a-input-sm" />
          </div>
        </div>
        <button @click="createPromo" :disabled="promoSaving || !newPromo.code" class="a-btn-primary" style="width:100%;margin-top:10px;">
          <span v-if="promoSaving" class="a-spinner-sm"></span>
          <svg v-else width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          {{ promoSaving ? 'Creating...' : 'Create Code' }}
        </button>
        <p v-if="promoMsg" :class="promoOk?'a-ok':'a-err'" style="margin-top:5px;text-align:center;font-size:10px;">{{ promoMsg }}</p>
      </div>
    </div>

    <!-- Promo list -->
    <div v-if="promosLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div v-if="!promos.length" class="a-empty">No promo codes yet</div>
      <div v-for="p in promos" :key="p.id" class="a-promo-row">
        <div class="a-promo-left">
          <span class="a-promo-code">{{ p.code }}</span>
          <span class="a-promo-meta">
            +{{ fmtNum(p.bonus_amount) }} Ks ·
            {{ p.uses_count }}/{{ p.max_uses }} uses ·
            <span v-if="p.expiry_date">Exp: {{ fmtDate(p.expiry_date) }}</span>
            <span v-else>No expiry</span>
          </span>
        </div>
        <div class="a-promo-right">
          <button @click="togglePromo(p)" class="a-tog" :class="p.is_active?'a-tog-on':'a-tog-off'">
            {{ p.is_active ? 'ON' : 'OFF' }}
          </button>
          <button @click="deletePromo(p.id)" class="a-icon-btn" title="Delete">
            <svg width="13" height="13" fill="none" stroke="#dc2626" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { promos, promosLoading, newPromo, promoSaving, promoMsg, promoOk, fmtNum, fmtDate, createPromo, deletePromo, togglePromo } = useAdmin()
</script>
