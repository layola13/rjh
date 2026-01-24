/**
 * 图标组件模块
 * Module: module_66454
 * Original ID: 66454
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** CSS 类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他 SVG 属性 */
  [key: string]: any;
}

/**
 * 图标配置对象接口
 */
export interface IconConfig {
  /** 图标名称 */
  name: string;
  /** SVG 路径数据 */
  path: string;
  /** 视图盒子尺寸 */
  viewBox?: string;
  /** 默认尺寸 */
  defaultSize?: number;
}

/**
 * 通用图标组件
 * 
 * @description 基于 React.forwardRef 的图标组件，支持传递 ref 到底层 SVG 元素
 * 
 * @example
 *