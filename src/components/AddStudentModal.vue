<template>
  <Modal title="Добавить ученика" @close="closeModal">
    <div v-if="availableStudentsForGroup.length === 0" class="empty-state">
      <p>Нет доступных учеников для добавления</p>
      <p class="empty-hint">Добавьте новых учеников через меню "Добавить ученика" или все ученики уже в группе</p>
    </div>
    <div v-else class="students-list">
      <div 
        v-for="student in availableStudentsForGroup" 
        :key="student.id" 
        class="student-item"
        :class="{ selected: selectedStudents.includes(student.id) }"
        @click="toggleStudent(student.id)"
      >
        <div class="student-checkbox">
          <svg 
            v-if="selectedStudents.includes(student.id)" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <div class="student-info">
          <div class="student-name">{{ student.name }}</div>
          <div class="student-class">{{ student.class }}</div>
        </div>
      </div>
    </div>
    
    <template #footer>
      <Button variant="secondary" @click="closeModal">Отменить</Button>
      <Button 
        variant="success" 
        @click="addSelectedStudents"
        :disabled="selectedStudents.length === 0"
      >
        Добавить
      </Button>
    </template>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from './Modal.vue'
import Button from './Button.vue'

export default {
  name: 'AddStudentModal',
  components: {
    Modal,
    Button
  },
  data() {
    return {
      selectedStudents: []
    }
  },
  computed: {
    ...mapGetters(['availableStudentsForGroup'])
  },
  methods: {
    ...mapActions(['addStudentsToGroup']),
    closeModal() {
      this.$emit('close')
    },
    toggleStudent(studentId) {
      const index = this.selectedStudents.indexOf(studentId)
      if (index > -1) {
        this.selectedStudents.splice(index, 1)
      } else {
        this.selectedStudents.push(studentId)
      }
    },
    addSelectedStudents() {
      if (this.selectedStudents.length > 0) {
        const studentsToAdd = this.availableStudentsForGroup.filter(student => 
          this.selectedStudents.includes(student.id)
        )
        this.$emit('add-students', studentsToAdd)
        this.selectedStudents = []
      }
    }
  },
  mounted() {
    // Предварительно выбираем первого ученика (как в дизайне)
    if (this.availableStudentsForGroup.length > 0) {
      this.selectedStudents = [this.availableStudentsForGroup[0].id]
    }
  }
}
</script>

<style scoped>
.students-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.student-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.student-item:hover {
  background-color: #f8f9fa;
}

.student-item.selected {
  background-color: #e3f2fd;
  border-color: #2196f3;
}

.student-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  transition: all 0.3s ease;
}

.student-item.selected .student-checkbox {
  background-color: #2196f3;
  border-color: #2196f3;
  color: white;
}

.student-info {
  flex: 1;
}

.student-name {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.student-class {
  font-size: 0.9rem;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
}

.empty-state p {
  margin-bottom: 0.5rem;
}

.empty-hint {
  font-size: 0.9rem;
  color: #999;
}
</style>
