<template>
  <div class="tui-blog-page">
    <div class="tui-blog-content">
      <div class="tui-section-header">
        <span class="tui-header-decoration">┌─</span>
        <span class="tui-section-title">BLOG</span>
        <span class="tui-header-decoration">─┐</span>
      </div>
      <div class="tui-blog-posts">
        <article class="tui-blog-post" v-for="post in blogPosts" :key="post.id" @click="readMore(post.id)">
          <div class="tui-post-header">
            <span class="tui-header-decoration">┌─</span>
            <span class="tui-post-title">{{ post.title }}</span>
            <span class="tui-header-decoration">─┐</span>
          </div>
          <div class="tui-post-content">
            <div class="tui-post-meta-line">
              <span class="tui-prompt">$</span>
              <span class="tui-meta-label">DATE:</span>
              <span class="tui-meta-value">{{ post.date }}</span>
              <span class="tui-prompt">|</span>
              <span class="tui-meta-label">CATEGORY:</span>
              <span class="tui-meta-value">{{ post.category }}</span>
            </div>
            <div class="tui-post-excerpt-line">
              <span class="tui-prompt">·</span>
              <span class="tui-post-excerpt">{{ post.excerpt }}</span>
            </div>
            <div class="tui-post-stats">
              <div class="tui-stat-item">
                <span class="tui-prompt">→</span>
                <EyeIcon class="tui-stat-icon" />
                <span class="tui-stat-value">{{ post.views }}</span>
              </div>
              <div class="tui-stat-item">
                <span class="tui-prompt">→</span>
                <ChatBubbleLeftIcon class="tui-stat-icon" />
                <span class="tui-stat-value">{{ post.comments }}</span>
              </div>
              <div class="tui-stat-item">
                <span class="tui-prompt">→</span>
                <HeartIcon class="tui-stat-icon" />
                <span class="tui-stat-value">{{ post.likes }}</span>
              </div>
            </div>
            <div class="tui-post-footer">
              <button class="tui-read-btn" @click.stop="readMore(post.id)">
                <span class="tui-prompt">→</span>
                <span>{{ blogText.readMore }}</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { 
  EyeIcon, 
  ChatBubbleLeftIcon, 
  HeartIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Blog',
  components: {
    EyeIcon,
    ChatBubbleLeftIcon,
    HeartIcon,
    CalendarIcon,
    TagIcon
  },
  setup() {
    const { messages } = useI18n()
    const blogText = computed(() => messages.value.blog)
    const blogPosts = computed(() => blogText.value.posts)
    
    const readMore = (postId) => {
      // 触发导航到博客详情页的事件
      window.dispatchEvent(new CustomEvent('navigate-to-blog-detail', {
        detail: { postId }
      }))
    }

    return {
      blogPosts,
      blogText,
      readMore
    }
  }
}
</script>

<style scoped>
.tui-blog-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  color: #c9d1d9;
}

/* TUI 通用样式 */
.tui-header-decoration {
  color: #58a6ff;
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.6;
  margin: 0 0.5rem;
}

.tui-section-title {
  color: #58a6ff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 
    0 0 10px rgba(88, 166, 255, 0.5),
    0 0 20px rgba(88, 166, 255, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(135deg, #58a6ff 0%, #79c0ff 50%, #58a6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: title-shimmer 3s ease-in-out infinite;
}

@keyframes title-shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.tui-section-header {
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #30363d;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
  margin-right: 0.5rem;
  font-size: 0.85rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.1rem;
  color: #6c757d;
}

.tui-blog-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tui-blog-posts {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tui-blog-post {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.tui-blog-post:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-post-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}

.tui-post-title {
  color: #58a6ff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.tui-post-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tui-post-meta-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.tui-meta-label {
  color: #8b949e;
  font-weight: 600;
}

.tui-meta-value {
  color: #58a6ff;
}

.tui-post-excerpt-line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding-left: 1rem;
}

.tui-post-excerpt {
  color: #8b949e;
  font-size: 0.9rem;
  line-height: 1.6;
  flex: 1;
}

.tui-post-stats {
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.tui-stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.tui-stat-icon {
  width: 16px;
  height: 16px;
  color: #58a6ff;
}

.tui-stat-value {
  color: #c9d1d9;
  font-variant-numeric: tabular-nums;
}

.tui-post-footer {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #30363d;
}

.tui-read-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  color: #8b949e;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tui-read-btn:hover {
  color: #58a6ff;
  border-color: #58a6ff;
  background: #21262d;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
}

.stat-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.blog-post:hover .stat-icon {
  color: #3182ce;
}

.read-btn {
  background: linear-gradient(135deg, #3182ce, #20c997);
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(49, 130, 206, 0.2);
}

.read-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
}

@media (max-width: 768px) {
  .blog-page {
    padding: 1rem;
  }
  
  .post-content-wrapper {
    padding: 1.25rem 1rem;
  }
  
  .post-title {
    font-size: 1.2rem;
  }
  
  .post-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .read-btn {
    width: 100%;
    text-align: center;
  }
  
  .post-meta {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .post-stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
