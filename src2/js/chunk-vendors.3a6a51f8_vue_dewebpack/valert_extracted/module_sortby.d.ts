/**
 * Sort criterion type - can be a string key or an object with sorting configuration
 */
type SortCriterion = string | {
  /** Field name to sort by */
  field: string;
  /** Sort direction */
  order?: 'asc' | 'desc';
};

/**
 * Options interface that can be updated
 */
interface UpdateableOptions {
  /** Array of sorting criteria */
  sortBy?: SortCriterion[];
  [key: string]: unknown;
}

/**
 * Updates the sorting configuration
 * 
 * @param sortByValue - Single sort criterion or array of sort criteria.
 *                      Automatically wrapped into an array if a single value is provided.
 * 
 * @remarks
 * This method updates the component's options with the specified sorting criteria.
 * The `wrapInArray` utility ensures the value is always normalized to an array format.
 * 
 * @example
 *