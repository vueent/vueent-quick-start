import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import { init } from '@/storage';

import './assets/main.css';

async function main() {
  await init();

  const app = createApp(App);

  app.use(router);
  app.mount('#app');
}

main();
