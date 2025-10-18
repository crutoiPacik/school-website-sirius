<template>
  <div class="class-selector">
    <div class="form-input-header">
      <label :for="id" class="form-label">
        {{ label }}<span v-if="required" class="required">*</span>
      </label>
    </div>
    <div class="select-wrapper" :class="{ 'error': error }">
      <select
        :id="id"
        :value="modelValue"
        class="class-select"
        @change="handleChange"
        @blur="handleBlur"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option v-for="classOption in classList" :key="classOption" :value="classOption">
          {{ classOption }}
        </option>
      </select>
      <svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClassSelector',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, null],
      default: null
    },
    placeholder: {
      type: String,
      default: 'Класс'
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['classList'])
  },
  methods: {
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value)
      this.$emit('change', event.target.value)
    },
    handleBlur() {
      this.$emit('blur')
    }
  }
}
</script>

<style scoped>
.class-selector {
  margin-bottom: 1.5rem;
}

.form-input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
}

.required {
  color: #e74c3c;
  margin-left: 0.25rem;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-wrapper.error .class-select {
  border-color: #e74c3c;
}

.class-select {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: inherit;
}

.class-select:focus {
  outline: none;
  border-color: #20C997;
  box-shadow: 0 0 0 3px rgba(32, 201, 151, 0.1);
}

.select-wrapper.error .class-select:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.class-select option[value=""] {
  color: #6c757d;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  color: #6c757d;
  pointer-events: none;
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #e74c3c;
}

@media (max-width: 768px) {
  .class-select {
    padding: 0.65rem 3rem 0.65rem 0.85rem;
    font-size: 0.95rem;
  }
}
</style>

