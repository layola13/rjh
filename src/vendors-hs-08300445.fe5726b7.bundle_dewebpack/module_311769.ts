import { useRef } from 'react';

/**
 * Custom hook that memoizes a value based on a condition
 * @template T - The type of the memoized value
 * @template C - The type of the condition
 * @param factory - Function that creates the value
 * @param condition - Condition to determine when to recompute
 * @param comparator - Function to compare conditions
 * @returns The memoized value
 */
export default function useConditionalMemo<T, C>(
  factory: () => T,
  condition: C,
  comparator: (prev: C, next: C) => boolean
): T {
  const cache = useRef<{
    value?: T;
    condition?: C;
  }>({});

  if (!('value' in cache.current) || !comparator(cache.current.condition as C, condition)) {
    cache.current.value = factory();
    cache.current.condition = condition;
  }

  return cache.current.value as T;
}