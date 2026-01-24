/**
 * Custom React hook for memoizing values based on a custom comparison function.
 * Similar to useMemo but allows custom equality checks for dependencies.
 * 
 * @template T - The type of the memoized value
 * @template C - The type of the condition/dependency value
 * 
 * @param factory - Factory function that computes the memoized value
 * @param condition - The condition/dependency value to compare
 * @param comparator - Custom comparison function that returns true if conditions are equal
 * @returns The memoized value
 * 
 * @example
 *