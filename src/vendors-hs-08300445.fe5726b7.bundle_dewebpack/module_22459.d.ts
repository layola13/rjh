/**
 * React Table Header Component
 * 用于渲染表格头部的组件，支持多级表头、粘性定位等功能
 */

/**
 * 表格列定义接口
 */
export interface Column<RecordType = any> {
  /** 列的唯一标识 */
  key: string | number;
  /** 列的CSS类名 */
  className?: string;
  /** 列标题内容 */
  title: React.ReactNode;
  /** 子列（用于多级表头） */
  children?: Column<RecordType>[];
  /** 列跨度 */
  colSpan?: number;
  /** 行跨度 */
  rowSpan?: number;
}

/**
 * 扁平化后的列信息
 */
export interface FlattenColumn<RecordType = any> extends Column<RecordType> {
  /** 列起始位置 */
  colStart: number;
  /** 列结束位置 */
  colEnd: number;
  /** 是否包含子列 */
  hasSubColumns?: boolean;
}

/**
 * 表头单元格信息
 */
export interface HeaderCell<RecordType = any> {
  /** 单元格唯一标识 */
  key: string | number;
  /** 单元格CSS类名 */
  className: string;
  /** 单元格内容 */
  children: React.ReactNode;
  /** 关联的列配置 */
  column: Column<RecordType>;
  /** 列起始位置 */
  colStart: number;
  /** 列结束位置 */
  colEnd: number;
  /** 列跨度 */
  colSpan: number;
  /** 行跨度（可选） */
  rowSpan?: number;
  /** 是否包含子列 */
  hasSubColumns?: boolean;
}

/**
 * 粘性定位偏移量配置
 */
export interface StickyOffsets {
  /** 左侧固定列的偏移量数组 */
  left?: number[];
  /** 右侧固定列的偏移量数组 */
  right?: number[];
  /** 是否有固定列 */
  isSticky?: boolean;
}

/**
 * 表头行回调函数类型
 */
export type OnHeaderRow<RecordType = any> = (
  columns: readonly Column<RecordType>[],
  index: number
) => React.HTMLAttributes<HTMLTableRowElement>;

/**
 * 表格头部组件属性
 */
export interface TableHeaderProps<RecordType = any> {
  /** 粘性定位偏移量配置 */
  stickyOffsets: StickyOffsets;
  /** 原始列配置数组 */
  columns: readonly Column<RecordType>[];
  /** 扁平化后的列配置数组 */
  flattenColumns: readonly FlattenColumn<RecordType>[];
  /** 表头行属性回调函数 */
  onHeaderRow?: OnHeaderRow<RecordType>;
}

/**
 * 表格头部组件
 * 负责渲染表格的thead部分，支持多级表头和列固定功能
 * 
 * @param props - 组件属性
 * @returns React表格头部元素
 * 
 * @example
 *