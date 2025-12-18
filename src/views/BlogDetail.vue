<template>
  <div class="blog-detail-page">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <p class="loading-text">加载中...</p>
    </div>
    
    <div v-else-if="error" class="error-container">
      <p class="error-text">{{ error }}</p>
      <button class="back-btn" @click="goBack">返回博客列表</button>
    </div>
    
    <div v-else class="blog-detail-content">
      <!-- 返回按钮 -->
      <button class="back-to-list-btn" @click="goBack">
        <ArrowLeftIcon class="back-icon" />
        返回博客列表
      </button>
      
      <!-- 文章头部 -->
      <header class="blog-header">
        <h1 class="blog-title">{{ post?.title }}</h1>
        <div class="blog-meta">
          <span class="meta-item">
            <CalendarIcon class="meta-icon" />
            {{ post?.date }}
          </span>
          <span class="meta-item">
            <TagIcon class="meta-icon" />
            {{ post?.category }}
          </span>
          <span class="meta-item">
            <EyeIcon class="meta-icon" />
            {{ post?.views }} 阅读
          </span>
          <span class="meta-item">
            <ChatBubbleLeftIcon class="meta-icon" />
            {{ post?.comments }} 评论
          </span>
          <span class="meta-item">
            <HeartIcon class="meta-icon" />
            {{ post?.likes }} 点赞
          </span>
        </div>
      </header>
      
      <!-- 文章内容 -->
      <article class="blog-article">
        <div class="markdown-body" v-html="htmlContent"></div>
      </article>
      
      <!-- 文章底部操作 -->
      <footer class="blog-footer">
        <div class="blog-actions">
          <button class="action-btn like-btn">
            <HeartIcon class="action-icon" />
            点赞 ({{ post?.likes }})
          </button>
          <button class="action-btn comment-btn">
            <ChatBubbleLeftIcon class="action-icon" />
            评论 ({{ post?.comments }})
          </button>
          <button class="action-btn share-btn">
            <ArrowLeftIcon class="action-icon" style="transform: rotate(180deg);" />
            分享
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { marked } from 'marked'
import { 
  ArrowLeftIcon,
  CalendarIcon,
  TagIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'BlogDetail',
  components: {
    ArrowLeftIcon,
    CalendarIcon,
    TagIcon,
    EyeIcon,
    ChatBubbleLeftIcon,
    HeartIcon
  },
  setup() {
    const loading = ref(true)
    const error = ref(null)
    const post = ref(null)
    const markdownContent = ref('')
    const htmlContent = ref('')
    const postId = ref(null)
    
    // 配置marked选项
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false
    })
    
    // 从URL或事件中获取博客ID
    const getPostId = () => {
      // 从URL hash中获取
      const hash = window.location.hash
      const match = hash.match(/blog-detail\/(\d+)/)
      if (match) {
        return parseInt(match[1])
      }
      // 从localStorage中获取（通过事件传递）
      const storedId = localStorage.getItem('currentBlogId')
      if (storedId) {
        localStorage.removeItem('currentBlogId')
        return parseInt(storedId)
      }
      return null
    }
    
    // 加载博客内容
    const loadBlogContent = async () => {
      try {
        loading.value = true
        error.value = null
        
        const id = getPostId()
        if (!id) {
          throw new Error('未找到博客ID')
        }
        postId.value = id
        
        // 获取博客基本信息
        const { messages: i18nMessages } = useI18n()
        const blogPosts = i18nMessages.value.blog.posts
        const foundPost = blogPosts.find(p => p.id === id)
        
        if (!foundPost) {
          throw new Error('未找到该博客')
        }
        
        post.value = foundPost
        
        // 加载MD文件
        try {
          const response = await fetch(`/blog/${id}.md`)
          if (!response.ok) {
            throw new Error('文件不存在')
          }
          markdownContent.value = await response.text()
          htmlContent.value = marked(markdownContent.value)
        } catch (err) {
          // 如果文件不存在，使用默认内容
          markdownContent.value = `# ${foundPost.title}\n\n${foundPost.excerpt}\n\n## 详细内容\n\n这是博客的详细内容。请在 \`/public/blog/${id}.md\` 文件中添加实际的Markdown内容。`
          htmlContent.value = marked(markdownContent.value)
        }
        
        loading.value = false
      } catch (err) {
        error.value = err.message || '加载博客内容失败'
        loading.value = false
      }
    }
    
    // 返回博客列表
    const goBack = async () => {
      // 清除博客详情状态
      window.dispatchEvent(new CustomEvent('navigate-back-to-blog', {}))
      // 更新URL
      if (history.pushState) {
        history.pushState(null, null, '#blog')
      } else {
        window.location.hash = 'blog'
      }
      // 触发事件返回博客列表
      await nextTick()
      window.dispatchEvent(new CustomEvent('navigate-to-tab', { 
        detail: { tabId: 'blog' } 
      }))
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    onMounted(() => {
      loadBlogContent()
    })
    
    return {
      loading,
      error,
      post,
      htmlContent,
      goBack
    }
  }
}
</script>

<style scoped>
.blog-detail-page {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1.5rem;
}

.loading-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #3182ce;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  border-top-color: #20c997;
  animation-duration: 1.5s;
  animation-direction: reverse;
}

.spinner-ring:nth-child(3) {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border-top-color: #3182ce;
  animation-duration: 2s;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text,
.error-text {
  color: #6b7280;
  font-size: 1rem;
}

.error-text {
  color: #ef4444;
}

.back-btn,
.back-to-list-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3182ce, #20c997);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(49, 130, 206, 0.2);
}

.back-btn:hover,
.back-to-list-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
}

.back-icon {
  width: 18px;
  height: 18px;
}

.back-to-list-btn {
  margin-bottom: 2rem;
}

.blog-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

.blog-article {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

/* Markdown样式 */
.markdown-body {
  color: #374151;
  line-height: 1.8;
  font-size: 1rem;
}

.markdown-body :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.markdown-body :deep(h2) {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a202c;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-body :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.markdown-body :deep(h4) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.markdown-body :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.8;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-body :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.8;
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid #3182ce;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #6b7280;
  font-style: italic;
  background: #f9fafb;
  padding: 1rem 1.5rem;
  border-radius: 4px;
}

.markdown-body :deep(code) {
  background: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #e11d48;
}

.markdown-body :deep(pre) {
  background: #1a202c;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  line-height: 1.6;
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.9rem;
}

.markdown-body :deep(a) {
  color: #3182ce;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.markdown-body :deep(a:hover) {
  border-bottom-color: #3182ce;
}

.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: left;
}

.markdown-body :deep(th) {
  background: #f9fafb;
  font-weight: 600;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 2rem 0;
}

.blog-footer {
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
}

.blog-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #4b5563;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.like-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.comment-btn:hover {
  border-color: #3182ce;
  color: #3182ce;
}

.share-btn:hover {
  border-color: #20c997;
  color: #20c997;
}

.action-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .blog-detail-page {
    padding: 1rem;
  }
  
  .blog-title {
    font-size: 1.75rem;
  }
  
  .blog-article {
    padding: 1.5rem;
  }
  
  .blog-meta {
    gap: 1rem;
    font-size: 0.85rem;
  }
  
  .blog-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .markdown-body :deep(h1) {
    font-size: 1.75rem;
  }
  
  .markdown-body :deep(h2) {
    font-size: 1.5rem;
  }
  
  .markdown-body :deep(h3) {
    font-size: 1.25rem;
  }
}
</style>

