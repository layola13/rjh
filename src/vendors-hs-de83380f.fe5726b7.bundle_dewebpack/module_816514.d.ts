/**
 * 图标组件类型定义
 * Module: module_816514
 * Original ID: 816514
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的标题（用于无障碍访问）
   */
  title?: string;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 
 * 这是一个转发引用的React组件，用于渲染SVG图标。
 * 支持所有标准的SVG属性，并可以通过ref访问底层的SVG元素。
 * 
 * @example
 *