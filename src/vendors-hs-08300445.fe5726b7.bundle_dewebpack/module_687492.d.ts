/**
 * Table cell component that wraps content in a td element with configurable properties.
 * Integrates with table context to apply prefix classes and fixed column information.
 */

import type { ReactNode, Context } from 'react';

/**
 * Props for the table cell component
 */
export interface TableCellProps {
  /**
   * CSS class name for the cell
   */
  className?: string;

  /**
   * Column index in the table
   */
  index: number;

  /**
   * Content to be rendered inside the cell
   */
  children?: ReactNode;

  /**
   * Number of columns the cell should span
   */
  colSpan?: number;

  /**
   * Number of rows the cell should span
   */
  rowSpan?: number;

  /**
   * Horizontal alignment of cell content
   */
  align?: 'left' | 'center' | 'right';
}

/**
 * Table context value containing prefix class and fixed column information
 */
export interface TableContextValue {
  /**
   * CSS prefix class for table components
   */
  prefixCls: string;

  /**
   * Array of fixed column information indexed by column position
   */
  fixedInfoList: Array<FixedColumnInfo>;
}

/**
 * Fixed column information for a specific column
 */
export interface FixedColumnInfo {
  /**
   * Whether the column is fixed to left or right
   */
  fixed?: 'left' | 'right' | boolean;

  /**
   * Offset position for fixed columns
   */
  fixedOffset?: number;

  /**
   * Additional fixed column properties
   */
  [key: string]: unknown;
}

/**
 * Props for the underlying Cell component
 */
export interface CellComponentProps<T = unknown> {
  /**
   * CSS class name
   */
  className?: string;

  /**
   * Column index
   */
  index: number;

  /**
   * HTML component type (e.g., 'td', 'th')
   */
  component: 'td' | 'th';

  /**
   * CSS prefix class
   */
  prefixCls: string;

  /**
   * Table row record data
   */
  record: T | null;

  /**
   * Data index for the column
   */
  dataIndex: string | number | null;

  /**
   * Cell content alignment
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Render function that returns cell content and properties
   */
  render: () => {
    children: ReactNode;
    props: {
      colSpan?: number;
      rowSpan?: number;
    };
  };
}

/**
 * Default export: Table cell component
 * 
 * Renders a table cell (td) element with context-aware styling and fixed column support.
 * Merges component props with fixed column information from table context.
 * 
 * @param props - Component properties
 * @returns React element representing a table cell
 */
export default function TableCell(props: TableCellProps): JSX.Element;

/**
 * Table context providing shared configuration
 */
export declare const TableContext: Context<TableContextValue>;

/**
 * Base Cell component used internally
 */
export declare const Cell: React.ComponentType<CellComponentProps>;