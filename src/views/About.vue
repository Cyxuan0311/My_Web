<template>
  <div class="about">
    <section class="section">
      <h1 class="page-title">{{ aboutText.pageTitle }}</h1>
      <p class="page-desc">{{ aboutText.pageDesc }}</p>
    </section>

    <section class="section">
      <div class="bio" v-html="aboutText.bio"></div>
    </section>

    <section class="section contact-row">
      <span class="contact-label">GitHub</span>
      <a :href="'https://github.com/' + aboutText.github" target="_blank">{{ aboutText.github }}</a>
      <span class="sep">/</span>
      <span class="contact-label">Email</span>
      <a :href="'mailto:' + aboutText.email">{{ aboutText.email }}</a>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'About',
  setup() {
    const { messages } = useI18n()
    const aboutText = computed(() => messages.value.about)
    return { aboutText }
  }
}
</script>

<style scoped>
.about {
  max-width: 680px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 0.4rem;
}

.page-desc {
  color: var(--text-weak);
  font-size: 1.05rem;
  margin-bottom: 0;
}

.bio {
  font-size: 1rem;
  line-height: 1.9;
}

.bio :deep(p) {
  margin-bottom: 0.75rem;
}

.bio :deep(strong) {
  font-weight: 700;
}

.contact-row {
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.contact-label {
  color: var(--text-mute);
  font-family: var(--font-ui);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.sep {
  color: var(--border-strong);
}

.contact-row a {
  color: var(--text);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.contact-row a:hover {
  color: var(--text-weak);
}

@media (max-width: 768px) {
  .page-title { font-size: 1.6rem; }
}
</style>
