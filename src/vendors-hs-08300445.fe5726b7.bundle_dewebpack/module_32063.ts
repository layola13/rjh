import * as React from 'react';
import { forwardRef, useRef, useCallback, useEffect, useMemo, useContext } from 'react';
import classNames from 'classnames';
import { fillRef } from '../utils';
import TableContext from '../context/TableContext';
import ColGroup from './ColGroup';
import TableHeader from './TableHeader';

interface StickyOffsets {
  left: number[];
  right: number[];
  isSticky?: boolean;
}

interface ColumnType<RecordType = unknown> {
  fixed?: 'left' | 'right' | boolean;
  onHeaderCell?: (column: ColumnType<RecordType>) => React.HTMLAttributes<HTMLTableCellElement>;
  [key: string]: unknown;
}

interface FixedHeaderProps<RecordType = unknown> {
  noData?: boolean;
  columns: ColumnType<RecordType>[];
  flattenColumns: ColumnType<RecordType>[];
  colWidths: number[];
  columCount: number;
  stickyOffsets: StickyOffsets;
  direction: 'ltr' | 'rtl';
  fixHeader: boolean;
  offsetHeader: number;
  stickyClassName?: string;
  onScroll: (info: { currentTarget: HTMLElement; scrollLeft: number }) => void;
}

interface TableContextType {
  prefixCls: string;
  scrollbarSize: number;
  isSticky: boolean;
}

const FixedHeader = forwardRef<HTMLDivElement, FixedHeaderProps>((props, ref) => {
  const {
    noData,
    columns,
    flattenColumns,
    colWidths,
    columCount,
    stickyOffsets,
    direction,
    fixHeader,
    offsetHeader,
    stickyClassName,
    onScroll,
    ...restProps
  } = props;

  const {
    prefixCls,
    scrollbarSize,
    isSticky
  } = useContext<TableContextType>(TableContext);

  const scrollbarWidth = isSticky && !fixHeader ? 0 : scrollbarSize;
  const internalRef = useRef<HTMLDivElement | null>(null);

  const mergedRef = useCallback((element: HTMLDivElement | null) => {
    fillRef(ref, element);
    fillRef(internalRef, element);
  }, [ref]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const target = event.currentTarget as HTMLElement;
      const deltaX = event.deltaX;

      if (deltaX) {
        onScroll({
          currentTarget: target,
          scrollLeft: target.scrollLeft + deltaX
        });
        event.preventDefault();
      }
    };

    internalRef.current?.addEventListener('wheel', handleWheel);

    return () => {
      internalRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, [onScroll]);

  const lastColumn = flattenColumns[flattenColumns.length - 1];
  const scrollbarColumn: ColumnType = {
    fixed: lastColumn ? lastColumn.fixed : null,
    onHeaderCell: () => ({
      className: `${prefixCls}-cell-scrollbar`
    })
  };

  const mergedColumns = useMemo(() => {
    return scrollbarWidth ? [...columns, scrollbarColumn] : columns;
  }, [scrollbarWidth, columns, scrollbarColumn]);

  const mergedFlattenColumns = useMemo(() => {
    return scrollbarWidth ? [...flattenColumns, scrollbarColumn] : flattenColumns;
  }, [scrollbarWidth, flattenColumns, scrollbarColumn]);

  const mergedStickyOffsets = useMemo(() => {
    const { right, left } = stickyOffsets;

    return {
      ...stickyOffsets,
      left: direction === 'rtl' 
        ? [...left.map(offset => offset + scrollbarWidth), 0] 
        : left,
      right: direction === 'rtl' 
        ? right 
        : [...right.map(offset => offset + scrollbarWidth), 0],
      isSticky
    };
  }, [scrollbarWidth, stickyOffsets, isSticky, direction]);

  const mergedColWidths = useMemo(() => {
    const widths: number[] = [];
    
    for (let i = 0; i < columCount; i++) {
      const width = colWidths[i];
      if (width === undefined) {
        return null;
      }
      widths[i] = width;
    }
    
    return widths;
  }, [colWidths.join('_'), columCount]);

  return (
    <div
      style={{
        overflow: 'hidden',
        ...(isSticky ? { top: offsetHeader } : {})
      }}
      ref={mergedRef}
      className={classNames(`${prefixCls}-header`, {
        [stickyClassName ?? '']: !!stickyClassName
      })}
    >
      <table
        style={{
          tableLayout: 'fixed',
          visibility: noData || mergedColWidths ? undefined : 'hidden'
        }}
      >
        <ColGroup
          colWidths={mergedColWidths ? [...mergedColWidths, scrollbarWidth] : []}
          columCount={columCount + 1}
          columns={mergedFlattenColumns}
        />
        <TableHeader
          {...restProps}
          stickyOffsets={mergedStickyOffsets}
          columns={mergedColumns}
          flattenColumns={mergedFlattenColumns}
        />
      </table>
    </div>
  );
});

FixedHeader.displayName = 'FixedHeader';

export default FixedHeader;