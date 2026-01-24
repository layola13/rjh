/**
 * 表格单元格组件类型定义
 * 用于渲染表格的单元格，支持固定列、省略、自定义渲染等功能
 */

import type { CSSProperties, ReactNode, ComponentType, RefAttributes } from 'react';

/**
 * 行类型枚举
 */
export type RowType = 'header' | 'body' | 'footer';

/**
 * 省略配置
 */
export interface EllipsisConfig {
  /** 是否在悬停时显示完整内容的 title */
  showTitle?: boolean;
}

/**
 * 自定义渲染函数的返回值
 */
export interface RenderResult<T = any> {
  /** 渲染的子节点 */
  children: ReactNode;
  /** 传递给单元格的额外属性 */
  props?: CellRenderProps;
}

/**
 * 单元格渲染函数返回的属性
 */
export interface CellRenderProps {
  /** 列跨度 */
  colSpan?: number;
  /** 行跨度 */
  rowSpan?: number;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 其他 HTML 属性 */
  [key: string]: any;
}

/**
 * 自定义渲染函数
 * @template RecordType 数据记录类型
 * @param value 当前单元格的值
 * @param record 当前行的完整数据
 * @param index 当前行的索引
 * @returns 渲染内容或包含渲染内容和属性的对象
 */
export type CellRender<RecordType = any> = (
  value: any,
  record: RecordType,
  index: number
) => ReactNode | RenderResult<RecordType>;

/**
 * 单元格组件属性
 * @template RecordType 数据记录类型
 */
export interface CellProps<RecordType = any> {
  /** 组件样式前缀 */
  prefixCls: string;
  
  /** 自定义类名 */
  className?: string;
  
  /** 当前行的数据记录 */
  record: RecordType;
  
  /** 当前行的索引 */
  index: number;
  
  /** 数据索引，用于从 record 中获取值 */
  dataIndex?: string | number | Array<string | number>;
  
  /** 自定义渲染函数 */
  render?: CellRender<RecordType>;
  
  /** 直接传入的子节点（优先级高于 render） */
  children?: ReactNode;
  
  /** 单元格使用的 HTML 元素或 React 组件 */
  component?: ComponentType<any> | keyof JSX.IntrinsicElements;
  
  /** 列跨度 */
  colSpan?: number;
  
  /** 行跨度 */
  rowSpan?: number;
  
  /** 左侧固定列的距离（像素） */
  fixLeft?: number | false;
  
  /** 右侧固定列的距离（像素） */
  fixRight?: number | false;
  
  /** 是否是第一个左侧固定列 */
  firstFixLeft?: boolean;
  
  /** 是否是最后一个左侧固定列 */
  lastFixLeft?: boolean;
  
  /** 是否是第一个右侧固定列 */
  firstFixRight?: boolean;
  
  /** 是否是最后一个右侧固定列 */
  lastFixRight?: boolean;
  
  /** 附加在单元格内的节点（通常用于展开按钮等） */
  appendNode?: ReactNode;
  
  /** 传递给单元格 DOM 的额外属性 */
  additionalProps?: Record<string, any>;
  
  /** 省略配置，true 表示启用默认省略配置 */
  ellipsis?: boolean | EllipsisConfig;
  
  /** 文本对齐方式 */
  align?: 'left' | 'center' | 'right';
  
  /** 行类型 */
  rowType?: RowType;
  
  /** 是否处于粘性定位状态 */
  isSticky?: boolean;
  
  /** 是否应该更新单元格的判断函数 */
  shouldCellUpdate?: (currentRecord: RecordType, previousRecord: RecordType) => boolean;
}

/**
 * 表格单元格组件
 * 
 * 功能特性：
 * - 支持左右固定列（sticky positioning）
 * - 支持文本省略和 tooltip 提示
 * - 支持自定义渲染和条件渲染
 * - 支持列/行合并（colSpan/rowSpan）
 * - 支持性能优化（通过 shouldCellUpdate 控制更新）
 * 
 * @template RecordType 数据记录类型
 */
declare const Cell: <RecordType = any>(
  props: CellProps<RecordType> & RefAttributes<HTMLElement>
) => JSX.Element | null;

export default Cell;