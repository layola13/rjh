/**
 * 图标组件模块
 * 
 * 这是一个React图标组件，使用forwardRef包装以支持ref转发。
 * 通过组合基础图标组件和特定图标数据来创建可复用的图标实例。
 * 
 * @module IconComponent
 */

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 
 * @interface IconComponentProps
 */
export interface IconComponentProps {
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
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 定义SVG图标的路径和视图框等元数据
 * 
 * @interface IconData
 */
export interface IconData {
  /**
   * SVG路径数据
   */
  path: string;
  
  /**
   * 视图框尺寸
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
}

/**
 * 基础图标组件的引用类型
 */
type IconRef = HTMLSpanElement | SVGSVGElement;

/**
 * 默认导出的图标组件
 * 
 * 这是一个使用React.forwardRef创建的图标组件，
 * 支持传递ref到底层DOM元素，并合并传入的props与内部图标数据。
 * 
 * @remarks
 * - 使用forwardRef模式支持ref转发
 * - 自动合并用户props和默认图标配置
 * - 渲染为可访问的SVG图标元素
 * 
 * @example
 *