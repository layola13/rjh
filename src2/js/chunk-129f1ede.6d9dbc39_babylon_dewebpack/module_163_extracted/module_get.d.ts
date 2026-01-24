/**
 * Gets the current seed value used for random number generation or state management.
 * 
 * @returns The current seed value stored in this instance
 * 
 * @remarks
 * This getter provides read-only access to the internal seed state.
 * The seed is typically used for:
 * - Deterministic random number generation
 * - State initialization
 * - Reproducible computations
 */
function getSeed<T = number>(): T {
    return this._seed;
}