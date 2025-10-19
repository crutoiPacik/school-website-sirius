<template>
  <div class="group-details-page">
    <div class="page-header">
      <h1>{{ currentGroup?.name }}</h1>
      <button class="edit-btn" @click="openEditGroupModal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      </button>
    </div>
    
    <div class="group-description">
      <p>{{ currentGroup?.description }}</p>
    </div>
    
    <div class="group-tasks-section">
      <div class="section-header">
        <h2>Задания группы</h2>
        <button class="edit-btn" @click="openEditGroupModal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
      </div>
      
      <div class="tasks-container">
        <div 
          v-for="task in groupTasks" 
          :key="task.id" 
          class="task-card"
        >
          <div class="task-content">
            <h3>{{ task.title }}</h3>
            <div class="task-details">
              <span class="task-date">{{ task.dateRange }}</span>
              <div class="task-level">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>{{ task.level }}</span>
              </div>
            </div>
          </div>
          <button 
            class="status-btn" 
            :class="{ completed: task.status === 'completed' }"
            @click="toggleTaskStatus(task.id, task.status)"
          >
            {{ task.status === 'completed' ? 'Выполнено' : 'Не выполнено' }}
          </button>
        </div>
      </div>
    </div>
    
    <div class="group-rating-section">
      <div class="section-header">
        <h2>Рейтинг</h2>
        
        <div class="header-controls">
          <select v-model="sortBy" class="sort-select">
            <option value="" disabled>Сортировать по</option>
            <option value="score">По баллам</option>
            <option value="name">По имени</option>
            <option value="birthDate">По дате рождения</option>
          </select>
          
          <div class="search-box">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Поиск ученика..."
              class="search-input"
            >
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''" 
              class="clear-search-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          
          <button class="add-student-btn" @click="openAddStudentModal">
            Добавить ученика
          </button>
        </div>
      </div>
      
      <div class="rating-table">
        <div class="table-header">
          <div class="col-place">Место</div>
          <div class="col-name">ФИО</div>
          <div class="col-class">Класс</div>
          <div class="col-points">Количество баллов</div>
        </div>
        <div 
          v-for="(student, index) in filteredStudents" 
          :key="student.id" 
          class="table-row"
          :class="{ 'top-three': index < 3 }"
        >
          <div class="col-place">{{ index + 1 }}</div>
          <div class="col-name">{{ student.name }}</div>
          <div class="col-class">{{ student.class }}</div>
          <div class="col-points">
            {{ student.score }}
            <svg class="arrow-up" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
          </div>
        </div>
        <div v-if="filteredStudents.length === 0" class="empty-state">
          <p>Ученики не найдены</p>
          <p class="empty-hint">Попробуйте изменить условия поиска</p>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно добавления ученика -->
    <AddStudentModal 
      v-if="isAddStudentModalOpen"
      @close="closeAddStudentModal"
      @add-students="addStudents"
    />
    
    <!-- Модальное окно редактирования группы -->
    <EditGroupModal 
      v-if="isEditGroupModalOpen"
      @close="closeEditGroupModal"
      @save="saveGroupDetails"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import AddStudentModal from '../components/AddStudentModal.vue'
import EditGroupModal from '../components/EditGroupModal.vue'

export default {
  name: 'GroupDetailsPage',
  components: {
    AddStudentModal,
    EditGroupModal
  },
  data() {
    return {
      searchQuery: '',
      sortBy: '' // По умолчанию placeholder "Сортировать по"
    }
  },
  computed: {
    ...mapState(['currentGroup', 'groupTasks', 'isAddStudentModalOpen', 'isEditGroupModalOpen']),
    ...mapGetters(['sortedGroupStudents']),
    sortedStudents() {
      // Сначала применяем сортировку
      const students = [...this.sortedGroupStudents]
      
      switch (this.sortBy) {
        case 'name':
          // Сортировка по имени (алфавитный порядок)
          return students.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
        
        case 'birthDate':
          // Сортировка по дате рождения (если есть данные)
          return students.sort((a, b) => {
            // Если нет данных о дате рождения, используем сортировку по умолчанию
            if (!a.birthDate || !b.birthDate) return 0
            return new Date(a.birthDate) - new Date(b.birthDate)
          })
        
        case 'score':
          // Сортировка по баллам (по убыванию)
          return students.sort((a, b) => b.score - a.score)
        
        default:
          // Если не выбрано - показываем как есть (по баллам из sortedGroupStudents)
          return students
      }
    },
    filteredStudents() {
      // Применяем поисковый фильтр к отсортированным данным
      if (!this.searchQuery.trim()) {
        return this.sortedStudents
      }
      const query = this.searchQuery.toLowerCase().trim()
      return this.sortedStudents.filter(student => 
        student.name.toLowerCase().includes(query) ||
        student.class.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    ...mapActions([
      'fetchGroupDetails', 
      'fetchAvailableStudents',
      'updateTaskStatus',
      'addStudentsToGroup',
      'updateGroupDetails',
      'toggleAddStudentModal',
      'toggleEditGroupModal',
      'loadStudentsFromLocalStorage'
    ]),
    toggleTaskStatus(taskId, currentStatus) {
      const newStatus = currentStatus === 'completed' ? 'not_completed' : 'completed'
      this.updateTaskStatus({ taskId, status: newStatus })
    },
    openAddStudentModal() {
      this.loadStudentsFromLocalStorage() // Загружаем учеников перед показом модального окна
      this.fetchAvailableStudents()
      this.toggleAddStudentModal(true)
    },
    closeAddStudentModal() {
      this.toggleAddStudentModal(false)
    },
    openEditGroupModal() {
      this.toggleEditGroupModal(true)
    },
    closeEditGroupModal() {
      this.toggleEditGroupModal(false)
    },
    addStudents(students) {
      this.addStudentsToGroup(students)
      this.closeAddStudentModal()
    },
    saveGroupDetails({ name, description }) {
      this.updateGroupDetails({ name, description })
      this.closeEditGroupModal()
    }
  },
  mounted() {
    const groupId = this.$route.params.id
    this.fetchGroupDetails(groupId)
    // Загружаем учеников из localStorage при монтировании компонента
    this.loadStudentsFromLocalStorage()
  }
}
</script>

<style scoped>
.group-details-page {
  padding: 2rem;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  color: #666;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background-color: #f0f0f0;
  color: #333;
}

.group-description {
  margin-bottom: 2rem;
}

.group-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin: 0;
}

.group-tasks-section,
.group-rating-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: flex-end;
}

.sort-select {
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #2c3e50;
  background-color: white;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 12px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  min-width: 200px;
}

.sort-select:hover {
  border-color: #3498db;
}

.sort-select:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.sort-select option[disabled] {
  color: #999;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  min-width: 300px;
  transition: border-color 0.3s ease;
}

.search-box:focus-within {
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.search-icon {
  color: #666;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #2c3e50;
  background: transparent;
}

.search-input::placeholder {
  color: #999;
}

.clear-search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-left: 0.25rem;
}

.clear-search-btn:hover {
  background-color: #f0f0f0;
  color: #333;
}


.tasks-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.task-card {
  background-color: #E0F7FA;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task-content h3 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.task-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.task-date {
  color: #666;
  font-size: 0.9rem;
}

.task-level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.status-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background-color: #E0F7FA;
  color: #006064;
}

.status-btn.completed {
  background-color: #20C997;
  color: white;
}

.status-btn:hover {
  opacity: 0.8;
}

.add-student-btn {
  background-color: #20C997;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.add-student-btn:hover {
  background-color: #1ba085;
}

.rating-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 100px 150px;
  background-color: #f8f9fa;
  padding: 1rem;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 1px solid #dee2e6;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 100px 150px;
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

.table-row.top-three {
  background-color: #fff3cd;
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

.arrow-up {
  color: #27ae60;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  grid-column: 1 / -1;
}

.empty-state p {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.empty-hint {
  font-size: 0.9rem;
  color: #999;
}

@media (max-width: 768px) {
  .group-details-page {
    margin-left: 0;
    padding: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .section-header h2 {
    width: 100%;
  }
  
  .header-controls {
    flex-direction: column;
    width: 100%;
    justify-content: stretch;
  }
  
  .sort-select {
    width: 100%;
    min-width: auto;
  }
  
  .search-box {
    width: 100%;
    min-width: auto;
  }
  
  .add-student-btn {
    width: 100%;
  }
  
  .tasks-container {
    flex-direction: column;
  }
  
  .task-card {
    min-width: auto;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 60px 1fr 80px 120px;
  }
}
</style>
