/**
 * Custom React hook for batched state updates with debouncing
 * 
 * This hook provides a mechanism to batch multiple state updates together
 * and apply them after a debounced delay, improving performance by reducing
 * the number of re-renders.
 * 
 * @template T - The type of the state value
 * @param initialValue - The initial state value
 * @returns A tuple containing:
 *   - [0]: The current state value
 *   - [1]: A function to queue a partial state update
 * 
 * @example
 *