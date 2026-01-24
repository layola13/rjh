/**
 * Removes and returns the first element from a linked list structure.
 * Implements a queue-like pop operation from the head of the list.
 * 
 * @returns The data stored in the first node, or null if the list is empty
 * 
 * @remarks
 * This method mutates the internal state by:
 * - Moving the head pointer to the next node
 * - Clearing the tail pointer if the list becomes empty
 * - Decrementing the length counter
 */
declare function pop<T = unknown>(this: LinkedListQueue<T>): T | null;

/**
 * Represents a linked list-based queue data structure.
 * 
 * @template T - The type of data stored in queue nodes
 */
interface LinkedListQueue<T> {
  /**
   * Pointer to the head (first) node of the linked list.
   * Null if the queue is empty.
   */
  h: LinkedListNode<T> | null;

  /**
   * Pointer to the tail (last) node of the linked list.
   * Null if the queue is empty.
   */
  q: LinkedListNode<T> | null;

  /**
   * Current number of elements in the queue.
   */
  length: number;
}

/**
 * Represents a node in a singly-linked list.
 * 
 * @template T - The type of data stored in the node
 * 
 * @remarks
 * Uses a tuple structure where:
 * - Index 0: The data payload
 * - Index 1: Reference to the next node (or null if this is the tail)
 */
type LinkedListNode<T> = [data: T, next: LinkedListNode<T> | null];