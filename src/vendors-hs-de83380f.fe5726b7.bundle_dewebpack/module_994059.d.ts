/**
 * React组件类型定义文件
 * 
 * 此模块导出一个带有自定义图标的转发引用(forwardRef)组件
 */

import type React from 'react';

/**
 * 组件的属性接口
 * 继承标准的SVG元素属性，支持所有原生SVG属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据（SVG路径或配置）
   */
  icon?: unknown;
}

/**
 * 带转发引用的图标组件类型
 * 
 * 这是一个封装了图标数据的React组件，支持ref转发到底层SVG元素
 * 
 * @example
 *