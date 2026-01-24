/**
 * 图标组件类型定义
 * Module: module_772474
 * Original ID: 772474
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标类名 */
  className?: string;
  /** 图标样式 */
  style?: React.CSSProperties;
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 旋转角度 */
  rotate?: number;
  /** 是否自旋 */
  spin?: boolean;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 
 * 这是一个经过forwardRef包装的React组件，用于渲染SVG图标
 * 支持ref转发到底层的SVG元素
 * 
 * @param props - 图标组件的属性
 * @param ref - 转发的ref引用
 * @returns React元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *