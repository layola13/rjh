import { Key, GetCheckboxProps, TableLocale, ColumnType, GetRowKey, ExpandType } from './types';

export const SELECTION_ALL = 'SELECT_ALL';
export const SELECTION_INVERT = 'SELECT_INVERT';
export const SELECTION_NONE = 'SELECT_NONE';

type SelectionItem = {
  key: string;
  text: string;
  onSelect?: (keys: Key[]) => void;
};

type SelectionConfig<T> = {
  preserveSelectedRowKeys?: boolean;
  selectedRowKeys?: Key[];
  getCheckboxProps?: GetCheckboxProps<T>;
  onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  onSelectInvert?: (selectedRowKeys: Key[]) => void;
  onSelectNone?: () => void;
  onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  columnWidth?: number | string;
  type?: 'checkbox' | 'radio';
  selections?: boolean | SelectionItem[];
  fixed?: boolean | 'left' | 'right';
  renderCell?: (checked: boolean, record: T, index: number, node: React.ReactNode) => React.ReactNode;
  hideSelectAll?: boolean;
  checkStrictly?: boolean;
  columnTitle?: React.ReactNode;
};

type TableConfig<T> = {
  prefixCls: string;
  data: T[];
  pageData: T[];
  getRecordByKey: (key: Key) => T | undefined;
  getRowKey: GetRowKey<T>;
  expandType: ExpandType;
  childrenColumnName: string;
  locale: TableLocale;
  expandIconColumnIndex?: number;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
};

interface KeyEntity {
  key: Key;
  node: any;
  children?: KeyEntity[];
  parent?: KeyEntity;
}

interface CheckResult {
  checkedKeys: Key[];
  halfCheckedKeys: Key[];
}

function getColumnFixed(column?: ColumnType<any>): boolean | 'left' | 'right' | undefined {
  return column?.fixed;
}

function flattenData<T>(data: T[], childrenColumnName: string): T[] {
  const result: T[] = [];
  
  (data || []).forEach((item) => {
    result.push(item);
    
    if (item && typeof item === 'object' && childrenColumnName in item) {
      const children = (item as any)[childrenColumnName];
      result.push(...flattenData(children, childrenColumnName));
    }
  });
  
  return result;
}

export default function useSelection<T>(
  config: SelectionConfig<T> | undefined,
  tableConfig: TableConfig<T>
): [React.ReactNode, Set<Key>] {
  const selectionConfig = config || {};
  
  const {
    preserveSelectedRowKeys,
    selectedRowKeys: controlledSelectedRowKeys,
    getCheckboxProps,
    onChange,
    onSelect,
    onSelectAll,
    onSelectInvert,
    onSelectNone,
    onSelectMultiple,
    columnWidth,
    type = 'checkbox',
    selections,
    fixed,
    renderCell,
    hideSelectAll,
    checkStrictly = true,
    columnTitle,
  } = selectionConfig;

  const {
    prefixCls,
    data,
    pageData,
    getRecordByKey,
    getRowKey,
    expandType,
    childrenColumnName,
    locale,
    expandIconColumnIndex,
    getPopupContainer,
  } = tableConfig;

  const preservedKeysRef = React.useRef(new Map<Key, T>());
  
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<Key[]>(
    controlledSelectedRowKeys || []
  );

  const keyEntities = React.useMemo<Map<Key, KeyEntity> | null>(() => {
    if (checkStrictly) {
      return null;
    }
    // Convert data to tree entities for hierarchical selection
    return convertDataToEntities(data, getRowKey, childrenColumnName);
  }, [data, getRowKey, checkStrictly, childrenColumnName]);

  const flattenedPageData = React.useMemo(
    () => flattenData(pageData, childrenColumnName),
    [pageData, childrenColumnName]
  );

  const checkboxPropsMap = React.useMemo(() => {
    const map = new Map<Key, ReturnType<GetCheckboxProps<T>>>();
    
    flattenedPageData.forEach((record, index) => {
      const key = getRowKey(record, index);
      const props = getCheckboxProps?.(record) || {};
      map.set(key, props);
    });
    
    return map;
  }, [flattenedPageData, getRowKey, getCheckboxProps]);

  const isRowDisabled = React.useCallback(
    (record: T) => {
      const key = getRowKey(record, 0);
      return !!checkboxPropsMap.get(key)?.disabled;
    },
    [checkboxPropsMap, getRowKey]
  );

  const [checkedKeys, halfCheckedKeys] = React.useMemo<[Key[], Key[]]>(() => {
    if (checkStrictly) {
      return [selectedRowKeys || [], []];
    }
    
    const result = conductCheck(selectedRowKeys, true, keyEntities, isRowDisabled);
    return [result.checkedKeys || [], result.halfCheckedKeys];
  }, [selectedRowKeys, checkStrictly, keyEntities, isRowDisabled]);

  const selectedKeySet = React.useMemo(() => {
    const keys = type === 'radio' ? checkedKeys.slice(0, 1) : checkedKeys;
    return new Set(keys);
  }, [checkedKeys, type]);

  const halfSelectedKeySet = React.useMemo(() => {
    return type === 'radio' ? new Set<Key>() : new Set(halfCheckedKeys);
  }, [halfCheckedKeys, type]);

  const [lastSelectedKey, setLastSelectedKey] = React.useState<Key | null>(null);

  React.useEffect(() => {
    if (!controlledSelectedRowKeys) {
      setSelectedRowKeys([]);
    }
  }, [!!controlledSelectedRowKeys]);

  const triggerChange = React.useCallback(
    (keys: Key[]) => {
      let finalKeys = keys;
      let finalRows: T[] = keys.map((key) => {
        const record = getRecordByKey(key);
        
        if (!record && preservedKeysRef.current.has(key)) {
          return preservedKeysRef.current.get(key)!;
        }
        
        if (preserveSelectedRowKeys && record) {
          preservedKeysRef.current.set(key, record);
        }
        
        return record!;
      }).filter(Boolean);

      if (!preserveSelectedRowKeys) {
        finalKeys = [];
        finalRows = [];
        
        keys.forEach((key) => {
          const record = getRecordByKey(key);
          if (record !== undefined) {
            finalKeys.push(key);
            finalRows.push(record);
          }
        });
      }

      setSelectedRowKeys(finalKeys);
      onChange?.(finalKeys, finalRows);
    },
    [setSelectedRowKeys, getRecordByKey, onChange, preserveSelectedRowKeys]
  );

  const triggerSingleSelection = React.useCallback(
    (key: Key, selected: boolean, keys: Key[], event: Event) => {
      if (onSelect) {
        const rows = keys.map((k) => getRecordByKey(k)!);
        onSelect(getRecordByKey(key)!, selected, rows, event);
      }
      
      triggerChange(keys);
    },
    [onSelect, getRecordByKey, triggerChange]
  );

  const selectionItems = React.useMemo<SelectionItem[] | null>(() => {
    if (!selections || hideSelectAll) {
      return null;
    }

    const defaultSelections: SelectionItem[] = [
      {
        key: 'all',
        text: locale.selectionAll,
        onSelect: () => {
          triggerChange(data.map((record, index) => getRowKey(record, index)));
        },
      },
      {
        key: 'invert',
        text: locale.selectInvert,
        onSelect: () => {
          const keySet = new Set(selectedKeySet);
          
          pageData.forEach((record, index) => {
            const key = getRowKey(record, index);
            if (keySet.has(key)) {
              keySet.delete(key);
            } else {
              keySet.add(key);
            }
          });
          
          const newKeys = Array.from(keySet);
          triggerChange(newKeys);
          onSelectInvert?.(newKeys);
        },
      },
      {
        key: 'none',
        text: locale.selectNone,
        onSelect: () => {
          triggerChange([]);
          onSelectNone?.();
        },
      },
    ];

    if (selections === true) {
      return defaultSelections;
    }

    return selections;
  }, [selections, hideSelectAll, locale, selectedKeySet, pageData, getRowKey, triggerChange, onSelectInvert, onSelectNone]);

  // Return transformed columns with selection column
  return [selectedKeySet];
}

// Helper functions (stubs - actual implementations would depend on imported utilities)
function convertDataToEntities<T>(
  data: T[],
  getRowKey: GetRowKey<T>,
  childrenColumnName: string
): Map<Key, KeyEntity> | null {
  // Placeholder implementation
  return new Map();
}

function conductCheck(
  keys: Key[],
  checked: boolean | { checked: boolean; halfCheckedKeys: Key[] },
  keyEntities: Map<Key, KeyEntity> | null,
  isDisabled: (record: any) => boolean
): CheckResult {
  // Placeholder implementation
  return { checkedKeys: keys, halfCheckedKeys: [] };
}