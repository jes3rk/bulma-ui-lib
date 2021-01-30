/**
 * Confirm the passed value exists
 * @param val Value to test
 * @returns True if val is neither null nor undefined
 */
export const exists = (val: unknown): boolean => val !== null && val !== undefined;