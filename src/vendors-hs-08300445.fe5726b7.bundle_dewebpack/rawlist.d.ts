/**
 * RawList Component Type Definitions
 * A virtual scrolling list component with horizontal and vertical scroll support
 */

/**
 * Direction for list rendering
 */
export type Direction = 'ltr' | 'rtl';

/**
 * Scroll bar visibility control
 */
export type ShowScrollBar = 'always' | 'optional' | 'never';

/**
 * Scroll information object
 */
export interface ScrollInfo {
  /** Horizontal scroll offset */
  x: number;
  /** Vertical scroll offset */
  y: number;
}

/**
 * Scroll target - can be a number (vertical offset) or an object with coordinates
 */
export interface ScrollTarget {
  /** Horizontal scroll position */
  left?: number;
  /** Vertical scroll position */
  top?: number;
}

/**
 * Extra render function parameters
 */
export interface ExtraRenderInfo {
  /** Start index of visible items */
  start: number;
  /** End index of visible items */
  end: number;
  /** Whether virtual scrolling is enabled */
  virtual: boolean;
  /** Horizontal offset */
  offsetX: number;
  /** Vertical offset */
  offsetY: number;
  /** Whether RTL mode is enabled */
  rtl: boolean;
  /** Function to get size of an item by key */
  getSize: (key: React.Key) => number;
}

/**
 * Custom styles for scroll bars
 */
export interface RawListStyles {
  /** Style for vertical scroll bar container */
  verticalScrollBar?: React.CSSProperties;
  /** Style for vertical scroll bar thumb */
  verticalScrollBarThumb?: React.CSSProperties;
  /** Style for horizontal scroll bar container */
  horizontalScrollBar?: React.CSSProperties;
  /** Style for horizontal scroll bar thumb */
  horizontalScrollBarThumb?: React.CSSProperties;
}

/**
 * Visible items change callback
 */
export type OnVisibleChange<T> = (visibleItems: T[], allItems: T[]) => void;

/**
 * Virtual scroll callback
 */
export type OnVirtualScroll = (scrollInfo: ScrollInfo) => void;

/**
 * Item key extractor function
 */
export type ItemKey<T> = string | number | ((item: T) => React.Key);

/**
 * Render function for list items
 */
export type ItemRender<T> = (
  item: T,
  index: number,
  props: { style?: React.CSSProperties }
) => React.ReactNode;

/**
 * Props for RawList component
 */
export interface RawListProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onScroll'> {
  /** CSS class prefix for styling */
  prefixCls?: string;
  /** Additional CSS class name */
  className?: string;
  /** Container height in pixels */
  height?: number;
  /** Height of each item in pixels (required for virtual scrolling) */
  itemHeight?: number;
  /** Whether to fill the full height */
  fullHeight?: boolean;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Data array to render */
  data: T[];
  /** Render function for each item */
  children: ItemRender<T>;
  /** Key extractor for items */
  itemKey: ItemKey<T>;
  /** Enable/disable virtual scrolling */
  virtual?: boolean;
  /** Text direction (LTR or RTL) */
  direction?: Direction;
  /** Width for horizontal scrolling */
  scrollWidth?: number;
  /** Custom container component type */
  component?: string | React.ComponentType<any>;
  /** Scroll event handler */
  onScroll?: (event: React.UIEvent<HTMLElement>) => void;
  /** Virtual scroll callback */
  onVirtualScroll?: OnVirtualScroll;
  /** Visible items change callback */
  onVisibleChange?: OnVisibleChange<T>;
  /** Props passed to inner container */
  innerProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Extra content renderer */
  extraRender?: (info: ExtraRenderInfo) => React.ReactNode;
  /** Custom scroll bar styles */
  styles?: RawListStyles;
  /** Scroll bar visibility mode */
  showScrollBar?: ShowScrollBar;
}

/**
 * Imperative handle methods exposed via ref
 */
export interface RawListRef {
  /** Native DOM element reference */
  nativeElement: HTMLDivElement | null;
  /** Get current scroll information */
  getScrollInfo: () => ScrollInfo;
  /** Scroll to a specific position */
  scrollTo: (target: number | ScrollTarget) => void;
}

/**
 * RawList component with virtual scrolling support
 * 
 * @example
 *