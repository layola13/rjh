/**
 * Default state configuration for a carousel/slider component
 * @module CarouselState
 */

/**
 * Touch/swipe gesture tracking object
 */
export interface TouchObject {
  /** Starting X coordinate of touch */
  startX: number;
  /** Starting Y coordinate of touch */
  startY: number;
  /** Current X coordinate of touch */
  curX: number;
  /** Current Y coordinate of touch */
  curY: number;
}

/**
 * Carousel/slider component state interface
 */
export interface CarouselState {
  /** Whether the carousel is currently animating between slides */
  animating: boolean;
  /** Timer ID for autoplay functionality, null when not autoplaying */
  autoplaying: number | null;
  /** Current direction of slide movement (0 = none, 1 = forward, -1 = backward) */
  currentDirection: number;
  /** Current left position of the carousel track in pixels */
  currentLeft: number | null;
  /** Index of the currently active slide */
  currentSlide: number;
  /** Direction of slide transition (1 = forward, -1 = backward) */
  direction: number;
  /** Whether the user is currently dragging the carousel */
  dragging: boolean;
  /** Whether the user has dragged to the edge of the carousel */
  edgeDragged: boolean;
  /** Whether the carousel has been initialized */
  initialized: boolean;
  /** Array of slide indices that have been lazy loaded */
  lazyLoadedList: number[];
  /** Total height of the carousel list/container */
  listHeight: number | null;
  /** Total width of the carousel list/container */
  listWidth: number | null;
  /** Whether the carousel is currently scrolling */
  scrolling: boolean;
  /** Total number of slides in the carousel */
  slideCount: number | null;
  /** Height of individual slides */
  slideHeight: number | null;
  /** Width of individual slides */
  slideWidth: number | null;
  /** Left position during swipe gesture */
  swipeLeft: number | null;
  /** Whether a swipe gesture has been completed */
  swiped: boolean;
  /** Whether a swipe gesture is currently in progress */
  swiping: boolean;
  /** Touch coordinates for gesture tracking */
  touchObject: TouchObject;
  /** CSS styles applied to the carousel track */
  trackStyle: Record<string, unknown>;
  /** Total width of the carousel track (including all slides) */
  trackWidth: number;
  /** Index of the slide that is the target of the current transition */
  targetSlide: number;
}

/**
 * Default initial state for the carousel component
 */
declare const defaultState: CarouselState;

export default defaultState;