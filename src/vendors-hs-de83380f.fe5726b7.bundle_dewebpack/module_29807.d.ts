/**
 * React图标组件模块
 * 
 * 该模块导出一个基于forwardRef的图标组件,用于在React应用中渲染图标。
 * 组件支持ref转发,允许父组件直接访问底层DOM元素。
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准HTML元素属性,支持所有标准的DOM属性和事件处理器
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 图标的尺寸(像素)
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
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 其他扩展属性
   */
  [key: string]: unknown;
}

/**
 * 图标SVG配置对象接口
 * 定义图标的SVG路径和相关元数据
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG viewBox属性值
   */
  viewBox?: string;
  
  /**
   * SVG路径数据
   */
  path: string | string[];
  
  /**
   * 图标标签(用于分类和搜索)
   */
  tags?: string[];
}

/**
 * 图标组件类型
 * 使用React.ForwardRefExoticComponent确保组件支持ref转发
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件是通过React.forwardRef创建的,支持ref转发到底层DOM元素。
 * 内部使用了一个通用的图标包装组件,并注入了特定的图标定义。
 * 
 * @example
 *