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
      
      <button class="add-student-btn" @click="openAddStudentModal">
        Добавить ученика
      </button>
    </div>
    
    <div class="group-rating-section">
      <div class="section-header">
        <h2>Рейтинг</h2>
        <button class="sort-btn">Сортировать</button>
      </div>
      
      <div class="rating-table">
        <div class="table-header">
          <div class="col-place">Место</div>
          <div class="col-name">ФИО</div>
          <div class="col-class">Класс</div>
          <div class="col-points">Количество баллов</div>
        </div>
        <div 
          v-for="(student, index) in sortedGroupStudents" 
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
  computed: {
    ...mapState(['currentGroup', 'groupTasks', 'isAddStudentModalOpen', 'isEditGroupModalOpen']),
    ...mapGetters(['sortedGroupStudents'])
  },
  methods: {
    ...mapActions([
      'fetchGroupDetails', 
      'fetchAvailableStudents',
      'updateTaskStatus',
      'addStudentsToGroup',
      'updateGroupDetails',
      'toggleAddStudentModal',
      'toggleEditGroupModal'
    ]),
    toggleTaskStatus(taskId, currentStatus) {
      const newStatus = currentStatus === 'completed' ? 'not_completed' : 'completed'
      this.updateTaskStatus({ taskId, status: newStatus })
    },
    openAddStudentModal() {
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
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.sort-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.sort-btn:hover {
  background-color: #2980b9;
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
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.add-student-btn:hover {
  background-color: #2980b9;
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

@media (max-width: 768px) {
  .group-details-page {
    margin-left: 0;
    padding: 1rem;
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
