/**
 * Bootstrap Affix Plugin Type Definitions
 * Provides sticky positioning for elements based on scroll position
 * @module bootstrap-affix
 */

/**
 * Affix state types
 */
type AffixState = 'top' | 'bottom' | null;

/**
 * Offset configuration for affix positioning
 */
interface AffixOffset {
  /** Top offset in pixels or function returning offset */
  top?: number | ((element: JQuery) => number);
  /** Bottom offset in pixels or function returning offset */
  bottom?: number | ((element: JQuery) => number);
}

/**
 * Configuration options for Affix plugin
 */
interface AffixOptions {
  /** 
   * Pixels to offset from screen when calculating position of scroll
   * Can be a number or object with top/bottom properties
   * @default 0
   */
  offset?: number | AffixOffset;
  
  /** 
   * Specifies the target element of the affix
   * @default window
   */
  target?: Window | string | Element | JQuery;
}

/**
 * Data attributes for automatic initialization
 */
interface AffixDataAttributes {
  /** Offset configuration from data attributes */
  offset?: AffixOffset;
  /** Bottom offset from data-offset-bottom */
  offsetBottom?: number;
  /** Top offset from data-offset-top */
  offsetTop?: number;
}

/**
 * Bootstrap Affix Plugin
 * Toggles position: fixed on/off, emulating the effect found with position: sticky
 */
declare class Affix {
  /** Plugin version */
  static readonly VERSION: string;
  
  /** CSS classes to reset */
  static readonly RESET: string;
  
  /** Default configuration options */
  static readonly DEFAULTS: AffixOptions;

  /** Configuration options for this instance */
  options: Required<AffixOptions>;
  
  /** Target element to monitor for scroll events */
  $target: JQuery;
  
  /** Element to affix */
  $element: JQuery;
  
  /** Current affix state */
  affixed: AffixState;
  
  /** Unpin offset value */
  unpin: number | null;
  
  /** Cached pinned offset value */
  pinnedOffset: number | null;

  /**
   * Creates a new Affix instance
   * @param element - DOM element to apply affix behavior to
   * @param options - Configuration options
   */
  constructor(element: Element, options?: AffixOptions);

  /**
   * Calculates the affix state based on scroll position and offsets
   * @param scrollHeight - Total scrollable height of document
   * @param elementHeight - Height of the affixed element
   * @param offsetTop - Top offset threshold
   * @param offsetBottom - Bottom offset threshold
   * @returns The calculated affix state
   */
  getState(
    scrollHeight: number,
    elementHeight: number,
    offsetTop: number | null,
    offsetBottom: number | null
  ): AffixState;

  /**
   * Calculates and caches the pinned offset
   * @returns The pinned offset value
   */
  getPinnedOffset(): number;

  /**
   * Checks position after event loop to ensure DOM is updated
   */
  checkPositionWithEventLoop(): void;

  /**
   * Main method to check and update affix state based on scroll position
   */
  checkPosition(): void;
}

/**
 * jQuery plugin interface for Affix
 */
interface JQuery {
  /**
   * Initialize affix plugin or call public method
   * @param options - Configuration options or method name
   * @returns jQuery object for chaining
   */
  affix(options?: AffixOptions): JQuery;
  affix(method: 'checkPosition'): JQuery;
  affix(method: 'checkPositionWithEventLoop'): JQuery;
}

/**
 * jQuery.fn.affix extended properties
 */
interface JQueryStatic {
  fn: {
    affix: {
      /** Affix constructor */
      Constructor: typeof Affix;
      
      /**
       * Restores previous affix plugin and returns this
       * @returns The affix plugin function
       */
      noConflict(): JQuery;
    };
  };
}

/**
 * Custom jQuery events triggered by Affix plugin
 */
interface JQueryEventObject {
  /** Namespace for affix events */
  namespace: 'bs.affix';
}

/**
 * Affix event names
 * - affix.bs.affix: Fires immediately before the element has been affixed
 * - affixed.bs.affix: Fires after the element has been affixed
 * - affix-top.bs.affix: Fires immediately before the element has been affixed-top
 * - affixed-top.bs.affix: Fires after the element has been affixed-top
 * - affix-bottom.bs.affix: Fires immediately before the element has been affixed-bottom
 * - affixed-bottom.bs.affix: Fires after the element has been affixed-bottom
 */
type AffixEventType =
  | 'affix.bs.affix'
  | 'affixed.bs.affix'
  | 'affix-top.bs.affix'
  | 'affixed-top.bs.affix'
  | 'affix-bottom.bs.affix'
  | 'affixed-bottom.bs.affix';

export { Affix, AffixOptions, AffixOffset, AffixState, AffixDataAttributes, AffixEventType };