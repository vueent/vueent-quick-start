import type { EncodedData } from '@/models/client';

/**
 * "Find" request response.
 */
export interface Find {
  items: EncodedData[];
}

/**
 * "Find one" request response.
 */
export type FindOne = EncodedData;

/**
 * "Create" request response.
 */
export type Create = EncodedData;

/**
 * "Update" request response.
 */
export type Update = EncodedData;
