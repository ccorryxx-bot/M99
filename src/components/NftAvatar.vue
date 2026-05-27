<template>
  <div class="nft-root" :style="{ width: size + 'px', height: size + 'px' }">

    <!-- Aura rings -->
    <div class="aura-r aura-r3" :style="{ borderColor: pal.ring, boxShadow: '0 0 10px ' + pal.ring }"></div>
    <div class="aura-r aura-r2" :style="{ borderColor: pal.mid }"></div>

    <!-- Orbit particles -->
    <div class="orbit-wrap">
      <div v-for="(p,i) in orbs" :key="i" class="orb"
        :style="{ '--c': p.color, '--r': p.r+'px', '--s': p.s+'px', animationDuration: p.d+'s', animationDelay: p.dl+'s', animationDirection: p.rev?'reverse':'normal' }"/>
    </div>

    <!-- Main portrait circle -->
    <div class="nft-circle" :style="{ background: bg }">
      <svg :width="size" :height="size" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
        <defs>
          <!-- Dark cinematic background -->
          <radialGradient :id="u+'-bg'" cx="50%" cy="40%" r="70%">
            <stop offset="0%" :stop-color="t.bgMid"/>
            <stop offset="100%" stop-color="#020206"/>
          </radialGradient>

          <!-- Skin - realistic gradient with cinematic lighting -->
          <radialGradient :id="u+'-sk'" cx="38%" cy="32%" r="68%">
            <stop offset="0%" :stop-color="t.skinHi"/>
            <stop offset="40%" :stop-color="t.skin"/>
            <stop offset="80%" :stop-color="t.skinMid"/>
            <stop offset="100%" :stop-color="t.skinShadow"/>
          </radialGradient>

          <!-- Rainbow/neon hair gradient — multi stop -->
          <linearGradient :id="u+'-hr'" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%"   :stop-color="t.h1"/>
            <stop offset="28%"  :stop-color="t.h2"/>
            <stop offset="55%"  :stop-color="t.h3"/>
            <stop offset="80%"  :stop-color="t.h4"/>
            <stop offset="100%" :stop-color="t.h1"/>
          </linearGradient>

          <!-- Hair shine -->
          <linearGradient :id="u+'-hs'" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.45)"/>
            <stop offset="50%" stop-color="rgba(255,255,255,0)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0.1)"/>
          </linearGradient>

          <!-- Left neon light on face -->
          <radialGradient :id="u+'-nl'" cx="-10%" cy="40%" r="75%">
            <stop offset="0%" :stop-color="pal.left" stop-opacity="0.55"/>
            <stop offset="100%" :stop-color="pal.left" stop-opacity="0"/>
          </radialGradient>

          <!-- Right neon light on face -->
          <radialGradient :id="u+'-nr'" cx="110%" cy="45%" r="75%">
            <stop offset="0%" :stop-color="pal.right" stop-opacity="0.45"/>
            <stop offset="100%" :stop-color="pal.right" stop-opacity="0"/>
          </radialGradient>

          <!-- Bottom light (uplight) -->
          <radialGradient :id="u+'-bu'" cx="50%" cy="110%" r="60%">
            <stop offset="0%" :stop-color="pal.up" stop-opacity="0.3"/>
            <stop offset="100%" :stop-color="pal.up" stop-opacity="0"/>
          </radialGradient>

          <!-- Eye makeup gradient (eyeshadow) -->
          <linearGradient :id="u+'-es'" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="t.shadow1"/>
            <stop offset="100%" :stop-color="t.shadow2"/>
          </linearGradient>

          <!-- Lip gradient -->
          <linearGradient :id="u+'-lp'" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="t.lipHi"/>
            <stop offset="100%" :stop-color="t.lip"/>
          </linearGradient>

          <!-- Eye iris gradient -->
          <radialGradient :id="u+'-ir'" cx="38%" cy="35%" r="65%">
            <stop offset="0%" :stop-color="t.irisHi"/>
            <stop offset="100%" :stop-color="t.iris"/>
          </radialGradient>

          <!-- Jacket/body gradient -->
          <linearGradient :id="u+'-jk'" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="t.jacket1"/>
            <stop offset="50%" :stop-color="t.jacket2"/>
            <stop offset="100%" :stop-color="t.jacket3"/>
          </linearGradient>

          <!-- Jacket gloss -->
          <linearGradient :id="u+'-jg'" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </linearGradient>

          <!-- Glow filter -->
          <filter :id="u+'-gw'" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <!-- Soft glow -->
          <filter :id="u+'-sg'" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <!-- Subtle glow -->
          <filter :id="u+'-sub'" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Dark BG fill -->
        <rect width="120" height="120" :fill="'url(#'+u+'-bg'+')'"/>

        <!-- ── BODY / JACKET ── cinematic crop at bottom -->
        <ellipse cx="60" cy="130" rx="42" ry="28" :fill="'url(#'+u+'-jk'+')'"/>
        <!-- Jacket gloss -->
        <ellipse cx="60" cy="130" rx="42" ry="28" :fill="'url(#'+u+'-jg'+')'"/>
        <!-- Jacket collar/zipper line -->
        <line x1="60" y1="97" x2="60" y2="120" :stroke="t.jacket1" stroke-width="1.5" opacity="0.8"/>
        <path d="M54 100 L60 98 L66 100" :stroke="pal.left" stroke-width="0.7" fill="none" opacity="0.8"/>
        <!-- Jacket neon edge highlights -->
        <path d="M18 130 Q30 105 44 100" :stroke="pal.left" stroke-width="0.8" fill="none" opacity="0.6" :filter="'url(#'+u+'-sub'+')'"/>
        <path d="M102 130 Q90 105 76 100" :stroke="pal.right" stroke-width="0.8" fill="none" opacity="0.6" :filter="'url(#'+u+'-sub'+')'"/>

        <!-- ── NECK ── -->
        <path d="M50 88 Q50 100 52 104 L68 104 Q70 100 70 88" :fill="'url(#'+u+'-sk'+')'"/>
        <!-- Neck shadow -->
        <path d="M55 90 Q60 96 65 90" fill="none" :stroke="t.skinShadow" stroke-width="2" opacity="0.3"/>

        <!-- ── HAIR BACK LAYER ── (behind face) -->
        <template v-if="t.hairStyle===0">
          <!-- Flowing bob — side volumes behind ears -->
          <path d="M22 55 Q18 72 22 92 Q28 108 38 112 Q30 88 32 68 Q30 55 38 40Z" :fill="'url(#'+u+'-hr'+')'"/>
          <path d="M98 55 Q102 72 98 92 Q92 108 82 112 Q90 88 88 68 Q90 55 82 40Z" :fill="'url(#'+u+'-hr'+')'"/>
        </template>
        <template v-else-if="t.hairStyle===1">
          <!-- Long straight — side curtains -->
          <path d="M20 52 Q15 80 20 115 Q28 120 36 115 Q28 85 30 60 Q28 50 36 38Z" :fill="'url(#'+u+'-hr'+')'"/>
          <path d="M100 52 Q105 80 100 115 Q92 120 84 115 Q92 85 90 60 Q92 50 84 38Z" :fill="'url(#'+u+'-hr'+')'"/>
        </template>
        <template v-else-if="t.hairStyle===2">
          <!-- Voluminous curly — big side puffs -->
          <path d="M18 50 Q12 65 16 82 Q20 98 30 105 Q24 82 26 62 Q24 48 32 38Z" :fill="'url(#'+u+'-hr'+')'"/>
          <path d="M102 50 Q108 65 104 82 Q100 98 90 105 Q96 82 94 62 Q96 48 88 38Z" :fill="'url(#'+u+'-hr'+')'"/>
        </template>
        <template v-else-if="t.hairStyle===3">
          <!-- Sleek back — minimal sides -->
          <path d="M26 52 Q24 68 26 84 Q30 98 38 104 Q34 80 34 62Z" :fill="'url(#'+u+'-hr'+')'"/>
          <path d="M94 52 Q96 68 94 84 Q90 98 82 104 Q86 80 86 62Z" :fill="'url(#'+u+'-hr'+')'"/>
        </template>
        <template v-else>
          <!-- Wild spiky — asymmetric -->
          <path d="M16 52 Q12 68 16 88 Q22 106 34 110 Q26 84 28 62Z" :fill="'url(#'+u+'-hr'+')'"/>
          <path d="M104 52 Q108 68 104 88 Q98 106 86 110 Q94 84 92 62Z" :fill="'url(#'+u+'-hr'+')'"/>
        </template>

        <!-- ── FACE ── -->
        <ellipse cx="60" cy="62" rx="30" ry="34" :fill="'url(#'+u+'-sk'+')'"/>

        <!-- Cinematic neon color washes over face -->
        <ellipse cx="60" cy="62" rx="30" ry="34" :fill="'url(#'+u+'-nl'+')'"/>
        <ellipse cx="60" cy="62" rx="30" ry="34" :fill="'url(#'+u+'-nr'+')'"/>
        <ellipse cx="60" cy="62" rx="30" ry="34" :fill="'url(#'+u+'-bu'+')'"/>

        <!-- Face shadow sides (cheek contour) -->
        <path d="M30 58 Q28 72 32 84" :stroke="t.skinShadow" stroke-width="4" fill="none" opacity="0.18" stroke-linecap="round"/>
        <path d="M90 58 Q92 72 88 84" :stroke="t.skinShadow" stroke-width="4" fill="none" opacity="0.18" stroke-linecap="round"/>

        <!-- Jaw highlight -->
        <path d="M40 88 Q60 96 80 88" stroke="rgba(255,255,255,0.12)" stroke-width="3" fill="none" stroke-linecap="round"/>

        <!-- ── EARS ── -->
        <ellipse cx="30" cy="64" rx="4.5" ry="5.5" :fill="t.skin"/>
        <ellipse cx="90" cy="64" rx="4.5" ry="5.5" :fill="t.skin"/>
        <ellipse cx="30" cy="64" rx="2.5" ry="3.5" :fill="t.skinMid" opacity="0.5"/>
        <ellipse cx="90" cy="64" rx="2.5" ry="3.5" :fill="t.skinMid" opacity="0.5"/>
        <!-- Earring drop -->
        <circle cx="30" cy="71" r="2" :fill="pal.left" :filter="'url(#'+u+'-gw')"/>
        <circle cx="90" cy="71" r="2" :fill="pal.right" :filter="'url(#'+u+'-gw')"/>
        <path d="M30 69 L30 71" :stroke="pal.left" stroke-width="0.8"/>
        <path d="M90 69 L90 71" :stroke="pal.right" stroke-width="0.8"/>

        <!-- ── HAIR TOP/FRONT ── (above face) -->
        <!-- Top hair mass — covers forehead -->
        <template v-if="t.hairStyle===0">
          <!-- Bob: smooth rounded top -->
          <path d="M30 56 Q30 20 60 18 Q90 20 90 56 Q82 32 60 30 Q38 32 30 56Z" :fill="'url(#'+u+'-hr'+')'"/>
          <path d="M30 56 Q30 20 60 18 Q90 20 90 56 Q82 32 60 30 Q38 32 30 56Z" :fill="'url(#'+u+'-hs')'" opacity="0.5"/>
        </template>
        <template v-else-if="t.hairStyle===1">
          <!-- Long straight: flat top, center part -->
          <path d="M30 56 Q28 24 60 18 Q92 24 90 56 Q84 30 60 28 Q36 30 30 56Z" :fill="'url(#'+u+'-hr'+')'"/>
          <!-- Center part line highlight -->
          <line x1="60" y1="18" x2="60" y2="36" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
          <path d="M30 56 Q28 24 60 18 Q92 24 90 56" :fill="'url(#'+u+'-hs')'" opacity="0.4"/>
        </template>
        <template v-else-if="t.hairStyle===2">
          <!-- Curly voluminous -->
          <path d="M28 56 Q24 20 60 16 Q96 20 92 56 Q86 28 60 26 Q34 28 28 56Z" :fill="'url(#'+u+'-hr'+')'"/>
          <!-- Curly texture bumps -->
          <path d="M32 40 Q38 34 44 40 Q50 34 56 40 Q62 34 68 40 Q74 34 80 40 Q86 34 88 40" :stroke="t.h2" stroke-width="1.8" fill="none" opacity="0.45"/>
          <path d="M28 56 Q24 20 60 16 Q96 20 92 56" :fill="'url(#'+u+'-hs')'" opacity="0.35"/>
        </template>
        <template v-else-if="t.hairStyle===3">
          <!-- Sleek back — tight skullcap look -->
          <path d="M32 52 Q30 22 60 18 Q90 22 88 52 Q82 30 60 28 Q38 30 32 52Z" :fill="'url(#'+u+'-hr'+')'"/>
          <!-- Sleek shine streak -->
          <path d="M38 28 Q55 20 72 26" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
          <path d="M32 52 Q30 22 60 18 Q90 22 88 52" :fill="'url(#'+u+'-hs')'" opacity="0.55"/>
        </template>
        <template v-else>
          <!-- Wild spiky punk -->
          <path d="M30 54 Q28 24 60 18 Q92 24 90 54 Q84 30 60 28 Q36 30 30 54Z" :fill="'url(#'+u+'-hr'+')'"/>
          <polygon points="36,44 32,22 42,38" :fill="t.h1"/>
          <polygon points="52,36 50,14 58,34" :fill="t.h2"/>
          <polygon points="68,36 70,14 62,34" :fill="t.h3"/>
          <polygon points="84,44 88,22 78,38" :fill="t.h4"/>
          <!-- Spike glow tips -->
          <circle cx="32" cy="22" r="2.5" :fill="t.h1" :filter="'url(#'+u+'-sg')'" opacity="0.9"/>
          <circle cx="50" cy="14" r="2.5" :fill="t.h2" :filter="'url(#'+u+'-sg')'" opacity="0.9"/>
          <circle cx="70" cy="14" r="2.5" :fill="t.h3" :filter="'url(#'+u+'-sg')'" opacity="0.9"/>
          <circle cx="88" cy="22" r="2.5" :fill="t.h4" :filter="'url(#'+u+'-sg')'" opacity="0.9"/>
        </template>

        <!-- ── EYEBROWS ── (bold, defined) -->
        <path :d="'M38 '+t.browY+' Q44 '+(t.browY-5)+' 50 '+t.browY" :stroke="t.browColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path :d="'M70 '+t.browY+' Q76 '+(t.browY-5)+' 82 '+t.browY" :stroke="t.browColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>

        <!-- ── EYESHADOW ── (dramatic, colorful) -->
        <!-- Left eyeshadow -->
        <ellipse cx="44" cy="58" rx="10" ry="6" :fill="'url(#'+u+'-es')'" opacity="0.75"/>
        <!-- Right eyeshadow -->
        <ellipse cx="76" cy="58" rx="10" ry="6" :fill="'url(#'+u+'-es')'" opacity="0.75"/>
        <!-- Inner corner highlight -->
        <circle cx="37" cy="57" r="1.5" :fill="pal.left" opacity="0.6" :filter="'url(#'+u+'-sub'+')'"/>
        <circle cx="83" cy="57" r="1.5" :fill="pal.right" opacity="0.6" :filter="'url(#'+u+'-sub'+')'"/>

        <!-- ── EYES ── (large, expressive) -->
        <!-- Left eye white -->
        <ellipse cx="44" cy="60" rx="9" ry="6.5" fill="rgba(255,252,248,0.96)"/>
        <!-- Left iris -->
        <circle cx="44" cy="60" r="5" :fill="'url(#'+u+'-ir')'" :filter="'url(#'+u+'-sub'+')'"/>
        <!-- Left pupil -->
        <circle cx="44" cy="60" r="2.5" fill="#050508"/>
        <!-- Left eye highlight -->
        <circle cx="41.5" cy="57.8" r="1.5" fill="white" opacity="0.88"/>
        <circle cx="46.5" cy="62" r="0.7" fill="white" opacity="0.5"/>
        <!-- Left eyeliner top -->
        <path d="M35.5 57 Q44 54.5 52.5 57" :stroke="t.liner" stroke-width="1.6" fill="none" stroke-linecap="round"/>
        <!-- Left lashes -->
        <path d="M36 57 L34 54 M38 55.5 L36.5 52.5 M41 54.8 L40 51.5 M44 54.5 L44 51 M47 54.8 L48.5 51.8 M50 55.8 L52 53" :stroke="t.liner" stroke-width="0.9" stroke-linecap="round"/>
        <!-- Left lower lash line -->
        <path d="M36 63 Q44 65.5 52 63" :stroke="t.liner" stroke-width="0.7" fill="none" opacity="0.6"/>

        <!-- Right eye white -->
        <ellipse cx="76" cy="60" rx="9" ry="6.5" fill="rgba(255,252,248,0.96)"/>
        <!-- Right iris -->
        <circle cx="76" cy="60" r="5" :fill="'url(#'+u+'-ir')'" :filter="'url(#'+u+'-sub'+')'"/>
        <!-- Right pupil -->
        <circle cx="76" cy="60" r="2.5" fill="#050508"/>
        <!-- Right eye highlight -->
        <circle cx="73.5" cy="57.8" r="1.5" fill="white" opacity="0.88"/>
        <circle cx="78.5" cy="62" r="0.7" fill="white" opacity="0.5"/>
        <!-- Right eyeliner top -->
        <path d="M67.5 57 Q76 54.5 84.5 57" :stroke="t.liner" stroke-width="1.6" fill="none" stroke-linecap="round"/>
        <!-- Right lashes -->
        <path d="M68 57 L66 54 M70 55.5 L68.5 52.5 M73 54.8 L72 51.5 M76 54.5 L76 51 M79 54.8 L80.5 51.8 M82 55.8 L84 53" :stroke="t.liner" stroke-width="0.9" stroke-linecap="round"/>
        <!-- Right lower lash line -->
        <path d="M68 63 Q76 65.5 84 63" :stroke="t.liner" stroke-width="0.7" fill="none" opacity="0.6"/>

        <!-- ── NOSE ── (subtle, feminine) -->
        <path d="M57 72 Q55 78 57 80 Q60 82 63 80 Q65 78 63 72" :stroke="t.skinShadow" stroke-width="1.2" fill="none" opacity="0.4" stroke-linecap="round"/>
        <path d="M57 80 Q60 82 63 80" :stroke="t.skinShadow" stroke-width="1.5" fill="none" opacity="0.5"/>
        <!-- Nose highlight -->
        <circle cx="60" cy="76" r="1.2" fill="rgba(255,255,255,0.2)"/>

        <!-- ── LIPS ── (bold, glossy, colored) -->
        <!-- Lip shadow base -->
        <path d="M44 88 Q52 85 60 86 Q68 85 76 88 Q68 96 60 97 Q52 96 44 88Z" :fill="t.lip" opacity="0.9"/>
        <!-- Upper lip -->
        <path d="M44 88 Q48 84 53 86 Q57 83 60 86 Q63 83 67 86 Q72 84 76 88 Q68 85 60 86 Q52 85 44 88Z" :fill="'url(#'+u+'-lp')"/>
        <!-- Lower lip -->
        <path d="M44 88 Q52 96 60 97 Q68 96 76 88 Q68 93 60 94 Q52 93 44 88Z" :fill="t.lip"/>
        <!-- Cupid bow highlight -->
        <path d="M50 86 Q55 83.5 60 85.5 Q65 83.5 70 86" stroke="rgba(255,255,255,0.25)" stroke-width="0.8" fill="none" stroke-linecap="round"/>
        <!-- Lip gloss highlight -->
        <path d="M50 90 Q60 88 70 90" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" fill="none" stroke-linecap="round"/>

        <!-- ── FACE BLUSH / CONTOUR ── -->
        <!-- Cheek blush left -->
        <ellipse cx="36" cy="70" rx="8" ry="5" :fill="t.blush" opacity="0.28" transform="rotate(-15 36 70)"/>
        <!-- Cheek blush right -->
        <ellipse cx="84" cy="70" rx="8" ry="5" :fill="t.blush" opacity="0.28" transform="rotate(15 84 70)"/>

        <!-- ── NEON LIGHTING GLOWS (atmospheric) ── -->
        <!-- Left neon haze -->
        <ellipse cx="10" cy="60" rx="25" ry="35" :fill="pal.left" opacity="0.12" :filter="'url(#'+u+'-sg'+')'"/>
        <!-- Right neon haze -->
        <ellipse cx="110" cy="58" rx="25" ry="35" :fill="pal.right" opacity="0.10" :filter="'url(#'+u+'-sg'+')'"/>

        <!-- Hologram scan lines overlay -->
        <line x1="0" y1="45" x2="120" y2="45" :stroke="pal.left" stroke-width="0.3" opacity="0.12"/>
        <line x1="0" y1="60" x2="120" y2="60" :stroke="pal.right" stroke-width="0.3" opacity="0.08"/>
        <line x1="0" y1="75" x2="120" y2="75" :stroke="pal.left" stroke-width="0.2" opacity="0.06"/>

        <!-- NFT corner mark -->
        <text x="5" y="114" font-size="7" font-weight="900" :fill="pal.left" opacity="0.7" font-family="monospace">NFT</text>
        <!-- Hash ID -->
        <text x="5" y="8" font-size="5" :fill="pal.right" opacity="0.5" font-family="monospace">#{{ hashId }}</text>
      </svg>

      <!-- Holo scan animation -->
      <div class="holo-scan" :style="{ background: 'linear-gradient(90deg,transparent,'+pal.left+'70,'+pal.right+'50,transparent)' }"/>

      <!-- RGB border glow -->
      <div class="rgb-rim" :style="{ boxShadow: 'inset 0 0 14px '+pal.left+'44, inset 0 0 8px '+pal.right+'33' }"/>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: { type: String, default: 'PLAYER' },
  size: { type: Number, default: 40 }
})

function hash(s, salt = '') {
  const str = s + salt
  let h = 0
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0
  return Math.abs(h)
}

const u = computed(() => 'na' + hash(props.username).toString(36))
const hashId = computed(() => hash(props.username).toString(16).slice(0,6).toUpperCase())

// Neon palette — cinematic color pair
const pal = computed(() => {
  const h = hash(props.username, 'pal')
  const palettes = [
    { left: '#ff2d78', right: '#00d4ff', up: '#a855f7', ring: '#ff2d7888', mid: '#ff2d7844' },
    { left: '#00e5ff', right: '#a855f7', up: '#facc15', ring: '#00e5ff88', mid: '#00e5ff44' },
    { left: '#facc15', right: '#f87171', up: '#00e5ff', ring: '#facc1588', mid: '#facc1544' },
    { left: '#4ade80', right: '#818cf8', up: '#f472b6', ring: '#4ade8088', mid: '#4ade8044' },
    { left: '#fb923c', right: '#facc15', up: '#f472b6', ring: '#fb923c88', mid: '#fb923c44' },
    { left: '#f472b6', right: '#38bdf8', up: '#a855f7', ring: '#f472b688', mid: '#f472b644' },
    { left: '#a78bfa', right: '#34d399', up: '#f59e0b', ring: '#a78bfa88', mid: '#a78bfa44' },
    { left: '#38bdf8', right: '#fb7185', up: '#4ade80', ring: '#38bdf888', mid: '#38bdf844' },
  ]
  return palettes[h % palettes.length]
})

const t = computed(() => {
  const s = props.username.toUpperCase()
  const h1 = hash(s, '1'), h2 = hash(s, '2'), h3 = hash(s, '3')
  const h4 = hash(s, '4'), h5 = hash(s, '5'), h6 = hash(s, '6'), h7 = hash(s, '7')

  // Realistic skin tones with cinematic feel
  const skins = [
    { skin:'#d4956a', skinHi:'#f8d5b0', skinMid:'#c4855a', skinShadow:'#7a4a30' },
    { skin:'#e8c09a', skinHi:'#fce8d0', skinMid:'#d8a880', skinShadow:'#9a6840' },
    { skin:'#8a6058', skinHi:'#b89080', skinMid:'#7a5048', skinShadow:'#3a2018' },
    { skin:'#c8a888', skinHi:'#eed8c0', skinMid:'#b89070', skinShadow:'#786050' },
    { skin:'#f0cca0', skinHi:'#fff0d8', skinMid:'#e0b880', skinShadow:'#a87840' },
    { skin:'#7a8898', skinHi:'#aabac8', skinMid:'#6a7888', skinShadow:'#3a4858' },
  ]
  const sk = skins[h1 % skins.length]

  // Rainbow/neon hair combos — multi-stop gradients
  const hairSets = [
    { h1:'#ff2d78', h2:'#a855f7', h3:'#3b82f6', h4:'#00e5ff' },  // Pink→Purple→Blue→Cyan (like example)
    { h1:'#facc15', h2:'#f97316', h3:'#ef4444', h4:'#ec4899' },  // Yellow→Orange→Red→Pink
    { h1:'#00e5ff', h2:'#3b82f6', h3:'#8b5cf6', h4:'#ec4899' },  // Cyan→Blue→Purple→Pink
    { h1:'#4ade80', h2:'#00e5ff', h3:'#818cf8', h4:'#f472b6' },  // Green→Cyan→Purple→Pink
    { h1:'#f8fafc', h2:'#e2e8f0', h3:'#94a3b8', h4:'#64748b' },  // Silver white
    { h1:'#1e1e2e', h2:'#312e81', h3:'#4c1d95', h4:'#2d1b69' },  // Dark purple-black
    { h1:'#ef4444', h2:'#f97316', h3:'#facc15', h4:'#4ade80' },  // Red→Orange→Yellow→Green (sunset)
    { h1:'#f472b6', h2:'#e879f9', h3:'#c084fc', h4:'#818cf8' },  // Pink→Fuchsia→Purple→Indigo
  ]
  const hr = hairSets[h2 % hairSets.length]

  // Jacket / body colors
  const jackets = [
    { jacket1:'#0a1628', jacket2:'#1e3a5f', jacket3:'#0d2240' },  // Dark navy
    { jacket1:'#1a0a2e', jacket2:'#3d1d6b', jacket3:'#0d0618' },  // Dark purple
    { jacket1:'#0a1a0a', jacket2:'#143d14', jacket3:'#051005' },  // Dark green
    { jacket1:'#2a1a08', jacket2:'#5a3a18', jacket3:'#1a0a04' },  // Dark brown leather
    { jacket1:'#0a0a0a', jacket2:'#1a1a2e', jacket3:'#050510' },  // Black
    { jacket1:'#1a0a1a', jacket2:'#3d1a3d', jacket3:'#0a050a' },  // Black purple
  ]
  const jk = jackets[h3 % jackets.length]

  // Eye iris colors — striking, expressive
  const irises = [
    { iris:'#1e40af', irisHi:'#60a5fa' },
    { iris:'#15803d', irisHi:'#4ade80' },
    { iris:'#7c3aed', irisHi:'#c084fc' },
    { iris:'#b45309', irisHi:'#fbbf24' },
    { iris:'#0e7490', irisHi:'#22d3ee' },
    { iris:'#9f1239', irisHi:'#fb7185' },
  ]
  const ir = irises[h4 % irises.length]

  // Eyeshadow colors
  const shadows = [
    { shadow1:'#7c3aed', shadow2:'#db2777' },
    { shadow1:'#0891b2', shadow2:'#7c3aed' },
    { shadow1:'#b45309', shadow2:'#dc2626' },
    { shadow1:'#065f46', shadow2:'#0891b2' },
    { shadow1:'#be185d', shadow2:'#7c3aed' },
    { shadow1:'#1d4ed8', shadow2:'#065f46' },
  ]
  const sh = shadows[h5 % shadows.length]

  // Lip colors
  const lips = [
    { lip:'#dc2626', lipHi:'#f87171' },
    { lip:'#be185d', lipHi:'#f472b6' },
    { lip:'#f97316', lipHi:'#fb923c' },
    { lip:'#7c3aed', lipHi:'#a78bfa' },
    { lip:'#0e7490', lipHi:'#22d3ee' },
    { lip:'#991b1b', lipHi:'#ef4444' },
  ]
  const lp = lips[h6 % lips.length]

  const browColors = ['#1e1e2e','#3b1f0a','#1a0533','#0a1a0a','#0a0a1a']
  const bgMids = ['#0d1020','#150d22','#0d1508','#201008','#0d1a20','#1a0d20']

  return {
    ...sk, ...hr, ...jk, ...ir, ...sh, ...lp,
    blush: pal.value.left,
    liner: '#0a0a1a',
    browColor: browColors[h7 % browColors.length],
    browY: 51 - (h1 % 3),
    hairStyle: h2 % 5,
    bgMid: bgMids[h3 % bgMids.length],
  }
})

const bg = computed(() => {
  const h = hash(props.username)
  const bgs = [
    `radial-gradient(ellipse at 30% 25%, ${pal.value.left}22, #030308)`,
    `radial-gradient(ellipse at 70% 25%, ${pal.value.right}22, #040208)`,
    `radial-gradient(ellipse at 50% 15%, ${pal.value.up}22, #030306)`,
    `radial-gradient(ellipse at 30% 30%, ${pal.value.left}18, #020204)`,
    `radial-gradient(ellipse at 60% 20%, ${pal.value.right}18, #040204)`,
  ]
  return bgs[h % bgs.length]
})

const orbs = computed(() => {
  const h = hash(props.username, 'orb')
  const colors = [pal.value.left, pal.value.right, pal.value.up]
  return Array.from({ length: 3 }, (_, i) => ({
    color: colors[i % 3],
    r: (props.size / 2) + 5 + i * 4,
    s: 1.5 + (i % 2),
    d: 4 + ((h + i * 7) % 4),
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
  position: absolute; left: 0; right: 0; height: 2px;
  z-index: 3; opacity: 0.6;
  animation: holo-scan 3s linear infinite;
}
.rgb-rim {
  position: absolute; inset: 0; border-radius: 50%;
  z-index: 4; pointer-events: none;
}
.orbit-wrap {
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
}
.orb {
  position: absolute;
  width: var(--s); height: var(--s); border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 5px var(--c), 0 0 10px var(--c);
  top: 50%; left: 50%;
  margin: calc(var(--s) / -2);
  animation: orbit linear infinite;
  transform-origin: calc(var(--r) * -1) 0;
}
.aura-r {
  position: absolute; border-radius: 50%; border: 1px solid;
  pointer-events: none;
  animation: aura-pulse 2.8s ease-in-out infinite;
}
.aura-r1 { inset: -4px; }
.aura-r2 { inset: -3px; animation-delay: 0.4s; }
.aura-r3 { inset: -8px; animation-delay: 0.8s; }

@keyframes orbit {
  from { transform: rotate(0deg) translateX(var(--r)); }
  to   { transform: rotate(360deg) translateX(var(--r)); }
}
@keyframes aura-pulse {
  0%,100% { opacity: 0.65; }
  50%      { opacity: 1; }
}
@keyframes nft-breathe {
  0%,100% { transform: scale(1); }
  50%     { transform: scale(1.02); }
}
@keyframes nft-float {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-1.5px); }
}
@keyframes holo-scan {
  0%   { top: 5%; opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.6; }
  100% { top: 95%; opacity: 0; }
}
</style>
