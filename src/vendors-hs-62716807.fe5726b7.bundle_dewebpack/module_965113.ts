import { ReactElement, useState, useMemo, useCallback } from 'react';
import { getColumnPos, getColumnKey, renderColumnTitle } from './utils';
import FilterDropdown from './FilterDropdown';

interface FilterValue {
  value: any;
  children?: FilterValue[];
}

interface ColumnType<RecordType = any> {
  title?: React.ReactNode | ((props: any) => React.ReactNode);
  filters?: FilterValue[];
  filterDropdown?: React.ReactNode;
  onFilter?: (value: any, record: RecordType) => boolean;
  filteredValue?: any[];
  defaultFilteredValue?: any[];
  filterMultiple?: boolean;
  filtered?: boolean;
  children?: ColumnType<RecordType>[];
}

interface FilterState<RecordType = any> {
  column: ColumnType<RecordType>;
  key: string;
  filteredKeys?: any[];
  forceFiltered?: boolean;
}

interface UseFilterOptions<RecordType = any> {
  prefixCls: string;
  dropdownPrefixCls: string;
  mergedColumns: ColumnType<RecordType>[];
  onFilterChange: (filters: Record<string, any[] | null>, filterStates: FilterState<RecordType>[]) => void;
  getPopupContainer?: () => HTMLElement;
  locale: any;
}

export function getFilterData<RecordType>(
  data: RecordType[],
  filterStates: FilterState<RecordType>[]
): RecordType[] {
  return filterStates.reduce((filteredData, filterState) => {
    const { column, filteredKeys } = filterState;
    const { onFilter, filters } = column;

    if (onFilter && filteredKeys && filteredKeys.length > 0) {
      return filteredData.filter((record) => {
        return filteredKeys.some((key) => {
          const filterValues = collectFilterValues(filters);
          const filterIndex = filterValues.findIndex((value) => {
            return String(value) === String(key);
          });
          const filterValue = filterIndex !== -1 ? filterValues[filterIndex] : key;
          return onFilter(filterValue, record);
        });
      });
    }

    return filteredData;
  }, data);
}

function generateFilterStates<RecordType>(
  columns: ColumnType<RecordType>[] | undefined,
  useDefaultFilter: boolean,
  position: string = ''
): FilterState<RecordType>[] {
  let filterStates: FilterState<RecordType>[] = [];

  (columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, position);

    if ('children' in column && column.children) {
      filterStates = [
        ...filterStates,
        ...generateFilterStates(column.children, useDefaultFilter, columnPos)
      ];
    } else if (column.filters || 'filterDropdown' in column || 'onFilter' in column) {
      if ('filteredValue' in column) {
        let filteredKeys = column.filteredValue;
        if (!('filterDropdown' in column)) {
          filteredKeys = filteredKeys?.map(String) ?? filteredKeys;
        }
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys,
          forceFiltered: column.filtered
        });
      } else {
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: useDefaultFilter && column.defaultFilteredValue 
            ? column.defaultFilteredValue 
            : undefined,
          forceFiltered: column.filtered
        });
      }
    }
  });

  return filterStates;
}

function injectFilterColumn<RecordType>(
  prefixCls: string,
  dropdownPrefixCls: string,
  columns: ColumnType<RecordType>[],
  filterStates: FilterState<RecordType>[],
  onTriggerFilter: (filterState: FilterState<RecordType>) => void,
  getPopupContainer?: () => HTMLElement,
  locale?: any,
  position: string = ''
): ColumnType<RecordType>[] {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, position);
    const filterMultiple = column.filterMultiple ?? true;
    let processedColumn = column;

    if (processedColumn.filters || processedColumn.filterDropdown) {
      const columnKey = getColumnKey(processedColumn, columnPos);
      const filterState = filterStates.find((state) => state.key === columnKey);

      processedColumn = {
        ...processedColumn,
        title: (renderProps: any): ReactElement => {
          return (
            <FilterDropdown
              prefixCls={`${prefixCls}-filter`}
              dropdownPrefixCls={dropdownPrefixCls}
              column={processedColumn}
              columnKey={columnKey}
              filterState={filterState}
              filterMultiple={filterMultiple}
              triggerFilter={onTriggerFilter}
              locale={locale}
              getPopupContainer={getPopupContainer}
            >
              {renderColumnTitle(column.title, renderProps)}
            </FilterDropdown>
          );
        }
      };
    }

    if ('children' in processedColumn && processedColumn.children) {
      processedColumn = {
        ...processedColumn,
        children: injectFilterColumn(
          prefixCls,
          dropdownPrefixCls,
          processedColumn.children,
          filterStates,
          onTriggerFilter,
          getPopupContainer,
          locale,
          columnPos
        )
      };
    }

    return processedColumn;
  });
}

function collectFilterValues(filters: FilterValue[] | undefined): any[] {
  let values: any[] = [];

  (filters || []).forEach((filter) => {
    const { value, children } = filter;
    values.push(value);
    if (children) {
      values = [...values, ...collectFilterValues(children)];
    }
  });

  return values;
}

function getFilteredKeysMap<RecordType>(
  filterStates: FilterState<RecordType>[]
): Record<string, any[] | null> {
  const map: Record<string, any[] | null> = {};

  filterStates.forEach((filterState) => {
    const { key, filteredKeys, column } = filterState;
    const { filters, filterDropdown } = column;

    if (filterDropdown) {
      map[key] = filteredKeys || null;
    } else if (Array.isArray(filteredKeys)) {
      const filterValues = collectFilterValues(filters);
      map[key] = filterValues.filter((value) => {
        return filteredKeys.includes(String(value));
      });
    } else {
      map[key] = null;
    }
  });

  return map;
}

export default function useFilter<RecordType>(
  options: UseFilterOptions<RecordType>
): [
  (columns: ColumnType<RecordType>[]) => ColumnType<RecordType>[],
  FilterState<RecordType>[],
  () => Record<string, any[] | null>
] {
  const {
    prefixCls,
    dropdownPrefixCls,
    mergedColumns,
    onFilterChange,
    getPopupContainer,
    locale
  } = options;

  const [filterStates, setFilterStates] = useState<FilterState<RecordType>[]>(() => 
    generateFilterStates(mergedColumns, true)
  );

  const mergedFilterStates = useMemo(() => {
    const states = generateFilterStates(mergedColumns, false);
    const allUndefined = states.every((state) => state.filteredKeys === undefined);
    return allUndefined ? filterStates : states;
  }, [mergedColumns, filterStates]);

  const getFilters = useCallback(() => {
    return getFilteredKeysMap(mergedFilterStates);
  }, [mergedFilterStates]);

  const triggerFilter = (filterState: FilterState<RecordType>): void => {
    const newFilterStates = mergedFilterStates.filter((state) => state.key !== filterState.key);
    newFilterStates.push(filterState);
    setFilterStates(newFilterStates);
    onFilterChange(getFilteredKeysMap(newFilterStates), newFilterStates);
  };

  const transformColumns = (columns: ColumnType<RecordType>[]): ColumnType<RecordType>[] => {
    return injectFilterColumn(
      prefixCls,
      dropdownPrefixCls,
      columns,
      mergedFilterStates,
      triggerFilter,
      getPopupContainer,
      locale
    );
  };

  return [transformColumns, mergedFilterStates, getFilters];
}