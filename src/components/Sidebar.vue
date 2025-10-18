<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <h1 class="logo">ХОГВАРДС</h1>
      <button class="collapse-btn" @click="toggleCollapse">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-item" :class="{ active: activeSection === 'groups' }" @click="toggleGroups">
          <div class="nav-item-content">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="nav-text">Группы</span>
          </div>
          <svg class="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" :class="{ rotated: groupsExpanded }">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
        
        <div v-if="groupsExpanded" class="nav-submenu">
          <router-link to="/groups/new" class="nav-subitem">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span>Новая группа</span>
          </router-link>
          <router-link to="/" class="nav-subitem active">
            <span>Все группы</span>
          </router-link>
        </div>
      </div>
      
      <router-link to="/students/new" class="nav-item">
        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span class="nav-text">Добавить ученика</span>
      </router-link>
      
      <div class="nav-divider"></div>
      
      <div class="nav-item">
        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
        <span class="nav-text">Уведомления</span>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  data() {
    return {
      groupsExpanded: true
    }
  },
  computed: {
    ...mapState(['isCollapsed', 'activeSection'])
  },
  methods: {
    toggleCollapse() {
      this.$store.commit('TOGGLE_SIDEBAR_COLLAPSE')
    },
    toggleGroups() {
      this.groupsExpanded = !this.groupsExpanded
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  min-height: 100vh;
  background-color: #E0F7FA;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #006064;
  margin: 0;
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .logo {
  opacity: 0;
}

.collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  color: #006064;
  transition: background-color 0.3s ease;
}

.collapse-btn:hover {
  background-color: rgba(0, 96, 100, 0.1);
}

.sidebar-nav {
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #006064;
}

.nav-item:hover {
  background-color: rgba(0, 96, 100, 0.1);
}

.nav-item.active {
  background-color: rgba(0, 96, 100, 0.15);
}

.nav-item-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-text {
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .nav-text {
  opacity: 0;
}

.nav-arrow {
  transition: transform 0.3s ease;
}

.nav-arrow.rotated {
  transform: rotate(180deg);
}

.nav-submenu {
  margin-left: 2rem;
  margin-top: 0.5rem;
}

.nav-subitem {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #006064;
  font-size: 0.9rem;
  text-decoration: none;
}

.nav-subitem:hover {
  background-color: rgba(0, 96, 100, 0.1);
}

.nav-subitem.active {
  background-color: rgba(0, 96, 100, 0.2);
  font-weight: 500;
}

.nav-item {
  text-decoration: none;
}

.nav-divider {
  height: 1px;
  background-color: rgba(0, 96, 100, 0.2);
  margin: 1rem 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    transform: translateX(-100%);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
