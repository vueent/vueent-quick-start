import * as storage from '@/storage';

import type * as requests from './requests';
import type * as responses from './responses';

/**
 * Returns a clients list.
 *
 * @param req request data (query parameters)
 * @returns list of records of clients
 */
export function find(req: requests.Find): Promise<responses.Find> {
  return storage.find(req);
}

/**
 * Returns a client record by id.
 *
 * @param req request data with primary key
 * @returns client record
 */
export function findOne(req: requests.FindOne): Promise<responses.FindOne> {
  return storage.findOne(req.id);
}

/**
 * Create a client record.
 *
 * @param req client data without primary key
 * @returns client record
 */
export function create(req: requests.Create): Promise<responses.Create> {
  return storage.create(req);
}

/**
 * Updates a client record.
 *
 * @param req client data with primary key
 * @returns updatec client record
 */
export function update(req: requests.Update): Promise<responses.Update> {
  return storage.update(req.id, req);
}

/**
 * Removes a record from the store.
 *
 * @param req request data with primary key
 */
export async function destroy(req: requests.Destroy): Promise<void> {
  await storage.destroy(req.id);
}
