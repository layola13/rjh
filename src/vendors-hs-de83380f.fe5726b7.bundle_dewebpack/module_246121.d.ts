/**
 * React组件：图标组件的转发引用实现
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 允许父组件通过ref访问底层DOM元素。
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自通用图标容器组件的所有属性
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标的尺寸大小
   */
  size?: string | number;
  
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
   * 其他传递给底层组件的属性
   */
  [key: string]: unknown;
}

/**
 * 图标元素的引用类型
 * 通常指向SVG元素或包装容器元素
 */
export type IconRef = SVGSVGElement | HTMLElement | null;

/**
 * 导出的图标组件类型
 * 
 * 这是一个转发引用的React组件，允许：
 * 1. 接收IconComponentProps作为属性
 * 2. 通过ref访问底层的IconRef元素
 * 3. 自动合并传入的属性和默认图标配置
 * 
 * @example
 *