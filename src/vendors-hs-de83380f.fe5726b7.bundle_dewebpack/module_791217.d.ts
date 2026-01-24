/**
 * React 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的图标组件，
 * 支持 ref 转发和自定义属性扩展
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自 SVG 元素的标准属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标颜色
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
   * 图标的标题（用于可访问性）
   */
  title?: string;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个支持 ref 转发的函数组件，可以直接访问底层的 SVG 元素
 * 
 * @example
 *