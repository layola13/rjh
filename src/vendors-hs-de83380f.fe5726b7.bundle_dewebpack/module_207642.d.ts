/**
 * 图标组件模块
 * Module: module_207642
 * Original ID: 207642
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** 图标大小 */
  size?: string | number;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 图标组件属性，支持所有SVG元素属性
 */
export type IconProps = IconBaseProps;

/**
 * 图标组件类型定义
 * 使用 forwardRef 包装，支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *