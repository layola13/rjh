/**
 * Adds an element to a linked list/queue structure.
 * 
 * This method creates a new node containing the value and appends it to the end
 * of the linked list. If the list is empty (h is null), it initializes the head.
 * Otherwise, it links the new node to the previous tail and updates the tail reference.
 * 
 * @template T - The type of elements stored in the data structure
 * @param value - The value to add to the data structure
 * @returns void
 */
declare function add<T>(value: T): void;

/**
 * Represents a node in a linked list structure.
 * Each node contains a value and a reference to the next node.
 * 
 * @template T - The type of value stored in the node
 */
interface ListNode<T> {
  /** The value stored in this node (index 0) */
  0: T;
  /** Reference to the next node in the list (index 1) */
  1?: ListNode<T>;
}

/**
 * Represents a linked list or queue data structure.
 * Maintains references to the head and tail for efficient operations.
 * 
 * @template T - The type of elements stored in the list
 */
interface LinkedListContext<T> {
  /** The head (first node) of the linked list. Null if empty. */
  h: ListNode<T> | null;
  
  /** The tail (last node) of the linked list */
  q: ListNode<T>;
  
  /** The total number of elements in the list */
  length: number;
  
  /**
   * Adds an element to the end of the linked list.
   * 
   * @param value - The value to append
   */
  add(value: T): void;
}