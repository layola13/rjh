/**
 * 图标组件模块
 * 
 * 该模块导出一个 React 转发引用（forwardRef）包装的图标组件，
 * 用于在 React 应用中渲染特定的图标元素。
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 
 * @interface IconComponentProps
 * @extends {React.SVGAttributes<SVGElement>}
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
   */
  size?: number | string;

  /**
   * 图标的颜色
   * @default "currentColor"
   */
  color?: string;

  /**
   * 图标的标题，用于可访问性
   */
  title?: string;

  /**
   * 图标的描述，用于可访问性
   */
  desc?: string;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个使用 React.forwardRef 包装的组件，允许父组件获取底层 SVG 元素的引用。
 * 
 * @component
 * @example
 *