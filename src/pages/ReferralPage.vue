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

      <!-- ═══════════ ROW A ═══════════ -->
      <div class="row-a-wrap">
        <div class="node node-a">
          <div class="av av-a">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(245,158,11,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(245,158,11,0.7)"/></svg>
            <span class="badge badge-a">A</span>
          </div>
          <div class="info">
            <div class="nname">မင်း (A)</div>
            <div class="nline">Direct: <b class="y">500K+300K+200K = 1,000K</b></div>
            <div class="nline">1,000K × 0.15% = <b class="g">1,500 Ks</b></div>
            <div class="nline">Override: <b class="g">600+1,200 = 1,800 Ks</b></div>
            <div class="ntotal">💰 3,300 Ks / session</div>
          </div>
        </div>
      </div>

      <!-- arrows A→B -->
      <div class="arrows-ab">
        <div class="vl"></div>
        <div class="hl"></div>
        <div class="vl"></div>
        <div class="hl"></div>
        <div class="vl"></div>
      </div>

      <!-- ═══════════ ROW B ═══════════ -->
      <div class="row-b-wrap">
        <div class="node node-b">
          <div class="av av-b">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(96,165,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(96,165,250,0.7)"/></svg>
            <span class="badge badge-b">B1</span>
          </div>
          <div class="info">
            <div class="nname">B1</div>
            <div class="nline">Bet: <b class="bl">500K</b></div>
            <div class="nline">× 0.15%</div>
            <div class="ntotal-sm">= <b class="g">750 Ks</b></div>
          </div>
        </div>

        <div class="node node-b">
          <div class="av av-b">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(96,165,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(96,165,250,0.7)"/></svg>
            <span class="badge badge-b">B2</span>
          </div>
          <div class="info">
            <div class="nname">B2</div>
            <div class="nline">Bet: <b class="bl">3,000K</b></div>
            <div class="nline">× 0.15%</div>
            <div class="ntotal-sm">= <b class="g">4,500 Ks</b></div>
          </div>
        </div>

        <div class="node node-b">
          <div class="av av-b">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(96,165,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(96,165,250,0.7)"/></svg>
            <span class="badge badge-b">B3</span>
          </div>
          <div class="info">
            <div class="nname">B3</div>
            <div class="nline">Bet: <b class="bl">2,000K</b></div>
            <div class="nline">× 0.15%</div>
            <div class="ntotal-sm">= <b class="g">3,000 Ks</b></div>
          </div>
        </div>
      </div>

      <!-- arrows B→C -->
      <div class="arrows-bc">
        <div class="bc-left">
          <div class="vl"></div>
          <div class="hl-sm"></div>
          <div class="vl"></div>
        </div>
        <div class="bc-mid"><div class="vl vl-fade"></div></div>
        <div class="bc-right"><div class="vl"></div></div>
      </div>

      <!-- ═══════════ ROW C ═══════════ -->
      <div class="row-c-wrap">
        <div class="node node-c">
          <div class="av av-c">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(167,139,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(167,139,250,0.7)"/></svg>
            <span class="badge badge-c">C1</span>
          </div>
          <div class="info">
            <div class="nname-c">C1</div>
            <div class="nline-c">Bet B1: <b class="p">1,000K</b></div>
            <div class="nline-c">× 0.09%</div>
            <div class="ntotal-c">= <b class="g">900 Ks</b></div>
          </div>
        </div>

        <div class="node node-c">
          <div class="av av-c">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(167,139,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(167,139,250,0.7)"/></svg>
            <span class="badge badge-c">C2</span>
          </div>
          <div class="info">
            <div class="nname-c">C2</div>
            <div class="nline-c">Bet B1: <b class="p">2,000K</b></div>
            <div class="nline-c">× 0.15%</div>
            <div class="ntotal-c">= <b class="g">3,000 Ks</b></div>
          </div>
        </div>

        <div class="node-gap"></div>

        <div class="node node-c node-c3">
          <div class="av av-c">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(167,139,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(167,139,250,0.7)"/></svg>
            <span class="badge badge-c">C3</span>
          </div>
          <div class="info">
            <div class="nname-c">C3</div>
            <div class="nline-c">Bet B3: <b class="p">20,000K</b></div>
            <div class="nline-c">× 0.45%</div>
            <div class="ntotal-c ntotal-c--big">= <b class="g">90,000 Ks</b></div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend">
        <div class="leg-title">📊 Commission အဆင့်များ</div>
        <div class="leg-row"><span class="dot dot-a"></span><span class="leg-lbl">A (သင်) — ကွန်ရက်အကြီးဆုံး လုပ်ကြေး</span></div>
        <div class="leg-row"><span class="dot dot-b"></span><span class="leg-lbl">B Level — တိုက်ရိုက်ဖိတ်ခေါ်သူများ (Direct)</span></div>
        <div class="leg-row"><span class="dot dot-c"></span><span class="leg-lbl">C Level — B ဖိတ်ခေါ်သူများ (Indirect)</span></div>
        <div class="leg-note">⚡ C Level ကြီးလေ — သင် Override Commission ရလေ!</div>
      </div>

      <!-- ═══════════ REFERRAL SECTION ═══════════ -->
      <div class="ref-section">

        <div class="ref-title">🔗 သင့် Referral Link</div>

        <!-- Loading state -->
        <div v-if="loading" class="ref-loading">
          <div class="ref-spinner"></div>
        </div>

        <template v-else>
          <!-- Invite Code -->
          <div class="ref-code-row">
            <div class="ref-code-label">Invite Code</div>
            <div class="ref-code-val">{{ inviteCode }}</div>
            <button @click="copyText(inviteCode, 'code')" class="ref-copy-btn" :class="copiedCode ? 'ref-copy-btn--ok' : ''">
              <svg v-if="!copiedCode" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              <span>{{ copiedCode ? '✓ ကူးပြီး' : 'ကူး' }}</span>
            </button>
          </div>

          <!-- Link -->
          <div class="ref-link-row">
            <div class="ref-link-text">{{ referralLink }}</div>
            <button @click="copyText(referralLink, 'link')" class="ref-copy-btn" :class="copiedLink ? 'ref-copy-btn--ok' : ''">
              <svg v-if="!copiedLink" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              <span>{{ copiedLink ? '✓' : 'Link' }}</span>
            </button>
          </div>

          <!-- QR Code -->
          <div class="ref-qr-wrap">
            <div class="ref-qr-box">
              <img :src="qrUrl" alt="QR" class="ref-qr-img" />
            </div>
            <div class="ref-qr-hint">QR ကို Screenshot ရိုက်ပြီး မျှဝေပါ</div>
          </div>

          <!-- Share Buttons -->
          <div class="ref-share-row">
            <button @click="share('native')" class="ref-share-btn">
              <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              <span>မျှဝေ</span>
            </button>
            <button @click="share('telegram')" class="ref-share-btn ref-share-btn--tg">
              <img src="https://ik.imagekit.io/tdpebgueq/icons/telegram_logo_QeWRW9-okP.png?tr=f-auto" style="width:16px;height:16px;object-fit:contain;border-radius:3px;" />
              <span>Telegram</span>
            </button>
            <button @click="share('facebook')" class="ref-share-btn ref-share-btn--fb">
              <svg width="15" height="15" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Facebook</span>
            </button>
            <button @click="share('whatsapp')" class="ref-share-btn ref-share-btn--wa">
              <svg width="15" height="15" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>WhatsApp</span>
            </button>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

const loading    = ref(true)
const userId     = ref('')
const copiedCode = ref(false)
const copiedLink = ref(false)

const inviteCode = computed(() =>
  userId.value ? userId.value.substring(0, 8).toUpperCase() : (localStorage.getItem('sb_username') || '—')
)
const referralLink = computed(() =>
  window.location.origin + '/?dl=' + inviteCode.value
)
const qrUrl = computed(() =>
  `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(referralLink.value)}&bgcolor=ffffff&color=000000&margin=6`
)

async function loadUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) userId.value = user.id
  } catch (_) {}
  finally { loading.value = false }
}

async function copyText(text, type) {
  try { await navigator.clipboard.writeText(text) } catch { prompt('Copy:', text) }
  if (type === 'code') { copiedCode.value = true; setTimeout(() => copiedCode.value = false, 2000) }
  else { copiedLink.value = true; setTimeout(() => copiedLink.value = false, 2000) }
}

function share(platform) {
  const url  = encodeURIComponent(referralLink.value)
  const msg  = encodeURIComponent(`iW99 မှာ ကစားပါ! Referral: ${referralLink.value}`)
  const map  = {
    native:   null,
    telegram: `https://t.me/share/url?url=${url}&text=${msg}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${msg}`,
  }
  if (platform === 'native') {
    if (navigator.share) navigator.share({ title: 'iW99 Agent', url: referralLink.value }).catch(() => {})
    else copyText(referralLink.value, 'link')
    return
  }
  if (map[platform]) window.open(map[platform], '_blank')
}

onMounted(loadUser)
</script>

<style scoped>
.net-root {
  min-height: 100vh;
  background: linear-gradient(160deg, #0e0c2e 0%, #1a1650 50%, #0d1525 100%);
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.net-header {
  position: sticky; top: 0; z-index: 50;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  background: rgba(14,12,46,0.88);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding: 10px 14px;
  display: flex; align-items: center; gap: 10px;
}
.net-back {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center; text-decoration: none; flex-shrink: 0;
}
.net-title { font-size: 13px; font-weight: 900; color: #fff; }
.net-sub { font-size: 8.5px; color: rgba(255,255,255,0.35); margin-top: 1px; }

/* ── Body ── */
.net-body {
  flex: 1;
  padding: 10px 10px 80px;
  display: flex; flex-direction: column; align-items: center; gap: 0;
}

/* ── Node A ── */
.row-a-wrap { width: 100%; display: flex; justify-content: center; }
.node-a {
  display: flex; flex-direction: row; align-items: flex-start; gap: 8px;
  background: linear-gradient(135deg, rgba(245,158,11,0.16), rgba(217,119,6,0.07));
  border: 1.5px solid rgba(245,158,11,0.5);
  box-shadow: 0 0 16px rgba(245,158,11,0.15), 0 4px 16px rgba(0,0,0,0.4);
  border-radius: 12px; padding: 9px 10px;
  width: min(310px, 92vw);
}

/* ── Node B ── */
.row-b-wrap {
  display: flex; justify-content: center; gap: 5px; width: 100%;
}
.node-b {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  background: rgba(96,165,250,0.07); border: 1.2px solid rgba(96,165,250,0.3);
  border-radius: 10px; padding: 7px 6px;
  flex: 1; max-width: 105px; min-width: 88px;
}

/* ── Node C ── */
.row-c-wrap {
  display: flex; justify-content: center; gap: 4px; width: 100%;
}
.node-c {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.28);
  border-radius: 9px; padding: 6px 5px;
  flex: 1; max-width: 88px; min-width: 74px;
}
.node-c3 {
  background: rgba(167,139,250,0.12); border-color: rgba(167,139,250,0.48);
}
.node-gap { flex: 1; max-width: 88px; }

/* ── Avatars ── */
.av { position: relative; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.av-a { width: 38px; height: 38px; border-radius: 50%; background: rgba(245,158,11,0.13); border: 2px solid rgba(245,158,11,0.55); }
.av-b { width: 30px; height: 30px; border-radius: 50%; background: rgba(96,165,250,0.1); border: 1.5px solid rgba(96,165,250,0.4); }
.av-c { width: 24px; height: 24px; border-radius: 50%; background: rgba(167,139,250,0.1); border: 1.2px solid rgba(167,139,250,0.4); }

/* ── Badges ── */
.badge { position: absolute; bottom: -3px; right: -4px; font-size: 7px; font-weight: 900; border-radius: 3px; padding: 1px 3px; line-height: 1.3; }
.badge-a { background: #f59e0b; color: #000; font-size: 8px; }
.badge-b { background: #60a5fa; color: #000; }
.badge-c { background: #a78bfa; color: #000; font-size: 6px; }

/* ── Info text ── */
.info { flex: 1; min-width: 0; }
.nname { font-size: 10.5px; font-weight: 800; color: #fff; margin-bottom: 2px; }
.nname-c { font-size: 9px; font-weight: 800; color: #fff; margin-bottom: 1px; }
.nline { font-size: 8.5px; color: rgba(255,255,255,0.5); line-height: 1.5; }
.nline-c { font-size: 7.5px; color: rgba(255,255,255,0.5); line-height: 1.5; }
.ntotal { margin-top: 3px; font-size: 9.5px; font-weight: 700; color: #fff; background: rgba(0,0,0,0.28); border-radius: 5px; padding: 2px 7px; display: inline-block; }
.ntotal-sm { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.9); margin-top: 2px; }
.ntotal-c { font-size: 8.5px; font-weight: 700; color: rgba(255,255,255,0.9); margin-top: 2px; }
.ntotal-c--big { color: #4ade80; font-size: 9px; }

/* ── Color helpers ── */
.y { color: #fbbf24; } .g { color: #4ade80; } .bl { color: #60a5fa; } .p { color: #c4b5fd; }

/* ── Arrows A→B ── */
.arrows-ab {
  display: flex; align-items: flex-start; justify-content: space-between;
  width: min(290px, 88vw); height: 22px; padding: 0 34px; margin: 2px 0;
}
.vl { width: 2px; height: 22px; background: linear-gradient(to bottom, rgba(245,158,11,0.5), rgba(96,165,250,0.4)); border-radius: 1px; flex-shrink: 0; }
.vl-fade { background: rgba(255,255,255,0.08); }
.hl { flex: 1; height: 2px; background: rgba(245,158,11,0.3); align-self: flex-end; }

/* ── Arrows B→C ── */
.arrows-bc {
  display: flex; align-items: flex-end; gap: 5px;
  width: 100%; height: 20px; padding: 0 4px; margin: 2px 0;
}
.bc-left { display: flex; align-items: flex-end; gap: 0; flex: 2; justify-content: center; }
.bc-mid  { flex: 1; display: flex; justify-content: center; }
.bc-right{ flex: 1; display: flex; justify-content: center; }
.hl-sm { width: 30px; height: 2px; background: rgba(96,165,250,0.28); flex-shrink: 0; }

/* ── Legend ── */
.legend {
  margin-top: 12px; width: min(320px, 94vw);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px; padding: 11px 13px;
}
.leg-title { font-size: 10px; font-weight: 800; color: rgba(255,255,255,0.7); margin-bottom: 8px; }
.leg-row { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot-a { background: #f59e0b; } .dot-b { background: #60a5fa; } .dot-c { background: #a78bfa; }
.leg-lbl { font-size: 9px; color: rgba(255,255,255,0.5); }
.leg-note { margin-top: 8px; font-size: 9px; color: #4ade80; background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.15); border-radius: 7px; padding: 6px 9px; }

/* ── Referral Section ── */
.ref-section {
  margin-top: 14px; width: min(320px, 94vw);
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px; padding: 14px 14px;
}
.ref-title {
  font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.8);
  margin-bottom: 12px;
}
.ref-loading { display: flex; justify-content: center; padding: 20px 0; }
.ref-spinner {
  width: 24px; height: 24px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1); border-top-color: #f59e0b;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Code row */
.ref-code-row {
  display: flex; align-items: center; gap: 8px;
  background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.2);
  border-radius: 9px; padding: 8px 10px; margin-bottom: 8px;
}
.ref-code-label { font-size: 9px; color: rgba(255,255,255,0.4); flex-shrink: 0; }
.ref-code-val { flex: 1; font-size: 14px; font-weight: 900; color: #f59e0b; letter-spacing: 3px; }

/* Link row */
.ref-link-row {
  display: flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 9px; padding: 7px 10px; margin-bottom: 12px;
}
.ref-link-text {
  flex: 1; font-size: 9px; color: rgba(255,255,255,0.35);
  word-break: break-all; line-height: 1.4;
}

/* Copy button */
.ref-copy-btn {
  display: flex; align-items: center; gap: 4px; flex-shrink: 0;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
  border-radius: 6px; padding: 4px 8px; color: rgba(255,255,255,0.7); font-size: 9px; cursor: pointer;
  transition: all 0.2s;
}
.ref-copy-btn--ok { background: rgba(74,222,128,0.15); border-color: rgba(74,222,128,0.3); color: #4ade80; }

/* QR */
.ref-qr-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 12px; }
.ref-qr-box {
  width: 110px; height: 110px; background: rgba(255,255,255,0.95);
  border-radius: 10px; padding: 4px; box-shadow: 0 4px 18px rgba(0,0,0,0.35);
}
.ref-qr-img { width: 100%; height: 100%; border-radius: 7px; object-fit: cover; display: block; }
.ref-qr-hint { font-size: 9px; color: rgba(255,255,255,0.3); }

/* Share */
.ref-share-row { display: flex; gap: 5px; }
.ref-share-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 8px 4px; border-radius: 9px; cursor: pointer; border: none;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7);
  font-size: 8px; transition: opacity 0.15s;
}
.ref-share-btn:active { opacity: 0.6; }
.ref-share-btn--tg { background: rgba(42,171,238,0.1); border-color: rgba(42,171,238,0.2); }
.ref-share-btn--fb { background: rgba(24,119,242,0.1); border-color: rgba(24,119,242,0.2); }
.ref-share-btn--wa { background: rgba(37,211,102,0.1); border-color: rgba(37,211,102,0.2); }
</style>
