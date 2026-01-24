/**
 * Radio button widget wrapper module
 * Provides a factory for creating radio button UI components
 */

/**
 * jQuery element type
 */
type JQueryElement = JQuery<HTMLElement>;

/**
 * Configuration options for radio button creation
 */
interface RadioButtonOptions {
  [key: string]: unknown;
}

/**
 * Radio button component interface
 * Represents the CRadioButton widget instance
 */
interface IRadioButton {
  /**
   * Creates the main radio button widget
   * @param element - The container element for the radio button
   * @param options - Configuration options for the widget
   * @returns The created radio button instance
   */
  createMainWidget(element: HTMLElement | string, options: RadioButtonOptions): unknown;
}

/**
 * Base widget class that radio button extends from
 */
declare class BaseWidget {
  constructor(element: HTMLElement | string, options?: RadioButtonOptions);
}

/**
 * Radio button widget class
 * Extends base widget functionality to provide radio button specific behavior
 */
declare class RadioButtonWidget extends BaseWidget {
  /**
   * Creates a new radio button widget instance
   * @param element - The container element for the radio button
   * @param options - Configuration options for the widget
   */
  constructor(element: HTMLElement | string, options?: RadioButtonOptions);

  /**
   * Creates the main radio button widget with custom styling
   * Generates a span element with "radioBtn" class and appends CRadioButton
   * @param element - The container element (HTML element or selector string)
   * @param options - Configuration options passed to CRadioButton
   * @returns The created CRadioButton instance
   */
  createMainWidget(element: HTMLElement | string, options: RadioButtonOptions): unknown;

  /**
   * Static factory method to create a radio button widget
   * @param element - The container element for the radio button
   * @param options - Configuration options for the widget
   * @returns A new RadioButtonWidget instance
   */
  static create(element: HTMLElement | string, options: RadioButtonOptions): RadioButtonWidget;
}

/**
 * Default export - RadioButtonWidget class
 */
export default RadioButtonWidget;

/**
 * External dependency: CRadioButton
 * Global radio button component used internally
 */
declare const CRadioButton: {
  create(element: JQueryElement, options: RadioButtonOptions): unknown;
};