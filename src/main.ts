import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import { init } from '@/storage';

import './assets/main.css';

/**
 * Initializes IndexedDB and runs the app, unnecessary in production.
 */
async function main() {
  await init(); // initializing the storage

  const app = createApp(App);

  app.use(router);
  app.mount('#app');
}

main();
