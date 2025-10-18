<template>
  <div class="news">
    <div class="container">
      <h1>Новости школы</h1>
      
      <section class="news-list">
        <div class="card" v-for="newsItem in news" :key="newsItem.id">
          <div class="news-header">
            <h2>{{ newsItem.title }}</h2>
            <span class="news-date">{{ formatDate(newsItem.date) }}</span>
          </div>
          <div class="news-content">
            <p>{{ newsItem.excerpt }}</p>
            <button class="btn btn-secondary" @click="readMore(newsItem.id)">
              Читать далее
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      news: [
        {
          id: 1,
          title: 'Новый учебный год начался!',
          excerpt: 'Сегодня в нашей школе состоялась торжественная линейка, посвященная началу нового учебного года...',
          content: 'Полный текст новости...',
          date: '2024-01-15'
        },
        {
          id: 2,
          title: 'Олимпиада по математике',
          excerpt: 'Ученики нашей школы показали отличные результаты на городской олимпиаде по математике...',
          content: 'Полный текст новости...',
          date: '2024-01-12'
        },
        {
          id: 3,
          title: 'Спортивные достижения',
          excerpt: 'Команда нашей школы заняла первое место в городских соревнованиях по баскетболу...',
          content: 'Полный текст новости...',
          date: '2024-01-10'
        }
      ]
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU')
    },
    readMore(newsId) {
      // Здесь можно добавить логику для показа полного текста новости
      console.log('Читать новость:', newsId)
    }
  }
}
</script>

<style scoped>
.news {
  padding: 2rem 0;
}

.news h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
}

.news-list {
  max-width: 800px;
  margin: 0 auto;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.news-header h2 {
  color: #3498db;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
}

.news-date {
  color: #7f8c8d;
  font-size: 0.9rem;
  white-space: nowrap;
}

.news-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .news-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .news-header h2 {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
