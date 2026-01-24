/**
 * Module: module_11
 * Handles state management for tagged substitutions
 */

/**
 * Represents an item with tag and substitution data
 */
interface TaggedItem {
  /** The tag identifier */
  tag: string | number;
  /** The substitution value to be set */
  substitution: unknown;
}

/**
 * Represents an object with setState capability
 */
interface Stateful {
  /**
   * Sets the state for a given tag
   * @param tag - The tag identifier
   * @param substitution - The value to substitute
   */
  setState(tag: string | number, substitution: unknown): void;
}

/**
 * Sets state on a target object using tag and substitution from source item
 * @param item - The source item containing tag and substitution
 * @param targets - Array or collection of stateful objects
 * @param index - The index of the target object to update
 */
declare function setTaggedState(
  item: TaggedItem,
  targets: Stateful[] | Record<string | number, Stateful>,
  index: string | number
): void;

export { TaggedItem, Stateful, setTaggedState };