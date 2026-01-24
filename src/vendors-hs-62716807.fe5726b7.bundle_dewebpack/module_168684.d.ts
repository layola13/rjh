/**
 * Ant Design Table Component Type Definitions
 * @module TableComponent
 */

import type { ReactNode, CSSProperties, Key, ComponentType } from 'react';
import type { SpinProps } from 'antd/es/spin';
import type { PaginationProps } from 'antd/es/pagination';
import type { TooltipProps } from 'antd/es/tooltip';

/**
 * Size variants for the table component
 */
export type TableSize = 'small' | 'middle' | 'large' | undefined;

/**
 * Direction for table layout (RTL/LTR support)
 */
export type Direction = 'ltr' | 'rtl';

/**
 * Sort order types
 */
export type SortOrder = 'ascend' | 'descend' | null;

/**
 * Expand type for table rows
 */
export type ExpandType = 'row' | 'nest' | null;

/**
 * Action type for table changes
 */
export type TableAction = 'paginate' | 'sort' | 'filter';

/**
 * Responsive breakpoint types
 */
export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

/**
 * Column configuration for table
 */
export interface ColumnType<RecordType = any> {
  key?: Key;
  dataIndex?: string | string[];
  title?: ReactNode | ((props: any) => ReactNode);
  render?: (value: any, record: RecordType, index: number) => ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right' | boolean;
  ellipsis?: boolean;
  sorter?: boolean | ((a: RecordType, b: RecordType) => number);
  sortOrder?: SortOrder;
  sortDirections?: SortOrder[];
  filters?: Array<{ text: string; value: any }>;
  filterDropdown?: ReactNode;
  filteredValue?: any[];
  onFilter?: (value: any, record: RecordType) => boolean;
  responsive?: Breakpoint[];
  className?: string;
  children?: ColumnType<RecordType>[];
  [key: string]: any;
}

/**
 * Row selection configuration
 */
export interface RowSelectionType<RecordType = any> {
  type?: 'checkbox' | 'radio';
  selectedRowKeys?: Key[];
  onChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void;
  getCheckboxProps?: (record: RecordType) => any;
  onSelect?: (record: RecordType, selected: boolean, selectedRows: RecordType[], nativeEvent: Event) => void;
  onSelectAll?: (selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void;
  selections?: boolean | any[];
  hideSelectAll?: boolean;
  fixed?: boolean | 'left' | 'right';
  columnWidth?: number | string;
  columnTitle?: ReactNode;
  checkStrictly?: boolean;
  renderCell?: (checked: boolean, record: RecordType, index: number, originNode: ReactNode) => ReactNode;
  [key: string]: any;
}

/**
 * Expandable row configuration
 */
export interface ExpandableConfig<RecordType = any> {
  expandedRowRender?: (record: RecordType, index: number, indent: number, expanded: boolean) => ReactNode;
  expandedRowKeys?: Key[];
  defaultExpandedRowKeys?: Key[];
  defaultExpandAllRows?: boolean;
  expandIcon?: (props: any) => ReactNode;
  expandIconColumnIndex?: number;
  expandRowByClick?: boolean;
  onExpand?: (expanded: boolean, record: RecordType) => void;
  onExpandedRowsChange?: (expandedKeys: Key[]) => void;
  indentSize?: number;
  childrenColumnName?: string;
  rowExpandable?: (record: RecordType) => boolean;
  __PARENT_RENDER_ICON__?: (props: any) => ReactNode;
}

/**
 * Scroll configuration for table body
 */
export interface ScrollConfig {
  x?: number | string | true;
  y?: number | string;
  scrollToFirstRowOnChange?: boolean;
}

/**
 * Table locale/internationalization configuration
 */
export interface TableLocale {
  filterTitle?: string;
  filterConfirm?: ReactNode;
  filterReset?: ReactNode;
  filterEmptyText?: ReactNode;
  emptyText?: ReactNode | (() => ReactNode);
  selectAll?: ReactNode;
  selectInvert?: ReactNode;
  selectNone?: ReactNode;
  selectionAll?: ReactNode;
  sortTitle?: string;
  expand?: string;
  collapse?: string;
  triggerDesc?: string;
  triggerAsc?: string;
  cancelSort?: string;
}

/**
 * Extended pagination props for table
 */
export interface TablePaginationConfig extends PaginationProps {
  position?: Array<'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'>;
}

/**
 * Sorter result for onChange callback
 */
export interface SorterResult<RecordType = any> {
  column?: ColumnType<RecordType>;
  order?: SortOrder;
  field?: Key | Key[];
  columnKey?: Key;
}

/**
 * Table onChange extra info
 */
export interface TableChangeExtra<RecordType = any> {
  currentDataSource: RecordType[];
  action: TableAction;
}

/**
 * Main Table component props
 */
export interface TableProps<RecordType = any> {
  /** CSS class prefix for custom styling */
  prefixCls?: string;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Inline styles */
  style?: CSSProperties;
  
  /** Table size variant */
  size?: TableSize;
  
  /** Whether to show table borders */
  bordered?: boolean;
  
  /** Prefix for dropdown components */
  dropdownPrefixCls?: string;
  
  /** Data source for table rows */
  dataSource?: RecordType[];
  
  /** Pagination configuration (false to disable) */
  pagination?: false | TablePaginationConfig;
  
  /** Row selection configuration */
  rowSelection?: RowSelectionType<RecordType>;
  
  /** Row key getter function or property name */
  rowKey?: string | ((record: RecordType, index?: number) => Key);
  
  /** Custom row className */
  rowClassName?: string | ((record: RecordType, index: number, indent: number) => string);
  
  /** Column definitions */
  columns?: ColumnType<RecordType>[];
  
  /** Table child elements (legacy column definition) */
  children?: ReactNode;
  
  /** Property name for nested children data */
  childrenColumnName?: string;
  
  /** Callback when table state changes */
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    extra: TableChangeExtra<RecordType>
  ) => void;
  
  /** Function to get popup container element */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** Loading state (boolean or SpinProps) */
  loading?: boolean | SpinProps;
  
  /** Custom expand icon renderer */
  expandIcon?: (props: any) => ReactNode;
  
  /** Expandable row configuration */
  expandable?: ExpandableConfig<RecordType>;
  
  /** Expanded row render function (legacy) */
  expandedRowRender?: (record: RecordType, index: number, indent: number, expanded: boolean) => ReactNode;
  
  /** Column index for expand icon (legacy) */
  expandIconColumnIndex?: number;
  
  /** Indent size for nested rows */
  indentSize?: number;
  
  /** Scroll configuration */
  scroll?: ScrollConfig;
  
  /** Default sort directions */
  sortDirections?: SortOrder[];
  
  /** Locale/i18n configuration */
  locale?: TableLocale;
  
  /** Whether to show sorter tooltip */
  showSorterTooltip?: boolean | TooltipProps;
}

/**
 * Internal hooks constant for Ant Design Table
 */
export declare const INTERNAL_HOOKS: unique symbol;

/**
 * Selection preset: Select all rows
 */
export declare const SELECTION_ALL: unique symbol;

/**
 * Selection preset: Invert selection
 */
export declare const SELECTION_INVERT: unique symbol;

/**
 * Selection preset: Clear selection
 */
export declare const SELECTION_NONE: unique symbol;

/**
 * Column component for declarative column definition
 */
export declare const Column: ComponentType<ColumnType>;

/**
 * ColumnGroup component for grouping columns
 */
export declare const ColumnGroup: ComponentType<{ title?: ReactNode; children?: ReactNode }>;

/**
 * Summary component for table footer summary rows
 */
export declare const Summary: ComponentType<{ children?: ReactNode }>;

/**
 * Main Table component
 * 
 * @example
 *