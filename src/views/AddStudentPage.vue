<template>
  <div class="add-student-page">
    <div class="page-container">
      <h1 class="page-title">Новый ученик</h1>
      
      <div class="student-form-card">
        <form @submit.prevent="handleSubmit" class="student-form">
          <!-- Поле ФИО -->
          <FormInput
            id="fullName"
            label="ФИО"
            v-model="form.fullName"
            placeholder="Введите ФИО ученика"
            :required="true"
            :maxLength="100"
            :showCounter="true"
            :error="errors.fullName"
            @blur="validateFullName"
          />
          
          <!-- Поле Дата рождения -->
          <DatePicker
            id="birthDate"
            label="Дата рождения"
            v-model="form.birthDate"
            :required="true"
            :minDate="minBirthDate"
            :maxDate="maxBirthDate"
            :error="errors.birthDate"
            @blur="validateBirthDate"
          />
          
          <!-- Поле Пол -->
          <GenderSelector
            label="Пол"
            v-model="form.gender"
            :required="true"
            :error="errors.gender"
            @change="validateGender"
          />
          
          <!-- Поле Класс обучения -->
          <ClassSelector
            id="class"
            label="Класс обучения"
            v-model="form.class"
            placeholder="Класс"
            :required="true"
            :error="errors.class"
            @change="validateClass"
          />
          
          <!-- Кнопки действий -->
          <div class="form-actions">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!canSave || isSaving"
            >
              {{ isSaving ? 'Сохранение...' : 'Добавить ученика' }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="handleCancel"
              :disabled="isSaving"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
      
      <!-- Уведомление об успехе/ошибке -->
      <transition name="fade">
        <div v-if="notification.show" :class="['notification', notification.type]">
          {{ notification.message }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormInput from '../components/FormInput.vue'
import DatePicker from '../components/DatePicker.vue'
import GenderSelector from '../components/GenderSelector.vue'
import ClassSelector from '../components/ClassSelector.vue'

export default {
  name: 'AddStudentPage',
  components: {
    FormInput,
    DatePicker,
    GenderSelector,
    ClassSelector
  },
  data() {
    return {
      notification: {
        show: false,
        message: '',
        type: 'success'
      },
      hasUnsavedChanges: false
    }
  },
  computed: {
    ...mapGetters([
      'newStudentForm',
      'studentFormErrors',
      'canSaveStudent',
      'isSaving'
    ]),
    form() {
      return this.newStudentForm
    },
    errors() {
      return this.studentFormErrors
    },
    canSave() {
      return this.canSaveStudent
    },
    minBirthDate() {
      // Минимальная дата: 18 лет назад
      const date = new Date()
      date.setFullYear(date.getFullYear() - 18)
      return date.toISOString().split('T')[0]
    },
    maxBirthDate() {
      // Максимальная дата: 6 лет назад
      const date = new Date()
      date.setFullYear(date.getFullYear() - 6)
      return date.toISOString().split('T')[0]
    }
  },
  watch: {
    newStudentForm: {
      handler(newVal, oldVal) {
        if (oldVal && (
          newVal.fullName !== '' ||
          newVal.birthDate !== null ||
          newVal.gender !== null ||
          newVal.class !== null
        )) {
          this.hasUnsavedChanges = true
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'updateStudentField',
      'validateField',
      'addNewStudent',
      'clearNewStudentForm'
    ]),
    validateFullName() {
      this.validateField('fullName')
    },
    validateBirthDate() {
      this.validateField('birthDate')
    },
    validateGender() {
      this.validateField('gender')
    },
    validateClass() {
      this.validateField('class')
    },
    async handleSubmit() {
      const result = await this.addNewStudent()
      
      if (result.success) {
        this.showNotification(result.message, 'success')
        this.hasUnsavedChanges = false
        // Перенаправление на главную страницу через 2 секунды
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      } else {
        this.showNotification(result.message, 'error')
      }
    },
    handleCancel() {
      if (this.hasUnsavedChanges) {
        if (confirm('У вас есть несохраненные изменения. Вы уверены, что хотите отменить?')) {
          this.clearNewStudentForm()
          this.hasUnsavedChanges = false
          this.$router.push('/')
        }
      } else {
        this.clearNewStudentForm()
        this.$router.push('/')
      }
    },
    showNotification(message, type = 'success') {
      this.notification.show = true
      this.notification.message = message
      this.notification.type = type
      
      setTimeout(() => {
        this.notification.show = false
      }, 5000)
    }
  },
  beforeUnmount() {
    // Очищаем форму при уходе со страницы
    if (!this.hasUnsavedChanges) {
      this.clearNewStudentForm()
    }
  }
}
</script>

<style scoped>
.add-student-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;
}

.page-container {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
}

.student-form-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.student-form {
  display: flex;
  flex-direction: column;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  flex: 1;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #20C997;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1ba87f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(32, 201, 151, 0.3);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-secondary {
  background-color: #fff;
  color: #6c757d;
  border: 2px solid #dee2e6;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #f8f9fa;
  border-color: #adb5bd;
}

.notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 400px;
}

.notification.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.notification.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .add-student-page {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .student-form-card {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
  }
  
  .notification {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>


