<template>
  <div class="a-tab-content">
    <div class="a-filter-bar">
      <input v-model="userQ" class="a-input a-srch" placeholder="Search username / phone..." />
    </div>

    <div v-if="usersLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div v-for="u in filteredUsers" :key="u.id" class="a-user-row" @click="openPlayer(u)">
        <div class="a-uav">{{ (u.username||'?')[0].toUpperCase() }}</div>
        <div class="a-uinfo">
          <span class="a-uname">{{ u.username }}</span>
          <span class="a-umeta">{{ u.phone || '—' }} · VIP {{ u.vip_level||0 }}</span>
        </div>
        <div class="a-uright">
          <span :class="u.is_banned?'a-badge-danger':'a-badge-success'">{{ u.is_banned?'BANNED':'ACTIVE' }}</span>
          <span class="a-ubal">{{ fmtNum(u.balance) }} Ks</span>
        </div>
      </div>
      <div v-if="!filteredUsers.length" class="a-empty">No users found</div>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { usersLoading, userQ, filteredUsers, fmtNum, openPlayer } = useAdmin()
</script>
