/**
 * Comparator function type for comparing two elements in the priority queue.
 * @template T - The type of elements being compared
 * @param a - First element to compare
 * @param b - Second element to compare
 * @returns A negative number if a < b, 0 if a === b, a positive number if a > b
 */
export type ComparatorFunction<T> = (a: T, b: T) => number;

/**
 * A priority queue implementation using a binary heap data structure.
 * Elements with higher priority (as determined by the comparator) are dequeued first.
 * @template T - The type of elements stored in the priority queue
 */
export default class PriorityQueue<T> {
  /**
   * The comparator function used to determine element priority.
   * @private
   */
  private _comparator: ComparatorFunction<T>;

  /**
   * Internal array storing the heap elements.
   * @private
   */
  private _elements: T[];

  /**
   * Default comparator that handles both numbers and strings.
   * For numbers, performs arithmetic comparison.
   * For other types, converts to string and performs lexicographic comparison.
   * @param a - First element to compare
   * @param b - Second element to compare
   * @returns Comparison result: negative if a < b, 0 if equal, positive if a > b
   */
  static DEFAULT_COMPARATOR<T>(a: T, b: T): number;

  /**
   * Creates a new PriorityQueue instance.
   * @param comparator - Optional custom comparator function. If not provided, uses DEFAULT_COMPARATOR.
   */
  constructor(comparator?: ComparatorFunction<T>);

  /**
   * Checks if the priority queue is empty.
   * @returns true if the queue contains no elements, false otherwise
   */
  isEmpty(): boolean;

  /**
   * Returns the highest priority element without removing it from the queue.
   * @returns The element with the highest priority
   * @throws {Error} If the queue is empty
   */
  peek(): T;

  /**
   * Removes and returns the highest priority element from the queue.
   * @returns The element with the highest priority
   * @throws {Error} If the queue is empty
   */
  deq(): T;

  /**
   * Adds a new element to the priority queue.
   * @param element - The element to add to the queue
   * @returns The new size of the queue after insertion
   */
  enq(element: T): number;

  /**
   * Returns the number of elements in the priority queue.
   * @returns The current size of the queue
   */
  size(): number;

  /**
   * Executes a provided function once for each element in the queue.
   * Note: Elements are not guaranteed to be in priority order during iteration.
   * @param callback - Function to execute for each element
   */
  forEach(callback: (element: T, index: number, array: T[]) => void): void;

  /**
   * Compares two elements at specified indices using the comparator function.
   * @private
   * @param indexA - Index of the first element
   * @param indexB - Index of the second element
   * @returns Comparison result from the comparator
   */
  private _compare(indexA: number, indexB: number): number;

  /**
   * Swaps two elements at the specified indices in the internal array.
   * @private
   * @param indexA - Index of the first element
   * @param indexB - Index of the second element
   */
  private _swap(indexA: number, indexB: number): void;
}