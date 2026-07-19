<template>
  <div class="home">
    <template v-if="!detailView">
      <div class="sub-tabs">
        <button
          class="sub-tab"
          :class="{ active: subTab === 'projects' }"
          @click="subTab = 'projects'"
        >{{ homeText.subTabs.projects }}</button>
        <button
          class="sub-tab"
          :class="{ active: subTab === 'notes' }"
          @click="subTab = 'notes'"
        >{{ homeText.subTabs.notes }}</button>
      </div>

      <div class="list-wrap">
        <div class="scroll-area">
          <template v-if="subTab === 'projects'">
            <div class="list">
              <div
                class="list-card"
                v-for="project in projects"
                :key="project.id"
                @click="openProject(project)"
              >
                <h3 class="list-card-title">{{ project.name }}</h3>
                <p class="list-card-desc">{{ project.description }}</p>
                <div class="list-card-meta">
                  <span class="lang-tag">{{ project.language }}</span>
                  <span v-if="project.stars">★ {{ project.stars }}</span>
                  <span class="read-more">{{ homeText.readMore }} →</span>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="list">
              <div
                class="list-card"
                v-for="note in notes"
                :key="note.id"
                @click="openNote(note)"
              >
                <h3 class="list-card-title">{{ note.title }}</h3>
                <p class="list-card-desc">{{ note.description }}</p>
                <div class="list-card-meta">
                  <span></span>
                  <span class="read-more">{{ homeText.readMore }} →</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <div v-else class="detail-wrap">
      <button class="back-btn" @click="closeDetail">← {{ homeText.back }}</button>
      <div class="md-body" v-html="mdHtml"></div>
      <div v-if="mdLoading" class="md-loading">{{ homeText.loading }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'
import cpp from 'highlight.js/lib/languages/cpp'
import c from 'highlight.js/lib/languages/c'
import python from 'highlight.js/lib/languages/python'
import go from 'highlight.js/lib/languages/go'
import bash from 'highlight.js/lib/languages/bash'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import makefile from 'highlight.js/lib/languages/makefile'
import plaintext from 'highlight.js/lib/languages/plaintext'

hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('c', c)
hljs.registerLanguage('python', python)
hljs.registerLanguage('go', go)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('java', java)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('makefile', makefile)
hljs.registerLanguage('cmake', makefile)
hljs.registerLanguage('text', plaintext)
hljs.registerLanguage('plaintext', plaintext)

import { useI18n } from '../composables/useI18n'

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch {}
    }
    return code
  },
  breaks: true,
  gfm: true
})

export default {
  name: 'Home',
  setup() {
    const { messages } = useI18n()
    const homeText = computed(() => messages.value.home)
    const projects = computed(() => messages.value.home.projects)
    const notes = computed(() => messages.value.home.notes)

    const subTab = ref('projects')
    const detailView = ref(false)
    const mdHtml = ref('')
    const mdLoading = ref(false)

    const fetchMd = async (mdPath) => {
      detailView.value = true
      mdHtml.value = ''
      mdLoading.value = true
      try {
        const res = await fetch(mdPath)
        const text = res.ok ? await res.text() : ''
        mdHtml.value = text ? marked.parse(text) : '<p style="color:#999">Not available.</p>'
      } catch {
        mdHtml.value = '<p style="color:#999">Failed to load.</p>'
      } finally {
        mdLoading.value = false
      }
    }

    const openProject = (project) => fetchMd(project.mdPath)
    const openNote = (note) => fetchMd(note.mdPath)

    const closeDetail = () => {
      detailView.value = false
      mdHtml.value = ''
    }

    return {
      homeText, projects, notes,
      subTab, detailView, mdHtml, mdLoading,
      openProject, openNote, closeDetail
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 760px;
  margin: 0 auto;
}

.sub-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 1.5rem;
  padding-top: 0.5rem;
}

.sub-tab {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: 'Times New Roman', Times, Georgia, serif;
  font-size: 1.05rem;
  color: #999;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;
}

.sub-tab:hover { color: #666; }

.sub-tab.active {
  color: #000;
  font-weight: 700;
  border-bottom-color: #000;
}

.list-wrap {
  padding-bottom: 3rem;
}

.scroll-area {
  max-height: 72vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-area::-webkit-scrollbar { display: none; }

.list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
}

.list-card {
  padding: 1.15rem 1.5rem;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s;
  min-height: 110px;
  display: flex;
  flex-direction: column;
}

.list-card:hover { background: #fafafa; }

.list-card + .list-card {
  border-top: 1px solid #e5e5e5;
}

.list-card-title {
  font-size: 1.15rem;
  margin-bottom: 0.2rem;
  font-weight: 700;
}

.list-card-desc {
  color: #666;
  font-size: 0.9rem;
  flex: 1;
  margin-bottom: 0;
}

.list-card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.82rem;
  color: #999;
  margin-top: 0.6rem;
}

.lang-tag {
  display: inline-block;
  background: #f0f0f0;
  padding: 0.05rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #666;
}

.read-more {
  margin-left: auto;
  color: #1a1a1a;
  font-weight: 500;
  font-size: 0.9rem;
}

.list-card:hover .read-more { text-decoration: underline; }

/* ----- detail view ----- */
.detail-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding-top: 0.5rem;
}

.back-btn {
  display: inline-block;
  background: none;
  border: none;
  font-family: 'Times New Roman', Times, Georgia, serif;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-btn:hover { color: #000; }

.md-loading { color: #999; font-size: 0.9rem; }

/* ----- rendered markdown body ----- */
.md-body {
  line-height: 1.85;
  font-size: 1rem;
}

.md-body h1 { font-size: 1.7rem; margin-bottom: 0.5rem; }
.md-body h2 { font-size: 1.35rem; margin-top: 2rem; margin-bottom: 0.5rem; }
.md-body h3 { font-size: 1.15rem; margin-top: 1.5rem; margin-bottom: 0.25rem; }
.md-body p { margin-bottom: 0.75rem; color: #333; }
.md-body ul, .md-body ol { margin-bottom: 0.75rem; padding-left: 1.5rem; }
.md-body li { margin-bottom: 0.25rem; }
.md-body strong { font-weight: 700; }

/* inline code */
.md-body code:not(pre code) {
  font-family: 'Menlo', 'Consolas', 'SF Mono', monospace;
  font-size: 0.85em;
  background: #f0f0f0;
  padding: 0.15em 0.4em;
  border-radius: 3px;
  color: #d63384;
}

/* code blocks */
.md-body pre {
  position: relative;
  background: #1e1e2e;
  padding: 1rem 1.25rem;
  border-radius: 6px;
  overflow-x: auto;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.8rem;
}

.md-body pre code {
  background: none;
  padding: 0;
  color: #cdd6f4;
  font-family: 'Menlo', 'Consolas', 'SF Mono', monospace;
  tab-size: 2;
}

/* tables */
.md-body table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.md-body th,
.md-body td {
  border: 1px solid #d0d0d0;
  padding: 0.5rem 0.75rem;
  text-align: left;
  vertical-align: top;
}

.md-body th {
  background: #f5f5f5;
  font-weight: 700;
}

.md-body tr:nth-child(even) td {
  background: #fafafa;
}

/* blockquote */
.md-body blockquote {
  border-left: 3px solid #d0d0d0;
  padding-left: 1rem;
  color: #666;
  margin-bottom: 0.75rem;
}

/* links */
.md-body a { color: #1a1a1a; text-decoration: underline; }
.md-body a:hover { color: #666; }

/* horizontal rule */
.md-body hr {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 1.5rem 0;
}

@media (max-width: 768px) {
  .list-card { padding: 0.9rem 1.1rem; }
  .scroll-area { max-height: 65vh; }
}
</style>
