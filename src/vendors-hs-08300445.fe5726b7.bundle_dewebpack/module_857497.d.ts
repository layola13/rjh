/**
 * 表格列配置转换工具模块
 * 用于将React children转换为Table columns配置，并处理展开行、固定列等功能
 */

import React, { ReactElement, ReactNode } from 'react';

/**
 * 列固定位置类型
 */
type FixedType = 'left' | 'right' | boolean;

/**
 * 表格列配置接口
 */
interface ColumnType<RecordType = any> {
  /** 列的唯一标识 */
  key?: React.Key;
  /** 列标题 */
  title?: ReactNode;
  /** 数据字段名 */
  dataIndex?: string | string[];
  /** 列宽度 */
  width?: number | string;
  /** 固定列位置 */
  fixed?: FixedType;
  /** 自定义渲染函数 */
  render?: (value: any, record: RecordType, index: number) => ReactNode;
  /** 子列配置（用于表头分组） */
  children?: ColumnType<RecordType>[];
  /** 自定义类名 */
  className?: string;
  /** 内部列定义标识 */
  [key: string]: any;
}

/**
 * 展开配置接口
 */
interface ExpandableConfig<RecordType = any> {
  /** 是否可展开 */
  expandable?: boolean;
  /** 已展开的行key集合 */
  expandedKeys?: Set<React.Key>;
  /** 获取行唯一key的函数 */
  getRowKey?: (record: RecordType, index: number) => React.Key;
  /** 触发展开/收起的回调 */
  onTriggerExpand?: (record: RecordType, event: React.MouseEvent) => void;
  /** 自定义展开图标 */
  expandIcon?: (props: ExpandIconProps<RecordType>) => ReactNode;
  /** 判断行是否可展开 */
  rowExpandable?: (record: RecordType) => boolean;
  /** 展开图标所在列的索引 */
  expandIconColumnIndex?: number;
  /** 点击行是否触发展开 */
  expandRowByClick?: boolean;
  /** 展开列宽度 */
  columnWidth?: number;
}

/**
 * 展开图标属性接口
 */
interface ExpandIconProps<RecordType = any> {
  /** 样式前缀 */
  prefixCls: string;
  /** 是否已展开 */
  expanded: boolean;
  /** 是否可展开 */
  expandable: boolean;
  /** 当前行数据 */
  record: RecordType;
  /** 展开/收起回调 */
  onExpand: (record: RecordType, event: React.MouseEvent) => void;
}

/**
 * 表格配置属性接口
 */
interface TableProps<RecordType = any> {
  /** 样式类名前缀 */
  prefixCls: string;
  /** 列配置数组 */
  columns?: ColumnType<RecordType>[];
  /** React子元素（可转换为列配置） */
  children?: ReactNode;
  /** 展开行配置 */
  expandable?: boolean;
  /** 已展开的行key集合 */
  expandedKeys?: Set<React.Key>;
  /** 获取行key的函数 */
  getRowKey?: (record: RecordType, index: number) => React.Key;
  /** 触发展开的回调 */
  onTriggerExpand?: (record: RecordType, event: React.MouseEvent) => void;
  /** 展开图标渲染函数 */
  expandIcon?: (props: ExpandIconProps<RecordType>) => ReactNode;
  /** 行是否可展开的判断函数 */
  rowExpandable?: (record: RecordType) => boolean;
  /** 展开图标列索引 */
  expandIconColumnIndex?: number;
  /** 文本方向（LTR/RTL） */
  direction?: 'ltr' | 'rtl';
  /** 点击行展开 */
  expandRowByClick?: boolean;
  /** 展开列宽度 */
  columnWidth?: number;
}

/**
 * 列转换函数类型
 */
type ColumnTransformer<RecordType = any> = (
  columns: ColumnType<RecordType>[]
) => ColumnType<RecordType>[];

/**
 * 内部列定义标识常量
 */
declare const INTERNAL_COL_DEFINE: unique symbol;

/**
 * 将React children转换为列配置数组
 * 递归处理嵌套的children结构
 * 
 * @param children - React子元素
 * @returns 列配置数组
 */
export function convertChildrenToColumns(
  children: ReactNode
): ColumnType[] {
  return React.Children.toArray(children)
    .filter((child): child is ReactElement => React.isValidElement(child))
    .map((element) => {
      const { key, props } = element;
      const { children: nestedChildren, ...restProps } = props;
      
      const column: ColumnType = {
        key: key ?? undefined,
        ...restProps,
      };

      if (nestedChildren) {
        column.children = convertChildrenToColumns(nestedChildren);
      }

      return column;
    });
}

/**
 * 展平列配置，处理固定列的继承关系
 * 将嵌套的列配置展平为一维数组，子列继承父列的fixed属性
 * 
 * @param columns - 列配置数组
 * @returns 展平后的列配置数组
 */
function flattenColumns<RecordType = any>(
  columns: ColumnType<RecordType>[]
): ColumnType<RecordType>[] {
  return columns.reduce<ColumnType<RecordType>[]>((acc, column) => {
    const { fixed, children } = column;
    const normalizedFixed: FixedType | undefined = 
      fixed === true ? 'left' : (fixed as FixedType);

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

/**
 * 处理表格列配置的主函数
 * 合并columns和children配置，处理展开列，应用列转换，处理RTL方向
 * 
 * @param props - 表格配置属性
 * @param columnTransformer - 可选的列转换函数
 * @returns [处理后的列配置数组, 展平后的列配置数组]
 */
export default function useColumns<RecordType = any>(
  props: TableProps<RecordType>,
  columnTransformer?: ColumnTransformer<RecordType>
): [ColumnType<RecordType>[], ColumnType<RecordType>[]] {
  const {
    prefixCls,
    columns,
    children,
    expandable,
    expandedKeys = new Set(),
    getRowKey,
    onTriggerExpand,
    expandIcon,
    rowExpandable,
    expandIconColumnIndex,
    direction = 'ltr',
    expandRowByClick,
    columnWidth,
  } = props;

  // 合并columns和children配置
  const mergedColumns = React.useMemo<ColumnType<RecordType>[]>(() => {
    return columns ?? convertChildrenToColumns(children);
  }, [columns, children]);

  // 插入展开列
  const columnsWithExpand = React.useMemo<ColumnType<RecordType>[]>(() => {
    if (!expandable) {
      return mergedColumns;
    }

    const expandColumnIndex = expandIconColumnIndex ?? 0;
    const targetColumn = mergedColumns[expandColumnIndex];

    const expandColumn: ColumnType<RecordType> = {
      [INTERNAL_COL_DEFINE]: {
        className: `${prefixCls}-expand-icon-col`,
      },
      title: '',
      fixed: targetColumn?.fixed ?? undefined,
      className: `${prefixCls}-row-expand-icon-cell`,
      width: columnWidth,
      render: (_value: any, record: RecordType, index: number) => {
        const rowKey = getRowKey?.(record, index);
        const expanded = rowKey !== undefined && expandedKeys.has(rowKey);
        const expandableRow = !rowExpandable || rowExpandable(record);

        const iconNode = expandIcon?.({
          prefixCls,
          expanded,
          expandable: expandableRow,
          record,
          onExpand: onTriggerExpand!,
        });

        if (expandRowByClick) {
          return (
            <span onClick={(e) => e.stopPropagation()}>
              {iconNode}
            </span>
          );
        }

        return iconNode;
      },
    };

    const newColumns = [...mergedColumns];
    if (expandColumnIndex >= 0) {
      newColumns.splice(expandColumnIndex, 0, expandColumn);
    }

    return newColumns;
  }, [
    expandable,
    mergedColumns,
    getRowKey,
    expandedKeys,
    expandIcon,
    direction,
  ]);

  // 应用列转换器
  const transformedColumns = React.useMemo<ColumnType<RecordType>[]>(() => {
    let result = columnsWithExpand;

    if (columnTransformer) {
      result = columnTransformer(result);
    }

    // 确保至少有一列
    if (result.length === 0) {
      result = [
        {
          render: () => null,
        },
      ];
    }

    return result;
  }, [columnTransformer, columnsWithExpand, direction]);

  // 处理RTL方向的固定列
  const finalColumns = React.useMemo<ColumnType<RecordType>[]>(() => {
    if (direction === 'rtl') {
      return flattenColumns(transformedColumns).map((column) => {
        const { fixed, ...restColumn } = column;
        let mirroredFixed: FixedType | undefined = fixed;

        if (fixed === 'left') {
          mirroredFixed = 'right';
        } else if (fixed === 'right') {
          mirroredFixed = 'left';
        }

        return {
          fixed: mirroredFixed,
          ...restColumn,
        };
      });
    }

    return flattenColumns(transformedColumns);
  }, [transformedColumns, direction]);

  return [transformedColumns, finalColumns];
}