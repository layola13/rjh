/**
 * 图标组件模块
 * Module: module_866926
 * Original ID: 866926
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承标准SVG元素的所有属性
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
 * @remarks
 * 这是一个使用forwardRef包装的图标组件，
 * 支持将ref传递给内部的SVG元素
 * 
 * @example
 *