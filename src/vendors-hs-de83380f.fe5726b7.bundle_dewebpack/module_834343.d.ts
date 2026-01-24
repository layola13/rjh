/**
 * 图标组件模块
 * 基于 forwardRef 封装的可转发引用的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconComponentBaseProps {
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
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** 其他 HTML 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的 props 类型
 * 继承基础属性并添加 ref 支持
 */
export type IconComponentProps = IconComponentBaseProps & RefAttributes<HTMLElement>;

/**
 * 图标数据配置接口
 * 定义图标的 SVG 路径、尺寸等元数据
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题（outlined/filled/twotone） */
  theme?: string;
  /** SVG 图标数据 */
  icon: {
    tag: string;
    attrs: Record<string, string>;
    children?: unknown[];
  };
}

/**
 * 通用图标包装组件的属性接口
 */
export interface IconWrapperProps extends IconComponentBaseProps {
  /** 图标定义数据 */
  icon: IconDefinition;
  /** 图标的引用 */
  ref?: React.Ref<HTMLElement>;
}

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个使用 forwardRef 封装的图标组件，支持引用转发。
 * 组件会将传入的 props 与预定义的图标数据合并，
 * 然后渲染为实际的图标元素。
 * 
 * @example
 *