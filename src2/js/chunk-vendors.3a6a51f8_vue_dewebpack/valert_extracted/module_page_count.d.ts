/**
 * Page count module - Emits page count events
 * @module module_page_count
 * @originalId page-count
 */

/**
 * Event emitter interface for page count events
 */
interface PageCountEmitter {
  /**
   * Emit an event with optional data
   * @param event - Event name
   * @param data - Event payload
   */
  $emit(event: string, data?: unknown): void;
}

/**
 * Emits a page count event
 * @param count - The page count value to emit
 * @param emitter - The event emitter instance
 * @returns The result of the emit operation
 */
declare function emitPageCount(
  count: number,
  emitter: PageCountEmitter
): void;

/**
 * Page count event payload type
 */
export type PageCountPayload = number;

/**
 * Page count event name constant
 */
export const PAGE_COUNT_EVENT = "page-count";

export { emitPageCount, PageCountEmitter };