/**
 * React 图标组件模块
 * @module IconComponent
 */

import React from 'react';

/**
 * 图标组件的 props 接口
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
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
   * 转发的 ref
   */
  ref?: React.Ref<SVGSVGElement>;
  
  /**
   * 图标数据
   */
  icon?: unknown;
}

/**
 * 图标组件类型定义
 * 一个可转发 ref 的 React 函数组件,用于渲染 SVG 图标
 * 
 * @example
 *