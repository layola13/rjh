/**
 * React 图标组件模块
 * 基于 React.forwardRef 实现的可转发引用的图标组件
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的 Props 接口
 * @template P - 额外的自定义属性类型
 */
export interface IconComponentProps<P = Record<string, unknown>> extends RefAttributes<unknown> {
  /**
   * 图标名称或标识符
   */
  icon?: ComponentType | string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 其他扩展属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 使用 forwardRef 包装的 React 组件，支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 这是一个支持引用转发的函数式组件，可以接受 ref 并将其传递给内部元素
 * 
 * @example
 *