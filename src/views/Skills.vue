<template>
  <div class="skills-page" :class="{ 'content-loading': contentLoading }">
    <div class="page-header">
      <h1>技能专长</h1>
      <p>我的技术栈和专业能力</p>
    </div>
    
    <!-- 技术栈图标展示 -->
    <div class="tech-icons-showcase">
      <h2>技术栈概览</h2>
      <div class="tech-icons-grid">
        <div class="tech-icon-row">
          <img src="https://skillicons.dev/icons?i=c,cpp,python,go" alt="编程语言" />
        </div>
        <div class="tech-icon-row">
          <img src="https://skillicons.dev/icons?i=pytorch,tensorflow,docker,kubernetes" alt="AI & 机器学习" />
        </div>
        <div class="tech-icon-row">
          <img src="https://skillicons.dev/icons?i=git,mysql,postgres,cmake" alt="开发工具" />
        </div>
        <div class="tech-icon-row">
          <img src="https://skillicons.dev/icons?i=linux,ubuntu" alt="操作系统" />
        </div>
        <div class="tech-icon-row">
          <img src="https://skillicons.dev/icons?i=vscode,sublime,vim" alt="编辑器" />
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
            <div class="skill-bar">
              <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  CubeIcon, 
  CircleStackIcon, 
  WrenchScrewdriverIcon, 
  ComputerDesktopIcon
} from '@heroicons/vue/24/outline'

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
    
    onMounted(() => {
      setTimeout(() => {
        contentLoading.value = false
      }, 700)
    })
    const skillCategories = [
      {
        name: '编程语言',
        icon: 'CodeBracketIcon',
        color: '#3182ce',
        skills: [
          { name: 'C/C++', level: 95 },
          { name: 'Python', level: 90 },
          { name: 'Go', level: 80 },
          { name: 'Shell Script', level: 75 }
        ]
      },
      {
        name: 'AI & 机器学习',
        icon: 'CpuChipIcon',
        color: '#38a169',
        skills: [
          { name: 'PyTorch', level: 90 },
          { name: 'TensorFlow', level: 85 },
          { name: 'CUDA', level: 80 },
          { name: 'OpenMP', level: 75 }
        ]
      },
      {
        name: '容器化 & 编排',
        icon: 'CubeIcon',
        color: '#d69e2e',
        skills: [
          { name: 'Docker', level: 90 },
          { name: 'Kubernetes', level: 85 },
          { name: 'Podman', level: 70 },
          { name: 'Helm', level: 75 }
        ]
      },
      {
        name: '数据库 & 存储',
        icon: 'CircleStackIcon',
        color: '#e53e3e',
        skills: [
          { name: 'MySQL', level: 85 },
          { name: 'PostgreSQL', level: 80 },
          { name: 'Redis', level: 75 },
          { name: 'MongoDB', level: 70 }
        ]
      },
      {
        name: '开发工具',
        icon: 'WrenchScrewdriverIcon',
        color: '#805ad5',
        skills: [
          { name: 'Git', level: 95 },
          { name: 'CMake', level: 90 },
          { name: 'Make', level: 85 },
          { name: 'GDB', level: 80 }
        ]
      },
      {
        name: '操作系统',
        icon: 'ComputerDesktopIcon',
        color: '#dd6b20',
        skills: [
          { name: 'Linux', level: 95 },
          { name: 'Ubuntu', level: 90 },
          { name: 'CentOS', level: 85 },
          { name: 'Arch Linux', level: 80 }
        ]
      }
    ]

    return {
      skillCategories,
      contentLoading
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
