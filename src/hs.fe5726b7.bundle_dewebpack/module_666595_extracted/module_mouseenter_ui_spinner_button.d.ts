/**
 * Mouse enter event handler for UI Spinner buttons.
 * 
 * Handles the mouse enter event on spinner up/down buttons.
 * Starts the spinner action and repeats it in the appropriate direction.
 * 
 * @module module_mouseenter__ui_spinner_button
 * @originalId mouseenter .ui-spinner-button
 */

/**
 * Event data passed to the mouse enter handler
 */
interface MouseEnterEvent extends Event {
  /** The current DOM element that triggered the event */
  currentTarget: HTMLElement;
}

/**
 * jQuery-like element wrapper interface
 */
interface JQueryElement {
  /** Check if element has the specified CSS class */
  hasClass(className: string): boolean;
}

/**
 * UI Spinner component interface
 */
interface UISpinnerComponent {
  /**
   * Starts the spinner action
   * @param event - The triggering mouse event
   * @returns true if the action was started successfully, false otherwise
   */
  _start(event: MouseEnterEvent): boolean;

  /**
   * Repeats the spinner action in the specified direction
   * @param _unused - Unused parameter (typically null)
   * @param direction - The direction to spin: 1 for up, -1 for down
   * @param event - The triggering mouse event
   */
  _repeat(_unused: null, direction: 1 | -1, event: MouseEnterEvent): void;
}

/**
 * jQuery selector function type
 */
type JQuerySelector = (element: HTMLElement) => JQueryElement;

/**
 * Mouse enter event handler for spinner buttons.
 * 
 * @param this - The UI Spinner component instance
 * @param event - The mouse enter event
 * @returns false if the button is already active, otherwise void
 */
declare function mouseEnterSpinnerButtonHandler(
  this: UISpinnerComponent,
  event: MouseEnterEvent
): false | void;

export { 
  mouseEnterSpinnerButtonHandler,
  UISpinnerComponent,
  MouseEnterEvent,
  JQueryElement,
  JQuerySelector
};