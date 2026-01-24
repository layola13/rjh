/**
 * Page count module types
 * @module page-count
 */

/**
 * Page count data structure
 */
export interface PageCountData {
  /** Current page number */
  current: number;
  /** Total number of pages */
  total: number;
  /** Optional page size */
  pageSize?: number;
}

/**
 * Event emitter interface
 */
export interface EventEmitter {
  $emit(event: string, data: unknown): void | Promise<void>;
}

/**
 * Emits a page-count event with the provided data
 * @param data - The page count information to emit
 * @param emitter - The event emitter instance
 * @returns The result of the emit operation
 */
export declare function emitPageCount(
  data: PageCountData,
  emitter: EventEmitter
): void | Promise<void>;