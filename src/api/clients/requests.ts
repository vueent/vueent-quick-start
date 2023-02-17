import type { EncodedData } from '@/models/client';

/**
 * "Find" request parameters list.
 */
export interface Find {
  /**
   * Acceptable primary keys.
   */
  ids?: number[];
  /**
   * Acceptable first name.
   */
  firstName?: string;
  /**
   * Acceptable last name.
   */
  lastName?: string;
  /**
   * Acceptable phone number.
   */
  phone?: string;
  /**
   * Acceptable age.
   */
  age?: number;
}

/**
 * "Find one" request parameters list.
 */
export interface FindOne {
  id: number;
}

/**
 * "Create" request parameters list, including client data.
 */
export type Create = EncodedData;

/**
 * "Update" request parameters list, including client data.
 */
export type Update = EncodedData;

/**
 * "Destroy" request parameters list.
 */
export interface Destroy {
  id: number;
}
