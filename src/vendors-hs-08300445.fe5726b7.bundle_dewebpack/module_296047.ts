import { useRef, useState, useEffect } from 'react';

type SetStateCallback<T> = (value: T, skipIfUnmounted?: boolean) => void;

/**
 * A custom hook that provides safe state updates, preventing state changes on unmounted components.
 * @param initialValue - The initial state value
 * @returns A tuple containing the current state and a setter function that checks mount status
 */
export default function useSafeState<T>(initialValue: T): [T, SetStateCallback<T>] {
  const isMountedRef = useRef<boolean>(false);
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    isMountedRef.current = false;
    return () => {
      isMountedRef.current = true;
    };
  }, []);

  const setSafeState: SetStateCallback<T> = (value: T, skipIfUnmounted?: boolean): void => {
    if (skipIfUnmounted && isMountedRef.current) {
      return;
    }
    setState(value);
  };

  return [state, setSafeState];
}