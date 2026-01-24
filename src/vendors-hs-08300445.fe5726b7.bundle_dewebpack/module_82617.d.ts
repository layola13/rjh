/**
 * Custom React hook that manages state with a callback on value changes.
 * Combines useRef and useState to track value changes and trigger callbacks.
 * 
 * @template T - The type of the state value
 * @param initialValue - The initial value of the state
 * @param onValueChange - Callback function invoked when the value changes, receives new and old values
 * @returns A tuple containing the current value and a setter function
 * 
 * @example
 *