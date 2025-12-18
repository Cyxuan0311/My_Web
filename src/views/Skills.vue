<template>
  <div class="skills-page" :class="{ 'content-loading': contentLoading }">
    <!-- 技术栈图标展示 -->
    <div class="tech-icons-showcase">
      <h2>{{ skillsText.techShowcaseTitle }}</h2>
      <div class="tech-icons-grid">
        <div
          class="tech-icon-row"
          v-for="(row, index) in techIconRows"
          :key="index"
        >
          <img :src="row.src" :alt="row.alt" />
        </div>
      </div>
    </div>
    
    <div class="skills-content">
      <div class="skill-category" v-for="category in skillCategories" :key="category.name">
        <div class="category-header">
          <component :is="category.icon" class="category-icon" />
          <h2>{{ category.name }}</h2>
        </div>
        <div class="skill-list">
          <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
            <div class="skill-info">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">{{ skill.level }}%</span>
            </div>
            <!-- 根据技能类别使用不同的可视化方式 -->
            <div v-if="category.key === 'programming'" class="skill-bar">
              <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
            <div v-else-if="category.key === 'ai'" class="skill-line">
              <svg class="line-chart" viewBox="0 0 100 20">
                <polyline :points="getLinePoints(skill.level)" stroke="#38a169" stroke-width="2" fill="none"/>
                <circle :cx="getLineX(skill.level)" cy="getLineY(skill.level)" r="2" fill="#38a169"/>
              </svg>
            </div>
            <div v-else-if="category.key === 'containers'" class="skill-donut">
              <div class="donut-progress" :style="{ '--progress': skill.level + '%' }">
                <div class="donut-inner">
                  <span class="donut-text">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
            <div v-else-if="category.key === 'database'" class="skill-blocks">
              <div class="block-container">
                <div v-for="i in 10" :key="i" 
                     class="skill-block" 
                     :class="{ 'active': i <= Math.ceil(skill.level / 10) }">
                </div>
              </div>
            </div>
            <div v-else-if="category.key === 'tools'" class="skill-dots">
              <div class="dot-container">
                <div v-for="i in 10" :key="i" 
                     class="skill-dot" 
                     :class="{ 'active': i <= Math.ceil(skill.level / 10) }">
                </div>
              </div>
            </div>
            <div v-else-if="category.key === 'os'" class="skill-steps">
              <div class="step-container">
                <div v-for="i in 5" :key="i" 
                     class="skill-step" 
                     :class="{ 'active': i <= Math.ceil(skill.level / 20) }">
                </div>
              </div>
            </div>
            <div v-else class="skill-bar">
              <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
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
}

.skills-page.content-loading {
  opacity: 0.6;
}

/* 技术栈图标展示 */
.tech-icons-showcase {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.tech-icons-showcase h2 {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
  position: relative;
}

.tech-icons-showcase h2::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(45deg, #3182ce, #2b6cb0);
  border-radius: 2px;
}

.tech-icons-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tech-icon-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.tech-icon-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e0;
}

.tech-icon-row img {
  height: 48px;
  width: auto;
  transition: all 0.3s ease;
  filter: grayscale(0.2) brightness(0.9);
  border-radius: 8px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tech-icon-row img:hover {
  transform: scale(1.1) translateY(-2px);
  filter: grayscale(0) brightness(1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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

.skill-category {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.skill-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
}

.category-icon {
  width: 32px;
  height: 32px;
  color: #3182ce;
}

.category-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
}

.skill-level {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(45deg, #20c997, #17a2b8);
  border-radius: 4px;
  transition: width 1.5s ease;
  position: relative;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

/* 折线图样式 */
.skill-line {
  height: 8px;
  width: 100%;
  display: flex;
  align-items: center;
}

.line-chart {
  width: 100%;
  height: 20px;
}

/* 方块图样式 */
.skill-blocks {
  height: 8px;
  width: 100%;
  display: flex;
  align-items: center;
}

.block-container {
  display: flex;
  gap: 2px;
  width: 100%;
}

.skill-block {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.skill-block.active {
  background: linear-gradient(45deg, #d69e2e, #b7791f);
  box-shadow: 0 0 8px rgba(214, 158, 46, 0.3);
}

/* 圆盘图（甜甜圈图）样式 */
.skill-donut {
  height: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-progress {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: conic-gradient(#d69e2e var(--progress, 0%), #e9ecef 0);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: donut-rotate 2s ease-in-out;
}

.donut-progress::before {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
}

.donut-inner {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.donut-text {
  font-size: 7px;
  font-weight: 600;
  color: #d69e2e;
}

@keyframes donut-rotate {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* 点状图样式 */
.skill-dots {
  height: 8px;
  width: 100%;
  display: flex;
  align-items: center;
}

.dot-container {
  display: flex;
  gap: 4px;
  width: 100%;
  justify-content: space-between;
}

.skill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e9ecef;
  transition: all 0.3s ease;
}

.skill-dot.active {
  background: linear-gradient(45deg, #805ad5, #6b46c1);
  box-shadow: 0 0 6px rgba(128, 90, 213, 0.4);
  transform: scale(1.2);
}

/* 阶梯图样式 */
.skill-steps {
  height: 8px;
  width: 100%;
  display: flex;
  align-items: center;
}

.step-container {
  display: flex;
  gap: 1px;
  width: 100%;
}

.skill-step {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  transition: all 0.3s ease;
  position: relative;
}

.skill-step.active {
  background: linear-gradient(45deg, #dd6b20, #c05621);
  box-shadow: 0 0 8px rgba(221, 107, 32, 0.3);
}

.skill-step.active::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(45deg, #dd6b20, #c05621);
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

@media (max-width: 768px) {
  .skills-page {
    padding: 1rem;
  }
  
  .tech-icons-showcase h2 {
    font-size: 1.6rem;
  }
  
  .tech-icon-row img {
    height: 40px;
  }
  
  .skills-content {
    grid-template-columns: 1fr;
  }
  
  .skill-category {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .tech-icons-showcase h2 {
    font-size: 1.4rem;
  }
  
  .tech-icon-row img {
    height: 36px;
  }
  
  .tech-icon-row {
    padding: 0.8rem;
  }
}
</style>
