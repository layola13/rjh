import { useContext, useMemo, createElement } from 'react';
import type { ReactElement } from 'react';
import HeaderRow from './HeaderRow';
import TableContext from './TableContext';

interface Column<T = any> {
  key: string;
  className?: string;
  title?: React.ReactNode;
  children?: Column<T>[];
  colSpan?: number;
  rowSpan?: number;
}

interface CellData<T = any> {
  key: string;
  className: string;
  children: React.ReactNode;
  column: Column<T>;
  colStart: number;
  colEnd: number;
  colSpan: number;
  rowSpan?: number;
  hasSubColumns?: boolean;
}

interface StickyOffsets {
  left?: number[];
  right?: number[];
}

interface TableHeaderProps<T = any> {
  stickyOffsets: StickyOffsets;
  columns: Column<T>[];
  flattenColumns: Column<T>[];
  onHeaderRow?: (columns: Column<T>[], index: number) => Record<string, any>;
}

function generateHeaderCells<T>(columns: Column<T>[]): CellData<T>[][] {
  const rows: CellData<T>[][] = [];

  function processColumns(
    columnList: Column<T>[],
    startColumn: number,
    depth: number = 0
  ): number[] {
    rows[depth] = rows[depth] || [];
    let currentColumn = startColumn;

    return columnList.filter(Boolean).map((column) => {
      const cell: CellData<T> = {
        key: column.key,
        className: column.className || '',
        children: column.title,
        column: column,
        colStart: currentColumn,
        colEnd: 0,
        colSpan: 1,
      };

      let columnSpan = 1;
      const { children } = column;

      if (children && children.length > 0) {
        const childSpans = processColumns(children, currentColumn, depth + 1);
        columnSpan = childSpans.reduce((sum, span) => sum + span, 0);
        cell.hasSubColumns = true;
      }

      if ('colSpan' in column && column.colSpan !== undefined) {
        columnSpan = column.colSpan;
      }

      if ('rowSpan' in column && column.rowSpan !== undefined) {
        cell.rowSpan = column.rowSpan;
      }

      cell.colSpan = columnSpan;
      cell.colEnd = cell.colStart + columnSpan - 1;
      rows[depth].push(cell);
      currentColumn += columnSpan;

      return columnSpan;
    });
  }

  processColumns(columns, 0);

  const totalDepth = rows.length;
  for (let depth = 0; depth < totalDepth; depth += 1) {
    rows[depth].forEach((cell) => {
      if (!('rowSpan' in cell) && !cell.hasSubColumns) {
        cell.rowSpan = totalDepth - depth;
      }
    });
  }

  return rows;
}

export default function TableHeader<T = any>(props: TableHeaderProps<T>): ReactElement {
  const { stickyOffsets, columns, flattenColumns, onHeaderRow } = props;
  const context = useContext(TableContext);
  const { prefixCls, getComponent } = context;

  const headerCellRows = useMemo(() => {
    return generateHeaderCells(columns);
  }, [columns]);

  const TheadWrapper = getComponent(['header', 'wrapper'], 'thead');
  const TrComponent = getComponent(['header', 'row'], 'tr');
  const ThComponent = getComponent(['header', 'cell'], 'th');

  return createElement(
    TheadWrapper,
    { className: `${prefixCls}-thead` },
    headerCellRows.map((cells, index) =>
      createElement(HeaderRow, {
        key: index,
        flattenColumns: flattenColumns,
        cells: cells,
        stickyOffsets: stickyOffsets,
        rowComponent: TrComponent,
        cellComponent: ThComponent,
        onHeaderRow: onHeaderRow,
        index: index,
      })
    )
  );
}