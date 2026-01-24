/**
 * 图标组件模块
 * 
 * 该模块导出一个 React 图标组件，通过 forwardRef 包装以支持 ref 转发。
 * 组件内部使用通用图标容器（l.default）渲染特定图标（i.default）。
 */

import type React from 'react';

/**
 * 图标组件的属性类型
 * 
 * @remarks
 * 继承自通用图标容器组件的所有属性，并自动注入 icon 属性
 */
export interface IconComponentProps {
  /** 图标尺寸（像素或CSS单位） */
  size?: number | string;
  
  /** 图标颜色 */
  color?: string;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** 其他 SVG 元素支持的属性 */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 
 * @remarks
 * 使用 React.forwardRef 创建，支持将 ref 转发到底层 SVG 元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *