/**
 * Bootstrap Popover Plugin Type Definitions
 * 
 * A plugin that extends Bootstrap Tooltip to provide popover functionality.
 * Popovers are contextual overlays for displaying secondary information.
 * 
 * @module Popover
 * @version 3.3.7
 * @requires jQuery
 * @requires Bootstrap Tooltip
 */

/**
 * Configuration options for Popover plugin
 */
export interface PopoverOptions extends TooltipOptions {
  /**
   * Default placement of the popover relative to the target element
   * @default "right"
   */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto' | ((this: Element, popover: HTMLElement, trigger: Element) => string);

  /**
   * How the popover is triggered
   * @default "click"
   */
  trigger?: 'click' | 'hover' | 'focus' | 'manual' | string;

  /**
   * Content to display in the popover body
   * Can be a string or a function that returns content
   * @default ""
   */
  content?: string | ((this: Element) => string);

  /**
   * HTML template for the popover structure
   * @default '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
   */
  template?: string;

  /**
   * Whether to allow HTML content in title and content
   * @default false
   */
  html?: boolean;
}

/**
 * Base Tooltip options interface (extended by PopoverOptions)
 */
export interface TooltipOptions {
  animation?: boolean;
  container?: string | Element | false;
  delay?: number | { show: number; hide: number };
  html?: boolean;
  placement?: string | ((this: Element, tooltip: HTMLElement, trigger: Element) => string);
  selector?: string | false;
  template?: string;
  title?: string | ((this: Element) => string);
  trigger?: string;
  viewport?: string | Element | { selector: string; padding: number };
}

/**
 * Popover class constructor
 * 
 * Creates a new popover instance that extends tooltip functionality
 */
export declare class Popover {
  /**
   * Plugin version number
   */
  static readonly VERSION: '3.3.7';

  /**
   * Default configuration options for all popover instances
   */
  static readonly DEFAULTS: PopoverOptions;

  /**
   * Reference to the target element
   */
  readonly $element: JQuery;

  /**
   * Current popover options
   */
  readonly options: PopoverOptions;

  /**
   * Cached reference to the arrow element
   */
  $arrow?: JQuery;

  /**
   * Creates a new Popover instance
   * 
   * @param element - The DOM element to attach the popover to
   * @param options - Configuration options
   */
  constructor(element: Element, options?: PopoverOptions);

  /**
   * Initializes the popover plugin
   * 
   * @param type - Plugin type identifier
   * @param element - Target element
   * @param options - Configuration options
   */
  init(type: string, element: Element, options?: PopoverOptions): void;

  /**
   * Gets the default options for the popover
   * 
   * @returns Default popover configuration
   */
  getDefaults(): PopoverOptions;

  /**
   * Sets the content of the popover (title and body)
   * Updates the popover DOM with current title and content
   */
  setContent(): void;

  /**
   * Checks if the popover has content to display
   * 
   * @returns True if either title or content exists
   */
  hasContent(): boolean;

  /**
   * Retrieves the content to display in the popover body
   * Checks data-content attribute first, then falls back to options.content
   * 
   * @returns The popover content string
   */
  getContent(): string;

  /**
   * Gets the popover's arrow element
   * Caches the result for subsequent calls
   * 
   * @returns jQuery object containing the arrow element
   */
  arrow(): JQuery;

  /**
   * Gets the popover tip element
   * 
   * @returns jQuery object containing the popover DOM structure
   */
  tip(): JQuery;

  /**
   * Gets the title for the popover header
   * 
   * @returns The title string
   */
  getTitle(): string;

  /**
   * Shows the popover
   */
  show(): void;

  /**
   * Hides the popover
   */
  hide(): void;

  /**
   * Toggles the popover visibility
   */
  toggle(): void;

  /**
   * Destroys the popover instance and removes all event listeners
   */
  destroy(): void;
}

/**
 * jQuery plugin interface for Popover
 */
declare global {
  interface JQuery {
    /**
     * Initializes or invokes methods on Bootstrap Popover plugin
     * 
     * @param options - Configuration options or method name
     * @returns jQuery object for chaining
     * 
     * @example
     * // Initialize with options
     * $('#example').popover({ placement: 'top', content: 'Hello' });
     * 
     * @example
     * // Call a method
     * $('#example').popover('show');
     * 
     * @example
     * // Destroy popover
     * $('#example').popover('destroy');
     */
    popover(options?: PopoverOptions | 'show' | 'hide' | 'toggle' | 'destroy'): JQuery;

    /**
     * Popover plugin namespace
     */
    popover: {
      /**
       * Reference to the Popover constructor
       */
      Constructor: typeof Popover;

      /**
       * Restores the previous value of $.fn.popover and returns the plugin
       * Used to avoid namespace conflicts
       * 
       * @returns The popover plugin function
       */
      noConflict(): typeof JQuery.prototype.popover;
    };
  }

  interface JQueryStatic {
    fn: JQuery;
  }
}

/**
 * Data attribute interface for elements with popovers
 */
export interface PopoverDataAttributes {
  /**
   * Stored popover instance
   */
  'bs.popover'?: Popover;
}

export {};