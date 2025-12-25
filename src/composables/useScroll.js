import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, wait) {
  let timeout = null
  let previous = 0
  
  return function(...args) {
    const now = Date.now()
    const remaining = wait - (now - previous)
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 滚动相关的 composable
 * @param {Object} options - 配置选项
 * @param {number} options.throttleDelay - 节流延迟（毫秒），默认 16（约 60fps）
 * @param {number} options.showBackToTopThreshold - 显示返回顶部按钮的阈值，默认 300
 * @param {Array<string>} options.sections - 要监听的区域 ID 数组
 */
export function useScroll(options = {}) {
  const {
    throttleDelay = 16,
    showBackToTopThreshold = 300,
    sections = ['home', 'about', 'skills', 'portfolio', 'blog', 'contact']
  } = options

  const scrollProgress = ref(0)
  const showBackToTop = ref(false)
  const activeSection = ref('home')

  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
    scrollProgress.value = Math.min(Math.max(progress, 0), 100)
    
    // 显示/隐藏返回顶部按钮
    showBackToTop.value = scrollTop > showBackToTopThreshold
    
    // 更新当前活动区域（使用 Intersection Observer 优化）
    updateActiveSection()
  }

  const updateActiveSection = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const viewportHeight = window.innerHeight
    const threshold = 100

    // 从下往上查找第一个进入视口的区域
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i])
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= threshold && rect.bottom >= threshold) {
          activeSection.value = sections[i]
          return
        }
      }
    }
  }

  // 节流后的滚动处理函数
  const throttledUpdateScrollProgress = throttle(updateScrollProgress, throttleDelay)

  const scrollToTop = (behavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior
    })
  }

  const scrollToSection = (sectionId, behavior = 'smooth') => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // 考虑固定头部的高度
      window.scrollTo({
        top: offsetTop,
        behavior
      })
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', throttledUpdateScrollProgress, { passive: true })
    // 初始化时也更新一次
    updateScrollProgress()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', throttledUpdateScrollProgress)
  })

  return {
    scrollProgress,
    showBackToTop,
    activeSection,
    scrollToTop,
    scrollToSection,
    updateScrollProgress
  }
}

