/**
 * SVG图标组件模块
 * 
 * 该模块导出一个React转发引用（forwardRef）包装的图标组件。
 * 组件基于IconWrapper容器，使用特定的SVG图标数据渲染。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /**
   * 图标尺寸
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
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标元素引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个转发引用的React组件，允许父组件直接访问底层的SVG元素。
 * 
 * @example
 *