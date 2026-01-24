/**
 * Calculates the visible range of tabs based on container dimensions and scroll position.
 * 
 * @param tabOffsets - Map containing position and dimension data for each tab element
 * @param containerRect - Rectangle describing the container's dimensions and position
 * @param operationsRect - Rectangle describing the operations area dimensions
 * @param extraRect - Rectangle for additional UI elements
 * @param options - Configuration options for tab layout
 * @returns A tuple containing [startIndex, endIndex] of visible tabs
 */
export default function calculateVisibleTabRange(
  tabOffsets: Map<string, TabOffset>,
  containerRect: DOMRect,
  operationsRect: DOMRect,
  extraRect: DOMRect,
  options: TabLayoutOptions
): [number, number];

/**
 * Position and dimension data for a single tab element
 */
interface TabOffset {
  /** Width of the tab in pixels */
  width: number;
  /** Height of the tab in pixels */
  height: number;
  /** Left position relative to container */
  left: number;
  /** Top position relative to container */
  top: number;
  /** Right position relative to container */
  right: number;
}

/**
 * Configuration options for tab layout calculation
 */
interface TabLayoutOptions {
  /** Array of tab metadata */
  tabs: TabItem[];
  /** Position of tabs relative to content area */
  tabPosition: 'top' | 'bottom' | 'left' | 'right';
  /** Whether layout direction is right-to-left */
  rtl: boolean;
}

/**
 * Metadata for a single tab item
 */
interface TabItem {
  /** Unique identifier for the tab */
  key: string;
  [key: string]: unknown;
}