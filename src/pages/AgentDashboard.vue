<template>
  <div class="ag-root">

    <!-- HEADER -->
    <header class="ag-header">
      <button @click="$router.push('/home')" class="ag-back-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="ag-title">ပိုင်ကြားရန်</h1>
      <div style="width:36px;"></div>
    </header>

    <!-- TAB STRIP -->
    <nav class="ag-tabs no-scrollbar">
      <button
        v-for="(tab, i) in tabs" :key="i"
        @click="activeTab = i"
        class="ag-tab-btn"
        :class="activeTab === i ? 'ag-tab-active' : ''">
        {{ tab }}
      </button>
    </nav>

    <!-- CONTENT -->
    <div class="ag-body">

      <!-- ══ TAB 0: ပိုင်စာလင်မ် ══ -->
      <div v-if="activeTab === 0">

        <!-- Balance Card -->
        <div class="ag-card">

          <!-- Balance Row -->
          <div class="balance-row">
            <span class="balance-label">
              စုဆောင်းနိုင်သော <strong class="balance-num">{{ formatN(availableCommission) }}</strong>
            </span>
            <div class="balance-btns">
              <button class="btn-gray" @click="handleWithdraw">ရလုရန်</button>
              <button class="btn-green" @click="activeTab = 2">သမိုင်းစဉ်</button>
            </div>
          </div>

          <p class="ag-subtitle">သာလွန်အကောင်း သာလွတ်ကြားမှုပ</p>
          <p class="ag-desc">ပရောမိုးရှိ တင်အနည်းဆုံး မှရ ကြားချည်ကြားချောင် (နေစဉ်အကြားမှု)</p>

          <!-- Invite Link Header -->
          <div class="invite-header-bar">
            <span class="invite-header-title">ကွန်တော် Link</span>
            <span class="invite-header-link">ရှေးချယ်ပါ ▸</span>
          </div>

          <!-- QR + Info -->
          <div class="invite-body">
            <!-- QR Code Column -->
            <div class="qr-col">
              <div class="qr-box">
                <img :src="qrUrl" alt="QR" class="qr-img" />
              </div>
              <button class="btn-green-sm" @click="downloadQr">သမ်းရည်</button>
            </div>

            <!-- Info Column -->
            <div class="info-col">
              <!-- Referral URL -->
              <div class="url-row">
                <span class="url-text">{{ referralLink }}</span>
                <button @click="copyLink" class="copy-icon-btn">
                  <svg v-if="!copiedLink" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  <svg v-else width="14" height="14" fill="none" stroke="#22c55e" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>

              <!-- Direct count -->
              <p class="info-stat">
                တိုက်ရိုက်ရစေ်ရာဝင်များ
                <strong style="color:#22c55e;">{{ directCount }}လူတွေ</strong>
              </p>

              <!-- Invite code -->
              <div class="code-row">
                <span class="code-label">ပိုင်စာကုဒ် <strong>{{ inviteCode }}</strong></span>
                <button @click="copyCode" class="copy-icon-btn">
                  <svg v-if="!copiedCode" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  <svg v-else width="14" height="14" fill="none" stroke="#22c55e" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Glasses banner + social share overlaid -->
        <div class="glasses-banner">
          <img
            src="https://ik.imagekit.io/rbok01qam/Brand%20Logo%20/file_00000000300c71fab9e860fbdb4318d2.png?tr=f-auto"
            alt="NovaBett"
            class="glasses-img"
          />
          <!-- top fade so card bleeds in naturally -->
          <div class="glasses-fade-top"></div>
          <!-- social row sits on top of the image -->
          <div class="glasses-social-row">
            <button @click="shareVia('native')" class="social-btn">
              <div class="social-icon social-icon--share">
                <svg width="15" height="15" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
              </div>
              <span class="social-label">မျှဝေ</span>
            </button>

            <button @click="shareVia('facebook')" class="social-btn">
              <div class="social-icon social-icon--fb">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span class="social-label">Facebook</span>
            </button>

            <button @click="shareVia('telegram')" class="social-btn">
              <div class="social-icon social-icon--tg">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <span class="social-label">Telegram</span>
            </button>

            <button @click="shareVia('whatsapp')" class="social-btn">
              <div class="social-icon social-icon--wa">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span class="social-label">WhatsApp</span>
            </button>
          </div>
          <!-- bottom fade -->
          <div class="glasses-fade-bottom"></div>
        </div>
      </div>

      <!-- ══ TAB 1: ငါ့ကော်မရှင် ══ -->
      <div v-if="activeTab === 1">
        <div class="ag-card" style="padding-bottom:12px;">
          <p class="tab-section-title">ကော်မရှင် အကျဉ်းချုပ်</p>
          <div class="stat-grid">
            <div class="stat-box">
              <div class="stat-label">ဒီနေ့</div>
              <div class="stat-val green">{{ formatN(myStats.todayComm) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">ဒီလ</div>
              <div class="stat-val green">{{ formatN(myStats.totalComm) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Direct</div>
              <div class="stat-val">{{ formatN(myStats.directComm) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Override</div>
              <div class="stat-val">{{ formatN(myStats.overrideComm) }} <span class="stat-unit">Ks</span></div>
            </div>
          </div>

          <div class="divider-line"></div>
          <p class="tab-section-title" style="margin-bottom:8px;">ကော်မရှင် မှတ်တမ်း</p>

          <div v-if="loadingComm" class="loading-row">Loading...</div>
          <div v-else-if="commissionRecords.length === 0" class="empty-row">ကော်မရှင် မှတ်တမ်း မရှိသေးပါ</div>
          <div v-else>
            <div v-for="r in commissionRecords.slice(0, 20)" :key="r.id" class="comm-row">
              <div style="flex:1;min-width:0;">
                <div class="comm-row-user">{{ r.player_id?.slice(0,8) || '—' }}</div>
                <div class="comm-row-date">{{ fmtDate(r.created_at) }}</div>
              </div>
              <div style="text-align:right;">
                <div class="comm-row-amount">+{{ formatN(r.commission_amount) }} Ks</div>
                <div class="comm-row-turn">Turnover: {{ formatN(r.bet_turnover) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ TAB 2: ငါ့တောင ══ -->
      <div v-if="activeTab === 2">
        <div class="ag-card">
          <div class="down-summary">
            <div class="down-stat">
              <div class="down-stat-val">{{ allDownline.length }}</div>
              <div class="down-stat-lbl">စုစုပေါင်း</div>
            </div>
            <div class="down-stat">
              <div class="down-stat-val">{{ directCount }}</div>
              <div class="down-stat-lbl">တိုက်ရိုက်</div>
            </div>
            <div class="down-stat">
              <div class="down-stat-val">{{ allDownline.filter(u => u.level > 1).length }}</div>
              <div class="down-stat-lbl">L2+ Override</div>
            </div>
          </div>
          <div class="divider-line"></div>

          <div v-if="loading" class="loading-row">Loading...</div>
          <div v-else-if="allDownline.length === 0" class="empty-row">အောက်လူ မရှိသေးပါ</div>
          <div v-else>
            <div v-for="u in allDownline.slice(0, 30)" :key="u.id || u.descendant_id" class="down-row">
              <div class="down-avatar">{{ (u.username || 'U').charAt(0).toUpperCase() }}</div>
              <div style="flex:1;min-width:0;">
                <div class="down-name">{{ u.username || u.descendant_id?.slice(0,8) || '—' }}</div>
                <div class="down-meta">L{{ u.level }} · VIP {{ u.vip_level || 1 }} · {{ fmtDate(u.created_at) }}</div>
              </div>
              <div class="down-deposit">{{ formatN(u.total_deposit || 0) }} Ks</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ TAB 3: စွမ်းဆောင်ရည် ══ -->
      <div v-if="activeTab === 3">
        <div class="ag-card">
          <p class="tab-section-title">ကာလရွေးချယ်ပါ</p>
          <div class="period-tabs">
            <button v-for="p in periods" :key="p.key"
              @click="myDataPeriod = p.key; loadMyDataStats(p.key)"
              class="period-btn" :class="myDataPeriod === p.key ? 'period-btn--active' : ''">
              {{ p.label }}
            </button>
          </div>
          <div class="divider-line"></div>
          <div class="stat-grid" style="margin-top:8px;">
            <div class="stat-box">
              <div class="stat-label">Deposit</div>
              <div class="stat-val">{{ formatN(myStats.depositAmt) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Turnover</div>
              <div class="stat-val">{{ formatN(totalTurnover) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Profit/Loss</div>
              <div class="stat-val" :class="myStats.profitLoss >= 0 ? 'green' : 'red'">{{ formatN(myStats.profitLoss) }} <span class="stat-unit">Ks</span></div>
            </div>
            <div class="stat-box">
              <div class="stat-label">ကော်မရှင်</div>
              <div class="stat-val green">{{ formatN(myStats.totalComm) }} <span class="stat-unit">Ks</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ TAB 4: အချက်အလက်အားလုံး ══ -->
      <div v-if="activeTab === 4">
        <div class="ag-card">
          <p class="tab-section-title">ကျွန်ုပ်၏ Agent အချက်အလက်</p>
          <div class="info-table">
            <div class="info-row">
              <span class="info-key">Username</span>
              <span class="info-val">{{ username }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Agent Code</span>
              <span class="info-val green">{{ inviteCode }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Referral Link</span>
              <span class="info-val" style="font-size:10px;word-break:break-all;">{{ referralLink }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Direct Comm Rate</span>
              <span class="info-val green">{{ commDirectRate }}%</span>
            </div>
            <div class="info-row">
              <span class="info-key">Override Rate</span>
              <span class="info-val green">{{ commOverrideRate }}%</span>
            </div>
            <div class="info-row">
              <span class="info-key">စုစုပေါင်း Downline</span>
              <span class="info-val">{{ allDownline.length }} ဦး</span>
            </div>
            <div class="info-row">
              <span class="info-key">တိုက်ရိုက် (L1)</span>
              <span class="info-val">{{ directCount }} ဦး</span>
            </div>
            <div class="info-row">
              <span class="info-key">ကော်မရှင် (ဒီလ)</span>
              <span class="info-val green">{{ formatN(totalCommission) }} Ks</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/supabase'

const loading         = ref(true)
const loadingComm     = ref(false)
const copiedCode      = ref(false)
const copiedLink      = ref(false)
const activeTab       = ref(0)
const userId          = ref('')
const username        = ref(localStorage.getItem('sb_username') || '—')
const mainBalance     = ref(0)
const bonusBalance    = ref(0)
const allDownline     = ref([])
const commissionRecords  = ref([])
const totalCommission    = ref(0)
const totalTurnover      = ref(0)
const availableCommission = ref(0)
const myDataPeriod    = ref('today')
const commDirectRate  = ref(10)
const commOverrideRate = ref(5)
const myStats = ref({
  todayComm: 0, totalComm: 0, directComm: 0,
  overrideComm: 0, depositAmt: 0, profitLoss: 0
})
let realtimeChannel = null

const tabs    = ['ပိုင်စာလင်မ်', 'ငါ့ကော်မရှင်', 'ငါ့တောင', 'စွမ်းဆောင်ရည်', 'အချက်အလက်အားလုံး']
const periods = [
  { key: 'today',     label: 'ဒီနေ့' },
  { key: 'yesterday', label: 'မနေ့က' },
  { key: 'month',     label: 'ဒီလ' },
]

const inviteCode = computed(() =>
  userId.value
    ? userId.value.substring(0, 8).toUpperCase()
    : (localStorage.getItem('sb_username') || '——').toUpperCase()
)

const referralLink = computed(() =>
  window.location.origin + '/?dl=' + inviteCode.value
)

const qrUrl = computed(() =>
  `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(referralLink.value)}&bgcolor=ffffff&color=000000&margin=6`
)

const directCount = computed(() =>
  allDownline.value.filter(u => u.level === 1).length
)

const formatN = (n) => {
  const v = Number(n) || 0
  if (v >= 1000000) return (v / 1000000).toFixed(2) + 'M'
  if (v >= 1000)    return new Intl.NumberFormat('en-US').format(Math.round(v))
  return v.toFixed(0)
}

const fmtDate = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
}

const copyCode = async () => {
  try { await navigator.clipboard.writeText(inviteCode.value) } catch {}
  copiedCode.value = true
  setTimeout(() => { copiedCode.value = false }, 2000)
}

const copyLink = async () => {
  try { await navigator.clipboard.writeText(referralLink.value) } catch {}
  copiedLink.value = true
  setTimeout(() => { copiedLink.value = false }, 2000)
}

const shareVia = (id) => {
  const text = `NovaBett မှာ ကစားပါ! ငါ့ Link: ${referralLink.value}`
  if (id === 'native' && navigator.share) {
    navigator.share({ title: 'NovaBett', text, url: referralLink.value })
    return
  }
  const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink.value)}`,
    telegram:  `https://t.me/share/url?url=${encodeURIComponent(referralLink.value)}&text=${encodeURIComponent(text)}`,
    whatsapp:  `https://wa.me/?text=${encodeURIComponent(text)}`,
  }
  if (urls[id]) window.open(urls[id], '_blank')
  else copyLink()
}

const downloadQr = () => { window.open(qrUrl.value, '_blank') }
const handleWithdraw = () => { alert('ကော်မရှင် ထုတ်ယူခြင်း — Coming Soon') }

const loadAll = async () => {
  loading.value = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { loading.value = false; return }
    userId.value   = session.user.id
    username.value = session.user.user_metadata?.username
      || (session.user.email || '').replace(/@novabett\.internal$/, '').toUpperCase()
    localStorage.setItem('sb_username', username.value)
    await Promise.all([
      loadWallet(session.user.id),
      loadDownline(session.user.id),
      loadCommissions(session.user.id),
      loadSettings(),
    ])
    await loadMyDataStats('today')
  } catch (e) {
    console.error('[Agent]', e)
  } finally {
    loading.value = false
  }
}

const loadWallet = async (uid) => {
  const { data } = await supabase.from('wallets').select('main_balance,bonus_balance').eq('user_id', uid).single()
  if (data) { mainBalance.value = Number(data.main_balance) || 0; bonusBalance.value = Number(data.bonus_balance) || 0 }
}

const loadDownline = async (uid) => {
  const { data } = await supabase
    .from('affiliate_tree')
    .select('descendant_id, level')
    .eq('ancestor_id', uid)
    .neq('level', 0)
    .order('level')
  if (!data?.length) { allDownline.value = []; return }
  const ids = data.map(r => r.descendant_id)
  const { data: profiles } = await supabase
    .from('users')
    .select('id, username, vip_level, total_deposit, created_at')
    .in('id', ids)
  const profileMap = {}
  ;(profiles || []).forEach(p => { profileMap[p.id] = p })
  allDownline.value = data.map(r => ({ ...r, ...(profileMap[r.descendant_id] || {}) }))
}

const loadCommissions = async (uid) => {
  loadingComm.value = true
  const { data } = await supabase
    .from('affiliate_commissions')
    .select('*')
    .eq('agent_id', uid)
    .order('created_at', { ascending: false })
    .limit(50)
  commissionRecords.value = data || []
  totalCommission.value = commissionRecords.value.reduce((s, r) => s + Number(r.commission_amount), 0)
  totalTurnover.value   = commissionRecords.value.reduce((s, r) => s + Number(r.bet_turnover), 0)
  loadingComm.value = false
}

const loadSettings = async () => {
  const { data } = await supabase.from('app_settings').select('commission_direct_rate,commission_override_rate').single()
  if (data) {
    commDirectRate.value   = Number(data.commission_direct_rate)   || 10
    commOverrideRate.value = Number(data.commission_override_rate) || 5
  }
}

const loadMyDataStats = async (period) => {
  const uid = userId.value
  if (!uid) return
  let from = new Date()
  if (period === 'yesterday') { from = new Date(); from.setDate(from.getDate() - 1) }
  else if (period === 'month') { from = new Date(from.getFullYear(), from.getMonth(), 1) }
  else { from = new Date(); from.setHours(0, 0, 0, 0) }

  const { data } = await supabase
    .from('affiliate_commissions')
    .select('commission_amount,bet_turnover,created_at')
    .eq('agent_id', uid)
    .gte('created_at', from.toISOString())

  const records = data || []
  const comm = records.reduce((s, r) => s + Number(r.commission_amount), 0)
  const turn = records.reduce((s, r) => s + Number(r.bet_turnover), 0)
  myStats.value.totalComm   = comm
  myStats.value.todayComm   = comm
  myStats.value.directComm  = comm * 0.7
  myStats.value.overrideComm = comm * 0.3
  myStats.value.depositAmt  = 0
  myStats.value.profitLoss  = 0
  totalTurnover.value       = turn
  availableCommission.value = comm
}

onMounted(() => { loadAll() })
onUnmounted(() => {
  if (realtimeChannel) { supabase.removeChannel(realtimeChannel); realtimeChannel = null }
})
</script>

<style scoped>
.ag-root {
  min-height: 100dvh;
  background: #1a1c3a;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-tap-highlight-color: transparent;
  overscroll-behavior: contain;
}

/* ── Header ── */
.ag-header {
  position: sticky; top: 0; z-index: 40;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px;
  background: #1a1c3a;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.ag-back-btn {
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  color: rgba(255,255,255,0.8);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: opacity 0.15s;
}
.ag-back-btn:active { opacity: 0.6; }
.ag-title {
  font-size: 15px; font-weight: 800; color: #fff; letter-spacing: 0.02em;
}

/* ── Tab strip ── */
.ag-tabs {
  display: flex; overflow-x: auto;
  background: #1a1c3a;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  position: sticky; top: 57px; z-index: 30;
}
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.ag-tab-btn {
  flex-shrink: 0; padding: 9px 14px;
  font-size: 11px; font-weight: 600; white-space: nowrap;
  background: none; border: none;
  border-bottom: 2px solid transparent;
  color: rgba(255,255,255,0.38); cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.ag-tab-active { color: #22c55e; border-bottom-color: #22c55e; }

/* ── Body ── */
.ag-body { padding: 12px 12px 80px; }

/* ── Card ── */
.ag-card {
  background: #252850; border-radius: 14px;
  padding: 14px; margin-bottom: 10px;
}

/* ── Balance ── */
.balance-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px; flex-wrap: wrap; gap: 8px;
}
.balance-label { font-size: 13px; color: rgba(255,255,255,0.75); }
.balance-num   { font-size: 16px; font-weight: 900; color: #fff; }
.balance-btns  { display: flex; gap: 6px; }

.btn-gray {
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px; color: rgba(255,255,255,0.75);
  font-size: 12px; font-weight: 700; padding: 6px 14px;
  cursor: pointer; transition: opacity 0.15s;
}
.btn-gray:active { opacity: 0.7; }
.btn-green {
  background: #16a34a; border: none; border-radius: 8px;
  color: #fff; font-size: 12px; font-weight: 700; padding: 6px 14px;
  cursor: pointer; transition: opacity 0.15s;
}
.btn-green:active { opacity: 0.7; }

.ag-subtitle {
  font-size: 12px; color: rgba(255,255,255,0.7); margin: 0 0 4px;
}
.ag-desc {
  font-size: 10px; color: rgba(255,255,255,0.35); margin: 0 0 12px; line-height: 1.5;
}

/* ── Invite header bar ── */
.invite-header-bar {
  background: #15803d; border-radius: 8px 8px 0 0;
  padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;
}
.invite-header-title { font-size: 12px; font-weight: 800; color: #fff; }
.invite-header-link  { font-size: 11px; color: rgba(255,255,255,0.75); cursor: pointer; }

/* ── Invite body ── */
.invite-body {
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.08); border-top: none;
  border-radius: 0 0 10px 10px; padding: 10px;
  display: flex; gap: 10px; align-items: flex-start;
}
.qr-col {
  display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0;
}
.qr-box {
  width: 82px; height: 82px; background: #fff;
  border-radius: 10px; padding: 4px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.3);
}
.qr-img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; display: block; }
.btn-green-sm {
  background: #16a34a; border: none; border-radius: 7px;
  color: #fff; font-size: 11px; font-weight: 700; padding: 5px 14px;
  cursor: pointer; white-space: nowrap; transition: opacity 0.15s;
}
.btn-green-sm:active { opacity: 0.7; }
.info-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.url-row {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; padding: 7px 8px;
}
.url-text {
  flex: 1; min-width: 0; font-size: 10px; color: rgba(255,255,255,0.55);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.copy-icon-btn {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
  border-radius: 5px; padding: 3px 5px; cursor: pointer;
  color: rgba(255,255,255,0.6); display: flex; align-items: center; flex-shrink: 0;
  transition: opacity 0.15s;
}
.copy-icon-btn:active { opacity: 0.6; }
.info-stat { font-size: 11px; color: rgba(255,255,255,0.55); margin: 0; }
.code-row  { display: flex; align-items: center; gap: 6px; }
.code-label { font-size: 11px; color: rgba(255,255,255,0.55); flex: 1; }

/* ── Glasses banner ── */
.glasses-banner {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  margin-top: 10px;
}
.glasses-img {
  width: 100%;
  display: block;
  object-fit: cover;
  border-radius: 14px;
}
.glasses-fade-top {
  position: absolute; top: 0; left: 0; right: 0;
  height: 56px;
  background: linear-gradient(to bottom, #1a1c3a 0%, transparent 100%);
  pointer-events: none;
}
.glasses-fade-bottom {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 32px;
  background: linear-gradient(to top, #1a1c3a 0%, transparent 100%);
  pointer-events: none;
}
.glasses-social-row {
  position: absolute;
  top: 0; left: 0; right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: transparent;
}

/* ── Social buttons ── */
.social-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 0;
  -webkit-tap-highlight-color: transparent;
}
.social-btn:active .social-icon { transform: scale(0.85); }
.social-icon {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.15s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.35);
}
.social-icon--share { background: rgba(255,255,255,0.18); border: 1.5px solid rgba(255,255,255,0.25); backdrop-filter: blur(6px); }
.social-icon--fb    { background: #1877f2; }
.social-icon--tg    { background: #229ed9; }
.social-icon--wa    { background: #25d366; }
.social-label {
  font-size: 9px; color: rgba(255,255,255,0.8); font-weight: 700; white-space: nowrap;
  text-shadow: 0 1px 3px rgba(0,0,0,0.6);
}

/* ── Stat grid ── */
.stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.stat-box {
  background: rgba(0,0,0,0.2); border-radius: 10px; padding: 10px 12px;
  border: 1px solid rgba(255,255,255,0.06);
}
.stat-label { font-size: 10px; color: rgba(255,255,255,0.4); margin-bottom: 3px; }
.stat-val   { font-size: 15px; font-weight: 800; color: #fff; }
.stat-val.green { color: #4ade80; }
.stat-val.red   { color: #f87171; }
.stat-unit  { font-size: 9px; color: rgba(255,255,255,0.3); font-weight: 400; }

.divider-line { height: 1px; background: rgba(255,255,255,0.08); margin: 12px 0; }

/* ── Commission rows ── */
.tab-section-title { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.75); margin: 0 0 10px; }
.comm-row { display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.comm-row:last-child { border-bottom: none; }
.comm-row-user   { font-size: 12px; font-weight: 600; color: #fff; }
.comm-row-date   { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 1px; }
.comm-row-amount { font-size: 13px; font-weight: 800; color: #4ade80; }
.comm-row-turn   { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 1px; }

/* ── Downline ── */
.down-summary { display: flex; }
.down-stat    { flex: 1; text-align: center; padding: 6px; }
.down-stat-val { font-size: 22px; font-weight: 900; color: #fff; }
.down-stat-lbl { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 2px; }
.down-row {
  display: flex; align-items: center; gap: 10px; padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.down-row:last-child { border-bottom: none; }
.down-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg,#22c55e,#16a34a);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 900; color: #fff; flex-shrink: 0;
}
.down-name    { font-size: 12px; font-weight: 700; color: #fff; }
.down-meta    { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 1px; }
.down-deposit { font-size: 12px; font-weight: 700; color: #4ade80; flex-shrink: 0; }

/* ── Period tabs ── */
.period-tabs { display: flex; gap: 6px; margin-bottom: 4px; }
.period-btn {
  flex: 1; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px; color: rgba(255,255,255,0.55);
  font-size: 11px; font-weight: 600; padding: 7px 4px;
  cursor: pointer; transition: all 0.15s;
}
.period-btn--active { background: #16a34a; border-color: #22c55e; color: #fff; }

/* ── Info table ── */
.info-table { display: flex; flex-direction: column; }
.info-row {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 8px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.info-row:last-child { border-bottom: none; }
.info-key { font-size: 11px; color: rgba(255,255,255,0.45); flex-shrink: 0; }
.info-val { font-size: 12px; font-weight: 700; color: #fff; text-align: right; }
.info-val.green { color: #4ade80; }

/* ── Utils ── */
.loading-row { text-align: center; padding: 24px; font-size: 12px; color: rgba(255,255,255,0.35); }
.empty-row   { text-align: center; padding: 24px; font-size: 12px; color: rgba(255,255,255,0.35); }
</style>
