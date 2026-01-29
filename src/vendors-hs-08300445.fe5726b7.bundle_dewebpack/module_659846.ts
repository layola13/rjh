import { useRef, useState, useEffect } from 'react';

interface UseBatchedStateUpdate<T> {
  (initialValue: T): [T, (update: Partial<T>) => void];
}

interface DebounceFunction {
  (callback: () => void): number | NodeJS.Timeout;
  cancel: (id: number | NodeJS.Timeout) => void;
}

declare const debounce: DebounceFunction;

export default function useBatchedState<T extends Record<string, any>>(
  initialValue: T
): [T, (update: Partial<T>) => void] {
  const debounceTimerRef = useRef<number | NodeJS.Timeout | null>(null);
  const [state, setState] = useState<T>(initialValue);
  const pendingUpdatesRef = useRef<Partial<T>[]>([]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        debounce.cancel(debounceTimerRef.current);
      }
    };
  }, []);

  const batchedSetState = (update: Partial<T>): void => {
    if (debounceTimerRef.current === null) {
      pendingUpdatesRef.current = [];
      debounceTimerRef.current = debounce(() => {
        setState((currentState: T) => {
          let nextState = currentState;
          pendingUpdatesRef.current.forEach((pendingUpdate) => {
            nextState = { ...nextState, ...pendingUpdate };
          });
          debounceTimerRef.current = null;
          return nextState;
        });
      });
    }
    pendingUpdatesRef.current.push(update);
  };

  return [state, batchedSetState];
}