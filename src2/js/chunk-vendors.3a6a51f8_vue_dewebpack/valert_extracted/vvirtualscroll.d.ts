/**
 * Virtual scroll component module
 * Provides efficient rendering for large lists by only rendering visible items
 * 
 * @module VVirtualScroll
 * @description Implements virtual scrolling to optimize performance when displaying large datasets
 */

/**
 * Virtual scroll component class
 * Handles dynamic rendering of list items based on scroll position
 * 
 * @export
 * @class VVirtualScroll
 * @template T - Type of items in the virtualized list
 */
export declare class VVirtualScroll<T = unknown> {
  /**
   * Creates an instance of VVirtualScroll
   * 
   * @param {VVirtualScrollOptions<T>} options - Configuration options for the virtual scroll
   * @memberof VVirtualScroll
   */
  constructor(options?: VVirtualScrollOptions<T>);
}

/**
 * Configuration options for VVirtualScroll component
 * 
 * @export
 * @interface VVirtualScrollOptions
 * @template T - Type of items in the list
 */
export interface VVirtualScrollOptions<T = unknown> {
  /**
   * Array of items to be virtualized
   * 
   * @type {T[]}
   * @memberof VVirtualScrollOptions
   */
  items?: T[];

  /**
   * Height of each item in pixels
   * 
   * @type {number}
   * @memberof VVirtualScrollOptions
   */
  itemHeight?: number;

  /**
   * Height of the container in pixels
   * 
   * @type {number}
   * @memberof VVirtualScrollOptions
   */
  containerHeight?: number;

  /**
   * Number of items to render outside the visible area (buffer)
   * 
   * @type {number}
   * @memberof VVirtualScrollOptions
   */
  bufferSize?: number;
}

/**
 * Default export of VVirtualScroll component
 */
export default VVirtualScroll;