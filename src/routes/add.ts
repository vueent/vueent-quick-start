import { Controller } from '@vueent/core';
import { tracked } from '@vueent/reactive';

import { registerController, injectService as service } from '@/vueent';
import type { ModelType as Client } from '@/models/client';
import StoreService from '@/services/store';
import { ClientsCollection } from '@/collections';

export enum SaveStatus {
  none,
  success,
  fail
}

/**
 * This controller demonstrates an architecture where all pages works independently with its own state provides by Store service.
 */
export default class AddController extends Controller {
  /**
   * Injected Store service @see {@link StoreService}.
   */
  @service(StoreService) private readonly store!: StoreService;

  /**
   * Reactive client model instance.
   */
  @tracked private _client?: Client;

  /**
   * Reactive save status.
   */
  @tracked private _saveStatus: SaveStatus = SaveStatus.none;

  private get _collection() {
    return this.store.get(ClientsCollection);
  }

  /**
   * Public read-only save status.
   */
  public get saveStatus() {
    return this._saveStatus;
  }

  /**
   * Public read-only client model instance.
   */
  public get client() {
    // create instance if it is not created yet.
    if (!this._client) this._client = this._collection.create();

    return this._client;
  }

  /**
   * Destroy hook (onUnmounted).
   *
   * Destroys obsolete model instance.
   */
  destroy() {
    if (this._client) {
      this._collection.unload(this._client.uid);
      this._client = undefined;
    }
  }

  /**
   * Saves an instance via the collection.
   */
  public async save() {
    if (!this._client) return;

    this._client.v.touch(); // trigger validation

    if (this._client.v.invalid) return; // check validation result

    this._saveStatus = SaveStatus.none; // reset the save status

    try {
      await this._client.save();
    } catch (e) {
      console.error('could not save a client by the reason:', e);
      this._saveStatus = SaveStatus.fail; // set the save status to "fail"

      return;
    }

    this._saveStatus = SaveStatus.success; // update the save status to "success"
    this._collection.unload(this._client.uid); // destroy obsolete instance
    this._client = this._collection.create(); // create an empty instance
  }
}

registerController(AddController);
