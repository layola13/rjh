/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件，
 * 通过组合基础图标组件和特定图标数据来创建可复用的图标实例。
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 * 
 * @interface IconBaseProps
 */
export interface IconBaseProps {
  /** 图标的类名 */
  className?: string;
  
  /** 图标的样式对象 */
  style?: React.CSSProperties;
  
  /** 图标的尺寸 */
  size?: number | string;
  
  /** 图标的颜色 */
  color?: string;
  
  /** 图标的旋转角度 */
  rotate?: number;
  
  /** 图标的自定义属性 */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 定义图标的 SVG 路径、视图框等元数据
 * 
 * @interface IconData
 */
export interface IconData {
  /** SVG 路径数据 */
  path?: string | string[];
  
  /** SVG 视图框 */
  viewBox?: string;
  
  /** 图标的宽度 */
  width?: number;
  
  /** 图标的高度 */
  height?: number;
  
  /** 其他 SVG 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的 Props 类型
 * 继承基础属性并添加 ref 支持
 */
export type IconComponentProps = IconBaseProps & RefAttributes<HTMLElement>;

/**
 * 图标组件类型定义
 * 使用 ForwardRefExoticComponent 以支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件实例
 * 
 * 该组件通过 React.forwardRef 创建，支持 ref 转发到底层 DOM 元素。
 * 内部将传入的 props 与预定义的图标数据合并，渲染为具体的图标实例。
 * 
 * @example
 *