/**
 * React图标组件类型定义
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 扩展了标准SVG元素的所有属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小（像素值或CSS尺寸字符串）
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
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标标题（用于无障碍访问）
   */
  title?: string;
  
  /**
   * 是否旋转图标
   */
  spin?: boolean;
}

/**
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 支持通过ref访问底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 这是一个经过forwardRef包装的React组件，可以接收ref并转发到内部SVG元素
 * 
 * @example
 *