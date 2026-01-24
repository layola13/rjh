/**
 * React图标组件模块
 * 
 * 该模块导出一个基于forwardRef的React组件，用于渲染图标。
 * 组件接受图标属性并将ref转发到底层元素。
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 * 
 * @interface IconBaseProps
 */
interface IconBaseProps {
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸（像素值或CSS单位）
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的旋转角度
   */
  rotate?: number;
  
  /**
   * 是否启用旋转动画
   */
  spin?: boolean;
  
  /**
   * 其他HTML属性
   */
  [key: string]: any;
}

/**
 * 图标引用类型，通常指向SVG或其他图标元素
 */
type IconRef = SVGSVGElement | HTMLElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用forwardRef包装的函数组件，支持ref转发。
 * 
 * @example
 *