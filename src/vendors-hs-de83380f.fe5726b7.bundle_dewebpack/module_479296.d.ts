/**
 * 图标组件模块
 * Module: module_479296
 * Original ID: 479296
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** 图标尺寸 */
  size?: string | number;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 图标组件属性类型
 * 继承自IconBaseProps，支持所有SVG元素的标准属性
 */
export type IconProps = IconBaseProps;

/**
 * 图标组件类型定义
 * 支持ref转发的React组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 使用forwardRef包装，支持ref传递到底层SVG元素
 * 
 * @example
 *