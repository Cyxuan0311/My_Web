<template>
  <div class="home">
    <Transition name="fade" mode="out-in">
      <div v-if="!detailView" key="list" class="home-list">
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
                <ProjectCard
                  v-for="project in projects"
                  :key="project.id"
                  :project="project"
                  :read-more-text="homeText.readMore"
                  @open="openProject"
                />
              </div>
            </template>
            <template v-else>
              <div class="list">
                <NoteCard
                  v-for="note in notes"
                  :key="note.id"
                  :note="note"
                  :read-more-text="homeText.readMore"
                  @open="openNote"
                />
              </div>
            </template>
          </div>
        </div>
      </div>

      <div v-else class="detail-wrap" key="detail">
        <button class="back-btn" @click="closeDetail">← {{ homeText.back }}</button>
        <div class="md-body" v-html="mdHtml"></div>
        <div v-if="mdLoading" class="md-loading">{{ homeText.loading }}</div>
      </div>
    </Transition>
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
import ProjectCard from '../components/ProjectCard.vue'
import NoteCard from '../components/NoteCard.vue'

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
  components: { ProjectCard, NoteCard },
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

.home-list {
  width: 100%;
}

.sub-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
  padding-top: 0.5rem;
}

.sub-tab {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-mute);
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;
}

.sub-tab:hover { color: var(--text-weak); }

.sub-tab.active {
  color: var(--text-strong);
  font-weight: 600;
  border-bottom-color: var(--text-strong);
}

.list-wrap {
  padding-bottom: 3rem;
}

.scroll-area {
  max-height: 72vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
  scrollbar-gutter: stable;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}

.detail-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding-top: 0.5rem;
}

.back-btn {
  display: inline-block;
  background: none;
  border: none;
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-weak);
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-btn:hover { color: var(--text-strong); }

.md-loading { color: var(--text-mute); font-size: 0.9rem; }

.md-body {
  line-height: 1.85;
  font-size: 1rem;
}

.md-body h1 { font-size: 1.7rem; margin-bottom: 0.5rem; color: var(--text-strong); }
.md-body h2 { font-size: 1.35rem; margin-top: 2rem; margin-bottom: 0.5rem; color: var(--text-strong); }
.md-body h3 { font-size: 1.15rem; margin-top: 1.5rem; margin-bottom: 0.25rem; color: var(--text-strong); }
.md-body p { margin-bottom: 0.75rem; color: var(--text); }
.md-body ul, .md-body ol { margin-bottom: 0.75rem; padding-left: 1.5rem; }
.md-body li { margin-bottom: 0.25rem; }
.md-body strong { font-weight: 700; }

.md-body code:not(pre code) {
  font-family: var(--font-code);
  font-size: 0.85em;
  background: var(--code-bg);
  padding: 0.15em 0.4em;
  border-radius: 3px;
  color: var(--code-text);
}

.md-body pre {
  position: relative;
  background: var(--code-block-bg);
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
  color: var(--code-block-text);
  font-family: var(--font-code);
  tab-size: 2;
}

.md-body table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.md-body th,
.md-body td {
  border: 1px solid var(--border-strong);
  padding: 0.5rem 0.75rem;
  text-align: left;
  vertical-align: top;
}

.md-body th {
  background: var(--table-th-bg);
  font-weight: 700;
  color: var(--text-strong);
}

.md-body tr:nth-child(even) td {
  background: var(--table-stripe);
}

.md-body blockquote {
  border-left: 3px solid var(--border-strong);
  padding-left: 1rem;
  color: var(--text-weak);
  margin-bottom: 0.75rem;
}

.md-body a { color: var(--text-strong); text-decoration: underline; }
.md-body a:hover { color: var(--text-weak); }

.md-body hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1.5rem 0;
}

.fade-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .scroll-area { max-height: 65vh; }
}
</style>
