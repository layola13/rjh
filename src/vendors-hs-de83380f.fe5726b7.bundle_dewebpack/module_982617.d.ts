/**
 * React 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的图标组件，
 * 支持 ref 转发和自定义属性扩展。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准 SVG 元素的所有属性
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的大小（宽度和高度）
   */
  size?: string | number;
  
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
 * 这是一个使用 forwardRef 创建的 React 组件，
 * 允许父组件直接访问内部的 SVG 元素引用。
 * 
 * @example
 *