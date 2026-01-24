/**
 * React组件：图标包装器组件
 * 
 * 该模块导出一个转发ref的React函数组件，用于渲染特定图标。
 * 组件通过props传递属性，并将ref转发到底层Icon组件。
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标类名 */
  className?: string;
  /** 图标样式 */
  style?: React.CSSProperties;
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 图标数据定义接口
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme?: 'filled' | 'outlined' | 'twotone';
  /** SVG路径数据 */
  icon: {
    tag: string;
    attrs: Record<string, string | number>;
    children?: unknown[];
  };
}

/**
 * Icon组件的ref类型
 */
export type IconRef = HTMLSpanElement | null;

/**
 * 转发ref的图标组件类型定义
 */
declare const IconComponent: ForwardRefExoticComponent<
  PropsWithoutRef<IconBaseProps> & RefAttributes<IconRef>
>;

export default IconComponent;