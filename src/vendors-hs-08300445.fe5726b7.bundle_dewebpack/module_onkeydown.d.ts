/**
 * Keyboard event handler for Space and Enter key presses
 * 
 * Handles keyboard interactions by checking if the pressed key is either
 * SPACE or ENTER, preventing the default browser behavior, and triggering
 * a callback function.
 * 
 * @module module_onKeyDown
 * @originalId onKeyDown
 */

/**
 * Key code constants for keyboard interactions
 */
interface KeyCodes {
  /** Space bar key code (32) */
  SPACE: number;
  /** Enter key code (13) */
  ENTER: number;
}

/**
 * Keyboard event handler function type
 * 
 * @param event - The keyboard event object from the browser
 * @returns void
 */
type KeyDownHandler = (event: KeyboardEvent) => void;

/**
 * Callback function type triggered when valid keys are pressed
 * 
 * @param event - The keyboard event that triggered the callback
 * @returns void
 */
type KeyDownCallback = (event: KeyboardEvent) => void;

/**
 * Handles keydown events for Space and Enter keys
 * 
 * When either the Space or Enter key is pressed:
 * - Prevents the default browser behavior
 * - Executes the provided callback function
 * 
 * @param event - The keyboard event from the browser
 * @param keyCodes - Object containing SPACE and ENTER key code constants
 * @param callback - Function to execute when Space or Enter is pressed
 */
declare function onKeyDown(
  event: KeyboardEvent,
  keyCodes: KeyCodes,
  callback: KeyDownCallback
): void;

export { KeyCodes, KeyDownHandler, KeyDownCallback, onKeyDown };