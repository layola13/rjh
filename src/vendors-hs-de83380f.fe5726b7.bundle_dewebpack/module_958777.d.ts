/**
 * 图标组件类型定义
 * Module: module_958777
 * Original ID: 958777
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他HTML SVG属性 */
  [key: string]: unknown;
}

/**
 * SVG图标数据接口
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** SVG路径数据 */
  path: string | string[];
  /** 视图盒子尺寸 */
  viewBox?: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'twoTone';
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 前向引用的图标组件类型
 * 
 * @example
 *