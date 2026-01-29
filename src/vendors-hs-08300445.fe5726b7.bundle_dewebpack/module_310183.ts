import { useRef, useState, useEffect } from 'react';

type StateUpdater<T> = (prevState: T) => T;

interface LayoutState<T> {
  current: T;
  update: (updater: StateUpdater<T>) => void;
}

export function useLayoutState<T>(initialState: T): [T, (updater: StateUpdater<T>) => void] {
  const stateRef = useRef<T>(initialState);
  const [, forceUpdate] = useState({});
  const promiseRef = useRef<Promise<void> | null>(null);
  const updatersQueue = useRef<StateUpdater<T>[]>([]);

  useEffect(() => {
    return () => {
      promiseRef.current = null;
    };
  }, []);

  const queueUpdate = (updater: StateUpdater<T>): void => {
    updatersQueue.current.push(updater);
    const newPromise = Promise.resolve();
    promiseRef.current = newPromise;

    newPromise.then(() => {
      if (promiseRef.current === newPromise) {
        const pendingUpdaters = updatersQueue.current;
        const previousState = stateRef.current;
        updatersQueue.current = [];

        pendingUpdaters.forEach((updaterFn) => {
          stateRef.current = updaterFn(stateRef.current);
        });

        promiseRef.current = null;

        if (previousState !== stateRef.current) {
          forceUpdate({});
        }
      }
    });
  };

  return [stateRef.current, queueUpdate];
}

const TIMEOUT_DURATION = 100;

export function useTimeoutLock<T>(initialValue?: T | null): [
  (value: T) => void,
  () => T | null
] {
  const lockedValueRef = useRef<T | null>(initialValue ?? null);
  const timeoutIdRef = useRef<number | undefined>();

  const clearTimeoutSafe = (): void => {
    window.clearTimeout(timeoutIdRef.current);
  };

  useEffect(() => {
    return clearTimeoutSafe;
  }, []);

  const lock = (value: T): void => {
    lockedValueRef.current = value;
    clearTimeoutSafe();
    timeoutIdRef.current = window.setTimeout(() => {
      lockedValueRef.current = null;
      timeoutIdRef.current = undefined;
    }, TIMEOUT_DURATION);
  };

  const getValue = (): T | null => {
    return lockedValueRef.current;
  };

  return [lock, getValue];
}