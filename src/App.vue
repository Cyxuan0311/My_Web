<template>
  <div id="app">
    <header class="site-header">
      <div class="header-inner container">
        <a class="site-logo" href="#" @click.prevent="switchTab('home')">Frames</a>
        <nav class="main-nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav-btn"
            :class="{ active: activeTab === tab.id }"
            @click="switchTab(tab.id)"
          >{{ tab.name }}</button>
          <button class="lang-btn" @click="toggleLocale" :title="languageButtonLabel">
            <span class="lang-indicator" :class="locale === 'zh' ? 'on' : ''">中</span>
            <span class="lang-indicator" :class="locale === 'en' ? 'on' : ''">EN</span>
          </button>
        </nav>
      </div>
    </header>

    <main class="main-content container">
      <component :is="currentComponent" />
    </main>

    <footer class="site-footer container">
      <p>&copy; 2025 Frames</p>
    </footer>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import { useI18n } from './composables/useI18n'

export default {
  name: 'App',
  components: { Home, About },
  setup() {
    const activeTab = ref('home')
    const { toggleLocale, messages, locale } = useI18n()

    const tabs = computed(() => messages.value.app.tabs)
    const languageButtonLabel = computed(() => messages.value.app.languageButton)

    const currentComponent = computed(() => {
      return activeTab.value === 'home' ? 'Home' : 'About'
    })

    const switchTab = (tabId) => {
      activeTab.value = tabId
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return {
      activeTab,
      tabs,
      currentComponent,
      switchTab,
      toggleLocale,
      languageButtonLabel,
      locale
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-logo {
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  color: #000;
}

.site-logo:hover {
  color: #000;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-btn {
  background: none;
  border: none;
  font-family: 'Times New Roman', Times, Georgia, serif;
  font-size: 1.05rem;
  color: #666;
  cursor: pointer;
  padding: 0.3rem 0.75rem;
  transition: color 0.2s;
}

.nav-btn:hover {
  color: #000;
}

.nav-btn.active {
  color: #000;
  font-weight: 700;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 0.75rem;
  padding: 0.2rem 0.4rem;
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Times New Roman', Times, Georgia, serif;
  font-size: 0.8rem;
  transition: border-color 0.2s;
}

.lang-btn:hover {
  border-color: #aaa;
}

.lang-indicator {
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  color: #bbb;
  transition: color 0.15s, background 0.15s;
  line-height: 1.4;
}

.lang-indicator.on {
  color: #000;
  background: #f0f0f0;
  font-weight: 600;
}

.main-content {
  flex: 1;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.site-footer {
  padding: 2rem 0;
  border-top: 1px solid #e5e5e5;
  text-align: center;
  font-size: 0.9rem;
  color: #999;
}

@media (max-width: 768px) {
  .site-header {
    padding: 1rem 0;
  }
  .site-logo {
    font-size: 1.2rem;
  }
  .nav-btn {
    font-size: 0.95rem;
    padding: 0.25rem 0.5rem;
  }
  .main-content {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
