/// <reference types="jquery" />
/// <reference types="jqueryui" />

declare namespace JQueryUI {
  /**
   * Options for the AngleSpinner widget
   */
  interface AngleSpinnerOptions extends SpinnerOptions {
    // Inherits all options from jQuery UI Spinner
  }

  /**
   * Event data passed to the updateValue event
   */
  interface AngleSpinnerUpdateValueEventData {
    /** The AngleSpinner widget instance */
    target: AngleSpinner;
    /** The parsed numeric value */
    value: number;
  }

  /**
   * Validation result object
   */
  interface ValidationResult {
    /** Whether the input is valid */
    isValid: boolean;
    /** Error message text if invalid */
    text: string;
  }

  /**
   * Custom angle spinner widget extending jQuery UI Spinner.
   * Validates angle inputs within the range of -45 to 45 degrees.
   */
  interface AngleSpinner extends Spinner {
    /** Event prefix for all widget events */
    widgetEventPrefix: "anglespinner";

    /** Widget configuration options */
    options: AngleSpinnerOptions;

    /**
     * Regular expression pattern for validating numeric input
     * Matches optional negative sign followed by digits
     */
    reg: string;

    /**
     * Internal flag tracking whether the user is currently editing the spinner
     * @internal
     */
    _isWritingSpinner: boolean;

    /**
     * Gets the container element for error messages
     * @returns jQuery object representing the error message container (three levels up from the input)
     */
    _getErrorMsgContainer(): JQuery;

    /**
     * Resets the spinner to normal visual state (no error indication)
     */
    setNormalStatus(): void;

    /**
     * Sets the spinner to error state and displays an error message
     * @param errorMessage - The error message to display
     */
    setErrorStatus(errorMessage: string): void;

    /**
     * Refreshes the widget and resets to normal status
     * @internal
     */
    _refresh(): void;

    /**
     * Called when user starts interacting with the spinner
     * Sets the writing flag and clears any error states
     * @internal
     */
    _start(): void;

    /**
     * Gets the current writing state of the spinner
     * @returns True if user is currently editing the value
     */
    getIsWritingSpinner(): boolean;

    /**
     * Called when user stops interacting with the spinner
     * Validates input and triggers updateValue event if valid
     * @internal
     */
    _stop(): void;

    /**
     * Validates the input value against angle constraints
     * @param value - The input value to validate
     * @returns Validation result with isValid flag and error text
     */
    _isValidInput(value: string): ValidationResult;

    /**
     * Sets the spinner value programmatically
     * @param value - The numeric value to set
     */
    setValue(value: number | string): void;
  }

  /**
   * AngleSpinner events
   */
  interface AngleSpinnerEvents {
    /**
     * Triggered when a valid value is entered and input is complete
     * @param event - The jQuery event object
     * @param ui - Event data containing the widget instance and parsed value
     */
    updateValue(
      event: JQuery.Event,
      ui: AngleSpinnerUpdateValueEventData
    ): void;
  }
}

interface JQuery {
  /**
   * Initializes or interacts with the AngleSpinner widget
   * @param options - Widget configuration options
   */
  anglespinner(options?: JQueryUI.AngleSpinnerOptions): JQuery;

  /**
   * Calls a method on the AngleSpinner widget
   * @param method - The method name to invoke
   * @param params - Method parameters
   */
  anglespinner(method: "setValue", value: number | string): JQuery;
  anglespinner(method: "getIsWritingSpinner"): boolean;
  anglespinner(method: "setNormalStatus"): JQuery;
  anglespinner(method: "setErrorStatus", errorMessage: string): JQuery;
  anglespinner(method: string, ...params: any[]): any;
}

/**
 * Global ResourceManager for localized strings
 */
declare const ResourceManager: {
  /**
   * Retrieves a localized string by key
   * @param key - The resource string identifier
   * @returns The localized string
   */
  getString(key: string): string;
};