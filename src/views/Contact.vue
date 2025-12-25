<template>
  <div class="tui-contact-page">
    <div class="tui-contact-content">
      <div class="tui-contact-info-section">
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">{{ contactText.infoTitle }}</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <div class="tui-contact-methods">
          <div
            class="tui-contact-method"
            v-for="method in contactMethods"
            :key="method.key"
          >
            <div class="tui-method-header">
              <component :is="method.icon" class="tui-method-icon" />
              <span class="tui-prompt">→</span>
              <span class="tui-method-label">{{ method.label }}</span>
            </div>
            <div class="tui-method-info">
              <div class="tui-method-line">
                <span class="tui-prompt">$</span>
                <span class="tui-method-value">{{ method.value }}</span>
              </div>
              <div v-if="method.actionText && method.href" class="tui-method-line">
                <a
                  :href="method.href"
                  target="_blank"
                  class="tui-contact-link"
                >
                  <span class="tui-prompt">→</span>
                  <span>{{ method.actionText }}</span>
                </a>
              </div>
              <div v-else-if="method.extra" class="tui-method-line">
                <span class="tui-prompt">·</span>
                <span class="tui-contact-text">{{ method.extra }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tui-contact-form-section">
        <div class="tui-section-header">
          <span class="tui-header-decoration">┌─</span>
          <span class="tui-section-title">{{ contactText.formTitle }}</span>
          <span class="tui-header-decoration">─┐</span>
        </div>
        <form class="tui-contact-form" @submit.prevent="submitForm">
          <div class="tui-form-group">
            <div class="tui-form-label-line">
              <span class="tui-prompt">$</span>
              <label for="name">{{ contactText.form.name }}</label>
            </div>
            <input type="text" id="name" v-model="form.name" class="tui-form-input" required>
          </div>
          
          <div class="tui-form-group">
            <div class="tui-form-label-line">
              <span class="tui-prompt">$</span>
              <label for="email">{{ contactText.form.email }}</label>
            </div>
            <input type="email" id="email" v-model="form.email" class="tui-form-input" required>
          </div>
          
          <div class="tui-form-group">
            <div class="tui-form-label-line">
              <span class="tui-prompt">$</span>
              <label for="subject">{{ contactText.form.subject }}</label>
            </div>
            <input type="text" id="subject" v-model="form.subject" class="tui-form-input" required>
          </div>
          
          <div class="tui-form-group">
            <div class="tui-form-label-line">
              <span class="tui-prompt">$</span>
              <label for="message">{{ contactText.form.message }}</label>
            </div>
            <textarea id="message" v-model="form.message" rows="5" class="tui-form-textarea" required></textarea>
          </div>
          
          <button type="submit" class="tui-submit-btn" :disabled="isSubmitting">
            <span class="tui-prompt">→</span>
            <PaperAirplaneIcon class="tui-btn-icon" />
            <span>{{ isSubmitting ? contactText.sending : contactText.sendMessage }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { 
  EnvelopeIcon, 
  CodeBracketIcon, 
  MapPinIcon,
  PaperAirplaneIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Contact',
  components: {
    EnvelopeIcon,
    CodeBracketIcon,
    MapPinIcon,
    PaperAirplaneIcon
  },
  setup() {
    const isSubmitting = ref(false)
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    const { messages } = useI18n()
    const contactText = computed(() => messages.value.contact)
    const contactMethods = computed(() => contactText.value.methods)
    
    const submitForm = async () => {
      isSubmitting.value = true
      
      // 模拟发送
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 重置表单
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      
      isSubmitting.value = false
      alert(contactText.value.alertSuccess)
    }
    
    return {
      form,
      isSubmitting,
      submitForm,
      contactText,
      contactMethods
    }
  }
}
</script>

<style scoped>
.tui-contact-page {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  color: #c9d1d9;
}

/* TUI 通用样式 */
.tui-header-decoration {
  color: #58a6ff;
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.6;
  margin: 0 0.5rem;
}

.tui-section-title {
  color: #58a6ff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 
    0 0 10px rgba(88, 166, 255, 0.5),
    0 0 20px rgba(88, 166, 255, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(135deg, #58a6ff 0%, #79c0ff 50%, #58a6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: title-shimmer 3s ease-in-out infinite;
}

@keyframes title-shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.tui-section-header {
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #30363d;
}

.tui-prompt {
  color: #58a6ff;
  font-weight: 600;
  margin-right: 0.5rem;
  font-size: 0.85rem;
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

.tui-contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.tui-contact-info-section,
.tui-contact-form-section {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1.5rem;
}

.tui-contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tui-contact-method {
  padding: 1.25rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.tui-contact-method:hover {
  border-color: #58a6ff;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  transform: translateY(-2px);
}

.tui-method-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #30363d;
}

.tui-method-icon {
  width: 24px;
  height: 24px;
  color: #58a6ff;
  flex-shrink: 0;
}

.tui-method-label {
  font-size: 1rem;
  font-weight: 600;
  color: #58a6ff;
}

.tui-method-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tui-method-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.tui-method-value {
  color: #c9d1d9;
}

.tui-contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #58a6ff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tui-contact-link:hover {
  color: #79c0ff;
  text-shadow: 0 0 10px rgba(88, 166, 255, 0.5);
}

.tui-contact-text {
  color: #8b949e;
}

.tui-contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.tui-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tui-form-label-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tui-form-group label {
  font-weight: 500;
  color: #58a6ff;
  font-size: 0.9rem;
}

.tui-form-input,
.tui-form-textarea {
  padding: 0.75rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #c9d1d9;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  transition: all 0.3s ease;
  outline: none;
}

.tui-form-input::placeholder,
.tui-form-textarea::placeholder {
  color: #6e7681;
  opacity: 1;
}

.tui-form-input:focus,
.tui-form-textarea:focus {
  border-color: #58a6ff;
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
  background: #21262d;
  color: #c9d1d9;
}

/* 处理浏览器自动填充 */
.tui-form-input:-webkit-autofill,
.tui-form-input:-webkit-autofill:hover,
.tui-form-input:-webkit-autofill:focus,
.tui-form-textarea:-webkit-autofill,
.tui-form-textarea:-webkit-autofill:hover,
.tui-form-textarea:-webkit-autofill:focus {
  -webkit-text-fill-color: #c9d1d9;
  -webkit-box-shadow: 0 0 0px 1000px #161b22 inset;
  transition: background-color 5000s ease-in-out 0s;
  border: 1px solid #30363d;
}

.tui-form-input:-webkit-autofill:focus,
.tui-form-textarea:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #21262d inset, 0 0 0 3px rgba(88, 166, 255, 0.1);
  border-color: #58a6ff;
}

.tui-form-textarea {
  resize: vertical;
  min-height: 120px;
}

.tui-submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: #161b22;
  border: 1px solid #58a6ff;
  border-radius: 8px;
  color: #58a6ff;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Fira Code', monospace;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  align-self: flex-start;
}

.tui-submit-btn:hover:not(:disabled) {
  background: #21262d;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.3);
  transform: translateY(-2px);
}

.tui-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #30363d;
}

.tui-btn-icon {
  width: 18px;
  height: 18px;
  color: inherit;
}

@media (max-width: 768px) {
  .contact-page {
    padding: 1rem;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-info-section,
  .contact-form-section {
    padding: 1.5rem;
  }
  
  .contact-method {
    flex-direction: column;
    text-align: center;
  }
  
  .method-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
}
</style>