/**
 * Module: module_12
 * Original ID: 12
 * 
 * Sets the state for a tagged element with substitution data.
 */

/**
 * Tagged element with substitution information
 */
interface TaggedElement {
  /** The tag identifier */
  tag: string | number;
  /** The substitution value to apply */
  substitution: unknown;
}

/**
 * State manager interface
 */
interface StateManager {
  /**
   * Updates the state for a given tag with a substitution value
   * @param tag - The tag identifier
   * @param substitution - The value to substitute
   */
  setState(tag: string | number, substitution: unknown): void;
}

/**
 * Collection of state managers indexed by key
 */
type StateManagerCollection = Record<string | number, StateManager>;

/**
 * Sets the state on a specific state manager within a collection
 * @param element - The tagged element containing tag and substitution data
 * @param collection - The collection of state managers
 * @param key - The key to identify which state manager to use
 */
declare function setStateFromTag(
  element: TaggedElement,
  collection: StateManagerCollection,
  key: string | number
): void;

export type { TaggedElement, StateManager, StateManagerCollection };
export { setStateFromTag };