<template>
  <div>
    <FormClient :model-value="client.data" :validations="client.v" @save="save" :loading="client.saving" />
    <InlineAlert v-if="success" mode="success">Client has been saved successfully.</InlineAlert>
    <InlineAlert v-else-if="fail" mode="error">Could not save a client.</InlineAlert>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useController } from '@/vueent';
import FormClient from '@/components/forms/client.vue';
import InlineAlert from '@/components/shared/base/inline-alert.vue';

import AddController, { SaveStatus } from './add';

export default defineComponent({
  components: {
    FormClient,
    InlineAlert
  },

  setup() {
    const controller = useController(AddController);

    const client = computed(() => controller.client);
    const fail = computed(() => controller.saveStatus === SaveStatus.fail);
    const success = computed(() => controller.saveStatus === SaveStatus.success);

    const save = controller.save.bind(controller);

    return { client, fail, success, save };
  }
});
</script>
