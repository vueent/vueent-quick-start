<template>
  <div v-if="loading" :class="className"><slot></slot></div>
  <button v-else :class="className" :disabled="disabled" :title="title" :type="type"><slot></slot></button>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    title: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    },
    loading: Boolean as PropType<boolean>
  },

  setup(props) {
    const className = computed(() => {
      const result: Record<string, boolean> = { 'push-button': true };

      if (props.disabled) result['push-button_disabled'] = true;
      if (props.loading) result['push-button_loading'] = true;

      return result;
    });

    return { className };
  }
});
</script>

<style scoped>
.push-button {
  position: relative;
  border: 0;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 1rem;
  outline: none;
  box-shadow: none;
  background-color: #303030;
  color: #ffffff;
}

.push-button:hover {
  background-color: #414141;
}

.push-button:active {
  background-color: #2f2e42;
}

.push-button:focus {
  outline: 2px solid hsla(245, 22%, 23%, 0.5);
}

.push-button_disabled {
  color: #cecece;
  background-color: #585858;
}

.push-button_disabled:hover,
.push-button_disabled:active {
  color: #cecece;
  background-color: #585858;
}

.push-button_loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: push-button-loading-spinner 1s ease infinite;
}

@keyframes push-button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

.push-button_loading * {
  visibility: hidden;
  opacity: 0;
}
</style>
