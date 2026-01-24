/**
 * Gets the current seed value.
 * 
 * This method returns the internal seed state used for pseudo-random number generation
 * or other deterministic operations that depend on an initial seed value.
 * 
 * @returns The current seed value
 */
function getSeed(this: { _seed: number }): number;