/**
 * VVirtualTable Component Type Definitions
 * A virtualized table component that efficiently renders large datasets by only rendering visible rows
 */

import Vue from 'vue';
import { VNode } from 'vue/types/vnode';

/**
 * Item type for table rows
 */
export interface VirtualTableItem {
  [key: string]: any;
}

/**
 * Scoped slot items payload
 */
export interface VirtualTableItemsSlot {
  items: VirtualTableItem[];
}

/**
 * Component data state
 */
interface VVirtualTableData {
  /** Current scroll position from top in pixels */
  scrollTop: number;
  /** Previous chunk index for comparison */
  oldChunk: number;
  /** Debounced scroll handler reference */
  scrollDebounce: ((event: Event) => void) | null;
  /** Flag to trigger cache invalidation */
  invalidateCache: boolean;
}

/**
 * Component computed properties
 */
interface VVirtualTableComputed {
  /** Total number of items in the dataset */
  itemsLength: number;
  /** Total virtual height of all rows plus header */
  totalHeight: number;
  /** Index of the topmost visible row */
  topIndex: number;
  /** Current chunk index being displayed */
  chunkIndex: number;
  /** Starting index of rendered items (with buffer) */
  startIndex: number;
  /** Top offset for virtual scrolling spacer */
  offsetTop: number;
  /** Ending index of rendered items (with buffer) */
  stopIndex: number;
  /** Bottom offset for virtual scrolling spacer */
  offsetBottom: number;
}

/**
 * Component methods
 */
interface VVirtualTableMethods {
  /**
   * Creates a style object with height property
   * @param height - Height value in pixels
   * @returns Style object with height
   */
  createStyleHeight(height: number): { height: string };

  /**
   * Generates the table body with virtual scrolling spacers
   * @returns VNode for tbody element
   */
  genBody(): VNode;

  /**
   * Generates the visible items using scoped slot
   * @returns VNode or VNode array from scoped slot
   */
  genItems(): VNode | VNode[];

  /**
   * Handles scroll events and updates scroll position
   * @param event - Native scroll event
   */
  onScroll(event: Event): void;

  /**
   * Generates the table element wrapper
   * @returns VNode for table container
   */
  genTable(): VNode;

  /**
   * Generates the outer wrapper with fixed height
   * @returns VNode for wrapper element
   */
  genWrapper(): VNode;
}

/**
 * Component props
 */
interface VVirtualTableProps {
  /**
   * Number of rows per chunk for buffering
   * @default 25
   */
  chunkSize: number;

  /**
   * Height of the table header in pixels
   * @default 48
   */
  headerHeight: number;

  /**
   * Array of data items to display
   * @default []
   */
  items: VirtualTableItem[];

  /**
   * Height of each row in pixels
   * @default 48
   */
  rowHeight: number;

  /**
   * Total height of the table container
   */
  height?: string | number;

  /**
   * CSS classes (inherited from VSimpleTable)
   */
  classes?: string | string[] | Record<string, boolean>;
}

/**
 * VVirtualTable Component
 * 
 * A high-performance virtual scrolling table component that renders large datasets
 * efficiently by only rendering visible rows plus a buffer zone. Extends VSimpleTable.
 * 
 * @example
 *