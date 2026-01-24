/**
 * React Table Header Row Component
 * Renders a header row with customizable cells and sticky positioning support
 */

import type { Context, ReactElement, ComponentType } from 'react';

/**
 * Column definition for table headers
 */
export interface TableColumn<RecordType = unknown> {
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
  /** Enable text ellipsis when content overflows */
  ellipsis?: boolean;
  /** Callback to customize header cell props */
  onHeaderCell?: (column: TableColumn<RecordType>) => Record<string, unknown>;
  /** Additional column configuration */
  [key: string]: unknown;
}

/**
 * Cell information with column span details
 */
export interface HeaderCell<RecordType = unknown> {
  /** The column definition */
  column: TableColumn<RecordType>;
  /** Starting column index for colspan */
  colStart: number;
  /** Ending column index for colspan */
  colEnd: number;
  /** Additional cell properties */
  [key: string]: unknown;
}

/**
 * Fixed positioning information for sticky columns
 */
export interface CellFixedInfo {
  /** Whether the cell is fixed to left */
  fixedLeft?: boolean;
  /** Whether the cell is fixed to right */
  fixedRight?: boolean;
  /** Offset distance for fixed positioning */
  offsetLeft?: number;
  /** Offset distance for fixed positioning */
  offsetRight?: number;
  /** Whether this is the last left fixed column */
  lastFixedLeft?: boolean;
  /** Whether this is the first right fixed column */
  firstFixedRight?: boolean;
}

/**
 * Sticky offset map for fixed columns
 */
export interface StickyOffsets {
  left: number[];
  right: number[];
}

/**
 * Table context value
 */
export interface TableContextValue {
  /** CSS class prefix for BEM naming */
  prefixCls: string;
  /** Text direction (LTR/RTL) */
  direction: 'ltr' | 'rtl';
}

/**
 * Props for the header row component
 */
export interface HeaderRowProps<RecordType = unknown> {
  /** Array of header cells to render */
  cells: HeaderCell<RecordType>[];
  /** Sticky positioning offsets for fixed columns */
  stickyOffsets: StickyOffsets;
  /** Flattened column definitions for fixed position calculation */
  flattenColumns: TableColumn<RecordType>[];
  /** Custom row component to use as container */
  rowComponent: ComponentType<unknown>;
  /** Custom cell component for rendering header cells */
  cellComponent: ComponentType<unknown>;
  /** Callback to customize row element props */
  onHeaderRow?: (
    columns: TableColumn<RecordType>[],
    index: number
  ) => Record<string, unknown> | undefined;
  /** Row index in the header group */
  index: number;
}

/**
 * Header Row Component
 * Renders a single row in the table header with support for:
 * - Column spanning
 * - Sticky/fixed positioning
 * - Custom cell rendering
 * - RTL text direction
 * 
 * @param props - Component properties
 * @returns React element representing the header row
 */
declare function HeaderRow<RecordType = unknown>(
  props: HeaderRowProps<RecordType>
): ReactElement;

declare namespace HeaderRow {
  export { displayName };
}

export const displayName: 'HeaderRow';

export default HeaderRow;

/**
 * Utility function to calculate fixed column positioning
 * @param colStart - Starting column index
 * @param colEnd - Ending column index
 * @param flattenColumns - Flattened column array
 * @param stickyOffsets - Sticky offset map
 * @param direction - Text direction
 * @returns Fixed positioning information
 */
export declare function getCellFixedInfo<RecordType = unknown>(
  colStart: number,
  colEnd: number,
  flattenColumns: TableColumn<RecordType>[],
  stickyOffsets: StickyOffsets,
  direction: 'ltr' | 'rtl'
): CellFixedInfo;

/**
 * Utility function to generate unique keys for columns
 * @param columns - Array of column definitions
 * @returns Array of unique string keys
 */
export declare function getColumnsKey<RecordType = unknown>(
  columns: TableColumn<RecordType>[]
): string[];