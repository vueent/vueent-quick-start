import { Controller } from '@vueent/core';

import { registerController, injectService as service } from '@/vueent';
import ClientsService from '@/services/clients';
import type { ModelType as Client } from '@/models/client';

/**
 * This controller provides data to a view and modifies the application state via services methods.
 */
export default class HomeController extends Controller {
  /**
   * Injected Clients service @see {@link ClientsService}.
   */
  @service(ClientsService) private readonly clients!: ClientsService;

  /**
   * Reactive clients list.
   */
  public get items() {
    return this.clients.items;
  }

  /**
   * Reactive loading flag.
   */
  public get loading() {
    return this.clients.loading;
  }

  /**
   * Reactive loading error flag.
   */
  public get loadingFailed() {
    return this.clients.listLoadingFailed;
  }

  /**
   * Reactive client removal error flag.
   */
  public get removalFailed() {
    return this.clients.removalFailed;
  }

  /**
   * Init hook (onBeforeMount).
   */
  init() {
    this.refresh(); // refresh the clients list
  }

  /**
   * Destroy hook (onUnmounted).
   */
  destroy() {
    this.clients.freeAll();
  }

  /**
   * Removes a client from the store.
   *
   * @param client client model instance
   */
  public remove(client: Client) {
    this.clients.remove(client);
  }

  /**
   * Refreshes the clients list.
   */
  public refresh() {
    this.clients.loadList(); // load clients list from the storage
  }
}

registerController(HomeController);
