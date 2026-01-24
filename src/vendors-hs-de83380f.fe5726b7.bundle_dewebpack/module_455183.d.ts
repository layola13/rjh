/**
 * 图标组件模块
 * 这是一个基于 React 的图标组件，通过 forwardRef 支持 ref 转发
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础图标属性，支持所有标准的 SVG 和 React 属性
 */
export interface IconComponentProps {
  /** 图标的类名 */
  className?: string;
  /** 图标的样式对象 */
  style?: React.CSSProperties;
  /** 图标的尺寸 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** 其他 HTML 属性 */
  [key: string]: any;
}

/**
 * 图标组件的 Ref 类型
 * 通常指向 SVG 元素或包装元素
 */
export type IconComponentRef = HTMLElement | SVGSVGElement | null;

/**
 * 图标组件类型定义
 * 使用 forwardRef 包装的 React 组件，支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 这是一个 React.forwardRef 组件，可以接收 ref 并转发到底层的图标实现
 * 
 * @example
 *