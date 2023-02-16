<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    mode: {
      type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
      default: 'info'
    }
  },

  setup(props, context) {
    const className = computed(() => {
      const result: Record<string, boolean> = { 'inline-alert': true };

      if (props.mode) result[`inline-alert_${props.mode}`] = true;

      return result;
    });

    return { className };
  }
});
</script>

<style scoped>
.inline-alert {
  padding: 8px 12px;
  font-size: 1rem;

  color: #ffffff;
  background-color: #2f2e42;
}

.inline-alert_info {
  background-color: #496c9b;
}

.inline-alert_warning {
  background-color: #927031;
}

.inline-alert_success {
  background-color: #397232;
}

.inline-alert_error {
  background-color: #ff004c;
}
</style>
