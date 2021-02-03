/**
 * Confirm the passed value exists
 * @param val Value to test
 * @returns True if val is neither null nor undefined
 */
export const exists = (val: unknown): boolean => val !== null && val !== undefined;


/**
 * Generate non-cryptographically secure hashes for simple hash table implmentations
 * @param s String to hash
 * @returns Hashed value
 */
export const simpleHash = (s: string): string => {
  if (typeof s !== 'string') throw new Error("Input must be of type string");
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}
/**
 * Use the given test to determine whether to return the value or a blank, empty string
 * @param test Test to perform
 * @param value Value to return if test is true
 * @returns string
 */
export const ifElseBlank = (test: boolean, value: string) : string => test ? value : '';