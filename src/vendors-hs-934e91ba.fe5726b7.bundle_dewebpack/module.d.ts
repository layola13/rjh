/**
 * Factory function for creating instances of class I
 * @template T1 - Type of the first parameter
 * @template T2 - Type of the second parameter
 * @param A - First constructor argument
 * @param t - Second constructor argument
 * @returns A new instance of class I
 */
declare function module__<T1 = unknown, T2 = unknown>(
  A: T1,
  t: T2
): I<T1, T2>;

/**
 * Class I - Exact definition depends on the original implementation
 */
declare class I<T1 = unknown, T2 = unknown> {
  constructor(A: T1, t: T2);
}