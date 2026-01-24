/**
 * 图标组件模块
 * 使用 forwardRef 包装的 React 图标组件
 */

import React from 'react';

/**
 * 图标组件的 Props 类型
 * 继承所有标准 SVG 元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * 图标大小
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
}

/**
 * 图标组件类型
 * 支持 ref 转发的 React 函数组件
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件通过 React.forwardRef 创建，支持 ref 转发到内部 SVG 元素
 * 
 * @example
 *