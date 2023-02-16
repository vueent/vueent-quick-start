<template>
  <form @submit.prevent="$emit('save')">
    <div class="form-client">
      <div>
        <TextField
          v-if="modelValue && validations"
          label="First name"
          :model-value="modelValue.firstName"
          @update:model-value="modelValue ? (modelValue.firstName = $event) : null"
          @change="validations?.c.firstName.touch()"
          :error-message="validations.c.firstName.dirtyMessage"
          :disabled="loading"
        />
        <TextField v-else label="First name" readonly />
      </div>
      <div>
        <TextField
          v-if="modelValue && validations"
          label="Last name"
          :model-value="modelValue.lastName"
          @update:model-value="modelValue ? (modelValue.lastName = $event) : null"
          @change="validations?.c.lastName.touch()"
          :error-message="validations.c.lastName.dirtyMessage"
          :disabled="loading"
        />
        <TextField v-else label="Last name" readonly />
      </div>
      <div>
        <TextField
          v-if="modelValue && validations"
          label="Phone number"
          :model-value="modelValue.phone"
          @update:model-value="modelValue ? (modelValue.phone = $event) : null"
          @change="validations?.c.phone.touch()"
          :error-message="validations.c.phone.dirtyMessage"
          :disabled="loading"
        />
        <TextField v-else label="Phone number" readonly />
      </div>
      <div>
        <TextField
          v-if="modelValue && validations"
          label="Age"
          :model-value="modelValue.age"
          @update:model-value="modelValue ? (modelValue.age = $event) : null"
          @change="validations?.c.age.touch()"
          :error-message="validations.c.age.dirtyMessage"
          :disabled="loading"
        />
        <TextField v-else label="Age" readonly />
      </div>
      <div class="form-client__actions">
        <PushButton type="submit" :loading="loading" :disabled="loading">Save</PushButton>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import InlineAlert from '@/components/shared/base/inline-alert.vue';
import PushButton from '@/components/shared/base/push-button.vue';
import TextField from '@/components/shared/forms/input/text-field.vue';
import type { Data, Validations } from '@/models/client';

export default defineComponent({
  components: {
    InlineAlert,
    PushButton,
    TextField
  },

  props: {
    modelValue: Object as PropType<Data>,
    validations: Object as PropType<Validations>,
    loading: Boolean as PropType<boolean>
  }
});
</script>

<style scoped>
.form-client {
  padding: 8px 12px;
}

.form-client__actions {
  display: flex;
  justify-content: flex-end;
}
</style>
