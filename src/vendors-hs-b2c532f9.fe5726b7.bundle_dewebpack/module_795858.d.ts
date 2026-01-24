/**
 * Perfect Scrollbar v1.5.6
 * A minimalistic but perfect custom scrollbar plugin
 * 
 * @copyright 2024 Hyunje Jun, MDBootstrap and Contributors
 * @license MIT
 */

/**
 * CSS class names used throughout the scrollbar implementation
 */
interface ClassNames {
  main: string;
  rtl: string;
  element: {
    thumb: (axis: ScrollAxis) => string;
    rail: (axis: ScrollAxis) => string;
    consuming: string;
  };
  state: {
    focus: string;
    clicking: string;
    active: (axis: ScrollAxis) => string;
    scrolling: (axis: ScrollAxis) => string;
  };
}

/**
 * Scroll axis type
 */
type ScrollAxis = 'x' | 'y';

/**
 * Scroll direction on each axis
 */
type ScrollDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Reach state for scroll boundaries
 */
type ReachState = 'start' | 'end' | null;

/**
 * Configuration options for PerfectScrollbar
 */
interface PerfectScrollbarOptions {
  /** Event handlers to enable */
  handlers?: string[];
  /** Maximum scrollbar length in pixels */
  maxScrollbarLength?: number | null;
  /** Minimum scrollbar length in pixels */
  minScrollbarLength?: number | null;
  /** Threshold in ms before hiding scrollbar */
  scrollingThreshold?: number;
  /** Horizontal scroll margin offset */
  scrollXMarginOffset?: number;
  /** Vertical scroll margin offset */
  scrollYMarginOffset?: number;
  /** Disable horizontal scrollbar */
  suppressScrollX?: boolean;
  /** Disable vertical scrollbar */
  suppressScrollY?: boolean;
  /** Enable smooth easing for touch swipe */
  swipeEasing?: boolean;
  /** Use both wheel axes for scrolling */
  useBothWheelAxes?: boolean;
  /** Propagate wheel events to parent */
  wheelPropagation?: boolean;
  /** Wheel scroll speed multiplier */
  wheelSpeed?: number;
}

/**
 * Internal state for PerfectScrollbar instance
 */
interface ScrollbarState {
  element: HTMLElement;
  settings: Required<PerfectScrollbarOptions>;
  
  // Container dimensions
  containerWidth: number | null;
  containerHeight: number | null;
  contentWidth: number | null;
  contentHeight: number | null;
  
  // Scrollbar elements
  scrollbarX: HTMLElement;
  scrollbarY: HTMLElement;
  scrollbarXRail: HTMLElement;
  scrollbarYRail: HTMLElement;
  
  // Scrollbar states
  scrollbarXActive: boolean | null;
  scrollbarYActive: boolean | null;
  scrollbarXWidth: number | null;
  scrollbarYHeight: number | null;
  scrollbarXLeft: number | null;
  scrollbarYTop: number | null;
  
  // Rail dimensions
  railXWidth: number | null;
  railYHeight: number | null;
  railXRatio: number | null;
  railYRatio: number | null;
  railXMarginWidth: number;
  railYMarginHeight: number;
  railBorderXWidth: number;
  railBorderYWidth: number;
  
  // Positioning
  scrollbarXTop: number;
  scrollbarXBottom: number;
  scrollbarYLeft: number;
  scrollbarYRight: number;
  scrollbarYOuterWidth: number | null;
  isScrollbarXUsingBottom: boolean;
  isScrollbarYUsingRight: boolean;
  
  // RTL support
  isRtl: boolean;
  isNegativeScroll: boolean;
  negativeScrollAdjustment: number;
  
  // Scroll tracking
  lastScrollTop: number;
  lastScrollLeft: number;
  reach: {
    x: ReachState;
    y: ReachState;
  };
  
  // Lifecycle
  isAlive: boolean;
  event: EventManager;
  ownerDocument: Document;
}

/**
 * Event handler storage
 */
interface HandlerMap {
  [eventName: string]: EventListener[];
}

/**
 * Event element wrapper
 */
declare class EventElement {
  element: HTMLElement;
  handlers: HandlerMap;
  
  constructor(element: HTMLElement);
  
  /**
   * Bind an event listener
   */
  bind(eventName: string, handler: EventListener): void;
  
  /**
   * Unbind event listener(s)
   */
  unbind(eventName: string, handler?: EventListener): void;
  
  /**
   * Unbind all event listeners
   */
  unbindAll(): void;
  
  /**
   * Check if no handlers are registered
   */
  readonly isEmpty: boolean;
}

/**
 * Manages event bindings across multiple elements
 */
declare class EventManager {
  eventElements: EventElement[];
  
  /**
   * Get or create event element wrapper
   */
  eventElement(element: HTMLElement): EventElement;
  
  /**
   * Bind an event to an element
   */
  bind(element: HTMLElement, eventName: string, handler: EventListener): void;
  
  /**
   * Unbind an event from an element
   */
  unbind(element: HTMLElement, eventName: string, handler?: EventListener): void;
  
  /**
   * Unbind all events from all elements
   */
  unbindAll(): void;
  
  /**
   * Bind an event that fires only once
   */
  once(element: HTMLElement, eventName: string, handler: EventListener): void;
}

/**
 * Browser capability detection
 */
interface BrowserCapabilities {
  /** WebKit browser detected */
  isWebKit: boolean;
  /** Touch events supported */
  supportsTouch: boolean;
  /** IE pointer events supported */
  supportsIePointer: boolean;
  /** Chrome browser detected */
  isChrome: boolean;
}

/**
 * Touch gesture state
 */
interface TouchState {
  startOffset: {
    pageX?: number;
    pageY?: number;
  };
  startTime: number;
  speed: {
    x?: number;
    y?: number;
  };
  easingLoop: number | null;
}

/**
 * Perfect Scrollbar - Custom scrollbar implementation
 */
export default class PerfectScrollbar implements ScrollbarState {
  element: HTMLElement;
  settings: Required<PerfectScrollbarOptions>;
  
  containerWidth: number | null;
  containerHeight: number | null;
  contentWidth: number | null;
  contentHeight: number | null;
  
  scrollbarX: HTMLElement;
  scrollbarY: HTMLElement;
  scrollbarXRail: HTMLElement;
  scrollbarYRail: HTMLElement;
  
  scrollbarXActive: boolean | null;
  scrollbarYActive: boolean | null;
  scrollbarXWidth: number | null;
  scrollbarYHeight: number | null;
  scrollbarXLeft: number | null;
  scrollbarYTop: number | null;
  
  railXWidth: number | null;
  railYHeight: number | null;
  railXRatio: number | null;
  railYRatio: number | null;
  railXMarginWidth: number;
  railYMarginHeight: number;
  railBorderXWidth: number;
  railBorderYWidth: number;
  
  scrollbarXTop: number;
  scrollbarXBottom: number;
  scrollbarYLeft: number;
  scrollbarYRight: number;
  scrollbarYOuterWidth: number | null;
  isScrollbarXUsingBottom: boolean;
  isScrollbarYUsingRight: boolean;
  
  isRtl: boolean;
  isNegativeScroll: boolean;
  negativeScrollAdjustment: number;
  
  lastScrollTop: number;
  lastScrollLeft: number;
  reach: {
    x: ReachState;
    y: ReachState;
  };
  
  isAlive: boolean;
  event: EventManager;
  ownerDocument: Document;
  
  /**
   * Initialize PerfectScrollbar on an element
   * 
   * @param element - DOM element or CSS selector
   * @param options - Configuration options
   * @throws {Error} When element is invalid
   */
  constructor(element: HTMLElement | string, options?: PerfectScrollbarOptions);
  
  /**
   * Update scrollbar layout and dimensions
   */
  update(): void;
  
  /**
   * Handle scroll events
   * @internal
   */
  onScroll(event: Event): void;
  
  /**
   * Destroy the scrollbar instance and clean up
   */
  destroy(): void;
  
  /**
   * Remove all PerfectScrollbar CSS classes
   * @internal
   */
  removePsClasses(): void;
}