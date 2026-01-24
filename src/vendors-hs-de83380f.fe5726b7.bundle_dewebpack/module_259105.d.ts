/**
 * React组件：图标包装器组件
 * 
 * 该模块导出一个使用forwardRef的React函数组件，
 * 用于渲染特定的图标，并支持ref转发。
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准HTML元素属性，支持所有常规的React属性
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 其他任意属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 
 * 这是一个使用forwardRef创建的React组件，支持：
 * - ref转发到底层DOM元素
 * - 接收IconComponentProps类型的属性
 * - 返回SVG图标元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *