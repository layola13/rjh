/**
 * React图标组件模块
 * @module IconComponent
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准SVG属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标大小(宽度和高度)
   * @default 24
   */
  size?: number | string;

  /**
   * 图标颜色
   * @default "currentColor"
   */
  color?: string;

  /**
   * CSS类名
   */
  className?: string;

  /**
   * 内联样式
   */
  style?: React.CSSProperties;

  /**
   * 图标路径数据(内部使用)
   * @internal
   */
  icon?: React.ReactNode;
}

/**
 * 图标组件
 * 
 * 这是一个可转发ref的React图标组件,用于渲染SVG图标。
 * 组件接收标准SVG属性并将其传递给底层的SVG元素。
 * 
 * @example
 *