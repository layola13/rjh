/**
 * 图标组件模块
 * 基于 React 的 forwardRef 图标包装器
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
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
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件属性类型
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconRef>;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用 React.forwardRef 创建的图标组件，
 * 接收图标配置和 ref，返回渲染的 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *