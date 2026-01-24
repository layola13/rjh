/**
 * Table Body Component - Renders the tbody section of a table with expandable rows
 * @module TableBody
 */

import { ReactNode, ComponentType, Context } from 'react';

/**
 * Function to get unique key for a row based on record data and index
 */
export type GetRowKey<RecordType = any> = (
  record: RecordType,
  index: number
) => string | number;

/**
 * Function to get custom props for a table row
 */
export type OnRow<RecordType = any> = (
  record: RecordType,
  index: number
) => Record<string, any>;

/**
 * Function to determine if a row is expandable
 */
export type RowExpandable<RecordType = any> = (record: RecordType) => boolean;

/**
 * Function to measure column width (for resizable columns)
 */
export type MeasureColumnWidth = boolean;

/**
 * Callback for column resize events
 */
export type OnColumnResize = (columnKey: string, width: number) => void;

/**
 * Column definition with unique key
 */
export interface ColumnType<RecordType = any> {
  key: string | number;
  dataIndex?: string | string[];
  width?: number | string;
  fixed?: 'left' | 'right' | boolean;
  [key: string]: any;
}

/**
 * Table context providing prefix and component getters
 */
export interface TableContextType {
  /** CSS class prefix for table elements */
  prefixCls: string;
  /** Get custom component for table parts */
  getComponent: (
    path: string[],
    defaultComponent?: string
  ) => ComponentType<any>;
}

/**
 * Resize context providing column resize callback
 */
export interface ResizeContextType {
  /** Callback when column is resized */
  onColumnResize?: OnColumnResize;
}

/**
 * Layout context with table configuration
 */
export interface LayoutContextType {
  /** Whether table header is fixed */
  fixHeader: boolean;
  /** Whether table has horizontal scroll */
  horizonScroll: boolean;
  /** Flattened columns array */
  flattenColumns: ColumnType[];
  /** Total width of table component */
  componentWidth: number;
}

/**
 * Props for the TableBody component
 */
export interface TableBodyProps<RecordType = any> {
  /** Array of data records to render */
  data: RecordType[];
  /** Function to extract unique key from record */
  getRowKey: GetRowKey<RecordType>;
  /** Whether to render measurement row for column sizing */
  measureColumnWidth: MeasureColumnWidth;
  /** Set of keys for currently expanded rows */
  expandedKeys: Set<string | number>;
  /** Custom row props getter */
  onRow?: OnRow<RecordType>;
  /** Function to determine if row can be expanded */
  rowExpandable?: RowExpandable<RecordType>;
  /** Content to display when table is empty */
  emptyNode: ReactNode;
  /** Name of the property containing child records */
  childrenColumnName: string;
}

/**
 * Renders the body section (tbody) of a table with support for:
 * - Expandable rows
 * - Empty state placeholder
 * - Column width measurement
 * - Custom row/cell components
 * 
 * @component
 * @example
 *