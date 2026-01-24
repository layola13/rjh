/**
 * React 图标组件模块
 * 该模块导出一个基于 forwardRef 的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础 SVG 元素的属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标类名
   */
  className?: string;
  
  /**
   * 图标样式
   */
  style?: React.CSSProperties;
}

/**
 * 图标组件引用类型
 * 指向 SVG 元素的 DOM 引用
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 使用 forwardRef 包装的函数式组件,支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *