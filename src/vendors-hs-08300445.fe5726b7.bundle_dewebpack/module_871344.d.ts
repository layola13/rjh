import { useRef, useEffect } from 'react';

/**
 * React Hook that creates a debounced value holder with getter and setter functions.
 * The value is automatically cleared after a specified delay.
 * 
 * @template T - The type of value to be stored
 * @param delay - Time in milliseconds before the value is cleared (default: 250ms)
 * @returns A tuple containing:
 *   - [0]: Getter function that returns the current value
 *   - [1]: Setter function that updates the value and schedules its cleanup
 * 
 * @example
 *