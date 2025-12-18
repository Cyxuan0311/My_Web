import { computed, ref } from 'vue'
import { messages } from '../locales/messages'

const supportedLocales = ['zh', 'en']
const defaultLocale = 'zh'

const currentLocale = ref(defaultLocale)

if (typeof window !== 'undefined') {
  const savedLocale = window.localStorage.getItem('app-locale')
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    currentLocale.value = savedLocale
  }
}

const setLocale = (value) => {
  if (!supportedLocales.includes(value)) return
  currentLocale.value = value
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('app-locale', value)
  }
}

const toggleLocale = () => {
  setLocale(currentLocale.value === 'zh' ? 'en' : 'zh')
}

const currentMessages = computed(() => messages[currentLocale.value])

const t = (path) => {
  if (!path) return ''
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), currentMessages.value) ?? path
}

export const useI18n = () => ({
  locale: computed(() => currentLocale.value),
  setLocale,
  toggleLocale,
  t,
  messages: currentMessages
})

