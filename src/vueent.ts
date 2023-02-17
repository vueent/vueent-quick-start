import { initVueent } from '@vueent/core';

/**
 * Initialized VueEnt core instance.
 */
export const { useVueent, registerService, registerController, useService, useController, injectService, injectController } =
  initVueent();
