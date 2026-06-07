<template>
  <div class="net-root">

    <!-- Header -->
    <div class="net-header">
      <router-link to="/agent" class="net-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </router-link>
      <div>
        <div class="net-title">အေးဂျင့်ကွန်ရက်</div>
        <div class="net-sub">Commission Network Diagram</div>
      </div>
    </div>

    <!-- Diagram scroll area -->
    <div class="net-body">

      <!-- ═══════════════════════════════════
           ROW 0: Agent A (You)
      ═══════════════════════════════════ -->
      <div class="net-row net-row--top">
        <div class="net-node net-node--a">
          <div class="net-avatar net-avatar--a">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(245,158,11,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(245,158,11,0.7)"/></svg>
            <div class="net-badge-a">A</div>
          </div>
          <div class="net-info">
            <div class="net-name">မင်း (A)</div>
            <div class="net-line">Direct Bet: <span class="hl-y">500+3000+2000 = 5500</span></div>
            <div class="net-line">5500 × 0.15% = <span class="hl-g">8.25</span></div>
            <div class="net-line">Override: <span class="hl-g">0.60+1.20 = 1.79</span></div>
            <div class="net-total">💰 9.45 Ks / session</div>
          </div>
        </div>
      </div>

      <!-- Arrow down from A -->
      <div class="net-arrows-row net-arrows--3">
        <div class="net-vline"></div>
        <div class="net-hline"></div>
        <div class="net-vline"></div>
        <div class="net-hline"></div>
        <div class="net-vline"></div>
      </div>

      <!-- ═══════════════════════════════════
           ROW 1: B1, B2, B3
      ═══════════════════════════════════ -->
      <div class="net-row net-row--b">

        <!-- B1 -->
        <div class="net-node net-node--b">
          <div class="net-avatar net-avatar--b">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(96,165,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(96,165,250,0.7)"/></svg>
            <div class="net-badge-b">B1</div>
          </div>
          <div class="net-info">
            <div class="net-name">B1</div>
            <div class="net-line">Bet A: <span class="hl-b">500</span></div>
            <div class="net-line">500 × 0.15%</div>
            <div class="net-total">= <span class="hl-g">0.75 Ks</span></div>
          </div>
        </div>

        <!-- B2 -->
        <div class="net-node net-node--b">
          <div class="net-avatar net-avatar--b">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(96,165,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(96,165,250,0.7)"/></svg>
            <div class="net-badge-b">B2</div>
          </div>
          <div class="net-info">
            <div class="net-name">B2</div>
            <div class="net-line">Bet A: <span class="hl-b">3,000</span></div>
            <div class="net-line">3000 × 0.15%</div>
            <div class="net-total">= <span class="hl-g">4.50 Ks</span></div>
          </div>
        </div>

        <!-- B3 -->
        <div class="net-node net-node--b">
          <div class="net-avatar net-avatar--b">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(96,165,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(96,165,250,0.7)"/></svg>
            <div class="net-badge-b">B3</div>
          </div>
          <div class="net-info">
            <div class="net-name">B3</div>
            <div class="net-line">Bet A: <span class="hl-b">2,000</span></div>
            <div class="net-line">2000 × 0.15%</div>
            <div class="net-total">= <span class="hl-g">3 Ks</span></div>
          </div>
        </div>

      </div>

      <!-- Arrows from B to C -->
      <div class="net-arrows-row net-arrows--c">
        <!-- B1 → C1, C2 -->
        <div class="net-sub-arrows">
          <div class="net-vline"></div>
          <div class="net-hline net-hline--sm"></div>
          <div class="net-vline"></div>
        </div>
        <!-- B2: no children -->
        <div class="net-sub-arrows net-sub-arrows--empty">
          <div class="net-vline net-vline--fade"></div>
        </div>
        <!-- B3 → C3 -->
        <div class="net-sub-arrows net-sub-arrows--single">
          <div class="net-vline"></div>
        </div>
      </div>

      <!-- ═══════════════════════════════════
           ROW 2: C1, C2, (gap), C3
      ═══════════════════════════════════ -->
      <div class="net-row net-row--c">

        <!-- C1 -->
        <div class="net-node net-node--c">
          <div class="net-avatar net-avatar--c">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(167,139,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(167,139,250,0.7)"/></svg>
            <div class="net-badge-c">C1</div>
          </div>
          <div class="net-info">
            <div class="net-name c-name">C1</div>
            <div class="net-line">Bet B1: <span class="hl-p">1,000</span></div>
            <div class="net-line">× 0.09%</div>
            <div class="net-total c-total">= <span class="hl-g">0.9 Ks</span></div>
          </div>
        </div>

        <!-- C2 -->
        <div class="net-node net-node--c">
          <div class="net-avatar net-avatar--c">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(167,139,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(167,139,250,0.7)"/></svg>
            <div class="net-badge-c">C2</div>
          </div>
          <div class="net-info">
            <div class="net-name c-name">C2</div>
            <div class="net-line">Bet B1: <span class="hl-p">2,000</span></div>
            <div class="net-line">× 0.15%</div>
            <div class="net-total c-total">= <span class="hl-g">1.8 Ks</span></div>
          </div>
        </div>

        <!-- Gap for B2 (no children) -->
        <div class="net-gap"></div>

        <!-- C3 -->
        <div class="net-node net-node--c net-node--c3">
          <div class="net-avatar net-avatar--c">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="rgba(167,139,250,0.9)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(167,139,250,0.7)"/></svg>
            <div class="net-badge-c">C3</div>
          </div>
          <div class="net-info">
            <div class="net-name c-name">C3</div>
            <div class="net-line">Bet B3: <span class="hl-p">20,000</span></div>
            <div class="net-line">× 0.45%</div>
            <div class="net-total c-total c-total--big">= <span class="hl-g">90 Ks</span></div>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════
           Legend / Key
      ═══════════════════════════════════ -->
      <div class="net-legend">
        <div class="net-legend-title">📊 Commission အဆင့်များ</div>
        <div class="net-legend-row">
          <span class="leg-dot leg-dot--a"></span>
          <span class="leg-label">A (သင်) — ကွန်ရက်အကြီးဆုံး လုပ်ကြေး</span>
        </div>
        <div class="net-legend-row">
          <span class="leg-dot leg-dot--b"></span>
          <span class="leg-label">B Level — တိုက်ရိုက်ဖိတ်ခေါ်သူများ (Direct)</span>
        </div>
        <div class="net-legend-row">
          <span class="leg-dot leg-dot--c"></span>
          <span class="leg-label">C Level — B ဖိတ်ခေါ်သူများ (Indirect)</span>
        </div>
        <div class="net-legend-note">
          ⚡ C Level ကြီးလေ — သင် Override Commission ရလေ!
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* ═══════════ ROOT ═══════════ */
.net-root {
  min-height: 100vh;
  background: linear-gradient(160deg, #0e0c2e 0%, #1a1650 50%, #0d1525 100%);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* ═══════════ HEADER ═══════════ */
.net-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(14, 12, 46, 0.88);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding: 13px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.net-back {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  flex-shrink: 0;
}
.net-title {
  font-size: 14px;
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.3px;
}
.net-sub {
  font-size: 9px;
  color: rgba(255,255,255,0.35);
  margin-top: 1px;
}

/* ═══════════ BODY ═══════════ */
.net-body {
  flex: 1;
  padding: 16px 12px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* ═══════════ ROWS ═══════════ */
.net-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
}
.net-row--top {
  justify-content: center;
}
.net-row--b {
  justify-content: center;
  gap: 6px;
}
.net-row--c {
  justify-content: center;
  gap: 4px;
}

/* ═══════════ NODE ═══════════ */
.net-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 10px 10px;
  border-radius: 14px;
  position: relative;
}

/* A node */
.net-node--a {
  background: linear-gradient(135deg, rgba(245,158,11,0.18), rgba(217,119,6,0.08));
  border: 1.5px solid rgba(245,158,11,0.55);
  box-shadow: 0 0 20px rgba(245,158,11,0.18), 0 4px 20px rgba(0,0,0,0.4);
  width: min(320px, 90vw);
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
}

/* B nodes */
.net-node--b {
  background: rgba(96,165,250,0.07);
  border: 1.2px solid rgba(96,165,250,0.35);
  box-shadow: 0 0 12px rgba(96,165,250,0.1);
  flex: 1;
  max-width: 110px;
  min-width: 95px;
}

/* C nodes */
.net-node--c {
  background: rgba(167,139,250,0.07);
  border: 1px solid rgba(167,139,250,0.3);
  flex: 1;
  max-width: 90px;
  min-width: 78px;
}
.net-node--c3 {
  background: rgba(167,139,250,0.12);
  border-color: rgba(167,139,250,0.5);
  box-shadow: 0 0 10px rgba(167,139,250,0.15);
}

/* ═══════════ AVATAR ═══════════ */
.net-avatar {
  position: relative;
  flex-shrink: 0;
}
.net-avatar--a {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(245,158,11,0.15);
  border: 2px solid rgba(245,158,11,0.6);
  display: flex; align-items: center; justify-content: center;
}
.net-avatar--b {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(96,165,250,0.12);
  border: 1.5px solid rgba(96,165,250,0.45);
  display: flex; align-items: center; justify-content: center;
}
.net-avatar--c {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(167,139,250,0.12);
  border: 1.5px solid rgba(167,139,250,0.45);
  display: flex; align-items: center; justify-content: center;
}

/* Badges */
.net-badge-a {
  position: absolute;
  bottom: -4px; right: -4px;
  background: #f59e0b;
  color: #000;
  font-size: 8px;
  font-weight: 900;
  border-radius: 4px;
  padding: 1px 4px;
  line-height: 1.3;
}
.net-badge-b {
  position: absolute;
  bottom: -4px; right: -4px;
  background: #60a5fa;
  color: #000;
  font-size: 7px;
  font-weight: 900;
  border-radius: 4px;
  padding: 1px 3px;
  line-height: 1.3;
}
.net-badge-c {
  position: absolute;
  bottom: -3px; right: -4px;
  background: #a78bfa;
  color: #000;
  font-size: 6px;
  font-weight: 900;
  border-radius: 3px;
  padding: 1px 3px;
  line-height: 1.3;
}

/* ═══════════ INFO TEXT ═══════════ */
.net-info {
  flex: 1;
  min-width: 0;
}
.net-name {
  font-size: 11px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 3px;
}
.c-name {
  font-size: 9.5px;
}
.net-line {
  font-size: 9px;
  color: rgba(255,255,255,0.55);
  line-height: 1.5;
}
.net-total {
  margin-top: 4px;
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  background: rgba(0,0,0,0.25);
  border-radius: 5px;
  padding: 3px 6px;
  display: inline-block;
}
.c-total {
  font-size: 9px;
  padding: 2px 5px;
}
.c-total--big {
  background: rgba(167,139,250,0.15);
  border: 1px solid rgba(167,139,250,0.3);
}

/* Highlight colors */
.hl-y { color: #fbbf24; font-weight: 700; }
.hl-g { color: #4ade80; font-weight: 700; }
.hl-b { color: #60a5fa; font-weight: 700; }
.hl-p { color: #a78bfa; font-weight: 700; }

/* ═══════════ ARROWS ═══════════ */
.net-arrows-row {
  display: flex;
  align-items: flex-start;
  width: min(320px, 90vw);
  height: 28px;
  position: relative;
  margin: 2px 0;
}

.net-arrows--3 {
  justify-content: space-between;
  padding: 0 40px;
}

.net-vline {
  width: 2px;
  height: 28px;
  background: linear-gradient(to bottom, rgba(245,158,11,0.5), rgba(96,165,250,0.4));
  border-radius: 1px;
  flex-shrink: 0;
}
.net-vline--fade {
  background: rgba(255,255,255,0.1);
}
.net-hline {
  flex: 1;
  height: 2px;
  background: rgba(245,158,11,0.35);
  align-self: flex-end;
  margin-bottom: 0;
}

/* Arrow connector for B→C level */
.net-arrows--c {
  display: flex;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 0 4px;
  height: 24px;
  margin: 2px 0;
}
.net-sub-arrows {
  display: flex;
  align-items: flex-end;
  gap: 0;
  flex: 2;
  justify-content: center;
  height: 24px;
}
.net-sub-arrows--empty {
  flex: 1;
  justify-content: center;
}
.net-sub-arrows--single {
  flex: 1;
  justify-content: center;
}
.net-hline--sm {
  width: 40px;
  height: 2px;
  background: rgba(96,165,250,0.3);
  flex: 0 0 40px;
  margin-bottom: 0;
  align-self: flex-end;
}
.net-gap {
  flex: 1;
}

/* ═══════════ LEGEND ═══════════ */
.net-legend {
  margin-top: 24px;
  width: min(340px, 95vw);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 14px 16px;
}
.net-legend-title {
  font-size: 11px;
  font-weight: 800;
  color: rgba(255,255,255,0.75);
  margin-bottom: 10px;
}
.net-legend-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
}
.leg-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.leg-dot--a { background: #f59e0b; box-shadow: 0 0 6px rgba(245,158,11,0.6); }
.leg-dot--b { background: #60a5fa; box-shadow: 0 0 6px rgba(96,165,250,0.5); }
.leg-dot--c { background: #a78bfa; box-shadow: 0 0 6px rgba(167,139,250,0.5); }
.leg-label {
  font-size: 10px;
  color: rgba(255,255,255,0.55);
  line-height: 1.4;
}
.net-legend-note {
  margin-top: 10px;
  font-size: 10px;
  color: #4ade80;
  background: rgba(74,222,128,0.07);
  border: 1px solid rgba(74,222,128,0.18);
  border-radius: 8px;
  padding: 8px 10px;
  line-height: 1.5;
}
</style>
