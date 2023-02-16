import { Controller } from '@vueent/core';
import { calculated } from '@vueent/reactive';

import { registerController, injectService as service } from '@/vueent';
import ClientsService from '@/services/clients';
import type { ModelType as Client } from '@/models/client';

export default class HomeController extends Controller {
  @service(ClientsService) private readonly clients!: ClientsService;

  @calculated public get items() {
    return this.clients.items;
  }

  public get loading() {
    return this.clients.loading;
  }

  public get loadingFailed() {
    return this.clients.listLoadingFailed;
  }

  public get removalFailed() {
    return this.clients.removalFailed;
  }

  init() {
    this.refresh();
  }

  destroy() {
    this.clients.freeAll();
  }

  public remove(client: Client) {
    this.clients.remove(client);
  }

  public refresh() {
    this.clients.loadList();
  }
}

registerController(HomeController);
