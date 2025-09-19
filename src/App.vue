<template>
  <div id="app">
    <!-- 滚动进度指示器 -->
    <div class="scroll-indicator">
      <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
    </div>
    
    <!-- 主布局容器 -->
    <div class="main-layout">
      <!-- 左侧边栏 -->
      <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <div class="sidebar-content">
          <!-- 个人头像和基本信息 -->
          <div class="profile-section">
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
            <h2 class="profile-name">Frames</h2>
            <p class="profile-title">C/C++ & AI基础设施 & HPC 爱好者</p>
            <p class="profile-desc">专注于高性能计算和AI基础设施</p>
          </div>
          
          <!-- 导航菜单 -->
          <nav class="sidebar-nav">
            <a 
              v-for="item in menuItems" 
              :key="item.name"
              :href="item.href" 
              class="nav-item"
              :class="{ active: activeSection === item.key }"
              :data-tooltip="item.name"
              @click="scrollToSection(item.href, $event)"
            >
              <component :is="item.icon" class="nav-icon" />
              <span class="nav-text">{{ item.name }}</span>
            </a>
          </nav>
          
          <!-- 社交链接 -->
          <div class="social-links">
            <a href="https://github.com/Cyxuan0311" target="_blank" class="social-link github" title="GitHub" data-tooltip="GitHub">
              <CodeBracketIcon class="social-icon" />
              <span class="social-text">GitHub</span>
            </a>
            <a href="mailto:cyxvvv@gmail.com" class="social-link email" title="邮箱" data-tooltip="邮箱">
              <EnvelopeIcon class="social-icon" />
              <span class="social-text">邮箱</span>
            </a>
          </div>
        </div>
        
        <!-- 侧边栏折叠按钮 -->
        <button class="sidebar-toggle" @click="toggleSidebar">
          <ChevronLeftIcon v-if="!sidebarCollapsed" class="toggle-icon" />
          <ChevronRightIcon v-else class="toggle-icon" />
        </button>
      </aside>
      
        <!-- 右侧主内容区 -->
        <main class="main-content">
          <!-- 标签页导航 -->
          <div class="tab-navigation">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              class="tab-btn"
              :class="{ active: activeTab === tab.id }"
              @click="switchTab(tab.id)"
            >
              <component :is="tab.icon" class="tab-icon" />
              <span class="tab-text">{{ tab.name }}</span>
            </button>
          </div>
          
          <!-- 标签页内容 -->
          <div class="tab-content" :class="{ 'loading': pageLoading, 'transitioning': pageTransition }">
            <transition name="page-fade" mode="out-in">
              <component :is="currentComponent" :key="activeTab" />
            </transition>
            
            <!-- 页面加载覆盖层 -->
            <div v-if="pageLoading" class="page-loading-overlay">
              <div class="page-loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
              </div>
              <p class="loading-text">加载中...</p>
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
    >
      ↑
    </button>
  </div>
</template>

<script>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import Home from './views/Home.vue'
  import About from './views/About.vue'
  import Skills from './views/Skills.vue'
  import Portfolio from './views/Portfolio.vue'
  import Blog from './views/Blog.vue'
  import Contact from './views/Contact.vue'
  import Footer from './components/Footer.vue'
  import { 
    HomeIcon, 
    UserIcon, 
    CodeBracketIcon, 
    BriefcaseIcon, 
    DocumentTextIcon, 
    EnvelopeIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  } from '@heroicons/vue/24/outline'

export default {
  name: 'App',
  components: {
    Home,
    About,
    Skills,
    Portfolio,
    Blog,
    Contact,
    Footer,
    HomeIcon,
    UserIcon,
    CodeBracketIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  setup() {
    const scrollProgress = ref(0)
    const showBackToTop = ref(false)
    const sidebarCollapsed = ref(false)
    const activeSection = ref('home')
    const activeTab = ref('home')
    const imageLoading = ref(true)
    const imageError = ref(false)
    const pageLoading = ref(false)
    const pageTransition = ref(false)
    
    // 动态组件计算属性
    const currentComponent = computed(() => {
      const componentMap = {
        'home': 'Home',
        'about': 'About',
        'skills': 'Skills',
        'portfolio': 'Portfolio',
        'blog': 'Blog',
        'contact': 'Contact'
      }
      return componentMap[activeTab.value] || 'Home'
    })
    
    const menuItems = [
      { name: '首页', href: '#home', key: 'home', icon: 'HomeIcon' },
      { name: '关于我', href: '#about', key: 'about', icon: 'UserIcon' },
      { name: '技能', href: '#skills', key: 'skills', icon: 'CodeBracketIcon' },
      { name: '作品展示', href: '#portfolio', key: 'portfolio', icon: 'BriefcaseIcon' },
      { name: '个人博客', href: '#blog', key: 'blog', icon: 'DocumentTextIcon' },
      { name: '联系我', href: '#contact', key: 'contact', icon: 'EnvelopeIcon' }
    ]
    
    const tabs = [
      { id: 'home', name: '首页', icon: 'HomeIcon' },
      { id: 'about', name: '关于我', icon: 'UserIcon' },
      { id: 'skills', name: '技能', icon: 'CodeBracketIcon' },
      { id: 'portfolio', name: '作品', icon: 'BriefcaseIcon' },
      { id: 'blog', name: '博客', icon: 'DocumentTextIcon' },
      { id: 'contact', name: '联系', icon: 'EnvelopeIcon' }
    ]
    
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / scrollHeight) * 100
      scrollProgress.value = Math.min(progress, 100)
      
      // 显示/隐藏返回顶部按钮
      showBackToTop.value = scrollTop > 300
      
      // 更新当前活动区域
      const sections = ['home', 'about', 'skills', 'portfolio', 'blog', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            activeSection.value = section
            break
          }
        }
      }
    }
    
    const scrollToSection = (href, event) => {
      event.preventDefault()
      const targetId = href.replace('#', '')
      
      // 切换到对应的标签页
      if (tabs.some(tab => tab.id === targetId)) {
        switchTab(targetId)
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    
    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }
    
    const handleImageLoad = () => {
      imageLoading.value = false
      imageError.value = false
    }
    
    const handleImageError = () => {
      imageLoading.value = false
      imageError.value = true
    }
    
    onMounted(() => {
      window.addEventListener('scroll', updateScrollProgress)
      
      // 监听导航事件
      window.addEventListener('navigate-to-tab', (event) => {
        const { tabId } = event.detail
        if (tabId && tabs.some(tab => tab.id === tabId)) {
          switchTab(tabId)
        }
      })
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('navigate-to-tab', () => {})
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
      menuItems,
      tabs,
      scrollToSection,
      scrollToTop,
      toggleSidebar,
      switchTab,
      handleImageLoad,
      handleImageError
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #1a202c;
    min-height: 100vh;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
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
  background-color: #f8f9fa;
}

/* 主布局 */
.main-layout {
  display: flex;
  min-height: 100vh;
}

  /* 左侧边栏 */
  .sidebar {
    width: 300px;
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    color: #e2e8f0;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
    border-right: 1px solid #4a5568;
  }

.sidebar-collapsed {
  width: 80px;
}

.sidebar-collapsed .sidebar-content {
  padding: 1rem 0.5rem;
  align-items: center;
}

.sidebar-collapsed .profile-section {
  text-align: center;
  margin-bottom: 2rem;
}

.sidebar-collapsed .profile-name,
.sidebar-collapsed .profile-title,
.sidebar-collapsed .profile-desc {
  display: none;
}

.sidebar-collapsed .avatar-container {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
}

.sidebar-collapsed .sidebar-nav {
  width: 100%;
  margin-bottom: 2rem;
}

.sidebar-collapsed .nav-item {
  justify-content: center;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  position: relative;
}

.sidebar-collapsed .nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-collapsed .nav-item.active {
  background: rgba(49, 130, 206, 0.2);
  border-left: 3px solid #3182ce;
}

.sidebar-collapsed .nav-item::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  margin-left: 1rem;
  z-index: 1000;
}

.sidebar-collapsed .nav-item::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: rgba(0, 0, 0, 0.8);
  margin-left: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.sidebar-collapsed .nav-item:hover::after,
.sidebar-collapsed .nav-item:hover::before {
  opacity: 1;
}

.sidebar-collapsed .social-links {
  flex-direction: column;
  gap: 0.8rem;
  padding: 0;
  align-items: center;
}

.sidebar-collapsed .social-link {
  padding: 0.8rem;
  justify-content: center;
  border-radius: 12px;
  position: relative;
}

.sidebar-collapsed .social-text {
  display: none;
}

.sidebar-collapsed .social-link::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  margin-left: 1rem;
  z-index: 1000;
}

.sidebar-collapsed .social-link::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: rgba(0, 0, 0, 0.8);
  margin-left: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.sidebar-collapsed .social-link:hover::after,
.sidebar-collapsed .social-link:hover::before {
  opacity: 1;
}

/* 收起状态下的额外优化 */
.sidebar-collapsed .sidebar {
  border-right: 2px solid rgba(49, 130, 206, 0.3);
}

.sidebar-collapsed .avatar {
  border: 3px solid rgba(49, 130, 206, 0.5);
  box-shadow: 0 0 20px rgba(49, 130, 206, 0.3);
}

.sidebar-collapsed .nav-icon {
  width: 24px;
  height: 24px;
}

.sidebar-collapsed .social-icon {
  width: 22px;
  height: 22px;
}

/* 收起状态下的状态指示器优化 */
.sidebar-collapsed .status-indicator {
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.sidebar-collapsed .status-dot {
  width: 6px;
  height: 6px;
}

/* 收起状态下的折叠按钮位置调整 */
.sidebar-collapsed + .main-content .sidebar-toggle {
  right: -12px;
}

.sidebar-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 个人资料区域 */
.profile-section {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease-out;
}

  .avatar-container {
    position: relative;
    margin: 0 auto 1.5rem;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  filter: brightness(1.1) contrast(1.1);
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.5);
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

.profile-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.profile-title {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.profile-desc {
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.5;
}

/* 导航菜单 */
.sidebar-nav {
  flex: 1;
  margin-bottom: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

  .nav-icon {
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

.nav-item:hover .nav-icon {
  transform: scale(1.2);
}

.nav-text {
  font-weight: 500;
  transition: all 0.3s ease;
}

.sidebar-collapsed .nav-text {
  opacity: 0;
  transform: translateX(-20px);
}

.sidebar-collapsed .nav-item {
  justify-content: center;
  padding: 1rem;
}

.sidebar-collapsed .nav-icon {
  margin-right: 0;
}

/* 社交链接 */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
  padding: 0 1rem;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 200px;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.social-link:hover::before {
  left: 100%;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.social-link:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.social-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.social-text {
  transition: all 0.3s ease;
}

.social-link.github:hover {
  background: linear-gradient(135deg, rgba(36, 41, 46, 0.9), rgba(36, 41, 46, 0.7));
  border-color: rgba(255, 255, 255, 0.3);
}

.social-link.email:hover {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(220, 38, 38, 0.7));
  border-color: rgba(255, 255, 255, 0.3);
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
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 1001;
  }

  .toggle-icon {
    width: 16px;
    height: 16px;
    color: #4a5568;
  }

.sidebar-toggle:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

  /* 主内容区 */
  .main-content {
    flex: 1;
    margin-left: 300px;
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 100vh;
  }

  /* 标签页导航 */
  .tab-navigation {
    display: flex;
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 0 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
  }

  .tab-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border: none;
    background: transparent;
    color: #718096;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-bottom: 3px solid transparent;
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    overflow: hidden;
  }

  .tab-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(49, 130, 206, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .tab-btn:hover::before {
    left: 100%;
  }

  .tab-btn:hover {
    color: #2d3748;
    background: rgba(26, 32, 44, 0.05);
  }

  .tab-btn.active {
    color: #2d3748;
    border-bottom-color: #3182ce;
    background: rgba(49, 130, 206, 0.1);
    font-weight: 600;
  }

  .tab-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .tab-text {
    white-space: nowrap;
  }

  /* 标签页内容 */
  .tab-content {
    min-height: calc(100vh - 200px);
    position: relative;
  }

  .tab-content.loading {
    opacity: 0.7;
    pointer-events: none;
  }

  .tab-content.transitioning {
    overflow: hidden;
  }

  /* 页面过渡动画 */
  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .page-fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }

  .page-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  /* 页面加载覆盖层 */
  .page-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
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
    color: #4a5568;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }

.sidebar-collapsed + .main-content {
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
      transform: translateX(-100%);
    }
    
    .sidebar:not(.sidebar-collapsed) {
      transform: translateX(0);
    }
    
    .main-content {
      margin-left: 0;
    }
    
    .sidebar-toggle {
      display: none;
    }
    
    .sidebar-collapsed {
      width: 100%;
    }
    
    .tab-navigation {
      padding: 0 1rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    
    .tab-btn {
      padding: 0.8rem 1rem;
      font-size: 0.8rem;
    }
    
    .tab-text {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .tab-navigation {
      padding: 0 0.5rem;
    }
    
    .tab-btn {
      padding: 0.6rem 0.8rem;
      min-width: 50px;
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
</style>
