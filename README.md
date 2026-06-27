# M99 — NovaBett Player Platform

> Vue 3 + Vite + Supabase + Vercel · Mobile-first betting & gaming platform

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Vue 3 (Composition API) |
| Build Tool | Vite 8 |
| UI Library | Vant 4 + TailwindCSS 4 |
| State Management | Pinia 3 |
| Routing | Vue Router 5 |
| Database / Auth | Supabase |
| Animations | GSAP 3 |
| Slider / Carousel | Swiper 11 |
| i18n | vue-i18n 12 |
| Serverless API | Vercel Functions |
| Node Version | ^20.19.0 or >=22.12.0 |

---

## 📁 Project Structure

```
M99/
├── api/                          # Vercel Serverless Functions
│   └── admin/
│       ├── process-tx.js         # Process transaction handler
│       └── tx-detail.js          # Transaction detail fetcher
│
├── public/                       # Static public assets
│
├── src/
│   ├── components/               # Reusable Vue Components
│   │   ├── BottomNav.vue         # Mobile bottom navigation bar
│   │   ├── CategoryGamePanel.vue # Game category browsing panel
│   │   ├── DailySignInModal.vue  # Daily check-in reward modal
│   │   ├── DepositModal.vue      # Deposit flow modal
│   │   ├── DesktopSidebar.vue    # Desktop sidebar navigation
│   │   ├── KYCModal.vue          # KYC identity verification modal
│   │   ├── NftAvatar.vue         # NFT-based user avatar display
│   │   ├── PersonalStatsModal.vue# User personal stats modal
│   │   ├── ProviderGamePanel.vue # Game provider browsing panel
│   │   ├── SpinWheelModal.vue    # Lucky spin wheel modal
│   │   ├── TxStatusTracker.vue   # Transaction status tracker
│   │   ├── WithdrawModal.vue     # Withdrawal flow modal
│   │   └── admin/                # Admin-specific components
│   │
│   ├── composables/              # Vue Composition API composables
│   │
│   ├── i18n/                     # Internationalization (vue-i18n)
│   │
│   ├── pages/                    # Route-level Page Components
│   │   ├── HomePage.vue          # Main landing / lobby page
│   │   ├── AccountPage.vue       # User account & profile page
│   │   ├── AdminDashboard.vue    # Admin control panel
│   │   ├── AgentDashboard.vue    # Agent management dashboard
│   │   ├── DailyBonusPage.vue    # Daily bonus rewards page
│   │   ├── DeviceSessionsPage.vue# Active device sessions page
│   │   ├── ExchangeCodePage.vue  # Promo / exchange code page
│   │   ├── PromotionsPage.vue    # Promotions & offers page
│   │   └── ReferralPage.vue      # Referral program page
│   │
│   ├── router/                   # Vue Router configuration
│   │
│   ├── App.vue                   # Root Vue component
│   ├── main.js                   # App entry point
│   ├── main.css                  # Global CSS styles
│   └── supabase.js               # Supabase client initialization
│
├── index.html                    # HTML entry point
├── vite.config.js                # Vite build configuration
├── vercel.json                   # Vercel deployment config
├── jsconfig.json                 # JS path alias config
├── .nvmrc                        # Node version pin
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment

Deployed on **Vercel**. The `api/` directory is automatically served as Vercel Serverless Functions.

Environment variables required (set in Vercel dashboard):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Any admin API secrets used in `api/admin/`

---

## 🗂️ Architecture Overview

```
User Browser
    │
    ▼
Vue 3 SPA (Vite)
    │
    ├──► Vue Router (client-side routing)
    ├──► Pinia Store (global state)
    ├──► Supabase JS Client (auth + database)
    └──► Vercel Functions (api/admin/*)
              │
              ▼
          Supabase (PostgreSQL + Auth + Realtime)
```

---

## 📝 Notes

- This README was auto-generated via **Claude GitHub MCP** on 2026-06-28.
- Update this file as the project evolves.

---

## ✅ MCP Access Log

| Date | Action | Status |
|---|---|---|
| 2026-06-28 | Read Access Check | ✅ Confirmed |
| 2026-06-28 | Write Access Check (Commit via Claude MCP) | ✅ Confirmed 🎯 |
