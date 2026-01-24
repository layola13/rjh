/**
 * 图标组件模块
 * 
 * 该模块导出一个经过 forwardRef 包装的图标组件，
 * 用于在 React 应用中渲染特定的图标。
 * 
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 * 
 * @interface IconBaseProps
 */
export interface IconBaseProps {
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他 SVG 元素支持的属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件的引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个通过 React.forwardRef 创建的组件，
 * 支持将 ref 转发到内部的 SVG 元素。
 * 
 * @example
 *