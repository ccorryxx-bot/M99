<template>
  <div class="a-tab-content">
    <div class="a-filter-bar">
      <input v-model="userQ" class="a-input a-srch" placeholder="Search username / phone..." />
    </div>

    <div v-if="usersLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div v-for="u in filteredUsers" :key="u.id" class="a-user-row">
        <div class="a-uav">{{ (u.username||'?')[0].toUpperCase() }}</div>
        <div class="a-uinfo">
          <span class="a-uname">{{ u.username }}</span>
          <span class="a-umeta">{{ u.phone || '—' }} · VIP {{ u.vip_level||0 }}</span>
        </div>
        <div class="a-uright">
          <span :class="u.is_banned?'a-badge-danger':'a-badge-success'">{{ u.is_banned?'BANNED':'ACTIVE' }}</span>
          <span class="a-ubal">{{ fmtNum(u.balance) }} Ks</span>
        </div>
        <button class="a-eye-btn" @click="openPlayer(u)" title="View Details">
          <svg width="16" height="16" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
      </div>
      <div v-if="!filteredUsers.length" class="a-empty">No users found</div>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { usersLoading, userQ, filteredUsers, fmtNum, openPlayer } = useAdmin()
</script>
