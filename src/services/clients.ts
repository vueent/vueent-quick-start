import { Service } from '@vueent/core';
import { legacyTracked as tracked } from '@vueent/reactive';

import { registerService, legacyInjectService as service } from '@/vueent';
import { ClientsCollection } from '@/collections';
import type { ModelType as Client } from '@/models/client';

import StoreService from './store';

/**
 * A custom service that encapsulates clients list, loading state, errors, etc.
 *
 * This service demonstrates an architecture in which the global application state is encapsulated by services.
 * No one view or controller can get the application data access bypassing services.
 */
export default class ClientsService extends Service {
  /**
   * Injected Store service @see {@link StoreService}.
   */
  @service(StoreService) private readonly store!: StoreService;

  /**
   * Reactive clients list.
   */
  @tracked private _items: Client[];

  /**
   * Reactive loading flag.
   */
  @tracked private _loading = false;

  /**
   * Reactive loading error flag.
   */
  @tracked private _listLoadingFailed = false;

  /**
   * Reactive client removal error flag.
   */
  @tracked private _removalFailed = false;

  private get _collection() {
    return this.store.get(ClientsCollection);
  }

  public get items() {
    return this._items;
  }

  public get loading() {
    return this._loading;
  }

  public get listLoadingFailed() {
    return this._listLoadingFailed;
  }

  public get removalFailed() {
    return this._removalFailed;
  }

  constructor() {
    super();

    this._items = [];
  }

  /**
   * Loads a clients list.
   */
  public async loadList() {
    if (this._loading) return;

    const { _collection } = this;
    let items;

    // reset flags before request
    this._listLoadingFailed = false;
    this._removalFailed = false;
    this._loading = true;

    try {
      items = await _collection.find(); // load instances from the collection
    } catch (e) {
      console.error('could not load a clients list by the reason:', e);
      this._listLoadingFailed = true; // set the loading error flag
      this._loading = false; // reset loading flag

      return;
    }

    this._items.forEach(item => _collection.unload(item.uid)); // destroy old instances
    this._items = items; // set new instances
    this._loading = false; // reset loading flag
  }

  /**
   * Destroys all clients instances in the local cache.
   */
  public freeAll() {
    this._collection.unloadAll();
  }

  /**
   * Removes a client.
   *
   * @param client client instance
   */
  public async remove(client: Client) {
    client.delete(); // mark instance ad deleted

    this._removalFailed = false; // reset the removal error flag

    try {
      await client.save(); // destroy the instance
    } catch (e) {
      console.error('could not remove a client by the reason:', e);
      this._removalFailed = true; // set removal error flag

      return;
    }

    // remove client from the items list
    const index = this._items.findIndex(item => item.uid === client.uid);

    if (index !== -1) this._items.splice(index, 1);
  }
}

registerService(ClientsService);
