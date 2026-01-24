/**
 * A custom React hook that provides a state-like API with getter function.
 * Similar to useState but returns a getter function instead of the direct value.
 * 
 * @template T - The type of the state value
 * @param initialValue - The initial state value
 * @returns A tuple containing:
 *   - A getter function that returns the current state value
 *   - A setter function to update the state (accepts value or updater function)
 * 
 * @example
 *