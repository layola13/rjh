/**
 * Module: module_12
 * Handles state management for tag substitutions
 */

/**
 * Tag substitution configuration object
 */
interface TagSubstitution {
  /** The tag identifier */
  tag: string;
  /** The substitution value or content */
  substitution: unknown;
}

/**
 * State manager interface with setState capability
 */
interface StateManager {
  /**
   * Sets the state for a given tag with a substitution value
   * @param tag - The tag identifier
   * @param substitution - The substitution value
   */
  setState(tag: string, substitution: unknown): void;
}

/**
 * Applies a tag substitution to a state manager
 * @param config - The tag substitution configuration
 * @param managers - Array or collection of state managers
 * @param index - The index of the target state manager
 */
declare function applyTagSubstitution(
  config: TagSubstitution,
  managers: StateManager[] | Record<string | number, StateManager>,
  index: string | number
): void;

export { TagSubstitution, StateManager, applyTagSubstitution };