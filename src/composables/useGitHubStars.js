import { ref } from 'vue'

const API_BASE = 'https://api.github.com'
const CACHE_TTL = 60 * 60 * 1000 // 缓存 1 小时，避免超出未认证 API 60 次/小时的限制

// 模块级内存缓存：切换页面时不重复请求
const memoryCache = new Map()

function readPersisted(owner) {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(`github-stars:${owner}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writePersisted(owner, entry) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(`github-stars:${owner}`, JSON.stringify(entry))
  } catch {
    // 隐私模式等情况下存储不可用，静默忽略
  }
}

/**
 * 拉取 GitHub 用户所有仓库的 star 数。
 * 采用一次 GET /users/{owner}/repos 拿到全部仓库，而非逐个请求，
 * 未认证限额 60 次/小时，10+ 个仓库一次性获取更省配额。
 */
export function useGitHubStars() {
  const starsMap = ref({}) // repo -> stars
  const loading = ref(false)
  const error = ref(false)

  const applyStars = (stars) => {
    starsMap.value = { ...stars }
  }

  const fetchStars = async (owner) => {
    if (!owner) return
    loading.value = true
    error.value = false

    // 1) 内存缓存
    const mem = memoryCache.get(owner)
    if (mem && Date.now() - mem.ts < CACHE_TTL) {
      applyStars(mem.stars)
      loading.value = false
      return
    }

    // 2) localStorage 缓存
    const persisted = readPersisted(owner)
    if (persisted && Date.now() - persisted.ts < CACHE_TTL) {
      memoryCache.set(owner, persisted)
      applyStars(persisted.stars)
      loading.value = false
      return
    }

    // 3) 请求 GitHub API
    try {
      const res = await fetch(`${API_BASE}/users/${owner}/repos?per_page=100&sort=updated`)
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      const repos = await res.json()
      const stars = {}
      repos.forEach((r) => {
        stars[r.name] = r.stargazers_count ?? 0
      })
      const entry = { stars, ts: Date.now() }
      memoryCache.set(owner, entry)
      writePersisted(owner, entry)
      applyStars(stars)
    } catch (e) {
      error.value = true
      // API 失败时回退到本地缓存的过期数据
      if (persisted) applyStars(persisted.stars)
    } finally {
      loading.value = false
    }
  }

  /** 获取某个仓库的 star 数；未获取到时返回 undefined */
  const getStar = (repo) => starsMap.value[repo]

  return { fetchStars, getStar, starsMap, loading, error }
}

/**
 * 将 star 数格式化为更易读的形式，如 1234 -> "1.2k"
 */
export function formatStars(n) {
  const num = Number(n) || 0
  if (num >= 1000) {
    const v = num / 1000
    return `${v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '')}k`
  }
  return String(num)
}
