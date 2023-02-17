<template>
  <div>
    <div v-if="!clients.length && loading" class="loader-wrapper">
      <Loader :size="32" />
    </div>
    <div v-if="loadingFailed" class="list-item">
      <InlineAlert mode="error">Could not load a clients list.</InlineAlert>
    </div>
    <div v-if="removalFailed" class="list-item">
      <InlineAlert mode="error">Could not remove a client.</InlineAlert>
    </div>
    <div v-if="loadingFailed" class="list-item list-item_center">
      <PushButton @click="refresh" :disabled="loading" :loading="loading">Refresh</PushButton>
    </div>
    <ClientCard
      v-for="client in clients"
      :key="client.uid"
      :model-value="client.data"
      :disabled="client.saving || loading"
      :loading="client.saving || loading"
      @remove="remove(client)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useController } from '@/vueent';
import ClientCard from '@/components/client-card.vue';
import InlineAlert from '@/components/shared/base/inline-alert.vue';
import Loader from '@/components/shared/base/loader.vue';
import PushButton from '@/components/shared/base/push-button.vue';

import HomeController from './home';

export default defineComponent({
  components: {
    ClientCard,
    InlineAlert,
    Loader,
    PushButton
  },

  setup() {
    const controller = useController(HomeController); // get the route controller

    // bind the controller's properties and methods to the component
    const clients = computed(() => controller.items);
    const loading = computed(() => controller.loading);
    const loadingFailed = computed(() => controller.loadingFailed);
    const removalFailed = computed(() => controller.removalFailed);

    const refresh = controller.refresh.bind(controller);
    const remove = controller.remove.bind(controller);

    return { clients, loading, loadingFailed, removalFailed, remove, refresh };
  }
});
</script>

<style scoped>
.loader-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-item {
  padding: 8px 12px;
}

.list-item_center {
  display: flex;
  justify-content: center;
}
</style>
