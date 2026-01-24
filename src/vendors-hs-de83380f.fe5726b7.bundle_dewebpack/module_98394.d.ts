/**
 * 图标组件模块
 * 封装了一个基于 forwardRef 的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性
 */
export interface IconBaseProps {
  /** 图标的尺寸 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 鼠标进入事件处理器 */
  onMouseEnter?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 鼠标离开事件处理器 */
  onMouseLeave?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他 SVG 元素属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的 Props 类型
 * 继承基础属性并添加 ref 支持
 */
export interface IconComponentProps extends IconBaseProps {
  /** SVG 元素的引用 */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 图标组件类型定义
 * 使用 ForwardRefExoticComponent 确保正确的 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件通过 forwardRef 创建，支持 ref 转发到内部的 SVG 元素
 * 
 * @example
 *