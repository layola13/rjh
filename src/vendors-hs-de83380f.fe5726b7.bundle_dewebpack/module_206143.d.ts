/**
 * Module: module_206143
 * Original ID: 206143
 * 
 * 这是一个 React 组件的类型定义文件，导出一个带有图标的转发引用组件
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 组件的基础属性接口
 * 继承自图标组件的所有属性
 */
export interface IconComponentProps {
  /**
   * 图标的尺寸大小
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他 SVG 元素的原生属性
   */
  [key: string]: unknown;
}

/**
 * 组件引用类型
 * 通常指向底层的 SVG 元素
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 完整的组件类型定义
 * 这是一个使用 forwardRef 包装的 React 组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *