<template>
  <div class="nft-avatar-root" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- Aura outer glow rings -->
    <div class="aura-ring aura-ring-3" :style="{ borderColor: aura.ring3 }"></div>
    <div class="aura-ring aura-ring-2" :style="{ borderColor: aura.ring2 }"></div>
    <div class="aura-ring aura-ring-1" :style="{ borderColor: aura.ring1 }"></div>

    <!-- Orbiting particles -->
    <div class="orbit-container">
      <div v-for="(p, i) in particles" :key="i"
        class="orbit-particle"
        :style="{
          animationDuration: p.duration + 's',
          animationDelay: p.delay + 's',
          animationDirection: p.reverse ? 'reverse' : 'normal',
          '--orbit-r': p.radius + 'px',
          '--p-color': p.color,
          '--p-size': p.size + 'px'
        }">
      </div>
    </div>

    <!-- Main avatar circle -->
    <div class="avatar-circle" :style="{ background: avatarBg }">
      <!-- Hologram scan line -->
      <div class="holo-scan"></div>

      <!-- SVG Character -->
      <svg
        :width="size * 0.85"
        :height="size * 0.85"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        class="avatar-svg"
      >
        <defs>
          <!-- Skin gradient -->
          <radialGradient :id="'skin-' + uid" cx="50%" cy="40%" r="60%">
            <stop offset="0%" :stop-color="traits.skinLight" />
            <stop offset="100%" :stop-color="traits.skin" />
          </radialGradient>
          <!-- Eye glow -->
          <filter :id="'glow-' + uid" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <!-- Body gradient -->
          <linearGradient :id="'body-' + uid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="traits.bodyColor1" />
            <stop offset="100%" :stop-color="traits.bodyColor2" />
          </linearGradient>
          <!-- Hair gradient -->
          <linearGradient :id="'hair-' + uid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" :stop-color="traits.hairColor1" />
            <stop offset="100%" :stop-color="traits.hairColor2" />
          </linearGradient>
        </defs>

        <!-- Body / Torso -->
        <ellipse cx="40" cy="68" rx="16" ry="10" :fill="'url(#body-' + uid + ')'" opacity="0.9"/>
        <!-- Collar/chest detail -->
        <rect x="33" y="57" width="14" height="8" rx="2" :fill="traits.bodyColor2" opacity="0.8"/>
        <!-- Chest circuit line -->
        <path :d="'M36 60 L40 63 L44 60'" :stroke="traits.eyeColor" stroke-width="0.8" fill="none" opacity="0.9"/>

        <!-- Neck -->
        <rect x="37" y="52" width="6" height="6" rx="1" :fill="'url(#skin-' + uid + ')'"/>

        <!-- Head -->
        <ellipse cx="40" cy="44" rx="14" ry="15" :fill="'url(#skin-' + uid + ')'"/>

        <!-- Hair / Helmet based on type -->
        <!-- Type 0: spiky hair -->
        <template v-if="traits.hairType === 0">
          <path d="M26 44 Q27 28 40 26 Q53 28 54 44 Q48 30 40 29 Q32 30 26 44Z" :fill="'url(#hair-' + uid + ')'"/>
          <polygon points="32,36 29,24 35,32" :fill="traits.hairColor1"/>
          <polygon points="40,34 38,20 43,32" :fill="traits.hairColor1"/>
          <polygon points="48,36 51,24 45,32" :fill="traits.hairColor1"/>
        </template>
        <!-- Type 1: cyber visor/helmet -->
        <template v-else-if="traits.hairType === 1">
          <path d="M26 42 Q26 26 40 25 Q54 26 54 42 L52 42 Q52 28 40 27 Q28 28 28 42Z" :fill="'url(#hair-' + uid + ')'"/>
          <rect x="27" y="38" width="26" height="5" rx="2" :fill="traits.eyeColor" opacity="0.7"/>
          <rect x="29" y="39" width="22" height="2" rx="1" :fill="traits.eyeColor" opacity="0.5"/>
        </template>
        <!-- Type 2: horns -->
        <template v-else-if="traits.hairType === 2">
          <path d="M26 43 Q27 28 40 26 Q53 28 54 43 Q48 30 40 29 Q32 30 26 43Z" :fill="'url(#hair-' + uid + ')'"/>
          <polygon points="30,38 27,22 34,36" :fill="traits.hairColor2"/>
          <polygon points="50,38 53,22 46,36" :fill="traits.hairColor2"/>
        </template>
        <!-- Type 3: antenna -->
        <template v-else-if="traits.hairType === 3">
          <path d="M26 43 Q27 28 40 26 Q53 28 54 43 Q48 30 40 29 Q32 30 26 43Z" :fill="'url(#hair-' + uid + ')'"/>
          <line x1="40" y1="27" x2="40" y2="16" :stroke="traits.eyeColor" stroke-width="1.5"/>
          <circle cx="40" cy="14" r="3" :fill="traits.eyeColor" opacity="0.9"/>
          <circle cx="40" cy="14" r="5" :fill="traits.eyeColor" opacity="0.2"/>
        </template>
        <!-- Type 4: cat ears -->
        <template v-else>
          <path d="M26 43 Q27 28 40 26 Q53 28 54 43 Q48 30 40 29 Q32 30 26 43Z" :fill="'url(#hair-' + uid + ')'"/>
          <polygon points="28,36 25,22 34,34" :fill="traits.hairColor1"/>
          <polygon points="29,34 27,24 33,33" :fill="traits.hairColor2" opacity="0.6"/>
          <polygon points="52,36 55,22 46,34" :fill="traits.hairColor1"/>
          <polygon points="51,34 53,24 47,33" :fill="traits.hairColor2" opacity="0.6"/>
        </template>

        <!-- Eyes -->
        <!-- Left eye -->
        <template v-if="traits.eyeType === 0">
          <!-- Normal round eyes -->
          <ellipse cx="34" cy="44" rx="4" ry="4.5" fill="white"/>
          <circle cx="34" cy="44" r="2.5" :fill="traits.eyeColor" class="eye-l"/>
          <circle cx="34" cy="44" r="1.2" fill="#0a0a1a"/>
          <circle cx="35" cy="43" r="0.7" fill="white" opacity="0.8"/>
          <ellipse cx="46" cy="44" rx="4" ry="4.5" fill="white"/>
          <circle cx="46" cy="44" r="2.5" :fill="traits.eyeColor" class="eye-r"/>
          <circle cx="46" cy="44" r="1.2" fill="#0a0a1a"/>
          <circle cx="47" cy="43" r="0.7" fill="white" opacity="0.8"/>
        </template>
        <template v-else-if="traits.eyeType === 1">
          <!-- Cyber eyes -->
          <rect x="30" y="41" width="8" height="5" rx="1.5" fill="#0a0a1a" :filter="'url(#glow-' + uid + ')'"/>
          <rect x="31" y="42.5" width="6" height="2" rx="1" :fill="traits.eyeColor" opacity="0.9"/>
          <rect x="42" y="41" width="8" height="5" rx="1.5" fill="#0a0a1a" :filter="'url(#glow-' + uid + ')'"/>
          <rect x="43" y="42.5" width="6" height="2" rx="1" :fill="traits.eyeColor" opacity="0.9"/>
        </template>
        <template v-else-if="traits.eyeType === 2">
          <!-- Star/sparkle eyes -->
          <circle cx="34" cy="44" r="4" fill="white"/>
          <text x="34" y="46.5" text-anchor="middle" font-size="5" :fill="traits.eyeColor">★</text>
          <circle cx="46" cy="44" r="4" fill="white"/>
          <text x="46" y="46.5" text-anchor="middle" font-size="5" :fill="traits.eyeColor">★</text>
        </template>
        <template v-else-if="traits.eyeType === 3">
          <!-- Alien slit eyes -->
          <ellipse cx="34" cy="44" rx="4.5" ry="3" fill="white"/>
          <ellipse cx="34" cy="44" rx="1.5" ry="2.8" :fill="traits.eyeColor"/>
          <ellipse cx="46" cy="44" rx="4.5" ry="3" fill="white"/>
          <ellipse cx="46" cy="44" rx="1.5" ry="2.8" :fill="traits.eyeColor"/>
        </template>
        <template v-else>
          <!-- X eyes (edgy/robot) -->
          <circle cx="34" cy="44" r="4" fill="#1a1a2e"/>
          <path d="M31.5 41.5 L36.5 46.5 M36.5 41.5 L31.5 46.5" :stroke="traits.eyeColor" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="46" cy="44" r="4" fill="#1a1a2e"/>
          <path d="M43.5 41.5 L48.5 46.5 M48.5 41.5 L43.5 46.5" :stroke="traits.eyeColor" stroke-width="1.5" stroke-linecap="round"/>
        </template>

        <!-- Nose (subtle) -->
        <path d="M39 47 Q40 49 41 47" :stroke="traits.skin" stroke-width="0.8" fill="none" opacity="0.5"/>

        <!-- Mouth -->
        <path v-if="traits.mouthType === 0" d="M36 51 Q40 54 44 51" :stroke="traits.eyeColor" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <path v-else-if="traits.mouthType === 1" d="M36 52 L38 50 L40 52 L42 50 L44 52" :stroke="traits.eyeColor" stroke-width="1" fill="none"/>
        <path v-else d="M37 51 Q40 53 43 51" stroke="#ff6b9d" stroke-width="1.2" fill="none" stroke-linecap="round"/>

        <!-- Ear detail -->
        <ellipse cx="26" cy="44" rx="3" ry="4" :fill="traits.skin" opacity="0.8"/>
        <ellipse cx="54" cy="44" rx="3" ry="4" :fill="traits.skin" opacity="0.8"/>
        <ellipse cx="26" cy="44" rx="1.5" ry="2.5" :fill="traits.skinLight" opacity="0.5"/>
        <ellipse cx="54" cy="44" rx="1.5" ry="2.5" :fill="traits.skinLight" opacity="0.5"/>

        <!-- Hologram lines over character -->
        <line x1="20" y1="35" x2="60" y2="35" :stroke="traits.eyeColor" stroke-width="0.3" opacity="0.2"/>
        <line x1="20" y1="45" x2="60" y2="45" :stroke="traits.eyeColor" stroke-width="0.3" opacity="0.15"/>
        <line x1="20" y1="55" x2="60" y2="55" :stroke="traits.eyeColor" stroke-width="0.3" opacity="0.1"/>

        <!-- Ground glow shadow -->
        <ellipse cx="40" cy="78" rx="14" ry="3" :fill="aura.ring1" opacity="0.25"/>
      </svg>

      <!-- Eye blink overlay -->
      <div class="blink-overlay" :style="{ background: avatarBg }"></div>
    </div>

    <!-- NFT label badge -->
    <div class="nft-badge" :style="{ background: aura.ring1, boxShadow: '0 0 8px ' + aura.ring1 }">
      NFT
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  username: { type: String, default: 'PLAYER' },
  size: { type: Number, default: 52 }
})

const uid = computed(() => 'nft_' + props.username.replace(/[^a-z0-9]/gi, ''))

function hashStr(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function pickFrom(arr, seed) {
  return arr[seed % arr.length]
}

const traits = computed(() => {
  const s = props.username.toUpperCase()
  const h = hashStr(s)
  const h2 = hashStr(s + '2')
  const h3 = hashStr(s + '3')
  const h4 = hashStr(s + '4')
  const h5 = hashStr(s + '5')
  const h6 = hashStr(s + '6')

  const skins = [
    { skin: '#c68642', skinLight: '#f5c077' },
    { skin: '#4a90d9', skinLight: '#7ab8f5' },
    { skin: '#9b59b6', skinLight: '#c39bd3' },
    { skin: '#27ae60', skinLight: '#52d68a' },
    { skin: '#e74c3c', skinLight: '#f1948a' },
    { skin: '#1abc9c', skinLight: '#76d7c4' },
    { skin: '#f39c12', skinLight: '#f8c471' },
    { skin: '#8e44ad', skinLight: '#bb8fce' },
  ]
  const skinPick = skins[h % skins.length]

  const eyeColors = ['#00e5ff', '#a855f7', '#facc15', '#4ade80', '#f87171', '#60a5fa', '#fb923c', '#f472b6']
  const bodyPairs = [
    ['#0f3460', '#16213e'], ['#2d1b69', '#1a0533'], ['#003300', '#001100'],
    ['#330000', '#1a0000'], ['#00334d', '#001a26'], ['#1a1a2e', '#0f0f23'],
  ]
  const hairColors = [
    ['#facc15', '#f59e0b'], ['#a855f7', '#7c3aed'], ['#00e5ff', '#0891b2'],
    ['#f87171', '#dc2626'], ['#4ade80', '#16a34a'], ['#f8fafc', '#94a3b8'],
    ['#fb923c', '#ea580c'], ['#1e1e1e', '#374151'],
  ]
  const hair = hairColors[h2 % hairColors.length]
  const body = bodyPairs[h3 % bodyPairs.length]

  return {
    skin: skinPick.skin,
    skinLight: skinPick.skinLight,
    eyeColor: eyeColors[h4 % eyeColors.length],
    bodyColor1: body[0],
    bodyColor2: body[1],
    hairColor1: hair[0],
    hairColor2: hair[1],
    hairType: h5 % 5,
    eyeType: h6 % 5,
    mouthType: h % 3,
  }
})

const auraColors = [
  { ring1: '#00e5ff44', ring2: '#00e5ff22', ring3: '#00e5ff11', glow: '#00e5ff' },
  { ring1: '#a855f744', ring2: '#a855f722', ring3: '#a855f711', glow: '#a855f7' },
  { ring1: '#facc1544', ring2: '#facc1522', ring3: '#facc1511', glow: '#facc15' },
  { ring1: '#4ade8044', ring2: '#4ade8022', ring3: '#4ade8011', glow: '#4ade80' },
  { ring1: '#f8717144', ring2: '#f8717122', ring3: '#f8717111', glow: '#f87171' },
  { ring1: '#60a5fa44', ring2: '#60a5fa22', ring3: '#60a5fa11', glow: '#60a5fa' },
  { ring1: '#fb923c44', ring2: '#fb923c22', ring3: '#fb923c11', glow: '#fb923c' },
  { ring1: '#f472b644', ring2: '#f472b622', ring3: '#f472b611', glow: '#f472b6' },
]

const aura = computed(() => {
  const h = hashStr(props.username.toUpperCase() + 'aura')
  return auraColors[h % auraColors.length]
})

const avatarBg = computed(() => {
  const h = hashStr(props.username.toUpperCase())
  const bgs = [
    'radial-gradient(circle at 30% 30%, #0f3460, #0a0a1a)',
    'radial-gradient(circle at 30% 30%, #2d1b69, #0d0d1a)',
    'radial-gradient(circle at 30% 30%, #003300, #000d00)',
    'radial-gradient(circle at 30% 30%, #1a0533, #0a0015)',
    'radial-gradient(circle at 30% 30%, #00334d, #000f1a)',
    'radial-gradient(circle at 30% 30%, #1a1a2e, #0f0f23)',
  ]
  return bgs[h % bgs.length]
})

const particles = computed(() => {
  const h = hashStr(props.username.toUpperCase() + 'p')
  const colors = ['#00e5ff', '#a855f7', '#facc15', '#4ade80', '#f87171', '#60a5fa']
  const count = 4 + (h % 3)
  return Array.from({ length: count }, (_, i) => ({
    duration: 3 + ((h + i * 7) % 4),
    delay: -((h + i * 3) % 4),
    reverse: i % 2 === 0,
    radius: (props.size / 2) + 4 + (i * 4),
    color: colors[(h + i) % colors.length],
    size: 2 + (i % 2),
  }))
})
</script>

<style scoped>
.nft-avatar-root {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: nft-float 3s ease-in-out infinite, nft-breathe 4s ease-in-out infinite;
  z-index: 2;
}

.avatar-svg {
  position: relative;
  z-index: 2;
  animation: nft-float-svg 3s ease-in-out infinite;
}

/* Hologram scan line */
.holo-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.6), transparent);
  z-index: 3;
  animation: nft-scan 2.8s linear infinite;
}

/* Eye blink overlay */
.blink-overlay {
  position: absolute;
  left: 30%;
  right: 30%;
  top: 48%;
  height: 1px;
  z-index: 4;
  border-radius: 50%;
  transform: scaleY(0);
  animation: nft-blink 5s ease-in-out infinite;
}

/* Aura rings */
.aura-ring {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  pointer-events: none;
}
.aura-ring-1 {
  inset: -4px;
  border-width: 1.5px;
  animation: nft-aura-1 2.5s ease-in-out infinite;
  z-index: 1;
}
.aura-ring-2 {
  inset: -9px;
  border-width: 1px;
  animation: nft-aura-2 3.5s ease-in-out infinite;
  z-index: 0;
}
.aura-ring-3 {
  inset: -15px;
  border-width: 1px;
  animation: nft-aura-3 5s ease-in-out infinite;
  z-index: 0;
  opacity: 0.4;
}

/* Orbit particles */
.orbit-container {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}
.orbit-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--p-size);
  height: var(--p-size);
  border-radius: 50%;
  background: var(--p-color);
  box-shadow: 0 0 6px var(--p-color), 0 0 12px var(--p-color);
  transform-origin: calc(-1 * var(--orbit-r)) 0;
  margin-top: calc(-1 * var(--p-size) / 2);
  margin-left: calc(-1 * var(--p-size) / 2);
  animation: nft-orbit linear infinite;
  animation-duration: var(--orbit-duration, 4s);
}

/* NFT badge */
.nft-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  font-size: 6px;
  font-weight: 900;
  color: white;
  padding: 1px 3px;
  border-radius: 3px;
  letter-spacing: 0.05em;
  z-index: 10;
  animation: nft-badge-pulse 2s ease-in-out infinite;
}

/* ── Keyframes ── */
@keyframes nft-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}
@keyframes nft-float-svg {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-1.5px); }
}
@keyframes nft-breathe {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 4px rgba(0,229,255,0.3)); }
  50% { filter: brightness(1.08) drop-shadow(0 0 10px rgba(0,229,255,0.6)); }
}
@keyframes nft-scan {
  0% { top: -2px; opacity: 0; }
  5% { opacity: 1; }
  90% { opacity: 0.5; }
  100% { top: 100%; opacity: 0; }
}
@keyframes nft-blink {
  0%, 45%, 55%, 100% { transform: scaleY(0); opacity: 0; }
  48%, 52% { transform: scaleY(8); opacity: 1; }
}
@keyframes nft-aura-1 {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
@keyframes nft-aura-2 {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.04); }
}
@keyframes nft-aura-3 {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.06); }
}
@keyframes nft-orbit {
  from { transform: rotate(0deg) translateX(var(--orbit-r)); }
  to { transform: rotate(360deg) translateX(var(--orbit-r)); }
}
@keyframes nft-badge-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}
</style>
