/**
 * Tree data formatting and conversion utilities
 * Handles both simple mode (flat list with parent-child relationships) and nested tree structures
 */

/**
 * Configuration for simple mode tree data conversion
 * Maps flat list items to tree structure using id/parent-id relationships
 */
export interface SimpleModeConfig {
  /** Field name for the unique identifier of each node */
  id?: string;
  /** Field name for the parent node identifier */
  pId?: string;
  /** Value representing root nodes (nodes without parents) */
  rootPId?: null | string | number;
}

/**
 * Raw tree node data structure (input format)
 */
export interface RawTreeNode {
  /** Unique identifier for the node */
  key?: string | number;
  /** Value associated with the node */
  value?: any;
  /** Child nodes in nested format */
  children?: RawTreeNode[];
  /** Additional custom properties */
  [key: string]: any;
}

/**
 * Formatted tree node structure (output format)
 */
export interface FormattedTreeNode {
  /** Node key (derived from key or value) */
  key: string | number;
  /** Node value */
  value: any;
  /** Display title for the node */
  title: React.ReactNode;
  /** Formatted child nodes */
  children?: FormattedTreeNode[];
  /** Additional properties from the original node */
  [key: string]: any;
}

/**
 * Options for tree data formatting
 */
export interface FormatOptions {
  /** Function to extract label/title from a tree node */
  getLabelProp: (node: RawTreeNode) => React.ReactNode;
  /** 
   * Simple mode configuration
   * - `false`: disabled (use nested children structure)
   * - `true`: enabled with default settings
   * - `object`: enabled with custom field mappings
   */
  simpleMode?: boolean | SimpleModeConfig;
}

/**
 * Formats and normalizes tree data structure
 * Supports two input modes:
 * 1. Simple mode: flat array with parent-child relationships via id/pId fields
 * 2. Nested mode: hierarchical structure with children arrays
 * 
 * @param treeData - Flat array of tree nodes (for simple mode)
 * @param children - Nested tree structure (for nested mode)
 * @param options - Formatting options including label extraction and mode configuration
 * @returns Formatted tree data structure with normalized keys, values, and titles
 * 
 * @example
 * // Simple mode usage
 * const flatData = [
 *   { id: '1', pId: null, name: 'Root' },
 *   { id: '2', pId: '1', name: 'Child' }
 * ];
 * const result = formatTreeData(flatData, null, {
 *   getLabelProp: node => node.name,
 *   simpleMode: { id: 'id', pId: 'pId', rootPId: null }
 * });
 * 
 * @example
 * // Nested mode usage
 * const nestedData = [
 *   { key: '1', value: 'Root', children: [
 *     { key: '2', value: 'Child' }
 *   ]}
 * ];
 * const result = formatTreeData(null, nestedData, {
 *   getLabelProp: node => node.value
 * });
 */
export default function formatTreeData(
  treeData: RawTreeNode[] | null | undefined,
  children: React.ReactNode,
  options: FormatOptions
): FormattedTreeNode[];