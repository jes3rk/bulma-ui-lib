/**
 * Confirm the passed value exists
 * @param val Value to test
 * @returns True if val is neither null nor undefined
 */
export const exists = (val: unknown): boolean =>
  val !== null && val !== undefined;

/**
 * Use the given test to determine whether to return the value or a blank, empty string
 * @param test Test to perform
 * @param value Value to return if test is true
 * @returns string
 */
export const ifElseBlank = (test: boolean, value: string) : string => test ? value : '';