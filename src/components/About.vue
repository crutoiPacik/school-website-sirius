<template>
  <div class="about">
    <div class="container">
      <h1>О нашей школе</h1>
      
      <section class="school-info">
        <div class="card">
          <h2>История школы</h2>
          <p>Наша школа была основана в 1950 году и с тех пор является центром качественного образования в нашем городе.</p>
        </div>
        
        <div class="card">
          <h2>Миссия</h2>
          <p>Мы стремимся создать образовательную среду, которая вдохновляет учеников на достижение академических успехов и личностного роста.</p>
        </div>
        
        <div class="card">
          <h2>Ценности</h2>
          <ul>
            <li>Качество образования</li>
            <li>Уважение к личности</li>
            <li>Инновации в обучении</li>
            <li>Социальная ответственность</li>
          </ul>
        </div>
      </section>

      <section class="staff">
        <h2>Наши преподаватели</h2>
        <div class="grid grid-3">
          <div class="card" v-for="teacher in teachers" :key="teacher.id">
            <h3>{{ teacher.name }}</h3>
            <p><strong>{{ teacher.subject }}</strong></p>
            <p>{{ teacher.experience }} лет опыта</p>
            <p>{{ teacher.education }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      teachers: [
        {
          id: 1,
          name: 'Анна Петровна Иванова',
          subject: 'Математика',
          experience: 15,
          education: 'МГУ, факультет математики'
        },
        {
          id: 2,
          name: 'Михаил Сергеевич Петров',
          subject: 'Физика',
          experience: 12,
          education: 'МФТИ, физический факультет'
        },
        {
          id: 3,
          name: 'Елена Владимировна Сидорова',
          subject: 'Русский язык и литература',
          experience: 20,
          education: 'МГПУ, филологический факультет'
        }
      ]
    }
  }
}
</script>

<style scoped>
.about {
  padding: 2rem 0;
}

.about h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
}

.school-info {
  margin-bottom: 3rem;
}

.school-info .card {
  margin-bottom: 1.5rem;
}

.school-info h2 {
  color: #3498db;
  margin-bottom: 1rem;
}

.school-info ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}

.school-info li {
  margin-bottom: 0.5rem;
}

.staff h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.staff .card h3 {
  color: #3498db;
  margin-bottom: 0.5rem;
}
</style>
