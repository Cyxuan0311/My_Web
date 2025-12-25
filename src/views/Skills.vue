<template>
  <div class="skills-page" :class="{ 'content-loading': contentLoading }">
    <!-- 技术栈图标展示 - TUI风格 -->
    <div class="tui-tech-showcase">
      <div class="tui-section-header">
        <span class="tui-header-decoration">┌─</span>
        <span class="tui-section-title">{{ skillsText.techShowcaseTitle }}</span>
        <span class="tui-header-decoration">─┐</span>
      </div>
      <div class="tui-tech-icons-grid">
        <div
          class="tui-tech-icon-row"
          v-for="(row, index) in techIconRows"
          :key="index"
        >
          <div class="tui-icon-wrapper">
            <img :src="row.src" :alt="row.alt" />
          </div>
        </div>
      </div>
      <div class="tui-section-footer">
        <span class="tui-footer-line">────────────────────────</span>
      </div>
    </div>
    
    <div class="skills-content">
      <div class="tui-skill-category" v-for="(category, catIndex) in skillCategories" :key="category.name" :style="{ '--delay': catIndex * 0.1 + 's' }">
        <div class="tui-category-header">
          <span class="tui-header-decoration">┌─</span>
          <component :is="category.icon" class="tui-category-icon" />
          <span class="tui-category-title">{{ category.name }}</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-skill-list">
          <div v-for="(skill, skillIndex) in category.skills" :key="skill.name" class="tui-skill-item" :style="{ '--skill-delay': skillIndex * 0.05 + 's' }">
            <div class="tui-skill-info">
              <span class="tui-prompt">$</span>
              <span class="tui-skill-name">{{ skill.name }}</span>
              <span class="tui-skill-separator">:</span>
              <span class="tui-skill-level">{{ skill.level }}%</span>
            </div>
            <!-- 根据技能类别使用不同的可视化方式 - TUI风格 -->
            <div v-if="category.key === 'programming'" class="tui-skill-bar">
              <div class="tui-skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
            <div v-else-if="category.key === 'ai'" class="tui-skill-line">
              <svg class="tui-line-chart" viewBox="0 0 100 20">
                <polyline :points="getLinePoints(skill.level)" stroke="#58a6ff" stroke-width="2" fill="none"/>
                <circle :cx="getLineX(skill.level)" cy="getLineY(skill.level)" r="2" fill="#58a6ff"/>
              </svg>
            </div>
            <div v-else-if="category.key === 'containers'" class="tui-skill-donut">
              <div class="tui-donut-progress" :style="{ '--progress': skill.level + '%' }">
                <div class="tui-donut-inner">
                  <span class="tui-donut-text">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
            <div v-else-if="category.key === 'database'" class="tui-skill-blocks">
              <div class="tui-block-container">
                <div v-for="i in 10" :key="i" 
                     class="tui-skill-block" 
                     :class="{ 'active': i <= Math.ceil(skill.level / 10) }">
                </div>
              </div>
            </div>
            <div v-else-if="category.key === 'tools'" class="tui-skill-dots">
              <div class="tui-dot-container">
                <div v-for="i in 10" :key="i" 
                     class="tui-skill-dot" 
                     :class="{ 'active': i <= Math.ceil(skill.level / 10) }">
                </div>
              </div>
            </div>
            <div v-else-if="category.key === 'os'" class="tui-skill-steps">
              <div class="tui-step-container">
                <div v-for="i in 5" :key="i" 
                     class="tui-skill-step" 
                     :class="{ 'active': i <= Math.ceil(skill.level / 20) }">
                </div>
              </div>
            </div>
            <div v-else class="tui-skill-bar">
              <div class="tui-skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="tui-category-footer">
          <span class="tui-footer-line">────────────────────</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  CubeIcon, 
  CircleStackIcon, 
  WrenchScrewdriverIcon, 
  ComputerDesktopIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Skills',
  components: {
    CodeBracketIcon,
    CpuChipIcon,
    CubeIcon,
    CircleStackIcon,
    WrenchScrewdriverIcon,
    ComputerDesktopIcon
  },
  setup() {
    const contentLoading = ref(true)
    const { messages } = useI18n()
    const skillsText = computed(() => messages.value.skills)
    const skillCategories = computed(() => skillsText.value.categories)
    const techIconRows = computed(() => skillsText.value.techIconRows)
    
    onMounted(() => {
      setTimeout(() => {
        contentLoading.value = false
      }, 700)
    })

    // 计算折线图路径的方法
    const getLinePoints = (level) => {
      const points = []
      for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * 100
        const progress = (i / 10) * level
        const y = 15 - (progress / 100) * 10
        points.push(`${x},${y}`)
      }
      return points.join(' ')
    }
    
    const getLineX = (level) => {
      return (level / 100) * 100
    }
    
    const getLineY = (level) => {
      return 15 - (level / 100) * 10
    }

    return {
      skillsText,
      techIconRows,
      skillCategories,
      contentLoading,
      getLinePoints,
      getLineX,
      getLineY
    }
  }
}
</script>

<style scoped>
.skills-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  transition: opacity 0.4s ease;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

.skills-page.content-loading {
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
.tui-category-title {
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
.tui-category-header {
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #30363d;
}

.tui-section-footer,
.tui-category-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #30363d;
  text-align: center;
}

.tui-footer-line {
  color: #30363d;
  font-size: 0.9rem;
  letter-spacing: 2px;
}

/* 技术栈图标展示 - TUI风格 */
.tui-tech-showcase {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
}

.tui-tech-showcase:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
}

.tui-tech-icons-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tui-tech-icon-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tui-tech-icon-row:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.tui-tech-icon-row:hover .tui-icon-wrapper {
  border-color: #58a6ff;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.3);
}

.tui-icon-wrapper img {
  height: 40px;
  width: auto;
  transition: all 0.3s ease;
  filter: grayscale(0.3) brightness(0.9);
  border-radius: 4px;
  padding: 4px;
}

.tui-icon-wrapper:hover img {
  transform: scale(1.1);
  filter: grayscale(0) brightness(1.1);
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

.skills-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

/* 技能分类卡片 - TUI风格 */
.tui-skill-category {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out var(--delay, 0s) both;
}

.tui-skill-category:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-category-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #30363d;
}

.tui-category-icon {
  width: 24px;
  height: 24px;
  color: #79c0ff;
  flex-shrink: 0;
}

.tui-skill-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.tui-skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: fadeInUp 0.4s ease-out var(--skill-delay, 0s) both;
}

.tui-skill-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
  margin-right: 0.25rem;
}

.tui-skill-name {
  color: #c9d1d9;
  font-weight: 500;
}

.tui-skill-separator {
  color: #8b949e;
  margin: 0 0.25rem;
}

.tui-skill-level {
  color: #58a6ff;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  margin-left: auto;
}

/* TUI 技能进度条 */
.tui-skill-bar {
  height: 10px;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.tui-skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #58a6ff 0%, #79c0ff 100%);
  border-radius: 4px;
  transition: width 1.5s ease;
  position: relative;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.5);
}

.tui-skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 2s infinite;
}

/* TUI 折线图样式 */
.tui-skill-line {
  height: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 4px;
  padding: 4px;
}

.tui-line-chart {
  width: 100%;
  height: 20px;
}

/* TUI 方块图样式 */
.tui-skill-blocks {
  height: 10px;
  width: 100%;
  display: flex;
  align-items: center;
}

.tui-block-container {
  display: flex;
  gap: 3px;
  width: 100%;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 4px;
  padding: 2px;
}

.tui-skill-block {
  flex: 1;
  height: 6px;
  background: #30363d;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.tui-skill-block.active {
  background: linear-gradient(90deg, #58a6ff 0%, #79c0ff 100%);
  box-shadow: 0 0 8px rgba(88, 166, 255, 0.5);
}

/* TUI 圆盘图样式 */
.tui-skill-donut {
  height: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tui-donut-progress {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(#58a6ff var(--progress, 0%), #21262d 0);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: donut-rotate 2s ease-in-out;
  border: 2px solid #30363d;
}

.tui-donut-progress::before {
  content: '';
  position: absolute;
  width: 32px;
  height: 32px;
  background: #0d1117;
  border-radius: 50%;
}

.tui-donut-inner {
  width: 32px;
  height: 32px;
  background: #0d1117;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.tui-donut-text {
  font-size: 8px;
  font-weight: 600;
  color: #58a6ff;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
}

@keyframes donut-rotate {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* TUI 点状图样式 */
.tui-skill-dots {
  height: 10px;
  width: 100%;
  display: flex;
  align-items: center;
}

.tui-dot-container {
  display: flex;
  gap: 6px;
  width: 100%;
  justify-content: space-between;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 4px;
  padding: 4px 8px;
}

.tui-skill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #30363d;
  transition: all 0.3s ease;
}

.tui-skill-dot.active {
  background: #58a6ff;
  box-shadow: 0 0 8px rgba(88, 166, 255, 0.6);
  transform: scale(1.3);
}

/* TUI 阶梯图样式 */
.tui-skill-steps {
  height: 10px;
  width: 100%;
  display: flex;
  align-items: center;
}

.tui-step-container {
  display: flex;
  gap: 2px;
  width: 100%;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 4px;
  padding: 2px;
}

.tui-skill-step {
  flex: 1;
  height: 6px;
  background: #30363d;
  transition: all 0.3s ease;
  position: relative;
}

.tui-skill-step.active {
  background: linear-gradient(90deg, #58a6ff 0%, #79c0ff 100%);
  box-shadow: 0 0 8px rgba(88, 166, 255, 0.5);
}

.tui-skill-step.active::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #58a6ff;
  border-radius: 1px;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .skills-page {
    padding: 1rem;
  }
  
  .tui-section-title,
  .tui-category-title {
    font-size: 1rem;
  }
  
  .tui-icon-wrapper img {
    height: 36px;
  }
  
  .skills-content {
    grid-template-columns: 1fr;
  }
  
  .tui-skill-category {
    padding: 1.25rem;
  }
}

@media (max-width: 480px) {
  .tui-section-title,
  .tui-category-title {
    font-size: 0.9rem;
  }
  
  .tui-icon-wrapper img {
    height: 32px;
  }
  
  .tui-tech-icon-row {
    padding: 0.75rem;
    gap: 0.5rem;
  }
  
  .tui-skill-category {
    padding: 1rem;
  }
  
  .tui-skill-info {
    font-size: 0.85rem;
  }
}
</style>
