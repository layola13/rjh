import { useLayoutUpdateEffect } from './utils/hooks';
import { useMemoizedFn } from './hooks/useMemoizedFn';
import { useState } from './hooks/useState';

interface UseControllableStateOptions<T> {
  defaultValue?: T | (() => T);
  value?: T;
  onChange?: (newValue: T, prevValue: T) => void;
  postState?: (value: T) => T;
}

type SetState<T> = (value: T, ignoreDestroy?: boolean) => void;

function isValueDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function useControllableState<T>(
  initialValue: T | (() => T),
  options: UseControllableStateOptions<T> = {}
): [T, SetState<T>] {
  const { defaultValue, value: controlledValue, onChange, postState } = options;

  const initialState = useState<T>(() => {
    if (isValueDefined(controlledValue)) {
      return controlledValue;
    }

    if (isValueDefined(defaultValue)) {
      return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
    }

    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  });

  const [internalValue, setInternalValue] = initialState;

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const processedValue = postState ? postState(currentValue) : currentValue;

  const memoizedOnChange = useMemoizedFn(onChange);

  const prevValueRef = useState<[T]>([currentValue]);
  const [previousValues, setPreviousValues] = prevValueRef;

  useLayoutUpdateEffect(() => {
    const previousValue = previousValues[0];
    if (internalValue !== previousValue) {
      memoizedOnChange?.(internalValue, previousValue);
    }
  }, [previousValues]);

  useLayoutUpdateEffect(() => {
    if (!isValueDefined(controlledValue)) {
      setInternalValue(controlledValue as T);
    }
  }, [controlledValue]);

  const setState = useMemoizedFn((newValue: T, ignoreDestroy?: boolean) => {
    setInternalValue(newValue, ignoreDestroy);
    setPreviousValues([currentValue], ignoreDestroy);
  });

  return [processedValue, setState];
}

export default useControllableState;