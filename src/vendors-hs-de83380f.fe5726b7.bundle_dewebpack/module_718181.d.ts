/**
 * Module: module_718181
 * Original ID: 718181
 * 
 * React组件导出模块，提供一个带有图标的转发引用组件
 */

import * as React from 'react';

/**
 * 组件的props接口
 * 继承自默认图标组件的所有属性
 */
export interface IconComponentProps {
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他HTML SVG元素属性
   */
  [key: string]: unknown;
}

/**
 * 带转发引用的图标组件类型
 * @template T - 引用的元素类型
 */
type ForwardRefIconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个使用React.forwardRef包装的函数组件，
 * 支持引用转发到内部的图标元素
 * 
 * @example
 *