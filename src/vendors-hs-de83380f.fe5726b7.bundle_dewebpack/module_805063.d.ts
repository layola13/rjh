/**
 * 图标组件模块
 * 导出一个带有 forwardRef 的 React 图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconProps {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * CSS 类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他 SVG 属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 使用 forwardRef 包装的函数组件，支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *