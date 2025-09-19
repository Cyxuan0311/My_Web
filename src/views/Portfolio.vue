<template>
  <div class="portfolio" :class="{ 'content-loading': contentLoading }">
    <section id="portfolio" class="portfolio-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">作品展示</h2>
          <p class="section-subtitle">我的精选项目和工作成果</p>
        </div>
        
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
                  <span>查看详情</span>
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
                  演示
                </a>
                <a 
                  :href="project.githubUrl" 
                  target="_blank" 
                  class="project-link"
                  @click.stop
                >
                  <CodeBracketIcon class="link-icon" />
                  代码
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
            <h4>项目描述</h4>
            <p>{{ selectedProject.fullDescription }}</p>
          </div>
          
          <div class="project-features">
            <h4>主要功能</h4>
            <ul>
              <li v-for="feature in selectedProject.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="project-technologies">
            <h4>技术栈</h4>
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
              查看演示
            </a>
            <a 
              :href="selectedProject.githubUrl" 
              target="_blank" 
              class="btn-outline"
            >
              <CodeBracketIcon class="btn-icon" />
              查看代码
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
    const selectedProject = ref(null)
    const contentLoading = ref(true)
    
    onMounted(() => {
      setTimeout(() => {
        contentLoading.value = false
      }, 800)
    })
    
    const filters = [
      { key: 'all', label: '全部' },
      { key: 'cpp', label: 'C++项目' },
      { key: 'hpc', label: 'HPC/GPU' },
      { key: 'java', label: 'Java应用' },
      { key: 'tool', label: '工具类' }
    ]
    
    const projects = ref([
      {
        id: 1,
        title: 'Paker - C++包管理器',
        category: 'C++开发',
        type: 'cpp',
        description: '为C++项目设计的包控制器，提供简单易用的包管理方式，支持CMake集成',
        fullDescription: 'Paker是一个现代化的C++包管理工具，旨在简化C++项目的依赖管理。支持CMake集成，提供简单的命令行接口，让开发者能够轻松管理项目依赖。项目使用C++17标准开发，采用模块化设计，支持多种包格式。',
        icon: 'CodeBracketIcon',
        color: '#3182ce',
        gradient: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)',
        date: '2025年9月',
        role: '核心开发者',
        technologies: ['C++17', 'CMake', 'Package Management', 'CLI'],
        features: [
          'CMake集成支持',
          '命令行接口',
          '依赖解析',
          '包版本管理',
          '模块化架构',
          '跨平台支持'
        ],
        demoUrl: 'https://github.com/Cyxuan0311/Paker',
        githubUrl: 'https://github.com/Cyxuan0311/Paker'
      },
      {
        id: 2,
        title: 'cuOP - CUDA算子库',
        category: 'HPC/GPU计算',
        type: 'hpc',
        description: '支持CUDA的算子库，提供智能内存控制和JIT编译功能，专为高性能GPU计算设计',
        fullDescription: 'cuOP是一个高性能的CUDA算子库，专为GPU计算优化。支持智能内存管理、JIT编译和多种GPU操作。项目使用现代C++和CUDA技术，为HPC应用提供高效的GPU计算能力。',
        icon: 'CpuChipIcon',
        color: '#38a169',
        gradient: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
        date: '2025年9月',
        role: '核心开发者',
        technologies: ['CUDA', 'C++', 'HPC', 'JIT', 'GPU Computing'],
        features: [
          '智能内存管理',
          'JIT编译支持',
          'GPU操作优化',
          '高性能计算',
          'CUDA集成',
          '多GPU支持'
        ],
        demoUrl: 'https://github.com/Cyxuan0311/cuOP',
        githubUrl: 'https://github.com/Cyxuan0311/cuOP'
      },
      {
        id: 3,
        title: 'FTB - 文件浏览器',
        category: '终端应用',
        type: 'tool',
        description: '基于FTXUI和Linux的C++文件浏览器，提供现代化的终端文件管理体验',
        fullDescription: 'FTB是一个基于FTXUI库开发的现代化终端文件浏览器。使用C++和CMake构建，提供直观的文件管理界面，支持Linux平台。项目展示了现代C++在终端应用开发中的应用。',
        icon: 'ComputerDesktopIcon',
        color: '#d69e2e',
        gradient: 'linear-gradient(135deg, #d69e2e 0%, #b7791f 100%)',
        date: '2025年9月',
        role: '核心开发者',
        technologies: ['C++', 'FTXUI', 'Linux', 'CMake', 'Terminal UI'],
        features: [
          '终端UI界面',
          '文件系统操作',
          'FTXUI集成',
          '跨平台支持',
          '键盘快捷键',
          '文件预览'
        ],
        demoUrl: 'https://github.com/Cyxuan0311/FTB',
        githubUrl: 'https://github.com/Cyxuan0311/FTB'
      },
      {
        id: 4,
        title: 'Nexus - 代码编辑器',
        category: '桌面应用',
        type: 'tool',
        description: '基于Qt5的XML/Markdown/编程语言结构编辑器，提供可视化的代码结构展示',
        fullDescription: 'Nexus是一个基于Qt5开发的代码编辑器，专门用于显示XML、Markdown和编程语言的结构。使用C++17和CMake构建，提供直观的代码结构可视化功能。',
        icon: 'WrenchScrewdriverIcon',
        color: '#805ad5',
        gradient: 'linear-gradient(135deg, #805ad5 0%, #6b46c1 100%)',
        date: '2025年9月',
        role: '核心开发者',
        technologies: ['C++17', 'Qt5', 'CMake', 'XML Parser', 'Markdown'],
        features: [
          'Qt5界面架构',
          'XML/Markdown解析',
          '代码结构可视化',
          '语法高亮',
          '文件管理',
          '插件系统'
        ],
        demoUrl: 'https://github.com/Cyxuan0311/Nexus',
        githubUrl: 'https://github.com/Cyxuan0311/Nexus'
      },
      {
        id: 5,
        title: 'SPIDERS - 新闻爬虫',
        category: 'Java应用',
        type: 'java',
        description: '基于Java的新闻爬虫应用，使用Jsoup进行网页爬取，Swing构建UI，MySQL存储数据',
        fullDescription: 'SPIDERS是一个基于Java开发的新闻爬虫应用。使用Jsoup库进行网页内容爬取，将新闻信息存储到MySQL数据库，使用Swing构建用户界面。项目采用Maven管理依赖，使用JUnit进行单元测试，Lombok简化代码编写。',
        icon: 'CubeIcon',
        color: '#e53e3e',
        gradient: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
        date: '2025年5月',
        role: '全栈开发者',
        technologies: ['Java', 'Maven', 'Jsoup', 'Swing', 'MySQL', 'JUnit', 'Lombok'],
        features: [
          '网页内容爬取',
          'Swing用户界面',
          'MySQL数据存储',
          'Maven依赖管理',
          'JUnit单元测试',
          'Lombok代码简化'
        ],
        demoUrl: 'https://github.com/Cyxuan0311/SPIDERS',
        githubUrl: 'https://github.com/Cyxuan0311/SPIDERS'
      },
      {
        id: 6,
        title: 'Easy_Log - 日志系统',
        category: 'C++系统',
        type: 'cpp',
        description: '基于Linux平台的简单日志系统，提供高效的日志记录和管理功能',
        fullDescription: 'Easy_Log是一个专为Linux平台设计的轻量级日志系统。使用C++开发，提供高效的日志记录、分级管理和文件输出功能。项目采用现代C++特性，确保高性能和易用性。',
        icon: 'CodeBracketIcon',
        color: '#dd6b20',
        gradient: 'linear-gradient(135deg, #dd6b20 0%, #c05621 100%)',
        date: '2025年2月',
        role: '核心开发者',
        technologies: ['C++', 'Linux', 'Logging', 'File I/O'],
        features: [
          '多级日志记录',
          '文件输出管理',
          '性能优化',
          '线程安全',
          '配置灵活',
          '跨平台支持'
        ],
        demoUrl: 'https://github.com/Cyxuan0311/Easy_Log',
        githubUrl: 'https://github.com/Cyxuan0311/Easy_Log'
      }
    ])
    
    const filteredProjects = computed(() => {
      if (activeFilter.value === 'all') {
        return projects.value
      }
      return projects.value.filter(project => project.type === activeFilter.value)
    })
    
    const setActiveFilter = (filter) => {
      activeFilter.value = filter
    }
    
    const openProjectModal = (project) => {
      selectedProject.value = project
      showModal.value = true
    }
    
    return {
      activeFilter,
      showModal,
      selectedProject,
      contentLoading,
      filters,
      projects,
      filteredProjects,
      setActiveFilter,
      openProjectModal
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
