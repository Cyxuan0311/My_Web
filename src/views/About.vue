<template>
  <div class="about-page" :class="{ 'content-loading': contentLoading }">
    <div class="page-header">
      <h1>关于我</h1>
      <p>了解我的背景、经历和专业技能</p>
    </div>
    
    <div class="about-content">
      <!-- 个人介绍 -->
      <section class="intro-section">
        <div class="intro-card">
          <div class="intro-text">
            <h2>你好，我是 Frames</h2>
            <p><HandRaisedIcon class="inline-icon" /> 你好，我是 <strong>Frames</strong>，来自中国武汉。</p>
            <p><EyeIcon class="inline-icon" /> 我对 <strong>C/C++</strong>、<strong>AI基础设施</strong> 和 <strong>HPC</strong> 充满热情。</p>
            <p><AcademicCapIcon class="inline-icon" /> 目前正在大学学习，专注于高性能计算和AI基础设施的研究。</p>
            <p><EnvelopeIcon class="inline-icon" /> 联系我：<a href="mailto:cyxvvv@gmail.com">cyxvvv@gmail.com</a></p>
            <p><HeartIcon class="inline-icon" /> 我喜欢阅读和看电影，在代码之外享受生活的美好。</p>
          </div>
          <div class="intro-stats">
            <div class="stat-item">
              <span class="stat-number">C/C++</span>
              <span class="stat-label">核心语言</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">AI</span>
              <span class="stat-label">基础设施</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">HPC</span>
              <span class="stat-label">高性能计算</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 教育背景 -->
      <section class="education-section">
        <h2>教育背景</h2>
        <div class="education-timeline">
          <div class="timeline-item">
            <div class="timeline-year">2021 - 至今</div>
            <div class="timeline-content">
              <h3>计算机科学与技术</h3>
              <p>武汉大学</p>
              <p>专注于高性能计算和人工智能方向的学习与研究</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术栈展示 -->
      <section class="tech-stack-section">
        <h2>技术栈</h2>
        <div class="tech-stack-content">
          <div class="tech-category">
            <h3>编程语言</h3>
            <div class="tech-icons">
              <img src="https://skillicons.dev/icons?i=c,cpp,python,go" alt="编程语言" />
            </div>
          </div>
          
          <div class="tech-category">
            <h3>AI & 机器学习</h3>
            <div class="tech-icons">
              <img src="https://skillicons.dev/icons?i=pytorch,tensorflow,docker,kubernetes" alt="AI & 机器学习" />
            </div>
          </div>
          
          <div class="tech-category">
            <h3>开发工具</h3>
            <div class="tech-icons">
              <img src="https://skillicons.dev/icons?i=git,mysql,postgres,cmake" alt="开发工具" />
            </div>
          </div>
          
          <div class="tech-category">
            <h3>操作系统</h3>
            <div class="tech-icons">
              <img src="https://skillicons.dev/icons?i=linux,ubuntu" alt="操作系统" />
            </div>
          </div>
          
          <div class="tech-category">
            <h3>编辑器</h3>
            <div class="tech-icons">
              <img src="https://skillicons.dev/icons?i=vscode,sublime,vim" alt="编辑器" />
            </div>
          </div>
        </div>
      </section>

      <!-- 兴趣爱好 -->
      <section class="interests-section">
        <h2>兴趣爱好</h2>
        <div class="interests-grid">
          <div class="interest-item">
            <BookOpenIcon class="interest-icon" />
            <h3>阅读</h3>
            <p>喜欢阅读技术书籍和科幻小说</p>
          </div>
          <div class="interest-item">
            <FilmIcon class="interest-icon" />
            <h3>电影</h3>
            <p>享受各种类型的电影，特别是科幻片</p>
          </div>
          <div class="interest-item">
            <BoltIcon class="interest-icon" />
            <h3>运动</h3>
            <p>喜欢跑步和健身，保持身体健康</p>
          </div>
          <div class="interest-item">
            <MusicalNoteIcon class="interest-icon" />
            <h3>音乐</h3>
            <p>热爱各种音乐，特别是古典音乐</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
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
    
    onMounted(() => {
      setTimeout(() => {
        contentLoading.value = false
      }, 600)
    })
    
    return {
      contentLoading
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
}

.about-page.content-loading {
  opacity: 0.6;
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

.intro-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.intro-card {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: center;
}

.intro-text h2 {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.intro-text p {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  letter-spacing: 0.01em;
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

.intro-text strong {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  color: #1a202c;
  letter-spacing: -0.01em;
}

.intro-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.stat-number {
  display: block;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #3182ce;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 4px rgba(49, 130, 206, 0.1);
}

.stat-label {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #718096;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.education-section,
.tech-stack-section,
.interests-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.education-section h2,
.tech-stack-section h2,
.interests-section h2 {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 2.5rem;
  text-align: center;
  letter-spacing: -0.01em;
  position: relative;
}

.education-section h2::after,
.tech-stack-section h2::after,
.interests-section h2::after {
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

.education-timeline {
  position: relative;
  padding-left: 2rem;
}

.education-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(45deg, #20c997, #17a2b8);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: #20c997;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 3px #20c997;
}

.timeline-year {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #3182ce;
  margin-bottom: 0.8rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.timeline-content h3 {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.8rem;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.timeline-content p {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #4a5568;
  margin-bottom: 0.8rem;
  line-height: 1.6;
  letter-spacing: 0.01em;
}

/* 技术栈样式 */
.tech-stack-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.tech-category {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.tech-category:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e0;
}

.tech-category h3 {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.tech-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-icons img {
  height: 48px;
  width: auto;
  transition: all 0.3s ease;
  filter: grayscale(0.2) brightness(0.9);
  border-radius: 8px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tech-icons img:hover {
  transform: scale(1.1) translateY(-2px);
  filter: grayscale(0) brightness(1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.interest-item {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.interest-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.interest-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
  color: #3182ce;
}

.inline-icon {
  width: 22px;
  height: 22px;
  margin-right: 0.8rem;
  color: #3182ce;
  vertical-align: middle;
  display: inline-block;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(49, 130, 206, 0.1));
}

.intro-text p:hover .inline-icon {
  transform: scale(1.1);
  color: #2b6cb0;
}

.interest-item h3 {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.8rem;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.interest-item p {
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #4a5568;
  line-height: 1.6;
  letter-spacing: 0.01em;
}

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
  
  .intro-stats {
    grid-template-columns: 1fr;
  }
  
  .interests-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .education-section h2,
  .tech-stack-section h2,
  .interests-section h2 {
    font-size: 1.6rem;
  }
  
  .tech-category h3 {
    font-size: 1.2rem;
  }
  
  .tech-icons img {
    height: 40px;
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
  
  .education-section h2,
  .tech-stack-section h2,
  .interests-section h2 {
    font-size: 1.4rem;
  }
  
  .tech-category h3 {
    font-size: 1.1rem;
  }
  
  .tech-icons img {
    height: 36px;
  }
  
  .tech-category {
    padding: 1rem;
  }
  
  .timeline-content h3 {
    font-size: 1.2rem;
  }
  
  .interest-item h3 {
    font-size: 1.1rem;
  }
  
  .interests-grid {
    grid-template-columns: 1fr;
  }
}
</style>
