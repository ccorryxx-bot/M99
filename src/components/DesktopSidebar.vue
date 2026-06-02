<template>
  <aside class="ds-sidebar">
    <!-- Logo -->
    <div class="ds-logo-area">
      <div class="ds-logo-icon">
        <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
          <defs>
            <filter id="ds-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <polygon points="20,4 36,14 36,26 20,36 4,26 4,14" stroke="#22c55e" stroke-width="2" fill="rgba(34,197,94,0.1)" filter="url(#ds-glow)"/>
          <polygon points="20,10 30,16 30,24 20,30 10,24 10,16" stroke="#22c55e" stroke-width="1.5" fill="rgba(34,197,94,0.06)"/>
          <circle cx="20" cy="20" r="3" fill="#22c55e" filter="url(#ds-glow)"/>
          <line x1="20" y1="10" x2="20" y2="14" stroke="#22c55e" stroke-width="1.2" opacity="0.7"/>
          <line x1="20" y1="26" x2="20" y2="30" stroke="#22c55e" stroke-width="1.2" opacity="0.7"/>
          <line x1="10" y1="16" x2="14" y2="18" stroke="#22c55e" stroke-width="1.2" opacity="0.7"/>
          <line x1="30" y1="16" x2="26" y2="18" stroke="#22c55e" stroke-width="1.2" opacity="0.7"/>
          <line x1="10" y1="24" x2="14" y2="22" stroke="#22c55e" stroke-width="1.2" opacity="0.7"/>
          <line x1="30" y1="24" x2="26" y2="22" stroke="#22c55e" stroke-width="1.2" opacity="0.7"/>
        </svg>
      </div>
      <div class="ds-logo-text">
        <span class="ds-brand">NOVA</span><span class="ds-brand-accent">BETT</span>
      </div>
    </div>

    <div class="ds-divider"></div>

    <!-- Navigation -->
    <nav class="ds-nav">
      <router-link to="/home" class="ds-nav-item" :class="{active: route.path==='/home'}">
        <span class="ds-nav-icon">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </span>
        <span class="ds-nav-label">ပင်မ</span>
        <span v-if="route.path==='/home'" class="ds-active-dot"></span>
      </router-link>

      <router-link to="/promotions" class="ds-nav-item" :class="{active: route.path==='/promotions'}">
        <span class="ds-nav-icon">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </span>
        <span class="ds-nav-label">ပရိုမို</span>
        <span v-if="route.path==='/promotions'" class="ds-active-dot"></span>
      </router-link>

      <!-- Agent — highlighted -->
      <router-link to="/agent" class="ds-nav-item ds-nav-agent" :class="{active: route.path==='/agent'}">
        <span class="ds-nav-icon ds-agent-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <ellipse cx="12" cy="14" rx="8" ry="5" stroke="#f59e0b" stroke-width="1.5" fill="rgba(245,158,11,0.1)"/>
            <circle cx="12" cy="9" r="4" stroke="#f59e0b" stroke-width="1.5" fill="rgba(245,158,11,0.1)"/>
            <path d="M8 8 C6 4 4 2 2 1" stroke="#06b6d4" stroke-width="1" stroke-dasharray="3 2" stroke-linecap="round"/>
            <path d="M16 8 C18 4 20 2 22 1" stroke="#ec4899" stroke-width="1" stroke-dasharray="3 2" stroke-linecap="round"/>
            <path d="M12 5 C12 3 12 1 12 0" stroke="#a855f7" stroke-width="1" stroke-dasharray="3 2" stroke-linecap="round"/>
            <circle cx="2" cy="1" r="1.5" fill="#06b6d4"/>
            <circle cx="22" cy="1" r="1.5" fill="#ec4899"/>
            <circle cx="12" cy="0" r="1.8" fill="#a855f7"/>
          </svg>
        </span>
        <span class="ds-nav-label">အေးဂျင့်</span>
        <span v-if="route.path==='/agent'" class="ds-active-dot"></span>
      </router-link>

      <router-link to="/service" class="ds-nav-item" :class="{active: route.path==='/service'}">
        <span class="ds-nav-icon">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </span>
        <span class="ds-nav-label">ဆက်သွယ်</span>
        <span v-if="route.path==='/service'" class="ds-active-dot"></span>
      </router-link>

      <router-link to="/account" class="ds-nav-item" :class="{active: route.path==='/account'}">
        <span class="ds-nav-icon">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </span>
        <span class="ds-nav-label">အကောင့်</span>
        <span v-if="route.path==='/account'" class="ds-active-dot"></span>
      </router-link>
    </nav>

    <div class="ds-divider"></div>

    <!-- Quick Info -->
    <div class="ds-info-box">
      <div class="ds-info-row">
        <span class="ds-info-dot ds-dot-green"></span>
        <span class="ds-info-text">Live Servers Online</span>
      </div>
      <div class="ds-info-row" style="margin-top:6px;">
        <span class="ds-info-dot ds-dot-cyan"></span>
        <span class="ds-info-text">24/7 Support</span>
      </div>
    </div>

    <!-- Bottom brand area -->
    <div class="ds-footer">
      <p class="ds-footer-text">iW99 © 2025</p>
      <p class="ds-footer-sub">Powered by 🔒 Secure</p>
    </div>

    <!-- Ambient glow orbs -->
    <div class="ds-orb ds-orb--1"></div>
    <div class="ds-orb ds-orb--2"></div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.ds-sidebar {
  display: none;
}

@media (min-width: 768px) {
  .ds-sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 230px;
    z-index: 300;
    background: linear-gradient(180deg, #07111e 0%, #060d18 50%, #050b14 100%);
    border-right: 1px solid rgba(34,197,94,0.1);
    box-shadow: 4px 0 32px rgba(0,0,0,0.6), 1px 0 0 rgba(255,255,255,0.03);
    overflow: hidden;
    padding: 0;
  }
}

@media (min-width: 1280px) {
  .ds-sidebar {
    width: 260px;
  }
}

/* Logo */
.ds-logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px 20px;
}
.ds-logo-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(34,197,94,0.15);
}
.ds-logo-text {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1;
}
.ds-brand { color: rgba(255,255,255,0.92); }
.ds-brand-accent { color: #22c55e; }

.ds-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(34,197,94,0.15), transparent);
  margin: 0 16px;
  flex-shrink: 0;
}

/* Nav */
.ds-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 12px;
  flex: 1;
}

.ds-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 12px;
  text-decoration: none;
  color: rgba(255,255,255,0.38);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
  position: relative;
  border: 1px solid transparent;
  cursor: pointer;
}
.ds-nav-item:hover {
  color: rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.06);
}
.ds-nav-item.active {
  color: #22c55e;
  background: rgba(34,197,94,0.08);
  border-color: rgba(34,197,94,0.18);
  box-shadow: 0 0 16px rgba(34,197,94,0.08);
}
.ds-nav-item.active .ds-nav-icon svg {
  filter: drop-shadow(0 0 5px rgba(34,197,94,0.6));
}

/* Agent special style */
.ds-nav-agent {
  margin-top: 4px;
  margin-bottom: 4px;
}
.ds-nav-agent.active {
  color: #f59e0b;
  background: rgba(245,158,11,0.08);
  border-color: rgba(245,158,11,0.2);
  box-shadow: 0 0 16px rgba(245,158,11,0.08);
}
.ds-nav-agent:hover {
  color: #fbbf24;
}
.ds-agent-icon-wrap {
  color: #f59e0b;
}

.ds-nav-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ds-nav-label { flex: 1; }

.ds-active-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  box-shadow: 0 0 8px currentColor;
}

/* Info box */
.ds-info-box {
  margin: 0 12px 12px;
  padding: 12px 14px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  flex-shrink: 0;
}
.ds-info-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ds-info-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  animation: ds-blink 2s ease-in-out infinite;
}
.ds-dot-green { background: #22c55e; box-shadow: 0 0 6px #22c55e; }
.ds-dot-cyan  { background: #06b6d4; box-shadow: 0 0 6px #06b6d4; animation-delay: 0.7s; }
@keyframes ds-blink {
  0%,100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
.ds-info-text {
  font-size: 11px;
  color: rgba(255,255,255,0.35);
  font-weight: 500;
}

/* Footer */
.ds-footer {
  padding: 14px 20px 20px;
  flex-shrink: 0;
}
.ds-footer-text {
  font-size: 11px;
  color: rgba(255,255,255,0.2);
  font-weight: 600;
  margin: 0 0 2px;
}
.ds-footer-sub {
  font-size: 10px;
  color: rgba(255,255,255,0.14);
  margin: 0;
}

/* Ambient orbs */
.ds-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
}
.ds-orb--1 {
  width: 180px;
  height: 180px;
  top: -40px;
  left: -60px;
  background: radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%);
  animation: ds-orb-drift 10s ease-in-out infinite;
}
.ds-orb--2 {
  width: 160px;
  height: 160px;
  bottom: 60px;
  right: -50px;
  background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
  animation: ds-orb-drift 13s ease-in-out infinite reverse;
}
@keyframes ds-orb-drift {
  0%,100% { transform: translate(0,0); }
  50%      { transform: translate(8px,-12px); }
}
</style>
