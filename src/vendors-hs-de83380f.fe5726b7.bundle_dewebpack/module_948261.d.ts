/**
 * React 图标组件模块
 * 
 * 此模块导出一个基于 forwardRef 的 React 组件，用于渲染图标。
 * 组件通过组合基础图标组件和特定图标数据来创建可复用的图标元素。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承标准 SVG 元素的所有属性
 */
export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的填充方式
   */
  fill?: string;
  
  /**
   * 图标的描边宽度
   */
  strokeWidth?: number | string;
  
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
 * 使用 forwardRef 包装的组件，允许父组件访问底层 SVG 元素的引用。
 * 
 * @example
 *