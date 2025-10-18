<template>
  <div class="contact">
    <div class="container">
      <h1>Контакты</h1>
      
      <div class="contact-content">
        <section class="contact-info">
          <div class="card">
            <h2>Контактная информация</h2>
            <div class="info-item">
              <strong>Адрес:</strong>
              <p>{{ schoolInfo.address || 'ул. Примерная, д. 123, г. Город' }}</p>
            </div>
            <div class="info-item">
              <strong>Телефон:</strong>
              <p>{{ schoolInfo.phone || '+7 (xxx) xxx-xx-xx' }}</p>
            </div>
            <div class="info-item">
              <strong>Email:</strong>
              <p>{{ schoolInfo.email || 'school@example.com' }}</p>
            </div>
            <div class="info-item">
              <strong>Директор:</strong>
              <p>Иванов Иван Иванович</p>
            </div>
          </div>
          
          <div class="card">
            <h2>Режим работы</h2>
            <div class="schedule">
              <div class="schedule-item">
                <span>Понедельник - Пятница:</span>
                <span>8:00 - 18:00</span>
              </div>
              <div class="schedule-item">
                <span>Суббота:</span>
                <span>9:00 - 15:00</span>
              </div>
              <div class="schedule-item">
                <span>Воскресенье:</span>
                <span>Выходной</span>
              </div>
            </div>
          </div>
        </section>

        <section class="contact-form">
          <div class="card">
            <h2>Написать нам</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Имя:</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="subject">Тема:</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="message">Сообщение:</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="5" 
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn">Отправить</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Contact',
  computed: {
    ...mapGetters(['getSchoolInfo']),
    schoolInfo() {
      return this.getSchoolInfo || {}
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Здесь можно добавить логику отправки формы
      console.log('Отправка формы:', this.form)
      alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.')
      
      // Очистка формы
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 2rem 0;
}

.contact h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.contact-info h2,
.contact-form h2 {
  color: #3498db;
  margin-bottom: 1rem;
}

.info-item {
  margin-bottom: 1rem;
}

.info-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.info-item p {
  margin: 0;
  color: #555;
}

.schedule {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.schedule-item:last-child {
  border-bottom: none;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .schedule-item {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
