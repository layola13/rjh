/**
 * 图标组件模块
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * @interface IconComponentProps
 * @extends {SVGProps<SVGSVGElement>}
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小
   */
  size?: string | number;
  
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
}

/**
 * 图标组件类型定义
 * 这是一个转发引用的React组件，用于渲染SVG图标
 * 
 * @example
 *