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
    
    <div v-else class="tui-blog-detail-content">
      <!-- 返回按钮 - TUI风格 -->
      <button class="tui-back-to-list-btn" @click="goBack">
        <span class="tui-prompt">←</span>
        <ArrowLeftIcon class="tui-back-icon" />
        <span>返回博客列表</span>
      </button>
      
      <!-- 文章头部 - TUI风格 -->
      <header class="tui-blog-header">
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">BLOG DETAIL</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-blog-title-line">
          <span class="tui-prompt">$</span>
          <h1 class="tui-blog-title">{{ post?.title }}</h1>
        </div>
        <div class="tui-blog-meta">
          <div class="tui-meta-line">
            <span class="tui-prompt">→</span>
            <CalendarIcon class="tui-meta-icon" />
            <span class="tui-meta-label">DATE:</span>
            <span class="tui-meta-value">{{ post?.date }}</span>
          </div>
          <div class="tui-meta-line">
            <span class="tui-prompt">→</span>
            <TagIcon class="tui-meta-icon" />
            <span class="tui-meta-label">CATEGORY:</span>
            <span class="tui-meta-value">{{ post?.category }}</span>
          </div>
          <div class="tui-meta-line">
            <span class="tui-prompt">→</span>
            <EyeIcon class="tui-meta-icon" />
            <span class="tui-meta-label">VIEWS:</span>
            <span class="tui-meta-value">{{ post?.views }}</span>
          </div>
          <div class="tui-meta-line">
            <span class="tui-prompt">→</span>
            <ChatBubbleLeftIcon class="tui-meta-icon" />
            <span class="tui-meta-label">COMMENTS:</span>
            <span class="tui-meta-value">{{ post?.comments }}</span>
          </div>
          <div class="tui-meta-line">
            <span class="tui-prompt">→</span>
            <HeartIcon class="tui-meta-icon" />
            <span class="tui-meta-label">LIKES:</span>
            <span class="tui-meta-value">{{ post?.likes }}</span>
          </div>
        </div>
      </header>
      
      <!-- 文章内容 - TUI风格 -->
      <article class="tui-blog-article">
        <div class="tui-article-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">CONTENT</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-markdown-body" v-html="htmlContent"></div>
      </article>
      
      <!-- 文章底部操作 - TUI风格 -->
      <footer class="tui-blog-footer">
        <div class="tui-blog-actions">
          <button class="tui-action-btn tui-like-btn">
            <span class="tui-prompt">→</span>
            <HeartIcon class="tui-action-icon" />
            <span>点赞 ({{ post?.likes }})</span>
          </button>
          <button class="tui-action-btn tui-comment-btn">
            <span class="tui-prompt">→</span>
            <ChatBubbleLeftIcon class="tui-action-icon" />
            <span>评论 ({{ post?.comments }})</span>
          </button>
          <button class="tui-action-btn tui-share-btn">
            <span class="tui-prompt">→</span>
            <ArrowLeftIcon class="tui-action-icon" style="transform: rotate(180deg);" />
            <span>分享</span>
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
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #30363d;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
  margin-right: 0.5rem;
  font-size: 0.85rem;
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
  color: #8b949e;
  font-size: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.error-text {
  color: #f85149;
}

.back-btn,
.tui-back-to-list-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #161b22;
  border: 1px solid #30363d;
  color: #58a6ff;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover,
.tui-back-to-list-btn:hover {
  border-color: #58a6ff;
  background: #21262d;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-back-icon {
  width: 18px;
  height: 18px;
  color: inherit;
}

.tui-back-to-list-btn {
  margin-bottom: 2rem;
}

.tui-blog-header {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
}

.tui-blog-title-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tui-blog-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #58a6ff;
  line-height: 1.3;
  margin: 0;
}

.tui-blog-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
}

.tui-meta-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.tui-meta-icon {
  width: 16px;
  height: 16px;
  color: #58a6ff;
  flex-shrink: 0;
}

.tui-meta-label {
  color: #8b949e;
  font-weight: 600;
}

.tui-meta-value {
  color: #c9d1d9;
  font-variant-numeric: tabular-nums;
}

.tui-blog-article {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.tui-article-header {
  text-align: center;
  padding: 0.75rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #30363d;
}

/* Markdown样式 - TUI风格 */
.tui-markdown-body {
  color: #c9d1d9;
  line-height: 1.8;
  font-size: 0.95rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.tui-markdown-body :deep(h1) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #58a6ff;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #30363d;
}

.tui-markdown-body :deep(h2) {
  font-size: 1.3rem;
  font-weight: 600;
  color: #58a6ff;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.tui-markdown-body :deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  color: #79c0ff;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.tui-markdown-body :deep(h4) {
  font-size: 1rem;
  font-weight: 600;
  color: #79c0ff;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.tui-markdown-body :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.8;
  color: #c9d1d9;
}

.tui-markdown-body :deep(ul),
.tui-markdown-body :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
  color: #c9d1d9;
}

.tui-markdown-body :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.8;
}

.tui-markdown-body :deep(blockquote) {
  border-left: 3px solid #58a6ff;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #8b949e;
  font-style: italic;
  background: #161b22;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  border: 1px solid #30363d;
}

.tui-markdown-body :deep(code) {
  background: #161b22;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.9em;
  color: #58a6ff;
  border: 1px solid #30363d;
}

.tui-markdown-body :deep(pre) {
  background: #161b22;
  color: #c9d1d9;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  line-height: 1.6;
  border: 1px solid #30363d;
}

.tui-markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.9rem;
  border: none;
}

.tui-markdown-body :deep(a) {
  color: #58a6ff;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.tui-markdown-body :deep(a:hover) {
  border-bottom-color: #58a6ff;
  text-shadow: 0 0 10px rgba(88, 166, 255, 0.5);
}

.tui-markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  border: 1px solid #30363d;
}

.tui-markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border: 1px solid #30363d;
}

.tui-markdown-body :deep(th),
.tui-markdown-body :deep(td) {
  border: 1px solid #30363d;
  padding: 0.75rem;
  text-align: left;
  color: #c9d1d9;
}

.tui-markdown-body :deep(th) {
  background: #161b22;
  font-weight: 600;
  color: #58a6ff;
}

.tui-markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid #30363d;
  margin: 2rem 0;
}

.tui-blog-footer {
  padding-top: 2rem;
  border-top: 1px solid #30363d;
}

.tui-blog-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.tui-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  color: #8b949e;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tui-action-btn:hover {
  border-color: #58a6ff;
  background: #21262d;
  color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-like-btn:hover {
  border-color: #f85149;
  color: #f85149;
  box-shadow: 0 0 15px rgba(248, 81, 73, 0.2);
}

.tui-comment-btn:hover {
  border-color: #58a6ff;
  color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
}

.tui-share-btn:hover {
  border-color: #58a6ff;
  color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
}

.tui-action-icon {
  width: 18px;
  height: 18px;
  color: inherit;
}

@media (max-width: 768px) {
  .blog-detail-page {
    padding: 1rem;
  }
  
  .tui-blog-title {
    font-size: 1.25rem;
  }
  
  .tui-blog-article {
    padding: 1.25rem;
  }
  
  .tui-blog-meta {
    gap: 0.5rem;
    font-size: 0.85rem;
  }
  
  .tui-blog-actions {
    flex-direction: column;
  }
  
  .tui-action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .tui-markdown-body :deep(h1) {
    font-size: 1.3rem;
  }
  
  .tui-markdown-body :deep(h2) {
    font-size: 1.2rem;
  }
  
  .tui-markdown-body :deep(h3) {
    font-size: 1.1rem;
  }
}
</style>


