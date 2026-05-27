<template>
  <div class="nft-root" :style="{ width: size + 'px', height: size + 'px' }">
    <div class="soft-ring" :style="{ borderColor: pal.ring, boxShadow: '0 0 10px '+pal.mid+', inset 0 0 5px '+pal.mid }"></div>
    <div class="nft-circle" :style="{ background: bg }">
      <svg :width="size" :height="size" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
        <defs>
          <!-- Dark cinematic background -->
          <radialGradient :id="u+'-bg'" cx="50%" cy="35%" r="75%">
            <stop offset="0%" :stop-color="t.bgMid"/>
            <stop offset="60%" stop-color="#060810"/>
            <stop offset="100%" stop-color="#020205"/>
          </radialGradient>

          <!-- Skin realistic gradient -->
          <radialGradient :id="u+'-sk'" cx="36%" cy="28%" r="72%">
            <stop offset="0%" :stop-color="t.skinHi"/>
            <stop offset="35%" :stop-color="t.skin"/>
            <stop offset="75%" :stop-color="t.skinMid"/>
            <stop offset="100%" :stop-color="t.skinShadow"/>
          </radialGradient>

          <!-- Neck skin -->
          <radialGradient :id="u+'-nk'" cx="40%" cy="20%" r="80%">
            <stop offset="0%" :stop-color="t.skin"/>
            <stop offset="100%" :stop-color="t.skinShadow"/>
          </radialGradient>

          <!-- Rainbow hair gradient -->
          <linearGradient :id="u+'-hr'" x1="0%" y1="0%" x2="100%" y2="90%">
            <stop offset="0%"   :stop-color="t.h1"/>
            <stop offset="25%"  :stop-color="t.h2"/>
            <stop offset="55%"  :stop-color="t.h3"/>
            <stop offset="82%"  :stop-color="t.h4"/>
            <stop offset="100%" :stop-color="t.h1"/>
          </linearGradient>

          <!-- Hair shine layers -->
          <linearGradient :id="u+'-hs'" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.55)"/>
            <stop offset="40%" stop-color="rgba(255,255,255,0.05)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0.15)"/>
          </linearGradient>

          <!-- Left neon face light -->
          <radialGradient :id="u+'-nl'" cx="-15%" cy="38%" r="80%">
            <stop offset="0%" :stop-color="pal.left" stop-opacity="0.65"/>
            <stop offset="100%" :stop-color="pal.left" stop-opacity="0"/>
          </radialGradient>

          <!-- Right neon face light -->
          <radialGradient :id="u+'-nr'" cx="115%" cy="42%" r="80%">
            <stop offset="0%" :stop-color="pal.right" stop-opacity="0.55"/>
            <stop offset="100%" :stop-color="pal.right" stop-opacity="0"/>
          </radialGradient>

          <!-- Bottom uplight -->
          <radialGradient :id="u+'-bu'" cx="50%" cy="115%" r="65%">
            <stop offset="0%" :stop-color="pal.up" stop-opacity="0.38"/>
            <stop offset="100%" :stop-color="pal.up" stop-opacity="0"/>
          </radialGradient>

          <!-- Eyeshadow gradient -->
          <linearGradient :id="u+'-es'" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="t.shadow1"/>
            <stop offset="60%" :stop-color="t.shadow2"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </linearGradient>

          <!-- Lip gradient -->
          <linearGradient :id="u+'-lp'" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="t.lipHi"/>
            <stop offset="100%" :stop-color="t.lip"/>
          </linearGradient>

          <!-- Eye iris gradient -->
          <radialGradient :id="u+'-ir'" cx="36%" cy="32%" r="68%">
            <stop offset="0%" :stop-color="t.irisHi"/>
            <stop offset="55%" :stop-color="t.iris"/>
            <stop offset="100%" :stop-color="t.irisDark"/>
          </radialGradient>

          <!-- Jacket gradient -->
          <linearGradient :id="u+'-jk'" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="t.jacket1"/>
            <stop offset="45%" :stop-color="t.jacket2"/>
            <stop offset="100%" :stop-color="t.jacket3"/>
          </linearGradient>

          <!-- Jacket gloss -->
          <linearGradient :id="u+'-jg'" x1="0%" y1="0%" x2="55%" y2="100%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.22)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </linearGradient>

          <!-- City glow ground -->
          <linearGradient :id="u+'-cg'" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" :stop-color="pal.up" stop-opacity="0.18"/>
            <stop offset="100%" :stop-color="pal.left" stop-opacity="0.28"/>
          </linearGradient>

          <!-- Filters -->
          <filter :id="u+'-gw'" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter :id="u+'-sg'" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter :id="u+'-sub'" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter :id="u+'-blr'" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6"/>
          </filter>
          <filter :id="u+'-haze'" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Dark atmospheric BG -->
        <rect width="120" height="120" :fill="furl('bg')"/>

        <!-- ── CITY SKYLINE BACKGROUND ── (subtle, atmospheric) -->
        <g opacity="0.22">
          <!-- Buildings silhouette -->
          <rect x="0"  y="70" width="10" height="50" fill="#080c18"/>
          <rect x="2"  y="60" width="6"  height="10" fill="#080c18"/>
          <rect x="10" y="75" width="8"  height="45" fill="#080c18"/>
          <rect x="12" y="63" width="4"  height="14" fill="#080c18"/>
          <rect x="18" y="68" width="10" height="52" fill="#080c18"/>
          <rect x="20" y="55" width="3"  height="14" fill="#080c18"/>
          <rect x="28" y="72" width="7"  height="48" fill="#080c18"/>
          <rect x="85" y="72" width="7"  height="48" fill="#080c18"/>
          <rect x="93" y="67" width="9"  height="53" fill="#080c18"/>
          <rect x="95" y="58" width="3"  height="10" fill="#080c18"/>
          <rect x="103" y="73" width="8" height="47" fill="#080c18"/>
          <rect x="112" y="65" width="8" height="55" fill="#080c18"/>
          <!-- Building windows glow dots -->
          <rect x="3"  y="64" width="2" height="1" :fill="pal.left" opacity="0.6"/>
          <rect x="13" y="67" width="1" height="1" :fill="pal.right" opacity="0.6"/>
          <rect x="21" y="59" width="1" height="1" :fill="pal.up" opacity="0.5"/>
          <rect x="96" y="61" width="1" height="1" :fill="pal.left" opacity="0.5"/>
          <rect x="105" y="76" width="1" height="1" :fill="pal.right" opacity="0.5"/>
          <rect x="114" y="69" width="2" height="1" :fill="pal.up" opacity="0.5"/>
          <!-- Tall center tower beams -->
          <rect x="2"  y="60" width="1" height="50" :fill="pal.left" opacity="0.35"/>
          <rect x="114" y="65" width="1" height="50" :fill="pal.right" opacity="0.35"/>
        </g>
        <!-- City ground glow -->
        <rect x="0" y="95" width="120" height="25" :fill="furl('cg')" :filter="furl('sg')" opacity="0.5"/>

        <!-- ── BODY / JACKET ── -->
        <ellipse cx="60" cy="134" rx="48" ry="30" :fill="furl('jk')"/>
        <ellipse cx="60" cy="134" rx="48" ry="30" :fill="furl('jg')"/>
        <!-- Jacket collar neon edge -->
        <path d="M36 106 Q46 102 60 100 Q74 102 84 106" :stroke="pal.left" stroke-width="0.7" fill="none" opacity="0.7"/>
        <!-- Jacket zipper center line -->
        <line x1="60" y1="100" x2="60" y2="120" :stroke="t.jacket2" stroke-width="1.2" opacity="0.7"/>
        <!-- Jacket neon side highlights -->
        <path d="M12 130 Q26 108 40 103" :stroke="pal.left" stroke-width="0.9" fill="none" opacity="0.55" :filter="furl('sub')"/>
        <path d="M108 130 Q94 108 80 103" :stroke="pal.right" stroke-width="0.9" fill="none" opacity="0.55" :filter="furl('sub')"/>

        <!-- ── SHOULDERS (subtle) ── -->
        <path d="M8 120 Q20 108 40 105 Q30 115 14 128Z" :fill="t.jacket1" opacity="0.7"/>
        <path d="M112 120 Q100 108 80 105 Q90 115 106 128Z" :fill="t.jacket1" opacity="0.7"/>

        <!-- ── NECK ── -->
        <path d="M50 90 Q49 102 51 107 L69 107 Q71 102 70 90" :fill="furl('nk')"/>
        <!-- Collarbone subtle lines -->
        <path d="M42 108 Q60 113 78 108" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Neck neon light cast -->
        <ellipse cx="60" cy="102" rx="12" ry="7" :fill="pal.up" opacity="0.12" :filter="furl('blr')"/>

        <!-- Cyberpunk circuit on neck (variant) -->
        <g v-if="t.hasCyber" :stroke="pal.left" stroke-width="0.55" fill="none" opacity="0.65">
          <path d="M54 98 L53 103 L56 103 L56 106"/>
          <circle cx="56" cy="103" r="1" :fill="pal.left" stroke="none"/>
          <path d="M63 99 L64 104 L61 104"/>
          <circle cx="61" cy="104" r="0.8" :fill="pal.right" stroke="none"/>
          <path d="M58 107 L58 110 L55 110"/>
          <path d="M62 107 L62 110 L65 110"/>
        </g>

        <!-- ── HAIR BACK LAYER ── -->
        <template v-if="t.hairStyle===0">
          <!-- Flowing bob -->
          <path d="M22 52 Q16 70 20 92 Q26 110 38 115 Q29 88 31 66 Q28 52 38 38Z" :fill="furl('hr')"/>
          <path d="M98 52 Q104 70 100 92 Q94 110 82 115 Q91 88 89 66 Q92 52 82 38Z" :fill="furl('hr')"/>
        </template>
        <template v-else-if="t.hairStyle===1">
          <!-- Long straight -->
          <path d="M20 50 Q14 80 18 116 Q26 122 36 118 Q27 84 29 58 Q26 47 36 36Z" :fill="furl('hr')"/>
          <path d="M100 50 Q106 80 102 116 Q94 122 84 118 Q93 84 91 58 Q94 47 84 36Z" :fill="furl('hr')"/>
        </template>
        <template v-else-if="t.hairStyle===2">
          <!-- Voluminous curly -->
          <path d="M16 48 Q10 66 14 85 Q18 102 30 110 Q22 82 24 60 Q22 46 32 36Z" :fill="furl('hr')"/>
          <path d="M104 48 Q110 66 106 85 Q102 102 90 110 Q98 82 96 60 Q98 46 88 36Z" :fill="furl('hr')"/>
        </template>
        <template v-else-if="t.hairStyle===3">
          <!-- Sleek pulled back -->
          <path d="M28 50 Q25 66 27 84 Q31 100 40 107 Q35 80 35 60Z" :fill="furl('hr')"/>
          <path d="M92 50 Q95 66 93 84 Q89 100 80 107 Q85 80 85 60Z" :fill="furl('hr')"/>
        </template>
        <template v-else>
          <!-- Wild asymmetric -->
          <path d="M14 50 Q10 68 14 90 Q20 108 34 113 Q25 84 27 60Z" :fill="furl('hr')"/>
          <path d="M106 50 Q110 68 106 90 Q100 108 86 113 Q95 84 93 60Z" :fill="furl('hr')"/>
        </template>

        <!-- ── FACE ── (slightly taller, more defined) -->
        <ellipse cx="60" cy="60" rx="29" ry="33" :fill="furl('sk')"/>

        <!-- Face cinematic neon washes -->
        <ellipse cx="60" cy="60" rx="29" ry="33" :fill="furl('nl')"/>
        <ellipse cx="60" cy="60" rx="29" ry="33" :fill="furl('nr')"/>
        <ellipse cx="60" cy="60" rx="29" ry="33" :fill="furl('bu')"/>

        <!-- Cheek contour shadows -->
        <path d="M31 55 Q29 70 33 84" :stroke="t.skinShadow" stroke-width="5" fill="none" opacity="0.15" stroke-linecap="round"/>
        <path d="M89 55 Q91 70 87 84" :stroke="t.skinShadow" stroke-width="5" fill="none" opacity="0.15" stroke-linecap="round"/>

        <!-- Temple highlight (left side light) -->
        <ellipse cx="36" cy="48" rx="8" ry="10" :fill="t.skinHi" opacity="0.15"/>

        <!-- Forehead center highlight -->
        <ellipse cx="60" cy="38" rx="10" ry="7" fill="rgba(255,255,255,0.08)"/>

        <!-- Jaw highlight -->
        <path d="M40 88 Q60 97 80 88" stroke="rgba(255,255,255,0.1)" stroke-width="3" fill="none" stroke-linecap="round"/>

        <!-- ── EARS ── -->
        <ellipse cx="31" cy="62" rx="4.5" ry="5.5" :fill="t.skin"/>
        <ellipse cx="89" cy="62" rx="4.5" ry="5.5" :fill="t.skin"/>
        <ellipse cx="31" cy="62" rx="2.5" ry="3.5" :fill="t.skinMid" opacity="0.45"/>
        <ellipse cx="89" cy="62" rx="2.5" ry="3.5" :fill="t.skinMid" opacity="0.45"/>

        <!-- ── CRYSTAL EARRINGS ── -->
        <!-- Left earring -->
        <line x1="31" y1="68" x2="31" y2="73" :stroke="pal.left" stroke-width="0.8"/>
        <polygon points="28,73 34,73 32,79 30,79" :fill="pal.left" opacity="0.85" :filter="furl('gw')"/>
        <polygon points="29.5,73 32.5,73 31,75" fill="rgba(255,255,255,0.5)"/>
        <!-- Right earring -->
        <line x1="89" y1="68" x2="89" y2="73" :stroke="pal.right" stroke-width="0.8"/>
        <polygon points="86,73 92,73 90,79 88,79" :fill="pal.right" opacity="0.85" :filter="furl('gw')"/>
        <polygon points="87.5,73 90.5,73 89,75" fill="rgba(255,255,255,0.5)"/>

        <!-- ── HAIR TOP/FRONT ── -->
        <template v-if="t.hairStyle===0">
          <path d="M31 53 Q30 18 60 16 Q90 18 89 53 Q82 30 60 28 Q38 30 31 53Z" :fill="furl('hr')"/>
          <path d="M31 53 Q30 18 60 16 Q90 18 89 53 Q82 30 60 28 Q38 30 31 53Z" :fill="furl('hs')" opacity="0.55"/>
          <!-- Hair strand details -->
          <path d="M36 30 Q40 24 46 28" :stroke="t.h2" stroke-width="0.8" fill="none" opacity="0.5"/>
          <path d="M80 30 Q78 22 72 26" :stroke="t.h3" stroke-width="0.8" fill="none" opacity="0.5"/>
        </template>
        <template v-else-if="t.hairStyle===1">
          <path d="M30 53 Q28 20 60 16 Q92 20 90 53 Q84 28 60 26 Q36 28 30 53Z" :fill="furl('hr')"/>
          <line x1="60" y1="16" x2="60" y2="34" stroke="rgba(255,255,255,0.4)" stroke-width="0.9"/>
          <path d="M30 53 Q28 20 60 16 Q92 20 90 53" :fill="furl('hs')" opacity="0.45"/>
          <!-- Wisp strands -->
          <path d="M34 34 Q38 22 44 30" :stroke="t.h1" stroke-width="0.6" fill="none" opacity="0.55"/>
          <path d="M86 34 Q82 22 76 30" :stroke="t.h2" stroke-width="0.6" fill="none" opacity="0.55"/>
        </template>
        <template v-else-if="t.hairStyle===2">
          <path d="M28 53 Q24 18 60 14 Q96 18 92 53 Q86 26 60 24 Q34 26 28 53Z" :fill="furl('hr')"/>
          <path d="M32 38 Q38 32 44 38 Q50 32 56 38 Q62 32 68 38 Q74 32 80 38 Q86 32 88 38" :stroke="t.h2" stroke-width="2" fill="none" opacity="0.4"/>
          <path d="M28 53 Q24 18 60 14 Q96 18 92 53" :fill="furl('hs')" opacity="0.3"/>
        </template>
        <template v-else-if="t.hairStyle===3">
          <path d="M33 50 Q30 20 60 16 Q90 20 87 50 Q82 28 60 26 Q38 28 33 50Z" :fill="furl('hr')"/>
          <path d="M36 26 Q52 18 70 24" stroke="rgba(255,255,255,0.55)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
          <path d="M33 50 Q30 20 60 16 Q90 20 87 50" :fill="furl('hs')" opacity="0.6"/>
        </template>
        <template v-else>
          <!-- Punk spiky with glow tips -->
          <path d="M30 52 Q28 22 60 16 Q92 22 90 52 Q84 28 60 26 Q36 28 30 52Z" :fill="furl('hr')"/>
          <polygon points="36,42 32,20 43,36" :fill="t.h1"/>
          <polygon points="52,34 50,12 58,32" :fill="t.h2"/>
          <polygon points="68,34 70,12 62,32" :fill="t.h3"/>
          <polygon points="84,42 88,20 77,36" :fill="t.h4"/>
          <circle cx="32" cy="20" r="2.8" :fill="t.h1" :filter="furl('sg')" opacity="0.9"/>
          <circle cx="50" cy="12" r="2.8" :fill="t.h2" :filter="furl('sg')" opacity="0.9"/>
          <circle cx="70" cy="12" r="2.8" :fill="t.h3" :filter="furl('sg')" opacity="0.9"/>
          <circle cx="88" cy="20" r="2.8" :fill="t.h4" :filter="furl('sg')" opacity="0.9"/>
        </template>

        <!-- ── FOREHEAD GEM (variant) ── -->
        <g v-if="t.hasGem">
          <polygon :points="'60,'+t.browY-16+' 57,'+t.browY-13+' 60,'+t.browY-10+' 63,'+t.browY-13" :fill="pal.left" opacity="0.85" :filter="furl('gw')"/>
          <polygon :points="'60,'+t.browY-16+' 58,'+t.browY-13+' 60,'+t.browY-12+' 62,'+t.browY-13" fill="rgba(255,255,255,0.55)"/>
        </g>

        <!-- ── EYEBROWS ── (thick, arched, bold) -->
        <!-- Left brow fill (thick) -->
        <path :d="'M37 '+t.browY+' Q43 '+(t.browY-7)+' 50 '+(t.browY-1)" :stroke="t.browColor" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.92"/>
        <!-- Left brow highlight -->
        <path :d="'M38 '+t.browY+' Q43 '+(t.browY-6)+' 49 '+(t.browY-1)" stroke="rgba(255,255,255,0.18)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <!-- Right brow fill (thick) -->
        <path :d="'M70 '+(t.browY-1)+' Q77 '+(t.browY-7)+' 83 '+t.browY" :stroke="t.browColor" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.92"/>
        <!-- Right brow highlight -->
        <path :d="'M71 '+(t.browY-1)+' Q77 '+(t.browY-6)+' 82 '+t.browY" stroke="rgba(255,255,255,0.18)" stroke-width="1.2" fill="none" stroke-linecap="round"/>

        <!-- ── DRAMATIC EYESHADOW ── (wing shape extending to temples) -->
        <!-- Left shadow base — wide wing -->
        <path :d="'M34 56 Q37 '+(t.browY+4)+' 44 58 Q50 57 54 58 Q58 57 56 53 Q52 '+(t.browY+2)+' 44 '+(t.browY+3)+' Q38 55 34 56Z'" :fill="t.shadow1" opacity="0.7"/>
        <!-- Left shadow wing extension to temple -->
        <path :d="'M34 56 Q31 53 30 '+(t.browY+2)+' Q32 '+(t.browY+1)+' 37 '+(t.browY+3)+'Z'" :fill="t.shadow2" opacity="0.55"/>
        <!-- Left inner sparkle -->
        <circle cx="37" cy="56" r="1.8" :fill="pal.left" opacity="0.65" :filter="furl('sub')"/>

        <!-- Right shadow base -->
        <path :d="'M64 53 Q66 '+(t.browY+2)+' 76 '+(t.browY+3)+' Q82 55 86 56 Q82 53 80 '+(t.browY+1)+' Q74 56 66 58 Q62 57 64 53Z'" :fill="t.shadow1" opacity="0.7"/>
        <!-- Right shadow wing extension to temple -->
        <path :d="'M86 56 Q89 53 90 '+(t.browY+2)+' Q88 '+(t.browY+1)+' 83 '+(t.browY+3)+'Z'" :fill="t.shadow2" opacity="0.55"/>
        <!-- Right inner sparkle -->
        <circle cx="83" cy="56" r="1.8" :fill="pal.right" opacity="0.65" :filter="furl('sub')"/>

        <!-- ── EYES ── (larger, more expressive) -->
        <!-- Left eye white -->
        <ellipse cx="44" cy="59" rx="9.5" ry="7" fill="rgba(255,252,250,0.97)"/>
        <!-- Left iris (larger) -->
        <circle cx="44" cy="59" r="5.5" :fill="furl('ir')" :filter="furl('sub')"/>
        <!-- Left limbal ring -->
        <circle cx="44" cy="59" r="5.5" fill="none" :stroke="t.irisDark" stroke-width="0.8" opacity="0.6"/>
        <!-- Left pupil -->
        <circle cx="44" cy="59" r="2.8" fill="#040407"/>
        <!-- Left eye highlights -->
        <circle cx="41.5" cy="57" r="1.7" fill="white" opacity="0.9"/>
        <circle cx="47" cy="61.5" r="0.8" fill="white" opacity="0.55"/>
        <circle cx="46" cy="56.5" r="0.5" fill="white" opacity="0.4"/>
        <!-- Left eyeliner top (cat-eye) -->
        <path d="M35 57 Q44 53.8 53.5 57" :stroke="t.liner" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <!-- Left cat-eye wing -->
        <path d="M53.5 57 Q56 55.5 55.5 53.5" :stroke="t.liner" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <!-- Left lashes (longer, denser) -->
        <path d="M35.5 56.5 L33.5 53 M38 55 L36 51.5 M41 54.2 L39.5 50.8 M44 53.8 L44 50.2 M47 54.2 L48.5 50.8 M50 55.2 L52.5 52.5 M52.5 56.5 L55 54" :stroke="t.liner" stroke-width="1" stroke-linecap="round"/>
        <!-- Left lower lash line -->
        <path d="M35.5 62 Q44 65 52.5 62" :stroke="t.liner" stroke-width="0.7" fill="none" opacity="0.55"/>
        <!-- Left iris neon shine -->
        <circle cx="44" cy="59" r="5.5" :fill="pal.left" opacity="0.14"/>

        <!-- Right eye white -->
        <ellipse cx="76" cy="59" rx="9.5" ry="7" fill="rgba(255,252,250,0.97)"/>
        <!-- Right iris -->
        <circle cx="76" cy="59" r="5.5" :fill="furl('ir')" :filter="furl('sub')"/>
        <!-- Right limbal ring -->
        <circle cx="76" cy="59" r="5.5" fill="none" :stroke="t.irisDark" stroke-width="0.8" opacity="0.6"/>
        <!-- Right pupil -->
        <circle cx="76" cy="59" r="2.8" fill="#040407"/>
        <!-- Right eye highlights -->
        <circle cx="73.5" cy="57" r="1.7" fill="white" opacity="0.9"/>
        <circle cx="79" cy="61.5" r="0.8" fill="white" opacity="0.55"/>
        <circle cx="78" cy="56.5" r="0.5" fill="white" opacity="0.4"/>
        <!-- Right eyeliner (cat-eye) -->
        <path d="M66.5 57 Q76 53.8 85 57" :stroke="t.liner" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <!-- Right cat-eye wing -->
        <path d="M66.5 57 Q64 55.5 64.5 53.5" :stroke="t.liner" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <!-- Right lashes -->
        <path d="M84.5 56.5 L86.5 53 M82 55 L84 51.5 M79 54.2 L80.5 50.8 M76 53.8 L76 50.2 M73 54.2 L71.5 50.8 M70 55.2 L67.5 52.5 M67.5 56.5 L65 54" :stroke="t.liner" stroke-width="1" stroke-linecap="round"/>
        <!-- Right lower lash line -->
        <path d="M67.5 62 Q76 65 84.5 62" :stroke="t.liner" stroke-width="0.7" fill="none" opacity="0.55"/>
        <!-- Right iris neon shine -->
        <circle cx="76" cy="59" r="5.5" :fill="pal.right" opacity="0.14"/>

        <!-- ── NOSE ── (more defined) -->
        <!-- Nose bridge -->
        <path d="M57.5 68 Q56 72 56 76" :stroke="t.skinShadow" stroke-width="1.0" fill="none" opacity="0.35" stroke-linecap="round"/>
        <path d="M62.5 68 Q64 72 64 76" :stroke="t.skinShadow" stroke-width="1.0" fill="none" opacity="0.35" stroke-linecap="round"/>
        <!-- Nose tip -->
        <path d="M57 76 Q55.5 79 57.5 81 Q60 82.5 62.5 81 Q64.5 79 63 76" :stroke="t.skinShadow" stroke-width="1.3" fill="none" opacity="0.45" stroke-linecap="round"/>
        <path d="M57.5 81 Q60 83 62.5 81" :stroke="t.skinShadow" stroke-width="1.6" fill="none" opacity="0.55"/>
        <!-- Nose bridge highlight -->
        <path d="M60 66 L60 76" stroke="rgba(255,255,255,0.22)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <!-- Nose tip highlight -->
        <circle cx="60" cy="77" r="1.4" fill="rgba(255,255,255,0.22)"/>

        <!-- ── LIPS ── (full, glossy, defined cupid's bow) -->
        <!-- Lip base shadow -->
        <path d="M45 87 Q52 84 60 85.5 Q68 84 75 87 Q67 96 60 97.5 Q53 96 45 87Z" :fill="t.lip" opacity="0.88"/>
        <!-- Upper lip (cupid bow) -->
        <path d="M45 87 Q49 83.5 53.5 85.5 Q57 82.5 60 85.5 Q63 82.5 66.5 85.5 Q71 83.5 75 87 Q67 84 60 85.5 Q53 84 45 87Z" :fill="furl('lp')"/>
        <!-- Lower lip (fuller) -->
        <path d="M45 87 Q53 96 60 97.5 Q67 96 75 87 Q67 93.5 60 94.5 Q53 93.5 45 87Z" :fill="t.lip"/>
        <!-- Cupid bow highlight line -->
        <path d="M51 85.5 Q55.5 82.8 60 85 Q64.5 82.8 69 85.5" stroke="rgba(255,255,255,0.28)" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <!-- Lip gloss highlight center -->
        <path d="M50 90 Q60 87.5 70 90" stroke="rgba(255,255,255,0.45)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <!-- Lower lip gloss -->
        <ellipse cx="60" cy="93" rx="7" ry="2" fill="rgba(255,255,255,0.1)"/>

        <!-- ── FACE BLUSH ── -->
        <ellipse cx="35" cy="70" rx="9" ry="6" :fill="t.blush" opacity="0.22" transform="rotate(-18 35 70)"/>
        <ellipse cx="85" cy="70" rx="9" ry="6" :fill="t.blush" opacity="0.22" transform="rotate(18 85 70)"/>

        <!-- ── CYBERPUNK FACE CIRCUITS (variant) ── -->
        <g v-if="t.hasCyber" :stroke="pal.left" stroke-width="0.5" fill="none" opacity="0.6">
          <!-- Left cheek circuit -->
          <path d="M34 68 L33 71 L36 71"/>
          <rect x="35.5" y="70" width="2" height="2" :fill="pal.left" stroke="none" opacity="0.5"/>
          <path d="M33 71 L32 74 L35 74 L35 77"/>
          <circle cx="35" cy="77" r="0.8" :fill="pal.left" stroke="none"/>
          <!-- Right cheek circuit -->
          <path d="M86 68 L87 71 L84 71"/>
          <rect x="82.5" y="70" width="2" height="2" :fill="pal.right" stroke="none" opacity="0.5" :stroke-width="0"/>
          <path d="M87 71 L88 74 L85 74 L85 77" :stroke="pal.right"/>
          <circle cx="85" cy="77" r="0.8" :fill="pal.right" stroke="none"/>
        </g>

        <!-- ── NEON ATMOSPHERIC GLOW ── -->
        <!-- Left neon haze -->
        <ellipse cx="8" cy="58" rx="28" ry="38" :fill="pal.left" opacity="0.1" :filter="furl('sg')"/>
        <!-- Right neon haze -->
        <ellipse cx="112" cy="56" rx="28" ry="38" :fill="pal.right" opacity="0.09" :filter="furl('sg')"/>
        <!-- Top halo glow -->
        <ellipse cx="60" cy="20" rx="35" ry="18" :fill="pal.up" opacity="0.07" :filter="furl('haze')"/>

        <!-- Hologram scan lines -->
        <line x1="0" y1="44" x2="120" y2="44" :stroke="pal.left" stroke-width="0.3" opacity="0.1"/>
        <line x1="0" y1="60" x2="120" y2="60" :stroke="pal.right" stroke-width="0.3" opacity="0.07"/>
        <line x1="0" y1="76" x2="120" y2="76" :stroke="pal.left" stroke-width="0.2" opacity="0.05"/>

        <!-- NFT corner tag -->
        <text x="4" y="115" font-size="6.5" font-weight="900" :fill="pal.left" opacity="0.75" font-family="monospace">NFT</text>
        <!-- Hash ID top -->
        <text x="4" y="9" font-size="5" :fill="pal.right" opacity="0.55" font-family="monospace">#{{ hashId }}</text>
      </svg>

      <div class="holo-scan" :style="{ background: 'linear-gradient(90deg,transparent,'+pal.left+'80,'+pal.right+'60,transparent)' }"/>
      <div class="rgb-rim" :style="{ boxShadow: 'inset 0 0 16px '+pal.left+'55, inset 0 0 10px '+pal.right+'44' }"/>
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
const furl = (suffix) => `url(#${u.value}-${suffix})`

// Neon palette — cinematic color pairs
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
  const h1 = hash(s,'1'), h2 = hash(s,'2'), h3 = hash(s,'3')
  const h4 = hash(s,'4'), h5 = hash(s,'5'), h6 = hash(s,'6'), h7 = hash(s,'7')

  // Realistic skin tones
  const skins = [
    { skin:'#d4956a', skinHi:'#f8d5b0', skinMid:'#c4855a', skinShadow:'#7a4a30' },
    { skin:'#e8c09a', skinHi:'#fce8d0', skinMid:'#d8a880', skinShadow:'#9a6840' },
    { skin:'#8a6058', skinHi:'#b89080', skinMid:'#7a5048', skinShadow:'#3a2018' },
    { skin:'#c8a888', skinHi:'#eed8c0', skinMid:'#b89070', skinShadow:'#786050' },
    { skin:'#f0cca0', skinHi:'#fff0d8', skinMid:'#e0b880', skinShadow:'#a87840' },
    { skin:'#7a8898', skinHi:'#aabac8', skinMid:'#6a7888', skinShadow:'#3a4858' },
  ]
  const sk = skins[h1 % skins.length]

  // Rainbow/neon hair combos
  const hairSets = [
    { h1:'#ff2d78', h2:'#a855f7', h3:'#3b82f6', h4:'#00e5ff' },
    { h1:'#facc15', h2:'#f97316', h3:'#ef4444', h4:'#ec4899' },
    { h1:'#00e5ff', h2:'#3b82f6', h3:'#8b5cf6', h4:'#ec4899' },
    { h1:'#4ade80', h2:'#00e5ff', h3:'#818cf8', h4:'#f472b6' },
    { h1:'#f8fafc', h2:'#bae6fd', h3:'#94a3b8', h4:'#c084fc' },
    { h1:'#1e1e2e', h2:'#312e81', h3:'#4c1d95', h4:'#7c3aed' },
    { h1:'#ef4444', h2:'#f97316', h3:'#facc15', h4:'#4ade80' },
    { h1:'#f472b6', h2:'#e879f9', h3:'#c084fc', h4:'#818cf8' },
  ]
  const hr = hairSets[h2 % hairSets.length]

  // Jacket colors
  const jackets = [
    { jacket1:'#0a1628', jacket2:'#1e3a5f', jacket3:'#0d2240' },
    { jacket1:'#1a0a2e', jacket2:'#3d1d6b', jacket3:'#0d0618' },
    { jacket1:'#0a1a0a', jacket2:'#143d14', jacket3:'#051005' },
    { jacket1:'#2a1a08', jacket2:'#5a3a18', jacket3:'#1a0a04' },
    { jacket1:'#0a0a0a', jacket2:'#1a1a2e', jacket3:'#050510' },
    { jacket1:'#1a0a1a', jacket2:'#3d1a3d', jacket3:'#0a050a' },
  ]
  const jk = jackets[h3 % jackets.length]

  // Eye iris
  const irises = [
    { iris:'#1e40af', irisHi:'#93c5fd', irisDark:'#0f1f5a' },
    { iris:'#15803d', irisHi:'#4ade80', irisDark:'#052e16' },
    { iris:'#7c3aed', irisHi:'#c084fc', irisDark:'#3b0764' },
    { iris:'#b45309', irisHi:'#fbbf24', irisDark:'#451a03' },
    { iris:'#0e7490', irisHi:'#67e8f9', irisDark:'#082f49' },
    { iris:'#9f1239', irisHi:'#fda4af', irisDark:'#4c0519' },
  ]
  const ir = irises[h4 % irises.length]

  // Eyeshadow
  const shadows = [
    { shadow1:'#7c3aed', shadow2:'#db2777' },
    { shadow1:'#0891b2', shadow2:'#7c3aed' },
    { shadow1:'#b45309', shadow2:'#dc2626' },
    { shadow1:'#065f46', shadow2:'#0891b2' },
    { shadow1:'#be185d', shadow2:'#7c3aed' },
    { shadow1:'#1d4ed8', shadow2:'#065f46' },
    { shadow1:'#9333ea', shadow2:'#0ea5e9' },
    { shadow1:'#d97706', shadow2:'#ec4899' },
  ]
  const sh = shadows[h5 % shadows.length]

  // Lip colors
  const lips = [
    { lip:'#dc2626', lipHi:'#fca5a5' },
    { lip:'#be185d', lipHi:'#f9a8d4' },
    { lip:'#f97316', lipHi:'#fdba74' },
    { lip:'#7c3aed', lipHi:'#c4b5fd' },
    { lip:'#0e7490', lipHi:'#67e8f9' },
    { lip:'#991b1b', lipHi:'#fca5a5' },
  ]
  const lp = lips[h6 % lips.length]

  const browColors = ['#0e0e1a','#2d0f04','#1a0533','#0a1a0a','#080818','#1a0a08']
  const bgMids = ['#0c1022','#140c22','#0c1408','#1e0e08','#0c1820','#180c20']

  return {
    ...sk, ...hr, ...jk, ...ir, ...sh, ...lp,
    blush: pal.value.left,
    liner: '#05050f',
    browColor: browColors[h7 % browColors.length],
    browY: 50 - (h1 % 3),
    hairStyle: h2 % 5,
    hasCyber: (h3 % 3) === 0,
    hasGem: (h4 % 4) === 0,
    bgMid: bgMids[h3 % bgMids.length],
  }
})

const bg = computed(() => {
  const h = hash(props.username)
  const bgs = [
    `radial-gradient(ellipse at 28% 22%, ${pal.value.left}28, #020308)`,
    `radial-gradient(ellipse at 72% 22%, ${pal.value.right}28, #040208)`,
    `radial-gradient(ellipse at 50% 12%, ${pal.value.up}28, #030306)`,
    `radial-gradient(ellipse at 28% 28%, ${pal.value.left}22, #020204)`,
    `radial-gradient(ellipse at 62% 18%, ${pal.value.right}22, #040204)`,
  ]
  return bgs[h % bgs.length]
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
  z-index: 3; opacity: 0.65;
  animation: holo-scan 3s linear infinite;
}
.rgb-rim {
  position: absolute; inset: 0; border-radius: 50%;
  z-index: 4; pointer-events: none;
}
.soft-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1.5px solid rgba(74, 222, 128, 0.4);
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.22), inset 0 0 5px rgba(74, 222, 128, 0.1);
  pointer-events: none;
  animation: ring-breathe 3s ease-in-out infinite;
  z-index: 5;
}
@keyframes ring-breathe {
  0%,100% { opacity: 0.5; box-shadow: 0 0 6px rgba(74,222,128,0.15); }
  50%      { opacity: 1;   box-shadow: 0 0 16px rgba(74,222,128,0.4); }
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
  10%  { opacity: 0.65; }
  90%  { opacity: 0.65; }
  100% { top: 95%; opacity: 0; }
}
</style>
