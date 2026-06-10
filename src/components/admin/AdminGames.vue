<template>
  <div class="a-tab-content">
    <div class="a-filter-bar">
      <input v-model="gameQ" class="a-input a-srch" placeholder="Search game name..." />
      <select v-model="gameCat" class="a-select">
        <option value="">All Categories</option>
        <option v-for="c in gameCats" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div v-if="gamesLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div v-for="g in filteredGames" :key="g.id" class="a-game-row">
        <div class="a-game-thumb" v-if="g.thumbnail_url">
          <img :src="g.thumbnail_url" alt="" />
        </div>
        <div class="a-game-thumb a-game-thumb-ph" v-else>
          <svg width="14" height="14" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
        </div>
        <div class="a-game-info">
          <span class="a-game-name">{{ g.name }}</span>
          <span class="a-game-cat">{{ g.category || '—' }}</span>
        </div>
        <button @click="doToggleGame(g)" :class="g.is_active?'a-tog a-tog-on':'a-tog a-tog-off'">
          {{ g.is_active ? 'ON' : 'OFF' }}
        </button>
      </div>
      <div v-if="!filteredGames.length" class="a-empty">No games found</div>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { gamesLoading, gameQ, gameCat, gameCats, filteredGames, doToggleGame } = useAdmin()
</script>
