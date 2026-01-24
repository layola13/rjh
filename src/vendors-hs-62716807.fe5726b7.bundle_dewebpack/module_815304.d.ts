/**
 * Custom React Hook for batching state updates using raf-schd (requestAnimationFrame scheduler)
 * 
 * This hook wraps useState and batches multiple synchronous setState calls into a single
 * update that executes on the next animation frame, improving performance.
 * 
 * @template T - The type of the state value
 * @param initialValue - The initial state value
 * @returns A tuple containing the current state and a batched setState function
 * 
 * @example
 *