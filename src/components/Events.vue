<template>
  <div class="events">
    <div class="container">
      <h1>События и мероприятия</h1>
      
      <section class="events-list">
        <div class="card" v-for="event in events" :key="event.id">
          <div class="event-header">
            <h2>{{ event.title }}</h2>
            <span class="event-date">{{ formatDate(event.date) }}</span>
          </div>
          <div class="event-content">
            <p><strong>Время:</strong> {{ event.time }}</p>
            <p><strong>Место:</strong> {{ event.location }}</p>
            <p>{{ event.description }}</p>
            <div class="event-actions">
              <button class="btn" @click="registerForEvent(event.id)">
                Записаться
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Events',
  computed: {
    ...mapGetters(['getEvents'])
  },
  data() {
    return {
      events: [
        {
          id: 1,
          title: 'Родительское собрание',
          date: '2024-01-20',
          time: '18:00',
          location: 'Актовый зал',
          description: 'Обсуждение планов на второе полугодие и успеваемости учеников.'
        },
        {
          id: 2,
          title: 'День открытых дверей',
          date: '2024-01-25',
          time: '10:00 - 15:00',
          location: 'Вся школа',
          description: 'Приглашаем будущих учеников и их родителей познакомиться со школой.'
        },
        {
          id: 3,
          title: 'Научная конференция',
          date: '2024-02-01',
          time: '14:00',
          location: 'Конференц-зал',
          description: 'Презентация исследовательских проектов учеников старших классов.'
        }
      ]
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    registerForEvent(eventId) {
      // Здесь можно добавить логику для записи на мероприятие
      console.log('Записаться на событие:', eventId)
      alert('Спасибо за интерес! Мы свяжемся с вами.')
    }
  },
  mounted() {
    // Сохраняем события в store
    this.$store.dispatch('setEvents', this.events)
  }
}
</script>

<style scoped>
.events {
  padding: 2rem 0;
}

.events h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
}

.events-list {
  max-width: 800px;
  margin: 0 auto;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.event-header h2 {
  color: #3498db;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
}

.event-date {
  color: #e74c3c;
  font-weight: bold;
  font-size: 0.9rem;
  white-space: nowrap;
}

.event-content p {
  margin-bottom: 0.5rem;
}

.event-actions {
  margin-top: 1rem;
  text-align: right;
}

@media (max-width: 768px) {
  .event-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .event-header h2 {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  .event-actions {
    text-align: center;
  }
}
</style>
