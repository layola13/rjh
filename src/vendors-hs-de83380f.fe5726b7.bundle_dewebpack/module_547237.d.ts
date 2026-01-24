/**
 * 图标组件类型定义
 * Module: module_547237
 * Original ID: 547237
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

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
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 图标引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 使用 forwardRef 包装的React组件，支持ref转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 这是一个封装了特定图标数据的React组件
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;