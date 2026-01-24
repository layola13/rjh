/**
 * Merges multiple observables or values into a single observable stream.
 * 
 * This function provides a flexible way to combine observable sources:
 * - If called with no arguments, returns an empty observable
 * - If called with a single source, converts it to an observable
 * - If called with multiple sources, merges them concurrently
 * 
 * @param sources - One or more observable sources or values to merge
 * @param scheduler - Optional scheduler to control timing of emissions
 * @returns An observable that emits values from all input sources
 * 
 * @example
 *