<template>
  <Modal title="Редактировать группу" @close="closeModal">
    <form @submit.prevent="saveChanges">
      <FormInput
        id="groupName"
        label="Название группы"
        v-model="formData.name"
        placeholder="Введите название группы"
        :required="true"
      />
      
      <FormTextarea
        id="groupDescription"
        label="Описание группы"
        v-model="formData.description"
        placeholder="Введите описание группы"
        :required="true"
        :rows="4"
      />
    </form>
    
    <template #footer>
      <Button variant="secondary" @click="closeModal">Отменить</Button>
      <Button variant="primary" @click="saveChanges">Сохранить</Button>
    </template>
  </Modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from './Modal.vue'
import FormInput from './FormInput.vue'
import FormTextarea from './FormTextarea.vue'
import Button from './Button.vue'

export default {
  name: 'EditGroupModal',
  components: {
    Modal,
    FormInput,
    FormTextarea,
    Button
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState(['currentGroup'])
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    saveChanges() {
      this.$emit('save', {
        name: this.formData.name,
        description: this.formData.description
      })
    }
  },
  mounted() {
    // Заполняем форму данными текущей группы
    if (this.currentGroup) {
      this.formData.name = this.currentGroup.name
      this.formData.description = this.currentGroup.description
    }
  }
}
</script>

<style scoped>
/* Все стили вынесены в переиспользуемые компоненты */
</style>
