<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          <div class="link-group">
            <h4>快速导航</h4>
            <a href="#home">首页</a>
            <a href="#about">关于我</a>
            <a href="#portfolio">作品展示</a>
            <a href="#contact">联系我</a>
          </div>
          
          <div class="link-group">
            <h4>技能专长</h4>
            <a href="#">C/C++ 开发</a>
            <a href="#">AI 基础设施</a>
            <a href="#">高性能计算</a>
            <a href="#">容器化技术</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 我的个人网站. 保留所有权利.</p>
        <p>用 ❤️ 和 Vue.js 构建</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 3rem 0;
}


.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.link-group h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.link-group a {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.link-group a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.footer-bottom p {
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
