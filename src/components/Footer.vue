<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <h3 class="footer-title">我的个人网站</h3>
          <p class="footer-desc">欢迎来到我的个人空间，这里记录着我的成长与作品。</p>
          <div class="social-links">
            <a href="https://github.com/Cyxuan0311" target="_blank" class="social-link github">
              <CodeBracketIcon class="social-icon" />
              <span class="social-text">GitHub</span>
            </a>
            <a href="#" class="social-link wechat">
              <ChatBubbleLeftRightIcon class="social-icon" />
              <span class="social-text">微信</span>
            </a>
            <a href="#" class="social-link link">
              <LinkIcon class="social-icon" />
              <span class="social-text">链接</span>
            </a>
          </div>
        </div>
        
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
            <a href="#">前端开发</a>
            <a href="#">UI设计</a>
            <a href="#">移动开发</a>
            <a href="#">全栈开发</a>
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
import { 
  CodeBracketIcon, 
  ChatBubbleLeftRightIcon, 
  LinkIcon 
} from '@heroicons/vue/24/outline'

export default {
  name: 'Footer',
  components: {
    CodeBracketIcon,
    ChatBubbleLeftRightIcon,
    LinkIcon
  }
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
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  padding: 3rem 0;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-desc {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: white;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.social-link:hover::before {
  left: 100%;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.social-link:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.social-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1) rotate(5deg);
}

.social-text {
  transition: all 0.3s ease;
}

.social-link.github:hover {
  background: linear-gradient(135deg, rgba(36, 41, 46, 0.9), rgba(36, 41, 46, 0.7));
  border-color: rgba(255, 255, 255, 0.4);
}

.social-link.wechat:hover {
  background: linear-gradient(135deg, rgba(7, 193, 96, 0.9), rgba(7, 193, 96, 0.7));
  border-color: rgba(255, 255, 255, 0.4);
}

.social-link.link:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(99, 102, 241, 0.7));
  border-color: rgba(255, 255, 255, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .social-links {
    gap: 0.8rem;
    justify-content: center;
  }
  
  .social-link {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
  
  .social-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .social-links {
    flex-direction: column;
    gap: 0.6rem;
    align-items: center;
  }
  
  .social-link {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
    width: fit-content;
  }
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
