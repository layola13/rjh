/**
 * A simple queue data structure implementing FIFO (First-In-First-Out) pattern.
 * Uses a singly linked list for efficient O(1) enqueue and dequeue operations.
 */
export default class Queue<T> {
  /**
   * Pointer to the first node in the queue.
   * null when the queue is empty.
   */
  private head: QueueNode<T> | null;

  /**
   * Pointer to the last node in the queue.
   * null when the queue is empty.
   */
  private tail: QueueNode<T> | null;

  /**
   * Creates a new empty queue.
   */
  constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
   * Adds an item to the end of the queue (enqueue operation).
   * 
   * @param item - The item to add to the queue
   * @returns void
   * 
   * @example
   *