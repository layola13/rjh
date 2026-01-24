/**
 * Resets the state of a target object by clearing its groups array
 * and resetting its min/max values to -1
 * 
 * @param t - The target object to reset
 */
declare function module_reset(t: {
  /** Array of groups to be cleared on reset */
  groups: unknown[];
  /** Minimum value, reset to -1 */
  min: number;
  /** Maximum value, reset to -1 */
  max: number;
}): void;

export default module_reset;