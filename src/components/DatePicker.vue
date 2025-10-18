<template>
  <div class="date-picker">
    <div class="form-input-header">
      <label :for="id" class="form-label">
        {{ label }}<span v-if="required" class="required">*</span>
      </label>
    </div>
    <div class="date-input-wrapper" :class="{ 'error': error }">
      <input
        :id="id"
        type="date"
        :value="modelValue"
        :min="minDate"
        :max="maxDate"
        class="date-input"
        @input="handleInput"
        @blur="handleBlur"
      />
      <svg class="calendar-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
      </svg>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
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
    required: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: String,
      default: null
    },
    maxDate: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    handleBlur() {
      this.$emit('blur')
    }
  }
}
</script>

<style scoped>
.date-picker {
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

.date-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.date-input-wrapper.error .date-input {
  border-color: #e74c3c;
}

.date-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #fff;
  font-family: inherit;
}

.date-input:focus {
  outline: none;
  border-color: #20C997;
  box-shadow: 0 0 0 3px rgba(32, 201, 151, 0.1);
}

.date-input.error:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.calendar-icon {
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

/* Стилизация для браузеров */
.date-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
}

.date-input::-webkit-inner-spin-button,
.date-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@media (max-width: 768px) {
  .date-input {
    padding: 0.65rem 3rem 0.65rem 0.85rem;
    font-size: 0.95rem;
  }
}
</style>

