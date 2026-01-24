/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的图标组件，
 * 允许父组件通过 ref 访问底层 DOM 元素。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理函数
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他 SVG 元素属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个带有 ref 转发功能的 React 组件，
 * 可以接收 IconComponentProps 类型的属性，
 * 并允许通过 ref 访问底层的 SVGSVGElement。
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *