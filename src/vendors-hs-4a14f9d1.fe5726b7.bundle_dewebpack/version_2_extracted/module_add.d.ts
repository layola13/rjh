/**
 * Node structure in a linked list
 * @template T - The type of value stored in the node
 */
interface LinkedListNode<T> {
  /** The value stored in this node */
  0: T;
  /** Reference to the next node in the list */
  1?: LinkedListNode<T>;
}

/**
 * Adds an element to the end of a linked list structure
 * 
 * @template T - The type of elements in the list
 * @param value - The value to add to the list
 * 
 * @remarks
 * This method maintains a linked list using array-based nodes where:
 * - `this.h` represents the head (first node) of the list
 * - `this.q` represents the tail (last node) of the list
 * - `this.length` tracks the total number of elements
 * 
 * If the list is empty (head is null), the new node becomes the head.
 * Otherwise, it's appended after the current tail and becomes the new tail.
 */
declare function add<T>(value: T): void;

/**
 * Context interface for the add function
 * Represents a linked list data structure
 * 
 * @template T - The type of elements stored in the list
 */
interface LinkedListContext<T> {
  /** Head node of the linked list (null if empty) */
  h: LinkedListNode<T> | null;
  
  /** Tail node of the linked list */
  q: LinkedListNode<T>;
  
  /** Number of elements in the list */
  length: number;
}