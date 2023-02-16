import type { EncodedData } from '@/models/client';

export interface Find {
  ids?: number[];
  firstName?: string;
  lastName?: string;
  phone?: string;
  age?: number;
}

export interface FindOne {
  id: number;
}

export type Create = EncodedData;

export type Update = EncodedData;

export interface Destroy {
  id: number;
}
