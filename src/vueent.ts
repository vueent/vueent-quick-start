import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
import { initVueent } from '@vueent/core';

/**
 * Initialized VueEnt core instance.
 */
export const {
  useVueent,
  registerService,
  registerController,
  useService,
  useController,
  legacyInjectService,
  legacyInjectController
} = initVueent({ onBeforeMount, onMounted, onBeforeUnmount, onUnmounted });
