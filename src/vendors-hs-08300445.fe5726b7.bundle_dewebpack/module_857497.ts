import React from 'react';

interface Column {
  key?: React.Key;
  fixed?: boolean | 'left' | 'right';
  children?: Column[];
  [key: string]: any;
}

interface ExpandableConfig {
  expandedKeys: Set<React.Key>;
  expandIcon: (config: ExpandIconConfig) => React.ReactNode;
  rowExpandable?: (record: any) => boolean;
  expandIconColumnIndex?: number;
  expandRowByClick?: boolean;
  columnWidth?: number | string;
}

interface ExpandIconConfig {
  prefixCls: string;
  expanded: boolean;
  expandable: boolean;
  record: any;
  onExpand: (record: any, event: React.MouseEvent) => void;
}

interface TableProps {
  prefixCls: string;
  columns?: Column[];
  children?: React.ReactNode;
  expandable?: ExpandableConfig;
  expandedKeys: Set<React.Key>;
  getRowKey: (record: any, index: number) => React.Key;
  onTriggerExpand: (record: any, event: React.MouseEvent) => void;
  expandIcon: (config: ExpandIconConfig) => React.ReactNode;
  rowExpandable?: (record: any) => boolean;
  expandIconColumnIndex?: number;
  direction?: 'ltr' | 'rtl';
  expandRowByClick?: boolean;
  columnWidth?: number | string;
}

type ColumnTransformer = (columns: Column[]) => Column[];

const INTERNAL_COL_DEFINE = Symbol('INTERNAL_COL_DEFINE');

export function convertChildrenToColumns(children: React.ReactNode): Column[] {
  return React.Children.toArray(children)
    .filter((child): child is React.ReactElement => React.isValidElement(child))
    .map((element) => {
      const { key, props } = element;
      const { children: elementChildren, ...restProps } = props;
      
      const column: Column = {
        key: key ?? undefined,
        ...restProps,
      };

      if (elementChildren) {
        column.children = convertChildrenToColumns(elementChildren);
      }

      return column;
    });
}

function flattenColumns(columns: Column[]): Column[] {
  return columns.reduce<Column[]>((acc, column) => {
    const { fixed, children } = column;
    const normalizedFixed = fixed === true ? 'left' : fixed;
    
    if (children && children.length > 0) {
      const flattenedChildren = flattenColumns(children).map((child) => ({
        fixed: normalizedFixed,
        ...child,
      }));
      return [...acc, ...flattenedChildren];
    }

    return [
      ...acc,
      {
        ...column,
        fixed: normalizedFixed,
      },
    ];
  }, []);
}

function reverseFixedDirection(columns: Column[]): Column[] {
  return columns.map((column) => {
    const { fixed, ...restColumn } = column;
    let reversedFixed = fixed;

    if (fixed === 'left') {
      reversedFixed = 'right';
    } else if (fixed === 'right') {
      reversedFixed = 'left';
    }

    return {
      fixed: reversedFixed,
      ...restColumn,
    };
  });
}

export default function useColumns(
  props: TableProps,
  transformer?: ColumnTransformer
): [Column[], Column[]] {
  const {
    prefixCls,
    columns,
    children,
    expandable,
    expandedKeys,
    getRowKey,
    onTriggerExpand,
    expandIcon,
    rowExpandable,
    expandIconColumnIndex,
    direction,
    expandRowByClick,
    columnWidth,
  } = props;

  const baseColumns = React.useMemo<Column[]>(() => {
    return columns || convertChildrenToColumns(children);
  }, [columns, children]);

  const columnsWithExpand = React.useMemo<Column[]>(() => {
    if (expandable) {
      const insertIndex = expandIconColumnIndex ?? 0;
      const referenceColumn = baseColumns[insertIndex];

      const expandColumn: Column = {
        [INTERNAL_COL_DEFINE]: {
          className: `${prefixCls}-expand-icon-col`,
        },
        title: '',
        fixed: referenceColumn?.fixed ?? null,
        className: `${prefixCls}-row-expand-icon-cell`,
        width: columnWidth,
        render: (value: any, record: any, index: number) => {
          const rowKey = getRowKey(record, index);
          const expanded = expandedKeys.has(rowKey);
          const expandable = !rowExpandable || rowExpandable(record);

          const iconNode = expandIcon({
            prefixCls,
            expanded,
            expandable,
            record,
            onExpand: onTriggerExpand,
          });

          if (expandRowByClick) {
            return (
              <span onClick={(event) => event.stopPropagation()}>
                {iconNode}
              </span>
            );
          }

          return iconNode;
        },
      };

      const newColumns = [...baseColumns];
      if (insertIndex >= 0) {
        newColumns.splice(insertIndex, 0, expandColumn);
      }
      return newColumns;
    }

    return baseColumns;
  }, [
    expandable,
    baseColumns,
    getRowKey,
    expandedKeys,
    expandIcon,
    direction,
  ]);

  const transformedColumns = React.useMemo<Column[]>(() => {
    let result = columnsWithExpand;

    if (transformer) {
      result = transformer(result);
    }

    if (result.length === 0) {
      result = [
        {
          render: () => null,
        },
      ];
    }

    return result;
  }, [transformer, columnsWithExpand, direction]);

  const flatColumns = React.useMemo<Column[]>(() => {
    const flattened = flattenColumns(transformedColumns);

    if (direction === 'rtl') {
      return reverseFixedDirection(flattened);
    }

    return flattened;
  }, [transformedColumns, direction]);

  return [transformedColumns, flatColumns];
}