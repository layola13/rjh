/**
 * A binary heap data structure implementation that maintains elements in a priority order
 * based on a custom scoring function. Lower scores have higher priority.
 * 
 * @template T The type of elements stored in the heap
 */
export declare class BinaryHeap<T> {
  /**
   * Internal array storing the heap elements
   */
  private content: T[];

  /**
   * Function that computes the priority score for each element.
   * Lower scores indicate higher priority.
   */
  private scoreFunction: (element: T) => number;

  /**
   * Creates a new BinaryHeap instance
   * 
   * @param scoreFunction - Function that returns a numeric score for each element.
   *                        Elements with lower scores have higher priority.
   */
  constructor(scoreFunction: (element: T) => number);

  /**
   * Adds an element to the heap and maintains heap property
   * 
   * @param element - The element to add to the heap
   */
  push(element: T): void;

  /**
   * Removes and returns the element with the lowest score (highest priority)
   * 
   * @returns The element with the highest priority
   * @throws {Error} If the heap is empty
   */
  pop(): T;

  /**
   * Returns the element with the lowest score without removing it
   * 
   * @returns The element with the highest priority
   */
  peek(): T;

  /**
   * Removes a specific element from the heap
   * 
   * @param element - The element to remove
   * @throws {Error} If the element is not found in the heap
   */
  remove(element: T): void;

  /**
   * Returns the number of elements in the heap
   * 
   * @returns The current size of the heap
   */
  size(): number;

  /**
   * Moves an element up the heap tree to maintain heap property.
   * Used internally after insertion.
   * 
   * @param index - The index of the element to bubble up
   */
  private bubbleUp(index: number): void;

  /**
   * Moves an element down the heap tree to maintain heap property.
   * Used internally after removal.
   * 
   * @param index - The index of the element to sink down
   */
  private sinkDown(index: number): void;
}

export default BinaryHeap;