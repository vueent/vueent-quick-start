import { Collection } from '@vueent/store';

import type { Data, EncodedData, ModelType } from '@/models/client';
import { Model } from '@/models/client';
import * as api from '@/api/clients';

export class ClientsCollection extends Collection<Model, Data, EncodedData, ModelType> {
  constructor() {
    super({
      construct: Model,
      createData: (data: EncodedData): Promise<unknown> => {
        return api.create(data);
      },
      destroyData: (id: unknown): Promise<void> => {
        return api.destroy({ id: id as number });
      },
      updateData: (id: unknown, data: EncodedData): Promise<unknown> => {
        return api.update({ ...data, id: id as number });
      },
      loadOneData: (pk: unknown): Promise<EncodedData> => {
        return api.findOne({ id: pk as number });
      },
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

  public normalize(encoded: EncodedData): Data {
    return {
      id: encoded.id,
      firstName: encoded.firstName,
      lastName: encoded.lastName,
      phone: encoded.phone,
      age: String(encoded.age)
    };
  }

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
