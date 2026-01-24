/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标属性接口
 * 定义图标组件可接受的所有属性
 */
export interface IconProps {
  /**
   * 图标大小
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  
  /**
   * 其他SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标引用类型
 * 定义图标元素的引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 带有ref转发功能的React组件
 */
export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<IconRef>>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件使用React.forwardRef包装，支持ref转发到底层SVG元素
 * 
 * @example
 *