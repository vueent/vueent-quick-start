<template>
  <div class="client-card">
    <div class="client-card__item">ID: {{ modelValue.id }}</div>
    <div class="client-card__item">First name: {{ modelValue.firstName }}</div>
    <div class="client-card__item">Last name: {{ modelValue.lastName }}</div>
    <div class="client-card__item">Phone number: {{ modelValue.phone }}</div>
    <div class="client-card__item">Age: {{ modelValue.age }} years</div>
    <div class="client-card__actions">
      <PushButton @click="$emit('remove')" :loading="loading" :disabled="loading">Remove</PushButton>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import PushButton from '@/components/shared/base/push-button.vue';
import type { Data } from '@/models/client';

export default defineComponent({
  components: {
    PushButton
  },

  props: {
    modelValue: {
      type: Object as PropType<Data>,
      required: true
    },
    loading: Boolean as PropType<boolean>
  }
});
</script>

<style scoped>
.client-card {
  font-size: 1rem;
  padding: 0;
  margin: 8px 12px;
}

.client-card__item {
  padding: 8px 12px;
}

.client-card__actions {
  display: flex;
  justify-content: flex-end;
}
</style>
