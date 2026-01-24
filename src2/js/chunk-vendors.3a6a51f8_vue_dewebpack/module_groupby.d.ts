/**
 * Group by configuration value type
 * Represents a single grouping criterion or an array of grouping criteria
 */
type GroupByValue = string | string[];

/**
 * Options interface for components that support grouping
 */
interface GroupableOptions {
  /**
   * Property or properties to group items by
   */
  groupBy: string[];
}

/**
 * Module: module_groupBy
 * 
 * Sets the grouping configuration for a component.
 * This method updates the component's options to group items by the specified property or properties.
 * 
 * @param value - A single property name or an array of property names to group by.
 *                The value will be normalized to an array internally.
 * 
 * @example
 *