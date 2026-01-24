/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的图标组件,
 * 支持ref转发和props合并功能
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸(宽度和高度)
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
   * 图标数据(SVG路径或配置)
   */
  icon?: unknown;
}

/**
 * 图标组件的ref类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个使用React.forwardRef创建的图标组件,
 * 支持将ref传递给内部的SVG元素,并且可以接收所有标准的SVG属性。
 * 
 * @example
 *