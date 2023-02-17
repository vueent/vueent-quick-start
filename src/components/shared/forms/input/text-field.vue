<template>
  <div :class="className">
    <div v-if="label" class="text-field__label">{{ label }}</div>
    <div class="text-field__input">
      <input :value="modelValue" @input="handleInput" @change.prevent="handleChange" :disabled="disabled" :readonly="readonly" />
    </div>
    <div v-if="errorMessage" class="text-field__error-message">{{ errorMessage }}</div>
    <div v-else-if="hint" class="text-field__hint">{{ hint }}</div>
    <div v-else class="text-field__hint">&nbsp;</div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: String as PropType<string>,
    errorMessage: String as PropType<string>,
    label: String as PropType<string>,
    hint: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
    readonly: Boolean as PropType<boolean>
  },

  setup(props, context) {
    const className = computed(() => {
      const result: Record<string, boolean> = { 'text-field': true };

      if (props.disabled) result['text-field_disabled'] = true;

      return result;
    });

    const handleInput = (event: Event) => context.emit('update:modelValue', (event.target as HTMLInputElement).value);
    const handleChange = (event: Event) => context.emit('change', (event.target as HTMLInputElement).value);

    return { className, handleInput, handleChange };
  }
});
</script>

<style scoped>
@import '@/assets/base.css';

.text-field__input {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.text-field__input input {
  font-size: 1.1rem;
  outline: none;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: none;
  margin: 0;
  padding: 8px 12px;
}

.text-field__input input:focus {
  outline: none;
  color: #2f2d47;
  border: 1px solid #2f2d47;
  background-color: hsl(246, 16%, 75%);
  box-shadow: none;
}

.text-field__label,
.text-field__hint,
.text-field__error-message {
  padding-left: 12px;
  font-size: 0.9rem;
}

.text-field__error-message {
  color: #ff004c;
}

.text-field_disabled .text-field__input {
  color: #585858;
  background-color: #cecece;
}

.text-field_disabled .text-field__input input,
.text-field_disabled .text-field__input input:focus {
  color: #585858;
  background-color: #cecece;
}

.text-field_disabled .text-field__input input:disabled {
  color: #585858;
  background-color: #cecece;
  border: 1px solid var(--color-border);
  border-radius: 10px;
}
</style>
