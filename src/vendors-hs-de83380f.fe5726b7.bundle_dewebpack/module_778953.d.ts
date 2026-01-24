/**
 * 图标组件类型定义
 * Module: module_778953
 * Original ID: 778953
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标的类名 */
  className?: string;
  /** 图标的样式 */
  style?: React.CSSProperties;
  /** 图标的尺寸 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的旋转角度 */
  rotate?: number;
  /** 图标的自旋动画 */
  spin?: boolean;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装的 React 函数组件，支持 ref 转发
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个转发引用的图标组件，基于 SVG 实现
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;