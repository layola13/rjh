/**
 * Increments the multiplier counter.
 * This function increases the internal `mult` property by one.
 * 
 * @remarks
 * Originally from module 'inc' (module_inc)
 * 
 * @returns {void}
 */
declare function increment(this: { mult: number }): void;

/**
 * Interface representing an object with an incrementable multiplier.
 * 
 * @interface MultiplierObject
 */
interface MultiplierObject {
  /**
   * The multiplier counter value.
   * @type {number}
   */
  mult: number;
  
  /**
   * Increments the multiplier counter by one.
   * @method
   */
  increment(): void;
}

export { increment, MultiplierObject };