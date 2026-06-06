<template>
  <div style="min-height:100vh;background:linear-gradient(145deg,#0f0c2e,#1a1650,#0d1525);padding-bottom:80px;">

    <!-- Header -->
    <div style="position:sticky;top:0;z-index:50;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);background:rgba(15,12,46,0.85);border-bottom:1px solid rgba(255,255,255,0.08);padding:12px 14px;display:flex;align-items:center;gap:10px;">
      <router-link to="/agent" style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);text-decoration:none;flex-shrink:0;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </router-link>
      <div>
        <div style="font-size:14px;font-weight:900;color:#fff;">ဖိတ်ခေါ်ရန်</div>
        <div style="font-size:9px;color:rgba(255,255,255,0.38);margin-top:1px;">Referral · Agent Network</div>
      </div>
      <div v-if="allDownline.length" style="margin-left:auto;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:4px 10px;text-align:center;">
        <div style="font-size:8px;color:rgba(255,255,255,0.4);">Members</div>
        <div style="font-size:14px;font-weight:900;color:#fbbf24;">{{ allDownline.length }}</div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;">
      <div style="width:44px;height:44px;border-radius:50%;border:2px solid rgba(59,130,246,0.2);border-top-color:#3b82f6;animation:spin 0.8s linear infinite;margin-bottom:16px;"></div>
      <div style="font-size:12px;color:rgba(255,255,255,0.4);">Loading...</div>
    </div>

    <div v-else style="padding:12px;">

      <!-- ── Invite Code + QR Card ── -->
      <div class="referral-hero-card" style="backdrop-filter:blur(22px) saturate(200%);-webkit-backdrop-filter:blur(22px) saturate(200%);background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:16px;text-align:center;margin-bottom:10px;box-shadow:0 8px 32px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.2);">
        <div style="font-size:11px;font-weight:800;color:rgba(255,255,255,0.7);margin-bottom:3px;">Invite Code</div>
        <div style="font-size:28px;font-weight:900;color:#f59e0b;letter-spacing:5px;margin-bottom:14px;text-shadow:0 0 18px rgba(245,158,11,0.55);">{{ inviteCode }}</div>
        <div style="width:116px;height:116px;background:rgba(255,255,255,0.96);border-radius:12px;padding:5px;margin:0 auto 14px;box-shadow:0 6px 24px rgba(0,0,0,0.35);">
          <img :src="qrUrl" style="width:100%;height:100%;border-radius:8px;object-fit:cover;" />
        </div>
        <div style="font-size:9px;color:rgba(255,255,255,0.35);word-break:break-all;margin-bottom:13px;background:rgba(0,0,0,0.14);padding:6px 9px;border-radius:7px;">{{ referralLink }}</div>
        <div style="display:flex;gap:7px;justify-content:center;">
          <button @click="copyText(inviteCode)"
            style="backdrop-filter:blur(6px);background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:9px;padding:8px 16px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.88);cursor:pointer;display:inline-flex;align-items:center;gap:5px;transition:background 0.15s;"
            :style="copiedCode?'background:rgba(74,222,128,0.18);border-color:rgba(74,222,128,0.35);color:#4ade80;':''">
            <svg v-if="!copiedCode" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            <span>{{ copiedCode ? '✓ ကူးပြီး' : 'Code ကူး' }}</span>
          </button>
          <button @click="copyText(referralLink)"
            style="backdrop-filter:blur(6px);background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:9px;padding:8px 16px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.88);cursor:pointer;display:inline-flex;align-items:center;gap:5px;transition:background 0.15s;"
            :style="copiedLink?'background:rgba(74,222,128,0.18);border-color:rgba(74,222,128,0.35);color:#4ade80;':''">
            <svg v-if="!copiedLink" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            <span>{{ copiedLink ? '✓ ကူးပြီး' : 'Link ကူး' }}</span>
          </button>
        </div>
      </div>

      <!-- ── Share Via ── -->
      <div style="backdrop-filter:blur(18px) saturate(200%);-webkit-backdrop-filter:blur(18px) saturate(200%);background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.16);border-radius:13px;padding:10px;margin-bottom:10px;">
        <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.45);margin-bottom:9px;text-align:center;">Share Via</div>
        <div style="display:flex;gap:6px;">
          <button v-for="s in socialButtons" :key="s.id" @click="shareVia(s.id)"
            style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;border-radius:10px;padding:9px 4px;cursor:pointer;border:none;background:none;">
            <span v-html="s.icon" style="display:flex;align-items:center;justify-content:center;"></span>
            <span style="font-size:8px;color:rgba(255,255,255,0.7);white-space:nowrap;">{{ s.label }}</span>
          </button>
        </div>
      </div>

      <!-- ── How it works ── -->
      <div style="backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.13);border-radius:13px;padding:10px;margin-bottom:10px;">
        <div style="font-size:11px;font-weight:800;color:rgba(255,255,255,0.85);margin-bottom:8px;display:flex;align-items:center;gap:5px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          ဘယ်လိုရမလဲ?
        </div>
        <div v-for="(step, i) in inviteSteps" :key="i" style="display:flex;align-items:flex-start;gap:8px;margin-bottom:7px;">
          <div style="width:20px;height:20px;border-radius:50%;background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.35);display:flex;align-items:center;justify-content:center;flex-shrink:0;backdrop-filter:blur(6px);">
            <span style="font-size:9px;font-weight:900;color:#f59e0b;">{{ i + 1 }}</span>
          </div>
          <div style="font-size:10px;color:rgba(255,255,255,0.6);line-height:1.5;padding:4px 7px;border-radius:7px;" :style="step.style">{{ step.text }}</div>
        </div>
      </div>

      <!-- ── Network Plexus Canvas ── -->
      <div style="backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:13px;overflow:hidden;aspect-ratio:16/6;position:relative;margin-bottom:10px;">
        <canvas ref="plexusRef" style="width:100%;height:100%;display:block;"></canvas>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;">
          <div style="font-size:10px;color:rgba(255,255,255,0.15);">Network · {{ allDownline.length }} Members</div>
        </div>
      </div>

      <!-- ── Stats ── -->
      <div v-if="allDownline.length > 0" style="backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:13px;padding:12px;display:flex;justify-content:space-around;">
        <div style="text-align:center;">
          <div style="font-size:8px;color:rgba(255,255,255,0.35);margin-bottom:2px;">တောင်စီး</div>
          <div style="font-size:20px;font-weight:900;color:#fbbf24;">{{ allDownline.filter(u=>u.level===1).length }}</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:8px;color:rgba(255,255,255,0.35);margin-bottom:2px;">Indirect</div>
          <div style="font-size:20px;font-weight:900;color:#a78bfa;">{{ allDownline.filter(u=>u.level>1).length }}</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:8px;color:rgba(255,255,255,0.35);margin-bottom:2px;">စုစုပေါင်း</div>
          <div style="font-size:20px;font-weight:900;color:#4ade80;">{{ allDownline.length }}</div>
        </div>
      </div>

    </div>

    <style>
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { supabase } from '@/supabase'

// ── State ──────────────────────────────────────────────────
const loading      = ref(true)
const copiedCode   = ref(false)
const copiedLink   = ref(false)
const userId       = ref('')
const allDownline  = ref([])
const plexusRef    = ref(null)
let   plexusRaf    = null

// ── Computed ───────────────────────────────────────────────
const inviteCode = computed(() =>
  userId.value ? userId.value.substring(0, 8).toUpperCase() : (localStorage.getItem('sb_username') || '—')
)

const referralLink = computed(() =>
  window.location.origin + '/?dl=' + inviteCode.value
)

const qrUrl = computed(() =>
  `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(referralLink.value)}&bgcolor=ffffff&color=000000&margin=6`
)

// ── Static Data ─────────────────────────────────────────────
const socialButtons = [
  {
    id: 'native', label: 'မျှဝေ',
    bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.1)',
    icon: `<svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.65)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>`
  },
  {
    id: 'telegram', label: 'Telegram',
    bg: 'rgba(42,171,238,0.13)', border: 'rgba(42,171,238,0.22)',
    icon: `<img src="https://ik.imagekit.io/tdpebgueq/icons/telegram_logo_QeWRW9-okP.png?tr=f-auto" style="width:26px;height:26px;object-fit:contain;border-radius:5px;" />`
  },
  {
    id: 'viber', label: 'Viber',
    bg: 'rgba(115,96,242,0.13)', border: 'rgba(115,96,242,0.22)',
    icon: `<img src="https://ik.imagekit.io/tdpebgueq/icons/viber_logo_wG8S5sFl5P.png?tr=f-auto" style="width:26px;height:26px;object-fit:contain;border-radius:5px;" />`
  },
  {
    id: 'facebook', label: 'Facebook',
    bg: 'rgba(24,119,242,0.13)', border: 'rgba(24,119,242,0.22)',
    icon: `<img src="https://ik.imagekit.io/tdpebgueq/Agent_Tap_icons/5bb0f73a7b3e0f976acad614a42e5040.jpg?tr=f-auto" style="width:26px;height:26px;object-fit:contain;border-radius:5px;" />`
  },
  {
    id: 'whatsapp', label: 'WhatsApp',
    bg: 'rgba(37,211,102,0.13)', border: 'rgba(37,211,102,0.22)',
    icon: `<img src="https://ik.imagekit.io/tdpebgueq/Agent_Tap_icons/b7198771222c74b52116be0f7d18b700.jpg?tr=f-auto" style="width:26px;height:26px;object-fit:contain;border-radius:5px;" />`
  },
]

const inviteSteps = [
  { text: 'Referral link ကို copy ကူးပြီး မိတ်ဆွေများကို မျှဝေပါ', style: 'background:rgba(255,193,7,0.15);color:rgba(255,193,7,0.85);border:1px solid rgba(255,193,7,0.25)' },
  { text: 'သူတို့ link ဖြင့် iW99 တွင် အကောင့်ဖွင့်ပါ', style: 'background:rgba(100,220,120,0.1);color:rgba(100,220,120,0.8);border:1px solid rgba(100,220,120,0.2)' },
  { text: 'သူတို့ Deposit ထည့်ပြီး ကစားသောအခါ သင် Turnover × 10% ရမည်', style: 'background:rgba(140,180,255,0.1);color:rgba(140,180,255,0.8);border:1px solid rgba(140,180,255,0.2)' },
]

// ── Data Loading ─────────────────────────────────────────────
async function loadData() {
  loading.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    userId.value = user.id

    const { data: treeRows } = await supabase
      .from('affiliate_tree')
      .select('descendant_id, level')
      .eq('ancestor_id', user.id)
      .gt('level', 0)
      .order('level', { ascending: true })

    if (treeRows && treeRows.length > 0) {
      const ids = treeRows.map(r => r.descendant_id)
      const { data: profiles } = await supabase
        .from('users')
        .select('id, username, vip_level, total_deposit, created_at')
        .in('id', ids)
      allDownline.value = treeRows.map(row => {
        const prof = profiles?.find(p => p.id === row.descendant_id) || {}
        return { ...prof, descendant_id: row.descendant_id, level: row.level }
      })
    } else {
      allDownline.value = []
    }
  } catch (e) {
    console.error('[ReferralPage] loadData:', e)
  } finally {
    loading.value = false
  }
}

// ── Copy / Share ─────────────────────────────────────────────
async function copyText(text) {
  const isLink = text.startsWith('http')
  try {
    await navigator.clipboard.writeText(text)
    if (isLink) { copiedLink.value = true; setTimeout(() => copiedLink.value = false, 2200) }
    else        { copiedCode.value = true; setTimeout(() => copiedCode.value = false, 2200) }
  } catch {
    prompt('Copy manually:', text)
  }
}

function shareVia(platform) {
  const url  = encodeURIComponent(referralLink.value)
  const text = encodeURIComponent(`iW99 မှာ ကစားပါ! Referral: ${referralLink.value}`)
  const map = {
    native:   null,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    viber:    `viber://forward?text=${text}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${text}`,
  }
  if (platform === 'native') {
    if (navigator.share) {
      navigator.share({ title: 'iW99 Agent Referral', text: 'iW99 မှာ ကစားပါ!', url: referralLink.value }).catch(() => {})
    } else {
      copyText(referralLink.value)
    }
    return
  }
  if (map[platform]) window.open(map[platform], '_blank')
}

// ── Plexus Canvas Animation ──────────────────────────────────
function initPlexus(canvas) {
  if (!canvas) return
  if (plexusRaf) { cancelAnimationFrame(plexusRaf); plexusRaf = null }

  const ctx  = canvas.getContext('2d')
  const W    = canvas.offsetWidth  || 340
  const H    = canvas.offsetHeight || 130
  canvas.width  = W * window.devicePixelRatio
  canvas.height = H * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  const NUM = 10
  const MAX_DIST = 90
  const pts = Array.from({ length: NUM }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r:  1.4 + Math.random() * 1.4,
    hue: Math.random() > 0.5 ? 260 : 195,
  }))

  function draw() {
    ctx.clearRect(0, 0, W, H)
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x
        const dy = pts[i].y - pts[j].y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.38
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `hsla(${(pts[i].hue + pts[j].hue) / 2},90%,75%,${alpha})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }
    }
    for (const p of pts) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue},90%,80%,0.78)`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r * 2.8, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue},90%,80%,0.07)`
      ctx.fill()
    }
    plexusRaf = requestAnimationFrame(draw)
  }
  draw()
}

// ── Lifecycle ────────────────────────────────────────────────
onMounted(async () => {
  await loadData()
  await nextTick()
  if (plexusRef.value) initPlexus(plexusRef.value)
  gsap.from('.referral-hero-card', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' })
})

onUnmounted(() => {
  if (plexusRaf) { cancelAnimationFrame(plexusRaf); plexusRaf = null }
})
</script>
