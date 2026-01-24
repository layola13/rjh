/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的React组件，用于渲染SVG图标。
 * 组件接受标准的React props并支持ref转发。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自SVGSVGElement的所有标准SVG属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标标题，用于可访问性
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
 * 图标组件类型定义
 * 
 * 这是一个支持ref转发的React函数组件，可以接收SVGSVGElement的ref引用。
 * 
 * @example
 *