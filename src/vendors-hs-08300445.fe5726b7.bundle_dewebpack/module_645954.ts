import { useRef } from 'react';

type ConditionCompareFn<T> = (prev: T | undefined, current: T) => boolean;

interface CacheRef<T, C> {
  value?: T;
  condition?: C;
}

export default function useMemoizedValue<T, C>(
  getValue: () => T,
  condition: C,
  shouldUpdate: ConditionCompareFn<C>
): T {
  const cache = useRef<CacheRef<T, C>>({});

  if (
    !('value' in cache.current) ||
    shouldUpdate(cache.current.condition, condition)
  ) {
    cache.current.value = getValue();
    cache.current.condition = condition;
  }

  return cache.current.value as T;
}