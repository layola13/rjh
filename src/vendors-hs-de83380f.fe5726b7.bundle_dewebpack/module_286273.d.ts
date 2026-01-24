/**
 * 图标组件模块
 * 基于 React forwardRef 包装的可转发引用的图标组件
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 继承自图标基础组件的所有属性
 */
export interface IconComponentProps {
  /** 图标的尺寸大小 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的类名 */
  className?: string;
  /** 图标的样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他 SVG 元素支持的属性 */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 支持 ref 转发的 React 组件
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 导出的默认图标组件
 * 
 * @remarks
 * 这是一个使用 forwardRef 包装的图标组件，允许父组件通过 ref 访问底层的 SVG 元素。
 * 组件内部将传入的所有 props 与预定义的图标数据合并，然后渲染为 SVG 图标。
 * 
 * @example
 *