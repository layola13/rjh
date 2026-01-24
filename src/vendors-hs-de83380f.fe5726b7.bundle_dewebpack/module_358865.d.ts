/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的React组件，
 * 用于渲染特定的图标，支持ref转发。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承所有标准SVG元素属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的大小，可以是数字（像素）或字符串（如 '24px', '2em'）
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的标题，用于无障碍访问
   */
  title?: string;
  
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
 * 图标组件类型
 * 
 * 这是一个使用forwardRef创建的React组件，
 * 允许父组件通过ref访问底层的SVG元素。
 * 
 * @example
 *