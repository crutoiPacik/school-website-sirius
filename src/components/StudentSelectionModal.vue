<template>
  <Modal title="Добавить ученика" size="large" @close="closeModal">
    <div v-if="availableStudents.length === 0" class="empty-state">
      <p>Нет доступных учеников для добавления</p>
      <p class="empty-hint">Добавьте новых учеников через меню "Добавить ученика"</p>
    </div>
    <div v-else class="students-table">
      <div class="table-header">
        <div class="col-checkbox"></div>
        <div class="col-name">ФИО</div>
        <div class="col-class">Класс</div>
      </div>
      <div 
        v-for="student in availableStudents" 
        :key="student.id" 
        class="table-row"
        :class="{ selected: selectedStudents.includes(student.id) }"
        @click="toggleStudent(student.id)"
      >
        <div class="col-checkbox">
          <div class="checkbox" :class="{ checked: selectedStudents.includes(student.id) }">
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
        </div>
        <div class="col-name">{{ student.name }}</div>
        <div class="col-class">{{ student.class }}</div>
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
  name: 'StudentSelectionModal',
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
    ...mapGetters(['availableStudents'])
  },
  methods: {
    ...mapActions(['addStudentsToNewGroup']),
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
        const studentsToAdd = this.availableStudents.filter(student => 
          this.selectedStudents.includes(student.id)
        )
        this.$emit('add-students', studentsToAdd)
        this.selectedStudents = []
      }
    }
  },
  mounted() {
    // Предварительно выбираем первого ученика (как в дизайне)
    if (this.availableStudents.length > 0) {
      this.selectedStudents = [this.availableStudents[0].id]
    }
  }
}
</script>

<style scoped>

.students-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 50px 1fr 100px;
  background-color: #f8f9fa;
  padding: 1rem;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 1px solid #dee2e6;
}

.table-row {
  display: grid;
  grid-template-columns: 50px 1fr 100px;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.table-row.selected {
  background-color: #e3f2fd;
}

.table-row:last-child {
  border-bottom: none;
}

.col-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox {
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

.checkbox.checked {
  background-color: #2196f3;
  border-color: #2196f3;
  color: white;
}

.col-name {
  font-weight: 500;
  color: #2c3e50;
}

.col-class {
  color: #666;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 40px 1fr 80px;
  }
}
</style>
