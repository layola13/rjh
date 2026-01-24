/**
 * Bootstrap Tooltip Plugin Type Definitions
 * Based on Bootstrap v3.3.7 Tooltip Component
 */

/**
 * Tooltip placement options
 */
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'auto top' | 'auto bottom' | 'auto left' | 'auto right';

/**
 * Tooltip trigger options
 */
type TooltipTrigger = 'click' | 'hover' | 'focus' | 'manual' | string;

/**
 * Viewport configuration for tooltip positioning
 */
interface TooltipViewport {
  /** Selector for the viewport element */
  selector: string;
  /** Padding around the viewport */
  padding: number;
}

/**
 * Delay configuration for showing/hiding tooltip
 */
interface TooltipDelay {
  /** Delay in milliseconds before showing */
  show: number;
  /** Delay in milliseconds before hiding */
  hide: number;
}

/**
 * Tooltip plugin options
 */
interface TooltipOptions {
  /** Enable CSS fade transition */
  animation?: boolean;
  /** Tooltip placement relative to target element */
  placement?: TooltipPlacement | ((this: Tooltip, tooltipElement: HTMLElement, triggerElement: HTMLElement) => TooltipPlacement);
  /** Selector to delegate tooltip initialization */
  selector?: string | false;
  /** HTML template for the tooltip */
  template?: string;
  /** Events that trigger the tooltip */
  trigger?: TooltipTrigger;
  /** Tooltip title content */
  title?: string | ((this: HTMLElement) => string);
  /** Delay before showing/hiding (ms or object) */
  delay?: number | TooltipDelay;
  /** Allow HTML content in tooltip */
  html?: boolean;
  /** Container to append tooltip to */
  container?: string | HTMLElement | false;
  /** Viewport bounds for positioning */
  viewport?: string | HTMLElement | TooltipViewport | ((this: Tooltip, element: JQuery) => string | HTMLElement | TooltipViewport);
}

/**
 * Internal state tracking for tooltip interactions
 */
interface TooltipInState {
  /** Click state */
  click: boolean;
  /** Hover state */
  hover: boolean;
  /** Focus state */
  focus: boolean;
}

/**
 * Hover state values
 */
type TooltipHoverState = 'in' | 'out' | null;

/**
 * Position information for tooltip calculation
 */
interface TooltipPosition {
  /** Top coordinate */
  top: number;
  /** Left coordinate */
  left: number;
  /** Bottom coordinate */
  bottom?: number;
  /** Right coordinate */
  right?: number;
  /** Width of element */
  width?: number;
  /** Height of element */
  height?: number;
  /** Scroll position */
  scroll?: number;
}

/**
 * Delta adjustment for viewport positioning
 */
interface TooltipDelta {
  /** Top offset adjustment */
  top: number;
  /** Left offset adjustment */
  left: number;
}

/**
 * Bootstrap Tooltip Component
 * Provides configurable tooltip functionality with positioning and animation
 */
declare class Tooltip {
  /** Version of the tooltip plugin */
  static readonly VERSION: string;
  
  /** Default transition duration in milliseconds */
  static readonly TRANSITION_DURATION: number;
  
  /** Default configuration options */
  static readonly DEFAULTS: TooltipOptions;

  /** Type identifier for the tooltip */
  type: string | null;
  
  /** Current options configuration */
  options: TooltipOptions | null;
  
  /** Whether the tooltip is enabled */
  enabled: boolean | null;
  
  /** Timeout handle for delayed show/hide */
  timeout: number | null;
  
  /** Current hover state */
  hoverState: TooltipHoverState;
  
  /** jQuery element that triggers the tooltip */
  $element: JQuery | null;
  
  /** Internal state tracking for multiple triggers */
  inState: TooltipInState | null;
  
  /** Cached tooltip element */
  $tip?: JQuery;
  
  /** Cached arrow element */
  $arrow?: JQuery;
  
  /** Viewport element for positioning constraints */
  $viewport?: JQuery;
  
  /** Internal options for delegated tooltips */
  _options?: TooltipOptions;

  /**
   * Creates a new Tooltip instance
   * @param element - The DOM element to attach the tooltip to
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options?: TooltipOptions);

  /**
   * Initialize the tooltip with type, element and options
   * @param type - Type identifier (e.g., 'tooltip', 'popover')
   * @param element - Target DOM element
   * @param options - Configuration options
   */
  init(type: string, element: HTMLElement, options?: TooltipOptions): void;

  /**
   * Get default options for the tooltip
   * @returns Default configuration object
   */
  getDefaults(): TooltipOptions;

  /**
   * Merge and return final options
   * @param options - User-provided options
   * @returns Merged options object
   */
  getOptions(options?: TooltipOptions): TooltipOptions;

  /**
   * Get options for delegated tooltip instances
   * @returns Options object with only non-default values
   */
  getDelegateOptions(): Partial<TooltipOptions>;

  /**
   * Handle mouse enter / focus in events
   * @param event - The triggering event or Tooltip instance
   */
  enter(event: JQueryEventObject | Tooltip): void;

  /**
   * Check if any trigger state is active
   * @returns True if any state is active
   */
  isInStateTrue(): boolean;

  /**
   * Handle mouse leave / focus out events
   * @param event - The triggering event or Tooltip instance
   */
  leave(event: JQueryEventObject | Tooltip): void;

  /**
   * Show the tooltip
   */
  show(): void;

  /**
   * Apply positioning to the tooltip element
   * @param offset - Calculated position offset
   * @param placement - Resolved placement direction
   */
  applyPlacement(offset: TooltipPosition, placement: string): void;

  /**
   * Adjust arrow positioning
   * @param delta - Adjustment delta value
   * @param dimension - Element dimension (width or height)
   * @param isHorizontal - Whether adjustment is horizontal
   */
  replaceArrow(delta: number, dimension: number, isHorizontal: boolean): void;

  /**
   * Set the content of the tooltip
   */
  setContent(): void;

  /**
   * Hide the tooltip
   * @param callback - Optional callback after hide completes
   */
  hide(callback?: () => void): this;

  /**
   * Fix title attribute handling
   */
  fixTitle(): void;

  /**
   * Check if tooltip has content to display
   * @returns True if content exists
   */
  hasContent(): boolean;

  /**
   * Get position information for an element
   * @param element - Target element (defaults to $element)
   * @returns Position object with coordinates and dimensions
   */
  getPosition(element?: JQuery): TooltipPosition;

  /**
   * Calculate offset based on placement
   * @param placement - Tooltip placement direction
   * @param position - Element position data
   * @param actualWidth - Tooltip width
   * @param actualHeight - Tooltip height
   * @returns Calculated offset position
   */
  getCalculatedOffset(placement: string, position: TooltipPosition, actualWidth: number, actualHeight: number): TooltipPosition;

  /**
   * Calculate viewport-adjusted positioning delta
   * @param placement - Tooltip placement direction
   * @param position - Current position
   * @param actualWidth - Tooltip width
   * @param actualHeight - Tooltip height
   * @returns Delta adjustment object
   */
  getViewportAdjustedDelta(placement: string, position: TooltipPosition, actualWidth: number, actualHeight: number): TooltipDelta;

  /**
   * Get the title content for the tooltip
   * @returns Title string
   */
  getTitle(): string;

  /**
   * Generate unique ID for tooltip element
   * @param prefix - ID prefix
   * @returns Unique ID string
   */
  getUID(prefix: string): string;

  /**
   * Get or create the tooltip element
   * @returns jQuery tooltip element
   */
  tip(): JQuery;

  /**
   * Get the arrow element
   * @returns jQuery arrow element
   */
  arrow(): JQuery;

  /**
   * Enable the tooltip
   */
  enable(): void;

  /**
   * Disable the tooltip
   */
  disable(): void;

  /**
   * Toggle enabled state
   */
  toggleEnabled(): void;

  /**
   * Toggle tooltip visibility
   * @param event - Optional triggering event
   */
  toggle(event?: JQueryEventObject): void;

  /**
   * Destroy the tooltip and clean up
   */
  destroy(): void;
}

/**
 * jQuery plugin interface for tooltip
 */
interface JQuery {
  /**
   * Initialize or invoke tooltip methods
   * @param options - Configuration options or method name
   * @returns jQuery object for chaining
   */
  tooltip(options?: TooltipOptions | string): JQuery;
}

/**
 * jQuery.fn.tooltip namespace
 */
interface JQueryStatic {
  fn: {
    tooltip: {
      /** Tooltip constructor */
      Constructor: typeof Tooltip;
      /** Restore previous tooltip definition */
      noConflict(): typeof Tooltip;
    } & ((this: JQuery, options?: TooltipOptions | string) => JQuery);
  };
}