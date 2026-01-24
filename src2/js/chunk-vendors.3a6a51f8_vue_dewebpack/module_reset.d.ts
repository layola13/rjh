/**
 * Module: module_reset
 * Resets the state object by clearing groups array and resetting min/max values
 */

/**
 * State object interface containing groups and boundary values
 */
interface ResetState {
  /** Collection of grouped items */
  groups: unknown[];
  /** Minimum boundary value, -1 indicates unset */
  min: number;
  /** Maximum boundary value, -1 indicates unset */
  max: number;
}

/**
 * Resets the provided state object to initial values
 * - Clears the groups array
 * - Sets min and max to -1 (unset state)
 * 
 * @param state - The state object to reset
 */
declare function reset(state: ResetState): void;

export { reset, ResetState };