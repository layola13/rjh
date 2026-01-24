/**
 * React图标组件的类型定义
 * 基于forwardRef实现的可转发引用的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承SVG元素的所有标准属性
 */
export interface IconComponentProps extends SVGAttributes<SVGElement> {
  /**
   * 图标尺寸
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标颜色
   * @default 'currentColor'
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
  spin?: boolean;
  
  /**
   * 其他传递给SVG元素的属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 使用ForwardRefExoticComponent包装，支持ref转发到内部SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *