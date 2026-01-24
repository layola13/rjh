/**
 * 图标组件模块
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 扩展自标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGAttributes<SVGElement> {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
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
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 使用 forwardRef 包装的函数组件，支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *