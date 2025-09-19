<template>
  <div class="blog-page">
    <div class="page-header">
      <h1>技术博客</h1>
      <p>分享我的技术见解和学习心得</p>
    </div>
    
    <div class="blog-content">
      <div class="blog-posts">
        <article class="blog-post" v-for="post in blogPosts" :key="post.id">
          <div class="post-meta">
            <span class="post-date">
              <CalendarIcon class="meta-icon" />
              {{ post.date }}
            </span>
            <span class="post-category">
              <TagIcon class="meta-icon" />
              {{ post.category }}
            </span>
          </div>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-stats">
            <span><EyeIcon class="stat-icon" /> {{ post.views }}</span>
            <span><ChatBubbleLeftIcon class="stat-icon" /> {{ post.comments }}</span>
            <span><HeartIcon class="stat-icon" /> {{ post.likes }}</span>
          </div>
          <div class="post-actions">
            <button class="read-btn">阅读全文</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  EyeIcon, 
  ChatBubbleLeftIcon, 
  HeartIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Blog',
  components: {
    EyeIcon,
    ChatBubbleLeftIcon,
    HeartIcon,
    CalendarIcon,
    TagIcon
  },
  setup() {
    const blogPosts = [
      {
        id: 1,
        title: 'C++17包管理器的设计与实现',
        excerpt: '基于Paker项目的经验分享，深入探讨C++包管理器的设计理念、架构实现和CMake集成的最佳实践。',
        date: '2025-09-17',
        category: 'C/C++',
        views: 1250,
        comments: 23,
        likes: 89
      },
      {
        id: 2,
        title: 'CUDA操作库的性能优化实践',
        excerpt: '从cuOP项目出发，分享CUDA编程中的内存管理、JIT编译和GPU计算优化的实战经验和技巧。',
        date: '2025-09-15',
        category: 'HPC/GPU',
        views: 980,
        comments: 15,
        likes: 67
      },
      {
        id: 3,
        title: '现代C++终端应用开发指南',
        excerpt: '基于FTB文件浏览器的开发经验，介绍使用FTXUI库开发现代化终端应用的设计思路和实现方法。',
        date: '2025-09-12',
        category: 'C/C++',
        views: 756,
        comments: 12,
        likes: 45
      },
      {
        id: 4,
        title: 'Qt5代码编辑器的架构设计',
        excerpt: '从Nexus项目出发，分享基于Qt5开发代码编辑器的架构设计、XML解析和代码结构可视化的实现方案。',
        date: '2025-09-10',
        category: 'C/C++',
        views: 892,
        comments: 18,
        likes: 72
      },
      {
        id: 5,
        title: 'Java爬虫系统的设计与实现',
        excerpt: '基于SPIDERS项目的实战经验，分享使用Jsoup进行网页爬取、Swing构建UI和MySQL数据存储的完整解决方案。',
        date: '2025-05-25',
        category: 'Java',
        views: 634,
        comments: 8,
        likes: 38
      },
      {
        id: 6,
        title: 'C++日志系统的高性能实现',
        excerpt: '从Easy_Log项目出发，深入分析C++日志系统的设计原理、性能优化和线程安全等关键技术点。',
        date: '2025-02-26',
        category: 'C/C++',
        views: 1123,
        comments: 25,
        likes: 91
      }
    ]

    return {
      blogPosts
    }
  }
}
</script>

<style scoped>
.blog-page {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
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

.blog-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.blog-post {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
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
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.post-excerpt {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.post-stats {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.meta-icon,
.stat-icon {
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
  color: #718096;
  vertical-align: middle;
}

.post-actions {
  text-align: right;
}

.read-btn {
  background: linear-gradient(45deg, #20c997, #17a2b8);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.read-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(32, 201, 151, 0.3);
}

@media (max-width: 768px) {
  .blog-page {
    padding: 1rem;
  }
  
  .blog-posts {
    grid-template-columns: 1fr;
  }
  
  .blog-post {
    padding: 1.5rem;
  }
}
</style>
