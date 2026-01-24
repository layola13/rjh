/**
 * 图标组件模块
 * 该模块导出一个 React forwardRef 包装的图标组件
 * Original Module ID: 745206
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础图标组件的所有属性
 */
export interface IconComponentProps {
  /**
   * 图标的样式类名
   */
  className?: string;
  
  /**
   * 图标的内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 点击事件处理函数
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他 SVG 元素支持的属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装，支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个通过 forwardRef 创建的图标组件，支持：
 * - Ref 转发到 SVG 元素
 * - 所有标准的 SVG 属性
 * - 自定义样式和事件处理
 * 
 * @example
 *