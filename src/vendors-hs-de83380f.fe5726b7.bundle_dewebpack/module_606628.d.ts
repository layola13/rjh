/**
 * Icon Component Module
 * 
 * 这是一个React图标组件，使用forwardRef实现ref转发功能
 * 支持所有标准SVG/Icon属性的传递
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准SVG元素属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小（宽度和高度）
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
   * 图标样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 额外的自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 使用ForwardRefExoticComponent支持ref转发到底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *