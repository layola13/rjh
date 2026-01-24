/**
 * 表格行展开图标渲染函数的类型定义
 * @module RowExpandIconRenderer
 */

/**
 * 国际化文本配置
 */
export interface ExpandIconLabels {
  /** 展开按钮的无障碍标签文本 */
  expand: string;
  /** 收起按钮的无障碍标签文本 */
  collapse: string;
}

/**
 * 表格行记录的通用类型
 * @template T 记录数据类型
 */
export type RecordType<T = unknown> = T;

/**
 * 行展开图标组件的属性
 * @template T 记录数据类型
 */
export interface ExpandIconProps<T = unknown> {
  /** 组件样式类名前缀 */
  prefixCls: string;
  /** 展开/收起事件回调函数 */
  onExpand: (record: RecordType<T>, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 当前行的数据记录 */
  record: RecordType<T>;
  /** 当前行是否已展开 */
  expanded: boolean;
  /** 当前行是否可展开 */
  expandable: boolean;
}

/**
 * 行展开图标渲染函数类型
 * @template T 记录数据类型
 * @param props 组件属性
 * @returns React元素
 */
export type ExpandIconRenderer<T = unknown> = (
  props: ExpandIconProps<T>
) => React.ReactElement;

/**
 * 创建行展开图标渲染函数的工厂函数
 * @template T 记录数据类型
 * @param labels 国际化文本配置
 * @returns 返回一个渲染函数，用于生成展开/收起图标按钮
 * 
 * @example
 *