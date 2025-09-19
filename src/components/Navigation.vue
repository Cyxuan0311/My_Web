<template>
  <nav class="navigation">
    <div class="container">
      <div class="nav-content">
        <div class="logo">
          <h2 class="logo-text">我的网站</h2>
        </div>
        
        <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
          <a 
            v-for="item in menuItems" 
            :key="item.name"
            :href="item.href" 
            class="nav-link"
            @click="scrollToSection(item.href, $event)"
          >
            {{ item.name }}
          </a>
        </div>
        
        <div class="nav-toggle" @click="toggleMenu">
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>✕</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
// import { Menu, Close } from '@element-plus/icons-vue'

export default {
  name: 'Navigation',
  components: {
    // Menu,
    // Close
  },
  setup() {
    const isMenuOpen = ref(false)
    
    const menuItems = [
      { name: '首页', href: '#home' },
      { name: '关于我', href: '#about' },
      { name: '作品展示', href: '#portfolio' },
      { name: '技能', href: '#skills' },
      { name: '联系我', href: '#contact' }
    ]
    
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }
    
    const scrollToSection = (href, event) => {
      event.preventDefault()
      const targetId = href.replace('#', '')
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
      
      isMenuOpen.value = false
    }
    
    return {
      isMenuOpen,
      menuItems,
      toggleMenu,
      scrollToSection
    }
  }
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-lighter);
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, var(--primary-color), var(--success-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-toggle {
  display: none;
  cursor: pointer;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 2rem;
    box-shadow: var(--box-shadow-light);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .nav-menu-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-toggle {
    display: block;
  }
}
</style>
