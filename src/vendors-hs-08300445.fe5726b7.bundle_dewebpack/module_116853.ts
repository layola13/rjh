import { useState, useEffect, useRef } from 'react';

type TimeoutCallback = () => void;

type SetDelayedStateFunction = (
  newState: boolean,
  callback?: TimeoutCallback
) => void;

type ClearTimeoutFunction = () => void;

type UseDelayedStateResult = [
  boolean,
  SetDelayedStateFunction,
  ClearTimeoutFunction
];

/**
 * Custom hook for managing delayed state updates
 * @param delay - Delay in milliseconds before state update (default: 10ms)
 * @returns Tuple containing [current state, setter function, clear function]
 */
export default function useDelayedState(
  delay: number = 10
): UseDelayedStateResult {
  const [state, setState] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const clearDelayedTimeout = (): void => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return clearDelayedTimeout;
  }, []);

  const setDelayedState: SetDelayedStateFunction = (
    newState: boolean,
    callback?: TimeoutCallback
  ): void => {
    clearDelayedTimeout();
    timeoutRef.current = window.setTimeout(() => {
      setState(newState);
      callback?.();
    }, delay);
  };

  return [state, setDelayedState, clearDelayedTimeout];
}