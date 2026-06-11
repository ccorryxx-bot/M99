<template>
  <div class="net-root">

    <!-- Header -->
    <div class="net-header">
      <router-link to="/agent" class="net-back">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </router-link>
      <div>
        <div class="net-title">အေးဂျင့်ကွန်ရက်</div>
        <div class="net-sub">Commission Network Diagram</div>
      </div>
    </div>

    <div class="net-body">

      <!-- Loading overlay -->
      <div v-if="loading" class="net-loading">
        <div class="spin"></div>
      </div>

      <template v-else>

        <!-- ═══════ NODE A ═══════ -->
        <div class="row-a-wrap">
          <div class="node node-a">
            <div class="av av-a">
              <img src="https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt0.dd0fe52d.png?tr=f-auto" class="av-img" alt="A"/>
              <span class="badge badge-a">A</span>
              <span class="red-dot">{{ bRealCount }}</span>
            </div>
            <div class="info">
              <div class="nname">{{ username }}</div>
              <div class="nline">Direct B: <b class="y">{{ formatN(totalBetB) }} Ks turnover</b></div>
              <div class="nline">Commission: <b class="g">{{ formatN(totalCommA) }} Ks</b></div>
              <div class="ntotal">💰 {{ formatN(totalCommA) }} Ks / session</div>
            </div>
            <div class="a-note">
              <div class="a-note-line1">သင်၏ အောက်လက်ငယ်သားများအား ဤနေရာတွင် ဖော်ပြပေးမည်။</div>
              <div class="a-note-line2">🔴 Real Time Live Update ဖြစ်သည်။</div>
            </div>
          </div>
        </div>

        <!-- SVG connector A→B -->
        <div class="connector-wrap connector-ab">
          <svg class="conn-svg" viewBox="0 0 300 28" preserveAspectRatio="none">
            <!-- horizontal bar -->
            <line x1="50" y1="0" x2="250" y2="0" class="conn-hline"/>
            <!-- vertical drops to B1 B2 B3 -->
            <line x1="80"  y1="0" x2="80"  y2="28" class="conn-vline"/>
            <line x1="150" y1="0" x2="150" y2="28" class="conn-vline"/>
            <line x1="220" y1="0" x2="220" y2="28" class="conn-vline"/>
            <!-- animated flow dots -->
            <circle r="3" class="flow-dot flow-dot-1"><animateMotion dur="1.4s" repeatCount="indefinite" path="M80,0 L80,28"/></circle>
            <circle r="3" class="flow-dot flow-dot-2"><animateMotion dur="1.6s" repeatCount="indefinite" path="M150,0 L150,28"/></circle>
            <circle r="3" class="flow-dot flow-dot-3"><animateMotion dur="1.8s" repeatCount="indefinite" path="M220,0 L220,28"/></circle>
          </svg>
        </div>

        <!-- ═══════ ROW B ═══════ -->
        <div class="row-b-wrap">
          <div
            v-for="(b, i) in bSlots" :key="'b'+i"
            class="node node-b"
            :class="b.empty ? 'node--empty' : ''">
            <div class="av av-b">
              <img :src="b.avatarUrl" class="av-img" :alt="'B'+(i+1)"/>
              <span class="badge badge-b">B{{ i+1 }}</span>
              <span class="red-dot">0</span>
            </div>
            <div class="info">
              <div class="nname-b" :class="b.empty ? 'tc-dim' : ''">{{ b.empty ? '—' : (b.username || 'Member') }}</div>
              <div class="nline-b">Turnover</div>
              <div class="nline-b"><b :class="b.empty ? 'tc-dim' : 'bl'">{{ formatN(b.turnover) }} K</b></div>
              <div class="ntotal-sm">= <b class="g">{{ formatN(b.comm) }} Ks</b></div>
            </div>
          </div>
        </div>

        <!-- SVG connector B→C -->
        <div class="connector-wrap connector-bc">
          <svg class="conn-svg" viewBox="0 0 300 24" preserveAspectRatio="none">
            <!-- left branch (B1→C1,C2) -->
            <line x1="80" y1="0" x2="50" y2="24"  class="conn-vline conn-vline--c"/>
            <line x1="80" y1="0" x2="110" y2="24" class="conn-vline conn-vline--c"/>
            <!-- B3→C3 only -->
            <line x1="220" y1="0" x2="220" y2="24" class="conn-vline conn-vline--c"/>
            <!-- animated flow dots -->
            <circle r="2.5" class="flow-dot flow-dot-c1"><animateMotion dur="2s" repeatCount="indefinite" path="M80,0 L50,24"/></circle>
            <circle r="2.5" class="flow-dot flow-dot-c2"><animateMotion dur="2.2s" repeatCount="indefinite" path="M80,0 L110,24"/></circle>
            <circle r="2.5" class="flow-dot flow-dot-c3"><animateMotion dur="2.4s" repeatCount="indefinite" path="M220,0 L220,24"/></circle>
          </svg>
        </div>

        <!-- ═══════ ROW C ═══════ -->
        <div class="row-c-wrap">
          <template v-for="(c, i) in cSlots" :key="'c'+i">
            <!-- gap between C2 and C3 -->
            <div v-if="i === 2" class="node-gap"></div>
            <div
              class="node node-c"
              :class="[c.empty ? 'node--empty' : '', i===2 ? 'node-c--hi' : '']">
              <div class="av av-c">
                <img :src="c.avatarUrl" class="av-img" :alt="'C'+(i+1)"/>
                <span class="badge badge-c">C{{ i+1 }}</span>
                <span class="red-dot">0</span>
              </div>
              <div class="info">
                <div class="nname-c" :class="c.empty ? 'tc-dim' : ''">{{ c.empty ? '—' : (c.username || 'Member') }}</div>
                <div class="nline-c"><b :class="c.empty ? 'tc-dim' : 'p'">{{ formatN(c.turnover) }} K</b></div>
                <div class="ntotal-c" :class="i===2 && !c.empty ? 'ntotal-c--big' : ''">= <b class="g">{{ formatN(c.comm) }} Ks</b></div>
              </div>
            </div>
          </template>
        </div>

        <!-- SVG connector C→N -->
        <div class="connector-wrap connector-cn">
          <svg class="conn-svg" viewBox="0 0 300 22" preserveAspectRatio="none">
            <line x1="50"  y1="0" x2="30"  y2="22" class="conn-vline conn-vline--n"/>
            <line x1="110" y1="0" x2="80"  y2="22" class="conn-vline conn-vline--n"/>
            <line x1="150" y1="0" x2="150" y2="22" class="conn-vline conn-vline--n"/>
            <line x1="220" y1="0" x2="220" y2="22" class="conn-vline conn-vline--n"/>
            <line x1="220" y1="0" x2="270" y2="22" class="conn-vline conn-vline--n"/>
            <circle r="2" class="flow-dot-n"><animateMotion dur="2s"   repeatCount="indefinite" path="M50,0 L30,22"/></circle>
            <circle r="2" class="flow-dot-n"><animateMotion dur="2.3s" repeatCount="indefinite" path="M110,0 L80,22"/></circle>
            <circle r="2" class="flow-dot-n"><animateMotion dur="2.6s" repeatCount="indefinite" path="M150,0 L150,22"/></circle>
            <circle r="2" class="flow-dot-n"><animateMotion dur="2.9s" repeatCount="indefinite" path="M220,0 L220,22"/></circle>
            <circle r="2" class="flow-dot-n"><animateMotion dur="3.2s" repeatCount="indefinite" path="M220,0 L270,22"/></circle>
          </svg>
        </div>

        <!-- ═══════ ROW N ═══════ -->
        <div class="row-n-label">
          <span class="n-level-badge">∞</span>
          <span class="n-level-text">N Level — အကန့်အသတ်မရှိ ချဲ့နိုင်သောကွန်ရက်</span>
        </div>
        <div class="row-n-wrap">
          <div v-for="(n, i) in nSlots" :key="'n'+i" class="node node-n">
            <div class="av av-n">
              <img :src="n.avatarUrl" class="av-img" alt="N"/>
              <span class="badge badge-n">N</span>
              <span class="red-dot">0</span>
            </div>
            <div class="nname-n">N</div>
          </div>
        </div>

        <!-- Legend -->
        <div class="legend">
          <div class="leg-title">📊 Commission အဆင့်များ</div>
          <div class="leg-row"><span class="dot dot-a"></span><span class="leg-lbl">A (သင်) — ကွန်ရက်ထိပ်ဆုံး၊ override + direct commission ရသူ</span></div>
          <div class="leg-row"><span class="dot dot-b"></span><span class="leg-lbl">B Level — တိုက်ရိုက်ဖိတ်ခေါ်သူများ (Direct)</span></div>
          <div class="leg-row"><span class="dot dot-c"></span><span class="leg-lbl">C Level — B ဖိတ်ခေါ်သူများ (Indirect Override)</span></div>
          <div class="leg-row"><span class="dot dot-n"></span><span class="leg-lbl">N Level — အကန့်အသတ်မရှိ ချဲ့နိုင်သောကွန်ရက် (∞)</span></div>
          <div class="leg-note">⚡ C Level ကြီးလေ — သင် Override Commission ရလေ!</div>

          <div class="leg-divider"></div>

          <!-- ── Link section inside legend ── -->
          <div class="invite-header-bar">
            <span class="invite-header-title">ကျွန်တော် Link</span>
            <span class="invite-header-link">ရွေးချယ်ပါ ▸</span>
          </div>
          <div class="invite-body">
            <div class="qr-col">
              <div class="qr-box">
                <img :src="qrUrl" alt="QR" class="qr-img"/>
              </div>
              <button class="btn-green-sm" @click="downloadQr">သမ်းရည်</button>
            </div>
            <div class="info-col">
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
              <p class="info-stat">
                တိုက်ရိုက်အစီရင်ခံစာများ
                <strong style="color:#22c55e;">{{ directCount }} လူတွေ</strong>
              </p>
              <div class="code-row">
                <span class="code-label">ဖိတ်စာကုဒ် <strong>{{ inviteCode }}</strong></span>
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

          <div class="leg-divider"></div>

          <!-- ── Social buttons inside legend (no card frames) ── -->
          <div class="leg-social-row">
            <button @click="shareVia('native')" class="social-btn leg-social-btn">
              <div class="social-icon social-icon--share"><svg width="15" height="15" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></div>
              <span class="social-label">မျှဝေ</span>
            </button>
            <button @click="shareVia('facebook')" class="social-btn leg-social-btn">
              <div class="social-icon social-icon--fb"><svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
              <span class="social-label">Facebook</span>
            </button>
            <button @click="shareVia('telegram')" class="social-btn leg-social-btn">
              <div class="social-icon social-icon--tg"><svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></div>
              <span class="social-label">Telegram</span>
            </button>
            <button @click="shareVia('whatsapp')" class="social-btn leg-social-btn">
              <div class="social-icon social-icon--wa"><svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
              <span class="social-label">WhatsApp</span>
            </button>
          </div>
        </div>

      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/supabase'

// ── State ──────────────────────────────────────
const loading    = ref(true)
const userId     = ref('')
const username   = ref(localStorage.getItem('sb_username') || 'မင်း (A)')
const copiedCode = ref(false)
const copiedLink = ref(false)

const allDownline       = ref([])   // { descendant_id, level, username, ... }
const commissionRecords = ref([])   // { agent_id, commission_amount, bet_turnover, user_id }

// ── Derived: invite / QR ───────────────────────
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
const directCount = computed(() => allDownline.value.filter(u => u.level === 1).length)

// ── Derived: network nodes ─────────────────────
// Commission map: user_id → { turnover, comm }
const commMap = computed(() => {
  const m = {}
  for (const r of commissionRecords.value) {
    const uid = r.user_id || r.referral_id
    if (!uid) continue
    if (!m[uid]) m[uid] = { turnover: 0, comm: 0 }
    m[uid].turnover += Number(r.bet_turnover)   || 0
    m[uid].comm     += Number(r.commission_amount) || 0
  }
  return m
})

const B_AVATARS = [
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt1.3b182abb.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt2.9b11cc3a.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt1.3b182abb.png?tr=f-auto',
]
const C_AVATARS = [
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt3.4dd4d61a.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt4.e51f6a6a.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt3.4dd4d61a.png?tr=f-auto',
]
const N_AVATARS = [
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt2.9b11cc3a.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt1.3b182abb.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt3.4dd4d61a.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt4.e51f6a6a.png?tr=f-auto',
  'https://ik.imagekit.io/rbok01qam/Agent%20avatar%20img/avt3.4dd4d61a.png?tr=f-auto',
]
const nSlots = Array.from({ length: 5 }, (_, i) => ({ avatarUrl: N_AVATARS[i] }))

// 3 B-level slots (level === 1)
const bSlots = computed(() => {
  const real = allDownline.value
    .filter(u => u.level === 1)
    .slice(0, 3)
    .map((u, i) => ({
      username:  u.username || 'Member',
      turnover:  (commMap.value[u.descendant_id] || {}).turnover || 0,
      comm:      (commMap.value[u.descendant_id] || {}).comm     || 0,
      avatarUrl: B_AVATARS[i],
      empty: false,
    }))
  while (real.length < 3) {
    const i = real.length
    real.push({ username: '', turnover: 0, comm: 0, avatarUrl: B_AVATARS[i], empty: true })
  }
  return real
})

// 3 C-level slots (level === 2)
const cSlots = computed(() => {
  const real = allDownline.value
    .filter(u => u.level === 2)
    .slice(0, 3)
    .map((u, i) => ({
      username:  u.username || 'Member',
      turnover:  (commMap.value[u.descendant_id] || {}).turnover || 0,
      comm:      (commMap.value[u.descendant_id] || {}).comm     || 0,
      avatarUrl: C_AVATARS[i],
      empty: false,
    }))
  while (real.length < 3) {
    const i = real.length
    real.push({ username: '', turnover: 0, comm: 0, avatarUrl: C_AVATARS[i], empty: true })
  }
  return real
})

// A-level totals
const totalBetB  = computed(() => bSlots.value.reduce((s, b) => s + b.turnover, 0))
const totalCommA = computed(() => commissionRecords.value.reduce((s, r) => s + (Number(r.commission_amount) || 0), 0))
const bRealCount = computed(() => allDownline.value.filter(u => u.level === 1).length)
const cRealCount = computed(() => allDownline.value.filter(u => u.level === 2).length)

// ── Helpers ────────────────────────────────────
const formatN = (n) => {
  const v = Number(n) || 0
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + 'M'
  if (v >= 1_000)     return new Intl.NumberFormat('en-US').format(Math.round(v))
  return v.toFixed(0)
}

// ── Data loading ───────────────────────────────
async function loadData() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    userId.value = user.id

    // 1. Downline tree (B = level 1, C = level 2)
    const { data: treeRows } = await supabase
      .from('affiliate_tree')
      .select('descendant_id, level')
      .eq('ancestor_id', user.id)
      .in('level', [1, 2])
      .order('level')

    if (treeRows?.length) {
      const ids = treeRows.map(r => r.descendant_id)
      const { data: profiles } = await supabase
        .from('users')
        .select('id, username')
        .in('id', ids)
      const pMap = {}
      ;(profiles || []).forEach(p => { pMap[p.id] = p })
      allDownline.value = treeRows.map(r => ({
        ...r,
        ...(pMap[r.descendant_id] || {}),
      }))
    }

    // 2. Commissions for A's network
    const { data: comms } = await supabase
      .from('affiliate_commissions')
      .select('commission_amount, bet_turnover, user_id, referral_id')
      .eq('agent_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200)
    commissionRecords.value = comms || []

  } catch (e) {
    console.error('ReferralPage load error', e)
  } finally {
    loading.value = false
  }
}

// ── Referral actions (same as AgentDashboard) ──
async function copyLink() {
  try { await navigator.clipboard.writeText(referralLink.value) } catch { prompt('Copy:', referralLink.value) }
  copiedLink.value = true; setTimeout(() => copiedLink.value = false, 2000)
}
async function copyCode() {
  try { await navigator.clipboard.writeText(inviteCode.value) } catch { prompt('Copy:', inviteCode.value) }
  copiedCode.value = true; setTimeout(() => copiedCode.value = false, 2000)
}
function downloadQr() {
  const a = document.createElement('a')
  a.href = qrUrl.value
  a.download = 'iW99-referral-qr.png'
  a.target = '_blank'
  a.click()
}
function shareVia(platform) {
  const url = encodeURIComponent(referralLink.value)
  const msg = encodeURIComponent(`iW99 မှာ ကစားပါ! Referral: ${referralLink.value}`)
  if (platform === 'native') {
    if (navigator.share) { navigator.share({ title: 'iW99 Agent', url: referralLink.value }).catch(() => {}) }
    else copyLink()
    return
  }
  const map = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${msg}`,
    whatsapp: `https://wa.me/?text=${msg}`,
  }
  if (map[platform]) window.open(map[platform], '_blank')
}

// ── Real-time subscriptions ─────────────────────
let realtimeChannel = null

function setupRealtime(uid) {
  if (realtimeChannel) supabase.removeChannel(realtimeChannel)

  realtimeChannel = supabase
    .channel(`referral-rt-${uid}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'affiliate_commissions',
      filter: `agent_id=eq.${uid}`,
    }, () => { loadData() })
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'affiliate_tree',
      filter: `ancestor_id=eq.${uid}`,
    }, () => { loadData() })
    .subscribe()
}

onMounted(async () => {
  await loadData()
  if (userId.value) setupRealtime(userId.value)
})

onUnmounted(() => {
  if (realtimeChannel) supabase.removeChannel(realtimeChannel)
})
</script>

<style scoped>
/* ── Root ── */
.net-root {
  min-height: 100vh;
  background: #07091b;
  display: flex; flex-direction: column;
}

/* ── Header ── */
.net-header {
  position: sticky; top: 0; z-index: 50;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  background: rgba(6,8,24,0.97);
  border-bottom: 1px solid rgba(168,85,247,0.22);
  padding: 10px 14px;
  display: flex; align-items: center; gap: 10px;
}
.net-back {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
  display: flex; align-items: center; justify-content: center; text-decoration: none; flex-shrink: 0;
}
.net-title { font-size: 13px; font-weight: 900; color: #fff; }
.net-sub { font-size: 8.5px; color: rgba(255,255,255,0.65); margin-top: 1px; }

/* ── Body ── */
.net-body {
  flex: 1; padding: 10px 10px 80px;
  display: flex; flex-direction: column; align-items: center; gap: 0;
}

/* ── Loading ── */
.net-loading { display: flex; justify-content: center; padding: 60px 0; }
.spin {
  width: 32px; height: 32px; border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.25); border-top-color: #f59e0b;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Generic node ── */
.node {
  border-radius: 10px; transition: opacity 0.3s;
}
.node--empty { opacity: 0.92; }

/* ── Node A ── */
.row-a-wrap { width: 100%; display: flex; justify-content: center; }
.node-a {
  display: flex; flex-direction: row; align-items: flex-start; gap: 8px;
  background: linear-gradient(135deg, rgba(245,158,11,0.30), rgba(217,119,6,0.18));
  border: 1.5px solid rgba(245,158,11,0.75);
  box-shadow: 0 0 20px rgba(245,158,11,0.25), 0 4px 16px rgba(0,0,0,0.2);
  border-radius: 12px; padding: 9px 10px;
  width: min(310px, 92vw);
}

/* ── Node A right note ── */
.a-note {
  margin-left: auto;
  display: flex; flex-direction: column; justify-content: center; gap: 5px;
  text-align: right; flex-shrink: 0; max-width: 108px;
}
.a-note-line1 {
  font-size: 8px; font-weight: 600;
  color: rgba(255,255,255,0.82);
  line-height: 1.5;
  text-shadow: 0 0 6px rgba(245,158,11,0.4);
}
.a-note-line2 {
  font-size: 8px; font-weight: 700;
  color: #fbbf24;
  text-shadow: 0 0 8px rgba(245,158,11,0.7);
  letter-spacing: 0.2px;
}

/* ── Row B ── */
.row-b-wrap { display: flex; justify-content: center; gap: 5px; width: 100%; }
.node-b {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  background: none; border: none;
  border-radius: 10px; padding: 7px 5px;
  flex: 1; max-width: 105px; min-width: 84px;
}

/* ── Row C ── */
.row-c-wrap { display: flex; justify-content: center; gap: 4px; width: 100%; }
.node-c {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  background: none; border: none;
  border-radius: 9px; padding: 6px 4px;
  flex: 1; max-width: 88px; min-width: 72px;
}
.node-c--hi { background: none; border: none; }
.node-gap { flex: 1; max-width: 88px; }

/* ── Avatars ── */
.av { position: relative; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.av-a { width: 36px; height: 36px; border-radius: 50%; background: rgba(245,158,11,0.25); border: 2px solid rgba(245,158,11,0.85); }
.av-b {
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(96,165,250,0.40);
  border: 2.5px solid #7dd3fc;
  box-shadow: 0 0 16px rgba(96,165,250,1), 0 0 32px rgba(96,165,250,0.5);
}
.av-c {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(167,139,250,0.40);
  border: 2px solid #ddd6fe;
  box-shadow: 0 0 14px rgba(167,139,250,1), 0 0 26px rgba(167,139,250,0.5);
}
.av-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }

/* ── Badges ── */
.badge { position: absolute; bottom: -3px; right: -4px; font-size: 7px; font-weight: 900; border-radius: 3px; padding: 1px 3px; line-height: 1.3; }
.badge-a { background: #f59e0b; color: #000; font-size: 8px; }
.badge-b { background: #60a5fa; color: #fff; text-shadow: 0 0 4px rgba(0,0,0,0.5); }
.badge-c { background: #a78bfa; color: #fff; font-size: 6px; text-shadow: 0 0 4px rgba(0,0,0,0.5); }

/* ── Text styles ── */
.nname   { font-size: 10px; font-weight: 800; color: #fff; }
.nname-b { font-size: 9.5px; font-weight: 900; color: #ffffff; text-shadow: 0 0 10px rgba(96,165,250,0.9), 0 0 20px rgba(96,165,250,0.5); }
.nname-c { font-size: 8.5px; font-weight: 900; color: #ffffff; text-shadow: 0 0 10px rgba(167,139,250,0.9), 0 0 20px rgba(167,139,250,0.5); }
.nline   { font-size: 8px; color: rgba(255,255,255,0.8); line-height: 1.5; }
.nline-b { font-size: 8px; color: #ffffff; line-height: 1.4; text-shadow: 0 0 6px rgba(96,165,250,0.6); }
.nline-c { font-size: 7.5px; color: #ffffff; line-height: 1.4; text-shadow: 0 0 6px rgba(167,139,250,0.6); }
.ntotal     { margin-top: 3px; font-size: 9px; font-weight: 700; color: #fff; background: rgba(0,0,0,0.18); border-radius: 5px; padding: 2px 7px; display: inline-block; }
.ntotal-sm  { font-size: 9px; font-weight: 900; margin-top: 2px; color: #7dd3fc; text-shadow: 0 0 10px rgba(96,165,250,0.9), 0 0 20px rgba(96,165,250,0.5); }
.ntotal-c   { font-size: 8px; font-weight: 900; margin-top: 2px; color: #ddd6fe; text-shadow: 0 0 10px rgba(167,139,250,0.9), 0 0 18px rgba(167,139,250,0.5); }
.ntotal-c--big { color: #4ade80; font-size: 9px; text-shadow: 0 0 10px rgba(74,222,128,0.9), 0 0 20px rgba(74,222,128,0.5); }
.tc-dim { color: rgba(255,255,255,0.28) !important; text-shadow: none !important; }

/* ── Color helpers ── */
.y  { color: #fbbf24; } .g  { color: #4ade80; } .bl { color: #60a5fa; } .p { color: #c4b5fd; }

/* ── Row N ── */
.row-n-label {
  display: flex; align-items: center; gap: 6px;
  width: min(310px, 92vw); margin: 4px 0 3px;
}
.n-level-badge {
  font-size: 13px; font-weight: 900; color: #4ade80;
  text-shadow: 0 0 10px rgba(74,222,128,0.9);
  line-height: 1;
}
.n-level-text {
  font-size: 8px; font-weight: 700;
  color: rgba(74,222,128,0.9);
  text-shadow: 0 0 6px rgba(74,222,128,0.5);
}
.row-n-wrap {
  display: flex; justify-content: center; gap: 3px; width: 100%;
}
.node-n {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  background: none; border: none;
  padding: 4px 2px;
  flex: 1; max-width: 64px; min-width: 52px;
}
.av-n {
  width: 24px; height: 24px; border-radius: 50%;
  background: rgba(74,222,128,0.25);
  border: 1.8px solid #4ade80;
  box-shadow: 0 0 10px rgba(74,222,128,0.8), 0 0 20px rgba(74,222,128,0.4);
}
.badge-n {
  background: #4ade80; color: #000; font-size: 5.5px;
}
.nname-n {
  font-size: 8px; font-weight: 800; color: #4ade80;
  text-shadow: 0 0 8px rgba(74,222,128,0.8);
}

/* ── SVG Connectors ── */
.connector-wrap { width: min(310px, 92vw); overflow: visible; }
.connector-ab   { height: 30px; margin: 3px 0; }
.connector-bc   { height: 26px; margin: 2px 0; }
.connector-cn   { height: 22px; margin: 2px 0; }
.conn-svg { width: 100%; height: 100%; overflow: visible; }

.conn-hline {
  stroke: rgba(245,158,11,0.85); stroke-width: 1.5;
  stroke-dasharray: 4 3;
  animation: dash-flow 1.2s linear infinite;
}
.conn-vline {
  stroke: rgba(96,165,250,0.85); stroke-width: 1.5;
  stroke-dasharray: 4 3;
  animation: dash-flow 1.5s linear infinite;
}
.conn-vline--c {
  stroke: rgba(167,139,250,0.75); stroke-width: 1.2;
  animation-duration: 1.8s;
}

@keyframes dash-flow {
  to { stroke-dashoffset: -14; }
}

/* animated flow dots */
.flow-dot { fill: rgba(245,158,11,0.85); }
.flow-dot-c1, .flow-dot-c2, .flow-dot-c3 { fill: rgba(167,139,250,0.8); }
.flow-dot-n { fill: rgba(74,222,128,0.85); }
.conn-vline--n {
  stroke: rgba(74,222,128,0.7); stroke-width: 1.1;
  stroke-dasharray: 3 3;
  animation-duration: 2s;
}

/* ── Legend ── */
.legend {
  margin-top: 10px; width: min(320px, 94vw);
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.22);
  border-radius: 12px; padding: 10px 12px;
}
.leg-title { font-size: 9.5px; font-weight: 800; color: #fff; margin-bottom: 7px; }
.leg-row   { display: flex; align-items: center; gap: 7px; margin-bottom: 4px; }
.dot       { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.dot-a { background: #f59e0b; } .dot-b { background: #60a5fa; } .dot-c { background: #a78bfa; } .dot-n { background: #4ade80; }
.leg-lbl  { font-size: 8.5px; color: rgba(255,255,255,0.82); }
.leg-note { margin-top: 7px; font-size: 8.5px; color: #4ade80; background: rgba(74,222,128,0.15); border: 1px solid rgba(74,222,128,0.35); border-radius: 7px; padding: 5px 8px; }

/* ══════════════════════════════════════════════
   REFERRAL CARD — AgentDashboard Tab 0 styles
   (same class names so it feels consistent)
══════════════════════════════════════════════ */
.ag-card {
  margin-top: 14px;
  width: min(320px, 94vw);
  background: rgba(255,255,255,0.13);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 14px;
  padding: 13px 13px;
}
.invite-header-bar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
}
.invite-header-title { font-size: 11px; font-weight: 800; color: #fff; }
.invite-header-link  { font-size: 9px; color: #fde68a; cursor: pointer; }

.invite-body { display: flex; gap: 10px; }

.qr-col { display: flex; flex-direction: column; align-items: center; gap: 6px; flex-shrink: 0; }
.qr-box { width: 82px; height: 82px; background: #fff; border-radius: 8px; padding: 3px; box-shadow: 0 3px 12px rgba(0,0,0,0.3); }
.qr-img { width: 100%; height: 100%; border-radius: 5px; display: block; object-fit: cover; }
.btn-green-sm {
  font-size: 9px; font-weight: 700; padding: 4px 10px; border-radius: 6px; border: none; cursor: pointer;
  background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff;
}

.info-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }

.url-row {
  display: flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.22);
  border-radius: 7px; padding: 5px 7px;
}
.url-text { flex: 1; font-size: 8px; color: #7dd3fc; word-break: break-all; line-height: 1.4; font-weight: 600; }

.info-stat { font-size: 8.5px; color: rgba(255,255,255,0.78); margin: 0; }

.code-row {
  display: flex; align-items: center; gap: 5px;
  background: rgba(245,158,11,0.22); border: 1px solid rgba(245,158,11,0.55);
  border-radius: 7px; padding: 5px 7px;
}
.code-label { flex: 1; font-size: 9px; color: #fde68a; font-weight: 700; }
.code-label strong { color: #ffffff; font-size: 11px; letter-spacing: 1.5px; text-shadow: 0 0 8px rgba(245,158,11,0.8); }

.copy-icon-btn {
  background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.30);
  border-radius: 5px; padding: 4px; color: #fff; cursor: pointer; flex-shrink: 0;
  display: flex; align-items: center;
}

/* ── Red dot badge ── */
.red-dot {
  position: absolute; top: -3px; right: -3px;
  width: 14px; height: 14px; border-radius: 50%;
  background: #ef4444;
  border: 1.5px solid rgba(15,20,45,0.95);
  font-size: 7px; font-weight: 900; color: #fff;
  display: flex; align-items: center; justify-content: center;
  line-height: 1; z-index: 6;
  box-shadow: 0 0 5px rgba(239,68,68,0.7);
}

/* ── Legend divider ── */
.leg-divider {
  width: 100%; height: 1px;
  background: rgba(255,255,255,0.15);
  margin: 10px 0;
}

/* ── Social inside legend ── */
.leg-social-row {
  display: flex; gap: 8px; width: 100%; margin-top: 2px;
}
.leg-social-btn {
  background: none !important;
  border: none !important;
  padding: 6px 4px;
}
.leg-social-btn:active { opacity: 0.6; }

/* ── Social Share Row ── */
.social-row {
  display: flex; gap: 8px;
  margin-top: 10px; width: min(320px, 94vw);
}
.social-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 9px 4px; border-radius: 10px; cursor: pointer; border: none;
  background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.25);
  transition: opacity 0.15s;
}
.social-btn:active { opacity: 0.6; }
.social-label { font-size: 8.5px; color: rgba(255,255,255,0.9); }

.social-icon {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.social-icon--share { background: rgba(107,114,128,0.4); }
.social-icon--fb    { background: #1877f2; }
.social-icon--tg    { background: #29a9eb; }
.social-icon--wa    { background: #25d366; }
</style>
