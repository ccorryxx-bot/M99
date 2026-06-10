<template>
  <div class="a-tab-content">

    <!-- Role Summary -->
    <div class="roles-summary-row">
      <div class="roles-sum-card" v-for="r in roleSummary" :key="r.role" :style="`border-left:3px solid ${r.color}`">
        <div class="roles-sum-count">{{ r.count }}</div>
        <div class="roles-sum-label">{{ r.label }}</div>
      </div>
    </div>

    <!-- Admin Accounts List -->
    <div class="a-sett-block">
      <div class="a-sett-ttl" style="display:flex;align-items:center;justify-content:space-between;">
        <span>
          <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          Admin Accounts
        </span>
        <button @click="showAddAdmin = true" class="a-btn-sm a-btn-primary-sm">+ Add Admin</button>
      </div>

      <div v-if="adminLoading" class="a-loading"><span class="a-spinner"></span></div>
      <div v-else>
        <div v-for="admin in adminAccounts" :key="admin.id" class="role-admin-row">
          <div class="role-av" :style="`background:${roleColor(admin.role)}20;color:${roleColor(admin.role)}`">
            {{ (admin.username||'A')[0].toUpperCase() }}
          </div>
          <div class="role-info">
            <div class="role-name">{{ admin.username }}</div>
            <div class="role-meta">
              <span class="role-badge" :style="`background:${roleColor(admin.role)}20;color:${roleColor(admin.role)}`">{{ admin.role }}</span>
              <span class="role-last-login">Last: {{ fmtDate(admin.last_login) || 'Never' }}</span>
            </div>
          </div>
          <div class="role-permissions">
            <span v-for="perm in (admin.permissions || []).slice(0,3)" :key="perm" class="perm-chip">{{ perm }}</span>
            <span v-if="(admin.permissions || []).length > 3" class="perm-chip perm-more">+{{ admin.permissions.length-3 }}</span>
          </div>
          <div class="role-actions">
            <button @click="editAdmin(admin)" class="a-btn-sm a-btn-ghost">✏</button>
            <button @click="toggleAdminStatus(admin)" class="a-tog" :class="admin.is_active ? 'a-tog-on' : 'a-tog-danger'" style="font-size:9px;padding:3px 7px;">
              {{ admin.is_active ? 'Active' : 'Off' }}
            </button>
          </div>
        </div>
        <div v-if="!adminAccounts.length" class="a-empty">No admin accounts found</div>
      </div>
    </div>

    <!-- Role Permissions Matrix -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">Role Permissions Matrix</div>
      <div class="perm-matrix">
        <div class="perm-matrix-hdr">
          <span class="perm-feature">Feature</span>
          <span v-for="role in roles" :key="role.key" class="perm-role-col" :style="`color:${role.color}`">{{ role.label }}</span>
        </div>
        <div v-for="feature in features" :key="feature.key" class="perm-matrix-row">
          <span class="perm-feature">{{ feature.label }}</span>
          <span v-for="role in roles" :key="role.key" class="perm-role-col">
            <span v-if="hasPermission(role.key, feature.key)" class="perm-check" :style="`color:${role.color}`">✓</span>
            <span v-else class="perm-x">—</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Add/Edit Admin Modal -->
    <Teleport to="body">
      <div v-if="showAddAdmin || editingAdmin" class="tx-modal-overlay" @click.self="closeAdminModal">
        <div class="tx-modal" style="max-width:380px;">
          <h3 style="font-size:14px;font-weight:800;color:#0f172a;margin:0 0 12px;">{{ editingAdmin ? 'Edit Admin' : 'Add Admin Account' }}</h3>
          <label class="a-mini-label">Username</label>
          <input v-model="adminForm.username" class="a-input" placeholder="Admin username" style="margin-bottom:8px;" :disabled="!!editingAdmin" />
          <label class="a-mini-label">Password {{ editingAdmin ? '(leave blank to keep)' : '' }}</label>
          <input v-model="adminForm.password" type="password" class="a-input" placeholder="Admin password" style="margin-bottom:8px;" />
          <label class="a-mini-label">Role</label>
          <select v-model="adminForm.role" class="a-select" style="width:100%;margin-bottom:8px;">
            <option v-for="r in roles" :key="r.key" :value="r.key">{{ r.label }}</option>
          </select>
          <label class="a-mini-label" style="margin-bottom:6px;">Permissions</label>
          <div class="perm-check-grid">
            <label v-for="f in features" :key="f.key" class="perm-check-label">
              <input type="checkbox" v-model="adminForm.permissions" :value="f.key" class="sel-cb" />
              {{ f.label }}
            </label>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <button @click="closeAdminModal" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button @click="saveAdmin" :disabled="adminSaving || !adminForm.username" class="a-btn-primary" style="flex:2;">
              <span v-if="adminSaving" class="a-spinner-sm"></span>
              {{ adminSaving ? 'Saving...' : editingAdmin ? 'Update' : 'Add Admin' }}
            </button>
          </div>
          <p v-if="adminMsg" :class="adminOk ? 'a-ok' : 'a-err'" style="text-align:center;margin-top:8px;font-size:10px;">{{ adminMsg }}</p>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { adminKey, fmtDate, showToast, writeAudit } = useAdmin()

const adminAccounts = ref([])
const adminLoading  = ref(false)
const showAddAdmin  = ref(false)
const editingAdmin  = ref(null)
const adminSaving   = ref(false)
const adminMsg      = ref('')
const adminOk       = ref(false)

const adminForm = reactive({ username: '', password: '', role: 'moderator', permissions: [] })

const roles = [
  { key: 'superadmin', label: 'Super Admin', color: '#dc2626' },
  { key: 'manager',    label: 'Manager',     color: '#d97706' },
  { key: 'moderator',  label: 'Moderator',   color: '#4f46e5' },
  { key: 'support',    label: 'Support',      color: '#0891b2' },
  { key: 'readonly',   label: 'Read Only',    color: '#94a3b8' },
]

const features = [
  { key: 'approve_tx',     label: 'Approve TX'      },
  { key: 'ban_user',       label: 'Ban Users'        },
  { key: 'view_reports',   label: 'View Reports'     },
  { key: 'edit_settings',  label: 'Edit Settings'    },
  { key: 'manage_games',   label: 'Manage Games'     },
  { key: 'manage_promos',  label: 'Manage Promos'    },
  { key: 'view_audit',     label: 'View Audit'       },
  { key: 'manage_admins',  label: 'Manage Admins'    },
  { key: 'adjust_balance', label: 'Adjust Balance'   },
  { key: 'manage_kyc',     label: 'Manage KYC'       },
]

const permMatrix = {
  superadmin: features.map(f => f.key),
  manager:    ['approve_tx', 'ban_user', 'view_reports', 'manage_games', 'manage_promos', 'view_audit', 'adjust_balance', 'manage_kyc'],
  moderator:  ['approve_tx', 'ban_user', 'view_reports', 'manage_promos'],
  support:    ['approve_tx', 'view_reports'],
  readonly:   ['view_reports', 'view_audit'],
}

function hasPermission(role, feature) { return (permMatrix[role] || []).includes(feature) }
function roleColor(role) { return roles.find(r => r.key === role)?.color || '#94a3b8' }

const roleSummary = computed(() => roles.map(r => ({
  ...r, count: adminAccounts.value.filter(a => a.role === r.key).length
})))

async function loadAdmins() {
  adminLoading.value = true
  try {
    const { data } = await supabase.from('admin_accounts').select('*').order('created_at')
    adminAccounts.value = data || []
  } catch (e) {
    adminAccounts.value = [
      { id: '1', username: 'superadmin', role: 'superadmin', is_active: true, permissions: features.map(f=>f.key), last_login: new Date().toISOString() },
    ]
  } finally { adminLoading.value = false }
}

function editAdmin(admin) {
  editingAdmin.value = admin
  Object.assign(adminForm, { username: admin.username, password: '', role: admin.role, permissions: [...(admin.permissions || [])] })
}

function closeAdminModal() {
  showAddAdmin.value = false; editingAdmin.value = null
  Object.assign(adminForm, { username: '', password: '', role: 'moderator', permissions: [] })
  adminMsg.value = ''
}

async function saveAdmin() {
  adminSaving.value = true; adminMsg.value = ''
  try {
    if (editingAdmin.value) {
      const update = { role: adminForm.role, permissions: adminForm.permissions }
      if (adminForm.password) update.password_hash = adminForm.password
      await supabase.from('admin_accounts').update(update).eq('id', editingAdmin.value.id)
      editingAdmin.value.role = adminForm.role; editingAdmin.value.permissions = adminForm.permissions
      adminMsg.value = 'Admin updated!'
      writeAudit('UPDATE_ADMIN', adminForm.username, adminForm.role)
    } else {
      const { data, error } = await supabase.from('admin_accounts').insert({ username: adminForm.username, password_hash: adminForm.password, role: adminForm.role, permissions: adminForm.permissions, is_active: true }).select()
      if (error) throw error
      adminAccounts.value.push(data[0])
      adminMsg.value = 'Admin added!'
      writeAudit('ADD_ADMIN', adminForm.username, adminForm.role)
    }
    adminOk.value = true
    showToast(adminMsg.value, 'success')
    setTimeout(() => closeAdminModal(), 1200)
  } catch (e) { adminOk.value = false; adminMsg.value = e.message; showToast(e.message, 'error') }
  finally { adminSaving.value = false }
}

async function toggleAdminStatus(admin) {
  const newVal = !admin.is_active
  await supabase.from('admin_accounts').update({ is_active: newVal }).eq('id', admin.id)
  admin.is_active = newVal
  showToast(`Admin ${newVal ? 'activated' : 'deactivated'}`, 'success')
  writeAudit(newVal ? 'ACTIVATE_ADMIN' : 'DEACTIVATE_ADMIN', admin.username, '')
}

onMounted(loadAdmins)
</script>

<style scoped>
.roles-summary-row { display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:12px; }
@media(max-width:400px) { .roles-summary-row { grid-template-columns:repeat(3,1fr); } }
.roles-sum-card { background:#fff;border-radius:10px;padding:10px;text-align:center; }
.roles-sum-count { font-size:20px;font-weight:900;color:#0f172a;line-height:1; }
.roles-sum-label { font-size:8.5px;color:#94a3b8;font-weight:600;margin-top:3px; }
.role-admin-row { display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f1f5f9; }
.role-av { width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0; }
.role-info { flex:1;min-width:0; }
.role-name { font-size:12px;font-weight:700;color:#0f172a;margin-bottom:3px; }
.role-meta { display:flex;align-items:center;gap:8px; }
.role-badge { font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px; }
.role-last-login { font-size:9px;color:#94a3b8; }
.role-permissions { display:flex;flex-wrap:wrap;gap:3px;max-width:120px; }
.perm-chip { font-size:8px;background:#ede9fe;color:#4f46e5;padding:1px 4px;border-radius:3px;font-weight:700; }
.perm-more { background:#f1f5f9;color:#94a3b8; }
.role-actions { display:flex;gap:4px;align-items:center;flex-shrink:0; }
.perm-matrix { overflow-x:auto; }
.perm-matrix-hdr,.perm-matrix-row { display:grid;grid-template-columns:120px repeat(5,1fr);gap:4px;padding:5px 0;border-bottom:1px solid #f1f5f9;align-items:center; }
.perm-matrix-hdr { font-size:9px;font-weight:800;text-transform:uppercase;border-bottom:2px solid #e2e8f0; }
.perm-feature { font-size:10px;color:#0f172a;font-weight:600; }
.perm-role-col { text-align:center;font-size:9px; }
.perm-check { font-size:13px;font-weight:900; }
.perm-x { color:#e2e8f0;font-size:13px; }
.perm-check-grid { display:grid;grid-template-columns:1fr 1fr;gap:6px; }
.perm-check-label { display:flex;align-items:center;gap:5px;font-size:10px;color:#0f172a;cursor:pointer; }
.sel-cb { width:13px;height:13px;accent-color:#4f46e5; }
.tx-modal-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px; }
.tx-modal { background:#fff;border-radius:12px;padding:18px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3); }
</style>
