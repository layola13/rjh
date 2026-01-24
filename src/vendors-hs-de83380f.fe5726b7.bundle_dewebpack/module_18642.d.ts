/**
 * 图标组件模块
 * 
 * 该模块导出一个基于React的图标组件,封装了特定的图标实现。
 * 使用forwardRef模式支持ref转发,允许父组件直接访问底层DOM元素。
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 * 
 * 继承自HTML SVG元素的所有标准属性,同时支持React特有的属性。
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的大小(宽度和高度)
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的类名,用于自定义样式
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的标题,用于无障碍访问
   */
  title?: string;
  
  /**
   * 是否旋转图标
   * @default false
   */
  spin?: boolean;
}

/**
 * 支持ref转发的图标组件类型
 * 
 * 使用ForwardRefExoticComponent包装,确保类型安全的ref转发。
 * ref可以是SVGSVGElement类型,指向实际的SVG DOM元素。
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个React函数组件,通过forwardRef包装以支持ref转发。
 * 组件内部将props合并后传递给底层的图标实现组件。
 * 
 * @example
 *