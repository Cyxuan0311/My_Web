<template>
  <div class="list-card" @click="$emit('open', project)">
    <h3 class="list-card-title">{{ project.name }}</h3>
    <p class="list-card-desc">{{ project.description }}</p>
    <div class="list-card-meta">
      <span class="lang-tag">{{ project.language }}</span>
      <span v-if="project.stars" class="star-count">★ {{ project.stars }}</span>
      <span class="read-more">{{ readMoreText }} →</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: { type: Object, required: true },
    readMoreText: { type: String, default: 'Read' }
  },
  emits: ['open']
}
</script>

<style scoped>
.list-card {
  padding: 1.15rem 1.5rem;
  background: var(--bg);
  cursor: pointer;
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
  min-height: 110px;
  display: flex;
  flex-direction: column;
}

.list-card:hover {
  background: var(--bg-soft);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.list-card-title {
  font-size: 1.15rem;
  margin-bottom: 0.2rem;
  font-weight: 700;
  color: var(--text-strong);
}

.list-card-desc {
  color: var(--text-weak);
  font-size: 0.9rem;
  flex: 1;
  margin-bottom: 0;
}

.list-card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.82rem;
  color: var(--text-mute);
  margin-top: 0.6rem;
}

.lang-tag {
  display: inline-block;
  background: var(--bg-mute);
  padding: 0.05rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: var(--text-weak);
}

.star-count {
  color: var(--text-weak);
}

.read-more {
  margin-left: auto;
  color: var(--text-strong);
  font-weight: 500;
  font-family: var(--font-ui);
  font-size: 0.9rem;
}

.list-card:hover .read-more { text-decoration: underline; }
</style>
