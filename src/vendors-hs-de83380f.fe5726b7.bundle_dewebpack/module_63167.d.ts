/**
 * React 图标组件的类型声明
 * 
 * 这是一个基于 forwardRef 的图标组件，支持 ref 转发
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * 图标组件类型
 * 
 * 这是一个支持 ref 转发的 React 函数组件，可以直接访问内部的 SVG 元素
 * 
 * @example
 *