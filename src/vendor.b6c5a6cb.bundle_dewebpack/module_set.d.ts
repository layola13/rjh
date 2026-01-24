/**
 * Manages window resize event listeners and triggers resize handling.
 * This method updates the resize target and controls event listener lifecycle.
 * 
 * @param target - The new resize target element or configuration. 
 *                 When truthy, enables resize listening; when falsy, disables it.
 */
function handleResize(target: HTMLElement | boolean | null): void;

/**
 * Type definition for a class that manages window resize behavior
 */
interface ResizeManager {
  /**
   * Internal reference to the current resize target.
   * Stores the element or configuration that should respond to resize events.
   */
  _resizeTo?: HTMLElement | boolean | null;

  /**
   * Bound resize handler function.
   * This method is called when the window resize event fires.
   */
  resize: () => void;

  /**
   * Updates the resize target and manages event listeners accordingly.
   * 
   * @param target - The new resize target. When provided (truthy), the resize
   *                 listener is activated. When null/false, the listener is removed.
   * 
   * @remarks
   * - Always removes existing resize listener before updating
   * - Only adds new listener if target is truthy
   * - Immediately triggers resize when listener is added
   */
  handleResize(target: HTMLElement | boolean | null): void;
}