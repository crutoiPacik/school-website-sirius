<template>
  <div class="home">
    <div class="container">
      <section class="hero">
        <h1>Добро пожаловать в нашу школу!</h1>
        <p>Мы предоставляем качественное образование и создаем условия для всестороннего развития наших учеников.</p>
        <button class="btn">Узнать больше</button>
      </section>

      <section class="features">
        <h2>Наши преимущества</h2>
        <div class="grid grid-3">
          <div class="card">
            <h3>Качественное образование</h3>
            <p>Современные методики обучения и опытные преподаватели</p>
          </div>
          <div class="card">
            <h3>Развитие талантов</h3>
            <p>Множество кружков и секций для развития способностей</p>
          </div>
          <div class="card">
            <h3>Современное оборудование</h3>
            <p>Новые технологии и оборудование для эффективного обучения</p>
          </div>
        </div>
      </section>

      <section class="announcements">
        <h2>Последние объявления</h2>
        <div class="grid grid-2">
          <div class="card" v-for="announcement in announcements" :key="announcement.id">
            <h3>{{ announcement.title }}</h3>
            <p>{{ announcement.content }}</p>
            <small>{{ announcement.date }}</small>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['getAnnouncements']),
    announcements() {
      return this.getAnnouncements.slice(0, 4) // Показываем только последние 4
    }
  },
  mounted() {
    // Загружаем тестовые данные
    this.$store.dispatch('setAnnouncements', [
      {
        id: 1,
        title: 'Родительское собрание',
        content: 'Приглашаем родителей на собрание 15 января в 18:00',
        date: '2024-01-10'
      },
      {
        id: 2,
        title: 'Зимние каникулы',
        content: 'Зимние каникулы с 25 декабря по 8 января',
        date: '2024-01-05'
      }
    ])
  }
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  margin-bottom: 3rem;
}

.features h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.announcements h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.card h3 {
  color: #3498db;
  margin-bottom: 0.5rem;
}

.card small {
  color: #7f8c8d;
  font-style: italic;
}
</style>
