<template>
  <div class="create-group-page">
    <div class="page-header">
      <h1>Новая группа</h1>
    </div>
    
    <div class="group-form-section">
      <FormInput
        id="groupName"
        label="Название"
        v-model="formData.name"
        placeholder="Введите название группы"
        :required="true"
        :showCounter="true"
        :maxLength="50"
        :error="formValidation.name"
        @input="updateFormData"
      />
      
      <FormTextarea
        id="groupDescription"
        label="Описание группы"
        v-model="formData.description"
        placeholder="Введите описание группы"
        :required="true"
        :showCounter="true"
        :maxLength="500"
        :rows="4"
        :error="formValidation.description"
        @input="updateFormData"
      />
    </div>
    
    <div class="students-section">
      <h2>Ученики</h2>
      
      <div v-if="selectedStudents.length === 0" class="add-students-area" @click="openStudentSelectionModal">
        <div class="add-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>
        <p>Добавить учеников</p>
      </div>
      
      <div v-else class="students-table">
        <div class="table-header">
          <div class="col-place">Место</div>
          <div class="col-name">ФИО</div>
          <div class="col-class">Класс</div>
          <div class="col-points">Количество баллов</div>
          <div class="col-actions">Действия</div>
        </div>
        <div 
          v-for="(student, index) in sortedSelectedStudents" 
          :key="student.id" 
          class="table-row"
        >
          <div class="col-place">{{ index + 1 }}</div>
          <div class="col-name">{{ student.name }}</div>
          <div class="col-class">{{ student.class }}</div>
          <div class="col-points">
            {{ student.score || 0 }}
            <svg class="lightning-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
            </svg>
          </div>
          <div class="col-actions">
            <button class="remove-btn" @click="removeStudent(student.id)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <button v-if="selectedStudents.length > 0" class="add-more-btn" @click="openStudentSelectionModal">
        Добавить еще учеников
      </button>
    </div>
    
    <div class="action-buttons">
      <Button variant="secondary" @click="cancel">Отменить</Button>
      <Button 
        variant="primary" 
        @click="createGroup"
        :disabled="!canCreateGroup"
      >
        Создать группу
      </Button>
    </div>
    
    <!-- Модальное окно выбора учеников -->
    <StudentSelectionModal 
      v-if="isStudentSelectionModalOpen"
      @close="closeStudentSelectionModal"
      @add-students="addStudents"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import StudentSelectionModal from '../components/StudentSelectionModal.vue'
import FormInput from '../components/FormInput.vue'
import FormTextarea from '../components/FormTextarea.vue'
import Button from '../components/Button.vue'

export default {
  name: 'CreateGroupPage',
  components: {
    StudentSelectionModal,
    FormInput,
    FormTextarea,
    Button
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState(['isStudentSelectionModalOpen']),
    ...mapGetters(['newGroupForm', 'selectedStudents', 'sortedSelectedStudents', 'canCreateGroup', 'formValidation'])
  },
  methods: {
    ...mapActions([
      'setNewGroupForm', 
      'addStudentsToNewGroup', 
      'removeStudentFromNewGroup',
      'toggleStudentSelectionModal',
      'validateGroupForm',
      'createNewGroup',
      'clearNewGroupForm',
      'fetchAvailableStudents',
      'loadStudentsFromLocalStorage'
    ]),
    updateFormData() {
      this.setNewGroupForm(this.formData)
      this.validateGroupForm(this.formData)
    },
    openStudentSelectionModal() {
      this.loadStudentsFromLocalStorage() // Загружаем учеников перед показом модального окна
      this.fetchAvailableStudents()
      this.toggleStudentSelectionModal(true)
    },
    closeStudentSelectionModal() {
      this.toggleStudentSelectionModal(false)
    },
    addStudents(students) {
      this.addStudentsToNewGroup(students)
      this.closeStudentSelectionModal()
    },
    removeStudent(studentId) {
      this.removeStudentFromNewGroup(studentId)
    },
    async createGroup() {
      const isValid = this.validateGroupForm(this.formData)
      if (isValid && this.selectedStudents.length > 0) {
        try {
          await this.createNewGroup(this.formData)
          this.$router.push('/')
        } catch (error) {
          console.error('Ошибка создания группы:', error)
        }
      }
    },
    cancel() {
      this.clearNewGroupForm()
      this.$router.push('/')
    }
  },
  mounted() {
    // Инициализируем форму данными из store
    this.formData = { ...this.newGroupForm }
    // Загружаем учеников из localStorage при монтировании компонента
    this.loadStudentsFromLocalStorage()
  }
}
</script>

<style scoped>
.create-group-page {
  padding: 2rem;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.group-form-section {
  margin-bottom: 3rem;
}

.students-section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.add-students-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #20C997;
}

.add-students-area:hover {
  border-color: #20C997;
  background-color: #f8f9fa;
}

.add-icon {
  margin-bottom: 1rem;
}

.students-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1rem;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 100px 150px 100px;
  background-color: #f8f9fa;
  padding: 1rem;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 1px solid #dee2e6;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 100px 150px 100px;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.3s ease;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.table-row:last-child {
  border-bottom: none;
}

.col-place {
  font-weight: bold;
  color: #3498db;
}

.col-points {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.lightning-icon {
  color: #f39c12;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  color: #e74c3c;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #fdf2f2;
}

.add-more-btn {
  background-color: #20C997;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.add-more-btn:hover {
  background-color: #1ba085;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .create-group-page {
    margin-left: 0;
    padding: 1rem;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 60px 1fr 80px 120px 80px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
