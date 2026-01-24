/**
 * Removes and returns the first element from a linked list structure.
 * Implements a queue/linked-list pop operation that maintains both head (h) and tail (q) pointers.
 * 
 * @returns The value of the first element, or null if the list is empty
 * 
 * @remarks
 * This method modifies the internal state by:
 * - Moving the head pointer to the next node
 * - Clearing the tail pointer when the list becomes empty
 * - Decrementing the length counter
 */
declare function pop<T>(): T | null;

/**
 * Linked list node structure used internally by the pop operation.
 * Each node contains a value and a reference to the next node.
 */
interface LinkedListNode<T> {
  /** The value stored in this node (at index 0) */
  0: T;
  /** Reference to the next node in the list (at index 1), or null if this is the last node */
  1: LinkedListNode<T> | null;
}

/**
 * Context interface for the pop method.
 * Represents a queue or linked list data structure.
 */
interface QueueContext<T> {
  /** Head pointer - references the first node in the list, or null if empty */
  h: LinkedListNode<T> | null;
  /** Tail/queue pointer - references the last node in the list, or null if empty */
  q: LinkedListNode<T> | null;
  /** Current number of elements in the list */
  length: number;
}

declare module 'module_pop' {
  export { pop, LinkedListNode, QueueContext };
}