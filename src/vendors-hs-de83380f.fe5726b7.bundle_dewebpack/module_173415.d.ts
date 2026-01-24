/**
 * 图标组件模块
 * Module ID: 173415
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * 图标大小
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
  [key: string]: any;
}

/**
 * 图标组件类型定义
 * 使用 forwardRef 允许父组件访问底层 DOM 元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *