import { Controller } from '@vueent/core';
import { calculated, tracked } from '@vueent/reactive';

import { registerController, injectService as service } from '@/vueent';
import type { ModelType as Client } from '@/models/client';
import StoreService from '@/services/store';
import { ClientsCollection } from '@/collections';

export enum SaveStatus {
  none,
  success,
  fail
}

export default class AddController extends Controller {
  @service(StoreService) private readonly store!: StoreService;

  @tracked private _client?: Client;
  @tracked private _saveStatus: SaveStatus = SaveStatus.none;

  private get _collection() {
    return this.store.get(ClientsCollection);
  }

  public get saveStatus() {
    return this._saveStatus;
  }

  public get client() {
    if (!this._client) this._client = this._collection.create();

    return this._client;
  }

  destroy() {
    if (this._client) {
      this._collection.unload(this._client.uid);
      this._client = undefined;
    }
  }

  public async save() {
    if (!this._client) return;

    this._client.v.touch();

    if (this._client.v.invalid) return;

    this._saveStatus = SaveStatus.none;

    try {
      await this._client.save();
    } catch (e) {
      console.error('could not save a client by the reason:', e);
      this._saveStatus = SaveStatus.fail;

      return;
    }

    this._saveStatus = SaveStatus.success;
    this._collection.unload(this._client.uid);
    this._client = this._collection.create();
  }
}

registerController(AddController);
