/**
 * React 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的图标组件，
 * 允许父组件通过 ref 访问底层 DOM 元素。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** CSS 类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 图标旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** ARIA 标签 */
  'aria-label'?: string;
  /** 其他 SVG 属性 */
  [key: string]: any;
}

/**
 * 图标组件的 Ref 类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个带有 ref 转发功能的 React 组件，
 * 接受 IconBaseProps 作为属性，并允许通过 ref 访问 SVGSVGElement。
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *