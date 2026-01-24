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
   * 图标大小
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
 * 图标组件的引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件属性类型
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * 图标数据（SVG路径或配置）
   */
  icon?: unknown;
  
  /**
   * 其他透传属性
   */
  [key: string]: unknown;
}

/**
 * 转发引用的图标组件类型
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个使用 React.forwardRef 创建的图标组件，
 * 支持引用转发到内部的 SVG 元素。
 * 
 * @example
 *