/**
 * 图标组件模块
 * Module ID: 678796
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** aria-label 用于无障碍访问 */
  'aria-label'?: string;
  /** 其他 SVG 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的属性类型
 * 继承基础图标属性，支持 ref 转发到 SVGSVGElement
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 使用 forwardRef 包装的函数组件，支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *