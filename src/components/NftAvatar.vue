<template>
  <div class="nft-root" :style="{ width: size + 'px', height: size + 'px' }">

    <!-- Outer aura rings -->
    <div class="aura-r aura-r3" :style="{ borderColor: palette.ring, boxShadow: '0 0 14px ' + palette.ring }"></div>
    <div class="aura-r aura-r2" :style="{ borderColor: palette.mid }"></div>
    <div class="aura-r aura-r1" :style="{ borderColor: palette.inner }"></div>

    <!-- Orbit particles -->
    <div class="orbit-wrap">
      <div v-for="(p,i) in orbs" :key="i" class="orb"
        :style="{ '--c': p.color, '--r': p.r+'px', '--s': p.s+'px', animationDuration: p.d+'s', animationDelay: p.dl+'s', animationDirection: p.rev?'reverse':'normal' }">
      </div>
    </div>

    <!-- Main circle -->
    <div class="nft-circle" :style="{ background: bg }">

      <!-- SVG portrait -->
      <svg :width="size*0.92" :height="size*0.92" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
        <defs>
          <!-- Skin gradient - cinematic side-lit -->
          <radialGradient :id="uid+'-sk'" cx="35%" cy="35%" r="65%">
            <stop offset="0%" :stop-color="t.skinHi"/>
            <stop offset="55%" :stop-color="t.skin"/>
            <stop offset="100%" :stop-color="t.skinShadow"/>
          </radialGradient>

          <!-- Neon left light wash -->
          <radialGradient :id="uid+'-nl'" cx="0%" cy="45%" r="70%">
            <stop offset="0%" :stop-color="palette.neon1" stop-opacity="0.55"/>
            <stop offset="100%" :stop-color="palette.neon1" stop-opacity="0"/>
          </radialGradient>

          <!-- Neon right light wash -->
          <radialGradient :id="uid+'-nr'" cx="100%" cy="45%" r="70%">
            <stop offset="0%" :stop-color="palette.neon2" stop-opacity="0.45"/>
            <stop offset="100%" :stop-color="palette.neon2" stop-opacity="0"/>
          </radialGradient>

          <!-- Hair gradient -->
          <linearGradient :id="uid+'-hr'" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" :stop-color="t.hair1"/>
            <stop offset="100%" :stop-color="t.hair2"/>
          </linearGradient>

          <!-- Body/suit gradient -->
          <linearGradient :id="uid+'-bd'" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="t.suit1"/>
            <stop offset="100%" :stop-color="t.suit2"/>
          </linearGradient>

          <!-- Eye glow filter -->
          <filter :id="uid+'-eg'" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <!-- Neon glow filter -->
          <filter :id="uid+'-ng'" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <!-- Strong glow -->
          <filter :id="uid+'-sg'" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <!-- Clip for face -->
          <clipPath :id="uid+'-fc'">
            <ellipse cx="50" cy="42" rx="18" ry="20"/>
          </clipPath>
        </defs>

        <!-- ── BODY / SUIT ── -->
        <ellipse cx="50" cy="88" rx="26" ry="16" :fill="'url(#'+uid+'-bd'+')'"/>

        <!-- Suit detail lines -->
        <path d="M40 76 L50 82 L60 76" :stroke="palette.neon1" stroke-width="0.7" fill="none" opacity="0.7"/>
        <line x1="50" y1="72" x2="50" y2="84" :stroke="palette.neon1" stroke-width="0.5" opacity="0.5"/>

        <!-- Neck -->
        <rect x="46" y="60" width="8" height="14" rx="2" :fill="'url(#'+uid+'-sk'+')'"/>
        <!-- Neck circuit mark -->
        <path d="M47 65 L49 67 L53 63" :stroke="palette.neon2" stroke-width="0.6" fill="none" opacity="0.8"/>

        <!-- ── HAIR BASE ── -->
        <!-- Type 0: Neon bob cut -->
        <template v-if="t.hairType===0">
          <path d="M32 42 Q32 20 50 19 Q68 20 68 42 Q62 26 50 24 Q38 26 32 42Z" :fill="'url(#'+uid+'-hr'+')'"/>
          <path d="M32 46 Q30 38 32 34 Q30 42 28 48Z" :fill="t.hair1" opacity="0.8"/>
          <path d="M68 46 Q70 38 68 34 Q70 42 72 48Z" :fill="t.hair1" opacity="0.8"/>
          <!-- Hair neon highlight -->
          <path d="M36 26 Q50 21 64 26" :stroke="palette.neon1" stroke-width="0.8" fill="none" opacity="0.6" :filter="'url(#'+uid+'-ng'+')'"/>
        </template>
        <!-- Type 1: Spiked punk hair -->
        <template v-else-if="t.hairType===1">
          <path d="M33 43 Q33 22 50 20 Q67 22 67 43 Q60 27 50 25 Q40 27 33 43Z" :fill="'url(#'+uid+'-hr'+')'"/>
          <polygon points="38,36 34,18 42,32" :fill="t.hair1"/>
          <polygon points="50,33 47,15 53,30" :fill="t.hair2"/>
          <polygon points="62,36 66,18 58,32" :fill="t.hair1"/>
          <!-- Neon tips -->
          <circle cx="34" cy="18" r="2" :fill="palette.neon1" :filter="'url(#'+uid+'-sg'+')'"/>
          <circle cx="50" cy="15" r="2" :fill="palette.neon2" :filter="'url(#'+uid+'-sg'+')'"/>
          <circle cx="66" cy="18" r="2" :fill="palette.neon1" :filter="'url(#'+uid+'-sg'+')'"/>
        </template>
        <!-- Type 2: Slick back with neon streak -->
        <template v-else-if="t.hairType===2">
          <path d="M33 43 Q32 22 50 20 Q68 22 67 43 Q64 28 50 25 Q36 28 33 43Z" :fill="'url(#'+uid+'-hr'+')'"/>
          <path d="M33 36 Q42 23 58 22 Q66 24 68 30" :stroke="palette.neon1" stroke-width="1.5" fill="none" opacity="0.8" :filter="'url(#'+uid+'-ng'+')'"/>
          <path d="M36 30 Q44 20 56 20" :stroke="palette.neon2" stroke-width="0.8" fill="none" opacity="0.6"/>
        </template>
        <!-- Type 3: Short with neon undercut -->
        <template v-else-if="t.hairType===3">
          <path d="M34 38 Q34 22 50 20 Q66 22 66 38 Q62 26 50 24 Q38 26 34 38Z" :fill="'url(#'+uid+'-hr'+')'"/>
          <!-- Undercut glow line -->
          <path d="M34 38 Q42 42 50 42 Q58 42 66 38" :stroke="palette.neon2" stroke-width="1.2" fill="none" opacity="0.9" :filter="'url(#'+uid+'-ng'+')'"/>
          <path d="M34 38 Q42 42 50 42 Q58 42 66 38" :stroke="palette.neon2" stroke-width="0.4" fill="none" opacity="1"/>
        </template>
        <!-- Type 4: Long flowing with circuit -->
        <template v-else>
          <path d="M32 42 Q30 24 50 20 Q70 24 68 42 Q65 28 50 25 Q35 28 32 42Z" :fill="'url(#'+uid+'-hr'+')'"/>
          <path d="M32 42 Q28 55 30 68" :fill="t.hair2" opacity="0.7"/>
          <path d="M68 42 Q72 55 70 68" :fill="t.hair2" opacity="0.7"/>
          <!-- Circuit on hair -->
          <path d="M38 28 L40 26 L44 26 L44 24" :stroke="palette.neon1" stroke-width="0.5" fill="none" opacity="0.7"/>
        </template>

        <!-- ── FACE ── -->
        <ellipse cx="50" cy="42" rx="18" ry="20" :fill="'url(#'+uid+'-sk'+')'"/>

        <!-- Cinematic neon light washes over face -->
        <ellipse cx="50" cy="42" rx="18" ry="20" :fill="'url(#'+uid+'-nl'+')'"/>
        <ellipse cx="50" cy="42" rx="18" ry="20" :fill="'url(#'+uid+'-nr'+')'"/>

        <!-- Jawline shadow -->
        <ellipse cx="50" cy="57" rx="12" ry="4" fill="#000" opacity="0.25"/>

        <!-- Ears -->
        <ellipse cx="32" cy="43" rx="3.5" ry="4.5" :fill="t.skin" opacity="0.9"/>
        <ellipse cx="68" cy="43" rx="3.5" ry="4.5" :fill="t.skin" opacity="0.9"/>
        <ellipse cx="32" cy="43" rx="2" ry="3" :fill="t.skinHi" opacity="0.4"/>
        <ellipse cx="68" cy="43" rx="2" ry="3" :fill="t.skinHi" opacity="0.4"/>
        <!-- Ear neon stud -->
        <circle cx="32" cy="46" r="1.2" :fill="palette.neon2" :filter="'url(#'+uid+'-eg'+')'"/>
        <circle cx="68" cy="46" r="1.2" :fill="palette.neon1" :filter="'url(#'+uid+'-eg'+')'"/>

        <!-- ── EYES / VISOR ── -->
        <!-- Type 0: Cyber visor (key cyberpunk element) -->
        <template v-if="t.eyeType===0">
          <rect x="34" y="38.5" width="32" height="7" rx="2.5" fill="#050510" opacity="0.95"/>
          <rect x="34" y="38.5" width="32" height="7" rx="2.5" :stroke="palette.neon1" stroke-width="0.8" fill="none" :filter="'url(#'+uid+'-eg'+')'"/>
          <!-- Visor lens gradient scan line -->
          <rect x="35.5" y="40" width="29" height="4" rx="1.5" :fill="palette.neon1" opacity="0.18"/>
          <rect x="35.5" y="40.5" width="14" height="2.5" rx="1" :fill="palette.neon1" opacity="0.55"/>
          <rect x="51" y="40.5" width="13" height="2.5" rx="1" :fill="palette.neon2" opacity="0.45"/>
          <!-- Visor side glow -->
          <rect x="34" y="38.5" width="32" height="7" rx="2.5" :fill="palette.neon1" opacity="0.06"/>
          <!-- Scan line animation via filter -->
          <line x1="34" y1="42" x2="66" y2="42" :stroke="palette.neon1" stroke-width="0.4" opacity="0.4"/>
        </template>
        <!-- Type 1: Glowing alien eyes -->
        <template v-else-if="t.eyeType===1">
          <ellipse cx="43" cy="42" rx="5.5" ry="4" fill="#030310"/>
          <ellipse cx="43" cy="42" rx="4" ry="2.8" :fill="palette.neon1" opacity="0.9" :filter="'url(#'+uid+'-eg'+')'"/>
          <ellipse cx="43" cy="42" rx="2" ry="1.5" fill="#fff" opacity="0.7"/>
          <ellipse cx="57" cy="42" rx="5.5" ry="4" fill="#030310"/>
          <ellipse cx="57" cy="42" rx="4" ry="2.8" :fill="palette.neon2" opacity="0.9" :filter="'url(#'+uid+'-eg'+')'"/>
          <ellipse cx="57" cy="42" rx="2" ry="1.5" fill="#fff" opacity="0.7"/>
        </template>
        <!-- Type 2: Vertical slit cyber eyes -->
        <template v-else-if="t.eyeType===2">
          <ellipse cx="43" cy="42" rx="5" ry="4.5" fill="white" opacity="0.92"/>
          <ellipse cx="43" cy="42" rx="2" ry="4" :fill="palette.neon1" :filter="'url(#'+uid+'-eg'+')'"/>
          <ellipse cx="43" cy="42" rx="1" ry="2.5" fill="#000"/>
          <ellipse cx="57" cy="42" rx="5" ry="4.5" fill="white" opacity="0.92"/>
          <ellipse cx="57" cy="42" rx="2" ry="4" :fill="palette.neon2" :filter="'url(#'+uid+'-eg'+')'"/>
          <ellipse cx="57" cy="42" rx="1" ry="2.5" fill="#000"/>
        </template>
        <!-- Type 3: RGB multi-color eyes -->
        <template v-else-if="t.eyeType===3">
          <circle cx="43" cy="42" r="5" fill="#0a0a1e"/>
          <circle cx="43" cy="42" r="3.5" :fill="palette.neon1" opacity="0.8" :filter="'url(#'+uid+'-eg'+')'"/>
          <circle cx="43" cy="42" r="1.8" fill="#0a0a1e"/>
          <circle cx="44.2" cy="40.8" r="1" fill="white" opacity="0.7"/>
          <circle cx="57" cy="42" r="5" fill="#0a0a1e"/>
          <circle cx="57" cy="42" r="3.5" :fill="palette.neon2" opacity="0.8" :filter="'url(#'+uid+'-eg'+')'"/>
          <circle cx="57" cy="42" r="1.8" fill="#0a0a1e"/>
          <circle cx="58.2" cy="40.8" r="1" fill="white" opacity="0.7"/>
        </template>
        <!-- Type 4: Half-visor + one glowing eye -->
        <template v-else>
          <rect x="34" y="38.5" width="14" height="7" rx="2" fill="#050510" opacity="0.92"/>
          <rect x="34" y="38.5" width="14" height="7" rx="2" :stroke="palette.neon1" stroke-width="0.7" fill="none"/>
          <rect x="35.5" y="40" width="11" height="3.5" rx="1" :fill="palette.neon1" opacity="0.4"/>
          <circle cx="57" cy="42" r="5" fill="#0a0a1e"/>
          <circle cx="57" cy="42" r="3.5" :fill="palette.neon2" opacity="0.85" :filter="'url(#'+uid+'-eg'+')'"/>
          <circle cx="57" cy="42" r="1.5" fill="#000"/>
          <circle cx="58.2" cy="40.8" r="0.9" fill="white" opacity="0.7"/>
        </template>

        <!-- Eyebrows -->
        <path :d="'M38 '+(t.eyeType===0?'37.5':'36.5')+' Q43 34.5 47.5 '+(t.eyeType===0?'37':'36')" :stroke="t.hair1" stroke-width="1.3" fill="none" stroke-linecap="round"/>
        <path :d="'M52.5 '+(t.eyeType===0?'37.5':'36.5')+' Q57 34.5 62 '+(t.eyeType===0?'37':'36')" :stroke="t.hair1" stroke-width="1.3" fill="none" stroke-linecap="round"/>

        <!-- Nose -->
        <path d="M49 48 Q50 51 51 48" :stroke="t.skinShadow" stroke-width="0.9" fill="none" opacity="0.55"/>
        <circle cx="47.5" cy="49.5" r="1.2" :fill="t.skinShadow" opacity="0.2"/>
        <circle cx="52.5" cy="49.5" r="1.2" :fill="t.skinShadow" opacity="0.2"/>

        <!-- Mouth -->
        <path v-if="t.mouthType===0" d="M43 54 Q50 58 57 54" :stroke="palette.lip" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <path v-else-if="t.mouthType===1" d="M44 55 Q50 57 56 55" :stroke="palette.lip" stroke-width="1.3" fill="none" stroke-linecap="round"/>
        <path v-else d="M44 53 Q50 56 56 53 Q50 58 44 53Z" :fill="palette.lip" opacity="0.85"/>

        <!-- Lip shine -->
        <path d="M47 53.5 Q50 52.5 53 53.5" stroke="rgba(255,255,255,0.4)" stroke-width="0.6" fill="none" stroke-linecap="round"/>

        <!-- Face circuit tattoo marks (cyberpunk) -->
        <template v-if="t.circuitSide === 0">
          <!-- Right cheek circuit -->
          <path d="M60 46 L63 46 L63 50 L65 50" :stroke="palette.neon1" stroke-width="0.5" fill="none" opacity="0.75"/>
          <circle cx="65" cy="50" r="1" :fill="palette.neon1" opacity="0.8" :filter="'url(#'+uid+'-eg'+')'"/>
          <path d="M63 46 L63 44 L65 44" :stroke="palette.neon1" stroke-width="0.4" fill="none" opacity="0.5"/>
        </template>
        <template v-else>
          <!-- Left cheek circuit -->
          <path d="M40 46 L37 46 L37 50 L35 50" :stroke="palette.neon2" stroke-width="0.5" fill="none" opacity="0.75"/>
          <circle cx="35" cy="50" r="1" :fill="palette.neon2" opacity="0.8" :filter="'url(#'+uid+'-eg'+')'"/>
          <path d="M37 46 L37 44 L35 44" :stroke="palette.neon2" stroke-width="0.4" fill="none" opacity="0.5"/>
        </template>

        <!-- Forehead scan mark -->
        <path d="M45 30 L50 28 L55 30" :stroke="palette.neon1" stroke-width="0.5" fill="none" opacity="0.45"/>
        <circle cx="50" cy="28" r="1.2" :fill="palette.neon1" opacity="0.6" :filter="'url(#'+uid+'-eg'+')'"/>

        <!-- Holographic scanlines overlay -->
        <line x1="32" y1="37" x2="68" y2="37" :stroke="palette.neon1" stroke-width="0.25" opacity="0.18"/>
        <line x1="32" y1="44" x2="68" y2="44" :stroke="palette.neon1" stroke-width="0.25" opacity="0.12"/>
        <line x1="32" y1="51" x2="68" y2="51" :stroke="palette.neon2" stroke-width="0.25" opacity="0.10"/>
        <line x1="32" y1="58" x2="68" y2="58" :stroke="palette.neon2" stroke-width="0.2" opacity="0.08"/>

        <!-- Ground shadow glow -->
        <ellipse cx="50" cy="100" rx="22" ry="5" :fill="palette.ring" opacity="0.2"/>
      </svg>

      <!-- Holo scan line animation -->
      <div class="holo-scan" :style="{ background: 'linear-gradient(90deg,transparent,' + palette.neon1 + '80,transparent)' }"></div>

      <!-- RGB reflection edge -->
      <div class="rgb-edge" :style="{ boxShadow: 'inset 0 0 12px ' + palette.neon1 + '55, inset 0 0 6px ' + palette.neon2 + '33' }"></div>
    </div>

    <!-- NFT badge -->
    <div class="nft-badge" :style="{ background: palette.neon1, boxShadow: '0 0 10px ' + palette.neon1 }">NFT</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: { type: String, default: 'PLAYER' },
  size: { type: Number, default: 52 }
})

const uid = computed(() => 'na' + Math.abs(hashStr(props.username)).toString(36))

function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) { h = Math.imul(31, h) + s.charCodeAt(i) | 0 }
  return h
}
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 43758.5453123
  return x - Math.floor(x)
}
function pickSeed(arr, seed) { return arr[Math.abs(seed) % arr.length] }

const palette = computed(() => {
  const h = hashStr(props.username.toUpperCase() + 'p')
  const palettes = [
    { neon1: '#00e5ff', neon2: '#a855f7', ring: '#00e5ff66', mid: '#00e5ff33', inner: '#00e5ff22', lip: '#f472b6' },
    { neon1: '#a855f7', neon2: '#f472b6', ring: '#a855f766', mid: '#a855f733', inner: '#a855f722', lip: '#fb7185' },
    { neon1: '#facc15', neon2: '#00e5ff', ring: '#facc1566', mid: '#facc1533', inner: '#facc1522', lip: '#f87171' },
    { neon1: '#4ade80', neon2: '#00e5ff', ring: '#4ade8066', mid: '#4ade8033', inner: '#4ade8022', lip: '#fb923c' },
    { neon1: '#f87171', neon2: '#facc15', ring: '#f8717166', mid: '#f8717133', inner: '#f8717122', lip: '#f472b6' },
    { neon1: '#60a5fa', neon2: '#a855f7', ring: '#60a5fa66', mid: '#60a5fa33', inner: '#60a5fa22', lip: '#fb7185' },
    { neon1: '#fb923c', neon2: '#facc15', ring: '#fb923c66', mid: '#fb923c33', inner: '#fb923c22', lip: '#f87171' },
    { neon1: '#f472b6', neon2: '#60a5fa', ring: '#f472b666', mid: '#f472b633', inner: '#f472b622', lip: '#fb923c' },
  ]
  return palettes[Math.abs(h) % palettes.length]
})

const t = computed(() => {
  const s = props.username.toUpperCase()
  const h1 = hashStr(s)
  const h2 = hashStr(s + '2')
  const h3 = hashStr(s + '3')
  const h4 = hashStr(s + '4')
  const h5 = hashStr(s + '5')
  const h6 = hashStr(s + '6')

  const skins = [
    { skin: '#d4956a', skinHi: '#f5c48a', skinShadow: '#9a6040' },
    { skin: '#e8b89a', skinHi: '#ffdcca', skinShadow: '#b07850' },
    { skin: '#7a5c4a', skinHi: '#a07860', skinShadow: '#4a3020' },
    { skin: '#c0a898', skinHi: '#e8d0c0', skinShadow: '#907060' },
    { skin: '#5a8090', skinHi: '#8ab8c8', skinShadow: '#304858' },  // cyber blue-toned
    { skin: '#8060b0', skinHi: '#b090e0', skinShadow: '#503080' },  // purple cyber
  ]
  const sk = skins[Math.abs(h1) % skins.length]

  const hairs = [
    { hair1: '#facc15', hair2: '#d97706' },
    { hair1: '#a855f7', hair2: '#6d28d9' },
    { hair1: '#00e5ff', hair2: '#0891b2' },
    { hair1: '#f87171', hair2: '#dc2626' },
    { hair1: '#4ade80', hair2: '#15803d' },
    { hair1: '#f8fafc', hair2: '#94a3b8' },
    { hair1: '#1e1e1e', hair2: '#374151' },
    { hair1: '#f472b6', hair2: '#db2777' },
    { hair1: '#818cf8', hair2: '#4338ca' },
  ]
  const hr = hairs[Math.abs(h2) % hairs.length]

  const suits = [
    ['#0f1728', '#0a0e1a'], ['#1a0d2e', '#100820'],
    ['#0d1a0d', '#080d08'], ['#1a0000', '#0d0000'],
    ['#0d1a2e', '#060d1a'], ['#1a1a1a', '#0a0a0a'],
    ['#2d1b00', '#1a1000'], ['#001a2e', '#000d1a'],
  ]
  const su = suits[Math.abs(h3) % suits.length]

  return {
    ...sk,
    hair1: hr.hair1, hair2: hr.hair2,
    suit1: su[0], suit2: su[1],
    hairType: Math.abs(h4) % 5,
    eyeType: Math.abs(h5) % 5,
    mouthType: Math.abs(h1) % 3,
    circuitSide: Math.abs(h6) % 2,
  }
})

const bg = computed(() => {
  const h = hashStr(props.username.toUpperCase())
  const bgs = [
    'radial-gradient(circle at 30% 30%, #0f1a3d, #050810)',
    'radial-gradient(circle at 70% 30%, #1a0d2e, #06030f)',
    'radial-gradient(circle at 30% 60%, #0d1a0d, #020602)',
    'radial-gradient(circle at 50% 20%, #1a1428, #050310)',
    'radial-gradient(circle at 40% 40%, #0a1a2e, #020508)',
    'radial-gradient(circle at 60% 50%, #1a0a14, #060204)',
  ]
  return bgs[Math.abs(h) % bgs.length]
})

const orbs = computed(() => {
  const h = Math.abs(hashStr(props.username.toUpperCase() + 'orb'))
  const colors = [palette.value.neon1, palette.value.neon2, '#ffffff88']
  const count = 3 + (h % 3)
  return Array.from({ length: count }, (_, i) => ({
    color: colors[i % colors.length],
    r: (props.size / 2) + 5 + (i * 5),
    s: 2 + (i % 2),
    d: 3.5 + ((h + i * 7) % 4),
    dl: -((h + i * 3) % 4),
    rev: i % 2 === 0,
  }))
})
</script>

<style scoped>
.nft-root {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nft-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: nft-breathe 3.5s ease-in-out infinite;
  z-index: 2;
}

.portrait-svg {
  position: relative;
  z-index: 2;
  animation: nft-float 3s ease-in-out infinite;
}

.holo-scan {
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  z-index: 3;
  opacity: 0.7;
  animation: holo-scan 2.6s linear infinite;
}

.rgb-edge {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  z-index: 4;
  pointer-events: none;
}

/* Orbit particles */
.orbit-wrap {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.orb {
  position: absolute;
  width: var(--s);
  height: var(--s);
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 6px var(--c), 0 0 12px var(--c);
  top: 50%;
  left: 50%;
  margin: calc(var(--s) / -2);
  animation: orbit linear infinite;
  transform-origin: calc(var(--r) * -1) 0;
}

@keyframes orbit {
  from { transform: rotate(0deg) translateX(var(--r)); }
  to   { transform: rotate(360deg) translateX(var(--r)); }
}

/* Aura rings */
.aura-r {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid;
  pointer-events: none;
  animation: aura-pulse 2.5s ease-in-out infinite;
}
.aura-r1 { inset: -4px; animation-delay: 0s; }
.aura-r2 { inset: -9px; animation-delay: 0.3s; }
.aura-r3 { inset: -14px; animation-delay: 0.6s; }

@keyframes aura-pulse {
  0%,100% { opacity: 0.7; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.02); }
}

@keyframes nft-breathe {
  0%,100% { transform: scale(1); }
  50%     { transform: scale(1.025); }
}

@keyframes nft-float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-2px); }
}

@keyframes holo-scan {
  0%   { top: 5%; opacity: 0; }
  10%  { opacity: 0.7; }
  90%  { opacity: 0.7; }
  100% { top: 95%; opacity: 0; }
}

/* NFT badge */
.nft-badge {
  position: absolute;
  bottom: -3px;
  right: -3px;
  font-size: 7px;
  font-weight: 900;
  color: #000;
  padding: 2px 5px;
  border-radius: 999px;
  letter-spacing: 0.05em;
  z-index: 10;
}
</style>
