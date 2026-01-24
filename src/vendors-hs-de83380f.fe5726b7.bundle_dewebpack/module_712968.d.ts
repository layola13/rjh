/**
 * React图标组件模块
 * 
 * 该模块导出一个基于forwardRef的图标组件,用于渲染特定的图标元素。
 * 组件支持ref转发,允许父组件直接访问底层DOM元素。
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 
 * @interface IconComponentProps
 * @extends {React.SVGProps<SVGSVGElement>} 继承所有标准SVG元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸(宽度和高度)
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * 图标的标题,用于无障碍访问
   */
  title?: string;
  
  /**
   * 自定义CSS类名
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
 * 这是一个使用forwardRef创建的React组件,支持ref转发到SVG元素
 * 
 * @component
 * @example
 *