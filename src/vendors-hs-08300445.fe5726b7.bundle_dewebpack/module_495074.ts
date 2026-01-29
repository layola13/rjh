import { useRef, useState, useEffect } from 'react';

type SetStateCallback<T> = (value: T, shouldSkipIfUnmounted?: boolean) => void;

export default function useSafeState<T>(initialValue: T): [T, SetStateCallback<T>] {
  const isUnmountedRef = useRef<boolean>(false);
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    isUnmountedRef.current = false;
    
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  const safeSetState: SetStateCallback<T> = (value: T, shouldSkipIfUnmounted?: boolean) => {
    if (shouldSkipIfUnmounted && isUnmountedRef.current) {
      return;
    }
    setState(value);
  };

  return [state, safeSetState];
}