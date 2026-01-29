import { useState, useMemo, createElement } from 'react';
import classNames from 'classnames';
import UpIcon from './UpIcon';
import DownIcon from './DownIcon';
import Tooltip from './Tooltip';
import { getColumnKey, getColumnPos, renderColumnTitle } from './utils';

type SortOrder = 'ascend' | 'descend' | null;

const ASCEND: SortOrder = 'ascend';
const DESCEND: SortOrder = 'descend';

interface SorterConfig {
  multiple?: number;
  compare?: (a: unknown, b: unknown, sortOrder?: SortOrder) => number;
}

interface Column {
  key?: string;
  dataIndex?: string | string[];
  title?: React.ReactNode | ((props: unknown) => React.ReactNode);
  sorter?: boolean | SorterConfig | ((a: unknown, b: unknown, sortOrder?: SortOrder) => number);
  sortOrder?: SortOrder;
  defaultSortOrder?: SortOrder;
  sortDirections?: SortOrder[];
  multiplePriority?: boolean;
  showSorterTooltip?: boolean | { title?: string };
  className?: string;
  children?: Column[];
  onHeaderCell?: (column: Column) => Record<string, unknown>;
}

interface SortState {
  column: Column;
  key: string;
  multiplePriority: number | false;
  sortOrder: SortOrder;
}

interface SortResult {
  column?: Column;
  order?: SortOrder;
  field?: string | string[];
  columnKey?: string;
}

interface TableLocale {
  cancelSort?: string;
  triggerAsc?: string;
  triggerDesc?: string;
}

interface UseSorterParams {
  prefixCls: string;
  mergedColumns: Column[];
  onSorterChange: (sorter: SortResult | SortResult[], sortStates: SortState[]) => void;
  sortDirections: SortOrder[];
  tableLocale?: TableLocale;
  showSorterTooltip?: boolean | { title?: string };
}

function getMultiplePriority(column: Column): number | false {
  return typeof column.sorter === 'object' && 
         typeof column.sorter.multiple === 'number' && 
         column.sorter.multiple
    ? column.sorter.multiple
    : false;
}

function getColumnSorter(sorter: Column['sorter']): ((a: unknown, b: unknown, sortOrder?: SortOrder) => number) | false {
  if (typeof sorter === 'function') {
    return sorter;
  }
  
  if (sorter && typeof sorter === 'object' && sorter.compare) {
    return sorter.compare;
  }
  
  return false;
}

function collectSortStates(
  columns: Column[], 
  includeDefault: boolean, 
  position?: string
): SortState[] {
  const sortStates: SortState[] = [];

  function pushState(column: Column, key: string): void {
    sortStates.push({
      column,
      key,
      multiplePriority: getMultiplePriority(column),
      sortOrder: column.sortOrder!
    });
  }

  (columns || []).forEach((column, index) => {
    const pos = getColumnPos(index, position);
    
    if (column.children) {
      if ('sortOrder' in column) {
        pushState(column, getColumnKey(column, pos));
      }
      sortStates.push(...collectSortStates(column.children, includeDefault, pos));
    } else if (column.sorter) {
      if ('sortOrder' in column) {
        pushState(column, getColumnKey(column, pos));
      } else if (includeDefault && column.defaultSortOrder) {
        sortStates.push({
          column,
          key: getColumnKey(column, pos),
          multiplePriority: getMultiplePriority(column),
          sortOrder: column.defaultSortOrder
        });
      }
    }
  });

  return sortStates;
}

function injectSorter(
  prefixCls: string,
  columns: Column[],
  sortStates: SortState[],
  triggerSorter: (sortState: SortState) => void,
  defaultSortDirections: SortOrder[],
  tableLocale: TableLocale | undefined,
  showSorterTooltip: boolean | { title?: string } | undefined,
  position?: string
): Column[] {
  return (columns || []).map((column, index) => {
    const pos = getColumnPos(index, position);
    let newColumn = column;

    if (newColumn.sorter) {
      const sortDirections = newColumn.sortDirections || defaultSortDirections;
      const showTooltip = newColumn.showSorterTooltip === undefined 
        ? showSorterTooltip 
        : newColumn.showSorterTooltip;
      const columnKey = getColumnKey(newColumn, pos);
      const sortState = sortStates.find(state => state.key === columnKey);
      const currentSortOrder = sortState ? sortState.sortOrder : null;
      
      const nextSortOrder = getNextSortOrder(sortDirections, currentSortOrder);
      
      const upNode = sortDirections.includes(ASCEND) && createElement(UpIcon, {
        className: classNames(`${prefixCls}-column-sorter-up`, {
          active: currentSortOrder === ASCEND
        })
      });
      
      const downNode = sortDirections.includes(DESCEND) && createElement(DownIcon, {
        className: classNames(`${prefixCls}-column-sorter-down`, {
          active: currentSortOrder === DESCEND
        })
      });

      const locale = tableLocale || {};
      const { cancelSort, triggerAsc, triggerDesc } = locale;
      let tooltipTitle = cancelSort;
      
      if (nextSortOrder === DESCEND) {
        tooltipTitle = triggerDesc;
      } else if (nextSortOrder === ASCEND) {
        tooltipTitle = triggerAsc;
      }

      newColumn = {
        ...newColumn,
        className: classNames(newColumn.className, {
          [`${prefixCls}-column-sort`]: currentSortOrder
        }),
        title: (renderProps: unknown) => {
          const renderTitle = typeof column.title === 'function' 
            ? column.title(renderProps) 
            : column.title;
            
          const sorterNode = createElement('div', {
            className: `${prefixCls}-column-sorters`
          }, 
            createElement('span', null, renderColumnTitle(column.title, renderProps)),
            createElement('span', {
              className: classNames(`${prefixCls}-column-sorter`, {
                [`${prefixCls}-column-sorter-full`]: upNode && downNode
              })
            }, createElement('span', {
              className: `${prefixCls}-column-sorter-inner`
            }, upNode, downNode))
          );

          return showTooltip 
            ? createElement(Tooltip, { title: tooltipTitle }, 
                createElement('div', { 
                  className: `${prefixCls}-column-sorters-with-tooltip` 
                }, sorterNode))
            : sorterNode;
        },
        onHeaderCell: (col: Column) => {
          const cellProps = (column.onHeaderCell?.(col) || {}) as Record<string, unknown>;
          const originalOnClick = cellProps.onClick as ((e: Event) => void) | undefined;

          cellProps.onClick = (event: Event) => {
            triggerSorter({
              column,
              key: columnKey,
              sortOrder: nextSortOrder,
              multiplePriority: getMultiplePriority(column)
            });
            originalOnClick?.(event);
          };
          
          cellProps.className = classNames(
            cellProps.className, 
            `${prefixCls}-column-has-sorters`
          );

          return cellProps;
        }
      };
    }

    if ('children' in newColumn && newColumn.children) {
      newColumn = {
        ...newColumn,
        children: injectSorter(
          prefixCls,
          newColumn.children,
          sortStates,
          triggerSorter,
          defaultSortDirections,
          tableLocale,
          showSorterTooltip,
          pos
        )
      };
    }

    return newColumn;
  });
}

function getNextSortOrder(sortDirections: SortOrder[], current: SortOrder): SortOrder {
  if (!current) {
    return sortDirections[0];
  }
  
  const currentIndex = sortDirections.indexOf(current);
  return sortDirections[currentIndex + 1] || null;
}

function transformSortStateToResult(sortState: SortState): SortResult {
  const { column } = sortState;
  return {
    column,
    order: sortState.sortOrder,
    field: column.dataIndex,
    columnKey: column.key
  };
}

function generateSorterInfo(sortStates: SortState[]): SortResult | SortResult[] {
  const filteredStates = sortStates.filter(state => state.sortOrder);
  
  if (filteredStates.length === 0 && sortStates.length) {
    return {
      ...transformSortStateToResult(sortStates[sortStates.length - 1]),
      column: undefined
    };
  }
  
  if (filteredStates.length <= 1) {
    return filteredStates[0] ? transformSortStateToResult(filteredStates[0]) : {};
  }
  
  return filteredStates.map(transformSortStateToResult);
}

export function getSortData<RecordType>(
  data: RecordType[],
  sortStates: SortState[],
  childrenColumnName: string
): RecordType[] {
  const sortedStates = sortStates.slice().sort((a, b) => {
    const priorityA = typeof a.multiplePriority === 'number' ? a.multiplePriority : 0;
    const priorityB = typeof b.multiplePriority === 'number' ? b.multiplePriority : 0;
    return priorityB - priorityA;
  });

  const result = data.slice();
  const validSortStates = sortedStates.filter(state => {
    const sorterFn = getColumnSorter(state.column.sorter);
    return sorterFn && state.sortOrder;
  });

  if (!validSortStates.length) {
    return result;
  }

  return result.sort((record1, record2) => {
    for (let i = 0; i < validSortStates.length; i += 1) {
      const state = validSortStates[i];
      const sorterFn = getColumnSorter(state.column.sorter);
      const { sortOrder } = state;

      if (sorterFn && sortOrder) {
        const compareResult = sorterFn(record1, record2, sortOrder);
        if (compareResult !== 0) {
          return sortOrder === ASCEND ? compareResult : -compareResult;
        }
      }
    }
    return 0;
  }).map(record => {
    const children = (record as Record<string, unknown>)[childrenColumnName];
    if (children) {
      return {
        ...record,
        [childrenColumnName]: getSortData(children as RecordType[], sortStates, childrenColumnName)
      };
    }
    return record;
  });
}

export default function useSorter(params: UseSorterParams) {
  const {
    prefixCls,
    mergedColumns,
    onSorterChange,
    sortDirections,
    tableLocale,
    showSorterTooltip
  } = params;

  const [sortStates, setSortStates] = useState<SortState[]>(
    collectSortStates(mergedColumns, true)
  );

  const mergedSortStates = useMemo<SortState[]>(() => {
    let isControlled = true;
    const newStates = collectSortStates(mergedColumns, false);

    if (!newStates.length) {
      return sortStates;
    }

    const stateList: SortState[] = [];
    let multipleMode: boolean | null = null;

    function pushState(state: SortState): void {
      if (isControlled) {
        stateList.push(state);
      } else {
        stateList.push({
          ...state,
          sortOrder: null
        });
      }
    }

    newStates.forEach(state => {
      if (multipleMode === null) {
        pushState(state);
        if (state.sortOrder) {
          if (state.multiplePriority === false) {
            isControlled = false;
          } else {
            multipleMode = true;
          }
        }
      } else {
        if (multipleMode && state.multiplePriority !== false) {
          pushState(state);
        } else {
          isControlled = false;
          pushState(state);
        }
      }
    });

    return stateList;
  }, [mergedColumns, sortStates]);

  const columnsSortInfo = useMemo(() => {
    const sortColumns = mergedSortStates.map(state => ({
      column: state.column,
      order: state.sortOrder
    }));

    return {
      sortColumns,
      sortColumn: sortColumns[0]?.column,
      sortOrder: sortColumns[0]?.order
    };
  }, [mergedSortStates]);

  function triggerSorter(sortState: SortState): void {
    let newStates: SortState[];

    if (
      sortState.multiplePriority !== false &&
      mergedSortStates.length &&
      mergedSortStates[0].multiplePriority !== false
    ) {
      newStates = [
        ...mergedSortStates.filter(state => state.key !== sortState.key),
        sortState
      ];
    } else {
      newStates = [sortState];
    }

    setSortStates(newStates);
    onSorterChange(generateSorterInfo(newStates), newStates);
  }

  const transformColumns = (columns: Column[]) => 
    injectSorter(
      prefixCls,
      columns,
      mergedSortStates,
      triggerSorter,
      sortDirections,
      tableLocale,
      showSorterTooltip
    );

  const getSorters = () => generateSorterInfo(mergedSortStates);

  return [transformColumns, mergedSortStates, columnsSortInfo, getSorters] as const;
}