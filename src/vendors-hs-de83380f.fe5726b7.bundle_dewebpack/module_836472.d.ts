/**
 * React 图标组件的 TypeScript 类型定义
 * 
 * 此模块导出一个使用 forwardRef 包装的图标组件，
 * 允许父组件访问底层 DOM 元素的引用。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
   */
  size?: number | string;

  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;

  /**
   * 图标的 CSS 类名
   */
  className?: string;

  /**
   * 图标的内联样式
   */
  style?: React.CSSProperties;

  /**
   * 图标的标题（用于可访问性）
   */
  title?: string;

  /**
   * 自定义图标数据
   */
  icon?: unknown;
}

/**
 * 带引用转发的图标组件类型
 * 
 * 这是一个函数式组件，通过 forwardRef 包装以支持 ref 传递，
 * 允许父组件直接访问和操作底层的 SVG 元素。
 * 
 * @example
 *