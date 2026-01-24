/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconProps {
  /** 图标的CSS类名 */
  className?: string;
  /** 图标的内联样式 */
  style?: React.CSSProperties;
  /** 图标的尺寸 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的旋转角度 */
  rotate?: number;
  /** 图标的点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的Ref类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用forwardRef包装的React组件,用于渲染SVG图标
 * 支持ref转发到底层的SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<IconRef>>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *