<template>
  <div id="app">
    <Sidebar />
    <div class="main-layout" :class="{ collapsed: isCollapsed }">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['isCollapsed'])
  },
  mounted() {
    // Инициализация данных при загрузке приложения
    this.$store.dispatch('setSchoolInfo', {
      name: 'ХОГВАРДС',
      address: 'Адрес школы',
      phone: '+7 (xxx) xxx-xx-xx',
      email: 'school@example.com'
    })
    
    // Загружаем группы из localStorage
    this.$store.dispatch('loadGroupsFromStorage')
    
    // Загружаем учеников из localStorage
    this.$store.dispatch('loadStudentsFromLocalStorage')
  }
}
</script>

<style scoped>
#app {
  display: flex;
  min-height: 100vh;
}

.main-layout {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.main-layout.collapsed {
  margin-left: 60px;
}

@media (max-width: 768px) {
  .main-layout {
    margin-left: 0;
  }
  
  .main-layout.collapsed {
    margin-left: 0;
  }
}
</style>
