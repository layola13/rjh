/**
 * 图标组件模块
 * 基于 React forwardRef 的图标组件封装
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  /** aria-label 无障碍标签 */
  'aria-label'?: string;
  /** 其他 HTML 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件的完整属性类型
 * 继承基础属性并包含 ref 支持
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconRef>;

/**
 * 图标组件类型定义
 * 使用 ForwardRefExoticComponent 支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *