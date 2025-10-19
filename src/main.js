import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Sidebar from './components/Sidebar.vue'
import GroupsPage from './views/GroupsPage.vue'
import './style.css'

// Vuex store configuration
const store = createStore({
  state() {
    return {
      // Состояние боковой панели
      isCollapsed: false,
      activeSection: 'groups',
      
      // Данные о группах
      groups: [
        {
          id: 1,
          name: 'Гриффиндор',
          studentsCount: 200,
          score: 1280,
          colorClass: 'gryffindor',
          iconComponent: 'StarIcon',
          description: 'Среди наших учеников царит дух смелости и отваги. Мы приветствуем инициативу и поощряем самых ярких и активных'
        },
        {
          id: 2,
          name: 'Слизерин',
          studentsCount: 180,
          score: 1009,
          colorClass: 'slytherin',
          iconComponent: 'ShieldIcon',
          description: 'Мы ценим амбиции и стремление к достижению целей. Наши ученики отличаются целеустремленностью и лидерскими качествами'
        },
        {
          id: 3,
          name: 'Когтевран',
          studentsCount: 120,
          score: 963,
          colorClass: 'ravenclaw',
          iconComponent: 'DocumentIcon',
          description: 'Мы поощряем интеллектуальное развитие и творческое мышление. Наши ученики стремятся к знаниям и открытиям'
        }
      ],
      
      // Данные для детальной страницы группы
      currentGroup: null,
      groupTasks: [],
      groupStudents: [],
      availableStudents: [],
      isAddStudentModalOpen: false,
      isEditGroupModalOpen: false,
      
      // Данные для создания новой группы
      newGroupForm: {
        name: '',
        description: ''
      },
      selectedStudents: [],
      isStudentSelectionModalOpen: false,
      formValidation: {
        name: '',
        description: '',
        students: ''
      },
      
      // Данные для добавления нового ученика
      newStudentForm: {
        fullName: '',
        birthDate: null,
        gender: null,
        class: null,
        score: 0
      },
      allStudents: [],
      studentFormErrors: {
        fullName: '',
        birthDate: '',
        gender: '',
        class: ''
      },
      isDatePickerOpen: false,
      classList: [
        '1.1', '1.2', '1.3',
        '2.1', '2.2', '2.3',
        '3.1', '3.2', '3.3',
        '4.1', '4.2', '4.3',
        '5.1', '5.2', '5.3',
        '6.1', '6.2', '6.3',
        '7.1', '7.2', '7.3',
        '8.1', '8.2', '8.3',
        '9.1', '9.2', '9.3',
        '10.1', '10.2', '10.3',
        '11.1', '11.2', '11.3'
      ],
      isSaving: false,
      
      // Другие данные
      user: null,
      schoolInfo: null,
      announcements: [],
      events: []
    }
  },
  mutations: {
    TOGGLE_SIDEBAR_COLLAPSE(state) {
      state.isCollapsed = !state.isCollapsed
    },
    SET_ACTIVE_SECTION(state, section) {
      state.activeSection = section
    },
    ADD_GROUP(state, group) {
      state.groups.push(group)
    },
    UPDATE_GROUP_SCORE(state, { groupId, score }) {
      const group = state.groups.find(g => g.id === groupId)
      if (group) {
        group.score = score
        // Сохраняем только пользовательские группы
        const customGroups = state.groups.filter(g => g.id > 3)
        localStorage.setItem('school-groups', JSON.stringify(customGroups))
      }
    },
    LOAD_GROUPS_FROM_STORAGE(state) {
      const storedGroups = localStorage.getItem('school-groups')
      if (storedGroups) {
        try {
          const parsedGroups = JSON.parse(storedGroups)
          // Объединяем статические группы с сохраненными пользовательскими группами
          const staticGroupIds = [1, 2, 3] // ID статических групп
          const customGroups = parsedGroups.filter(g => !staticGroupIds.includes(g.id))
          // Удаляем дубликаты по ID
          const uniqueCustomGroups = customGroups.filter((group, index, self) => 
            index === self.findIndex((g) => g.id === group.id)
          )
          state.groups = [...state.groups.filter(g => staticGroupIds.includes(g.id)), ...uniqueCustomGroups]
        } catch (error) {
          console.error('Ошибка загрузки групп из localStorage:', error)
        }
      }
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_SCHOOL_INFO(state, info) {
      state.schoolInfo = info
    },
    SET_ANNOUNCEMENTS(state, announcements) {
      state.announcements = announcements
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    // Мутации для детальной страницы группы
    SET_CURRENT_GROUP(state, group) {
      state.currentGroup = group
    },
    SET_GROUP_TASKS(state, tasks) {
      state.groupTasks = tasks
    },
    SET_GROUP_STUDENTS(state, students) {
      state.groupStudents = students
    },
    SET_AVAILABLE_STUDENTS(state, students) {
      state.availableStudents = students
    },
    ADD_STUDENTS_TO_GROUP(state, students) {
      state.groupStudents.push(...students)
      // Обновляем количество учеников в группе
      if (state.currentGroup) {
        state.currentGroup.studentsCount += students.length
      }
    },
    UPDATE_TASK_STATUS(state, { taskId, status }) {
      const task = state.groupTasks.find(t => t.id === taskId)
      if (task) {
        task.status = status
      }
    },
    UPDATE_STUDENT_SCORE(state, { studentId, score }) {
      const student = state.groupStudents.find(s => s.id === studentId)
      if (student) {
        student.score = score
      }
    },
    UPDATE_GROUP_DETAILS(state, { name, description }) {
      if (state.currentGroup) {
        state.currentGroup.name = name
        state.currentGroup.description = description
      }
    },
    TOGGLE_ADD_STUDENT_MODAL(state, isOpen) {
      state.isAddStudentModalOpen = isOpen
    },
    TOGGLE_EDIT_GROUP_MODAL(state, isOpen) {
      state.isEditGroupModalOpen = isOpen
    },
    // Мутации для создания новой группы
    SET_NEW_GROUP_FORM(state, formData) {
      state.newGroupForm = { ...state.newGroupForm, ...formData }
    },
    SET_SELECTED_STUDENTS(state, students) {
      state.selectedStudents = students
    },
    ADD_STUDENT_TO_NEW_GROUP(state, student) {
      state.selectedStudents.push(student)
    },
    REMOVE_STUDENT_FROM_NEW_GROUP(state, studentId) {
      state.selectedStudents = state.selectedStudents.filter(s => s.id !== studentId)
    },
    TOGGLE_STUDENT_SELECTION_MODAL(state, isOpen) {
      state.isStudentSelectionModalOpen = isOpen
    },
    SET_FORM_VALIDATION(state, validation) {
      state.formValidation = { ...state.formValidation, ...validation }
    },
    CLEAR_NEW_GROUP_FORM(state) {
      state.newGroupForm = { name: '', description: '' }
      state.selectedStudents = []
      state.formValidation = { name: '', description: '', students: '' }
    },
    // Мутации для добавления нового ученика
    SET_NEW_STUDENT_FORM(state, formData) {
      state.newStudentForm = { ...state.newStudentForm, ...formData }
    },
    UPDATE_STUDENT_FIELD(state, { field, value }) {
      state.newStudentForm[field] = value
    },
    SET_STUDENT_FORM_ERRORS(state, errors) {
      state.studentFormErrors = { ...state.studentFormErrors, ...errors }
    },
    CLEAR_STUDENT_FORM_ERROR(state, field) {
      state.studentFormErrors[field] = ''
    },
    ADD_STUDENT_TO_LIST(state, student) {
      state.allStudents.push(student)
      // Добавляем в доступных учеников для групп
      state.availableStudents.push({
        id: student.id,
        name: student.fullName,
        class: student.class,
        score: student.score
      })
    },
    CLEAR_NEW_STUDENT_FORM(state) {
      state.newStudentForm = {
        fullName: '',
        birthDate: null,
        gender: null,
        class: null,
        score: 0
      }
      state.studentFormErrors = {
        fullName: '',
        birthDate: '',
        gender: '',
        class: ''
      }
    },
    TOGGLE_DATE_PICKER(state, isOpen) {
      state.isDatePickerOpen = isOpen
    },
    SET_CLASS_LIST(state, classList) {
      state.classList = classList
    },
    SET_IS_SAVING(state, isSaving) {
      state.isSaving = isSaving
    },
    LOAD_STUDENTS_FROM_STORAGE(state) {
      const storedStudents = localStorage.getItem('school-students')
      if (storedStudents) {
        try {
          state.allStudents = JSON.parse(storedStudents)
          // Синхронизируем с availableStudents
          state.allStudents.forEach(student => {
            if (!state.availableStudents.find(s => s.id === student.id)) {
              state.availableStudents.push({
                id: student.id,
                name: student.fullName,
                class: student.class,
                score: student.score
              })
            }
          })
        } catch (error) {
          console.error('Ошибка загрузки учеников из localStorage:', error)
        }
      }
    }
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR_COLLAPSE')
    },
    setActiveSection({ commit }, section) {
      commit('SET_ACTIVE_SECTION', section)
    },
    addGroup({ commit }, group) {
      commit('ADD_GROUP', group)
    },
    updateGroupScore({ commit }, payload) {
      commit('UPDATE_GROUP_SCORE', payload)
    },
    loadGroupsFromStorage({ commit }) {
      commit('LOAD_GROUPS_FROM_STORAGE')
    },
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    setSchoolInfo({ commit }, info) {
      commit('SET_SCHOOL_INFO', info)
    },
    setAnnouncements({ commit }, announcements) {
      commit('SET_ANNOUNCEMENTS', announcements)
    },
    setEvents({ commit }, events) {
      commit('SET_EVENTS', events)
    },
    // Действия для детальной страницы группы
    fetchGroupDetails({ commit, state }, groupId) {
      const group = state.groups.find(g => g.id === parseInt(groupId))
      if (group) {
        commit('SET_CURRENT_GROUP', group)
        
        // Загружаем задания группы
        const tasks = [
          {
            id: 1,
            title: 'Организация школьного спектакля',
            dateRange: '12.04 - 26.04',
            level: 'Школьный уровень',
            status: 'not_completed'
          },
          {
            id: 2,
            title: 'Принять участие в викторине',
            dateRange: '10.04 - 17.04',
            level: 'Муниципальный уровень',
            status: 'not_completed'
          },
          {
            id: 3,
            title: 'Поучаствовать во ВКОШП',
            dateRange: '10.04 - 17.04',
            level: 'Всероссийский уровень',
            status: 'completed'
          }
        ]
        commit('SET_GROUP_TASKS', tasks)
        
        // Загружаем учеников группы
        const students = [
          {
            id: 1,
            name: 'Грищенкин Александр Олегович',
            class: '11.2',
            score: 215
          },
          {
            id: 2,
            name: 'Харитонова Ксения Андреевна',
            class: '10.2',
            score: 200
          },
          {
            id: 3,
            name: 'Михальчук Олеся Алексеевна',
            class: '8.1',
            score: 190
          },
          {
            id: 4,
            name: 'Андреев Николай Александрович',
            class: '10.2',
            score: 160
          },
          {
            id: 5,
            name: 'Михальчук Игорь Алексеевич',
            class: '11.2',
            score: 130
          }
        ]
        commit('SET_GROUP_STUDENTS', students)
      }
    },
    fetchAvailableStudents({ commit, state }) {
      // Загружаем захардкоженных учеников
      const defaultStudents = [
        {
          id: 6,
          name: 'Харитонов Андрей Романович',
          class: '10.2',
          score: 0
        },
        {
          id: 7,
          name: 'Бондаренко Алексей Игоревич',
          class: '10.2',
          score: 0
        },
        {
          id: 8,
          name: 'Пашкина Лариса Николаевна',
          class: '10.2',
          score: 0
        },
        {
          id: 9,
          name: 'Алексеева Кристина Аркадьевна',
          class: '10.2',
          score: 0
        },
        {
          id: 10,
          name: 'Елизаров Даниил Александрович',
          class: '10.2',
          score: 0
        }
      ]
      
      // Добавляем учеников из allStudents (которые были добавлены через форму)
      const customStudents = state.allStudents.map(student => ({
        id: student.id,
        name: student.fullName,
        class: student.class,
        score: student.score
      }))
      
      // Объединяем всех учеников и убираем дубликаты
      const allAvailableStudents = [...defaultStudents, ...customStudents]
      const uniqueStudents = allAvailableStudents.filter((student, index, self) => 
        index === self.findIndex((s) => s.id === student.id)
      )
      
      commit('SET_AVAILABLE_STUDENTS', uniqueStudents)
    },
    addStudentsToGroup({ commit }, students) {
      commit('ADD_STUDENTS_TO_GROUP', students)
      // Сохраняем в localStorage
      const storedData = JSON.parse(localStorage.getItem('school-groups-data') || '{}')
      storedData.groupStudents = [...storedData.groupStudents, ...students]
      localStorage.setItem('school-groups-data', JSON.stringify(storedData))
    },
    updateTaskStatus({ commit }, { taskId, status }) {
      commit('UPDATE_TASK_STATUS', { taskId, status })
    },
    updateStudentScore({ commit }, { studentId, score }) {
      commit('UPDATE_STUDENT_SCORE', { studentId, score })
    },
    updateGroupDetails({ commit }, { name, description }) {
      commit('UPDATE_GROUP_DETAILS', { name, description })
    },
    toggleAddStudentModal({ commit }, isOpen) {
      commit('TOGGLE_ADD_STUDENT_MODAL', isOpen)
    },
    toggleEditGroupModal({ commit }, isOpen) {
      commit('TOGGLE_EDIT_GROUP_MODAL', isOpen)
    },
    // Действия для создания новой группы
    setNewGroupForm({ commit }, formData) {
      commit('SET_NEW_GROUP_FORM', formData)
    },
    addStudentsToNewGroup({ commit }, students) {
      students.forEach(student => {
        commit('ADD_STUDENT_TO_NEW_GROUP', student)
      })
    },
    removeStudentFromNewGroup({ commit }, studentId) {
      commit('REMOVE_STUDENT_FROM_NEW_GROUP', studentId)
    },
    toggleStudentSelectionModal({ commit }, isOpen) {
      commit('TOGGLE_STUDENT_SELECTION_MODAL', isOpen)
    },
    validateGroupForm({ commit }, formData) {
      const validation = {
        name: '',
        description: '',
        students: ''
      }
      
      if (!formData.name || formData.name.length < 3) {
        validation.name = 'Название должно содержать минимум 3 символа'
      } else if (formData.name.length > 50) {
        validation.name = 'Название не должно превышать 50 символов'
      }
      
      if (!formData.description || formData.description.length < 10) {
        validation.description = 'Описание должно содержать минимум 10 символов'
      } else if (formData.description.length > 500) {
        validation.description = 'Описание не должно превышать 500 символов'
      }
      
      commit('SET_FORM_VALIDATION', validation)
      return Object.values(validation).every(error => error === '')
    },
    createNewGroup({ commit, state }, groupData) {
      // Генерируем случайный цвет и иконку для новой группы
      const colors = [
        { colorClass: 'gryffindor', iconComponent: 'StarIcon' },
        { colorClass: 'slytherin', iconComponent: 'ShieldIcon' },
        { colorClass: 'ravenclaw', iconComponent: 'DocumentIcon' },
        { colorClass: 'hufflepuff', iconComponent: 'StarIcon' }
      ]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      
      const newGroup = {
        id: Date.now(),
        name: groupData.name,
        description: groupData.description,
        studentsCount: state.selectedStudents.length,
        score: state.selectedStudents.reduce((sum, student) => sum + (student.score || 0), 0),
        colorClass: randomColor.colorClass,
        iconComponent: randomColor.iconComponent
      }
      
      commit('ADD_GROUP', newGroup)
      commit('CLEAR_NEW_GROUP_FORM')
      
      // Сохраняем все группы (кроме статических) в localStorage
      const customGroups = state.groups.filter(g => g.id > 3)
      localStorage.setItem('school-groups', JSON.stringify(customGroups))
      
      return newGroup
    },
    clearNewGroupForm({ commit }) {
      commit('CLEAR_NEW_GROUP_FORM')
    },
    // Действия для добавления нового ученика
    updateStudentField({ commit, dispatch }, { field, value }) {
      commit('UPDATE_STUDENT_FIELD', { field, value })
      dispatch('validateField', field)
    },
    validateField({ commit, state }, field) {
      const errors = {}
      const value = state.newStudentForm[field]
      
      switch (field) {
        case 'fullName':
          if (!value || value.trim().length === 0) {
            errors.fullName = 'Поле обязательно для заполнения'
          } else if (value.length < 3) {
            errors.fullName = 'Минимум 3 символа'
          } else if (value.length > 100) {
            errors.fullName = 'Максимум 100 символов'
          } else if (!/^[а-яА-ЯёЁ\s\-]+$/.test(value)) {
            errors.fullName = 'Только буквы, пробелы и дефисы'
          } else {
            errors.fullName = ''
          }
          break
        
        case 'birthDate':
          if (!value) {
            errors.birthDate = 'Поле обязательно для заполнения'
          } else {
            const birthDate = new Date(value)
            const today = new Date()
            const age = today.getFullYear() - birthDate.getFullYear()
            const monthDiff = today.getMonth() - birthDate.getMonth()
            
            if (birthDate > today) {
              errors.birthDate = 'Дата рождения не может быть в будущем'
            } else if (age < 6 || (age === 6 && monthDiff < 0)) {
              errors.birthDate = 'Возраст должен быть от 6 до 18 лет'
            } else if (age > 18 || (age === 18 && monthDiff > 0)) {
              errors.birthDate = 'Возраст должен быть от 6 до 18 лет'
            } else {
              errors.birthDate = ''
            }
          }
          break
        
        case 'gender':
          if (!value) {
            errors.gender = 'Выберите пол'
          } else {
            errors.gender = ''
          }
          break
        
        case 'class':
          if (!value) {
            errors.class = 'Выберите класс обучения'
          } else {
            errors.class = ''
          }
          break
      }
      
      commit('SET_STUDENT_FORM_ERRORS', errors)
    },
    validateStudentForm({ commit, state }) {
      const errors = {
        fullName: '',
        birthDate: '',
        gender: '',
        class: ''
      }
      
      // Валидация ФИО
      if (!state.newStudentForm.fullName || state.newStudentForm.fullName.trim().length === 0) {
        errors.fullName = 'Поле обязательно для заполнения'
      } else if (state.newStudentForm.fullName.length < 3) {
        errors.fullName = 'Минимум 3 символа'
      } else if (state.newStudentForm.fullName.length > 100) {
        errors.fullName = 'Максимум 100 символов'
      } else if (!/^[а-яА-ЯёЁ\s\-]+$/.test(state.newStudentForm.fullName)) {
        errors.fullName = 'Только буквы, пробелы и дефисы'
      }
      
      // Валидация даты рождения
      if (!state.newStudentForm.birthDate) {
        errors.birthDate = 'Поле обязательно для заполнения'
      } else {
        const birthDate = new Date(state.newStudentForm.birthDate)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        
        if (birthDate > today) {
          errors.birthDate = 'Дата рождения не может быть в будущем'
        } else if (age < 6 || age > 18) {
          errors.birthDate = 'Возраст должен быть от 6 до 18 лет'
        }
      }
      
      // Валидация пола
      if (!state.newStudentForm.gender) {
        errors.gender = 'Выберите пол'
      }
      
      // Валидация класса
      if (!state.newStudentForm.class) {
        errors.class = 'Выберите класс обучения'
      }
      
      commit('SET_STUDENT_FORM_ERRORS', errors)
      return Object.values(errors).every(error => error === '')
    },
    async addNewStudent({ commit, state, dispatch }) {
      commit('SET_IS_SAVING', true)
      
      try {
        // Валидация формы
        const isValid = await dispatch('validateStudentForm')
        
        if (!isValid) {
          commit('SET_IS_SAVING', false)
          return { success: false, message: 'Пожалуйста, исправьте ошибки в форме' }
        }
        
        // Создание нового ученика
        const student = {
          id: `student_${Date.now()}`,
          fullName: state.newStudentForm.fullName.trim(),
          birthDate: state.newStudentForm.birthDate,
          birthDateFormatted: new Date(state.newStudentForm.birthDate).toLocaleDateString('ru-RU'),
          gender: state.newStudentForm.gender,
          class: state.newStudentForm.class,
          score: 0,
          createdAt: new Date().toISOString()
        }
        
        // Добавление в список
        commit('ADD_STUDENT_TO_LIST', student)
        
        // Сохранение в localStorage
        await dispatch('saveStudentToLocalStorage', student)
        
        // Очистка формы
        commit('CLEAR_NEW_STUDENT_FORM')
        commit('SET_IS_SAVING', false)
        
        return { success: true, message: 'Ученик успешно добавлен' }
      } catch (error) {
        console.error('Ошибка при добавлении ученика:', error)
        commit('SET_IS_SAVING', false)
        return { success: false, message: 'Произошла ошибка при добавлении ученика' }
      }
    },
    saveStudentToLocalStorage({ state }, student) {
      try {
        const students = [...state.allStudents]
        localStorage.setItem('school-students', JSON.stringify(students))
        return Promise.resolve()
      } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error)
        return Promise.reject(error)
      }
    },
    loadStudentsFromLocalStorage({ commit }) {
      commit('LOAD_STUDENTS_FROM_STORAGE')
    },
    clearNewStudentForm({ commit }) {
      commit('CLEAR_NEW_STUDENT_FORM')
    },
    generateStudentId() {
      return `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    },
    fetchClassList({ commit, state }) {
      // Класс-лист уже в state, но можно добавить логику загрузки из API
      return state.classList
    }
  },
  getters: {
    isCollapsed: state => state.isCollapsed,
    activeSection: state => state.activeSection,
    groups: state => state.groups,
    sortedGroupsByScore: state => {
      return [...state.groups].sort((a, b) => b.score - a.score)
    },
    getUser: state => state.user,
    getSchoolInfo: state => state.schoolInfo,
    getAnnouncements: state => state.announcements,
    getEvents: state => state.events,
    // Геттеры для детальной страницы группы
    currentGroup: state => state.currentGroup,
    groupTasks: state => state.groupTasks,
    groupStudents: state => state.groupStudents,
    availableStudents: state => state.availableStudents,
    isAddStudentModalOpen: state => state.isAddStudentModalOpen,
    isEditGroupModalOpen: state => state.isEditGroupModalOpen,
    sortedGroupStudents: state => {
      return [...state.groupStudents].sort((a, b) => b.score - a.score)
    },
    groupTasksByStatus: state => {
      return {
        completed: state.groupTasks.filter(task => task.status === 'completed'),
        notCompleted: state.groupTasks.filter(task => task.status === 'not_completed')
      }
    },
    availableStudentsForGroup: state => {
      const currentStudentIds = state.groupStudents.map(s => s.id)
      return state.availableStudents.filter(s => !currentStudentIds.includes(s.id))
    },
    // Геттеры для создания новой группы
    newGroupForm: state => state.newGroupForm,
    selectedStudents: state => state.selectedStudents,
    isStudentSelectionModalOpen: state => state.isStudentSelectionModalOpen,
    formValidation: state => state.formValidation,
    sortedSelectedStudents: state => {
      return [...state.selectedStudents].sort((a, b) => (b.score || 0) - (a.score || 0))
    },
    canCreateGroup: state => {
      return state.newGroupForm.name.length >= 3 && 
             state.newGroupForm.description.length >= 10 && 
             state.selectedStudents.length > 0
    },
    // Геттеры для добавления нового ученика
    newStudentForm: state => state.newStudentForm,
    studentFormErrors: state => state.studentFormErrors,
    isStudentFormValid: state => {
      return state.newStudentForm.fullName.length >= 3 &&
             state.newStudentForm.birthDate !== null &&
             state.newStudentForm.gender !== null &&
             state.newStudentForm.class !== null &&
             Object.values(state.studentFormErrors).every(error => error === '')
    },
    canSaveStudent: state => {
      return state.newStudentForm.fullName.length >= 3 &&
             state.newStudentForm.birthDate !== null &&
             state.newStudentForm.gender !== null &&
             state.newStudentForm.class !== null &&
             !state.isSaving &&
             Object.values(state.studentFormErrors).every(error => error === '')
    },
    classList: state => state.classList,
    fullNameLength: state => state.newStudentForm.fullName.length,
    allStudents: state => state.allStudents,
    isSaving: state => state.isSaving
  }
})

// Vue Router configuration
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: GroupsPage },
    { path: '/groups/new', component: () => import('./views/CreateGroupPage.vue') },
    { path: '/groups/:id', component: () => import('./views/GroupDetailsPage.vue') },
    { path: '/students/new', component: () => import('./views/AddStudentPage.vue') },
    { path: '/about', component: () => import('./components/About.vue') },
    { path: '/news', component: () => import('./components/News.vue') },
    { path: '/events', component: () => import('./components/Events.vue') },
    { path: '/contact', component: () => import('./components/Contact.vue') }
  ]
})

const app = createApp(App)
app.use(store)
app.use(router)
app.component('Sidebar', Sidebar)
app.mount('#app')
