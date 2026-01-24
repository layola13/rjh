/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的图标组件，
 * 支持将 ref 转发到底层的图标实现组件。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 * 
 * 继承所有标准 SVG 元素属性，并可扩展自定义图标属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标大小（宽度和高度）
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据/路径定义
   */
  icon?: unknown;
  
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 * 
 * 支持转发 ref 到底层 SVG 元素
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用 React.forwardRef 创建的组件，
 * 允许父组件访问内部的 SVG 元素引用
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *