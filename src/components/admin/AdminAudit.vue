<template>
  <div class="a-tab-content">

    <!-- IP Blacklist -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#dc2626" stroke-width="2" viewBox="0 0 24 24" style="margin-right:5px;vertical-align:middle"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
        IP Blacklist
      </div>
      <div class="a-form-row">
        <input v-model="newIp.ip_address" class="a-input a-input-sm" placeholder="192.168.1.1" style="flex:2;" />
        <input v-model="newIp.reason" class="a-input a-input-sm" placeholder="Reason..." style="flex:3;" />
        <button @click="addIp" :disabled="!newIp.ip_address" class="a-btn-sm a-btn-danger" style="flex-shrink:0;">
          <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          Block
        </button>
      </div>
      <div v-if="ipLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else style="margin-top:8px;">
        <div v-for="ip in ipList" :key="ip.id" class="a-ip-row">
          <span class="a-mono-val" style="font-size:10px;color:#dc2626;">{{ ip.ip_address }}</span>
          <span class="a-lbl" style="flex:1;padding:0 8px;font-size:9px;">{{ ip.reason || '—' }}</span>
          <span style="font-size:9px;color:#94a3b8;margin-right:8px;">{{ fmtDate(ip.created_at) }}</span>
          <button @click="removeIp(ip.id)" class="a-icon-btn">
            <svg width="12" height="12" fill="none" stroke="#94a3b8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div v-if="!ipList.length" class="a-empty-sm">No blocked IPs</div>
      </div>
    </div>

    <!-- Audit Log -->
    <div class="a-area-block">
      <div class="a-area-hdr">
        <span class="a-area-ttl">Admin Audit Log</span>
        <button @click="fetchAuditLog" class="a-icon-btn">
          <svg width="13" height="13" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        </button>
      </div>
      <div v-if="auditLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else>
        <div v-for="log in auditLog" :key="log.id" class="a-audit-row">
          <div class="a-audit-action-badge" :class="getAuditClass(log.action)">{{ log.action }}</div>
          <div class="a-audit-info">
            <span class="a-audit-target">{{ log.target_user || '—' }}</span>
            <span class="a-audit-detail">{{ log.details }}</span>
          </div>
          <span class="a-audit-time">{{ fmtDate(log.created_at) }}</span>
        </div>
        <div v-if="!auditLog.length" class="a-empty-sm">No audit records yet</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { ipList, ipLoading, newIp, auditLog, auditLoading, fmtDate, addIp, removeIp, fetchAuditLog } = useAdmin()

function getAuditClass(action) {
  if (!action) return 'a-audit-badge--info'
  const a = action.toLowerCase()
  if (a.includes('ban') || a.includes('reject') || a.includes('delete')) return 'a-audit-badge--danger'
  if (a.includes('approve') || a.includes('add') || a.includes('unban')) return 'a-audit-badge--success'
  if (a.includes('adjust') || a.includes('reset')) return 'a-audit-badge--warn'
  return 'a-audit-badge--info'
}
</script>
