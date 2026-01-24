/**
 * Creates an Observable that immediately emits a single value and then completes.
 * 
 * This is a factory function that wraps a value in an Observable, marking it as scalar
 * for potential optimizations. The Observable will synchronously emit the provided
 * value to any subscriber and then complete.
 * 
 * @template T - The type of the value to be emitted
 * @param value - The value to emit immediately upon subscription
 * @returns An Observable that emits the provided value once and completes
 * 
 * @example
 *