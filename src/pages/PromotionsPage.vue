<template>
  <div class="nova-page-bg min-h-screen text-gray-200 pb-20 relative overflow-hidden">
    <div class="nova-bg-orb nova-bg-orb--1"></div>
    <div class="nova-bg-orb nova-bg-orb--2"></div>
    <div class="nova-bg-orb nova-bg-orb--3"></div>
    <header class="sticky top-0 z-30 bg-transparent backdrop-blur-sm border-b border-white/5 px-4 py-2">
      <h2 class="text-lg font-bold text-center text-cyan-300">Promotions</h2>
    </header>
    <div class="px-4 pt-4 space-y-6">
      
      <!-- Lucky Wheel -->
      <div class="bg-[#111d26] border border-cyan-500/10 rounded-2xl p-5">
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-bold text-cyan-300">Lucky Wheel</h3>
          <span class="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm">{{ spinsLeft }} Spins</span>
        </div>

        <!-- Wheel Container -->
        <div class="flex justify-center my-6">
          <div class="relative w-56 h-56">
            <!-- Outer glow ring -->
            <div class="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 rounded-full blur-md opacity-50 animate-pulse"></div>
            
            <!-- Wheel (6 segments) -->
            <div ref="wheelEl" class="w-full h-full rounded-full bg-transparent border-4 border-cyan-500/50 shadow-2xl relative flex items-center justify-center transition-transform duration-[2000ms] ease-out overflow-hidden"
              :style="{ transform: `rotate(${wheelRotation}deg)` }">
              
              <!-- Conic gradient for 6 segments:
                   Segments: 30K (0-60deg), 50K (60-120), 70K (120-180), 100K (180-240), Empty (240-300), Empty (300-360) -->
              <div class="absolute inset-0" style="background: conic-gradient(
                #00bcd4 0deg 60deg,
                #00838f 60deg 120deg,
                #00bcd4 120deg 180deg,
                #006064 180deg 240deg,
                #37474f 240deg 300deg,
                #455a64 300deg 360deg
              );"></div>
              
              <!-- Labels (inside wheel) -->
              <span class="absolute text-white font-bold text-xs drop-shadow-lg" style="top:15%; right:20%; transform: rotate(30deg);">30K</span>
              <span class="absolute text-white font-bold text-xs drop-shadow-lg" style="bottom:15%; right:20%; transform: rotate(-30deg);">50K</span>
              <span class="absolute text-white font-bold text-xs drop-shadow-lg" style="bottom:15%; left:20%; transform: rotate(30deg);">70K</span>
              <span class="absolute text-white font-bold text-xs drop-shadow-lg" style="top:15%; left:20%; transform: rotate(-30deg);">100K</span>
              <!-- Empty markers -->
              <span class="absolute text-gray-400 font-bold text-[10px]" style="top:30%; right:8%; transform: rotate(60deg);">Empty</span>
              <span class="absolute text-gray-400 font-bold text-[10px]" style="bottom:30%; left:8%; transform: rotate(-60deg);">Empty</span>
            </div>
            
            <!-- Pointer triangle (fixed) -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-[16px] border-l-transparent border-r-transparent border-t-cyan-300 drop-shadow-lg z-10"></div>
            
            <!-- Spin button (center) -->
            <button @click="spinWheel" :disabled="spinning || spinsLeft <= 0" class="absolute inset-0 z-20 flex items-center justify-center">
              <span class="text-3xl bg-black/50 rounded-full p-3">🎡</span>
            </button>
          </div>
        </div>

        <!-- Result message (only if server-side returns win) -->
        <div v-if="lastWin" class="text-center mt-3 animate-bounce">
          <p class="text-cyan-400 font-bold text-lg">You won {{ lastWin.toLocaleString() }} Ks!</p>
          <p class="text-gray-400 text-xs">Wagering x10 required</p>
        </div>

        <div class="mt-4 text-center text-xs text-gray-500">
          Deposit to earn more spins
        </div>
      </div>

      <!-- Referral Code -->
      <div class="bg-[#111d26] border border-cyan-500/10 rounded-2xl p-5">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-bold text-white text-sm">Referral Code</h3>
            <p class="text-xs text-gray-500 mt-1">Your Code - <span class="text-cyan-300 font-semibold">{{ referralCode }}</span></p>
          </div>
          <button @click="copyReferral" class="nova-glass-btn text-cyan-300 px-3 py-1.5 rounded-lg text-xs">{{ copied ? 'Copied!' : 'Copy' }}</button>
        </div>
        <div class="mt-3 bg-black/20 p-3 rounded-xl space-y-1.5">
          <p class="text-cyan-400 text-xs font-semibold mb-1">Steps to Get Bonus</p>
          <p class="text-gray-300 text-xs"><span class="bg-cyan-500/20 text-cyan-300 rounded-full w-4 h-4 inline-flex items-center justify-center text-[10px] mr-1.5">1</span> Invite friends.</p>
          <p class="text-gray-300 text-xs"><span class="bg-cyan-500/20 text-cyan-300 rounded-full w-4 h-4 inline-flex items-center justify-center text-[10px] mr-1.5">2</span> They register & play.</p>
          <p class="text-gray-300 text-xs"><span class="bg-cyan-500/20 text-cyan-300 rounded-full w-4 h-4 inline-flex items-center justify-center text-[10px] mr-1.5">3</span> Earn commission based on turnover.</p>
        </div>
      </div>

      <!-- Active Bonuses (No mock data) -->
      <div class="bg-[#111d26] border border-cyan-500/10 rounded-2xl p-5">
        <h3 class="font-bold text-white mb-4">My Bonuses</h3>
        <div class="text-center text-gray-500 py-4">
          <p>No active bonuses yet.</p>
          <p class="text-xs mt-1">Deposit to claim your first bonus!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const storedUsername = localStorage.getItem('sb_username') || 'YOURNAME'
const referralCode = computed(() => storedUsername.toUpperCase())

const copied = ref(false)
const copyReferral = () => {
  const link = `https://novabett.com/?dl=${referralCode.value}`
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link).then(() => { copied.value = true; setTimeout(() => copied.value = false, 2000) })
  } else {
    prompt('Copy manually:', link)
  }
}

// Lucky Wheel - server-side will determine wins, for now just spin animation
const spinsLeft = ref(0) // Start with 0 spins; spins are earned via deposit (to be implemented)
const spinning = ref(false)
const lastWin = ref(null)
const wheelRotation = ref(0)

const spinWheel = () => {
  if (spinning.value || spinsLeft.value <= 0) return
  spinning.value = true
  spinsLeft.value--

  // Random spin for animation effect (still client-side for animation, but win will be server-side later)
  const winIndex = Math.floor(Math.random() * 6)
  const segmentCenter = 30 + winIndex * 60
  const currentMod = wheelRotation.value % 360
  let delta = segmentCenter - currentMod
  if (delta < 0) delta += 360
  const finalRotation = wheelRotation.value + 360 * 5 + delta
  wheelRotation.value = finalRotation

  // Placeholder for server-side determination (to be integrated)
  setTimeout(() => {
    // For now, no real win; server will set lastWin after processing
    spinning.value = false
    // lastWin.value = null (server will emit via realtime or we call an edge function)
  }, 2000)
}

// No active bonuses (real data will come from backend)
</script>

<style scoped>
.nova-page-bg { background: linear-gradient(160deg,#08102a 0%,#0d1a36 20%,#0c1828 40%,#091420 60%,#07101a 80%,#050c14 100%); min-height:100vh; color:#fff; overscroll-behavior:contain; -webkit-tap-highlight-color:rgba(0,0,0,0); }
.nova-bg-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; }
.nova-bg-orb--1 { width:300px; height:300px; top:-80px; left:-80px; background:radial-gradient(circle,rgba(34,197,94,0.13) 0%,rgba(34,197,94,0.04) 50%,transparent 70%); animation:orb-drift1 12s ease-in-out infinite; }
.nova-bg-orb--2 { width:340px; height:340px; top:38%; right:-110px; background:radial-gradient(circle,rgba(99,102,241,0.12) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); animation:orb-drift2 16s ease-in-out infinite; }
.nova-bg-orb--3 { width:240px; height:240px; bottom:70px; left:-20px; background:radial-gradient(circle,rgba(168,85,247,0.1) 0%,rgba(236,72,153,0.05) 50%,transparent 70%); animation:orb-drift3 14s ease-in-out infinite; }
@keyframes orb-drift1 { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(12px,-18px) scale(1.08);} }
@keyframes orb-drift2 { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-14px,16px) scale(1.06);} }
@keyframes orb-drift3 { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(10px,-12px) scale(1.1);} }
</style>
