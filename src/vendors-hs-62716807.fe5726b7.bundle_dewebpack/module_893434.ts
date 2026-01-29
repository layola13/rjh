export function getColumnKey(column: ColumnType, defaultKey: string | number): string | number {
  if ("key" in column && column.key !== undefined && column.key !== null) {
    return column.key;
  }
  
  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) 
      ? column.dataIndex.join(".") 
      : column.dataIndex;
  }
  
  return defaultKey;
}

export function getColumnPos(index: number, parentPos?: string): string {
  return parentPos ? `${parentPos}-${index}` : `${index}`;
}

export function renderColumnTitle<T = any>(
  title: ColumnTitle<T>, 
  renderProps: T
): React.ReactNode {
  if (typeof title === "function") {
    return title(renderProps);
  }
  
  return title;
}

interface ColumnType {
  key?: string | number;
  dataIndex?: string | string[];
  [key: string]: any;
}

type ColumnTitle<T> = React.ReactNode | ((props: T) => React.ReactNode);