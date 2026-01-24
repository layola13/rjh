/**
 * Concatenates multiple Observable sources sequentially.
 * 
 * Subscribes to each Observable in order, waiting for one to complete
 * before moving to the next. Emits all values from each source in sequence.
 * 
 * @param sources - Variable number of Observable sources or a scheduler as the last argument
 * @returns An Observable that emits values from all input Observables sequentially
 * 
 * @example
 *