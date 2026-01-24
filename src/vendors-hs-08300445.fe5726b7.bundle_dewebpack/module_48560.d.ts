/**
 * 响应式列表项组件类型定义
 * 用于处理列表项的显示、隐藏和尺寸计算
 */

import type { CSSProperties, ReactNode, ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 列表项数据的泛型接口
 */
export interface ItemData<T = any> {
  [key: string]: T;
}

/**
 * 渲染项的回调函数参数
 */
export interface RenderItemOptions {
  /** 当前项在列表中的索引 */
  index: number;
}

/**
 * 尺寸注册回调函数
 * @param key - 项的唯一标识符
 * @param size - 元素的宽度，null表示卸载
 */
export type RegisterSizeCallback = (key: string, size: number | null) => void;

/**
 * 自定义渲染项的函数
 * @param item - 要渲染的数据项
 * @param options - 渲染选项
 * @returns 渲染的React节点
 */
export type RenderItemFunction<T = ItemData> = (item: T, options: RenderItemOptions) => ReactNode;

/**
 * 响应式列表项组件的属性接口
 */
export interface ItemProps<T = ItemData> {
  /** 类名前缀，用于CSS类名生成 */
  prefixCls?: string;
  
  /** 是否处于无效状态（不应用响应式样式） */
  invalidate?: boolean;
  
  /** 列表项的数据对象 */
  item?: T;
  
  /** 自定义渲染函数 */
  renderItem?: RenderItemFunction<T>;
  
  /** 是否启用响应式行为 */
  responsive?: boolean;
  
  /** 是否禁用响应式尺寸监听 */
  responsiveDisabled?: boolean;
  
  /** 注册元素尺寸的回调函数 */
  registerSize?: RegisterSizeCallback;
  
  /** 项的唯一标识符 */
  itemKey?: string;
  
  /** 自定义CSS类名 */
  className?: string;
  
  /** 自定义内联样式 */
  style?: CSSProperties;
  
  /** 子元素 */
  children?: ReactNode;
  
  /** 是否显示该项（用于响应式隐藏） */
  display?: boolean;
  
  /** 项的排序顺序（用于CSS order属性） */
  order?: number;
  
  /** 容器元素的类型 */
  component?: keyof JSX.IntrinsicElements | ComponentType<any>;
  
  /** 其他HTML属性 */
  [key: string]: any;
}

/**
 * 响应式列表项组件
 * 
 * 功能：
 * - 支持响应式显示/隐藏
 * - 自动计算和注册元素尺寸
 * - 支持自定义渲染函数
 * - 支持无障碍访问属性
 * 
 * @example
 *