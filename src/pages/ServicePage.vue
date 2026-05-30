<template>
  <div class="nova-page-bg min-h-screen text-gray-200 pb-20 relative overflow-hidden">
    <div class="nova-bg-orb nova-bg-orb--1"></div>
    <div class="nova-bg-orb nova-bg-orb--2"></div>
    <div class="nova-bg-orb nova-bg-orb--3"></div>
    <header class="sticky top-0 z-30 bg-transparent backdrop-blur-sm border-b border-white/5 px-4 py-2">
      <h2 class="text-lg font-bold text-center text-cyan-300">Customer Service</h2>
    </header>

    <div class="px-4 pt-6 space-y-3 relative z-10">
      <!-- Live Chat 1 -->
      <div @click="openChat(chatUrl1)" class="flex items-center gap-3 bg-[#111d26] hover:bg-[#111d26]/80 border border-cyan-500/10 rounded-xl p-3 cursor-pointer active:scale-98 transition-all">
        <span class="text-2xl">🤖</span>
        <span class="text-sm font-semibold">Live Chat 1</span>
      </div>

      <!-- Live Chat 2 -->
      <div @click="openChat(chatUrl2)" class="flex items-center gap-3 bg-[#111d26] hover:bg-[#111d26]/80 border border-cyan-500/10 rounded-xl p-3 cursor-pointer active:scale-98 transition-all">
        <span class="text-2xl">🤖</span>
        <span class="text-sm font-semibold">Live Chat 2</span>
      </div>

      <!-- Telegram Channel -->
      <a :href="telegramLink" target="_blank" class="flex items-center gap-3 bg-[#111d26] hover:bg-[#111d26]/80 border border-cyan-500/10 rounded-xl p-3 transition-all">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#2AABEE"/><path d="M6.527 11.895l-.024.007c-.427.16-.665.292-.665.48 0 .18.22.308.625.442l.13.043 2.654.884c.14.047.29.07.44.07.56 0 1.12-.28 1.56-.76l2.23-2.38c.15-.16.32-.24.48-.22.11.01.21.07.26.16.06.13.05.28-.03.44-.14.26-.37.52-.68.79l-1.3 1.14c-.33.29-.5.58-.5.88 0 .17.06.35.16.54l.92 1.7c.18.33.36.6.55.8.16.17.32.26.48.26.1 0 .2-.03.29-.09.12-.08.22-.23.28-.44l.47-2.02.97-4.17c.07-.31.12-.63.13-.93 0-.35-.08-.62-.22-.79-.15-.18-.38-.27-.66-.27-.26 0-.53.08-.81.2l-9.3 3.88z" fill="#fff"/></svg>
        <span class="text-sm font-semibold">Telegram Channel</span>
      </a>

      <!-- Viber Channel -->
      <a :href="viberLink" target="_blank" class="flex items-center gap-3 bg-[#111d26] hover:bg-[#111d26]/80 border border-cyan-500/10 rounded-xl p-3 transition-all">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#7360f2"/><path d="M12.03 5.5c-1.8 0-3.27.48-4.37 1.43-1.04.89-1.59 2.17-1.59 3.74 0 1.58.49 2.81 1.37 3.62.18.17.49.24.79.17.3-.06.5-.22.57-.44l.16-.58c.05-.19-.01-.36-.17-.48-.44-.37-.68-.86-.7-1.48 0-1.25.99-2.27 2.22-2.27.82 0 1.47.28 1.88.81.37.48.56 1.09.56 1.77 0 .89-.24 1.63-.7 2.13-.38.41-.72.6-1.01.55-.35-.05-.56-.25-.59-.55 0-.19.06-.44.16-.72l.36-1.07c.13-.35.19-.62.19-.82 0-.26-.08-.46-.24-.59-.16-.13-.38-.19-.65-.19-.5 0-.91.26-1.19.75-.28.49-.42 1.15-.42 1.98 0 1.33.48 2.4 1.37 3.12.89.71 2.07 1.08 3.42 1.08 1.97 0 3.54-.65 4.57-1.89 1-1.24 1.54-2.9 1.54-4.61-.01-2.34-.8-4.16-2.33-5.36-1.47-1.15-3.48-1.74-5.88-1.74z" fill="#fff"/></svg>
        <span class="text-sm font-semibold">Viber Channel</span>
      </a>

      <!-- Other Services -->
      <div class="pt-2">
        <p class="text-xs text-gray-500 mb-2 px-1">Other Services</p>
        <div class="space-y-2">
          <button @click="comingSoon" class="nova-glass-menu-item w-full flex items-center gap-3 rounded-xl p-3 text-left">
            <span class="text-lg">📖</span><span class="text-sm font-semibold">User Guide</span>
          </button>
          <button @click="comingSoon" class="nova-glass-menu-item w-full flex items-center gap-3 rounded-xl p-3 text-left">
            <span class="text-lg">🔒</span><span class="text-sm font-semibold">Privacy Policy</span>
          </button>
          <button @click="comingSoon" class="nova-glass-menu-item w-full flex items-center gap-3 rounded-xl p-3 text-left">
            <span class="text-lg">⚠️</span><span class="text-sm font-semibold">Responsible Gaming</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const chatUrl1 = 'https://example.com/chatbot-1'
const chatUrl2 = 'https://example.com/chatbot-2'
const telegramLink = 'https://t.me/novabett_official'
const viberLink = 'viber://chat?number=+959123456789'

const openChat = (url) => window.open(url, '_blank')
const comingSoon = () => alert('Coming Soon')
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
