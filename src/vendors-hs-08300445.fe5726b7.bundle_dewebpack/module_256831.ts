import { useRef } from 'react';

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

type ThrottledFunction = (force?: boolean) => void;
type CancelFunction = () => void;

/**
 * Custom hook that throttles a callback function
 * @param callback - The function to throttle
 * @param delay - The throttle delay in milliseconds
 * @returns A tuple containing the throttled function and a cancel function
 */
export default function useThrottle(
  callback: (force?: boolean) => boolean | void,
  delay: number
): [ThrottledFunction, CancelFunction] {
  const isThrottledRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  function clearTimer(): void {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
  }

  function throttledFunction(force?: boolean): void {
    clearTimer();

    if (isThrottledRef.current && force !== true) {
      timerRef.current = window.setTimeout(() => {
        isThrottledRef.current = false;
        throttledFunction();
      }, delay);
    } else {
      const result = callback(force);
      if (result === false) {
        return;
      }

      isThrottledRef.current = true;
      timerRef.current = window.setTimeout(() => {
        isThrottledRef.current = false;
      }, delay);
    }
  }

  function cancel(): void {
    isThrottledRef.current = false;
    clearTimer();
  }

  return [throttledFunction, cancel];
}