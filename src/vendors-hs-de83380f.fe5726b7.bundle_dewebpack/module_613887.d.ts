/**
 * A generic tuple or pair class that holds two values.
 * Commonly used for key-value pairs or coordinate systems.
 * 
 * @template V - Type of the first value
 * @template K - Type of the second value
 */
declare class Pair<V = unknown, K = unknown> {
  /**
   * The first value in the pair.
   */
  v: V;

  /**
   * The second value in the pair.
   */
  k: K;

  /**
   * Creates a new Pair instance.
   * 
   * @param firstValue - The first value to store
   * @param secondValue - The second value to store
   */
  constructor(firstValue: V, secondValue: K);
}

export default Pair;
export { Pair };