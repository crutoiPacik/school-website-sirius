# Руководство по переиспользуемым компонентам

## Обзор

Проект использует систему переиспользуемых компонентов для обеспечения консистентности UI и упрощения разработки.

## Базовые компоненты

### 1. Modal.vue - Модальное окно

Базовый компонент для всех модальных окон в приложении.

**Props:**
- `title` (String, required) - заголовок модального окна
- `size` (String, default: 'medium') - размер окна ('small', 'medium', 'large')
- `closeOnOverlay` (Boolean, default: true) - закрывать ли окно при клике на overlay

**Events:**
- `close` - эмитится при закрытии окна

**Slots:**
- `default` - основное содержимое модального окна
- `footer` - содержимое футера (обычно кнопки действий)

**Пример использования:**
```vue
<Modal title="Заголовок окна" @close="handleClose">
  <p>Содержимое модального окна</p>
  
  <template #footer>
    <Button variant="secondary" @click="handleClose">Отменить</Button>
    <Button variant="primary" @click="handleSave">Сохранить</Button>
  </template>
</Modal>
```

---

### 2. Button.vue - Кнопка

Универсальный компонент кнопки с различными вариантами стилей.

**Props:**
- `variant` (String, default: 'primary') - вариант кнопки ('primary', 'secondary', 'success', 'danger')
- `type` (String, default: 'button') - тип кнопки ('button', 'submit', 'reset')
- `disabled` (Boolean, default: false) - отключена ли кнопка
- `loading` (Boolean, default: false) - показывать ли индикатор загрузки

**Events:**
- `click` - эмитится при клике на кнопку

**Пример использования:**
```vue
<Button variant="primary" @click="handleClick">
  Сохранить
</Button>

<Button variant="secondary" :disabled="isDisabled">
  Отмена
</Button>

<Button variant="success" :loading="isSaving">
  Сохранение...
</Button>
```

---

### 3. FormInput.vue - Текстовое поле

Компонент текстового поля ввода с валидацией и счетчиком символов.

**Props:**
- `id` (String, required) - HTML id элемента
- `label` (String, required) - метка поля
- `modelValue` (String/Number) - значение поля (v-model)
- `type` (String, default: 'text') - тип input
- `placeholder` (String) - плейсхолдер
- `required` (Boolean, default: false) - обязательное ли поле
- `maxLength` (Number) - максимальная длина
- `showCounter` (Boolean, default: false) - показывать ли счетчик символов
- `error` (String) - текст ошибки валидации

**Events:**
- `update:modelValue` - обновление значения
- `blur` - потеря фокуса

**Пример использования:**
```vue
<FormInput
  id="userName"
  label="Имя пользователя"
  v-model="userName"
  placeholder="Введите имя"
  :required="true"
  :maxLength="50"
  :showCounter="true"
  :error="errors.userName"
  @blur="validateUserName"
/>
```

---

### 4. FormTextarea.vue - Многострочное поле

Компонент многострочного текстового поля с валидацией.

**Props:**
- `id` (String, required) - HTML id элемента
- `label` (String, required) - метка поля
- `modelValue` (String) - значение поля (v-model)
- `placeholder` (String) - плейсхолдер
- `required` (Boolean, default: false) - обязательное ли поле
- `maxLength` (Number) - максимальная длина
- `rows` (Number, default: 4) - количество строк
- `showCounter` (Boolean, default: false) - показывать ли счетчик символов
- `error` (String) - текст ошибки валидации

**Events:**
- `update:modelValue` - обновление значения
- `blur` - потеря фокуса

**Пример использования:**
```vue
<FormTextarea
  id="description"
  label="Описание"
  v-model="description"
  placeholder="Введите описание"
  :required="true"
  :maxLength="500"
  :rows="6"
  :showCounter="true"
  :error="errors.description"
/>
```

---

### 5. DatePicker.vue - Выбор даты

Компонент выбора даты с валидацией диапазона.

**Props:**
- `id` (String, required) - HTML id элемента
- `label` (String, required) - метка поля
- `modelValue` (String/null) - значение даты (v-model)
- `required` (Boolean, default: false) - обязательное ли поле
- `minDate` (String) - минимальная допустимая дата (YYYY-MM-DD)
- `maxDate` (String) - максимальная допустимая дата (YYYY-MM-DD)
- `error` (String) - текст ошибки валидации

**Events:**
- `update:modelValue` - обновление значения
- `blur` - потеря фокуса

**Пример использования:**
```vue
<DatePicker
  id="birthDate"
  label="Дата рождения"
  v-model="birthDate"
  :required="true"
  :minDate="minBirthDate"
  :maxDate="maxBirthDate"
  :error="errors.birthDate"
  @blur="validateBirthDate"
/>
```

---

### 6. GenderSelector.vue - Выбор пола

Компонент выбора пола с кнопками.

**Props:**
- `label` (String, required) - метка поля
- `modelValue` (String/null) - значение ('male' или 'female')
- `required` (Boolean, default: false) - обязательное ли поле
- `error` (String) - текст ошибки валидации

**Events:**
- `update:modelValue` - обновление значения
- `change` - изменение значения

**Пример использования:**
```vue
<GenderSelector
  label="Пол"
  v-model="gender"
  :required="true"
  :error="errors.gender"
  @change="validateGender"
/>
```

---

### 7. ClassSelector.vue - Выбор класса

Компонент выбора класса обучения из списка.

**Props:**
- `id` (String, required) - HTML id элемента
- `label` (String, required) - метка поля
- `modelValue` (String/null) - значение класса
- `placeholder` (String, default: 'Класс') - плейсхолдер
- `required` (Boolean, default: false) - обязательное ли поле
- `error` (String) - текст ошибки валидации

**Events:**
- `update:modelValue` - обновление значения
- `change` - изменение значения
- `blur` - потеря фокуса

**Пример использования:**
```vue
<ClassSelector
  id="studentClass"
  label="Класс обучения"
  v-model="studentClass"
  placeholder="Выберите класс"
  :required="true"
  :error="errors.class"
  @change="validateClass"
/>
```

---

## Модальные окна

### AddStudentModal.vue
Модальное окно для добавления учеников в группу.

### EditGroupModal.vue
Модальное окно для редактирования названия и описания группы.

### StudentSelectionModal.vue
Модальное окно с таблицей выбора учеников.

---

## Принципы использования

1. **Консистентность**: Всегда используйте переиспользуемые компоненты вместо создания новых аналогичных элементов.

2. **Валидация**: Все компоненты форм поддерживают отображение ошибок через prop `error`.

3. **v-model**: Все компоненты форм используют `v-model` для двусторонней привязки данных.

4. **Доступность**: Все компоненты имеют правильные HTML-атрибуты (id, label, required) для доступности.

5. **Стилизация**: Стили вынесены в компоненты и переиспользуются, избегайте дублирования CSS.

---

## Примеры полных форм

### Форма добавления ученика
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FormInput
      id="fullName"
      label="ФИО"
      v-model="form.fullName"
      :required="true"
      :maxLength="100"
      :showCounter="true"
      :error="errors.fullName"
    />
    
    <DatePicker
      id="birthDate"
      label="Дата рождения"
      v-model="form.birthDate"
      :required="true"
      :error="errors.birthDate"
    />
    
    <GenderSelector
      label="Пол"
      v-model="form.gender"
      :required="true"
      :error="errors.gender"
    />
    
    <ClassSelector
      id="class"
      label="Класс обучения"
      v-model="form.class"
      :required="true"
      :error="errors.class"
    />
    
    <div class="form-actions">
      <Button variant="secondary" @click="handleCancel">
        Отменить
      </Button>
      <Button type="submit" variant="primary" :disabled="!isValid">
        Сохранить
      </Button>
    </div>
  </form>
</template>
```

### Модальное окно с формой
```vue
<template>
  <Modal title="Редактировать" @close="handleClose">
    <FormInput
      id="name"
      label="Название"
      v-model="formData.name"
      :required="true"
    />
    
    <FormTextarea
      id="description"
      label="Описание"
      v-model="formData.description"
      :required="true"
      :rows="4"
    />
    
    <template #footer>
      <Button variant="secondary" @click="handleClose">
        Отменить
      </Button>
      <Button variant="primary" @click="handleSave">
        Сохранить
      </Button>
    </template>
  </Modal>
</template>
```

