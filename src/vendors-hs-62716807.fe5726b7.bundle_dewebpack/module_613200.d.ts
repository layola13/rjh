/**
 * Selection configuration and utilities for table components
 * Handles row selection logic including single/multiple selection, select all, invert selection, etc.
 */

import type { Key, ReactNode } from 'react';
import type { CheckboxProps } from 'antd/lib/checkbox';
import type { DataNode } from 'rc-tree/lib/interface';

/**
 * Selection type constants
 */
export const SELECTION_ALL = "SELECT_ALL";
export const SELECTION_INVERT = "SELECT_INVERT";
export const SELECTION_NONE = "SELECT_NONE";

export type SelectionType = 'checkbox' | 'radio';

export type SelectionItemSelectFn = (selectedRowKeys: Key[]) => void;

/**
 * Built-in selection item configuration
 */
export interface SelectionItem {
  key: string;
  text: ReactNode;
  onSelect?: SelectionItemSelectFn;
}

/**
 * Checkbox properties for each row
 */
export interface GetCheckboxProps<RecordType = any> {
  disabled?: boolean;
  indeterminate?: boolean;
  [key: string]: any;
}

/**
 * Main selection configuration options
 */
export interface TableRowSelection<RecordType = any> {
  /** Selection type: checkbox or radio */
  type?: SelectionType;
  
  /** Currently selected row keys */
  selectedRowKeys?: Key[];
  
  /** Callback when selection changes */
  onChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void;
  
  /** Callback when a row is selected/deselected */
  onSelect?: (record: RecordType, selected: boolean, selectedRows: RecordType[], nativeEvent: Event) => void;
  
  /** Callback when select all is triggered */
  onSelectAll?: (selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void;
  
  /** Callback when select invert is triggered */
  onSelectInvert?: (selectedRowKeys: Key[]) => void;
  
  /** Callback when select none is triggered */
  onSelectNone?: () => void;
  
  /** Callback when multiple rows are selected via shift+click */
  onSelectMultiple?: (selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void;
  
  /** Function to get checkbox props for each row */
  getCheckboxProps?: (record: RecordType) => GetCheckboxProps;
  
  /** Width of the selection column */
  columnWidth?: number | string;
  
  /** Title of the selection column */
  columnTitle?: ReactNode;
  
  /** Fixed position of the selection column */
  fixed?: boolean | 'left' | 'right';
  
  /** Custom selection dropdown items */
  selections?: boolean | SelectionItem[];
  
  /** Hide the select all checkbox */
  hideSelectAll?: boolean;
  
  /** Whether to keep selection keys when data changes */
  preserveSelectedRowKeys?: boolean;
  
  /** Custom render for selection cell */
  renderCell?: (checked: boolean, record: RecordType, index: number, originNode: ReactNode) => ReactNode;
  
  /** Check selection strictly (without cascade in tree data) */
  checkStrictly?: boolean;
}

/**
 * Internal table data and context
 */
export interface UseSelectionConfig<RecordType = any> {
  prefixCls: string;
  data: RecordType[];
  pageData: RecordType[];
  getRecordByKey: (key: Key) => RecordType | undefined;
  getRowKey: (record: RecordType, index: number) => Key;
  expandType: 'row' | 'nest';
  childrenColumnName: string;
  locale: {
    selectionAll: string;
    selectInvert: string;
    selectNone: string;
  };
  expandIconColumnIndex?: number;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

/**
 * Return type of the selection hook
 * [0]: Transform function for columns
 * [1]: Set of currently selected keys
 */
export type UseSelectionResult<RecordType = any> = [
  (columns: any[]) => any[],
  Set<Key>
];

/**
 * Main selection hook that handles all selection logic
 * Returns a column transformer function and the current selection state
 * 
 * @param rowSelection - Selection configuration options
 * @param config - Internal table configuration
 * @returns Tuple of [columnTransformer, selectedKeySet]
 */
export default function useSelection<RecordType = any>(
  rowSelection: TableRowSelection<RecordType> | undefined,
  config: UseSelectionConfig<RecordType>
): UseSelectionResult<RecordType>;