/**
 * Virtual list item renderer module
 * Renders a slice of list items with calculated positioning and dimensions
 */

import type { ReactElement, CSSProperties } from 'react';

/**
 * Style configuration for list items
 */
interface ItemStyle {
  /** Fixed width for each item */
  width: number;
}

/**
 * Rendering context passed to item renderer
 */
interface RenderContext {
  /** Inline styles to apply to the item */
  style: ItemStyle;
  /** Horizontal offset for positioning */
  offsetX: number;
}

/**
 * Configuration object containing utility functions
 */
interface VirtualListConfig<T> {
  /** Extract unique key from data item */
  getKey: (item: T) => string | number;
}

/**
 * Item renderer function type
 * @param data - The data item to render
 * @param index - Absolute index in the full list
 * @param context - Rendering context with style and positioning info
 * @returns Rendered React element
 */
type ItemRenderer<T> = (
  data: T,
  index: number,
  context: RenderContext
) => ReactElement;

/**
 * Ref callback to store DOM reference for an item
 * @param item - The data item
 * @param element - The DOM element or null
 */
type SetRefCallback<T> = (item: T, element: HTMLElement | null) => void;

/**
 * Renders a slice of virtual list items with proper positioning and refs
 * 
 * @param data - Full data array
 * @param startIndex - Start index of the visible slice
 * @param endIndex - End index of the visible slice (inclusive)
 * @param itemWidth - Fixed width for each item
 * @param offsetX - Horizontal scroll offset
 * @param setRefCallback - Callback to store DOM refs for each item
 * @param renderItem - Custom renderer for each item
 * @param config - Configuration object with utility functions
 * @returns Array of rendered list item components
 * 
 * @example
 *