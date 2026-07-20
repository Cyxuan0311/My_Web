<template>
  <div class="list-card" @click="$emit('open', note)">
    <h3 class="list-card-title">{{ note.title }}</h3>
    <p class="list-card-desc">{{ note.description }}</p>
    <div class="list-card-meta">
      <span></span>
      <span class="read-more">{{ readMoreText }} →</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteCard',
  props: {
    note: { type: Object, required: true },
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

.read-more {
  margin-left: auto;
  color: var(--text-strong);
  font-weight: 500;
  font-family: var(--font-ui);
  font-size: 0.9rem;
}

.list-card:hover .read-more { text-decoration: underline; }
</style>
