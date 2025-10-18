<template>
  <div class="groups-page">
    <div class="page-header">
      <h1>Группы</h1>
    </div>
    
    <div class="groups-section">
      <div class="groups-grid">
        <div 
          v-for="group in groups" 
          :key="group.id" 
          class="group-card" 
          :class="group.colorClass"
          @click="goToGroupDetails(group.id)"
        >
          <div class="group-icon">
            <component :is="group.iconComponent" />
          </div>
          <div class="group-info">
            <h3>{{ group.name }}</h3>
            <p>{{ group.studentsCount }} учеников</p>
          </div>
        </div>
        
        <div class="add-group-card" @click="goToCreateGroup">
          <div class="add-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
          <p>Добавить группу</p>
        </div>
      </div>
    </div>
    
    <div class="rating-section">
      <h2>Рейтинг групп</h2>
      <div class="rating-table">
        <div class="table-header">
          <div class="col-place">Место</div>
          <div class="col-name">Название группы</div>
          <div class="col-points">Количество баллов</div>
        </div>
        <div 
          v-for="(group, index) in sortedGroups" 
          :key="group.id" 
          class="table-row"
        >
          <div class="col-place">{{ index + 1 }}</div>
          <div class="col-name">{{ group.name }}</div>
          <div class="col-points">
            {{ group.score }}
            <svg class="arrow-up" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно для добавления группы -->
    <div v-if="showAddGroupModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Добавить новую группу</h3>
        <form @submit.prevent="addGroup">
          <div class="form-group">
            <label for="groupName">Название группы:</label>
            <input 
              type="text" 
              id="groupName" 
              v-model="newGroup.name" 
              required
              placeholder="Введите название группы"
            >
          </div>
          <div class="form-group">
            <label for="studentsCount">Количество учеников:</label>
            <input 
              type="number" 
              id="studentsCount" 
              v-model="newGroup.studentsCount" 
              required
              min="1"
              placeholder="Введите количество учеников"
            >
          </div>
          <div class="form-group">
            <label for="groupColor">Цвет группы:</label>
            <select id="groupColor" v-model="newGroup.color">
              <option value="orange">Оранжевый</option>
              <option value="teal">Бирюзовый</option>
              <option value="purple">Фиолетовый</option>
              <option value="green">Зеленый</option>
              <option value="blue">Синий</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Отмена</button>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

// SVG иконки как компоненты
const StarIcon = {
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `
}

const ShieldIcon = {
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
    </svg>
  `
}

const DocumentIcon = {
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
  `
}

export default {
  name: 'GroupsPage',
  components: {
    StarIcon,
    ShieldIcon,
    DocumentIcon
  },
  data() {
    return {
      showAddGroupModal: false,
      newGroup: {
        name: '',
        studentsCount: 0,
        color: 'orange'
      }
    }
  },
  computed: {
    ...mapState(['groups']),
    ...mapGetters(['sortedGroupsByScore']),
    sortedGroups() {
      return this.sortedGroupsByScore
    }
  },
  methods: {
    ...mapActions(['addGroup', 'loadGroupsFromStorage']),
    goToGroupDetails(groupId) {
      this.$router.push(`/groups/${groupId}`)
    },
    goToCreateGroup() {
      this.$router.push('/groups/new')
    },
    closeModal() {
      this.showAddGroupModal = false
      this.newGroup = {
        name: '',
        studentsCount: 0,
        color: 'orange'
      }
    },
    async addGroup() {
      const groupData = {
        ...this.newGroup,
        id: Date.now(),
        score: 0,
        iconComponent: this.getIconComponent(this.newGroup.color)
      }
      
      await this.addGroup(groupData)
      this.closeModal()
    },
    getIconComponent(color) {
      const iconMap = {
        orange: 'StarIcon',
        teal: 'ShieldIcon',
        purple: 'DocumentIcon',
        green: 'StarIcon',
        blue: 'ShieldIcon'
      }
      return iconMap[color] || 'StarIcon'
    }
  },
  mounted() {
    this.loadGroupsFromStorage()
  }
}
</script>

<style scoped>
.groups-page {
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

.groups-section {
  margin-bottom: 3rem;
}

.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
}

.group-card {
  padding: 1.5rem;
  border-radius: 12px;
  color: white;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.group-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.group-card.gryffindor {
  background: linear-gradient(135deg, #FF8C42, #FF6B35);
}

.group-card.slytherin {
  background: linear-gradient(135deg, #20C997, #17A2B8);
}

.group-card.ravenclaw {
  background: linear-gradient(135deg, #6C757D, #495057);
}

.group-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0.8;
}

.group-info h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.group-info p {
  font-size: 0.9rem;
  opacity: 0.9;
}

.add-group-card {
  padding: 1.5rem;
  border: 2px dashed #ccc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 120px;
  color: #666;
}

.add-group-card:hover {
  border-color: #3498db;
  color: #3498db;
  background-color: #f8f9fa;
}

.add-icon {
  margin-bottom: 0.5rem;
}

.rating-section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.rating-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 600px;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 150px;
  background-color: #f8f9fa;
  padding: 1rem;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 1px solid #dee2e6;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 150px;
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

.arrow-up {
  color: #27ae60;
}

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
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.modal-content h3 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

@media (max-width: 768px) {
  .groups-page {
    margin-left: 0;
    padding: 1rem;
  }
  
  .groups-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 60px 1fr 120px;
  }
}
</style>
