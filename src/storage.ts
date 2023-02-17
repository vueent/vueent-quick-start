/**
 * Server emulator, uses IndexedDB.
 *
 * @module storage
 */

import type { EncodedData } from '@/models/client';
import { delay } from '@/utilites/delay';
import { randomInt } from '@/utilites/random-int';
import { STORAGE_MAX_DELAY, STORAGE_RANDOM_FAIL } from '@/constants';

/**
 * Data in the storage,
 */
type Data = Omit<EncodedData, 'id'>;

/**
 * Maximum "server" response delay.
 */
const maxDelay = STORAGE_MAX_DELAY;

/**
 * Internal "server" error probability.
 */
const randomFail = STORAGE_RANDOM_FAIL;

/**
 * Simulates the occurence of an internal server error.
 *
 * @param force force error
 */
function throwErrorRandomly(force = false) {
  if (force || (randomFail > 0 && !Boolean(randomInt(randomFail)))) throw new Error('Internal server error');
}

/**
 * Initialization flag, prevents double initializion.
 */
let initialized = false;

/**
 * IndexedDB database reference.
 */
let db: IDBDatabase | undefined;

/**
 * Returns a clients list follow the params.
 *
 * @param queryParams query parameters
 * @returns clients list
 */
export async function find(queryParams?: {
  ids?: number[];
  firstName?: string;
  lastName?: string;
  age?: number;
}): Promise<{ items: EncodedData[] }> {
  await delay(randomInt(maxDelay) * 1000); // network latency imitation
  throwErrorRandomly(!db);

  const res: { items: EncodedData[] } = { items: [] };
  const filters: Array<(v: EncodedData) => boolean> = [];

  if (queryParams) {
    if (queryParams.firstName) {
      filters.push((v: EncodedData) => v.firstName === queryParams.firstName);
    } else if (queryParams.lastName) {
      filters.push((v: EncodedData) => v.lastName === queryParams.lastName);
    } else if (queryParams.age) {
      filters.push((v: EncodedData) => v.age === queryParams.age);
    }
  } else {
    filters.push(() => true);
  }

  const response = await new Promise<EncodedData[]>((resolve, reject) => {
    const req = db!.transaction('clients', 'readonly').objectStore('clients').openCursor();
    const result: EncodedData[] = [];

    req.onsuccess = event => {
      const cursor = (event.target as any).result as IDBCursorWithValue | undefined;

      if (!cursor) {
        resolve(result);

        return;
      }

      const value = { ...(cursor.value as Data), id: cursor.key as number };

      if (filters.every(filter => filter(value))) result.push(value);

      cursor.continue();
    };
    req.onerror = () => reject(req.error);
  });

  res.items = response;
  res.items.sort((a, b) => a.id - b.id);

  return res;
}

/**
 * Returns a client record by id.
 *
 * @param id primary key
 * @returns client record
 */
export async function findOne(id: number): Promise<EncodedData> {
  await delay(randomInt(maxDelay) * 1000); // network latency imitation
  throwErrorRandomly(!db);

  const response = await new Promise<Data>((resolve, reject) => {
    const req = db!.transaction('clients', 'readwrite').objectStore('clients').get(id);

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return { ...response, id };
}

/**
 * Creates a client record a returns it together with its primary key.
 *
 * @param data client data
 * @returns client record
 */
export async function create(data: Data): Promise<EncodedData> {
  await delay(randomInt(maxDelay) * 1000); // network latency imitation
  throwErrorRandomly(!db);

  const id = await new Promise<number>((resolve, reject) => {
    // remove id from the data object
    delete (data as Data & { id?: number }).id;

    const req = db!.transaction('clients', 'readwrite').objectStore('clients').add(data);

    req.onsuccess = () => resolve(req.result as number);
    req.onerror = () => reject(req.error);
  });

  return { ...data, id };
}

/**
 * Updates a client record in the database and returns an updated record.
 *
 * @param id primary key
 * @param data client data
 * @returns updated client record
 */
export async function update(id: number, data: Data): Promise<EncodedData> {
  await delay(randomInt(maxDelay) * 1000); // network latency imitation
  throwErrorRandomly(!db);

  const response = await new Promise<EncodedData>((resolve, reject) => {
    const req = db!.transaction('clients', 'readwrite').objectStore('clients').put(data, id);

    req.onsuccess = () => resolve({ ...data, id });
    req.onerror = () => reject(req.error);
  });

  return response;
}

/**
 * Removes a record from the store.
 *
 * @param key primary key
 */
export async function destroy(key: number): Promise<void> {
  await delay(randomInt(maxDelay) * 1000); // network latency imitation
  throwErrorRandomly(!db);

  await new Promise((resolve, reject) => {
    const req = db!.transaction('clients', 'readwrite').objectStore('clients').delete(key);

    req.onsuccess = () => resolve(undefined);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Initializes a database.
 */
export function init() {
  if (initialized) return Promise.resolve(); // prevent double initialization.

  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('db', 1);

    // initializing the database.
    openRequest.onupgradeneeded = () => {
      db = openRequest.result;

      const objectStore = db.createObjectStore('clients', { autoIncrement: true /*, keyPath: 'id'*/ });

      objectStore.createIndex('clients_first_name', 'fistName', { unique: false });
      objectStore.createIndex('clients_last_name', 'lastName', { unique: false });
      objectStore.createIndex('clients_age', 'age', { unique: false });

      objectStore.transaction.oncomplete = () => {
        const tr = db!.transaction('clients', 'readwrite');
        const clients = tr.objectStore('clients');

        // creating test records
        clients?.add({ firstName: 'John', lastName: 'Doe', phone: '5556667788', age: 25 });
        clients?.add({ firstName: 'Jane', lastName: 'Doe', phone: '5557776644', age: 20 });

        tr.oncomplete = () => resolve(undefined);
      };
    };

    openRequest.onsuccess = () => {
      db = openRequest.result;
      resolve(undefined);
    };

    openRequest.onerror = () => reject(openRequest.error);
    openRequest.onblocked = () => reject(openRequest.error);
  });
}
