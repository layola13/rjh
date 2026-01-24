/**
 * Custom React hook for conditional memoization
 * Caches a computed value and only recomputes when a condition changes
 * 
 * @module ConditionalMemo
 */

import { useRef } from 'react';

/**
 * Comparison function to determine if the condition has changed
 * @param prevCondition - Previously stored condition value
 * @param currentCondition - Current condition value
 * @returns True if conditions are equal, false otherwise
 */
type ConditionComparator<T> = (prevCondition: T, currentCondition: T) => boolean;

/**
 * Cache structure storing the computed value and condition
 * @template TValue - Type of the cached value
 * @template TCondition - Type of the condition
 */
interface MemoCache<TValue, TCondition> {
  /** Cached computed value */
  value?: TValue;
  /** Condition under which the value was computed */
  condition?: TCondition;
}

/**
 * Conditionally memoizes a computed value based on a custom condition
 * 
 * Recomputes the value only when:
 * - No cached value exists
 * - The condition has changed according to the comparator
 * 
 * @template TValue - Type of the value returned by the factory function
 * @template TCondition - Type of the condition to track
 * 
 * @param factory - Function that computes the value to be cached
 * @param condition - Current condition value to compare against
 * @param comparator - Function to determine if conditions are equal
 * 
 * @returns The cached or newly computed value
 * 
 * @example
 * const expensiveResult = useConditionalMemo(
 *   () => computeExpensiveValue(data),
 *   data.id,
 *   (prev, curr) => prev === curr
 * );
 */
export default function useConditionalMemo<TValue, TCondition>(
  factory: () => TValue,
  condition: TCondition,
  comparator: ConditionComparator<TCondition>
): TValue {
  const cache = useRef<MemoCache<TValue, TCondition>>({});

  // Recompute if no cached value exists or condition has changed
  if (
    !('value' in cache.current) ||
    !comparator(cache.current.condition as TCondition, condition)
  ) {
    cache.current.value = factory();
    cache.current.condition = condition;
  }

  return cache.current.value as TValue;
}