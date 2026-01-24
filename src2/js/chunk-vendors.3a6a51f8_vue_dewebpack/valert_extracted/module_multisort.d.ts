/**
 * Multi-sort configuration options
 * Enables or disables the ability to sort by multiple columns simultaneously
 */
interface MultiSortOptions {
  /**
   * Enable or disable multi-column sorting functionality
   * @default false
   */
  multiSort: boolean;
}

/**
 * Partial update options for the data grid/table component
 * Allows updating specific configuration properties without replacing the entire configuration
 */
interface UpdateOptions extends Partial<MultiSortOptions> {
  // Additional configuration options can be added here
}

/**
 * Multi-sort module interface
 * Provides functionality to control multi-column sorting behavior
 */
interface MultiSortModule {
  /**
   * Updates the multi-sort configuration
   * 
   * This method enables or disables the multi-column sorting feature.
   * When enabled, users can sort by multiple columns by holding a modifier key
   * (typically Shift or Ctrl) while clicking column headers.
   * 
   * @param enabled - Boolean flag to enable (true) or disable (false) multi-sort
   * 
   * @example
   *