/**
 * 图标组件模块
 * 基于React的forwardRef图标组件封装
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（像素）
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
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用React.forwardRef创建的组件，支持ref转发到底层SVG元素。
 * 组件内部会合并传入的props和默认的icon配置。
 * 
 * @example
 *