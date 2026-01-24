/**
 * React 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 组件，
 * 用于渲染特定的图标元素
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 扩展标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的大小（宽度和高度）
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 其他传递给底层 SVG 元素的属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个支持 ref 转发的 React 组件，可以渲染 SVG 图标
 * 
 * @example
 *