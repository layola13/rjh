/**
 * Table Body Component
 * Renders the tbody section of a table with expandable rows and column resizing support
 */

import type { ReactNode, Context, ComponentType } from 'react';

/**
 * Column definition with key identifier
 */
export interface Column {
  key: string;
  [key: string]: unknown;
}

/**
 * Data record type - generic object with string keys
 */
export interface DataRecord {
  [key: string]: unknown;
}

/**
 * Row event handler type
 */
export type OnRowHandler<T = DataRecord> = (
  record: T,
  index: number
) => {
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  [key: string]: unknown;
};

/**
 * Function to determine if a row is expandable
 */
export type RowExpandable<T = DataRecord> = (record: T) => boolean;

/**
 * Function to extract unique key from data record
 */
export type GetRowKey<T = DataRecord> = (record: T, index: number) => string;

/**
 * Column resize callback
 */
export type OnColumnResize = (columnKey: string, width: number) => void;

/**
 * Component getter function for customizing table elements
 */
export type GetComponent = (
  path: string[],
  defaultComponent: string
) => ComponentType<any>;

/**
 * Props for the Body component
 */
export interface BodyProps<T = DataRecord> {
  /** Array of data records to render */
  data: T[];
  
  /** Function to extract unique key from each row */
  getRowKey: GetRowKey<T>;
  
  /** Whether to measure column widths */
  measureColumnWidth: boolean;
  
  /** Keys of currently expanded rows */
  expandedKeys: Set<string> | string[];
  
  /** Row event handlers */
  onRow?: OnRowHandler<T>;
  
  /** Function to determine if row can be expanded */
  rowExpandable?: RowExpandable<T>;
  
  /** React node to display when table is empty */
  emptyNode: ReactNode;
  
  /** Property name containing child records for nested data */
  childrenColumnName: string;
}

/**
 * Context value for column resize operations
 */
export interface ResizeContextValue {
  onColumnResize?: OnColumnResize;
}

/**
 * Context value for table configuration
 */
export interface TableContextValue {
  /** CSS class prefix for table elements */
  prefixCls: string;
  
  /** Get custom component for table parts */
  getComponent: GetComponent;
}

/**
 * Context value for table layout settings
 */
export interface LayoutContextValue {
  /** Whether header is fixed */
  fixHeader: boolean;
  
  /** Whether horizontal scrolling is enabled */
  horizonScroll: boolean;
  
  /** Flattened array of all columns */
  flattenColumns: Column[];
  
  /** Total width of table component */
  componentWidth: number;
}

/**
 * Table body component that renders data rows with support for:
 * - Row expansion
 * - Column resizing
 * - Empty state
 * - Custom row/cell components
 * - Nested data structures
 */
declare const Body: React.MemoExoticComponent<
  <T extends DataRecord = DataRecord>(props: BodyProps<T>) => JSX.Element
> & {
  displayName: string;
};

export default Body;