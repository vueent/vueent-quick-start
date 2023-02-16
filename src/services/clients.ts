import { Service } from '@vueent/core';
import { tracked } from '@vueent/reactive';

import { registerService, injectService as service } from '@/vueent';
import { ClientsCollection } from '@/collections';
import type { ModelType as Client } from '@/models/client';

import StoreService from './store';

export default class ClientsService extends Service {
  @service(StoreService) private readonly store!: StoreService;

  @tracked private _items: Client[];
  @tracked private _loading = false;
  @tracked private _listLoadingFailed = false;
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

  public async loadList() {
    if (this._loading) return;

    const { _collection } = this;
    let items;

    this._listLoadingFailed = false;
    this._removalFailed = false;
    this._loading = true;

    try {
      items = await _collection.find();
    } catch (e) {
      console.error('could not load a clients list by the reason:', e);

      this._listLoadingFailed = true;
      this._loading = false;

      return;
    }

    this._items.forEach(item => _collection.unload(item.uid));
    this._items = items;
    this._loading = false;
  }

  public freeAll() {
    this._collection.unloadAll();
  }

  public async remove(client: Client) {
    client.delete();

    this._removalFailed = false;

    try {
      await client.save();
    } catch (e) {
      console.error('could not remove a client by the reason:', e);
      this._removalFailed = true;

      return;
    }

    await this.loadList();
  }
}

registerService(ClientsService);
