/**
 * Utility functions for table row expansion functionality
 */

/**
 * Recursively finds all children keys in a tree structure
 * @template T - The type of items in the tree
 * @param data - The root data array to traverse
 * @param keyExtractor - Function to extract key from each item
 * @param childrenProperty - Property name containing children array
 * @returns Array of all extracted keys from the tree
 */
export function findAllChildrenKeys<T extends Record<string, any>>(
  data: T[],
  keyExtractor: (item: T, index: number) => string | number,
  childrenProperty: string
): Array<string | number>;

/**
 * Configuration for rendering expand icon
 */
export interface RenderExpandIconProps<RecordType = any> {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** The data record for current row */
  record: RecordType;
  /** Callback when expand icon is clicked */
  onExpand: (record: RecordType, event: React.MouseEvent<HTMLSpanElement>) => void;
  /** Whether the row is currently expanded */
  expanded: boolean;
  /** Whether the row can be expanded */
  expandable: boolean;
}

/**
 * Renders an expand/collapse icon for table rows
 * @template RecordType - The type of table record
 * @param props - Configuration props for the expand icon
 * @returns React element representing the expand icon or placeholder
 */
export function renderExpandIcon<RecordType = any>(
  props: RenderExpandIconProps<RecordType>
): React.ReactElement;