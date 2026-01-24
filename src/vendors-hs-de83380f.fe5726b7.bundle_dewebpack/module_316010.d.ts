/**
 * 图标组件模块
 * Module: module_316010
 * Original ID: 316010
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础图标组件的所有属性
 */
export interface IconComponentProps {
  /** 图标类名 */
  className?: string;
  /** 图标样式 */
  style?: React.CSSProperties;
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他SVG元素属性 */
  [key: string]: unknown;
}

/**
 * 带引用转发的图标组件类型
 * 允许父组件通过ref访问底层SVG元素
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;