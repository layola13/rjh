/**
 * Custom checkbox component with three-state support (checked, unchecked, indeterminate)
 * Wraps jQuery UI widget for enhanced checkbox functionality
 */

/** Checkbox status enumeration */
export enum CheckboxStatus {
  /** Checkbox is checked */
  checked = "checked",
  /** Checkbox is unchecked */
  unchecked = "unchecked",
  /** Checkbox is in indeterminate state (partial selection) */
  indeterminate = "indeterminate"
}

/** Popover configuration for checkbox */
export interface CheckboxPopoverOptions {
  /** Popover placement position */
  placement: 'top' | 'bottom' | 'left' | 'right';
  /** Event that triggers the popover */
  trigger: 'hover' | 'click' | 'focus';
  /** Resource key or text content for popover */
  text: string;
}

/** Checkbox widget configuration options */
export interface CheckboxOptions {
  /** Label text displayed next to checkbox */
  text?: string;
  /** Current checkbox status */
  status?: CheckboxStatus;
  /** Whether checkbox is disabled */
  disabled?: boolean;
  /** Tooltip text shown on hover */
  tooltip?: string;
  /** Click event handler */
  onclick?: (event: JQuery.ClickEvent) => void;
  /** Whether checkbox is hidden */
  hidden?: boolean;
  /** Popover configuration */
  popover?: CheckboxPopoverOptions;
}

/** jQuery UI checkbox widget interface */
export interface CCheckBoxWidget extends JQuery {
  /**
   * Initialize or call methods on the checkbox widget
   * @param options - Configuration options or method name
   */
  ccheckBox(options?: CheckboxOptions | string): CCheckBoxWidget;
}

/**
 * Custom checkbox component class
 * Provides programmatic control over checkbox widget lifecycle
 */
export default class CheckboxComponent {
  /** Static reference to status enumeration */
  static readonly StatusEnum: typeof CheckboxStatus;

  /** jQuery container element */
  private container: JQuery;
  
  /** Widget configuration parameters */
  private param: CheckboxOptions;
  
  /** Widget instance reference */
  private instance: CCheckBoxWidget;

  /**
   * Creates a new checkbox component
   * @param element - Selector or DOM element for checkbox container
   * @param options - Checkbox configuration options
   */
  constructor(element: string | HTMLElement, options: CheckboxOptions);

  /**
   * Factory method to create checkbox instance
   * @param element - Selector or DOM element for checkbox container
   * @param options - Checkbox configuration options
   * @returns New checkbox component instance
   */
  static create(element: string | HTMLElement, options: CheckboxOptions): CheckboxComponent;

  /**
   * Updates checkbox configuration
   * Destroys existing widget and recreates with merged options
   * @param options - Partial options to update
   */
  update(options: Partial<CheckboxOptions>): void;

  /**
   * Destroys the checkbox widget
   * Removes event handlers and cleans up DOM
   */
  destroy(): void;
}

/**
 * jQuery UI widget declaration
 * Extends jQuery prototype with ccheckBox widget
 */
declare global {
  interface JQuery {
    /**
     * Initialize or interact with custom checkbox widget
     * @param options - Widget options or method name ('destroy')
     */
    ccheckBox(options?: CheckboxOptions | 'destroy'): CCheckBoxWidget;
  }

  interface JQueryStatic {
    /**
     * jQuery UI widget factory
     */
    widget(
      name: string,
      base: object | undefined,
      prototype: {
        widgetEventPrefix: string;
        options: CheckboxOptions;
        _create(): void;
        _$(selector?: string): JQuery;
        _destroy(): void;
      }
    ): void;
  }
}