/**
 * React组件模块 - 图标组件包装器
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 允许父组件通过ref访问底层DOM元素。
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准SVG元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /** 图标大小（像素） */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 图标旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 定义SVG图标的内部表示结构
 */
export interface IconData {
  /** 图标名称 */
  name?: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'twoTone';
  /** SVG图标数据 */
  icon?: {
    tag: string;
    attrs: Record<string, string | number>;
    children?: Array<{ tag: string; attrs: Record<string, unknown> }>;
  };
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 * 指向底层SVG元素的引用
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 使用forwardRef包装以支持ref转发
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<IconComponentRef>
>;

export default IconComponent;