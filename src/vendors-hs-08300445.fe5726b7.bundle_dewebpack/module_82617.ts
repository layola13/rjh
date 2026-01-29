import { useState, useRef } from 'react';

type SetStateAction<T> = T | ((prevState: T) => T);

type OnChangeCallback<T> = (newValue: T, oldValue: T) => void;

export default function useControlledState<T>(
  initialValue: T,
  onChange: OnChangeCallback<T>
): [T, (action: SetStateAction<T>) => void] {
  const valueRef = useRef<T>(initialValue);
  const [, forceUpdate] = useState({});

  const setValue = (action: SetStateAction<T>): void => {
    const newValue = typeof action === 'function' 
      ? (action as (prevState: T) => T)(valueRef.current) 
      : action;

    if (newValue !== valueRef.current) {
      onChange(newValue, valueRef.current);
    }

    valueRef.current = newValue;
    forceUpdate({});
  };

  return [valueRef.current, setValue];
}