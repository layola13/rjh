import { useState, useRef } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

type BatchCallback = () => void;
type SetStateAction<T> = T | ((prevState: T) => T);
type BatchedSetState<T> = (value: SetStateAction<T>) => void;

/**
 * Custom hook that provides batched state updates
 * @param batcher - Function that batches multiple state updates
 * @param initialValue - Initial state value
 * @returns Tuple of current state and batched setter function
 */
export default function useBatchedState<T>(
  batcher: (callback: () => void) => void,
  initialValue: T
): [T, BatchedSetState<T>] {
  const [state, setState] = useState<T>(initialValue);

  const batchedSetState = (newValue: SetStateAction<T>): void => {
    batcher(() => {
      setState(newValue);
    });
  };

  return [state, batchedSetState];
}

/**
 * Hook that creates a batcher function for React state updates
 * Batches multiple synchronous updates into a single render cycle
 * @returns Batcher function that queues callbacks
 */
export function useBatcher(): (callback: BatchCallback) => void {
  const queueRef = useRef<BatchCallback[] | null>(null);

  return (callback: BatchCallback): void => {
    if (!queueRef.current) {
      queueRef.current = [];
      
      queueMicrotask(() => {
        unstable_batchedUpdates(() => {
          queueRef.current?.forEach((queuedCallback) => {
            queuedCallback();
          });
          queueRef.current = null;
        });
      });
    }
    
    queueRef.current.push(callback);
  };
}