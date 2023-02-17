/**
 * Custom validation rules list.
 *
 * @module validators
 */

export const phoneRegex = /^(([0-9]){10})$/;
export const nameRegex = /^[0-9a-zA-Z. \\-]*$/;

/**
 * Returns true if the argument is a valid phone string.
 *
 * @param value checking value
 * @returns validation result
 */
export function phone(value: string): boolean {
  return phoneRegex.test(value);
}

/**
 * Returns true if the argument is a valid name string.
 *
 * @param value checking value
 * @returns validation result
 */
export function name(value: string): boolean {
  return nameRegex.test(value);
}
