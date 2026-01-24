/**
 * 图标组件类型定义
 * Module: module_93279
 * Original ID: 93279
 */

import type { RefAttributes, ForwardRefExoticComponent } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他HTML SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 这是一个经过 forwardRef 包装的 React 组件，支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 该组件渲染一个 SVG 图标，支持自定义属性和 ref 转发
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;