<template>
  <div class="blog-page">
    <div class="blog-content">
      <div class="blog-posts">
        <article class="blog-post" v-for="post in blogPosts" :key="post.id" @click="readMore(post.id)">
          <div class="post-content-wrapper">
            <div class="post-main">
              <div class="post-header">
                <h2 class="post-title">{{ post.title }}</h2>
                <div class="post-meta">
                  <span class="post-date">
                    <CalendarIcon class="meta-icon" />
                    {{ post.date }}
                  </span>
                  <span class="post-category">
                    <TagIcon class="meta-icon" />
                    {{ post.category }}
                  </span>
                </div>
              </div>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <div class="post-footer">
                <div class="post-stats">
                  <span class="stat-item">
                    <EyeIcon class="stat-icon" />
                    {{ post.views }}
                  </span>
                  <span class="stat-item">
                    <ChatBubbleLeftIcon class="stat-icon" />
                    {{ post.comments }}
                  </span>
                  <span class="stat-item">
                    <HeartIcon class="stat-icon" />
                    {{ post.likes }}
                  </span>
                </div>
                <button class="read-btn" @click.stop="readMore(post.id)">{{ blogText.readMore }}</button>
              </div>
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
.blog-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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

.blog-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.blog-post {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  margin-bottom: 0;
}

.blog-post:first-child {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.blog-post:last-child {
  border-bottom: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.blog-post::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #3182ce, #20c997);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.blog-post:hover {
  background: #f9fafb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.blog-post:hover::before {
  opacity: 1;
}

.post-content-wrapper {
  padding: 1.75rem 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.post-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.blog-post:hover .post-title {
  color: #3182ce;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.post-category {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: linear-gradient(135deg, #3182ce, #20c997);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.meta-icon {
  width: 14px;
  height: 14px;
  color: #9ca3af;
  flex-shrink: 0;
}

.post-category .meta-icon {
  color: rgba(255, 255, 255, 0.9);
}

.post-excerpt {
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
}

.post-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: color 0.3s ease;
}

.blog-post:hover .stat-item {
  color: #4b5563;
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
