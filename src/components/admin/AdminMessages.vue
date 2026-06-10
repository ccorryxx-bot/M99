<template>
  <div class="a-tab-content">
    <div class="a-sett-block">
      <div class="a-sett-ttl">Broadcast Message</div>
      <label class="a-mini-label">Title</label>
      <input v-model="newMsg.title" class="a-input" placeholder="Message title" />
      <label class="a-mini-label" style="margin-top:7px;">Body</label>
      <textarea v-model="newMsg.body" class="a-input a-textarea" placeholder="Message content..." rows="3"></textarea>
      <button @click="sendMsg" :disabled="msgSending" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <svg v-if="!msgSending" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        <span v-else class="a-spinner-sm"></span>
        {{ msgSending ? 'Sending...' : 'Send to All Users' }}
      </button>
      <p v-if="msgResult" :class="msgOk?'a-ok':'a-err'" style="text-align:center;margin-top:6px;font-size:10px;">{{ msgResult }}</p>
    </div>

    <div class="a-area-block" style="margin-top:8px;">
      <div class="a-area-hdr"><span class="a-area-ttl">Sent Messages</span></div>
      <div v-if="msgsLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else>
        <div v-for="m in msgs" :key="m.id" class="a-msg-row">
          <div class="a-msg-info">
            <span class="a-msg-title">{{ m.title }}</span>
            <span class="a-msg-body">{{ m.body }}</span>
            <span class="a-msg-date">{{ fmtDate(m.created_at) }}</span>
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
import { useAdmin } from '@/composables/useAdmin'
const { msgs, msgsLoading, newMsg, msgSending, msgResult, msgOk, fmtDate, sendMsg, deleteMsg } = useAdmin()
</script>
