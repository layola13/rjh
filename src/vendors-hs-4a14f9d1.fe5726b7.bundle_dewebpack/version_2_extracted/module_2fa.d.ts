/**
 * Comparator function type for comparing two elements
 * @template T The type of elements to compare
 * @param a First element to compare
 * @param b Second element to compare
 * @returns Negative if a < b, 0 if a === b, positive if a > b
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Priority Queue implementation using a binary heap
 * Elements with higher priority (based on comparator) are dequeued first
 * @template T The type of elements stored in the queue
 */
export default class PriorityQueue<T> {
  /**
   * Default comparator for numeric and string comparisons
   * Numbers are compared numerically, other types are compared as strings
   */
  static readonly DEFAULT_COMPARATOR: Comparator<any>;

  /**
   * Comparator function used to determine element priority
   * @private
   */
  private readonly _comparator: Comparator<T>;

  /**
   * Internal array storing queue elements in heap order
   * @private
   */
  private _elements: T[];

  /**
   * Creates a new PriorityQueue instance
   * @param comparator Optional comparator function. If not provided, uses DEFAULT_COMPARATOR
   */
  constructor(comparator?: Comparator<T>);

  /**
   * Checks if the queue is empty
   * @returns true if the queue has no elements, false otherwise
   */
  isEmpty(): boolean;

  /**
   * Returns the highest priority element without removing it
   * @throws Error if the queue is empty
   * @returns The element with highest priority
   */
  peek(): T;

  /**
   * Removes and returns the highest priority element
   * Maintains heap property by reorganizing remaining elements
   * @throws Error if the queue is empty
   * @returns The element with highest priority
   */
  deq(): T;

  /**
   * Adds an element to the queue
   * Maintains heap property by bubbling up the new element
   * @param element The element to add to the queue
   * @returns The new size of the queue
   */
  enq(element: T): number;

  /**
   * Returns the number of elements in the queue
   * @returns The queue size
   */
  size(): number;

  /**
   * Executes a callback function for each element in the queue
   * Note: Iteration order is heap order, not priority order
   * @param callback Function to execute for each element
   */
  forEach(callback: (element: T, index: number, array: T[]) => void): void;

  /**
   * Compares two elements by their indices using the comparator
   * @private
   * @param indexA Index of first element
   * @param indexB Index of second element
   * @returns Comparison result from comparator
   */
  private _compare(indexA: number, indexB: number): number;

  /**
   * Swaps two elements in the internal array
   * @private
   * @param indexA Index of first element
   * @param indexB Index of second element
   */
  private _swap(indexA: number, indexB: number): void;
}