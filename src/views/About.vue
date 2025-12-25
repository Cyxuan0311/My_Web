<template>
  <div class="about-page" :class="{ 'content-loading': contentLoading }">
    <div class="about-content">
      <!-- 个人介绍 - TUI风格 -->
      <section class="tui-intro-section">
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">{{ aboutText.intro.title }}</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-intro-card">
          <div class="tui-intro-text">
            <div
              class="tui-intro-line"
              v-for="(item, index) in aboutText.intro.highlights"
              :key="index"
            >
              <span class="tui-prompt">$</span>
              <component :is="item.icon" class="tui-inline-icon" />
              <span v-html="item.text" class="tui-intro-content"></span>
            </div>
          </div>
          <!-- GitHub语言统计饼状图 - TUI风格 -->
          <div class="tui-github-languages-card">
            <div class="tui-card-header">
              <span class="tui-header-decoration">┌─</span>
              <span class="tui-card-title">GITHUB LANGUAGES</span>
              <span class="tui-header-decoration">─┐</span>
            </div>
            <div v-if="languagesLoading" class="languages-loading">
              <div class="loading-spinner"></div>
              <p>加载中...</p>
            </div>
            <div v-else-if="languagesError" class="languages-error">
              <p>{{ languagesError }}</p>
            </div>
            <div v-else-if="topLanguages.length > 0" class="languages-pie-container">
              <div class="pie-chart-wrapper">
                <svg class="pie-chart" viewBox="0 0 200 200">
                  <g v-for="(lang, index) in topLanguages" :key="lang.name">
                    <path
                      :d="getPiePath(lang, index)"
                      :fill="lang.color"
                      class="pie-segment"
                      :data-lang="lang.name"
                    />
                  </g>
                </svg>
              </div>
              <div class="pie-legend">
                <div
                  class="legend-item"
                  v-for="(lang, index) in topLanguages.slice(0, 5)"
                  :key="lang.name"
                >
                  <span
                    class="legend-color"
                    :style="{ backgroundColor: lang.color }"
                  ></span>
                  <span class="legend-name">{{ lang.name }}</span>
                  <span class="legend-percent">{{ lang.percentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 教育背景 - TUI风格 -->
      <section class="tui-education-section">
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">{{ aboutText.education.title }}</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-education-timeline">
          <div
            class="tui-timeline-item"
            v-for="(item, index) in aboutText.education.timeline"
            :key="index"
          >
            <div class="tui-timeline-year">
              <span class="tui-prompt">$</span>
              <span>{{ item.year }}</span>
            </div>
            <div class="tui-timeline-content">
              <div class="tui-timeline-line">
                <span class="tui-prompt">→</span>
                <span class="tui-timeline-title">{{ item.title }}</span>
              </div>
              <div class="tui-timeline-line">
                <span class="tui-prompt">·</span>
                <span class="tui-timeline-text">{{ item.school }}</span>
              </div>
              <div class="tui-timeline-line">
                <span class="tui-prompt">·</span>
                <span class="tui-timeline-text">{{ item.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术栈展示 - TUI风格 -->
      <section class="tui-tech-stack-section">
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">{{ aboutText.techStack.title }}</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-tech-stack-content">
          <div
            class="tui-tech-category"
            v-for="(category, index) in aboutText.techStack.categories"
            :key="index"
          >
            <div class="tui-category-header">
              <span class="tui-prompt">→</span>
              <span class="tui-category-title">{{ category.title }}</span>
            </div>
            <div class="tui-tech-icons">
              <img :src="category.img" :alt="category.alt" />
            </div>
          </div>
        </div>
      </section>

      <!-- 兴趣爱好 - TUI风格 -->
      <section class="tui-interests-section">
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">{{ aboutText.interests.title }}</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-interests-grid">
          <div
            class="tui-interest-item"
            v-for="(interest, index) in aboutText.interests.items"
            :key="index"
          >
            <div class="tui-interest-header">
              <component :is="interest.icon" class="tui-interest-icon" />
              <span class="tui-prompt">→</span>
              <span class="tui-interest-title">{{ interest.title }}</span>
            </div>
            <div class="tui-interest-line">
              <span class="tui-prompt">·</span>
              <span class="tui-interest-desc">{{ interest.description }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { 
  HandRaisedIcon, 
  EyeIcon, 
  AcademicCapIcon, 
  EnvelopeIcon, 
  HeartIcon,
  BookOpenIcon,
  FilmIcon,
  BoltIcon,
  MusicalNoteIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'About',
  components: {
    HandRaisedIcon,
    EyeIcon,
    AcademicCapIcon,
    EnvelopeIcon,
    HeartIcon,
    BookOpenIcon,
    FilmIcon,
    BoltIcon,
    MusicalNoteIcon
  },
  setup() {
    const contentLoading = ref(true)
    const languagesLoading = ref(false)
    const languagesError = ref(null)
    const topLanguages = ref([])
    const { messages } = useI18n()
    const aboutText = computed(() => messages.value.about)
    
    // GitHub语言颜色映射
    const languageColors = {
      'C++': '#00599C',
      'C': '#A8B9CC',
      'Python': '#3776AB',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'Java': '#ED8B00',
      'Go': '#00ADD8',
      'Rust': '#000000',
      'CMake': '#064F8C',
      'Shell': '#89E051',
      'Makefile': '#427819',
      'HTML': '#E34C26',
      'CSS': '#1572B6',
      'Vue': '#4FC08D',
      'Dockerfile': '#2496ED',
      'Markdown': '#083FA1'
    }
    
    // 获取GitHub语言统计
    const fetchGitHubLanguages = async () => {
      const username = 'Cyxuan0311'
      languagesLoading.value = true
      languagesError.value = null
      
      // 检查缓存（1小时有效期）
      const cacheKey = `github_languages_${username}`
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached)
          const now = Date.now()
          // 缓存1小时
          if (now - timestamp < 3600000) {
            topLanguages.value = data
            languagesLoading.value = false
            return
          }
        } catch (e) {
          // 缓存无效，继续请求
        }
      }
      
      try {
        // 获取用户的所有仓库
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        if (!reposResponse.ok) {
          if (reposResponse.status === 403) {
            throw new Error('API请求频率过高，请稍后重试')
          }
          throw new Error('无法获取仓库信息')
        }
        const repos = await reposResponse.json()
        
        // 只处理前20个仓库以避免API限制
        const reposToProcess = repos.filter(repo => !repo.fork).slice(0, 20)
        
        // 统计所有语言
        const languageStats = {}
        let totalBytes = 0
        
        // 获取每个仓库的语言信息
        for (const repo of reposToProcess) {
          try {
            const langResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`)
            if (langResponse.ok) {
              const languages = await langResponse.json()
              for (const [lang, bytes] of Object.entries(languages)) {
                if (!languageStats[lang]) {
                  languageStats[lang] = 0
                }
                languageStats[lang] += bytes
                totalBytes += bytes
              }
            }
            // 添加延迟以避免API限制
            await new Promise(resolve => setTimeout(resolve, 200))
          } catch (err) {
            console.warn(`无法获取 ${repo.name} 的语言信息:`, err)
          }
        }
        
        // 转换为百分比并排序
        const languages = Object.entries(languageStats)
          .map(([name, bytes]) => ({
            name,
            bytes,
            percentage: parseFloat((totalBytes > 0 ? ((bytes / totalBytes) * 100) : 0).toFixed(1)),
            color: languageColors[name] || '#718096'
          }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 10) // 只显示前10个
        
        topLanguages.value = languages
        
        // 保存到缓存
        try {
          localStorage.setItem(cacheKey, JSON.stringify({
            data: languages,
            timestamp: Date.now()
          }))
        } catch (e) {
          // 忽略缓存错误
        }
      } catch (error) {
        console.error('获取GitHub语言统计失败:', error)
        languagesError.value = error.message || '无法加载语言统计信息，请稍后重试'
      } finally {
        languagesLoading.value = false
      }
    }
    
    // 计算饼状图的路径
    const getPiePath = (lang, index) => {
      const centerX = 100
      const centerY = 100
      const radius = 80
      
      // 计算起始角度（累计前面所有语言的角度）
      let startAngle = topLanguages.value.slice(0, index).reduce((sum, l) => {
        return sum + (l.percentage / 100) * 360
      }, 0)
      
      // 当前语言的角度
      const angle = (lang.percentage / 100) * 360
      const endAngle = startAngle + angle
      
      // 转换为弧度
      const startAngleRad = (startAngle - 90) * (Math.PI / 180)
      const endAngleRad = (endAngle - 90) * (Math.PI / 180)
      
      // 计算起点和终点
      const x1 = centerX + radius * Math.cos(startAngleRad)
      const y1 = centerY + radius * Math.sin(startAngleRad)
      const x2 = centerX + radius * Math.cos(endAngleRad)
      const y2 = centerY + radius * Math.sin(endAngleRad)
      
      // 判断是否需要大弧
      const largeArcFlag = angle > 180 ? 1 : 0
      
      // 生成路径
      return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
    }
    
    onMounted(() => {
      setTimeout(() => {
        contentLoading.value = false
      }, 600)
      // 加载GitHub语言统计
      fetchGitHubLanguages()
    })
    
    return {
      contentLoading,
      aboutText,
      languagesLoading,
      languagesError,
      topLanguages,
      getPiePath
    }
  }
}
</script>

<style scoped>
.about-page {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  transition: opacity 0.4s ease;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  color: #c9d1d9;
}

.about-page.content-loading {
  opacity: 0.6;
}

/* TUI 通用样式 */
.tui-header-decoration {
  color: #58a6ff;
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.6;
  margin: 0 0.5rem;
}

.tui-section-title,
.tui-card-title {
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

.tui-section-header,
.tui-card-header {
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #30363d;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
  margin-right: 0.5rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1a202c 0%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.page-header p {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #718096;
  letter-spacing: 0.01em;
  line-height: 1.6;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.tui-intro-section {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.tui-intro-card {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: start;
}

.tui-intro-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tui-intro-line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #c9d1d9;
}

.tui-inline-icon {
  width: 18px;
  height: 18px;
  color: #58a6ff;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.tui-intro-content {
  color: #c9d1d9;
  flex: 1;
}

/* 邮箱链接特殊样式 */
.tui-intro-content a[href^="mailto:"] {
  color: #79c0ff;
  font-weight: 600;
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  background: rgba(121, 192, 255, 0.1);
  border: 1px solid rgba(121, 192, 255, 0.3);
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-block;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.95em;
}

.tui-intro-content a[href^="mailto:"]:hover {
  color: #58a6ff;
  background: rgba(88, 166, 255, 0.15);
  border-color: #58a6ff;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.3);
  transform: translateY(-1px);
}

.intro-text a {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  color: #3182ce;
  text-decoration: none;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.intro-text a:hover {
  color: #2b6cb0;
  border-bottom-color: #3182ce;
}

/* 技术标签样式 */
.intro-text :deep(.tech-tag) {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95em;
  margin: 0 0.2rem;
  transition: all 0.3s ease;
  position: relative;
  top: -1px;
}

.intro-text :deep(.cpp-tag) {
  background: linear-gradient(135deg, #00599C 0%, #004482 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 89, 156, 0.3);
}

.intro-text :deep(.cpp-tag:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 89, 156, 0.4);
}

.intro-text :deep(.ai-tag) {
  background: linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.intro-text :deep(.ai-tag:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.intro-text :deep(.hpc-tag) {
  background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(78, 205, 196, 0.3);
}

.intro-text :deep(.hpc-tag:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(78, 205, 196, 0.4);
}

.intro-text strong {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  color: #1a202c;
  letter-spacing: -0.01em;
}

/* GitHub语言统计卡片 - TUI风格 */
.tui-github-languages-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.tui-card-header {
  text-align: center;
  padding: 0.75rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #30363d;
}

.languages-pie-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.pie-chart-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
}

.pie-chart {
  width: 100%;
  height: 100%;
}

.pie-segment {
  transition: all 0.3s ease;
  cursor: pointer;
  stroke: white;
  stroke-width: 2;
}

.pie-segment:hover {
  opacity: 0.85;
  filter: brightness(1.1);
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.pie-total {
  display: block;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #3182ce;
  line-height: 1;
}

.pie-label {
  display: block;
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #718096;
  margin-top: 0.25rem;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.legend-item:hover {
  background: rgba(88, 166, 255, 0.1);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px rgba(88, 166, 255, 0.3);
}

.legend-name {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  color: #c9d1d9;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.legend-percent {
  font-size: 0.85rem;
  font-weight: 600;
  color: #58a6ff;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-variant-numeric: tabular-nums;
}

.tui-education-section,
.tui-tech-stack-section,
.tui-interests-section {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.tui-education-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tui-timeline-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tui-timeline-item:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
}

.tui-timeline-year {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #58a6ff;
  font-variant-numeric: tabular-nums;
}

.tui-timeline-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
}

.tui-timeline-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #c9d1d9;
}

.tui-timeline-title {
  color: #58a6ff;
  font-weight: 600;
}

.tui-timeline-text {
  color: #8b949e;
}

/* GitHub语言统计样式 - TUI风格 */
.languages-loading,
.languages-error {
  text-align: center;
  padding: 2rem 1rem;
  color: #8b949e;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.languages-loading .loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #30363d;
  border-top: 4px solid #58a6ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.languages-error {
  color: #f85149;
  font-size: 0.9rem;
}

/* 技术栈样式 - TUI风格 */
.tui-tech-stack-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tui-tech-category {
  padding: 1.5rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.tui-tech-category:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
}

.tui-category-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #30363d;
}

.tui-category-title {
  font-size: 1rem;
  font-weight: 600;
  color: #58a6ff;
}

.tui-tech-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tui-tech-icons img {
  height: 48px;
  width: auto;
  transition: all 0.3s ease;
  filter: grayscale(0.3) brightness(0.9);
  border-radius: 8px;
  padding: 4px;
  background: #0d1117;
  border: 1px solid #30363d;
}

.tui-tech-icons img:hover {
  transform: scale(1.1) translateY(-2px);
  filter: grayscale(0) brightness(1.1);
  border-color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.3);
}

.tui-interests-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
}

.tui-interest-item {
  padding: 1.25rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.tui-interest-item:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-interest-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: nowrap;
}

.tui-interest-icon {
  width: 20px;
  height: 20px;
  color: #58a6ff;
  flex-shrink: 0;
}

.tui-interest-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #58a6ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tui-interest-line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding-left: 1.5rem;
  flex: 1;
}

.tui-interest-desc {
  color: #8b949e;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 移除旧的样式，已替换为TUI风格 */

@media (max-width: 768px) {
  .about-page {
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2.2rem;
    letter-spacing: -0.01em;
  }
  
  .page-header p {
    font-size: 1.1rem;
  }
  
  .intro-text h2 {
    font-size: 1.8rem;
  }
  
  .intro-text p {
    font-size: 1rem;
  }
  
  .intro-card {
    grid-template-columns: 1fr;
  }
  
  .github-languages-card {
    position: static;
    margin-top: 2rem;
  }
  
  .pie-chart-wrapper {
    width: 180px;
    height: 180px;
  }
  
  .pie-total {
    font-size: 1.5rem;
  }
  
  .tui-interests-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .tui-interest-item {
    padding: 1rem;
  }
  
  .tui-intro-card {
    grid-template-columns: 1fr;
  }
  
  .tui-github-languages-card {
    position: static;
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
  
  .intro-text h2 {
    font-size: 1.5rem;
  }
  
  .intro-text p {
    font-size: 0.95rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.85rem;
  }
  
  .tui-interests-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .tui-interest-item {
    padding: 0.875rem;
  }
  
  .tui-interest-title {
    font-size: 0.85rem;
  }
  
  .tui-interest-desc {
    font-size: 0.8rem;
  }
  
  .tui-tech-category {
    padding: 1rem;
  }
  
  .tui-timeline-title {
    font-size: 0.9rem;
  }
}
</style>
