<template>
  <div class="home">
    <!-- 顶部工具栏 -->
    <div class="top-bar">
      <div class="top-tools">
        <!-- 时钟组件 -->
        <div class="clock-container">
          <div class="clock-display">
            <div class="time">{{ currentTime }}</div>
            <div class="date">{{ currentDate }}</div>
          </div>
          <div class="timezone">{{ timezone }}</div>
        </div>
        
        <!-- 天气组件 -->
        <div class="weather-container">
          <div class="weather-icon">🌤️</div>
          <div class="weather-info">
            <div class="temperature">{{ weather.temperature }}°C</div>
            <div class="weather-desc">{{ weather.description }}</div>
            <div class="location">{{ weather.location }}</div>
          </div>
        </div>
      </div>
      
    </div>
    
      <!-- 主要内容区域 -->
      <div class="home-content" :class="{ 'content-loading': contentLoading }">
        <!-- 欢迎区域 -->
        <section class="welcome-section">
          <div class="welcome-content">
            <h1 class="welcome-title">你好，我是 Frames</h1>
            <p class="welcome-subtitle">C/C++ & AI基础设施 & HPC 爱好者</p>
            <p class="welcome-desc">来自中国武汉，专注于高性能计算和AI基础设施的研究与开发</p>
            <div class="welcome-actions">
              <button class="action-btn primary" @click="navigateToSection('about')">
                了解更多
              </button>
              <button class="action-btn secondary" @click="navigateToSection('contact')">
                联系我
              </button>
            </div>
          </div>
        </section>

        <!-- 核心技能展示 -->
        <section class="skills-preview">
          <h2 class="section-title">核心技能</h2>
          <div class="skills-grid">
            <div class="skill-item" v-for="skill in coreSkills" :key="skill.name">
              <component :is="skill.icon" class="skill-icon" />
              <h3>{{ skill.name }}</h3>
              <p>{{ skill.description }}</p>
            </div>
          </div>
        </section>

        <!-- 最新项目预览 -->
        <section class="projects-preview">
          <h2 class="section-title">最新项目</h2>
          <div class="projects-grid">
              <div class="project-card" v-for="project in featuredProjects.slice(0, 3)" :key="project.id">
                <div class="project-image" :style="{ background: project.gradient }">
                  <div class="project-icon-container">
                    <component :is="project.icon" class="project-icon" />
                  </div>
                </div>
                <div class="project-info">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>
                  <div class="project-tech">
                    <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-tag">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
          </div>
          <div class="view-more">
            <button class="view-more-btn" @click="navigateToPortfolio">
              查看所有项目 →
            </button>
          </div>
        </section>

        <!-- 快速导航 -->
        <section class="quick-nav">
          <h2 class="section-title">快速导航</h2>
          <div class="nav-grid">
            <div class="nav-item" @click="navigateToSection('about')">
              <UserIcon class="nav-icon" />
              <h3>关于我</h3>
              <p>了解我的背景和经历</p>
            </div>
            <div class="nav-item" @click="navigateToSection('skills')">
              <SkillsIcon class="nav-icon" />
              <h3>技能专长</h3>
              <p>查看我的技术栈</p>
            </div>
            <div class="nav-item" @click="navigateToSection('portfolio')">
              <BriefcaseIcon class="nav-icon" />
              <h3>作品展示</h3>
              <p>浏览我的项目作品</p>
            </div>
            <div class="nav-item" @click="navigateToSection('blog')">
              <DocumentTextIcon class="nav-icon" />
              <h3>技术博客</h3>
              <p>阅读我的技术文章</p>
            </div>
            <div class="nav-item" @click="navigateToSection('contact')">
              <EnvelopeIcon class="nav-icon" />
              <h3>联系我</h3>
              <p>与我取得联系</p>
            </div>
          </div>
        </section>
      </div>
    
    <!-- 加载动画 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
    </div>
    
    <!-- 滚动到顶部按钮 -->
    <button 
      class="scroll-to-top" 
      :class="{ visible: showScrollToTop }"
      @click="scrollToTop"
      title="回到顶部"
    >
      ↑
    </button>
  </div>
</template>

<script>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { 
    CodeBracketIcon, 
    CpuChipIcon, 
    BoltIcon, 
    CubeIcon,
    UserIcon,
    CodeBracketIcon as SkillsIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    EnvelopeIcon
  } from '@heroicons/vue/24/outline'

export default {
  name: 'Home',
  components: {
    CodeBracketIcon,
    CpuChipIcon,
    BoltIcon,
    CubeIcon,
    UserIcon,
    SkillsIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    EnvelopeIcon
  },
  setup() {
    // 时钟相关
    const currentTime = ref('')
    const currentDate = ref('')
    const timezone = ref('CST (UTC+8)')
    
    // 天气相关
    const weather = ref({
      temperature: 22,
      description: '多云',
      location: '武汉'
    })
    
    
    
    // 滚动相关
    const showScrollToTop = ref(false)
    
    // 加载状态
    const isLoading = ref(false)
    const contentLoading = ref(true)
    
    // 核心技能数据
    const coreSkills = ref([
      {
        name: 'C/C++',
        icon: 'CodeBracketIcon',
        description: '高性能编程语言，专注系统级开发'
      },
      {
        name: 'AI基础设施',
        icon: 'CpuChipIcon',
        description: '机器学习平台和分布式训练系统'
      },
      {
        name: 'HPC',
        icon: 'BoltIcon',
        description: '高性能计算和并行处理技术'
      },
      {
        name: '容器化',
        icon: 'CubeIcon',
        description: 'Docker和Kubernetes容器编排'
      }
    ])
    
    const featuredProjects = ref([
      {
        id: 1,
        title: 'Paker - C++包管理器',
        description: '为C++项目设计的包控制器，提供简单易用的包管理方式，支持CMake集成',
        icon: 'CodeBracketIcon',
        gradient: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)',
        technologies: ['C++17', 'CMake', 'Package Management', 'CLI']
      },
      {
        id: 2,
        title: 'cuOP - CUDA操作库',
        description: '支持CUDA的操作符库，提供智能内存控制和JIT编译功能，专为高性能GPU计算设计',
        icon: 'CpuChipIcon',
        gradient: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
        technologies: ['CUDA', 'C++', 'HPC', 'JIT', 'GPU Computing']
      },
      {
        id: 3,
        title: 'FTB - 文件浏览器',
        description: '基于FTXUI和Linux的C++文件浏览器，提供现代化的终端文件管理体验',
        icon: 'ComputerDesktopIcon',
        gradient: 'linear-gradient(135deg, #d69e2e 0%, #b7791f 100%)',
        technologies: ['C++', 'FTXUI', 'Linux', 'CMake', 'Terminal UI']
      }
    ])
    
    const skillCategories = ref([
      {
        name: '编程语言',
        iconText: '💻',
        color: '#409eff',
        skills: [
          { name: 'C/C++', level: 95 },
          { name: 'Python', level: 90 },
          { name: 'Go', level: 80 },
          { name: 'Shell Script', level: 75 }
        ]
      },
      {
        name: 'AI & 机器学习',
        iconText: '🤖',
        color: '#67c23a',
        skills: [
          { name: 'PyTorch', level: 90 },
          { name: 'TensorFlow', level: 85 },
          { name: 'CUDA', level: 80 },
          { name: 'OpenMP', level: 75 }
        ]
      },
      {
        name: '容器化 & 编排',
        iconText: '🐳',
        color: '#e6a23c',
        skills: [
          { name: 'Docker', level: 90 },
          { name: 'Kubernetes', level: 85 },
          { name: 'Podman', level: 70 },
          { name: 'Helm', level: 75 }
        ]
      },
      {
        name: '数据库 & 存储',
        iconText: '🗄️',
        color: '#f56c6c',
        skills: [
          { name: 'MySQL', level: 85 },
          { name: 'PostgreSQL', level: 80 },
          { name: 'Redis', level: 75 },
          { name: 'MongoDB', level: 70 }
        ]
      },
      {
        name: '开发工具',
        iconText: '🛠️',
        color: '#9c27b0',
        skills: [
          { name: 'Git', level: 95 },
          { name: 'CMake', level: 90 },
          { name: 'Make', level: 85 },
          { name: 'GDB', level: 80 }
        ]
      },
      {
        name: '操作系统',
        iconText: '🐧',
        color: '#ff9800',
        skills: [
          { name: 'Linux', level: 95 },
          { name: 'Ubuntu', level: 90 },
          { name: 'CentOS', level: 85 },
          { name: 'Arch Linux', level: 80 }
        ]
      }
    ])
    
    // 时钟更新函数
    const updateClock = () => {
      const now = new Date()
      
      // 格式化时间
      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      currentTime.value = now.toLocaleTimeString('zh-CN', timeOptions)
      
      // 格式化日期
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
      currentDate.value = now.toLocaleDateString('zh-CN', dateOptions)
    }
    
    // 天气更新函数
    const updateWeather = () => {
      // 模拟天气数据更新
      const weathers = [
        { temperature: 22, description: '多云', location: '武汉' },
        { temperature: 25, description: '晴天', location: '武汉' },
        { temperature: 18, description: '小雨', location: '武汉' },
        { temperature: 28, description: '晴天', location: '武汉' }
      ]
      const randomWeather = weathers[Math.floor(Math.random() * weathers.length)]
      weather.value = randomWeather
    }
    
    
          // 导航到指定区域
          const navigateToSection = (sectionId) => {
            // 通过事件总线通知父组件切换标签页
            window.dispatchEvent(new CustomEvent('navigate-to-tab', { 
              detail: { tabId: sectionId } 
            }))
          }
          
          // 导航到作品展示页面
          const navigateToPortfolio = () => {
            window.dispatchEvent(new CustomEvent('navigate-to-tab', { 
              detail: { tabId: 'portfolio' } 
            }))
          }
    
    
    
    // 滚动监听
    const handleScroll = () => {
      showScrollToTop.value = window.scrollY > 300
    }
    
    // 模拟加载
    const simulateLoading = () => {
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    }
    
    // 生命周期
    onMounted(() => {
      // 添加滚动监听
      window.addEventListener('scroll', handleScroll)
      
      // 初始化时钟
      updateClock()
      const clockInterval = setInterval(updateClock, 1000)
      
      // 初始化天气
      updateWeather()
      const weatherInterval = setInterval(updateWeather, 30000) // 30秒更新一次
      
      // 模拟初始加载
      setTimeout(() => {
        contentLoading.value = false
      }, 800)
      
      // 清理定时器
      onUnmounted(() => {
        clearInterval(clockInterval)
        clearInterval(weatherInterval)
      })
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    
    return {
      // 数据
      coreSkills,
      featuredProjects,
      
      // 时钟
      currentTime,
      currentDate,
      timezone,
      
      // 天气
      weather,
      
      // 导航
      navigateToSection,
      navigateToPortfolio,
      
      // 滚动
      showScrollToTop,
      
      // 加载
      isLoading,
      contentLoading
    }
  }
}
</script>

<style scoped>
.home {
  padding: 0;
  background: #f8f9fa;
  min-height: 100vh;
}

/* 顶部工具栏 */
.top-bar {
  margin-bottom: 2rem;
  animation: fadeInDown 0.6s ease-out;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.top-tools {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
}


.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  border-radius: 24px;
  padding: 2rem 2.5rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 140px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.clock-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  animation: shimmer 3s ease-in-out infinite;
}

.clock-container:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  border-color: rgba(255, 255, 255, 0.2);
}

.clock-display {
  text-align: center;
  position: relative;
  z-index: 1;
}

.time {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  letter-spacing: 0.08em;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  margin-bottom: 0.8rem;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.date {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.02em;
  margin-bottom: 0.5rem;
}

.timezone {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 天气组件 */
.weather-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 2rem 2.5rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 140px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.weather-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  animation: shimmer 4s ease-in-out infinite;
}

.weather-container:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  border-color: rgba(255, 255, 255, 0.2);
}

.weather-icon {
  font-size: 3rem;
  margin-right: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.weather-container:hover .weather-icon {
  transform: scale(1.1) rotate(5deg);
}

.weather-info {
  text-align: left;
  position: relative;
  z-index: 1;
}

.temperature {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  margin-bottom: 0.4rem;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.weather-desc {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.2rem;
}

.location {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
}





  /* 主页内容布局 */
  .home-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    transition: opacity 0.4s ease;
  }

  .home-content.content-loading {
    opacity: 0.6;
  }

  /* 欢迎区域 */
  .welcome-section {
    text-align: center;
    padding: 4rem 0;
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    color: white;
    border-radius: 20px;
    margin-bottom: 3rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .welcome-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }

  .welcome-content {
    position: relative;
    z-index: 1;
  }

  .welcome-title {
    font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
    animation: fadeInUp 0.8s ease-out;
  }

  .welcome-subtitle {
    font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 1rem;
    opacity: 0.9;
    letter-spacing: 0.01em;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  .welcome-desc {
    font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
    opacity: 0.8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    letter-spacing: 0.01em;
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }

  .welcome-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    animation: fadeInUp 0.8s ease-out 0.6s both;
  }

  .action-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }

  .action-btn.primary {
    background: white;
    color: #1a202c;
    font-weight: 600;
  }

  .action-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  .action-btn.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
    font-weight: 600;
  }

  .action-btn.secondary:hover {
    background: white;
    color: #1a202c;
    transform: translateY(-2px);
  }

  /* 区域标题 */
  .section-title {
    font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2.5rem;
    color: #1a202c;
    letter-spacing: -0.01em;
    line-height: 1.3;
    position: relative;
  }

  .section-title::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(45deg, #3182ce, #2b6cb0);
    border-radius: 2px;
  }

  /* 技能预览 */
  .skills-preview {
    margin-bottom: 4rem;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .skill-item {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .skill-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .skill-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    color: #3182ce;
  }

      .skill-item h3 {
        font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 0.8rem;
        color: #1a202c;
        letter-spacing: -0.01em;
        line-height: 1.3;
      }

      .skill-item p {
        font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        color: #4a5568;
        line-height: 1.6;
        letter-spacing: 0.01em;
      }

  /* 项目预览 */
  .projects-preview {
    margin-bottom: 4rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .project-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

      .project-image {
        height: 200px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      }

      .project-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }

      .project-icon {
        width: 80px;
        height: 80px;
        color: white;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        transition: all 0.3s ease;
      }

      .project-card:hover .project-icon {
        transform: scale(1.1) rotate(5deg);
      }

  .project-info {
    padding: 1.5rem;
  }

      .project-info h3 {
        font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 0.8rem;
        color: #1a202c;
        letter-spacing: -0.01em;
        line-height: 1.3;
      }

      .project-info p {
        font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        color: #4a5568;
        line-height: 1.6;
        margin-bottom: 1rem;
        letter-spacing: 0.01em;
      }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

      .tech-tag {
        font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #f8f9fa;
        color: #495057;
        padding: 0.4rem 0.9rem;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 500;
        letter-spacing: 0.01em;
      }

  .view-more {
    text-align: center;
  }

  .view-more-btn {
    background: linear-gradient(45deg, #20c997, #17a2b8);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-more-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(32, 201, 151, 0.3);
  }

  /* 快速导航 */
  .quick-nav {
    margin-bottom: 4rem;
  }

  .nav-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .nav-item {
    background: white;
    padding: 2rem 1.5rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .nav-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .nav-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
    color: #3182ce;
  }

      .nav-item h3 {
        font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 0.8rem;
        color: #1a202c;
        letter-spacing: -0.01em;
        line-height: 1.3;
      }

      .nav-item p {
        font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        color: #4a5568;
        line-height: 1.6;
        letter-spacing: 0.01em;
      }

  /* 卡片基础样式 */
  .content-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInUp 0.6s ease-out;
    position: relative;
    min-height: 300px;
  }

.content-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.content-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(45deg, #20c997, #17a2b8);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.content-card:hover::before {
  opacity: 1;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid #f1f3f4;
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.card-icon {
  font-size: 1.8rem;
  opacity: 0.7;
}

/* 卡片内容 */
.card-content {
  padding: 1.5rem 2rem 2rem;
}

  /* 博客卡片 */
  .blog-card {
    grid-column: span 7;
    grid-row: span 2;
  }

  .blog-posts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.2rem;
  }

.blog-post {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.blog-post:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #6c757d;
}

.post-category {
  background: linear-gradient(45deg, #20c997, #17a2b8);
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.post-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.post-excerpt {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-stats {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #6c757d;
}

  /* 项目卡片 */
  .project-card {
    grid-column: span 5;
    grid-row: span 2;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
  }

.project-item {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-item:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-item:hover .project-overlay {
  opacity: 1;
}

.view-btn {
  background: white;
  color: #2c3e50;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: #20c997;
  color: white;
  transform: scale(1.05);
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.project-info p {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #e9ecef;
  color: #495057;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

  /* 技能卡片 */
  .skills-card {
    grid-column: span 12;
    grid-row: span 2;
  }

  .skills-categories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

.skill-category {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.skill-category:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.category-icon {
  font-size: 1.5rem;
}

.category-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #495057;
  min-width: 80px;
}

.skill-bar {
  flex: 1;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(45deg, #20c997, #17a2b8);
  border-radius: 3px;
  transition: width 1s ease;
}

.skill-level {
  font-size: 0.8rem;
  color: #6c757d;
  min-width: 35px;
  text-align: right;
}

/* 关于我卡片 */
.about-card {
  grid-column: span 4;
  grid-row: span 1;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-text p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
  }

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #20c997;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
}

/* 联系我卡片 */
.contact-card {
  grid-column: span 4;
  grid-row: span 1;
}

  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.contact-icon {
  font-size: 1.2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input,
.form-textarea {
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #20c997;
  box-shadow: 0 0 0 3px rgba(32, 201, 151, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  background: linear-gradient(45deg, #20c997, #17a2b8);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(32, 201, 151, 0.3);
}

/* 快速链接卡片 */
.links-card {
  grid-column: span 4;
  grid-row: span 1;
}

  .links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  text-decoration: none;
  color: #495057;
  transition: all 0.3s ease;
}

.quick-link:hover {
  background: #e9ecef;
  transform: translateY(-3px);
  color: #20c997;
}

.link-icon {
  font-size: 2rem;
}

.quick-link span:last-child {
  font-weight: 500;
  font-size: 0.9rem;
}

/* 动画效果 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 加载动画 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

  .loading-spinner {
    text-align: center;
    color: #3182ce;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3182ce;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  .loading-spinner p {
    font-size: 1.1rem;
    font-weight: 500;
    animation: pulse 1.5s ease-in-out infinite;
  }

/* 滚动到顶部按钮 */
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #20c997, #17a2b8);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(32, 201, 151, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
}

.scroll-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-to-top:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(32, 201, 151, 0.4);
}

  /* 响应式设计 */
  @media (max-width: 768px) {
    .home-content {
      padding: 0 1rem;
    }
    
    .welcome-title {
      font-size: 2rem;
    }
    
    .welcome-subtitle {
      font-size: 1.2rem;
    }
    
    .welcome-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .action-btn {
      width: 200px;
    }
    
    .skills-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .projects-grid {
      grid-template-columns: 1fr;
    }
    
    .nav-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .top-tools {
      gap: 1rem;
    }
    
    .clock-container {
      width: 100%;
      max-width: 350px;
      padding: 1.2rem 1.5rem;
    }
    
    .time {
      font-size: 1.8rem;
    }
    
    .date {
      font-size: 0.8rem;
    }
    
    .timezone {
      font-size: 0.7rem;
    }
    
    .weather-container {
      width: 100%;
      max-width: 350px;
      padding: 1.2rem 1.5rem;
    }
    
    .temperature {
      font-size: 1.6rem;
    }
    
    .weather-desc {
      font-size: 0.8rem;
    }
    
    .location {
      font-size: 0.7rem;
    }
    
    .weather-icon {
      font-size: 2.2rem;
      margin-right: 1rem;
    }
    
    .welcome-section {
      padding: 2rem 0;
    }
    
    .welcome-title {
      font-size: 1.8rem;
    }
    
    .welcome-subtitle {
      font-size: 1rem;
    }
    
    .skills-grid {
      grid-template-columns: 1fr;
    }
    
    .nav-grid {
      grid-template-columns: 1fr;
    }
  }

@media (max-width: 768px) {
  .top-bar {
    padding: 1rem 0;
  }
  
  .top-tools {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .clock-container {
    width: 100%;
    max-width: 400px;
    padding: 1.5rem 2rem;
  }
  
  .time {
    font-size: 2rem;
  }
  
  .date {
    font-size: 0.85rem;
  }
  
  .timezone {
    font-size: 0.75rem;
  }
  
  .weather-container {
    width: 100%;
    max-width: 400px;
    padding: 1.5rem 2rem;
  }
  
  .temperature {
    font-size: 1.8rem;
  }
  
  .weather-desc {
    font-size: 0.85rem;
  }
  
  .location {
    font-size: 0.75rem;
  }
  
  .weather-icon {
    font-size: 2.5rem;
    margin-right: 1.2rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .blog-card,
  .project-card,
  .skills-card,
  .about-card,
  .contact-card,
  .links-card {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  .project-grid {
    grid-template-columns: 1fr;
  }
  
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .skills-categories {
    grid-template-columns: 1fr;
  }
  
  .project-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-posts {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .about-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .card-header {
    padding: 1rem 1.5rem 0.5rem;
  }
  
  .card-content {
    padding: 1rem 1.5rem 1.5rem;
  }
}
</style>