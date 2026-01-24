/**
 * React图标组件模块
 * 该模块导出一个使用forwardRef包装的React组件，用于渲染带有特定图标的元素
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 继承自React元素的所有标准属性
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标大小（像素值或CSS尺寸字符串）
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 其他任意属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 使用React.forwardRef创建的可转发ref的函数组件
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个使用React.forwardRef包装的图标组件，支持ref转发。
 * 组件内部将props与默认图标配置合并，并渲染为特定的图标元素。
 * 
 * @example
 *