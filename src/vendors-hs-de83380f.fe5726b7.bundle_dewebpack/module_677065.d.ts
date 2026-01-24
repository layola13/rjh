/**
 * 图标组件模块
 * 
 * 这是一个React forwardRef图标组件，用于渲染特定的图标。
 * 该组件继承所有标准的React元素属性，并支持ref转发。
 * 
 * @module IconComponent
 * @original-id 677065
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 
 * 继承所有标准SVG元素的属性，用于自定义图标的样式和行为
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的类名，用于自定义样式
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的标题，用于可访问性
   */
  title?: string;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个支持ref转发的React组件，允许父组件直接访问底层的SVG元素。
 * 使用ForwardRefExoticComponent确保类型安全的ref转发。
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *