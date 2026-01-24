/**
 * 图标组件模块
 * 基于 forwardRef 包装的图标组件，支持 ref 转发
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
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
  /** 鼠标移入事件处理器 */
  onMouseEnter?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 鼠标移出事件处理器 */
  onMouseLeave?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 图标旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** aria-label 无障碍标签 */
  'aria-label'?: string;
  /** 其他 SVG 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的 ref 类型（SVG 元素引用）
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 支持 ref 转发的 React 组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *