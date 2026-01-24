/**
 * Module: module_value
 * Original module ID: value
 * 
 * This module appears to contain a method that updates spinning state.
 */

/**
 * Interface representing an object with spinning update capability
 */
interface SpinningUpdatable {
  /**
   * Updates the spinning state or animation
   * @returns void
   */
  updateSpinning(): void;
}

/**
 * A function that updates the spinning state on the current context
 * Must be called with appropriate `this` binding to an object with `updateSpinning` method
 * @this {SpinningUpdatable}
 * @returns void
 */
declare function updateSpinningHandler(this: SpinningUpdatable): void;

export type { SpinningUpdatable };
export { updateSpinningHandler };