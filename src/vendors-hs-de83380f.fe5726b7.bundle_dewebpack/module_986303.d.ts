/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件，
 * 允许父组件通过ref访问底层DOM元素。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconComponentProps {
  /** 图标的CSS类名 */
  className?: string;
  /** 图标的内联样式 */
  style?: React.CSSProperties;
  /** 图标的尺寸（像素或字符串） */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的旋转角度 */
  rotate?: number;
  /** 是否开启旋转动画 */
  spin?: boolean;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  /** 其他SVG元素属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的Ref类型
 * 指向底层的SVG元素
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 完整的图标组件类型
 * 
 * 这是一个使用forwardRef创建的组件，支持：
 * - 接收IconComponentProps作为props
 * - 通过ref转发访问SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *