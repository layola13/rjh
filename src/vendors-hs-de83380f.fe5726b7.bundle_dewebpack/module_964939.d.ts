/**
 * 图标组件模块
 * Module: module_964939
 * Original ID: 964939
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标属性接口
 * 继承自标准的SVG元素属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 图标旋转角度 */
  rotate?: number;
  /** 是否水平翻转 */
  flip?: boolean;
  /** 图标标题（用于无障碍访问） */
  title?: string;
}

/**
 * 图标数据接口
 * 定义图标的SVG路径和视图盒数据
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** SVG视图盒 */
  viewBox?: string;
  /** SVG路径数据 */
  path: string | string[];
  /** 图标宽度 */
  width?: number;
  /** 图标高度 */
  height?: number;
}

/**
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 
 * @description 通用图标组件，支持转发ref到底层SVG元素
 * @example
 *