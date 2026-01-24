/**
 * React组件：转发ref的图标组件
 * Module: module_158814
 * Original ID: 158814
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础图标组件的所有属性
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
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
   * 图标数据（由图标定义模块提供）
   */
  icon?: unknown;
}

/**
 * 带ref转发的图标组件类型
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出：转发ref的图标组件
 * 
 * @remarks
 * 该组件使用React.forwardRef创建，允许父组件访问内部的SVG元素引用
 * 
 * @example
 *