/**
 * Module: module_update_sort_desc
 * Original ID: update:sort-desc
 * 
 * Emits an update event for the sort-desc property
 * @param sortDescending - Whether to sort in descending order
 */
declare function updateSortDesc(sortDescending: boolean): void;

export default updateSortDesc;

/**
 * Event emitter interface for sort-desc updates
 */
export interface SortDescUpdateEmitter {
  /**
   * Emits the update:sort-desc event
   * @param event - The event name (always 'update:sort-desc')
   * @param value - The new sort descending value
   */
  $emit(event: 'update:sort-desc', value: boolean): void;
}

/**
 * Factory function that creates a sort-desc updater
 * @param emitter - The event emitter instance
 * @returns A function that updates the sort-desc value
 */
export type UpdateSortDescFactory = (emitter: SortDescUpdateEmitter) => (sortDescending: boolean) => void;