<template>
  <div class="portfolio" :class="{ 'content-loading': contentLoading }">
    <section id="portfolio" class="portfolio-section">
      <div class="container">
        <!-- 项目分类筛选 -->
        <div class="portfolio-filters">
          <el-button 
            v-for="filter in filters" 
            :key="filter.key"
            :type="activeFilter === filter.key ? 'primary' : ''"
            @click="setActiveFilter(filter.key)"
            class="filter-btn"
          >
            {{ filter.label }}
          </el-button>
        </div>
        
        <!-- 项目网格 -->
        <div class="portfolio-grid">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card"
            @click="openProjectModal(project)"
          >
            <div class="project-image" :style="{ background: project.gradient }">
              <div class="project-icon-container">
                <component :is="project.icon" class="project-icon" />
              </div>
              <div class="project-overlay">
                <div class="overlay-content">
                  <EyeIcon class="view-icon" />
                  <span>{{ portfolioText.overlayLabel }}</span>
                </div>
              </div>
            </div>
            
            <div class="project-content">
              <div class="project-category">{{ project.category }}</div>
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              
              <div class="project-tech">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
              
              <div class="project-links">
                <a 
                  :href="project.demoUrl" 
                  target="_blank" 
                  class="project-link"
                  @click.stop
                >
                  <LinkIcon class="link-icon" />
                  {{ portfolioText.demoLabel }}
                </a>
                <a 
                  :href="project.githubUrl" 
                  target="_blank" 
                  class="project-link"
                  @click.stop
                >
                  <CodeBracketIcon class="link-icon" />
                  {{ portfolioText.codeLabel }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 项目详情模态框 -->
    <el-dialog
      v-model="showModal"
      :title="selectedProject?.title"
      width="80%"
      class="project-modal"
    >
      <div v-if="selectedProject" class="modal-content">
        <div class="modal-image" :style="{ background: selectedProject.gradient }">
          <div class="modal-icon-container">
            <component :is="selectedProject.icon" class="modal-icon" />
          </div>
        </div>
        
        <div class="modal-details">
          <div class="project-meta">
            <div class="meta-item">
              <CalendarIcon class="meta-icon" />
              <span>{{ selectedProject.date }}</span>
            </div>
            <div class="meta-item">
              <UserIcon class="meta-icon" />
              <span>{{ selectedProject.role }}</span>
            </div>
            <div class="meta-item">
              <TagIcon class="meta-icon" />
              <span>{{ selectedProject.category }}</span>
            </div>
          </div>
          
          <div class="project-description-full">
            <h4>{{ portfolioText.modal.descriptionTitle }}</h4>
            <p>{{ selectedProject.fullDescription }}</p>
          </div>
          
          <div class="project-features">
            <h4>{{ portfolioText.modal.featuresTitle }}</h4>
            <ul>
              <li v-for="feature in selectedProject.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="project-technologies">
            <h4>{{ portfolioText.modal.techTitle }}</h4>
            <div class="tech-list">
              <span 
                v-for="tech in selectedProject.technologies" 
                :key="tech"
                class="tech-tag large"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div class="project-links-full">
            <a 
              :href="selectedProject.demoUrl" 
              target="_blank" 
              class="btn-primary"
            >
              <LinkIcon class="btn-icon" />
              {{ portfolioText.modal.demoButton }}
            </a>
            <a 
              :href="selectedProject.githubUrl" 
              target="_blank" 
              class="btn-outline"
            >
              <CodeBracketIcon class="btn-icon" />
              {{ portfolioText.modal.codeButton }}
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
.portfolio-section {
  padding: 120px 0 80px;
  background: white;
}

.portfolio.content-loading {
  opacity: 0.6;
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

.portfolio-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  border-radius: 25px;
  padding: 8px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--box-shadow-light);
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
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

.project-card:hover .project-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.overlay-content span {
  font-weight: 500;
}

.view-icon {
  width: 32px;
  height: 32px;
}

.project-content {
  padding: 1.5rem;
}

.project-category {
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
}

.project-description {
  color: var(--text-regular);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: var(--border-lighter);
  color: var(--text-regular);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.tech-tag.large {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
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

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.modal-image {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  min-height: 300px;
}

.modal-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.modal-icon {
  width: 120px;
  height: 120px;
  color: white;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
}

.modal-details h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--bg-color-page);
  border-radius: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-regular);
}

.meta-icon {
  width: 20px;
  height: 20px;
  color: var(--primary-color);
  flex-shrink: 0;
}

.project-description-full p {
  line-height: 1.6;
  color: var(--text-regular);
  margin-bottom: 1.5rem;
}

.project-features ul {
  list-style: none;
  padding: 0;
}

.project-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-lighter);
  position: relative;
  padding-left: 1.5rem;
}

.project-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--success-color);
  font-weight: bold;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-links-full {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.project-links-full .btn-primary,
.project-links-full .btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 18px;
  height: 18px;
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
  
  .modal-content {
    grid-template-columns: 1fr;
  }
  
  .project-links-full {
    flex-direction: column;
  }
}
</style>
