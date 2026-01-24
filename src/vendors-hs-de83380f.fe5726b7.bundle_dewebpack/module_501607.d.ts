/**
 * 图标组件模块
 * 
 * 该模块导出一个 forwardRef 包装的 React 图标组件
 * 通过组合基础图标组件和特定图标数据创建
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承标准 SVG 元素属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸，可以是数字（像素）或字符串（如 "1em", "100%"）
   */
  size?: number | string;
  
  /**
   * 图标颜色，支持任何有效的 CSS 颜色值
   */
  color?: string;
  
  /**
   * 图标旋转角度（度数）
   */
  rotate?: number;
  
  /**
   * 图标翻转方向
   */
  spin?: boolean;
  
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
 * 这是一个支持 ref 转发的 React 组件，允许父组件直接访问内部 SVG 元素
 * 
 * @example
 *