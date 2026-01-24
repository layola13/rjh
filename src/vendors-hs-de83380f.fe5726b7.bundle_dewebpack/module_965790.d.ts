/**
 * 图标组件类型定义
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性
 * 继承自 SVG 元素的所有标准属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的大小（宽度和高度）
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式
   */
  style?: React.CSSProperties;
  
  /**
   * 额外的自定义属性
   */
  [key: string]: any;
}

/**
 * 图标组件类型
 * 支持 ref 转发到内部 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个使用 forwardRef 包装的 React 组件，可以接收 ref 并转发到内部的 SVG 元素
 * 
 * @example
 *