<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          <div
            class="link-group"
            v-for="group in footerText.linkGroups"
            :key="group.title"
          >
            <h4>{{ group.title }}</h4>
            <a
              v-for="link in group.links"
              :key="link.label + link.href"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p v-for="(line, index) in footerText.bottom" :key="index">{{ line }}</p>
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
.footer {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%);
  color: #e2e8f0;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 3rem 0;
}


.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  align-items: start;
}

.link-group {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.link-group h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 0;
  color: #f7fafc;
}

.link-group a {
  display: block;
  color: #cbd5e0;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
}

.link-group a:hover {
  color: #3182ce;
  transform: translateX(4px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2rem 0;
  text-align: center;
  color: #a0aec0;
  background: rgba(0, 0, 0, 0.2);
}

.footer-bottom p {
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
