<template>
  <div class="list-card" @click="$emit('open', project)">
    <h3 class="list-card-title">{{ project.name }}</h3>
    <p class="list-card-desc">{{ project.description }}</p>
    <div class="list-card-meta">
      <span class="lang-tag">{{ project.language }}</span>
      <span v-if="showLoading" class="star-count is-loading" title="Fetching stars...">
        <span class="star-spinner"></span>
      </span>
      <a
        v-else-if="starLink"
        class="star-count"
        :href="starLink"
        target="_blank"
        rel="noopener noreferrer"
        title="View on GitHub"
        @click.stop
      >★ {{ starText }}</a>
      <span v-else-if="starText" class="star-count">★ {{ starText }}</span>
      <span class="read-more">{{ readMoreText }} →</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { formatStars } from '../composables/useGitHubStars'

export default {
  name: 'ProjectCard',
  props: {
    project: { type: Object, required: true },
    liveStars: { type: Number, default: undefined },
    githubOwner: { type: String, default: '' },
    starsLoading: { type: Boolean, default: false },
    readMoreText: { type: String, default: 'Read' }
  },
  emits: ['open'],
  setup(props) {
    // API 加载中且尚未拿到数据时显示 loading 占位
    const showLoading = computed(
      () => props.starsLoading && props.liveStars === undefined
    )
    // 优先实时数据，API 不可用时回退到本地配置
    const starText = computed(() => {
      const count = props.liveStars !== undefined
        ? props.liveStars
        : (props.project.stars || 0)
      return count ? formatStars(count) : ''
    })
    // 点击 star 可跳转到对应 GitHub 仓库
    const starLink = computed(() => {
      if (!props.githubOwner || !props.project.name) return ''
      return `https://github.com/${props.githubOwner}/${props.project.name}`
    })

    return { showLoading, starText, starLink }
  }
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
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-weak);
  text-decoration: none;
  padding: 0.05rem 0.45rem;
  border-radius: 3px;
  transition: background 0.15s, color 0.15s;
}

a.star-count:hover {
  color: var(--text-strong);
  background: var(--bg-mute);
}

.star-spinner {
  width: 0.72em;
  height: 0.72em;
  border: 2px solid var(--border-strong);
  border-top-color: var(--text-weak);
  border-radius: 50%;
  display: inline-block;
  animation: star-spin 0.7s linear infinite;
}

@keyframes star-spin {
  to { transform: rotate(360deg); }
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
