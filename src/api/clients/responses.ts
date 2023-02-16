import type { EncodedData } from '@/models/client';

export interface Find {
  items: EncodedData[];
}

export type FindOne = EncodedData;
export type Create = EncodedData;
export type Update = EncodedData;
