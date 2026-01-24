/**
 * 图标组件模块
 * 
 * 该模块导出一个基于 forwardRef 的 React 图标组件，
 * 用于渲染特定的图标，支持 ref 转发以便父组件访问底层 DOM 元素。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标尺寸，可以是数字（像素）或字符串（如 '24px', '1.5em'） */
  size?: number | string;
  
  /** 图标颜色，支持任何有效的 CSS 颜色值 */
  color?: string;
  
  /** 图标旋转角度（度数） */
  rotate?: number;
  
  /** 图标的 CSS 类名 */
  className?: string;
  
  /** 图标的内联样式 */
  style?: React.CSSProperties;
  
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** 鼠标进入事件处理器 */
  onMouseEnter?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** 鼠标离开事件处理器 */
  onMouseLeave?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** 其他 HTML 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的属性类型，包含 ref 支持
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 
 * 这是一个支持 ref 转发的 React 函数组件，
 * 允许父组件通过 ref 直接访问底层的 SVG 元素。
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *