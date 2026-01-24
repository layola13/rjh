/**
 * 图标组件模块
 * 
 * 该模块导出一个基于 forwardRef 包装的 React 图标组件，
 * 用于渲染特定的图标，并支持 ref 转发功能。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 
 * 继承自标准的 SVG 元素属性，支持所有 SVG 相关的样式和事件
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * 图标的笔画宽度
   * @default 2
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
 * 图标数据接口
 * 
 * 定义图标的 SVG 路径数据和其他元数据
 */
export interface IconDefinition {
  /**
   * 图标的 SVG 路径数据（可以是单个路径或路径数组）
   */
  path: string | string[];
  
  /**
   * 视图框（viewBox）配置
   * @default "0 0 24 24"
   */
  viewBox?: string;
  
  /**
   * 图标的显示名称
   */
  displayName?: string;
}

/**
 * 图标组件类型
 * 
 * 使用 forwardRef 包装的函数组件，支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *