/**
 * React hook that provides a state getter and setter with force update capability.
 * Returns a tuple containing a getter function for the current value and a setter function that updates the value and triggers a re-render.
 * 
 * @template T - The type of the state value
 * @param initialValue - The initial state value
 * @returns A tuple containing [getter, setter] functions
 * 
 * @example
 *