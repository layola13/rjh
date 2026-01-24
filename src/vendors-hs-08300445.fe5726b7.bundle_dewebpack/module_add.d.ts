/**
 * Module: module_add
 * Original ID: add
 * 
 * Adds an element to a collection at a specified position and manages associated keys.
 * If the position is valid, inserts the element at that index; otherwise appends to the end.
 */

/**
 * State interface for managing collection keys and unique identifiers
 */
interface CollectionState {
  /** Array of keys corresponding to collection items */
  keys: number[];
  /** Auto-incrementing identifier for new items */
  id: number;
}

/**
 * Adds an item to the collection at the specified position.
 * 
 * @param element - The element to be added to the collection
 * @param targetIndex - The zero-based index where the element should be inserted.
 *                      If out of bounds, the element is appended to the end.
 * @param state - The collection state object containing keys and current ID
 * @param getCurrentCollection - Function that returns the current collection array
 * @param updateCollection - Function that updates the collection with new array
 * 
 * @remarks
 * - Automatically assigns a unique ID to the inserted element
 * - Increments the state ID counter after each insertion
 * - Maintains key-element synchronization
 */
declare function add<T>(
  element: T,
  targetIndex: number,
  state: CollectionState,
  getCurrentCollection: () => T[],
  updateCollection: (newCollection: T[]) => void
): void;

export default add;