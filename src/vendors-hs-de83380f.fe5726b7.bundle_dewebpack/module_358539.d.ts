/**
 * 图标组件类型定义
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
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
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 使用 forwardRef 包装的 React 组件，支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *