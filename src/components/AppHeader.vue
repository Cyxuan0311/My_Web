<template>
  <header class="site-header">
    <div class="header-inner container">
      <a class="site-logo" href="#" @click.prevent="$emit('switch-tab', 'home')">Frames</a>
      <nav class="main-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="nav-btn"
          :class="{ active: activeTab === tab.id }"
          @click="$emit('switch-tab', tab.id)"
        >{{ tab.name }}</button>

        <button
          class="icon-btn"
          @click="$emit('toggle-theme')"
          :title="theme === 'light' ? 'Dark mode' : 'Light mode'"
          aria-label="Toggle theme"
        >
          <svg v-if="theme === 'light'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>

        <button class="lang-btn" @click="$emit('toggle-locale')" :title="languageButtonLabel" aria-label="Toggle language">
          <span class="lang-indicator" :class="locale === 'zh' ? 'on' : ''">中</span>
          <span class="lang-divider"></span>
          <span class="lang-indicator" :class="locale === 'en' ? 'on' : ''">EN</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    tabs: { type: Array, required: true },
    activeTab: { type: String, required: true },
    theme: { type: String, required: true },
    locale: { type: String, required: true },
    languageButtonLabel: { type: String, default: '' }
  },
  emits: ['switch-tab', 'toggle-theme', 'toggle-locale']
}
</script>

<style scoped>
.site-header {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-logo {
  font-family: var(--font-ui);
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-strong);
}

.site-logo:hover {
  color: var(--text-strong);
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-btn {
  background: none;
  border: none;
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-weak);
  cursor: pointer;
  padding: 0.3rem 0.75rem;
  transition: color 0.2s;
}

.nav-btn:hover {
  color: var(--text-strong);
}

.nav-btn.active {
  color: var(--text-strong);
  font-weight: 600;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  width: 30px;
  height: 30px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-weak);
  transition: border-color 0.2s, color 0.2s;
}

.icon-btn:hover {
  border-color: var(--text-mute);
  color: var(--text-strong);
}

.icon {
  width: 16px;
  height: 16px;
  display: block;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0;
  margin-left: 0.4rem;
  padding: 0;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font-ui);
  font-size: 0.78rem;
  overflow: hidden;
  transition: border-color 0.2s;
}

.lang-btn:hover {
  border-color: var(--text-mute);
}

.lang-indicator {
  padding: 0.25rem 0.45rem;
  color: var(--text-inactive);
  transition: color 0.15s, background 0.15s;
  line-height: 1.4;
}

.lang-indicator.on {
  color: var(--text-strong);
  background: var(--bg-mute);
  font-weight: 600;
}

.lang-divider {
  width: 1px;
  height: 14px;
  background: var(--border);
}

@media (max-width: 768px) {
  .site-header {
    padding: 1rem 0;
  }
  .site-logo {
    font-size: 1.2rem;
  }
  .nav-btn {
    font-size: 0.9rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>
