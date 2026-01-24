/**
 * Module: module_mousedown__ui_spinner_button
 * Original ID: mousedown .ui-spinner-button
 * 
 * Handles mousedown events on UI spinner buttons (increment/decrement controls).
 * Manages focus state, event handling, and initiates value change repeating.
 */

/**
 * Represents a UI element with jQuery-like properties
 */
interface UIElement {
  /** The DOM element array */
  element: HTMLElement[];
  /** The document reference */
  document: Document[];
  /** Previous value stored for restoration */
  previous?: string;
  /** Flag to cancel blur event handling */
  cancelBlur?: boolean;
  
  /**
   * Focuses the element
   */
  focus(): void;
  
  /**
   * Gets the current value of the element
   */
  val(): string;
  
  /**
   * Delays execution of a callback
   * @param callback - Function to execute after delay
   */
  _delay(callback: () => void): void;
  
  /**
   * Starts the spinner value change
   * @param event - The triggering mouse event
   * @returns false if start is prevented, otherwise true
   */
  _start(event: MouseEvent): boolean;
  
  /**
   * Repeats the value change action
   * @param unusedParam - Unused parameter (null in this context)
   * @param direction - Direction of change: 1 for increment, -1 for decrement
   * @param event - The triggering mouse event
   */
  _repeat(unusedParam: null, direction: 1 | -1, event: MouseEvent): void;
}

/**
 * jQuery-like element selector result
 */
interface JQueryElement {
  /**
   * Checks if element has specified CSS class
   * @param className - The class name to check
   */
  hasClass(className: string): boolean;
}

/**
 * Direction constants for spinner button actions
 */
const SPINNER_DIRECTION = {
  UP: 1,
  DOWN: -1
} as const;

/**
 * CSS class name for the spinner up button
 */
const CSS_CLASS_SPINNER_UP = "ui-spinner-up";

/**
 * Handles mousedown event on spinner buttons.
 * Manages element focus, stores previous value, and initiates repeated value changes.
 * 
 * @param this - The UI spinner context
 * @param event - The mousedown event object
 * @param elementSelector - jQuery-like selector function for getting the current target
 */
declare function handleSpinnerButtonMousedown(
  this: UIElement,
  event: MouseEvent,
  elementSelector: (target: EventTarget) => JQueryElement
): void;

/**
 * Internal function to set focus on the spinner element if not already focused
 * @param this - The UI spinner context
 * @param storedPreviousValue - The previously stored value to restore
 */
declare function setFocusIfNeeded(
  this: UIElement,
  storedPreviousValue: string | undefined
): void;