/**
 * Internal options handler for sort-desc updates
 * Emits an update event when the sort description changes
 * 
 * @module module_internalOptions_sortDesc
 * @originalId internalOptions.sortDesc
 */

/**
 * Compares and updates sort-desc state
 * 
 * @param e - New sort description value (single or array)
 * @param t - Previous sort description value for comparison
 * @emits update:sort-desc - Emitted when sort description changes
 * 
 * @remarks
 * - Uses deep equality check to prevent unnecessary updates
 * - Normalizes output: returns first element if sortDesc is not an array
 * - Part of internal options system for bi-directional prop binding
 */
export declare function updateSortDesc(
  e: boolean | boolean[],
  t: boolean | boolean[]
): void;

/**
 * Context interface for the sort-desc handler
 * Typically bound to a Vue component instance
 */
export interface SortDescContext {
  /** Current sort-desc prop value (reactive) */
  readonly sortDesc: boolean | boolean[];
  
  /** Vue event emitter */
  $emit(event: 'update:sort-desc', value: boolean | boolean[]): void;
}