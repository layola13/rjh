/**
 * A simple queue data structure implementing FIFO (First In, First Out) behavior.
 * Uses a singly linked list to efficiently add items to the tail and retrieve from the head.
 */
export default class Queue<T> {
  /**
   * Pointer to the first node in the queue.
   * Null when the queue is empty.
   */
  private head: QueueNode<T> | null;

  /**
   * Pointer to the last node in the queue.
   * Null when the queue is empty.
   */
  private tail: QueueNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
   * Adds an item to the end of the queue.
   * Time complexity: O(1)
   * 
   * @param item - The item to enqueue
   */
  add(item: T): void {
    const node: QueueNode<T> = {
      item,
      next: null
    };

    const currentTail = this.tail;
    
    if (currentTail) {
      currentTail.next = node;
    } else {
      this.head = node;
    }
    
    this.tail = node;
  }

  /**
   * Retrieves and removes the first item from the queue.
   * Time complexity: O(1)
   * 
   * @returns The item at the front of the queue, or undefined if empty
   */
  get(): T | undefined {
    const currentHead = this.head;
    
    if (!currentHead) {
      return undefined;
    }

    this.head = currentHead.next;
    
    if (this.head === null) {
      this.tail = null;
    }

    return currentHead.item;
  }
}

/**
 * Internal node structure for the linked list queue implementation.
 */
interface QueueNode<T> {
  /** The data stored in this node */
  item: T;
  
  /** Reference to the next node, or null if this is the tail */
  next: QueueNode<T> | null;
}