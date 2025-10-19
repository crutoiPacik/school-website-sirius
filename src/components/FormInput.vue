<template>
  <div class="form-input">
    <div class="form-input-header">
      <label :for="id" class="form-label">
        {{ label }}<span v-if="required" class="required">*</span>
      </label>
      <span v-if="showCounter" class="char-counter">{{ currentLength }}</span>
    </div>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :class="['form-input-field', { 'error': error }]"
      @input="handleInput"
      @blur="handleBlur"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
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
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: null
    },
    showCounter: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentLength() {
      return String(this.modelValue).length
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
.form-input {
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

.char-counter {
  font-size: 0.85rem;
  color: #6c757d;
}

.form-input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #fff;
}

.form-input-field:focus {
  outline: none;
  border-color: #20C997;
  box-shadow: 0 0 0 3px rgba(32, 201, 151, 0.1);
}

.form-input-field.error {
  border-color: #e74c3c;
}

.form-input-field.error:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #e74c3c;
}

@media (max-width: 768px) {
  .form-input-field {
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
  }
}
</style>


