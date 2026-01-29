import { useRef, useCallback } from 'react';

type AnyFunction = (...args: any[]) => any;

/**
 * Creates a stable callback reference that always calls the latest version of the provided function.
 * Useful for avoiding unnecessary re-renders when passing callbacks to child components.
 * 
 * @param callback - The function to be called
 * @returns A memoized callback that invokes the latest version of the input function
 */
export default function useLatestCallback<T extends AnyFunction>(callback: T): T {
  const callbackRef = useRef<T>(callback);
  
  callbackRef.current = callback;
  
  return useCallback(((...args: Parameters<T>) => {
    return callbackRef.current?.(...args);
  }) as T, []);
}