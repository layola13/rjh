/**
 * React图标组件模块
 * 
 * 该模块导出一个React forwardRef组件，用于渲染特定图标
 * 支持ref转发和props合并
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承SVG元素的所有标准属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标类名
   */
  className?: string;
  
  /**
   * 图标样式
   */
  style?: React.CSSProperties;
  
  /**
   * 其他SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个支持ref转发的React组件，接收IconProps作为属性
 * 并将ref转发到内部的SVG元素
 * 
 * @example
 *