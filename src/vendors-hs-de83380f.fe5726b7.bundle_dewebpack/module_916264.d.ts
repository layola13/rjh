/**
 * 图标组件模块
 * 
 * 该模块导出一个 React 图标组件，基于传入的 icon 配置和属性渲染图标元素。
 * 组件使用 forwardRef 支持 ref 转发。
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 
 * @template P - 扩展的额外属性类型
 */
export interface IconComponentProps<P = Record<string, unknown>> extends React.SVGAttributes<SVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   */
  size?: string | number;
  
  /**
   * 图标颜色
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
   * 图标路径数据或配置
   */
  icon?: IconDefinition;
  
  /**
   * 其他扩展属性
   */
  [key: string]: unknown;
}

/**
 * 图标定义接口
 * 
 * 定义图标的元数据和路径数据
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name?: string;
  
  /**
   * 图标的 SVG 路径数据
   */
  path?: string | string[];
  
  /**
   * 视图盒子配置
   */
  viewBox?: string;
  
  /**
   * 图标宽度
   */
  width?: number;
  
  /**
   * 图标高度
   */
  height?: number;
  
  /**
   * 其他图标属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 
 * 使用 forwardRef 创建的图标组件，支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *