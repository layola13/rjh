import { useState, useEffect, useRef } from 'react';
import raf from 'raf';

type StateUpdater<T> = (prevState: T) => T;

interface UseBatchedStateResult<T> {
  state: T;
  batchedSetState: (updater: StateUpdater<T>) => void;
}

/**
 * A custom hook that batches multiple state updates into a single render cycle using requestAnimationFrame.
 * 
 * @param initialState - The initial state value
 * @returns A tuple containing the current state and a batched setState function
 */
export default function useBatchedState<T>(initialState: T): [T, (updater: StateUpdater<T>) => void] {
  const [state, setState] = useState<T>(initialState);
  const rafIdRef = useRef<number | null>(null);
  const updatersQueueRef = useRef<Array<StateUpdater<T>>>([]);
  const isUnmountedRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
      if (rafIdRef.current !== null) {
        raf.cancel(rafIdRef.current);
      }
    };
  }, []);

  const batchedSetState = (updater: StateUpdater<T>): void => {
    if (isUnmountedRef.current) {
      return;
    }

    if (rafIdRef.current === null) {
      updatersQueueRef.current = [];
      rafIdRef.current = raf(() => {
        rafIdRef.current = null;
        setState((prevState: T) => {
          let nextState = prevState;
          updatersQueueRef.current.forEach((queuedUpdater: StateUpdater<T>) => {
            nextState = queuedUpdater(nextState);
          });
          return nextState;
        });
      });
    }

    updatersQueueRef.current.push(updater);
  };

  return [state, batchedSetState];
}