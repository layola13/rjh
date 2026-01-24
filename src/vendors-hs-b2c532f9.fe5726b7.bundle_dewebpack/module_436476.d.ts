/**
 * Perfect Scrollbar instance management module
 * Manages the creation, storage, and retrieval of scrollbar instances
 */

/**
 * Configuration options for Perfect Scrollbar
 */
interface PerfectScrollbarSettings {
  /** Handler functions for scrollbar events */
  handlers?: string[];
  /** Maximum scrollbar length */
  maxScrollbarLength?: number;
  /** Minimum scrollbar length */
  minScrollbarLength?: number;
  /** Threshold for scrolling in pixels */
  scrollingThreshold?: number;
  /** Suppress scroll X */
  suppressScrollX?: boolean;
  /** Suppress scroll Y */
  suppressScrollY?: boolean;
  /** Scroll X margin offset */
  scrollXMarginOffset?: number;
  /** Scroll Y margin offset */
  scrollYMarginOffset?: number;
  /** Use both wheel axes */
  useBothWheelAxes?: boolean;
  /** Wheel propagation */
  wheelPropagation?: boolean;
  /** Wheel speed multiplier */
  wheelSpeed?: number;
  [key: string]: unknown;
}

/**
 * Event manager for handling DOM events
 */
interface EventManager {
  /** Bind an event listener to an element */
  bind(element: HTMLElement, eventName: string, handler: EventListener): void;
  /** Unbind an event listener from an element */
  unbind(element: HTMLElement, eventName: string): void;
  /** Unbind all events */
  unbindAll(): void;
}

/**
 * Perfect Scrollbar instance class
 * Manages scrollbar state and DOM elements for a container
 */
declare class PerfectScrollbarInstance {
  /** User configuration merged with defaults */
  settings: PerfectScrollbarSettings;

  /** Container element width in pixels */
  containerWidth: number | null;
  /** Container element height in pixels */
  containerHeight: number | null;
  /** Content width including overflow */
  contentWidth: number | null;
  /** Content height including overflow */
  contentHeight: number | null;

  /** Whether container has RTL (right-to-left) direction */
  isRtl: boolean;
  /** Whether browser uses negative scrollLeft for RTL */
  isNegativeScroll: boolean;
  /** Adjustment value for negative scroll calculation */
  negativeScrollAdjustment: number;

  /** Event manager instance */
  event: EventManager;
  /** Owner document reference */
  ownerDocument: Document;

  /** Horizontal scrollbar rail element */
  scrollbarXRail: HTMLElement;
  /** Horizontal scrollbar thumb element */
  scrollbarX: HTMLElement;
  /** Whether horizontal scrollbar is active/visible */
  scrollbarXActive: boolean | null;
  /** Width of horizontal scrollbar thumb */
  scrollbarXWidth: number | null;
  /** Left position of horizontal scrollbar thumb */
  scrollbarXLeft: number | null;
  /** Bottom position of horizontal scrollbar rail */
  scrollbarXBottom: number;
  /** Whether horizontal scrollbar uses bottom positioning */
  isScrollbarXUsingBottom: boolean;
  /** Top position of horizontal scrollbar rail */
  scrollbarXTop: number | null;
  /** Combined left and right border width of X rail */
  railBorderXWidth: number;
  /** Combined left and right margin of X rail */
  railXMarginWidth: number;
  /** Available width for X rail */
  railXWidth: number | null;
  /** Ratio of scrollbar width to content width */
  railXRatio: number | null;

  /** Vertical scrollbar rail element */
  scrollbarYRail: HTMLElement;
  /** Vertical scrollbar thumb element */
  scrollbarY: HTMLElement;
  /** Whether vertical scrollbar is active/visible */
  scrollbarYActive: boolean | null;
  /** Height of vertical scrollbar thumb */
  scrollbarYHeight: number | null;
  /** Top position of vertical scrollbar thumb */
  scrollbarYTop: number | null;
  /** Right position of vertical scrollbar rail */
  scrollbarYRight: number;
  /** Whether vertical scrollbar uses right positioning */
  isScrollbarYUsingRight: boolean;
  /** Left position of vertical scrollbar rail */
  scrollbarYLeft: number | null;
  /** Outer width of vertical scrollbar (RTL support) */
  scrollbarYOuterWidth: number | null;
  /** Combined top and bottom border width of Y rail */
  railBorderYWidth: number;
  /** Combined top and bottom margin of Y rail */
  railYMarginHeight: number;
  /** Available height for Y rail */
  railYHeight: number | null;
  /** Ratio of scrollbar height to content height */
  railYRatio: number | null;

  /**
   * Constructor for Perfect Scrollbar instance
   * @param element - The container element to add scrollbars to
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options?: PerfectScrollbarSettings);
}

/**
 * Registry storing all active Perfect Scrollbar instances
 * Key: unique instance ID, Value: PerfectScrollbarInstance
 */
declare const instances: Record<string, PerfectScrollbarInstance>;

/**
 * Add a Perfect Scrollbar instance to an element
 * @param element - The container element to enhance with custom scrollbars
 * @param options - Configuration options for the scrollbar behavior
 * @returns The created PerfectScrollbarInstance
 */
export function add(
  element: HTMLElement,
  options?: PerfectScrollbarSettings
): PerfectScrollbarInstance;

/**
 * Remove a Perfect Scrollbar instance from an element
 * Cleans up DOM modifications and event listeners
 * @param element - The element to remove scrollbars from
 */
export function remove(element: HTMLElement): void;

/**
 * Retrieve an existing Perfect Scrollbar instance for an element
 * @param element - The element to get the instance for
 * @returns The associated PerfectScrollbarInstance or undefined
 */
export function get(element: HTMLElement): PerfectScrollbarInstance | undefined;

/**
 * Get the unique instance ID from an element's data attribute
 * @internal
 * @param element - The element to read the ID from
 * @returns The instance ID string or null
 */
declare function getInstanceId(element: HTMLElement): string | null;