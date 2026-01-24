/**
 * 图标组件模块
 * 
 * 这是一个 React 图标组件的类型定义，使用 forwardRef 包装以支持 ref 转发。
 * 该组件基于通用图标包装器，并注入特定的图标数据。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标的尺寸，可以是数字（像素）或字符串 */
  size?: number | string;
  
  /** 图标的颜色 */
  color?: string;
  
  /** 自定义 className */
  className?: string;
  
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** aria-label 用于可访问性 */
  'aria-label'?: string;
  
  /** 其他 SVG 元素支持的属性 */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 * 通常指向底层的 SVG 元素
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 
 * 使用 forwardRef 创建的组件，支持 ref 转发到底层 SVG 元素。
 * 
 * @example
 *