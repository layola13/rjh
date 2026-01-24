/**
 * Module: module_845767
 * Original ID: 845767
 * 
 * React组件模块：导出一个使用forwardRef包装的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconComponentProps {
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他HTML SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 */
export interface IconData {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标的SVG路径数据
   */
  path: string | string[];
  
  /**
   * 视图盒子配置
   */
  viewBox?: string;
  
  /**
   * 其他图标配置
   */
  [key: string]: unknown;
}

/**
 * 图标组件的引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 带有forwardRef的图标组件类型
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个使用React.forwardRef包装的图标组件，
 * 支持转发ref到底层的SVG元素。
 * 
 * @example
 *