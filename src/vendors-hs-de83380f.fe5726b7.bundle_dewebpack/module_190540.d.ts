/**
 * React图标组件类型定义
 * Module: module_190540
 * Original ID: 190540
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性
 * 继承自标准SVG元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型
 * 支持ref转发的React组件
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *