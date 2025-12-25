<template>
  <footer class="tui-footer">
    <div class="tui-footer-container">
      <div class="tui-footer-links">
        <div
          class="tui-link-group"
          v-for="group in footerText.linkGroups"
          :key="group.title"
        >
          <h3 class="tui-group-title">{{ group.title }}</h3>
          <div class="tui-link-items">
            <a
              v-for="link in group.links"
              :key="link.label + link.href"
              :href="link.href"
              class="tui-footer-link"
            >
              <span class="tui-prompt">→</span>
              <span class="tui-link-text">{{ link.label }}</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="tui-footer-bottom">
        <div class="tui-footer-text">
          <p v-for="(line, index) in footerText.bottom" :key="index" class="tui-footer-line">
            <span class="tui-prompt">$</span>
            <span class="tui-footer-content-text">{{ line }}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Footer',
  setup() {
    const { messages } = useI18n()
    const footerText = computed(() => messages.value.footer)
    return { footerText }
  }
}
</script>

<style scoped>
.tui-footer {
  background: #0d1117;
  color: #c9d1d9;
  margin-top: auto;
  border-top: 1px solid #30363d;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.tui-footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.tui-footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding-bottom: 2rem;
}

.tui-link-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tui-group-title {
  color: #58a6ff;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #30363d;
}

.tui-link-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tui-footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8b949e;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  padding: 0.25rem 0;
}

.tui-footer-link:hover {
  color: #58a6ff;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 500;
  font-size: 0.8rem;
}

.tui-link-text {
  color: inherit;
  transition: color 0.2s ease;
}

.tui-footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid #30363d;
  text-align: center;
  color: #8b949e;
}

.tui-footer-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.tui-footer-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  margin: 0;
  color: #8b949e;
}

.tui-footer-content-text {
  color: #8b949e;
}

@media (max-width: 768px) {
  .tui-footer-container {
    padding: 1.5rem;
  }
  
  .tui-footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding-bottom: 1.5rem;
  }
  
  .tui-footer-bottom {
    padding-top: 1.5rem;
  }
}

@media (max-width: 480px) {
  .tui-footer-container {
    padding: 1rem;
  }
  
  .tui-footer-links {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .tui-group-title {
    font-size: 0.85rem;
  }
  
  .tui-footer-link {
    font-size: 0.8rem;
  }
  
  .tui-footer-line {
    font-size: 0.75rem;
  }
}
</style>
