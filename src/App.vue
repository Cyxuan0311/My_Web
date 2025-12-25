<template>
  <div id="app">
    <!-- 滚动进度指示器 -->
    <div class="scroll-indicator" role="progressbar" :aria-valuenow="Math.round(scrollProgress)" aria-valuemin="0" aria-valuemax="100" aria-label="页面滚动进度">
      <div class="scroll-progress" :style="{ width: scrollProgress + '%' }">
        <div class="scroll-progress-glow"></div>
      </div>
    </div>
    
    <!-- 主布局容器 -->
    <div class="main-layout">
      <!-- 左侧边栏 -->
      <aside 
        class="sidebar" 
        :class="{ 'sidebar-collapsed': sidebarCollapsed }" 
        :style="{ width: sidebarWidth + 'px' }"
        role="navigation"
        aria-label="主导航菜单"
      >
        <div class="sidebar-content">
          <!-- 个人头像和基本信息 - TUI风格 -->
          <div class="profile-section">
            <div class="tui-profile-header">
              <span class="tui-header-decoration">┌─</span>
              <span class="tui-profile-title">PROFILE</span>
              <span class="tui-header-decoration">─┐</span>
            </div>
            <div class="tui-profile-body">
              <div class="avatar-container">
                <img 
                  v-if="!imageError"
                  src="/avatar.png" 
                  alt="Frames" 
                  class="avatar"
                  @error="handleImageError"
                  @load="handleImageLoad"
                >
                <div v-else class="avatar-fallback">
                  <div class="fallback-icon">👤</div>
                </div>
                <div class="status-indicator" :class="{ 'online': !imageLoading && !imageError, 'offline': imageError }">
                  <div class="status-dot"></div>
                </div>
                <div v-if="imageLoading" class="avatar-loading">
                  <div class="loading-spinner"></div>
                </div>
              </div>
              <div class="tui-profile-info">
                <div class="tui-profile-line">
                  <span class="tui-prompt">$</span>
                  <span class="tui-profile-label">NAME:</span>
                  <span class="tui-profile-value">Frames</span>
                </div>
                <div class="tui-profile-line">
                  <span class="tui-prompt">$</span>
                  <span class="tui-profile-label">TITLE:</span>
                  <span class="tui-profile-value">{{ profileTitle }}</span>
                </div>
                <div class="tui-profile-line">
                  <span class="tui-prompt">$</span>
                  <span class="tui-profile-label">DESC:</span>
                  <span class="tui-profile-value">{{ profileDesc }}</span>
                </div>
              </div>
              <div class="language-switch">
                <button class="tui-language-btn" @click="toggleLocale">
                  <span class="tui-prompt">$</span>
                  <span class="tui-language-text">{{ languageButtonLabel }}</span>
                </button>
              </div>
            </div>
            <div class="tui-profile-footer">
              <span class="tui-footer-line">────────────────────</span>
            </div>
          </div>
          
          <!-- 导航菜单 - TUI风格 -->
          <nav class="sidebar-nav" aria-label="页面导航">
            <div class="tui-nav-header">
              <span class="tui-header-decoration">┌─</span>
              <span class="tui-nav-title">NAVIGATION</span>
              <span class="tui-header-decoration">─┐</span>
            </div>
            <div class="tui-nav-items">
              <a 
                v-for="item in menuItems" 
                :key="item.name"
                :href="item.href" 
                class="tui-nav-item"
                :class="{ active: activeSection === item.key }"
                :data-tooltip="item.name"
                :aria-current="activeSection === item.key ? 'page' : undefined"
                :aria-label="item.name"
                @click="scrollToSection(item.href, $event)"
              >
                <span class="tui-nav-indicator" v-if="activeSection === item.key">▶</span>
                <span class="tui-nav-indicator" v-else>·</span>
                <component :is="item.icon" class="nav-icon" aria-hidden="true" />
                <span class="nav-text">{{ item.name }}</span>
              </a>
            </div>
          </nav>
          
          <!-- 社交链接 - TUI风格 -->
          <div class="social-links">
            <div class="tui-social-header">
              <span class="tui-header-decoration">┌─</span>
              <span class="tui-social-title">SOCIAL</span>
              <span class="tui-header-decoration">─┐</span>
            </div>
            <div class="tui-social-items">
              <a
                v-for="link in socialLinks"
                :key="link.key"
                :href="link.href"
                target="_blank"
                class="tui-social-link"
                :class="link.class"
                :title="link.tooltip"
                :data-tooltip="link.tooltip"
              >
                <span class="tui-prompt">→</span>
                <component :is="link.icon" class="social-icon" />
                <span class="social-text">{{ link.text }}</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- 侧边栏折叠按钮 -->
        <button 
          class="sidebar-toggle" 
          @click="toggleSidebar"
          :aria-label="sidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'"
          :aria-expanded="!sidebarCollapsed"
        >
          <ChevronLeftIcon v-if="!sidebarCollapsed" class="toggle-icon" aria-hidden="true" />
          <ChevronRightIcon v-else class="toggle-icon" aria-hidden="true" />
        </button>
      </aside>
      
      <!-- 可拖拽的分割线 -->
      <div 
        v-if="!sidebarCollapsed"
        class="resizer" 
        :class="{ 'resizing': isResizing }"
        :style="{ left: sidebarWidth + 'px' }"
        @mousedown="startResize"
      ></div>
      
        <!-- 右侧主内容区 -->
        <main class="main-content" :class="{ 'resizing': isResizing }" :style="{ marginLeft: sidebarWidth + 'px' }">
          <!-- 标签页导航 - TUI风格 -->
          <div class="tab-navigation" role="tablist" aria-label="内容标签页">
            <div class="tui-tab-container">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                class="tui-tab-btn"
                :class="{ active: activeTab === tab.id }"
                :aria-selected="activeTab === tab.id"
                :aria-controls="`tabpanel-${tab.id}`"
                :id="`tab-${tab.id}`"
                role="tab"
                @click="switchTab(tab.id)"
              >
                <span class="tui-tab-indicator" v-if="activeTab === tab.id">▶</span>
                <span class="tui-tab-indicator" v-else>·</span>
                <component :is="tab.icon" class="tab-icon" aria-hidden="true" />
                <span class="tab-text">{{ tab.name }}</span>
                <span class="tui-tab-bracket" v-if="activeTab === tab.id">]</span>
              </button>
            </div>
          </div>
          
          <!-- 标签页内容 -->
          <div 
            class="tab-content" 
            :class="{ 'loading': pageLoading, 'transitioning': pageTransition }"
            role="tabpanel"
            :id="`tabpanel-${activeTab}`"
            :aria-labelledby="`tab-${activeTab}`"
          >
            <transition name="page-fade" mode="out-in">
              <component :is="currentComponent" :key="isBlogDetail ? `blog-detail-${blogDetailId}` : activeTab" />
            </transition>
            
            <!-- 页面加载覆盖层 -->
            <div v-if="pageLoading" class="page-loading-overlay">
              <div class="page-loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
              </div>
              <p class="loading-text">{{ pageLoadingText }}</p>
            </div>
          </div>
          
          <Footer />
        </main>
    </div>
    
    <!-- 返回顶部按钮 -->
    <button 
      class="back-to-top" 
      :class="{ visible: showBackToTop }"
      @click="scrollToTop"
      aria-label="返回顶部"
      title="返回顶部"
    >
      <svg class="back-to-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
      <span class="back-to-top-text">Top</span>
    </button>
  </div>
</template>

<script>
  import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
  import Home from './views/Home.vue'
  import About from './views/About.vue'
  import Skills from './views/Skills.vue'
  import Portfolio from './views/Portfolio.vue'
  import Blog from './views/Blog.vue'
  import BlogDetail from './views/BlogDetail.vue'
  import Contact from './views/Contact.vue'
  import Games from './views/Games.vue'
  import Footer from './components/Footer.vue'
  import { 
    HomeIcon, 
    UserIcon, 
    CodeBracketIcon, 
    BriefcaseIcon, 
    DocumentTextIcon, 
    EnvelopeIcon,
    SparklesIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  } from '@heroicons/vue/24/outline'
  import { useI18n } from './composables/useI18n'
  import { useScroll } from './composables/useScroll'

export default {
  name: 'App',
  components: {
    Home,
    About,
    Skills,
    Portfolio,
    Blog,
    BlogDetail,
    Contact,
    Games,
    Footer,
    HomeIcon,
    UserIcon,
    CodeBracketIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    SparklesIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  setup() {
    const sidebarCollapsed = ref(false)
    const activeTab = ref('home')
    const imageLoading = ref(true)
    const imageError = ref(false)
    const pageLoading = ref(false)
    const pageTransition = ref(false)
    const sidebarWidth = ref(320)
    const isResizing = ref(false)
    const startX = ref(0)
    const startWidth = ref(320)

    const { toggleLocale, messages } = useI18n()
    const appText = computed(() => messages.value.app)
    const menuItems = computed(() => appText.value.menuItems)
    const tabs = computed(() => appText.value.tabs)
    const socialLinks = computed(() => appText.value.socialLinks)
    const profileTitle = computed(() => appText.value.profile.title)
    const profileDesc = computed(() => appText.value.profile.description)
    const pageLoadingText = computed(() => appText.value.loadingText)
    const languageButtonLabel = computed(() => appText.value.languageButton)
    const tabIds = computed(() => tabs.value.map(tab => tab.id))
    
    // 使用滚动 composable
    const { 
      scrollProgress, 
      showBackToTop, 
      activeSection, 
      scrollToTop: scrollToTopFn,
      scrollToSection: scrollToSectionFn
    } = useScroll({
      throttleDelay: 16,
      showBackToTopThreshold: 300,
      sections: ['home', 'about', 'skills', 'portfolio', 'blog', 'games', 'contact']
    })
    
    // 博客详情页状态
    const blogDetailId = ref(null)
    
    // 检查是否在博客详情页
    const isBlogDetail = computed(() => {
      return blogDetailId.value !== null || window.location.hash.includes('blog-detail/')
    })
    
    // 动态组件计算属性
    const currentComponent = computed(() => {
      if (isBlogDetail.value) {
        return 'BlogDetail'
      }
      const componentMap = {
        'home': 'Home',
        'about': 'About',
        'skills': 'Skills',
        'portfolio': 'Portfolio',
        'blog': 'Blog',
        'games': 'Games',
        'contact': 'Contact'
      }
      return componentMap[activeTab.value] || 'Home'
    })
    
    const scrollToSection = (href, event) => {
      event.preventDefault()
      const targetId = href.replace('#', '')
      
      // 切换到对应的标签页
      if (tabIds.value.includes(targetId)) {
        switchTab(targetId)
        // 等待 DOM 更新后滚动到对应区域
        nextTick(() => {
          setTimeout(() => {
            scrollToSectionFn(targetId)
          }, 100)
        })
      }
    }
    
    const switchTab = (tabId) => {
      if (activeTab.value === tabId) return
      
      // 开始页面切换动画
      pageLoading.value = true
      pageTransition.value = true
      
      // 延迟切换，让过渡动画更自然
      setTimeout(() => {
        activeTab.value = tabId
        activeSection.value = tabId
        
        // 滚动到顶部
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        
        // 更新URL
        if (history.pushState) {
          history.pushState(null, null, `#${tabId}`)
        }
        
        // 结束加载状态
        setTimeout(() => {
          pageLoading.value = false
          pageTransition.value = false
        }, 300)
      }, 200)
    }
    
    const scrollToTop = () => {
      scrollToTopFn('smooth')
    }
    
    // 键盘导航支持
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + K 打开搜索或导航（可扩展）
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        // 可以在这里添加搜索功能
      }
      
      // Escape 键关闭侧边栏（移动端）
      if (event.key === 'Escape' && window.innerWidth <= 768 && !sidebarCollapsed.value) {
        sidebarCollapsed.value = true
      }
    }
    
    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
      if (sidebarCollapsed.value) {
        // 折叠时保存当前宽度
        localStorage.setItem('sidebarWidth', sidebarWidth.value.toString())
      } else {
        // 展开时恢复宽度
        const savedWidth = localStorage.getItem('sidebarWidth')
        if (savedWidth) {
          sidebarWidth.value = parseInt(savedWidth, 10)
        }
      }
    }
    
    const handleImageLoad = () => {
      imageLoading.value = false
      imageError.value = false
    }
    
    const handleImageError = () => {
      imageLoading.value = false
      imageError.value = true
    }
    
    // 拖拽调整侧边栏宽度
    const startResize = (e) => {
      if (sidebarCollapsed.value) return
      isResizing.value = true
      startX.value = e.clientX
      startWidth.value = sidebarWidth.value
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', stopResize)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      e.preventDefault()
    }
    
    const handleResize = (e) => {
      if (!isResizing.value) return
      const diff = e.clientX - startX.value
      const newWidth = startWidth.value + diff
      // 限制侧边栏宽度在 200px 到 600px 之间
      sidebarWidth.value = Math.max(200, Math.min(600, newWidth))
    }
    
    const stopResize = () => {
      if (!isResizing.value) return
      isResizing.value = false
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      // 保存到 localStorage
      localStorage.setItem('sidebarWidth', sidebarWidth.value.toString())
    }
    
    // 定义事件处理函数，以便可以正确移除
    const handleNavigateToTab = (event) => {
      const { tabId } = event.detail
      if (tabId && tabIds.value.includes(tabId)) {
        // 如果返回博客列表，清除博客详情状态
        if (tabId === 'blog') {
          blogDetailId.value = null
        }
        switchTab(tabId)
      }
    }
    
    const handleNavigateBackToBlog = () => {
      blogDetailId.value = null
    }
    
    const handleNavigateToBlogDetail = async (event) => {
      const { postId } = event.detail
      if (postId) {
        localStorage.setItem('currentBlogId', postId.toString())
        // 先更新状态，确保组件立即切换
        blogDetailId.value = postId
        activeTab.value = 'blog'
        
        // 等待DOM更新
        await nextTick()
        
        // 更新URL
        if (history.pushState) {
          history.pushState(null, null, `#blog-detail/${postId}`)
        } else {
          window.location.hash = `blog-detail/${postId}`
        }
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    
    const handleHashChange = () => {
      const hash = window.location.hash
      const blogDetailMatch = hash.match(/blog-detail\/(\d+)/)
      if (blogDetailMatch) {
        blogDetailId.value = parseInt(blogDetailMatch[1])
        activeTab.value = 'blog'
      } else {
        blogDetailId.value = null
        if (hash && tabIds.value.includes(hash.replace('#', ''))) {
          switchTab(hash.replace('#', ''))
        }
      }
    }
    
    onMounted(() => {
      // 从 localStorage 恢复侧边栏宽度
      const savedWidth = localStorage.getItem('sidebarWidth')
      if (savedWidth) {
        sidebarWidth.value = parseInt(savedWidth, 10)
      }
      
      // 监听导航事件
      window.addEventListener('navigate-to-tab', handleNavigateToTab)
      
      // 监听返回博客列表事件
      window.addEventListener('navigate-back-to-blog', handleNavigateBackToBlog)
      
      // 监听博客详情页导航事件
      window.addEventListener('navigate-to-blog-detail', handleNavigateToBlogDetail)
      
      // 监听URL hash变化
      window.addEventListener('hashchange', handleHashChange)
      
      // 键盘导航支持
      window.addEventListener('keydown', handleKeyDown)
      
      // 初始化时也检查一次
      handleHashChange()
      // 如果当前在博客详情页，确保状态正确
      if (isBlogDetail.value && blogDetailId.value) {
        activeTab.value = 'blog'
      }
    })
    
    onUnmounted(() => {
      window.removeEventListener('navigate-to-tab', handleNavigateToTab)
      window.removeEventListener('navigate-back-to-blog', handleNavigateBackToBlog)
      window.removeEventListener('navigate-to-blog-detail', handleNavigateToBlogDetail)
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
    })
    
    return {
      scrollProgress,
      showBackToTop,
      sidebarCollapsed,
      activeSection,
      activeTab,
      imageLoading,
      imageError,
      pageLoading,
      pageTransition,
      currentComponent,
      isBlogDetail,
      menuItems,
      tabs,
      socialLinks,
      profileTitle,
      profileDesc,
      pageLoadingText,
      languageButtonLabel,
      scrollToSection,
      scrollToTop,
      toggleSidebar,
      switchTab,
      handleImageLoad,
      handleImageError,
      toggleLocale,
      sidebarWidth,
      isResizing,
      startResize,
      blogDetailId
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #c9d1d9;
    min-height: 100vh;
    background: #0d1117;
    line-height: 1.6;
  }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  line-height: 1.6;
  background-color: #0d1117;
  color: #c9d1d9;
}

/* 主布局 */
.main-layout {
  display: flex;
  min-height: 100vh;
}

  /* 左侧边栏 - TUI风格 */
  .sidebar {
    width: 320px;
    background: #0d1117;
    color: #c9d1d9;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.4);
    border-right: 1px solid #30363d;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  }
  
  .sidebar:not(.sidebar-collapsed) {
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .main-content:has(+ .resizer.resizing),
  .main-content.resizing {
    transition: none;
  }

.sidebar-collapsed {
  width: 80px !important;
}

.sidebar-collapsed .sidebar-content {
  padding: 1rem 0.5rem;
  align-items: center;
  transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-collapsed .profile-section {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem 0.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: collapse-profile 0.4s ease-out;
}

@keyframes collapse-profile {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.sidebar-collapsed .tui-profile-info,
.sidebar-collapsed .tui-profile-header,
.sidebar-collapsed .tui-profile-footer,
.sidebar-collapsed .language-switch {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.4s ease, margin 0.3s ease;
  margin: 0;
}

.sidebar-collapsed .avatar-container {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: collapse-avatar 0.4s ease-out;
}

@keyframes collapse-avatar {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.sidebar-collapsed .sidebar-nav {
  width: 100%;
  margin-bottom: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-collapsed .tui-nav-header,
.sidebar-collapsed .tui-social-header {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.4s ease, padding 0.3s ease;
  padding: 0;
  margin: 0;
  border: none;
}

.sidebar-collapsed .tui-nav-item {
  justify-content: center;
  padding: 0.875rem 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fade-in-item 0.4s ease-out;
  animation-fill-mode: both;
}

.sidebar-collapsed .tui-nav-item:nth-child(1) { animation-delay: 0.05s; }
.sidebar-collapsed .tui-nav-item:nth-child(2) { animation-delay: 0.1s; }
.sidebar-collapsed .tui-nav-item:nth-child(3) { animation-delay: 0.15s; }
.sidebar-collapsed .tui-nav-item:nth-child(4) { animation-delay: 0.2s; }
.sidebar-collapsed .tui-nav-item:nth-child(5) { animation-delay: 0.25s; }
.sidebar-collapsed .tui-nav-item:nth-child(6) { animation-delay: 0.3s; }

@keyframes fade-in-item {
  0% {
    opacity: 0;
    transform: translateX(-10px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.sidebar-collapsed .tui-nav-item:hover {
  background: #21262d;
  border-color: #58a6ff;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.3);
}

.sidebar-collapsed .tui-nav-item.active {
  background: #0d1117;
  border-color: #58a6ff;
  border-left: 3px solid #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.4);
}

.sidebar-collapsed .tui-nav-item::after {
  content: attr(data-tooltip);
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) translateX(-10px);
  background: #0d1117;
  color: #c9d1d9;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 0;
  z-index: 10000;
  border: 1px solid #30363d;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  letter-spacing: 0.5px;
}

.sidebar-collapsed .tui-nav-item::before {
  content: '';
  position: absolute;
  left: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: #0d1117;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10001;
  filter: drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.3));
}

.sidebar-collapsed .tui-nav-item:hover::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.sidebar-collapsed .tui-nav-item:hover::before {
  opacity: 1;
}

.sidebar-collapsed .tui-social-items {
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-collapsed .tui-social-link {
  padding: 0.875rem;
  justify-content: center;
  border-radius: 8px;
  position: relative;
  width: auto;
  min-width: 48px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fade-in-item 0.4s ease-out;
  animation-fill-mode: both;
}

.sidebar-collapsed .tui-social-link:nth-child(1) { animation-delay: 0.1s; }
.sidebar-collapsed .tui-social-link:nth-child(2) { animation-delay: 0.15s; }

.sidebar-collapsed .social-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, width 0.3s ease;
}

.sidebar-collapsed .tui-prompt {
  opacity: 0;
  width: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, width 0.3s ease;
}

.sidebar-collapsed .tui-social-link::after {
  content: attr(data-tooltip);
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) translateX(-10px);
  background: #0d1117;
  color: #c9d1d9;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 0;
  z-index: 10000;
  border: 1px solid #30363d;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  letter-spacing: 0.5px;
}

.sidebar-collapsed .tui-social-link::before {
  content: '';
  position: absolute;
  left: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: #0d1117;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10001;
  filter: drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.3));
}

.sidebar-collapsed .tui-social-link:hover::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.sidebar-collapsed .tui-social-link:hover::before {
  opacity: 1;
}

.sidebar-collapsed .tui-social-link:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.3);
}

/* 收起状态下的额外优化 */
.sidebar-collapsed .sidebar {
  border-right: 2px solid #58a6ff;
  box-shadow: 4px 0 25px rgba(88, 166, 255, 0.2);
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}

.sidebar-collapsed .avatar {
  border: 2px solid #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-collapsed .nav-icon {
  width: 22px;
  height: 22px;
  transition: all 0.3s ease;
}

.sidebar-collapsed .tui-nav-item:hover .nav-icon {
  transform: scale(1.15);
}

.sidebar-collapsed .social-icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.sidebar-collapsed .tui-social-link:hover .social-icon {
  transform: scale(1.15);
  color: #58a6ff;
}

/* 收起状态下的状态指示器优化 */
.sidebar-collapsed .status-indicator {
  bottom: 3px;
  right: 3px;
  width: 14px;
  height: 14px;
  border-width: 2px;
  transition: all 0.3s ease;
}

.sidebar-collapsed .status-dot {
  width: 6px;
  height: 6px;
  transition: all 0.3s ease;
}

/* 收起状态下的折叠按钮位置调整 */
.sidebar-collapsed + .main-content .sidebar-toggle {
  right: -12px;
}

.sidebar-content {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 展开时的动画 */
.profile-section,
.sidebar-nav,
.social-links {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar:not(.sidebar-collapsed) .tui-profile-info,
.sidebar:not(.sidebar-collapsed) .tui-profile-header,
.sidebar:not(.sidebar-collapsed) .tui-profile-footer,
.sidebar:not(.sidebar-collapsed) .language-switch {
  opacity: 1;
  max-height: 500px;
  transition: opacity 0.4s ease 0.2s, max-height 0.5s ease 0.2s, margin 0.4s ease 0.2s;
}

.sidebar:not(.sidebar-collapsed) .tui-nav-header,
.sidebar:not(.sidebar-collapsed) .tui-social-header {
  opacity: 1;
  max-height: 100px;
  transition: opacity 0.4s ease 0.1s, max-height 0.5s ease 0.1s, padding 0.4s ease 0.1s;
}

.sidebar:not(.sidebar-collapsed) .nav-text {
  opacity: 1;
  width: auto;
  transform: translateX(0);
  transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s, width 0.4s ease 0.2s;
}

.sidebar:not(.sidebar-collapsed) .tui-prompt {
  opacity: 1;
  width: auto;
  transition: opacity 0.4s ease 0.2s, width 0.4s ease 0.2s;
}

.sidebar:not(.sidebar-collapsed) .social-text {
  opacity: 1;
  width: auto;
  transition: opacity 0.4s ease 0.2s, width 0.4s ease 0.2s;
}

.sidebar:not(.sidebar-collapsed) .tui-nav-indicator {
  display: inline-block;
  opacity: 1;
  transition: opacity 0.3s ease 0.2s;
}

@keyframes expand-section {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes expand-item {
  0% {
    opacity: 0;
    transform: translateX(-15px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* TUI 通用样式 */
.tui-header-decoration {
  color: #58a6ff;
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.6;
  margin: 0 0.5rem;
}

.tui-profile-title,
.tui-nav-title,
.tui-social-title {
  color: #58a6ff;
  font-size: 0.9rem;
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

.tui-profile-header,
.tui-nav-header,
.tui-social-header {
  text-align: center;
  padding: 0.75rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #30363d;
}

.tui-profile-body,
.tui-nav-items,
.tui-social-items {
  padding: 0.5rem 0;
}

.tui-profile-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #30363d;
  text-align: center;
}

.tui-footer-line {
  color: #30363d;
  font-size: 0.9rem;
  letter-spacing: 2px;
}

/* 个人资料区域 - TUI风格 */
.profile-section {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 0;
  animation: fadeInUp 0.8s ease-out;
  text-align: center;
}

  .avatar-container {
    position: relative;
    margin: 0 auto 1.5rem;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background: #0d1117;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #30363d;
    transition: all 0.3s ease;
  }

.avatar-container:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.3);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #30363d;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.avatar:hover {
  transform: scale(1.05);
  border-color: #58a6ff;
}

  .status-indicator {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    border: 3px solid #1a202c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .status-indicator.online {
    background: rgba(16, 185, 129, 0.2);
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
    animation: pulse 2s infinite;
  }

  .status-indicator.online .status-dot {
    background: #10b981;
    animation: pulse-dot 2s infinite;
  }

  .status-indicator.offline {
    background: rgba(239, 68, 68, 0.2);
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
  }

  .status-indicator.offline .status-dot {
    background: #ef4444;
  }

.avatar-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 32, 44, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #3182ce;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .avatar-fallback {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .fallback-icon {
    font-size: 3rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1) contrast(1.1);
  }

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.tui-profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-align: left;
}

.tui-profile-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.6;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
  margin-right: 0.25rem;
}

.tui-profile-label {
  color: #8b949e;
  font-weight: 500;
  min-width: 50px;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

.tui-profile-value {
  color: #c9d1d9;
  font-weight: 500;
  flex: 1;
}

.language-switch {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
}

.tui-language-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #30363d;
  border-radius: 8px;
  background: #0d1117;
  color: #58a6ff;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tui-language-btn:hover {
  border-color: #58a6ff;
  background: #161b22;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.3);
  transform: translateY(-1px);
}

.tui-language-text {
  color: #58a6ff;
}

/* 导航菜单 - TUI风格 */
.sidebar-nav {
  flex: 1;
  margin-bottom: 0;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1rem;
}

.tui-nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tui-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #8b949e;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  font-size: 0.9rem;
  background: transparent;
}

.tui-nav-item:hover {
  background: #21262d;
  border-color: #30363d;
  color: #c9d1d9;
  transform: translateX(3px);
}

.tui-nav-item.active {
  background: #0d1117;
  border-color: #58a6ff;
  color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
}

.tui-nav-indicator {
  color: #58a6ff;
  font-size: 0.7rem;
  font-weight: 600;
  width: 12px;
  text-align: center;
  transition: all 0.3s ease;
}

.tui-nav-item:not(.active) .tui-nav-indicator {
  color: #30363d;
  opacity: 0.5;
}

.tui-nav-item.active .tui-nav-indicator {
  animation: pulse-indicator 1.5s ease-in-out infinite;
}

  .nav-icon {
    width: 18px;
    height: 18px;
    margin-right: 0;
    transition: all 0.3s ease;
    flex-shrink: 0;
    color: inherit;
  }

.tui-nav-item:hover .nav-icon {
  transform: scale(1.1);
}

.tui-nav-item.active .nav-icon {
  color: #58a6ff;
  transform: scale(1.05);
}

.nav-text {
  font-weight: 500;
  transition: all 0.3s ease;
  color: inherit;
}

.sidebar-collapsed .nav-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
  transform: translateX(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease, width 0.3s ease;
}

.sidebar-collapsed .tui-nav-item {
  justify-content: center;
  padding: 0.875rem;
  min-width: 48px;
}

.sidebar-collapsed .nav-icon {
  margin-right: 0;
  margin-left: 0;
}

.sidebar-collapsed .tui-nav-indicator {
  display: none;
}

/* 社交链接 - TUI风格 */
.social-links {
  margin-top: auto;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1rem;
}

.tui-social-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tui-social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  color: #8b949e;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  width: 100%;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.tui-social-link:hover {
  background: #21262d;
  border-color: #58a6ff;
  color: #c9d1d9;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
  transform: translateX(3px);
}

.tui-social-link:active {
  transform: translateX(1px);
}

.social-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  color: inherit;
}

.tui-social-link:hover .social-icon {
  transform: scale(1.1);
  color: #58a6ff;
}

.social-text {
  transition: all 0.3s ease;
  color: inherit;
}

.tui-social-link.github:hover {
  border-color: #58a6ff;
  background: #21262d;
}

.tui-social-link.email:hover {
  border-color: #58a6ff;
  background: #21262d;
}


/* 响应式设计 */
@media (max-width: 768px) {
  .social-links {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    padding: 0 0.5rem;
  }
  
  .social-link {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    max-width: 120px;
  }
  
  .social-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .social-links {
    flex-direction: column;
    gap: 0.6rem;
    align-items: center;
  }
  
  .social-link {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
    max-width: 150px;
  }
}

  /* 侧边栏折叠按钮 */
  .sidebar-toggle {
    position: absolute;
    top: 50%;
    right: -15px;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
    z-index: 1001;
  }
  
  .sidebar-toggle:hover {
    background: #21262d;
    border-color: #58a6ff;
    box-shadow: 0 0 15px rgba(88, 166, 255, 0.3);
  }

  .toggle-icon {
    width: 16px;
    height: 16px;
    color: #58a6ff;
    transition: all 0.3s ease;
  }
  
  .sidebar-toggle:hover .toggle-icon {
    color: #79c0ff;
    transform: scale(1.1);
  }

.sidebar-toggle:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

  /* 可拖拽的分割线 */
  .resizer {
    position: fixed;
    left: 320px;
    top: 0;
    width: 4px;
    height: 100vh;
    background: transparent;
    cursor: col-resize;
    z-index: 1001;
    transition: background 0.2s ease;
  }
  
  .resizer:hover {
    background: rgba(49, 130, 206, 0.5);
  }
  
  .resizer.resizing {
    background: #3182ce;
    width: 4px;
  }
  
  .resizer::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 0;
    width: 8px;
    height: 100%;
    cursor: col-resize;
  }
  
  /* 主内容区 */
  .main-content {
    flex: 1;
    margin-left: 320px;
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 100vh;
  }
  
  .main-content.resizing {
    transition: none;
  }

  /* 标签页导航 - TUI风格 */
  .tab-navigation {
    background: #0d1117;
    border-bottom: 1px solid #30363d;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    position: sticky;
    top: 0;
    z-index: 100;
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  
  .dark-theme .tab-navigation {
    background: #0d1117;
    border-bottom-color: #30363d;
  }
  
  .tui-tab-container {
    display: flex;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .tui-tab-container::-webkit-scrollbar {
    display: none;
  }
  
  .tui-tab-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: 1px solid transparent;
    background: transparent;
    color: #8b949e;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    overflow: visible;
    border-radius: 6px;
    margin: 0;
    white-space: nowrap;
  }
  
  .tui-tab-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(88, 166, 255, 0.08);
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  
  .tui-tab-btn:hover::before {
    opacity: 1;
  }
  
  .tui-tab-btn:hover {
    color: #c9d1d9;
    transform: translateY(-1px);
  }
  
  .tui-tab-btn.active {
    color: #58a6ff;
    background: rgba(88, 166, 255, 0.1);
    border-color: #58a6ff;
    font-weight: 600;
    box-shadow: 0 0 0 1px rgba(88, 166, 255, 0.2), 0 2px 8px rgba(88, 166, 255, 0.15);
    position: relative;
    z-index: 1;
  }
  
  .tui-tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #58a6ff, transparent);
    border-radius: 2px;
    animation: tab-indicator-glow 2s ease-in-out infinite;
  }
  
  @keyframes tab-indicator-glow {
    0%, 100% {
      opacity: 0.6;
      box-shadow: 0 0 4px rgba(88, 166, 255, 0.4);
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 8px rgba(88, 166, 255, 0.6);
    }
  }
  
  .tui-tab-indicator {
    color: #58a6ff;
    font-size: 0.75rem;
    font-weight: 600;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
    width: 14px;
    text-align: center;
    transform-origin: center;
  }
  
  .tui-tab-btn:not(.active) .tui-tab-indicator {
    color: #6e7681;
    opacity: 0.6;
  }
  
  .tui-tab-btn.active .tui-tab-indicator {
    animation: tab-indicator-pulse 2s ease-in-out infinite;
  }
  
  @keyframes tab-indicator-pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }
  
  .tui-tab-bracket {
    color: #58a6ff;
    font-weight: 600;
    margin-left: 0.25rem;
    opacity: 0.8;
    transition: opacity 0.25s ease;
  }
  
  .tui-tab-btn.active .tui-tab-bracket {
    opacity: 1;
  }
  
  .tab-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    color: inherit;
  }
  
  .tui-tab-btn:hover .tab-icon {
    transform: scale(1.1) rotate(5deg);
    color: #58a6ff;
  }
  
  .tui-tab-btn.active .tab-icon {
    color: #58a6ff;
    transform: scale(1.05);
    filter: drop-shadow(0 0 4px rgba(88, 166, 255, 0.4));
  }
  
  .tab-text {
    white-space: nowrap;
    transition: color 0.25s ease, font-weight 0.25s ease;
  }
  
  .tui-tab-btn.active .tab-text {
    font-weight: 600;
  }

  /* 标签页内容 - TUI风格 */
  .tab-content {
    min-height: calc(100vh - 200px);
    position: relative;
    background: transparent;
  }

  .tab-content.loading {
    opacity: 0.6;
    pointer-events: none;
    filter: blur(2px);
  }

  .tab-content.transitioning {
    overflow: hidden;
  }
  
  .tab-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #30363d, transparent);
    opacity: 0.5;
  }

  /* 页面过渡动画 - TUI风格 */
  .page-fade-enter-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: tui-slide-in 0.4s ease-out;
  }

  .page-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: tui-fade-out 0.3s ease-in;
  }

  .page-fade-enter-from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
    filter: blur(2px);
  }

  .page-fade-leave-to {
    opacity: 0;
    transform: translateY(-5px) scale(0.99);
    filter: blur(1px);
  }

  @keyframes tui-slide-in {
    0% {
      opacity: 0;
      transform: translateY(15px) scale(0.97);
      filter: blur(4px);
    }
    50% {
      filter: blur(2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes tui-fade-out {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-8px) scale(0.99);
      filter: blur(2px);
    }
  }

  /* 页面加载覆盖层 */
  .page-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(47, 59, 77, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
    border: 1px solid #4d5968;
  }

  .page-loading-spinner {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
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
    border-top-color: #2b6cb0;
    animation-duration: 1.5s;
    animation-direction: reverse;
  }

  .spinner-ring:nth-child(3) {
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    border-top-color: #1e40af;
    animation-duration: 2s;
  }

  .loading-text {
    color: #58a6ff;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  }

.sidebar-collapsed + .resizer {
  left: 80px;
  display: none;
}

.sidebar-collapsed + .resizer + .main-content {
  margin-left: 80px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(40, 167, 69, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
  }
}

@keyframes pulse-dot {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

  /* 响应式设计 */
  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      max-width: 320px;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.25);
    }
    
    .sidebar:not(.sidebar-collapsed) {
      transform: translateX(0);
    }
    
    /* 移动端侧边栏遮罩层 */
    .sidebar:not(.sidebar-collapsed)::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: -1;
      animation: fadeIn 0.3s ease;
    }
    
    .main-content {
      margin-left: 0;
    }
    
    .sidebar-toggle {
      display: flex;
      right: -12px;
      background: #161b22;
      border-color: #30363d;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
    
    .sidebar-collapsed {
      width: 80px !important;
      max-width: 80px;
    }
    
    .tab-navigation {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */
    }
    
    .tab-navigation::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
    
    .tui-tab-container {
      padding: 0.5rem 0.75rem;
      gap: 0.2rem;
    }
    
    .tui-tab-btn {
      padding: 0.7rem 1rem;
      font-size: 0.85rem;
      flex-shrink: 0;
      touch-action: manipulation; /* 优化触摸响应 */
    }
    
    .tui-tab-indicator {
      font-size: 0.65rem;
      width: 10px;
    }
    
    .tab-text {
      display: none;
    }
    
    /* 移动端优化触摸目标大小 */
    .nav-item {
      min-height: 44px; /* iOS 推荐的最小触摸目标 */
      padding: 1rem 1.5rem;
    }
    
    .social-link {
      min-height: 44px;
    }
  }

  @media (max-width: 480px) {
    .tui-tab-container {
      padding: 0.5rem 0.5rem;
      gap: 0.15rem;
    }
    
    .tui-tab-btn {
      padding: 0.6rem 0.8rem;
      min-width: 50px;
      font-size: 0.8rem;
    }
    
    .tui-tab-indicator {
      font-size: 0.6rem;
      width: 8px;
    }
    
    .sidebar-content {
      padding: 1.5rem;
    }
    
    .profile-section {
      margin-bottom: 1.5rem;
    }
    
    .avatar-container {
      width: 100px;
      height: 100px;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* 触摸设备优化 */
  @media (hover: none) and (pointer: coarse) {
    .nav-item:hover,
    .social-link:hover,
    .tab-btn:hover {
      transform: none; /* 移动端禁用 hover 变换 */
    }
    
    .nav-item:active,
    .social-link:active,
    .tab-btn:active {
      opacity: 0.7;
      transform: scale(0.98);
    }
  }

/* 滚动条样式 */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 滚动进度指示器 */
.scroll-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.05);
  z-index: 10000;
  overflow: hidden;
}

.scroll-progress {
  height: 100%;
  background: linear-gradient(90deg, #3182ce 0%, #2b6cb0 50%, #1e40af 100%);
  transition: width 0.1s ease-out;
  position: relative;
  box-shadow: 0 0 10px rgba(49, 130, 206, 0.5);
}

.scroll-progress-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 返回顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(49, 130, 206, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.back-to-top::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.back-to-top:hover::before {
  width: 300px;
  height: 300px;
}

.back-to-top.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.back-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 30px rgba(49, 130, 206, 0.6);
}

.back-to-top:active {
  transform: translateY(-2px) scale(0.98);
}

.back-to-top-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.back-to-top:hover .back-to-top-icon {
  transform: translateY(-2px);
}

.back-to-top-text {
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 2px;
  position: relative;
  z-index: 1;
  opacity: 0.9;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .back-to-top {
    width: 48px;
    height: 48px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
  
  .back-to-top-icon {
    width: 18px;
    height: 18px;
  }
  
  .back-to-top-text {
    font-size: 0.65rem;
  }
  
  .scroll-indicator {
    height: 3px;
  }
}

@media (max-width: 480px) {
  .back-to-top {
    width: 44px;
    height: 44px;
    bottom: 1rem;
    right: 1rem;
  }
  
  .back-to-top-text {
    display: none;
  }
}
</style>
