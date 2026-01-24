/**
 * React 图标组件模块
 * 提供一个带有转发引用的图标组件
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准的 React 组件属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
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
  [key: string]: any;
}

/**
 * 图标组件类型定义
 * 支持引用转发的 React 组件
 */
type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个带有转发引用(forwardRef)的图标组件，
 * 允许父组件直接访问底层的 SVG 元素
 * 
 * @example
 *