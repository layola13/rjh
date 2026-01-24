/**
 * FixedHeader 组件类型定义
 * 用于渲染表格的固定头部，支持横向滚动和粘性定位
 */

import { ForwardRefExoticComponent, RefAttributes, CSSProperties, UIEvent } from 'react';

/**
 * 列的固定位置类型
 */
type FixedType = 'left' | 'right' | boolean | null;

/**
 * 方向类型
 */
type DirectionType = 'ltr' | 'rtl';

/**
 * 列定义接口
 */
interface ColumnType<RecordType = unknown> {
  /** 列的固定位置 */
  fixed?: FixedType;
  /** 列宽度 */
  width?: number | string;
  /** 最小列宽 */
  minWidth?: number | string;
  /** 自定义头部单元格属性 */
  onHeaderCell?: (column: ColumnType<RecordType>) => HeaderCellProps;
  /** 子列（用于分组表头） */
  children?: ColumnType<RecordType>[];
  [key: string]: unknown;
}

/**
 * 头部单元格属性
 */
interface HeaderCellProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 列跨度 */
  colSpan?: number;
  /** 行跨度 */
  rowSpan?: number;
  [key: string]: unknown;
}

/**
 * 粘性偏移量配置
 */
interface StickyOffsets {
  /** 左侧固定列的偏移量数组 */
  left: number[];
  /** 右侧固定列的偏移量数组 */
  right: number[];
  /** 是否启用粘性定位 */
  isSticky?: boolean;
}

/**
 * 滚动事件参数
 */
interface ScrollEvent {
  /** 当前滚动的目标元素 */
  currentTarget: HTMLElement;
  /** 横向滚动位置 */
  scrollLeft: number;
}

/**
 * FixedHeader 组件属性
 */
export interface FixedHeaderProps<RecordType = unknown> {
  /** 是否无数据 */
  noData?: boolean;
  /** 原始列配置 */
  columns: ColumnType<RecordType>[];
  /** 扁平化后的列配置（处理分组表头后） */
  flattenColumns: ColumnType<RecordType>[];
  /** 各列的宽度数组 */
  colWidths: number[];
  /** 列的总数量 */
  columCount: number;
  /** 粘性定位的偏移量配置 */
  stickyOffsets: StickyOffsets;
  /** 文本方向 */
  direction?: DirectionType;
  /** 是否固定头部 */
  fixHeader?: boolean;
  /** 头部的偏移量（用于粘性定位） */
  offsetHeader?: number;
  /** 粘性定位时的自定义类名 */
  stickyClassName?: string;
  /** 滚动事件回调 */
  onScroll?: (event: ScrollEvent) => void;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 表格上下文接口
 */
interface TableContextType {
  /** 样式前缀 */
  prefixCls: string;
  /** 滚动条尺寸 */
  scrollbarSize: number;
  /** 是否启用粘性定位 */
  isSticky: boolean;
}

/**
 * FixedHeader 组件
 * 
 * 渲染表格的固定头部，特性包括：
 * - 支持横向滚动同步
 * - 支持粘性定位
 * - 支持固定列（左右固定）
 * - 支持 RTL 布局
 * - 自动计算滚动条占位
 * 
 * @example
 *