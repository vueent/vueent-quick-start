import { StoreService as VueentStoreService } from '@vueent/store';

import { registerService } from '@/vueent';
import { ClientsCollection } from '@/collections';

/**
 * The project store service that provides access to collections.
 */
export default class StoreService extends VueentStoreService<ClientsCollection> {
  constructor() {
    // send a list of collections instances to the parent constructor
    super([new ClientsCollection()]);
  }
}

registerService(StoreService);
