/**
 * Creates an Observable that emits the arguments you provide, then completes.
 * 
 * This creation operator is useful for generating a simple Observable that
 * synchronously emits a known sequence of values and then completes.
 * 
 * @template T The type of elements emitted by the observable
 * @param values A comma-separated list of values to emit
 * @returns An Observable that emits each provided value in sequence, then completes
 * 
 * @example
 *