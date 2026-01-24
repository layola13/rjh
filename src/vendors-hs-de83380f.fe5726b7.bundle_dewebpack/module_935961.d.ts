/**
 * 图标组件类型定义
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   */
  size?: string | number;
  
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
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否水平翻转
   */
  spin?: boolean;
}

/**
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 
 * 这是一个通过 forwardRef 创建的图标组件，支持 ref 转发到内部的 SVG 元素
 * 
 * @example
 *