/**
 * 图标组件模块
 * 
 * 这是一个使用 forwardRef 封装的 React 图标组件
 * 通过传入特定的 icon 数据，渲染对应的图标
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 * 定义了图标组件可接受的所有 props
 */
export interface IconComponentProps {
  /** 图标的自定义类名 */
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
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 * 通常引用 SVG 或其他图标容器元素
 */
export type IconComponentRef = HTMLSpanElement | SVGSVGElement;

/**
 * 图标组件类型
 * 
 * 这是一个使用 forwardRef 包装的组件，支持 ref 转发
 * 可以直接访问底层的 DOM 元素
 * 
 * @example
 *