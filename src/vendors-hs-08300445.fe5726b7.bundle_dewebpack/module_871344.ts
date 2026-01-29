import { useRef, useEffect } from 'react';

type TimeoutHandle = ReturnType<typeof setTimeout> | null;

type UseDelayedValueReturn<T> = [
  () => T | null,
  (value: T, forceUpdate?: boolean) => void
];

/**
 * A custom hook that manages a value with delayed reset functionality.
 * The value is automatically cleared after a specified delay.
 * 
 * @param delay - The delay in milliseconds before the value is cleared (default: 250ms)
 * @returns A tuple containing a getter function and a setter function
 */
export default function useDelayedValue<T = unknown>(delay: number = 250): UseDelayedValueReturn<T> {
  const valueRef = useRef<T | null>(null);
  const timeoutRef = useRef<TimeoutHandle>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getValue = (): T | null => {
    return valueRef.current;
  };

  const setValue = (newValue: T, forceUpdate?: boolean): void => {
    if (forceUpdate || valueRef.current === null) {
      valueRef.current = newValue;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      valueRef.current = null;
    }, delay);
  };

  return [getValue, setValue];
}