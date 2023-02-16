import { StoreService as VueentStoreService } from '@vueent/store';

import { registerService } from '@/vueent';
import { ClientsCollection } from '@/collections';

export default class StoreService extends VueentStoreService<ClientsCollection> {
  constructor() {
    super([new ClientsCollection()]);
  }
}

registerService(StoreService);
