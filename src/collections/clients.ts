import { Collection } from '@vueent/store';

import type { Data, EncodedData, ModelType } from '@/models/client';
import { Model } from '@/models/client';
import * as api from '@/api/clients';

export class ClientsCollection extends Collection<Model, Data, EncodedData, ModelType> {
  constructor() {
    super({
      construct: Model, // model constructor
      /**
       * Creates a record in the storage.
       *
       * It may return a created record or a primary key depends on your server API implementation.
       *
       * @returns created record
       */
      createData: (data: EncodedData): Promise<unknown> => {
        return api.create(data);
      },
      /**
       * Removes a record from the storage.
       *
       * @param id primary key
       */
      destroyData: (id: unknown): Promise<void> => {
        return api.destroy({ id: id as number });
      },
      /**
       * Updates a record in the storage.
       *
       * It may return an updated record or nothing depends on your server API implementation.
       *
       * @param id primary key
       * @param data encoded data
       * @returns updated record
       */
      updateData: (id: unknown, data: EncodedData): Promise<unknown> => {
        return api.update({ ...data, id: id as number });
      },
      /**
       * Loads a single record from the storage.
       *
       * @param pk primary key
       * @returns record
       */
      loadOneData: (pk: unknown): Promise<EncodedData> => {
        return api.findOne({ id: pk as number });
      },
      /**
       * Loads multiple records from the storage.
       *
       * @param options load options, including local and remote filters, query parameters and path parameters
       * @returns records list
       */
      loadManyData: async (options: {
        queryParams?: {
          ids?: number[];
          name?: string;
          age?: number;
        };
      }): Promise<EncodedData[]> => {
        const response = await api.find(options.queryParams ? options.queryParams : {});

        return response.items;
      }
    });
  }

  /**
   * Converts an encoded data to internal.
   *
   * @param encoded encoded data
   * @returns decoded data
   */
  public normalize(encoded: EncodedData): Data {
    return {
      id: encoded.id,
      firstName: encoded.firstName,
      lastName: encoded.lastName,
      phone: encoded.phone,
      age: String(encoded.age)
    };
  }

  /**
   * Converts an internal representation to the encoded.
   *
   * @param data decoded data
   * @returns encoded data
   */
  public denormalize(data: Data): EncodedData {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      age: Number(data.age)
    };
  }
}
