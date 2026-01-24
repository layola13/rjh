/**
 * Concatenates all inner Observables sequentially.
 * 
 * Flattens an Observable-of-Observables by putting one inner Observable after the other.
 * Subscribes to each inner Observable only after the previous one completes.
 * 
 * @returns A function that returns an Observable that emits values from all inner Observables sequentially.
 * 
 * @example
 *