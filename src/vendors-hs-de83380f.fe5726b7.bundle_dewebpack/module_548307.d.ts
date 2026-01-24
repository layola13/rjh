/**
 * Module: module_548307
 * Original ID: 548307
 * 
 * React组件模块，导出一个使用forwardRef包装的图标组件
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准的SVG元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
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
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否启用旋转动画
   */
  spin?: boolean;
  
  /**
   * 图标数据（由内部图标模块提供）
   */
  icon?: unknown;
}

/**
 * 图标组件类型定义
 * 使用forwardRef包装，支持ref转发到底层SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个经过forwardRef包装的React组件，用于渲染特定的图标。
 * 组件会将传入的props与内部图标配置合并，并转发ref到底层DOM元素。
 * 
 * @example
 *