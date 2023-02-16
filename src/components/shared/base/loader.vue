<template>
  <div class="loader" :style="`width: ${size}px; height: ${size}px`"></div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      type: Number as PropType<number>,
      default: 32
    }
  }
});
</script>

<style scoped>
.loader {
  /* width: 32px;
  height: 32px; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: loading-spinner 1s ease infinite;
}

@keyframes loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
