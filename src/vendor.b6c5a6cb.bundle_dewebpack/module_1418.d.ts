/**
 * Bootstrap Dropdown Plugin
 * Provides dropdown menu functionality with keyboard navigation and accessibility features
 * @module BootstrapDropdown
 * @version 3.3.7
 */

/** Selector for dropdown toggle elements */
type DropdownToggleSelector = '[data-toggle="dropdown"]';

/** Keyboard key codes used for dropdown navigation */
enum KeyCode {
  ESCAPE = 27,
  SPACE = 32,
  ARROW_UP = 38,
  ARROW_DOWN = 40
}

/**
 * Event detail object passed to dropdown events
 */
interface DropdownEventDetail {
  /** The element that triggered the dropdown action */
  relatedTarget: HTMLElement;
}

/**
 * jQuery event with dropdown-specific data
 */
interface DropdownEvent extends JQuery.TriggeredEvent {
  /** Custom event data */
  detail?: DropdownEventDetail;
}

/**
 * Bootstrap Dropdown constructor interface
 */
interface BootstrapDropdown {
  /** Plugin version */
  VERSION: string;
  
  /**
   * Toggle dropdown open/closed state
   * @param event - The triggering event
   * @returns false to prevent default behavior
   */
  toggle(event: JQuery.ClickEvent): boolean;
  
  /**
   * Handle keyboard navigation within dropdown
   * @param event - The keyboard event
   */
  keydown(event: JQuery.KeyDownEvent): void;
}

/**
 * jQuery plugin options for dropdown
 */
interface DropdownOptions {
  /** Method name to call on the dropdown instance */
  [key: string]: unknown;
}

/**
 * Extended JQuery interface with dropdown plugin
 */
interface JQuery {
  /**
   * Initialize or interact with Bootstrap dropdown plugin
   * @param options - Configuration options or method name to invoke
   * @returns jQuery object for chaining
   */
  dropdown(options?: string | DropdownOptions): JQuery;
}

/**
 * jQuery static extensions for dropdown plugin
 */
interface JQueryStatic {
  fn: {
    dropdown: {
      /** Dropdown constructor function */
      Constructor: new (element: HTMLElement) => BootstrapDropdown;
      
      /**
       * Restore previous dropdown plugin and return this one
       * @returns The Bootstrap dropdown plugin
       */
      noConflict(): typeof jQuery.fn.dropdown;
    } & ((this: JQuery, options?: string | DropdownOptions) => JQuery);
  };
}

/**
 * Dropdown plugin data stored on elements
 */
interface DropdownData {
  'bs.dropdown'?: BootstrapDropdown;
}

/**
 * Type guard for checking if event has specific which key code
 */
type KeyboardNavigationKeys = KeyCode.ESCAPE | KeyCode.SPACE | KeyCode.ARROW_UP | KeyCode.ARROW_DOWN;

/**
 * Global jQuery instance type
 */
declare const jQuery: JQueryStatic;

/**
 * Export dropdown plugin type definitions
 */
export {
  BootstrapDropdown,
  DropdownToggleSelector,
  DropdownEventDetail,
  DropdownEvent,
  DropdownOptions,
  DropdownData,
  KeyCode,
  KeyboardNavigationKeys
};