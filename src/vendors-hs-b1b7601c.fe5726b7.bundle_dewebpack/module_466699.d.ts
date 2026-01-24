/**
 * Concatenates the source observable with multiple other observables in sequence.
 * Each observable will be subscribed to only after the previous one completes.
 * 
 * @template T The type of items emitted by the observables
 * @param sources - Variable number of observables to concatenate with the source
 * @returns An operator function that concatenates all provided observables
 * 
 * @example
 *