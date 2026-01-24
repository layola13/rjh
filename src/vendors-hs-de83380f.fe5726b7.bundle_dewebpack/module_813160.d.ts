/**
 * 图标组件模块
 * 
 * 这是一个 React 图标组件的类型定义文件，
 * 它使用 forwardRef 创建了一个可以转发 ref 的图标组件。
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 
 * 继承自标准 SVG 元素的所有属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   */
  size?: string | number;
  
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
}

/**
 * 图标组件类型
 * 
 * 这是一个使用 forwardRef 创建的 React 组件，
 * 支持将 ref 转发到内部的 SVG 元素。
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *