/**
 * Text input widget wrapper class for jQuery UI widget
 * Provides a simplified interface for creating and managing text input widgets
 */
declare class CTextInputWidget {
  /**
   * Creates a new text input widget instance
   * @param element - DOM element or jQuery selector to initialize the widget on
   * @param options - Configuration options for the widget
   */
  constructor(element: string | HTMLElement, options?: CTextInputWidgetOptions);

  /**
   * Factory method to create a new CTextInputWidget instance
   * @param element - DOM element or jQuery selector
   * @param options - Configuration options
   * @returns A new CTextInputWidget instance
   */
  static create(element: string | HTMLElement, options?: CTextInputWidgetOptions): CTextInputWidget;

  /**
   * jQuery widget instance reference
   */
  instance: JQuery;

  /**
   * Validates the current input value
   * @returns True if the input is valid according to validation rules
   */
  isValid(): boolean;

  /**
   * Sets the widget to error state and displays error message
   */
  setErrorStatus(): void;

  /**
   * Destroys the widget instance and cleans up event handlers
   */
  destroy(): void;
}

/**
 * Configuration options for CTextInputWidget
 */
interface CTextInputWidgetOptions {
  /**
   * Unique identifier for the widget
   * @default ""
   */
  id?: string;

  /**
   * Label text displayed for the input field
   * @default ""
   */
  label?: string;

  /**
   * Initial value for the input field
   * @default undefined
   */
  value?: string;

  /**
   * Whether the input is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether to display error messages
   * @default false
   */
  showErrorMsg?: boolean;

  /**
   * Error message text to display on validation failure
   * @default ""
   */
  errorMsg?: string;

  /**
   * Validation configuration
   */
  validation?: {
    /**
     * Whether empty input values are allowed
     * @default false
     */
    allowEmpty?: boolean;
  };

  /**
   * Callback fired when user finishes editing (blur event)
   * @param value - The final input value
   */
  onValueChangeEnd?: (value: string) => void;

  /**
   * Callback fired when user starts editing (focus event)
   */
  onValueChangeStart?: () => void;

  /**
   * Callback fired on every input change
   * @param value - The current input value
   */
  onValueChange?: (value: string) => void;

  /**
   * Callback fired when invalid input is detected
   */
  onInvalidInput?: () => void;

  /**
   * Placeholder text for the input field
   * @default ""
   */
  placeholder?: string;
}

/**
 * jQuery UI widget interface for ctextinputwidget
 */
interface JQuery {
  /**
   * Initializes the custom text input widget
   * @param options - Widget configuration options
   */
  ctextinputwidget(options?: CTextInputWidgetOptions): JQuery;

  /**
   * Calls a method on the widget instance
   * @param method - Method name to invoke
   * @param args - Optional method arguments
   */
  ctextinputwidget(method: "isValid"): boolean;
  ctextinputwidget(method: "setErrorStatus"): void;
  ctextinputwidget(method: "destroy"): void;
}

/**
 * Global window interface extension
 */
interface Window {
  /**
   * Global CTextInputWidget constructor
   */
  CTextInputWidget: typeof CTextInputWidget;
}