<template>
  <div class="a-tab-content">

    <!-- Compose Message -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">📢 Send Message</div>
      
      <!-- Target Audience -->
      <label class="a-mini-label">Target Audience</label>
      <div class="msg-target-grid">
        <button v-for="t in targets" :key="t.key"
          @click="msgTarget=t.key"
          class="msg-target-btn" :class="msgTarget===t.key?'msg-target--active':''">
          <span class="msg-target-icon">{{ t.icon }}</span>
          <span class="msg-target-name">{{ t.label }}</span>
          <span class="msg-target-count">{{ t.count }}</span>
        </button>
      </div>

      <label class="a-mini-label" style="margin-top:10px;">Title</label>
      <input v-model="newMsg.title" class="a-input" placeholder="Message title" />
      <label class="a-mini-label" style="margin-top:7px;">Body</label>
      <textarea v-model="newMsg.body" class="a-input a-textarea" placeholder="Message content..." rows="3"></textarea>

      <!-- Preview -->
      <div v-if="newMsg.title || newMsg.body" class="msg-preview">
        <div class="msg-preview-label">Preview</div>
        <div class="msg-preview-card">
          <div class="msg-preview-title">{{ newMsg.title || '(no title)' }}</div>
          <div class="msg-preview-body">{{ newMsg.body || '(no body)' }}</div>
          <div class="msg-preview-meta">To: {{ targets.find(t=>t.key===msgTarget)?.label }}</div>
        </div>
      </div>

      <button @click="doSendMsg" :disabled="msgSending||!newMsg.title||!newMsg.body" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <svg v-if="!msgSending" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        <span v-else class="a-spinner-sm"></span>
        {{ msgSending ? 'Sending...' : `Send to ${targets.find(t=>t.key===msgTarget)?.label}` }}
      </button>
      <p v-if="msgResult" :class="msgOk?'a-ok':'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ msgResult }}</p>
    </div>

    <!-- Sent Messages History -->
    <div class="a-area-block" style="margin-top:8px;">
      <div class="a-area-hdr">
        <span class="a-area-ttl">Sent Messages</span>
        <button @click="fetchMsgs" class="a-icon-btn">↻</button>
      </div>
      <div v-if="msgsLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else>
        <div v-for="m in msgs" :key="m.id" class="a-msg-row">
          <div class="a-msg-info">
            <span class="a-msg-title">{{ m.title }}</span>
            <span class="a-msg-body">{{ m.body }}</span>
            <div style="display:flex;align-items:center;gap:8px;margin-top:3px;">
              <span class="msg-audience-chip">{{ m.audience || 'All Users' }}</span>
              <span class="a-msg-date">{{ fmtDate(m.created_at) }}</span>
            </div>
          </div>
          <button @click="deleteMsg(m.id)" class="a-icon-btn a-del-btn">
            <svg width="12" height="12" fill="none" stroke="#dc2626" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
        <div v-if="!msgs.length" class="a-empty-sm">No messages sent</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useAdmin } from '@/composables/useAdmin'

const {
  msgs, msgsLoading, newMsg, msgSending, msgResult, msgOk,
  users, usersLoading, stats,
  fmtDate, showToast, writeAudit,
  fetchMsgs, fetchUsers, adminKey
} = useAdmin()

const msgTarget = ref('all')

// Compute segment counts
const vipUsers     = computed(() => users.value.filter(u => (u.vip_level||0) >= 1))
const inactiveUsers = computed(() => users.value.filter(u => {
  if (!u.last_active_at && !u.created_at) return false
  const last = new Date(u.last_active_at || u.created_at)
  return (Date.now() - last.getTime()) > 7 * 86400000
}))
const newUsers7d   = computed(() => users.value.filter(u => {
  const d = new Date(u.created_at); return (Date.now() - d.getTime()) < 7 * 86400000
}))
const highBalUsers = computed(() => users.value.filter(u => Number(u.balance||0) >= 100000))

const targets = computed(() => [
  { key: 'all',      label: 'All Users',        icon: '👥', count: users.value.length || stats.value.total_users || 0 },
  { key: 'vip',      label: 'VIP Players',      icon: '👑', count: vipUsers.value.length },
  { key: 'inactive', label: 'Inactive 7d+',     icon: '😴', count: inactiveUsers.value.length },
  { key: 'new',      label: 'New Users (7d)',   icon: '🆕', count: newUsers7d.value.length },
  { key: 'highbal',  label: 'High Balance',     icon: '💰', count: highBalUsers.value.length },
])

async function doSendMsg() {
  if (!newMsg.value.title || !newMsg.value.body) return
  msgSending.value = true; msgResult.value = ''

  try {
    // Get target user IDs
    let targetUsers = []
    if (msgTarget.value === 'vip')      targetUsers = vipUsers.value.map(u => u.id)
    else if (msgTarget.value === 'inactive') targetUsers = inactiveUsers.value.map(u => u.id)
    else if (msgTarget.value === 'new') targetUsers = newUsers7d.value.map(u => u.id)
    else if (msgTarget.value === 'highbal') targetUsers = highBalUsers.value.map(u => u.id)

    const audience = targets.value.find(t => t.key === msgTarget.value)?.label || 'All Users'

    // Insert to admin_messages
    const { error } = await supabase.from('admin_messages').insert({
      title: newMsg.value.title,
      body: newMsg.value.body,
      audience,
      target_ids: targetUsers.length ? targetUsers : null,
      created_at: new Date().toISOString()
    })
    if (error) throw error

    msgOk.value = true; msgResult.value = `✓ Sent to ${audience} (${targetUsers.length || 'all'})`
    showToast(`Message sent to ${audience}!`, 'success')
    writeAudit('SEND_MESSAGE', audience, newMsg.value.title)
    newMsg.value = { title: '', body: '' }
    await fetchMsgs()
  } catch (e) {
    msgOk.value = false; msgResult.value = e.message
    showToast(e.message, 'error')
  } finally {
    msgSending.value = false
    setTimeout(() => { msgResult.value = '' }, 4000)
  }
}

onMounted(async () => { await fetchMsgs(); await fetchUsers() })
</script>

<style scoped>
.msg-target-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:4px; }
.msg-target-btn { display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:8px;border:1.5px solid #e2e8f0;background:#f8fafc;cursor:pointer;text-align:left;transition:all .15s; }
.msg-target--active { border-color:#4f46e5;background:#ede9fe; }
.msg-target-icon { font-size:14px;flex-shrink:0; }
.msg-target-name { font-size:10px;font-weight:700;color:#0f172a;flex:1; }
.msg-target-count { font-size:10px;font-weight:800;color:#4f46e5;background:#e0e7ff;padding:1px 5px;border-radius:4px;flex-shrink:0; }
.msg-preview { margin-top:10px; }
.msg-preview-label { font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:4px; }
.msg-preview-card { background:#f1f5f9;border-radius:8px;padding:10px;border-left:3px solid #4f46e5; }
.msg-preview-title { font-size:12px;font-weight:800;color:#0f172a;margin-bottom:3px; }
.msg-preview-body { font-size:11px;color:#475569;margin-bottom:4px; }
.msg-preview-meta { font-size:9px;color:#94a3b8; }
.a-msg-row { display:flex;align-items:flex-start;gap:8px;padding:8px 0;border-bottom:1px solid #f1f5f9; }
.a-msg-info { flex:1;min-width:0; }
.a-msg-title { display:block;font-size:11px;font-weight:700;color:#0f172a;margin-bottom:2px; }
.a-msg-body { display:block;font-size:10px;color:#64748b;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.a-msg-date { font-size:9px;color:#94a3b8; }
.msg-audience-chip { font-size:9px;font-weight:700;background:#ede9fe;color:#4f46e5;padding:1px 6px;border-radius:4px; }
.a-del-btn { color:#dc2626 !important; }
</style>
