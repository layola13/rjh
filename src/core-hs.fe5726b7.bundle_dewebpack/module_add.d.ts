/**
 * Adds an item to the end of a linked list structure.
 * This method appends a new node containing the provided item to the tail of the list.
 * If the list is empty, the new node becomes both the head and tail.
 * 
 * @template T - The type of items stored in the list
 * @param item - The item to add to the list
 * @returns void
 */
declare function add<T>(item: T): void;

/**
 * Represents a node in a singly linked list.
 * 
 * @template T - The type of the item stored in the node
 */
interface LinkedListNode<T> {
  /** The data stored in this node */
  item: T;
  /** Reference to the next node in the list, or null if this is the tail */
  next: LinkedListNode<T> | null;
}

/**
 * Represents a singly linked list with head and tail references.
 * Provides O(1) insertion at the tail.
 * 
 * @template T - The type of items stored in the list
 */
interface LinkedList<T> {
  /** Reference to the first node in the list, or null if empty */
  head: LinkedListNode<T> | null;
  /** Reference to the last node in the list, or null if empty */
  tail: LinkedListNode<T> | null;
  /** Adds an item to the end of the list */
  add: (item: T) => void;
}

export { add, LinkedListNode, LinkedList };