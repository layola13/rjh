import { useContext, createElement, ReactElement } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';

interface ColumnType<T = unknown> {
  ellipsis?: boolean;
  align?: 'left' | 'center' | 'right';
  onHeaderCell?: (column: ColumnType<T>) => HTMLAttributes<HTMLElement>;
  [key: string]: unknown;
}

interface CellType<T = unknown> {
  column: ColumnType<T>;
  colStart: number;
  colEnd: number;
  [key: string]: unknown;
}

interface StickyOffsets {
  left?: number[];
  right?: number[];
}

interface FixedInfo {
  fixedLeft?: boolean | number;
  fixedRight?: boolean | number;
  lastFixedLeft?: boolean;
  firstFixedRight?: boolean;
  style?: CSSProperties;
}

interface TableContext {
  prefixCls: string;
  direction: 'ltr' | 'rtl';
}

interface HeaderRowProps<T = unknown> {
  cells: CellType<T>[];
  stickyOffsets: StickyOffsets;
  flattenColumns: ColumnType<T>[];
  rowComponent: React.ComponentType<unknown>;
  cellComponent: React.ComponentType<unknown>;
  onHeaderRow?: (columns: ColumnType<T>[], index: number) => HTMLAttributes<HTMLElement> | undefined;
  index: number;
}

const TableContext = createContext<TableContext>({
  prefixCls: '',
  direction: 'ltr'
});

function getColumnsKey<T>(columns: ColumnType<T>[]): string[] {
  return columns.map((col, index) => {
    return col.key?.toString() ?? `column-${index}`;
  });
}

function getCellFixedInfo<T>(
  colStart: number,
  colEnd: number,
  flattenColumns: ColumnType<T>[],
  stickyOffsets: StickyOffsets,
  direction: 'ltr' | 'rtl'
): FixedInfo {
  const fixedInfo: FixedInfo = {};
  
  const leftOffsets = stickyOffsets.left ?? [];
  const rightOffsets = stickyOffsets.right ?? [];
  
  if (leftOffsets[colStart] !== undefined) {
    fixedInfo.fixedLeft = leftOffsets[colStart];
    fixedInfo.lastFixedLeft = colEnd === leftOffsets.length - 1;
  }
  
  if (rightOffsets[colEnd] !== undefined) {
    fixedInfo.fixedRight = rightOffsets[colEnd];
    fixedInfo.firstFixedRight = colStart === 0;
  }
  
  return fixedInfo;
}

function HeaderRow<T = unknown>(props: HeaderRowProps<T>): ReactElement {
  const {
    cells,
    stickyOffsets,
    flattenColumns,
    rowComponent: RowComponent,
    cellComponent: CellComponent,
    onHeaderRow,
    index
  } = props;

  const { prefixCls, direction } = useContext(TableContext);

  let rowProps: HTMLAttributes<HTMLElement> | undefined;
  if (onHeaderRow) {
    const columns = cells.map(cell => cell.column);
    rowProps = onHeaderRow(columns, index);
  }

  const columnsKey = getColumnsKey(cells.map(cell => cell.column));

  return createElement(
    RowComponent,
    rowProps,
    cells.map((cell, cellIndex) => {
      const { column } = cell;
      const fixedInfo = getCellFixedInfo(
        cell.colStart,
        cell.colEnd,
        flattenColumns,
        stickyOffsets,
        direction
      );

      let additionalProps: HTMLAttributes<HTMLElement> | undefined;
      if (column?.onHeaderCell) {
        additionalProps = column.onHeaderCell(column);
      }

      return createElement(CellComponent, {
        ...cell,
        ellipsis: column.ellipsis,
        align: column.align,
        component: CellComponent,
        prefixCls,
        key: columnsKey[cellIndex],
        ...fixedInfo,
        additionalProps,
        rowType: 'header'
      });
    })
  );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;