/**
 * React Table 排序功能模块
 * 提供表格列排序的钩子和工具函数
 */

import type { ReactNode } from 'react';

/** 排序方向常量 */
export type SortOrder = 'ascend' | 'descend' | null;

/** 排序方向数组 */
export type SortDirections = ReadonlyArray<'ascend' | 'descend'>;

/**
 * 表格列定义
 */
export interface ColumnType<RecordType = any> {
  /** 列的唯一标识 */
  key?: string | number;
  /** 数据索引，用于访问记录中的数据 */
  dataIndex?: string | string[];
  /** 列标题 */
  title?: ReactNode | ((config: any) => ReactNode);
  /** 列的CSS类名 */
  className?: string;
  /** 子列 */
  children?: ColumnType<RecordType>[];
  /** 排序配置 */
  sorter?: SorterConfig<RecordType>;
  /** 当前排序状态 */
  sortOrder?: SortOrder;
  /** 默认排序状态（仅在初始化时使用） */
  defaultSortOrder?: SortOrder;
  /** 支持的排序方向 */
  sortDirections?: SortDirections;
  /** 是否显示排序提示 */
  showSorterTooltip?: boolean | TooltipProps;
  /** 头部单元格事件配置 */
  onHeaderCell?: (column: ColumnType<RecordType>) => HeaderCellProps;
}

/**
 * 排序器配置
 */
export interface SorterConfig<RecordType> {
  /** 排序比较函数 */
  compare?: (a: RecordType, b: RecordType, sortOrder?: SortOrder) => number;
  /** 多列排序优先级（false表示单列排序） */
  multiple?: number | false;
}

/**
 * 排序器完整配置（内部使用）
 */
export type SorterType<RecordType> = 
  | ((a: RecordType, b: RecordType, sortOrder?: SortOrder) => number)
  | SorterConfig<RecordType>
  | boolean;

/**
 * 排序状态项
 */
export interface SortState<RecordType> {
  /** 关联的列 */
  column: ColumnType<RecordType>;
  /** 列的唯一键 */
  key: string | number;
  /** 当前排序方向 */
  sortOrder: SortOrder;
  /** 多列排序优先级 */
  multiplePriority: number | false;
}

/**
 * 排序列信息
 */
export interface SortColumn<RecordType> {
  /** 关联的列 */
  column: ColumnType<RecordType>;
  /** 排序方向 */
  order: SortOrder;
}

/**
 * 排序结果对象
 */
export interface SortResult<RecordType> {
  /** 所有排序列的数组 */
  sortColumns: SortColumn<RecordType>[];
  /** 当前主排序列 */
  sortColumn?: ColumnType<RecordType>;
  /** 当前主排序方向 */
  sortOrder?: SortOrder;
}

/**
 * 传统排序状态（向后兼容）
 */
export interface LegacySortState<RecordType> {
  /** 关联的列（可能为undefined） */
  column?: ColumnType<RecordType>;
  /** 排序方向 */
  order?: SortOrder;
  /** 数据字段 */
  field?: string | string[];
  /** 列键 */
  columnKey?: string | number;
}

/**
 * 表格国际化文本
 */
export interface TableLocale {
  /** 取消排序提示文本 */
  cancelSort?: string;
  /** 升序排序提示文本 */
  triggerAsc?: string;
  /** 降序排序提示文本 */
  triggerDesc?: string;
}

/**
 * Tooltip组件属性
 */
export interface TooltipProps {
  /** 提示文本 */
  title?: ReactNode;
  [key: string]: any;
}

/**
 * 头部单元格属性
 */
export interface HeaderCellProps {
  /** 点击事件 */
  onClick?: (event: React.MouseEvent) => void;
  /** CSS类名 */
  className?: string;
  [key: string]: any;
}

/**
 * 排序钩子参数
 */
export interface UseSorterParams<RecordType> {
  /** 表格CSS类名前缀 */
  prefixCls: string;
  /** 合并后的列配置 */
  mergedColumns: ColumnType<RecordType>[];
  /** 排序变化回调 */
  onSorterChange: (
    sorterResult: LegacySortState<RecordType> | LegacySortState<RecordType>[],
    sortStates: SortState<RecordType>[]
  ) => void;
  /** 默认排序方向 */
  sortDirections: SortDirections;
  /** 表格国际化文本 */
  tableLocale: TableLocale;
  /** 是否显示排序提示 */
  showSorterTooltip?: boolean | TooltipProps;
}

/**
 * 排序钩子返回值
 * @template RecordType 表格记录类型
 */
export type UseSorterResult<RecordType> = [
  /** 转换后的列配置（添加了排序UI） */
  transformedColumns: ColumnType<RecordType>[],
  /** 当前排序状态列表 */
  sortStates: SortState<RecordType>[],
  /** 排序结果对象 */
  sortResult: SortResult<RecordType>,
  /** 获取传统格式的排序状态 */
  getLegacySortState: () => LegacySortState<RecordType> | LegacySortState<RecordType>[]
];

/**
 * 排序功能钩子
 * 管理表格列的排序状态和UI
 * 
 * @param params 排序配置参数
 * @returns 排序钩子结果元组
 * 
 * @example
 *