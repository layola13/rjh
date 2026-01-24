/**
 * 图标组件模块
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentType, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /**
   * 图标的大小
   */
  size?: number | string;
  
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
   * 图标的点击事件处理函数
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
 * 图标组件的完整属性类型
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconComponentRef>;

/**
 * 图标组件类型定义
 * 
 * @description
 * 该组件是一个通过 forwardRef 包装的 React 函数组件，
 * 用于渲染 SVG 图标，并支持 ref 转发到底层 SVG 元素。
 * 
 * @example
 *