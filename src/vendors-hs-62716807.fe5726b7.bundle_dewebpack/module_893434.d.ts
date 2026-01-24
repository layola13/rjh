/**
 * Column utility types and functions for table components
 */

/**
 * Column configuration interface
 */
export interface ColumnType<RecordType = any> {
  /** Unique key for the column */
  key?: string | number | null;
  /** Data index for accessing record properties */
  dataIndex?: string | string[];
  /** Column title (can be a string or render function) */
  title?: string | ((config: ColumnTitleConfig) => React.ReactNode);
  [key: string]: any;
}

/**
 * Configuration passed to column title render functions
 */
export interface ColumnTitleConfig {
  sortColumn?: any;
  sortOrder?: 'ascend' | 'descend' | null;
  filters?: Record<string, any>;
  [key: string]: any;
}

/**
 * Gets the unique key for a table column.
 * Priority: explicit key > dataIndex > fallback index
 * 
 * @param column - Column configuration object
 * @param defaultKey - Fallback key if none can be derived
 * @returns The column key as string or number
 */
export function getColumnKey<RecordType = any>(
  column: ColumnType<RecordType>,
  defaultKey: string | number
): string | number;

/**
 * Generates a hierarchical position string for a column.
 * Used for tracking column positions in nested structures.
 * 
 * @param index - Current column index
 * @param parentPos - Optional parent position prefix
 * @returns Position string (e.g., "0" or "parent-0")
 */
export function getColumnPos(
  index: number,
  parentPos?: string
): string;

/**
 * Renders the column title, handling both static and dynamic titles.
 * 
 * @param title - Column title (string or render function)
 * @param config - Configuration object passed to render functions
 * @returns Rendered title content
 */
export function renderColumnTitle(
  title: string | ((config: ColumnTitleConfig) => React.ReactNode),
  config: ColumnTitleConfig
): React.ReactNode;