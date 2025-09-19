<template>
  <div class="contact-page">
    <div class="page-header">
      <h1>联系我</h1>
      <p>让我们开始交流吧</p>
    </div>
    
    <div class="contact-content">
      <div class="contact-info-section">
        <h2>联系方式</h2>
        <div class="contact-methods">
          <div class="contact-method">
            <EnvelopeIcon class="method-icon" />
            <div class="method-info">
              <h3>邮箱</h3>
              <p>cyxvvv@gmail.com</p>
              <a href="mailto:cyxvvv@gmail.com" class="contact-link">发送邮件</a>
            </div>
          </div>
          
          <div class="contact-method">
            <CodeBracketIcon class="method-icon" />
            <div class="method-info">
              <h3>GitHub</h3>
              <p>Cyxuan0311</p>
              <a href="https://github.com/Cyxuan0311" target="_blank" class="contact-link">访问主页</a>
            </div>
          </div>
          
          <div class="contact-method">
            <MapPinIcon class="method-icon" />
            <div class="method-info">
              <h3>位置</h3>
              <p>中国武汉</p>
              <span class="contact-text">欢迎线下交流</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="contact-form-section">
        <h2>发送消息</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          
          <div class="form-group">
            <label for="email">邮箱</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          
          <div class="form-group">
            <label for="subject">主题</label>
            <input type="text" id="subject" v-model="form.subject" required>
          </div>
          
          <div class="form-group">
            <label for="message">消息</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <PaperAirplaneIcon class="btn-icon" />
            {{ isSubmitting ? '发送中...' : '发送消息' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { 
  EnvelopeIcon, 
  CodeBracketIcon, 
  MapPinIcon,
  PaperAirplaneIcon
} from '@heroicons/vue/24/outline'

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
      alert('消息发送成功！我会尽快回复您。')
    }
    
    return {
      form,
      isSubmitting,
      submitForm
    }
  }
}
</script>

<style scoped>
.contact-page {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info-section,
.contact-form-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.contact-info-section h2,
.contact-form-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.contact-method:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.method-icon {
  width: 48px;
  height: 48px;
  padding: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #3182ce;
}

.btn-icon {
  width: 18px;
  height: 18px;
  margin-right: 0.5rem;
}

.method-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.method-info p {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.contact-link {
  color: #20c997;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #17a2b8;
  text-decoration: underline;
}

.contact-text {
  color: #6c757d;
  font-style: italic;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #20c997;
  box-shadow: 0 0 0 3px rgba(32, 201, 151, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background: linear-gradient(45deg, #3182ce, #2b6cb0);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  display: flex;
  align-items: center;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(49, 130, 206, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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