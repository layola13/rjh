/**
 * React图标组件模块
 * 
 * 该模块导出一个基于forwardRef的图标组件，支持ref转发和自定义属性扩展。
 * 通过包装通用图标组件并注入特定图标数据来实现。
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * 图标数据接口
 * 定义图标的原始数据结构（如SVG路径、viewBox等）
 */
export interface IconData {
  /** SVG路径数据 */
  path?: string | string[];
  /** viewBox属性 */
  viewBox?: string;
  /** 图标宽度 */
  width?: number;
  /** 图标高度 */
  height?: number;
  /** 其他SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标组件基础属性接口
 */
export interface IconComponentProps {
  /** 图标数据对象 */
  icon?: IconData;
  /** CSS类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 旋转角度 */
  rotate?: number;
  /** 是否水平翻转 */
  flip?: 'horizontal' | 'vertical' | 'both';
  /** 自定义属性 */
  [key: string]: unknown;
}

/**
 * 图标组件Ref类型
 * 通常指向底层的SVG或span元素
 */
export type IconComponentRef = HTMLElement | SVGSVGElement | null;

/**
 * 完整的图标组件类型定义
 * 
 * @template P - 额外的属性类型
 * 
 * @example
 *