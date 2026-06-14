<template>
    <div class="nova-app">

      <!-- ══ BACKGROUND ORBS ══ -->
      <div class="nova-bg-orb nova-bg-orb--1"></div>
      <div class="nova-bg-orb nova-bg-orb--2"></div>
      <div class="nova-bg-orb nova-bg-orb--3"></div>

      <!-- ══ HEADER ══ -->
      <header class="nova-header">
        <div class="nova-brand-wrap">
          <div class="nova-brand"><img src="https://ik.imagekit.io/rbok01qam/Brand%20Logo%20/IMG_20260605_215459.png?tr=f-auto" alt="NovaBett" style="height:34px;width:auto;object-fit:contain;display:block;" /></div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <template v-if="!isLoggedIn">
            <button @click="openAuth('login')" class="glass-btn-auth glass-btn-auth--primary" style="height:32px;padding:0 12px;font-size:11px;">လောဂ်အင်</button>
            <button @click="openAuth('register')" class="glass-btn-auth" style="height:32px;padding:0 12px;font-size:11px;">မှတ်ပုံတင်ပါ</button>
          </template>
          <template v-else>
            <button @click="toggleLanguage" class="glass-btn-sm" style="color:rgba(20,184,166,0.9);font-size:11px;font-weight:700;padding:5px 10px;">{{ currentLang === 'en' ? '🇲🇲 မြန်မာ' : '🇬🇧 EN' }}</button>
          </template>
        </div>
      </header>

      <!-- Search -->
      <div class="nova-search-bar">
        <input v-model="searchQuery" type="text" placeholder="ဂိမ်းရှာပါ..." class="nova-input" style="padding-left:36px;" />
        <svg style="position:absolute;left:26px;top:50%;transform:translateY(-50%);" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <button @click="activeCategory='fav'" style="position:absolute;right:26px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:2px;-webkit-tap-highlight-color:transparent;">