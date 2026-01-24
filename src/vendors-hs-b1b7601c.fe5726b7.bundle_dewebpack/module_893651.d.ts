/**
 * Concatenates multiple observables sequentially.
 * Emits values from the source observable, then subscribes to each additional observable in order.
 * 
 * @param sources - Additional observables to concatenate after the source
 * @returns An operator function that concatenates observables in sequence
 * 
 * @example
 *