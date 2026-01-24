/**
 * Utility module for carousel/slider component functionality
 * Provides calculation helpers for slide positioning, navigation, and animation
 */

/** Configuration object for slider state and behavior */
export interface SliderConfig {
  /** Current active slide index */
  currentSlide: number;
  /** Target slide index for transitions */
  targetSlide?: number;
  /** Total number of slides */
  slideCount: number;
  /** Number of slides visible at once */
  slidesToShow: number;
  /** Number of slides to scroll per action */
  slidesToScroll: number;
  /** Width of individual slide in pixels */
  slideWidth: number;
  /** Height of individual slide in pixels */
  slideHeight: number;
  /** Width of the list/track container */
  listWidth: number;
  /** Height of the list/track container */
  listHeight: number;
  /** Width of the track element */
  trackWidth: number;
  /** Enable infinite loop mode */
  infinite: boolean;
  /** Enable center mode (centers current slide) */
  centerMode: boolean;
  /** Padding for center mode (px or %) */
  centerPadding: string;
  /** Enable right-to-left mode */
  rtl: boolean;
  /** Enable vertical orientation */
  vertical: boolean;
  /** Enable fade transition effect */
  fade: boolean;
  /** Enable lazy loading of slides */
  lazyLoad: boolean;
  /** Array of slide indices that have been lazy loaded */
  lazyLoadedList: number[];
  /** Enable variable width slides */
  variableWidth: boolean;
  /** Enable CSS transforms for animation */
  useCSS: boolean;
  /** Transition speed in milliseconds */
  speed: number;
  /** CSS easing function */
  cssEase: string;
  /** Enable swipe to slide functionality */
  swipeToSlide: boolean;
  /** Enable vertical swiping */
  verticalSwiping: boolean;
  /** Friction coefficient for edge resistance (0-1) */
  edgeFriction: number;
  /** Whether edge has been dragged */
  edgeDragged: boolean;
  /** Whether a swipe has occurred */
  swiped: boolean;
  /** Whether currently swiping */
  swiping: boolean;
  /** Whether currently scrolling */
  scrolling: boolean;
  /** Whether currently animating */
  animating: boolean;
  /** Whether to wait for animation to complete */
  waitForAnimate: boolean;
  /** Enable swipe gesture */
  swipe: boolean;
  /** Whether currently dragging */
  dragging: boolean;
  /** Swipe distance threshold */
  touchThreshold: number;
  /** Current swipe left position */
  swipeLeft: number | null;
  /** Touch/mouse event tracking object */
  touchObject: TouchObject;
  /** Reference to list DOM element */
  listRef: HTMLElement | null;
  /** Reference to track DOM node */
  trackRef: { node: HTMLElement } | null;
  /** Enable autoplay */
  autoplay: boolean;
  /** Autoplay state */
  autoplaying?: 'playing' | 'paused' | null;
  /** Initial slide index */
  initialSlide: number;
  /** Component children */
  children: React.ReactNode;
  /** Component is in unslick mode */
  unslick: boolean;
  /** Current animation direction (0 = forward, 1 = backward) */
  currentDirection?: number;
  /** Callback when edge is reached */
  onEdge?: (direction: SwipeDirection) => void;
  /** Callback on swipe event */
  onSwipe?: (direction: SwipeDirection) => void;
  /** Callback on swipe event (alternative) */
  swipeEvent?: (direction: SwipeDirection) => void;
  /** Left position for track */
  left: number;
}

/** Touch/mouse tracking state */
export interface TouchObject {
  /** Initial X coordinate */
  startX?: number;
  /** Initial Y coordinate */
  startY?: number;
  /** Current X coordinate */
  curX?: number;
  /** Current Y coordinate */
  curY?: number;
  /** Total swipe length */
  swipeLength?: number;
}

/** Swipe direction types */
export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | 'vertical';

/** Slide change message types */
export type SlideMessage = 'previous' | 'next' | 'dots' | 'children' | 'index';

/** Slide change action payload */
export interface SlideChangeAction {
  /** Type of slide change */
  message: SlideMessage;
  /** Target slide index (for dots, children, index messages) */
  index?: number;
  /** Slides to scroll (for dots message) */
  slidesToScroll?: number;
  /** Current slide (for children message) */
  currentSlide?: number;
}

/** Result of slide handler operation */
export interface SlideHandlerResult {
  /** Current state changes */
  state?: Partial<SliderConfig>;
  /** Next state after animation completes */
  nextState?: Partial<SliderConfig>;
}

/** CSS style object for track */
export interface TrackStyle {
  opacity?: number;
  transition?: string;
  WebkitTransition?: string;
  WebkitTransform?: string;
  transform?: string;
  msTransform?: string;
  top?: number | string;
  left?: number | string;
  width?: number | string;
  height?: number | string;
  marginTop?: string;
  marginLeft?: string;
}

/**
 * Clamps a value between minimum and maximum bounds
 * @param value - Value to clamp
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number;

/**
 * Safely prevents default behavior for touch/mouse events
 * Only prevents default if event is not a React touch/wheel event
 * @param event - DOM event object
 */
export function safePreventDefault(event: Event & { _reactName?: string }): void;

/**
 * Gets slides that should be lazy loaded on demand
 * @param config - Slider configuration
 * @returns Array of slide indices to load
 */
export function getOnDemandLazySlides(config: SliderConfig): number[];

/**
 * Gets all slides required for lazy loading in current view
 * @param config - Slider configuration
 * @returns Array of slide indices
 */
export function getRequiredLazySlides(config: SliderConfig): number[];

/**
 * Calculates the starting index for lazy loading range
 * @param config - Slider configuration
 * @returns Start index
 */
export function lazyStartIndex(config: SliderConfig): number;

/**
 * Calculates the ending index for lazy loading range
 * @param config - Slider configuration
 * @returns End index
 */
export function lazyEndIndex(config: SliderConfig): number;

/**
 * Calculates number of lazy-loadable slides to the left of current slide
 * @param config - Slider configuration
 * @returns Number of slides
 */
export function lazySlidesOnLeft(config: SliderConfig): number;

/**
 * Calculates number of lazy-loadable slides to the right of current slide
 * @param config - Slider configuration
 * @returns Number of slides
 */
export function lazySlidesOnRight(config: SliderConfig): number;

/**
 * Gets the width of a DOM element
 * @param element - DOM element
 * @returns Width in pixels
 */
export function getWidth(element: HTMLElement | null): number;

/**
 * Gets the height of a DOM element
 * @param element - DOM element
 * @returns Height in pixels
 */
export function getHeight(element: HTMLElement | null): number;

/**
 * Determines swipe direction from touch coordinates
 * @param touchObject - Touch tracking object
 * @param verticalSwiping - Whether vertical swiping is enabled
 * @returns Direction string
 */
export function getSwipeDirection(
  touchObject: TouchObject,
  verticalSwiping?: boolean
): SwipeDirection;

/**
 * Checks if slider can advance to next slide
 * @param config - Slider configuration
 * @returns True if can advance
 */
export function canGoNext(config: SliderConfig): boolean;

/**
 * Extracts subset of object properties
 * @param source - Source object
 * @param keys - Array of keys to extract
 * @returns New object with specified keys
 */
export function extractObject<T extends Record<string, unknown>>(
  source: T,
  keys: string[]
): Partial<T>;

/**
 * Calculates initial state for slider
 * @param config - Slider configuration
 * @returns Initial state object
 */
export function initializedState(config: SliderConfig): Partial<SliderConfig>;

/**
 * Handles slide transition logic
 * @param config - Slider configuration
 * @returns State changes for current and next state
 */
export function slideHandler(config: SliderConfig): SlideHandlerResult;

/**
 * Calculates target slide index from change action
 * @param config - Slider configuration
 * @param action - Slide change action
 * @returns Target slide index
 */
export function changeSlide(config: SliderConfig, action: SlideChangeAction): number;

/**
 * Handles keyboard navigation events
 * @param event - Keyboard event
 * @param accessibility - Whether accessibility is enabled
 * @param rtl - Whether RTL mode is active
 * @returns Slide message ('next', 'previous', or empty string)
 */
export function keyHandler(
  event: KeyboardEvent,
  accessibility: boolean,
  rtl: boolean
): SlideMessage | '';

/**
 * Handles swipe start event
 * @param event - Touch or mouse event
 * @param swipe - Whether swipe is enabled
 * @param draggable - Whether dragging is enabled
 * @returns State changes or empty string
 */
export function swipeStart(
  event: TouchEvent | MouseEvent,
  swipe: boolean,
  draggable: boolean
): Partial<SliderConfig> | '';

/**
 * Handles swipe move event
 * @param event - Touch or mouse event
 * @param config - Slider configuration
 * @returns State changes
 */
export function swipeMove(
  event: TouchEvent | MouseEvent,
  config: SliderConfig
): Partial<SliderConfig>;

/**
 * Handles swipe end event
 * @param event - Touch or mouse event
 * @param config - Slider configuration
 * @returns State changes
 */
export function swipeEnd(
  event: TouchEvent | MouseEvent,
  config: SliderConfig
): Partial<SliderConfig>;

/**
 * Gets array of all navigable slide indices
 * @param config - Slider configuration
 * @returns Array of navigable indices
 */
export function getNavigableIndexes(config: SliderConfig): number[];

/**
 * Finds nearest navigable index to target
 * @param config - Slider configuration
 * @param targetIndex - Target index
 * @returns Nearest navigable index
 */
export function checkNavigable(config: SliderConfig, targetIndex: number): number;

/**
 * Calculates number of slides to scroll based on swipe distance
 * @param config - Slider configuration
 * @returns Number of slides
 */
export function getSlideCount(config: SliderConfig): number;

/**
 * Validates that config object has required keys
 * @param config - Configuration object
 * @param requiredKeys - Array of required key names
 * @returns Null if valid, logs error otherwise
 */
export function checkSpecKeys(
  config: Record<string, unknown>,
  requiredKeys: string[]
): null;

/**
 * Generates CSS styles for track element
 * @param config - Slider configuration
 * @returns CSS style object
 */
export function getTrackCSS(config: SliderConfig): TrackStyle;

/**
 * Generates CSS styles for animated track transition
 * @param config - Slider configuration
 * @returns CSS style object with transitions
 */
export function getTrackAnimateCSS(config: SliderConfig): TrackStyle;

/**
 * Calculates left offset position for track
 * @param config - Slider configuration
 * @returns Offset in pixels
 */
export function getTrackLeft(config: SliderConfig): number;

/**
 * Calculates number of cloned slides before content
 * @param config - Slider configuration
 * @returns Number of pre-clones
 */
export function getPreClones(config: SliderConfig): number;

/**
 * Calculates number of cloned slides after content
 * @param config - Slider configuration
 * @returns Number of post-clones
 */
export function getPostClones(config: SliderConfig): number;

/**
 * Calculates total number of slides including clones
 * @param config - Slider configuration
 * @returns Total slide count
 */
export function getTotalSlides(config: SliderConfig): number;

/**
 * Determines direction from current to target slide
 * @param config - Slider configuration
 * @returns Direction ('left' or 'right')
 */
export function siblingDirection(config: SliderConfig): 'left' | 'right';

/**
 * Calculates number of slides visible on right side
 * @param config - Slider configuration
 * @returns Number of slides
 */
export function slidesOnRight(config: SliderConfig): number;

/**
 * Calculates number of slides visible on left side
 * @param config - Slider configuration
 * @returns Number of slides
 */
export function slidesOnLeft(config: SliderConfig): number;

/**
 * Checks if DOM APIs are available (browser environment)
 * @returns True if in browser environment
 */
export function canUseDOM(): boolean;