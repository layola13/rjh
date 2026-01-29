import { useCallback } from 'react';

interface ColumnType<T = any> {
  title?: React.ReactNode | ((props: any) => React.ReactNode);
  children?: ColumnType<T>[];
  [key: string]: any;
}

function processColumns<T>(
  columns: ColumnType<T>[],
  renderProps: any
): ColumnType<T>[] {
  return columns.map((column) => {
    const processedColumn = { ...column };
    
    processedColumn.title = renderColumnTitle(column.title, renderProps);
    
    if ('children' in processedColumn && processedColumn.children) {
      processedColumn.children = processColumns(processedColumn.children, renderProps);
    }
    
    return processedColumn;
  });
}

function renderColumnTitle(
  title: React.ReactNode | ((props: any) => React.ReactNode) | undefined,
  props: any
): React.ReactNode {
  if (typeof title === 'function') {
    return title(props);
  }
  return title;
}

export default function useProcessedColumns<T>(
  renderProps: any
): [(columns: ColumnType<T>[]) => ColumnType<T>[]] {
  return [
    useCallback(
      (columns: ColumnType<T>[]) => {
        return processColumns(columns, renderProps);
      },
      [renderProps]
    )
  ];
}