/**
 * Pagination module type definitions
 * Original module ID: pagination
 * 
 * This module handles pagination state changes and emits pagination events
 * when the pagination configuration differs from the previous state.
 */

/**
 * Generic pagination configuration object
 * Represents pagination parameters that can be compared for changes
 */
export interface PaginationConfig {
  /** Current page number (1-indexed) */
  currentPage?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Total number of items */
  total?: number;
  /** Additional pagination metadata */
  [key: string]: unknown;
}

/**
 * Event emitter interface with pagination event support
 */
export interface EventEmitter {
  /**
   * Emit a pagination event
   * @param eventName - Name of the event to emit
   * @param data - Pagination configuration data
   */
  $emit(eventName: 'pagination', data: PaginationConfig): void;
  $emit(eventName: string, data: unknown): void;
}

/**
 * Deep equality comparison utility
 */
export interface DeepEqualUtility {
  /**
   * Performs deep equality comparison between two values
   * @param valueA - First value to compare
   * @param valueB - Second value to compare
   * @returns True if values are deeply equal, false otherwise
   */
  deepEqual<T>(valueA: T, valueB: T): boolean;
}

/**
 * Handles pagination state changes and emits events when pagination differs
 * 
 * @param currentPagination - The new pagination configuration
 * @param previousPagination - The previous pagination configuration
 * @returns True if pagination changed and event was emitted, false otherwise
 * 
 * @example
 *