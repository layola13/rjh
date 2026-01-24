/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
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
  /** 是否旋转动画 */
  spin?: boolean;
  /** 自定义属性 */
  [key: string]: any;
}

/**
 * 图标数据接口
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'twoTone';
  /** SVG路径数据 */
  icon: {
    tag: string;
    attrs: Record<string, string>;
    children?: any[];
  };
}

/**
 * 图标组件属性类型
 */
export type IconComponentProps = IconBaseProps & RefAttributes<HTMLSpanElement>;

/**
 * 转发引用的图标组件类型
 */
export type IconComponent = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<'span'> & IconBaseProps & RefAttributes<HTMLSpanElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个使用 React.forwardRef 创建的图标组件，支持引用转发。
 * 它将传入的属性与内部图标定义合并，并渲染为可自定义的图标元素。
 * 
 * @example
 *