<template>
  <div id="app">
    <AppHeader
      :tabs="tabs"
      :active-tab="activeTab"
      :theme="theme"
      :locale="locale"
      :language-button-label="languageButtonLabel"
      @switch-tab="switchTab"
      @toggle-theme="toggleTheme"
      @toggle-locale="toggleLocale"
    />

    <main class="main-content container">
      <Transition name="page" mode="out-in">
        <component :is="currentComponent" :key="currentComponent" />
      </Transition>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import { useI18n } from './composables/useI18n'
import { useTheme } from './composables/useTheme'

export default {
  name: 'App',
  components: { AppHeader, AppFooter, Home, About },
  setup() {
    const activeTab = ref('home')
    const { toggleLocale, messages, locale } = useI18n()
    const { theme, toggleTheme } = useTheme()

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
      theme,
      activeTab,
      tabs,
      currentComponent,
      switchTab,
      toggleLocale,
      toggleTheme,
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

.main-content {
  flex: 1;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.page-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
