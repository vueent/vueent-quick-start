import * as storage from '@/storage';

import type * as requests from './requests';
import type * as responses from './responses';

export function find(req: requests.Find): Promise<responses.Find> {
  return storage.find(req);
}

export function findOne(req: requests.FindOne): Promise<responses.FindOne> {
  return storage.findOne(req.id);
}

export function create(req: requests.Create): Promise<responses.Create> {
  return storage.create(req);
}

export function update(req: requests.Update): Promise<responses.Update> {
  return storage.update(req.id, req);
}

export async function destroy(req: requests.Destroy): Promise<void> {
  await storage.destroy(req.id);
}
