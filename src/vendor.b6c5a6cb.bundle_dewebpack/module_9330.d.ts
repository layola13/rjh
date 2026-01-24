/**
 * Bootstrap Button Plugin Type Definitions
 * Version: 3.3.7
 * 
 * Provides button state management and toggle functionality for Bootstrap buttons.
 */

/// <reference types="jquery" />

declare namespace BootstrapButton {
  /**
   * Configuration options for the Button plugin
   */
  interface ButtonOptions {
    /**
     * Text to display when button is in loading state
     * @default "loading..."
     */
    loadingText?: string;
  }

  /**
   * Button state types
   */
  type ButtonState = 'loading' | 'reset' | string;

  /**
   * Bootstrap Button Plugin Class
   * Manages button states (loading, disabled) and toggle behavior for buttons and button groups
   */
  class Button {
    /**
     * Plugin version number
     */
    static readonly VERSION: string;

    /**
     * Default configuration options
     */
    static readonly DEFAULTS: ButtonOptions;

    /**
     * The jQuery element this button instance is attached to
     */
    $element: JQuery;

    /**
     * Current configuration options
     */
    options: ButtonOptions;

    /**
     * Whether the button is currently in loading state
     */
    isLoading: boolean;

    /**
     * Creates a new Button instance
     * @param element - The DOM element or jQuery selector
     * @param options - Configuration options
     */
    constructor(element: Element | JQuery, options?: ButtonOptions);

    /**
     * Sets the button state (e.g., loading, disabled)
     * Updates button text and disabled state based on data attributes or options
     * @param state - The state to set (e.g., 'loading')
     */
    setState(state: ButtonState): void;

    /**
     * Toggles the button's active state
     * Handles different behaviors for radio buttons, checkboxes, and regular buttons
     */
    toggle(): void;
  }
}

declare global {
  interface JQuery {
    /**
     * Initialize Bootstrap Button plugin or invoke button actions
     * @param action - Action to perform ('toggle') or options object
     * @returns jQuery object for chaining
     * 
     * @example
     * // Initialize with options
     * $('#myButton').button({ loadingText: 'Please wait...' });
     * 
     * @example
     * // Toggle button state
     * $('#myButton').button('toggle');
     * 
     * @example
     * // Set loading state
     * $('#myButton').button('loading');
     */
    button(action?: 'toggle' | 'loading' | 'reset' | string | BootstrapButton.ButtonOptions): JQuery;

    /**
     * Button plugin namespace
     */
    button: {
      /**
       * Reference to the Button constructor
       */
      Constructor: typeof BootstrapButton.Button;

      /**
       * Restores the previous jQuery.fn.button implementation
       * @returns The Bootstrap button plugin function
       */
      noConflict(): typeof JQuery.prototype.button;
    };
  }

  /**
   * Extended jQuery data interface for button plugin
   */
  interface JQueryDataMap {
    /**
     * Bootstrap button instance stored in element data
     */
    'bs.button': BootstrapButton.Button;

    /**
     * Original button text before state change
     */
    'resetText': string;
  }
}

export = BootstrapButton;
export as namespace BootstrapButton;