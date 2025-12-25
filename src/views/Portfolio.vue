<template>
  <div class="tui-portfolio" :class="{ 'content-loading': contentLoading }">
    <section id="portfolio" class="tui-portfolio-section">
      <div class="tui-container">
        <!-- 项目分类筛选 - TUI风格 -->
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">PORTFOLIO</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-portfolio-filters">
          <button 
            v-for="filter in filters" 
            :key="filter.key"
            @click="setActiveFilter(filter.key)"
            class="tui-filter-btn"
            :class="{ active: activeFilter === filter.key }"
          >
            <span class="tui-prompt" v-if="activeFilter === filter.key">▶</span>
            <span class="tui-prompt" v-else>·</span>
            <span>{{ filter.label }}</span>
          </button>
        </div>
        
        <!-- 项目网格 - TUI风格 -->
        <div class="tui-portfolio-grid">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="tui-project-card"
            @click="openProjectModal(project)"
          >
            <div class="tui-project-header">
              <span class="tui-header-decoration">┌─</span>
              <span class="tui-project-category">{{ project.category }}</span>
              <span class="tui-header-decoration">─┐</span>
            </div>
            <div class="tui-project-image" :style="{ background: project.gradient }">
              <div class="tui-project-icon-container">
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
                    v-for="(tech, index) in project.technologies" 
                    :key="tech"
                    class="tui-tech-tag"
                  >
                    {{ tech }}<span v-if="index < project.technologies.length - 1">,</span>
                  </span>
                </div>
              </div>
              
              <div class="tui-project-links">
                <a 
                  :href="project.demoUrl" 
                  target="_blank" 
                  class="tui-project-link"
                  @click.stop
                >
                  <span class="tui-prompt">→</span>
                  <LinkIcon class="tui-link-icon" />
                  <span>{{ portfolioText.demoLabel }}</span>
                </a>
                <a 
                  :href="project.githubUrl" 
                  target="_blank" 
                  class="tui-project-link"
                  @click.stop
                >
                  <span class="tui-prompt">→</span>
                  <CodeBracketIcon class="tui-link-icon" />
                  <span>{{ portfolioText.codeLabel }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 项目详情模态框 - TUI风格 -->
    <el-dialog
      v-model="showModal"
      :title="selectedProject?.title"
      width="80%"
      class="tui-project-modal"
    >
      <div v-if="selectedProject" class="tui-modal-content">
        <div class="tui-modal-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-modal-title">{{ selectedProject.title }}</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-modal-image" :style="{ background: selectedProject.gradient }">
          <div class="tui-modal-icon-container">
            <component :is="selectedProject.icon" class="tui-modal-icon" />
          </div>
        </div>
        
        <div class="tui-modal-details">
          <div class="tui-project-meta">
            <div class="tui-meta-line">
              <span class="tui-prompt">→</span>
              <CalendarIcon class="tui-meta-icon" />
              <span class="tui-meta-label">DATE:</span>
              <span class="tui-meta-value">{{ selectedProject.date }}</span>
            </div>
            <div class="tui-meta-line">
              <span class="tui-prompt">→</span>
              <UserIcon class="tui-meta-icon" />
              <span class="tui-meta-label">ROLE:</span>
              <span class="tui-meta-value">{{ selectedProject.role }}</span>
            </div>
            <div class="tui-meta-line">
              <span class="tui-prompt">→</span>
              <TagIcon class="tui-meta-icon" />
              <span class="tui-meta-label">CATEGORY:</span>
              <span class="tui-meta-value">{{ selectedProject.category }}</span>
            </div>
          </div>
          
          <div class="tui-project-description-full">
            <div class="tui-section-header">
              <span class="tui-header-decoration">┌─</span>
              <span class="tui-section-title">{{ portfolioText.modal.descriptionTitle }}</span>
              <span class="tui-header-decoration">─┐</span>
            </div>
            <div class="tui-desc-line">
              <span class="tui-prompt">·</span>
              <p>{{ selectedProject.fullDescription }}</p>
            </div>
          </div>
          
          <div class="tui-project-features">
            <div class="tui-section-header">
              <span class="tui-header-decoration">┌─</span>
              <span class="tui-section-title">{{ portfolioText.modal.featuresTitle }}</span>
              <span class="tui-header-decoration">─┐</span>
            </div>
            <ul class="tui-features-list">
              <li v-for="feature in selectedProject.features" :key="feature" class="tui-feature-item">
                <span class="tui-prompt">→</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
          
          <div class="tui-project-technologies">
            <div class="tui-section-header">
              <span class="tui-header-decoration">┌─</span>
              <span class="tui-section-title">{{ portfolioText.modal.techTitle }}</span>
              <span class="tui-header-decoration">─┐</span>
            </div>
            <div class="tui-tech-list">
              <span 
                v-for="tech in selectedProject.technologies" 
                :key="tech"
                class="tui-tech-tag-large"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div class="tui-project-links-full">
            <a 
              :href="selectedProject.demoUrl" 
              target="_blank" 
              class="tui-btn-primary"
            >
              <span class="tui-prompt">→</span>
              <LinkIcon class="tui-btn-icon" />
              <span>{{ portfolioText.modal.demoButton }}</span>
            </a>
            <a 
              :href="selectedProject.githubUrl" 
              target="_blank" 
              class="tui-btn-outline"
            >
              <span class="tui-prompt">→</span>
              <CodeBracketIcon class="tui-btn-icon" />
              <span>{{ portfolioText.modal.codeButton }}</span>
            </a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  CubeIcon, 
  WrenchScrewdriverIcon,
  ComputerDesktopIcon,
  EyeIcon,
  LinkIcon,
  CalendarIcon,
  UserIcon,
  TagIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Portfolio',
  components: {
    CodeBracketIcon,
    CpuChipIcon,
    CubeIcon,
    WrenchScrewdriverIcon,
    ComputerDesktopIcon,
    EyeIcon,
    LinkIcon,
    CalendarIcon,
    UserIcon,
    TagIcon
  },
  setup() {
    const activeFilter = ref('all')
    const showModal = ref(false)
    const selectedProjectId = ref(null)
    const contentLoading = ref(true)
    const { messages } = useI18n()
    const portfolioText = computed(() => messages.value.portfolio)
    const filters = computed(() => portfolioText.value.filters)
    const projects = computed(() => portfolioText.value.projects)
    
    onMounted(() => {
      setTimeout(() => {
        contentLoading.value = false
      }, 800)
    })
    
    const filteredProjects = computed(() => {
      const allProjects = projects.value
      if (activeFilter.value === 'all') {
        return allProjects
      }
      return allProjects.filter(project => project.type === activeFilter.value)
    })
    const selectedProject = computed(() => {
      if (selectedProjectId.value === null) return null
      return projects.value.find(project => project.id === selectedProjectId.value) || null
    })
    
    const setActiveFilter = (filter) => {
      activeFilter.value = filter
    }
    
    const openProjectModal = (project) => {
      selectedProjectId.value = project.id
      showModal.value = true
    }
    
    return {
      activeFilter,
      showModal,
      selectedProject,
      contentLoading,
      filters,
      filteredProjects,
      setActiveFilter,
      openProjectModal,
      portfolioText
    }
  }
}
</script>

<style scoped>
.tui-portfolio {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  color: #c9d1d9;
}

.tui-portfolio.content-loading {
  opacity: 0.6;
}

.tui-portfolio-section {
  padding: 2rem 0;
}

.tui-container {
  max-width: 100%;
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
  margin-bottom: 2rem;
  border-bottom: 1px solid #30363d;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
  margin-right: 0.5rem;
  font-size: 0.85rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-top: 1rem;
}

.tui-portfolio-filters {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tui-filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  color: #8b949e;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tui-filter-btn:hover {
  border-color: #58a6ff;
  background: #21262d;
  color: #c9d1d9;
}

.tui-filter-btn.active {
  background: #0d1117;
  border-color: #58a6ff;
  color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
}

.tui-portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.tui-project-card {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.tui-project-card:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  transform: translateY(-4px);
}

.tui-project-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}

.tui-project-category {
  color: #58a6ff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.tui-project-image {
  position: relative;
  height: 180px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
  border-bottom: 1px solid #30363d;
}

.tui-project-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.tui-project-icon {
  width: 64px;
  height: 64px;
  color: #58a6ff;
  filter: drop-shadow(0 0 20px rgba(88, 166, 255, 0.4));
  transition: all 0.3s ease;
}

.tui-project-card:hover .tui-project-icon {
  transform: scale(1.1);
  filter: drop-shadow(0 0 30px rgba(88, 166, 255, 0.6));
}

.tui-project-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tui-project-title-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tui-project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #58a6ff;
}

.tui-project-desc-line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding-left: 1rem;
}

.tui-project-description {
  color: #8b949e;
  font-size: 0.9rem;
  line-height: 1.6;
  flex: 1;
}

.tui-project-tech {
  padding: 0.75rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.tui-tech-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.tui-tech-label {
  color: #8b949e;
  font-weight: 600;
}

.tui-tech-tag {
  color: #58a6ff;
}

.tui-project-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #30363d;
}

.tui-project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8b949e;
  text-decoration: none;
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #30363d;
  border-radius: 6px;
  background: #161b22;
  transition: all 0.3s ease;
}

.tui-project-link:hover {
  color: #58a6ff;
  border-color: #58a6ff;
  background: #21262d;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.2);
}

.tui-link-icon {
  width: 16px;
  height: 16px;
  color: inherit;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(49, 130, 206, 0.1);
}

.project-link:hover {
  color: white;
  background: var(--primary-color);
  transform: translateY(-2px);
}

.link-icon {
  width: 16px;
  height: 16px;
}

/* 模态框样式 - TUI风格 */
:deep(.tui-project-modal) {
  background: #0d1117;
  border: 1px solid #30363d;
}

:deep(.tui-project-modal .el-dialog) {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
}

:deep(.tui-project-modal .el-dialog__header) {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 1rem 1.5rem;
}

:deep(.tui-project-modal .el-dialog__title) {
  color: #58a6ff;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-weight: 600;
}

:deep(.tui-project-modal .el-dialog__body) {
  background: #0d1117;
  color: #c9d1d9;
  padding: 1.5rem;
}

.tui-modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tui-modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #30363d;
  margin-bottom: 1.5rem;
}

.tui-modal-title {
  color: #58a6ff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.tui-modal-image {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  min-height: 250px;
  background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
  border: 1px solid #30363d;
  margin-bottom: 1.5rem;
}

.tui-modal-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.tui-modal-icon {
  width: 100px;
  height: 100px;
  color: #58a6ff;
  filter: drop-shadow(0 0 30px rgba(88, 166, 255, 0.5));
}

.tui-modal-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tui-project-meta {
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
  width: 18px;
  height: 18px;
  color: #58a6ff;
  flex-shrink: 0;
}

.tui-meta-label {
  color: #8b949e;
  font-weight: 600;
}

.tui-meta-value {
  color: #c9d1d9;
}

.tui-project-description-full {
  padding: 1rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
}

.tui-desc-line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding-left: 1rem;
  margin-top: 1rem;
}

.tui-desc-line p {
  line-height: 1.6;
  color: #c9d1d9;
  margin: 0;
  font-size: 0.9rem;
}

.tui-project-features {
  padding: 1rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
}

.tui-features-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.tui-feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  padding-left: 1rem;
  color: #c9d1d9;
  font-size: 0.9rem;
  border-bottom: 1px solid #30363d;
}

.tui-feature-item:last-child {
  border-bottom: none;
}

.tui-project-technologies {
  padding: 1rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
}

.tui-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tui-tech-tag-large {
  padding: 0.4rem 0.8rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #58a6ff;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tui-tech-tag-large:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.3);
}

.tui-project-links-full {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #30363d;
}

.tui-btn-primary,
.tui-btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.tui-btn-primary {
  background: #161b22;
  border: 1px solid #58a6ff;
  color: #58a6ff;
}

.tui-btn-primary:hover {
  background: #21262d;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.3);
}

.tui-btn-outline {
  background: #161b22;
  border: 1px solid #30363d;
  color: #8b949e;
}

.tui-btn-outline:hover {
  border-color: #58a6ff;
  color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
}

.tui-btn-icon {
  width: 18px;
  height: 18px;
  color: inherit;
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .portfolio-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
  
  .filter-btn {
    white-space: nowrap;
  }
  
  .tui-modal-content {
    gap: 1rem;
  }
  
  .tui-project-links-full {
    flex-direction: column;
  }
  
  .tui-modal-image {
    min-height: 200px;
  }
  
  .tui-modal-icon {
    width: 80px;
    height: 80px;
  }
}
</style>
