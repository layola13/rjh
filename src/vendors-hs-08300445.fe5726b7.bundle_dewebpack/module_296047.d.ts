/**
 * Custom React hook for managing state with unmount safety.
 * Prevents state updates after component unmounts to avoid memory leaks and warnings.
 * 
 * @template T - The type of the state value
 * @param initialValue - The initial state value
 * @returns A tuple containing the current state and a safe setter function
 * 
 * @example
 *