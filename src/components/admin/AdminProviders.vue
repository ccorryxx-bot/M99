<template>
  <div class="a-tab-content">

    <!-- Provider Stats -->
    <div class="prov-stats-row">
      <div class="prov-stat" style="border-left:3px solid #16a34a;">
        <div class="prov-stat-val" style="color:#16a34a;">{{ activeProviders }}</div>
        <div class="prov-stat-lbl">Active Providers</div>
      </div>
      <div class="prov-stat" style="border-left:3px solid #dc2626;">
        <div class="prov-stat-val" style="color:#dc2626;">{{ inactiveProviders }}</div>
        <div class="prov-stat-lbl">Disabled</div>
      </div>
      <div class="prov-stat" style="border-left:3px solid #0891b2;">
        <div class="prov-stat-val" style="color:#0891b2;">{{ totalGamesActive }}</div>
        <div class="prov-stat-lbl">Games Active</div>
      </div>
    </div>

    <!-- Search + Filter -->
    <div class="a-filter-bar">
      <input v-model="provSearch" class="a-input a-srch" placeholder="Search provider..." style="flex:1;" />
      <select v-model="provCategory" class="a-select">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <button @click="addProviderModal = true" class="a-btn-primary a-btn-sm-p">+ Add</button>
    </div>

    <!-- Provider List -->
    <div v-if="loading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div v-for="prov in filteredProviders" :key="prov.id" class="prov-row">
        <div class="prov-logo" :style="`background:${prov._color}15;color:${prov._color}`">
          {{ prov.name?.slice(0,2).toUpperCase() }}
        </div>
        <div class="prov-info">
          <div class="prov-name">{{ prov.name }}</div>
          <div class="prov-meta">
            <span class="prov-cat-chip">{{ prov.category || 'Casino' }}</span>
            <span>{{ prov.game_count || 0 }} games</span>
            <span v-if="prov.api_status" class="prov-api-status" :class="prov.api_status === 'ok' ? 'api-ok' : 'api-err'">
              API: {{ prov.api_status }}
            </span>
          </div>
          <div class="prov-maintenance" v-if="prov.maintenance_until">
            🔧 Maintenance until {{ fmtDate(prov.maintenance_until) }}
          </div>
        </div>
        <div class="prov-right">
          <div class="prov-rtp" v-if="prov.rtp">RTP: {{ prov.rtp }}%</div>
          <button @click="toggleProvider(prov)" class="a-tog" :class="prov.is_active ? 'a-tog-on' : 'a-tog-off'">
            {{ prov.is_active ? 'ON' : 'OFF' }}
          </button>
          <button @click="editProvider(prov)" class="a-btn-sm a-btn-ghost">✏</button>
          <button @click="bulkToggleGames(prov)" class="a-btn-sm a-btn-ghost" title="Toggle all games">🎮</button>
        </div>
      </div>
      <div v-if="!filteredProviders.length" class="a-empty">No providers found</div>
    </div>

    <!-- Games by Provider (Expandable) -->
    <div class="a-sett-block" style="margin-top:12px;">
      <div class="a-sett-ttl" style="display:flex;align-items:center;justify-content:space-between;">
        <span>Game Management</span>
        <select v-model="selectedProvId" class="a-select" style="font-size:10px;">
          <option value="">All Providers</option>
          <option v-for="p in providers" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>
      </div>
      <div v-if="gamesLoading" class="a-loading"><span class="a-spinner"></span></div>
      <div v-else>
        <div class="prov-games-hdr">
          <input v-model="gameSearch" class="a-input a-srch" placeholder="Search game..." style="flex:1;" />
          <button @click="bulkEnableGames" class="a-btn-sm a-btn-success">Enable All</button>
          <button @click="bulkDisableGames" class="a-btn-sm a-btn-danger">Disable All</button>
        </div>
        <div v-for="g in filteredGames" :key="g.id" class="prov-game-row">
          <div class="prov-game-thumb" v-if="g.thumbnail_url">
            <img :src="g.thumbnail_url" alt="" />
          </div>
          <div class="prov-game-thumb-ph" v-else>🎮</div>
          <div class="prov-game-info">
            <div class="prov-game-name">{{ g.name }}</div>
            <div class="prov-game-meta">{{ g.category }} · {{ g.provider_name || selectedProvId }}</div>
          </div>
          <div class="prov-game-right">
            <div v-if="g.rtp" class="prov-rtp">{{ g.rtp }}%</div>
            <button @click="toggleGame(g)" class="a-tog" :class="g.is_active ? 'a-tog-on' : 'a-tog-off'" style="font-size:9px;padding:3px 8px;">
              {{ g.is_active ? 'ON' : 'OFF' }}
            </button>
          </div>
        </div>
        <div v-if="!filteredGames.length" class="a-empty-sm">No games found</div>
      </div>
    </div>

    <!-- Add/Edit Provider Modal -->
    <Teleport to="body">
      <div v-if="addProviderModal || editingProv" class="tx-modal-overlay" @click.self="closeProvModal">
        <div class="tx-modal" style="max-width:380px;">
          <h3 style="font-size:14px;font-weight:800;color:#0f172a;margin:0 0 12px;">{{ editingProv ? 'Edit Provider' : 'Add Provider' }}</h3>
          <label class="a-mini-label">Provider Name</label>
          <input v-model="provForm.name" class="a-input" placeholder="e.g. Pragmatic Play" style="margin-bottom:8px;" />
          <label class="a-mini-label">Category</label>
          <select v-model="provForm.category" class="a-select" style="width:100%;margin-bottom:8px;">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
          <label class="a-mini-label">API Endpoint (optional)</label>
          <input v-model="provForm.api_url" class="a-input" placeholder="https://api.provider.com" style="margin-bottom:8px;" />
          <label class="a-mini-label">API Key (optional)</label>
          <input v-model="provForm.api_key" type="password" class="a-input" placeholder="Provider API key" style="margin-bottom:8px;" />
          <label class="a-mini-label">Default RTP (%)</label>
          <input v-model.number="provForm.rtp" type="number" class="a-input" placeholder="96.5" style="margin-bottom:8px;" />
          <div style="display:flex;gap:8px;margin-top:4px;">
            <button @click="closeProvModal" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button @click="saveProvider" :disabled="provSaving || !provForm.name" class="a-btn-primary" style="flex:2;">
              <span v-if="provSaving" class="a-spinner-sm"></span>
              {{ editingProv ? 'Update' : 'Add Provider' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { games, gamesLoading, gameQ, gameCats, filteredGames: adminFilteredGames, fmtDate, showToast, writeAudit } = useAdmin()

const providers      = ref([])
const loading        = ref(false)
const provSearch     = ref('')
const provCategory   = ref('')
const selectedProvId = ref('')
const gameSearch     = ref('')
const addProviderModal = ref(false)
const editingProv    = ref(null)
const provSaving     = ref(false)

const provForm = reactive({ name: '', category: 'Casino', api_url: '', api_key: '', rtp: 96.5 })

const categories = ['Casino', 'Slots', 'Live', 'Sports', 'Lottery', 'Poker', 'Fishing']
const provColors = ['#4f46e5','#0891b2','#16a34a','#d97706','#dc2626','#7c3aed','#db2777']

const activeProviders  = computed(() => providers.value.filter(p => p.is_active).length)
const inactiveProviders = computed(() => providers.value.filter(p => !p.is_active).length)
const totalGamesActive  = computed(() => games.value.filter(g => g.is_active).length)

const filteredProviders = computed(() => {
  let list = providers.value
  if (provSearch.value) list = list.filter(p => p.name?.toLowerCase().includes(provSearch.value.toLowerCase()))
  if (provCategory.value) list = list.filter(p => p.category === provCategory.value)
  return list
})

const filteredGames = computed(() => {
  let list = games.value
  if (selectedProvId.value) list = list.filter(g => g.provider_id === selectedProvId.value)
  if (gameSearch.value) list = list.filter(g => g.name?.toLowerCase().includes(gameSearch.value.toLowerCase()))
  return list
})

async function loadProviders() {
  loading.value = true
  try {
    const { data } = await supabase.from('providers').select('*').order('name')
    providers.value = (data || []).map((p, i) => ({ ...p, _color: provColors[i % provColors.length] }))
    if (!providers.value.length) {
      providers.value = [
        { id: '1', name: 'Pragmatic Play', category: 'Slots', is_active: true, game_count: 85, rtp: 96.5, _color: '#4f46e5' },
        { id: '2', name: 'Evolution Gaming', category: 'Live', is_active: true, game_count: 42, rtp: 97.2, _color: '#0891b2' },
        { id: '3', name: 'NetEnt', category: 'Slots', is_active: true, game_count: 60, rtp: 96.0, _color: '#16a34a' },
        { id: '4', name: 'Playtech', category: 'Casino', is_active: false, game_count: 120, rtp: 95.5, _color: '#d97706' },
      ]
    }
  } catch (e) { showToast(e.message, 'error') }
  finally { loading.value = false }
}

async function toggleProvider(prov) {
  const newVal = !prov.is_active
  try {
    await supabase.from('providers').update({ is_active: newVal }).eq('id', prov.id)
    prov.is_active = newVal
    showToast(`${prov.name} ${newVal ? 'enabled' : 'disabled'}`, 'success')
    writeAudit(newVal ? 'ENABLE_PROVIDER' : 'DISABLE_PROVIDER', prov.name, '')
  } catch (e) { showToast(e.message, 'error') }
}

async function bulkToggleGames(prov) {
  const provGames = games.value.filter(g => g.provider_id === prov.id || g.category === prov.category)
  const newVal = !prov.is_active
  for (const g of provGames) {
    await supabase.from('games').update({ is_active: prov.is_active }).eq('id', g.id).catch(() => {})
    g.is_active = prov.is_active
  }
  showToast(`${provGames.length} games ${prov.is_active ? 'enabled' : 'disabled'}`, 'success')
  writeAudit('BULK_TOGGLE_GAMES', prov.name, `${provGames.length} games`)
}

async function toggleGame(g) {
  const newVal = !g.is_active
  await supabase.from('games').update({ is_active: newVal }).eq('id', g.id)
  g.is_active = newVal
  showToast(`${g.name} ${newVal ? 'enabled' : 'disabled'}`, 'success')
}

async function bulkEnableGames() {
  for (const g of filteredGames.value) { await supabase.from('games').update({ is_active: true }).eq('id', g.id).catch(()=>{}); g.is_active = true }
  showToast(`${filteredGames.value.length} games enabled`, 'success')
}
async function bulkDisableGames() {
  for (const g of filteredGames.value) { await supabase.from('games').update({ is_active: false }).eq('id', g.id).catch(()=>{}); g.is_active = false }
  showToast(`${filteredGames.value.length} games disabled`, 'success')
}

function editProvider(prov) {
  editingProv.value = prov
  Object.assign(provForm, { name: prov.name, category: prov.category || 'Casino', api_url: prov.api_url || '', api_key: '', rtp: prov.rtp || 96.5 })
}

function closeProvModal() {
  addProviderModal.value = false; editingProv.value = null
  Object.assign(provForm, { name: '', category: 'Casino', api_url: '', api_key: '', rtp: 96.5 })
}

async function saveProvider() {
  provSaving.value = true
  try {
    const payload = { name: provForm.name, category: provForm.category, api_url: provForm.api_url, rtp: provForm.rtp, is_active: true }
    if (editingProv.value) {
      await supabase.from('providers').update(payload).eq('id', editingProv.value.id)
      Object.assign(editingProv.value, payload)
      showToast('Provider updated ✓', 'success')
    } else {
      const { data } = await supabase.from('providers').insert(payload).select()
      providers.value.push({ ...(data?.[0] || payload), _color: provColors[providers.value.length % provColors.length] })
      showToast('Provider added ✓', 'success')
    }
    writeAudit('SAVE_PROVIDER', provForm.name, '')
    closeProvModal()
  } catch (e) { showToast(e.message, 'error') }
  finally { provSaving.value = false }
}

onMounted(async () => {
  await Promise.all([loadProviders()])
})
</script>

<style scoped>
.prov-stats-row { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px; }
.prov-stat { background:#fff;border-radius:10px;padding:10px 12px;text-align:center; }
.prov-stat-val { font-size:22px;font-weight:900;line-height:1;margin-bottom:3px; }
.prov-stat-lbl { font-size:9px;color:#94a3b8;font-weight:600; }
.prov-row { display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid #f1f5f9; }
.prov-logo { width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0; }
.prov-info { flex:1;min-width:0; }
.prov-name { font-size:12px;font-weight:700;color:#0f172a;margin-bottom:3px; }
.prov-meta { display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:10px;color:#64748b; }
.prov-cat-chip { background:#ede9fe;color:#4f46e5;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:700; }
.prov-api-status { font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px; }
.api-ok { background:#dcfce7;color:#15803d; }
.api-err { background:#fee2e2;color:#dc2626; }
.prov-maintenance { font-size:9px;color:#d97706;margin-top:2px; }
.prov-right { display:flex;align-items:center;gap:6px;flex-shrink:0; }
.prov-rtp { font-size:9px;font-weight:700;background:#e0f2fe;color:#0891b2;padding:2px 6px;border-radius:4px; }
.prov-games-hdr { display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap; }
.prov-game-row { display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid #f1f5f9; }
.prov-game-thumb { width:32px;height:32px;border-radius:6px;overflow:hidden;flex-shrink:0; }
.prov-game-thumb img { width:100%;height:100%;object-fit:cover; }
.prov-game-thumb-ph { width:32px;height:32px;border-radius:6px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0; }
.prov-game-info { flex:1;min-width:0; }
.prov-game-name { font-size:11px;font-weight:700;color:#0f172a; }
.prov-game-meta { font-size:9px;color:#94a3b8;margin-top:1px; }
.prov-game-right { display:flex;align-items:center;gap:6px;flex-shrink:0; }
.tx-modal-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px; }
.tx-modal { background:#fff;border-radius:12px;padding:18px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3); }
</style>
