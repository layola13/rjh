/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
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
 * 图标组件属性类型
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * 图标数据对象
   */
  icon?: unknown;
  
  /**
   * 其他扩展属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个带有 ref 转发功能的图标组件，
 * 可以接收 SVG 元素的所有标准属性。
 * 
 * @example
 *