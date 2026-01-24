/**
 * 图标组件类型定义
 * Module: module_126251
 * Original ID: 126251
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /**
   * 图标的大小
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
   * 其他 SVG 属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 使用 forwardRef 创建的组件，支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *