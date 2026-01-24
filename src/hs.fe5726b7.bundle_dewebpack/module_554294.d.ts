/**
 * Radio button widget parameters
 */
interface RadioButtonOptions {
  /** Unique identifier for the radio button group */
  id: string;
  /** Array of button configurations or promises that resolve to configurations */
  btns: Array<RadioButtonConfig | Promise<RadioButtonConfig>>;
  /** Index of the currently selected button (-1 for none) */
  selectedIndex: number;
  /** Additional CSS class name for styling */
  className?: string;
  /** Callback fired when selection changes */
  onchange?: (selectedIndex: number) => void;
  /** Callback fired after widget creation */
  oncreate?: (element: JQuery, widget: RadioButtonWidget) => void;
  /** Callback fired before widget destruction */
  ondestroy?: (element: JQuery, widget: RadioButtonWidget) => void;
}

/**
 * Configuration for individual radio button
 */
interface RadioButtonConfig {
  /** Tooltip text to display on hover */
  tooltip?: string;
  /** CSS class name for the button */
  className?: string;
  /** Image URL or SVG path */
  img?: string;
  /** Text label for the button */
  label?: string;
}

/**
 * jQuery widget interface for custom radio button
 */
interface RadioButtonWidget extends JQuery.Widget {
  /** Widget event prefix for namespacing */
  widgetEventPrefix: string;
  /** Widget configuration options */
  options: RadioButtonOptions;
  
  /**
   * Builds HTML for a single radio button
   * @param container - The parent UL element
   * @param config - Button configuration
   */
  buildHtml(container: JQuery, config: RadioButtonConfig): void;
  
  /**
   * Updates the active state based on selectedIndex
   */
  update(): void;
}

/**
 * Custom radio button component wrapper
 */
declare class CRadioButton {
  /** jQuery container element */
  container: JQuery;
  /** Widget configuration parameters */
  param: RadioButtonOptions;
  /** jQuery widget instance */
  instance: JQuery;

  /**
   * Creates a new radio button component
   * @param selector - jQuery selector or element
   * @param options - Configuration options
   */
  constructor(selector: string | HTMLElement | JQuery, options: RadioButtonOptions);

  /**
   * Factory method to create radio button instance
   * @param selector - jQuery selector or element
   * @param options - Configuration options
   * @returns New CRadioButton instance
   */
  static create(selector: string | HTMLElement | JQuery, options: RadioButtonOptions): CRadioButton;

  /**
   * Updates widget with new options and recreates it
   * @param options - Partial options to merge with existing configuration
   */
  update(options: Partial<RadioButtonOptions>): void;

  /**
   * Destroys the widget and cleans up resources
   */
  destroy(): void;
}

/**
 * jQuery plugin declaration for radioButton widget
 */
interface JQuery {
  /**
   * Initializes or invokes methods on the radioButton widget
   * @param options - Widget options or method name
   * @returns jQuery object for chaining
   */
  radioButton(options: RadioButtonOptions): JQuery;
  radioButton(method: 'destroy'): JQuery;
  radioButton(method: 'update'): JQuery;
}

/**
 * Global window extension
 */
declare global {
  interface Window {
    /** Global CRadioButton constructor */
    CRadioButton: typeof CRadioButton;
  }
  
  /**
   * Resource manager utility (assumed external dependency)
   */
  const ResourceManager: {
    /**
     * Injects SVG content into an image element
     * @param imgElement - Image DOM element
     */
    injectSVGImage(imgElement: HTMLImageElement | null): void;
  };
}

export { CRadioButton, RadioButtonOptions, RadioButtonConfig, RadioButtonWidget };