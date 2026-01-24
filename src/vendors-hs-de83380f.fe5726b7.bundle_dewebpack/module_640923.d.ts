/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的图标组件，
 * 支持通过 ref 访问底层 DOM 元素。
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
  /** CSS 类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 旋转角度 */
  rotate?: number;
  /** 是否旋转动画 */
  spin?: boolean;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * 图标组件属性类型
 * 包含所有 SVG 元素的原生属性和自定义图标属性
 */
export type IconProps = IconBaseProps & React.SVGAttributes<SVGSVGElement>;

/**
 * 图标组件引用类型
 * 指向底层的 SVGSVGElement DOM 元素
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用 React.forwardRef 创建的组件，
 * 允许父组件通过 ref 访问内部的 SVG 元素。
 * 
 * @example
 *