/**
 * A custom React hook that provides debounced execution with cooldown functionality.
 * 
 * @param callback - The function to execute after the cooldown period
 * @param cooldownMs - The cooldown duration in milliseconds
 * @returns A tuple containing:
 *   - [0]: The debounced trigger function
 *   - [1]: A reset function to cancel pending timers and clear cooldown state
 * 
 * @example
 *