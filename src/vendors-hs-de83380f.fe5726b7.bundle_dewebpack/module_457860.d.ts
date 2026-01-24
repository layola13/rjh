/**
 * 图标组件模块
 * 封装了一个带有特定图标的可转发引用的React组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的属性类型
 * 继承自基础图标组件的所有属性
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标的尺寸
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
  
  /**
   * 图标数据（SVG路径或配置）
   */
  icon?: unknown;
}

/**
 * 带有引用转发的图标组件类型
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 使用forwardRef包装以支持ref转发到底层SVG元素
 * 
 * @example
 *