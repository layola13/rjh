/**
 * Handles selection events by mapping and validating items
 * @module module_onSelect
 */

/**
 * Selection handler function that processes items through validation
 * Maps each item in a collection and validates the result
 * 
 * @template T - The type of items being processed
 * @template R - The type of the validation result
 */
declare function onSelect<T = unknown, R = unknown>(): void;

/**
 * Type definitions for the internal operations
 */
declare namespace OnSelectTypes {
  /**
   * Validator function type
   * @param item - The item to validate
   * @param index - The index of the item in the collection
   * @returns Validated result
   */
  type ValidatorFn<T, R> = (item: T, index: number) => R;
  
  /**
   * Collection type that supports mapping operations
   */
  type MappableCollection<T> = {
    map<R>(callback: ValidatorFn<T, R>): R[];
  };
}

export = onSelect;
export as namespace ModuleOnSelect;