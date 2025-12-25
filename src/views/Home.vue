<template>
  <div class="home">
    <!-- 顶部工具栏 -->
    <div class="top-bar">
      <div class="top-tools">
        <!-- 时钟组件 - TUI风格 -->
        <div class="tui-clock-container">
          <div class="tui-clock-header">
            <span class="tui-header-decoration">┌─</span>
            <span class="tui-clock-title">SYSTEM TIME</span>
            <span class="tui-header-decoration">─┐</span>
          </div>
          <div class="tui-clock-body">
            <div class="tui-clock-display">
              <div class="tui-time-line">
                <span class="tui-prompt">$</span>
                <span class="tui-time-label">TIME:</span>
                <span class="tui-time-value">{{ currentTime }}</span>
              </div>
              <div class="tui-date-line">
                <span class="tui-prompt">$</span>
                <span class="tui-date-label">DATE:</span>
                <span class="tui-date-value">{{ currentDate }}</span>
              </div>
              <div class="tui-timezone-line">
                <span class="tui-prompt">$</span>
                <span class="tui-timezone-label">TZ:</span>
                <span class="tui-timezone-value">{{ timezone }}</span>
              </div>
            </div>
            <div class="tui-clock-footer">
              <span class="tui-footer-line">────────────────────────</span>
            </div>
          </div>
        </div>
        
        <!-- 天气组件 - TUI风格 -->
        <div class="tui-weather-container">
          <div class="tui-weather-header">
            <span class="tui-header-decoration">┌─</span>
            <span class="tui-weather-title">WEATHER</span>
            <span class="tui-header-decoration">─┐</span>
          </div>
          <div class="tui-weather-body">
            <div class="tui-weather-display">
              <div class="tui-weather-icon-wrapper">
                <div class="weather-icon">🌤️</div>
              </div>
              <div class="tui-weather-info">
                <div class="tui-weather-line">
                  <span class="tui-prompt">$</span>
                  <span class="tui-weather-label">TEMP:</span>
                  <span class="tui-weather-value">{{ weather.temperature }}°C</span>
                </div>
                <div class="tui-weather-line">
                  <span class="tui-prompt">$</span>
                  <span class="tui-weather-label">COND:</span>
                  <span class="tui-weather-value">{{ weather.description }}</span>
                </div>
                <div class="tui-weather-line">
                  <span class="tui-prompt">$</span>
                  <span class="tui-weather-label">LOC:</span>
                  <span class="tui-weather-value">{{ weather.location }}</span>
                </div>
              </div>
            </div>
            <div class="tui-weather-footer">
              <span class="tui-footer-line">────────────────────────</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
      <!-- 主要内容区域 -->
      <div class="home-content" :class="{ 'content-loading': contentLoading }">
        <!-- 终端欢迎区域 -->
        <section class="terminal-section">
          <div class="terminal-window">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="terminal-btn close"></span>
                <span class="terminal-btn minimize"></span>
                <span class="terminal-btn maximize"></span>
              </div>
              <div class="terminal-title">Terminal</div>
            </div>
            <div class="terminal-body">
              <div class="terminal-line" v-for="(line, index) in terminalLines" :key="`line-${index}`">
                <template v-if="line.type === 'command'">
                  <span class="terminal-prompt">
                    <span class="prompt-user">frames</span>
                    <span class="prompt-at">@</span>
                    <span class="prompt-host">portfolio</span>
                    <span class="prompt-separator">:</span>
                    <span class="prompt-path">~</span>
                    <span class="prompt-symbol">$</span>
                  </span>
                  <span class="terminal-command">
                    {{ line.displayText || line.text }}
                    <span class="cursor" v-if="line.isTyping">█</span>
                  </span>
                </template>
                <template v-else-if="line.type === 'output'">
                  <span class="terminal-output">
                    {{ line.displayText || line.text }}
                    <span class="cursor" v-if="line.isTyping">█</span>
                  </span>
                </template>
              </div>
            </div>
          </div>
        </section>

        <!-- 核心技能展示 -->
        <section class="tui-skills-preview">
          <div class="tui-section-header">
            <span class="tui-header-decoration">┌─</span>
            <span class="tui-section-title">{{ homeText.sections.coreSkills }}</span>
            <span class="tui-header-decoration">─┐</span>
          </div>
          <div class="tui-skills-grid">
            <div class="tui-skill-card" v-for="skill in coreSkills" :key="skill.name">
              <div class="tui-card-header">
                <span class="tui-bracket">[</span>
                <component :is="skill.icon" class="tui-skill-icon" />
                <span class="tui-skill-name">{{ skill.name }}</span>
                <span class="tui-bracket">]</span>
              </div>
              <div class="tui-card-body">
                <div class="tui-skill-description">
                  <span class="tui-prompt">·</span>
                  <span>{{ skill.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 最新项目预览 -->
        <section class="tui-projects-preview">
          <div class="tui-section-header">
            <span class="tui-header-decoration">┌─</span>
            <span class="tui-section-title">{{ homeText.sections.latestProjects }}</span>
            <span class="tui-header-decoration">─┐</span>
          </div>
          <div class="tui-projects-grid">
            <div class="tui-project-card" v-for="project in featuredProjects.slice(0, 3)" :key="project.id">
              <div class="tui-project-header">
                <div class="tui-project-icon-wrapper">
                  <component :is="project.icon" class="tui-project-icon" />
                </div>
              </div>
              <div class="tui-project-content">
                <div class="tui-project-title-line">
                  <span class="tui-prompt">$</span>
                  <span class="tui-project-title">{{ project.title }}</span>
                </div>
                <div class="tui-project-desc-line">
                  <span class="tui-prompt">·</span>
                  <span class="tui-project-description">{{ project.description }}</span>
                </div>
                <div class="tui-project-tech">
                  <div class="tui-tech-line">
                    <span class="tui-prompt">→</span>
                    <span class="tui-tech-label">TECH:</span>
                    <span 
                      v-for="(tech, index) in project.technologies.slice(0, 3)" 
                      :key="tech"
                      class="tui-tech-tag"
                    >
                      {{ tech }}<span v-if="index < Math.min(project.technologies.length, 3) - 1">,</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tui-view-more">
            <button class="tui-button" @click="navigateToPortfolio">
              <span class="tui-button-text">→ {{ homeText.viewAll }}</span>
            </button>
          </div>
        </section>

        <!-- 快速导航 -->
        <section class="tui-quick-nav">
          <div class="tui-section-header">
            <span class="tui-header-decoration">┌─</span>
            <span class="tui-section-title">{{ homeText.sections.quickNav }}</span>
            <span class="tui-header-decoration">─┐</span>
          </div>
          <div class="tui-nav-grid">
            <div
              class="tui-nav-item"
              v-for="item in quickNavItems"
              :key="item.target"
              @click="navigateToSection(item.target)"
            >
              <div class="tui-nav-header">
                <component :is="item.icon" class="tui-nav-icon" />
                <span class="tui-nav-title">{{ item.title }}</span>
              </div>
              <div class="tui-nav-body">
                <div class="tui-nav-description">
                  <span class="tui-prompt">·</span>
                  <span>{{ item.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    
    <!-- 加载动画 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>{{ homeText.loadingText }}</p>
      </div>
    </div>
    
    <!-- 滚动到顶部按钮 -->
    <button 
      class="scroll-to-top" 
      :class="{ visible: showScrollToTop }"
      @click="scrollToTop"
      :title="homeText.scrollTopTitle"
    >
      ↑
    </button>
  </div>
</template>

<script>
  import { ref, onMounted, onUnmounted, computed } from 'vue'
  import { 
    CodeBracketIcon, 
    CpuChipIcon, 
    BoltIcon, 
    CubeIcon,
    UserIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ComputerDesktopIcon
  } from '@heroicons/vue/24/outline'
  import { useI18n } from '../composables/useI18n'

export default {
  name: 'Home',
  components: {
    CodeBracketIcon,
    CpuChipIcon,
    BoltIcon,
    CubeIcon,
    UserIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ComputerDesktopIcon
  },
  setup() {
    // 时钟相关
    const currentTime = ref('')
    const currentDate = ref('')
    const weatherIndex = ref(0)
    const { locale, messages } = useI18n()
    const homeText = computed(() => messages.value.home)
    const timezone = computed(() => homeText.value.timezone)
    
    // 天气相关
    const weatherOptions = computed(() => homeText.value.weatherOptions)
    const weather = computed(() => weatherOptions.value[weatherIndex.value] || { temperature: 0, description: '', location: '' })
    const timeLocale = computed(() => (locale.value === 'zh' ? 'zh-CN' : 'en-US'))
    
    
    
    // 滚动相关
    const showScrollToTop = ref(false)
    
    // 加载状态
    const isLoading = ref(false)
    const contentLoading = ref(true)
    
    // 核心技能与内容
    const coreSkills = computed(() => homeText.value.coreSkills)
    const featuredProjects = computed(() => homeText.value.featuredProjects)
    const quickNavItems = computed(() => homeText.value.quickNav)
    
    // 终端相关
    const terminalLines = ref([])
    let typeInterval = null
    
    // 终端显示的内容
    const terminalContent = [
      { 
        type: 'command', 
        text: 'who am i', 
        output: [
          '你好，我是 Frames',
          'C/C++ & AI基础设施 & HPC 爱好者',
          '来自中国武汉，专注于高性能计算和AI基础设施的研究与开发'
        ]
      }
    ]
    
    // 打字机效果函数
    const typeText = (text, callback, speed = 50) => {
      let index = 0
      
      if (typeInterval) {
        clearInterval(typeInterval)
      }
      
      typeInterval = setInterval(() => {
        if (index < text.length) {
          // 更新最后一行（当前正在输入的行）
          const lastLine = terminalLines.value[terminalLines.value.length - 1]
          if (lastLine) {
            lastLine.displayText = text.substring(0, index + 1)
            lastLine.isTyping = true
          }
          index++
        } else {
          clearInterval(typeInterval)
          typeInterval = null
          // 完成打字
          const lastLine = terminalLines.value[terminalLines.value.length - 1]
          if (lastLine) {
            lastLine.isTyping = false
          }
          setTimeout(() => {
            if (callback) callback()
          }, 500)
        }
      }, speed)
    }
    
    // 显示输出
    const showOutput = (outputLines, callback) => {
      let lineIndex = 0
      const showNextLine = () => {
        if (lineIndex < outputLines.length) {
          const outputLine = {
            type: 'output',
            text: outputLines[lineIndex],
            displayText: '',
            isTyping: true
          }
          terminalLines.value.push(outputLine)
          
          typeText(outputLines[lineIndex], () => {
            // 完成打字后，更新行状态
            const line = terminalLines.value[terminalLines.value.length - 1]
            if (line) {
              line.displayText = outputLines[lineIndex]
              line.isTyping = false
            }
            lineIndex++
            if (lineIndex < outputLines.length) {
              setTimeout(showNextLine, 300)
            } else {
              if (callback) callback()
            }
          }, 30)
        }
      }
      showNextLine()
    }
    
    // 执行终端命令
    const executeCommand = () => {
      const command = terminalContent[0] // 只有一个命令，循环执行
      
      // 显示命令
      const commandLine = {
        type: 'command',
        text: command.text,
        displayText: '',
        isTyping: true
      }
      terminalLines.value.push(commandLine)
      
      // 打字显示命令
      typeText(command.text, () => {
        // 完成打字后，更新行状态
        const line = terminalLines.value[terminalLines.value.length - 1]
        if (line) {
          line.displayText = command.text
          line.isTyping = false
        }
        // 显示输出
        setTimeout(() => {
          showOutput(command.output, () => {
            // 循环：清空并重新开始
            setTimeout(() => {
              terminalLines.value = []
              setTimeout(executeCommand, 1500)
            }, 2000)
          })
        }, 500)
      }, 80)
    }
    
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
      currentTime.value = now.toLocaleTimeString(timeLocale.value, timeOptions)
      
      // 格式化日期
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
      currentDate.value = now.toLocaleDateString(timeLocale.value, dateOptions)
    }
    
    // 天气更新函数
    const updateWeather = () => {
      // 模拟天气数据更新
      const options = weatherOptions.value
      if (!options.length) return
      weatherIndex.value = Math.floor(Math.random() * options.length)
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
        // 开始终端动画
        setTimeout(() => {
          executeCommand()
        }, 500)
      }, 800)
      
      // 清理定时器
      onUnmounted(() => {
        clearInterval(clockInterval)
        clearInterval(weatherInterval)
      })
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      if (typeInterval) {
        clearInterval(typeInterval)
      }
    })
    
    return {
      // 数据
      coreSkills,
      featuredProjects,
      quickNavItems,
      homeText,
      
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
      contentLoading,
      // 终端
      terminalLines
    }
  }
}
</script>

<style scoped>
.home {
  padding: 0;
  background: #0d1117;
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


/* TUI 时钟容器 - 圆角 */
.tui-clock-container {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tui-clock-container:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-clock-header {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 12px 12px 0 0;
}

.tui-header-decoration {
  color: #58a6ff;
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.6;
  margin: 0 0.5rem;
}

.tui-clock-title,
.tui-weather-title {
  color: #58a6ff;
  font-size: 0.95rem;
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
  position: relative;
  display: inline-block;
}

@keyframes title-shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.tui-clock-title::before,
.tui-weather-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -2px;
  right: -2px;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(88, 166, 255, 0.1), transparent);
  border-radius: 4px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tui-clock-container:hover .tui-clock-title::before,
.tui-weather-container:hover .tui-weather-title::before {
  opacity: 1;
}

.tui-clock-body {
  padding: 1.5rem;
  color: #c9d1d9;
}

.tui-clock-display {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tui-time-line,
.tui-date-line,
.tui-timezone-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
  margin-right: 0.25rem;
}

.tui-time-label,
.tui-date-label,
.tui-timezone-label {
  color: #8b949e;
  font-weight: 500;
  min-width: 50px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.tui-time-value {
  color: #79c0ff;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
}

.tui-date-value {
  color: #c9d1d9;
  font-weight: 500;
}

.tui-timezone-value {
  color: #58a6ff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.6rem;
  border: 1px solid #30363d;
  background: #161b22;
}

.tui-clock-footer {
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 天气组件 */
/* TUI 天气容器 - 圆角 */
.tui-weather-container {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tui-weather-container:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-weather-header {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 12px 12px 0 0;
}

.tui-weather-title {
  color: #58a6ff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.tui-weather-body {
  padding: 1.5rem;
  color: #c9d1d9;
}

.tui-weather-display {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.tui-weather-icon-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tui-weather-container:hover .tui-weather-icon-wrapper {
  border-color: #58a6ff;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.2);
}

.weather-icon {
  font-size: 2.5rem;
  transition: all 0.3s ease;
  display: block;
}

.tui-weather-container:hover .weather-icon {
  transform: scale(1.1);
}

.tui-weather-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tui-weather-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.tui-weather-label {
  color: #8b949e;
  font-weight: 500;
  min-width: 50px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.tui-weather-value {
  color: #79c0ff;
  font-weight: 600;
  font-size: 0.95rem;
}

.tui-weather-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #30363d;
  text-align: center;
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

  /* 终端区域 - Zsh 主题风格 */
  .terminal-section {
    margin-bottom: 3rem;
    animation: fadeInUp 0.8s ease-out;
  }

  .terminal-window {
    background: #0d1117;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', 'source-code-pro', monospace;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .terminal-header {
    background: linear-gradient(180deg, #1c2128 0%, #0d1117 100%);
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .terminal-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .terminal-btn {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    transition: all 0.2s ease;
  }

  .terminal-btn.close {
    background: #ff5f56;
    box-shadow: 0 0 0 0.5px rgba(255, 95, 86, 0.5);
  }

  .terminal-btn.close:hover {
    background: #ff7875;
  }

  .terminal-btn.minimize {
    background: #ffbd2e;
    box-shadow: 0 0 0 0.5px rgba(255, 189, 46, 0.5);
  }

  .terminal-btn.minimize:hover {
    background: #ffd43b;
  }

  .terminal-btn.maximize {
    background: #27c93f;
    box-shadow: 0 0 0 0.5px rgba(39, 201, 63, 0.5);
  }

  .terminal-btn.maximize:hover {
    background: #34d058;
  }

  .terminal-title {
    color: #8b949e;
    font-size: 0.85rem;
    font-weight: 500;
    flex: 1;
    text-align: center;
    letter-spacing: 0.5px;
  }

  .terminal-body {
    padding: 1.5rem;
    background: #0d1117;
    color: #c9d1d9;
    font-size: 0.95rem;
    line-height: 1.8;
    flex: 1;
    overflow-y: auto;
    min-height: 250px;
    position: relative;
  }

  .terminal-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.02) 2px,
        rgba(255, 255, 255, 0.02) 4px
      );
    pointer-events: none;
    opacity: 0.3;
  }

  .terminal-line {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: flex-start;
    word-wrap: break-word;
    position: relative;
    z-index: 1;
  }

  .terminal-prompt {
    margin-right: 0.5rem;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* Zsh 主题样式 - 类似 Powerlevel10k */
  .prompt-user {
    color: #58a6ff;
    font-weight: 600;
  }

  .prompt-at {
    color: #8b949e;
    margin: 0 2px;
  }

  .prompt-host {
    color: #58a6ff;
    font-weight: 500;
  }

  .prompt-separator {
    color: #8b949e;
    margin: 0 2px;
  }

  .prompt-path {
    color: #79c0ff;
    font-weight: 500;
  }

  .prompt-symbol {
    color: #58a6ff;
    margin-left: 0.5rem;
    font-weight: 600;
  }

  .terminal-command {
    color: #f0883e;
    flex: 1;
    font-weight: 500;
  }

  .terminal-output {
    color: #c9d1d9;
    flex: 1;
    margin-left: 0;
    display: block;
    padding-left: 0;
    line-height: 1.9;
  }

  .cursor {
    display: inline-block;
    width: 8px;
    height: 1.2em;
    background: #58a6ff;
    margin-left: 3px;
    animation: blink 1s infinite;
    vertical-align: text-bottom;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(88, 166, 255, 0.6);
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0.3;
    }
  }

  /* 终端滚动条样式 - GitHub 风格 */
  .terminal-body::-webkit-scrollbar {
    width: 10px;
  }

  .terminal-body::-webkit-scrollbar-track {
    background: #0d1117;
  }

  .terminal-body::-webkit-scrollbar-thumb {
    background: #21262d;
    border-radius: 5px;
    border: 2px solid #0d1117;
  }

  .terminal-body::-webkit-scrollbar-thumb:hover {
    background: #30363d;
  }

  /* TUI 区域标题 */
  .tui-section-header {
    background: transparent;
    border: none;
    padding: 0.75rem 0;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .tui-section-title {
    color: #58a6ff;
    font-size: 0.95rem;
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
    position: relative;
    display: inline-block;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  }

  /* TUI 技能预览 */
  .tui-skills-preview {
    margin-bottom: 4rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  }

  .tui-skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 0;
    background: transparent;
  }

  .tui-skill-card {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1.25rem;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .tui-skill-card:hover {
    border-color: #58a6ff;
    background: #161b22;
  }

  .tui-card-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .tui-bracket {
    color: #58a6ff;
    font-weight: 600;
    font-size: 1rem;
  }

  .tui-skill-icon {
    width: 24px;
    height: 24px;
    color: #58a6ff;
    flex-shrink: 0;
  }

  .tui-skill-name {
    color: #58a6ff;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .tui-card-body {
    flex: 1;
  }

  .tui-skill-description {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    color: #8b949e;
    font-size: 0.8rem;
    line-height: 1.6;
  }

  .tui-card-footer {
    display: none;
  }

  /* TUI 项目预览 */
  .tui-projects-preview {
    margin-bottom: 4rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  }

  .tui-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    margin-top: 0;
    background: transparent;
  }

  .tui-project-card {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .tui-project-card:hover {
    border-color: #58a6ff;
    background: #161b22;
  }

  .tui-project-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
    background: #161b22;
  }

  .tui-project-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .tui-project-icon {
    width: 48px;
    height: 48px;
    color: #58a6ff;
    transition: all 0.2s ease;
  }

  .tui-project-card:hover .tui-project-icon {
    transform: scale(1.1);
  }

  .tui-project-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  .tui-project-title-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tui-project-title {
    font-size: 1rem;
    font-weight: 600;
    color: #58a6ff;
  }

  .tui-project-desc-line {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .tui-project-description {
    color: #8b949e;
    font-size: 0.8rem;
    line-height: 1.6;
  }

  .tui-project-tech {
    padding: 0.5rem 0;
  }

  .tui-tech-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    flex-wrap: wrap;
  }

  .tui-tech-label {
    color: #8b949e;
    font-weight: 500;
  }

  .tui-tech-tag {
    color: #79c0ff;
    font-weight: 400;
  }

  .tui-project-footer {
    display: none;
  }

  .tui-view-more {
    text-align: center;
  }

  .tui-button {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 0.625rem 1.25rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  }

  .tui-button:hover {
    border-color: #58a6ff;
    background: #161b22;
  }

  .tui-button-text {
    color: #58a6ff;
    font-size: 0.85rem;
    font-weight: 500;
  }

  /* TUI 快速导航 */
  .tui-quick-nav {
    margin-bottom: 4rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  }

  .tui-nav-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 0;
    background: transparent;
  }

  .tui-nav-item {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1.25rem;
    transition: all 0.2s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    min-height: 140px;
  }

  .tui-nav-item:hover {
    border-color: #58a6ff;
    background: #161b22;
  }

  .tui-nav-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .tui-nav-icon {
    width: 24px;
    height: 24px;
    color: #58a6ff;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .tui-nav-item:hover .tui-nav-icon {
    transform: scale(1.1);
  }

  .tui-nav-title {
    color: #58a6ff;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .tui-nav-body {
    flex: 1;
  }

  .tui-nav-description {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    color: #8b949e;
    font-size: 0.8rem;
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .tui-nav-footer {
    display: none;
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
  background: rgba(13, 17, 23, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

  .loading-spinner {
    text-align: center;
    color: #58a6ff;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #21262d;
    border-top: 4px solid #58a6ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  .loading-spinner p {
    font-size: 1.1rem;
    font-weight: 500;
    color: #c9d1d9;
    animation: pulse 1.5s ease-in-out infinite;
  }

/* 滚动到顶部按钮 */
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: #0d1117;
  border: 1px solid #30363d;
  color: #58a6ff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(88, 166, 255, 0.2);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.scroll-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-to-top:hover {
  transform: translateY(-3px) scale(1.1);
  border-color: #58a6ff;
  box-shadow: 0 8px 25px rgba(88, 166, 255, 0.4);
  background: #161b22;
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
    
    .tui-skills-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
    
    .tui-projects-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    
    .tui-nav-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .top-tools {
      gap: 1rem;
    }
    
    .tui-clock-container {
      width: 100%;
      max-width: 350px;
    }
    
    .tui-clock-body {
      padding: 1rem;
    }
    
    .tui-time-value {
      font-size: 1rem;
    }
    
    .tui-time-line,
    .tui-date-line,
    .tui-timezone-line {
      font-size: 0.85rem;
    }
    
    .tui-time-label,
    .tui-date-label,
    .tui-timezone-label {
      min-width: 40px;
      font-size: 0.75rem;
    }
    
    .tui-weather-container {
      width: 100%;
      max-width: 350px;
    }
    
    .tui-weather-body {
      padding: 1rem;
    }
    
    .tui-weather-display {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    
    .tui-weather-icon-wrapper {
      margin: 0 auto;
    }
    
    .weather-icon {
      font-size: 2rem;
    }
    
    .tui-weather-line {
      font-size: 0.85rem;
      justify-content: center;
    }
    
    .tui-weather-label {
      min-width: 40px;
      font-size: 0.75rem;
    }
    
    .tui-weather-value {
      font-size: 0.9rem;
    }
    
    .terminal-section {
      margin-bottom: 2rem;
    }
    
    .terminal-body {
      padding: 1rem;
      font-size: 0.85rem;
      min-height: 200px;
    }
    
    .terminal-header {
      padding: 0.5rem 0.75rem;
    }
    
    .terminal-title {
      font-size: 0.75rem;
    }
    
    .tui-skills-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    
    .tui-nav-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
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
  
  .tui-clock-container {
    width: 100%;
    max-width: 400px;
  }
  
  .tui-clock-body {
    padding: 1.25rem;
  }
  
  .tui-time-value {
    font-size: 1.05rem;
  }
  
  .tui-time-line,
  .tui-date-line,
  .tui-timezone-line {
    font-size: 0.9rem;
  }
  
  .tui-weather-container {
    width: 100%;
    max-width: 400px;
  }
  
  .tui-weather-body {
    padding: 1.25rem;
  }
  
  .tui-weather-display {
    gap: 1.25rem;
  }
  
  .weather-icon {
    font-size: 2.2rem;
  }
  
  .tui-weather-line {
    font-size: 0.9rem;
  }
  
  .tui-weather-value {
    font-size: 0.9rem;
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