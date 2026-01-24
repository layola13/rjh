/**
 * React图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素的所有属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * 图标的描述文本，用于无障碍访问
   */
  title?: string;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型定义
 * 使用React.forwardRef创建，支持ref转发到底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *