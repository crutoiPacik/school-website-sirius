<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Добавить ученика</h3>
        <button class="close-btn" @click="closeModal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="students-table">
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
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">Отменить</button>
        <button 
          class="btn btn-primary" 
          @click="addSelectedStudents"
          :disabled="selectedStudents.length === 0"
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'StudentSelectionModal',
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  color: #666;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: #f0f0f0;
  color: #333;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

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

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #dee2e6;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #27ae60;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #229954;
}

.btn-secondary {
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 40px 1fr 80px;
  }
}
</style>
