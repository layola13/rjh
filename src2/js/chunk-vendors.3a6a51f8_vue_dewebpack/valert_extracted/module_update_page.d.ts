/**
 * Module: module_update_page
 * Original ID: update:page
 * 
 * Emits a page update event to the parent component or event bus.
 * Commonly used in Vue.js components for two-way binding with v-model.
 * 
 * @param page - The new page number or page data to emit
 * @returns The result of the $emit operation (typically void or boolean)
 */
export declare function updatePage<T = number>(page: T): void | boolean;

/**
 * Event emitter interface that supports the update:page event
 */
export interface PageUpdateEmitter<T = number> {
  /**
   * Emits an update:page event with the given page value
   * @param event - The event name (must be "update:page")
   * @param page - The page value to emit
   */
  $emit(event: "update:page", page: T): void | boolean;
}

/**
 * Type definition for the page update handler function
 */
export type PageUpdateHandler<T = number> = (page: T) => void | boolean;