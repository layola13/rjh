/**
 * Represents a node in a linked list/queue structure
 * @template T The type of elements stored in the queue
 */
interface QueueNode<T> {
  /** The element stored in this node */
  0: T;
  /** Reference to the next node in the queue */
  1?: QueueNode<T>;
}

/**
 * A queue data structure implementation using linked list
 * @template T The type of elements stored in the queue
 */
declare class Queue<T> {
  /** Head node of the queue (first element) */
  private h: QueueNode<T> | null;
  
  /** Tail node of the queue (last element) */
  private q: QueueNode<T>;
  
  /** Current number of elements in the queue */
  length: number;

  /**
   * Adds an element to the end of the queue
   * @param element - The element to add to the queue
   * @returns void
   */
  add(element: T): void;
}

export default Queue;
export { Queue, QueueNode };