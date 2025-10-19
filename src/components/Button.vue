<template>
  <button 
    :type="type"
    :class="['btn', variantClass]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner"></span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger'].includes(value)
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    variantClass() {
      return `btn-${this.variant}`
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #20C997;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1ba085;
}

.btn-secondary {
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #f8f9fa;
}

.btn-success {
  background-color: #27ae60;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #229954;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c0392b;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .btn {
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
  }
}
</style>

