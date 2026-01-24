/**
 * Bootstrap ScrollSpy Plugin Type Definitions
 * Automatically updates nav targets based on scroll position
 * @version 3.3.7
 */

/**
 * ScrollSpy configuration options
 */
interface ScrollSpyOptions {
  /**
   * Pixels to offset from top when calculating position of scroll
   * @default 10
   */
  offset?: number;
  
  /**
   * Specifies element to apply Scrollspy plugin
   */
  target?: string;
}

/**
 * ScrollSpy data stored on elements
 */
interface ScrollSpyData {
  'bs.scrollspy'?: ScrollSpy;
}

/**
 * ScrollSpy class - tracks scroll position and activates corresponding navigation items
 */
declare class ScrollSpy {
  /**
   * Plugin version
   */
  static readonly VERSION: '3.3.7';
  
  /**
   * Default configuration options
   */
  static readonly DEFAULTS: ScrollSpyOptions;
  
  /**
   * Reference to document body wrapped in jQuery
   */
  $body: JQuery<HTMLElement>;
  
  /**
   * The element being monitored for scroll events
   */
  $scrollElement: JQuery<HTMLElement | Window>;
  
  /**
   * Merged configuration options
   */
  options: Required<ScrollSpyOptions>;
  
  /**
   * CSS selector for navigation links to track
   */
  selector: string;
  
  /**
   * Array of vertical offsets for each target element
   */
  offsets: number[];
  
  /**
   * Array of target selectors corresponding to offsets
   */
  targets: string[];
  
  /**
   * Currently active target selector
   */
  activeTarget: string | null;
  
  /**
   * Total scrollable height of the document
   */
  scrollHeight: number;
  
  /**
   * Creates a new ScrollSpy instance
   * @param element - The element to spy on scroll events
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options?: ScrollSpyOptions);
  
  /**
   * Calculates and returns the total scroll height
   * @returns The maximum scroll height in pixels
   */
  getScrollHeight(): number;
  
  /**
   * Recalculates offsets and targets from DOM
   */
  refresh(): void;
  
  /**
   * Processes current scroll position and activates corresponding nav item
   */
  process(): void;
  
  /**
   * Activates a specific navigation target
   * @param target - The selector of the target to activate
   */
  activate(target: string): void;
  
  /**
   * Clears all active states from navigation items
   */
  clear(): void;
}

/**
 * jQuery plugin method parameter type
 */
type ScrollSpyMethod = 'refresh' | 'process' | 'getScrollHeight';

/**
 * jQuery plugin interface extensions
 */
interface JQuery {
  /**
   * Initialize ScrollSpy with options
   * @param options - Configuration options
   */
  scrollspy(options?: ScrollSpyOptions): this;
  
  /**
   * Call a ScrollSpy method
   * @param method - Method name to invoke
   */
  scrollspy(method: ScrollSpyMethod): this;
}

/**
 * jQuery.fn.scrollspy static members
 */
interface JQueryScrollSpyStatic {
  /**
   * Reference to the ScrollSpy constructor
   */
  Constructor: typeof ScrollSpy;
  
  /**
   * Restores previous value of $.fn.scrollspy and returns this plugin
   * @returns The ScrollSpy plugin function
   */
  noConflict(): JQueryScrollSpyStatic;
}

interface JQueryStatic {
  fn: {
    scrollspy: JQueryScrollSpyStatic & ((this: JQuery, options?: ScrollSpyOptions | ScrollSpyMethod) => JQuery);
  };
}

/**
 * Data attribute API - automatically initializes ScrollSpy on elements with data-spy="scroll"
 * Triggered on window load event
 */
declare global {
  interface HTMLElementEventMap {
    /**
     * Fired when a new item becomes activated by the scrollspy
     */
    'activate.bs.scrollspy': Event;
  }
}

export { ScrollSpy, ScrollSpyOptions, ScrollSpyMethod };