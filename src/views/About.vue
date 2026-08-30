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
      <span class="contact-item">
        <svg class="contact-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
        </svg>
        <span class="contact-label">GitHub</span>
      </span>
      <a :href="'https://github.com/' + aboutText.github" target="_blank" class="contact-link">{{ aboutText.github }}</a>
      <span class="sep">/</span>
      <span class="contact-item">
        <svg class="contact-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2Zm0 1.5a.25.25 0 0 0-.25.25v.764l7.003 4.292a.75.75 0 0 0 .494 0L15.5 4.514V3.75a.25.25 0 0 0-.25-.25H1.75Zm13.5 3.696L8.852 9.94a1.25 1.25 0 0 1-1.704 0L1.25 7.196v5.054c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V7.196Z"/>
        </svg>
        <span class="contact-label">Email</span>
      </span>
      <a :href="'mailto:' + aboutText.email" class="contact-link">{{ aboutText.email }}</a>
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
  gap: 0.45rem;
}

.contact-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-right: 0.2rem;
}

.contact-icon {
  width: 1.05em;
  height: 1.05em;
  color: var(--text-weak);
  flex-shrink: 0;
}

.contact-label {
  color: var(--text-mute);
  font-family: var(--font-ui);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.sep {
  color: var(--border-strong);
  margin: 0 0.1rem;
}

.contact-link {
  color: var(--text);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.contact-link:hover {
  color: var(--text-weak);
}

@media (max-width: 768px) {
  .page-title { font-size: 1.6rem; }
}
</style>
