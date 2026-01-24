/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性类型
 * 继承标准 SVG 元素的所有属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
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
}

/**
 * 图标数据类型
 * 定义 SVG 图标的路径数据和视图框配置
 */
export interface IconData {
  /**
   * SVG 路径数据或子元素
   */
  path?: string | React.ReactNode;
  
  /**
   * SVG viewBox 属性
   */
  viewBox?: string;
  
  /**
   * 默认宽度
   */
  width?: number;
  
  /**
   * 默认高度
   */
  height?: number;
}

/**
 * 图标组件类型
 * 带有 ref 转发功能的 React 组件
 */
type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *