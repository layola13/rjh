/**
 * Perfect Scrollbar configuration options interface
 * Defines all available settings for customizing scrollbar behavior and appearance
 */
export interface PerfectScrollbarOptions {
  /**
   * Array of event handlers to enable for the scrollbar
   * Available handlers: 'click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'
   * @default ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch']
   */
  handlers: Array<'click-rail' | 'drag-scrollbar' | 'keyboard' | 'wheel' | 'touch'>;

  /**
   * Maximum length of the scrollbar in pixels
   * Set to null for no maximum limit
   * @default null
   */
  maxScrollbarLength: number | null;

  /**
   * Minimum length of the scrollbar in pixels
   * Set to null for no minimum limit
   * @default null
   */
  minScrollbarLength: number | null;

  /**
   * Offset margin for horizontal scrollbar in pixels
   * @default 0
   */
  scrollXMarginOffset: number;

  /**
   * Offset margin for vertical scrollbar in pixels
   * @default 0
   */
  scrollYMarginOffset: number;

  /**
   * Whether to suppress horizontal scrolling
   * @default false
   */
  suppressScrollX: boolean;

  /**
   * Whether to suppress vertical scrolling
   * @default false
   */
  suppressScrollY: boolean;

  /**
   * Whether to propagate swipe events to parent elements
   * @default true
   */
  swipePropagation: boolean;

  /**
   * Whether to enable easing animation for swipe gestures
   * @default true
   */
  swipeEasing: boolean;

  /**
   * Whether to use both wheel axes for scrolling
   * When true, vertical wheel events can scroll horizontally and vice versa
   * @default false
   */
  useBothWheelAxes: boolean;

  /**
   * Whether to propagate wheel events to parent elements
   * @default false
   */
  wheelPropagation: boolean;

  /**
   * Scrolling speed multiplier for wheel events
   * @default 1
   */
  wheelSpeed: number;

  /**
   * CSS theme class name for styling the scrollbar
   * @default 'default'
   */
  theme: string;
}

/**
 * Factory function that returns default Perfect Scrollbar configuration
 * @returns Default configuration object with all options set to their default values
 */
export default function getDefaultOptions(): PerfectScrollbarOptions;