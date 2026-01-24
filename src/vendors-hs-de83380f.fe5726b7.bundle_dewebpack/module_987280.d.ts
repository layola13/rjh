/**
 * 图标组件模块
 * Module: module_987280
 * Original ID: 987280
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承标准 SVG 元素的所有属性
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
 * 图标组件类型定义
 * 支持 ref 转发的 React 组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 使用 forwardRef 包装，支持 ref 转发到底层 SVG 元素
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;