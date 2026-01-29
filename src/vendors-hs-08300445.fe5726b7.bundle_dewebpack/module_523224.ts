import { useRef, useState, useEffect } from 'react';
import rafSchd from 'raf-schd';

type StateUpdater<T> = (prevState: T) => T;

interface RafStateReturn<T> {
  current: T;
  setState: (updater: StateUpdater<T>) => void;
}

/**
 * Hook that batches state updates using requestAnimationFrame
 * @param initialState - Initial state value or factory function
 * @returns Tuple of [currentState, setState]
 */
export function useRafState<T>(
  initialState: T | (() => T)
): [T, (updater: StateUpdater<T>) => void] {
  const updatersQueue = useRef<Array<StateUpdater<T>>>([]);
  const [, forceUpdate] = useState({});
  const stateRef = useRef<T>(
    typeof initialState === 'function' 
      ? (initialState as () => T)() 
      : initialState
  );

  const flushUpdates = useRafScheduler(() => {
    let nextState = stateRef.current;
    updatersQueue.current.forEach((updater) => {
      nextState = updater(nextState);
    });
    updatersQueue.current = [];
    stateRef.current = nextState;
    forceUpdate({});
  });

  return [
    stateRef.current,
    (updater: StateUpdater<T>) => {
      updatersQueue.current.push(updater);
      flushUpdates();
    }
  ];
}

/**
 * Creates a function that schedules execution using requestAnimationFrame
 * @param callback - Function to be scheduled
 * @returns Scheduled function that can be called multiple times
 */
export default function useRafScheduler<T extends (...args: any[]) => void>(
  callback: T
): (...args: Parameters<T>) => void {
  const rafHandle = useRef<number | undefined>();
  const isUnmounted = useRef(false);

  useEffect(() => {
    return () => {
      isUnmounted.current = true;
      rafSchd.cancel(rafHandle.current);
    };
  }, []);

  return (...args: Parameters<T>) => {
    if (isUnmounted.current) return;

    rafSchd.cancel(rafHandle.current);
    rafHandle.current = rafSchd(() => {
      callback(...args);
    });
  };
}