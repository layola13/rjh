/**
 * React 图标组件模块
 * 
 * 这是一个使用 forwardRef 包装的图标组件，支持 ref 转发
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承所有 SVG 元素的标准属性
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
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
   * 图标的标题，用于可访问性
   */
  title?: string;
}

/**
 * 图标组件类型
 * 
 * 这是一个带有 ref 转发能力的 React 组件，可以接收 SVGSVGElement 的引用
 * 
 * @example
 *