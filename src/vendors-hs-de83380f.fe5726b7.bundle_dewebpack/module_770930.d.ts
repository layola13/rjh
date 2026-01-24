/**
 * React组件模块 - 图标组件包装器
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 用于在React应用中渲染特定图标。
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 * 
 * @remarks
 * 这些属性会被传递给底层的图标渲染组件
 */
export interface IconComponentProps {
  /** 图标的尺寸（像素值或CSS尺寸字符串） */
  size?: number | string;
  
  /** 图标颜色（CSS颜色值） */
  color?: string;
  
  /** 图标旋转角度（度数） */
  rotate?: number;
  
  /** 图标的自定义类名 */
  className?: string;
  
  /** 图标的样式对象 */
  style?: React.CSSProperties;
  
  /** 图标的点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** 其他HTML SVG元素属性 */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 
 * @remarks
 * 使用forwardRef包装，支持ref转发到底层SVG元素
 * 
 * @example
 *