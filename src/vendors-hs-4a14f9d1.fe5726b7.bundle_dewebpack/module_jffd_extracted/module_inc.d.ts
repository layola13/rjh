/**
 * Module: module_inc
 * Increments the internal multiplier counter.
 * 
 * @remarks
 * This function increases the `mult` property by 1 each time it's called.
 * Typically used in contexts where the instance maintains a counter state.
 */
declare function increment(this: { mult: number }): void;

export { increment };