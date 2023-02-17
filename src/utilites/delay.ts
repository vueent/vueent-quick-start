/**
 * Async delay timer.
 *
 * @param timeout ms
 */
export const delay = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));
