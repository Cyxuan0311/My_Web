import { ref, watch } from 'vue'

const themes = ['light', 'dark']
const defaultTheme = 'light'

const currentTheme = ref(defaultTheme)

if (typeof window !== 'undefined') {
  const saved = window.localStorage.getItem('app-theme')
  if (saved && themes.includes(saved)) {
    currentTheme.value = saved
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    currentTheme.value = prefersDark ? 'dark' : 'light'
  }
}

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
}

applyTheme(currentTheme.value)

watch(currentTheme, (val) => {
  applyTheme(val)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('app-theme', val)
  }
})

const setTheme = (value) => {
  if (!themes.includes(value)) return
  currentTheme.value = value
}

const toggleTheme = () => {
  setTheme(currentTheme.value === 'light' ? 'dark' : 'light')
}

export const useTheme = () => ({
  theme: currentTheme,
  setTheme,
  toggleTheme
})
