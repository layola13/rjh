import { useRef, useEffect } from 'react';
import rafDefault from './raf';
import useForceUpdateDefault from './useForceUpdate';

interface RafCancelFunction {
  cancel: (id: number | undefined) => void;
}

const raf: typeof rafDefault & RafCancelFunction = rafDefault as any;

export default function useDelayedValue<T>(
  initialValue: T,
  delayedValue: T
): [() => T, (newValue: T) => void] {
  const valueRef = useRef<T>(initialValue);
  const forceUpdate = useForceUpdateDefault();
  const rafIdRef = useRef<number | undefined>();

  function updateValue(newValue: T): void {
    valueRef.current = newValue;
    forceUpdate();
  }

  function cancelRaf(): void {
    raf.cancel(rafIdRef.current);
  }

  useEffect(() => {
    if (delayedValue !== undefined) {
      cancelRaf();
      rafIdRef.current = raf(() => {
        updateValue(delayedValue);
      });
    }
  }, [delayedValue]);

  useEffect(() => {
    return () => {
      cancelRaf();
    };
  }, []);

  const getValue = (useDelayed?: boolean): T => {
    if (useDelayed) {
      return delayedValue ?? valueRef.current;
    }
    return valueRef.current;
  };

  return [getValue, updateValue];
}