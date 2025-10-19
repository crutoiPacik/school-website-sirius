<template>
  <div class="gender-selector">
    <div class="form-input-header">
      <label class="form-label">
        {{ label }}<span v-if="required" class="required">*</span>
      </label>
    </div>
    <div class="gender-options">
      <button
        type="button"
        class="gender-option"
        :class="{ active: modelValue === 'male' }"
        @click="selectGender('male')"
      >
        Мужской
      </button>
      <button
        type="button"
        class="gender-option"
        :class="{ active: modelValue === 'female' }"
        @click="selectGender('female')"
      >
        Женский
      </button>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'GenderSelector',
  props: {
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
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectGender(gender) {
      this.$emit('update:modelValue', gender)
      this.$emit('change', gender)
    }
  }
}
</script>

<style scoped>
.gender-selector {
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

.gender-options {
  display: flex;
  gap: 1rem;
}

.gender-option {
  flex: 1;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gender-option:hover {
  border-color: #FFE5D9;
  background-color: #FFF8F5;
}

.gender-option.active {
  border-color: #FF8C42;
  background-color: #FFE5D9;
  color: #FF8C42;
  font-weight: 600;
}

.gender-option:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #e74c3c;
}

@media (max-width: 768px) {
  .gender-option {
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
  }
}
</style>


